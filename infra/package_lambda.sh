#!/usr/bin/env bash
# Chủ: Nam. Bản macOS/Linux của package_lambda.ps1. Chạy từ gốc repo: bash infra/package_lambda.sh
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
src="$root/backend/lambda-analyze"
dist="$root/infra/dist"
stage="$dist/stage"

rm -rf "$dist"
mkdir -p "$stage/fixtures"
cp "$src"/{index,engine,normalize,validate}.mjs "$src/package.json" "$src/package-lock.json" "$stage/"
cp -R "$src/generated" "$stage/"
cp "$root/lib/mock/analyze_high.json" "$root/lib/mock/m3_reply.json" "$stage/fixtures/"

(cd "$stage" && npm ci --omit=dev --no-audit --no-fund && zip -qr "$dist/lambda.zip" .)
echo "Xong: $dist/lambda.zip. Handler: index.handler"
