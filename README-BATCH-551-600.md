# Avorqin Batch 551–600

This package adds 50 more Electrical & Electronics tools based on the electrical/power query patterns already appearing in Avorqin Google Search Console.

## Includes
- 50 SEO-friendly tool routes
- Exact AC/DC and fixed-voltage amps/watts calculators
- Energy-cost and usage calculators
- Solar, battery, and inverter calculators
- Reactance, resonance, impedance, frequency, RF-power, and waveform calculators
- Shared calculator UI + pure calculation engine
- Tool registry data
- PowerShell installer + verifier
- Homepage remains at `500+` wording until Avorqin reaches 1,000 tools

## Install
1. Extract this ZIP.
2. Copy everything inside into the root of the Avorqin repository.
3. From the Avorqin repository root, run:
   `powershell -ExecutionPolicy Bypass -File .\scripts\install-batch-551-600.ps1`
4. Verify:
   `powershell -ExecutionPolicy Bypass -File .\scripts\verify-batch-551-600.ps1`
5. Commit/push and let Cloudflare run the production build.

## Electrical safety
Real installations must follow equipment specifications, conductor ampacity and protection requirements, manufacturer instructions, battery/solar limits, and applicable electrical codes. These calculators are planning/math tools, not installation approvals.
