// Chủ: Văn. Màu theo nhóm thủ thuật (A–F cố định, docs/QUY_UOC_CHUNG.md mục 4.2) và theo khoảng rủi ro.
// Tailwind chỉ sinh CSS cho class viết NGUYÊN chuỗi trong code, nên không ghép tên class bằng biến.

import type { TacticGroup } from "@/lib/types";
import type { RiskBand } from "@/lib/config";

export const GROUP_STYLE: Record<TacticGroup, { label: string; mark: string; chip: string }> = {
  A: { label: "Áp lực & khẩn cấp", mark: "bg-red-200 text-red-950", chip: "bg-red-100 text-red-800" },
  B: { label: "Giả danh & quyền lực", mark: "bg-purple-200 text-purple-950", chip: "bg-purple-100 text-purple-800" },
  C: { label: "Cô lập & bí mật", mark: "bg-orange-200 text-orange-950", chip: "bg-orange-100 text-orange-800" },
  D: { label: "Cảm xúc", mark: "bg-pink-200 text-pink-950", chip: "bg-pink-100 text-pink-800" },
  E: { label: "Mồi lợi ích", mark: "bg-yellow-200 text-yellow-950", chip: "bg-yellow-100 text-yellow-800" },
  F: { label: "Kỹ thuật hội thoại & thanh toán", mark: "bg-sky-200 text-sky-950", chip: "bg-sky-100 text-sky-800" },
};

export const BAND_STYLE: Record<RiskBand, { label: string; bar: string; text: string }> = {
  clear: { label: "Chưa thấy dấu hiệu rõ", bar: "bg-emerald-500", text: "text-emerald-700" },
  suspicious: { label: "Nghi ngờ", bar: "bg-amber-400", text: "text-amber-700" },
  dangerous: { label: "Nguy hiểm", bar: "bg-orange-500", text: "text-orange-700" },
  critical: { label: "Gần như chắc chắn lừa đảo", bar: "bg-red-600", text: "text-red-700" },
};
