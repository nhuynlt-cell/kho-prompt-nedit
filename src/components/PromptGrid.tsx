import type { Prompt } from '@/types';
import { PromptCard } from './PromptCard';
import { EmptyState } from './EmptyState';

interface PromptGridProps {
  prompts: Prompt[];
  isFiltered: boolean;
  onOpen: (id: string) => void;
  onQuickCopy: (id: string) => void;
  onAdd: () => void;
  onClearFilters: () => void;
}

export function PromptGrid({
  prompts,
  isFiltered,
  onOpen,
  onQuickCopy,
  onAdd,
  onClearFilters,
}: PromptGridProps) {
  return (
    <div className="grid">
      {prompts.length === 0 ? (
        <EmptyState isFiltered={isFiltered} onAdd={onAdd} onClearFilters={onClearFilters} />
      ) : (
        prompts.map((p, i) => (
          <PromptCard
            key={p.id}
            prompt={p}
            index={i}
            onOpen={onOpen}
            onQuickCopy={onQuickCopy}
          />
        ))
      )}
    </div>
  );
}
