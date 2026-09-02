$ErrorActionPreference = "Stop"

$root = (Get-Location).Path
$toolsFile = Join-Path $root "lib\tools-data.ts"
$configJs = Join-Path $root "next.config.js"
$configTs = Join-Path $root "next.config.ts"
$publicDir = Join-Path $root "public"
$redirectsFile = Join-Path $publicDir "_redirects"
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

if (-not (Test-Path $toolsFile)) {
  throw "Missing lib\tools-data.ts. Run this from the main Avorqin project folder."
}
if (-not (Test-Path $configJs)) {
  throw "Missing next.config.js. This cleanup is designed for your current Avorqin static-export setup."
}
if (Test-Path $configTs) {
  throw "Found next.config.ts. Remove the old incorrect cleanup next.config.ts before continuing. Your real project uses next.config.js."
}

$configContent = Get-Content $configJs -Raw
if ($configContent -notmatch "output\s*:\s*'export'") {
  throw "next.config.js does not appear to use output: 'export'. Stopping so the deployment setup is not changed accidentally."
}

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

$toolsContent = (Get-Content $toolsFile -Raw).Replace("`r`n", "`n")

if ($toolsContent -notmatch "consolidatedToolSlugs") {
  $arrayStart = "export const tools: ToolConfig[] = ["
  $arrayEnd = "  ...batch601To650Tools,`n];"

  if (-not $toolsContent.Contains($arrayStart)) {
    throw "Could not locate the exported tools array in lib\tools-data.ts. No registry changes were made."
  }
  if (-not $toolsContent.Contains($arrayEnd)) {
    throw "Could not locate the current batch601To650Tools end marker. No registry changes were made."
  }

  $slugLines = ($removed | ForEach-Object { '  "' + $_ + '",' }) -join "`n"
  $filterBlock = @"
// SEO consolidation: these same-intent URLs stay in source files for rollback,
// but are excluded from the public registry, internal tool lists, and sitemap.
const consolidatedToolSlugs = new Set<string>([
$slugLines
]);

$arrayStart
"@

  $toolsContent = $toolsContent.Replace($arrayStart, $filterBlock)
  $toolsContent = $toolsContent.Replace(
    $arrayEnd,
    "  ...batch601To650Tools,`n].filter((tool) => !consolidatedToolSlugs.has(tool.slug));"
  )

  [System.IO.File]::WriteAllText($toolsFile, $toolsContent, $utf8NoBom)
  Write-Host "UPDATED: lib\tools-data.ts now excludes the 8 consolidated URLs from the public registry."
} else {
  Write-Host "SKIP: lib\tools-data.ts already contains the consolidation filter."
}

if (-not (Test-Path $publicDir)) {
  New-Item -ItemType Directory -Path $publicDir | Out-Null
}

$existingRedirects = ""
if (Test-Path $redirectsFile) {
  $existingRedirects = (Get-Content $redirectsFile -Raw).Replace("`r`n", "`n")
}

$newRules = New-Object System.Collections.Generic.List[string]
foreach ($pair in $redirectPairs) {
  $source = $pair[0]
  $dest = $pair[1]
  $ruleNoSlash = "/tools/$source /tools/$dest/ 301"
  $ruleSlash = "/tools/$source/ /tools/$dest/ 301"

  if (-not $existingRedirects.Contains($ruleNoSlash)) { $newRules.Add($ruleNoSlash) }
  if (-not $existingRedirects.Contains($ruleSlash)) { $newRules.Add($ruleSlash) }
}

if ($newRules.Count -gt 0) {
  $header = @(
    "# Avorqin SEO consolidation redirects",
    "# Static rules are intentionally kept above any existing dynamic redirects."
  )
  $combined = (($header + $newRules) -join "`n") + "`n"
  if ($existingRedirects.Trim().Length -gt 0) {
    $combined += "`n" + $existingRedirects.TrimStart()
  }
  [System.IO.File]::WriteAllText($redirectsFile, $combined, $utf8NoBom)
  Write-Host "UPDATED: public\_redirects with 8 consolidations (slash and no-slash forms)."
} else {
  Write-Host "SKIP: all cleanup redirect rules are already present in public\_redirects."
}

Write-Host ""
Write-Host "INSTALL COMPLETE"
Write-Host "Now run:"
Write-Host "powershell -ExecutionPolicy Bypass -File .\scripts\verify-library-cleanup.ps1"
