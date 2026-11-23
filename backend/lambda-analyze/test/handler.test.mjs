import { test, before } from "node:test";
import assert from "node:assert/strict";

let handler;
before(async () => {
  process.env.LLM_MODE = "mock"; // không gọi Claude trong test
  ({ handler } = await import("../index.mjs"));
});

const call = async (path, body, { method = "POST", raw = false } = {}) => {
  const out = await handler(
    { rawPath: path, requestContext: { http: { method } }, body: raw ? body : JSON.stringify(body) },
    { awsRequestId: "test-req" },
  );
  return { status: out.statusCode, body: out.body ? JSON.parse(out.body) : null };
};

const M3_OK = {
  conversation: "Mẹ: Con ơi mẹ đang kẹt",
  tactics: [{ id: "T06", name: "Giả danh người thân", group: "B", evidence: "Con ơi mẹ đang kẹt", explanation: "x" }],
  amount_vnd: 20000000,
  history: [],
  user_reason: "Mẹ tôi thật mà, giọng giống lắm",
};

test("/analyze ở chế độ mock trả đúng khung và meta", async () => {
  const { status, body } = await call("/analyze", { conversation: "Mẹ: chuyển gấp 20tr" });
  assert.equal(status, 200);
  assert.equal(body.ok, true);
  assert.deepEqual(Object.keys(body.result).sort(), ["highlights", "risk_score", "tactics", "translation"]);
  assert.deepEqual(body.meta, { request_id: "test-req", latency_ms: body.meta.latency_ms, model: "mock", prompt_version: "mock", source: "mock" });
});

test("khớp route cả khi có tiền tố stage", async () => {
  assert.equal((await call("/prod/analyze", { conversation: "abc" })).status, 200);
});

test("lỗi request có mã và HTTP status đúng hợp đồng", async () => {
  const cases = [
    [await call("/analyze", "{hỏng", { raw: true }), 400, "BAD_REQUEST"],
    [await call("/analyze", { conversation: "   " }), 400, "BAD_REQUEST"],
    [await call("/analyze", { conversation: 123 }), 400, "BAD_REQUEST"],
    [await call("/analyze", { conversation: "a".repeat(3001) }), 413, "TOO_LARGE"],
    [await call("/analyze", { conversation: "ạ".repeat(2900) + "x".repeat(2000) }), 413, "TOO_LARGE"],
    [await call("/khong-co", { conversation: "abc" }), 404, "BAD_REQUEST"],
    [await call("/m3", { ...M3_OK, user_reason: "ngắn" }), 400, "BAD_REQUEST"],
    [await call("/m3", { ...M3_OK, amount_vnd: 0 }), 400, "BAD_REQUEST"],
    [await call("/m3", { ...M3_OK, history: [{ role: "system", content: "x" }] }), 400, "BAD_REQUEST"],
  ];
  for (const [res, status, code] of cases) {
    assert.equal(res.status, status);
    assert.equal(res.body.ok, false);
    assert.equal(res.body.error.code, code);
    assert.equal(res.body.meta.request_id, "test-req");
  }
});

test("3000 ký tự là hợp lệ, field lạ bị bỏ qua", async () => {
  assert.equal((await call("/analyze", { conversation: "a".repeat(3000), extra: 1 })).status, 200);
});

test("/m3 ở chế độ mock trả result {reply, signs_used}", async () => {
  const { status, body } = await call("/m3", M3_OK);
  assert.equal(status, 200);
  assert.deepEqual(Object.keys(body.result).sort(), ["reply", "signs_used"]);
});

test("OPTIONS trả 204", async () => {
  const out = await handler({ rawPath: "/analyze", requestContext: { http: { method: "OPTIONS" } } }, {});
  assert.equal(out.statusCode, 204);
});
