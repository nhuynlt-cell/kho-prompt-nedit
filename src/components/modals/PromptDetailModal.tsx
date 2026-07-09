import { useEffect, useRef, useState } from 'react';
import type { Prompt } from '@/types';

interface PromptDetailModalProps {
  prompt: Prompt | null;
  onClose: () => void;
  onCopy: (text: string) => void;
  onEdit: (prompt: Prompt) => void;
  onDelete: (id: string) => void;
}

export function PromptDetailModal({
  prompt,
  onClose,
  onCopy,
  onEdit,
  onDelete,
}: PromptDetailModalProps) {
  const [confirming, setConfirming] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset trạng thái nút xoá mỗi khi mở prompt khác / đóng
  useEffect(() => {
    setConfirming(false);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [prompt]);

  if (!prompt) return null;

  function handleDelete() {
    if (!confirming) {
      setConfirming(true);
      timerRef.current = setTimeout(() => setConfirming(false), 4000);
      return;
    }
    if (timerRef.current) clearTimeout(timerRef.current);
    onDelete(prompt!.id);
  }

  return (
    <div className="overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <h3>{prompt.title}</h3>
        <div className="card-tags" style={{ marginBottom: 14 }}>
          <span className="tag tag-team">{prompt.team}</span>{' '}
          <span className="tag tag-cat">{prompt.category}</span>{' '}
          {(prompt.tags ?? []).map((t) => (
            <span
              key={t}
              className="tag"
              style={{ background: 'var(--line)', color: 'var(--ink-soft)' }}
            >
              #{t}
            </span>
          ))}
        </div>

        <div className="detail-body">{prompt.content}</div>

        <div className="modal-actions">
          <button
            className={`icon-btn btn-delete${confirming ? ' danger-confirm' : ''}`}
            onClick={handleDelete}
          >
            {confirming ? 'Bấm lần nữa để xoá' : 'Xoá'}
          </button>
          <button className="btn-ghost" onClick={() => onEdit(prompt)}>
            Sửa
          </button>
          <button className="btn-primary" onClick={() => onCopy(prompt.content)}>
            Sao chép nội dung
          </button>
        </div>
      </div>
    </div>
  );
}
