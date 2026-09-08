$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = $root
$layoutPath = Join-Path $projectRoot "components\shared\tool-layout.tsx"
$componentPath = Join-Path $projectRoot "components\shared\css-unit-links.tsx"

if (-not (Test-Path $layoutPath)) {
    throw "Could not find components\shared\tool-layout.tsx. Run this script from the Avorqin project root after copying the package contents there."
}

if (-not (Test-Path $componentPath)) {
    throw "Could not find components\shared\css-unit-links.tsx. Make sure the components folder from the package was merged into the Avorqin project."
}

$text = Get-Content -Raw -LiteralPath $layoutPath

$importLine = 'import { CssUnitLinks } from "./css-unit-links";'
if ($text -notmatch [regex]::Escape($importLine)) {
    $toolNavImport = 'import { ToolNav } from "./tool-nav";'
    if ($text -notmatch [regex]::Escape($toolNavImport)) {
        throw "Safety stop: expected ToolNav import was not found in tool-layout.tsx. No changes were made."
    }
    $text = $text.Replace($toolNavImport, "$toolNavImport`r`n$importLine")
}

$linkCall = '<CssUnitLinks currentSlug={tool.slug} />'
if ($text -notmatch [regex]::Escape($linkCall)) {
    $seoCall = '<SEOContent tool={tool} />'
    if ($text -notmatch [regex]::Escape($seoCall)) {
        throw "Safety stop: expected SEOContent call was not found in tool-layout.tsx. No changes were made."
    }
    $text = $text.Replace($seoCall, "$seoCall`r`n            $linkCall")
}

Set-Content -LiteralPath $layoutPath -Value $text -Encoding UTF8

Write-Host "" 
Write-Host "INSTALL COMPLETE" -ForegroundColor Green
Write-Host "Added contextual CSS-unit links through ToolLayout." -ForegroundColor Green
Write-Host "Affected public pages only:" 
Write-Host "  rem-to-px-converter"
Write-Host "  px-to-rem-converter"
Write-Host "  em-to-px-converter"
Write-Host "  px-to-em-converter"
Write-Host "  rem-to-em-converter"
Write-Host "  em-to-rem-converter"
Write-Host "No tool definitions, sitemap entries, redirects, or tool counts were changed."
Write-Host "Next: run .\verify-css-unit-internal-links.ps1"
