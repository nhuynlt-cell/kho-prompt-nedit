import { create } from 'zustand';
import type { CategoryFilter, TeamFilter } from '@/types';

// ============================================================
//  Zustand store — trạng thái UI dùng chung (filter, search, toast).
//  (Dữ liệu prompt KHÔNG ở đây — nó do TanStack Query quản lý.)
// ============================================================

interface UiState {
  activeTeam: TeamFilter;
  activeCat: CategoryFilter;
  searchQuery: string;
  toastMsg: string | null;

  setActiveTeam: (t: TeamFilter) => void;
  setActiveCat: (c: CategoryFilter) => void;
  setSearchQuery: (q: string) => void;
  clearFilters: () => void;
  showToast: (msg: string) => void;
  hideToast: () => void;
}

let toastTimer: ReturnType<typeof setTimeout> | null = null;

export const useUiStore = create<UiState>((set) => ({
  activeTeam: 'all',
  activeCat: 'all',
  searchQuery: '',
  toastMsg: null,

  setActiveTeam: (t) => set({ activeTeam: t }),
  setActiveCat: (c) => set({ activeCat: c }),
  setSearchQuery: (q) => set({ searchQuery: q }),
  clearFilters: () => set({ activeTeam: 'all', activeCat: 'all', searchQuery: '' }),

  showToast: (msg) => {
    set({ toastMsg: msg });
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => set({ toastMsg: null }), 2200);
  },
  hideToast: () => set({ toastMsg: null }),
}));
