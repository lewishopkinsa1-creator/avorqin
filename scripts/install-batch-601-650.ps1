$ErrorActionPreference='Stop'
$root=(Get-Location).Path
$toolsFile=Join-Path $root 'lib\tools-data.ts'
$categoriesFile=Join-Path $root 'lib\tool-categories.ts'

function Read-Utf8([string]$path){ return [System.IO.File]::ReadAllText($path) }
function Write-Utf8([string]$path,[string]$text){ [System.IO.File]::WriteAllText($path,$text,(New-Object System.Text.UTF8Encoding($false))) }

function Patch-Tools([string]$source){
  $import='import { batch601To650Tools } from "@/lib/tools-data-batch-601-650";'
  $next=$source
  if(-not $next.Contains($import)){$next=$import+"`r`n"+$next}
  if(-not $next.Contains('...batch601To650Tools')){
    $marker="`r`n];`r`n`r`nexport function getToolBySlug"
    $at=$next.LastIndexOf($marker)
    if($at -lt 0){$marker="`n];`n`nexport function getToolBySlug";$at=$next.LastIndexOf($marker)}
    if($at -lt 0){throw 'Could not find end of consolidated tools array.'}
    $next=$next.Substring(0,$at)+"`r`n  ...batch601To650Tools,"+$next.Substring($at)
  }
  return $next
}

function Add-ToCategory([string]$source,[string]$slug,[string[]]$newSlugs){
  $token='slug: "'+$slug+'"'
  $obj=$source.IndexOf($token)
  if($obj -lt 0){throw "Category $slug not found."}
  $start=$source.IndexOf('toolSlugs: [',$obj)
  $end=$source.IndexOf('    ],',$start)
  if($start -lt 0 -or $end -lt 0){throw "toolSlugs missing for $slug."}
  $block=$source.Substring($start,$end-$start)
  $ins=''
  foreach($s in $newSlugs){if(-not $block.Contains('"'+$s+'"')){$ins+='      "'+$s+'",'+"`r`n"}}
  if($ins.Length -eq 0){return $source}
  return $source.Substring(0,$end)+$ins+$source.Substring($end)
}

function Patch-Categories([string]$source){
  $newSlugs=@('concrete-block-fill-calculator','block-wall-calculator','cinder-block-calculator','breeze-block-calculator','block-and-beam-floor-calculator','retaining-wall-block-calculator','retaining-wall-material-calculator','brick-wall-calculator','bricks-per-square-foot-calculator','bricks-per-square-meter-calculator','brick-mortar-calculator','masonry-mortar-calculator','masonry-wall-calculator','footing-concrete-calculator','strip-footing-concrete-calculator','foundation-concrete-calculator','pier-concrete-calculator','sonotube-concrete-calculator','concrete-column-calculator','concrete-stairs-calculator','concrete-curb-calculator','concrete-driveway-calculator','concrete-patio-calculator','concrete-post-hole-calculator','concrete-yield-calculator','ready-mix-concrete-cost-calculator','aggregate-calculator','pea-gravel-calculator','limestone-calculator','crushed-concrete-calculator','decomposed-granite-calculator','landscape-rock-calculator','driveway-material-calculator','asphalt-driveway-calculator','asphalt-tonnage-calculator','asphalt-cost-calculator','road-gravel-calculator','sub-base-calculator','trench-volume-calculator','excavation-volume-calculator','fill-dirt-calculator','backfill-calculator','dirt-weight-calculator','retaining-wall-gravel-calculator','plaster-calculator','stucco-calculator','siding-calculator','baseboard-calculator','crown-molding-calculator','roof-tile-calculator')
  $next=Add-ToCategory $source 'construction' $newSlugs
  $next=Add-ToCategory $next 'calculators' $newSlugs
  return $next
}

foreach($required in @($toolsFile,$categoriesFile)){if(-not(Test-Path $required)){throw "Required file not found: $required"}}
$ot=Read-Utf8 $toolsFile
$oc=Read-Utf8 $categoriesFile
$pt=Patch-Tools $ot
$pc=Patch-Categories $oc
if($pt -ne $ot){Write-Utf8 $toolsFile $pt;Write-Host 'Updated lib/tools-data.ts' -ForegroundColor Green}else{Write-Host 'No changes needed in lib/tools-data.ts' -ForegroundColor Yellow}
if($pc -ne $oc){Write-Utf8 $categoriesFile $pc;Write-Host 'Updated lib/tool-categories.ts' -ForegroundColor Green}else{Write-Host 'No changes needed in lib/tool-categories.ts' -ForegroundColor Yellow}
Write-Host 'Batch 601-650 Construction integration complete. Homepage remains at 500+ wording.' -ForegroundColor Green
