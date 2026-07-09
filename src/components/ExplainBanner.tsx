interface ExplainBannerProps {
  onClose: () => void;
}

export function ExplainBanner({ onClose }: ExplainBannerProps) {
  return (
    <div className="explain-banner">
      <div className="explain-icon">💡</div>
      <div className="explain-body">
        <strong>Prompt là gì?</strong> Là câu bạn nói với AI (ChatGPT, Claude...) để bảo
        nó làm việc. Prompt viết càng rõ, AI làm càng đúng ý.
        <br />
        <span style={{ color: 'var(--ink-soft)' }}>
          Kho này lưu lại những prompt hay của cả team, để bạn không phải nghĩ lại từ đầu
          mỗi lần.
        </span>
      </div>
      <button className="explain-close" aria-label="Đóng" onClick={onClose}>
        ✕
      </button>
    </div>
  );
}
