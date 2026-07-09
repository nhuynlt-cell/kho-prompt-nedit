import { useEffect, useMemo, useState } from 'react';
import type { Prompt, PromptInput } from '@/types';
import { useUiStore } from '@/store/uiStore';
import {
  usePrompts,
  useCreatePrompt,
  useUpdatePrompt,
  useDeletePrompt,
} from '@/hooks/usePrompts';
import { stripDiacritics } from '@/utils/text';

import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { ExplainBanner } from '@/components/ExplainBanner';
import { SearchBar } from '@/components/SearchBar';
import { PromptGrid } from '@/components/PromptGrid';
import { AiHelperCard } from '@/components/AiHelperCard';
import { Toast } from '@/components/Toast';
import { PromptFormModal } from '@/components/modals/PromptFormModal';
import { PromptDetailModal } from '@/components/modals/PromptDetailModal';
import { IntroModal } from '@/components/modals/IntroModal';

const SEEN_INTRO_KEY = 'nedit_seen_intro';
const HID_EXPLAIN_KEY = 'nedit_hid_explain';

export default function App() {
  const { data: prompts = [] } = usePrompts();
  const createMut = useCreatePrompt();
  const updateMut = useUpdatePrompt();
  const deleteMut = useDeletePrompt();

  const {
    activeTeam,
    activeCat,
    searchQuery,
    toastMsg,
    setActiveTeam,
    setActiveCat,
    setSearchQuery,
    clearFilters,
    showToast,
  } = useUiStore();

  // Trạng thái các modal / banner
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Prompt | null>(null);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [introOpen, setIntroOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  // Lần đầu vào: hiện onboarding + kiểm tra banner giải thích
  useEffect(() => {
    if (!localStorage.getItem(SEEN_INTRO_KEY)) setIntroOpen(true);
    if (localStorage.getItem(HID_EXPLAIN_KEY)) setShowBanner(false);
  }, []);

  /* ---------- Lọc + sắp xếp ---------- */
  const filtered = useMemo(() => {
    const q = stripDiacritics(searchQuery);
    return prompts
      .filter((p) => {
        if (activeTeam !== 'all' && p.team !== activeTeam) return false;
        if (activeCat !== 'all' && p.category !== activeCat) return false;
        if (q) {
          const hay = stripDiacritics(
            `${p.title} ${p.content} ${p.author} ${(p.tags ?? []).join(' ')}`,
          );
          if (!hay.includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [prompts, activeTeam, activeCat, searchQuery]);

  const isFiltered = activeTeam !== 'all' || activeCat !== 'all' || searchQuery !== '';
  const listTitle =
    [activeTeam !== 'all' ? activeTeam : null, activeCat !== 'all' ? activeCat : null]
      .filter(Boolean)
      .join(' · ') || 'Tất cả prompt';

  const detailPrompt = detailId ? prompts.find((p) => p.id === detailId) ?? null : null;

  /* ---------- Handlers ---------- */
  function copyText(text: string) {
    navigator.clipboard.writeText(text).then(() => showToast('Đã sao chép nội dung.'));
  }

  function openAdd() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(p: Prompt) {
    setDetailId(null);
    setEditing(p);
    setFormOpen(true);
  }

  function handleSubmit(input: PromptInput) {
    if (editing) {
      updateMut.mutate(
        { id: editing.id, input },
        { onSuccess: () => showToast('Đã lưu thay đổi.') },
      );
    } else {
      createMut.mutate(input, { onSuccess: () => showToast('Đã lưu prompt vào kho.') });
    }
    setFormOpen(false);
    setEditing(null);
  }

  function handleDelete(id: string) {
    deleteMut.mutate(id, { onSuccess: () => showToast('Đã xoá prompt.') });
    setDetailId(null);
  }

  function handleAiSave(input: PromptInput) {
    createMut.mutate(input, { onSuccess: () => showToast('Đã lưu prompt vào kho.') });
  }

  function closeBanner() {
    setShowBanner(false);
    localStorage.setItem(HID_EXPLAIN_KEY, '1');
  }

  function closeIntro() {
    setIntroOpen(false);
    localStorage.setItem(SEEN_INTRO_KEY, '1');
  }

  return (
    <>
      <Header onHowTo={() => setIntroOpen(true)} onAdd={openAdd} />

      <div className="layout">
        <Sidebar
          prompts={prompts}
          activeTeam={activeTeam}
          activeCat={activeCat}
          onTeamChange={setActiveTeam}
          onCatChange={setActiveCat}
        />

        <main>
          {showBanner && <ExplainBanner onClose={closeBanner} />}

          <h2 className="section-title">{listTitle}</h2>
          <p className="section-sub">
            {filtered.length} prompt · mọi người trong team đều thấy
          </p>

          <SearchBar value={searchQuery} onChange={setSearchQuery} />

          <PromptGrid
            prompts={filtered}
            isFiltered={isFiltered}
            onOpen={setDetailId}
            onQuickCopy={(id) => {
              const p = prompts.find((x) => x.id === id);
              if (p) copyText(p.content);
            }}
            onAdd={openAdd}
            onClearFilters={clearFilters}
          />

          <AiHelperCard onCopy={copyText} onSave={handleAiSave} onError={showToast} />
        </main>
      </div>

      <PromptFormModal
        open={formOpen}
        editing={editing}
        onClose={() => {
          setFormOpen(false);
          setEditing(null);
        }}
        onSubmit={handleSubmit}
        onToast={showToast}
      />

      <PromptDetailModal
        prompt={detailPrompt}
        onClose={() => setDetailId(null)}
        onCopy={copyText}
        onEdit={openEdit}
        onDelete={handleDelete}
      />

      <IntroModal open={introOpen} onClose={closeIntro} />

      <Toast message={toastMsg} />
    </>
  );
}
