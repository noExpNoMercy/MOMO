import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { loadTacticMap, normalizeAnalyze, normalizeM3, MAX_TACTICS, MAX_HIGHLIGHTS } from "../normalize.mjs";

const MAP = loadTacticMap(JSON.parse(readFileSync(new URL("../generated/tactics.json", import.meta.url), "utf8")));
const CONV = "Mẹ: Con ơi mẹ đang kẹt, chuyển gấp 20tr cho mẹ nha, đừng nói với ba\nTôi: Mẹ sao vậy?";

const tactic = (id, evidence, extra = {}) => ({ id, name: "tên model tự đặt", group: "Z", evidence, explanation: "x", ...extra });

test("kẹp risk_score về 0–100 và làm tròn", () => {
  assert.equal(normalizeAnalyze({ risk_score: 140 }, CONV, MAP).risk_score, 100);
  assert.equal(normalizeAnalyze({ risk_score: -3 }, CONV, MAP).risk_score, 0);
  assert.equal(normalizeAnalyze({ risk_score: 72.6 }, CONV, MAP).risk_score, 73);
  assert.equal(normalizeAnalyze({ risk_score: "abc" }, CONV, MAP).risk_score, 0);
});

test("name và group luôn lấy từ bản đồ, không tin model", () => {
  const r = normalizeAnalyze({ risk_score: 90, tactics: [tactic("T06", "Con ơi mẹ đang kẹt")] }, CONV, MAP);
  assert.deepEqual([r.tactics[0].name, r.tactics[0].group], ["Giả danh người thân", "B"]);
});

test("bỏ thủ thuật có evidence không nguyên văn, ID lạ hoặc trùng", () => {
  const r = normalizeAnalyze(
    {
      risk_score: 90,
      tactics: [
        tactic("T01", "chuyển gấp 20 triệu"), // sai chữ
        tactic("T99", "chuyển gấp 20tr"), // ID lạ
        tactic("T13", " đừng nói với ba "), // có khoảng trắng thừa → vẫn nhận
        tactic("T13", "đừng nói với ba"), // trùng
      ],
    },
    CONV,
    MAP,
  );
  assert.deepEqual(
    r.tactics.map((t) => [t.id, t.evidence]),
    [["T13", "đừng nói với ba"]],
  );
});

test("evidence luôn có trong highlights; highlight sai bị bỏ; tactics rỗng thì highlights rỗng", () => {
  const r = normalizeAnalyze(
    {
      risk_score: 90,
      tactics: [tactic("T01", "chuyển gấp 20tr")],
      highlights: [
        { text: "gấp", tactic_id: "T01" },
        { text: "không có trong hội thoại", tactic_id: "T01" },
        { text: "đừng nói với ba", tactic_id: "T13" }, // T13 không nằm trong tactics
      ],
    },
    CONV,
    MAP,
  );
  assert.deepEqual(r.highlights, [
    { text: "chuyển gấp 20tr", tactic_id: "T01" },
    { text: "gấp", tactic_id: "T01" },
  ]);
  const empty = normalizeAnalyze({ risk_score: 5, tactics: [], highlights: [{ text: "gấp", tactic_id: "T01" }] }, CONV, MAP);
  assert.deepEqual(empty.highlights, []);
});

test("so khớp sau khi chuẩn hoá NFC (model trả NFD vẫn nhận)", () => {
  const r = normalizeAnalyze({ risk_score: 80, tactics: [tactic("T13", "đừng nói với ba".normalize("NFD"))] }, CONV, MAP);
  assert.equal(r.tactics.length, 1);
});

test("giới hạn số phần tử và translation luôn có nội dung", () => {
  const long = Array.from({ length: 12 }, (_, i) => `cụm${i}`).join(" ");
  const ids = ["T01", "T02", "T03", "T04", "T05", "T06", "T07", "T08"];
  const r = normalizeAnalyze(
    {
      risk_score: 99,
      tactics: ids.map((id, i) => tactic(id, `cụm${i}`)),
      highlights: Array.from({ length: 12 }, (_, i) => ({ text: `cụm${i}`, tactic_id: "T01" })),
      translation: "   ",
    },
    long,
    MAP,
  );
  assert.equal(r.tactics.length, MAX_TACTICS);
  assert.ok(r.highlights.length <= MAX_HIGHLIGHTS);
  assert.ok(r.translation.length > 0);
});

test("normalizeM3 lọc signs_used theo danh sách được phép, reply rỗng trả null", () => {
  assert.deepEqual(normalizeM3({ reply: " Mày gọi lại chưa? ", signs_used: ["T06", "T06", "T99"] }, ["T06"]), {
    reply: "Mày gọi lại chưa?",
    signs_used: ["T06"],
  });
  assert.equal(normalizeM3({ reply: "  ", signs_used: [] }, ["T06"]), null);
});
