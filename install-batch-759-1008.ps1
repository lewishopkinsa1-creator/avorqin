$ErrorActionPreference = "Stop"

$root=(Get-Location).Path
$libDir=Join-Path $root "lib"
$toolsFile=Join-Path $libDir "tools-data.ts"
$categoriesFile=Join-Path $libDir "tool-categories.ts"
$batchFile=Join-Path $libDir "tools-data-batch-759-1008.ts"
$componentFile=Join-Path $root "components\tools\batch-759-1008-tool.tsx"
$manifestFile=Join-Path $root "batch-759-1008-manifest.json"
$homeFile=Join-Path $root "app\page.tsx"

function Read-Utf8([string]$file) { if(-not(Test-Path $file)){throw "Missing required file: $file"}; return [IO.File]::ReadAllText($file) }
function Write-Utf8([string]$file,[string]$text) { $enc=New-Object Text.UTF8Encoding($false); [IO.File]::WriteAllText($file,$text,$enc) }
function Get-NL([string]$text) { if($text.Contains("`r`n")){return "`r`n"}; return "`n" }
function Get-ActiveToolDataFiles([string]$src) { $found=New-Object Collections.Generic.List[string]; $found.Add($toolsFile); $pattern='from\s+["'']@/lib/(tools-data[^"'']+)["'']'; foreach($m in [regex]::Matches($src,$pattern)){$path=Join-Path $libDir ($m.Groups[1].Value+".ts"); if(Test-Path $path){$found.Add($path)}}; return @($found|Select-Object -Unique) }
function Get-Slugs([string[]]$files) { $l=New-Object Collections.Generic.List[string]; foreach($f in $files){foreach($m in [regex]::Matches((Read-Utf8 $f),'(?m)(?:"slug"|slug)\s*:\s*"([^"]+)"')){$l.Add($m.Groups[1].Value)}}; return @($l) }
function Add-ToCategory([string]$source,[string]$categorySlug,[string[]]$slugs) {
  $token='slug: "'+$categorySlug+'"'; $obj=$source.IndexOf($token); if($obj -lt 0){throw "Category '$categorySlug' not found. No registry files were changed."}
  $start=$source.IndexOf("toolSlugs: [",$obj); $end=$source.IndexOf("    ],",$start); if($start -lt 0 -or $end -lt 0){throw "Could not locate toolSlugs for '$categorySlug'."}
  $block=$source.Substring($start,$end-$start); $nl=Get-NL $source; $ins=""; foreach($slug in $slugs){if(-not $block.Contains('"'+$slug+'"')){$ins+='      "'+$slug+'",'+$nl}}; return $source.Substring(0,$end)+$ins+$source.Substring($end)
}

foreach($f in @($toolsFile,$categoriesFile,$batchFile,$componentFile,$manifestFile,$homeFile)){if(-not(Test-Path $f)){throw "Missing required file: $f"}}
$manifest=Get-Content $manifestFile -Raw|ConvertFrom-Json
if($manifest.tools.Count -ne 250){throw "Manifest must contain exactly 250 tools."}
$newSlugs=@($manifest.tools|ForEach-Object {$_.slug})
if(($newSlugs|Sort-Object -Unique).Count -ne 250){throw "Duplicate slugs exist inside the new manifest."}
$toolsSource=Read-Utf8 $toolsFile
$active=Get-ActiveToolDataFiles $toolsSource
$existing=Get-Slugs $active
$collisions=@($newSlugs|Where-Object {$existing -contains $_})
if($collisions.Count -gt 0){throw "Existing slug collision(s): $($collisions -join ', '). Nothing was patched."}
$missingRoutes=@(); foreach($slug in $newSlugs){$p=Join-Path $root ("app\tools\"+$slug+"\page.tsx"); if(-not(Test-Path $p)){$missingRoutes+=$slug}}; if($missingRoutes.Count){throw "Missing route pages: $($missingRoutes -join ', ')"}

# Patch tools-data.ts
if(-not $toolsSource.Contains('import { batch759To1008Tools } from "@/lib/tools-data-batch-759-1008";')){$toolsSource='import { batch759To1008Tools } from "@/lib/tools-data-batch-759-1008";'+(Get-NL $toolsSource)+$toolsSource}
if(-not $toolsSource.Contains('...batch759To1008Tools')){$needle='  ...batch651To758Tools,'; if(-not $toolsSource.Contains($needle)){throw "Could not locate batch651To758Tools spread."}; $toolsSource=$toolsSource.Replace($needle,$needle+(Get-NL $toolsSource)+'  ...batch759To1008Tools,')}

# Patch existing categories and append new category objects.
$categoriesSource=Read-Utf8 $categoriesFile
$categoriesSource = Add-ToCategory $categoriesSource "json" @(
        "json-to-php-array-converter",
        "php-array-to-json-converter",
        "json-to-python-dict-converter",
        "python-dict-to-json-converter",
        "json-to-csharp-class-generator",
        "json-to-java-class-generator",
        "json-to-go-struct-generator",
        "json-to-rust-struct-generator",
        "json-to-kotlin-data-class-generator",
        "json-to-swift-codable-generator",
        "csv-to-markdown-table-converter",
        "markdown-table-to-csv-converter",
        "html-table-to-markdown-converter",
        "markdown-table-to-html-converter",
        "sql-to-csv-converter",
        "csv-to-jsonl-converter",
        "jsonl-to-csv-converter",
        "jsonl-formatter",
        "jsonl-validator",
        "yaml-to-xml-converter",
        "xml-to-yaml-converter",
        "env-to-json-converter",
        "json-to-env-converter",
        "properties-to-json-converter",
        "json-to-properties-converter",
        "regex-escape-tool",
        "cron-next-run-calculator",
        "semantic-version-comparator",
        "semantic-version-bump-calculator",
        "cache-control-header-builder",
        "cors-header-generator",
        "csp-header-parser",
        "htaccess-redirect-generator",
        "nginx-redirect-generator",
        "ip-range-calculator",
        "cidr-to-ip-range-converter",
        "ipv6-subnet-calculator",
        "dns-ttl-converter",
        "dns-record-parser",
        "base32-encoder",
        "base32-decoder",
        "base58-encoder",
        "base58-decoder",
        "tsv-to-json-converter",
        "json-to-tsv-converter",
        "csv-to-yaml-converter",
        "yaml-to-csv-converter",
        "json-pointer-tester",
        "json-patch-generator",
        "json-merge-patch-tool",
        "http-basic-auth-header-generator",
        "content-disposition-header-generator",
        "url-query-parameter-sorter",
        "url-normalizer",
        "sql-create-table-generator"
    )
$categoriesSource = Add-ToCategory $categoriesSource "converters" @(
        "json-to-php-array-converter",
        "php-array-to-json-converter",
        "json-to-python-dict-converter",
        "python-dict-to-json-converter",
        "json-to-csharp-class-generator",
        "json-to-java-class-generator",
        "json-to-go-struct-generator",
        "json-to-rust-struct-generator",
        "json-to-kotlin-data-class-generator",
        "json-to-swift-codable-generator",
        "csv-to-markdown-table-converter",
        "markdown-table-to-csv-converter",
        "html-table-to-markdown-converter",
        "markdown-table-to-html-converter",
        "sql-to-csv-converter",
        "csv-to-jsonl-converter",
        "jsonl-to-csv-converter",
        "jsonl-formatter",
        "jsonl-validator",
        "yaml-to-xml-converter",
        "xml-to-yaml-converter",
        "env-to-json-converter",
        "json-to-env-converter",
        "properties-to-json-converter",
        "json-to-properties-converter",
        "regex-escape-tool",
        "cron-next-run-calculator",
        "semantic-version-comparator",
        "semantic-version-bump-calculator",
        "cache-control-header-builder",
        "cors-header-generator",
        "csp-header-parser",
        "htaccess-redirect-generator",
        "nginx-redirect-generator",
        "ip-range-calculator",
        "cidr-to-ip-range-converter",
        "ipv6-subnet-calculator",
        "dns-ttl-converter",
        "dns-record-parser",
        "base32-encoder",
        "base32-decoder",
        "base58-encoder",
        "base58-decoder",
        "tsv-to-json-converter",
        "json-to-tsv-converter",
        "csv-to-yaml-converter",
        "yaml-to-csv-converter",
        "json-pointer-tester",
        "json-patch-generator",
        "json-merge-patch-tool",
        "http-basic-auth-header-generator",
        "content-disposition-header-generator",
        "url-query-parameter-sorter",
        "url-normalizer",
        "sql-create-table-generator"
    )
$categoriesSource = Add-ToCategory $categoriesSource "web-code" @(
        "json-to-php-array-converter",
        "php-array-to-json-converter",
        "json-to-python-dict-converter",
        "python-dict-to-json-converter",
        "json-to-csharp-class-generator",
        "json-to-java-class-generator",
        "json-to-go-struct-generator",
        "json-to-rust-struct-generator",
        "json-to-kotlin-data-class-generator",
        "json-to-swift-codable-generator",
        "csv-to-markdown-table-converter",
        "markdown-table-to-csv-converter",
        "html-table-to-markdown-converter",
        "markdown-table-to-html-converter",
        "sql-to-csv-converter",
        "csv-to-jsonl-converter",
        "jsonl-to-csv-converter",
        "jsonl-formatter",
        "jsonl-validator",
        "yaml-to-xml-converter",
        "xml-to-yaml-converter",
        "env-to-json-converter",
        "json-to-env-converter",
        "properties-to-json-converter",
        "json-to-properties-converter",
        "regex-escape-tool",
        "cron-next-run-calculator",
        "semantic-version-comparator",
        "semantic-version-bump-calculator",
        "cache-control-header-builder",
        "cors-header-generator",
        "csp-header-parser",
        "htaccess-redirect-generator",
        "nginx-redirect-generator",
        "ip-range-calculator",
        "cidr-to-ip-range-converter",
        "ipv6-subnet-calculator",
        "dns-ttl-converter",
        "dns-record-parser",
        "base32-encoder",
        "base32-decoder",
        "base58-encoder",
        "base58-decoder",
        "tsv-to-json-converter",
        "json-to-tsv-converter",
        "csv-to-yaml-converter",
        "yaml-to-csv-converter",
        "json-pointer-tester",
        "json-patch-generator",
        "json-merge-patch-tool",
        "http-basic-auth-header-generator",
        "content-disposition-header-generator",
        "url-query-parameter-sorter",
        "url-normalizer",
        "sql-create-table-generator"
    )
$categoriesSource = Add-ToCategory $categoriesSource "finance" @(
        "cap-rate-calculator",
        "cash-on-cash-return-calculator",
        "rental-property-roi-calculator",
        "rental-yield-calculator",
        "gross-rent-multiplier-calculator",
        "loan-to-value-calculator",
        "home-equity-calculator",
        "sinking-fund-calculator",
        "bond-yield-calculator",
        "bond-price-calculator",
        "dividend-yield-calculator",
        "dividend-reinvestment-calculator",
        "stock-average-calculator",
        "risk-reward-ratio-calculator",
        "pe-ratio-calculator",
        "peg-ratio-calculator",
        "earnings-per-share-calculator",
        "return-on-assets-calculator",
        "return-on-equity-calculator",
        "npv-calculator",
        "irr-calculator",
        "mirr-calculator",
        "wacc-calculator",
        "capm-calculator",
        "sharpe-ratio-calculator",
        "sortino-ratio-calculator",
        "cash-ratio-calculator",
        "interest-coverage-ratio-calculator",
        "asset-turnover-calculator",
        "cash-conversion-cycle-calculator"
    )
$categoriesSource = Add-ToCategory $categoriesSource "math" @(
        "root-mean-square-calculator",
        "sum-of-squares-calculator",
        "t-statistic-calculator",
        "p-value-calculator",
        "chi-square-calculator",
        "one-way-anova-calculator",
        "hypergeometric-calculator",
        "poisson-distribution-calculator",
        "exponential-distribution-calculator",
        "uniform-distribution-calculator",
        "beta-distribution-calculator",
        "gamma-distribution-calculator",
        "weibull-distribution-calculator",
        "lognormal-distribution-calculator",
        "geometric-distribution-calculator",
        "negative-binomial-calculator",
        "mean-absolute-deviation-calculator",
        "median-absolute-deviation-calculator",
        "weighted-standard-deviation-calculator",
        "root-mean-square-error-calculator",
        "mean-absolute-error-calculator",
        "mape-calculator",
        "r-squared-calculator",
        "vector-magnitude-calculator",
        "dot-product-calculator",
        "cross-product-calculator",
        "complex-number-calculator",
        "polynomial-degree-calculator",
        "skewness-calculator",
        "kurtosis-calculator",
        "weighted-variance-calculator",
        "matrix-trace-calculator",
        "matrix-transpose-calculator",
        "vector-angle-calculator",
        "cosine-similarity-calculator"
    )
$categoriesSource = Add-ToCategory $categoriesSource "calculators" @(
        "force-calculator",
        "acceleration-calculator",
        "momentum-calculator",
        "impulse-calculator",
        "kinetic-energy-calculator",
        "potential-energy-calculator",
        "work-calculator",
        "mechanical-power-calculator",
        "lever-torque-calculator",
        "pressure-force-area-calculator",
        "density-calculator",
        "specific-gravity-calculator",
        "buoyancy-calculator",
        "reynolds-number-calculator",
        "bernoulli-equation-calculator",
        "hydraulic-power-calculator",
        "pump-power-calculator",
        "pipe-flow-rate-calculator",
        "heat-transfer-calculator",
        "thermal-expansion-calculator"
    )
$categoriesSource = Add-ToCategory $categoriesSource "construction" @(
        "lumber-weight-calculator",
        "lumber-cost-calculator",
        "stair-stringer-calculator",
        "rebar-weight-calculator",
        "rebar-spacing-calculator",
        "tile-layout-calculator",
        "ceiling-tile-calculator",
        "door-rough-opening-calculator",
        "fence-picket-spacing-calculator",
        "stair-baluster-spacing-calculator",
        "wheelchair-ramp-length-calculator",
        "landscape-fabric-calculator",
        "acoustic-panel-calculator",
        "cabinet-linear-feet-calculator",
        "countertop-square-footage-calculator"
    )
$categoriesSource = Add-ToCategory $categoriesSource "education" @(
        "grade-curve-calculator",
        "attendance-percentage-calculator",
        "credit-hour-calculator",
        "course-load-calculator",
        "study-time-calculator",
        "study-schedule-calculator",
        "reading-speed-calculator",
        "apa-citation-generator",
        "mla-citation-generator",
        "chicago-citation-generator",
        "harvard-citation-generator",
        "ieee-citation-generator",
        "bibtex-entry-generator",
        "vancouver-citation-generator",
        "ama-citation-generator"
    )
$categoriesSource = Add-ToCategory $categoriesSource "ecommerce" @(
        "net-revenue-retention-calculator",
        "gross-revenue-retention-calculator",
        "revenue-churn-calculator",
        "expansion-mrr-calculator",
        "contraction-mrr-calculator",
        "net-new-mrr-calculator",
        "saas-magic-number-calculator",
        "rule-of-40-calculator",
        "saas-quick-ratio-calculator",
        "average-revenue-per-account-calculator",
        "net-promoter-score-calculator",
        "marketing-efficiency-ratio-calculator",
        "saas-burn-multiple-calculator",
        "average-contract-value-calculator",
        "trial-conversion-rate-calculator"
    )
$categoriesSource = Add-ToCategory $categoriesSource "date-time" @(
        "time-card-calculator",
        "shift-length-calculator",
        "overtime-hours-calculator",
        "decimal-hours-calculator",
        "date-midpoint-calculator",
        "nth-weekday-calculator",
        "fiscal-quarter-calculator",
        "quarter-end-date-calculator",
        "unix-nanoseconds-converter",
        "iso-duration-calculator"
    )
if(-not $categoriesSource.Contains('slug: "engineering"')){
$newBlock=@'
  {
    slug: "engineering",
    name: "Physics & Engineering Tools",
    description: "Calculate common physics, mechanics, fluids, thermal, and engineering values in your browser.",
    intro: "Use focused physics and engineering calculators for force, motion, energy, fluids, heat transfer, hydraulics, and related technical work.",
    keywords: ["physics calculators", "engineering calculators", "force calculator", "reynolds number calculator", "heat transfer calculator"],
    toolSlugs: [
      "force-calculator",
      "acceleration-calculator",
      "momentum-calculator",
      "impulse-calculator",
      "kinetic-energy-calculator",
      "potential-energy-calculator",
      "work-calculator",
      "mechanical-power-calculator",
      "lever-torque-calculator",
      "pressure-force-area-calculator",
      "density-calculator",
      "specific-gravity-calculator",
      "buoyancy-calculator",
      "reynolds-number-calculator",
      "bernoulli-equation-calculator",
      "hydraulic-power-calculator",
      "pump-power-calculator",
      "pipe-flow-rate-calculator",
      "heat-transfer-calculator",
      "thermal-expansion-calculator",
    ],
  },
  {
    slug: "automotive",
    name: "Automotive Tools",
    description: "Calculate fuel cost, tire size, gearing, engine performance, EV charging, and other automotive values.",
    intro: "Plan and compare common vehicle calculations including fuel economy, tire sizing, gearing, engine performance, EV charging, depreciation, and towing.",
    keywords: ["automotive calculators", "mpg calculator", "tire size calculator", "fuel cost calculator", "EV charging calculator"],
    toolSlugs: [
      "mpg-calculator",
      "fuel-cost-calculator",
      "cost-per-mile-calculator",
      "tire-size-calculator",
      "speedometer-error-calculator",
      "wheel-offset-calculator",
      "wheel-backspacing-calculator",
      "gear-ratio-calculator",
      "rpm-speed-calculator",
      "engine-displacement-calculator",
      "compression-ratio-calculator",
      "horsepower-to-weight-ratio-calculator",
      "torque-to-horsepower-calculator",
      "horsepower-to-torque-calculator",
      "quarter-mile-horsepower-calculator",
      "vehicle-depreciation-calculator",
      "lease-mileage-calculator",
      "ev-charging-time-calculator",
      "ev-charging-cost-calculator",
      "ev-range-calculator",
      "piston-speed-calculator",
      "wheel-torque-calculator",
      "stopping-distance-calculator",
      "vehicle-weight-distribution-calculator",
      "trailer-tongue-weight-calculator",
    ],
  },
  {
    slug: "cooking-baking",
    name: "Cooking & Baking Tools",
    description: "Scale recipes and calculate dough, baking, coffee, brine, and food-cost values.",
    intro: "Use practical cooking and baking calculators for recipe scaling, dough hydration, baker percentages, coffee ratios, brines, and kitchen planning.",
    keywords: ["cooking calculators", "baking calculators", "recipe scaling calculator", "dough hydration calculator", "bakers percentage calculator"],
    toolSlugs: [
      "recipe-scaling-calculator",
      "recipe-cost-calculator",
      "bakers-percentage-calculator",
      "dough-hydration-calculator",
      "pizza-dough-calculator",
      "bread-dough-calculator",
      "sourdough-starter-feeding-calculator",
      "coffee-ratio-calculator",
      "cold-brew-ratio-calculator",
      "rice-water-ratio-calculator",
      "brine-percentage-calculator",
      "food-cost-percentage-calculator",
      "yeast-conversion-calculator",
      "dough-ball-weight-calculator",
      "cake-pan-conversion-calculator",
    ],
  },
  {
    slug: "photography-video",
    name: "Photography & Video Tools",
    description: "Calculate photography exposure, depth of field, focal length, video bitrate, file size, and recording time.",
    intro: "Use photography and video calculators for lenses, exposure, depth of field, filters, timelapse, bitrate, media size, and timecode workflows.",
    keywords: ["photography calculators", "video calculators", "depth of field calculator", "video bitrate calculator", "timelapse calculator"],
    toolSlugs: [
      "crop-factor-calculator",
      "equivalent-focal-length-calculator",
      "field-of-view-calculator",
      "hyperfocal-distance-calculator",
      "depth-of-field-calculator",
      "exposure-value-calculator",
      "shutter-speed-stops-calculator",
      "nd-filter-calculator",
      "timelapse-calculator",
      "video-bitrate-calculator",
      "video-file-size-calculator",
      "audio-file-size-calculator",
      "recording-time-calculator",
      "frame-count-calculator",
      "frames-to-timecode-converter",
    ],
  },
'@
  $marker="];$([Environment]::NewLine)$([Environment]::NewLine)export function"
  $idx=$categoriesSource.IndexOf($marker)
  if($idx -lt 0){ $idx=$categoriesSource.LastIndexOf("];" ) }
  if($idx -lt 0){throw "Could not find end of toolCategories array."}
  $categoriesSource=$categoriesSource.Substring(0,$idx)+$newBlock+(Get-NL $categoriesSource)+$categoriesSource.Substring($idx)
}

# Homepage milestone: 1000+ after this verified expansion.
$homeContent=Read-Utf8 $homeFile
$homeContent=$homeContent.Replace('500+','1,000+').Replace('500 +','1,000+')

Write-Utf8 $toolsFile $toolsSource
Write-Utf8 $categoriesFile $categoriesSource
Write-Utf8 $homeFile $homeContent
Write-Host ""
Write-Host "INSTALL COMPLETE" -ForegroundColor Green
Write-Host "Added source definitions: 250" -ForegroundColor Green
Write-Host "Expected active source definitions: 1008"
Write-Host "Expected public tools: 1000"
Write-Host "Homepage target: 1,000+ tools"
Write-Host "No local Node/npm dependency was added."
Write-Host "Run .\verify-batch-759-1008.ps1 next."
