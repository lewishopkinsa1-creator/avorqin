$ErrorActionPreference = "Stop"

$root = (Get-Location).Path
$toolsFile = Join-Path $root "lib\tools-data.ts"
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

if (-not (Test-Path $toolsFile)) {
  throw "Missing lib\tools-data.ts. Run this from the main Avorqin project folder."
}

$content = (Get-Content $toolsFile -Raw).Replace("`r`n", "`n")

if ($content -notmatch "consolidatedToolSlugs") {
  throw "The earlier consolidation filter was not found. No changes were made."
}

# If already fixed, exit safely.
if ($content -match "const allTools: ToolConfig\[\]" -and
    $content -match "return allTools\.find") {
  Write-Host ""
  Write-Host "SKIP: build-safe registry fix is already installed."
  Write-Host "No changes were needed."
  exit 0
}

# Change only the first exported tools-array declaration.
$startPattern = [regex]::Escape("export const tools: ToolConfig[] = [")
if (-not [regex]::IsMatch($content, $startPattern)) {
  throw "Could not find the exported tools array. No changes were made."
}
$content = [regex]::Replace(
  $content,
  $startPattern,
  "const allTools: ToolConfig[] = [",
  1
)

# Convert the currently filtered array into:
# 1) allTools = all 650 source definitions
# 2) tools = filtered public 642-tool registry
$oldEnd = @"
  ...batch601To650Tools,
].filter((tool) => !consolidatedToolSlugs.has(tool.slug));
"@

$newEnd = @"
  ...batch601To650Tools,
];

export const tools: ToolConfig[] = allTools.filter(
  (tool) => !consolidatedToolSlugs.has(tool.slug)
);
"@

if (-not $content.Contains($oldEnd)) {
  throw "Could not find the current filtered tools-array ending. No changes were written."
}
$content = $content.Replace($oldEnd, $newEnd)

# Route lookup must use allTools so old route files can statically build.
$oldLookup = "return tools.find((t) => t.slug === slug);"
$newLookup = "return allTools.find((t) => t.slug === slug);"

if (-not $content.Contains($oldLookup)) {
  throw "Could not find getToolBySlug lookup. No changes were written."
}
$content = $content.Replace($oldLookup, $newLookup)

# Validate in memory before writing anything.
if ($content -notmatch "const allTools: ToolConfig\[\]") {
  throw "In-memory verification failed for allTools. No changes were written."
}
if ($content -notmatch "export const tools: ToolConfig\[\] = allTools\.filter") {
  throw "In-memory verification failed for public tools registry. No changes were written."
}
if ($content -notmatch "return allTools\.find") {
  throw "In-memory verification failed for getToolBySlug. No changes were written."
}

[System.IO.File]::WriteAllText($toolsFile, $content, $utf8NoBom)

# Verify from disk.
$check = Get-Content $toolsFile -Raw

if ($check -notmatch "const allTools: ToolConfig\[\]") {
  throw "Disk verification failed: allTools is missing."
}
if ($check -notmatch "export const tools: ToolConfig\[\] = allTools\.filter") {
  throw "Disk verification failed: public filtered registry is missing."
}
if ($check -notmatch "return allTools\.find") {
  throw "Disk verification failed: getToolBySlug is not using allTools."
}

Write-Host ""
Write-Host "PASS: all 650 source definitions are available for Next.js route builds."
Write-Host "PASS: the public tools registry still filters the 8 consolidated pages."
Write-Host "PASS: getToolBySlug now resolves legacy routes from allTools."
Write-Host ""
Write-Host "BUILD FIX INSTALLED"
Write-Host "Do not push yet. Send this result to ChatGPT first."
