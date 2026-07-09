import type { Prompt } from '@/types';

// ============================================================
//  MOCK DATA — dùng tạm để xem giao diện khi CHƯA nối Supabase.
//  TODO: SUPABASE - table `prompts`: khi đã có DB thật, xoá mock này,
//  promptService sẽ đọc trực tiếp từ Supabase.
// ============================================================

const now = Date.now();
const min = 60 * 1000;

export const MOCK_PROMPTS: Prompt[] = [
  {
    id: 'p_mock_1',
    title: 'Viết caption TikTok theo phong cách NhiLe',
    content:
      'Bạn là biên tập viên video cho kênh NhiLe. Hãy viết caption TikTok 2-3 câu cho video về [chủ đề], giọng cảm xúc gần gũi, mở đầu giật trong 3 giây, kết bằng câu hỏi mở, kèm 3-5 hashtag.',
    team: 'NhiLe',
    category: 'Talkshow/Podcast',
    author: 'Nhi',
    tags: ['caption', 'tiktok'],
    createdAt: now - 2 * min,
  },
  {
    id: 'p_mock_2',
    title: 'Mô tả video giới thiệu chùa Thiên Mụ',
    content:
      'Bạn là hướng dẫn viên du lịch Huế. Viết đoạn mô tả 4-5 câu giới thiệu chùa Thiên Mụ cho video ngắn, giọng trầm ấm, nêu 1 chi tiết lịch sử ít người biết, kết bằng lời mời ghé thăm.',
    team: 'Ms. Nhi',
    category: 'Du lịch & Văn hoá',
    author: 'Team Du lịch',
    tags: ['du lịch', 'huế', 'video'],
    createdAt: now - 30 * min,
  },
  {
    id: 'p_mock_3',
    title: 'Soạn checklist đào tạo nhân viên mới',
    content:
      'Bạn là trưởng phòng đào tạo NhiLe Team. Soạn checklist onboarding 7 ngày đầu cho nhân viên editor mới: mục tiêu từng ngày, tài liệu cần đọc, người phụ trách, tiêu chí hoàn thành.',
    team: 'NhiLe Team',
    category: 'Đào tạo nội bộ',
    author: 'Sơn',
    tags: ['onboarding', 'checklist'],
    createdAt: now - 3 * 60 * min,
  },
  {
    id: 'p_mock_4',
    title: 'Câu hỏi phản tư phát triển bản thân cuối tuần',
    content:
      'Đóng vai coach phát triển bản thân. Đặt cho tôi 5 câu hỏi phản tư sâu để review lại một tuần đã qua, tập trung vào bài học và điều muốn thay đổi tuần tới. Giọng nhẹ nhàng, không phán xét.',
    team: 'Chung',
    category: 'Phát triển bản thân',
    author: 'AI gợi ý',
    tags: ['ai-generated', 'reflection'],
    createdAt: now - 24 * 60 * min,
  },
];
