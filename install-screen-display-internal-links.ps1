$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = $root
$layoutPath = Join-Path $projectRoot "components\shared\tool-layout.tsx"
$componentPath = Join-Path $projectRoot "components\shared\screen-display-links.tsx"

if (-not (Test-Path $layoutPath)) {
    throw "Could not find components\shared\tool-layout.tsx. Run this script from the Avorqin project root after copying the package contents there."
}

if (-not (Test-Path $componentPath)) {
    throw "Could not find components\shared\screen-display-links.tsx. Make sure the components folder from the package was merged into the Avorqin project."
}

$text = Get-Content -Raw -LiteralPath $layoutPath

$importLine = 'import { ScreenDisplayLinks } from "./screen-display-links";'
if ($text -notmatch [regex]::Escape($importLine)) {
    $asciiImport = 'import { AsciiTextLinks } from "./ascii-text-links";'
    $cssImport = 'import { CssUnitLinks } from "./css-unit-links";'
    $toolNavImport = 'import { ToolNav } from "./tool-nav";'

    if ($text -match [regex]::Escape($asciiImport)) {
        $text = $text.Replace($asciiImport, "$asciiImport`r`n$importLine")
    } elseif ($text -match [regex]::Escape($cssImport)) {
        $text = $text.Replace($cssImport, "$cssImport`r`n$importLine")
    } elseif ($text -match [regex]::Escape($toolNavImport)) {
        $text = $text.Replace($toolNavImport, "$toolNavImport`r`n$importLine")
    } else {
        throw "Safety stop: expected AsciiTextLinks, CssUnitLinks, or ToolNav import was not found in tool-layout.tsx. No changes were made."
    }
}

$linkCall = '<ScreenDisplayLinks currentSlug={tool.slug} />'
if ($text -notmatch [regex]::Escape($linkCall)) {
    $asciiCall = '<AsciiTextLinks currentSlug={tool.slug} />'
    $cssCall = '<CssUnitLinks currentSlug={tool.slug} />'
    $seoCall = '<SEOContent tool={tool} />'

    if ($text -match [regex]::Escape($asciiCall)) {
        $text = $text.Replace($asciiCall, "$asciiCall`r`n            $linkCall")
    } elseif ($text -match [regex]::Escape($cssCall)) {
        $text = $text.Replace($cssCall, "$cssCall`r`n            $linkCall")
    } elseif ($text -match [regex]::Escape($seoCall)) {
        $text = $text.Replace($seoCall, "$seoCall`r`n            $linkCall")
    } else {
        throw "Safety stop: expected AsciiTextLinks, CssUnitLinks, or SEOContent call was not found in tool-layout.tsx. No changes were made."
    }
}

Set-Content -LiteralPath $layoutPath -Value $text -Encoding UTF8

Write-Host ""
Write-Host "INSTALL COMPLETE" -ForegroundColor Green
Write-Host "Added contextual screen/display links through ToolLayout." -ForegroundColor Green
Write-Host "Affected public pages only:"
Write-Host "  screen-resolution-calculator"
Write-Host "  screen-ppi-calculator"
Write-Host "  aspect-ratio-calculator"
Write-Host "  image-dimensions-checker"
Write-Host "  image-dpi-calculator"
Write-Host "No tool definitions, sitemap entries, redirects, or tool counts were changed."
Write-Host "Next: run .\verify-screen-display-internal-links.ps1"
