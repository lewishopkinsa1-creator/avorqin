$ErrorActionPreference = "Stop"
$root=(Get-Location).Path
$libDir=Join-Path $root "lib"
$toolsFile=Join-Path $libDir "tools-data.ts"
$categoriesFile=Join-Path $libDir "tool-categories.ts"
$batchFile=Join-Path $libDir "tools-data-batch-759-1008.ts"
$componentFile=Join-Path $root "components\tools\batch-759-1008-tool.tsx"
$manifestFile=Join-Path $root "batch-759-1008-manifest.json"
$homeFile=Join-Path $root "app\page.tsx"
$redirectsFile=Join-Path $root "public\_redirects"
function Read-Utf8([string]$f){if(-not(Test-Path $f)){throw "Missing required file: $f"};[IO.File]::ReadAllText($f)}
function Get-Active([string]$src){$l=New-Object Collections.Generic.List[string];$l.Add($toolsFile);foreach($m in [regex]::Matches($src,'from\s+["'']@/lib/(tools-data[^"'']+)["'']')){$p=Join-Path $libDir ($m.Groups[1].Value+".ts");if(-not(Test-Path $p)){throw "Missing imported tool-data file: $p"};$l.Add($p)};@($l|Select-Object -Unique)}
function Get-Slugs([string[]]$files){$l=New-Object Collections.Generic.List[string];foreach($f in $files){foreach($m in [regex]::Matches((Read-Utf8 $f),'(?m)(?:"slug"|slug)\s*:\s*"([^"]+)"')){$l.Add($m.Groups[1].Value)}};@($l)}
foreach($f in @($toolsFile,$categoriesFile,$batchFile,$componentFile,$manifestFile,$homeFile,$redirectsFile)){if(-not(Test-Path $f)){throw "Missing required file: $f"}}
$m=Get-Content $manifestFile -Raw|ConvertFrom-Json
if($m.tools.Count -ne 250){throw "Manifest count is not 250."}
$new=@($m.tools|ForEach-Object{$_.slug});if(($new|Sort-Object -Unique).Count -ne 250){throw "Duplicate new slugs."}
$tools=Read-Utf8 $toolsFile;$cats=Read-Utf8 $categoriesFile;$batch=Read-Utf8 $batchFile;$comp=Read-Utf8 $componentFile;$homeContent=Read-Utf8 $homeFile;$red=Read-Utf8 $redirectsFile
foreach($s in @('import { batch759To1008Tools } from "@/lib/tools-data-batch-759-1008";','...batch759To1008Tools','const allTools: ToolConfig[]','export const tools: ToolConfig[] = allTools.filter','return allTools.find','consolidatedToolSlugs')){if(-not $tools.Contains($s)){throw "Registry verification failed: $s"}}
$removed=@('block-wall-calculator','brick-wall-calculator','brick-mortar-calculator','asphalt-tonnage-calculator','battery-runtime-calculator','unix-timestamp-to-date','unix-timestamp-generator','peak-to-peak-voltage-calculator')
foreach($s in $removed){if(-not $tools.Contains('"'+$s+'"')){throw "Consolidated exclusion missing: $s"};if($new -contains $s){throw "Retired slug re-added: $s"}}
$pairs=@(@('block-wall-calculator','concrete-block-calculator'),@('brick-wall-calculator','brick-calculator'),@('brick-mortar-calculator','mortar-calculator'),@('asphalt-tonnage-calculator','asphalt-calculator'),@('battery-runtime-calculator','battery-life-calculator'),@('unix-timestamp-to-date','timestamp-converter'),@('unix-timestamp-generator','timestamp-converter'),@('peak-to-peak-voltage-calculator','peak-voltage-calculator'))
foreach($p in $pairs){foreach($source in @('/tools/'+$p[0],'/tools/'+$p[0]+'/')){$needle=$source+' /tools/'+$p[1]+'/ 301';if(-not $red.Contains($needle)){throw "Missing redirect: $needle"}}}
$bad=@();$missing=@();foreach($s in $new){$p=Join-Path $root ("app\tools\"+$s+"\page.tsx");if(-not(Test-Path $p)){$missing+=$s;continue};$c=Read-Utf8 $p;if(-not $c.Contains('getToolBySlug("'+$s+'")') -or -not $c.Contains('<Batch7591008Tool kind="'+$s+'"')){$bad+=$s};if(-not $cats.Contains('"'+$s+'"')){throw "Category registration missing: $s"};if(-not $comp.Contains('"'+$s+'"')){throw "Component kind missing: $s"}}
if($missing.Count){throw "Missing routes: $($missing -join ', ')"};if($bad.Count){throw "Bad routes: $($bad -join ', ')"}
$batchSlugs=@([regex]::Matches($batch,'(?m)(?:"slug"|slug)\s*:\s*"([^"]+)"')|ForEach-Object{$_.Groups[1].Value});if($batchSlugs.Count -ne 250 -or ($batchSlugs|Sort-Object -Unique).Count -ne 250){throw "Batch metadata count/uniqueness failed."}
$active=Get-Active $tools;$all=Get-Slugs $active;$unique=@($all|Sort-Object -Unique);if($all.Count -ne 1008){throw "Active source-definition count is $($all.Count), expected 1008."};if($unique.Count -ne 1008){throw "Active unique-slug count is $($unique.Count), expected 1008."};if($unique.Count-$removed.Count -ne 1000){throw "Expected public count is $($unique.Count-$removed.Count), not 1000."}
foreach($slug in @('engineering','automotive','cooking-baking','photography-video')){if(-not $cats.Contains('slug: "'+$slug+'"')){throw "New category missing: $slug"}}
if(-not $homeContent.Contains('1,000+')){throw "Homepage 1,000+ wording not found."}
Write-Host "";Write-Host "PASS: 250 new tool definitions are present and unique." -ForegroundColor Green;Write-Host "PASS: all 250 static routes are present and correctly wired." -ForegroundColor Green;Write-Host "PASS: all 250 tools are registered in category navigation." -ForegroundColor Green;Write-Host "PASS: all 1,008 active source definitions have unique slugs." -ForegroundColor Green;Write-Host "PASS: the 8 consolidated legacy pages remain excluded and redirected." -ForegroundColor Green;Write-Host "PASS: getToolBySlug still resolves from allTools." -ForegroundColor Green;Write-Host "PASS: expected public tool count is exactly 1,000." -ForegroundColor Green;Write-Host "PASS: Engineering, Automotive, Cooking/Baking, and Photography/Video categories are present." -ForegroundColor Green;Write-Host "PASS: homepage contains 1,000+ wording." -ForegroundColor Green;Write-Host "";Write-Host "VERIFICATION COMPLETE" -ForegroundColor Green;Write-Host "Next: commit/push with GitHub Desktop and let Cloudflare run the production build."
