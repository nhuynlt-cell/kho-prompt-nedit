interface IntroModalProps {
  open: boolean;
  onClose: () => void;
}

const STEPS = [
  <>
    <strong>Thêm prompt</strong> khi bạn viết được hoặc học được một prompt hay — bấm nút
    xanh "＋ Thêm prompt" ở góc trên.
  </>,
  <>
    <strong>Tìm lại</strong> bằng thanh tìm kiếm, hoặc lọc theo Kênh / Loại nội dung ở cột
    bên trái.
  </>,
  <>
    <strong>Chưa biết viết prompt sao cho chuẩn?</strong> Gõ ý tưởng vào khung "AI gợi ý
    prompt" — AI sẽ viết giúp bạn, bấm "Lưu vào kho" là xong.
  </>,
  <>
    Mọi người dùng chung link này sẽ <strong>thấy prompt của nhau</strong> — một kho chung
    cho cả team.
  </>,
];

export function IntroModal({ open, onClose }: IntroModalProps) {
  if (!open) return null;
  return (
    <div className="overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <h3>Chào mừng đến Kho Prompt N-Edit 👋</h3>
        <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', margin: 0 }}>
          Nơi cả team lưu và tìm lại prompt dùng chung — không còn sợ thất lạc hay quên mất.
        </p>
        <div className="intro-steps">
          {STEPS.map((content, i) => (
            <div className="intro-step" key={i}>
              <div className="intro-num">{i + 1}</div>
              <p>{content}</p>
            </div>
          ))}
        </div>
        <div className="modal-actions">
          <button className="btn-primary" style={{ width: '100%' }} onClick={onClose}>
            Đã hiểu, bắt đầu thôi
          </button>
        </div>
      </div>
    </div>
  );
}
