import AnalyzeScreen from "@/components/AnalyzeScreen";

export default function Home() {
  return (
    <>
      <h1 className="mb-1 text-2xl font-bold">Radar Thao Túng</h1>
      <p className="mb-6 text-zinc-600">AI chỉ ra kẻ gửi tin đang dùng chiêu gì lên bạn, và dịch ý đồ thật sang lời nói thẳng.</p>
      <AnalyzeScreen />
    </>
  );
}
