# Avorqin Batch 401-500

Adds 100 tools to take Avorqin from 400 to 500 tools.

- 401-430: Ecommerce & SaaS (30)
- 431-450: Date & Time expansion (20)
- 451-470: Exact-intent converters (20)
- 471-485: Math & statistics expansion (15)
- 486-500: Image & SVG expansion (15)

It adds one new category: `ecommerce`. Existing `date-time`, `converters`, `math`, `images`, `finance`, and `calculators` categories are expanded. The header now reads the category registry dynamically, so Ecommerce & SaaS should also appear in the Categories dropdown automatically after installation.

## Windows install

1. Extract this ZIP.
2. Drag everything **inside** the extracted folder into the Avorqin repository root.
3. In a VS Code PowerShell terminal run:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\install-batch-401-500.ps1
```

4. Verify:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\verify-batch-401-500.ps1
```

5. Commit, push, and let Cloudflare run the production build.

## Notes

Business calculators are mathematical planning tools, not accounting or financial advice. Time-zone tools rely on browser `Intl` support and named-zone daylight-saving rules. Image/SVG processing runs locally in the browser. The ICO-to-PNG converter supports ICO files containing PNG-compressed image entries; older BMP-style ICO entries are not decoded.
