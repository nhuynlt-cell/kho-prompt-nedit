import type { PromptInput } from '@/types';
import { AiHelperCard } from '@/components/AiHelperCard';

interface AiHelperModalProps {
  open: boolean;
  onClose: () => void;
  onCopy: (text: string) => void;
  onSave: (input: PromptInput) => void;
  onError: (msg: string) => void;
}

export function AiHelperModal({
  open,
  onClose,
  onCopy,
  onSave,
  onError,
}: AiHelperModalProps) {
  if (!open) return null;

  return (
    <div
      className="overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="ai-modal">
        <button className="ai-modal-close" aria-label="Đóng" onClick={onClose}>
          ✕
        </button>
        <AiHelperCard onCopy={onCopy} onSave={onSave} onError={onError} />
      </div>
    </div>
  );
}
