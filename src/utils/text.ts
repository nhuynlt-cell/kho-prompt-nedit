/** Bỏ dấu tiếng Việt để tìm kiếm không phân biệt dấu.
 *  VD: "sen huế" khớp cả "sen hue". */
export function stripDiacritics(str: string): string {
  return (str || '')
    .toString()
    .normalize('NFD')
    .replace(new RegExp('[\\u0300-\\u036f]', 'g'), '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

/** Sinh id tạm phía client (dùng khi chưa có id từ DB) */
export function uid(): string {
  return 'p_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
}
