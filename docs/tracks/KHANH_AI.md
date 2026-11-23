# Hướng AI: Khánh

**Mục tiêu:** A9 nhận đúng thủ thuật trên tin nhắn tiếng Việt thật (kể cả teencode), trả lời dưới 5 giây. M3 phản biện sắc, có căn cứ. Có số đo holdout để đưa lên slide.

## Bạn sở hữu

- `ai/data/tactics_map.json`: bản đồ 40 thủ thuật (id, name, group, description, signals, example_vi)
- `ai/prompts/`: `a9_system.template.md` (chỗ `{{TACTICS}}` được điền tự động), `m3_system.md`, `versions.json`
- `ai/data/test_messages.json`: bộ tin để đo (`set`: `dev` hoặc `holdout`, `label`: `scam` hoặc `legit`)
- `ai/scripts/`: `build_prompt.py`, `check_contract.py`, `run_eval.mjs`; kết quả đo nằm ở `ai/results/`
- `backend/lambda-analyze/engine.mjs` (gọi Claude), `normalize.mjs` (lọc output), `try_engine.mjs`, `generated/`, `test/normalize.test.mjs`
- File hợp đồng: `lib/types.ts`, `lib/config.ts`, `lib/mock/**`, `docs/QUY_UOC_CHUNG.md`. Sửa cần 👍 của Nam và Văn

**Không đụng:** `index.mjs`, `validate.mjs` (của Nam), `app/`, `components/` (của Văn).

## Chạy trên máy

```bash
npm run setup:api                                    # 1 lần
cp backend/lambda-analyze/.env.example backend/lambda-analyze/.env
# mở .env, điền ANTHROPIC_API_KEY, đặt LLM_MODE=live
cd backend/lambda-analyze
npm run try -- "Mẹ: Con ơi chuyển gấp 20tr cho mẹ, đừng nói với ba"
npm run eval                                         # đo trên set dev
npm test                                             # test normalize + handler
```

**Vòng lặp sửa prompt:** sửa `ai/` → `py ai/scripts/build_prompt.py` → `npm run try` / `npm run eval` → tăng số trong `ai/prompts/versions.json` khi chốt một bản → commit **cả** `ai/` lẫn `backend/lambda-analyze/generated/`.

## Việc cần làm (theo thứ tự ưu tiên)

1. **Chạy thật lần đầu.** Gọi `npm run try` với 3 tin trong `test_messages.json`.
   *Xong khi:* có kết quả, latency < 5s. Gọi lại trong 5 phút thấy `cache_read` > 0 (prompt cache đã ăn).
2. **Bộ tin đo.** Viết 30 tin `dev` (20 lừa + 10 thật, có teencode/không dấu, đủ 6 nhóm A–F). Thêm 10 tin `holdout` (≥ 40% tin thật, có tin khó); tốt nhất nhờ Văn hoặc người ngoài soạn để mình không "học tủ". Câu ví dụ trong `tactics_map.json` không được trùng tin trong bộ đo.
   *Xong khi:* `npm run eval` chạy hết set dev.
3. **Làm tốt prompt A9.** Sửa description, signals, ví dụ trong bản đồ; sửa template; thêm ví dụ khó.
   *Xong khi:* set dev đạt accuracy ≥ 80%, false positive ≤ 20%, latency trung bình < 5s.
4. **Chọn model.** Chạy `npm run eval` với `MODEL_ID=claude-haiku-5-5`, `claude-sonnet-5-5`, `claude-opus-5-5`. Chọn model rẻ nhất vẫn đạt mục 3, báo Nam đổi biến `MODEL_ID` trên Lambda (không sửa code). Sonnet/Opus 5.5 tự bật fallback khi bị từ chối; Haiku thì không.
5. **Prompt M3.** Bật `npm run dev:api` (LLM_MODE=live) và web với `NEXT_PUBLIC_USE_MOCK=0`, thử ở `/doi-thoai`.
   *Xong khi:* phản biện được ít nhất 3 kiểu lý do khác nhau, lần nào cũng trích đúng dấu hiệu trong hội thoại.
6. **Demo cache (phương án B6).** Chạy thật 10 hội thoại trong kịch bản demo của Văn. Chép `{conversation, result}` vào `lib/mock/demo_cache.json`, chạy `check_contract.py`. Khi API lỗi lúc demo, web tự trả kết quả lưu sẵn, có nhãn "Kết quả minh hoạ". Đây là file hợp đồng nên cần 👍.
7. **Số cho slide.** Tối 27/11 chạy `npm run eval -- --set holdout --repeat 3` **một lần duy nhất** trên bản chốt. Gửi Văn accuracy, false positive, latency, model, prompt_version. **Slide chỉ dùng số holdout.**

## Chỗ ghép với người khác

- **Nam** gọi `analyze()` và `m3Reply()` từ `index.mjs`. Giữ nguyên chữ ký hàm và kiểu lỗi `EngineError` (`.code` ∈ `LLM_ERROR`, `LLM_REFUSED`, `LLM_TRUNCATED`). Muốn đổi thì nhắn Nam trước.
- **Key cho Lambda:** tạo key riêng tên `momo-lambda` trong Claude Console, đặt hạn mức chi tiêu thấp, và **tự tay** dán vào biến môi trường Lambda (không gửi key qua chat).
- **Văn** đọc `name`, `group`, `evidence`, `explanation`, `translation`. Đổi tên thủ thuật xong mà `check_contract.py` báo lệch với mock thì sửa mock trong cùng PR.

## Bẫy hay gặp

- Model trích `evidence` sai một dấu, thế là `normalize.mjs` bỏ cả thủ thuật đó. Thấy `tactics` rỗng bất thường thì in output thô ra xem; sửa prompt chứ đừng nới luật nguyên văn.
- Chèn ngày giờ hay ID vào system prompt sẽ làm mất prompt cache. System prompt phải giữ y hệt giữa các lần gọi.
- Dùng một bộ tin cho cả sửa prompt lẫn báo cáo thì số đẹp giả. Holdout chỉ chạy lần cuối.

## Câu mở đầu cho Claude Code

> Tôi là Khánh, phụ trách hướng AI của dự án. Đọc `CLAUDE.md`, `README.md`, `docs/QUY_UOC_CHUNG.md` và `docs/tracks/KHANH_AI.md`. Chỉ sửa các file thuộc phần của tôi. Bắt đầu từ việc số 1 trong file hướng dẫn. Làm xong mỗi việc thì chạy kiểm tra tương ứng, báo kết quả và hỏi tôi trước khi commit.
