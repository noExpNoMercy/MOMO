// Phòng prompt của Khánh: chạy engine trực tiếp, không qua Lambda.
//   npm run try -- "Mẹ: Con ơi chuyển gấp 20tr cho mẹ"
//   npm run try -- --file ../../ai/data/sample.txt
// Cần ANTHROPIC_API_KEY (đặt trong backend/lambda-analyze/.env).

import { readFileSync } from "node:fs";
import { analyze, EngineError } from "./engine.mjs";

const args = process.argv.slice(2);
const fileIdx = args.indexOf("--file");
const conversation = fileIdx >= 0 ? readFileSync(args[fileIdx + 1], "utf8") : args.join(" ");

if (!conversation.trim()) {
  console.error('Cách dùng: npm run try -- "<hội thoại>"   hoặc   npm run try -- --file <đường dẫn>');
  process.exit(1);
}

const started = Date.now();
try {
  const { result, model, prompt_version, usage } = await analyze(conversation);
  console.log(JSON.stringify(result, null, 2));
  console.log(
    `\nmodel=${model} prompt=${prompt_version} latency=${Date.now() - started}ms` +
      ` input=${usage?.input_tokens} output=${usage?.output_tokens}` +
      ` cache_read=${usage?.cache_read_input_tokens} cache_write=${usage?.cache_creation_input_tokens}`,
  );
} catch (error) {
  console.error(error instanceof EngineError ? `${error.code}: ${error.message}` : error);
  process.exit(1);
}
