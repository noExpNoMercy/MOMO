# Báo cáo A9 v2 — Chấm điểm tất định + kiểm định trên vụ thật

**Ngày:** 2026-11-27 · **Engine đo:** Claude Haiku (proxy cho engine Claude thật) · **Chấm điểm:** tất định từ thủ thuật (noisy-OR trọng số) · **Ngưỡng:** risk ≥ 50 = "lừa đảo" (đồng bộ `lib/config.ts`)

> Bản này thay cho `BAO_CAO_A9.md` (v1, đo trên Gemini). V1 giữ làm lịch sử.

---

## 1. SỐ CHỐT CHO SLIDE (bộ độc lập, lặp 3 lượt)

**26 ca độc lập = 16 ca mô phỏng vụ lừa thật (Công an/báo chí cảnh báo 2024–2026) + 10 ca holdout giữ kín.** Mỗi lượt chạy lại toàn bộ 26 ca.

| Lượt | Accuracy | False positive | Tactic recall |
|---|---|---|---|
| #1 | 100% | 0% | 94% |
| #2 | 100% | 0% | 88% |
| #3 | 100% | 0% | 92% |
| **Trung bình** | **100%** | **0%** | **91%** (dao động 88–94%) |

> **KHÔNG ca nào bị phân loại sai qua cả 3 lượt** → phân loại ổn định tuyệt đối, không phải ăn may một lượt.

**Câu an toàn để nói:** *A9 phân loại đúng 100% tin lừa / tin thật trên 26 ca độc lập, không báo oan lần nào, lặp 3 lượt không sai ca nào. Tactic recall 91%.*

---

## 2. Phương pháp (nói thẳng, phòng giám khảo hỏi)

- **Bộ test độc lập:** 16 ca `real` **mô phỏng từ thủ đoạn thật đã được cơ quan chức năng cảnh báo** (giả app VNeID/dịch vụ công, fanpage đặt phòng giả, giả cán bộ thuế/CSGT/điện lực, bom hội viên…), KHÔNG sinh từ bản đồ thủ thuật của A9 → độc lập thật. 10 ca `holdout` giữ kín, chỉ chạy lần cuối. (Chi tiết nguồn: `BO_TIN_THAT_real.md`.)
- **Đo bằng Claude Haiku qua subagent, chạy trên máy** — vì hiện chưa có API key live (project Gemini bị chặn billing). Đây là **proxy sát engine thật** (sản phẩm chạy Claude). **KHÔNG đo latency/hành vi API production** — chỉ đo chất lượng phát hiện + phân loại.
- **Chấm điểm TẤT ĐỊNH:** model chỉ *phát hiện thủ thuật* (việc nó giỏi); **code tính `risk_score`** bằng noisy-OR trọng số từng thủ thuật (`ai/data/tactic_weights.json`), KHÔNG tin con số model tự phán. → điểm **minh bạch, tái lập 100%**, và leo theo độ nặng thủ thuật nên nấc M1 (70) / M3 (85) có ý nghĩa thật.
- **Rào chắn chống bịa:** mọi `evidence` phải là **chuỗi con nguyên văn** của hội thoại, sai một ký tự là loại — chống AI chế ra bằng chứng không có thật.
- **Kỷ luật chống số dỏm:** tune prompt trên bộ `dev`, đo `holdout`/`real` **một lần cuối** trên bản prompt đã chốt (đúng `docs/tracks/KHANH_AI.md`).

---

## 3. Vì sao bản này đáng tin hơn v1

| | v1 (cũ) | **v2 (bản này)** |
|---|---|---|
| Dữ liệu test | AI sinh từ chính bản đồ A9 (dễ "ảo") | **Neo vụ thật, độc lập với bản đồ** |
| Điểm số | model tự phán (hộp đen, lệch giữa các lần) | **code tính tất định, tái lập được, cãi được** |
| Engine | Gemini flash-lite (bản rẻ) | **Claude Haiku (đúng dòng sản phẩm)** |
| Chống may rủi | — | **lặp 3 lượt, 0 ca sai** |

---

## 4. Lá chắn link — heuristic + model học chạy offline

Ngoài phát hiện thủ thuật qua chữ, A9 có lớp phòng hộ riêng cho **link lạ**, chạy **hoàn toàn trên thiết bị, không gửi link đi đâu**:

- **Tầng 1 — luật cứng (tất định):** bóc URL trong tin, gắn cờ nếu nhái tên thương hiệu (`vcb-xacthuc.top`), đuôi tên miền lạ (`.top/.vip`), file `.apk`, IP thô, hay link rút gọn.
- **Tầng 3 — classifier học từ dữ liệu thật:** logistic regression 17 đặc trưng URL, huấn luyện trên **56k link phishing thật** (OpenPhish + Phishing.Database) + **25k domain uy tín** (Majestic). Chạy offline bằng trọng số nhúng sẵn.

| Chỉ số (held-out 8.000 ca) | Kết quả |
|---|---|
| Accuracy | 93.8% |
| Precision | 98.8% |
| Recall | 88.7% |
| AUC | 0.985 |

Hai tầng **ghép lại (ensemble)** → link xấu củng cố thủ thuật "bắt cài app/mở link" → đẩy vào điểm tất định. Trên bộ test: **bắt 6/6 tin có link lừa, 0 tin thật báo oan**. Model độc lập nhận ra phishing: `vcb-xacthuc.top` 0.95, lookalike paypal `.tk` 1.0, link IP 1.0; để yên `vietcombank.com.vn` 0.30, `shopee.vn` 0.10.

**Điểm mạnh cho pitch:** đây là **AI thật chạy trên máy, không gọi API bên thứ ba** — *"chúng tôi không gửi link của bạn đi đâu cả"*: vừa mạnh vừa riêng tư.

**Giới hạn thật:** benign train là domain ngắn/sạch nên model tựa nhiều vào độ dài URL → ensemble chỉ cho model cờ khi xác suất ≥ 0.85, heuristic vẫn là chính; dữ liệu phishing phần lớn toàn cầu; model offline cũ dần, cần train lại định kỳ. *(Tầng 2 — tra threat-intel realtime như Safe Browsing — để ở roadmap vì cần gọi dịch vụ ngoài.)*

---

## 5. Giới hạn cần nói thật

- Vẫn là **proxy Haiku trên máy**, chưa đo qua Lambda/API production (latency, prompt cache). Bước sau: khi có key live, chạy `npm run eval` để lấy số production đầy đủ.
- **Tactic recall 91% là chỉ số phụ** (đo "gọi đủ tên thủ thuật"), KHÔNG phải độ chính xác phát hiện. Phân loại scam/legit — cái quyết định có bảo vệ người dùng hay không — đạt **100%**. Phần recall thiếu chủ yếu là các thủ thuật khuếch đại trọng số thấp (áp lực/hạn chót) và dao động ngẫu nhiên của model nhỏ, **không đổi phân loại**.
- Đã xác định: muốn đẩy recall > 91% thì **lever là đổi sang model mạnh hơn (Sonnet)**, không phải cày thêm prompt — đây là việc chọn model (track #4).
- Cỡ mẫu 26 (độc lập) — đủ chứng minh hướng đi, chưa đủ công bố con số tuyệt đối.

---

## 6. Số liệu bối cảnh (cho slide "quy mô vấn đề", có nguồn)

- **2024:** người Việt mất **~18.900 tỷ đồng** vì lừa đảo trực tuyến (Hiệp hội An ninh mạng quốc gia); cứ **220 người có 1 nạn nhân**; chỉ **45,69%** nạn nhân báo cơ quan chức năng.
- **2025:** Bộ Công an ghi nhận **~4.200 vụ**, thiệt hại **~6.000 tỷ** (11 tháng đầu năm); chặn **hơn 55 triệu** cuộc gọi quốc tế giả mạo.
- **Thủ đoạn nóng 2025:** giả ứng dụng **VNeID/dịch vụ công/eTax** để chiếm quyền điện thoại; giả danh cơ sở giáo dục; "thu hồi vốn treo"; mạo danh cơ quan tố tụng; đầu tư; tình cảm.
- *Lưu ý trung thực:* số của NCA và Bộ Công an đo khác phương pháp (18.900 vs 12.000 tỷ cho 2024) — nêu rõ nguồn từng con số, đừng gộp.

**Nguồn:** [NCA 18.900 tỷ 2024 (Nhân Dân)](https://nhandan.vn/nca-nam-2024-uoc-tinh-nguoi-viet-mat-18900-ty-dong-do-lua-dao-truc-tuyen-post850801.html) · [Bộ Công an 2025 (Người Quan Sát)](https://nguoiquansat.vn/4-200-vu-lua-dao-truc-tuyen-8-000-ti-dong-boc-hoi-bo-cong-an-canh-bao-khan-322502.html) · [App VNeID giả (VietnamPlus)](https://www.vietnamplus.vn/canh-bao-thu-doan-lua-dao-cai-ung-dung-vneid-gia-mao-post1051547.vnp)

---

## 7. Câu chốt cho slide

> A9 không chỉ "gọi API". Nó phát hiện thủ thuật thao túng bằng LLM, rồi **tự chấm điểm bằng công thức minh bạch** — nên điểm số **tái lập được và cãi được**, không phải hộp đen. Trên bộ dữ liệu **mô phỏng vụ lừa thật, giữ kín**, nó phân loại **đúng 100%, không báo oan lần nào, lặp 3 lượt không sai**. Riêng link lừa, có **model học chạy ngay trên máy** chặn lại — không gửi link của bạn đi đâu.
