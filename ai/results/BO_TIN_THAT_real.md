# Bộ kiểm độc lập "real" — neo vào vụ lừa thật

**Mục đích:** vá điểm yếu lớn nhất mà chính `BAO_CAO_A9.md` mục 4 tự thú — *"toàn bộ tin test do AI sinh từ chính bản đồ thủ thuật A9 dùng"*. Giám khảo sẽ hỏi: *"số đẹp vì tự ra đề tự chấm à?"*. Bộ `real` là câu trả lời.

## Khác gì bộ dev/holdout/hard cũ

| | dev / holdout / hard | **real (mới)** |
|---|---|---|
| Nguồn kịch bản | AI nghĩ ra, dựa trên 40 thủ thuật A9 | **Mô phỏng thủ đoạn thật được Bộ Công an / A05 / báo chí cảnh báo 2024–2026** |
| Câu chữ | đôi chỗ trùng `signals` trong `tactics_map.json` | **cố ý viết khác `signals`** để A9 không "học tủ", đo khả năng khái quát |
| Kịch bản | đã có sẵn | **toàn kịch bản MỚI**, không trùng ca cũ |

> **Nói thật khi bị hỏi:** đây là hội thoại *mô phỏng* từ thủ đoạn thật đã được cơ quan chức năng cảnh báo, **không phải log nạn nhân nguyên văn** (scam thật phần lớn nằm trong ảnh chụp màn hình, hiếm bản text, và dính quyền riêng tư). Giá trị nằm ở chỗ **kịch bản độc lập với bản đồ A9** + bám thủ đoạn ngoài đời, không phải A9 tự sinh ra để tự chấm.

## 16 ca (9 lừa + 7 thật = 44% thật, đúng luật holdout)

Mỗi ca có trường `source` trong `test_messages.json` ghi rõ neo vào thủ đoạn nào.

**9 ca lừa — bám thủ đoạn nóng 2025:**
- `real-001` Giả công an xã, dụ cài app VNeID/dịch vụ công giả (chiếm quyền + lấy OTP)
- `real-002` Fanpage homestay giả, cọc rồi "sai cú pháp" bắt chuyển lại nhiều lần
- `real-003` Giả cán bộ thuế, cài app eTax giả để "hoàn thuế TNCN"
- `real-004` Giả CSGT "phạt nguội", ép nộp "tài khoản xác minh", giữ bí mật
- `real-005` Giả CSKH báo "lỡ đăng ký gói hội viên trừ phí", dụ bấm link/đọc OTP để "hủy"
- `real-006` Giả nhà trường báo con được học bổng, thu "phí giữ chỗ"
- `real-007` Giả nhân viên điện lực dọa cắt điện + cài app giả *(không dấu)*
- `real-008` Trang thương hiệu tích xanh giả "hoàn tiền tri ân", dụ nhập thẻ/OTP
- `real-009` Giả cán bộ y tế, cài app "Sổ sức khỏe điện tử" giả

**7 ca thật — mỗi ca là "gương" của một ca lừa để bẫy báo oan:**
- `real-010`↔006 trường báo học phí qua cổng chính thống
- `real-011`↔002 đặt homestay thật (gọi video, STK đúng tên chủ)
- `real-012`↔003 hoàn thuế thật qua app chính thống
- `real-013`↔004 nộp phạt giao thông thật qua Cổng DVC
- `real-014`↔005 hủy gói hội viên thật trong app
- `real-015`↔007 nhắc tiền điện thật qua app EVN
- `real-016`↔008 brand tích xanh thật, mã nằm trong app, không xin thẻ

Cặp lừa–thật "gương" nhau rất khó: cùng bối cảnh (trường, điện lực, thuế, đặt phòng...) nhưng một bên lừa, một bên thật → đo đúng ranh giới A9 phân biệt, không ăn may theo từ khoá.

## Cách chạy

```bash
cd backend/lambda-analyze
npm run eval -- --set real            # chạy bộ real
npm run eval -- --set real --repeat 3 # lặp 3 lượt lấy trung bình (số lên slide)
```

Kết quả ghi `ai/results/eval_real_<thời gian>.csv`. **Bộ này nên chạy như holdout: chỉ chạy lần cuối trên bản prompt đã chốt**, không dùng để sửa prompt, kẻo lại "học tủ".

## Số liệu cứng cho slide (có nguồn)

Dùng cho phần "quy mô vấn đề" — đáp đúng điểm CLAUDE.md yêu cầu.

- **2024:** người Việt thiệt hại ước **~18.900 tỷ đồng** do lừa đảo trực tuyến (Hiệp hội An ninh mạng quốc gia – NCA). Cứ **220 người có 1 nạn nhân** (0,45%); chỉ **45,69%** nạn nhân có báo cơ quan chức năng.
- **2025:** Bộ Công an ghi nhận **~4.200 vụ**, thiệt hại ~**6.000–8.000 tỷ đồng** (11 tháng đầu năm); đã ngăn **hơn 55 triệu cuộc gọi quốc tế giả mạo**. Tỷ lệ nạn nhân giảm còn ~0,18% (1/555).
- **Thủ đoạn phổ biến (A05):** giả danh nhân viên cơ sở giáo dục, "thu hồi vốn treo", mạo danh cơ quan tố tụng, lừa đầu tư, lừa tình cảm, mua bán/du lịch trực tuyến; nổi lên 2025: **giả app VNeID / dịch vụ công / eTax** để chiếm quyền điện thoại.

> Lưu ý trung thực: số của NCA và của Bộ Công an đo bằng phương pháp khác nhau (18.900 vs 12.000 tỷ cho 2024) nên đừng gộp/so trực tiếp; nêu rõ nguồn từng con số.

**Nguồn:**
- [Bộ Công an cảnh báo 7 phương thức lừa đảo (Tuổi Trẻ)](https://tuoitre.vn/plo/bo-cong-an-canh-bao-7-phuong-thuc-lua-dao-truc-tuyen-109857221.htm)
- [4.200 vụ, 8.000 tỉ đồng 2025 (Người Quan Sát)](https://nguoiquansat.vn/4-200-vu-lua-dao-truc-tuyen-8-000-ti-dong-boc-hoi-bo-cong-an-canh-bao-khan-322502.html)
- [Thiệt hại 18.900 tỷ 2024 – NCA (Nhân Dân)](https://nhandan.vn/nca-nam-2024-uoc-tinh-nguoi-viet-mat-18900-ty-dong-do-lua-dao-truc-tuyen-post850801.html)
- [2025 thiệt hại hơn 6.000 tỷ (An toàn thông tin)](https://antoanthongtin.vn/tin/nguoi-dung-viet-nam-thiet-hai-hon-6000-ty-dong-do-lua-dao-truc-tuyen-trong-nam-2025)
- [Cảnh báo app VNeID giả (VietnamPlus)](https://www.vietnamplus.vn/canh-bao-thu-doan-lua-dao-cai-ung-dung-vneid-gia-mao-post1051547.vnp)
- [Giả fanpage khách sạn/homestay (Tuổi Trẻ)](https://tuoitre.vn/mat-tien-trieu-vi-fanpage-homestay-gia-mao-20250330175355579.htm)

## Giới hạn còn lại (nói thẳng)

- Vẫn là mô phỏng, chưa phải log thật nguyên văn — bước sau: xin log ẩn danh từ nạn nhân / nhóm chống lừa đảo để kiểm định sâu hơn.
- 16 ca đủ chứng minh hướng đi, chưa đủ công bố con số tuyệt đối.
- Nếu muốn A9 **trích dẫn** được vụ tương tự lúc cảnh báo (RAG), đó là bước nâng cấp kế tiếp — cần API key live để đo và (nếu hiện lên UI) cần Nam/Văn duyệt hợp đồng.
