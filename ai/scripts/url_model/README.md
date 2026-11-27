# URL classifier (Tầng 3 phòng hộ link) — huấn luyện lại

Mô hình phân loại URL phishing/benign **chạy offline trên thiết bị** (không gọi API lúc chạy).
Trọng số đã huấn luyện được nhúng sẵn trong `backend/lambda-analyze/urlmodel.mjs`.
Thư mục này là pipeline để **train lại** khi muốn làm mới.

## Dữ liệu (công khai, tải lúc train — KHÔNG tải lúc chạy sản phẩm)
- **Phishing:** [OpenPhish feed](https://openphish.com/feed.txt), [Phishing.Database (GitHub)](https://github.com/mitchellkrogza/Phishing.Database)
- **Benign:** [Majestic Million](https://majestic.com/reports/majestic-million) (top domain uy tín)

## Cách train lại
```bash
cd ai/scripts/url_model
python data_prep.py      # tải feed -> dataset.csv (cân bằng 1:1). Cần mạng.
python train_url.py dataset.csv url_model.json   # logistic regression -> url_model.json
```
Sau đó **chép trọng số trong `url_model.json` vào `MODEL` của `backend/lambda-analyze/urlmodel.mjs`**.

## ⚠️ Luật bất di bất dịch
Hàm trích đặc trưng `feats()` trong `data_prep.py` (Python) và trong `urlmodel.mjs` (JS) **phải khớp từng ký tự**:
cùng thứ tự 17 đặc trưng, cùng các tập `BAD_TLD` / `BRAND` / `SUS`, cùng công thức entropy.
Lệch một đặc trưng là model vô dụng. Có script so khớp mẫu ở lịch sử phiên (so `feats` JS vs Python trên cùng URL).

## Kết quả bản đang dùng (held-out 8.000 ca)
Accuracy 93.8% · Precision 98.8% · Recall 88.7% · AUC 0.985 · FP trên benign 1.05%.

## Giới hạn (nói thẳng)
- Benign là domain Majestic (URL ngắn, sạch) → model tựa nhiều vào độ dài URL; URL legit dài ngoài đời có thể bị oan nhiều hơn 1.05%. Vì vậy ensemble trong `linkcheck.mjs` chỉ cho model cờ khi xác suất ≥ 0.85, heuristic vẫn là chính.
- Dữ liệu phishing phần lớn toàn cầu, không phải riêng VN; bắt scam VN nhờ đặc trưng lexical chung. Model offline sẽ cũ dần → train lại định kỳ.
