// Chủ: Nam. Cấu hình dùng chung cho service worker và content script (cả hai đều nạp file này).
// API_BASE_URL phải trùng NEXT_PUBLIC_API_BASE_URL của web, và domain phải có trong host_permissions của manifest.json.
self.LLC_CONFIG = {
  API_BASE_URL: "http://localhost:8787", // đổi sang https://<api-id>.execute-api.<region>.amazonaws.com khi đã deploy
  RISK_ALERT: 50, // đồng bộ với lib/config.ts (≥ 50 mới hiện overlay)
  RISK_BRAKE: 70, // đồng bộ với lib/config.ts (màu cam)
  RISK_M3: 85, // đồng bộ với lib/config.ts (màu đỏ)
  API_TIMEOUT_MS: 15000, // đồng bộ với lib/config.ts
  MAX_MESSAGES: 15,
  MAX_CHARS: 3000,
  MIN_INTERVAL_MS: 2000,
};
