import type { VercelRequest, VercelResponse } from '@vercel/node';

// ============================================================
//  Vercel Serverless Function — "Nhờ AI viết giúp"
//
//  Frontend gọi POST /api/suggest-prompt với { idea }.
//  Function này giữ ANTHROPIC_API_KEY ở server (KHÔNG lộ ra trình duyệt)
//  và gọi Anthropic Messages API hộ, trả về { prompt }.
//
//  Cần biến môi trường ANTHROPIC_API_KEY trên Vercel
//  (Project Settings → Environment Variables).
// ============================================================

// Model: mặc định Opus 4.8 (mạnh nhất). Muốn tiết kiệm chi phí có thể
// đổi sang 'claude-sonnet-5' — vẫn thừa sức cho việc viết prompt.
const MODEL = 'claude-opus-4-8';

export const config = {
  maxDuration: 30, // giây — chừa dư cho 1 lần gọi model
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res
      .status(500)
      .json({ error: 'Server chưa cấu hình ANTHROPIC_API_KEY.' });
  }

  const idea = (req.body?.idea ?? '').toString().trim();
  if (!idea) {
    return res.status(400).json({ error: 'Thiếu "idea".' });
  }

  const userPrompt = `Bạn là chuyên gia viết prompt (prompt engineer) cho đội ngũ sáng tạo nội dung của NhiLe Holdings (video editing, talkshow, du lịch, đào tạo nội bộ, phát triển bản thân).
Dựa trên ý tưởng thô sau đây, hãy viết lại thành MỘT prompt hoàn chỉnh, rõ ràng, có cấu trúc (vai trò, bối cảnh, yêu cầu cụ thể, định dạng đầu ra mong muốn), bằng tiếng Việt, sẵn sàng để đưa thẳng cho AI khác sử dụng.
Chỉ trả về nội dung prompt, không giải thích thêm, không dùng markdown code block.

Ý tưởng thô: "${idea}"`;

  try {
    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1500,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    });

    if (!anthropicRes.ok) {
      const detail = await anthropicRes.text();
      return res
        .status(502)
        .json({ error: 'Anthropic API lỗi.', detail: detail.slice(0, 500) });
    }

    const data = (await anthropicRes.json()) as {
      content?: Array<{ type: string; text?: string }>;
    };
    const prompt = (data.content ?? [])
      .filter((b) => b.type === 'text')
      .map((b) => b.text ?? '')
      .join('\n')
      .trim();

    if (!prompt) {
      return res.status(502).json({ error: 'AI không trả về nội dung.' });
    }

    return res.status(200).json({ prompt });
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Không gọi được AI.', detail: String(err).slice(0, 300) });
  }
}
