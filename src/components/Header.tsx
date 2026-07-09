interface HeaderProps {
  onHowTo: () => void;
  onAdd: () => void;
}

export function Header({ onHowTo, onAdd }: HeaderProps) {
  return (
    <header className="top">
      <div className="brand">
        <div className="eyebrow">Kho Prompt · N-Edit</div>
        <h1>Thư viện Prompt chung</h1>
        <p>NhiLe Holdings · Bấm thẻ để mở</p>
      </div>
      <div className="top-actions">
        <button className="btn-ghost" onClick={onHowTo}>
          Cách dùng
        </button>
        <button className="btn-primary" onClick={onAdd}>
          ＋ Thêm prompt
        </button>
      </div>
    </header>
  );
}
