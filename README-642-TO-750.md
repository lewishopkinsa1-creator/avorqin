# Avorqin 642 -> 750 Public Tool Expansion (Full No-Node Package)

This package contains the complete 108-tool expansion needed to move Avorqin from 642 to 750 distinct public tools.

## Important
- No local Node.js/npm installation is required.
- The batch contains 108 new public tools.
- Source definitions move from 650 to 758.
- The existing 8 consolidated legacy definitions remain in `allTools` but filtered from the public registry.
- Homepage wording remains `500+ tools`.
- `bcrypt-hash-tool` is NOT included. It was replaced with `ini-to-json-converter` so there are no new npm dependencies.

## Install
Copy EVERYTHING INSIDE this extracted folder directly into the root of your Avorqin repo and allow Windows to merge folders and replace the batch files from the earlier attempt.

Then in PowerShell from the Avorqin repo root:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\install-batch-651-758.ps1
```

After INSTALL COMPLETE:

```powershell
.\verify-batch-651-758.ps1
```

Do not run a local npm build. Commit/push with GitHub Desktop and let Cloudflare run the production build.
