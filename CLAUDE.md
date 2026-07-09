# kho-prompt-nedit

Dự án cá nhân — chuyển từ mockup HTML (Kho Prompt N-Edit, NhiLe Holdings) sang
**React 19 + Vite + TypeScript + Tailwind 4**. Deploy công khai bằng **Vercel**.

> Ghi chú: đây là bản cá nhân, KHÔNG theo git-flow team NhiLe (Cloudflare + PR).
> Làm việc trực tiếp trên `main`, push lên GitHub cá nhân, Vercel tự deploy.

## Chạy tại máy
```bash
pnpm install
pnpm dev        # http://localhost:5173
```

## Deploy
- Vercel tự build & deploy mỗi khi push lên `main` (framework preset: Vite → build `vite build`, output `dist`).
- Hoặc deploy tay: `vercel --prod`.

## Stack & nguyên tắc code
- React 19 + Vite + TS strict · TanStack Query · Zustand · Tailwind 4.
- Dữ liệu prompt đi qua `src/services/promptService.ts` (mock localStorage khi chưa có `.env`, Supabase khi đã cấu hình). Component KHÔNG gọi Supabase trực tiếp.
- AI gọi backend qua `src/services/aiService.ts` — KHÔNG gọi thẳng Anthropic từ trình duyệt (lộ key). Chưa có backend thì tự dùng prompt mẫu.
- DB field snake_case; TS nội bộ camelCase. TS strict — không `any`/`@ts-ignore`.

## Biến môi trường
Xem `.env.example`. App vẫn chạy được khi chưa điền (dùng mock).
Trên Vercel: thêm biến trong Project Settings → Environment Variables.
