# Deploy (chủ: Nam)

> Ghi lại **đúng những gì đã làm thật** để ai trong nhóm cũng deploy lại được. **Không ghi key, mật khẩu, token.**
> Các bước chi tiết nằm ở `docs/tracks/NAM_INFRA_EXTENSION.md`. File này giữ các giá trị đã chốt.

| Mục | Giá trị |
|---|---|
| AWS region | _(điền)_ |
| Lambda function | `a9-api` · Node.js 22.x · handler `index.handler` · timeout 30s · 512 MB |
| Biến môi trường Lambda | `LLM_MODE` = _(mock/live)_ · `MODEL_ID` = _(điền)_ · `ANTHROPIC_API_KEY` = (đặt trong console, không ghi ở đây) |
| API Gateway (HTTP API) | Invoke URL: _(điền, không có / cuối)_ · route `POST /analyze`, `POST /m3` · stage `$default` · CORS `*` · throttling rate 10 / burst 20 |
| Amplify | URL: _(điền)_ · nhánh `main` · `NEXT_PUBLIC_USE_MOCK=0` · `NEXT_PUBLIC_API_BASE_URL` = Invoke URL |
| Bản Lambda chạy tốt gần nhất | _(tên file zip + ngày + commit)_ |

## Cập nhật Lambda

1. `powershell -ExecutionPolicy Bypass -File infra/package_lambda.ps1` (Mac: `bash infra/package_lambda.sh`)
2. Lambda console → `a9-api` → Code → Upload from → .zip file → chọn `infra/dist/lambda.zip`
3. Kiểm lại:
   ```bash
   curl -X POST "<Invoke URL>/analyze" -H "content-type: application/json" -d "{\"conversation\":\"Mẹ: chuyển gấp 20tr\"}"
   ```
4. Chạy tốt thì đổi tên zip thành `lambda-good-<ngày>.zip` và cất lại (zip không vào git).

## Khi API sập lúc demo

1. Đổi biến `LLM_MODE=mock` trên Lambda. API trả ngay kết quả mẫu, `meta.source = "mock"`, UI tự hiện nhãn "Kết quả minh hoạ".
2. Hoặc cứ để nguyên: `lib/api.ts` tự lấy demo cache cho các hội thoại có trong `lib/mock/demo_cache.json`.
