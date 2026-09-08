# Avorqin Screen / Display Internal Links

Purpose: strengthen the Screen Resolution Calculator with relevant contextual internal links without rewriting its content or changing the public tool count.

Affected public pages:
- Screen Resolution Calculator
- Screen PPI Calculator
- Aspect Ratio Calculator
- Image Dimensions Checker
- Image DPI Calculator

Production code changes:
- `components/shared/screen-display-links.tsx` (new)
- `components/shared/tool-layout.tsx` (patched by installer)

This patch does not change:
- tool definitions
- sitemap entries
- redirects
- the 750 public tool count
- the 758 source-definition count
- homepage 500+ wording

Install from the Avorqin project root after copying the package contents there:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\install-screen-display-internal-links.ps1
.\verify-screen-display-internal-links.ps1
```

After a clean verification, commit only the two production code files if you want to keep support scripts out of Git.
