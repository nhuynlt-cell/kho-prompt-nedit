interface EmptyStateProps {
  isFiltered: boolean;
  onAdd: () => void;
  onClearFilters: () => void;
}

export function EmptyState({ isFiltered, onAdd, onClearFilters }: EmptyStateProps) {
  return (
    <div className="empty-state" style={{ gridColumn: '1/-1' }}>
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M4 5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V5Z"
          stroke="currentColor"
          strokeWidth="1.4"
        />
      </svg>
      <p>
        {isFiltered
          ? 'Không có prompt nào khớp với bộ lọc hoặc từ khoá này.'
          : 'Chưa có prompt nào ở đây. Thêm prompt đầu tiên nhé!'}
      </p>
      {isFiltered ? (
        <button className="btn-ghost" onClick={onClearFilters}>
          Xoá bộ lọc
        </button>
      ) : (
        <button className="btn-primary" onClick={onAdd}>
          ＋ Thêm prompt đầu tiên
        </button>
      )}
    </div>
  );
}
