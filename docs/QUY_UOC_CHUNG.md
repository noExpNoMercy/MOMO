# QUY ƯỚC CHUNG — "3 Lớp Lá Chắn" (chốt 23/11/2026)

> **Đây là nguồn sự thật duy nhất cho hợp đồng giữa Khánh · Nam · Văn.**
> Chỗ nào tài liệu kế hoạch cũ của nhóm (README_NHOM, KE_HOACH_CHI_TIET, không nằm trong repo) nói khác thì **file này thắng** (mục 6).
> Chủ file: Khánh. Sửa file này = sửa hợp đồng: cần 👍 của Nam và Văn (mục 3.2).
> **Code thật:** `lib/types.ts`, `lib/config.ts`, `lib/mock/*`, `backend/lambda-analyze/generated/*.schema.json`. Các đoạn code và JSON trong file này chỉ để đọc nhanh: **lệch nhau thì file code thắng**, đừng copy code từ đây.
>
> **Đọc tối thiểu:** Nam đọc mục 0, 1.1, 1.5, 2, 3 · Văn đọc mục 0, 1.3 (luật phía UI), 1.6, 2.3, 4. Ai sở hữu file nào: `README.md` mục 5.

---

## 0. 12 điểm cả 3 người phải gật đầu trước khi tách ra làm song song

| # | Quyết định | Chủ | Không theo thì ai bị kẹt |
|---|---|---|---|
| 1 | Mọi endpoint trả cùng một khung: `{ok, result, meta}` hoặc `{ok:false, error, meta}` | Nam | Văn phải viết 2 kiểu xử lý; Extension của Nam vỡ |
| 2 | `POST /analyze` nhận đúng `{conversation: string}`, theo định dạng dòng ở mục 1.2 | Khánh | Prompt không phân biệt ai nói gì → Khánh chấm sai; Extension gửi sai định dạng |
| 3 | `result` có đúng 4 khoá `risk_score, tactics, translation, highlights`; phần tử theo mục 1.3 | Khánh | Văn dựng Radar trên khoá sai, tới lúc ghép mới lộ |
| 4 | Server đảm bảo mọi `evidence`/`highlights.text` là **chuỗi con nguyên văn**, `name`/`group` lấy từ bản đồ thủ thuật | Khánh | UI tô màu không khớp, tên thủ thuật lệch nhau giữa các màn |
| 5 | Mã lỗi cố định (mục 1.5), và chuỗi timeout `12s < 15s < 30s` | Nam + Khánh | UI treo, hoặc hiện "CORS error" giả làm debug sai hướng |
| 6 | Ngưỡng rủi ro chỉ nằm trong `lib/config.ts` (mục 1.6) | Khánh | M1/M3 kích hoạt sai ngưỡng, Radar và Extension lệch màu |
| 7 | 3 môi trường `mock` / `local` / `staging`, 5 biến env cố định (mục 2) | Nam | Văn bị block chờ API; key lọt ra trình duyệt |
| 8 | Chỉ `lib/api.ts` được gọi `fetch` tới API | Nam | Mỗi trang xử lý lỗi một kiểu, đổi base URL phải sửa nhiều chỗ |
| 9 | Cấu trúc repo theo bản Node.js; `index.mjs` (Nam) tách khỏi `engine.mjs` (Khánh) | Nam | Khánh và Nam cùng sửa một file → conflict mỗi ngày |
| 10 | Nhánh `<ten>/<viec>`, PR + squash, `main` luôn build được | Cả nhóm | Amplify build hỏng → staging chết cho cả 3 |
| 11 | JSON và kiểu TS đều dùng `snake_case`, **không** đổi sang camelCase | Văn | `riskScore` và `risk_score` cùng tồn tại → bug lúc ghép |
| 12 | Đổi hợp đồng = sửa types + schema + mock + file này **trong cùng 1 PR**, chạy `check_contract.py` qua, có 👍 của 2 người còn lại | Khánh | Mock và API thật lệch nhau, Văn làm theo mock sai |

---

## 1. Hợp đồng API

### 1.1. Khung chung cho mọi endpoint (`/analyze`, `/m3`)

- `POST`, header `Content-Type: application/json`, không có xác thực, body tối đa **10 KB**.
- **Thành công:** HTTP 200
  ```json
  { "ok": true, "result": { }, "meta": { } }
  ```
- **Lỗi:** HTTP 4xx/5xx
  ```json
  { "ok": false, "error": { "code": "TOO_LARGE", "message": "conversation > 3000 ky tu" }, "meta": { "request_id": "8f1c..." } }
  ```
- Client rẽ nhánh theo `ok`, không theo HTTP status. Body không phải JSON, hoặc JSON không có `ok` (ví dụ API Gateway tự trả 503/429), thì `lib/api.ts` tự đổi thành `NETWORK_ERROR` hoặc `RATE_LIMITED`.
- **Đọc lỏng, ghi chặt:** server bỏ qua field lạ trong request, client bỏ qua field lạ trong response. Nhờ vậy thêm field mới không làm vỡ ai.

> **Tại sao:** một khung duy nhất thì `lib/api.ts` chỉ cần một hàm gỡ, Extension và Web xử lý lỗi giống nhau, và `meta.source` luôn cho biết kết quả là thật hay giả.

### 1.2. `POST /analyze` · Request

```json
{
  "conversation": "Mẹ: Con ơi mẹ đang kẹt, chuyển gấp 20tr cho mẹ nha, đừng nói với ba\nTôi: Mẹ sao vậy?"
}
```

| Quy tắc | Chi tiết |
|---|---|
| Kiểu | `string`, bắt buộc, sau khi trim còn **1–3000 ký tự** (3000 ký tự tiếng Việt ≈ tối đa 9 KB UTF-8, vẫn dưới trần 10 KB) |
| Định dạng | **Mỗi tin một dòng** `<Tên người gửi>: <nội dung>`, tin cũ trước, tin mới sau. Tin do chủ máy gửi đi ghi `Tôi:`. Tin nhận ghi đúng tên hiển thị (`Mẹ`, `Vietcombank CSKH`...), không biết tên thì ghi `Người lạ:`. Xuống dòng bên trong một tin thì thay bằng dấu cách |
| Dán tự do | Người dùng dán 1 tin không có tiền tố cũng hợp lệ. Prompt coi đó là **1 tin nhận** |
| Chuẩn hoá | Server chuyển `conversation` sang Unicode **NFC** trước khi làm gì khác. Tiếng Việt copy từ macOS/Zalo hay ở dạng NFD, không chuẩn hoá thì so chuỗi con sẽ trượt |
| Extension | Gửi tối đa **15 tin gần nhất**, cắt bớt từ phía tin cũ cho vừa 3000 ký tự. Chỉ gọi khi có **tin nhận mới**, tối đa 1 lần / 2 giây / tab |

> **Tại sao chốt định dạng dòng:** tên người gửi ("Mẹ") chính là tín hiệu giả danh. Nếu Extension gửi nối liền không có tên, prompt của Khánh mất tín hiệu đó. Giữ `conversation` là string (không đổi sang mảng) vì khoá này đã chốt từ trước và mock endpoint đang dùng.
>
> ⚠ **Không theo thì:** Khánh đo accuracy trên một định dạng còn Extension gửi định dạng khác, nên số liệu trên slide không còn đúng với sản phẩm.

### 1.3. `POST /analyze` · Response

Ví dụ minh hoạ dưới đây khớp với request ở 1.2. **Dữ liệu để dựng UI thì dùng `lib/mock/*`**, không dùng ví dụ này.

```json
{
  "ok": true,
  "result": {
    "risk_score": 92,
    "tactics": [
      {
        "id": "T06",
        "name": "Giả danh người thân",
        "group": "B",
        "evidence": "Con ơi mẹ đang kẹt",
        "explanation": "Mạo nhận là người bạn tin nhất để bạn bỏ qua bước kiểm tra."
      },
      {
        "id": "T01",
        "name": "Áp lực thời gian",
        "group": "A",
        "evidence": "chuyển gấp 20tr",
        "explanation": "Tạo cảm giác phải làm ngay để bạn không kịp gọi lại xác minh."
      },
      {
        "id": "T13",
        "name": "Yêu cầu giữ bí mật",
        "group": "C",
        "evidence": "đừng nói với ba",
        "explanation": "Cắt bạn khỏi người có thể cảnh báo bạn."
      }
    ],
    "translation": "Tôi ép bạn chuyển tiền thật nhanh và giấu mọi người, để bạn không kịp hỏi lại ai.",
    "highlights": [
      { "text": "Con ơi mẹ đang kẹt", "tactic_id": "T06" },
      { "text": "chuyển gấp 20tr", "tactic_id": "T01" },
      { "text": "đừng nói với ba", "tactic_id": "T13" }
    ]
  },
  "meta": {
    "request_id": "8f1c2a4e-5b6d-4e7f-9a0b-1c2d3e4f5a6b",
    "latency_ms": 2140,
    "model": "claude-haiku-5-5",
    "prompt_version": "a9-v3",
    "source": "live"
  }
}
```

**Tin bình thường** (Văn phải dựng UI cho cả trường hợp này):

```json
{
  "ok": true,
  "result": {
    "risk_score": 8,
    "tactics": [],
    "translation": "Mình chỉ hỏi tối nay bạn có về ăn cơm không.",
    "highlights": []
  },
  "meta": { "request_id": "mock", "latency_ms": 0, "model": "mock", "prompt_version": "mock", "source": "mock" }
}
```

**Luật từng trường** (cột cuối là ai chịu trách nhiệm đảm bảo):

| Trường | Kiểu | Luật | Ai đảm bảo |
|---|---|---|---|
| `risk_score` | integer | 0–100. Structured outputs **không ép được min/max**, nên server làm tròn và kẹp | Khánh (`engine.mjs`) |
| `tactics` | array | 0–6 phần tử, **nguy hiểm nhất đứng đầu**. Không thấy gì thì `[]` | Khánh |
| `tactics[].id` | string | `T01`–`T40`. Schema LLM dùng `enum` sinh từ bản đồ thủ thuật, nên không bao giờ ra ID lạ | Khánh |
| `tactics[].name` | string | **Server ghi đè** theo bản đồ thủ thuật. UI chỉ hiển thị, không tự tra ID→tên | Khánh |
| `tactics[].group` | string | `A`–`F`, server điền theo bản đồ (bảng nhóm ở mục 4.2). UI tô màu theo trường này | Khánh |
| `tactics[].evidence` | string | **Chuỗi con nguyên văn** của `conversation` (sau NFC). Không khớp thì server **bỏ cả thủ thuật đó** | Khánh |
| `tactics[].explanation` | string | 1 câu, nói với "bạn", giải thích *vì sao chiêu này hiệu quả*, không lặp lại tên. Mục tiêu ≤ 160 ký tự | Khánh (prompt) |
| `translation` | string | **Luôn có nội dung** (kể cả tin an toàn). Ngôi thứ nhất của người gửi ("Tôi..."). **Không** kèm nhãn "Câu này nghĩa là:" vì nhãn do UI thêm. Mục tiêu ≤ 200 ký tự | Khánh (prompt) |
| `highlights` | array | 0–10 phần tử. `text` là chuỗi con nguyên văn, `tactic_id` phải có trong `tactics`. Server bỏ phần tử sai và tự thêm `evidence` của từng thủ thuật nếu còn thiếu. `tactics` rỗng thì `highlights` rỗng | Khánh |
| `meta.request_id` | string | `context.awsRequestId` của Lambda. Thấy kết quả lạ thì gửi ID này cho Nam tra CloudWatch | Nam |
| `meta.latency_ms` | integer | Đo trong Lambda, từ đầu handler tới lúc trả | Nam |
| `meta.model` | string | Model ID thật đã gọi, hoặc `"mock"` | Nam |
| `meta.prompt_version` | string | Ví dụ `"a9-v3"`, `"m3-v1"`, hoặc `"mock"`. Khánh tăng số mỗi lần đổi prompt | Khánh |
| `meta.source` | string | `"live"` (LLM thật) · `"mock"` (Lambda `LLM_MODE=mock` hoặc client `USE_MOCK`) · `"cache"` (demo cache phía client, phương án B6) | Nam |

**Luật phía UI** (Văn):
- So highlight trên `conversation.normalize("NFC")`, **phân biệt hoa thường**, tô **mọi** vị trí xuất hiện. Hai cụm chồng nhau thì giữ cụm dài hơn. Không tìm thấy thì bỏ qua, **không crash**.
- Độ dài trong bảng là mục tiêu của prompt, server **không cắt chữ**. Khung UI phải tự xuống dòng, không đặt chiều cao cố định.
- `meta.source !== "live"` thì hiện nhãn **"Kết quả minh hoạ"**, để giám khảo không bắt được lỗi trình bày dữ liệu giả như thật.

> ⚠ **Không theo thì:** nếu server không lọc mà LLM trích lệch một dấu, UI của Văn tô sai chỗ hoặc vỡ ngay giữa demo. Nếu UI không chịu được `tactics: []`, màn hình trắng đúng lúc giám khảo gõ một tin bình thường.

### 1.4. `POST /m3` (cùng khung, giao 26/11)

**Request:**

```json
{
  "conversation": "Mẹ: Con ơi mẹ đang kẹt, chuyển gấp 20tr cho mẹ nha, đừng nói với ba",
  "tactics": [ { "id": "T06", "name": "Giả danh người thân", "group": "B", "evidence": "Con ơi mẹ đang kẹt", "explanation": "..." } ],
  "amount_vnd": 20000000,
  "history": [
    { "role": "user", "content": "Mẹ tôi thật mà, giọng giống lắm" },
    { "role": "assistant", "content": "Tao cũng từng nghĩ vậy..." }
  ],
  "user_reason": "Mẹ cần gấp, tôi không chuyển thì mẹ gặp chuyện"
}
```

| Trường | Luật |
|---|---|
| `conversation` | Cùng định dạng và giới hạn như `/analyze` |
| `tactics` | Chép **nguyên** `result.tactics` của lần `/analyze` gần nhất, không sửa |
| `amount_vnd` | integer > 0, lấy từ màn chuyển tiền. Persona "bạn của ngày mai" cần biết đã mất bao nhiêu |
| `history` | Các lượt trước, cũ trước mới sau, **không** gồm `user_reason` hiện tại. Tối đa 10 phần tử. `role` ∈ `"user"`, `"assistant"` (khớp thẳng với Claude API, khỏi đổi tên) |
| `user_reason` | 15–500 ký tự. UI chặn dưới 15, server vẫn kiểm lại và trả `BAD_REQUEST` |

**Response `result`:**

```json
{ "reply": "Tao là mày của ngày mai đây. Tao cũng nghĩ 'mẹ cần gấp thì phải chuyển', và tao mất 20 triệu. Mày gọi lại số cũ của mẹ chưa?", "signs_used": ["T06"] }
```

- `reply`: tiếng Việt, mục tiêu ≤ 400 ký tự.
- `signs_used`: tập con các `id` trong `tactics` gửi lên. Server lọc bỏ ID lạ.
- Khi nào kết thúc đối thoại (60 giây, số lượt) là **logic UI** của Văn, không nằm trong API.

### 1.5. Mã lỗi

| `code` | HTTP | Ai sinh | Khi nào |
|---|---|---|---|
| `BAD_REQUEST` | 400 | Lambda | JSON hỏng, thiếu field, sai kiểu, `conversation` rỗng sau trim, `user_reason` < 15 ký tự |
| `TOO_LARGE` | 413 | Lambda | body > 10 KB hoặc `conversation` > 3000 ký tự |
| `RATE_LIMITED` | 429 | Lambda / API Gateway | Vượt throttling |
| `LLM_ERROR` | 502 | Lambda | Anthropic API lỗi, quá tải, hoặc quá 12 giây |
| `LLM_REFUSED` | 502 | Lambda | `stop_reason === "refusal"` |
| `LLM_TRUNCATED` | 502 | Lambda | `stop_reason === "max_tokens"` |
| `INTERNAL` | 500 | Lambda | Mọi lỗi còn lại (try/catch ngoài cùng) |
| `TIMEOUT` | — | **chỉ `lib/api.ts`** | Sau 15 giây chưa có trả lời |
| `NETWORK_ERROR` | — | **chỉ `lib/api.ts`** | `fetch` thất bại, body không phải JSON, hoặc JSON không có `ok` |

- `error.message` dành cho dev, **không hiển thị**. `lib/api.ts` giữ một bảng `code → câu tiếng Việt` cho UI.
- Gặp lỗi `LLM_*`, `TIMEOUT` hoặc `NETWORK_ERROR` khi đang demo thì `lib/api.ts` chuyển sang demo cache (B6), trả kết quả với `meta.source = "cache"`.

**Chuỗi timeout (không được đổi một số mà quên các số còn lại):**

```
SDK Anthropic 12s  <  client lib/api.ts 15s  <  Lambda 30s  =  trần HTTP API Gateway 30s
```

Lambda luôn trả **lỗi đúng khung của mình** trước khi client bỏ cuộc. Nếu đảo thứ tự, client sẽ thấy API Gateway cắt ngang, nhận một lỗi không có header CORS, và Văn sẽ debug CORS trong khi lỗi thật là LLM chậm.

> ⚠ **Không theo thì:** Văn nhận lỗi không rõ nguồn, Nam mất buổi tối debug CORS giả.

### 1.6. Ngưỡng rủi ro (`lib/config.ts`, Khánh giữ giá trị)

```ts
// Tóm tắt để đọc. File thật: lib/config.ts
export const RISK_ALERT = 50;          // ≥ 50: Radar cảnh báo, Extension hiện overlay, tính là "Lừa đảo" khi đo accuracy
export const RISK_BRAKE = 70;          // ≥ 70: M1 phanh khi bấm Chuyển tiền
export const RISK_M3    = 85;          // ≥ 85: sau 15s phanh, bắt qua M3
export function riskBand(score): "clear" | "suspicious" | "dangerous" | "critical"
export const FREEZE_SECONDS = 15;
export const M3_MIN_REASON_CHARS = 15, M3_MAX_REASON_CHARS = 500, M3_MAX_HISTORY = 10;
export const CONVERSATION_MAX_CHARS = 3000;
export const API_TIMEOUT_MS = 15_000;
```

| `risk_score` | Nghĩa | `riskBand()` | Màu UI | Hành động |
|---|---|---|---|---|
| 0–49 | Chưa đủ dấu hiệu | `clear` | xanh | Không làm gì |
| 50–69 | Nghi ngờ | `suspicious` | vàng | Radar cảnh báo, Extension hiện overlay |
| 70–84 | Nguy hiểm | `dangerous` | cam | Thêm M1 phanh 15 giây |
| 85–100 | Gần như chắc chắn lừa | `critical` | đỏ | Thêm M3 sau phanh |

- Component **không** viết số `70` trực tiếp, luôn import từ `lib/config.ts`. Muốn chọn màu thì gọi `riskBand(score)`, không tự so sánh.
- Extension không import được `lib/`, nên `extension/config.js` chép `RISK_ALERT = 50` kèm comment `// đồng bộ với lib/config.ts`.
- Prompt của Khánh neo thang điểm theo đúng 4 khoảng này.

### 1.7. Kiểu TypeScript (bản rút gọn của `lib/types.ts`, dùng file thật)

```ts
// HỢP ĐỒNG CHUNG — sửa file này thì sửa analyze.schema.json + lib/mock/* + docs/QUY_UOC_CHUNG.md trong CÙNG 1 PR.
// Tên field giữ snake_case y hệt JSON. KHÔNG đổi sang camelCase.

export type TacticId = string;                       // "T01".."T40"
export type TacticGroup = "A" | "B" | "C" | "D" | "E" | "F";

export type Tactic = {
  id: TacticId;
  name: string;
  group: TacticGroup;
  evidence: string;
  explanation: string;
};

export type Highlight = { text: string; tactic_id: TacticId };

export type AnalyzeRequest = { conversation: string };

export type AnalyzeResult = {
  risk_score: number;
  tactics: Tactic[];
  translation: string;
  highlights: Highlight[];
};

export type Meta = {
  request_id: string;
  latency_ms: number;
  model: string;
  prompt_version: string;
  source: "live" | "mock" | "cache";
};

export type ErrorCode =
  | "BAD_REQUEST" | "TOO_LARGE" | "RATE_LIMITED"
  | "LLM_ERROR" | "LLM_REFUSED" | "LLM_TRUNCATED" | "INTERNAL"
  | "TIMEOUT" | "NETWORK_ERROR";                     // 2 mã cuối chỉ lib/api.ts sinh ra

export type ApiResponse<T> =
  | { ok: true; result: T; meta: Meta }
  | { ok: false; error: { code: ErrorCode; message: string }; meta?: { request_id: string } };

export type AnalyzeResponse = ApiResponse<AnalyzeResult>;

export type M3Turn = { role: "user" | "assistant"; content: string };

export type M3Request = {
  conversation: string;
  tactics: Tactic[];
  amount_vnd: number;
  history: M3Turn[];
  user_reason: string;
};

export type M3Result = { reply: string; signs_used: TacticId[] };
export type M3Response = ApiResponse<M3Result>;
```

### 1.8. Ràng buộc kỹ thuật Khánh phải giữ để hợp đồng trên luôn đúng

- Ép JSON bằng **structured outputs** `output_config: { format: { type: "json_schema", schema } }`. Field `id` dùng `enum` do `ai/scripts/build_prompt.py` sinh từ `ai/data/tactics_map.json` (hiện đủ T01–T40).
- Structured outputs **không hỗ trợ** `minimum/maximum`, `minLength/maxLength` hay giới hạn số phần tử mảng. Vì vậy `normalize.mjs` chạy sau LLM: kẹp `risk_score`, cắt `tactics` ≤ 6 và `highlights` ≤ 10, bỏ evidence/highlight không phải chuỗi con, điền lại `name`/`group`, bổ sung highlight còn thiếu.
- Đọc `stop_reason` **trước** khi parse: `"refusal"` thì trả `LLM_REFUSED`, `"max_tokens"` thì trả `LLM_TRUNCATED`.
- Khởi tạo SDK: `new Anthropic({ timeout: 12_000, maxRetries: 0 })`. SDK TypeScript tính timeout bằng **mili giây**, và mỗi lần retry cộng thêm một timeout nữa, nên bật retry sẽ vượt ngân sách 15 giây của client.
- Không gửi `temperature`/`top_p` (model hiện hành trả lỗi 400). Dùng `output_config.effort: "low"`, `max_tokens: 4096`. Model 5.5 bật thinking mặc định và thinking tính vào `max_tokens`, nên đặt thấp sẽ hay ra `LLM_TRUNCATED`.
- Nếu 26/11 chốt Sonnet/Opus 5.5 thì bật thêm fallback khi bị từ chối (`fallbacks: "default"`, beta `server-side-fallback-2026-07-01`). Haiku 5.5 **không** có fallback phía server, nên `LLM_REFUSED` đi thẳng về client và client bật cache B6.

---

## 2. Môi trường và base URL

### 2.1. Ba môi trường, không có "prod" riêng

| Môi trường | Web chạy ở | Gọi API ở | LLM | Dùng khi |
|---|---|---|---|---|
| **`mock`** | `localhost:3000` | **Không gọi mạng**, đọc `lib/mock/*.json` | Không | Văn dựng UI trước khi có API, test đủ các trạng thái |
| **`local`** | `localhost:3000` | `npm run dev:api` (http://localhost:8787, cùng code Lambda) hoặc API Gateway thật | Mock hoặc thật tuỳ `LLM_MODE` | Nối thật trên máy, không cần AWS |
| **`staging`** | Amplify, build tự động từ nhánh `main` | API Gateway thật | Thật | Điện thoại, Extension, quay video, **demo** |
| *(phòng prompt)* | `npm run try` / `npm run eval` trong `backend/lambda-analyze` | Gọi thẳng `engine.mjs` | Thật | Khánh sửa prompt, đo accuracy. Không cần Lambda |

**Quyết định:**
- **Staging chính là môi trường demo.** Không dựng stack thứ hai: 6 ngày không đủ để Nam vận hành 2 stack. Thay vào đó:
  - **Code freeze 26/11 22:00.** Sau mốc này chỉ merge PR sửa lỗi.
  - Nam giữ zip Lambda chạy tốt gần nhất (`lambda-good-<ngày>.zip`), cần thì upload lại trong 1 phút.
  - Gắn tag git `rc-27-11` trên commit dùng để quay video.
- **Không dùng SAM hay serverless-offline** (trên Windows tốn nửa ngày cài). `dev_server.mjs` chạy đúng handler của Lambda trên máy, kèm CORS cho localhost.
- **Model dùng lúc dev (23–25/11): `claude-haiku-5-5`**, rẻ và nhanh nhất. Model cuối do eval 30 tin ngày 26/11 quyết, chỉ cần đổi `MODEL_ID`, không sửa code.

### 2.2. Biến môi trường (đây là danh sách đầy đủ, `.env.example` chép đúng danh sách này)

| Biến | Đặt ở đâu | Giá trị | Bí mật? |
|---|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | Amplify + `.env.local` | `https://<api-id>.execute-api.<region>.amazonaws.com`. **Không** có `/` cuối, **không** có tên stage (HTTP API dùng `$default`). Khi bật phương án B1/B3 thì đặt `/api` | Không |
| `NEXT_PUBLIC_USE_MOCK` | Amplify + `.env.local` | `1` = đọc mock cục bộ, `0` = gọi API. Amplify luôn `0` | Không |
| `ANTHROPIC_API_KEY` | **Chỉ** biến môi trường Lambda, hoặc `backend/lambda-analyze/.env` trên máy | Key thật | **Có**, không bao giờ có tiền tố `NEXT_PUBLIC_` |
| `MODEL_ID` | Lambda | `claude-haiku-5-5` (dev) | Không |
| `LLM_MODE` | Lambda (+ `backend/lambda-analyze/.env` khi chạy trên máy) | `live` hoặc `mock` (trên máy mặc định `mock`). Khi `mock`: `/analyze` trả bản chép của `analyze_high.json`, `/m3` trả bản chép của `m3_reply.json`. Dùng cho ngày 1 khi chưa có engine, và làm **công tắc khẩn cấp** khi LLM sập | Không |

- Đổi biến `NEXT_PUBLIC_*` trên Amplify thì phải **Redeploy**, vì biến được đóng vào lúc build.
- `.gitignore` do `create-next-app` sinh ra có dòng `.env*`, chặn luôn cả `.env.example`. Thêm dòng `!.env.example` ngay bên dưới, kèm `*.zip` để không lỡ commit gói Lambda.
- Extension: `extension/config.js` có `API_BASE_URL` cùng giá trị với `NEXT_PUBLIC_API_BASE_URL`, và `host_permissions` trong `manifest.json` phải khớp domain đó. Bật B1 (API chuyển sang Next.js) thì Nam sửa **cả hai** chỗ.

### 2.3. Ai được gọi API, gọi thế nào

- **Web:** chỉ `lib/api.ts` (Nam viết) đọc `NEXT_PUBLIC_*`, ghép URL `${BASE}/analyze`, `${BASE}/m3`, đặt timeout 15 giây, đổi lỗi sang mã chuẩn và bật cache B6. Component **không** tự gọi `fetch`.
- **Chế độ mock trên web:** `NEXT_PUBLIC_USE_MOCK=1`. Chọn file mock bằng query trên trang: `?mock=high|medium|low|error` (mặc định `high`), để Văn test đủ trạng thái mà không phải khởi động lại server. File mock là **response đầy đủ** (có `ok`, `meta.source: "mock"`):
  `lib/mock/analyze_high.json` (92) · `analyze_medium.json` (60) · `analyze_low.json` (8, `tactics: []`) · `error_llm.json` (`ok:false`, `LLM_ERROR`) · `m3_reply.json`.
  Kèm theo `lib/mock/conversations.json` (`{high, medium, low}`): hội thoại gốc tương ứng từng mock. Ở chế độ mock, UI điền sẵn tin này vào ô nhập, nếu không highlight sẽ không khớp chữ nào.
- Import mock trong TS: `import high from "@/lib/mock/analyze_high.json"; const data = high as AnalyzeResponse;`. Phải dùng `as` vì TS đọc JSON thành `string` chung chung, không giữ được kiểu `"mock"` của `meta.source`.
- **Extension:** chỉ **service worker** gọi API (nhờ `host_permissions` nên không vướng CORS). Content script gửi message `{ type: "ANALYZE_REQUEST", conversation }` sang service worker, nhận lại `{ type: "ANALYZE_RESPONSE", response }`, trong đó `response` là nguyên khung ở mục 1.1.
- **CORS chỉ cấu hình ở một nơi: API Gateway HTTP API.** AllowOrigins `*`, AllowMethods `POST, OPTIONS`, AllowHeaders `content-type`. Lambda **không** tự đặt header CORS. Dùng `*` được vì API không có cookie hay xác thực, lại không vỡ khi đổi qua lại `localhost`, Amplify và Vercel (B4).
- **Log:** Lambda chỉ log số liệu (`request_id`, `latency_ms`, `model`, `code`, số thủ thuật), **không bao giờ log nội dung tin nhắn**.

> ⚠ **Không theo thì:** Văn bị block chờ API của Nam (nếu không có mock); key bị lộ trong JS gửi xuống trình duyệt (nếu có tiền tố `NEXT_PUBLIC_`); Extension vỡ khi đổi URL (nếu URL bị hard-code rải rác).

---

## 3. Repo và branch

### 3.1. Cấu trúc repo

```
MOMO/                               ← github.com/noExpNoMercy/MOMO (nên để private)
├─ app/                             ← Văn: / (A9), chuyen-tien/ (M1), doi-thoai/ (M3), cai-dat/, vaccine/
├─ components/                      ← Văn
├─ lib/
│  ├─ api.ts                        ← Nam   (chỗ DUY NHẤT gọi API, có mock + demo cache)
│  ├─ types.ts, config.ts           ← Khánh (HỢP ĐỒNG)
│  ├─ mock/*.json                   ← Khánh (HỢP ĐỒNG: 5 mock + conversations.json + demo_cache.json)
│  └─ highlight.ts, flow.ts         ← Văn
├─ public/                          ← Văn (riêng fake-zalo.html là của Nam)
├─ backend/lambda-analyze/
│  ├─ index.mjs, validate.mjs       ← Nam:   route, validate, khung response, mã lỗi, LLM_MODE, meta
│  ├─ dev_server.mjs                ← Nam:   chạy handler trên máy (cổng 8787)
│  ├─ engine.mjs, normalize.mjs     ← Khánh: gọi Claude, lọc output đúng hợp đồng
│  ├─ try_engine.mjs                ← Khánh: thử prompt
│  ├─ generated/                    ← SINH TỰ ĐỘNG bởi ai/scripts/build_prompt.py, không sửa tay
│  └─ test/                         ← handler (Nam), normalize (Khánh)
├─ ai/                              ← Khánh: data/tactics_map.json, prompts/, scripts/, results/
├─ extension/                       ← Nam: manifest MV3, service_worker, content, overlay
├─ infra/                           ← Nam: package_lambda.ps1 / .sh
├─ docs/                            ← QUY_UOC_CHUNG.md (Khánh), DEPLOY.md (Nam), tracks/, slides/ (Văn)
└─ .github/                         ← Nam: CI, PR template
```

**Ranh giới `index.mjs` ↔ `engine.mjs`** (để 2 người không sửa chung file):

```js
// engine.mjs (Khánh) export đúng 2 hàm:
export async function analyze(conversation)  // → { result: AnalyzeResult, model, prompt_version }
export async function m3Reply(input)         // → { result: M3Result, model, prompt_version }
// Lỗi: throw một Error có thuộc tính .code ∈ "LLM_ERROR" | "LLM_REFUSED" | "LLM_TRUNCATED"
// index.mjs + validate.mjs (Nam) lo phần còn lại: parse, validate, NFC, mock mode, request_id, latency_ms, source, mã lỗi, HTTP status.
```

> **Tại sao:** bản kế hoạch cũ để Khánh sửa "phần gọi LLM trong `index.mjs`" của Nam, tức 2 người cùng một file suốt 24–26/11. Tách file thì gần như hết conflict, và Khánh test được `engine.mjs` trên máy mà không cần Lambda.

### 3.2. Quyền sửa

- Mỗi thư mục/file có **đúng 1 chủ** (ghi ở cây trên). Muốn sửa file của người khác: nhắn chủ hoặc mở PR rồi gắn tên chủ vào.
- **4 file hợp đồng** (`lib/types.ts`, `lib/config.ts`, `lib/mock/*`, `docs/QUY_UOC_CHUNG.md`): PR phải có **👍 của cả 2 người còn lại**, và cập nhật tất cả các file đó **trong cùng 1 PR**.
- Trước khi mở PR đó, chạy `py ai/scripts/check_contract.py` (từ gốc repo) và dán dòng `✓ Hợp đồng khớp` vào mô tả PR. Script kiểm schema có dùng được với structured outputs không, mock có đúng schema không, evidence/highlight có nguyên văn không, nhóm có khớp ID không, tên thủ thuật có thống nhất giữa các mock và với bản đồ không.
- **Thêm** field (không bắt buộc) thì được, theo quy trình trên. **Đổi tên hoặc xoá** field sau 23/11 thì không được, trừ khi cả nhóm gọi điện thống nhất.

### 3.3. Branch, commit, merge

| Quy ước | Chốt |
|---|---|
| `main` | Luôn build được, CI phải xanh. Amplify tự deploy `main` lên staging. **Không** push thẳng, **không** `--force` |
| Tên nhánh | `<ten>/<viec>`: chữ thường, không dấu, nối bằng `-`. Ví dụ `khanh/a9-schema`, `nam/apigw-cors`, `van/radar-ui`. Sau code freeze dùng `<ten>/fix-<viec>` |
| Tuổi nhánh | ≤ 1 ngày. Merge vào `main` ít nhất **trước 12:00** và **trước Integration 21:00** |
| Merge | PR, chọn **Squash and merge**. Tự merge được nếu PR **chỉ** đụng file của mình **và** CI xanh. PR đụng file hợp đồng thì theo mục 3.2 |
| Commit | `<loại>(<phạm vi>): <mô tả>`. Loại: `feat, fix, docs, style, refactor, test, chore`. Phạm vi **cố định**: `a9, m1, m3, b9, ui, lambda, ext, infra, contract, docs` |
| Đồng bộ | Đầu mỗi buổi: `git fetch` rồi `git merge origin/main` vào nhánh của mình |
| Code freeze | **26/11 22:00**. Sau đó chỉ `fix`, gắn tag `rc-27-11` trên commit quay video |

> ⚠ **Không theo thì:** một commit làm hỏng build trên `main` khiến Amplify không deploy được, staging của cả 3 người đứng, Extension của Nam và điện thoại test của Văn cùng chết.

---

## 4. Quy ước đặt tên dùng chung

### 4.1. Bảng tên

| Thứ | Quy ước | Ví dụ |
|---|---|---|
| Khoá JSON đi qua ranh giới module (API, mock, message Extension, sessionStorage) | `snake_case` | `risk_score`, `tactic_id`, `amount_vnd` |
| Kiểu TS cho dữ liệu hợp đồng | Giữ **nguyên** `snake_case`, **không** đổi sang camelCase ở bất kỳ đâu | `data.result.risk_score` |
| Biến/hàm JS/TS khác | `camelCase` | `analyzeConversation()` |
| Hằng số | `UPPER_SNAKE` | `RISK_BRAKE`, `FREEZE_SECONDS` |
| Giá trị enum dạng chuỗi | chữ thường | `"live"`, `"mock"`, `"user"` |
| Mã lỗi | `UPPER_SNAKE` | `LLM_REFUSED` |
| ID thủ thuật | `T` + 2 chữ số. **Không bao giờ đánh số lại hay dùng lại ID**: bỏ thủ thuật thì để trống ID đó | `T06` |
| Đơn vị trong tên | Hậu tố `_ms`, `_vnd`, `_at` (ISO 8601) | `latency_ms`, `amount_vnd` |
| Biến môi trường | `UPPER_SNAKE`; `NEXT_PUBLIC_` chỉ cho giá trị **không bí mật** | `NEXT_PUBLIC_USE_MOCK` |
| Route trang web | tiếng Việt không dấu, nối bằng `-` | `/chuyen-tien`, `/doi-thoai`, `/cai-dat`, `/vaccine` |
| Route API | tiếng Anh chữ thường, không tiền tố version | `/analyze`, `/m3` |
| File component | `PascalCase.tsx` | `RadarResult.tsx` |
| File khác, thư mục, Python | `snake_case` | `build_prompt.py`, `tactics_map_v2.json` |
| CSS/DOM do Extension chèn vào Zalo | tiền tố `llc-` | `#llc-overlay`, `.llc-badge` |

> **Tại sao không đổi sang camelCase:** đổi tên ở `lib/api.ts` nghĩa là có 2 bộ tên cho cùng một dữ liệu. Mock import thẳng sẽ sai kiểu, và grep `risk_score` không thấy chỗ dùng `riskScore`. Một bộ tên thì 0 dòng code chuyển đổi.
>
> ⚠ **Không theo thì:** Văn đọc `riskScore` trong khi API trả `risk_score`, ra `undefined`, thanh risk hiện 0 mà không báo lỗi gì. Nếu ID thủ thuật bị đánh số lại, số eval của Khánh, mock của Văn và màu theo nhóm lệch nhau cùng lúc.

### 4.2. Nhóm thủ thuật (cố định, UI bám màu theo chữ cái)

| `group` | Tên nhóm | ID |
|---|---|---|
| `A` | Áp lực & khẩn cấp | T01–T05 |
| `B` | Giả danh & quyền lực | T06–T12 |
| `C` | Cô lập & bí mật | T13–T16 |
| `D` | Cảm xúc | T17–T22 |
| `E` | Mồi lợi ích | T23–T28 |
| `F` | Kỹ thuật hội thoại & thanh toán | T29–T40 |

Khánh được thêm, sửa, đổi tên **thủ thuật** trong nhóm, nhưng **không** đổi 6 nhóm (Văn đã gắn màu theo nhóm).

### 4.3. Tên component dùng trong code, task và standup

Mọi người gọi đúng các tên này, không đặt tên khác cho cùng một thứ:

| Component | Việc | Chủ |
|---|---|---|
| `RadarResult` | Khung kết quả A9: gồm 3 component bên dưới cùng câu `translation` | Văn |
| `RiskMeter` | Thanh 0–100, màu theo bảng 1.6 | Văn |
| `HighlightedText` | Hội thoại có tô màu theo `highlights` (B9' dùng lại) | Văn |
| `TacticCard` | Thẻ 1 thủ thuật: `name`, `evidence`, `explanation` | Văn |
| `PaymentScreen` | Màn chuyển tiền mô phỏng (`/chuyen-tien`) | Văn |
| `FreezeOverlay` | Phanh 15 giây của M1 | Văn |
| `VoiceRecorder` | Thu/phát câu nhắc giọng nói của M1 | Văn |
| `M3Dialogue` | Màn chat "Đấu với chính mình" | Văn |
| `llc-overlay` | Overlay cảnh báo của Extension (JS thuần) | Nam |

**Nguyên tắc nhãn:** dữ liệu không chứa nhãn giao diện. Các chữ như "Câu này nghĩa là:", "Kết quả minh hoạ", câu báo lỗi tiếng Việt đều do UI thêm.

---

## 5. Trạng thái repo (23/11)

Đã có sẵn và chạy được, mỗi hướng làm tiếp trên nền này (chi tiết trong `docs/tracks/`):

| Phần | Trạng thái |
|---|---|
| Hợp đồng: `lib/types.ts`, `lib/config.ts`, mock, schema sinh tự động, `check_contract.py` | ✅ Xong, CI kiểm mỗi PR |
| Lambda: handler, validate, mock mode, engine gọi Claude (structured outputs, cache, timeout, refusal), 13 unit test | ✅ Chạy trên máy. Chưa deploy AWS, chưa gọi Claude thật lần nào |
| Prompt A9 v1 (40 thủ thuật) + M3 v1 | 🟡 Bản đầu, Khánh đo và chỉnh |
| Web: Radar, chuyển tiền + phanh 15s, M3 chat, trên mock | 🟡 Khung chạy được, Văn làm đẹp + thu giọng M1 |
| Extension MV3 + trang chat giả | 🟡 Khung chạy được trên fake-zalo, Nam nạp và nối AWS |
| AWS (Lambda, API Gateway, Amplify) | ⬜ Nam làm |

## 6. Những điểm đã đổi so với bản nháp cũ (README_NHOM, KE_HOACH)

| # | Tài liệu cũ nói | Nay chốt |
|---|---|---|
| 1 | `README_NHOM.md` §5: Lambda Python, `lambda/handler.py`, `ai/prompts/*.txt` | Node.js, `backend/lambda-analyze/` (mục 3.1) |
| 2 | `KE_HOACH` §0.1: Khánh sửa phần gọi LLM **trong** `index.mjs` | Tách thành `engine.mjs` (Khánh) và `index.mjs` (Nam) |
| 3 | `README_NHOM.md` §3 ví dụ `T07` = Giả danh người thân, `T12` = Áp lực thời gian, `T21` = Cô lập | ID theo bản đồ `KE_HOACH` §0.7: `T06`, `T01`, `T13`. Ví dụ cũ **sai** |
| 4 | Phần tử `tactics` gồm `id, name, evidence, explanation` | Thêm `group`. `name`/`group` do server điền |
| 5 | `meta` gồm `latency_ms, model, source` | Thêm `request_id`, `prompt_version` |
| 6 | `translation` mở đầu bằng "Câu này nghĩa là:" | Không có tiền tố, UI tự thêm nhãn |
| 7 | `/m3` trả phẳng `{ok, reply, signs_used, meta}` | Cùng khung: `{ok, result: {reply, signs_used}, meta}`. Request thêm `amount_vnd`, `history[].role` ∈ `user`/`assistant` |
| 8 | `README_NHOM.md` §6.2: có thể đổi sang camelCase trong `lib/api.ts` | **Không** đổi, giữ `snake_case` toàn bộ |
| 9 | 6 mã lỗi | Thêm `INTERNAL` (server), `TIMEOUT` và `NETWORK_ERROR` (chỉ client) |
| 10 | Lambda tự trả header CORS | CORS chỉ cấu hình ở API Gateway, `*` |
| 11 | `conversation` là string tự do, giới hạn 10 KB | Định dạng mỗi tin một dòng, 1–3000 ký tự, chuẩn hoá NFC |
| 12 | `lib/` lúc ghi của Văn, lúc ghi của Nam | Chia rõ theo từng file (mục 3.1) |
| 13 | Phương án B2 (Bedrock → Anthropic API) | Không còn cần: đã chốt Anthropic API trực tiếp |
