import { useState } from 'react';
import type { PromptInput } from '@/types';
import { suggestPrompt } from '@/services/aiService';

interface AiHelperCardProps {
  onCopy: (text: string) => void;
  onSave: (input: PromptInput) => void;
  onError: (msg: string) => void;
}

export function AiHelperCard({ onCopy, onSave, onError }: AiHelperCardProps) {
  const [idea, setIdea] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSuggest() {
    if (!idea.trim()) {
      onError('Nhập ý tưởng trước đã nhé.');
      return;
    }
    setLoading(true);
    try {
      const text = await suggestPrompt(idea.trim());
      setResult(text || 'Không nhận được phản hồi, thử lại nhé.');
    } catch {
      setResult('Có lỗi khi gọi AI, thử lại sau nhé.');
    } finally {
      setLoading(false);
    }
  }

  function handleSave() {
    if (!result) return;
    // TODO: SUPABASE - prompt do AI tạo cũng lưu vào table `prompts`
    onSave({
      title: idea.length > 60 ? idea.slice(0, 57) + '...' : idea || 'Prompt do AI gợi ý',
      content: result,
      team: 'Chung',
      category: 'Khác',
      author: 'AI gợi ý',
      tags: ['ai-generated'],
    });
    setIdea('');
    setResult('');
  }

  return (
    <div className="ai-card" style={{ margin: 0 }}>
      <div className="ai-card-head">
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3L13.8 8.5L19 10L13.8 11.5L12 17L10.2 11.5L5 10L10.2 8.5L12 3Z"
            fill="currentColor"
          />
        </svg>
        <h2>Chưa biết viết prompt? Để AI viết giúp bạn</h2>
      </div>
      <p className="desc">
        Chỉ cần mô tả điều bạn muốn AI làm bằng tiếng Việt bình thường (VD: "viết caption
        TikTok cho video sen Huế"), AI sẽ viết lại thành prompt chuẩn, chuyên nghiệp — bạn
        chỉ việc copy đi dùng.
      </p>
      <div className="ai-input-row">
        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="VD: viết mô tả video ngắn giới thiệu chùa Thiên Mụ..."
        />
        <button className="ai-btn" onClick={handleSuggest} disabled={loading}>
          {loading ? 'Đang nghĩ...' : '✨ Nhờ AI viết giúp'}
        </button>
      </div>

      {result && (
        <div className="ai-result">
          <pre>{result}</pre>
          <div className="ai-result-actions">
            <button
              className="btn-ghost"
              style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }}
              onClick={() => onCopy(result)}
            >
              Sao chép
            </button>
            <button className="ai-btn" onClick={handleSave}>
              Lưu vào kho
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
