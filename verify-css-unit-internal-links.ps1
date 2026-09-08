$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$layoutPath = Join-Path $root "components\shared\tool-layout.tsx"
$componentPath = Join-Path $root "components\shared\css-unit-links.tsx"

if (-not (Test-Path $layoutPath)) { throw "FAIL: tool-layout.tsx not found." }
if (-not (Test-Path $componentPath)) { throw "FAIL: css-unit-links.tsx not found." }

$layout = Get-Content -Raw -LiteralPath $layoutPath
$component = Get-Content -Raw -LiteralPath $componentPath

$checks = @(
    @{ Name = "ToolLayout imports CssUnitLinks"; Pass = $layout.Contains('import { CssUnitLinks } from "./css-unit-links";') },
    @{ Name = "ToolLayout renders CssUnitLinks"; Pass = $layout.Contains('<CssUnitLinks currentSlug={tool.slug} />') },
    @{ Name = "REM to PX target is included"; Pass = $component.Contains('slug: "rem-to-px-converter"') },
    @{ Name = "PX to REM source is included"; Pass = $component.Contains('slug: "px-to-rem-converter"') },
    @{ Name = "EM to PX source is included"; Pass = $component.Contains('slug: "em-to-px-converter"') },
    @{ Name = "PX to EM source is included"; Pass = $component.Contains('slug: "px-to-em-converter"') },
    @{ Name = "REM to EM source is included"; Pass = $component.Contains('slug: "rem-to-em-converter"') },
    @{ Name = "EM to REM source is included"; Pass = $component.Contains('slug: "em-to-rem-converter"') },
    @{ Name = "Converters category link is included"; Pass = $component.Contains('href="/tools/converters/"') }
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
Write-Host "CSS unit internal-link cluster is installed."
Write-Host "Expected GitHub Desktop changes: 2 code files plus optional README/script files."
