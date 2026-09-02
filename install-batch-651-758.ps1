$ErrorActionPreference = "Stop"

$root = (Get-Location).Path
$libDir = Join-Path $root "lib"
$toolsFile = Join-Path $libDir "tools-data.ts"
$categoriesFile = Join-Path $libDir "tool-categories.ts"
$batchFile = Join-Path $libDir "tools-data-batch-651-758.ts"
$componentFile = Join-Path $root "components\tools\batch-651-758-tool.tsx"
$manifestFile = Join-Path $root "batch-651-758-manifest.json"
$homeFile = Join-Path $root "app\page.tsx"

function Read-Utf8([string]$file) {
    if (-not (Test-Path $file)) {
        throw "Missing required file: $file"
    }
    return [System.IO.File]::ReadAllText($file)
}

function Write-Utf8([string]$file, [string]$text) {
    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($file, $text, $utf8NoBom)
}

function Get-NewLine([string]$text) {
    if ($text.Contains("`r`n")) { return "`r`n" }
    return "`n"
}

function Get-ActiveToolDataFiles([string]$toolsSource) {
    $found = New-Object System.Collections.Generic.List[string]
    $found.Add($toolsFile)

    $pattern = 'from\s+["'']@/lib/(tools-data[^"'']+)["'']'
    foreach ($match in [regex]::Matches($toolsSource, $pattern)) {
        $relative = $match.Groups[1].Value + ".ts"
        $path = Join-Path $libDir $relative
        if (-not (Test-Path $path)) {
            throw "Active tool-data import points to a missing file: $relative"
        }
        $found.Add($path)
    }

    return @($found | Select-Object -Unique)
}

function Get-SlugsFromFiles([string[]]$files) {
    $list = New-Object System.Collections.Generic.List[string]
    $pattern = '(?m)(?:"slug"|slug)\s*:\s*"([^"]+)"'

    foreach ($file in $files) {
        $content = Read-Utf8 $file
        foreach ($match in [regex]::Matches($content, $pattern)) {
            $list.Add($match.Groups[1].Value)
        }
    }

    return @($list)
}

function Add-ToCategory(
    [string]$source,
    [string]$categorySlug,
    [string[]]$slugs
) {
    $slugToken = 'slug: "' + $categorySlug + '"'
    $objStart = $source.IndexOf($slugToken)
    if ($objStart -lt 0) {
        throw "Category '$categorySlug' was not found in lib\tool-categories.ts. No registry files were changed."
    }

    $listStart = $source.IndexOf("toolSlugs: [", $objStart)
    if ($listStart -lt 0) {
        throw "toolSlugs list missing for category '$categorySlug'. No registry files were changed."
    }

    $listEnd = $source.IndexOf("    ],", $listStart)
    if ($listEnd -lt 0) {
        throw "Could not find the end of toolSlugs for category '$categorySlug'. No registry files were changed."
    }

    $block = $source.Substring($listStart, $listEnd - $listStart)
    $missing = New-Object System.Collections.Generic.List[string]

    foreach ($slug in $slugs) {
        if (-not $block.Contains('"' + $slug + '"')) {
            $missing.Add($slug)
        }
    }

    if ($missing.Count -eq 0) {
        return $source
    }

    $nl = Get-NewLine $source
    $insertion = ""
    foreach ($slug in $missing) {
        $insertion += '      "' + $slug + '",' + $nl
    }

    return $source.Substring(0, $listEnd) + $insertion + $source.Substring($listEnd)
}

function Patch-Categories([string]$source) {
    $next = $source
    $next = Add-ToCategory $next "converters" @(
        "px-to-em-converter",
        "rem-to-em-converter",
        "em-to-rem-converter",
        "pt-to-px-converter",
        "px-to-pt-converter",
        "vw-to-px-converter",
        "px-to-vw-converter",
        "vh-to-px-converter",
        "px-to-vh-converter",
        "csv-to-sql-converter",
        "json-to-sql-converter",
        "sql-to-json-converter",
        "xml-to-csv-converter",
        "csv-to-xml-converter",
        "json-to-toml-converter",
        "toml-to-json-converter",
        "yaml-to-toml-converter",
        "toml-to-yaml-converter",
        "csv-delimiter-converter",
        "ini-to-json-converter"
    )
    $next = Add-ToCategory $next "encode-decode" @(
        "punycode-encoder",
        "punycode-decoder"
    )
    $next = Add-ToCategory $next "calculators" @(
        "screen-ppi-calculator",
        "utf8-byte-counter",
        "chmod-calculator"
    )
    $next = Add-ToCategory $next "json" @(
        "csv-to-sql-converter",
        "json-to-sql-converter",
        "sql-to-json-converter",
        "xml-to-csv-converter",
        "csv-to-xml-converter",
        "json-to-toml-converter",
        "toml-to-json-converter",
        "yaml-to-toml-converter",
        "toml-to-yaml-converter",
        "json-flattener",
        "json-unflattener",
        "csv-delimiter-converter",
        "csv-row-filter",
        "csv-column-remover",
        "csv-merge-tool",
        "ini-to-json-converter"
    )
    $next = Add-ToCategory $next "web-code" @(
        "utf8-byte-counter",
        "xpath-tester",
        "sql-insert-generator",
        "chmod-calculator",
        "ini-to-json-converter"
    )
    $next = Add-ToCategory $next "generators" @(
        "sql-insert-generator"
    )
    $next = Add-ToCategory $next "finance" @(
        "mortgage-extra-payment-calculator",
        "pmi-calculator",
        "mortgage-points-calculator",
        "closing-cost-calculator",
        "home-affordability-calculator",
        "heloc-payment-calculator",
        "balloon-loan-calculator",
        "interest-only-loan-calculator",
        "student-loan-calculator",
        "car-lease-calculator",
        "present-value-calculator",
        "annuity-payment-calculator",
        "retirement-savings-calculator",
        "401k-calculator",
        "roth-ira-calculator",
        "inflation-calculator",
        "cd-calculator",
        "net-worth-calculator",
        "emergency-fund-calculator",
        "current-ratio-calculator",
        "business-burn-rate-calculator",
        "cash-runway-calculator",
        "working-capital-calculator",
        "debt-service-coverage-ratio-calculator"
    )
    $next = Add-ToCategory $next "construction" @(
        "drywall-mud-calculator",
        "drywall-screw-calculator",
        "drywall-cost-calculator",
        "paint-cost-calculator",
        "flooring-cost-calculator",
        "tile-cost-calculator",
        "fence-post-spacing-calculator",
        "gutter-size-calculator",
        "gutter-slope-calculator",
        "downspout-calculator",
        "insulation-r-value-calculator",
        "room-btu-calculator",
        "hvac-tonnage-calculator",
        "cfm-calculator",
        "air-changes-per-hour-calculator",
        "duct-size-calculator",
        "pipe-slope-calculator",
        "water-pressure-loss-calculator",
        "rainwater-harvesting-calculator",
        "lawn-seed-calculator",
        "sod-calculator",
        "concrete-weight-calculator"
    )
    $next = Add-ToCategory $next "math" @(
        "fraction-to-decimal-calculator",
        "scientific-notation-calculator",
        "significant-figures-calculator",
        "rounding-calculator",
        "arithmetic-sequence-calculator",
        "geometric-sequence-calculator",
        "binomial-probability-calculator",
        "expected-value-calculator",
        "percentile-calculator",
        "percentile-rank-calculator",
        "normal-distribution-calculator",
        "confidence-interval-calculator",
        "margin-of-error-calculator",
        "sample-size-calculator",
        "correlation-coefficient-calculator",
        "covariance-calculator",
        "linear-regression-calculator",
        "arc-length-calculator",
        "sector-area-calculator",
        "ellipse-calculator",
        "trapezoid-calculator",
        "polygon-area-calculator"
    )
    $next = Add-ToCategory $next "electrical" @(
        "pcb-trace-width-calculator",
        "resistor-power-rating-calculator",
        "capacitor-code-calculator",
        "battery-pack-series-parallel-calculator",
        "ups-runtime-calculator",
        "motor-torque-calculator",
        "current-density-calculator",
        "capacitor-discharge-time-calculator"
    )
    return $next
}

foreach ($required in @(
    $toolsFile,
    $categoriesFile,
    $batchFile,
    $componentFile,
    $manifestFile,
    $homeFile
)) {
    if (-not (Test-Path $required)) {
        throw "Missing required file: $required"
    }
}

$manifest = Get-Content $manifestFile -Raw | ConvertFrom-Json
if ([int]$manifest.newTools -ne 108 -or $manifest.tools.Count -ne 108) {
    throw "Manifest must contain exactly 108 new tools."
}
if ([int]$manifest.publicBefore -ne 642 -or [int]$manifest.publicAfter -ne 750) {
    throw "Manifest public-count checkpoint is not 642 -> 750."
}
if ([int]$manifest.sourceBefore -ne 650 -or [int]$manifest.sourceAfter -ne 758) {
    throw "Manifest source-count checkpoint is not 650 -> 758."
}

$newSlugs = @($manifest.tools | ForEach-Object { $_.slug })
if (($newSlugs | Sort-Object -Unique).Count -ne 108) {
    throw "The new batch contains duplicate slugs."
}

$missingRoutes = @()
foreach ($slug in $newSlugs) {
    $route = Join-Path $root ("app\tools\" + $slug + "\page.tsx")
    if (-not (Test-Path $route)) {
        $missingRoutes += $slug
    }
}
if ($missingRoutes.Count -gt 0) {
    throw "Missing new route pages: $($missingRoutes -join ', ')"
}

# Clean up the obsolete route from the first package version, which used bcryptjs.
$obsoleteBcryptRoute = Join-Path $root "app\tools\bcrypt-hash-tool"
if (Test-Path $obsoleteBcryptRoute) {
    Remove-Item $obsoleteBcryptRoute -Recurse -Force
    Write-Host "Removed obsolete app\tools\bcrypt-hash-tool route from the first package version." -ForegroundColor Yellow
}

$originalTools = Read-Utf8 $toolsFile
$originalCategories = Read-Utf8 $categoriesFile
$homeContent = Read-Utf8 $homeFile

foreach ($requiredPattern in @(
    "const allTools: ToolConfig[]",
    "export const tools: ToolConfig[] = allTools.filter",
    "return allTools.find",
    "...batch601To650Tools,",
    "consolidatedToolSlugs"
)) {
    if (-not $originalTools.Contains($requiredPattern)) {
        throw "Current cleanup architecture check failed: missing '$requiredPattern'. No registry files were changed."
    }
}

if (-not $homeContent.Contains("500+")) {
    throw "Homepage no longer contains the required 500+ wording. No registry files were changed."
}

$alreadyIntegrated = $originalTools.Contains("...batch651To758Tools")

if (-not $alreadyIntegrated) {
    $activeFiles = Get-ActiveToolDataFiles $originalTools
    $existingSlugs = Get-SlugsFromFiles $activeFiles
    $existingUnique = @($existingSlugs | Sort-Object -Unique)

    if ($existingUnique.Count -ne 650) {
        throw "Preflight found $($existingUnique.Count) active unique source-tool slugs; expected exactly 650 before this batch. No registry files were changed."
    }

    $collisionSet = New-Object System.Collections.Generic.HashSet[string]
    foreach ($slug in $existingUnique) {
        [void]$collisionSet.Add($slug)
    }

    $collisions = @()
    foreach ($slug in $newSlugs) {
        if ($collisionSet.Contains($slug)) {
            $collisions += $slug
        }
    }

    if ($collisions.Count -gt 0) {
        throw "STOP: new batch slug collision(s) found in the active 650-definition library: $($collisions -join ', ')"
    }
}

$nl = Get-NewLine $originalTools
$importLine = 'import { batch651To758Tools } from "@/lib/tools-data-batch-651-758";'
$patchedTools = $originalTools

if (-not $patchedTools.Contains($importLine)) {
    $patchedTools = $importLine + $nl + $patchedTools
}

if (-not $patchedTools.Contains("...batch651To758Tools")) {
    $oldSpread = "  ...batch601To650Tools," + $nl
    $newSpread = "  ...batch601To650Tools," + $nl + "  ...batch651To758Tools," + $nl

    if (-not $patchedTools.Contains($oldSpread)) {
        throw "Could not find the batch601To650Tools spread inside allTools. No registry files were changed."
    }

    $patchedTools = $patchedTools.Replace($oldSpread, $newSpread)
}

if (-not $patchedTools.Contains("const allTools: ToolConfig[]")) {
    throw "In-memory check failed: allTools was lost."
}
if (-not $patchedTools.Contains("export const tools: ToolConfig[] = allTools.filter")) {
    throw "In-memory check failed: public consolidation filter was lost."
}
if (-not $patchedTools.Contains("return allTools.find")) {
    throw "In-memory check failed: getToolBySlug no longer uses allTools."
}

$patchedCategories = Patch-Categories $originalCategories

# Ensure every new slug was assigned to at least one category before writing.
$unregistered = @()
foreach ($slug in $newSlugs) {
    if (-not $patchedCategories.Contains('"' + $slug + '"')) {
        $unregistered += $slug
    }
}
if ($unregistered.Count -gt 0) {
    throw "Category preflight failed for: $($unregistered -join ', ')"
}

# This batch intentionally adds no new npm dependencies so it can be integrated on Windows without a local Node/npm installation.

if ($patchedTools -ne $originalTools) {
    Write-Utf8 $toolsFile $patchedTools
    Write-Host "Updated lib\tools-data.ts" -ForegroundColor Green
} else {
    Write-Host "lib\tools-data.ts was already integrated." -ForegroundColor Yellow
}

if ($patchedCategories -ne $originalCategories) {
    Write-Utf8 $categoriesFile $patchedCategories
    Write-Host "Updated lib\tool-categories.ts" -ForegroundColor Green
} else {
    Write-Host "Category lists were already integrated." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "INSTALL COMPLETE" -ForegroundColor Green
Write-Host "New source definitions: 108"
Write-Host "Expected source definition total: 758"
Write-Host "Expected public tool total: 750"
Write-Host "The 8 consolidated legacy definitions remain filtered from the public registry."
Write-Host "Homepage wording was not modified and remains 500+."
Write-Host ""
Write-Host "Next: run .\verify-batch-651-758.ps1. Then commit/push with GitHub Desktop and let Cloudflare run the production build."
