// ============================================================
//  Kiểu dữ liệu (TypeScript interfaces) cho toàn dự án Kho Prompt
// ============================================================

/** Kênh / team sở hữu prompt */
export type Team = 'NhiLe' | 'Ms. Nhi' | 'NhiLe Team' | 'Spice & Nice' | 'Chung';

/** Loại nội dung của prompt */
export type Category =
  | 'Talkshow/Podcast'
  | 'Du lịch & Văn hoá'
  | 'Đào tạo nội bộ'
  | 'Phát triển bản thân'
  | 'Khác';

/** Một prompt trong kho.
 *  TODO: SUPABASE - table `prompts` (mỗi field dưới đây là 1 cột).
 *  Lưu ý contract API dùng snake_case (created_at), TS nội bộ camelCase (createdAt). */
export interface Prompt {
  id: string;
  title: string;
  content: string;
  team: Team;
  category: Category;
  author: string;
  tags: string[];
  createdAt: number; // epoch ms
}

/** Dữ liệu tạo/sửa prompt (chưa có id / createdAt) */
export interface PromptInput {
  title: string;
  content: string;
  team: Team;
  category: Category;
  author: string;
  tags: string[];
}

/** Style hiển thị theo từng loại nội dung */
export interface CategoryStyle {
  label: string;
  icon: string;
  color: string;
  bg: string;
  iconBg: string;
}

/** Bộ lọc — có thêm 'all' cho "Tất cả" */
export type TeamFilter = Team | 'all';
export type CategoryFilter = Category | 'all';
