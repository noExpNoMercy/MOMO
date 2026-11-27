// Chủ: Khánh. Hàm thuần (không gọi mạng), có test ở test/normalize.test.mjs.
// Biến output thô của LLM thành `result` ĐÚNG hợp đồng (docs/QUY_UOC_CHUNG.md mục 1.3).
// Structured outputs không ép được min/max, độ dài, số phần tử, chuỗi con → các luật đó nằm ở đây.

import { checkConversationLinks } from "./linkcheck.mjs";

export const MAX_TACTICS = 6;
export const MAX_HIGHLIGHTS = 10;
const FALLBACK_TRANSLATION = "Không đọc được ý đồ rõ ràng từ đoạn hội thoại này.";

/** tactics.json (mảng {id, name, group, weight}) → Map id → {name, group, weight} */
export function loadTacticMap(list) {
  return new Map(list.map((t) => [t.id, { name: t.name, group: t.group, weight: t.weight }]));
}

/**
 * risk_score 0–100 TẤT ĐỊNH: noisy-OR trọng số các thủ thuật ĐÃ có bằng chứng.
 * Mỗi thủ thuật góp một "xác suất lừa" wᵢ; ghép: 100·(1 − Π(1 − wᵢ/100)).
 * Code tự tính (không tin con số model phán) → tái lập được, leo theo độ nặng thủ thuật.
 */
export function scoreFromTactics(tactics, tacticMap) {
  let keep = 1;
  for (const t of tactics) {
    const w = Number(tacticMap.get(t.id)?.weight);
    if (Number.isFinite(w) && w > 0) keep *= 1 - Math.min(w, 100) / 100;
  }
  return Math.round(100 * (1 - keep));
}

const nfc = (v) => (typeof v === "string" ? v.normalize("NFC") : "");

/** Tìm cách viết khớp nguyên văn trong hội thoại: thử bản gốc, rồi bản đã bỏ khoảng trắng 2 đầu. */
function verbatim(text, conversation) {
  const s = nfc(text);
  if (s && conversation.includes(s)) return s;
  const trimmed = s.trim();
  if (trimmed && conversation.includes(trimmed)) return trimmed;
  return null;
}

/**
 * @param {unknown} raw          JSON model trả về (đã đúng schema về kiểu)
 * @param {string} conversation  hội thoại ĐÃ chuẩn hoá NFC + trim
 * @param {Map<string, {name: string, group: string}>} tacticMap
 */
export function normalizeAnalyze(raw, conversation, tacticMap) {
  const data = raw && typeof raw === "object" ? raw : {};

  const tactics = [];
  for (const t of Array.isArray(data.tactics) ? data.tactics : []) {
    if (tactics.length >= MAX_TACTICS) break;
    const canonical = tacticMap.get(t?.id);
    if (!canonical || tactics.some((x) => x.id === t.id)) continue;
    const evidence = verbatim(t.evidence, conversation);
    if (!evidence) continue; // không có bằng chứng nguyên văn → bỏ cả thủ thuật
    tactics.push({
      id: t.id,
      name: canonical.name,
      group: canonical.group,
      evidence,
      explanation: nfc(t.explanation).trim(),
    });
  }

  // Tầng 1 phòng hộ link (luật tất định, không cần model): link đáng ngờ model bỏ sót → bổ sung T35.
  if (tactics.length < MAX_TACTICS && !tactics.some((t) => t.id === "T35")) {
    const link = checkConversationLinks(conversation);
    if (link.verdict !== "clean") {
      const canonical = tacticMap.get("T35");
      const ev = canonical ? verbatim(link.flagged[0].url, conversation) : null;
      if (canonical && ev) {
        tactics.push({
          id: "T35",
          name: canonical.name,
          group: canonical.group,
          evidence: ev,
          explanation: `Đường link này ${link.flagged[0].reasons[0]}.`.slice(0, 160),
        });
      }
    }
  }

  // Điểm tất định tính từ thủ thuật có bằng chứng, KHÔNG dùng data.risk_score của model.
  const risk_score = scoreFromTactics(tactics, tacticMap);

  const ids = new Set(tactics.map((t) => t.id));
  const seen = new Set();
  const highlights = [];
  const push = (text, tactic_id) => {
    const key = `${tactic_id}\u0000${text}`;
    if (seen.has(key)) return;
    seen.add(key);
    highlights.push({ text, tactic_id });
  };
  // Bằng chứng của từng thủ thuật luôn có mặt và được ưu tiên trước khi cắt còn MAX_HIGHLIGHTS
  for (const t of tactics) push(t.evidence, t.id);
  for (const h of Array.isArray(data.highlights) ? data.highlights : []) {
    const text = verbatim(h?.text, conversation);
    if (text && ids.has(h.tactic_id)) push(text, h.tactic_id);
  }

  const translation = nfc(data.translation).trim() || FALLBACK_TRANSLATION;

  return {
    risk_score,
    tactics,
    translation,
    highlights: tactics.length ? highlights.slice(0, MAX_HIGHLIGHTS) : [],
  };
}

/**
 * @param {unknown} raw
 * @param {string[]} allowedIds  id các thủ thuật client gửi lên
 * @returns {{reply: string, signs_used: string[]} | null}  null nếu reply rỗng
 */
export function normalizeM3(raw, allowedIds) {
  const data = raw && typeof raw === "object" ? raw : {};
  const reply = nfc(data.reply).trim();
  if (!reply) return null;
  const allowed = new Set(allowedIds);
  const signs_used = [...new Set(Array.isArray(data.signs_used) ? data.signs_used : [])].filter((id) =>
    allowed.has(id),
  );
  return { reply, signs_used };
}
