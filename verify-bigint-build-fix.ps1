$ErrorActionPreference = "Stop"

$target = Join-Path $PSScriptRoot "components\tools\batch-759-1008-tool.tsx"
if (-not (Test-Path $target)) { throw "Missing $target" }

$content = [System.IO.File]::ReadAllText($target)

$remaining = [regex]::Matches($content, '(?<![A-Za-z0-9_])\d+n(?![A-Za-z0-9_])')
if ($remaining.Count -ne 0) {
    throw "FAIL: $($remaining.Count) BigInt literal(s) still remain."
}

foreach ($required in @('BigInt(0)','BigInt(8)','BigInt(58)','BigInt(255)')) {
    if (-not $content.Contains($required)) {
        throw "FAIL: expected replacement $required was not found."
    }
}

Write-Host "PASS: BigInt build fix is installed." -ForegroundColor Green
Write-Host "PASS: no ES2020-only BigInt literal syntax remains." -ForegroundColor Green
