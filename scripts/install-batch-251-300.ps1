$ErrorActionPreference = 'Stop'
$root = (Get-Location).Path
$toolsFile = Join-Path $root 'lib\tools-data.ts'
$categoriesFile = Join-Path $root 'lib\tool-categories.ts'
function Read-Utf8([string]$file) { if (-not (Test-Path $file)) { throw "Missing $file" }; return [System.IO.File]::ReadAllText($file) }
function Write-Utf8([string]$file,[string]$text) { $utf8NoBom=New-Object System.Text.UTF8Encoding($false); [System.IO.File]::WriteAllText($file,$text,$utf8NoBom) }
function Patch-Tools([string]$source) {
  $importLine='import { batch251To300Tools } from "@/lib/tools-data-batch-251-300";'
  $next=$source
  if (-not $next.Contains($importLine)) { $next=$importLine+"`r`n"+$next }
  if (-not $next.Contains('...batch251To300Tools')) {
    $marker="`r`n];`r`n`r`nexport function getToolBySlug"; $at=$next.LastIndexOf($marker)
    if ($at -lt 0) { $marker="`n];`n`nexport function getToolBySlug"; $at=$next.LastIndexOf($marker) }
    if ($at -lt 0) { throw 'Could not find end of consolidated tools array in lib/tools-data.ts. No files changed.' }
    $next=$next.Substring(0,$at)+"`r`n  ...batch251To300Tools,"+$next.Substring($at)
  }
  return $next
}
function Add-ToCategory([string]$source,[string]$categorySlug,[string[]]$slugs) {
  $token='slug: "'+$categorySlug+'"'; $objStart=$source.IndexOf($token); if($objStart -lt 0){throw "Category $categorySlug not found in lib/tool-categories.ts. No files changed."}
  $listStart=$source.IndexOf('toolSlugs: [',$objStart); if($listStart -lt 0){throw "toolSlugs missing for $categorySlug."}
  $listEnd=$source.IndexOf('    ],',$listStart); if($listEnd -lt 0){throw "Could not find end of toolSlugs for $categorySlug."}
  $block=$source.Substring($listStart,$listEnd-$listStart); $missing=@(); foreach($slug in $slugs){if(-not $block.Contains('"'+$slug+'"')){$missing+=$slug}}
  if($missing.Count -eq 0){return $source}; $insertion=''; foreach($slug in $missing){$insertion+='      "'+$slug+'",'+"`r`n"}
  return $source.Substring(0,$listEnd)+$insertion+$source.Substring($listEnd)
}
function Patch-Categories([string]$source) { $next=$source
  $next=Add-ToCategory $next 'web-code' @('html-tag-stripper','html-table-generator','html-table-to-csv','csv-to-html-table','css-specificity-calculator','css-clamp-calculator','css-box-shadow-generator','css-border-radius-generator','css-flexbox-generator','css-grid-generator','ipv4-to-integer','integer-to-ipv4','ipv6-compressor','ipv6-expander','mac-address-validator','domain-name-parser','port-number-lookup','http-header-parser','cookie-parser','csp-generator','reading-time-calculator','speaking-time-calculator','word-frequency-counter','character-frequency-counter','invisible-character-detector','unicode-character-inspector','unicode-escape-converter','diacritic-remover','add-line-numbers','remove-line-numbers')
  $next=Add-ToCategory $next 'converters' @('html-table-to-csv','csv-to-html-table','ipv4-to-integer','integer-to-ipv4','ipv6-compressor','ipv6-expander','unicode-escape-converter')
  $next=Add-ToCategory $next 'formatters' @('html-tag-stripper','diacritic-remover','add-line-numbers','remove-line-numbers')
  $next=Add-ToCategory $next 'calculators' @('reading-time-calculator','speaking-time-calculator','prime-number-checker','prime-factorization-calculator','percentage-error-calculator','permutation-calculator','combination-calculator','probability-calculator','z-score-calculator','weighted-average-calculator','geometric-mean-calculator','harmonic-mean-calculator','triangle-calculator','circle-calculator','rectangle-calculator','cylinder-volume-calculator','sphere-volume-calculator','cone-volume-calculator','ohms-law-calculator','voltage-divider-calculator','resistor-color-code-calculator','led-resistor-calculator')
  $next=Add-ToCategory $next 'math' @('prime-number-checker','prime-factorization-calculator','percentage-error-calculator','permutation-calculator','combination-calculator','probability-calculator','z-score-calculator','weighted-average-calculator','geometric-mean-calculator','harmonic-mean-calculator','triangle-calculator','circle-calculator','rectangle-calculator','cylinder-volume-calculator','sphere-volume-calculator','cone-volume-calculator','ohms-law-calculator','voltage-divider-calculator','resistor-color-code-calculator','led-resistor-calculator')
  return $next
}
$originalTools=Read-Utf8 $toolsFile; $originalCategories=Read-Utf8 $categoriesFile; $patchedTools=Patch-Tools $originalTools; $patchedCategories=Patch-Categories $originalCategories
if($patchedTools -ne $originalTools){Write-Utf8 $toolsFile $patchedTools;Write-Host 'Updated lib/tools-data.ts' -ForegroundColor Green}else{Write-Host 'No changes needed in lib/tools-data.ts' -ForegroundColor Yellow}
if($patchedCategories -ne $originalCategories){Write-Utf8 $categoriesFile $patchedCategories;Write-Host 'Updated lib/tool-categories.ts' -ForegroundColor Green}else{Write-Host 'No changes needed in lib/tool-categories.ts' -ForegroundColor Yellow}
Write-Host 'Batch 251-300 registry/category integration complete.' -ForegroundColor Green
