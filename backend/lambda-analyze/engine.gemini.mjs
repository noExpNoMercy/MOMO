// Phiên bản Gemini của engine.mjs — CÙNG interface, khác provider.
// Dùng để eval khi chưa có Anthropic API key (Gemini có free tier tại aistudio.google.com).
// API key: đặt GEMINI_API_KEY trong .env (KHÔNG dùng ANTHROPIC_API_KEY).
// Chạy eval: ENGINE=gemini npm run eval
//
// File gốc (engine.mjs) giữ nguyên — đây là file mới, không thay thế.

import { GoogleGenerativeAI } from "@google/generative-ai";
import { readFileSync } from "node:fs";
import { loadTacticMap, normalizeAnalyze, normalizeM3 } from "./normalize.mjs";

const read = (file) => readFileSync(new URL(`./generated/${file}`, import.meta.url), "utf8");

const A9_SYSTEM = read("a9_system_prompt.md");
const M3_SYSTEM = read("m3_system_prompt.md");
const ANALYZE_SCHEMA = JSON.parse(read("analyze.schema.json"));
const M3_SCHEMA = JSON.parse(read("m3.schema.json"));
const VERSIONS = JSON.parse(read("prompt_versions.json"));
const TACTIC_MAP = loadTacticMap(JSON.parse(read("tactics.json")));

export const DEFAULT_MODEL = "gemini-2.0-flash"; // free tier, nhanh

export class EngineError extends Error {
  constructor(code, message, options) {
    super(message, options);
    this.name = "EngineError";
    this.code = code;
  }
}

let genAI;
function getClient() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new EngineError("LLM_ERROR", "Thiếu GEMINI_API_KEY trong .env");
  genAI ??= new GoogleGenerativeAI(key);
  return genAI;
}

const modelId = () => process.env.MODEL_ID || DEFAULT_MODEL;

// Gemini responseSchema không hỗ trợ $schema, additionalProperties, $defs — strip đệ quy
function toGeminiSchema(node) {
  if (typeof node !== "object" || node === null || Array.isArray(node)) return node;
  const { $schema, additionalProperties, $defs, definitions, ...rest } = node;
  if (rest.properties) {
    rest.properties = Object.fromEntries(
      Object.entries(rest.properties).map(([k, v]) => [k, toGeminiSchema(v)])
    );
  }
  if (rest.items) rest.items = toGeminiSchema(rest.items);
  return rest;
}

async function callJson({ system, user, schema }) {
  const model = modelId();
  const geminiModel = getClient().getGenerativeModel({
    model,
    systemInstruction: system,
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: toGeminiSchema(schema),
    },
  });

  let response;
  try {
    response = await geminiModel.generateContent(user);
  } catch (error) {
    throw new EngineError("LLM_ERROR", `Gemini API: ${error?.message ?? "Error"}`, { cause: error });
  }

  const candidate = response.response.candidates?.[0];
  if (!candidate) {
    throw new EngineError("LLM_REFUSED", "Gemini không trả về candidate nào");
  }

  const finishReason = candidate.finishReason;
  if (finishReason === "SAFETY") throw new EngineError("LLM_REFUSED", "safety filter");
  if (finishReason === "MAX_TOKENS") throw new EngineError("LLM_TRUNCATED", "finishReason MAX_TOKENS");

  const text = response.response.text();
  try {
    return { data: JSON.parse(text), model, usage: response.response.usageMetadata };
  } catch {
    throw new EngineError("LLM_ERROR", "Gemini trả về JSON không hợp lệ");
  }
}

export async function analyze(conversation) {
  const conv = String(conversation).normalize("NFC").trim();
  const user = `Phân tích đoạn hội thoại dưới đây.\n<hoi_thoai>\n${conv}\n</hoi_thoai>`;
  const { data, model, usage } = await callJson({ system: A9_SYSTEM, user, schema: ANALYZE_SCHEMA });
  return { result: normalizeAnalyze(data, conv, TACTIC_MAP), model, prompt_version: VERSIONS.a9, usage };
}

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
  if (!result) throw new EngineError("LLM_ERROR", "Gemini trả về reply rỗng");
  return { result, model, prompt_version: VERSIONS.m3, usage };
}
