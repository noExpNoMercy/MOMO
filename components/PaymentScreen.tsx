"use client";
// Chủ: Văn. Màn chuyển tiền mô phỏng. Luồng:
//   risk < RISK_BRAKE  → chuyển luôn (mô phỏng)
//   risk ≥ RISK_BRAKE  → M1 FreezeOverlay 15s
//   risk ≥ RISK_M3     → sau phanh, bắt qua M3 (/doi-thoai) trước khi được chuyển
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RISK_BRAKE, RISK_M3 } from "@/lib/config";
import { saveTransferAmount, useLastAnalysis } from "@/lib/flow";
import FreezeOverlay from "./FreezeOverlay";

export default function PaymentScreen() {
  const router = useRouter();
  const analysis = useLastAnalysis();
  const [amount, setAmount] = useState(20_000_000);
  const [stage, setStage] = useState<"form" | "frozen" | "done" | "cancelled">("form");

  const risk = analysis?.result.risk_score ?? 0;

  function onTransfer() {
    saveTransferAmount(amount);
    setStage(risk >= RISK_BRAKE ? "frozen" : "done");
  }

  function afterFreeze() {
    if (risk >= RISK_M3) router.push("/doi-thoai");
    else setStage("done");
  }

  return (
    <div className="space-y-4">
      {analysis ? (
        <p className="text-sm text-zinc-600">
          Mức rủi ro của cuộc trò chuyện vừa phân tích: <strong>{risk}</strong>/100
        </p>
      ) : (
        <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
          Chưa có kết quả phân tích nào. Quay lại trang Radar và phân tích một đoạn hội thoại trước.
        </p>
      )}

      <label className="block space-y-1">
        <span className="font-medium">Số tiền (VND)</span>
        <input
          type="number"
          min={1000}
          step={1000}
          value={amount}
          onChange={(e) => setAmount(Math.max(0, Math.round(Number(e.target.value))))}
          className="w-full rounded-lg border border-zinc-300 p-3"
        />
      </label>

      {stage === "form" && (
        <button onClick={onTransfer} disabled={amount <= 0} className="w-full rounded-lg bg-pink-600 px-4 py-3 font-semibold text-white disabled:opacity-40">
          Chuyển tiền
        </button>
      )}
      {stage === "done" && <p className="rounded-lg bg-emerald-50 p-3 text-emerald-800">Chuyển thành công (mô phỏng).</p>}
      {stage === "cancelled" && <p className="rounded-lg bg-zinc-100 p-3">Đã huỷ giao dịch. Bạn vừa giữ lại {amount.toLocaleString("vi-VN")}đ.</p>}
      {stage === "frozen" && <FreezeOverlay onDone={afterFreeze} onCancel={() => setStage("cancelled")} />}
    </div>
  );
}
