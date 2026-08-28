import fs from "node:fs";
import path from "node:path";

const slugs = [
  "auto-loan-calculator", "credit-card-payoff-calculator", "debt-payoff-calculator", "debt-snowball-calculator", "debt-avalanche-calculator", "apr-calculator", "apy-calculator", "debt-to-income-ratio-calculator", "loan-amortization-calculator", "rule-of-72-calculator",
  "rent-vs-buy-calculator", "down-payment-calculator", "mortgage-refinance-calculator", "biweekly-mortgage-calculator", "credit-card-interest-calculator", "credit-card-minimum-payment-calculator", "pay-raise-calculator", "overtime-pay-calculator", "freelance-rate-calculator", "cost-per-unit-calculator",
  "unit-price-calculator", "price-per-square-foot-calculator", "revenue-growth-calculator", "customer-acquisition-cost-calculator", "customer-lifetime-value-calculator", "roas-calculator", "cpm-calculator", "cpc-calculator", "cpa-calculator", "conversion-rate-calculator",
  "title-tag-length-checker", "meta-description-length-checker", "canonical-tag-generator", "meta-robots-tag-generator", "hreflang-validator", "json-ld-validator", "xml-sitemap-validator", "sitemap-url-extractor", "redirect-rule-generator", "utm-decoder",
  "json-schema-validator", "json-escape-unescape", "json-string-converter", "csv-formatter", "csv-column-extractor", "csv-duplicate-remover", "csv-sorter", "tsv-to-csv", "csv-to-tsv", "yaml-validator",
];

const expectedCategories = {
  finance: slugs.slice(0, 30),
  seo: slugs.slice(30, 40),
  json: slugs.slice(40, 50),
  formatters: ["csv-formatter", "yaml-validator"],
  converters: ["tsv-to-csv", "csv-to-tsv"],
};

const root = process.cwd();
const missing = [];

for (const slug of slugs) {
  const file = path.join(root, "app", "tools", slug, "page.tsx");
  if (!fs.existsSync(file)) missing.push(`route missing: ${slug}`);
}

const toolsPath = path.join(root, "lib", "tools-data.ts");
const batchPath = path.join(root, "lib", "tools-data-batch-201-250.ts");
const categoriesPath = path.join(root, "lib", "tool-categories.ts");

for (const required of [toolsPath, batchPath, categoriesPath]) {
  if (!fs.existsSync(required)) missing.push(`file missing: ${path.relative(root, required)}`);
}

if (!missing.length) {
  const tools = fs.readFileSync(toolsPath, "utf8");
  if (!tools.includes("...batch201To250Tools")) {
    missing.push("lib/tools-data.ts missing ...batch201To250Tools");
  }

  const batch = fs.readFileSync(batchPath, "utf8");
  for (const slug of slugs) {
    const count = batch.split(`slug: "${slug}"`).length - 1;
    if (count !== 1) missing.push(`metadata count for ${slug} is ${count}, expected 1`);
  }

  const categories = fs.readFileSync(categoriesPath, "utf8");
  for (const [category, categorySlugs] of Object.entries(expectedCategories)) {
    const start = categories.indexOf(`slug: "${category}"`);
    const end = start >= 0 ? categories.indexOf("    ],", categories.indexOf("toolSlugs: [", start)) : -1;
    if (start < 0 || end < 0) {
      missing.push(`category structure missing: ${category}`);
      continue;
    }
    const block = categories.slice(start, end);
    for (const slug of categorySlugs) {
      if (!block.includes(`"${slug}"`)) missing.push(`${category} category missing ${slug}`);
    }
  }
}

if (missing.length) {
  console.error("Batch verification failed:");
  for (const item of missing) console.error(" -", item);
  process.exit(1);
}

console.log(`Batch 201-250 verification passed: ${slugs.length} routes, metadata entries, registry hook, and category links found.`);
