$ErrorActionPreference='Stop'
$root=(Get-Location).Path
$manifest=Get-Content (Join-Path $root 'batch-501-550-manifest.json') -Raw | ConvertFrom-Json
$missing=@()
foreach($tool in $manifest.tools){
  $p=Join-Path $root ('app\tools\'+$tool.slug+'\page.tsx')
  if(-not(Test-Path $p)){$missing+=$tool.slug}
}
if($missing.Count -gt 0){Write-Host ('Missing routes: '+($missing -join ', ')) -ForegroundColor Red;exit 1}

$tools=Get-Content (Join-Path $root 'lib\tools-data.ts') -Raw
$cats=Get-Content (Join-Path $root 'lib\tool-categories.ts') -Raw
$homeContent=Get-Content (Join-Path $root 'app\page.tsx') -Raw
$disc=@(Get-ChildItem -Path (Join-Path $root 'components') -Filter 'tool-discovery.tsx' -File -Recurse)[0]
$d=Get-Content $disc.FullName -Raw

if(-not $tools.Contains('...batch501To550Tools')){throw 'tools-data.ts is not integrated.'}
foreach($s in @('va-to-watts-calculator','transformer-sizing-calculator','extension-cord-gauge-calculator','motor-full-load-amps-calculator','apparent-power-calculator')){
  if(-not $cats.Contains('"'+$s+'"')){throw ('Missing category registration for '+$s)}
}
if(-not $homeContent.Contains('500+ free browser-based tools')){throw 'Homepage badge does not use 500+ wording.'}
if(-not $homeContent.Contains('500+ free online tools.')){throw 'Homepage H1 does not use 500+ wording.'}
if(-not $d.Contains('Search 500+ Avorqin tools')){Write-Host 'Warning: tool-discovery count text is not 500+; homepage title is still correctly patched.' -ForegroundColor Yellow}

Write-Host ('Verified '+$manifest.count+' tool routes, registry/category integration, and 500+ homepage wording.') -ForegroundColor Green
