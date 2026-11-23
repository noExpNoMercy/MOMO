# Chủ: Nam. Đóng gói Lambda thành infra/dist/lambda.zip để upload lên AWS (Handler: index.handler).
# Chạy từ gốc repo (Windows PowerShell):
#   powershell -ExecutionPolicy Bypass -File infra/package_lambda.ps1
$ErrorActionPreference = "Stop"

$root  = Split-Path -Parent $PSScriptRoot
$src   = Join-Path $root "backend/lambda-analyze"
$dist  = Join-Path $root "infra/dist"
$stage = Join-Path $dist "stage"
$zip   = Join-Path $dist "lambda.zip"

if (Test-Path $dist) { Remove-Item -Recurse -Force $dist -Confirm:$false }
New-Item -ItemType Directory -Force $stage | Out-Null

# Mã nguồn + file sinh ra từ ai/ (prompt, schema, bản đồ thủ thuật)
Copy-Item (Join-Path $src "index.mjs"), (Join-Path $src "engine.mjs"), (Join-Path $src "normalize.mjs"), (Join-Path $src "validate.mjs") $stage
Copy-Item (Join-Path $src "package.json"), (Join-Path $src "package-lock.json") $stage
Copy-Item -Recurse (Join-Path $src "generated") $stage

# Mock cho LLM_MODE=mock (index.mjs đọc ./fixtures/ khi chạy trên Lambda)
$fixtures = Join-Path $stage "fixtures"
New-Item -ItemType Directory -Force $fixtures | Out-Null
Copy-Item (Join-Path $root "lib/mock/analyze_high.json"), (Join-Path $root "lib/mock/m3_reply.json") $fixtures

Push-Location $stage
try {
  npm ci --omit=dev --no-audit --no-fund
  if ($LASTEXITCODE -ne 0) { throw "npm ci thất bại" }
  $items = Get-ChildItem -Name
  tar.exe -a -c -f $zip @items
  if ($LASTEXITCODE -ne 0) { throw "nén zip thất bại" }
} finally {
  Pop-Location
}

$kb = [math]::Round((Get-Item $zip).Length / 1KB)
Write-Host "Xong: $zip ($kb KB). Upload trong Lambda console: Code -> Upload from -> .zip file. Handler: index.handler"
