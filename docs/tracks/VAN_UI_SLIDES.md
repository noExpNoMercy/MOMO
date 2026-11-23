# Hướng UI + Slide: Văn

**Mục tiêu:** Giám khảo dán một tin lừa, thấy ngay AI chỉ ra chiêu nào và tô màu đúng chỗ. Khi bấm chuyển tiền, họ nghe lại chính giọng mình và bị phanh 15 giây. Bộ slide và video kể câu chuyện "Phòng ngừa → Phát hiện → Can thiệp".

## Bạn sở hữu

- `app/` (các trang: `/` A9, `/chuyen-tien` M1, `/doi-thoai` M3, `/cai-dat` thu giọng, `/vaccine` B9')
- `components/` (`RadarResult`, `RiskMeter`, `HighlightedText`, `TacticCard`, `AnalyzeScreen`, `PaymentScreen`, `FreezeOverlay`, `M3Dialogue`, `theme.ts`)
- `lib/highlight.ts` (luật tô màu), `lib/flow.ts` (chuyền dữ liệu giữa các trang)
- `public/` (trừ `fake-zalo.html`), `docs/slides/`

**Không đụng:** `lib/api.ts` (của Nam, muốn thêm hàm thì nhắn Nam), `lib/types.ts`, `lib/config.ts`, `lib/mock/` (file hợp đồng của Khánh), `backend/`, `extension/`.

## Chạy trên máy

```bash
npm install
cp .env.example .env.local       # NEXT_PUBLIC_USE_MOCK=1 là chạy được ngay, không cần API
npm run dev                      # http://localhost:3000
```

- Đổi trạng thái kết quả bằng URL: `/?mock=high` (92 điểm), `?mock=medium` (60), `?mock=low` (8, không có thủ thuật), `?mock=error`.
- Các nút "Tin lừa rõ / Tin nghi ngờ / Tin bình thường" điền sẵn hội thoại khớp với mock, nên highlight tô đúng chữ.
- Muốn thử với AI thật thì không cần sửa code: chạy `npm run dev:api`, đổi `.env.local` thành `NEXT_PUBLIC_USE_MOCK=0`, rồi chạy lại `npm run dev`.

## Việc cần làm (theo thứ tự ưu tiên)

1. **Radar A9 sẵn sàng demo.** Khung đã chạy; việc của bạn là làm đẹp, ưu tiên điện thoại. Câu `translation` phải nổi bật nhất. Màu theo nhóm thủ thuật lấy từ `theme.ts`.
   *Xong khi:* 3 mock + error hiển thị đẹp, không vỡ khi `tactics` rỗng hoặc chuỗi dài.
2. **M1 Phanh Thức Tỉnh.**
   - Tạo `components/VoiceRecorder.tsx` ở `/cai-dat`: thu giọng bằng `getUserMedia` + `MediaRecorder`, lưu bản thu (IndexedDB).
   - `FreezeOverlay` phát bản thu ngay khi mở.
   - Người dùng không cho dùng micro thì cho họ gõ một câu nhắc, đọc bằng `speechSynthesis` (giọng `vi-VN`).
   *Xong khi:* trên điện thoại (URL Amplify, có HTTPS), bấm chuyển tiền ở `?mock=high` → âm thanh phát trong 1 giây → đếm 15 giây → mở khoá.
3. **M3 Đấu với chính mình.** Khung chat đã gọi `m3Reply()`. Việc còn lại:
   - đồng hồ 60 giây,
   - phải qua ít nhất 2 lượt mới mở nút "Vẫn chuyển",
   - giao diện chat đẹp,
   - nút "Huỷ giao dịch" luôn nổi bật hơn nút "Vẫn chuyển".
4. **Ghép với API thật** (mốc 25/11): chỉ đổi biến môi trường, rồi kiểm lại cả luồng trên URL Amplify.
5. **B9' Vaccine** (chỉ làm khi 1–4 đã xong): phòng chat giả, người chơi vào vai kẻ lừa, mỗi tin gửi đi được `analyze()` và lật thành "kháng thể" (tên chiêu + cách nhận ra). Dùng lại `HighlightedText`.
6. **Slide + video** (song song với code, xem bên dưới).

## Slide (10–12 trang) và video (≤ 3 phút)

Gợi ý dàn ý:
1. Vấn đề, có số liệu thật.
2. Điểm mù: tin lừa không có link hay số lạ thì blacklist bó tay.
3. Giải pháp 3 lớp theo dòng thời gian.
4. Demo A9.
5. M1.
6. M3.
7. B9'.
8. Kiến trúc + cách tích hợp vào MoMo (A9 là microservice; M1/M3 kích hoạt trước màn xác nhận giao dịch).
9. Kết quả đo.
10. Khác biệt.
11. Roadmap (Android app, tích hợp MoMo, Agent mồi A2).
12. Đội + câu pitch.

- **Số liệu thật:** tra báo cáo Bộ Công an, NCSC hoặc VNPT về tỉ lệ vụ lừa không có link hay số lạ, và ghi nguồn ngay dưới slide. Không có nguồn thì không đưa số.
- **Số đo của sản phẩm:** chỉ dùng số **holdout** Khánh gửi tối 27/11. Đừng dùng số tập dev.
- **Kịch bản demo:** chốt 10 hội thoại demo và gửi Khánh trước 26/11 để Khánh lưu demo cache. Khi API lỗi giữa lúc demo, web vẫn hiện kết quả (có nhãn "Kết quả minh hoạ").
- Câu pitch: *"Chúng tôi không chặn kẻ lừa — chúng tôi đánh thức nạn nhân, bằng chính giọng nói tỉnh táo của họ, đúng 15 giây trước khi quá muộn."*

## Luật UI phải giữ (từ hợp đồng)

- Gọi API **chỉ** qua `analyze()` / `m3Reply()` trong `lib/api.ts`. Hai hàm này không bao giờ throw, luôn trả `{ok, ...}`.
- Báo lỗi bằng `errorText(code)`, không hiển thị `error.message`.
- Màu theo rủi ro dùng `riskBand(score)`. Ngưỡng lấy từ `lib/config.ts`, không viết số 70 trực tiếp.
- `meta.source !== "live"` thì phải hiện nhãn "Kết quả minh hoạ" (đã có trong `RadarResult`).
- Tên field giữ `snake_case` y như API (`result.risk_score`), không đổi sang camelCase.
- Đọc `sessionStorage` bằng hook trong `lib/flow.ts`. Lint chặn `setState` trong `useEffect`.

## Câu mở đầu cho Claude Code

> Tôi là Văn, phụ trách UI web và slide của dự án. Đọc `CLAUDE.md`, `README.md`, `docs/QUY_UOC_CHUNG.md` và `docs/tracks/VAN_UI_SLIDES.md`. Chỉ sửa các file thuộc phần của tôi. Đây là Next.js 16, đọc tài liệu trong `node_modules/next/dist/docs/` trước khi viết code Next. Bắt đầu từ việc số 1 trong file hướng dẫn. Sau mỗi thay đổi thì chạy `npm run lint` và build ở chế độ mock, mở trang cho tôi xem, và hỏi tôi trước khi commit.
