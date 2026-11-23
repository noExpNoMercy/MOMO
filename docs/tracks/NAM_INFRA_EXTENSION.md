# Hướng Infra + Extension: Nam

**Mục tiêu:** API `POST /analyze` và `POST /m3` chạy ổn định trên AWS. Web online qua HTTPS (để micro chạy trên điện thoại). Chrome Extension cảnh báo được ngay trên trang chat. Mọi PR đều có CI kiểm.

## Bạn sở hữu

- `backend/lambda-analyze/index.mjs` (handler), `validate.mjs`, `dev_server.mjs`, `package.json`, `package-lock.json`, `test/handler.test.mjs`
- `infra/` (script đóng gói Lambda), `docs/DEPLOY.md` (ghi lại cách deploy thật, **không** ghi key)
- `extension/` (manifest MV3, service worker, content script, overlay), `public/fake-zalo.html`
- `lib/api.ts`: chỗ duy nhất web gọi API
- `.github/` (CI, PR template), cấu hình gốc (`next.config.ts`, `eslint.config.mjs`, `tsconfig.json`, `.gitignore`, `.env.example`)

**Không đụng:** `engine.mjs`, `normalize.mjs`, `generated/`, `ai/` (của Khánh), `app/`, `components/` (của Văn).

## Chạy trên máy

```bash
npm run setup:api
npm run test:api                     # 13 test phải xanh
npm run dev:api                      # API ở http://localhost:8787, mặc định LLM_MODE=mock (xem backend/lambda-analyze/.env)
curl -X POST http://localhost:8787/analyze -H "content-type: application/json" -d "{\"conversation\":\"Mẹ: chuyển gấp 20tr\"}"
```

`LLM_MODE=mock` trả `lib/mock/analyze_high.json` và `m3_reply.json` mà không cần key. Nhờ vậy bạn deploy và ghép được trước khi Khánh xong prompt.

## Việc cần làm (theo thứ tự ưu tiên)

1. **AWS nền.** Bật MFA cho tài khoản root. Tạo IAM user cho 3 người. Chọn **1 region** dùng chung và báo nhóm. Đặt AWS Budget cảnh báo $5/ngày.
2. **Lambda.** Chạy `powershell -ExecutionPolicy Bypass -File infra/package_lambda.ps1` (Mac: `bash infra/package_lambda.sh`) để có `infra/dist/lambda.zip`. Tạo function `a9-api`:
   - Runtime **Node.js 22.x**, handler `index.handler`, **timeout 30 giây**, memory 512 MB
   - Biến môi trường: `LLM_MODE=mock`, `MODEL_ID=claude-haiku-5-5` (Khánh tự dán `ANTHROPIC_API_KEY`)
3. **API Gateway HTTP API.** Route `POST /analyze` và `POST /m3`, cả hai trỏ về `a9-api`. Stage `$default`, bật auto-deploy. Cấu hình CORS: origin `*`, method `POST, OPTIONS`, header `content-type`. Throttling stage: rate 10, burst 20.
   *Xong khi:* `curl` cả 2 route ra `"ok": true, "source": "mock"`. Gửi Invoke URL vào nhóm.
4. **Amplify Hosting.** Nối repo, nhánh `main`. Biến môi trường `NEXT_PUBLIC_USE_MOCK=0`, `NEXT_PUBLIC_API_BASE_URL=<Invoke URL, không có / cuối>`. Đổi biến `NEXT_PUBLIC_*` thì phải **Redeploy**.
   *Xong khi:* mở URL Amplify trên điện thoại, dán tin, thấy kết quả lấy từ API (DevTools → Network có request `analyze` trả 200).
5. **Bật live** (mốc 25/11): Khánh đã có prompt và dán key → đổi `LLM_MODE=live`. Đóng gói lại zip mỗi khi `engine.mjs` hoặc `generated/` đổi. Giữ zip chạy tốt gần nhất (đổi tên `lambda-good-<ngày>.zip`) để quay lại trong 1 phút.
6. **Extension.** Vào `chrome://extensions` → bật Developer mode → **Load unpacked** → chọn thư mục `extension/`. Mở `http://localhost:3000/fake-zalo.html` (cần `npm run dev` và `npm run dev:api`), bấm "Tin tiếp theo" 3 lần là overlay hiện.
   Sau đó đổi `API_BASE_URL` trong `extension/config.js` sang URL AWS, và thêm domain Amplify vào `matches`. Domain API đã có sẵn trong `host_permissions`.
   *Xong khi:* chạy được trên fake-zalo ở bản Amplify. Zalo Web thật là phần thêm: thêm một mục vào `SITES` trong `content.js` với selector thật. Hạn chót cho phần này là 26/11 15:00; quá hạn thì Extension chỉ demo trên fake-zalo.
7. **Viết `docs/DEPLOY.md`** theo đúng những gì đã làm (region, tên function, URL, biến môi trường; **không** ghi key), để người khác deploy lại được khi bạn bận.

## Chỗ ghép với người khác

- **Khánh:** `index.mjs` chỉ gọi `analyze(conversation)` và `m3Reply(input)` của `engine.mjs`, bắt `EngineError` theo `.code`. Đổi model chỉ cần đổi biến `MODEL_ID`, không sửa code.
- **Văn:** web chỉ gọi API qua `lib/api.ts`. Muốn thêm hàm cho Văn thì thêm vào đây, giữ nguyên kiểu trả về `ApiResponse<T>`.
- **Giới hạn đồng bộ:** số trong `validate.mjs`, `extension/config.js` và `lib/config.ts` phải khớp nhau (3000 ký tự, 10 KB, 15s, ngưỡng 50/70/85).

## Bẫy hay gặp

- Lambda timeout mặc định 3 giây, gọi Claude lần đầu là "Task timed out". Đặt 30 giây ngay khi tạo.
- Đặt CORS ở **API Gateway**, không đặt trong Lambda. Postman gọi được mà trình duyệt báo CORS thì thường là API lỗi hoặc timeout chứ không phải CORS thật.
- `npm ci` trong zip phải chạy trên bản copy ở `infra/dist/stage` (script đã làm sẵn). Đừng zip cả thư mục `backend/lambda-analyze`, vì sẽ kéo theo `.env` và test.
- Content script không gọi API trực tiếp (vướng CORS và CSP của trang). Luôn gửi message sang service worker.

## Câu mở đầu cho Claude Code

> Tôi là Nam, phụ trách Infra và Chrome Extension của dự án. Đọc `CLAUDE.md`, `README.md`, `docs/QUY_UOC_CHUNG.md` và `docs/tracks/NAM_INFRA_EXTENSION.md`. Chỉ sửa các file thuộc phần của tôi. Bắt đầu từ việc số 1 trong file hướng dẫn; với các bước trên AWS Console, hướng dẫn tôi từng bước rồi kiểm lại bằng `curl`. Hỏi tôi trước khi commit.
