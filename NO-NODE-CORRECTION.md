# Avorqin 642 -> 750 No-Node Correction

This correction is for the first 642 -> 750 package version that stopped because `bcryptjs` required local npm.

What changed:
- Removed the Bcrypt Hash Tool from this batch.
- Replaced it with **INI to JSON Converter** so the batch remains exactly 108 new tools.
- Removed all `bcryptjs` / local npm requirements.
- The corrected installer removes the obsolete `app/tools/bcrypt-hash-tool` folder from the first package version if it exists.
- The batch still targets 758 source definitions / 750 public tools and preserves the 8 consolidated legacy definitions.

## Apply this patch

1. Copy the contents of this ZIP into the root of the Avorqin project.
2. For files Windows says already exist, choose **Replace the files in the destination**. These are only corrected files from the first 642 -> 750 package.
3. Open PowerShell in the Avorqin project folder.
4. Run:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\install-batch-651-758.ps1
```

5. If the installer says `INSTALL COMPLETE`, run:

```powershell
.\verify-batch-651-758.ps1
```

6. If verification passes, commit/push in GitHub Desktop. No local Node.js/npm or `npm run build` is required. Cloudflare will perform the production build.
