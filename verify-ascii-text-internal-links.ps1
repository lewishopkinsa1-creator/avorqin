$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$layoutPath = Join-Path $root "components\shared\tool-layout.tsx"
$componentPath = Join-Path $root "components\shared\ascii-text-links.tsx"

if (-not (Test-Path $layoutPath)) { throw "FAIL: tool-layout.tsx not found." }
if (-not (Test-Path $componentPath)) { throw "FAIL: ascii-text-links.tsx not found." }

$layout = Get-Content -Raw -LiteralPath $layoutPath
$component = Get-Content -Raw -LiteralPath $componentPath

$checks = @(
    @{ Name = "ToolLayout imports AsciiTextLinks"; Pass = $layout.Contains('import { AsciiTextLinks } from "./ascii-text-links";') },
    @{ Name = "ToolLayout renders AsciiTextLinks"; Pass = $layout.Contains('<AsciiTextLinks currentSlug={tool.slug} />') },
    @{ Name = "ASCII to Text target is included"; Pass = $component.Contains('slug: "ascii-to-text-converter"') },
    @{ Name = "Text to ASCII source is included"; Pass = $component.Contains('slug: "text-to-ascii-converter"') },
    @{ Name = "Text to Hex source is included"; Pass = $component.Contains('slug: "text-to-hex-converter"') },
    @{ Name = "Hex to Text source is included"; Pass = $component.Contains('slug: "hex-to-text-converter"') },
    @{ Name = "Binary to Text source is included"; Pass = $component.Contains('slug: "binary-to-text-converter"') },
    @{ Name = "Text to Binary source is included"; Pass = $component.Contains('slug: "text-to-binary-converter"') },
    @{ Name = "Encode/decode category link is included"; Pass = $component.Contains('href="/tools/encode-decode/"') }
)

$failed = $false
foreach ($check in $checks) {
    if ($check.Pass) {
        Write-Host "PASS: $($check.Name)" -ForegroundColor Green
    } else {
        Write-Host "FAIL: $($check.Name)" -ForegroundColor Red
        $failed = $true
    }
}

if ($failed) {
    throw "Verification failed. Do not commit/push."
}

Write-Host ""
Write-Host "VERIFICATION COMPLETE" -ForegroundColor Green
Write-Host "ASCII/Text internal-link cluster is installed."
Write-Host "Expected GitHub Desktop changes: 2 code files plus optional README/script files."
