$ErrorActionPreference = "Stop"

$root = (Get-Location).Path
$libDir = Join-Path $root "lib"
$toolsFile = Join-Path $libDir "tools-data.ts"
$categoriesFile = Join-Path $libDir "tool-categories.ts"
$batchFile = Join-Path $libDir "tools-data-batch-651-758.ts"
$componentFile = Join-Path $root "components\tools\batch-651-758-tool.tsx"
$manifestFile = Join-Path $root "batch-651-758-manifest.json"
$homeFile = Join-Path $root "app\page.tsx"
$redirectsFile = Join-Path $root "public\_redirects"

function Read-Utf8([string]$file) {
    if (-not (Test-Path $file)) {
        throw "Missing required file: $file"
    }
    return [System.IO.File]::ReadAllText($file)
}

function Get-ActiveToolDataFiles([string]$toolsSource) {
    $found = New-Object System.Collections.Generic.List[string]
    $found.Add($toolsFile)

    $pattern = 'from\s+["'']@/lib/(tools-data[^"'']+)["'']'
    foreach ($match in [regex]::Matches($toolsSource, $pattern)) {
        $relative = $match.Groups[1].Value + ".ts"
        $path = Join-Path $libDir $relative
        if (-not (Test-Path $path)) {
            throw "Active tool-data import points to a missing file: $relative"
        }
        $found.Add($path)
    }

    return @($found | Select-Object -Unique)
}

function Get-SlugsFromFiles([string[]]$files) {
    $list = New-Object System.Collections.Generic.List[string]
    $pattern = '(?m)(?:"slug"|slug)\s*:\s*"([^"]+)"'

    foreach ($file in $files) {
        $content = Read-Utf8 $file
        foreach ($match in [regex]::Matches($content, $pattern)) {
            $list.Add($match.Groups[1].Value)
        }
    }

    return @($list)
}

foreach ($required in @(
    $toolsFile,
    $categoriesFile,
    $batchFile,
    $componentFile,
    $manifestFile,
    $homeFile,
    $redirectsFile
)) {
    if (-not (Test-Path $required)) {
        throw "Missing required file: $required"
    }
}

$manifest = Get-Content $manifestFile -Raw | ConvertFrom-Json
if ($manifest.tools.Count -ne 108 -or [int]$manifest.newTools -ne 108) {
    throw "Manifest does not contain exactly 108 new tools."
}

$newSlugs = @($manifest.tools | ForEach-Object { $_.slug })
if (($newSlugs | Sort-Object -Unique).Count -ne 108) {
    throw "Duplicate slugs exist inside the 108-tool manifest."
}

$obsoleteBcryptRoute = Join-Path $root "app\tools\bcrypt-hash-tool"
if (Test-Path $obsoleteBcryptRoute) {
    throw "Obsolete bcrypt-hash-tool route from the first package version is still present. Rerun the corrected installer."
}

$toolsContent = Read-Utf8 $toolsFile
$categoriesContent = Read-Utf8 $categoriesFile
$batchContent = Read-Utf8 $batchFile
$componentContent = Read-Utf8 $componentFile
$homeContent = Read-Utf8 $homeFile
$redirectContent = Read-Utf8 $redirectsFile

foreach ($requiredPattern in @(
    'import { batch651To758Tools } from "@/lib/tools-data-batch-651-758";',
    "...batch651To758Tools",
    "const allTools: ToolConfig[]",
    "export const tools: ToolConfig[] = allTools.filter",
    "return allTools.find",
    "consolidatedToolSlugs"
)) {
    if (-not $toolsContent.Contains($requiredPattern)) {
        throw "Registry verification failed: missing '$requiredPattern'."
    }
}

if (-not $homeContent.Contains("500+")) {
    throw "Homepage verification failed: required 500+ wording is missing."
}

$removed = @(
    "block-wall-calculator",
    "brick-wall-calculator",
    "brick-mortar-calculator",
    "asphalt-tonnage-calculator",
    "battery-runtime-calculator",
    "unix-timestamp-to-date",
    "unix-timestamp-generator",
    "peak-to-peak-voltage-calculator"
)
foreach ($slug in $removed) {
    if (-not $toolsContent.Contains('"' + $slug + '"')) {
        throw "Consolidated slug is missing from the public-registry exclusion set: $slug"
    }
    if ($newSlugs -contains $slug) {
        throw "A retired consolidated slug was accidentally re-added to the new batch: $slug"
    }
}

$redirectPairs = @(
    @("block-wall-calculator", "concrete-block-calculator"),
    @("brick-wall-calculator", "brick-calculator"),
    @("brick-mortar-calculator", "mortar-calculator"),
    @("asphalt-tonnage-calculator", "asphalt-calculator"),
    @("battery-runtime-calculator", "battery-life-calculator"),
    @("unix-timestamp-to-date", "timestamp-converter"),
    @("unix-timestamp-generator", "timestamp-converter"),
    @("peak-to-peak-voltage-calculator", "peak-voltage-calculator")
)
foreach ($pair in $redirectPairs) {
    $source = $pair[0]
    $dest = $pair[1]
    $ruleNoSlash = "/tools/$source /tools/$dest/ 301"
    $ruleSlash = "/tools/$source/ /tools/$dest/ 301"

    if (-not $redirectContent.Contains($ruleNoSlash)) {
        throw "Missing existing redirect: $ruleNoSlash"
    }
    if (-not $redirectContent.Contains($ruleSlash)) {
        throw "Missing existing redirect: $ruleSlash"
    }
}

# Verify every route references the correct slug and shared batch component.
$missingRoutes = @()
$badRoutes = @()
foreach ($slug in $newSlugs) {
    $route = Join-Path $root ("app\tools\" + $slug + "\page.tsx")
    if (-not (Test-Path $route)) {
        $missingRoutes += $slug
        continue
    }

    $routeContent = Read-Utf8 $route
    if (
        -not $routeContent.Contains('getToolBySlug("' + $slug + '")') -or
        -not $routeContent.Contains('<Batch651758Tool kind="' + $slug + '"')
    ) {
        $badRoutes += $slug
    }
}

if ($missingRoutes.Count -gt 0) {
    throw "Missing route pages: $($missingRoutes -join ', ')"
}
if ($badRoutes.Count -gt 0) {
    throw "Route pages with incorrect slug/component wiring: $($badRoutes -join ', ')"
}

# Verify the batch metadata file itself has all 108 definitions exactly once.
$batchMatches = [regex]::Matches(
    $batchContent,
    '(?m)(?:"slug"|slug)\s*:\s*"([^"]+)"'
)
$batchSlugs = @($batchMatches | ForEach-Object { $_.Groups[1].Value })
if ($batchSlugs.Count -ne 108) {
    throw "New tool-data file contains $($batchSlugs.Count) slug definitions; expected 108."
}
if (($batchSlugs | Sort-Object -Unique).Count -ne 108) {
    throw "New tool-data file contains duplicate slug definitions."
}
foreach ($slug in $newSlugs) {
    if ($batchSlugs -notcontains $slug) {
        throw "Manifest slug missing from new tool-data file: $slug"
    }
    if (-not $componentContent.Contains('"' + $slug + '"')) {
        throw "Shared batch component does not reference new tool kind: $slug"
    }
    if (-not $categoriesContent.Contains('"' + $slug + '"')) {
        throw "New tool is not registered in a category: $slug"
    }
}

# Count only source files actively imported by lib/tools-data.ts plus tools-data.ts itself.
$activeFiles = Get-ActiveToolDataFiles $toolsContent
$allSlugs = Get-SlugsFromFiles $activeFiles
$uniqueSlugs = @($allSlugs | Sort-Object -Unique)

if ($allSlugs.Count -ne 758) {
    throw "Active source-definition count is $($allSlugs.Count); expected exactly 758."
}
if ($uniqueSlugs.Count -ne 758) {
    $duplicateGroups = @(
        $allSlugs |
            Group-Object |
            Where-Object { $_.Count -gt 1 }
    )
    $duplicateNames = @($duplicateGroups | ForEach-Object { $_.Name })
    throw "Active unique-slug count is $($uniqueSlugs.Count), not 758. Duplicate active slugs: $($duplicateNames -join ', ')"
}

$expectedPublic = $uniqueSlugs.Count - $removed.Count
if ($expectedPublic -ne 750) {
    throw "Expected public count calculation is $expectedPublic, not 750."
}

# No new npm dependency is required for this batch.

Write-Host ""
Write-Host "PASS: 108 new tool definitions are present and unique." -ForegroundColor Green
Write-Host "PASS: all 108 static routes are present and correctly wired." -ForegroundColor Green
Write-Host "PASS: all 108 tools are registered in category navigation." -ForegroundColor Green
Write-Host "PASS: all 758 active source definitions have unique slugs." -ForegroundColor Green
Write-Host "PASS: the 8 consolidated legacy pages remain excluded and redirected." -ForegroundColor Green
Write-Host "PASS: getToolBySlug still resolves from allTools." -ForegroundColor Green
Write-Host "PASS: expected public tool count is exactly 750." -ForegroundColor Green
Write-Host "PASS: homepage still contains 500+ wording." -ForegroundColor Green
Write-Host ""
Write-Host "VERIFICATION COMPLETE" -ForegroundColor Green
Write-Host "Next: commit/push with GitHub Desktop and let Cloudflare run the production build. Deploy only if the Cloudflare build passes."
