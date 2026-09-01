$ErrorActionPreference='Stop'
$root=(Get-Location).Path
$toolsFile=Join-Path $root 'lib\tools-data.ts'
$categoriesFile=Join-Path $root 'lib\tool-categories.ts'

function Read-Utf8([string]$path){ return [System.IO.File]::ReadAllText($path) }
function Write-Utf8([string]$path,[string]$text){ [System.IO.File]::WriteAllText($path,$text,(New-Object System.Text.UTF8Encoding($false))) }

function Patch-Tools([string]$source){
  $import='import { batch551To600Tools } from "@/lib/tools-data-batch-551-600";'
  $next=$source
  if(-not $next.Contains($import)){$next=$import+"`r`n"+$next}
  if(-not $next.Contains('...batch551To600Tools')){
    $marker="`r`n];`r`n`r`nexport function getToolBySlug"
    $at=$next.LastIndexOf($marker)
    if($at -lt 0){$marker="`n];`n`nexport function getToolBySlug";$at=$next.LastIndexOf($marker)}
    if($at -lt 0){throw 'Could not find end of consolidated tools array.'}
    $next=$next.Substring(0,$at)+"`r`n  ...batch551To600Tools,"+$next.Substring($at)
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
  $electrical=@('ac-amps-to-watts-calculator','dc-amps-to-watts-calculator','single-phase-amps-to-watts-calculator','three-phase-amps-to-watts-calculator','12v-amps-to-watts-calculator','24v-amps-to-watts-calculator','48v-amps-to-watts-calculator','120v-amps-to-watts-calculator','230v-amps-to-watts-calculator','240v-amps-to-watts-calculator','12v-watts-to-amps-calculator','24v-watts-to-amps-calculator','48v-watts-to-amps-calculator','120v-watts-to-amps-calculator','230v-watts-to-amps-calculator','240v-watts-to-amps-calculator','watts-to-kwh-per-day-calculator','monthly-electricity-usage-calculator','annual-electricity-cost-calculator','energy-cost-per-hour-calculator','solar-panel-output-calculator','solar-panel-size-calculator','solar-battery-size-calculator','solar-battery-runtime-calculator','solar-charge-time-calculator','inverter-size-calculator','inverter-battery-runtime-calculator','battery-charging-time-calculator','battery-c-rate-calculator','battery-energy-density-calculator','capacitor-energy-calculator','capacitor-charge-calculator','capacitive-reactance-calculator','inductive-reactance-calculator','resonant-frequency-calculator','rl-time-constant-calculator','series-rlc-impedance-calculator','parallel-rlc-impedance-calculator','impedance-triangle-calculator','phase-angle-calculator','frequency-to-period-calculator','period-to-frequency-calculator','wavelength-calculator','dbm-to-watts-calculator','watts-to-dbm-calculator','dbw-to-watts-calculator','watts-to-dbw-calculator','rms-voltage-calculator','peak-voltage-calculator','peak-to-peak-voltage-calculator')
  $converters=@('ac-amps-to-watts-calculator','dc-amps-to-watts-calculator','single-phase-amps-to-watts-calculator','three-phase-amps-to-watts-calculator','12v-amps-to-watts-calculator','24v-amps-to-watts-calculator','48v-amps-to-watts-calculator','120v-amps-to-watts-calculator','230v-amps-to-watts-calculator','240v-amps-to-watts-calculator','12v-watts-to-amps-calculator','24v-watts-to-amps-calculator','48v-watts-to-amps-calculator','120v-watts-to-amps-calculator','230v-watts-to-amps-calculator','240v-watts-to-amps-calculator','watts-to-kwh-per-day-calculator','monthly-electricity-usage-calculator','annual-electricity-cost-calculator','energy-cost-per-hour-calculator','frequency-to-period-calculator','period-to-frequency-calculator','wavelength-calculator','dbm-to-watts-calculator','watts-to-dbm-calculator','dbw-to-watts-calculator','watts-to-dbw-calculator','rms-voltage-calculator','peak-voltage-calculator','peak-to-peak-voltage-calculator')
  $next=Add-ToCategory $next 'electrical' $electrical
  $next=Add-ToCategory $next 'calculators' $electrical
  $next=Add-ToCategory $next 'converters' $converters
  return $next
}

foreach($required in @($toolsFile,$categoriesFile)){if(-not(Test-Path $required)){throw "Required file not found: $required"}}

$ot=Read-Utf8 $toolsFile
$oc=Read-Utf8 $categoriesFile
$pt=Patch-Tools $ot
$pc=Patch-Categories $oc

if($pt -ne $ot){Write-Utf8 $toolsFile $pt;Write-Host 'Updated lib/tools-data.ts' -ForegroundColor Green}else{Write-Host 'No changes needed in lib/tools-data.ts' -ForegroundColor Yellow}
if($pc -ne $oc){Write-Utf8 $categoriesFile $pc;Write-Host 'Updated lib/tool-categories.ts' -ForegroundColor Green}else{Write-Host 'No changes needed in lib/tool-categories.ts' -ForegroundColor Yellow}

Write-Host 'Batch 551-600 integration complete. Homepage remains at 500+ wording.' -ForegroundColor Green
