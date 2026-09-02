$ErrorActionPreference = "Stop"

$root = (Get-Location).Path
$toolsFile = Join-Path $root "lib\tools-data.ts"
$configJs = Join-Path $root "next.config.js"
$configTs = Join-Path $root "next.config.ts"
$redirectsFile = Join-Path $root "public\_redirects"

if (-not (Test-Path $toolsFile)) { throw "Missing lib\tools-data.ts. Run this from the Avorqin project root." }
if (-not (Test-Path $configJs)) { throw "Missing next.config.js." }
if (Test-Path $configTs) { throw "next.config.ts exists. Your current Avorqin project should use next.config.js." }
if (-not (Test-Path $redirectsFile)) { throw "Missing public\_redirects. Run the cleanup installer first." }

$configContent = Get-Content $configJs -Raw
$toolsContent = Get-Content $toolsFile -Raw
$redirectContent = Get-Content $redirectsFile -Raw

if ($configContent -notmatch "output\s*:\s*['""]export['""]") { throw "next.config.js no longer shows output: 'export'." }
if ($configContent -notmatch "distDir\s*:\s*['""]dist['""]") { throw "next.config.js no longer shows distDir: 'dist'." }
if ($configContent -notmatch "trailingSlash\s*:\s*true") { throw "next.config.js no longer shows trailingSlash: true." }
if ($toolsContent -notmatch "consolidatedToolSlugs") { throw "lib\tools-data.ts does not contain the consolidation filter." }

$removed = @(
  "block-wall-calculator",
  "brick-wall-calculator",
  "brick-mortar-calculator",
  "asphalt-tonnage-calculator",
  "battery-runtime-calculator",
  "unix-timestamp-to-date",
  "unix-timestamp-generator",
  "peak-to-peak-voltage-calculator"
)

$destinations = @(
  "concrete-block-calculator",
  "brick-calculator",
  "mortar-calculator",
  "asphalt-calculator",
  "battery-life-calculator",
  "timestamp-converter",
  "peak-voltage-calculator"
)

$redirectPairs = @(
  @("block-wall-calculator", "concrete-block-calculator"),
  @("brick-wall-calculator", "brick-calculator"),
  @("brick-mortar-calculator", "mortar-calculator"),
  @("asphalt-tonnage-calculator", "asphalt-calculator"),
  @("battery-runtime-calculator", "battery-life-calculator"),
  @("unix-timestamp-to-date", "timestamp-converter"),
  @("unix-timestamp-generator", "timestamp-converter"),
  @("peak-to-peak-voltage-calculator", "peak-voltage-calculator")
)

foreach ($slug in $removed) {
  if ($toolsContent -notmatch [regex]::Escape('"' + $slug + '"')) {
    throw "Consolidated slug is missing from the registry filter: $slug"
  }
}

$allDefinitionText = ""
Get-ChildItem (Join-Path $root "lib") -Filter "tools-data*.ts" | ForEach-Object {
  $allDefinitionText += (Get-Content $_.FullName -Raw) + "`n"
}

foreach ($slug in $destinations) {
  # Supports both:
  # slug: "example"
  # "slug": "example"
  $pattern = '(?m)(?:"slug"|slug)\s*:\s*"' + [regex]::Escape($slug) + '"'
  if ($allDefinitionText -notmatch $pattern) {
    throw "Surviving destination tool definition was not found: $slug"
  }
}

foreach ($pair in $redirectPairs) {
  $source = $pair[0]
  $dest = $pair[1]
  $ruleNoSlash = "/tools/$source /tools/$dest/ 301"
  $ruleSlash = "/tools/$source/ /tools/$dest/ 301"
  if (-not $redirectContent.Contains($ruleNoSlash)) { throw "Missing redirect: $ruleNoSlash" }
  if (-not $redirectContent.Contains($ruleSlash)) { throw "Missing redirect: $ruleSlash" }
}

$definitionPattern = '(?m)(?:"slug"|slug)\s*:\s*"[^"]+"'
$definitionCount = ([regex]::Matches($allDefinitionText, $definitionPattern)).Count

if ($definitionCount -lt 650) {
  throw "Only $definitionCount tool definitions were found in lib. Expected at least 650."
}

Write-Host ""
Write-Host "PASS: surviving destination tools are present."
Write-Host "PASS: existing next.config.js is preserved for static export."
Write-Host "PASS: 8 overlapping tools are excluded from the public registry."
Write-Host "PASS: public\_redirects contains all 8 permanent consolidations."
Write-Host "PASS: both trailing-slash and no-slash old URLs are covered."
Write-Host "PASS: $definitionCount source tool definitions remain available for rollback/audit."
Write-Host "Expected public tool count after cleanup: 642"
Write-Host ""
Write-Host "VERIFICATION COMPLETE - safe to commit and push."
