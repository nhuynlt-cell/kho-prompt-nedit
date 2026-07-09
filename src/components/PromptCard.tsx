import type { Prompt } from '@/types';
import { catStyle } from '@/data/constants';

interface PromptCardProps {
  prompt: Prompt;
  index: number; // vị trí trong danh sách đã lọc (để hiện số 01, 02...)
  onOpen: (id: string) => void;
  onQuickCopy: (id: string) => void;
}

export function PromptCard({ prompt, index, onOpen, onQuickCopy }: PromptCardProps) {
  const s = catStyle(prompt.category);
  const idx = String(index + 1).padStart(2, '0');

  return (
    <div
      className="prompt-card"
      style={{ background: `${s.bg}, var(--card)` }}
      onClick={() => onOpen(prompt.id)}
    >
      <svg className="card-watermark" viewBox="0 0 200 200" fill="none">
        <path
          d="M100 10C140 10 180 45 180 100C180 150 145 190 100 190C55 190 20 150 20 100C20 45 60 10 100 10Z"
          fill={s.color}
        />
      </svg>

      <div className="card-top-row">
        <div className="card-icon" style={{ background: s.iconBg }}>
          {s.icon}
        </div>
        <div className="card-index">{idx}</div>
      </div>

      <span className="card-cat-badge" style={{ background: s.iconBg, color: '#fff' }}>
        {s.label}
      </span>
      <div className="card-team-tag">{prompt.team}</div>
      <div className="card-title-main">{prompt.title}</div>
      <div className="card-preview">{prompt.content}</div>

      <div className="card-foot">
        <button
          className="card-copy-mini"
          title="Sao chép nhanh"
          onClick={(e) => {
            e.stopPropagation();
            onQuickCopy(prompt.id);
          }}
        >
          <svg viewBox="0 0 24 24" fill="none">
            <rect
              x="9"
              y="9"
              width="11"
              height="11"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M5 15V5C5 3.89543 5.89543 3 7 3H15"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </button>
        <span className="pill-open">Bấm để mở ↻</span>
      </div>
    </div>
  );
}
