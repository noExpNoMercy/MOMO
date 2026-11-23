import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Không thuộc web app: Lambda (Node thuần), Extension (JS chạy trong Chrome), script AI, gói build
    "backend/**",
    "extension/**",
    "ai/**",
    "infra/**",
  ]),
]);

export default eslintConfig;
