// Chủ: Nam. CHỈ service worker gọi API (nhờ host_permissions nên không vướng CORS).
// Nhận { type: "ANALYZE_REQUEST", conversation } từ content script,
// trả { type: "ANALYZE_RESPONSE", response } với response là nguyên khung {ok, result|error, meta}.
importScripts("config.js");

const fail = (code, message = code) => ({ ok: false, error: { code, message } });

async function analyze(conversation) {
  const { API_BASE_URL, API_TIMEOUT_MS } = self.LLC_CONFIG;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), API_TIMEOUT_MS);
  try {
    const res = await fetch(`${API_BASE_URL.replace(/\/+$/, "")}/analyze`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ conversation }),
      signal: controller.signal,
    });
    const data = await res.json().catch(() => null);
    if (data && typeof data.ok === "boolean") return data;
    return fail(res.status === 429 ? "RATE_LIMITED" : "NETWORK_ERROR", `HTTP ${res.status}`);
  } catch (error) {
    return controller.signal.aborted ? fail("TIMEOUT") : fail("NETWORK_ERROR", String(error));
  } finally {
    clearTimeout(timer);
  }
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type !== "ANALYZE_REQUEST") return false;
  analyze(message.conversation).then((response) => sendResponse({ type: "ANALYZE_RESPONSE", response }));
  return true; // trả lời bất đồng bộ
});
