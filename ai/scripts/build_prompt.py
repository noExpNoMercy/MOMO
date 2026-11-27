"""Sinh các file mà Lambda dùng, từ nguồn của Khánh trong ai/.

Nguồn (sửa ở đây):
    ai/data/tactics_map.json          bản đồ thủ thuật (id, name, group, description, signals, example_vi)
    ai/prompts/a9_system.template.md  prompt A9, chỗ {{TACTICS}} được thay bằng bản đồ
    ai/prompts/m3_system.md           prompt M3
    ai/prompts/versions.json          số phiên bản prompt, tăng mỗi lần đổi prompt

Đích (KHÔNG sửa tay, chạy lại script này):
    backend/lambda-analyze/generated/a9_system_prompt.md
    backend/lambda-analyze/generated/m3_system_prompt.md
    backend/lambda-analyze/generated/analyze.schema.json
    backend/lambda-analyze/generated/m3.schema.json
    backend/lambda-analyze/generated/tactics.json
    backend/lambda-analyze/generated/prompt_versions.json

Chạy từ gốc repo:
    py ai/scripts/build_prompt.py           sinh lại
    py ai/scripts/build_prompt.py --check   chỉ kiểm, thoát mã 1 nếu file sinh ra đã cũ (CI dùng)
"""

import json
import re
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

ROOT = Path(__file__).resolve().parents[2]
AI = ROOT / "ai"
OUT = ROOT / "backend/lambda-analyze/generated"

GROUP_RANGES = {"A": (1, 5), "B": (6, 12), "C": (13, 16), "D": (17, 22), "E": (23, 28), "F": (29, 40)}
GROUP_NAMES = {
    "A": "Áp lực & khẩn cấp",
    "B": "Giả danh & quyền lực",
    "C": "Cô lập & bí mật",
    "D": "Cảm xúc",
    "E": "Mồi lợi ích",
    "F": "Kỹ thuật hội thoại & thanh toán",
}
REQUIRED = ("id", "name", "group", "description")


def load_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def dump_json(data) -> str:
    return json.dumps(data, ensure_ascii=False, indent=2) + "\n"


def validate_map(tactics: list[dict]) -> list[str]:
    errors, seen = [], set()
    for t in tactics:
        tid = t.get("id", "?")
        for key in REQUIRED:
            if not str(t.get(key, "")).strip():
                errors.append(f"{tid}: thiếu '{key}'")
        if not re.fullmatch(r"T\d{2}", tid):
            errors.append(f"{tid}: ID phải dạng T + 2 chữ số")
            continue
        if tid in seen:
            errors.append(f"{tid}: ID bị trùng")
        seen.add(tid)
        lo, hi = GROUP_RANGES.get(t.get("group"), (0, -1))
        if not lo <= int(tid[1:]) <= hi:
            errors.append(f"{tid}: group '{t.get('group')}' không khớp dải ID (xem docs/QUY_UOC_CHUNG.md mục 4.2)")
    return errors


def render_tactics(tactics: list[dict]) -> str:
    lines = []
    for group, gname in GROUP_NAMES.items():
        items = [t for t in tactics if t["group"] == group]
        if not items:
            continue
        lines.append(f"### Nhóm {group}: {gname}")
        for t in items:
            line = f"- **{t['id']} · {t['name']}** (group {group}): {t['description']}"
            if t.get("signals"):
                line += " Dấu hiệu thường gặp: " + ", ".join(f"\"{s}\"" for s in t["signals"]) + "."
            if t.get("example_vi"):
                line += f" Ví dụ: \"{t['example_vi']}\"."
            lines.append(line)
        lines.append("")
    return "\n".join(lines).rstrip() + "\n"


def analyze_schema(ids: list[str]) -> dict:
    """Schema cho structured outputs. Không dùng minimum/maximum/maxLength/maxItems (API không hỗ trợ);
    các giới hạn đó do normalize.mjs kiểm sau khi gọi LLM."""
    return {
        "type": "object",
        "additionalProperties": False,
        "required": ["risk_score", "tactics", "translation", "highlights"],
        "properties": {
            "risk_score": {
                "type": "integer",
                "description": "Mức nguy hiểm 0-100. 0-49 chưa đủ dấu hiệu, 50-69 nghi ngờ, 70-84 nguy hiểm, 85-100 gần như chắc chắn lừa đảo.",
            },
            "tactics": {
                "type": "array",
                "description": "Tối đa 6 thủ thuật có bằng chứng trong hội thoại, nguy hiểm nhất đứng đầu. Không thấy thì để mảng rỗng.",
                "items": {
                    "type": "object",
                    "additionalProperties": False,
                    "required": ["id", "name", "group", "evidence", "explanation"],
                    "properties": {
                        "id": {"type": "string", "enum": ids},
                        "name": {"type": "string"},
                        "group": {"type": "string", "enum": list(GROUP_NAMES)},
                        "evidence": {
                            "type": "string",
                            "description": "Trích NGUYÊN VĂN một cụm trong hội thoại, không sửa chữ, không thêm dấu.",
                        },
                        "explanation": {
                            "type": "string",
                            "description": "Một câu nói với 'bạn', giải thích vì sao chiêu này hiệu quả. Tối đa 160 ký tự.",
                        },
                    },
                },
            },
            "translation": {
                "type": "string",
                "description": "Dịch ý đồ thật của người gửi, ngôi thứ nhất ('Tôi...'), tối đa 200 ký tự. Không mở đầu bằng 'Câu này nghĩa là'. Luôn có nội dung, kể cả khi hội thoại bình thường.",
            },
            "highlights": {
                "type": "array",
                "description": "Tối đa 10 cụm cần tô màu. Mỗi cụm trích NGUYÊN VĂN từ hội thoại và gắn với một thủ thuật có trong tactics.",
                "items": {
                    "type": "object",
                    "additionalProperties": False,
                    "required": ["text", "tactic_id"],
                    "properties": {
                        "text": {"type": "string"},
                        "tactic_id": {"type": "string", "enum": ids},
                    },
                },
            },
        },
    }


def m3_schema(ids: list[str]) -> dict:
    return {
        "type": "object",
        "additionalProperties": False,
        "required": ["reply", "signs_used"],
        "properties": {
            "reply": {"type": "string", "description": "Câu trả lời tiếng Việt, tối đa 400 ký tự, không markdown."},
            "signs_used": {
                "type": "array",
                "description": "ID các thủ thuật (trong danh sách được cung cấp) đã dùng làm căn cứ.",
                "items": {"type": "string", "enum": ids},
            },
        },
    }


def build() -> dict[str, str]:
    tactics = sorted(load_json(AI / "data/tactics_map.json"), key=lambda t: t.get("id", ""))
    errors = validate_map(tactics)
    if errors:
        print("✗ tactics_map.json có lỗi:")
        for e in errors:
            print("  -", e)
        sys.exit(1)

    ids = [t["id"] for t in tactics]

    weights = load_json(AI / "data/tactic_weights.json")
    wmiss = [i for i in ids if i not in weights]
    wextra = [k for k in weights if k not in ids]
    if wmiss or wextra:
        print("✗ tactic_weights.json lệch với bản đồ thủ thuật:")
        for i in wmiss:
            print("  - thiếu trọng số:", i)
        for k in wextra:
            print("  - trọng số thừa (không khớp thủ thuật nào):", k)
        sys.exit(1)

    template = (AI / "prompts/a9_system.template.md").read_text(encoding="utf-8")
    if "{{TACTICS}}" not in template:
        print("✗ a9_system.template.md thiếu chỗ {{TACTICS}}")
        sys.exit(1)

    return {
        "a9_system_prompt.md": template.replace("{{TACTICS}}", render_tactics(tactics).rstrip()),
        "m3_system_prompt.md": (AI / "prompts/m3_system.md").read_text(encoding="utf-8"),
        "analyze.schema.json": dump_json(analyze_schema(ids)),
        "m3.schema.json": dump_json(m3_schema(ids)),
        "tactics.json": dump_json([{"id": t["id"], "name": t["name"], "group": t["group"], "weight": weights[t["id"]]} for t in tactics]),
        "prompt_versions.json": dump_json(load_json(AI / "prompts/versions.json")),
    }


def main() -> int:
    files = build()
    check_only = "--check" in sys.argv
    stale = []
    for name, content in files.items():
        path = OUT / name
        current = path.read_text(encoding="utf-8") if path.exists() else None
        if current == content:
            continue
        stale.append(name)
        if not check_only:
            OUT.mkdir(parents=True, exist_ok=True)
            path.write_text(content, encoding="utf-8", newline="\n")

    if check_only:
        if stale:
            print("✗ File sinh ra đã cũ, chạy lại: py ai/scripts/build_prompt.py")
            for name in stale:
                print("  -", name)
            return 1
        print("✓ backend/lambda-analyze/generated/ khớp với nguồn trong ai/")
        return 0

    print(f"✓ Đã sinh {len(stale)} file thay đổi trong backend/lambda-analyze/generated/" if stale
          else "✓ Không có gì thay đổi")
    for name in stale:
        print("  -", name)
    return 0


if __name__ == "__main__":
    sys.exit(main())
