"""Kiểm hợp đồng chung (docs/QUY_UOC_CHUNG.md) trên schema + mock.

Chạy từ gốc repo:  py ai/scripts/check_contract.py   (hoặc python3 ...)
Chạy lại MỖI KHI sửa lib/types.ts, lib/mock/*, analyze.schema.json hoặc ai/data/tactics_map*.json.
Không cần cài thư viện ngoài. Thoát mã 1 nếu có lỗi.
"""

import json
import re
import sys
import unicodedata
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")  # console Windows mặc định không in được tiếng Việt

ROOT = Path(__file__).resolve().parents[2]
SCHEMA_PATH = ROOT / "backend/lambda-analyze/generated/analyze.schema.json"
M3_SCHEMA_PATH = ROOT / "backend/lambda-analyze/generated/m3.schema.json"
MOCK_DIR = ROOT / "lib/mock"
TYPES_PATH = ROOT / "lib/types.ts"
TACTICS_MAPS = [ROOT / "ai/data/tactics_map.json"]

ANALYZE_MOCKS = {"analyze_high.json": "high", "analyze_medium.json": "medium", "analyze_low.json": "low"}
ERROR_CODES = ["BAD_REQUEST", "TOO_LARGE", "RATE_LIMITED", "LLM_ERROR", "LLM_REFUSED",
               "LLM_TRUNCATED", "INTERNAL", "TIMEOUT", "NETWORK_ERROR"]
META_KEYS = {"request_id", "latency_ms", "model", "prompt_version", "source"}
SOURCES = {"live", "mock", "cache"}
# Nhóm cố định theo QUY_UOC_CHUNG.md mục 4.2
GROUP_RANGES = {"A": (1, 5), "B": (6, 12), "C": (13, 16), "D": (17, 22), "E": (23, 28), "F": (29, 40)}
# Structured outputs không hỗ trợ các từ khoá này (QUY_UOC_CHUNG.md mục 1.8)
UNSUPPORTED_KEYWORDS = {"minimum", "maximum", "exclusiveMinimum", "exclusiveMaximum", "multipleOf",
                        "minLength", "maxLength", "minItems", "maxItems", "uniqueItems", "pattern"}

errors: list[str] = []


def err(where: str, msg: str) -> None:
    errors.append(f"[{where}] {msg}")


def load(path: Path):
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError:
        err(path.name, "không tìm thấy file")
    except json.JSONDecodeError as e:
        err(path.name, f"JSON hỏng: {e}")
    return None


def expected_group(tactic_id: str) -> str | None:
    n = int(tactic_id[1:])
    return next((g for g, (lo, hi) in GROUP_RANGES.items() if lo <= n <= hi), None)


def check_schema_shape(node, path: str = "$") -> None:
    """Schema phải dùng được với structured outputs."""
    if not isinstance(node, dict):
        return
    for k in UNSUPPORTED_KEYWORDS & node.keys():
        err("schema", f"{path}: '{k}' không được structured outputs hỗ trợ, hãy kiểm trong engine.mjs")
    if node.get("type") == "object":
        if node.get("additionalProperties") is not False:
            err("schema", f"{path}: object phải có additionalProperties: false")
        props = node.get("properties", {})
        if set(node.get("required", [])) != set(props):
            err("schema", f"{path}: 'required' phải liệt kê đủ mọi property")
        for k, sub in props.items():
            check_schema_shape(sub, f"{path}.{k}")
    if node.get("type") == "array":
        check_schema_shape(node.get("items"), f"{path}[]")


def validate(value, schema, path: str = "$") -> list[str]:
    """Bộ kiểm JSON schema tối giản, đủ cho phần schema mà dự án dùng."""
    out = []
    if "enum" in schema and value not in schema["enum"]:
        out.append(f"{path}: {value!r} không thuộc enum")
    t = schema.get("type")
    if t == "object":
        if not isinstance(value, dict):
            return [f"{path}: phải là object"]
        props = schema.get("properties", {})
        out += [f"{path}: thiếu '{k}'" for k in schema.get("required", []) if k not in value]
        if schema.get("additionalProperties") is False:
            out += [f"{path}: thừa '{k}'" for k in value if k not in props]
        for k, sub in props.items():
            if k in value:
                out += validate(value[k], sub, f"{path}.{k}")
    elif t == "array":
        if not isinstance(value, list):
            return [f"{path}: phải là array"]
        for i, item in enumerate(value):
            out += validate(item, schema["items"], f"{path}[{i}]")
    elif t == "string" and not isinstance(value, str):
        out.append(f"{path}: phải là string")
    elif t == "integer" and (not isinstance(value, int) or isinstance(value, bool)):
        out.append(f"{path}: phải là integer")
    return out


def check_meta(name: str, meta) -> None:
    if not isinstance(meta, dict) or set(meta) != META_KEYS:
        err(name, f"meta phải có đúng các khoá {sorted(META_KEYS)}")
        return
    if meta["source"] not in SOURCES:
        err(name, f"meta.source phải thuộc {sorted(SOURCES)}")
    if not isinstance(meta["latency_ms"], int):
        err(name, "meta.latency_ms phải là integer")


def check_analyze_result(name: str, result: dict, conversation: str, names_seen: dict) -> None:
    conv = unicodedata.normalize("NFC", conversation)
    score = result["risk_score"]
    if not 0 <= score <= 100:
        err(name, f"risk_score {score} ngoài 0–100")
    tactics, highlights = result["tactics"], result["highlights"]
    if len(tactics) > 6:
        err(name, f"{len(tactics)} tactics, tối đa 6")
    if len(highlights) > 10:
        err(name, f"{len(highlights)} highlights, tối đa 10")
    if not tactics and highlights:
        err(name, "tactics rỗng thì highlights phải rỗng")
    if not result["translation"].strip():
        err(name, "translation không được rỗng")
    if result["translation"].lower().startswith("câu này nghĩa là"):
        err(name, "translation không kèm nhãn 'Câu này nghĩa là' (UI tự thêm)")

    ids = [t["id"] for t in tactics]
    if len(ids) != len(set(ids)):
        err(name, "một thủ thuật xuất hiện 2 lần trong tactics")
    texts = {h["text"] for h in highlights}
    for t in tactics:
        where = f"{name} {t['id']}"
        if expected_group(t["id"]) != t["group"]:
            err(where, f"group '{t['group']}' sai, phải là '{expected_group(t['id'])}'")
        if t["evidence"] not in conv:
            err(where, f"evidence không phải chuỗi con nguyên văn: {t['evidence']!r}")
        if t["evidence"] not in texts:
            err(where, "evidence chưa có trong highlights")
        if len(t["explanation"]) > 160:
            err(where, f"explanation {len(t['explanation'])} ký tự, mục tiêu ≤ 160")
        if names_seen.setdefault(t["id"], t["name"]) != t["name"]:
            err(where, f"name '{t['name']}' khác với '{names_seen[t['id']]}' ở mock khác")
    for h in highlights:
        if h["text"] not in conv:
            err(name, f"highlight không phải chuỗi con nguyên văn: {h['text']!r}")
        if h["tactic_id"] not in ids:
            err(name, f"highlight trỏ tới {h['tactic_id']} không có trong tactics")
    if len(result["translation"]) > 200:
        err(name, f"translation {len(result['translation'])} ký tự, mục tiêu ≤ 200")


def main() -> int:
    schema = load(SCHEMA_PATH)
    conversations = load(MOCK_DIR / "conversations.json")
    if schema is None or conversations is None:
        return report()

    check_schema_shape(schema)
    schema_ids = schema["properties"]["tactics"]["items"]["properties"]["id"]["enum"]
    if schema["properties"]["highlights"]["items"]["properties"]["tactic_id"]["enum"] != schema_ids:
        err("schema", "enum của highlights.tactic_id phải giống tactics.id")

    # Bản đồ thủ thuật (nếu đã có): enum trong schema và tên trong mock phải khớp
    canonical = {}
    tmap_path = next((p for p in TACTICS_MAPS if p.exists()), None)
    if tmap_path:
        tmap = load(tmap_path)
        items = tmap if isinstance(tmap, list) else (tmap or {}).get("tactics", [])
        canonical = {t["id"]: t["name"] for t in items}
        if set(canonical) != set(schema_ids):
            err("schema", f"enum id khác với {tmap_path.name}, hãy chạy lại build_prompt.py")
    else:
        print("· Chưa có ai/data/tactics_map*.json, bỏ qua bước so tên thủ thuật.")

    names_seen: dict[str, str] = {}
    for file, level in ANALYZE_MOCKS.items():
        data = load(MOCK_DIR / file)
        if data is None:
            continue
        if data.get("ok") is not True:
            err(file, "mock thành công phải có ok: true")
            continue
        problems = validate(data.get("result"), schema, "result")
        for p in problems:
            err(file, p)
        check_meta(file, data.get("meta"))
        try:  # vẫn kiểm luật nghiệp vụ dù schema đã lỗi, để một lỗi không che lỗi khác
            check_analyze_result(file, data["result"], conversations[level], names_seen)
        except (KeyError, TypeError, ValueError) as e:
            err(file, f"không kiểm tiếp được luật nghiệp vụ vì cấu trúc hỏng ({e!r})")
    for tid, name in names_seen.items():
        if canonical and canonical.get(tid) != name:
            err("mock", f"{tid} '{name}' khác tên trong bản đồ: '{canonical.get(tid)}'")

    error_mock = load(MOCK_DIR / "error_llm.json")
    if error_mock is not None:
        if error_mock.get("ok") is not False or error_mock.get("error", {}).get("code") not in ERROR_CODES:
            err("error_llm.json", "phải có ok: false và error.code hợp lệ")

    m3 = load(MOCK_DIR / "m3_reply.json")
    high = load(MOCK_DIR / "analyze_high.json")
    m3_schema = load(M3_SCHEMA_PATH)
    if m3 is not None and high is not None and m3_schema is not None:
        check_schema_shape(m3_schema, "m3$")
        res = m3.get("result", {})
        if m3.get("ok") is not True:
            err("m3_reply.json", "mock thành công phải có ok: true")
        for p in validate(res, m3_schema, "result"):
            err("m3_reply.json", p)
        if not str(res.get("reply", "")).strip():
            err("m3_reply.json", "reply không được rỗng")
        high_ids = {t["id"] for t in high["result"]["tactics"]}
        if not set(res.get("signs_used", [])) <= high_ids:
            err("m3_reply.json", "signs_used phải là tập con tactics của analyze_high.json")
        check_meta("m3_reply.json", m3.get("meta"))

    # Demo cache (phương án B6): mỗi entry là {conversation, result} lấy từ kết quả LIVE thật
    cache = load(MOCK_DIR / "demo_cache.json")
    if cache is not None:
        entries = cache.get("entries") if isinstance(cache, dict) else None
        if not isinstance(entries, list):
            err("demo_cache.json", "phải có dạng {\"entries\": [...]}")
            entries = []
        for i, entry in enumerate(entries):
            where = f"demo_cache.json #{i}"
            if not isinstance(entry, dict) or set(entry) != {"conversation", "result"}:
                err(where, "mỗi entry phải có đúng 2 khoá conversation, result")
                continue
            for p in validate(entry["result"], schema, "result"):
                err(where, p)
            try:
                check_analyze_result(where, entry["result"], entry["conversation"], names_seen)
            except (KeyError, TypeError, ValueError) as e:
                err(where, f"cấu trúc hỏng ({e!r})")

    if TYPES_PATH.exists():
        types_src = TYPES_PATH.read_text(encoding="utf-8")
        for code in ERROR_CODES:
            if f'"{code}"' not in types_src:
                err("types.ts", f"thiếu mã lỗi {code}")
        for key in ["risk_score", "tactics", "translation", "highlights", "tactic_id", "prompt_version"]:
            if not re.search(rf"\b{key}\b", types_src):
                err("types.ts", f"thiếu field {key}")

    return report()


def report() -> int:
    if errors:
        print(f"✗ {len(errors)} lỗi hợp đồng:")
        for e in errors:
            print("  -", e)
        return 1
    print("✓ Hợp đồng khớp: schema A9 + M3, mock, demo cache, types.ts, bản đồ thủ thuật")
    return 0


if __name__ == "__main__":
    sys.exit(main())
