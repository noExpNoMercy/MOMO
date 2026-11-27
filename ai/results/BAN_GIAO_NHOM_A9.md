# Bàn giao nhóm — Nâng cấp A9 (đợt chấm điểm tất định + phòng hộ link)

**Người làm:** Khánh (track AI) · **Ngày:** 2026-11-28 · **Nhánh:** `khanh/a9-diem-tat-dinh-link` (nền: `khanh/node-version`)
**Dành cho:** Nam (Infra/Extension), Văn (UI/Slide).

---

## 0. TL;DR
Đợt này nâng A9 theo 3 hướng, **chỉ đụng track AI** (`ai/`, `backend/lambda-analyze/`), **không đổi hợp đồng**, không đụng file của Nam/Văn:
1. **Chấm điểm tất định** — `risk_score` do code tính từ thủ thuật, không còn tin số model phán.
2. **Bộ test "real"** — 16 ca mô phỏng vụ lừa thật để đo độc lập.
3. **Phòng hộ link** — heuristic + mô hình học chạy offline (không gọi API).

Chất lượng (qua đúng code sản phẩm): **72/72 ca đúng, 0 báo oan, recall 93.7%**, gồm cả bộ đối kháng. ⚠️ **Chưa test engine LLM live + web app** (thiếu key) — cần làm trước khi merge.

---

## 1. Thay đổi chính

### 1a. Chấm điểm tất định (thay cách tính `risk_score`)
- **Trước:** model tự phán ra `risk_score` → hộp đen, lệch giữa các lần.
- **Giờ:** model chỉ *phát hiện thủ thuật*; **code tính điểm** bằng noisy-OR trọng số từng thủ thuật (`1 − Π(1 − wᵢ)`), trong `backend/lambda-analyze/normalize.mjs` (`scoreFromTactics`).
- Trọng số ở `ai/data/tactic_weights.json` (dễ tune). Mỗi thủ thuật 0–100; chiêu "moi tiền/credential" (T32/T33/T34/T35/T40) nặng nhất.
- **Lợi:** điểm **tái lập 100%**, minh bạch (cãi được trước giám khảo), leo theo độ nặng → nấc M1(70)/M3(85) có ý nghĩa thật.
- `risk_score` vẫn là integer 0–100, vẫn 4 khoá → **không đổi hợp đồng**.

### 1b. Bộ test độc lập "real"
- `ai/data/test_messages.json`: thêm set `real` (16 ca, 9 lừa + 7 thật) **mô phỏng thủ đoạn thật** cơ quan chức năng cảnh báo 2024–2026 (giả app VNeID/dịch vụ công/eTax, fanpage đặt phòng giả, giả CSGT/điện lực, bom hội viên…).
- Tách khỏi dev/hard, câu chữ cố ý khác `signals` để A9 không "học tủ". Nguồn chi tiết: `ai/results/BO_TIN_THAT_real.md`.

### 1c. Phòng hộ link (chạy on-device, KHÔNG gọi API lúc chạy)
- **Tầng 1 — heuristic** (`backend/lambda-analyze/linkcheck.mjs`): bóc URL, cờ nếu nhái thương hiệu (`vcb-xacthuc.top`), TLD lạ (`.top/.vip`), `.apk`, IP thô, link rút gọn.
- **Tầng 3 — model học** (`backend/lambda-analyze/urlmodel.mjs`): logistic regression 17 đặc trưng URL, train trên **56k link phishing thật** (OpenPhish + Phishing.Database) + **25k domain uy tín** (Majestic). Trọng số nhúng sẵn, suy luận offline.
- **Ensemble:** heuristic HOẶC model(≥0.85) → link xấu củng cố thủ thuật **T35** → đẩy vào điểm. Model: held-out acc 93.8% / precision 98.8% / recall 88.7% / AUC 0.985.
- Pipeline train tái lập: `ai/scripts/url_model/` (có README).

### 1d. Khác
- Làm giàu `signals` cho T30/T38 trong `ai/data/tactics_map.json` (tune trên set dev).

---

## 2. Số liệu chất lượng (đã kiểm) + phương pháp trung thực

| Bộ | Accuracy | False positive | Tactic recall |
|---|---|---|---|
| real + holdout (×3, độc lập) | 100% | 0% | 91% |
| hard (đối kháng) | 100% | 0% | 97.8% |
| **toàn bộ 72 ca qua code sản phẩm** | **100%** | **0%** | **93.7%** |

- **Cách đo:** vì chưa có API key sống (project Gemini bị chặn billing), detection đo bằng **Claude Haiku qua subagent chạy trên máy** (proxy cho engine Claude thật) → chấm bằng đúng hàm `normalizeAnalyze` của sản phẩm. Ghi rõ *"đo proxy Haiku"* khi lên slide.
- **Kỷ luật:** tune prompt trên `dev`, đo `holdout`/`real` lần cuối; đã verify Python↔JS không lệch.

---

## 3. ⚠️ Còn lại / cần làm (quan trọng)

| Việc | Ai | Ghi chú |
|---|---|---|
| **Test engine LLM live** (`engine.mjs` → Lambda → `{ok,result,meta}`) | Khánh + Nam | Chưa chạy lần nào, cần **key sống** (Gemini project khác còn free tier, hoặc key Claude). Đây là lỗ hổng duy nhất còn lại trước khi merge. |
| **Test web app** (M1/M3 kích hoạt theo điểm mới trên UI) | Văn | Chưa chạy live. |
| **Chọn model** (Haiku/Sonnet) để đẩy recall > 91% | Khánh | Recall là lever của model, không phải prompt. |
| **Tầng 2 link** (tra threat-intel realtime → đỏ "LINK MÃ ĐỘC") | Khánh + Nam | Hướng mới: gọi dịch vụ ngoài → đang để roadmap. |
| **Tầng 3 UI** ("khoan 5 giây" + mức đỏ link) | Văn | Cần **thêm field output** (`links`) → đổi hợp đồng → 1 PR chung + 👍 Nam/Văn. |
| **Giải mã QR** → đưa URL vào pipeline link | Nam (bắt ảnh) + Khánh (chấm) | Decode cục bộ, offline. |
| Train lại model URL định kỳ | Khánh | `ai/scripts/url_model/` — model offline sẽ cũ dần. |

---

## 4. Tác động tới Nam & Văn (đọc kỹ)

**Nam (Infra/Extension):**
- Chữ ký `analyze()` / `m3Reply()` và `EngineError` **giữ nguyên** → `index.mjs` không phải sửa.
- **`risk_score` giờ do code tính**, không phải model. Nếu infra có logic nào dựa vào hành vi số cũ thì không ảnh hưởng (vẫn 0–100), nhưng biết để khỏi bất ngờ khi phân bố điểm đổi.
- `MODEL_ID` vẫn qua biến môi trường, không sửa code.
- `normalize.mjs` giờ import `linkcheck.mjs` → `urlmodel.mjs` (đều thuần, không gọi mạng). Không thêm phụ thuộc ngoài.

**Văn (UI):**
- UI vẫn đọc `risk_score, tactics[].{name,group,evidence,explanation}, translation, highlights` — **hợp đồng không đổi**.
- Điểm số giờ tất định; phân bố có thể khác bản cũ (nhiều ca vào nấc M1/M3 rõ ràng hơn). Kiểm lại ngưỡng màu `riskBand()` hiển thị đúng là ổn.
- Link xấu hiện **gộp vào thủ thuật T35** (chưa có badge riêng). Nếu muốn ô "LINK MÃ ĐỘC" riêng (Tầng 3 UI) thì cần thêm field → PR hợp đồng chung.

---

## 5. Cách chạy / tái lập

```bash
# Sinh prompt + kiểm hợp đồng (sau khi sửa ai/)
py ai/scripts/build_prompt.py && py ai/scripts/check_contract.py

# Test đơn vị (normalize + chấm điểm + link)
cd backend/lambda-analyze && node --test test/*.test.mjs

# Đo A9 khi CÓ key sống
cd backend/lambda-analyze && npm run eval -- --set real --repeat 3
#   (hiện không có key -> đo tạm bằng subagent Haiku trên máy; xem BAO_CAO_A9_v2.md)

# Train lại model URL
cd ai/scripts/url_model && python data_prep.py && python train_url.py dataset.csv url_model.json
#   -> chép trọng số vào MODEL trong backend/lambda-analyze/urlmodel.mjs (feats JS phải khớp Python)
```

---

## 6. Nhánh & PR
- Code ở nhánh **`khanh/a9-diem-tat-dinh-link`** (đã push lên origin), nền là `khanh/node-version`.
- PR mở với **base = `khanh/node-version`** (diff chỉ gồm việc A9). **Chưa merge** — chờ review + test live với key.
- `main` **chưa bị đụng**.
- Báo cáo chi tiết: `ai/results/BAO_CAO_A9_v2.md` (số + phương pháp), `ai/results/BO_TIN_THAT_real.md` (nguồn bộ test).

---

## 7. Danh sách file thay đổi
**Mới:** `ai/data/tactic_weights.json` · `backend/lambda-analyze/linkcheck.mjs` · `backend/lambda-analyze/urlmodel.mjs` · `ai/scripts/url_model/*` · `ai/results/{BAO_CAO_A9_v2,BO_TIN_THAT_real,BAN_GIAO_NHOM_A9}.md`
**Sửa:** `backend/lambda-analyze/normalize.mjs` · `ai/data/tactics_map.json` · `ai/data/test_messages.json` · `ai/scripts/build_prompt.py` · `backend/lambda-analyze/test/normalize.test.mjs` · `backend/lambda-analyze/generated/*`
