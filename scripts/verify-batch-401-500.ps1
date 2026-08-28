$ErrorActionPreference='Stop'
$root=(Get-Location).Path
$manifest=Get-Content (Join-Path $root 'batch-401-500-manifest.json') -Raw | ConvertFrom-Json
$missing=@();foreach($tool in $manifest.tools){$p=Join-Path $root ('app\tools\'+$tool.slug+'\page.tsx');if(-not(Test-Path $p)){$missing+=$tool.slug}}
if($missing.Count -gt 0){Write-Host ('Missing routes: '+($missing -join ', ')) -ForegroundColor Red;exit 1}
$tools=Get-Content (Join-Path $root 'lib\tools-data.ts') -Raw;$cats=Get-Content (Join-Path $root 'lib\tool-categories.ts') -Raw
if(-not $tools.Contains('...batch401To500Tools')){throw 'tools-data.ts is not integrated.'}
if(-not $cats.Contains('slug: "ecommerce"')){throw 'Missing ecommerce category.'}
foreach($s in @('average-order-value-calculator','days-from-today-calculator','inches-to-centimeters-converter','modulo-calculator','base64-to-image-decoder')){if(-not $cats.Contains('"'+$s+'"')){throw ('Missing category registration for '+$s)}}
$disc=@(Get-ChildItem -Path (Join-Path $root 'components') -Filter 'tool-discovery.tsx' -File -Recurse)[0];$d=Get-Content $disc.FullName -Raw;if(-not $d.Contains('| "ecommerce"')){throw 'tool-discovery missing ecommerce.'}
Write-Host ('Verified '+$manifest.count+' tool routes and registry/category integration.') -ForegroundColor Green
