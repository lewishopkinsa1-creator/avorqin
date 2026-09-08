# Avorqin CSS Unit Internal-Link Patch

Purpose: strengthen the REM/PX/EM converter cluster, especially the REM to PX Converter page, without rewriting page content or changing Avorqin's tool count.

## What changes

- Adds `components/shared/css-unit-links.tsx`.
- Safely patches `components/shared/tool-layout.tsx` to render the component.
- The component returns nothing on every page except these six:
  - REM to PX Converter
  - PX to REM Converter
  - EM to PX Converter
  - PX to EM Converter
  - REM to EM Converter
  - EM to REM Converter
- Each of the six pages links to the other five with descriptive anchor text.
- Adds a contextual link to the Developer Converters category.

## What does NOT change

- Tool definitions
- Public tool count (remains 750)
- Source definition count (remains 758)
- Sitemap
- Redirects
- Homepage wording
- CSS Flexbox Generator optimization

## Install

Copy everything inside this package into the Avorqin project root. Merge folders when prompted.

Then run PowerShell from the Avorqin project root:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\install-css-unit-internal-links.ps1
.\verify-css-unit-internal-links.ps1
```

If verification passes, review the GitHub Desktop changes before committing.
