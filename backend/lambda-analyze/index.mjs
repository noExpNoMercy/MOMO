// Chủ: Nam. Handler AWS Lambda cho API Gateway HTTP API (payload v2), stage $default.
// Lo: route, validate, khung response {ok, result|error, meta}, mã lỗi, LLM_MODE, log số liệu.
// KHÔNG gọi Claude trực tiếp (đó là engine.mjs của Khánh). KHÔNG đặt header CORS (CORS cấu hình ở API Gateway).

import { existsSync, readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { analyze, m3Reply, EngineError } from "./engine.mjs";
import { parseBody, validateAnalyze, validateM3, RequestError } from "./validate.mjs";

const STATUS_BY_CODE = {
  BAD_REQUEST: 400,
  TOO_LARGE: 413,
  RATE_LIMITED: 429,
  LLM_ERROR: 502,
  LLM_REFUSED: 502,
  LLM_TRUNCATED: 502,
  INTERNAL: 500,
};

const isMock = () => process.env.LLM_MODE === "mock";

/** Mock lấy từ lib/mock/ (khi chạy trong repo) hoặc fixtures/ (trong gói zip, do infra/package_lambda chép vào). */
function fixtureResult(file) {
  for (const candidate of [`./fixtures/${file}`, `../../lib/mock/${file}`]) {
    const url = new URL(candidate, import.meta.url);
    if (existsSync(url)) return JSON.parse(readFileSync(url, "utf8")).result;
  }
  throw new Error(`không tìm thấy fixture ${file}`);
}

const ROUTES = {
  "/analyze": async (body) => {
    const { conversation } = validateAnalyze(body);
    if (isMock()) return { result: fixtureResult("analyze_high.json"), model: "mock", prompt_version: "mock" };
    return analyze(conversation);
  },
  "/m3": async (body) => {
    const input = validateM3(body);
    if (isMock()) return { result: fixtureResult("m3_reply.json"), model: "mock", prompt_version: "mock" };
    return m3Reply(input);
  },
};

const json = (statusCode, payload) => ({
  statusCode,
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify(payload),
});

export async function handler(event, context) {
  const started = Date.now();
  const request_id = context?.awsRequestId ?? randomUUID();
  const method = event?.requestContext?.http?.method ?? event?.httpMethod ?? "POST";
  const path = event?.rawPath ?? event?.path ?? "";
  if (method === "OPTIONS") return { statusCode: 204, headers: {}, body: "" };

  // Khớp cả khi có tiền tố stage (/prod/analyze), dù quy ước là stage $default
  const routeKey = Object.keys(ROUTES).find((r) => path === r || path.endsWith(r));
  let status = 200;
  let code = null;
  let model = null;
  let nTactics = null;

  try {
    if (!routeKey || method !== "POST") throw new RequestError("BAD_REQUEST", 404, `không có route ${method} ${path}`);
    const body = parseBody(event);
    const out = await ROUTES[routeKey](body);
    model = out.model;
    nTactics = Array.isArray(out.result?.tactics) ? out.result.tactics.length : null;
    return json(200, {
      ok: true,
      result: out.result,
      meta: {
        request_id,
        latency_ms: Date.now() - started,
        model: out.model,
        prompt_version: out.prompt_version,
        source: isMock() ? "mock" : "live",
      },
    });
  } catch (error) {
    const known = error instanceof RequestError || error instanceof EngineError;
    code = known ? error.code : "INTERNAL";
    status = error instanceof RequestError ? error.status : (STATUS_BY_CODE[code] ?? 500);
    if (!known) console.error("INTERNAL", request_id, error?.stack ?? error);
    return json(status, {
      ok: false,
      error: { code, message: known ? error.message : "lỗi không mong đợi, xem CloudWatch theo request_id" },
      meta: { request_id },
    });
  } finally {
    // Chỉ log số liệu, KHÔNG BAO GIỜ log nội dung tin nhắn
    console.log(
      JSON.stringify({
        request_id,
        route: routeKey ?? path,
        status,
        code,
        latency_ms: Date.now() - started,
        model,
        n_tactics: nTactics,
        mode: isMock() ? "mock" : "live",
      }),
    );
  }
}
