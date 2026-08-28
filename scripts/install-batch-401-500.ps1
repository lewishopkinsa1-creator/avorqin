$ErrorActionPreference='Stop'
$root=(Get-Location).Path
$toolsFile=Join-Path $root 'lib\tools-data.ts'
$categoriesFile=Join-Path $root 'lib\tool-categories.ts'
function Read-Utf8([string]$file){if(-not(Test-Path $file)){throw "Missing $file"};[System.IO.File]::ReadAllText($file)}
function Write-Utf8([string]$file,[string]$text){$enc=New-Object System.Text.UTF8Encoding($false);[System.IO.File]::WriteAllText($file,$text,$enc)}
function Patch-Tools([string]$source){$import='import { batch401To500Tools } from "@/lib/tools-data-batch-401-500";';$next=$source;if(-not $next.Contains($import)){$next=$import+"`r`n"+$next};if(-not $next.Contains('...batch401To500Tools')){$marker="`r`n];`r`n`r`nexport function getToolBySlug";$at=$next.LastIndexOf($marker);if($at -lt 0){$marker="`n];`n`nexport function getToolBySlug";$at=$next.LastIndexOf($marker)};if($at -lt 0){throw 'Could not find end of consolidated tools array.'};$next=$next.Substring(0,$at)+"`r`n  ...batch401To500Tools,"+$next.Substring($at)};return $next}
function Add-ToCategory([string]$source,[string]$slug,[string[]]$slugs){$token='slug: "'+$slug+'"';$obj=$source.IndexOf($token);if($obj -lt 0){throw "Category $slug not found."};$start=$source.IndexOf('toolSlugs: [',$obj);$end=$source.IndexOf('    ],',$start);if($start -lt 0 -or $end -lt 0){throw "toolSlugs missing for $slug."};$block=$source.Substring($start,$end-$start);$ins='';foreach($s in $slugs){if(-not $block.Contains('"'+$s+'"')){$ins+='      "'+$s+'",'+"`r`n"}};if($ins.Length -eq 0){return $source};return $source.Substring(0,$end)+$ins+$source.Substring($end)}
function Add-Ecommerce([string]$source){$next=$source;if($next.Contains('slug: "ecommerce"')){return $next};$block=@'
  {
    slug: "ecommerce",
    name: "Ecommerce & SaaS Tools",
    description: "Calculate ecommerce, advertising, inventory, retention, recurring revenue, customer economics, and SaaS business metrics.",
    intro: "Avorqin's ecommerce and SaaS tools help merchants, marketers, founders, and operators calculate order value, advertising efficiency, inventory metrics, churn, retention, recurring revenue, unit economics, margins, and customer acquisition performance directly in the browser.",
    keywords: ["ecommerce calculators", "SaaS calculators", "AOV calculator", "churn rate calculator", "MRR calculator", "ROAS calculator", "inventory turnover calculator", "CAC calculator"],
    toolSlugs: [
      "average-order-value-calculator",
      "click-through-rate-calculator",
      "cost-per-lead-calculator",
      "lead-conversion-rate-calculator",
      "email-open-rate-calculator",
      "email-click-through-rate-calculator",
      "ecommerce-profit-calculator",
      "gmroi-calculator",
      "inventory-turnover-calculator",
      "reorder-point-calculator",
      "safety-stock-calculator",
      "economic-order-quantity-calculator",
      "sell-through-rate-calculator",
      "cart-abandonment-rate-calculator",
      "engagement-rate-calculator",
      "churn-rate-calculator",
      "retention-rate-calculator",
      "mrr-calculator",
      "arr-calculator",
      "mrr-growth-calculator",
      "ltv-to-cac-ratio-calculator",
      "cac-payback-period-calculator",
      "payback-period-calculator",
      "contribution-margin-calculator",
      "operating-margin-calculator",
      "ebitda-margin-calculator",
      "cost-of-goods-sold-calculator",
      "average-revenue-per-user-calculator",
      "ad-spend-calculator",
      "target-roas-calculator",
    ],
  },
'@;$marker="`r`n];`r`n`r`nexport function getToolCategory";$at=$next.LastIndexOf($marker);if($at -lt 0){$marker="`n];`n`nexport function getToolCategory";$at=$next.LastIndexOf($marker)};if($at -lt 0){throw 'Could not find toolCategories array end.'};return $next.Substring(0,$at)+"`r`n"+$block+$next.Substring($at)}
function Patch-Categories([string]$source){$next=Add-Ecommerce $source;$next=Add-ToCategory $next 'finance' @('average-order-value-calculator','click-through-rate-calculator','cost-per-lead-calculator','lead-conversion-rate-calculator','email-open-rate-calculator','email-click-through-rate-calculator','ecommerce-profit-calculator','gmroi-calculator','inventory-turnover-calculator','reorder-point-calculator','safety-stock-calculator','economic-order-quantity-calculator','sell-through-rate-calculator','cart-abandonment-rate-calculator','engagement-rate-calculator','churn-rate-calculator','retention-rate-calculator','mrr-calculator','arr-calculator','mrr-growth-calculator','ltv-to-cac-ratio-calculator','cac-payback-period-calculator','payback-period-calculator','contribution-margin-calculator','operating-margin-calculator','ebitda-margin-calculator','cost-of-goods-sold-calculator','average-revenue-per-user-calculator','ad-spend-calculator','target-roas-calculator');$next=Add-ToCategory $next 'date-time' @('days-from-today-calculator','weeks-from-today-calculator','months-from-today-calculator','hours-from-now-calculator','minutes-from-now-calculator','week-number-calculator','day-of-week-calculator','day-of-year-calculator','leap-year-calculator','business-date-calculator','time-zone-difference-calculator','meeting-time-planner','iso-week-date-converter','julian-date-converter','epoch-milliseconds-converter','unix-time-to-iso-8601-converter','iso-8601-to-unix-time-converter','time-zone-offset-converter','working-days-from-today-calculator','weekend-days-calculator');$next=Add-ToCategory $next 'converters' @('inches-to-centimeters-converter','centimeters-to-inches-converter','feet-to-meters-converter','meters-to-feet-converter','miles-to-kilometers-converter','kilometers-to-miles-converter','pounds-to-kilograms-converter','kilograms-to-pounds-converter','ounces-to-grams-converter','grams-to-ounces-converter','cups-to-milliliters-converter','milliliters-to-cups-converter','gallons-to-liters-converter','liters-to-gallons-converter','celsius-to-fahrenheit-converter','fahrenheit-to-celsius-converter','mph-to-kmh-converter','kmh-to-mph-converter','mb-to-gb-converter','gb-to-mb-converter');$next=Add-ToCategory $next 'math' @('modulo-calculator','remainder-calculator','proportion-calculator','decimal-to-fraction-calculator','mixed-number-calculator','fraction-simplifier','percent-difference-calculator','quartile-calculator','interquartile-range-calculator','ratio-to-percentage-calculator','linear-interpolation-calculator','standard-error-calculator','variance-calculator','coefficient-of-variation-calculator','range-calculator');$next=Add-ToCategory $next 'images' @('base64-to-image-decoder','png-to-ico-converter','ico-to-png-converter','svg-viewer','svg-optimizer','svg-to-base64-encoder','base64-to-svg-decoder','image-flipper','image-grayscale-converter','image-color-picker','image-palette-extractor','image-border-adder','image-rounded-corners','image-pixelate-tool','image-blur-tool');$next=Add-ToCategory $next 'calculators' @('average-order-value-calculator','click-through-rate-calculator','cost-per-lead-calculator','lead-conversion-rate-calculator','email-open-rate-calculator','email-click-through-rate-calculator','ecommerce-profit-calculator','gmroi-calculator','inventory-turnover-calculator','reorder-point-calculator','safety-stock-calculator','economic-order-quantity-calculator','sell-through-rate-calculator','cart-abandonment-rate-calculator','engagement-rate-calculator','churn-rate-calculator','retention-rate-calculator','mrr-calculator','arr-calculator','mrr-growth-calculator','ltv-to-cac-ratio-calculator','cac-payback-period-calculator','payback-period-calculator','contribution-margin-calculator','operating-margin-calculator','ebitda-margin-calculator','cost-of-goods-sold-calculator','average-revenue-per-user-calculator','ad-spend-calculator','target-roas-calculator','days-from-today-calculator','weeks-from-today-calculator','months-from-today-calculator','hours-from-now-calculator','minutes-from-now-calculator','week-number-calculator','day-of-week-calculator','day-of-year-calculator','leap-year-calculator','business-date-calculator','time-zone-difference-calculator','meeting-time-planner','iso-week-date-converter','julian-date-converter','epoch-milliseconds-converter','unix-time-to-iso-8601-converter','iso-8601-to-unix-time-converter','time-zone-offset-converter','working-days-from-today-calculator','weekend-days-calculator','modulo-calculator','remainder-calculator','proportion-calculator','decimal-to-fraction-calculator','mixed-number-calculator','fraction-simplifier','percent-difference-calculator','quartile-calculator','interquartile-range-calculator','ratio-to-percentage-calculator','linear-interpolation-calculator','standard-error-calculator','variance-calculator','coefficient-of-variation-calculator','range-calculator');return $next}
function Patch-Discovery([string]$source){$next=$source;if(-not $next.Contains('| "ecommerce"')){$needle='  | "calculators"';$idx=$next.IndexOf($needle);if($idx -lt 0){throw 'Could not locate CategoryId calculators entry.'};$next=$next.Substring(0,$idx)+'  | "ecommerce"'+"`r`n"+$next.Substring($idx)};if(-not $next.Contains('{ id: "ecommerce", label: "Ecommerce & SaaS" }')){$needle='  { id: "calculators", label: "Calculators" },';$idx=$next.IndexOf($needle);if($idx -lt 0){throw 'Could not locate categoryOrder calculators entry.'};$next=$next.Substring(0,$idx)+'  { id: "ecommerce", label: "Ecommerce & SaaS" },'+"`r`n"+$next.Substring($idx)};return $next}
$discovery=@(Get-ChildItem -Path (Join-Path $root 'components') -Filter 'tool-discovery.tsx' -File -Recurse -ErrorAction SilentlyContinue);if($discovery.Count -ne 1){throw 'Expected exactly one tool-discovery.tsx.'};$discoveryFile=$discovery[0].FullName
$ot=Read-Utf8 $toolsFile;$oc=Read-Utf8 $categoriesFile;$od=Read-Utf8 $discoveryFile;$pt=Patch-Tools $ot;$pc=Patch-Categories $oc;$pd=Patch-Discovery $od
if($pt -ne $ot){Write-Utf8 $toolsFile $pt;Write-Host 'Updated lib/tools-data.ts' -ForegroundColor Green}else{Write-Host 'No changes needed in lib/tools-data.ts' -ForegroundColor Yellow}
if($pc -ne $oc){Write-Utf8 $categoriesFile $pc;Write-Host 'Updated lib/tool-categories.ts' -ForegroundColor Green}else{Write-Host 'No changes needed in lib/tool-categories.ts' -ForegroundColor Yellow}
if($pd -ne $od){Write-Utf8 $discoveryFile $pd;Write-Host ('Updated '+$discoveryFile.Substring($root.Length+1)) -ForegroundColor Green}else{Write-Host 'No changes needed in tool-discovery.tsx' -ForegroundColor Yellow}
Write-Host 'Batch 401-500 integration complete.' -ForegroundColor Green
