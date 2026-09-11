"use client";

import { useMemo, useState } from "react";

export type Batch7591008Kind = "json-to-php-array-converter"
  | "php-array-to-json-converter"
  | "json-to-python-dict-converter"
  | "python-dict-to-json-converter"
  | "json-to-csharp-class-generator"
  | "json-to-java-class-generator"
  | "json-to-go-struct-generator"
  | "json-to-rust-struct-generator"
  | "json-to-kotlin-data-class-generator"
  | "json-to-swift-codable-generator"
  | "csv-to-markdown-table-converter"
  | "markdown-table-to-csv-converter"
  | "html-table-to-markdown-converter"
  | "markdown-table-to-html-converter"
  | "sql-to-csv-converter"
  | "csv-to-jsonl-converter"
  | "jsonl-to-csv-converter"
  | "jsonl-formatter"
  | "jsonl-validator"
  | "yaml-to-xml-converter"
  | "xml-to-yaml-converter"
  | "env-to-json-converter"
  | "json-to-env-converter"
  | "properties-to-json-converter"
  | "json-to-properties-converter"
  | "regex-escape-tool"
  | "cron-next-run-calculator"
  | "semantic-version-comparator"
  | "semantic-version-bump-calculator"
  | "cache-control-header-builder"
  | "cors-header-generator"
  | "csp-header-parser"
  | "htaccess-redirect-generator"
  | "nginx-redirect-generator"
  | "ip-range-calculator"
  | "cidr-to-ip-range-converter"
  | "ipv6-subnet-calculator"
  | "dns-ttl-converter"
  | "dns-record-parser"
  | "base32-encoder"
  | "base32-decoder"
  | "base58-encoder"
  | "base58-decoder"
  | "tsv-to-json-converter"
  | "json-to-tsv-converter"
  | "csv-to-yaml-converter"
  | "yaml-to-csv-converter"
  | "json-pointer-tester"
  | "json-patch-generator"
  | "json-merge-patch-tool"
  | "http-basic-auth-header-generator"
  | "content-disposition-header-generator"
  | "url-query-parameter-sorter"
  | "url-normalizer"
  | "sql-create-table-generator"
  | "cap-rate-calculator"
  | "cash-on-cash-return-calculator"
  | "rental-property-roi-calculator"
  | "rental-yield-calculator"
  | "gross-rent-multiplier-calculator"
  | "loan-to-value-calculator"
  | "home-equity-calculator"
  | "sinking-fund-calculator"
  | "bond-yield-calculator"
  | "bond-price-calculator"
  | "dividend-yield-calculator"
  | "dividend-reinvestment-calculator"
  | "stock-average-calculator"
  | "risk-reward-ratio-calculator"
  | "pe-ratio-calculator"
  | "peg-ratio-calculator"
  | "earnings-per-share-calculator"
  | "return-on-assets-calculator"
  | "return-on-equity-calculator"
  | "npv-calculator"
  | "irr-calculator"
  | "mirr-calculator"
  | "wacc-calculator"
  | "capm-calculator"
  | "sharpe-ratio-calculator"
  | "sortino-ratio-calculator"
  | "cash-ratio-calculator"
  | "interest-coverage-ratio-calculator"
  | "asset-turnover-calculator"
  | "cash-conversion-cycle-calculator"
  | "root-mean-square-calculator"
  | "sum-of-squares-calculator"
  | "t-statistic-calculator"
  | "p-value-calculator"
  | "chi-square-calculator"
  | "one-way-anova-calculator"
  | "hypergeometric-calculator"
  | "poisson-distribution-calculator"
  | "exponential-distribution-calculator"
  | "uniform-distribution-calculator"
  | "beta-distribution-calculator"
  | "gamma-distribution-calculator"
  | "weibull-distribution-calculator"
  | "lognormal-distribution-calculator"
  | "geometric-distribution-calculator"
  | "negative-binomial-calculator"
  | "mean-absolute-deviation-calculator"
  | "median-absolute-deviation-calculator"
  | "weighted-standard-deviation-calculator"
  | "root-mean-square-error-calculator"
  | "mean-absolute-error-calculator"
  | "mape-calculator"
  | "r-squared-calculator"
  | "vector-magnitude-calculator"
  | "dot-product-calculator"
  | "cross-product-calculator"
  | "complex-number-calculator"
  | "polynomial-degree-calculator"
  | "skewness-calculator"
  | "kurtosis-calculator"
  | "weighted-variance-calculator"
  | "matrix-trace-calculator"
  | "matrix-transpose-calculator"
  | "vector-angle-calculator"
  | "cosine-similarity-calculator"
  | "force-calculator"
  | "acceleration-calculator"
  | "momentum-calculator"
  | "impulse-calculator"
  | "kinetic-energy-calculator"
  | "potential-energy-calculator"
  | "work-calculator"
  | "mechanical-power-calculator"
  | "lever-torque-calculator"
  | "pressure-force-area-calculator"
  | "density-calculator"
  | "specific-gravity-calculator"
  | "buoyancy-calculator"
  | "reynolds-number-calculator"
  | "bernoulli-equation-calculator"
  | "hydraulic-power-calculator"
  | "pump-power-calculator"
  | "pipe-flow-rate-calculator"
  | "heat-transfer-calculator"
  | "thermal-expansion-calculator"
  | "lumber-weight-calculator"
  | "lumber-cost-calculator"
  | "stair-stringer-calculator"
  | "rebar-weight-calculator"
  | "rebar-spacing-calculator"
  | "tile-layout-calculator"
  | "ceiling-tile-calculator"
  | "door-rough-opening-calculator"
  | "fence-picket-spacing-calculator"
  | "stair-baluster-spacing-calculator"
  | "wheelchair-ramp-length-calculator"
  | "landscape-fabric-calculator"
  | "acoustic-panel-calculator"
  | "cabinet-linear-feet-calculator"
  | "countertop-square-footage-calculator"
  | "grade-curve-calculator"
  | "attendance-percentage-calculator"
  | "credit-hour-calculator"
  | "course-load-calculator"
  | "study-time-calculator"
  | "study-schedule-calculator"
  | "reading-speed-calculator"
  | "apa-citation-generator"
  | "mla-citation-generator"
  | "chicago-citation-generator"
  | "harvard-citation-generator"
  | "ieee-citation-generator"
  | "bibtex-entry-generator"
  | "vancouver-citation-generator"
  | "ama-citation-generator"
  | "net-revenue-retention-calculator"
  | "gross-revenue-retention-calculator"
  | "revenue-churn-calculator"
  | "expansion-mrr-calculator"
  | "contraction-mrr-calculator"
  | "net-new-mrr-calculator"
  | "saas-magic-number-calculator"
  | "rule-of-40-calculator"
  | "saas-quick-ratio-calculator"
  | "average-revenue-per-account-calculator"
  | "net-promoter-score-calculator"
  | "marketing-efficiency-ratio-calculator"
  | "saas-burn-multiple-calculator"
  | "average-contract-value-calculator"
  | "trial-conversion-rate-calculator"
  | "time-card-calculator"
  | "shift-length-calculator"
  | "overtime-hours-calculator"
  | "decimal-hours-calculator"
  | "date-midpoint-calculator"
  | "nth-weekday-calculator"
  | "fiscal-quarter-calculator"
  | "quarter-end-date-calculator"
  | "unix-nanoseconds-converter"
  | "iso-duration-calculator"
  | "mpg-calculator"
  | "fuel-cost-calculator"
  | "cost-per-mile-calculator"
  | "tire-size-calculator"
  | "speedometer-error-calculator"
  | "wheel-offset-calculator"
  | "wheel-backspacing-calculator"
  | "gear-ratio-calculator"
  | "rpm-speed-calculator"
  | "engine-displacement-calculator"
  | "compression-ratio-calculator"
  | "horsepower-to-weight-ratio-calculator"
  | "torque-to-horsepower-calculator"
  | "horsepower-to-torque-calculator"
  | "quarter-mile-horsepower-calculator"
  | "vehicle-depreciation-calculator"
  | "lease-mileage-calculator"
  | "ev-charging-time-calculator"
  | "ev-charging-cost-calculator"
  | "ev-range-calculator"
  | "piston-speed-calculator"
  | "wheel-torque-calculator"
  | "stopping-distance-calculator"
  | "vehicle-weight-distribution-calculator"
  | "trailer-tongue-weight-calculator"
  | "recipe-scaling-calculator"
  | "recipe-cost-calculator"
  | "bakers-percentage-calculator"
  | "dough-hydration-calculator"
  | "pizza-dough-calculator"
  | "bread-dough-calculator"
  | "sourdough-starter-feeding-calculator"
  | "coffee-ratio-calculator"
  | "cold-brew-ratio-calculator"
  | "rice-water-ratio-calculator"
  | "brine-percentage-calculator"
  | "food-cost-percentage-calculator"
  | "yeast-conversion-calculator"
  | "dough-ball-weight-calculator"
  | "cake-pan-conversion-calculator"
  | "crop-factor-calculator"
  | "equivalent-focal-length-calculator"
  | "field-of-view-calculator"
  | "hyperfocal-distance-calculator"
  | "depth-of-field-calculator"
  | "exposure-value-calculator"
  | "shutter-speed-stops-calculator"
  | "nd-filter-calculator"
  | "timelapse-calculator"
  | "video-bitrate-calculator"
  | "video-file-size-calculator"
  | "audio-file-size-calculator"
  | "recording-time-calculator"
  | "frame-count-calculator"
  | "frames-to-timecode-converter";

type Field = { key:string; label:string; type?:"number"|"input"|"textarea"; placeholder?:string; defaultValue?:string };
type ToolConfig = { fields:Field[]; button?:string; note?:string };
type ResultItem = { label:string; value:string; note?:string };
type ToolResult = { output?:string; summary?:ResultItem[] };

const CONFIG: Record<Batch7591008Kind, ToolConfig> = {
  "json-to-php-array-converter": {
    "fields": [
      {
        "key": "input",
        "label": "Input",
        "type": "textarea",
        "placeholder": "Paste source data here..."
      }
    ],
    "button": "Convert"
  },
  "php-array-to-json-converter": {
    "fields": [
      {
        "key": "input",
        "label": "Input",
        "type": "textarea",
        "placeholder": "Paste source data here..."
      }
    ],
    "button": "Convert"
  },
  "json-to-python-dict-converter": {
    "fields": [
      {
        "key": "input",
        "label": "Input",
        "type": "textarea",
        "placeholder": "Paste source data here..."
      }
    ],
    "button": "Convert"
  },
  "python-dict-to-json-converter": {
    "fields": [
      {
        "key": "input",
        "label": "Input",
        "type": "textarea",
        "placeholder": "Paste source data here..."
      }
    ],
    "button": "Convert"
  },
  "json-to-csharp-class-generator": {
    "fields": [
      {
        "key": "input",
        "label": "Input",
        "type": "textarea",
        "placeholder": "Paste source data here..."
      }
    ],
    "button": "Convert"
  },
  "json-to-java-class-generator": {
    "fields": [
      {
        "key": "input",
        "label": "Input",
        "type": "textarea",
        "placeholder": "Paste source data here..."
      }
    ],
    "button": "Convert"
  },
  "json-to-go-struct-generator": {
    "fields": [
      {
        "key": "input",
        "label": "Input",
        "type": "textarea",
        "placeholder": "Paste source data here..."
      }
    ],
    "button": "Convert"
  },
  "json-to-rust-struct-generator": {
    "fields": [
      {
        "key": "input",
        "label": "Input",
        "type": "textarea",
        "placeholder": "Paste source data here..."
      }
    ],
    "button": "Convert"
  },
  "json-to-kotlin-data-class-generator": {
    "fields": [
      {
        "key": "input",
        "label": "Input",
        "type": "textarea",
        "placeholder": "Paste source data here..."
      }
    ],
    "button": "Convert"
  },
  "json-to-swift-codable-generator": {
    "fields": [
      {
        "key": "input",
        "label": "Input",
        "type": "textarea",
        "placeholder": "Paste source data here..."
      }
    ],
    "button": "Convert"
  },
  "csv-to-markdown-table-converter": {
    "fields": [
      {
        "key": "input",
        "label": "Input",
        "type": "textarea",
        "placeholder": "Paste source data here..."
      }
    ],
    "button": "Convert"
  },
  "markdown-table-to-csv-converter": {
    "fields": [
      {
        "key": "input",
        "label": "Input",
        "type": "textarea",
        "placeholder": "Paste source data here..."
      }
    ],
    "button": "Convert"
  },
  "html-table-to-markdown-converter": {
    "fields": [
      {
        "key": "input",
        "label": "Input",
        "type": "textarea",
        "placeholder": "Paste source data here..."
      }
    ],
    "button": "Convert"
  },
  "markdown-table-to-html-converter": {
    "fields": [
      {
        "key": "input",
        "label": "Input",
        "type": "textarea",
        "placeholder": "Paste source data here..."
      }
    ],
    "button": "Convert"
  },
  "sql-to-csv-converter": {
    "fields": [
      {
        "key": "input",
        "label": "Input",
        "type": "textarea",
        "placeholder": "Paste source data here..."
      }
    ],
    "button": "Convert"
  },
  "csv-to-jsonl-converter": {
    "fields": [
      {
        "key": "input",
        "label": "Input",
        "type": "textarea",
        "placeholder": "Paste source data here..."
      }
    ],
    "button": "Convert"
  },
  "jsonl-to-csv-converter": {
    "fields": [
      {
        "key": "input",
        "label": "Input",
        "type": "textarea",
        "placeholder": "Paste source data here..."
      }
    ],
    "button": "Convert"
  },
  "jsonl-formatter": {
    "fields": [
      {
        "key": "input",
        "label": "Input",
        "type": "textarea",
        "placeholder": "Paste source data here..."
      }
    ],
    "button": "Convert"
  },
  "jsonl-validator": {
    "fields": [
      {
        "key": "input",
        "label": "Input",
        "type": "textarea",
        "placeholder": "Paste source data here..."
      }
    ],
    "button": "Convert"
  },
  "yaml-to-xml-converter": {
    "fields": [
      {
        "key": "input",
        "label": "Input",
        "type": "textarea",
        "placeholder": "Paste source data here..."
      }
    ],
    "button": "Convert"
  },
  "xml-to-yaml-converter": {
    "fields": [
      {
        "key": "input",
        "label": "Input",
        "type": "textarea",
        "placeholder": "Paste source data here..."
      }
    ],
    "button": "Convert"
  },
  "env-to-json-converter": {
    "fields": [
      {
        "key": "input",
        "label": "Input",
        "type": "textarea",
        "placeholder": "Paste source data here..."
      }
    ],
    "button": "Convert"
  },
  "json-to-env-converter": {
    "fields": [
      {
        "key": "input",
        "label": "Input",
        "type": "textarea",
        "placeholder": "Paste source data here..."
      }
    ],
    "button": "Convert"
  },
  "properties-to-json-converter": {
    "fields": [
      {
        "key": "input",
        "label": "Input",
        "type": "textarea",
        "placeholder": "Paste source data here..."
      }
    ],
    "button": "Convert"
  },
  "json-to-properties-converter": {
    "fields": [
      {
        "key": "input",
        "label": "Input",
        "type": "textarea",
        "placeholder": "Paste source data here..."
      }
    ],
    "button": "Convert"
  },
  "regex-escape-tool": {
    "fields": [
      {
        "key": "input",
        "label": "Input",
        "type": "textarea"
      }
    ],
    "button": "Convert"
  },
  "cron-next-run-calculator": {
    "fields": [
      {
        "key": "cron",
        "label": "Cron expression",
        "type": "input",
        "defaultValue": "0 9 * * *"
      }
    ],
    "button": "Calculate next run"
  },
  "semantic-version-comparator": {
    "fields": [
      {
        "key": "a",
        "label": "Version A",
        "type": "input",
        "defaultValue": "1.2.3"
      },
      {
        "key": "b",
        "label": "Version B",
        "type": "input",
        "defaultValue": "1.3.0"
      }
    ],
    "button": "Compare"
  },
  "semantic-version-bump-calculator": {
    "fields": [
      {
        "key": "version",
        "label": "Current version",
        "type": "input",
        "defaultValue": "1.2.3"
      },
      {
        "key": "bump",
        "label": "Bump type (major, minor, patch)",
        "type": "input",
        "defaultValue": "patch"
      }
    ],
    "button": "Calculate"
  },
  "cache-control-header-builder": {
    "fields": [
      {
        "key": "input",
        "label": "Input / values",
        "type": "textarea",
        "placeholder": "Enter the source values or configuration..."
      }
    ],
    "button": "Generate"
  },
  "cors-header-generator": {
    "fields": [
      {
        "key": "input",
        "label": "Input / values",
        "type": "textarea",
        "placeholder": "Enter the source values or configuration..."
      }
    ],
    "button": "Generate"
  },
  "csp-header-parser": {
    "fields": [
      {
        "key": "input",
        "label": "Input",
        "type": "textarea",
        "placeholder": "Paste source data here..."
      }
    ],
    "button": "Convert"
  },
  "htaccess-redirect-generator": {
    "fields": [
      {
        "key": "input",
        "label": "Input / values",
        "type": "textarea",
        "placeholder": "Enter the source values or configuration..."
      }
    ],
    "button": "Generate"
  },
  "nginx-redirect-generator": {
    "fields": [
      {
        "key": "input",
        "label": "Input / values",
        "type": "textarea",
        "placeholder": "Enter the source values or configuration..."
      }
    ],
    "button": "Generate"
  },
  "ip-range-calculator": {
    "fields": [
      {
        "key": "input",
        "label": "Input",
        "type": "textarea",
        "placeholder": "Enter the value to inspect or convert..."
      }
    ],
    "button": "Run"
  },
  "cidr-to-ip-range-converter": {
    "fields": [
      {
        "key": "input",
        "label": "Input",
        "type": "textarea",
        "placeholder": "Enter the value to inspect or convert..."
      }
    ],
    "button": "Run"
  },
  "ipv6-subnet-calculator": {
    "fields": [
      {
        "key": "input",
        "label": "Input",
        "type": "textarea",
        "placeholder": "Enter the value to inspect or convert..."
      }
    ],
    "button": "Run"
  },
  "dns-ttl-converter": {
    "fields": [
      {
        "key": "seconds",
        "label": "TTL seconds",
        "type": "number",
        "defaultValue": "3600"
      }
    ],
    "button": "Convert"
  },
  "dns-record-parser": {
    "fields": [
      {
        "key": "input",
        "label": "Input",
        "type": "textarea",
        "placeholder": "Enter the value to inspect or convert..."
      }
    ],
    "button": "Run"
  },
  "base32-encoder": {
    "fields": [
      {
        "key": "input",
        "label": "Input",
        "type": "textarea"
      }
    ],
    "button": "Convert"
  },
  "base32-decoder": {
    "fields": [
      {
        "key": "input",
        "label": "Input",
        "type": "textarea"
      }
    ],
    "button": "Convert"
  },
  "base58-encoder": {
    "fields": [
      {
        "key": "input",
        "label": "Input",
        "type": "textarea"
      }
    ],
    "button": "Convert"
  },
  "base58-decoder": {
    "fields": [
      {
        "key": "input",
        "label": "Input",
        "type": "textarea"
      }
    ],
    "button": "Convert"
  },
  "tsv-to-json-converter": {
    "fields": [
      {
        "key": "input",
        "label": "Input",
        "type": "textarea",
        "placeholder": "Paste source data here..."
      }
    ],
    "button": "Convert"
  },
  "json-to-tsv-converter": {
    "fields": [
      {
        "key": "input",
        "label": "Input",
        "type": "textarea",
        "placeholder": "Paste source data here..."
      }
    ],
    "button": "Convert"
  },
  "csv-to-yaml-converter": {
    "fields": [
      {
        "key": "input",
        "label": "Input",
        "type": "textarea",
        "placeholder": "Paste source data here..."
      }
    ],
    "button": "Convert"
  },
  "yaml-to-csv-converter": {
    "fields": [
      {
        "key": "input",
        "label": "Input",
        "type": "textarea",
        "placeholder": "Paste source data here..."
      }
    ],
    "button": "Convert"
  },
  "json-pointer-tester": {
    "fields": [
      {
        "key": "json",
        "label": "JSON",
        "type": "textarea",
        "defaultValue": "{\"user\":{\"name\":\"Ada\"}}"
      },
      {
        "key": "pointer",
        "label": "JSON Pointer",
        "type": "input",
        "defaultValue": "/user/name"
      }
    ],
    "button": "Test pointer"
  },
  "json-patch-generator": {
    "fields": [
      {
        "key": "source",
        "label": "Source JSON",
        "type": "textarea",
        "defaultValue": "{\"a\":1}"
      },
      {
        "key": "target",
        "label": "Target JSON",
        "type": "textarea",
        "defaultValue": "{\"a\":2}"
      }
    ],
    "button": "Generate"
  },
  "json-merge-patch-tool": {
    "fields": [
      {
        "key": "source",
        "label": "Source JSON",
        "type": "textarea",
        "defaultValue": "{\"a\":1}"
      },
      {
        "key": "target",
        "label": "Target JSON",
        "type": "textarea",
        "defaultValue": "{\"a\":2}"
      }
    ],
    "button": "Generate"
  },
  "http-basic-auth-header-generator": {
    "fields": [
      {
        "key": "username",
        "label": "Username",
        "type": "input"
      },
      {
        "key": "password",
        "label": "Password",
        "type": "input"
      }
    ],
    "button": "Generate"
  },
  "content-disposition-header-generator": {
    "fields": [
      {
        "key": "input",
        "label": "Input / values",
        "type": "textarea",
        "placeholder": "Enter the source values or configuration..."
      }
    ],
    "button": "Generate"
  },
  "url-query-parameter-sorter": {
    "fields": [
      {
        "key": "input",
        "label": "Input",
        "type": "textarea"
      }
    ],
    "button": "Convert"
  },
  "url-normalizer": {
    "fields": [
      {
        "key": "input",
        "label": "Input",
        "type": "textarea"
      }
    ],
    "button": "Convert"
  },
  "sql-create-table-generator": {
    "fields": [
      {
        "key": "input",
        "label": "Input / values",
        "type": "textarea",
        "placeholder": "Enter the source values or configuration..."
      }
    ],
    "button": "Generate"
  },
  "cap-rate-calculator": {
    "fields": [
      {
        "key": "noi",
        "label": "Annual net operating income ($)",
        "type": "number"
      },
      {
        "key": "value",
        "label": "Property value ($)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "cash-on-cash-return-calculator": {
    "fields": [
      {
        "key": "cashflow",
        "label": "Annual pre-tax cash flow ($)",
        "type": "number"
      },
      {
        "key": "cash",
        "label": "Cash invested ($)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "rental-property-roi-calculator": {
    "fields": [
      {
        "key": "gain",
        "label": "Annual profit ($)",
        "type": "number"
      },
      {
        "key": "investment",
        "label": "Total investment ($)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "rental-yield-calculator": {
    "fields": [
      {
        "key": "rent",
        "label": "Annual rent ($)",
        "type": "number"
      },
      {
        "key": "value",
        "label": "Property value ($)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "gross-rent-multiplier-calculator": {
    "fields": [
      {
        "key": "value",
        "label": "Property price ($)",
        "type": "number"
      },
      {
        "key": "rent",
        "label": "Annual gross rent ($)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "loan-to-value-calculator": {
    "fields": [
      {
        "key": "loan",
        "label": "Loan amount ($)",
        "type": "number"
      },
      {
        "key": "value",
        "label": "Property value ($)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "home-equity-calculator": {
    "fields": [
      {
        "key": "value",
        "label": "Home value ($)",
        "type": "number"
      },
      {
        "key": "balance",
        "label": "Mortgage balance ($)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "sinking-fund-calculator": {
    "fields": [
      {
        "key": "target",
        "label": "Target amount ($)",
        "type": "number"
      },
      {
        "key": "rate",
        "label": "Annual interest rate (%)",
        "type": "number",
        "defaultValue": "5"
      },
      {
        "key": "years",
        "label": "Years",
        "type": "number",
        "defaultValue": "10"
      },
      {
        "key": "payments",
        "label": "Payments per year",
        "type": "number",
        "defaultValue": "12"
      }
    ],
    "button": "Calculate"
  },
  "bond-yield-calculator": {
    "fields": [
      {
        "key": "coupon",
        "label": "Annual coupon ($)",
        "type": "number"
      },
      {
        "key": "price",
        "label": "Bond price ($)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "bond-price-calculator": {
    "fields": [
      {
        "key": "face",
        "label": "Face value ($)",
        "type": "number",
        "defaultValue": "1000"
      },
      {
        "key": "couponRate",
        "label": "Coupon rate (%)",
        "type": "number",
        "defaultValue": "5"
      },
      {
        "key": "marketRate",
        "label": "Market yield (%)",
        "type": "number",
        "defaultValue": "6"
      },
      {
        "key": "years",
        "label": "Years",
        "type": "number",
        "defaultValue": "10"
      }
    ],
    "button": "Calculate"
  },
  "dividend-yield-calculator": {
    "fields": [
      {
        "key": "dividend",
        "label": "Annual dividend per share ($)",
        "type": "number"
      },
      {
        "key": "price",
        "label": "Share price ($)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "dividend-reinvestment-calculator": {
    "fields": [
      {
        "key": "shares",
        "label": "Starting shares",
        "type": "number"
      },
      {
        "key": "price",
        "label": "Share price ($)",
        "type": "number"
      },
      {
        "key": "dividend",
        "label": "Annual dividend/share ($)",
        "type": "number"
      },
      {
        "key": "years",
        "label": "Years",
        "type": "number",
        "defaultValue": "10"
      }
    ],
    "button": "Calculate"
  },
  "stock-average-calculator": {
    "fields": [
      {
        "key": "shares1",
        "label": "Shares - purchase 1",
        "type": "number"
      },
      {
        "key": "price1",
        "label": "Price - purchase 1 ($)",
        "type": "number"
      },
      {
        "key": "shares2",
        "label": "Shares - purchase 2",
        "type": "number"
      },
      {
        "key": "price2",
        "label": "Price - purchase 2 ($)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "risk-reward-ratio-calculator": {
    "fields": [
      {
        "key": "entry",
        "label": "Entry price",
        "type": "number"
      },
      {
        "key": "stop",
        "label": "Stop price",
        "type": "number"
      },
      {
        "key": "target",
        "label": "Target price",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "pe-ratio-calculator": {
    "fields": [
      {
        "key": "price",
        "label": "Share price ($)",
        "type": "number"
      },
      {
        "key": "eps",
        "label": "Earnings per share ($)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "peg-ratio-calculator": {
    "fields": [
      {
        "key": "pe",
        "label": "P/E ratio",
        "type": "number"
      },
      {
        "key": "growth",
        "label": "Earnings growth rate (%)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "earnings-per-share-calculator": {
    "fields": [
      {
        "key": "income",
        "label": "Net income ($)",
        "type": "number"
      },
      {
        "key": "preferred",
        "label": "Preferred dividends ($)",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "key": "shares",
        "label": "Weighted average shares",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "return-on-assets-calculator": {
    "fields": [
      {
        "key": "income",
        "label": "Net income ($)",
        "type": "number"
      },
      {
        "key": "assets",
        "label": "Average total assets ($)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "return-on-equity-calculator": {
    "fields": [
      {
        "key": "income",
        "label": "Net income ($)",
        "type": "number"
      },
      {
        "key": "equity",
        "label": "Average shareholder equity ($)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "npv-calculator": {
    "fields": [
      {
        "key": "investment",
        "label": "Initial investment ($)",
        "type": "number"
      },
      {
        "key": "cashflows",
        "label": "Annual cash flows, comma-separated",
        "type": "input",
        "defaultValue": "3000,3000,3000,3000,3000"
      },
      {
        "key": "rate",
        "label": "Discount rate (%)",
        "type": "number",
        "defaultValue": "8"
      }
    ],
    "button": "Calculate"
  },
  "irr-calculator": {
    "fields": [
      {
        "key": "cashflows",
        "label": "Cash flows incl. initial, comma-separated",
        "type": "input",
        "defaultValue": "-10000,3000,3500,4000,4500"
      }
    ],
    "button": "Calculate"
  },
  "mirr-calculator": {
    "fields": [
      {
        "key": "cashflows",
        "label": "Cash flows incl. initial, comma-separated",
        "type": "input",
        "defaultValue": "-10000,3000,3500,4000,4500"
      },
      {
        "key": "financeRate",
        "label": "Finance rate (%)",
        "type": "number",
        "defaultValue": "6"
      },
      {
        "key": "reinvestRate",
        "label": "Reinvestment rate (%)",
        "type": "number",
        "defaultValue": "8"
      }
    ],
    "button": "Calculate"
  },
  "wacc-calculator": {
    "fields": [
      {
        "key": "equity",
        "label": "Equity value",
        "type": "number"
      },
      {
        "key": "debt",
        "label": "Debt value",
        "type": "number"
      },
      {
        "key": "costEquity",
        "label": "Cost of equity (%)",
        "type": "number"
      },
      {
        "key": "costDebt",
        "label": "Cost of debt (%)",
        "type": "number"
      },
      {
        "key": "tax",
        "label": "Tax rate (%)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "capm-calculator": {
    "fields": [
      {
        "key": "riskFree",
        "label": "Risk-free rate (%)",
        "type": "number"
      },
      {
        "key": "beta",
        "label": "Beta",
        "type": "number"
      },
      {
        "key": "market",
        "label": "Expected market return (%)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "sharpe-ratio-calculator": {
    "fields": [
      {
        "key": "return",
        "label": "Portfolio return (%)",
        "type": "number"
      },
      {
        "key": "riskFree",
        "label": "Risk-free rate (%)",
        "type": "number"
      },
      {
        "key": "sd",
        "label": "Portfolio std. deviation (%)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "sortino-ratio-calculator": {
    "fields": [
      {
        "key": "return",
        "label": "Portfolio return (%)",
        "type": "number"
      },
      {
        "key": "target",
        "label": "Target/risk-free return (%)",
        "type": "number"
      },
      {
        "key": "downside",
        "label": "Downside deviation (%)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "cash-ratio-calculator": {
    "fields": [
      {
        "key": "cash",
        "label": "Cash & equivalents ($)",
        "type": "number"
      },
      {
        "key": "liabilities",
        "label": "Current liabilities ($)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "interest-coverage-ratio-calculator": {
    "fields": [
      {
        "key": "ebit",
        "label": "EBIT ($)",
        "type": "number"
      },
      {
        "key": "interest",
        "label": "Interest expense ($)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "asset-turnover-calculator": {
    "fields": [
      {
        "key": "sales",
        "label": "Net sales ($)",
        "type": "number"
      },
      {
        "key": "assets",
        "label": "Average total assets ($)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "cash-conversion-cycle-calculator": {
    "fields": [
      {
        "key": "dio",
        "label": "Days inventory outstanding",
        "type": "number"
      },
      {
        "key": "dso",
        "label": "Days sales outstanding",
        "type": "number"
      },
      {
        "key": "dpo",
        "label": "Days payables outstanding",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "median-absolute-deviation-calculator": {
    "fields": [
      {
        "key": "values",
        "label": "Values, comma-separated",
        "type": "input",
        "defaultValue": "1,2,3,4,5"
      }
    ],
    "button": "Calculate"
  },
  "mean-absolute-deviation-calculator": {
    "fields": [
      {
        "key": "values",
        "label": "Values, comma-separated",
        "type": "input",
        "defaultValue": "1,2,3,4,5"
      }
    ],
    "button": "Calculate"
  },
  "polynomial-degree-calculator": {
    "fields": [
      {
        "key": "values",
        "label": "Values, comma-separated",
        "type": "input",
        "defaultValue": "1,2,3,4,5"
      }
    ],
    "button": "Calculate"
  },
  "skewness-calculator": {
    "fields": [
      {
        "key": "values",
        "label": "Values, comma-separated",
        "type": "input",
        "defaultValue": "1,2,3,4,5"
      }
    ],
    "button": "Calculate"
  },
  "kurtosis-calculator": {
    "fields": [
      {
        "key": "values",
        "label": "Values, comma-separated",
        "type": "input",
        "defaultValue": "1,2,3,4,5"
      }
    ],
    "button": "Calculate"
  },
  "sum-of-squares-calculator": {
    "fields": [
      {
        "key": "values",
        "label": "Values, comma-separated",
        "type": "input",
        "defaultValue": "1,2,3,4,5"
      }
    ],
    "button": "Calculate"
  },
  "root-mean-square-calculator": {
    "fields": [
      {
        "key": "values",
        "label": "Values, comma-separated",
        "type": "input",
        "defaultValue": "1,2,3,4,5"
      }
    ],
    "button": "Calculate"
  },
  "weighted-standard-deviation-calculator": {
    "fields": [
      {
        "key": "values",
        "label": "Values, comma-separated",
        "type": "input",
        "defaultValue": "10,20,30"
      },
      {
        "key": "weights",
        "label": "Weights, comma-separated",
        "type": "input",
        "defaultValue": "1,2,1"
      }
    ],
    "button": "Calculate"
  },
  "weighted-variance-calculator": {
    "fields": [
      {
        "key": "values",
        "label": "Values, comma-separated",
        "type": "input",
        "defaultValue": "10,20,30"
      },
      {
        "key": "weights",
        "label": "Weights, comma-separated",
        "type": "input",
        "defaultValue": "1,2,1"
      }
    ],
    "button": "Calculate"
  },
  "root-mean-square-error-calculator": {
    "fields": [
      {
        "key": "actual",
        "label": "Actual values",
        "type": "input",
        "defaultValue": "10,20,30"
      },
      {
        "key": "predicted",
        "label": "Predicted values",
        "type": "input",
        "defaultValue": "11,19,29"
      }
    ],
    "button": "Calculate"
  },
  "mean-absolute-error-calculator": {
    "fields": [
      {
        "key": "actual",
        "label": "Actual values",
        "type": "input",
        "defaultValue": "10,20,30"
      },
      {
        "key": "predicted",
        "label": "Predicted values",
        "type": "input",
        "defaultValue": "11,19,29"
      }
    ],
    "button": "Calculate"
  },
  "mape-calculator": {
    "fields": [
      {
        "key": "actual",
        "label": "Actual values",
        "type": "input",
        "defaultValue": "10,20,30"
      },
      {
        "key": "predicted",
        "label": "Predicted values",
        "type": "input",
        "defaultValue": "11,19,29"
      }
    ],
    "button": "Calculate"
  },
  "r-squared-calculator": {
    "fields": [
      {
        "key": "actual",
        "label": "Actual values",
        "type": "input",
        "defaultValue": "10,20,30"
      },
      {
        "key": "predicted",
        "label": "Predicted values",
        "type": "input",
        "defaultValue": "11,19,29"
      }
    ],
    "button": "Calculate"
  },
  "t-statistic-calculator": {
    "fields": [
      {
        "key": "mean",
        "label": "Sample mean",
        "type": "number"
      },
      {
        "key": "mu",
        "label": "Hypothesized mean",
        "type": "number"
      },
      {
        "key": "sd",
        "label": "Sample standard deviation",
        "type": "number"
      },
      {
        "key": "n",
        "label": "Sample size",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "p-value-calculator": {
    "fields": [
      {
        "key": "z",
        "label": "Z score",
        "type": "number"
      }
    ],
    "button": "Calculate",
    "note": "Returns a two-tailed p-value from a standard normal approximation."
  },
  "chi-square-calculator": {
    "fields": [
      {
        "key": "observed",
        "label": "Observed values",
        "type": "input",
        "defaultValue": "20,30,50"
      },
      {
        "key": "expected",
        "label": "Expected values",
        "type": "input",
        "defaultValue": "25,25,50"
      }
    ],
    "button": "Calculate"
  },
  "one-way-anova-calculator": {
    "fields": [
      {
        "key": "groups",
        "label": "Groups separated by semicolons",
        "type": "textarea",
        "defaultValue": "1,2,3;2,3,4;5,6,7"
      }
    ],
    "button": "Calculate"
  },
  "hypergeometric-calculator": {
    "fields": [
      {
        "key": "N",
        "label": "Population size",
        "type": "number"
      },
      {
        "key": "K",
        "label": "Successes in population",
        "type": "number"
      },
      {
        "key": "n",
        "label": "Draws",
        "type": "number"
      },
      {
        "key": "k",
        "label": "Observed successes",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "poisson-distribution-calculator": {
    "fields": [
      {
        "key": "lambda",
        "label": "Average rate λ",
        "type": "number"
      },
      {
        "key": "k",
        "label": "Events k",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "exponential-distribution-calculator": {
    "fields": [
      {
        "key": "lambda",
        "label": "Rate λ",
        "type": "number"
      },
      {
        "key": "x",
        "label": "Value x",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "uniform-distribution-calculator": {
    "fields": [
      {
        "key": "a",
        "label": "Minimum a",
        "type": "number"
      },
      {
        "key": "b",
        "label": "Maximum b",
        "type": "number"
      },
      {
        "key": "x",
        "label": "Value x",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "beta-distribution-calculator": {
    "fields": [
      {
        "key": "alpha",
        "label": "Alpha",
        "type": "number"
      },
      {
        "key": "beta",
        "label": "Beta",
        "type": "number"
      },
      {
        "key": "x",
        "label": "x (0 to 1)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "gamma-distribution-calculator": {
    "fields": [
      {
        "key": "shape",
        "label": "Shape k",
        "type": "number"
      },
      {
        "key": "scale",
        "label": "Scale θ",
        "type": "number"
      },
      {
        "key": "x",
        "label": "x",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "weibull-distribution-calculator": {
    "fields": [
      {
        "key": "shape",
        "label": "Shape k",
        "type": "number"
      },
      {
        "key": "scale",
        "label": "Scale λ",
        "type": "number"
      },
      {
        "key": "x",
        "label": "x",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "lognormal-distribution-calculator": {
    "fields": [
      {
        "key": "mu",
        "label": "μ",
        "type": "number"
      },
      {
        "key": "sigma",
        "label": "σ",
        "type": "number"
      },
      {
        "key": "x",
        "label": "x",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "geometric-distribution-calculator": {
    "fields": [
      {
        "key": "p",
        "label": "Success probability p",
        "type": "number",
        "defaultValue": "0.5"
      },
      {
        "key": "k",
        "label": "Trial number k",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "negative-binomial-calculator": {
    "fields": [
      {
        "key": "r",
        "label": "Required successes r",
        "type": "number"
      },
      {
        "key": "p",
        "label": "Success probability p",
        "type": "number",
        "defaultValue": "0.5"
      },
      {
        "key": "k",
        "label": "Failures k",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "vector-magnitude-calculator": {
    "fields": [
      {
        "key": "vector",
        "label": "Vector components",
        "type": "input",
        "defaultValue": "3,4"
      }
    ],
    "button": "Calculate"
  },
  "dot-product-calculator": {
    "fields": [
      {
        "key": "a",
        "label": "Vector A",
        "type": "input",
        "defaultValue": "1,2,3"
      },
      {
        "key": "b",
        "label": "Vector B",
        "type": "input",
        "defaultValue": "4,5,6"
      }
    ],
    "button": "Calculate"
  },
  "cross-product-calculator": {
    "fields": [
      {
        "key": "a",
        "label": "Vector A (3D)",
        "type": "input",
        "defaultValue": "1,0,0"
      },
      {
        "key": "b",
        "label": "Vector B (3D)",
        "type": "input",
        "defaultValue": "0,1,0"
      }
    ],
    "button": "Calculate"
  },
  "complex-number-calculator": {
    "fields": [
      {
        "key": "a",
        "label": "Real part A",
        "type": "number"
      },
      {
        "key": "b",
        "label": "Imaginary part A",
        "type": "number"
      },
      {
        "key": "c",
        "label": "Real part B",
        "type": "number"
      },
      {
        "key": "d",
        "label": "Imaginary part B",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "matrix-trace-calculator": {
    "fields": [
      {
        "key": "matrix",
        "label": "Square matrix rows; commas within rows",
        "type": "textarea",
        "defaultValue": "1,2;3,4"
      }
    ],
    "button": "Calculate"
  },
  "matrix-transpose-calculator": {
    "fields": [
      {
        "key": "matrix",
        "label": "Matrix rows; commas within rows",
        "type": "textarea",
        "defaultValue": "1,2,3;4,5,6"
      }
    ],
    "button": "Calculate"
  },
  "vector-angle-calculator": {
    "fields": [
      {
        "key": "a",
        "label": "Vector A",
        "type": "input",
        "defaultValue": "1,0"
      },
      {
        "key": "b",
        "label": "Vector B",
        "type": "input",
        "defaultValue": "0,1"
      }
    ],
    "button": "Calculate"
  },
  "cosine-similarity-calculator": {
    "fields": [
      {
        "key": "a",
        "label": "Vector A",
        "type": "input",
        "defaultValue": "1,2,3"
      },
      {
        "key": "b",
        "label": "Vector B",
        "type": "input",
        "defaultValue": "2,4,6"
      }
    ],
    "button": "Calculate"
  },
  "force-calculator": {
    "fields": [
      {
        "key": "m",
        "label": "Mass (kg)",
        "type": "number"
      },
      {
        "key": "a",
        "label": "Acceleration (m/s²)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "acceleration-calculator": {
    "fields": [
      {
        "key": "v0",
        "label": "Initial velocity (m/s)",
        "type": "number"
      },
      {
        "key": "v1",
        "label": "Final velocity (m/s)",
        "type": "number"
      },
      {
        "key": "t",
        "label": "Time (s)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "momentum-calculator": {
    "fields": [
      {
        "key": "m",
        "label": "Mass (kg)",
        "type": "number"
      },
      {
        "key": "v",
        "label": "Velocity (m/s)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "impulse-calculator": {
    "fields": [
      {
        "key": "f",
        "label": "Force (N)",
        "type": "number"
      },
      {
        "key": "t",
        "label": "Time (s)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "kinetic-energy-calculator": {
    "fields": [
      {
        "key": "m",
        "label": "Mass (kg)",
        "type": "number"
      },
      {
        "key": "v",
        "label": "Velocity (m/s)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "potential-energy-calculator": {
    "fields": [
      {
        "key": "m",
        "label": "Mass (kg)",
        "type": "number"
      },
      {
        "key": "h",
        "label": "Height (m)",
        "type": "number"
      },
      {
        "key": "g",
        "label": "Gravity (m/s²)",
        "type": "number",
        "defaultValue": "9.80665"
      }
    ],
    "button": "Calculate"
  },
  "work-calculator": {
    "fields": [
      {
        "key": "f",
        "label": "Force (N)",
        "type": "number"
      },
      {
        "key": "d",
        "label": "Distance (m)",
        "type": "number"
      },
      {
        "key": "angle",
        "label": "Angle (degrees)",
        "type": "number",
        "defaultValue": "0"
      }
    ],
    "button": "Calculate"
  },
  "mechanical-power-calculator": {
    "fields": [
      {
        "key": "work",
        "label": "Work (J)",
        "type": "number"
      },
      {
        "key": "time",
        "label": "Time (s)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "lever-torque-calculator": {
    "fields": [
      {
        "key": "force",
        "label": "Force (N)",
        "type": "number"
      },
      {
        "key": "arm",
        "label": "Lever arm (m)",
        "type": "number"
      },
      {
        "key": "angle",
        "label": "Angle (degrees)",
        "type": "number",
        "defaultValue": "90"
      }
    ],
    "button": "Calculate"
  },
  "pressure-force-area-calculator": {
    "fields": [
      {
        "key": "pressure",
        "label": "Pressure (Pa)",
        "type": "number"
      },
      {
        "key": "area",
        "label": "Area (m²)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "density-calculator": {
    "fields": [
      {
        "key": "mass",
        "label": "Mass",
        "type": "number"
      },
      {
        "key": "volume",
        "label": "Volume",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "specific-gravity-calculator": {
    "fields": [
      {
        "key": "density",
        "label": "Material density",
        "type": "number"
      },
      {
        "key": "reference",
        "label": "Reference density",
        "type": "number",
        "defaultValue": "1000"
      }
    ],
    "button": "Calculate"
  },
  "buoyancy-calculator": {
    "fields": [
      {
        "key": "rho",
        "label": "Fluid density (kg/m³)",
        "type": "number",
        "defaultValue": "1000"
      },
      {
        "key": "volume",
        "label": "Displaced volume (m³)",
        "type": "number"
      },
      {
        "key": "g",
        "label": "Gravity (m/s²)",
        "type": "number",
        "defaultValue": "9.80665"
      }
    ],
    "button": "Calculate"
  },
  "reynolds-number-calculator": {
    "fields": [
      {
        "key": "rho",
        "label": "Fluid density (kg/m³)",
        "type": "number",
        "defaultValue": "1000"
      },
      {
        "key": "v",
        "label": "Velocity (m/s)",
        "type": "number"
      },
      {
        "key": "length",
        "label": "Characteristic length (m)",
        "type": "number"
      },
      {
        "key": "mu",
        "label": "Dynamic viscosity (Pa·s)",
        "type": "number",
        "defaultValue": "0.001"
      }
    ],
    "button": "Calculate"
  },
  "bernoulli-equation-calculator": {
    "fields": [
      {
        "key": "p",
        "label": "Pressure (Pa)",
        "type": "number"
      },
      {
        "key": "rho",
        "label": "Density (kg/m³)",
        "type": "number",
        "defaultValue": "1000"
      },
      {
        "key": "v",
        "label": "Velocity (m/s)",
        "type": "number"
      },
      {
        "key": "h",
        "label": "Height (m)",
        "type": "number"
      },
      {
        "key": "g",
        "label": "Gravity",
        "type": "number",
        "defaultValue": "9.80665"
      }
    ],
    "button": "Calculate"
  },
  "hydraulic-power-calculator": {
    "fields": [
      {
        "key": "pressure",
        "label": "Pressure (Pa)",
        "type": "number"
      },
      {
        "key": "flow",
        "label": "Flow rate (m³/s)",
        "type": "number"
      },
      {
        "key": "eff",
        "label": "Efficiency (%)",
        "type": "number",
        "defaultValue": "85"
      }
    ],
    "button": "Calculate"
  },
  "pump-power-calculator": {
    "fields": [
      {
        "key": "rho",
        "label": "Fluid density (kg/m³)",
        "type": "number",
        "defaultValue": "1000"
      },
      {
        "key": "flow",
        "label": "Flow rate (m³/s)",
        "type": "number"
      },
      {
        "key": "head",
        "label": "Head (m)",
        "type": "number"
      },
      {
        "key": "eff",
        "label": "Efficiency (%)",
        "type": "number",
        "defaultValue": "80"
      }
    ],
    "button": "Calculate"
  },
  "pipe-flow-rate-calculator": {
    "fields": [
      {
        "key": "diameter",
        "label": "Inside diameter (m)",
        "type": "number"
      },
      {
        "key": "velocity",
        "label": "Flow velocity (m/s)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "heat-transfer-calculator": {
    "fields": [
      {
        "key": "u",
        "label": "Overall heat-transfer coefficient (W/m²K)",
        "type": "number"
      },
      {
        "key": "area",
        "label": "Area (m²)",
        "type": "number"
      },
      {
        "key": "dt",
        "label": "Temperature difference (K)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "thermal-expansion-calculator": {
    "fields": [
      {
        "key": "length",
        "label": "Original length",
        "type": "number"
      },
      {
        "key": "alpha",
        "label": "Expansion coefficient (per °C)",
        "type": "number",
        "defaultValue": "0.000012"
      },
      {
        "key": "dt",
        "label": "Temperature change (°C)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "lumber-weight-calculator": {
    "fields": [
      {
        "key": "volume",
        "label": "Lumber volume (ft³)",
        "type": "number"
      },
      {
        "key": "density",
        "label": "Density (lb/ft³)",
        "type": "number",
        "defaultValue": "35"
      }
    ],
    "button": "Calculate"
  },
  "lumber-cost-calculator": {
    "fields": [
      {
        "key": "boardFeet",
        "label": "Board feet",
        "type": "number"
      },
      {
        "key": "price",
        "label": "Price per board foot ($)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "stair-stringer-calculator": {
    "fields": [
      {
        "key": "rise",
        "label": "Total rise (in)",
        "type": "number"
      },
      {
        "key": "run",
        "label": "Total run (in)",
        "type": "number"
      },
      {
        "key": "steps",
        "label": "Number of steps",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "rebar-weight-calculator": {
    "fields": [
      {
        "key": "diameter",
        "label": "Bar diameter (mm)",
        "type": "number"
      },
      {
        "key": "length",
        "label": "Total length (m)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "rebar-spacing-calculator": {
    "fields": [
      {
        "key": "span",
        "label": "Span length",
        "type": "number"
      },
      {
        "key": "spacing",
        "label": "Desired spacing",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "tile-layout-calculator": {
    "fields": [
      {
        "key": "roomLength",
        "label": "Room length (ft)",
        "type": "number"
      },
      {
        "key": "roomWidth",
        "label": "Room width (ft)",
        "type": "number"
      },
      {
        "key": "tileLength",
        "label": "Tile length (in)",
        "type": "number"
      },
      {
        "key": "tileWidth",
        "label": "Tile width (in)",
        "type": "number"
      },
      {
        "key": "waste",
        "label": "Waste (%)",
        "type": "number",
        "defaultValue": "10"
      }
    ],
    "button": "Calculate"
  },
  "ceiling-tile-calculator": {
    "fields": [
      {
        "key": "length",
        "label": "Ceiling length (ft)",
        "type": "number"
      },
      {
        "key": "width",
        "label": "Ceiling width (ft)",
        "type": "number"
      },
      {
        "key": "tileArea",
        "label": "Tile area (ft²)",
        "type": "number",
        "defaultValue": "4"
      },
      {
        "key": "waste",
        "label": "Waste (%)",
        "type": "number",
        "defaultValue": "10"
      }
    ],
    "button": "Calculate"
  },
  "door-rough-opening-calculator": {
    "fields": [
      {
        "key": "doorWidth",
        "label": "Door width (in)",
        "type": "number"
      },
      {
        "key": "doorHeight",
        "label": "Door height (in)",
        "type": "number"
      },
      {
        "key": "widthAllowance",
        "label": "Width allowance (in)",
        "type": "number",
        "defaultValue": "2"
      },
      {
        "key": "heightAllowance",
        "label": "Height allowance (in)",
        "type": "number",
        "defaultValue": "2.5"
      }
    ],
    "button": "Calculate"
  },
  "fence-picket-spacing-calculator": {
    "fields": [
      {
        "key": "section",
        "label": "Fence section width (in)",
        "type": "number"
      },
      {
        "key": "picket",
        "label": "Picket width (in)",
        "type": "number"
      },
      {
        "key": "gap",
        "label": "Desired gap (in)",
        "type": "number",
        "defaultValue": "2"
      }
    ],
    "button": "Calculate"
  },
  "stair-baluster-spacing-calculator": {
    "fields": [
      {
        "key": "opening",
        "label": "Opening width (in)",
        "type": "number"
      },
      {
        "key": "baluster",
        "label": "Baluster width (in)",
        "type": "number",
        "defaultValue": "1.5"
      },
      {
        "key": "maxGap",
        "label": "Maximum gap (in)",
        "type": "number",
        "defaultValue": "4"
      }
    ],
    "button": "Calculate"
  },
  "wheelchair-ramp-length-calculator": {
    "fields": [
      {
        "key": "rise",
        "label": "Rise (in)",
        "type": "number"
      },
      {
        "key": "ratio",
        "label": "Run per 1 rise",
        "type": "number",
        "defaultValue": "12"
      }
    ],
    "button": "Calculate"
  },
  "landscape-fabric-calculator": {
    "fields": [
      {
        "key": "length",
        "label": "Area length (ft)",
        "type": "number"
      },
      {
        "key": "width",
        "label": "Area width (ft)",
        "type": "number"
      },
      {
        "key": "rollWidth",
        "label": "Roll width (ft)",
        "type": "number",
        "defaultValue": "4"
      },
      {
        "key": "overlap",
        "label": "Overlap/waste (%)",
        "type": "number",
        "defaultValue": "10"
      }
    ],
    "button": "Calculate"
  },
  "acoustic-panel-calculator": {
    "fields": [
      {
        "key": "roomLength",
        "label": "Room length (ft)",
        "type": "number"
      },
      {
        "key": "roomWidth",
        "label": "Room width (ft)",
        "type": "number"
      },
      {
        "key": "roomHeight",
        "label": "Room height (ft)",
        "type": "number"
      },
      {
        "key": "coverage",
        "label": "Target wall coverage (%)",
        "type": "number",
        "defaultValue": "20"
      },
      {
        "key": "panelArea",
        "label": "Panel area (ft²)",
        "type": "number",
        "defaultValue": "8"
      }
    ],
    "button": "Calculate"
  },
  "cabinet-linear-feet-calculator": {
    "fields": [
      {
        "key": "wall1",
        "label": "Wall/cabinet run 1 (ft)",
        "type": "number"
      },
      {
        "key": "wall2",
        "label": "Run 2 (ft)",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "key": "wall3",
        "label": "Run 3 (ft)",
        "type": "number",
        "defaultValue": "0"
      }
    ],
    "button": "Calculate"
  },
  "countertop-square-footage-calculator": {
    "fields": [
      {
        "key": "length",
        "label": "Countertop length (in)",
        "type": "number"
      },
      {
        "key": "depth",
        "label": "Countertop depth (in)",
        "type": "number",
        "defaultValue": "25.5"
      },
      {
        "key": "pieces",
        "label": "Number of sections",
        "type": "number",
        "defaultValue": "1"
      }
    ],
    "button": "Calculate"
  },
  "apa-citation-generator": {
    "fields": [
      {
        "key": "author",
        "label": "Author",
        "type": "input",
        "defaultValue": "Ada Lovelace"
      },
      {
        "key": "title",
        "label": "Title",
        "type": "input",
        "defaultValue": "Example Article"
      },
      {
        "key": "source",
        "label": "Publication / site",
        "type": "input",
        "defaultValue": "Example Journal"
      },
      {
        "key": "year",
        "label": "Year",
        "type": "input",
        "defaultValue": "2026"
      },
      {
        "key": "url",
        "label": "URL",
        "type": "input",
        "defaultValue": "https://example.com"
      }
    ],
    "button": "Generate citation"
  },
  "mla-citation-generator": {
    "fields": [
      {
        "key": "author",
        "label": "Author",
        "type": "input",
        "defaultValue": "Ada Lovelace"
      },
      {
        "key": "title",
        "label": "Title",
        "type": "input",
        "defaultValue": "Example Article"
      },
      {
        "key": "source",
        "label": "Publication / site",
        "type": "input",
        "defaultValue": "Example Journal"
      },
      {
        "key": "year",
        "label": "Year",
        "type": "input",
        "defaultValue": "2026"
      },
      {
        "key": "url",
        "label": "URL",
        "type": "input",
        "defaultValue": "https://example.com"
      }
    ],
    "button": "Generate citation"
  },
  "chicago-citation-generator": {
    "fields": [
      {
        "key": "author",
        "label": "Author",
        "type": "input",
        "defaultValue": "Ada Lovelace"
      },
      {
        "key": "title",
        "label": "Title",
        "type": "input",
        "defaultValue": "Example Article"
      },
      {
        "key": "source",
        "label": "Publication / site",
        "type": "input",
        "defaultValue": "Example Journal"
      },
      {
        "key": "year",
        "label": "Year",
        "type": "input",
        "defaultValue": "2026"
      },
      {
        "key": "url",
        "label": "URL",
        "type": "input",
        "defaultValue": "https://example.com"
      }
    ],
    "button": "Generate citation"
  },
  "harvard-citation-generator": {
    "fields": [
      {
        "key": "author",
        "label": "Author",
        "type": "input",
        "defaultValue": "Ada Lovelace"
      },
      {
        "key": "title",
        "label": "Title",
        "type": "input",
        "defaultValue": "Example Article"
      },
      {
        "key": "source",
        "label": "Publication / site",
        "type": "input",
        "defaultValue": "Example Journal"
      },
      {
        "key": "year",
        "label": "Year",
        "type": "input",
        "defaultValue": "2026"
      },
      {
        "key": "url",
        "label": "URL",
        "type": "input",
        "defaultValue": "https://example.com"
      }
    ],
    "button": "Generate citation"
  },
  "ieee-citation-generator": {
    "fields": [
      {
        "key": "author",
        "label": "Author",
        "type": "input",
        "defaultValue": "Ada Lovelace"
      },
      {
        "key": "title",
        "label": "Title",
        "type": "input",
        "defaultValue": "Example Article"
      },
      {
        "key": "source",
        "label": "Publication / site",
        "type": "input",
        "defaultValue": "Example Journal"
      },
      {
        "key": "year",
        "label": "Year",
        "type": "input",
        "defaultValue": "2026"
      },
      {
        "key": "url",
        "label": "URL",
        "type": "input",
        "defaultValue": "https://example.com"
      }
    ],
    "button": "Generate citation"
  },
  "bibtex-entry-generator": {
    "fields": [
      {
        "key": "author",
        "label": "Author",
        "type": "input",
        "defaultValue": "Ada Lovelace"
      },
      {
        "key": "title",
        "label": "Title",
        "type": "input",
        "defaultValue": "Example Article"
      },
      {
        "key": "source",
        "label": "Publication / site",
        "type": "input",
        "defaultValue": "Example Journal"
      },
      {
        "key": "year",
        "label": "Year",
        "type": "input",
        "defaultValue": "2026"
      },
      {
        "key": "url",
        "label": "URL",
        "type": "input",
        "defaultValue": "https://example.com"
      }
    ],
    "button": "Generate citation"
  },
  "vancouver-citation-generator": {
    "fields": [
      {
        "key": "author",
        "label": "Author",
        "type": "input",
        "defaultValue": "Ada Lovelace"
      },
      {
        "key": "title",
        "label": "Title",
        "type": "input",
        "defaultValue": "Example Article"
      },
      {
        "key": "source",
        "label": "Publication / site",
        "type": "input",
        "defaultValue": "Example Journal"
      },
      {
        "key": "year",
        "label": "Year",
        "type": "input",
        "defaultValue": "2026"
      },
      {
        "key": "url",
        "label": "URL",
        "type": "input",
        "defaultValue": "https://example.com"
      }
    ],
    "button": "Generate citation"
  },
  "ama-citation-generator": {
    "fields": [
      {
        "key": "author",
        "label": "Author",
        "type": "input",
        "defaultValue": "Ada Lovelace"
      },
      {
        "key": "title",
        "label": "Title",
        "type": "input",
        "defaultValue": "Example Article"
      },
      {
        "key": "source",
        "label": "Publication / site",
        "type": "input",
        "defaultValue": "Example Journal"
      },
      {
        "key": "year",
        "label": "Year",
        "type": "input",
        "defaultValue": "2026"
      },
      {
        "key": "url",
        "label": "URL",
        "type": "input",
        "defaultValue": "https://example.com"
      }
    ],
    "button": "Generate citation"
  },
  "grade-curve-calculator": {
    "fields": [
      {
        "key": "score",
        "label": "Raw score",
        "type": "number"
      },
      {
        "key": "curve",
        "label": "Curve points",
        "type": "number",
        "defaultValue": "5"
      },
      {
        "key": "max",
        "label": "Maximum score",
        "type": "number",
        "defaultValue": "100"
      }
    ],
    "button": "Calculate"
  },
  "attendance-percentage-calculator": {
    "fields": [
      {
        "key": "attended",
        "label": "Classes attended",
        "type": "number"
      },
      {
        "key": "total",
        "label": "Total classes",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "credit-hour-calculator": {
    "fields": [
      {
        "key": "courses",
        "label": "Number of courses",
        "type": "number"
      },
      {
        "key": "credits",
        "label": "Average credits per course",
        "type": "number",
        "defaultValue": "3"
      }
    ],
    "button": "Calculate"
  },
  "course-load-calculator": {
    "fields": [
      {
        "key": "credits",
        "label": "Total credit hours",
        "type": "number"
      },
      {
        "key": "hours",
        "label": "Study hours per credit/week",
        "type": "number",
        "defaultValue": "2"
      }
    ],
    "button": "Calculate"
  },
  "study-time-calculator": {
    "fields": [
      {
        "key": "topics",
        "label": "Topics/chapters",
        "type": "number"
      },
      {
        "key": "minutes",
        "label": "Minutes per topic",
        "type": "number",
        "defaultValue": "45"
      }
    ],
    "button": "Calculate"
  },
  "study-schedule-calculator": {
    "fields": [
      {
        "key": "hours",
        "label": "Total study hours",
        "type": "number"
      },
      {
        "key": "days",
        "label": "Days available",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "reading-speed-calculator": {
    "fields": [
      {
        "key": "words",
        "label": "Words read",
        "type": "number"
      },
      {
        "key": "minutes",
        "label": "Minutes",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "net-revenue-retention-calculator": {
    "fields": [
      {
        "key": "start",
        "label": "Starting MRR",
        "type": "number"
      },
      {
        "key": "expansion",
        "label": "Expansion MRR",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "key": "contraction",
        "label": "Contraction MRR",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "key": "churn",
        "label": "Churned MRR",
        "type": "number",
        "defaultValue": "0"
      }
    ],
    "button": "Calculate"
  },
  "gross-revenue-retention-calculator": {
    "fields": [
      {
        "key": "start",
        "label": "Starting MRR",
        "type": "number"
      },
      {
        "key": "contraction",
        "label": "Contraction MRR",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "key": "churn",
        "label": "Churned MRR",
        "type": "number",
        "defaultValue": "0"
      }
    ],
    "button": "Calculate"
  },
  "revenue-churn-calculator": {
    "fields": [
      {
        "key": "churn",
        "label": "Churned revenue",
        "type": "number"
      },
      {
        "key": "start",
        "label": "Starting revenue",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "expansion-mrr-calculator": {
    "fields": [
      {
        "key": "newMrr",
        "label": "Upgrades/add-ons MRR",
        "type": "number"
      },
      {
        "key": "other",
        "label": "Other expansion MRR",
        "type": "number",
        "defaultValue": "0"
      }
    ],
    "button": "Calculate"
  },
  "contraction-mrr-calculator": {
    "fields": [
      {
        "key": "downgrades",
        "label": "Downgrade MRR",
        "type": "number"
      },
      {
        "key": "discounts",
        "label": "Discount/contraction MRR",
        "type": "number",
        "defaultValue": "0"
      }
    ],
    "button": "Calculate"
  },
  "net-new-mrr-calculator": {
    "fields": [
      {
        "key": "new",
        "label": "New MRR",
        "type": "number"
      },
      {
        "key": "expansion",
        "label": "Expansion MRR",
        "type": "number"
      },
      {
        "key": "churn",
        "label": "Churned MRR",
        "type": "number"
      },
      {
        "key": "contraction",
        "label": "Contraction MRR",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "saas-magic-number-calculator": {
    "fields": [
      {
        "key": "qrev",
        "label": "Current quarter recurring revenue",
        "type": "number"
      },
      {
        "key": "prev",
        "label": "Previous quarter recurring revenue",
        "type": "number"
      },
      {
        "key": "sales",
        "label": "Prior quarter sales & marketing spend",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "rule-of-40-calculator": {
    "fields": [
      {
        "key": "growth",
        "label": "Revenue growth (%)",
        "type": "number"
      },
      {
        "key": "margin",
        "label": "Profit/EBITDA margin (%)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "saas-quick-ratio-calculator": {
    "fields": [
      {
        "key": "new",
        "label": "New MRR",
        "type": "number"
      },
      {
        "key": "expansion",
        "label": "Expansion MRR",
        "type": "number"
      },
      {
        "key": "churn",
        "label": "Churned MRR",
        "type": "number"
      },
      {
        "key": "contraction",
        "label": "Contraction MRR",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "average-revenue-per-account-calculator": {
    "fields": [
      {
        "key": "revenue",
        "label": "Recurring revenue",
        "type": "number"
      },
      {
        "key": "accounts",
        "label": "Number of accounts",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "net-promoter-score-calculator": {
    "fields": [
      {
        "key": "promoters",
        "label": "Promoters",
        "type": "number"
      },
      {
        "key": "passives",
        "label": "Passives",
        "type": "number"
      },
      {
        "key": "detractors",
        "label": "Detractors",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "marketing-efficiency-ratio-calculator": {
    "fields": [
      {
        "key": "revenue",
        "label": "Incremental revenue",
        "type": "number"
      },
      {
        "key": "spend",
        "label": "Marketing spend",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "saas-burn-multiple-calculator": {
    "fields": [
      {
        "key": "burn",
        "label": "Net cash burn",
        "type": "number"
      },
      {
        "key": "netNewArr",
        "label": "Net new ARR",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "average-contract-value-calculator": {
    "fields": [
      {
        "key": "value",
        "label": "Total contract value",
        "type": "number"
      },
      {
        "key": "contracts",
        "label": "Number of contracts",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "trial-conversion-rate-calculator": {
    "fields": [
      {
        "key": "paid",
        "label": "Trials converted",
        "type": "number"
      },
      {
        "key": "trials",
        "label": "Total trials",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "time-card-calculator": {
    "fields": [
      {
        "key": "start",
        "label": "Start time (HH:MM)",
        "type": "input",
        "defaultValue": "09:00"
      },
      {
        "key": "end",
        "label": "End time (HH:MM)",
        "type": "input",
        "defaultValue": "17:30"
      },
      {
        "key": "break",
        "label": "Break minutes",
        "type": "number",
        "defaultValue": "30"
      }
    ],
    "button": "Calculate"
  },
  "shift-length-calculator": {
    "fields": [
      {
        "key": "start",
        "label": "Start time (HH:MM)",
        "type": "input",
        "defaultValue": "08:00"
      },
      {
        "key": "end",
        "label": "End time (HH:MM)",
        "type": "input",
        "defaultValue": "16:30"
      }
    ],
    "button": "Calculate"
  },
  "overtime-hours-calculator": {
    "fields": [
      {
        "key": "hours",
        "label": "Hours worked",
        "type": "number"
      },
      {
        "key": "regular",
        "label": "Regular-hour threshold",
        "type": "number",
        "defaultValue": "40"
      }
    ],
    "button": "Calculate"
  },
  "decimal-hours-calculator": {
    "fields": [
      {
        "key": "hours",
        "label": "Hours",
        "type": "number"
      },
      {
        "key": "minutes",
        "label": "Minutes",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "date-midpoint-calculator": {
    "fields": [
      {
        "key": "start",
        "label": "Start date",
        "type": "input",
        "defaultValue": "2026-01-01"
      },
      {
        "key": "end",
        "label": "End date",
        "type": "input",
        "defaultValue": "2026-12-31"
      }
    ],
    "button": "Calculate"
  },
  "nth-weekday-calculator": {
    "fields": [
      {
        "key": "year",
        "label": "Year",
        "type": "number",
        "defaultValue": "2026"
      },
      {
        "key": "month",
        "label": "Month (1-12)",
        "type": "number",
        "defaultValue": "1"
      },
      {
        "key": "weekday",
        "label": "Weekday (0=Sun ... 6=Sat)",
        "type": "number",
        "defaultValue": "1"
      },
      {
        "key": "n",
        "label": "Occurrence (1-5)",
        "type": "number",
        "defaultValue": "1"
      }
    ],
    "button": "Calculate"
  },
  "fiscal-quarter-calculator": {
    "fields": [
      {
        "key": "date",
        "label": "Date",
        "type": "input",
        "defaultValue": "2026-09-10"
      },
      {
        "key": "startMonth",
        "label": "Fiscal year start month (1-12)",
        "type": "number",
        "defaultValue": "1"
      }
    ],
    "button": "Calculate"
  },
  "quarter-end-date-calculator": {
    "fields": [
      {
        "key": "date",
        "label": "Date",
        "type": "input",
        "defaultValue": "2026-09-10"
      }
    ],
    "button": "Calculate"
  },
  "unix-nanoseconds-converter": {
    "fields": [
      {
        "key": "ns",
        "label": "Unix nanoseconds",
        "type": "input",
        "defaultValue": "1760000000000000000"
      }
    ],
    "button": "Calculate"
  },
  "iso-duration-calculator": {
    "fields": [
      {
        "key": "duration",
        "label": "ISO 8601 duration",
        "type": "input",
        "defaultValue": "P1DT2H30M"
      }
    ],
    "button": "Calculate"
  },
  "mpg-calculator": {
    "fields": [
      {
        "key": "miles",
        "label": "Miles driven",
        "type": "number"
      },
      {
        "key": "gallons",
        "label": "Gallons used",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "fuel-cost-calculator": {
    "fields": [
      {
        "key": "distance",
        "label": "Distance (miles)",
        "type": "number"
      },
      {
        "key": "mpg",
        "label": "Fuel economy (MPG)",
        "type": "number"
      },
      {
        "key": "price",
        "label": "Fuel price ($/gal)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "cost-per-mile-calculator": {
    "fields": [
      {
        "key": "cost",
        "label": "Total trip/vehicle cost ($)",
        "type": "number"
      },
      {
        "key": "miles",
        "label": "Miles",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "tire-size-calculator": {
    "fields": [
      {
        "key": "width",
        "label": "Tire width (mm)",
        "type": "number",
        "defaultValue": "225"
      },
      {
        "key": "aspect",
        "label": "Aspect ratio (%)",
        "type": "number",
        "defaultValue": "45"
      },
      {
        "key": "rim",
        "label": "Wheel diameter (in)",
        "type": "number",
        "defaultValue": "17"
      }
    ],
    "button": "Calculate"
  },
  "speedometer-error-calculator": {
    "fields": [
      {
        "key": "oldDiameter",
        "label": "Original tire diameter (in)",
        "type": "number"
      },
      {
        "key": "newDiameter",
        "label": "New tire diameter (in)",
        "type": "number"
      },
      {
        "key": "speed",
        "label": "Indicated speed (mph)",
        "type": "number",
        "defaultValue": "60"
      }
    ],
    "button": "Calculate"
  },
  "wheel-offset-calculator": {
    "fields": [
      {
        "key": "width",
        "label": "Wheel width (in)",
        "type": "number"
      },
      {
        "key": "backspace",
        "label": "Backspacing (in)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "wheel-backspacing-calculator": {
    "fields": [
      {
        "key": "width",
        "label": "Wheel width (in)",
        "type": "number"
      },
      {
        "key": "offset",
        "label": "Offset (mm)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "gear-ratio-calculator": {
    "fields": [
      {
        "key": "driven",
        "label": "Driven gear teeth",
        "type": "number"
      },
      {
        "key": "drive",
        "label": "Drive gear teeth",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "rpm-speed-calculator": {
    "fields": [
      {
        "key": "rpm",
        "label": "Engine RPM",
        "type": "number"
      },
      {
        "key": "tireDiameter",
        "label": "Tire diameter (in)",
        "type": "number"
      },
      {
        "key": "gear",
        "label": "Transmission gear ratio",
        "type": "number"
      },
      {
        "key": "final",
        "label": "Final drive ratio",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "engine-displacement-calculator": {
    "fields": [
      {
        "key": "bore",
        "label": "Bore (mm)",
        "type": "number"
      },
      {
        "key": "stroke",
        "label": "Stroke (mm)",
        "type": "number"
      },
      {
        "key": "cylinders",
        "label": "Cylinders",
        "type": "number",
        "defaultValue": "4"
      }
    ],
    "button": "Calculate"
  },
  "compression-ratio-calculator": {
    "fields": [
      {
        "key": "swept",
        "label": "Swept volume (cc)",
        "type": "number"
      },
      {
        "key": "clearance",
        "label": "Clearance volume (cc)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "horsepower-to-weight-ratio-calculator": {
    "fields": [
      {
        "key": "hp",
        "label": "Horsepower",
        "type": "number"
      },
      {
        "key": "weight",
        "label": "Vehicle weight (lb)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "torque-to-horsepower-calculator": {
    "fields": [
      {
        "key": "torque",
        "label": "Torque (lb-ft)",
        "type": "number"
      },
      {
        "key": "rpm",
        "label": "RPM",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "horsepower-to-torque-calculator": {
    "fields": [
      {
        "key": "hp",
        "label": "Horsepower",
        "type": "number"
      },
      {
        "key": "rpm",
        "label": "RPM",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "quarter-mile-horsepower-calculator": {
    "fields": [
      {
        "key": "weight",
        "label": "Vehicle weight (lb)",
        "type": "number"
      },
      {
        "key": "et",
        "label": "Quarter-mile ET (seconds)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "vehicle-depreciation-calculator": {
    "fields": [
      {
        "key": "price",
        "label": "Purchase price ($)",
        "type": "number"
      },
      {
        "key": "rate",
        "label": "Annual depreciation (%)",
        "type": "number",
        "defaultValue": "15"
      },
      {
        "key": "years",
        "label": "Years",
        "type": "number",
        "defaultValue": "5"
      }
    ],
    "button": "Calculate"
  },
  "lease-mileage-calculator": {
    "fields": [
      {
        "key": "allowance",
        "label": "Annual mileage allowance",
        "type": "number"
      },
      {
        "key": "months",
        "label": "Lease months",
        "type": "number",
        "defaultValue": "36"
      },
      {
        "key": "miles",
        "label": "Miles driven so far",
        "type": "number"
      },
      {
        "key": "monthsElapsed",
        "label": "Months elapsed",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "ev-charging-time-calculator": {
    "fields": [
      {
        "key": "capacity",
        "label": "Battery capacity (kWh)",
        "type": "number"
      },
      {
        "key": "start",
        "label": "Starting charge (%)",
        "type": "number",
        "defaultValue": "20"
      },
      {
        "key": "target",
        "label": "Target charge (%)",
        "type": "number",
        "defaultValue": "80"
      },
      {
        "key": "power",
        "label": "Charger power (kW)",
        "type": "number",
        "defaultValue": "7.2"
      },
      {
        "key": "eff",
        "label": "Efficiency (%)",
        "type": "number",
        "defaultValue": "90"
      }
    ],
    "button": "Calculate"
  },
  "ev-charging-cost-calculator": {
    "fields": [
      {
        "key": "capacity",
        "label": "Battery capacity (kWh)",
        "type": "number"
      },
      {
        "key": "start",
        "label": "Starting charge (%)",
        "type": "number",
        "defaultValue": "20"
      },
      {
        "key": "target",
        "label": "Target charge (%)",
        "type": "number",
        "defaultValue": "80"
      },
      {
        "key": "rate",
        "label": "Electricity rate ($/kWh)",
        "type": "number",
        "defaultValue": "0.16"
      },
      {
        "key": "eff",
        "label": "Efficiency (%)",
        "type": "number",
        "defaultValue": "90"
      }
    ],
    "button": "Calculate"
  },
  "ev-range-calculator": {
    "fields": [
      {
        "key": "capacity",
        "label": "Usable battery (kWh)",
        "type": "number"
      },
      {
        "key": "efficiency",
        "label": "Efficiency (mi/kWh)",
        "type": "number",
        "defaultValue": "3.5"
      }
    ],
    "button": "Calculate"
  },
  "piston-speed-calculator": {
    "fields": [
      {
        "key": "stroke",
        "label": "Stroke (mm)",
        "type": "number"
      },
      {
        "key": "rpm",
        "label": "RPM",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "wheel-torque-calculator": {
    "fields": [
      {
        "key": "engineTorque",
        "label": "Engine torque (lb-ft)",
        "type": "number"
      },
      {
        "key": "gear",
        "label": "Gear ratio",
        "type": "number"
      },
      {
        "key": "final",
        "label": "Final drive ratio",
        "type": "number"
      },
      {
        "key": "eff",
        "label": "Drivetrain efficiency (%)",
        "type": "number",
        "defaultValue": "90"
      }
    ],
    "button": "Calculate"
  },
  "stopping-distance-calculator": {
    "fields": [
      {
        "key": "speed",
        "label": "Speed (mph)",
        "type": "number"
      },
      {
        "key": "reaction",
        "label": "Reaction time (s)",
        "type": "number",
        "defaultValue": "1.5"
      },
      {
        "key": "mu",
        "label": "Friction coefficient",
        "type": "number",
        "defaultValue": "0.7"
      }
    ],
    "button": "Calculate"
  },
  "vehicle-weight-distribution-calculator": {
    "fields": [
      {
        "key": "front",
        "label": "Front axle weight (lb)",
        "type": "number"
      },
      {
        "key": "rear",
        "label": "Rear axle weight (lb)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "trailer-tongue-weight-calculator": {
    "fields": [
      {
        "key": "trailer",
        "label": "Loaded trailer weight (lb)",
        "type": "number"
      },
      {
        "key": "percent",
        "label": "Tongue-weight target (%)",
        "type": "number",
        "defaultValue": "12"
      }
    ],
    "button": "Calculate"
  },
  "recipe-scaling-calculator": {
    "fields": [
      {
        "key": "original",
        "label": "Original servings",
        "type": "number"
      },
      {
        "key": "desired",
        "label": "Desired servings",
        "type": "number"
      },
      {
        "key": "amount",
        "label": "Ingredient amount",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "recipe-cost-calculator": {
    "fields": [
      {
        "key": "ingredientCost",
        "label": "Total ingredient cost ($)",
        "type": "number"
      },
      {
        "key": "servings",
        "label": "Servings",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "bakers-percentage-calculator": {
    "fields": [
      {
        "key": "ingredient",
        "label": "Ingredient weight (g)",
        "type": "number"
      },
      {
        "key": "flour",
        "label": "Total flour weight (g)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "dough-hydration-calculator": {
    "fields": [
      {
        "key": "water",
        "label": "Water weight (g)",
        "type": "number"
      },
      {
        "key": "flour",
        "label": "Flour weight (g)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "pizza-dough-calculator": {
    "fields": [
      {
        "key": "balls",
        "label": "Dough balls",
        "type": "number"
      },
      {
        "key": "ballWeight",
        "label": "Target ball weight (g)",
        "type": "number",
        "defaultValue": "250"
      },
      {
        "key": "hydration",
        "label": "Hydration (%)",
        "type": "number",
        "defaultValue": "65"
      },
      {
        "key": "salt",
        "label": "Salt (%)",
        "type": "number",
        "defaultValue": "2.5"
      },
      {
        "key": "yeast",
        "label": "Yeast (%)",
        "type": "number",
        "defaultValue": "0.5"
      }
    ],
    "button": "Calculate"
  },
  "bread-dough-calculator": {
    "fields": [
      {
        "key": "flour",
        "label": "Flour weight (g)",
        "type": "number",
        "defaultValue": "500"
      },
      {
        "key": "hydration",
        "label": "Hydration (%)",
        "type": "number",
        "defaultValue": "70"
      },
      {
        "key": "salt",
        "label": "Salt (%)",
        "type": "number",
        "defaultValue": "2"
      },
      {
        "key": "yeast",
        "label": "Yeast (%)",
        "type": "number",
        "defaultValue": "1"
      }
    ],
    "button": "Calculate"
  },
  "sourdough-starter-feeding-calculator": {
    "fields": [
      {
        "key": "starter",
        "label": "Starter amount (g)",
        "type": "number"
      },
      {
        "key": "feedRatio",
        "label": "Flour/water feed multiple",
        "type": "number",
        "defaultValue": "1"
      }
    ],
    "button": "Calculate"
  },
  "coffee-ratio-calculator": {
    "fields": [
      {
        "key": "coffee",
        "label": "Coffee (g)",
        "type": "number"
      },
      {
        "key": "ratio",
        "label": "Water ratio",
        "type": "number",
        "defaultValue": "16"
      }
    ],
    "button": "Calculate"
  },
  "cold-brew-ratio-calculator": {
    "fields": [
      {
        "key": "coffee",
        "label": "Coffee (g)",
        "type": "number"
      },
      {
        "key": "ratio",
        "label": "Water ratio",
        "type": "number",
        "defaultValue": "8"
      }
    ],
    "button": "Calculate"
  },
  "rice-water-ratio-calculator": {
    "fields": [
      {
        "key": "rice",
        "label": "Rice amount (cups)",
        "type": "number"
      },
      {
        "key": "ratio",
        "label": "Water per cup rice",
        "type": "number",
        "defaultValue": "1.5"
      }
    ],
    "button": "Calculate"
  },
  "brine-percentage-calculator": {
    "fields": [
      {
        "key": "water",
        "label": "Water weight (g)",
        "type": "number"
      },
      {
        "key": "percent",
        "label": "Salt percentage",
        "type": "number",
        "defaultValue": "2"
      }
    ],
    "button": "Calculate"
  },
  "food-cost-percentage-calculator": {
    "fields": [
      {
        "key": "foodCost",
        "label": "Food cost ($)",
        "type": "number"
      },
      {
        "key": "sales",
        "label": "Food sales ($)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "yeast-conversion-calculator": {
    "fields": [
      {
        "key": "amount",
        "label": "Active dry yeast (g)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "dough-ball-weight-calculator": {
    "fields": [
      {
        "key": "dough",
        "label": "Total dough weight (g)",
        "type": "number"
      },
      {
        "key": "balls",
        "label": "Number of dough balls",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "cake-pan-conversion-calculator": {
    "fields": [
      {
        "key": "oldDiameter",
        "label": "Original round pan diameter (in)",
        "type": "number"
      },
      {
        "key": "newDiameter",
        "label": "New round pan diameter (in)",
        "type": "number"
      },
      {
        "key": "ingredient",
        "label": "Original ingredient amount",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "crop-factor-calculator": {
    "fields": [
      {
        "key": "fullFrameDiagonal",
        "label": "Full-frame diagonal (mm)",
        "type": "number",
        "defaultValue": "43.27"
      },
      {
        "key": "sensorDiagonal",
        "label": "Sensor diagonal (mm)",
        "type": "number"
      }
    ],
    "button": "Calculate"
  },
  "equivalent-focal-length-calculator": {
    "fields": [
      {
        "key": "focal",
        "label": "Focal length (mm)",
        "type": "number"
      },
      {
        "key": "crop",
        "label": "Crop factor",
        "type": "number",
        "defaultValue": "1.5"
      }
    ],
    "button": "Calculate"
  },
  "field-of-view-calculator": {
    "fields": [
      {
        "key": "sensor",
        "label": "Sensor dimension (mm)",
        "type": "number",
        "defaultValue": "36"
      },
      {
        "key": "focal",
        "label": "Focal length (mm)",
        "type": "number",
        "defaultValue": "50"
      }
    ],
    "button": "Calculate"
  },
  "hyperfocal-distance-calculator": {
    "fields": [
      {
        "key": "focal",
        "label": "Focal length (mm)",
        "type": "number"
      },
      {
        "key": "aperture",
        "label": "f-number",
        "type": "number",
        "defaultValue": "8"
      },
      {
        "key": "coc",
        "label": "Circle of confusion (mm)",
        "type": "number",
        "defaultValue": "0.03"
      }
    ],
    "button": "Calculate"
  },
  "depth-of-field-calculator": {
    "fields": [
      {
        "key": "focal",
        "label": "Focal length (mm)",
        "type": "number",
        "defaultValue": "50"
      },
      {
        "key": "aperture",
        "label": "f-number",
        "type": "number",
        "defaultValue": "8"
      },
      {
        "key": "distance",
        "label": "Subject distance (m)",
        "type": "number",
        "defaultValue": "5"
      },
      {
        "key": "coc",
        "label": "Circle of confusion (mm)",
        "type": "number",
        "defaultValue": "0.03"
      }
    ],
    "button": "Calculate"
  },
  "exposure-value-calculator": {
    "fields": [
      {
        "key": "aperture",
        "label": "f-number",
        "type": "number",
        "defaultValue": "8"
      },
      {
        "key": "shutter",
        "label": "Shutter time (seconds)",
        "type": "number",
        "defaultValue": "0.008"
      }
    ],
    "button": "Calculate"
  },
  "shutter-speed-stops-calculator": {
    "fields": [
      {
        "key": "start",
        "label": "Starting shutter time (seconds)",
        "type": "number",
        "defaultValue": "0.004"
      },
      {
        "key": "stops",
        "label": "Stops change",
        "type": "number",
        "defaultValue": "1"
      }
    ],
    "button": "Calculate"
  },
  "nd-filter-calculator": {
    "fields": [
      {
        "key": "base",
        "label": "Base shutter time (seconds)",
        "type": "number",
        "defaultValue": "0.008"
      },
      {
        "key": "stops",
        "label": "ND filter stops",
        "type": "number",
        "defaultValue": "6"
      }
    ],
    "button": "Calculate"
  },
  "timelapse-calculator": {
    "fields": [
      {
        "key": "interval",
        "label": "Interval (seconds)",
        "type": "number",
        "defaultValue": "5"
      },
      {
        "key": "duration",
        "label": "Capture duration (minutes)",
        "type": "number",
        "defaultValue": "60"
      },
      {
        "key": "fps",
        "label": "Playback FPS",
        "type": "number",
        "defaultValue": "30"
      }
    ],
    "button": "Calculate"
  },
  "video-bitrate-calculator": {
    "fields": [
      {
        "key": "size",
        "label": "Target file size (GB)",
        "type": "number",
        "defaultValue": "1"
      },
      {
        "key": "minutes",
        "label": "Video duration (minutes)",
        "type": "number",
        "defaultValue": "10"
      }
    ],
    "button": "Calculate"
  },
  "video-file-size-calculator": {
    "fields": [
      {
        "key": "bitrate",
        "label": "Video bitrate (Mbps)",
        "type": "number",
        "defaultValue": "20"
      },
      {
        "key": "minutes",
        "label": "Duration (minutes)",
        "type": "number",
        "defaultValue": "10"
      }
    ],
    "button": "Calculate"
  },
  "audio-file-size-calculator": {
    "fields": [
      {
        "key": "bitrate",
        "label": "Audio bitrate (kbps)",
        "type": "number",
        "defaultValue": "320"
      },
      {
        "key": "minutes",
        "label": "Duration (minutes)",
        "type": "number",
        "defaultValue": "10"
      }
    ],
    "button": "Calculate"
  },
  "recording-time-calculator": {
    "fields": [
      {
        "key": "storage",
        "label": "Storage (GB)",
        "type": "number",
        "defaultValue": "64"
      },
      {
        "key": "bitrate",
        "label": "Bitrate (Mbps)",
        "type": "number",
        "defaultValue": "100"
      }
    ],
    "button": "Calculate"
  },
  "frame-count-calculator": {
    "fields": [
      {
        "key": "seconds",
        "label": "Duration (seconds)",
        "type": "number"
      },
      {
        "key": "fps",
        "label": "Frames per second",
        "type": "number",
        "defaultValue": "30"
      }
    ],
    "button": "Calculate"
  },
  "frames-to-timecode-converter": {
    "fields": [
      {
        "key": "frames",
        "label": "Frame count",
        "type": "number"
      },
      {
        "key": "fps",
        "label": "Frames per second",
        "type": "number",
        "defaultValue": "30"
      }
    ],
    "button": "Calculate"
  }
};

const inputClass="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary";
const textareaClass="min-h-40 w-full rounded-lg border bg-background px-3 py-2 font-mono text-sm outline-none transition focus:border-primary";
const buttonClass="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90";
const secondaryButtonClass="rounded-lg border bg-background px-4 py-2 text-sm font-medium hover:bg-muted";

function n(v:Record<string,string>,k:string){ const x=Number(v[k]); if(!Number.isFinite(x)) throw new Error(`Enter a valid number for ${k}.`); return x; }
function txt(v:Record<string,string>,k:string){ return (v[k]??"").trim(); }
function fmt(x:number,d=4){ if(!Number.isFinite(x)) return "—"; return new Intl.NumberFormat("en-US",{maximumFractionDigits:d}).format(x); }
function money(x:number){ return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:2}).format(x); }
function pct(x:number){ return fmt(x*100,4)+"%"; }
function out(output:string):ToolResult{ return {output}; }
function result(label:string,value:string):ToolResult{ return {summary:[{label,value}]}; }
function list(s:string){ return s.split(/[\s,]+/).map(Number).filter(Number.isFinite); }
function avg(a:number[]){ if(!a.length)throw new Error("Enter at least one value."); return a.reduce((s,x)=>s+x,0)/a.length; }
function median(a:number[]){ const b=[...a].sort((x,y)=>x-y),m=Math.floor(b.length/2); return b.length%2?b[m]:(b[m-1]+b[m])/2; }
function matrix(s:string){ return s.split(';').map(r=>list(r)); }
function factorial(k:number){ let r=1; for(let i=2;i<=Math.floor(k);i++)r*=i; return r; }
function comb(n:number,k:number){ if(k<0||k>n)return 0; k=Math.min(k,n-k); let r=1; for(let i=1;i<=k;i++)r=r*(n-k+i)/i; return r; }
function gamma(z:number):number{ const p=[0.99999999999980993,676.5203681218851,-1259.1392167224028,771.32342877765313,-176.61502916214059,12.507343278686905,-0.13857109526572012,9.984369578019571e-6,1.5056327351493116e-7]; if(z<0.5)return Math.PI/(Math.sin(Math.PI*z)*gamma(1-z)); z-=1; let x=p[0]; for(let i=1;i<p.length;i++)x+=p[i]/(z+i); const t=z+7.5; return Math.sqrt(2*Math.PI)*Math.pow(t,z+0.5)*Math.exp(-t)*x; }
function betaFn(a:number,b:number){ return gamma(a)*gamma(b)/gamma(a+b); }
function normalCdf(x:number){ const t=1/(1+0.2316419*Math.abs(x)),d=0.3989423*Math.exp(-x*x/2),p=1-d*t*(0.3193815+t*(-0.3565638+t*(1.781478+t*(-1.821256+t*1.330274)))); return x>=0?p:1-p; }
function solveIrr(cf:number[]){ let r=0.1; for(let iter=0;iter<100;iter++){ let f=0,df=0; cf.forEach((c,i)=>{f+=c/Math.pow(1+r,i); if(i)df-=i*c/Math.pow(1+r,i+1)}); const nr=r-f/df; if(!Number.isFinite(nr))break; if(Math.abs(nr-r)<1e-10)return nr; r=nr; if(r<=-0.9999)r=-0.9999; } return r; }
function parseDelimited(s:string,delimiter:string){ return s.split(/\r?\n/).filter(Boolean).map(line=>{ const out:string[]=[],re=delimiter==='\t'?null:new RegExp(`(?:^|${delimiter})(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|([^${delimiter}]*))`,'g'); if(!re)return line.split('\t'); let m; while((m=re.exec(line))!==null)out.push((m[1]??m[2]??'').replace(/\"\"/g,'\"')); return out; }); }
function csvEsc(s:string){ return /[",\n]/.test(s)?'\"'+s.replace(/\"/g,'\"\"')+'\"':s; }
function stripHtml(s:string){ return s.replace(/<[^>]+>/g,'').replace(/&nbsp;/g,' ').trim(); }
function escHtml(s:string){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\"/g,'&quot;'); }
function safeTag(s:string){ const x=s.trim().replace(/[^A-Za-z0-9_.-]/g,'_'); return /^[A-Za-z_]/.test(x)?x:'item_'+x; }
function splitSqlValues(s:string){ return s.split(/,(?=(?:[^']*'[^']*')*[^']*$)/).map(x=>x.trim().replace(/^'|'$/g,'')); }
function parseSimpleYaml(s:string){ const o:Record<string,string>={}; s.split(/\r?\n/).forEach(line=>{const m=line.match(/^\s*([^:#]+):\s*(.*)$/); if(m)o[m[1].trim()]=m[2].trim().replace(/^['\"]|['\"]$/g,'')}); return o; }
function toPhp(x:any,indent=0):string{ const pad='  '.repeat(indent); if(Array.isArray(x))return '[\n'+x.map(v=>pad+'  '+toPhp(v,indent+1)).join(',\n')+'\n'+pad+']'; if(x&&typeof x==='object')return '[\n'+Object.entries(x).map(([k,v])=>pad+`  '${k}' => `+toPhp(v,indent+1)).join(',\n')+'\n'+pad+']'; if(typeof x==='string')return `'${x.replace(/'/g,"\\'")}'`; if(x===null)return 'null'; return String(x); }
function typeOf(v:any,lang:string){ if(Array.isArray(v))return lang==='go'?'[]interface{}':lang==='rust'?'Vec<serde_json::Value>':lang==='kotlin'?'List<Any>':lang==='swift'?'[Any]':'List<Object>'; if(typeof v==='string')return lang==='go'?'string':lang==='rust'?'String':lang==='kotlin'?'String':lang==='swift'?'String':'string'; if(typeof v==='boolean')return lang==='go'?'bool':lang==='rust'?'bool':lang==='kotlin'?'Boolean':lang==='swift'?'Bool':'bool'; if(typeof v==='number')return lang==='go'?'float64':lang==='rust'?'f64':lang==='kotlin'?'Double':lang==='swift'?'Double':'double'; return lang==='go'?'interface{}':lang==='rust'?'serde_json::Value':lang==='kotlin'?'Any':lang==='swift'?'Any':'object'; }
function generateStruct(o:any,lang:string){ const obj=Array.isArray(o)?o[0]:o; if(!obj||typeof obj!=='object')throw new Error('Enter a JSON object.'); const es=Object.entries(obj); if(lang==='go')return 'type Root struct {\n'+es.map(([k,v])=>`  ${k.replace(/(^.|_.)/g,m=>m.replace('_','').toUpperCase())} ${typeOf(v,lang)} \`json:\"${k}\"\``).join('\n')+'\n}'; if(lang==='rust')return '#[derive(Serialize, Deserialize)]\nstruct Root {\n'+es.map(([k,v])=>`  ${k}: ${typeOf(v,lang)},`).join('\n')+'\n}'; if(lang==='kotlin')return 'data class Root(\n'+es.map(([k,v])=>`  val ${k}: ${typeOf(v,lang)}`).join(',\n')+'\n)'; if(lang==='swift')return 'struct Root: Codable {\n'+es.map(([k,v])=>`  let ${k}: ${typeOf(v,lang)}`).join('\n')+'\n}'; if(lang==='java')return 'public class Root {\n'+es.map(([k,v])=>`  public ${typeOf(v,lang)} ${k};`).join('\n')+'\n}'; return 'public class Root {\n'+es.map(([k,v])=>`  public ${typeOf(v,lang)} ${k} { get; set; }`).join('\n')+'\n}'; }
function parseSemver(s:string){ const a=s.trim().replace(/^v/,'').split('.').slice(0,3).map(x=>parseInt(x)||0); while(a.length<3)a.push(0); return a; }
function cmpSemver(a:number[],b:number[]){ for(let i=0;i<3;i++)if(a[i]!==b[i])return a[i]-b[i]; return 0; }
function ipToInt(ip:string){ const p=ip.trim().split('.').map(Number); if(p.length!==4||p.some(x=>x<0||x>255))throw new Error('Enter a valid IPv4 address.'); return (((p[0]*256+p[1])*256+p[2])*256+p[3])>>>0; }
function intToIp(x:number){ return [x>>>24,(x>>>16)&255,(x>>>8)&255,x&255].join('.'); }
function cidrRange(s:string){ const [ip,pfx]=s.split('/'),p=Number(pfx); if(p<0||p>32)throw new Error('Enter CIDR like 192.168.1.0/24.'); const x=ipToInt(ip),mask=p===0?0:(0xffffffff << (32-p))>>>0,net=(x&mask)>>>0,bcast=(net|(~mask>>>0))>>>0; return `Network: ${intToIp(net)}\nBroadcast: ${intToIp(bcast)}\nRange: ${intToIp(net)} - ${intToIp(bcast)}\nAddresses: ${Math.pow(2,32-p)}`; }
const B32='ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
function base32Encode(bytes:Uint8Array){ let bits=0,val=0,out=''; for(const b of bytes){val=(val<<8)|b;bits+=8; while(bits>=5){out+=B32[(val>>>(bits-5))&31];bits-=5}} if(bits)out+=B32[(val<<(5-bits))&31]; while(out.length%8)out+='='; return out; }
function base32Decode(s:string){ s=s.toUpperCase().replace(/=+$/,'').replace(/\s/g,''); let bits=0,val=0,arr:number[]=[]; for(const c of s){const i=B32.indexOf(c); if(i<0)throw new Error('Invalid Base32 input.'); val=(val<<5)|i;bits+=5;if(bits>=8){arr.push((val>>>(bits-8))&255);bits-=8}} return new Uint8Array(arr); }
const B58='123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
function base58Encode(bytes:Uint8Array){ let x=BigInt(0); for(const b of bytes)x=(x<<BigInt(8))+BigInt(b); let s=''; while(x>0){s=B58[Number(x%BigInt(58))]+s;x/=BigInt(58)} for(const b of bytes){if(b===0)s='1'+s;else break} return s||'1'; }
function base58Decode(s:string){ let x=BigInt(0); for(const c of s.trim()){const i=B58.indexOf(c);if(i<0)throw new Error('Invalid Base58 input.');x=x*BigInt(58)+BigInt(i)} const arr:number[]=[]; while(x>0){arr.unshift(Number(x&BigInt(255)));x>>=BigInt(8)} for(const c of s){if(c==='1')arr.unshift(0);else break} return new Uint8Array(arr); }
function cronNext(s:string){ const p=s.trim().split(/\s+/); if(p.length!==5)return 'Enter a standard 5-field cron expression.'; const [mi,hr]=p; if(!/^\d+$/.test(mi)||!/^\d+$/.test(hr))return 'This quick calculator supports fixed minute/hour expressions such as 0 9 * * *.'; const d=new Date(); const next=new Date(d); next.setSeconds(0,0); next.setMinutes(Number(mi)); next.setHours(Number(hr)); if(next<=d)next.setDate(next.getDate()+1); return next.toString(); }
function timeDiff(a:string,b:string){ const [ah,am]=a.split(':').map(Number),[bh,bm]=b.split(':').map(Number); let x=bh*60+bm-(ah*60+am); if(x<0)x+=1440; return x; }
function formatCitation(style:string,author:string,title:string,source:string,year:string,url:string){ if(style==='BIBTEX')return `@misc{source,\n  author = {${author}},\n  title = {${title}},\n  year = {${year}},\n  howpublished = {${url}}\n}`; if(style==='APA')return `${author}. (${year}). ${title}. ${source}. ${url}`; if(style==='MLA')return `${author}. \"${title}.\" ${source}, ${year}, ${url}.`; if(style==='CHICAGO')return `${author}. \"${title}.\" ${source} (${year}). ${url}.`; if(style==='HARVARD')return `${author} (${year}) '${title}', ${source}. Available at: ${url}.`; if(style==='IEEE')return `${author}, \"${title},\" ${source}, ${year}. [Online]. Available: ${url}`; if(style==='VANCOUVER')return `${author}. ${title}. ${source}. ${year}. Available from: ${url}`; return `${author}. ${title}. ${source}. ${year}; ${url}.`; }

function calculate(kind:Batch7591008Kind,v:Record<string,string>):ToolResult {
  switch(kind) {
    case "json-to-php-array-converter": {
      const o=JSON.parse(txt(v,'input')); return out(toPhp(o));
    }
    case "php-array-to-json-converter": {
      const s=txt(v,'input').replace(/=>/g,':').replace(/array\s*\(/gi,'[').replace(/\)/g,']').replace(/'/g,'\"'); return out(JSON.stringify(JSON.parse(s),null,2));
    }
    case "json-to-python-dict-converter": {
      const o=JSON.parse(txt(v,'input')); return out(JSON.stringify(o,null,2).replace(/true/g,'True').replace(/false/g,'False').replace(/null/g,'None')); 
    }
    case "python-dict-to-json-converter": {
      const s=txt(v,'input').replace(/'/g,'\"').replace(/\bTrue\b/g,'true').replace(/\bFalse\b/g,'false').replace(/\bNone\b/g,'null'); return out(JSON.stringify(JSON.parse(s),null,2));
    }
    case "json-to-csharp-class-generator": {
      const o=JSON.parse(txt(v,'input')); return out(generateStruct(o,"csharp"));
    }
    case "json-to-java-class-generator": {
      const o=JSON.parse(txt(v,'input')); return out(generateStruct(o,"java"));
    }
    case "json-to-go-struct-generator": {
      const o=JSON.parse(txt(v,'input')); return out(generateStruct(o,"go"));
    }
    case "json-to-rust-struct-generator": {
      const o=JSON.parse(txt(v,'input')); return out(generateStruct(o,"rust"));
    }
    case "json-to-kotlin-data-class-generator": {
      const o=JSON.parse(txt(v,'input')); return out(generateStruct(o,"kotlin"));
    }
    case "json-to-swift-codable-generator": {
      const o=JSON.parse(txt(v,'input')); return out(generateStruct(o,"swift"));
    }
    case "csv-to-markdown-table-converter": {
      const rows=parseDelimited(txt(v,'input'),','); if(!rows.length)return out(''); const h=rows[0]; return out('| '+h.join(' | ')+' |\n| '+h.map(()=> '---').join(' | ')+' |\n'+rows.slice(1).map(r=>'| '+r.join(' | ')+' |').join('\n'));
    }
    case "markdown-table-to-csv-converter": {
      const rows=txt(v,'input').split(/\r?\n/).filter(x=>x.includes('|')).map(x=>x.trim().replace(/^\||\|$/g,'').split('|').map(y=>y.trim())).filter((_,i)=>i!==1); return out(rows.map(r=>r.map(csvEsc).join(',')).join('\n'));
    }
    case "html-table-to-markdown-converter": {
      const html=txt(v,'input'); const rows=[...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map(m=>[...m[1].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi)].map(c=>stripHtml(c[1]))); if(!rows.length)return out('No table rows found.'); return out('| '+rows[0].join(' | ')+' |\n| '+rows[0].map(()=> '---').join(' | ')+' |\n'+rows.slice(1).map(r=>'| '+r.join(' | ')+' |').join('\n'));
    }
    case "markdown-table-to-html-converter": {
      const rows=txt(v,'input').split(/\r?\n/).filter(x=>x.includes('|')).map(x=>x.trim().replace(/^\||\|$/g,'').split('|').map(y=>y.trim())).filter((_,i)=>i!==1); if(!rows.length)return out(''); return out('<table>\n  <thead><tr>'+rows[0].map(x=>`<th>${escHtml(x)}</th>`).join('')+'</tr></thead>\n  <tbody>\n'+rows.slice(1).map(r=>'    <tr>'+r.map(x=>`<td>${escHtml(x)}</td>`).join('')+'</tr>').join('\n')+'\n  </tbody>\n</table>');
    }
    case "sql-to-csv-converter": {
      const s=txt(v,'input'); const m=s.match(/values\s*([\s\S]+)/i); if(!m)return out('Paste an INSERT ... VALUES statement.'); const rows=[...m[1].matchAll(/\(([^()]*)\)/g)].map(x=>splitSqlValues(x[1])); return out(rows.map(r=>r.map(csvEsc).join(',')).join('\n'));
    }
    case "csv-to-jsonl-converter": {
      const rows=parseDelimited(txt(v,'input'),','); if(rows.length<2)return out(''); const h=rows[0]; return out(rows.slice(1).map(r=>JSON.stringify(Object.fromEntries(h.map((k,i)=>[k,r[i]??''])))).join('\n'));
    }
    case "jsonl-to-csv-converter": {
      const objs=txt(v,'input').split(/\r?\n/).filter(Boolean).map(x=>JSON.parse(x)); const keys=Array.from(new Set(objs.flatMap(o=>Object.keys(o)))); return out([keys.join(','),...objs.map(o=>keys.map(k=>csvEsc(String(o[k]??''))).join(','))].join('\n'));
    }
    case "jsonl-formatter": {
      const lines=txt(v,'input').split(/\r?\n/).filter(Boolean); return out(lines.map(x=>JSON.stringify(JSON.parse(x),null,2)).join('\n---\n'));
    }
    case "jsonl-validator": {
      const lines=txt(v,'input').split(/\r?\n/).filter(Boolean); const bad=[] as number[]; lines.forEach((x,i)=>{try{JSON.parse(x)}catch{bad.push(i+1)}}); return out(bad.length?`Invalid JSON on line(s): ${bad.join(', ')}`:`Valid JSONL: ${lines.length} line(s).`);
    }
    case "yaml-to-xml-converter": {
      const obj=parseSimpleYaml(txt(v,'input')); return out('<root>\n'+Object.entries(obj).map(([k,val])=>`  <${safeTag(k)}>${escHtml(String(val))}</${safeTag(k)}>`).join('\n')+'\n</root>');
    }
    case "xml-to-yaml-converter": {
      const s=txt(v,'input'); const pairs=[...s.matchAll(/<([A-Za-z_][\w.-]*)[^>]*>([^<]*)<\/\1>/g)].map(m=>`${m[1]}: ${m[2].trim()}`); return out(pairs.join('\n')||'No simple leaf elements found.');
    }
    case "env-to-json-converter": {
      const o:any={}; txt(v,'input').split(/\r?\n/).forEach(line=>{if(!line||line.trim().startsWith('#'))return; const i=line.indexOf('='); if(i>0)o[line.slice(0,i).trim()]=line.slice(i+1).trim().replace(/^['\"]|['\"]$/g,'')}); return out(JSON.stringify(o,null,2));
    }
    case "json-to-env-converter": {
      const o=JSON.parse(txt(v,'input')); return out(Object.entries(o).map(([k,val])=>`${k.toUpperCase()}=${String(val)}`).join('\n'));
    }
    case "properties-to-json-converter": {
      const o:any={}; txt(v,'input').split(/\r?\n/).forEach(line=>{if(!line||/^\s*[#!]/.test(line))return; const m=line.match(/^\s*([^:=\s]+)\s*[:=]\s*(.*)$/); if(m)o[m[1]]=m[2]}); return out(JSON.stringify(o,null,2));
    }
    case "json-to-properties-converter": {
      const o=JSON.parse(txt(v,'input')); return out(Object.entries(o).map(([k,val])=>`${k}=${String(val)}`).join('\n'));
    }
    case "regex-escape-tool": {
      return out(txt(v,'input').replace(/[.*+?^${}()|[\]\\]/g,'\\$&'));
    }
    case "cron-next-run-calculator": {
      return out(cronNext(txt(v,'cron')));
    }
    case "semantic-version-comparator": {
      const a=parseSemver(txt(v,'a')),b=parseSemver(txt(v,'b')); const c=cmpSemver(a,b); return out(c===0?'Versions are equal':c<0?`${txt(v,'a')} is older than ${txt(v,'b')}`:`${txt(v,'a')} is newer than ${txt(v,'b')}`);
    }
    case "semantic-version-bump-calculator": {
      const a=parseSemver(txt(v,'version')); const bump=txt(v,'bump').toLowerCase(); if(bump==='major'){a[0]++;a[1]=0;a[2]=0}else if(bump==='minor'){a[1]++;a[2]=0}else{a[2]++} return out(a.join('.'));
    }
    case "cache-control-header-builder": {
      const s=txt(v,'input').trim(); return out('Cache-Control: '+(s||'public, max-age=3600, stale-while-revalidate=60'));
    }
    case "cors-header-generator": {
      const origin=txt(v,'input').trim()||'*'; return out(`Access-Control-Allow-Origin: ${origin}\nAccess-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS\nAccess-Control-Allow-Headers: Content-Type, Authorization`);
    }
    case "csp-header-parser": {
      const parts=txt(v,'input').replace(/^content-security-policy:\s*/i,'').split(';').map(x=>x.trim()).filter(Boolean); return out(parts.map(p=>{const [d,...vals]=p.split(/\s+/);return `${d}: ${vals.join(', ')}`}).join('\n'));
    }
    case "htaccess-redirect-generator": {
      const lines=txt(v,'input').split(/\r?\n/).filter(Boolean); return out(lines.map(line=>{const [a,b]=line.split(/\s+/);return `Redirect 301 ${a||'/old'} ${b||'/new'}`}).join('\n'));
    }
    case "nginx-redirect-generator": {
      const lines=txt(v,'input').split(/\r?\n/).filter(Boolean); return out(lines.map(line=>{const [a,b]=line.split(/\s+/);return `rewrite ^${a||'/old'}$ ${b||'/new'} permanent;`}).join('\n'));
    }
    case "ip-range-calculator": {
      const s=txt(v,'input').trim(); const [a,b]=s.split(/\s*[-–]\s*/); if(!b)return out('Enter a range like 192.168.1.10 - 192.168.1.20'); const x=ipToInt(a),y=ipToInt(b); return out(`Start: ${a}\nEnd: ${b}\nAddresses: ${Math.abs(y-x)+1}`);
    }
    case "cidr-to-ip-range-converter": {
      return out(cidrRange(txt(v,'input').trim()));
    }
    case "ipv6-subnet-calculator": {
      const s=txt(v,'input').trim(); const [addr,p='64']=s.split('/'); return out(`Network prefix: ${addr}/${p}\nPrefix length: ${p} bits\nHost bits: ${128-Number(p)}`);
    }
    case "dns-ttl-converter": {
      const s=n(v,'seconds'); return out(`${fmt(s)} seconds = ${fmt(s/60)} minutes = ${fmt(s/3600)} hours = ${fmt(s/86400)} days`);
    }
    case "dns-record-parser": {
      const s=txt(v,'input').trim(); const parts=s.split(/\s+/); return out(`Fields (${parts.length}):\n${parts.map((x,i)=>`${i+1}. ${x}`).join('\n')}`);
    }
    case "base32-encoder": {
      return out(base32Encode(new TextEncoder().encode(txt(v,'input'))));
    }
    case "base32-decoder": {
      return out(new TextDecoder().decode(base32Decode(txt(v,'input'))));
    }
    case "base58-encoder": {
      return out(base58Encode(new TextEncoder().encode(txt(v,'input'))));
    }
    case "base58-decoder": {
      return out(new TextDecoder().decode(base58Decode(txt(v,'input'))));
    }
    case "tsv-to-json-converter": {
      const rows=parseDelimited(txt(v,'input'),'\t'); if(rows.length<2)return out(''); const h=rows[0]; return out(JSON.stringify(rows.slice(1).map(r=>Object.fromEntries(h.map((k,i)=>[k,r[i]??'']))),null,2));
    }
    case "json-to-tsv-converter": {
      const a=JSON.parse(txt(v,'input')); const arr=Array.isArray(a)?a:[a]; const keys=Array.from(new Set(arr.flatMap((o:any)=>Object.keys(o)))); return out([keys.join('\t'),...arr.map((o:any)=>keys.map(k=>String(o[k]??'')).join('\t'))].join('\n'));
    }
    case "csv-to-yaml-converter": {
      const rows=parseDelimited(txt(v,'input'),','); if(rows.length<2)return out(''); const h=rows[0]; return out(rows.slice(1).map(r=>'- '+h.map((k,i)=>`${k}: ${r[i]??''}`).join('\n  ')).join('\n'));
    }
    case "yaml-to-csv-converter": {
      const obj=parseSimpleYaml(txt(v,'input')); const keys=Object.keys(obj); return out(keys.join(',')+'\n'+keys.map(k=>csvEsc(String(obj[k]))).join(','));
    }
    case "json-pointer-tester": {
      const o=JSON.parse(txt(v,'json')); const tokens=txt(v,'pointer').split('/').slice(1).map(x=>x.replace(/~1/g,'/').replace(/~0/g,'~')); let cur:any=o; for(const tok of tokens)cur=cur?.[tok]; return out(typeof cur==='string'?cur:JSON.stringify(cur,null,2));
    }
    case "json-patch-generator": {
      const a=JSON.parse(txt(v,'source')),b=JSON.parse(txt(v,'target')); const ops:any[]=[]; const keys=new Set([...Object.keys(a),...Object.keys(b)]); keys.forEach(k=>{if(!(k in b))ops.push({op:'remove',path:'/'+k});else if(!(k in a))ops.push({op:'add',path:'/'+k,value:b[k]});else if(JSON.stringify(a[k])!==JSON.stringify(b[k]))ops.push({op:'replace',path:'/'+k,value:b[k]})}); return out(JSON.stringify(ops,null,2));
    }
    case "json-merge-patch-tool": {
      const a=JSON.parse(txt(v,'source')),b=JSON.parse(txt(v,'target')); const patch:any={}; const keys=new Set([...Object.keys(a),...Object.keys(b)]); keys.forEach(k=>{if(!(k in b))patch[k]=null;else if(JSON.stringify(a[k])!==JSON.stringify(b[k]))patch[k]=b[k]}); return out(JSON.stringify(patch,null,2));
    }
    case "http-basic-auth-header-generator": {
      return out('Authorization: Basic '+btoa(unescape(encodeURIComponent(`${txt(v,'username')}:${txt(v,'password')}`))));
    }
    case "content-disposition-header-generator": {
      const s=txt(v,'input').trim()||'report.pdf'; return out(`Content-Disposition: attachment; filename=\"${s.replace(/\"/g,'')}\"`);
    }
    case "url-query-parameter-sorter": {
      const u=new URL(txt(v,'input').trim()); const pairs=[...u.searchParams.entries()].sort(([a],[b])=>a.localeCompare(b)); u.search=''; pairs.forEach(([k,val])=>u.searchParams.append(k,val)); return out(u.toString());
    }
    case "url-normalizer": {
      const raw=txt(v,'input').trim(); const u=new URL(/^https?:\/\//i.test(raw)?raw:'https://'+raw); u.hash=''; u.hostname=u.hostname.toLowerCase(); if((u.protocol==='https:'&&u.port==='443')||(u.protocol==='http:'&&u.port==='80'))u.port=''; u.pathname=u.pathname.replace(/\/{2,}/g,'/'); return out(u.toString());
    }
    case "sql-create-table-generator": {
      const s=txt(v,'input').trim(); const cols=s.split(/\r?\n|,/).map(x=>x.trim()).filter(Boolean); return out('CREATE TABLE my_table (\n  '+cols.map(c=>{const [name,type='TEXT']=c.split(/\s+/); return `${name} ${type.toUpperCase()}`}).join(',\n  ')+'\n);');
    }
    case "cap-rate-calculator": {
      return result('Cap rate',pct(n(v,'noi')/n(v,'value')));
    }
    case "cash-on-cash-return-calculator": {
      return result('Cash-on-cash return',pct(n(v,'cashflow')/n(v,'cash')));
    }
    case "rental-property-roi-calculator": {
      return result('ROI',pct(n(v,'gain')/n(v,'investment')));
    }
    case "rental-yield-calculator": {
      return result('Rental yield',pct(n(v,'rent')/n(v,'value')));
    }
    case "gross-rent-multiplier-calculator": {
      return result('Gross rent multiplier',fmt(n(v,'value')/n(v,'rent')));
    }
    case "loan-to-value-calculator": {
      return result('Loan-to-value',pct(n(v,'loan')/n(v,'value')));
    }
    case "home-equity-calculator": {
      return result('Estimated home equity',money(n(v,'value')-n(v,'balance')));
    }
    case "bond-yield-calculator": {
      return result('Current yield',pct(n(v,'coupon')/n(v,'price')));
    }
    case "dividend-yield-calculator": {
      return result('Dividend yield',pct(n(v,'dividend')/n(v,'price')));
    }
    case "pe-ratio-calculator": {
      return result('P/E ratio',fmt(n(v,'price')/n(v,'eps')));
    }
    case "peg-ratio-calculator": {
      return result('PEG ratio',fmt(n(v,'pe')/n(v,'growth')));
    }
    case "earnings-per-share-calculator": {
      return result('EPS',money((n(v,'income')-n(v,'preferred'))/n(v,'shares')));
    }
    case "return-on-assets-calculator": {
      return result('Return on assets',pct(n(v,'income')/n(v,'assets')));
    }
    case "return-on-equity-calculator": {
      return result('Return on equity',pct(n(v,'income')/n(v,'equity')));
    }
    case "capm-calculator": {
      return result('Expected return',pct((n(v,'riskFree')+n(v,'beta')*(n(v,'market')-n(v,'riskFree')))/100));
    }
    case "sharpe-ratio-calculator": {
      return result('Sharpe ratio',fmt((n(v,'return')-n(v,'riskFree'))/n(v,'sd')));
    }
    case "sortino-ratio-calculator": {
      return result('Sortino ratio',fmt((n(v,'return')-n(v,'target'))/n(v,'downside')));
    }
    case "cash-ratio-calculator": {
      return result('Cash ratio',fmt(n(v,'cash')/n(v,'liabilities')));
    }
    case "interest-coverage-ratio-calculator": {
      return result('Interest coverage ratio',fmt(n(v,'ebit')/n(v,'interest')));
    }
    case "asset-turnover-calculator": {
      return result('Asset turnover ratio',fmt(n(v,'sales')/n(v,'assets')));
    }
    case "cash-conversion-cycle-calculator": {
      return result('Cash conversion cycle',fmt(n(v,'dio')+n(v,'dso')-n(v,'dpo'))+' days');
    }
    case "sinking-fund-calculator": {
      const r=n(v,'rate')/100/n(v,'payments'),N=n(v,'years')*n(v,'payments'); const p=n(v,'target')*r/(Math.pow(1+r,N)-1); return result('Required periodic deposit',money(p));
    }
    case "bond-price-calculator": {
      const face=n(v,'face'), cr=n(v,'couponRate')/100, y=n(v,'marketRate')/100, years=n(v,'years'); let price=0; for(let t=1;t<=years;t++)price+=face*cr/Math.pow(1+y,t); price+=face/Math.pow(1+y,years); return result('Estimated bond price',money(price));
    }
    case "dividend-reinvestment-calculator": {
      let shares=n(v,'shares'),price=n(v,'price'),d=n(v,'dividend'); for(let i=0;i<n(v,'years');i++)shares+=shares*d/price; return {summary:[{label:'Estimated shares',value:fmt(shares)},{label:'Estimated value at unchanged share price',value:money(shares*price)}]};
    }
    case "stock-average-calculator": {
      const total=n(v,'shares1')+n(v,'shares2'); const cost=n(v,'shares1')*n(v,'price1')+n(v,'shares2')*n(v,'price2'); return {summary:[{label:'Average cost/share',value:money(cost/total)},{label:'Total shares',value:fmt(total)},{label:'Total cost',value:money(cost)}]};
    }
    case "risk-reward-ratio-calculator": {
      const risk=Math.abs(n(v,'entry')-n(v,'stop')),reward=Math.abs(n(v,'target')-n(v,'entry')); return result('Reward-to-risk ratio',fmt(reward/risk)+':1');
    }
    case "npv-calculator": {
      const cf=list(txt(v,'cashflows')),r=n(v,'rate')/100; let npv=-Math.abs(n(v,'investment')); cf.forEach((x,i)=>npv+=x/Math.pow(1+r,i+1)); return result('Net present value',money(npv));
    }
    case "irr-calculator": {
      const cf=list(txt(v,'cashflows')); const irr=solveIrr(cf); return result('IRR',isFinite(irr)?pct(irr):'No stable IRR found');
    }
    case "mirr-calculator": {
      const cf=list(txt(v,'cashflows')),fr=n(v,'financeRate')/100,rr=n(v,'reinvestRate')/100,N=cf.length-1; let pvNeg=0,fvPos=0; cf.forEach((x,i)=>{if(x<0)pvNeg+=x/Math.pow(1+fr,i); else fvPos+=x*Math.pow(1+rr,N-i)}); const mirr=Math.pow(fvPos/Math.abs(pvNeg),1/N)-1; return result('MIRR',pct(mirr));
    }
    case "wacc-calculator": {
      const E=n(v,'equity'),D=n(v,'debt'),V=E+D; const w=E/V*n(v,'costEquity')/100+D/V*n(v,'costDebt')/100*(1-n(v,'tax')/100); return result('WACC',pct(w));
    }
    case "root-mean-square-calculator": {
      const a=list(txt(v,'values')); return result('RMS',fmt(Math.sqrt(a.reduce((s,x)=>s+x*x,0)/a.length)));
    }
    case "sum-of-squares-calculator": {
      const a=list(txt(v,'values')); return result('Sum of squares',fmt(a.reduce((s,x)=>s+x*x,0)));
    }
    case "t-statistic-calculator": {
      return result('t statistic',fmt((n(v,'mean')-n(v,'mu'))/(n(v,'sd')/Math.sqrt(n(v,'n')))));
    }
    case "p-value-calculator": {
      const z=Math.abs(n(v,'z')); return result('Two-tailed p-value',fmt(2*(1-normalCdf(z)),6));
    }
    case "chi-square-calculator": {
      const o=list(txt(v,'observed')),e=list(txt(v,'expected')); const x=o.reduce((s,val,i)=>s+Math.pow(val-(e[i]??0),2)/(e[i]||1),0); return result('Chi-square statistic',fmt(x));
    }
    case "one-way-anova-calculator": {
      const gs=txt(v,'groups').split(';').map(list).filter(g=>g.length); const all=gs.flat(),gm=avg(all); const ssb=gs.reduce((s,g)=>s+g.length*Math.pow(avg(g)-gm,2),0), ssw=gs.reduce((s,g)=>s+g.reduce((q,x)=>q+Math.pow(x-avg(g),2),0),0); const F=(ssb/(gs.length-1))/(ssw/(all.length-gs.length)); return result('F statistic',fmt(F));
    }
    case "hypergeometric-calculator": {
      const N=n(v,'N'),K=n(v,'K'),nn=n(v,'n'),k=n(v,'k'); return result('Probability',fmt(comb(K,k)*comb(N-K,nn-k)/comb(N,nn),8));
    }
    case "poisson-distribution-calculator": {
      const L=n(v,'lambda'),k=n(v,'k'); return result('P(X = k)',fmt(Math.exp(-L)*Math.pow(L,k)/factorial(k),8));
    }
    case "exponential-distribution-calculator": {
      const L=n(v,'lambda'),x=n(v,'x'); return {summary:[{label:'CDF P(X≤x)',value:fmt(1-Math.exp(-L*x),8)},{label:'PDF at x',value:fmt(L*Math.exp(-L*x),8)}]};
    }
    case "uniform-distribution-calculator": {
      const a=n(v,'a'),b=n(v,'b'),x=n(v,'x'); return {summary:[{label:'CDF at x',value:fmt(x<=a?0:x>=b?1:(x-a)/(b-a),8)},{label:'PDF',value:fmt(x<a||x>b?0:1/(b-a),8)}]};
    }
    case "beta-distribution-calculator": {
      const a=n(v,'alpha'),b=n(v,'beta'),x=n(v,'x'); return result('Beta PDF (approx.)',fmt(Math.pow(x,a-1)*Math.pow(1-x,b-1)/betaFn(a,b),8));
    }
    case "gamma-distribution-calculator": {
      const k=n(v,'shape'),th=n(v,'scale'),x=n(v,'x'); return result('Gamma PDF (approx.)',fmt(Math.pow(x,k-1)*Math.exp(-x/th)/(gamma(k)*Math.pow(th,k)),8));
    }
    case "weibull-distribution-calculator": {
      const k=n(v,'shape'),L=n(v,'scale'),x=n(v,'x'); return {summary:[{label:'CDF',value:fmt(1-Math.exp(-Math.pow(x/L,k)),8)},{label:'PDF',value:fmt((k/L)*Math.pow(x/L,k-1)*Math.exp(-Math.pow(x/L,k)),8)}]};
    }
    case "lognormal-distribution-calculator": {
      const mu=n(v,'mu'),s=n(v,'sigma'),x=n(v,'x'); const pdf=Math.exp(-Math.pow(Math.log(x)-mu,2)/(2*s*s))/(x*s*Math.sqrt(2*Math.PI)); return result('Lognormal PDF',fmt(pdf,8));
    }
    case "geometric-distribution-calculator": {
      const p=n(v,'p'),k=n(v,'k'); return result('P(X = k)',fmt(Math.pow(1-p,k-1)*p,8));
    }
    case "negative-binomial-calculator": {
      const r=n(v,'r'),p=n(v,'p'),k=n(v,'k'); return result('Probability',fmt(comb(k+r-1,k)*Math.pow(1-p,k)*Math.pow(p,r),8));
    }
    case "mean-absolute-deviation-calculator": {
      const a=list(txt(v,'values')),m=avg(a); return result('Mean absolute deviation',fmt(avg(a.map(x=>Math.abs(x-m)))));
    }
    case "median-absolute-deviation-calculator": {
      const a=list(txt(v,'values')),m=median(a); return result('Median absolute deviation',fmt(median(a.map(x=>Math.abs(x-m)))));
    }
    case "weighted-standard-deviation-calculator": {
      const a=list(txt(v,'values')),w=list(txt(v,'weights')); const sw=w.reduce((s,x)=>s+x,0),m=a.reduce((s,x,i)=>s+x*(w[i]??0),0)/sw,vr=a.reduce((s,x,i)=>s+(w[i]??0)*Math.pow(x-m,2),0)/sw; return result('Weighted standard deviation',fmt(Math.sqrt(vr)));
    }
    case "weighted-variance-calculator": {
      const a=list(txt(v,'values')),w=list(txt(v,'weights')); const sw=w.reduce((s,x)=>s+x,0),m=a.reduce((s,x,i)=>s+x*(w[i]??0),0)/sw,vr=a.reduce((s,x,i)=>s+(w[i]??0)*Math.pow(x-m,2),0)/sw; return result('Weighted variance',fmt(vr));
    }
    case "root-mean-square-error-calculator": {
      const a=list(txt(v,'actual')),p=list(txt(v,'predicted')); return result('RMSE',fmt(Math.sqrt(avg(a.map((x,i)=>Math.pow(x-(p[i]??0),2))))));
    }
    case "mean-absolute-error-calculator": {
      const a=list(txt(v,'actual')),p=list(txt(v,'predicted')); return result('MAE',fmt(avg(a.map((x,i)=>Math.abs(x-(p[i]??0))))));
    }
    case "mape-calculator": {
      const a=list(txt(v,'actual')),p=list(txt(v,'predicted')); return result('MAPE',pct(avg(a.map((x,i)=>x===0?0:Math.abs((x-(p[i]??0))/x)))));
    }
    case "r-squared-calculator": {
      const a=list(txt(v,'actual')),p=list(txt(v,'predicted')),m=avg(a); const ssr=a.reduce((s,x,i)=>s+Math.pow(x-(p[i]??0),2),0),sst=a.reduce((s,x)=>s+Math.pow(x-m,2),0); return result('R²',fmt(1-ssr/sst));
    }
    case "vector-magnitude-calculator": {
      const a=list(txt(v,'vector')); return result('Magnitude',fmt(Math.sqrt(a.reduce((s,x)=>s+x*x,0))));
    }
    case "dot-product-calculator": {
      const a=list(txt(v,'a')),b=list(txt(v,'b')); return result('Dot product',fmt(a.reduce((s,x,i)=>s+x*(b[i]??0),0)));
    }
    case "cross-product-calculator": {
      const a=list(txt(v,'a')),b=list(txt(v,'b')); const c=[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]]; return out(c.map(fmt).join(', '));
    }
    case "complex-number-calculator": {
      const a=n(v,'a'),b=n(v,'b'),c=n(v,'c'),d=n(v,'d'); return {summary:[{label:'Sum',value:`${fmt(a+c)} ${b+d>=0?'+':'-'} ${fmt(Math.abs(b+d))}i`},{label:'Product',value:`${fmt(a*c-b*d)} ${a*d+b*c>=0?'+':'-'} ${fmt(Math.abs(a*d+b*c))}i`}]} ;
    }
    case "polynomial-degree-calculator": {
      const a=list(txt(v,'values')); let d=a.length-1; while(d>0&&Math.abs(a[d])<1e-12)d--; return result('Polynomial degree',String(d));
    }
    case "skewness-calculator": {
      const a=list(txt(v,'values')),m=avg(a),sd=Math.sqrt(avg(a.map(x=>Math.pow(x-m,2)))); return result('Skewness',fmt(avg(a.map(x=>Math.pow((x-m)/sd,3)))));
    }
    case "kurtosis-calculator": {
      const a=list(txt(v,'values')),m=avg(a),sd=Math.sqrt(avg(a.map(x=>Math.pow(x-m,2)))); return result('Excess kurtosis',fmt(avg(a.map(x=>Math.pow((x-m)/sd,4)))-3));
    }
    case "matrix-trace-calculator": {
      const m=matrix(txt(v,'matrix')); return result('Trace',fmt(m.reduce((s,row,i)=>s+(row[i]??0),0)));
    }
    case "matrix-transpose-calculator": {
      const m=matrix(txt(v,'matrix')); const cols=Math.max(...m.map(r=>r.length)); return out(Array.from({length:cols},(_,j)=>m.map(r=>r[j]??'').join(', ')).join('\n'));
    }
    case "vector-angle-calculator": {
      const a=list(txt(v,'a')),b=list(txt(v,'b')); const dot=a.reduce((s,x,i)=>s+x*(b[i]??0),0),ma=Math.sqrt(a.reduce((s,x)=>s+x*x,0)),mb=Math.sqrt(b.reduce((s,x)=>s+x*x,0)); return result('Angle',fmt(Math.acos(Math.max(-1,Math.min(1,dot/(ma*mb))))*180/Math.PI)+'°');
    }
    case "cosine-similarity-calculator": {
      const a=list(txt(v,'a')),b=list(txt(v,'b')); const dot=a.reduce((s,x,i)=>s+x*(b[i]??0),0),ma=Math.sqrt(a.reduce((s,x)=>s+x*x,0)),mb=Math.sqrt(b.reduce((s,x)=>s+x*x,0)); return result('Cosine similarity',fmt(dot/(ma*mb),6));
    }
    case "force-calculator": {
      return result('Force',fmt(n(v,'m')*n(v,'a'))+' N');
    }
    case "acceleration-calculator": {
      return result('Acceleration',fmt((n(v,'v1')-n(v,'v0'))/n(v,'t'))+' m/s²');
    }
    case "momentum-calculator": {
      return result('Momentum',fmt(n(v,'m')*n(v,'v'))+' kg·m/s');
    }
    case "impulse-calculator": {
      return result('Impulse',fmt(n(v,'f')*n(v,'t'))+' N·s');
    }
    case "kinetic-energy-calculator": {
      return result('Kinetic energy',fmt(0.5*n(v,'m')*n(v,'v')**2)+' J');
    }
    case "potential-energy-calculator": {
      return result('Potential energy',fmt(n(v,'m')*n(v,'g')*n(v,'h'))+' J');
    }
    case "work-calculator": {
      return result('Work',fmt(n(v,'f')*n(v,'d')*Math.cos(n(v,'angle')*Math.PI/180))+' J');
    }
    case "mechanical-power-calculator": {
      return result('Mechanical power',fmt(n(v,'work')/n(v,'time'))+' W');
    }
    case "lever-torque-calculator": {
      return result('Torque',fmt(n(v,'force')*n(v,'arm')*Math.sin(n(v,'angle')*Math.PI/180))+' N·m');
    }
    case "pressure-force-area-calculator": {
      return result('Force',fmt(n(v,'pressure')*n(v,'area'))+' N');
    }
    case "density-calculator": {
      return result('Density',fmt(n(v,'mass')/n(v,'volume')));
    }
    case "specific-gravity-calculator": {
      return result('Specific gravity',fmt(n(v,'density')/n(v,'reference')));
    }
    case "buoyancy-calculator": {
      return result('Buoyant force',fmt(n(v,'rho')*n(v,'volume')*n(v,'g'))+' N');
    }
    case "reynolds-number-calculator": {
      return result('Reynolds number',fmt(n(v,'rho')*n(v,'v')*n(v,'length')/n(v,'mu')));
    }
    case "bernoulli-equation-calculator": {
      return result('Bernoulli head/energy term',fmt(n(v,'p')/n(v,'rho')+0.5*n(v,'v')**2+n(v,'g')*n(v,'h'))+' J/kg');
    }
    case "hydraulic-power-calculator": {
      return result('Output hydraulic power',fmt(n(v,'pressure')*n(v,'flow')*n(v,'eff')/100)+' W');
    }
    case "pump-power-calculator": {
      return result('Required pump input power',fmt(n(v,'rho')*9.80665*n(v,'flow')*n(v,'head')/(n(v,'eff')/100))+' W');
    }
    case "pipe-flow-rate-calculator": {
      return result('Flow rate',fmt(Math.PI*n(v,'diameter')**2/4*n(v,'velocity'),6)+' m³/s');
    }
    case "heat-transfer-calculator": {
      return result('Heat transfer rate',fmt(n(v,'u')*n(v,'area')*n(v,'dt'))+' W');
    }
    case "thermal-expansion-calculator": {
      return {summary:[{label:'Change in length',value:fmt(n(v,'length')*n(v,'alpha')*n(v,'dt'))},{label:'New length',value:fmt(n(v,'length')*(1+n(v,'alpha')*n(v,'dt')))}]};
    }
    case "lumber-weight-calculator": {
      return result('Estimated weight',fmt(n(v,'volume')*n(v,'density'))+' lb');
    }
    case "lumber-cost-calculator": {
      return result('Estimated lumber cost',money(n(v,'boardFeet')*n(v,'price')));
    }
    case "stair-stringer-calculator": {
      const hyp=Math.hypot(n(v,'rise'),n(v,'run')); return {summary:[{label:'Stringer length',value:fmt(hyp)+' in'},{label:'Rise per step',value:fmt(n(v,'rise')/n(v,'steps'))+' in'},{label:'Run per step',value:fmt(n(v,'run')/n(v,'steps'))+' in'}]};
    }
    case "rebar-weight-calculator": {
      return result('Approx. rebar weight',fmt((n(v,'diameter')**2/162)*n(v,'length'))+' kg');
    }
    case "rebar-spacing-calculator": {
      const count=Math.floor(n(v,'span')/n(v,'spacing'))+1; return {summary:[{label:'Bars/lines',value:String(count)},{label:'Actual spacing',value:fmt(n(v,'span')/(count-1))}]};
    }
    case "tile-layout-calculator": {
      const area=n(v,'roomLength')*n(v,'roomWidth')*144,tile=n(v,'tileLength')*n(v,'tileWidth'); return result('Tiles including waste',String(Math.ceil(area/tile*(1+n(v,'waste')/100))));
    }
    case "ceiling-tile-calculator": {
      return result('Tiles including waste',String(Math.ceil(n(v,'length')*n(v,'width')/n(v,'tileArea')*(1+n(v,'waste')/100))));
    }
    case "door-rough-opening-calculator": {
      return {summary:[{label:'Rough opening width',value:fmt(n(v,'doorWidth')+n(v,'widthAllowance'))+' in'},{label:'Rough opening height',value:fmt(n(v,'doorHeight')+n(v,'heightAllowance'))+' in'}]};
    }
    case "fence-picket-spacing-calculator": {
      const c=Math.floor((n(v,'section')+n(v,'gap'))/(n(v,'picket')+n(v,'gap'))); const gap=(n(v,'section')-c*n(v,'picket'))/(c+1); return {summary:[{label:'Pickets',value:String(c)},{label:'Even gap',value:fmt(gap)+' in'}]};
    }
    case "stair-baluster-spacing-calculator": {
      const c=Math.ceil((n(v,'opening')-n(v,'maxGap'))/(n(v,'baluster')+n(v,'maxGap'))); const gap=(n(v,'opening')-c*n(v,'baluster'))/(c+1); return {summary:[{label:'Balusters',value:String(c)},{label:'Resulting gap',value:fmt(gap)+' in'}]};
    }
    case "wheelchair-ramp-length-calculator": {
      return result('Ramp run length',fmt(n(v,'rise')*n(v,'ratio'))+' in');
    }
    case "landscape-fabric-calculator": {
      const area=n(v,'length')*n(v,'width')*(1+n(v,'overlap')/100); return {summary:[{label:'Fabric area',value:fmt(area)+' ft²'},{label:'Linear feet of roll',value:fmt(area/n(v,'rollWidth'))+' ft'}]};
    }
    case "acoustic-panel-calculator": {
      const wall=2*(n(v,'roomLength')+n(v,'roomWidth'))*n(v,'roomHeight'); const target=wall*n(v,'coverage')/100; return result('Estimated panels',String(Math.ceil(target/n(v,'panelArea'))));
    }
    case "cabinet-linear-feet-calculator": {
      return result('Cabinet linear feet',fmt(n(v,'wall1')+n(v,'wall2')+n(v,'wall3'))+' ft');
    }
    case "countertop-square-footage-calculator": {
      return result('Countertop area',fmt(n(v,'length')*n(v,'depth')*n(v,'pieces')/144)+' ft²');
    }
    case "grade-curve-calculator": {
      const curved=Math.min(n(v,'max'),n(v,'score')+n(v,'curve')); return {summary:[{label:'Curved score',value:fmt(curved)},{label:'Percentage',value:pct(curved/n(v,'max'))}]};
    }
    case "attendance-percentage-calculator": {
      return result('Attendance',pct(n(v,'attended')/n(v,'total')));
    }
    case "credit-hour-calculator": {
      return result('Estimated credit hours',fmt(n(v,'courses')*n(v,'credits')));
    }
    case "course-load-calculator": {
      return result('Estimated study hours/week',fmt(n(v,'credits')*n(v,'hours'))+' hours');
    }
    case "study-time-calculator": {
      return result('Estimated study time',fmt(n(v,'topics')*n(v,'minutes')/60)+' hours');
    }
    case "study-schedule-calculator": {
      return result('Study time per day',fmt(n(v,'hours')/n(v,'days'))+' hours/day');
    }
    case "reading-speed-calculator": {
      return result('Reading speed',fmt(n(v,'words')/n(v,'minutes'))+' words/min');
    }
    case "apa-citation-generator": {
      return out(formatCitation("APA",txt(v,'author'),txt(v,'title'),txt(v,'source'),txt(v,'year'),txt(v,'url')));
    }
    case "mla-citation-generator": {
      return out(formatCitation("MLA",txt(v,'author'),txt(v,'title'),txt(v,'source'),txt(v,'year'),txt(v,'url')));
    }
    case "chicago-citation-generator": {
      return out(formatCitation("CHICAGO",txt(v,'author'),txt(v,'title'),txt(v,'source'),txt(v,'year'),txt(v,'url')));
    }
    case "harvard-citation-generator": {
      return out(formatCitation("HARVARD",txt(v,'author'),txt(v,'title'),txt(v,'source'),txt(v,'year'),txt(v,'url')));
    }
    case "ieee-citation-generator": {
      return out(formatCitation("IEEE",txt(v,'author'),txt(v,'title'),txt(v,'source'),txt(v,'year'),txt(v,'url')));
    }
    case "bibtex-entry-generator": {
      return out(formatCitation("BIBTEX",txt(v,'author'),txt(v,'title'),txt(v,'source'),txt(v,'year'),txt(v,'url')));
    }
    case "vancouver-citation-generator": {
      return out(formatCitation("VANCOUVER",txt(v,'author'),txt(v,'title'),txt(v,'source'),txt(v,'year'),txt(v,'url')));
    }
    case "ama-citation-generator": {
      return out(formatCitation("AMA",txt(v,'author'),txt(v,'title'),txt(v,'source'),txt(v,'year'),txt(v,'url')));
    }
    case "net-revenue-retention-calculator": {
      return result('Net revenue retention',pct((n(v,'start')+n(v,'expansion')-n(v,'contraction')-n(v,'churn'))/n(v,'start')));
    }
    case "gross-revenue-retention-calculator": {
      return result('Gross revenue retention',pct((n(v,'start')-n(v,'contraction')-n(v,'churn'))/n(v,'start')));
    }
    case "revenue-churn-calculator": {
      return result('Revenue churn',pct(n(v,'churn')/n(v,'start')));
    }
    case "expansion-mrr-calculator": {
      return result('Expansion MRR',money(n(v,'newMrr')+n(v,'other')));
    }
    case "contraction-mrr-calculator": {
      return result('Contraction MRR',money(n(v,'downgrades')+n(v,'discounts')));
    }
    case "net-new-mrr-calculator": {
      return result('Net new MRR',money(n(v,'new')+n(v,'expansion')-n(v,'churn')-n(v,'contraction')));
    }
    case "saas-magic-number-calculator": {
      return result('SaaS Magic Number',fmt(((n(v,'qrev')-n(v,'prev'))*4)/n(v,'sales')));
    }
    case "rule-of-40-calculator": {
      return result('Rule of 40 score',fmt(n(v,'growth')+n(v,'margin'))+'%');
    }
    case "saas-quick-ratio-calculator": {
      return result('SaaS quick ratio',fmt((n(v,'new')+n(v,'expansion'))/(n(v,'churn')+n(v,'contraction'))));
    }
    case "average-revenue-per-account-calculator": {
      return result('ARPA',money(n(v,'revenue')/n(v,'accounts')));
    }
    case "net-promoter-score-calculator": {
      const total=n(v,'promoters')+n(v,'passives')+n(v,'detractors'); return result('NPS',fmt((n(v,'promoters')-n(v,'detractors'))/total*100));
    }
    case "marketing-efficiency-ratio-calculator": {
      return result('Marketing efficiency ratio',fmt(n(v,'revenue')/n(v,'spend')));
    }
    case "saas-burn-multiple-calculator": {
      return result('Burn multiple',fmt(n(v,'burn')/n(v,'netNewArr')));
    }
    case "average-contract-value-calculator": {
      return result('Average contract value',money(n(v,'value')/n(v,'contracts')));
    }
    case "trial-conversion-rate-calculator": {
      return result('Trial conversion rate',pct(n(v,'paid')/n(v,'trials')));
    }
    case "time-card-calculator": {
      const mins=timeDiff(txt(v,'start'),txt(v,'end'))-n(v,'break'); return result('Paid time',fmt(mins/60)+' hours');
    }
    case "shift-length-calculator": {
      return result('Shift length',fmt(timeDiff(txt(v,'start'),txt(v,'end'))/60)+' hours');
    }
    case "overtime-hours-calculator": {
      const h=n(v,'hours'),r=n(v,'regular'); return {summary:[{label:'Regular hours',value:fmt(Math.min(h,r))},{label:'Overtime hours',value:fmt(Math.max(0,h-r))}]};
    }
    case "decimal-hours-calculator": {
      return result('Decimal hours',fmt(n(v,'hours')+n(v,'minutes')/60));
    }
    case "date-midpoint-calculator": {
      const a=new Date(txt(v,'start')).getTime(),b=new Date(txt(v,'end')).getTime(); return out(new Date((a+b)/2).toISOString().slice(0,10));
    }
    case "nth-weekday-calculator": {
      const y=n(v,'year'),m=n(v,'month')-1,w=n(v,'weekday'),occ=n(v,'n'); const first=new Date(Date.UTC(y,m,1)); const day=1+((w-first.getUTCDay()+7)%7)+(occ-1)*7; const d=new Date(Date.UTC(y,m,day)); return out(d.getUTCMonth()===m?d.toISOString().slice(0,10):'That occurrence does not exist in this month.');
    }
    case "fiscal-quarter-calculator": {
      const d=new Date(txt(v,'date')+'T00:00:00Z'),start=n(v,'startMonth')-1; const offset=(d.getUTCMonth()-start+12)%12; return out(`Fiscal quarter: Q${Math.floor(offset/3)+1}`);
    }
    case "quarter-end-date-calculator": {
      const d=new Date(txt(v,'date')+'T00:00:00Z'),q=Math.floor(d.getUTCMonth()/3); const end=new Date(Date.UTC(d.getUTCFullYear(),q*3+3,0)); return out(end.toISOString().slice(0,10));
    }
    case "unix-nanoseconds-converter": {
      const ns=BigInt(txt(v,'ns').trim()); const ms=Number(ns/BigInt(1000000)); return out(new Date(ms).toISOString());
    }
    case "iso-duration-calculator": {
      const s=txt(v,'duration').toUpperCase(),m=s.match(/^P(?:(\d+(?:\.\d+)?)D)?(?:T(?:(\d+(?:\.\d+)?)H)?(?:(\d+(?:\.\d+)?)M)?(?:(\d+(?:\.\d+)?)S)?)?$/); if(!m)return out('Enter a duration like P1DT2H30M.'); const sec=Number(m[1]||0)*86400+Number(m[2]||0)*3600+Number(m[3]||0)*60+Number(m[4]||0); return out(`${fmt(sec)} seconds = ${fmt(sec/3600)} hours`);
    }
    case "mpg-calculator": {
      return result('Fuel economy',fmt(n(v,'miles')/n(v,'gallons'))+' MPG');
    }
    case "fuel-cost-calculator": {
      return result('Estimated fuel cost',money(n(v,'distance')/n(v,'mpg')*n(v,'price')));
    }
    case "cost-per-mile-calculator": {
      return result('Cost per mile',money(n(v,'cost')/n(v,'miles')));
    }
    case "tire-size-calculator": {
      const side=n(v,'width')*n(v,'aspect')/100/25.4,diam=n(v,'rim')+2*side; return {summary:[{label:'Overall diameter',value:fmt(diam)+' in'},{label:'Circumference',value:fmt(Math.PI*diam)+' in'}]};
    }
    case "speedometer-error-calculator": {
      return result('Actual speed',fmt(n(v,'speed')*n(v,'newDiameter')/n(v,'oldDiameter'))+' mph');
    }
    case "wheel-offset-calculator": {
      return result('Approx. wheel offset',fmt((n(v,'backspace')-n(v,'width')/2)*25.4)+' mm');
    }
    case "wheel-backspacing-calculator": {
      return result('Approx. backspacing',fmt(n(v,'width')/2+n(v,'offset')/25.4)+' in');
    }
    case "gear-ratio-calculator": {
      return result('Gear ratio',fmt(n(v,'driven')/n(v,'drive'))+':1');
    }
    case "rpm-speed-calculator": {
      return result('Road speed',fmt(n(v,'rpm')*n(v,'tireDiameter')/(n(v,'gear')*n(v,'final')*336))+' mph');
    }
    case "engine-displacement-calculator": {
      const cc=Math.PI/4*n(v,'bore')**2*n(v,'stroke')*n(v,'cylinders')/1000; return {summary:[{label:'Displacement',value:fmt(cc)+' cc'},{label:'Liters',value:fmt(cc/1000)+' L'}]};
    }
    case "compression-ratio-calculator": {
      return result('Compression ratio',fmt((n(v,'swept')+n(v,'clearance'))/n(v,'clearance'))+':1');
    }
    case "horsepower-to-weight-ratio-calculator": {
      return result('Power-to-weight',fmt(n(v,'hp')/n(v,'weight'),5)+' hp/lb');
    }
    case "torque-to-horsepower-calculator": {
      return result('Horsepower',fmt(n(v,'torque')*n(v,'rpm')/5252));
    }
    case "horsepower-to-torque-calculator": {
      return result('Torque',fmt(n(v,'hp')*5252/n(v,'rpm'))+' lb-ft');
    }
    case "quarter-mile-horsepower-calculator": {
      return result('Estimated horsepower',fmt(n(v,'weight')/Math.pow(n(v,'et')/5.825,3))+' hp');
    }
    case "vehicle-depreciation-calculator": {
      const val=n(v,'price')*Math.pow(1-n(v,'rate')/100,n(v,'years')); return {summary:[{label:'Estimated value',value:money(val)},{label:'Estimated depreciation',value:money(n(v,'price')-val)}]};
    }
    case "lease-mileage-calculator": {
      const total=n(v,'allowance')*n(v,'months')/12,allowed=total*n(v,'monthsElapsed')/n(v,'months'); return {summary:[{label:'Total lease allowance',value:fmt(total)+' mi'},{label:'Allowance to date',value:fmt(allowed)+' mi'},{label:'Ahead/behind allowance',value:fmt(allowed-n(v,'miles'))+' mi'}]};
    }
    case "ev-charging-time-calculator": {
      const energy=n(v,'capacity')*(n(v,'target')-n(v,'start'))/100; return result('Estimated charging time',fmt(energy/(n(v,'power')*n(v,'eff')/100))+' hours');
    }
    case "ev-charging-cost-calculator": {
      const energy=n(v,'capacity')*(n(v,'target')-n(v,'start'))/100/(n(v,'eff')/100); return result('Estimated charging cost',money(energy*n(v,'rate')));
    }
    case "ev-range-calculator": {
      return result('Estimated range',fmt(n(v,'capacity')*n(v,'efficiency'))+' miles');
    }
    case "piston-speed-calculator": {
      return result('Mean piston speed',fmt(2*(n(v,'stroke')/1000)*n(v,'rpm')/60)+' m/s');
    }
    case "wheel-torque-calculator": {
      return result('Estimated wheel torque',fmt(n(v,'engineTorque')*n(v,'gear')*n(v,'final')*n(v,'eff')/100)+' lb-ft');
    }
    case "stopping-distance-calculator": {
      const vms=n(v,'speed')*0.44704; const reaction=vms*n(v,'reaction'),brake=vms*vms/(2*n(v,'mu')*9.80665); return {summary:[{label:'Reaction distance',value:fmt(reaction*3.28084)+' ft'},{label:'Braking distance',value:fmt(brake*3.28084)+' ft'},{label:'Total stopping distance',value:fmt((reaction+brake)*3.28084)+' ft'}]};
    }
    case "vehicle-weight-distribution-calculator": {
      const t=n(v,'front')+n(v,'rear'); return {summary:[{label:'Front',value:pct(n(v,'front')/t)},{label:'Rear',value:pct(n(v,'rear')/t)}]};
    }
    case "trailer-tongue-weight-calculator": {
      return result('Target tongue weight',fmt(n(v,'trailer')*n(v,'percent')/100)+' lb');
    }
    case "recipe-scaling-calculator": {
      const f=n(v,'desired')/n(v,'original'); return {summary:[{label:'Scale factor',value:fmt(f)+'×'},{label:'Scaled ingredient amount',value:fmt(n(v,'amount')*f)}]};
    }
    case "recipe-cost-calculator": {
      return result('Cost per serving',money(n(v,'ingredientCost')/n(v,'servings')));
    }
    case "bakers-percentage-calculator": {
      return result("Baker's percentage",pct(n(v,'ingredient')/n(v,'flour')));
    }
    case "dough-hydration-calculator": {
      return result('Hydration',pct(n(v,'water')/n(v,'flour')));
    }
    case "pizza-dough-calculator": {
      const total=n(v,'balls')*n(v,'ballWeight'),ratio=1+n(v,'hydration')/100+n(v,'salt')/100+n(v,'yeast')/100,flour=total/ratio; return {summary:[{label:'Flour',value:fmt(flour)+' g'},{label:'Water',value:fmt(flour*n(v,'hydration')/100)+' g'},{label:'Salt',value:fmt(flour*n(v,'salt')/100)+' g'},{label:'Yeast',value:fmt(flour*n(v,'yeast')/100)+' g'}]};
    }
    case "bread-dough-calculator": {
      const f=n(v,'flour'); return {summary:[{label:'Water',value:fmt(f*n(v,'hydration')/100)+' g'},{label:'Salt',value:fmt(f*n(v,'salt')/100)+' g'},{label:'Yeast',value:fmt(f*n(v,'yeast')/100)+' g'},{label:'Total dough',value:fmt(f*(1+(n(v,'hydration')+n(v,'salt')+n(v,'yeast'))/100))+' g'}]};
    }
    case "sourdough-starter-feeding-calculator": {
      return {summary:[{label:'Flour to add',value:fmt(n(v,'starter')*n(v,'feedRatio'))+' g'},{label:'Water to add',value:fmt(n(v,'starter')*n(v,'feedRatio'))+' g'}]};
    }
    case "coffee-ratio-calculator": {
      return result('Water',fmt(n(v,'coffee')*n(v,'ratio'))+' g');
    }
    case "cold-brew-ratio-calculator": {
      return result('Water',fmt(n(v,'coffee')*n(v,'ratio'))+' g');
    }
    case "rice-water-ratio-calculator": {
      return result('Water',fmt(n(v,'rice')*n(v,'ratio'))+' cups');
    }
    case "brine-percentage-calculator": {
      return result('Salt',fmt(n(v,'water')*n(v,'percent')/100)+' g');
    }
    case "food-cost-percentage-calculator": {
      return result('Food cost percentage',pct(n(v,'foodCost')/n(v,'sales')));
    }
    case "yeast-conversion-calculator": {
      const ady=n(v,'amount'); return {summary:[{label:'Instant yeast equivalent',value:fmt(ady*0.8)+' g'},{label:'Fresh yeast equivalent',value:fmt(ady*2.5)+' g'}]};
    }
    case "dough-ball-weight-calculator": {
      return result('Weight per dough ball',fmt(n(v,'dough')/n(v,'balls'))+' g');
    }
    case "cake-pan-conversion-calculator": {
      const factor=(n(v,'newDiameter')**2)/(n(v,'oldDiameter')**2); return {summary:[{label:'Scale factor',value:fmt(factor)+'×'},{label:'Scaled ingredient amount',value:fmt(n(v,'ingredient')*factor)}]};
    }
    case "crop-factor-calculator": {
      return result('Crop factor',fmt(n(v,'fullFrameDiagonal')/n(v,'sensorDiagonal')));
    }
    case "equivalent-focal-length-calculator": {
      return result('35mm equivalent focal length',fmt(n(v,'focal')*n(v,'crop'))+' mm');
    }
    case "field-of-view-calculator": {
      return result('Field of view',fmt(2*Math.atan(n(v,'sensor')/(2*n(v,'focal')))*180/Math.PI)+'°');
    }
    case "hyperfocal-distance-calculator": {
      const f=n(v,'focal'),H=(f*f/(n(v,'aperture')*n(v,'coc'))+f)/1000; return result('Hyperfocal distance',fmt(H)+' m');
    }
    case "depth-of-field-calculator": {
      const f=n(v,'focal')/1000,s=n(v,'distance'),c=n(v,'coc')/1000,N=n(v,'aperture'),H=f*f/(N*c)+f,near=H*s/(H+(s-f)),far=H<=s?Infinity:H*s/(H-(s-f)); return {summary:[{label:'Near limit',value:fmt(near)+' m'},{label:'Far limit',value:isFinite(far)?fmt(far)+' m':'Infinity'},{label:'Depth of field',value:isFinite(far)?fmt(far-near)+' m':'Extends to infinity'}]};
    }
    case "exposure-value-calculator": {
      return result('Exposure value (EV100)',fmt(Math.log2(n(v,'aperture')**2/n(v,'shutter'))));
    }
    case "shutter-speed-stops-calculator": {
      return result('New shutter time',fmt(n(v,'start')*Math.pow(2,n(v,'stops')),6)+' s');
    }
    case "nd-filter-calculator": {
      return result('Filtered shutter time',fmt(n(v,'base')*Math.pow(2,n(v,'stops')),6)+' s');
    }
    case "timelapse-calculator": {
      const frames=n(v,'duration')*60/n(v,'interval'); return {summary:[{label:'Frames captured',value:fmt(frames)},{label:'Playback duration',value:fmt(frames/n(v,'fps'))+' seconds'}]};
    }
    case "video-bitrate-calculator": {
      return result('Average bitrate',fmt(n(v,'size')*8*1000/(n(v,'minutes')*60))+' Mbps');
    }
    case "video-file-size-calculator": {
      return result('Estimated file size',fmt(n(v,'bitrate')*n(v,'minutes')*60/8/1000)+' GB');
    }
    case "audio-file-size-calculator": {
      return result('Estimated file size',fmt(n(v,'bitrate')*n(v,'minutes')*60/8/1000)+' MB');
    }
    case "recording-time-calculator": {
      return result('Estimated recording time',fmt(n(v,'storage')*8*1000/n(v,'bitrate')/60)+' minutes');
    }
    case "frame-count-calculator": {
      return result('Frame count',fmt(n(v,'seconds')*n(v,'fps')));
    }
    case "frames-to-timecode-converter": {
      const fps=n(v,'fps'),f=Math.floor(n(v,'frames')),h=Math.floor(f/(fps*3600)),m=Math.floor((f%(fps*3600))/(fps*60)),s=Math.floor((f%(fps*60))/fps),fr=f%Math.round(fps); return out([h,m,s,fr].map(x=>String(x).padStart(2,'0')).join(':'));
    }
    default: return out("Tool configuration not found.");
  }
}

export function Batch7591008Tool({kind}:{kind:Batch7591008Kind}) {
  const cfg=CONFIG[kind];
  const defaults=useMemo(()=>Object.fromEntries(cfg.fields.map(f=>[f.key,f.defaultValue??""])),[cfg]);
  const [values,setValues]=useState<Record<string,string>>(defaults);
  const [res,setRes]=useState<ToolResult|null>(null);
  const [error,setError]=useState("");
  function run(){ try{ setError(""); setRes(calculate(kind,values)); }catch(e){ setRes(null); setError(e instanceof Error?e.message:"Unable to calculate result."); } }
  function reset(){ setValues(defaults); setRes(null); setError(""); }
  return <div className="space-y-5">
    <div className="grid gap-4 sm:grid-cols-2">{cfg.fields.map(f=><label key={f.key} className={f.type==='textarea'?"sm:col-span-2 space-y-1.5":"space-y-1.5"}><span className="text-sm font-medium">{f.label}</span>{f.type==='textarea'?<textarea className={textareaClass} value={values[f.key]??""} placeholder={f.placeholder} onChange={e=>setValues(x=>({...x,[f.key]:e.target.value}))}/>:<input className={inputClass} type={f.type==='number'?"number":"text"} step="any" value={values[f.key]??""} placeholder={f.placeholder} onChange={e=>setValues(x=>({...x,[f.key]:e.target.value}))}/>}</label>)}</div>
    {cfg.note&&<p className="text-sm text-muted-foreground">{cfg.note}</p>}
    <div className="flex flex-wrap gap-3"><button className={buttonClass} onClick={run}>{cfg.button??"Run tool"}</button><button className={secondaryButtonClass} onClick={reset}>Reset</button></div>
    {error&&<div className="rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">{error}</div>}
    {res&&<div className="rounded-xl border bg-muted/30 p-5 space-y-4">{res.summary&&<div className="grid gap-3 sm:grid-cols-2">{res.summary.map((x,i)=><div key={i} className="rounded-lg border bg-background p-4"><div className="text-xs uppercase tracking-wide text-muted-foreground">{x.label}</div><div className="mt-1 break-words text-lg font-semibold">{x.value}</div>{x.note&&<div className="mt-1 text-xs text-muted-foreground">{x.note}</div>}</div>)}</div>}{typeof res.output==='string'&&<><div className="flex items-center justify-between gap-3"><div className="text-sm font-medium">Output</div><button className={secondaryButtonClass} onClick={()=>navigator.clipboard?.writeText(res.output??"")}>Copy</button></div><pre className="max-h-96 overflow-auto whitespace-pre-wrap break-words rounded-lg border bg-background p-4 text-sm">{res.output}</pre></>}</div>}
  </div>;
}
