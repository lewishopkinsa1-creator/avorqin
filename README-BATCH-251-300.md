# Avorqin Batch 251–300

This package adds 50 browser-based Avorqin tools, numbered 251 through 300.

## Install on Windows (same workflow as Batch 201–250)

1. Extract this ZIP.
2. Drag **everything inside** the extracted `avorqin-batch-251-300` folder into the root of your Avorqin repository.
3. In VS Code, open a PowerShell terminal in the Avorqin root.
4. Run:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\install-batch-251-300.ps1
```

5. The installer updates only `lib/tools-data.ts` and `lib/tool-categories.ts`, and it is safe to run more than once.
6. Commit and push. If Node/npm is available locally, you can additionally run `node scripts/verify-batch-251-300.mjs` and `npm run build`; otherwise Cloudflare can perform the production build after the push.

## Expected GitHub Desktop change count

Immediately after copying this package into a clean repo state: **58 new files**.
After the PowerShell installer runs successfully: **60 changes** (the 58 package files plus modifications to `lib/tools-data.ts` and `lib/tool-categories.ts`).

## Tools

- 251. **HTML Tag Stripper** — `/tools/html-tag-stripper/`
- 252. **HTML Table Generator** — `/tools/html-table-generator/`
- 253. **HTML Table to CSV Converter** — `/tools/html-table-to-csv/`
- 254. **CSV to HTML Table Converter** — `/tools/csv-to-html-table/`
- 255. **CSS Specificity Calculator** — `/tools/css-specificity-calculator/`
- 256. **CSS Clamp Calculator** — `/tools/css-clamp-calculator/`
- 257. **CSS Box Shadow Generator** — `/tools/css-box-shadow-generator/`
- 258. **CSS Border Radius Generator** — `/tools/css-border-radius-generator/`
- 259. **CSS Flexbox Generator** — `/tools/css-flexbox-generator/`
- 260. **CSS Grid Generator** — `/tools/css-grid-generator/`
- 261. **IPv4 to Integer Converter** — `/tools/ipv4-to-integer/`
- 262. **Integer to IPv4 Converter** — `/tools/integer-to-ipv4/`
- 263. **IPv6 Compressor** — `/tools/ipv6-compressor/`
- 264. **IPv6 Expander** — `/tools/ipv6-expander/`
- 265. **MAC Address Validator** — `/tools/mac-address-validator/`
- 266. **Domain Name Parser** — `/tools/domain-name-parser/`
- 267. **Port Number Lookup** — `/tools/port-number-lookup/`
- 268. **HTTP Header Parser** — `/tools/http-header-parser/`
- 269. **Cookie Parser** — `/tools/cookie-parser/`
- 270. **Content Security Policy Generator** — `/tools/csp-generator/`
- 271. **Reading Time Calculator** — `/tools/reading-time-calculator/`
- 272. **Speaking Time Calculator** — `/tools/speaking-time-calculator/`
- 273. **Word Frequency Counter** — `/tools/word-frequency-counter/`
- 274. **Character Frequency Counter** — `/tools/character-frequency-counter/`
- 275. **Invisible Character Detector** — `/tools/invisible-character-detector/`
- 276. **Unicode Character Inspector** — `/tools/unicode-character-inspector/`
- 277. **Unicode Escape Converter** — `/tools/unicode-escape-converter/`
- 278. **Diacritic Remover** — `/tools/diacritic-remover/`
- 279. **Add Line Numbers** — `/tools/add-line-numbers/`
- 280. **Remove Line Numbers** — `/tools/remove-line-numbers/`
- 281. **Prime Number Checker** — `/tools/prime-number-checker/`
- 282. **Prime Factorization Calculator** — `/tools/prime-factorization-calculator/`
- 283. **Percentage Error Calculator** — `/tools/percentage-error-calculator/`
- 284. **Permutation Calculator** — `/tools/permutation-calculator/`
- 285. **Combination Calculator** — `/tools/combination-calculator/`
- 286. **Probability Calculator** — `/tools/probability-calculator/`
- 287. **Z Score Calculator** — `/tools/z-score-calculator/`
- 288. **Weighted Average Calculator** — `/tools/weighted-average-calculator/`
- 289. **Geometric Mean Calculator** — `/tools/geometric-mean-calculator/`
- 290. **Harmonic Mean Calculator** — `/tools/harmonic-mean-calculator/`
- 291. **Triangle Calculator** — `/tools/triangle-calculator/`
- 292. **Circle Calculator** — `/tools/circle-calculator/`
- 293. **Rectangle Calculator** — `/tools/rectangle-calculator/`
- 294. **Cylinder Volume Calculator** — `/tools/cylinder-volume-calculator/`
- 295. **Sphere Volume Calculator** — `/tools/sphere-volume-calculator/`
- 296. **Cone Volume Calculator** — `/tools/cone-volume-calculator/`
- 297. **Ohm's Law Calculator** — `/tools/ohms-law-calculator/`
- 298. **Voltage Divider Calculator** — `/tools/voltage-divider-calculator/`
- 299. **Resistor Color Code Calculator** — `/tools/resistor-color-code-calculator/`
- 300. **LED Resistor Calculator** — `/tools/led-resistor-calculator/`
