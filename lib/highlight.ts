// Chủ: Văn. Cắt hội thoại thành các đoạn để tô màu, đúng luật UI ở docs/QUY_UOC_CHUNG.md mục 1.3:
// so trên bản NFC, phân biệt hoa thường, tô MỌI vị trí, chồng nhau thì cụm dài hơn thắng, không tìm thấy thì bỏ qua.

import type { Highlight } from "./types";

export type Segment = { text: string; tactic_id: string | null };

export function toSegments(conversation: string, highlights: Highlight[]): Segment[] {
  const text = conversation.normalize("NFC");
  const ranges: { start: number; end: number; tactic_id: string }[] = [];

  for (const h of highlights) {
    const needle = h.text.normalize("NFC");
    if (!needle) continue;
    for (let at = text.indexOf(needle); at !== -1; at = text.indexOf(needle, at + needle.length)) {
      ranges.push({ start: at, end: at + needle.length, tactic_id: h.tactic_id });
    }
  }

  // Cụm dài trước; chỉ nhận cụm không chồng lên cụm đã nhận
  ranges.sort((a, b) => b.end - b.start - (a.end - a.start) || a.start - b.start);
  const chosen: typeof ranges = [];
  for (const r of ranges) {
    if (!chosen.some((c) => r.start < c.end && c.start < r.end)) chosen.push(r);
  }
  chosen.sort((a, b) => a.start - b.start);

  const segments: Segment[] = [];
  let pos = 0;
  for (const c of chosen) {
    if (c.start > pos) segments.push({ text: text.slice(pos, c.start), tactic_id: null });
    segments.push({ text: text.slice(c.start, c.end), tactic_id: c.tactic_id });
    pos = c.end;
  }
  if (pos < text.length) segments.push({ text: text.slice(pos), tactic_id: null });
  return segments;
}
