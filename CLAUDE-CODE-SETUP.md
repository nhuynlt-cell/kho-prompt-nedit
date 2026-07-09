# 🚀 CLAUDE-CODE-SETUP — Kho Prompt N-Edit

Hướng dẫn cho **vibe coder (non-tech)** để chạy dự án này trong Claude Code.
Dự án đã convert xong từ mockup HTML → **React + TypeScript + Tailwind** (chuẩn NhiLe FE).
Bạn chỉ cần làm theo 3 bước là xem được giao diện chạy thật.

> Ngay cả khi CHƯA điền gì vào `.env`, app vẫn **chạy được bằng dữ liệu giả (mock)** để bạn xem trước giao diện. Supabase và AI chỉ cần khi muốn dùng thật.

---

## 1. 📁 Cấu trúc thư mục

```
kho-prompt-nedit/
├── index.html                 # điểm vào (mount React)
├── package.json               # danh sách package + lệnh chạy
├── vite.config.ts             # cấu hình build (đã set alias @ = src)
├── tsconfig.json              # cấu hình TypeScript
├── .env.example               # mẫu biến môi trường — copy thành .env
├── .gitignore
├── .gitattributes
├── CLAUDE.md                  # ⭐ Git Flow NhiLe (đọc trước khi commit/push)
├── CLAUDE-CODE-SETUP.md       # file này
├── .husky/                    # hook chặn commit/push nhầm vào dev/main
│   ├── pre-commit
│   └── pre-push
└── src/
    ├── main.tsx               # bootstrap: React + TanStack Query
    ├── index.css              # toàn bộ style (giữ nguyên UI từ mockup)
    ├── App.tsx                # màn hình chính, ghép mọi component lại
    ├── vite-env.d.ts          # khai báo kiểu cho biến môi trường
    ├── types/
    │   └── index.ts           # tất cả TypeScript interface (Prompt, Team...)
    ├── data/
    │   ├── constants.ts       # danh sách kênh, loại nội dung, style, prompt mẫu
    │   └── mockPrompts.ts     # DỮ LIỆU GIẢ để xem giao diện (thay khi có Supabase)
    ├── lib/
    │   └── supabaseClient.ts  # kết nối Supabase (null nếu chưa cấu hình)
    ├── services/
    │   ├── promptService.ts   # đọc/ghi prompt (mock ↔ Supabase) — TODO: SUPABASE
    │   └── aiService.ts       # gọi AI viết prompt giúp        — TODO: API
    ├── store/
    │   └── uiStore.ts         # trạng thái UI dùng chung (lọc, tìm kiếm, toast)
    ├── hooks/
    │   └── usePrompts.ts      # hook lấy/thêm/sửa/xoá prompt (TanStack Query)
    ├── utils/
    │   └── text.ts            # bỏ dấu tiếng Việt để tìm kiếm, sinh id
    └── components/
        ├── Header.tsx         # thanh trên cùng (tên + nút Thêm/Cách dùng)
        ├── Sidebar.tsx        # cột trái: lọc theo Kênh / Loại nội dung + đếm số
        ├── ExplainBanner.tsx  # banner "Prompt là gì?"
        ├── SearchBar.tsx      # ô tìm kiếm
        ├── PromptGrid.tsx     # lưới thẻ prompt
        ├── PromptCard.tsx     # 1 thẻ prompt
        ├── EmptyState.tsx     # khi không có prompt nào
        ├── AiHelperCard.tsx   # ô "Nhờ AI viết giúp"
        ├── Toast.tsx          # thông báo nhỏ dưới màn hình
        └── modals/
            ├── PromptFormModal.tsx    # cửa sổ Thêm / Sửa prompt
            ├── PromptDetailModal.tsx  # cửa sổ xem chi tiết + Xoá
            └── IntroModal.tsx         # cửa sổ hướng dẫn lần đầu
```

---

## 2. 📦 Package cần cài

Dự án dùng **pnpm** (chuẩn NhiLe). Chỉ cần chạy **một lệnh** ở dưới (Bước 1) là cài hết —
danh sách đây chỉ để bạn biết mình đang dùng gì:

**Chạy chính (dependencies):**
```
react  react-dom            # thư viện giao diện
@tanstack/react-query       # lấy dữ liệu (prompt) gọn gàng
zustand                     # lưu trạng thái lọc / tìm kiếm / toast
@supabase/supabase-js       # kết nối cơ sở dữ liệu Supabase
```

**Chỉ dùng khi lập trình (devDependencies):**
```
vite  @vitejs/plugin-react  # công cụ chạy & build nhanh
typescript  @types/react  @types/react-dom
tailwindcss  @tailwindcss/vite   # style
husky                       # hook chặn commit nhầm dev/main
```

> Nếu máy chưa có pnpm: `npm install -g pnpm` (một lần duy nhất).

---

## 3. 🔑 File `.env` (biến môi trường)

Copy `.env.example` → `.env` rồi điền. Nội dung mẫu:

```env
# Supabase (nơi lưu prompt của cả team)
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key

# Backend AI ("Nhờ AI viết giúp") — IT viết endpoint này
VITE_AI_API_URL=/api/ai/suggest-prompt

# CHỈ ở server (KHÔNG để ra frontend):
# ANTHROPIC_API_KEY=sk-ant-xxxx
# SUPABASE_SERVICE_ROLE_KEY=...
```

⚠️ **KHÔNG** commit file `.env` lên git (đã chặn sẵn trong `.gitignore`). Chỉ commit `.env.example`.

---

## 4. ▶️ Bắt đầu trong Claude Code terminal (3 bước)

```bash
# Bước 1 — cài package (làm 1 lần)
pnpm install

# Bước 2 — (tuỳ chọn) tạo file .env để dùng Supabase/AI thật.
#          Bỏ qua bước này thì app vẫn chạy bằng dữ liệu giả.
cp .env.example .env      # rồi mở .env điền giá trị

# Bước 3 — chạy thử, mở http://localhost:5173
pnpm dev
```

Muốn nói với Claude Code kiểu tự nhiên, ví dụ:
- *"cài package rồi chạy dự án cho tôi xem"*
- *"commit, push và deploy cho tôi"* → Claude tự tạo branch, commit, push và deploy bản xem thử (xem `CLAUDE.md`).

---

## 5. ✅ Danh sách TODO theo thứ tự ưu tiên

Trong code, mỗi chỗ cần làm thêm đều có ghi chú `// TODO: ...` để dễ tìm.

### 🔴 Ưu tiên 1 — Để dữ liệu lưu thật (cả team thấy chung)
1. **Tạo project Supabase** → lấy `URL` + `anon key` → điền vào `.env`.
2. **Tạo table `prompts`** (SQL ở mục 6 dưới). → `// TODO: SUPABASE` trong `promptService.ts`.
3. Bật **Row Level Security** cho phù hợp (nội bộ team đọc/ghi).
4. Xoá `mockPrompts.ts` khỏi luồng khi DB đã có dữ liệu thật.

### 🟠 Ưu tiên 2 — Bật tính năng "Nhờ AI viết giúp"
5. **IT viết endpoint** `POST /api/ai/suggest-prompt` (nhận `{ idea }`, trả `{ prompt }`), giữ `ANTHROPIC_API_KEY` ở server. → `// TODO: API` trong `aiService.ts`.
6. Điền `VITE_AI_API_URL` vào `.env`.

### 🟡 Ưu tiên 3 — Hoàn thiện & lên sóng
7. **Đăng nhập** (nếu muốn giới hạn ai được thêm/xoá) — dùng `auth-central` của NhiLe.
8. **Kiểm tra responsive trên điện thoại** → các chỗ `// TODO: MOBILE` trong `index.css`.
9. **Deploy** công khai bằng Vercel: push lên `main` là Vercel tự build, hoặc `vercel --prod`. Nhớ thêm các biến `VITE_*` trong Vercel → Project Settings → Environment Variables.

---

## 6. 🗄️ SQL tạo table Supabase (dán vào Supabase SQL Editor)

```sql
create table if not exists prompts (
  id          text primary key,
  title       text not null,
  content     text not null,
  team        text not null,
  category    text not null,
  author      text default '',
  tags        text[] default '{}',
  created_at  timestamptz not null default now()
);

-- Bật bảo mật hàng (RLS). Chỉnh policy theo nhu cầu nội bộ team.
alter table prompts enable row level security;

create policy "team đọc tất cả" on prompts
  for select using (true);

create policy "team thêm/sửa/xoá" on prompts
  for all using (true) with check (true);
```

> Lưu ý: `created_at` ở DB là snake_case; trong code TS là `createdAt` — `promptService.ts` đã tự chuyển đổi.
