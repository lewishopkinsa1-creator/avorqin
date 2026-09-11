# Avorqin 750 → 1,000 public tools

This package adds exactly **250 new tools** to the current Avorqin 750-public-tool checkpoint.

Expected result after install:

- 1,008 active source definitions
- 8 retained consolidated legacy definitions excluded from the public registry
- exactly 1,000 public tools
- homepage milestone text updated from `500+` to `1,000+`
- no local Node/npm requirement
- new focused category collections: Physics & Engineering, Automotive, Cooking & Baking, Photography & Video

## Install

1. Extract the ZIP.
2. Copy everything inside the extracted folder into the root of your Avorqin repo.
3. Open PowerShell in the Avorqin repo.
4. Run:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\install-batch-759-1008.ps1
.\verify-batch-759-1008.ps1
```

Do **not** install Node locally just for this package. Your normal workflow can continue to use Cloudflare for the production Next.js build.

If the verifier passes, review the changes in GitHub Desktop, commit, push, and let Cloudflare build.

## Safeguards

The installer checks for existing slug collisions before patching registry files. The verifier checks the full 1,008 source-definition count, 1,000 public-tool calculation, 250 new routes, all category registrations, all 8 legacy redirects, `getToolBySlug()` behavior, and the homepage milestone wording.
