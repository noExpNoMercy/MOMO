// Chạy API trên máy, KHÔNG cần AWS: cùng handler với Lambda, thêm CORS để web localhost gọi được.
//   cd backend/lambda-analyze
//   npm run dev                      → http://localhost:8787 (đọc .env nếu có)
// Biến: LLM_MODE=mock (không cần key) | live (cần ANTHROPIC_API_KEY), MODEL_ID, PORT.
// Web dùng: NEXT_PUBLIC_API_BASE_URL=http://localhost:8787, NEXT_PUBLIC_USE_MOCK=0

import { createServer } from "node:http";
import { handler } from "./index.mjs";

const PORT = Number(process.env.PORT || 8787);
// Trên máy mặc định là mock để ai cũng chạy được ngay; trên Lambda thật thì không đặt = live
process.env.LLM_MODE ||= "mock";
const CORS = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "POST, OPTIONS",
  "access-control-allow-headers": "content-type",
};

const server = createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, CORS).end();
    return;
  }
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const event = {
    rawPath: new URL(req.url, "http://localhost").pathname,
    requestContext: { http: { method: req.method } },
    body: Buffer.concat(chunks).toString("utf8"),
    isBase64Encoded: false,
  };
  const out = await handler(event, { awsRequestId: `local-${Date.now()}` });
  res.writeHead(out.statusCode, { ...out.headers, ...CORS }).end(out.body);
});

server.listen(PORT, () => {
  const mode = process.env.LLM_MODE === "mock" ? "mock (không gọi Claude)" : `live, model ${process.env.MODEL_ID || "mặc định"}`;
  console.log(`API local: http://localhost:${PORT}  ·  POST /analyze, POST /m3  ·  chế độ ${mode}`);
  if (process.env.LLM_MODE !== "mock" && !process.env.ANTHROPIC_API_KEY) {
    console.log("⚠ Chưa có ANTHROPIC_API_KEY: gọi /analyze sẽ trả LLM_ERROR. Đặt key trong .env hoặc dùng LLM_MODE=mock.");
  }
});
