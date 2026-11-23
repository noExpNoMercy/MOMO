// Chủ: Văn. M1: người dùng thu sẵn câu nhắc bằng giọng của chính mình lúc tỉnh táo.
// TODO(Văn): components/VoiceRecorder.tsx dùng getUserMedia + MediaRecorder, lưu bản thu (IndexedDB),
// FreezeOverlay phát lại bản thu này; không có micro thì cho gõ câu nhắc và đọc bằng speechSynthesis.
// Micro chỉ chạy trên HTTPS hoặc localhost.

export default function SettingsPage() {
  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Thu giọng nhắc chính mình</h1>
      <p className="text-zinc-600">
        Thu một câu như: &ldquo;Nếu mày đang nghe cái này, nghĩa là có đứa đang hối mày. Dừng lại.&rdquo; Câu này sẽ được
        phát khi bạn sắp chuyển tiền trong một cuộc trò chuyện nguy hiểm.
      </p>
      <p className="mt-4 rounded-lg bg-zinc-100 p-3 text-sm">Đang xây dựng.</p>
    </>
  );
}
