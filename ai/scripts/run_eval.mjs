// Đo A9 trên bộ tin mẫu bằng ĐÚNG engine chạy trên Lambda (không có bản prompt riêng cho eval).
//   cd backend/lambda-analyze
//   npm run eval                          → chạy set "dev" (Claude, cần ANTHROPIC_API_KEY)
//   ENGINE=gemini npm run eval            → dùng Gemini free tier (cần GEMINI_API_KEY)
//   npm run eval -- --set holdout         → chạy set holdout (chỉ chạy lần cuối, số này mới lên slide)
//   npm run eval -- --repeat 3            → lặp 3 lượt, lấy trung bình
// Kết quả: in bảng ra màn hình + ghi ai/results/eval_<set>_<thời gian>.csv

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
const engineFile = process.env.ENGINE === "gemini" ? "engine.gemini.mjs" : "engine.mjs";
const { analyze, EngineError } = await import(`../../backend/lambda-analyze/${engineFile}`);

const RISK_ALERT = 50; // đồng bộ với lib/config.ts: ≥ 50 tính là "lừa đảo"

const args = process.argv.slice(2);
const opt = (name, fallback) => (args.includes(name) ? args[args.indexOf(name) + 1] : fallback);
const set = opt("--set", "dev");
const repeat = Number(opt("--repeat", 1));

const all = JSON.parse(readFileSync(new URL("../data/test_messages.json", import.meta.url), "utf8"));
const items = all.filter((m) => m.set === set);
if (!items.length) {
  console.error(`Không có tin nào thuộc set "${set}" trong ai/data/test_messages.json`);
  process.exit(1);
}
console.log(`Chạy ${items.length} tin × ${repeat} lượt, set=${set}, model=${process.env.MODEL_ID || "mặc định"}\n`);

// Retry lỗi tạm thời của provider (503 quá tải, 429 rate limit) — KHÔNG đổi logic chấm, chỉ chống nhiễu hạ tầng.
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const TRANSIENT = /\b(429|500|502|503|overload|unavailable|rate limit|try again)\b/i;
const MAX_TRIES = Number(process.env.EVAL_RETRIES || 4);
async function analyzeRetry(conv) {
  for (let attempt = 1; ; attempt++) {
    try {
      return await analyze(conv);
    } catch (err) {
      const transient = err instanceof EngineError && TRANSIENT.test(err.message || "");
      if (!transient || attempt >= MAX_TRIES) throw err;
      await sleep(1500 * 2 ** (attempt - 1)); // 1.5s → 3s → 6s
    }
  }
}

const rows = [];
for (let round = 1; round <= repeat; round++) {
  for (const m of items) {
    const started = Date.now();
    try {
      const { result, model, prompt_version } = await analyzeRetry(m.conversation);
      const found = result.tactics.map((t) => t.id);
      const hit = m.expected_tactics.filter((id) => found.includes(id)).length;
      rows.push({
        round, id: m.id, label: m.label, model, prompt_version,
        risk_score: result.risk_score,
        predicted: result.risk_score >= RISK_ALERT ? "scam" : "legit",
        latency_ms: Date.now() - started,
        tactic_recall: m.expected_tactics.length ? hit / m.expected_tactics.length : null,
        found: found.join(" "), error: "",
      });
    } catch (error) {
      rows.push({ round, id: m.id, label: m.label, latency_ms: Date.now() - started,
        error: error instanceof EngineError ? error.code : String(error) });
    }
    const r = rows.at(-1);
    console.log(`#${round} ${r.id.padEnd(12)} ${r.label.padEnd(6)} → ${r.error || `${r.risk_score} (${r.predicted})`}  ${r.latency_ms}ms`);
    await sleep(700); // giãn nhịp nhẹ giữa các call, giảm 503 do dồn request
  }
}

const ok = rows.filter((r) => !r.error);
const correct = ok.filter((r) => r.predicted === r.label).length;
const fp = ok.filter((r) => r.label === "legit" && r.predicted === "scam").length;
const legit = ok.filter((r) => r.label === "legit").length;
const recalls = ok.map((r) => r.tactic_recall).filter((v) => v !== null);
const avg = (xs) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : NaN);
const pct = (v) => `${(v * 100).toFixed(1)}%`;

console.log(`\nAccuracy        ${pct(correct / ok.length)}  (${correct}/${ok.length})`);
console.log(`False positive  ${legit ? pct(fp / legit) : "n/a"}  (tin thật bị báo lừa)`);
console.log(`Tactic recall   ${pct(avg(recalls))}`);
console.log(`Latency TB      ${Math.round(avg(ok.map((r) => r.latency_ms)))} ms`);
console.log(`Lỗi             ${rows.length - ok.length}/${rows.length}`);

const cols = ["round", "id", "label", "predicted", "risk_score", "tactic_recall", "latency_ms", "model", "prompt_version", "found", "error"];
const csv = [cols.join(","), ...rows.map((r) => cols.map((c) => JSON.stringify(r[c] ?? "")).join(","))].join("\n");
const dir = new URL("../results/", import.meta.url);
mkdirSync(dir, { recursive: true });
const file = new URL(`eval_${set}_${new Date().toISOString().replace(/[:.]/g, "-")}.csv`, dir);
writeFileSync(file, "﻿" + csv, "utf8"); // BOM để Excel đọc đúng tiếng Việt
console.log(`\nĐã ghi ${file.pathname}`);
