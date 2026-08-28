# Avorqin Batch 301-400

This package adds 100 browser-based tools:

- 301-350: Construction & Home (50)
- 351-380: Electrical & Electronics (30)
- 381-390: Education & Grades (10)
- 391-400: Math expansion (10)

It also creates three new Avorqin category collections in the existing category registry: `construction`, `electrical`, and `education`. The existing dynamic category route will generate their landing pages.

## Windows install

1. Extract this ZIP.
2. Drag everything **inside** the extracted folder into the root of the Avorqin repository.
3. Open the Avorqin folder in VS Code.
4. Open a PowerShell terminal and run:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\install-batch-301-400.ps1
```

5. Verify without Node/npm:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\verify-batch-301-400.ps1
```

6. Commit and push. Cloudflare should run `npm run build`.

The installer updates `lib/tools-data.ts`, `lib/tool-categories.ts`, and the current `components/**/tool-discovery.tsx`. It is designed to be idempotent.

## New category URLs

- https://avorqin.com/tools/construction/
- https://avorqin.com/tools/electrical/
- https://avorqin.com/tools/education/

## Notes

Construction quantities are planning estimates; product coverage, density, waste, joint dimensions, building details, and installation conditions vary. Electrical tools are planning/relationship calculators and are not substitutes for electrical code requirements or a qualified electrician. GPA policies vary by school.
