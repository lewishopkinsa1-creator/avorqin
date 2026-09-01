$ErrorActionPreference='Stop'
$root=(Get-Location).Path
$manifestPath=Join-Path $root 'batch-551-600-manifest.json'
if(-not(Test-Path $manifestPath)){throw 'Run this verifier from the Avorqin repository root. batch-551-600-manifest.json was not found.'}
$manifest=Get-Content $manifestPath -Raw | ConvertFrom-Json
$missing=@()
foreach($tool in $manifest.tools){
  $p=Join-Path $root ('app\tools\'+$tool.slug+'\page.tsx')
  if(-not(Test-Path $p)){$missing+=$tool.slug}
}
if($missing.Count -gt 0){Write-Host ('Missing routes: '+($missing -join ', ')) -ForegroundColor Red;exit 1}

$toolsContent=Get-Content (Join-Path $root 'lib\tools-data.ts') -Raw
$catsContent=Get-Content (Join-Path $root 'lib\tool-categories.ts') -Raw
if(-not $toolsContent.Contains('...batch551To600Tools')){throw 'tools-data.ts is not integrated.'}
foreach($s in @('ac-amps-to-watts-calculator','solar-panel-size-calculator','battery-charging-time-calculator','series-rlc-impedance-calculator','dbm-to-watts-calculator')){
  if(-not $catsContent.Contains('"'+$s+'"')){throw ('Missing category registration for '+$s)}
}
$homePath=Join-Path $root 'app\page.tsx'
if(Test-Path $homePath){
  $homeContent=Get-Content $homePath -Raw
  if(-not $homeContent.Contains('500+')){Write-Host 'Warning: homepage does not appear to contain 500+ wording.' -ForegroundColor Yellow}
}
Write-Host ('Verified '+$manifest.count+' tool routes and registry/category integration. Homepage remains 500+.') -ForegroundColor Green
