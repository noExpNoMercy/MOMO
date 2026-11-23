"use client";
// Chủ: Văn. M3 "Đấu Với Chính Mình Ngày Mai": phải gõ lý do (≥ 15 ký tự), AI nhập vai "bạn của ngày mai" phản biện.
// TODO(Văn): đồng hồ 60 giây, số lượt tối thiểu trước khi mở nút "Vẫn chuyển", giao diện chat đẹp.
import { useState } from "react";
import type { M3Turn } from "@/lib/types";
import { errorText, m3Reply } from "@/lib/api";
import { M3_MAX_HISTORY, M3_MAX_REASON_CHARS, M3_MIN_REASON_CHARS } from "@/lib/config";
import { useLastAnalysis, useTransferAmount } from "@/lib/flow";

export default function M3Dialogue() {
  const analysis = useLastAnalysis();
  const amount = useTransferAmount() ?? 20_000_000;
  const [history, setHistory] = useState<M3Turn[]>([]);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSend() {
    if (!analysis) return;
    setLoading(true);
    setError(null);
    const res = await m3Reply({
      conversation: analysis.conversation,
      tactics: analysis.result.tactics,
      amount_vnd: amount,
      history: history.slice(-M3_MAX_HISTORY),
      user_reason: reason.trim(),
    });
    if (res.ok) {
      setHistory((h) => [...h, { role: "user", content: reason.trim() }, { role: "assistant", content: res.result.reply }]);
      setReason("");
    } else {
      setError(errorText(res.error.code));
    }
    setLoading(false);
  }

  if (!analysis) {
    return <p className="rounded-lg bg-amber-50 p-3 text-amber-800">Chưa có kết quả phân tích. Bắt đầu từ trang Radar.</p>;
  }

  const tooShort = reason.trim().length < M3_MIN_REASON_CHARS;
  return (
    <div className="space-y-4">
      <p className="text-zinc-600">
        Bạn sắp chuyển <strong>{amount.toLocaleString("vi-VN")}đ</strong>. Hãy thuyết phục chính bạn của ngày mai rằng giao dịch này an toàn.
      </p>
      <ol className="space-y-2">
        {history.map((turn, i) => (
          <li key={i} className={turn.role === "user" ? "ml-8 rounded-lg bg-zinc-100 p-3" : "mr-8 rounded-lg bg-pink-50 p-3"}>
            {turn.content}
          </li>
        ))}
      </ol>
      {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-red-800">{error}</p>}
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        maxLength={M3_MAX_REASON_CHARS}
        rows={3}
        placeholder="Vì sao bạn chắc chắn đây không phải lừa đảo?"
        className="w-full rounded-lg border border-zinc-300 p-3"
      />
      <button onClick={onSend} disabled={loading || tooShort} className="rounded-lg bg-zinc-900 px-4 py-2 font-medium text-white disabled:opacity-40">
        {loading ? "Đang trả lời…" : tooShort ? `Gõ ít nhất ${M3_MIN_REASON_CHARS} ký tự` : "Gửi lý do"}
      </button>
    </div>
  );
}
