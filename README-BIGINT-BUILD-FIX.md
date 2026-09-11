# Avorqin 1,000-tool BigInt build fix

Cloudflare compiled the app but TypeScript failed because `batch-759-1008-tool.tsx`
used BigInt literal syntax (`0n`, `8n`, `58n`, `255n`) while the project target is
below ES2020.

This patch changes only the syntax, using `BigInt(...)` constructor calls instead.
It does not change tool counts, routes, categories, redirects, or homepage wording.

Run:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\fix-bigint-build.ps1
.\verify-bigint-build-fix.ps1
```

Then commit the changed code file and push so Cloudflare rebuilds.
