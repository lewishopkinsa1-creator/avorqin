# Avorqin ASCII/Text Internal-Link Patch

This patch strengthens internal linking among six closely related encoding/conversion tools:

- ASCII to Text Converter
- Text to ASCII Converter
- Text to Hex Converter
- Hex to Text Converter
- Binary to Text Converter
- Text to Binary Converter

It adds one shared related-links component and wires it into the existing `ToolLayout`. The component returns `null` for every other Avorqin tool, so unrelated pages are unaffected.

## What this does not change

- Public tool count (remains 750)
- Source definition count
- Sitemap
- Redirects
- Tool registry
- Homepage wording
- CSS unit internal-link cluster

## Install

Copy everything inside this folder into the Avorqin project root, then run in PowerShell:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\install-ascii-text-internal-links.ps1
.\verify-ascii-text-internal-links.ps1
```

If verification passes, commit only these two production code files if you want to keep support files out of Git:

- `components/shared/ascii-text-links.tsx`
- `components/shared/tool-layout.tsx`

Suggested commit message:

`Add ASCII and text converter internal links`
