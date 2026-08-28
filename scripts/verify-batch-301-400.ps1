$ErrorActionPreference='Stop'
$root=(Get-Location).Path
$manifest=Get-Content (Join-Path $root 'batch-301-400-manifest.json') -Raw | ConvertFrom-Json
$missing=@()
foreach($tool in $manifest.tools){ $p=Join-Path $root ('app\tools\'+$tool.slug+'\page.tsx'); if(-not (Test-Path $p)){$missing+=$tool.slug} }
if($missing.Count -gt 0){Write-Host ('Missing routes: '+($missing -join ', ')) -ForegroundColor Red; exit 1}
$tools=Get-Content (Join-Path $root 'lib\tools-data.ts') -Raw
$cats=Get-Content (Join-Path $root 'lib\tool-categories.ts') -Raw
if(-not $tools.Contains('...batch301To400Tools')){throw 'tools-data.ts is not integrated.'}
foreach($slug in @('construction','electrical','education')){if(-not $cats.Contains('slug: "'+$slug+'"')){throw ('Missing category '+$slug)}}
$disc=@(Get-ChildItem -Path (Join-Path $root 'components') -Filter 'tool-discovery.tsx' -File -Recurse)[0]
$d=Get-Content $disc.FullName -Raw
foreach($slug in @('construction','electrical','education')){if(-not $d.Contains('| "'+$slug+'"')){throw ('tool-discovery missing '+$slug)}}
Write-Host ('Verified '+$manifest.count+' tool routes and registry/category integration.') -ForegroundColor Green
