import { useEffect, useRef, useState } from 'react';
import type { Category, Prompt, PromptInput, Team } from '@/types';
import { CATEGORIES, SAMPLE_PROMPT, TEAMS } from '@/data/constants';

interface PromptFormModalProps {
  open: boolean;
  editing: Prompt | null; // null = thêm mới, có giá trị = sửa
  onClose: () => void;
  onSubmit: (input: PromptInput) => void;
  onToast: (msg: string) => void;
}

const EMPTY = {
  title: '',
  content: '',
  team: 'NhiLe' as Team,
  category: 'Talkshow/Podcast' as Category,
  author: '',
  tags: '',
};

export function PromptFormModal({
  open,
  editing,
  onClose,
  onSubmit,
  onToast,
}: PromptFormModalProps) {
  const [form, setForm] = useState(EMPTY);
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);

  // Đồng bộ form mỗi khi mở modal / đổi prompt đang sửa
  useEffect(() => {
    if (!open) return;
    if (editing) {
      setForm({
        title: editing.title,
        content: editing.content,
        team: editing.team,
        category: editing.category,
        author: editing.author ?? '',
        tags: (editing.tags ?? []).join(', '),
      });
    } else {
      setForm(EMPTY);
    }
    setTitleError(false);
    setContentError(false);
    setTimeout(() => titleRef.current?.focus(), 0);
  }, [open, editing]);

  if (!open) return null;

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  function hasUnsaved() {
    return form.title.trim() !== '' || form.content.trim() !== '';
  }

  function handleClose(force = false) {
    if (!force && hasUnsaved() && !confirm('Nội dung chưa lưu sẽ mất. Đóng lại?')) return;
    onClose();
  }

  function handleSubmit() {
    const title = form.title.trim();
    const content = form.content.trim();
    setTitleError(!title);
    setContentError(!content);
    if (!title || !content) {
      onToast('Cần nhập tiêu đề và nội dung.');
      return;
    }
    onSubmit({
      title,
      content,
      team: form.team,
      category: form.category,
      author: form.author.trim(),
      tags: form.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    });
  }

  function loadSample() {
    if (form.content.trim() && !confirm('Nội dung hiện tại sẽ bị thay bằng prompt mẫu. Tiếp tục?'))
      return;
    setForm((f) => ({
      ...f,
      content: SAMPLE_PROMPT,
      title: f.title.trim() ? f.title : 'Viết caption TikTok video du lịch',
    }));
    onToast('Đã điền prompt mẫu — sửa lại theo ý bạn nhé.');
  }

  return (
    <div className="overlay" onClick={(e) => e.target === e.currentTarget && handleClose(false)}>
      <div className="modal">
        <h3>{editing ? 'Sửa prompt' : 'Thêm prompt mới'}</h3>

        <div className="field">
          <label>
            Tiêu đề<span className="required-mark">*</span>
          </label>
          <input
            ref={titleRef}
            type="text"
            value={form.title}
            onChange={(e) => set('title', e.target.value)}
            style={{ borderColor: titleError ? 'var(--danger)' : 'var(--line)' }}
            placeholder="VD: Viết caption TikTok theo phong cách NhiLe"
          />
        </div>

        <div className="field-row">
          <div className="field">
            <label>Kênh</label>
            <select value={form.team} onChange={(e) => set('team', e.target.value as Team)}>
              {TEAMS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Loại nội dung</label>
            <select
              value={form.category}
              onChange={(e) => set('category', e.target.value as Category)}
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="field">
          <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>
              Nội dung prompt<span className="required-mark">*</span>
            </span>
            <button
              type="button"
              onClick={loadSample}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--blue)',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                padding: 0,
                textDecoration: 'underline',
              }}
            >
              Xem mẫu
            </button>
          </label>
          <textarea
            value={form.content}
            onChange={(e) => set('content', e.target.value)}
            style={{ borderColor: contentError ? 'var(--danger)' : 'var(--line)' }}
            placeholder="VD: Bạn là một biên tập viên video. Hãy viết caption TikTok 2-3 câu cho video về chùa Thiên Mụ, giọng cảm xúc, có hashtag..."
          />
        </div>

        <div className="field-row">
          <div className="field">
            <label>Tác giả</label>
            <input
              type="text"
              value={form.author}
              onChange={(e) => set('author', e.target.value)}
              placeholder="Tên bạn"
            />
          </div>
          <div className="field">
            <label>
              Từ khoá{' '}
              <span style={{ fontWeight: 400, color: 'var(--ink-soft)' }}>(không bắt buộc)</span>
            </label>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => set('tags', e.target.value)}
              placeholder="VD: caption, tiktok, sen huế"
            />
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-ghost" onClick={() => handleClose(false)}>
            Huỷ
          </button>
          <button className="btn-primary" onClick={handleSubmit}>
            {editing ? 'Lưu thay đổi' : 'Lưu prompt'}
          </button>
        </div>
      </div>
    </div>
  );
}
