@AGENTS.md

# CLAUDE.md: luật cho mọi phiên Claude Code trong repo này

Dự án "3 Lớp Lá Chắn" (MoMo Tech Contest 2026, hạn 29/11/2026): hệ thống AI chống lừa đảo tài chính.
3 người làm song song bằng Claude Code: **Khánh** (AI), **Nam** (Infra + Extension), **Văn** (UI + slide).
Trả lời người dùng bằng **tiếng Việt**.

## Trước khi làm bất cứ gì

1. Biết đang làm cho ai. Nếu người dùng chưa nói mình là Khánh, Nam hay Văn thì hỏi.
2. Đọc file hướng dẫn của người đó: `docs/tracks/KHANH_AI.md`, `docs/tracks/NAM_INFRA_EXTENSION.md` hoặc `docs/tracks/VAN_UI_SLIDES.md`.
3. Đọc `docs/QUY_UOC_CHUNG.md` khi đụng tới API, dữ liệu chung, tên field.

## Luật cứng

- **Chỉ sửa file thuộc người đang làm** (bảng chủ sở hữu ở `README.md` mục 5). Cần đổi file người khác thì dừng lại, nói rõ cần đổi gì, để người dùng nhắn chủ file.
- **Hợp đồng không được phá:** khung response `{ok, result, meta}` / `{ok:false, error, meta}`; 4 khoá `risk_score, tactics, translation, highlights`; JSON và kiểu TS đều dùng `snake_case`, không đổi sang camelCase; chỉ được **thêm** field, không đổi tên hay xoá. Sửa `lib/types.ts`, `lib/config.ts`, `lib/mock/*`, `docs/QUY_UOC_CHUNG.md` thì sửa cùng nhau trong 1 PR, chạy `py ai/scripts/check_contract.py`, và nhắc người dùng xin 👍 của 2 người còn lại.
- **Không sửa tay `backend/lambda-analyze/generated/`**: sửa nguồn trong `ai/` rồi chạy `py ai/scripts/build_prompt.py`.
- **Chỉ `lib/api.ts` gọi API** từ web; component không tự `fetch`. Extension chỉ gọi API từ `service_worker.js`.
- Ngưỡng rủi ro chỉ lấy từ `lib/config.ts` (`RISK_ALERT` 50, `RISK_BRAKE` 70, `RISK_M3` 85, `riskBand()`), không viết số trực tiếp.
- **Không bao giờ** ghi key/secret vào code, commit, log, hay biến `NEXT_PUBLIC_*`. Lambda không log nội dung tin nhắn.
- Git: nhánh `<ten>/<viec>`; không push thẳng `main`; commit `<loại>(<phạm vi>): <mô tả>`; chỉ commit/push/mở PR khi người dùng đồng ý.

## Kiểm tra trước khi commit (theo phần mình đụng)

| Đụng vào | Chạy |
|---|---|
| `app/`, `components/`, `lib/` | `npm run lint` và `NEXT_PUBLIC_USE_MOCK=1 npm run build` |
| `backend/lambda-analyze/` | `npm run test:api` |
| `ai/`, `lib/mock/`, `lib/types.ts` | `py ai/scripts/build_prompt.py` rồi `py ai/scripts/check_contract.py` |
| `extension/` | `node --check extension/<file>.js`, rồi nạp lại extension và thử trên `http://localhost:3000/fake-zalo.html` |

## Sự thật kỹ thuật dễ nhớ sai

- **Next.js 16.4** (App Router, Cache Components bật): API có thay đổi, đọc `node_modules/next/dist/docs/` trước khi viết code Next. Lint chặn `setState` gọi trực tiếp trong `useEffect`; đọc `sessionStorage` thì dùng hook trong `lib/flow.ts`.
- **Claude API** (SDK `@anthropic-ai/sdk` 1.x, chỉ dùng trong `engine.mjs`): model `claude-haiku-5-5` / `claude-sonnet-5-5` / `claude-opus-5-5`, chọn qua biến `MODEL_ID`. Ép JSON bằng `output_config.format` (json_schema); schema **không** hỗ trợ `minimum/maximum/minLength/maxLength/maxItems`, các giới hạn đó nằm trong `normalize.mjs`. Không gửi `temperature`/`top_p` (lỗi 400), không dùng assistant prefill. Đọc `stop_reason` trước khi parse. Timeout SDK tính bằng mili giây.
- Chuỗi timeout: SDK 12s < client 15s < Lambda 30s = trần API Gateway HTTP API.
- Micro (`getUserMedia`) chỉ chạy trên HTTPS hoặc localhost.
