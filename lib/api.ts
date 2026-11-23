// Chủ: Nam. Chỗ DUY NHẤT trong web gọi API (docs/QUY_UOC_CHUNG.md mục 2.3). Component không tự gọi fetch.
// - NEXT_PUBLIC_USE_MOCK=1 → đọc lib/mock/*, chọn bằng ?mock=high|medium|low|error trên URL trang
// - Timeout 15s, đổi mọi lỗi mạng / body lạ thành mã chuẩn (TIMEOUT, NETWORK_ERROR, RATE_LIMITED)
// - Lỗi LLM/mạng mà hội thoại có trong demo cache → trả kết quả lưu sẵn, meta.source = "cache" (phương án B6)

import type {
  AnalyzeResponse,
  AnalyzeResult,
  ApiResponse,
  ErrorCode,
  M3Request,
  M3Response,
  M3Result,
} from "./types";
import { API_TIMEOUT_MS } from "./config";
import mockHigh from "./mock/analyze_high.json";
import mockMedium from "./mock/analyze_medium.json";
import mockLow from "./mock/analyze_low.json";
import mockError from "./mock/error_llm.json";
import mockM3 from "./mock/m3_reply.json";
import conversations from "./mock/conversations.json";
import demoCache from "./mock/demo_cache.json";

const BASE = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(/\/+$/, "");
export const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "1";

/** Câu báo lỗi cho người dùng. error.message của API chỉ dành cho dev, không hiển thị. */
export const ERROR_TEXT: Record<ErrorCode, string> = {
  BAD_REQUEST: "Nội dung gửi lên chưa hợp lệ, bạn kiểm tra lại nhé.",
  TOO_LARGE: "Đoạn hội thoại quá dài (tối đa 3000 ký tự).",
  RATE_LIMITED: "Hệ thống đang bận, thử lại sau vài giây.",
  LLM_ERROR: "AI đang gặp sự cố, thử lại sau.",
  LLM_REFUSED: "AI không phân tích được đoạn này.",
  LLM_TRUNCATED: "AI trả lời bị ngắt giữa chừng, thử lại nhé.",
  INTERNAL: "Lỗi hệ thống, thử lại sau.",
  TIMEOUT: "Phân tích quá 15 giây, thử lại nhé.",
  NETWORK_ERROR: "Không kết nối được máy chủ phân tích.",
};
export const errorText = (code: ErrorCode) => ERROR_TEXT[code] ?? ERROR_TEXT.INTERNAL;

/** Hội thoại mẫu khớp với từng mock (để highlight tô đúng chữ khi chạy mock). */
export const SAMPLE_CONVERSATIONS = conversations as Record<"high" | "medium" | "low", string>;

type MockKey = "high" | "medium" | "low" | "error";
const ANALYZE_MOCKS: Record<MockKey, unknown> = { high: mockHigh, medium: mockMedium, low: mockLow, error: mockError };

/** Đọc ?mock= trên URL trang hiện tại (chỉ chạy ở trình duyệt). */
export function currentMockKey(): MockKey {
  if (typeof window === "undefined") return "high";
  const value = new URLSearchParams(window.location.search).get("mock");
  return value === "medium" || value === "low" || value === "error" ? value : "high";
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const fail = (code: ErrorCode, message: string = code) => ({ ok: false as const, error: { code, message } });

async function post<T>(path: string, body: unknown): Promise<ApiResponse<T>> {
  if (!BASE) console.warn("Thiếu NEXT_PUBLIC_API_BASE_URL. Đặt URL API hoặc NEXT_PUBLIC_USE_MOCK=1 trong .env.local");
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), API_TIMEOUT_MS);
  try {
    const res = await fetch(`${BASE}${path}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    const data: unknown = await res.json().catch(() => null);
    if (data && typeof data === "object" && typeof (data as { ok?: unknown }).ok === "boolean") {
      return data as ApiResponse<T>;
    }
    // Không phải khung của mình, ví dụ API Gateway tự trả 429/503
    return fail(res.status === 429 ? "RATE_LIMITED" : "NETWORK_ERROR", `HTTP ${res.status}, body không đúng khung`);
  } catch (error) {
    return controller.signal.aborted ? fail("TIMEOUT") : fail("NETWORK_ERROR", String(error));
  } finally {
    clearTimeout(timer);
  }
}

const CACHE_FALLBACK: ReadonlySet<ErrorCode> = new Set([
  "LLM_ERROR",
  "LLM_REFUSED",
  "LLM_TRUNCATED",
  "TIMEOUT",
  "NETWORK_ERROR",
]);
type DemoCacheEntry = { conversation: string; result: AnalyzeResult };

function fromDemoCache(conversation: string): AnalyzeResponse | null {
  const key = conversation.normalize("NFC").trim();
  const hit = (demoCache as { entries: DemoCacheEntry[] }).entries.find(
    (entry) => entry.conversation.normalize("NFC").trim() === key,
  );
  if (!hit) return null;
  return {
    ok: true,
    result: hit.result,
    meta: { request_id: "cache", latency_ms: 0, model: "cache", prompt_version: "cache", source: "cache" },
  };
}

/** A9: phân tích hội thoại. Luôn trả khung {ok, ...}, không bao giờ throw. */
export async function analyze(conversation: string): Promise<AnalyzeResponse> {
  if (USE_MOCK) {
    await sleep(600);
    return ANALYZE_MOCKS[currentMockKey()] as AnalyzeResponse;
  }
  const res = await post<AnalyzeResult>("/analyze", { conversation });
  if (!res.ok && CACHE_FALLBACK.has(res.error.code)) return fromDemoCache(conversation) ?? res;
  return res;
}

/** M3: một lượt "Đấu với chính mình". Luôn trả khung {ok, ...}, không bao giờ throw. */
export async function m3Reply(request: M3Request): Promise<M3Response> {
  if (USE_MOCK) {
    await sleep(600);
    return (currentMockKey() === "error" ? mockError : mockM3) as M3Response;
  }
  return post<M3Result>("/m3", request);
}
