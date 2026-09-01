# Avorqin Batch 601–650

This package adds 50 more Construction & Home tools based on the construction and masonry query patterns already appearing in Avorqin Google Search Console.

## Includes
- 50 SEO-friendly tool routes
- Concrete block fill, block wall, brick and masonry estimators
- Footing, foundation, pier, post-hole, driveway and patio concrete calculators
- Aggregate, gravel, asphalt, excavation and backfill estimators
- Plaster, stucco, siding, molding and roof-tile calculators
- Shared calculator UI + pure calculation engine
- Tool registry data
- PowerShell installer + verifier
- Homepage remains at `500+` wording until Avorqin reaches 1,000 tools

## Install
1. Extract this ZIP.
2. Copy everything inside into the root of the Avorqin repository.
3. From the Avorqin repository root, run:
   `powershell -ExecutionPolicy Bypass -File .\scripts\install-batch-601-650.ps1`
4. Verify:
   `powershell -ExecutionPolicy Bypass -File .\scripts\verify-batch-601-650.ps1`
5. Commit/push and let Cloudflare run the production build.

## Construction note
These are planning/material estimators. Verify actual product dimensions, coverage, waste, site conditions, structural requirements, manufacturer instructions, and applicable building codes before real-world work.
