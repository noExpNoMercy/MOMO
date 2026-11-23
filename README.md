# 3 Lớp Lá Chắn: AI chống lừa đảo tài chính (MoMo Tech Contest 2026)

> *"Chúng tôi không chặn kẻ lừa — chúng tôi đánh thức nạn nhân, bằng chính giọng nói tỉnh táo của họ, đúng 15 giây trước khi quá muộn."*

Hệ thống bảo vệ theo đúng dòng thời gian của một vụ lừa:

| Lớp | Module | Khi nào | Làm gì |
|---|---|---|---|
| 0 | **B9' Vaccine** | Trước khi bị lừa | Mini-game đóng vai kẻ lừa để "tiêm kháng thể" |
| 1 | **A9 Radar Thao Túng** | Tin nhắn khả nghi tới | AI chỉ ra thủ thuật thao túng (40 chiêu) + dịch ý đồ sang lời nói thẳng |
| 2a | **M1 Phanh Thức Tỉnh** | Sắp chuyển tiền, rủi ro ≥ 70 | Phát giọng người dùng tự thu + đóng băng nút chuyển 15 giây |
| 2b | **M3 Đấu Với Chính Mình** | Vẫn cố chuyển, rủi ro ≥ 85 | AI nhập vai "bạn của ngày mai đã mất tiền", bắt gõ lý do |

**Hạn nộp: 29/11/2026.** Mốc ghép và code freeze: xem [mục 6](#6-mốc-ghép).

---

## 1. Ba hướng làm song song

Mỗi người làm **độc lập** trên phần của mình. Không ai phải chờ ai, vì mọi chỗ nối giữa các phần đã có sẵn **mock** đúng hợp đồng.

| Người | Hướng | Đọc file này trước | Làm việc độc lập nhờ |
|---|---|---|---|
| **Khánh** | AI: prompt A9/M3, bản đồ 40 thủ thuật, engine, đo accuracy | [docs/tracks/KHANH_AI.md](docs/tracks/KHANH_AI.md) | `npm run try` gọi thẳng engine, không cần Lambda hay web |
| **Nam** | Infra (Lambda, API Gateway, Amplify, CI) + Chrome Extension | [docs/tracks/NAM_INFRA_EXTENSION.md](docs/tracks/NAM_INFRA_EXTENSION.md) | `LLM_MODE=mock`: API chạy đủ, không cần prompt của Khánh |
| **Văn** | UI web (A9, M1, M3, B9') + slide, video | [docs/tracks/VAN_UI_SLIDES.md](docs/tracks/VAN_UI_SLIDES.md) | `NEXT_PUBLIC_USE_MOCK=1`: web chạy đủ, không cần API |

**Ai cũng đọc:** [docs/QUY_UOC_CHUNG.md](docs/QUY_UOC_CHUNG.md), là hợp đồng API và các quy ước chung (mục 0 là bản tóm tắt 12 điểm).

---

## 2. Chạy trên máy trong 10 phút

Cần: **Node.js ≥ 22.9** (khuyên dùng bản 24 LTS; kiểm bằng `node -v`), **Git**. Riêng Khánh cần thêm **Python ≥ 3.10**.
Node cũ hơn thì `npm run setup:api` báo lỗi `EBADENGINE`: cài Node mới ở https://nodejs.org rồi chạy lại.

```bash
git clone https://github.com/noExpNoMercy/MOMO.git
cd MOMO
npm install
cp .env.example .env.local          # Windows PowerShell: copy .env.example .env.local
npm run dev                         # → http://localhost:3000 (chạy bằng mock, không cần gì thêm)
```

Muốn chạy **API thật trên máy** (cùng code với Lambda, không cần AWS):

```bash
npm run setup:api
cp backend/lambda-analyze/.env.example backend/lambda-analyze/.env   # điền ANTHROPIC_API_KEY nếu chạy LLM_MODE=live
npm run dev:api                     # → http://localhost:8787
# rồi trong .env.local đổi NEXT_PUBLIC_USE_MOCK=0 và tắt/bật lại npm run dev
```

Thử nhanh các trạng thái UI ở chế độ mock: thêm `?mock=high`, `?mock=medium`, `?mock=low` hoặc `?mock=error` vào URL trang.

---

## 3. Làm việc với Claude Code

Mỗi người mở Claude Code **ở thư mục gốc repo**. Claude Code tự đọc [CLAUDE.md](CLAUDE.md), trong đó có luật chung: chỉ sửa file của mình, giữ hợp đồng, không commit key, chạy kiểm tra trước khi commit.

Câu mở đầu nằm ở cuối file hướng dẫn của từng người. Dán nguyên văn vào Claude Code là bắt đầu được.

---

## 4. Kiến trúc

```
Chrome Extension (MV3)                         Web App Next.js 16 (Amplify Hosting)
  content.js đọc tin mới                         /           A9 Radar
  → service_worker.js gọi API                    /chuyen-tien M1 Phanh 15s
  → overlay cảnh báo                             /doi-thoai   M3 Đấu với chính mình
          │                                      /cai-dat     Thu giọng nhắc · /vaccine B9'
          │                                                 │ lib/api.ts (chỗ duy nhất gọi API)
          ▼                                                 ▼
        API Gateway HTTP API:  POST /analyze   POST /m3   (CORS *, stage $default)
          │
          ▼
        AWS Lambda (Node 22) backend/lambda-analyze/
          index.mjs     route, validate, khung response, mã lỗi      ← Nam
          engine.mjs    gọi Claude (structured outputs + cache)       ← Khánh
          generated/    prompt + schema sinh từ ai/ (không sửa tay)   ← Khánh
          │
          ▼
        Claude API (Anthropic)
```

Nói về tích hợp MoMo trong pitch: A9 chạy như một microservice, MoMo app gọi API khi nhận tin nhắn. M1/M3 kích hoạt ngay trước màn xác nhận giao dịch.

---

## 5. Ai sở hữu file nào

**Chỉ sửa file của mình.** Muốn sửa file người khác: nhắn chủ file, hoặc mở PR và tag chủ file vào.

| Đường dẫn | Chủ |
|---|---|
| `ai/**` (bản đồ thủ thuật, prompt, bộ test, script build/eval) | Khánh |
| `backend/lambda-analyze/engine.mjs`, `normalize.mjs`, `try_engine.mjs`, `generated/**`, `test/normalize.test.mjs` | Khánh |
| `lib/types.ts`, `lib/config.ts`, `lib/mock/**`, `docs/QUY_UOC_CHUNG.md` | Khánh (**file hợp đồng**: sửa cần 👍 của cả 2 người kia) |
| `backend/lambda-analyze/index.mjs`, `validate.mjs`, `dev_server.mjs`, `package*.json`, `test/handler.test.mjs` | Nam |
| `infra/**`, `extension/**`, `public/fake-zalo.html`, `lib/api.ts`, `.github/**`, `docs/DEPLOY.md` | Nam |
| Cấu hình gốc: `next.config.ts`, `eslint.config.mjs`, `tsconfig.json`, `.gitignore`, `.env.example` | Nam |
| `app/**`, `components/**`, `lib/highlight.ts`, `lib/flow.ts`, `public/**` (trừ fake-zalo.html), `docs/slides/**` | Văn |
| `package.json` / `package-lock.json` gốc | Văn được thêm thư viện UI, Nam được thêm script. Lock bị conflict: xoá lock, `npm install`, commit lại |

---

## 6. Mốc ghép

Ngoài các mốc này, ai làm việc nấy. Tới mốc thì cả 3 cùng kiểm phần ghép.

| Mốc | Xong khi | Ai |
|---|---|---|
| **24/11 tối** | API trên AWS chạy ở `LLM_MODE=mock`; web trên Amplify gọi được API đó; Khánh chạy `npm run try` ra kết quả thật | Nam, Khánh |
| **25/11 tối** | API trên AWS chạy `LLM_MODE=live` với prompt của Khánh; web staging hiện kết quả thật; Extension cảnh báo được trên fake-zalo | Cả 3 |
| **26/11 22:00** | **Code freeze.** Đã chốt model, đã điền demo cache, M1 + M3 chạy trên điện thoại (HTTPS) | Cả 3 |
| **27/11** | Đo holdout (số này mới lên slide), quay video, tập demo | Khánh, Văn |
| **28/11** | Nộp bài (hạn chót 29/11) | Văn |

---

## 7. Git

- Nhánh: `<ten>/<viec>`, chữ thường không dấu, ví dụ `khanh/a9-prompt-v2`, `nam/apigw-cors`, `van/radar-ui`.
- **Không push thẳng `main`**: mọi thay đổi đi qua Pull Request, merge bằng **Squash and merge**.
- Được tự merge PR của mình nếu PR **chỉ đụng file của mình** và **CI xanh**. PR đụng file hợp đồng cần 👍 của 2 người còn lại.
- Commit: `<loại>(<phạm vi>): <mô tả>`. Loại: `feat, fix, docs, style, refactor, test, chore`. Phạm vi: `a9, m1, m3, b9, ui, lambda, ext, infra, contract, docs`.
- Đầu mỗi buổi: `git checkout main && git pull`, rồi tạo nhánh mới hoặc `git merge main` vào nhánh đang làm.
- **Không bao giờ commit key.** `.env`, `.env.local` đã bị chặn. Lỡ lộ key: vào Claude Console xoá key ngay, tạo key mới, báo nhóm.

---

## 8. Lệnh hay dùng

| Lệnh (chạy ở gốc repo) | Làm gì |
|---|---|
| `npm run dev` | Web ở http://localhost:3000 |
| `npm run lint` · `npm run build` | Kiểm tra web như CI |
| `npm run setup:api` | Cài thư viện cho Lambda (1 lần) |
| `npm run dev:api` | API ở http://localhost:8787 (cùng code Lambda) |
| `npm run test:api` | Unit test Lambda |
| `py ai/scripts/build_prompt.py` | Sinh lại prompt/schema sau khi sửa `ai/` (Mac: `python3`) |
| `py ai/scripts/check_contract.py` | Kiểm hợp đồng: schema, mock, tên thủ thuật |
| `powershell -ExecutionPolicy Bypass -File infra/package_lambda.ps1` | Đóng gói Lambda → `infra/dist/lambda.zip` (Mac: `bash infra/package_lambda.sh`) |

**Bị kẹt quá 30 phút thì hỏi nhóm.** Lỗi kiểu "CORS" mà Postman/curl gọi vẫn được: thường do API trả lỗi hoặc quá thời gian, xem chuỗi timeout ở mục 1.5 của file quy ước.
