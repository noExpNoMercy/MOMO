// Chủ: Khánh. Hàm thuần (không gọi mạng), có test ở test/normalize.test.mjs.
// Biến output thô của LLM thành `result` ĐÚNG hợp đồng (docs/QUY_UOC_CHUNG.md mục 1.3).
// Structured outputs không ép được min/max, độ dài, số phần tử, chuỗi con → các luật đó nằm ở đây.

export const MAX_TACTICS = 6;
export const MAX_HIGHLIGHTS = 10;
const FALLBACK_TRANSLATION = "Không đọc được ý đồ rõ ràng từ đoạn hội thoại này.";

/** tactics.json (mảng {id, name, group}) → Map id → {name, group} */
export function loadTacticMap(list) {
  return new Map(list.map((t) => [t.id, { name: t.name, group: t.group }]));
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

  const score = Math.round(Number(data.risk_score));
  const risk_score = Number.isFinite(score) ? Math.min(100, Math.max(0, score)) : 0;

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
