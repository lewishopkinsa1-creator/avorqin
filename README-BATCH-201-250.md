# Avorqin Batch 201-250

This overlay adds **50 new Avorqin tools** (tools 201-250) without replacing the existing 200-tool project.

## What is included

- 30 Finance & Business calculators
- 10 SEO / technical marketing tools
- 10 JSON / CSV / YAML data tools
- One shared browser-side component for the batch
- 50 individual Next.js routes (one indexable URL per tool)
- Tool metadata for all 50 tools
- An installer that patches the existing tool registry and category landing pages
- A verification script

The existing sitemap already builds tool URLs from `lib/tools-data.ts`, so once the batch is added to that registry the 50 URLs are included automatically.

## Install

1. Copy/extract the contents of this folder into the root of the current Avorqin repository. Keep the folder structure (`app`, `components`, `lib`, `scripts`).
2. From the Avorqin repo root run:

```bash
node scripts/install-batch-201-250.mjs
node scripts/verify-batch-201-250.mjs
npm run build
```

3. If the build succeeds, commit and push the changes as usual.

## Safety of the installer

The installer is additive. It imports `batch201To250Tools` into the existing registry and appends slugs to the existing Finance, SEO, JSON, Formatters, and Converters category lists. It checks for existing entries before inserting them so it can be run more than once without intentionally duplicating the batch.

## Important calculation notes

Financial results are planning estimates, not financial advice. The Rent vs Buy calculation is deliberately labeled as a simplified comparison. APR is estimated from equal periodic payments. The JSON Schema validator covers common keywords but is not a complete implementation of every JSON Schema draft feature. The YAML validator checks common syntax/indentation problems without adding a new dependency.

## Tool list

201. **Auto Loan Calculator** — `/tools/auto-loan-calculator/`
202. **Credit Card Payoff Calculator** — `/tools/credit-card-payoff-calculator/`
203. **Debt Payoff Calculator** — `/tools/debt-payoff-calculator/`
204. **Debt Snowball Calculator** — `/tools/debt-snowball-calculator/`
205. **Debt Avalanche Calculator** — `/tools/debt-avalanche-calculator/`
206. **APR Calculator** — `/tools/apr-calculator/`
207. **APY Calculator** — `/tools/apy-calculator/`
208. **Debt-to-Income Ratio Calculator** — `/tools/debt-to-income-ratio-calculator/`
209. **Loan Amortization Calculator** — `/tools/loan-amortization-calculator/`
210. **Rule of 72 Calculator** — `/tools/rule-of-72-calculator/`
211. **Rent vs Buy Calculator** — `/tools/rent-vs-buy-calculator/`
212. **Down Payment Calculator** — `/tools/down-payment-calculator/`
213. **Mortgage Refinance Calculator** — `/tools/mortgage-refinance-calculator/`
214. **Biweekly Mortgage Calculator** — `/tools/biweekly-mortgage-calculator/`
215. **Credit Card Interest Calculator** — `/tools/credit-card-interest-calculator/`
216. **Credit Card Minimum Payment Calculator** — `/tools/credit-card-minimum-payment-calculator/`
217. **Pay Raise Calculator** — `/tools/pay-raise-calculator/`
218. **Overtime Pay Calculator** — `/tools/overtime-pay-calculator/`
219. **Freelance Rate Calculator** — `/tools/freelance-rate-calculator/`
220. **Cost Per Unit Calculator** — `/tools/cost-per-unit-calculator/`
221. **Unit Price Calculator** — `/tools/unit-price-calculator/`
222. **Price Per Square Foot Calculator** — `/tools/price-per-square-foot-calculator/`
223. **Revenue Growth Calculator** — `/tools/revenue-growth-calculator/`
224. **Customer Acquisition Cost Calculator** — `/tools/customer-acquisition-cost-calculator/`
225. **Customer Lifetime Value Calculator** — `/tools/customer-lifetime-value-calculator/`
226. **ROAS Calculator** — `/tools/roas-calculator/`
227. **CPM Calculator** — `/tools/cpm-calculator/`
228. **CPC Calculator** — `/tools/cpc-calculator/`
229. **CPA Calculator** — `/tools/cpa-calculator/`
230. **Conversion Rate Calculator** — `/tools/conversion-rate-calculator/`
231. **Title Tag Length Checker** — `/tools/title-tag-length-checker/`
232. **Meta Description Length Checker** — `/tools/meta-description-length-checker/`
233. **Canonical Tag Generator** — `/tools/canonical-tag-generator/`
234. **Meta Robots Tag Generator** — `/tools/meta-robots-tag-generator/`
235. **Hreflang Validator** — `/tools/hreflang-validator/`
236. **JSON-LD Validator** — `/tools/json-ld-validator/`
237. **XML Sitemap Validator** — `/tools/xml-sitemap-validator/`
238. **Sitemap URL Extractor** — `/tools/sitemap-url-extractor/`
239. **Redirect Rule Generator** — `/tools/redirect-rule-generator/`
240. **UTM Decoder** — `/tools/utm-decoder/`
241. **JSON Schema Validator** — `/tools/json-schema-validator/`
242. **JSON Escape / Unescape Tool** — `/tools/json-escape-unescape/`
243. **JSON String Converter** — `/tools/json-string-converter/`
244. **CSV Formatter** — `/tools/csv-formatter/`
245. **CSV Column Extractor** — `/tools/csv-column-extractor/`
246. **CSV Duplicate Remover** — `/tools/csv-duplicate-remover/`
247. **CSV Sorter** — `/tools/csv-sorter/`
248. **TSV to CSV Converter** — `/tools/tsv-to-csv/`
249. **CSV to TSV Converter** — `/tools/csv-to-tsv/`
250. **YAML Validator** — `/tools/yaml-validator/`
