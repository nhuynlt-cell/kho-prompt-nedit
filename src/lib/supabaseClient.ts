import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// ============================================================
//  Supabase client — nơi lưu prompt của cả team.
//  Nếu CHƯA điền .env thì client = null và app tự chạy bằng mock data.
//  TODO: SUPABASE - tạo project + table `prompts` (xem CLAUDE-CODE-SETUP.md)
// ============================================================

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, anonKey as string)
  : null;
