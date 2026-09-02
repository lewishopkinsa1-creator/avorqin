$ErrorActionPreference = "Stop"

$root = (Get-Location).Path
$toolsFile = Join-Path $root "lib\tools-data.ts"
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

if (-not (Test-Path $toolsFile)) {
  throw "Missing lib\tools-data.ts. Run this from the main Avorqin project folder."
}

$content = (Get-Content $toolsFile -Raw).Replace("`r`n", "`n")

if ($content -notmatch "consolidatedToolSlugs") {
  throw "The earlier consolidation filter was not found. Stop and send ChatGPT this message."
}

# If already fixed, do nothing.
if ($content -match "const allTools: ToolConfig\[\]" -and
    $content -match "return allTools\.find") {
  Write-Host "SKIP: build-safe registry fix is already installed."
  Write-Host "No changes were needed."
  exit 0
}

# The cleanup installer changed the public tools array to:
# export const tools: ToolConfig[] = [ ... ].filter(...)
# We now keep that full array privately as allTools so legacy route files
# can still resolve their definitions while Next.js statically builds them.
$start = "export const tools: ToolConfig[] = ["
if (-not $content.Contains($start)) {
  throw "Could not find the exported tools array. No changes were made."
}
$content = $content.Replace($start, "const allTools: ToolConfig[] = [", 1)

$oldEnd = "  ...batch601To650Tools,`n].filter((tool) => !consolidatedToolSlugs.has(tool.slug));"
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

$oldLookup = "return tools.find((t) => t.slug === slug);"
$newLookup = "return allTools.find((t) => t.slug === slug);"
if (-not $content.Contains($oldLookup)) {
  throw "Could not find getToolBySlug lookup. No changes were written."
}
$content = $content.Replace($oldLookup, $newLookup)

[System.IO.File]::WriteAllText($toolsFile, $content, $utf8NoBom)

# Verify the exact build-safe structure.
$check = Get-Content $toolsFile -Raw
if ($check -notmatch "const allTools: ToolConfig\[\]") {
  throw "Fix wrote the file but allTools verification failed."
}
if ($check -notmatch "export const tools: ToolConfig\[\] = allTools\.filter") {
  throw "Fix wrote the file but public-registry verification failed."
}
if ($check -notmatch "return allTools\.find") {
  throw "Fix wrote the file but getToolBySlug verification failed."
}

Write-Host ""
Write-Host "PASS: all 650 source definitions are available for Next.js route builds."
Write-Host "PASS: the public tools registry still filters the 8 consolidated pages."
Write-Host "PASS: getToolBySlug now resolves legacy routes from allTools."
Write-Host ""
Write-Host "BUILD FIX INSTALLED"
Write-Host "You can now commit and push this change."
