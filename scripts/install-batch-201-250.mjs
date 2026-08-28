import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const toolsFile = path.join(root, "lib", "tools-data.ts");
const categoriesFile = path.join(root, "lib", "tool-categories.ts");

function read(file) {
  if (!fs.existsSync(file)) {
    throw new Error(`Missing ${path.relative(root, file)}`);
  }
  return fs.readFileSync(file, "utf8");
}

function writeIfChanged(file, before, after) {
  if (before === after) {
    console.log(`No changes needed in ${path.relative(root, file)}`);
    return;
  }
  fs.writeFileSync(file, after, "utf8");
  console.log(`Updated ${path.relative(root, file)}`);
}

function patchTools(source) {
  const importLine = 'import { batch201To250Tools } from "@/lib/tools-data-batch-201-250";';
  let next = source;

  if (!next.includes(importLine)) {
    next = `${importLine}\n${next}`;
  }

  if (!next.includes("...batch201To250Tools")) {
    const marker = "\n];\n\nexport function getToolBySlug";
    const at = next.lastIndexOf(marker);
    if (at < 0) {
      throw new Error(
        "Could not find the end of the consolidated tools array in lib/tools-data.ts. No files were changed."
      );
    }
    next = `${next.slice(0, at)}\n  ...batch201To250Tools,${next.slice(at)}`;
  }

  return next;
}

function addToCategory(source, categorySlug, slugs) {
  const slugToken = `slug: "${categorySlug}"`;
  const objStart = source.indexOf(slugToken);
  if (objStart < 0) {
    throw new Error(
      `Category ${categorySlug} was not found in lib/tool-categories.ts. No files were changed.`
    );
  }

  const listStart = source.indexOf("toolSlugs: [", objStart);
  if (listStart < 0) {
    throw new Error(
      `toolSlugs list missing for ${categorySlug}. No files were changed.`
    );
  }

  const listEnd = source.indexOf("    ],", listStart);
  if (listEnd < 0) {
    throw new Error(
      `Could not find end of toolSlugs for ${categorySlug}. No files were changed.`
    );
  }

  const block = source.slice(listStart, listEnd);
  const missing = slugs.filter((slug) => !block.includes(`"${slug}"`));
  if (!missing.length) return source;

  const insertion = missing
    .map((slug) => `      "${slug}",`)
    .join("\n") + "\n";

  return source.slice(0, listEnd) + insertion + source.slice(listEnd);
}

function patchCategories(source) {
  let next = source;

  next = addToCategory(next, "finance", [
    "auto-loan-calculator",
    "credit-card-payoff-calculator",
    "debt-payoff-calculator",
    "debt-snowball-calculator",
    "debt-avalanche-calculator",
    "apr-calculator",
    "apy-calculator",
    "debt-to-income-ratio-calculator",
    "loan-amortization-calculator",
    "rule-of-72-calculator",
    "rent-vs-buy-calculator",
    "down-payment-calculator",
    "mortgage-refinance-calculator",
    "biweekly-mortgage-calculator",
    "credit-card-interest-calculator",
    "credit-card-minimum-payment-calculator",
    "pay-raise-calculator",
    "overtime-pay-calculator",
    "freelance-rate-calculator",
    "cost-per-unit-calculator",
    "unit-price-calculator",
    "price-per-square-foot-calculator",
    "revenue-growth-calculator",
    "customer-acquisition-cost-calculator",
    "customer-lifetime-value-calculator",
    "roas-calculator",
    "cpm-calculator",
    "cpc-calculator",
    "cpa-calculator",
    "conversion-rate-calculator",
  ]);

  next = addToCategory(next, "seo", [
    "title-tag-length-checker",
    "meta-description-length-checker",
    "canonical-tag-generator",
    "meta-robots-tag-generator",
    "hreflang-validator",
    "json-ld-validator",
    "xml-sitemap-validator",
    "sitemap-url-extractor",
    "redirect-rule-generator",
    "utm-decoder",
  ]);

  next = addToCategory(next, "json", [
    "json-schema-validator",
    "json-escape-unescape",
    "json-string-converter",
    "csv-formatter",
    "csv-column-extractor",
    "csv-duplicate-remover",
    "csv-sorter",
    "tsv-to-csv",
    "csv-to-tsv",
    "yaml-validator",
  ]);

  next = addToCategory(next, "formatters", [
    "csv-formatter",
    "yaml-validator",
  ]);

  next = addToCategory(next, "converters", [
    "tsv-to-csv",
    "csv-to-tsv",
  ]);

  return next;
}

// Build both patches in memory first. If either source shape is unexpected,
// the script throws before writing either existing project file.
const originalTools = read(toolsFile);
const originalCategories = read(categoriesFile);
const patchedTools = patchTools(originalTools);
const patchedCategories = patchCategories(originalCategories);

writeIfChanged(toolsFile, originalTools, patchedTools);
writeIfChanged(categoriesFile, originalCategories, patchedCategories);

console.log("Batch 201-250 registry/category installation complete.");
console.log("Next: node scripts/verify-batch-201-250.mjs && npm run build");
