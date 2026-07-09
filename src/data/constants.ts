import type { Category, CategoryStyle, Team } from '@/types';

/** Danh sách kênh — dùng cho sidebar và dropdown trong form */
export const TEAMS: Team[] = ['NhiLe', 'Ms. Nhi', 'NhiLe Team', 'Spice & Nice', 'Chung'];

/** Danh sách loại nội dung */
export const CATEGORIES: Category[] = [
  'Talkshow/Podcast',
  'Du lịch & Văn hoá',
  'Đào tạo nội bộ',
  'Phát triển bản thân',
  'Khác',
];

/** Style hiển thị theo loại nội dung (màu, icon, gradient) */
export const CATEGORY_STYLE: Record<Category, CategoryStyle> = {
  'Talkshow/Podcast': {
    label: 'Talkshow',
    icon: '🎙️',
    color: '#2563EB',
    bg: 'radial-gradient(120% 100% at 100% 0%, rgba(37,99,235,0.10), transparent 60%)',
    iconBg: 'linear-gradient(135deg, #93C5FD, #3B82F6)',
  },
  'Du lịch & Văn hoá': {
    label: 'Du lịch',
    icon: '🧭',
    color: '#0891B2',
    bg: 'radial-gradient(120% 100% at 100% 0%, rgba(8,145,178,0.10), transparent 60%)',
    iconBg: 'linear-gradient(135deg, #A5F3FC, #06B6D4)',
  },
  'Đào tạo nội bộ': {
    label: 'Đào tạo',
    icon: '📘',
    color: '#1E3A8A',
    bg: 'radial-gradient(120% 100% at 100% 0%, rgba(30,58,138,0.10), transparent 60%)',
    iconBg: 'linear-gradient(135deg, #BFDBFE, #1D4ED8)',
  },
  'Phát triển bản thân': {
    label: 'Phát triển',
    icon: '🌱',
    color: '#0369A1',
    bg: 'radial-gradient(120% 100% at 100% 0%, rgba(3,105,161,0.10), transparent 60%)',
    iconBg: 'linear-gradient(135deg, #7DD3FC, #0284C7)',
  },
  Khác: {
    label: 'Khác',
    icon: '✨',
    color: '#3B82F6',
    bg: 'radial-gradient(120% 100% at 100% 0%, rgba(59,130,246,0.08), transparent 60%)',
    iconBg: 'linear-gradient(135deg, #DBEAFE, #93C5FD)',
  },
};

export function catStyle(cat: Category): CategoryStyle {
  return CATEGORY_STYLE[cat] ?? CATEGORY_STYLE['Khác'];
}

/** Prompt mẫu để người mới học cách viết (nút "Xem mẫu") */
export const SAMPLE_PROMPT = `Bạn là biên tập viên video cho kênh du lịch NhiLe.

Hãy viết caption TikTok 2-3 câu cho video về [tên địa điểm], với các yêu cầu:
- Giọng văn: cảm xúc, gần gũi, có chất thơ nhẹ
- Câu mở đầu phải giật cảm xúc trong 3 giây đầu
- Kết thúc bằng 1 câu hỏi mở để người xem comment
- Có 3-5 hashtag tiếng Việt và tiếng Anh

Đầu ra: chỉ caption, không giải thích.`;
