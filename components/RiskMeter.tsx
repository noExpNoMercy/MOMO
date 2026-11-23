// Chủ: Văn. Thanh rủi ro 0–100, màu theo riskBand() (không tự so sánh với số ngưỡng).
import { riskBand } from "@/lib/config";
import { BAND_STYLE } from "./theme";

export default function RiskMeter({ score }: { score: number }) {
  const band = BAND_STYLE[riskBand(score)];
  return (
    <div className="space-y-1">
      <div className="flex items-baseline justify-between">
        <span className={`text-3xl font-bold ${band.text}`}>{score}</span>
        <span className={`text-sm font-medium ${band.text}`}>{band.label}</span>
      </div>
      <div className="h-3 w-full rounded-full bg-zinc-200" role="meter" aria-valuenow={score} aria-valuemin={0} aria-valuemax={100}>
        <div className={`h-3 rounded-full ${band.bar}`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}
