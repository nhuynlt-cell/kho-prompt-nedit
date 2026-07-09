// ============================================================
//  Gọi AI để viết prompt giúp người dùng.
//
//  ⚠️ KHÔNG gọi thẳng Anthropic API từ trình duyệt (lộ API key).
//  Frontend gọi 1 endpoint backend do IT viết; backend giữ key và
//  gọi Anthropic hộ.
//
//  TODO: API - POST {VITE_AI_API_URL} (mặc định /api/ai/suggest-prompt)
//        Body:  { idea: string }
//        Trả:   { prompt: string }
// ============================================================

const AI_API_URL = import.meta.env.VITE_AI_API_URL ?? '/api/ai/suggest-prompt';

/** Có backend AI thật hay chưa (để UI biết dùng mock hay gọi API) */
export const isAiApiConfigured = Boolean(import.meta.env.VITE_AI_API_URL);

export async function suggestPrompt(idea: string): Promise<string> {
  // Nếu chưa cấu hình endpoint -> trả prompt mẫu để xem luồng UI.
  if (!isAiApiConfigured) {
    await new Promise((r) => setTimeout(r, 700)); // giả lập "đang nghĩ..."
    return mockSuggest(idea);
  }

  // TODO: API - backend nhận { idea } và trả { prompt }
  const res = await fetch(AI_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idea }),
  });
  if (!res.ok) throw new Error('AI request failed');
  const data = (await res.json()) as { prompt: string };
  return data.prompt;
}

/** Prompt giả lập khi chưa có backend — chỉ để demo giao diện. */
function mockSuggest(idea: string): string {
  return `Bạn là chuyên gia sáng tạo nội dung của NhiLe Holdings.

Bối cảnh: ${idea}

Yêu cầu:
- Xác định rõ vai trò và đối tượng người xem.
- Viết nội dung có cấu trúc, giọng văn phù hợp thương hiệu NhiLe.
- Nêu định dạng đầu ra mong muốn (độ dài, số câu, hashtag nếu cần).

Đầu ra: nội dung hoàn chỉnh, sẵn sàng dùng, không giải thích thêm.

(Đây là prompt mẫu do chế độ demo tạo ra — nối backend AI thật để nhận kết quả chất lượng hơn.)`;
}
