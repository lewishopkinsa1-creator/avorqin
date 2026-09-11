$ErrorActionPreference = "Stop"

$target = Join-Path $PSScriptRoot "components\tools\batch-759-1008-tool.tsx"

if (-not (Test-Path $target)) {
    throw "Could not find $target. Copy this script into the Avorqin project root and run it there."
}

$content = [System.IO.File]::ReadAllText($target)
$before = $content

$content = [regex]::Replace($content, '(?<![A-Za-z0-9_])0n(?![A-Za-z0-9_])', 'BigInt(0)')
$content = [regex]::Replace($content, '(?<![A-Za-z0-9_])8n(?![A-Za-z0-9_])', 'BigInt(8)')
$content = [regex]::Replace($content, '(?<![A-Za-z0-9_])58n(?![A-Za-z0-9_])', 'BigInt(58)')
$content = [regex]::Replace($content, '(?<![A-Za-z0-9_])255n(?![A-Za-z0-9_])', 'BigInt(255)')

if ($content -eq $before) {
    Write-Host "No BigInt literal replacements were needed." -ForegroundColor Yellow
} else {
    [System.IO.File]::WriteAllText($target, $content, (New-Object System.Text.UTF8Encoding($false)))
    Write-Host "FIX COMPLETE" -ForegroundColor Green
    Write-Host "Replaced ES2020-only BigInt literal syntax in batch-759-1008-tool.tsx." -ForegroundColor Green
}

$remaining = [regex]::Matches($content, '(?<![A-Za-z0-9_])\d+n(?![A-Za-z0-9_])')
if ($remaining.Count -gt 0) {
    throw "BigInt literal syntax still remains in the file: $($remaining.Count) occurrence(s)."
}

Write-Host "PASS: no BigInt numeric literals remain." -ForegroundColor Green
Write-Host "Next: commit the changed code file and push. Cloudflare will run the full production build." -ForegroundColor Cyan
