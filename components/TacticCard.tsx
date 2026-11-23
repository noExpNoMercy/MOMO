// Chủ: Văn. Thẻ một thủ thuật: name, evidence, explanation (name luôn lấy từ API, không tự tra).
import type { Tactic } from "@/lib/types";
import { GROUP_STYLE } from "./theme";

export default function TacticCard({ tactic }: { tactic: Tactic }) {
  const style = GROUP_STYLE[tactic.group];
  return (
    <li className="rounded-lg border border-zinc-200 p-3">
      <div className="flex items-center gap-2">
        <span className={`rounded px-2 py-0.5 text-xs font-medium ${style.chip}`}>{style.label}</span>
        <span className="font-semibold">{tactic.name}</span>
      </div>
      <p className="mt-1 text-sm italic text-zinc-600">&ldquo;{tactic.evidence}&rdquo;</p>
      <p className="mt-1 text-sm">{tactic.explanation}</p>
    </li>
  );
}
