"use client";
// Chủ: Văn. M1 "Phanh Thức Tỉnh": đóng băng FREEZE_SECONDS giây, hết giờ vẫn cho đi ("phanh chứ không cấm").
// TODO(Văn): phát câu nhắc giọng nói người dùng tự thu ở /cai-dat; không có bản thu thì đọc bằng TTS.
import { useEffect, useState } from "react";
import { FREEZE_SECONDS } from "@/lib/config";

type Props = { onDone: () => void; onCancel: () => void };

export default function FreezeOverlay({ onDone, onCancel }: Props) {
  const [left, setLeft] = useState(FREEZE_SECONDS);

  useEffect(() => {
    if (left <= 0) return;
    const timer = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [left]);

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6 text-center">
        <p className="text-lg font-semibold">Dừng lại một chút.</p>
        <p className="text-zinc-600">Có người đang hối bạn chuyển tiền. Nghe lại lời nhắn của chính bạn trước đã.</p>
        <p className="text-5xl font-bold tabular-nums">{left}</p>
        <div className="flex gap-2">
          <button onClick={onCancel} className="flex-1 rounded-lg bg-zinc-900 px-4 py-2 font-medium text-white">
            Huỷ giao dịch
          </button>
          <button onClick={onDone} disabled={left > 0} className="flex-1 rounded-lg border border-zinc-300 px-4 py-2 disabled:opacity-40">
            Vẫn tiếp tục
          </button>
        </div>
      </div>
    </div>
  );
}
