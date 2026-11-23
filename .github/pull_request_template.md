## Làm gì

<!-- 1–3 dòng: PR này thêm/sửa gì, thuộc hướng nào (AI / Infra + Extension / UI) -->

## Tự kiểm trước khi xin merge

- [ ] Chỉ sửa file thuộc phần của mình (bảng chủ sở hữu trong `README.md`). Nếu đụng file người khác: đã nhắn chủ file.
- [ ] CI xanh (Web, Lambda, Hợp đồng).
- [ ] Không có `.env`, key, `node_modules`, file `.zip` trong PR.

**Nếu PR sửa prompt hoặc bản đồ thủ thuật** (`ai/`):

- [ ] Đã chạy `py ai/scripts/build_prompt.py` và commit cả thư mục `backend/lambda-analyze/generated/`.
- [ ] Đã tăng số trong `ai/prompts/versions.json`.

**Nếu PR đụng file hợp đồng** (`lib/types.ts`, `lib/config.ts`, `lib/mock/*`, `docs/QUY_UOC_CHUNG.md`):

- [ ] `py ai/scripts/check_contract.py` ra ✓.
- [ ] Chỉ **thêm** field, không đổi tên hay xoá field.
- [ ] Đã có 👍 của cả 2 người còn lại trong PR này.
