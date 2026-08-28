$ErrorActionPreference = 'Stop'
$root = (Get-Location).Path
$toolsFile = Join-Path $root 'lib\tools-data.ts'
$categoriesFile = Join-Path $root 'lib\tool-categories.ts'

function Read-Utf8([string]$file) { if (-not (Test-Path $file)) { throw "Missing $file" }; return [System.IO.File]::ReadAllText($file) }
function Write-Utf8([string]$file,[string]$text) { $utf8NoBom=New-Object System.Text.UTF8Encoding($false); [System.IO.File]::WriteAllText($file,$text,$utf8NoBom) }

function Patch-Tools([string]$source) {
  $importLine='import { batch301To400Tools } from "@/lib/tools-data-batch-301-400";'
  $next=$source
  if (-not $next.Contains($importLine)) { $next=$importLine+"`r`n"+$next }
  if (-not $next.Contains('...batch301To400Tools')) {
    $marker="`r`n];`r`n`r`nexport function getToolBySlug"; $at=$next.LastIndexOf($marker)
    if ($at -lt 0) { $marker="`n];`n`nexport function getToolBySlug"; $at=$next.LastIndexOf($marker) }
    if ($at -lt 0) { throw 'Could not find end of consolidated tools array in lib/tools-data.ts. No files changed.' }
    $next=$next.Substring(0,$at)+"`r`n  ...batch301To400Tools,"+$next.Substring($at)
  }
  return $next
}

function Add-ToCategory([string]$source,[string]$categorySlug,[string[]]$slugs) {
  $token='slug: "'+$categorySlug+'"'; $objStart=$source.IndexOf($token)
  if($objStart -lt 0){throw "Category $categorySlug not found in lib/tool-categories.ts."}
  $listStart=$source.IndexOf('toolSlugs: [',$objStart); if($listStart -lt 0){throw "toolSlugs missing for $categorySlug."}
  $listEnd=$source.IndexOf('    ],',$listStart); if($listEnd -lt 0){throw "Could not find end of toolSlugs for $categorySlug."}
  $block=$source.Substring($listStart,$listEnd-$listStart); $missing=@(); foreach($slug in $slugs){if(-not $block.Contains('"'+$slug+'"')){$missing+=$slug}}
  if($missing.Count -eq 0){return $source}; $insertion=''; foreach($slug in $missing){$insertion+='      "'+$slug+'",'+"`r`n"}
  return $source.Substring(0,$listEnd)+$insertion+$source.Substring($listEnd)
}

function Insert-CategoryBlock([string]$source,[string]$categorySlug,[string]$block) {
  if($source.Contains('slug: "'+$categorySlug+'"')){return $source}
  $marker="`r`n];`r`n`r`nexport function getToolCategory"; $at=$source.LastIndexOf($marker)
  if($at -lt 0){$marker="`n];`n`nexport function getToolCategory";$at=$source.LastIndexOf($marker)}
  if($at -lt 0){throw 'Could not find toolCategories array end.'}
  return $source.Substring(0,$at)+"`r`n"+$block+$source.Substring($at)
}

function Add-NewCategories([string]$source) {
  $next=$source
  $constructionBlock=@'
  {
    slug: "construction",
    name: "Construction & Home Tools",
    description: "Calculate concrete, flooring, roofing, paint, gravel, lumber, fencing, landscaping materials, and common home-project quantities.",
    intro: "Plan common construction, renovation, landscaping, and home-improvement projects with browser-based calculators for material quantities, areas, volumes, roofing, flooring, concrete, gravel, lumber, paint, fencing, and more.",
    keywords: ["construction calculators", "home improvement calculators", "concrete calculator", "square footage calculator", "roofing calculator", "flooring calculator", "gravel calculator", "paint calculator"],
    toolSlugs: [
      "square-footage-calculator",
      "concrete-calculator",
      "concrete-slab-calculator",
      "concrete-bag-calculator",
      "cubic-yard-calculator",
      "gravel-calculator",
      "mulch-calculator",
      "topsoil-calculator",
      "sand-calculator",
      "brick-calculator",
      "concrete-block-calculator",
      "drywall-calculator",
      "paint-calculator",
      "wallpaper-calculator",
      "flooring-calculator",
      "tile-calculator",
      "carpet-calculator",
      "decking-calculator",
      "fence-calculator",
      "roofing-calculator",
      "roof-pitch-calculator",
      "rafter-length-calculator",
      "roof-shingle-calculator",
      "stair-calculator",
      "board-foot-calculator",
      "lumber-calculator",
      "stud-calculator",
      "insulation-calculator",
      "paver-calculator",
      "asphalt-calculator",
      "room-area-calculator",
      "wall-area-calculator",
      "ceiling-area-calculator",
      "cubic-feet-calculator",
      "square-feet-to-cubic-yards-calculator",
      "grout-calculator",
      "mortar-calculator",
      "thinset-calculator",
      "rebar-calculator",
      "pool-volume-calculator",
      "tank-volume-calculator",
      "pipe-volume-calculator",
      "gpm-calculator",
      "flow-rate-calculator",
      "deck-stain-calculator",
      "epoxy-calculator",
      "crushed-stone-calculator",
      "road-base-calculator",
      "gravel-driveway-calculator",
      "fence-post-depth-calculator",
    ],
  },
'@
  $next=Insert-CategoryBlock $next 'construction' $constructionBlock
  $electricalBlock=@'
  {
    slug: "electrical",
    name: "Electrical & Electronics Tools",
    description: "Calculate watts, amps, volts, energy, batteries, voltage drop, wire gauge, resistance, capacitance, transformers, and lighting values.",
    intro: "Use practical browser-based electrical calculators for power conversions, battery estimates, wire voltage drop, resistance and capacitance networks, transformer relationships, energy, and lighting calculations.",
    keywords: ["electrical calculators", "watts to amps calculator", "amps to watts calculator", "voltage drop calculator", "wire gauge calculator", "battery life calculator", "resistor calculator"],
    toolSlugs: [
      "watts-to-amps-calculator",
      "amps-to-watts-calculator",
      "volts-to-watts-calculator",
      "watts-to-volts-calculator",
      "amps-to-volts-calculator",
      "volts-to-amps-calculator",
      "kw-to-amps-calculator",
      "amps-to-kw-calculator",
      "kw-to-kwh-calculator",
      "kwh-to-kw-calculator",
      "watts-to-kwh-calculator",
      "kwh-to-watts-calculator",
      "mah-to-wh-calculator",
      "wh-to-mah-calculator",
      "battery-life-calculator",
      "battery-capacity-calculator",
      "power-factor-calculator",
      "voltage-drop-calculator",
      "wire-gauge-calculator",
      "series-resistor-calculator",
      "parallel-resistor-calculator",
      "capacitor-series-calculator",
      "capacitor-parallel-calculator",
      "rc-time-constant-calculator",
      "transformer-calculator",
      "joules-to-watts-calculator",
      "watts-to-joules-calculator",
      "lumens-to-watts-calculator",
      "watts-to-lumens-calculator",
      "lux-to-lumens-calculator",
    ],
  },
'@
  $next=Insert-CategoryBlock $next 'electrical' $electricalBlock
  $educationBlock=@'
  {
    slug: "education",
    name: "Education & Grade Tools",
    description: "Calculate GPA, weighted GPA, final grades, test grades, semester GPA, cumulative GPA, and weighted course grades.",
    intro: "Estimate grades and GPA with straightforward browser-based calculators for students. Work with course credits, letter grades, weighted categories, final exams, tests, semesters, and cumulative GPA.",
    keywords: ["grade calculator", "GPA calculator", "weighted GPA calculator", "final grade calculator", "test grade calculator", "college GPA calculator", "high school GPA calculator"],
    toolSlugs: [
      "gpa-calculator",
      "weighted-gpa-calculator",
      "high-school-gpa-calculator",
      "college-gpa-calculator",
      "grade-calculator",
      "final-grade-calculator",
      "weighted-grade-calculator",
      "test-grade-calculator",
      "semester-gpa-calculator",
      "cumulative-gpa-calculator",
    ],
  },
'@
  $next=Insert-CategoryBlock $next 'education' $educationBlock
  return $next
}

function Patch-Categories([string]$source) {
  $next=Add-NewCategories $source
  $next=Add-ToCategory $next 'calculators' @('square-footage-calculator','concrete-calculator','concrete-slab-calculator','concrete-bag-calculator','cubic-yard-calculator','gravel-calculator','mulch-calculator','topsoil-calculator','sand-calculator','brick-calculator','concrete-block-calculator','drywall-calculator','paint-calculator','wallpaper-calculator','flooring-calculator','tile-calculator','carpet-calculator','decking-calculator','fence-calculator','roofing-calculator','roof-pitch-calculator','rafter-length-calculator','roof-shingle-calculator','stair-calculator','board-foot-calculator','lumber-calculator','stud-calculator','insulation-calculator','paver-calculator','asphalt-calculator','room-area-calculator','wall-area-calculator','ceiling-area-calculator','cubic-feet-calculator','square-feet-to-cubic-yards-calculator','grout-calculator','mortar-calculator','thinset-calculator','rebar-calculator','pool-volume-calculator','tank-volume-calculator','pipe-volume-calculator','gpm-calculator','flow-rate-calculator','deck-stain-calculator','epoxy-calculator','crushed-stone-calculator','road-base-calculator','gravel-driveway-calculator','fence-post-depth-calculator','watts-to-amps-calculator','amps-to-watts-calculator','volts-to-watts-calculator','watts-to-volts-calculator','amps-to-volts-calculator','volts-to-amps-calculator','kw-to-amps-calculator','amps-to-kw-calculator','kw-to-kwh-calculator','kwh-to-kw-calculator','watts-to-kwh-calculator','kwh-to-watts-calculator','mah-to-wh-calculator','wh-to-mah-calculator','battery-life-calculator','battery-capacity-calculator','power-factor-calculator','voltage-drop-calculator','wire-gauge-calculator','series-resistor-calculator','parallel-resistor-calculator','capacitor-series-calculator','capacitor-parallel-calculator','rc-time-constant-calculator','transformer-calculator','joules-to-watts-calculator','watts-to-joules-calculator','lumens-to-watts-calculator','watts-to-lumens-calculator','lux-to-lumens-calculator','gpa-calculator','weighted-gpa-calculator','high-school-gpa-calculator','college-gpa-calculator','grade-calculator','final-grade-calculator','weighted-grade-calculator','test-grade-calculator','semester-gpa-calculator','cumulative-gpa-calculator','matrix-determinant-calculator','matrix-multiplication-calculator','matrix-inverse-calculator','linear-equation-solver','system-of-equations-solver','logarithm-calculator','exponent-calculator','square-root-calculator','cube-root-calculator','factorial-calculator')
  $next=Add-ToCategory $next 'math' @('matrix-determinant-calculator','matrix-multiplication-calculator','matrix-inverse-calculator','linear-equation-solver','system-of-equations-solver','logarithm-calculator','exponent-calculator','square-root-calculator','cube-root-calculator','factorial-calculator')
  return $next
}

function Add-DiscoveryId([string]$source,[string]$categorySlug) {
  if($source.Contains('| "'+$categorySlug+'"')){return $source}
  $needle='  | "calculators"'; $idx=$source.IndexOf($needle)
  if($idx -lt 0){throw 'Could not locate CategoryId calculators entry in tool-discovery.tsx.'}
  $insert='  | "'+$categorySlug+'"' + "`r`n"
  return $source.Substring(0,$idx)+$insert+$source.Substring($idx)
}

function Add-DiscoveryOrder([string]$source,[string]$categorySlug,[string]$label) {
  $entry='  { id: "'+$categorySlug+'", label: "'+$label+'" },'
  if($source.Contains($entry)){return $source}
  $needle='  { id: "calculators", label: "Calculators" },'; $idx=$source.IndexOf($needle)
  if($idx -lt 0){throw 'Could not locate calculator categoryOrder entry in tool-discovery.tsx.'}
  return $source.Substring(0,$idx)+$entry+"`r`n"+$source.Substring($idx)
}

function Patch-Discovery([string]$source) {
  $next=$source
  $next=Add-DiscoveryId $next 'construction'
  $next=Add-DiscoveryId $next 'electrical'
  $next=Add-DiscoveryId $next 'education'
  $next=Add-DiscoveryOrder $next 'construction' 'Construction & Home'
  $next=Add-DiscoveryOrder $next 'electrical' 'Electrical'
  $next=Add-DiscoveryOrder $next 'education' 'Education & Grades'
  return $next
}

$discoveryFiles = @(Get-ChildItem -Path (Join-Path $root 'components') -Filter 'tool-discovery.tsx' -File -Recurse -ErrorAction SilentlyContinue)
if($discoveryFiles.Count -eq 0){throw 'Could not find components/**/tool-discovery.tsx. No files changed.'}
if($discoveryFiles.Count -gt 1){throw 'Found more than one tool-discovery.tsx. Please send the file paths before installing this batch.'}
$discoveryFile=$discoveryFiles[0].FullName

# Read and patch all targets before writing any of them.
$originalTools=Read-Utf8 $toolsFile
$originalCategories=Read-Utf8 $categoriesFile
$originalDiscovery=Read-Utf8 $discoveryFile
$patchedTools=Patch-Tools $originalTools
$patchedCategories=Patch-Categories $originalCategories
$patchedDiscovery=Patch-Discovery $originalDiscovery

if($patchedTools -ne $originalTools){Write-Utf8 $toolsFile $patchedTools;Write-Host 'Updated lib/tools-data.ts' -ForegroundColor Green}else{Write-Host 'No changes needed in lib/tools-data.ts' -ForegroundColor Yellow}
if($patchedCategories -ne $originalCategories){Write-Utf8 $categoriesFile $patchedCategories;Write-Host 'Updated lib/tool-categories.ts' -ForegroundColor Green}else{Write-Host 'No changes needed in lib/tool-categories.ts' -ForegroundColor Yellow}
if($patchedDiscovery -ne $originalDiscovery){Write-Utf8 $discoveryFile $patchedDiscovery;Write-Host ('Updated '+$discoveryFile.Substring($root.Length+1)) -ForegroundColor Green}else{Write-Host 'No changes needed in tool-discovery.tsx' -ForegroundColor Yellow}
Write-Host 'Batch 301-400 integration complete.' -ForegroundColor Green
