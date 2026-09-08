$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = $root
$layoutPath = Join-Path $projectRoot "components\shared\tool-layout.tsx"
$componentPath = Join-Path $projectRoot "components\shared\ascii-text-links.tsx"

if (-not (Test-Path $layoutPath)) {
    throw "Could not find components\shared\tool-layout.tsx. Run this script from the Avorqin project root after copying the package contents there."
}

if (-not (Test-Path $componentPath)) {
    throw "Could not find components\shared\ascii-text-links.tsx. Make sure the components folder from the package was merged into the Avorqin project."
}

$text = Get-Content -Raw -LiteralPath $layoutPath

$importLine = 'import { AsciiTextLinks } from "./ascii-text-links";'
if ($text -notmatch [regex]::Escape($importLine)) {
    $cssImport = 'import { CssUnitLinks } from "./css-unit-links";'
    $toolNavImport = 'import { ToolNav } from "./tool-nav";'

    if ($text -match [regex]::Escape($cssImport)) {
        $text = $text.Replace($cssImport, "$cssImport`r`n$importLine")
    } elseif ($text -match [regex]::Escape($toolNavImport)) {
        $text = $text.Replace($toolNavImport, "$toolNavImport`r`n$importLine")
    } else {
        throw "Safety stop: expected CssUnitLinks or ToolNav import was not found in tool-layout.tsx. No changes were made."
    }
}

$linkCall = '<AsciiTextLinks currentSlug={tool.slug} />'
if ($text -notmatch [regex]::Escape($linkCall)) {
    $cssCall = '<CssUnitLinks currentSlug={tool.slug} />'
    $seoCall = '<SEOContent tool={tool} />'

    if ($text -match [regex]::Escape($cssCall)) {
        $text = $text.Replace($cssCall, "$cssCall`r`n            $linkCall")
    } elseif ($text -match [regex]::Escape($seoCall)) {
        $text = $text.Replace($seoCall, "$seoCall`r`n            $linkCall")
    } else {
        throw "Safety stop: expected CssUnitLinks or SEOContent call was not found in tool-layout.tsx. No changes were made."
    }
}

Set-Content -LiteralPath $layoutPath -Value $text -Encoding UTF8

Write-Host ""
Write-Host "INSTALL COMPLETE" -ForegroundColor Green
Write-Host "Added contextual ASCII/text encoding links through ToolLayout." -ForegroundColor Green
Write-Host "Affected public pages only:"
Write-Host "  ascii-to-text-converter"
Write-Host "  text-to-ascii-converter"
Write-Host "  text-to-hex-converter"
Write-Host "  hex-to-text-converter"
Write-Host "  binary-to-text-converter"
Write-Host "  text-to-binary-converter"
Write-Host "No tool definitions, sitemap entries, redirects, or tool counts were changed."
Write-Host "Next: run .\verify-ascii-text-internal-links.ps1"
