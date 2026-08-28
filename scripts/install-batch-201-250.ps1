$ErrorActionPreference = 'Stop'

$root = (Get-Location).Path
$toolsFile = Join-Path $root 'lib\tools-data.ts'
$categoriesFile = Join-Path $root 'lib\tool-categories.ts'

function Read-Utf8([string]$file) {
    if (-not (Test-Path $file)) { throw "Missing $file" }
    return [System.IO.File]::ReadAllText($file)
}

function Write-Utf8([string]$file, [string]$text) {
    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($file, $text, $utf8NoBom)
}

function Patch-Tools([string]$source) {
    $importLine = 'import { batch201To250Tools } from "@/lib/tools-data-batch-201-250";'
    $next = $source

    if (-not $next.Contains($importLine)) {
        $next = $importLine + "`r`n" + $next
    }

    if (-not $next.Contains('...batch201To250Tools')) {
        $marker = "`r`n];`r`n`r`nexport function getToolBySlug"
        $at = $next.LastIndexOf($marker)
        if ($at -lt 0) {
            $marker = "`n];`n`nexport function getToolBySlug"
            $at = $next.LastIndexOf($marker)
        }
        if ($at -lt 0) { throw 'Could not find end of consolidated tools array in lib/tools-data.ts. No files changed.' }
        $next = $next.Substring(0,$at) + "`r`n  ...batch201To250Tools," + $next.Substring($at)
    }
    return $next
}

function Add-ToCategory([string]$source, [string]$categorySlug, [string[]]$slugs) {
    $slugToken = 'slug: "' + $categorySlug + '"'
    $objStart = $source.IndexOf($slugToken)
    if ($objStart -lt 0) { throw "Category $categorySlug not found in lib/tool-categories.ts. No files changed." }

    $listStart = $source.IndexOf('toolSlugs: [', $objStart)
    if ($listStart -lt 0) { throw "toolSlugs list missing for $categorySlug. No files changed." }

    $listEnd = $source.IndexOf('    ],', $listStart)
    if ($listEnd -lt 0) { throw "Could not find end of toolSlugs for $categorySlug. No files changed." }

    $block = $source.Substring($listStart, $listEnd - $listStart)
    $missing = @()
    foreach ($slug in $slugs) {
        if (-not $block.Contains('"' + $slug + '"')) { $missing += $slug }
    }
    if ($missing.Count -eq 0) { return $source }

    $insertion = ''
    foreach ($slug in $missing) { $insertion += '      "' + $slug + '",' + "`r`n" }
    return $source.Substring(0,$listEnd) + $insertion + $source.Substring($listEnd)
}

function Patch-Categories([string]$source) {
    $next = $source
    $next = Add-ToCategory $next 'finance' @(
        'auto-loan-calculator','credit-card-payoff-calculator','debt-payoff-calculator','debt-snowball-calculator','debt-avalanche-calculator','apr-calculator','apy-calculator','debt-to-income-ratio-calculator','loan-amortization-calculator','rule-of-72-calculator','rent-vs-buy-calculator','down-payment-calculator','mortgage-refinance-calculator','biweekly-mortgage-calculator','credit-card-interest-calculator','credit-card-minimum-payment-calculator','pay-raise-calculator','overtime-pay-calculator','freelance-rate-calculator','cost-per-unit-calculator','unit-price-calculator','price-per-square-foot-calculator','revenue-growth-calculator','customer-acquisition-cost-calculator','customer-lifetime-value-calculator','roas-calculator','cpm-calculator','cpc-calculator','cpa-calculator','conversion-rate-calculator'
    )
    $next = Add-ToCategory $next 'seo' @(
        'title-tag-length-checker','meta-description-length-checker','canonical-tag-generator','meta-robots-tag-generator','hreflang-validator','json-ld-validator','xml-sitemap-validator','sitemap-url-extractor','redirect-rule-generator','utm-decoder'
    )
    $next = Add-ToCategory $next 'json' @(
        'json-schema-validator','json-escape-unescape','json-string-converter','csv-formatter','csv-column-extractor','csv-duplicate-remover','csv-sorter','tsv-to-csv','csv-to-tsv','yaml-validator'
    )
    $next = Add-ToCategory $next 'formatters' @('csv-formatter','yaml-validator')
    $next = Add-ToCategory $next 'converters' @('tsv-to-csv','csv-to-tsv')
    return $next
}

# Build both in memory before writing either existing file.
$originalTools = Read-Utf8 $toolsFile
$originalCategories = Read-Utf8 $categoriesFile
$patchedTools = Patch-Tools $originalTools
$patchedCategories = Patch-Categories $originalCategories

if ($patchedTools -ne $originalTools) {
    Write-Utf8 $toolsFile $patchedTools
    Write-Host 'Updated lib/tools-data.ts' -ForegroundColor Green
} else {
    Write-Host 'No changes needed in lib/tools-data.ts' -ForegroundColor Yellow
}

if ($patchedCategories -ne $originalCategories) {
    Write-Utf8 $categoriesFile $patchedCategories
    Write-Host 'Updated lib/tool-categories.ts' -ForegroundColor Green
} else {
    Write-Host 'No changes needed in lib/tool-categories.ts' -ForegroundColor Yellow
}

Write-Host 'Batch 201-250 registry/category integration complete.' -ForegroundColor Green
