// ============================================================
//  Gọi AI để viết prompt giúp người dùng.
//
//  ⚠️ KHÔNG gọi thẳng Anthropic API từ trình duyệt (lộ API key).
//  Frontend gọi endpoint backend (Vercel serverless function
//  /api/suggest-prompt); backend giữ key và gọi Anthropic hộ.
//
//  Backend: api/suggest-prompt.ts
//        POST { idea: string }  ->  { prompt: string }
//
//  Khi chạy `vite dev` ở máy (chưa có serverless function) endpoint
//  sẽ 404 -> tự động fallback sang prompt mẫu để xem luồng UI.
// ============================================================

const AI_API_URL = import.meta.env.VITE_AI_API_URL ?? '/api/suggest-prompt';

export async function suggestPrompt(idea: string): Promise<string> {
  try {
    const res = await fetch(AI_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idea }),
    });
    if (!res.ok) throw new Error(`AI request failed: ${res.status}`);
    const data = (await res.json()) as { prompt: string };
    if (!data.prompt) throw new Error('Empty prompt');
    return data.prompt;
  } catch {
    // Không gọi được backend (vd chạy local chưa có function) -> prompt mẫu.
    await new Promise((r) => setTimeout(r, 400));
    return mockSuggest(idea);
  }
}

/** Prompt giả lập khi chưa gọi được backend — chỉ để demo giao diện. */
function mockSuggest(idea: string): string {
  return `Bạn là chuyên gia sáng tạo nội dung của NhiLe Holdings.

Bối cảnh: ${idea}

Yêu cầu:
- Xác định rõ vai trò và đối tượng người xem.
- Viết nội dung có cấu trúc, giọng văn phù hợp thương hiệu NhiLe.
- Nêu định dạng đầu ra mong muốn (độ dài, số câu, hashtag nếu cần).

Đầu ra: nội dung hoàn chỉnh, sẵn sàng dùng, không giải thích thêm.

(Đây là prompt mẫu do chế độ demo tạo ra — đang chạy ở máy local hoặc chưa cấu hình ANTHROPIC_API_KEY trên Vercel.)`;
}
