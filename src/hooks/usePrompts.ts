import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Prompt, PromptInput } from '@/types';
import {
  createPrompt,
  deletePrompt,
  fetchPrompts,
  updatePrompt,
} from '@/services/promptService';

// ============================================================
//  Hook quản lý prompt qua TanStack Query.
//  Component gọi hook này, không đụng trực tiếp promptService/Supabase.
// ============================================================

const KEY = ['prompts'];

export function usePrompts() {
  return useQuery<Prompt[]>({
    queryKey: KEY,
    queryFn: fetchPrompts,
  });
}

export function useCreatePrompt() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: PromptInput) => createPrompt(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
}

export function useUpdatePrompt() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: PromptInput }) =>
      updatePrompt(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
}

export function useDeletePrompt() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePrompt(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
}
