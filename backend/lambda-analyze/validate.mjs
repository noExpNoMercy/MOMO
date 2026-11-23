// Chủ: Nam. Kiểm request trước khi tới engine. Có test ở test/handler.test.mjs.
// Giới hạn đồng bộ với lib/config.ts và docs/QUY_UOC_CHUNG.md mục 1.2, 1.4, 1.5.

export const LIMITS = {
  BODY_MAX_BYTES: 10 * 1024,
  CONVERSATION_MAX_CHARS: 3000, // đồng bộ với lib/config.ts
  M3_MIN_REASON_CHARS: 15, // đồng bộ với lib/config.ts
  M3_MAX_REASON_CHARS: 500, // đồng bộ với lib/config.ts
  M3_MAX_HISTORY: 10, // đồng bộ với lib/config.ts
  M3_MAX_TACTICS: 10,
};

export class RequestError extends Error {
  constructor(code, status, message) {
    super(message);
    this.name = "RequestError";
    this.code = code; // "BAD_REQUEST" | "TOO_LARGE"
    this.status = status;
  }
}

const bad = (message) => new RequestError("BAD_REQUEST", 400, message);
const tooLarge = (message) => new RequestError("TOO_LARGE", 413, message);
const isObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v);

/** Đọc body từ event của API Gateway HTTP API (payload v2). */
export function parseBody(event) {
  const raw = event?.body ?? "";
  const text = event?.isBase64Encoded ? Buffer.from(raw, "base64").toString("utf8") : String(raw);
  if (Buffer.byteLength(text, "utf8") > LIMITS.BODY_MAX_BYTES) throw tooLarge("body > 10 KB");
  let body;
  try {
    body = JSON.parse(text);
  } catch {
    throw bad("body không phải JSON hợp lệ");
  }
  if (!isObject(body)) throw bad("body phải là JSON object");
  return body;
}

/** Trả về hội thoại đã chuẩn hoá NFC + trim. */
export function validateConversation(value) {
  if (typeof value !== "string") throw bad("conversation phải là string");
  const conversation = value.normalize("NFC").trim();
  if (!conversation) throw bad("conversation rỗng");
  if (conversation.length > LIMITS.CONVERSATION_MAX_CHARS) throw tooLarge("conversation > 3000 ký tự");
  return conversation;
}

export function validateAnalyze(body) {
  return { conversation: validateConversation(body.conversation) };
}

export function validateM3(body) {
  const conversation = validateConversation(body.conversation);

  if (!Array.isArray(body.tactics) || body.tactics.length > LIMITS.M3_MAX_TACTICS) {
    throw bad("tactics phải là mảng tối đa 10 phần tử (chép nguyên result.tactics của /analyze)");
  }
  const tactics = body.tactics.map((t) => {
    if (!isObject(t) || typeof t.id !== "string") throw bad("mỗi phần tử tactics phải có id dạng string");
    return {
      id: t.id,
      name: String(t.name ?? ""),
      group: String(t.group ?? ""),
      evidence: String(t.evidence ?? ""),
      explanation: String(t.explanation ?? ""),
    };
  });

  if (!Number.isInteger(body.amount_vnd) || body.amount_vnd <= 0) throw bad("amount_vnd phải là số nguyên > 0");

  const history = body.history ?? [];
  if (!Array.isArray(history) || history.length > LIMITS.M3_MAX_HISTORY) {
    throw bad("history phải là mảng tối đa 10 phần tử");
  }
  for (const turn of history) {
    if (!isObject(turn) || !["user", "assistant"].includes(turn.role) || typeof turn.content !== "string") {
      throw bad('mỗi lượt history phải có role "user"|"assistant" và content string');
    }
  }

  if (typeof body.user_reason !== "string") throw bad("user_reason phải là string");
  const user_reason = body.user_reason.normalize("NFC").trim();
  if (user_reason.length < LIMITS.M3_MIN_REASON_CHARS) throw bad("user_reason phải từ 15 ký tự");
  if (user_reason.length > LIMITS.M3_MAX_REASON_CHARS) throw tooLarge("user_reason > 500 ký tự");

  return {
    conversation,
    tactics,
    amount_vnd: body.amount_vnd,
    history: history.map((h) => ({ role: h.role, content: h.content.normalize("NFC") })),
    user_reason,
  };
}
