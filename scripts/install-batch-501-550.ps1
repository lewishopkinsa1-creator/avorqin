$ErrorActionPreference='Stop'
$root=(Get-Location).Path
$toolsFile=Join-Path $root 'lib\tools-data.ts'
$categoriesFile=Join-Path $root 'lib\tool-categories.ts'
$homeFile=Join-Path $root 'app\page.tsx'

function Read-Utf8([string]$path){ return [System.IO.File]::ReadAllText($path) }
function Write-Utf8([string]$path,[string]$text){ [System.IO.File]::WriteAllText($path,$text,(New-Object System.Text.UTF8Encoding($false))) }

function Patch-Tools([string]$source){
  $import='import { batch501To550Tools } from "@/lib/tools-data-batch-501-550";'
  $next=$source
  if(-not $next.Contains($import)){$next=$import+"`r`n"+$next}
  if(-not $next.Contains('...batch501To550Tools')){
    $marker="`r`n];`r`n`r`nexport function getToolBySlug"
    $at=$next.LastIndexOf($marker)
    if($at -lt 0){$marker="`n];`n`nexport function getToolBySlug";$at=$next.LastIndexOf($marker)}
    if($at -lt 0){throw 'Could not find end of consolidated tools array.'}
    $next=$next.Substring(0,$at)+"`r`n  ...batch501To550Tools,"+$next.Substring($at)
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
  $next=$source
  $electrical=@('va-to-watts-calculator','watts-to-va-calculator','kva-to-amps-calculator','amps-to-kva-calculator','kva-to-watts-calculator','watts-to-kva-calculator','kva-to-kw-calculator','kw-to-kva-calculator','volts-to-kw-calculator','kw-to-volts-calculator','ohms-to-amps-calculator','amps-to-ohms-calculator','volts-to-ohms-calculator','ohms-to-volts-calculator','watts-to-ohms-calculator','ohms-to-watts-calculator','ah-to-wh-calculator','wh-to-ah-calculator','amp-hour-calculator','battery-runtime-calculator','kwh-cost-calculator','electricity-cost-calculator','appliance-energy-cost-calculator','power-consumption-calculator','generator-size-calculator','generator-wattage-calculator','generator-fuel-consumption-calculator','extension-cord-gauge-calculator','cable-size-calculator','dc-wire-size-calculator','ac-wire-size-calculator','12v-wire-size-calculator','24v-wire-size-calculator','48v-wire-size-calculator','wire-resistance-calculator','breaker-size-calculator','fuse-size-calculator','transformer-sizing-calculator','current-transformer-calculator','transformer-turns-ratio-calculator','motor-full-load-amps-calculator','motor-horsepower-to-amps-calculator','horsepower-to-watts-calculator','watts-to-horsepower-calculator','ac-power-calculator','dc-power-calculator','three-phase-power-calculator','single-phase-power-calculator','reactive-power-calculator','apparent-power-calculator')
  $converters=@('va-to-watts-calculator','watts-to-va-calculator','kva-to-amps-calculator','amps-to-kva-calculator','kva-to-watts-calculator','watts-to-kva-calculator','kva-to-kw-calculator','kw-to-kva-calculator','volts-to-kw-calculator','kw-to-volts-calculator','ohms-to-amps-calculator','amps-to-ohms-calculator','volts-to-ohms-calculator','ohms-to-volts-calculator','watts-to-ohms-calculator','ohms-to-watts-calculator','ah-to-wh-calculator','wh-to-ah-calculator','horsepower-to-watts-calculator','watts-to-horsepower-calculator')
  $next=Add-ToCategory $next 'electrical' $electrical
  $next=Add-ToCategory $next 'calculators' $electrical
  $next=Add-ToCategory $next 'converters' $converters
  return $next
}

function Patch-HomeCount([string]$source){
  $next=$source
  $next=$next.Replace('{tools.length} free browser-based tools','500+ free browser-based tools')
  $next=$next.Replace('{tools.length} free online tools.','500+ free online tools.')
  return $next
}

function Patch-DiscoveryCount([string]$source){
  $pattern='Search all\s+\{tools\.length\}\s+Avorqin\s+tools\s+or browse by category\.'
  return [regex]::Replace($source,$pattern,'Search 500+ Avorqin tools or browse by category.')
}

foreach($required in @($toolsFile,$categoriesFile,$homeFile)){
  if(-not (Test-Path $required)){throw "Required file not found: $required"}
}

$discovery=@(Get-ChildItem -Path (Join-Path $root 'components') -Filter 'tool-discovery.tsx' -File -Recurse -ErrorAction SilentlyContinue)
if($discovery.Count -ne 1){throw 'Expected exactly one tool-discovery.tsx.'}
$discoveryFile=$discovery[0].FullName

$ot=Read-Utf8 $toolsFile
$oc=Read-Utf8 $categoriesFile
$oh=Read-Utf8 $homeFile
$od=Read-Utf8 $discoveryFile

$pt=Patch-Tools $ot
$pc=Patch-Categories $oc
$ph=Patch-HomeCount $oh
$pd=Patch-DiscoveryCount $od

if($pt -ne $ot){Write-Utf8 $toolsFile $pt;Write-Host 'Updated lib/tools-data.ts' -ForegroundColor Green}else{Write-Host 'No changes needed in lib/tools-data.ts' -ForegroundColor Yellow}
if($pc -ne $oc){Write-Utf8 $categoriesFile $pc;Write-Host 'Updated lib/tool-categories.ts' -ForegroundColor Green}else{Write-Host 'No changes needed in lib/tool-categories.ts' -ForegroundColor Yellow}
if($ph -ne $oh){Write-Utf8 $homeFile $ph;Write-Host 'Updated app/page.tsx to 500+ wording' -ForegroundColor Green}else{Write-Host 'Homepage already uses 500+ wording or no matching count text was found.' -ForegroundColor Yellow}
if($pd -ne $od){Write-Utf8 $discoveryFile $pd;Write-Host ('Updated '+$discoveryFile.Substring($root.Length+1)+' to 500+ wording') -ForegroundColor Green}else{Write-Host 'Tool discovery already uses 500+ wording or no matching count text was found.' -ForegroundColor Yellow}

Write-Host 'Batch 501-550 integration complete.' -ForegroundColor Green
