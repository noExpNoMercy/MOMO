// HỢP ĐỒNG CHUNG — chủ: Khánh. Xem docs/QUY_UOC_CHUNG.md mục 1.6.
// Component KHÔNG viết số ngưỡng trực tiếp, luôn import từ file này.
// Lambda (backend/lambda-analyze/index.mjs) và extension/config.js chép lại các số cần dùng,
// kèm comment "đồng bộ với lib/config.ts".

// ---------- Ngưỡng rủi ro ----------
export const RISK_ALERT = 50; // ≥ 50: Radar cảnh báo, Extension hiện overlay, tính là "Lừa đảo" khi đo accuracy
export const RISK_BRAKE = 70; // ≥ 70: M1 phanh khi bấm Chuyển tiền
export const RISK_M3 = 85; // ≥ 85: sau phanh, bắt qua M3

export type RiskBand = "clear" | "suspicious" | "dangerous" | "critical";

/** Khoảng màu của RiskMeter. clear = xanh, suspicious = vàng, dangerous = cam, critical = đỏ. */
export function riskBand(score: number): RiskBand {
  if (score >= RISK_M3) return "critical";
  if (score >= RISK_BRAKE) return "dangerous";
  if (score >= RISK_ALERT) return "suspicious";
  return "clear";
}

// ---------- M1 / M3 ----------
export const FREEZE_SECONDS = 15;
export const M3_MIN_REASON_CHARS = 15;
export const M3_MAX_REASON_CHARS = 500;
export const M3_MAX_HISTORY = 10;

// ---------- Giới hạn request (Lambda kiểm lại phía server) ----------
export const CONVERSATION_MAX_CHARS = 3000;

// ---------- Chuỗi timeout: SDK 12s < client 15s < Lambda 30s = trần API Gateway ----------
export const API_TIMEOUT_MS = 15_000;
