// Chủ: Văn. Khung kết quả A9 = RiskMeter + HighlightedText + TacticCard + câu "dịch sang tiếng người".
import type { AnalyzeResult, Meta } from "@/lib/types";
import RiskMeter from "./RiskMeter";
import HighlightedText from "./HighlightedText";
import TacticCard from "./TacticCard";

type Props = { conversation: string; result: AnalyzeResult; meta: Meta };

export default function RadarResult({ conversation, result, meta }: Props) {
  return (
    <section className="space-y-4">
      {meta.source !== "live" && (
        <p className="inline-block rounded bg-zinc-200 px-2 py-0.5 text-xs text-zinc-700">Kết quả minh hoạ</p>
      )}
      <RiskMeter score={result.risk_score} />
      <HighlightedText conversation={conversation} highlights={result.highlights} tactics={result.tactics} />
      <div className="rounded-lg border-l-4 border-zinc-900 bg-zinc-100 p-3">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Câu này nghĩa là:</p>
        <p className="mt-1 text-lg font-medium">{result.translation}</p>
      </div>
      {result.tactics.length > 0 ? (
        <ul className="space-y-2">
          {result.tactics.map((t) => (
            <TacticCard key={t.id} tactic={t} />
          ))}
        </ul>
      ) : (
        <p className="text-sm text-zinc-600">Không thấy thủ thuật thao túng nào trong đoạn này.</p>
      )}
    </section>
  );
}
