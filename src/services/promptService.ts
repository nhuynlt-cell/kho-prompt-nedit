import type { Prompt, PromptInput } from '@/types';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { MOCK_PROMPTS } from '@/data/mockPrompts';
import { uid } from '@/utils/text';

// ============================================================
//  Lớp dữ liệu (data layer) cho prompt.
//
//  Hoạt động 2 chế độ:
//   1. CHƯA điền .env Supabase  -> chạy bằng localStorage + mock (xem giao diện ngay).
//   2. ĐÃ nối Supabase          -> đọc/ghi thẳng vào table `prompts`.
//
//  Component KHÔNG gọi Supabase trực tiếp — luôn đi qua service này,
//  để sau đổi backend không phải sửa UI.
//
//  TODO: SUPABASE - table `prompts` (id, title, content, team, category,
//        author, tags[], created_at). Xem schema trong CLAUDE-CODE-SETUP.md.
// ============================================================

const STORAGE_KEY = 'nedit_prompts_v1';

/* ---------- Chế độ mock (localStorage) ---------- */

function readLocal(): Prompt[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Prompt[];
  } catch {
    /* ignore */
  }
  // Lần đầu chưa có gì -> seed bằng mock để có nội dung xem thử.
  localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_PROMPTS));
  return MOCK_PROMPTS;
}

function writeLocal(prompts: Prompt[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
}

/* ---------- API công khai (component chỉ dùng những hàm này) ---------- */

export async function fetchPrompts(): Promise<Prompt[]> {
  if (isSupabaseConfigured && supabase) {
    // TODO: SUPABASE - đọc từ table `prompts`
    const { data, error } = await supabase
      .from('prompts')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data ?? []).map(fromRow);
  }
  return readLocal();
}

export async function createPrompt(input: PromptInput): Promise<Prompt> {
  const prompt: Prompt = { id: uid(), ...input, createdAt: Date.now() };

  if (isSupabaseConfigured && supabase) {
    // TODO: SUPABASE - insert vào table `prompts`
    const { data, error } = await supabase
      .from('prompts')
      .insert(toRow(prompt))
      .select()
      .single();
    if (error) throw error;
    return fromRow(data);
  }

  const all = readLocal();
  all.push(prompt);
  writeLocal(all);
  return prompt;
}

export async function updatePrompt(id: string, input: PromptInput): Promise<Prompt> {
  if (isSupabaseConfigured && supabase) {
    // TODO: SUPABASE - update table `prompts` theo id
    const { data, error } = await supabase
      .from('prompts')
      .update(toRow({ id, ...input } as Prompt))
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return fromRow(data);
  }

  const all = readLocal();
  const idx = all.findIndex((p) => p.id === id);
  if (idx > -1) all[idx] = { ...all[idx], ...input };
  writeLocal(all);
  return all[idx];
}

export async function deletePrompt(id: string): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    // TODO: SUPABASE - delete khỏi table `prompts` theo id
    const { error } = await supabase.from('prompts').delete().eq('id', id);
    if (error) throw error;
    return;
  }

  const all = readLocal().filter((p) => p.id !== id);
  writeLocal(all);
}

/* ---------- Map giữa row DB (snake_case) và model (camelCase) ---------- */

interface PromptRow {
  id: string;
  title: string;
  content: string;
  team: Prompt['team'];
  category: Prompt['category'];
  author: string;
  tags: string[];
  created_at: string | number;
}

function fromRow(row: PromptRow): Prompt {
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    team: row.team,
    category: row.category,
    author: row.author ?? '',
    tags: row.tags ?? [],
    createdAt: typeof row.created_at === 'string' ? Date.parse(row.created_at) : row.created_at,
  };
}

function toRow(p: Prompt): Record<string, unknown> {
  return {
    id: p.id,
    title: p.title,
    content: p.content,
    team: p.team,
    category: p.category,
    author: p.author,
    tags: p.tags,
  };
}
