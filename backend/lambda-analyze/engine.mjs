// Chủ: Khánh. Gọi Claude cho A9 (analyze) và M3 (m3Reply).
// Ranh giới với index.mjs (của Nam): file này CHỈ export analyze(), m3Reply(), EngineError, DEFAULT_MODEL.
// Lỗi luôn ném EngineError với .code ∈ "LLM_ERROR" | "LLM_REFUSED" | "LLM_TRUNCATED".
// Prompt/schema KHÔNG viết ở đây: sửa trong ai/ rồi chạy `py ai/scripts/build_prompt.py`.

import Anthropic from "@anthropic-ai/sdk";
import { readFileSync } from "node:fs";
import { loadTacticMap, normalizeAnalyze, normalizeM3 } from "./normalize.mjs";

const read = (file) => readFileSync(new URL(`./generated/${file}`, import.meta.url), "utf8");

const A9_SYSTEM = read("a9_system_prompt.md");
const M3_SYSTEM = read("m3_system_prompt.md");
const ANALYZE_SCHEMA = JSON.parse(read("analyze.schema.json"));
const M3_SCHEMA = JSON.parse(read("m3.schema.json"));
const VERSIONS = JSON.parse(read("prompt_versions.json"));
const TACTIC_MAP = loadTacticMap(JSON.parse(read("tactics.json")));

export const DEFAULT_MODEL = "claude-haiku-5-5"; // model lúc dev; đổi bằng biến môi trường MODEL_ID, không sửa code
const MAX_TOKENS = 4096; // thinking (bật mặc định trên model 5.5) cũng tính vào đây, đặt thấp sẽ ra LLM_TRUNCATED
const SDK_TIMEOUT_MS = 12_000; // chuỗi timeout: SDK 12s < client 15s < Lambda 30s = trần API Gateway
// Sonnet/Opus 5.5 có fallback phía server khi bị từ chối; Haiku 5.5 thì không
const SERVER_FALLBACK = /^claude-(opus|sonnet)-5-5$/;

export class EngineError extends Error {
  constructor(code, message, options) {
    super(message, options);
    this.name = "EngineError";
    this.code = code;
  }
}

let client;
function getClient() {
  // Tạo khi cần: chế độ mock và test không cần ANTHROPIC_API_KEY.
  // TS SDK tính timeout bằng mili giây; maxRetries 0 vì mỗi lần retry cộng thêm 1 timeout.
  client ??= new Anthropic({ timeout: SDK_TIMEOUT_MS, maxRetries: 0 });
  return client;
}

const modelId = () => process.env.MODEL_ID || DEFAULT_MODEL;

async function callJson({ system, user, schema }) {
  const model = modelId();
  const params = {
    model,
    max_tokens: MAX_TOKENS,
    // System prompt cố định đặt đầu + cache_control → từ lần gọi thứ 2 (trong 5 phút) rẻ và nhanh hơn
    system: [{ type: "text", text: system, cache_control: { type: "ephemeral" } }],
    messages: [{ role: "user", content: user }],
    output_config: { effort: "low", format: { type: "json_schema", schema } },
  };

  let response;
  try {
    response = SERVER_FALLBACK.test(model)
      ? await getClient().beta.messages.create({
          ...params,
          betas: ["server-side-fallback-2026-07-01"],
          fallbacks: "default",
        })
      : await getClient().messages.create(params);
  } catch (error) {
    const status = error instanceof Anthropic.APIError ? ` ${error.status ?? ""}` : "";
    throw new EngineError("LLM_ERROR", `Anthropic API: ${error?.constructor?.name ?? "Error"}${status}`.trim(), {
      cause: error,
    });
  }

  // Luôn đọc stop_reason TRƯỚC khi parse
  if (response.stop_reason === "refusal") {
    throw new EngineError("LLM_REFUSED", `refusal (${response.stop_details?.category ?? "unknown"})`);
  }
  if (response.stop_reason === "max_tokens") {
    throw new EngineError("LLM_TRUNCATED", "stop_reason max_tokens");
  }

  const text = response.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("");
  try {
    return { data: JSON.parse(text), model: response.model ?? model, usage: response.usage };
  } catch {
    throw new EngineError("LLM_ERROR", "model trả về JSON không hợp lệ");
  }
}

/**
 * A9 Radar. `conversation` theo định dạng mục 1.2 của QUY_UOC_CHUNG.
 * @returns {Promise<{result: object, model: string, prompt_version: string, usage?: object}>}
 */
export async function analyze(conversation) {
  const conv = String(conversation).normalize("NFC").trim();
  const user = `Phân tích đoạn hội thoại dưới đây.\n<hoi_thoai>\n${conv}\n</hoi_thoai>`;
  const { data, model, usage } = await callJson({ system: A9_SYSTEM, user, schema: ANALYZE_SCHEMA });
  return { result: normalizeAnalyze(data, conv, TACTIC_MAP), model, prompt_version: VERSIONS.a9, usage };
}

/**
 * M3 "Đấu với chính mình". Input đã được validate.mjs kiểm.
 * @param {{conversation: string, tactics: object[], amount_vnd: number, history: {role: string, content: string}[], user_reason: string}} input
 */
export async function m3Reply({ conversation, tactics, amount_vnd, history, user_reason }) {
  const known = tactics.filter((t) => TACTIC_MAP.has(t.id));
  const tacticLines = known.length
    ? known.map((t) => `- ${t.id} · ${TACTIC_MAP.get(t.id).name}: "${t.evidence ?? ""}"`).join("\n")
    : "(không có)";
  const historyLines = history.length
    ? history.map((h) => `${h.role === "user" ? "Người dùng" : "Bạn (ngày mai)"}: ${h.content}`).join("\n")
    : "(chưa có)";

  const user = [
    `<hoi_thoai>\n${String(conversation).normalize("NFC").trim()}\n</hoi_thoai>`,
    `<thu_thuat_da_phat_hien>\n${tacticLines}\n</thu_thuat_da_phat_hien>`,
    `<so_tien>${amount_vnd.toLocaleString("vi-VN")} đồng</so_tien>`,
    `<cac_luot_truoc>\n${historyLines}\n</cac_luot_truoc>`,
    `<ly_do_moi_cua_nguoi_dung>\n${user_reason}\n</ly_do_moi_cua_nguoi_dung>`,
  ].join("\n\n");

  const { data, model, usage } = await callJson({ system: M3_SYSTEM, user, schema: M3_SCHEMA });
  const result = normalizeM3(
    data,
    known.map((t) => t.id),
  );
  if (!result) throw new EngineError("LLM_ERROR", "model trả về reply rỗng");
  return { result, model, prompt_version: VERSIONS.m3, usage };
}
