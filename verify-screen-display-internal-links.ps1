$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$layoutPath = Join-Path $root "components\shared\tool-layout.tsx"
$componentPath = Join-Path $root "components\shared\screen-display-links.tsx"

function Pass($message) {
    Write-Host "PASS: $message" -ForegroundColor Green
}

function RequireText($path, $needle, $message) {
    if (-not (Test-Path $path)) {
        throw "Missing required file: $path"
    }
    $text = Get-Content -Raw -LiteralPath $path
    if ($text -notmatch [regex]::Escape($needle)) {
        throw "Verification failed: $message"
    }
    Pass $message
}

RequireText $layoutPath 'import { ScreenDisplayLinks } from "./screen-display-links";' "ToolLayout imports ScreenDisplayLinks"
RequireText $layoutPath '<ScreenDisplayLinks currentSlug={tool.slug} />' "ToolLayout renders ScreenDisplayLinks"
RequireText $componentPath 'slug: "screen-resolution-calculator"' "Screen Resolution target is included"
RequireText $componentPath 'slug: "screen-ppi-calculator"' "Screen PPI source is included"
RequireText $componentPath 'slug: "aspect-ratio-calculator"' "Aspect Ratio source is included"
RequireText $componentPath 'slug: "image-dimensions-checker"' "Image Dimensions source is included"
RequireText $componentPath 'slug: "image-dpi-calculator"' "Image DPI source is included"
RequireText $componentPath 'href="/tools/calculators/"' "Developer calculators category link is included"

Write-Host ""
Write-Host "VERIFICATION COMPLETE" -ForegroundColor Green
Write-Host "Screen/display internal-link cluster is installed."
Write-Host "Expected GitHub Desktop changes: 2 code files plus optional README/script files."
