// Chủ: Văn. Hội thoại có tô màu theo highlights; màu lấy theo group của thủ thuật.
import type { Highlight, Tactic } from "@/lib/types";
import { toSegments } from "@/lib/highlight";
import { GROUP_STYLE } from "./theme";

type Props = { conversation: string; highlights: Highlight[]; tactics: Tactic[] };

export default function HighlightedText({ conversation, highlights, tactics }: Props) {
  const byId = new Map(tactics.map((t) => [t.id, t]));
  return (
    <p className="whitespace-pre-wrap rounded-lg bg-zinc-50 p-3 leading-7">
      {toSegments(conversation, highlights).map((seg, i) => {
        const tactic = seg.tactic_id ? byId.get(seg.tactic_id) : undefined;
        if (!tactic) return <span key={i}>{seg.text}</span>;
        return (
          <mark key={i} title={tactic.name} className={`rounded px-0.5 ${GROUP_STYLE[tactic.group].mark}`}>
            {seg.text}
          </mark>
        );
      })}
    </p>
  );
}
