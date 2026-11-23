"use client";
// Chủ: Văn. Màn A9 Radar: dán hội thoại → phân tích → xem kết quả → thử chuyển tiền.
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AnalyzeResponse } from "@/lib/types";
import { analyze, errorText, SAMPLE_CONVERSATIONS, USE_MOCK } from "@/lib/api";
import { CONVERSATION_MAX_CHARS } from "@/lib/config";
import { saveLastAnalysis } from "@/lib/flow";
import RadarResult from "./RadarResult";

const SAMPLE_LABELS = { high: "Tin lừa rõ", medium: "Tin nghi ngờ", low: "Tin bình thường" } as const;

export default function AnalyzeScreen() {
  const router = useRouter();
  const [conversation, setConversation] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<AnalyzeResponse | null>(null);

  async function onAnalyze() {
    setLoading(true);
    setResponse(null);
    const res = await analyze(conversation);
    setSubmitted(conversation);
    setResponse(res);
    if (res.ok) saveLastAnalysis(conversation, res.result);
    setLoading(false);
  }

  function pickSample(key: keyof typeof SAMPLE_LABELS) {
    setConversation(SAMPLE_CONVERSATIONS[key]);
    // Ở chế độ mock, đổi luôn ?mock= để kết quả khớp với tin mẫu
    if (USE_MOCK) window.history.replaceState(null, "", `?mock=${key}`);
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="conversation" className="block font-medium">
          Dán đoạn hội thoại (mỗi tin một dòng, dạng <code>Tên: nội dung</code>)
        </label>
        <textarea
          id="conversation"
          value={conversation}
          onChange={(e) => setConversation(e.target.value)}
          maxLength={CONVERSATION_MAX_CHARS}
          rows={7}
          placeholder={"Mẹ: Con ơi mẹ đang kẹt, chuyển gấp cho mẹ 20tr\nTôi: Mẹ sao vậy?"}
          className="w-full rounded-lg border border-zinc-300 p-3"
        />
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onAnalyze}
            disabled={loading || !conversation.trim()}
            className="rounded-lg bg-zinc-900 px-4 py-2 font-medium text-white disabled:opacity-40"
          >
            {loading ? "Đang phân tích…" : "Phân tích"}
          </button>
          {(Object.keys(SAMPLE_LABELS) as (keyof typeof SAMPLE_LABELS)[]).map((key) => (
            <button key={key} onClick={() => pickSample(key)} className="rounded-lg border border-zinc-300 px-3 py-2 text-sm">
              {SAMPLE_LABELS[key]}
            </button>
          ))}
          <span className="ml-auto text-xs text-zinc-500">
            {conversation.length}/{CONVERSATION_MAX_CHARS}
          </span>
        </div>
      </div>

      {response && !response.ok && (
        <p role="alert" className="rounded-lg bg-red-50 p-3 text-red-800">
          {errorText(response.error.code)}
        </p>
      )}

      {response?.ok && (
        <>
          <RadarResult conversation={submitted} result={response.result} meta={response.meta} />
          <button onClick={() => router.push("/chuyen-tien")} className="rounded-lg border border-zinc-900 px-4 py-2 font-medium">
            Thử chuyển tiền cho người này →
          </button>
        </>
      )}
    </div>
  );
}
