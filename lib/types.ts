// HỢP ĐỒNG CHUNG — chủ: Khánh. Xem docs/QUY_UOC_CHUNG.md mục 1.
// Sửa file này thì sửa analyze.schema.json + lib/mock/* + docs/QUY_UOC_CHUNG.md trong CÙNG 1 PR,
// có 👍 của 2 người còn lại.
// Tên field giữ snake_case y hệt JSON. KHÔNG đổi sang camelCase ở bất kỳ đâu.

export type TacticId = string; // "T01".."T40", không bao giờ đánh số lại
export type TacticGroup = "A" | "B" | "C" | "D" | "E" | "F";

export type Tactic = {
  id: TacticId;
  name: string; // server điền lại theo bản đồ thủ thuật, UI chỉ hiển thị
  group: TacticGroup; // server điền theo bản đồ, UI tô màu theo trường này
  evidence: string; // chuỗi con nguyên văn của conversation (đã NFC)
  explanation: string;
};

export type Highlight = {
  text: string; // chuỗi con nguyên văn của conversation (đã NFC)
  tactic_id: TacticId; // luôn có trong result.tactics
};

// ---------- POST /analyze ----------

export type AnalyzeRequest = {
  conversation: string; // mỗi tin một dòng "<Tên>: <nội dung>", 1–3000 ký tự
};

export type AnalyzeResult = {
  risk_score: number; // integer 0–100
  tactics: Tactic[]; // 0–6, nguy hiểm nhất đứng đầu
  translation: string; // luôn có nội dung, không kèm nhãn "Câu này nghĩa là:"
  highlights: Highlight[]; // 0–10; tactics rỗng thì highlights rỗng
};

// ---------- Khung chung ----------

export type Meta = {
  request_id: string;
  latency_ms: number;
  model: string;
  prompt_version: string;
  source: "live" | "mock" | "cache";
};

export type ErrorCode =
  | "BAD_REQUEST"
  | "TOO_LARGE"
  | "RATE_LIMITED"
  | "LLM_ERROR"
  | "LLM_REFUSED"
  | "LLM_TRUNCATED"
  | "INTERNAL"
  | "TIMEOUT" // chỉ lib/api.ts sinh ra
  | "NETWORK_ERROR"; // chỉ lib/api.ts sinh ra

export type ApiError = {
  code: ErrorCode;
  message: string; // cho dev đọc, KHÔNG hiển thị lên UI
};

export type ApiResponse<T> =
  | { ok: true; result: T; meta: Meta }
  | { ok: false; error: ApiError; meta?: { request_id: string } };

export type AnalyzeResponse = ApiResponse<AnalyzeResult>;

// ---------- POST /m3 ----------

export type M3Turn = {
  role: "user" | "assistant";
  content: string;
};

export type M3Request = {
  conversation: string;
  tactics: Tactic[]; // chép nguyên result.tactics của lần /analyze gần nhất
  amount_vnd: number; // integer > 0
  history: M3Turn[]; // tối đa 10, không gồm user_reason hiện tại
  user_reason: string; // 15–500 ký tự
};

export type M3Result = {
  reply: string;
  signs_used: TacticId[]; // tập con các id trong M3Request.tactics
};

export type M3Response = ApiResponse<M3Result>;
