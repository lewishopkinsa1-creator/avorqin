"use client";

import { useMemo, useState } from "react";

export type Batch651758Kind = "px-to-em-converter"
  | "rem-to-em-converter"
  | "em-to-rem-converter"
  | "pt-to-px-converter"
  | "px-to-pt-converter"
  | "vw-to-px-converter"
  | "px-to-vw-converter"
  | "vh-to-px-converter"
  | "px-to-vh-converter"
  | "screen-ppi-calculator"
  | "punycode-encoder"
  | "punycode-decoder"
  | "utf8-byte-counter"
  | "csv-to-sql-converter"
  | "json-to-sql-converter"
  | "sql-to-json-converter"
  | "xml-to-csv-converter"
  | "csv-to-xml-converter"
  | "json-to-toml-converter"
  | "toml-to-json-converter"
  | "yaml-to-toml-converter"
  | "toml-to-yaml-converter"
  | "json-flattener"
  | "json-unflattener"
  | "csv-delimiter-converter"
  | "csv-row-filter"
  | "csv-column-remover"
  | "csv-merge-tool"
  | "xpath-tester"
  | "sql-insert-generator"
  | "chmod-calculator"
  | "ini-to-json-converter"
  | "mortgage-extra-payment-calculator"
  | "pmi-calculator"
  | "mortgage-points-calculator"
  | "closing-cost-calculator"
  | "home-affordability-calculator"
  | "heloc-payment-calculator"
  | "balloon-loan-calculator"
  | "interest-only-loan-calculator"
  | "student-loan-calculator"
  | "car-lease-calculator"
  | "present-value-calculator"
  | "annuity-payment-calculator"
  | "retirement-savings-calculator"
  | "401k-calculator"
  | "roth-ira-calculator"
  | "inflation-calculator"
  | "cd-calculator"
  | "net-worth-calculator"
  | "emergency-fund-calculator"
  | "current-ratio-calculator"
  | "business-burn-rate-calculator"
  | "cash-runway-calculator"
  | "working-capital-calculator"
  | "debt-service-coverage-ratio-calculator"
  | "drywall-mud-calculator"
  | "drywall-screw-calculator"
  | "drywall-cost-calculator"
  | "paint-cost-calculator"
  | "flooring-cost-calculator"
  | "tile-cost-calculator"
  | "fence-post-spacing-calculator"
  | "gutter-size-calculator"
  | "gutter-slope-calculator"
  | "downspout-calculator"
  | "insulation-r-value-calculator"
  | "room-btu-calculator"
  | "hvac-tonnage-calculator"
  | "cfm-calculator"
  | "air-changes-per-hour-calculator"
  | "duct-size-calculator"
  | "pipe-slope-calculator"
  | "water-pressure-loss-calculator"
  | "rainwater-harvesting-calculator"
  | "lawn-seed-calculator"
  | "sod-calculator"
  | "concrete-weight-calculator"
  | "fraction-to-decimal-calculator"
  | "scientific-notation-calculator"
  | "significant-figures-calculator"
  | "rounding-calculator"
  | "arithmetic-sequence-calculator"
  | "geometric-sequence-calculator"
  | "binomial-probability-calculator"
  | "expected-value-calculator"
  | "percentile-calculator"
  | "percentile-rank-calculator"
  | "normal-distribution-calculator"
  | "confidence-interval-calculator"
  | "margin-of-error-calculator"
  | "sample-size-calculator"
  | "correlation-coefficient-calculator"
  | "covariance-calculator"
  | "linear-regression-calculator"
  | "arc-length-calculator"
  | "sector-area-calculator"
  | "ellipse-calculator"
  | "trapezoid-calculator"
  | "polygon-area-calculator"
  | "pcb-trace-width-calculator"
  | "resistor-power-rating-calculator"
  | "capacitor-code-calculator"
  | "battery-pack-series-parallel-calculator"
  | "ups-runtime-calculator"
  | "motor-torque-calculator"
  | "current-density-calculator"
  | "capacitor-discharge-time-calculator";

type ResultItem = { label: string; value: string; note?: string };
type Field = {
  key: string;
  label: string;
  type?: "number" | "input" | "textarea" | "select";
  placeholder?: string;
  defaultValue?: string;
  options?: { label: string; value: string }[];
};
type ToolConfig = { fields: Field[]; button?: string; note?: string };
type ToolResult = { output?: string; summary?: ResultItem[] };

const inputClass =
  "w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary";
const textareaClass =
  "min-h-44 w-full rounded-lg border bg-background px-3 py-2 font-mono text-sm outline-none transition focus:border-primary";
const buttonClass =
  "rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90";
const secondaryButtonClass =
  "rounded-lg border bg-background px-4 py-2 text-sm font-medium hover:bg-muted";

const CONFIG: Record<Batch651758Kind, ToolConfig> = {
  "px-to-em-converter": {
    "fields": [
      {
        "key": "px",
        "label": "Pixels",
        "type": "number"
      },
      {
        "key": "base",
        "label": "Element font size (px)",
        "type": "number",
        "defaultValue": "16"
      }
    ],
    "button": "Convert"
  },
  "rem-to-em-converter": {
    "fields": [
      {
        "key": "rem",
        "label": "REM",
        "type": "number"
      },
      {
        "key": "root",
        "label": "Root font size (px)",
        "type": "number",
        "defaultValue": "16"
      },
      {
        "key": "element",
        "label": "Element font size (px)",
        "type": "number",
        "defaultValue": "16"
      }
    ],
    "button": "Convert"
  },
  "em-to-rem-converter": {
    "fields": [
      {
        "key": "em",
        "label": "EM",
        "type": "number"
      },
      {
        "key": "element",
        "label": "Element font size (px)",
        "type": "number",
        "defaultValue": "16"
      },
      {
        "key": "root",
        "label": "Root font size (px)",
        "type": "number",
        "defaultValue": "16"
      }
    ],
    "button": "Convert"
  },
  "pt-to-px-converter": {
    "fields": [
      {
        "key": "pt",
        "label": "Points (pt)",
        "type": "number"
      }
    ],
    "button": "Convert"
  },
  "px-to-pt-converter": {
    "fields": [
      {
        "key": "px",
        "label": "Pixels (px)",
        "type": "number"
      }
    ],
    "button": "Convert"
  },
  "vw-to-px-converter": {
    "fields": [
      {
        "key": "vw",
        "label": "VW",
        "type": "number"
      },
      {
        "key": "viewport",
        "label": "Viewport width (px)",
        "type": "number",
        "defaultValue": "1440"
      }
    ],
    "button": "Convert"
  },
  "px-to-vw-converter": {
    "fields": [
      {
        "key": "px",
        "label": "Pixels",
        "type": "number"
      },
      {
        "key": "viewport",
        "label": "Viewport width (px)",
        "type": "number",
        "defaultValue": "1440"
      }
    ],
    "button": "Convert"
  },
  "vh-to-px-converter": {
    "fields": [
      {
        "key": "vh",
        "label": "VH",
        "type": "number"
      },
      {
        "key": "viewport",
        "label": "Viewport height (px)",
        "type": "number",
        "defaultValue": "900"
      }
    ],
    "button": "Convert"
  },
  "px-to-vh-converter": {
    "fields": [
      {
        "key": "px",
        "label": "Pixels",
        "type": "number"
      },
      {
        "key": "viewport",
        "label": "Viewport height (px)",
        "type": "number",
        "defaultValue": "900"
      }
    ],
    "button": "Convert"
  },
  "screen-ppi-calculator": {
    "fields": [
      {
        "key": "width",
        "label": "Horizontal pixels",
        "type": "number",
        "defaultValue": "1920"
      },
      {
        "key": "height",
        "label": "Vertical pixels",
        "type": "number",
        "defaultValue": "1080"
      },
      {
        "key": "diagonal",
        "label": "Diagonal size (inches)",
        "type": "number",
        "defaultValue": "24"
      }
    ],
    "button": "Calculate"
  },
  "punycode-encoder": {
    "fields": [
      {
        "key": "text",
        "label": "Unicode domain",
        "type": "input",
        "placeholder": "münich.example"
      }
    ],
    "button": "Encode"
  },
  "punycode-decoder": {
    "fields": [
      {
        "key": "text",
        "label": "Punycode domain",
        "type": "input",
        "placeholder": "xn--mnich-kva.example"
      }
    ],
    "button": "Decode"
  },
  "utf8-byte-counter": {
    "fields": [
      {
        "key": "text",
        "label": "Text",
        "type": "textarea",
        "placeholder": "Paste or type text"
      }
    ],
    "button": "Count"
  },
  "csv-to-sql-converter": {
    "fields": [
      {
        "key": "table",
        "label": "Table name",
        "type": "input",
        "defaultValue": "items"
      },
      {
        "key": "text",
        "label": "CSV data",
        "type": "textarea",
        "placeholder": "id,name\\n1,Alice\\n2,Bob"
      }
    ],
    "button": "Convert"
  },
  "json-to-sql-converter": {
    "fields": [
      {
        "key": "table",
        "label": "Table name",
        "type": "input",
        "defaultValue": "items"
      },
      {
        "key": "text",
        "label": "JSON",
        "type": "textarea",
        "placeholder": "[{\"id\":1,\"name\":\"Alice\"}]"
      }
    ],
    "button": "Convert"
  },
  "sql-to-json-converter": {
    "fields": [
      {
        "key": "text",
        "label": "SQL INSERT statement",
        "type": "textarea",
        "placeholder": "INSERT INTO items (id, name) VALUES (1, 'Alice');"
      }
    ],
    "button": "Convert"
  },
  "xml-to-csv-converter": {
    "fields": [
      {
        "key": "text",
        "label": "XML",
        "type": "textarea",
        "placeholder": "<rows><row><id>1</id><name>Alice</name></row></rows>"
      }
    ],
    "button": "Convert"
  },
  "csv-to-xml-converter": {
    "fields": [
      {
        "key": "root",
        "label": "Root element",
        "type": "input",
        "defaultValue": "rows"
      },
      {
        "key": "row",
        "label": "Row element",
        "type": "input",
        "defaultValue": "row"
      },
      {
        "key": "text",
        "label": "CSV data",
        "type": "textarea",
        "placeholder": "id,name\\n1,Alice"
      }
    ],
    "button": "Convert"
  },
  "json-to-toml-converter": {
    "fields": [
      {
        "key": "text",
        "label": "JSON",
        "type": "textarea",
        "placeholder": "{\"name\":\"Avorqin\",\"settings\":{\"enabled\":true}}"
      }
    ],
    "button": "Convert"
  },
  "toml-to-json-converter": {
    "fields": [
      {
        "key": "text",
        "label": "TOML",
        "type": "textarea",
        "placeholder": "name = \"Avorqin\"\\n[settings]\\nenabled = true"
      }
    ],
    "button": "Convert"
  },
  "yaml-to-toml-converter": {
    "fields": [
      {
        "key": "text",
        "label": "YAML",
        "type": "textarea",
        "placeholder": "name: Avorqin\\nsettings:\\n  enabled: true"
      }
    ],
    "button": "Convert"
  },
  "toml-to-yaml-converter": {
    "fields": [
      {
        "key": "text",
        "label": "TOML",
        "type": "textarea",
        "placeholder": "name = \"Avorqin\"\\n[settings]\\nenabled = true"
      }
    ],
    "button": "Convert"
  },
  "json-flattener": {
    "fields": [
      {
        "key": "text",
        "label": "JSON",
        "type": "textarea",
        "placeholder": "{\"user\":{\"name\":\"Alice\",\"age\":30}}"
      }
    ],
    "button": "Flatten"
  },
  "json-unflattener": {
    "fields": [
      {
        "key": "text",
        "label": "Flat JSON",
        "type": "textarea",
        "placeholder": "{\"user.name\":\"Alice\",\"user.age\":30}"
      }
    ],
    "button": "Unflatten"
  },
  "csv-delimiter-converter": {
    "fields": [
      {
        "key": "from",
        "label": "Input delimiter",
        "type": "select",
        "defaultValue": ",",
        "options": [
          {
            "label": "Comma (,)",
            "value": ","
          },
          {
            "label": "Tab",
            "value": "\\t"
          },
          {
            "label": "Semicolon (;)",
            "value": ";"
          },
          {
            "label": "Pipe (|)",
            "value": "|"
          }
        ]
      },
      {
        "key": "to",
        "label": "Output delimiter",
        "type": "select",
        "defaultValue": "\\t",
        "options": [
          {
            "label": "Comma (,)",
            "value": ","
          },
          {
            "label": "Tab",
            "value": "\\t"
          },
          {
            "label": "Semicolon (;)",
            "value": ";"
          },
          {
            "label": "Pipe (|)",
            "value": "|"
          }
        ]
      },
      {
        "key": "text",
        "label": "Delimited data",
        "type": "textarea",
        "placeholder": "id,name\\n1,Alice"
      }
    ],
    "button": "Convert"
  },
  "csv-row-filter": {
    "fields": [
      {
        "key": "column",
        "label": "Column name",
        "type": "input",
        "defaultValue": "name"
      },
      {
        "key": "match",
        "label": "Contains text",
        "type": "input",
        "defaultValue": "Ali"
      },
      {
        "key": "text",
        "label": "CSV data",
        "type": "textarea",
        "placeholder": "id,name\\n1,Alice\\n2,Bob"
      }
    ],
    "button": "Filter"
  },
  "csv-column-remover": {
    "fields": [
      {
        "key": "columns",
        "label": "Columns to remove (comma separated)",
        "type": "input",
        "defaultValue": "email"
      },
      {
        "key": "text",
        "label": "CSV data",
        "type": "textarea",
        "placeholder": "id,name,email\\n1,Alice,a@example.com"
      }
    ],
    "button": "Remove Columns"
  },
  "csv-merge-tool": {
    "fields": [
      {
        "key": "first",
        "label": "First CSV",
        "type": "textarea",
        "placeholder": "id,name\\n1,Alice"
      },
      {
        "key": "second",
        "label": "Second CSV",
        "type": "textarea",
        "placeholder": "id,name\\n2,Bob"
      }
    ],
    "button": "Merge"
  },
  "xpath-tester": {
    "fields": [
      {
        "key": "xpath",
        "label": "XPath expression",
        "type": "input",
        "defaultValue": "//item"
      },
      {
        "key": "text",
        "label": "XML",
        "type": "textarea",
        "placeholder": "<root><item>A</item><item>B</item></root>"
      }
    ],
    "button": "Test XPath"
  },
  "sql-insert-generator": {
    "fields": [
      {
        "key": "table",
        "label": "Table name",
        "type": "input",
        "defaultValue": "items"
      },
      {
        "key": "text",
        "label": "CSV data",
        "type": "textarea",
        "placeholder": "id,name\\n1,Alice\\n2,Bob"
      }
    ],
    "button": "Generate SQL"
  },
  "chmod-calculator": {
    "fields": [
      {
        "key": "mode",
        "label": "Numeric mode",
        "type": "input",
        "defaultValue": "755"
      }
    ],
    "button": "Convert"
  },
  "ini-to-json-converter": {
    "fields": [
      {
        "key": "text",
        "label": "INI data",
        "type": "textarea",
        "placeholder": "app=Avorqin\n[database]\nhost=localhost\nport=5432"
      }
    ],
    "button": "Convert to JSON",
    "note": "Supports common INI sections, comments, quoted strings, numbers, booleans, and null values."
  },
  "mortgage-extra-payment-calculator": {
    "fields": [
      {
        "key": "principal",
        "label": "Loan balance ($)",
        "type": "number",
        "defaultValue": "300000"
      },
      {
        "key": "rate",
        "label": "Annual interest rate (%)",
        "type": "number",
        "defaultValue": "6.5"
      },
      {
        "key": "years",
        "label": "Remaining term (years)",
        "type": "number",
        "defaultValue": "30"
      },
      {
        "key": "extra",
        "label": "Extra monthly payment ($)",
        "type": "number",
        "defaultValue": "200"
      }
    ],
    "button": "Calculate"
  },
  "pmi-calculator": {
    "fields": [
      {
        "key": "price",
        "label": "Home price ($)",
        "type": "number",
        "defaultValue": "400000"
      },
      {
        "key": "down",
        "label": "Down payment ($)",
        "type": "number",
        "defaultValue": "40000"
      },
      {
        "key": "rate",
        "label": "Annual PMI rate (%)",
        "type": "number",
        "defaultValue": "0.6"
      }
    ],
    "button": "Calculate"
  },
  "mortgage-points-calculator": {
    "fields": [
      {
        "key": "loan",
        "label": "Loan amount ($)",
        "type": "number",
        "defaultValue": "350000"
      },
      {
        "key": "points",
        "label": "Points purchased",
        "type": "number",
        "defaultValue": "1"
      },
      {
        "key": "rateBefore",
        "label": "Rate without points (%)",
        "type": "number",
        "defaultValue": "6.75"
      },
      {
        "key": "rateAfter",
        "label": "Rate with points (%)",
        "type": "number",
        "defaultValue": "6.5"
      },
      {
        "key": "years",
        "label": "Loan term (years)",
        "type": "number",
        "defaultValue": "30"
      }
    ],
    "button": "Calculate"
  },
  "closing-cost-calculator": {
    "fields": [
      {
        "key": "price",
        "label": "Home price ($)",
        "type": "number",
        "defaultValue": "400000"
      },
      {
        "key": "percent",
        "label": "Estimated variable closing costs (%)",
        "type": "number",
        "defaultValue": "3"
      },
      {
        "key": "fixed",
        "label": "Fixed fees ($)",
        "type": "number",
        "defaultValue": "2500"
      }
    ],
    "button": "Calculate"
  },
  "home-affordability-calculator": {
    "fields": [
      {
        "key": "income",
        "label": "Gross annual household income ($)",
        "type": "number",
        "defaultValue": "100000"
      },
      {
        "key": "debts",
        "label": "Monthly debt payments ($)",
        "type": "number",
        "defaultValue": "500"
      },
      {
        "key": "down",
        "label": "Down payment ($)",
        "type": "number",
        "defaultValue": "50000"
      },
      {
        "key": "rate",
        "label": "Mortgage rate (%)",
        "type": "number",
        "defaultValue": "6.5"
      },
      {
        "key": "years",
        "label": "Loan term (years)",
        "type": "number",
        "defaultValue": "30"
      },
      {
        "key": "housing",
        "label": "Monthly taxes + insurance + HOA ($)",
        "type": "number",
        "defaultValue": "650"
      }
    ],
    "button": "Calculate"
  },
  "heloc-payment-calculator": {
    "fields": [
      {
        "key": "balance",
        "label": "HELOC balance ($)",
        "type": "number",
        "defaultValue": "50000"
      },
      {
        "key": "rate",
        "label": "Annual rate (%)",
        "type": "number",
        "defaultValue": "8.5"
      },
      {
        "key": "mode",
        "label": "Payment type",
        "type": "select",
        "defaultValue": "interest",
        "options": [
          {
            "label": "Interest only",
            "value": "interest"
          },
          {
            "label": "Amortized",
            "value": "amortized"
          }
        ]
      },
      {
        "key": "years",
        "label": "Amortization term (years)",
        "type": "number",
        "defaultValue": "15"
      }
    ],
    "button": "Calculate"
  },
  "balloon-loan-calculator": {
    "fields": [
      {
        "key": "principal",
        "label": "Loan amount ($)",
        "type": "number",
        "defaultValue": "200000"
      },
      {
        "key": "rate",
        "label": "Annual interest rate (%)",
        "type": "number",
        "defaultValue": "7"
      },
      {
        "key": "amortYears",
        "label": "Amortization period (years)",
        "type": "number",
        "defaultValue": "30"
      },
      {
        "key": "balloonYears",
        "label": "Balloon due after (years)",
        "type": "number",
        "defaultValue": "5"
      }
    ],
    "button": "Calculate"
  },
  "interest-only-loan-calculator": {
    "fields": [
      {
        "key": "principal",
        "label": "Loan amount ($)",
        "type": "number",
        "defaultValue": "200000"
      },
      {
        "key": "rate",
        "label": "Annual interest rate (%)",
        "type": "number",
        "defaultValue": "7"
      },
      {
        "key": "months",
        "label": "Interest-only period (months)",
        "type": "number",
        "defaultValue": "60"
      }
    ],
    "button": "Calculate"
  },
  "student-loan-calculator": {
    "fields": [
      {
        "key": "principal",
        "label": "Loan balance ($)",
        "type": "number",
        "defaultValue": "35000"
      },
      {
        "key": "rate",
        "label": "Annual interest rate (%)",
        "type": "number",
        "defaultValue": "5.5"
      },
      {
        "key": "years",
        "label": "Repayment term (years)",
        "type": "number",
        "defaultValue": "10"
      }
    ],
    "button": "Calculate"
  },
  "car-lease-calculator": {
    "fields": [
      {
        "key": "msrp",
        "label": "MSRP ($)",
        "type": "number",
        "defaultValue": "40000"
      },
      {
        "key": "price",
        "label": "Negotiated price ($)",
        "type": "number",
        "defaultValue": "38000"
      },
      {
        "key": "residual",
        "label": "Residual value (%)",
        "type": "number",
        "defaultValue": "60"
      },
      {
        "key": "moneyFactor",
        "label": "Money factor",
        "type": "number",
        "defaultValue": "0.0025"
      },
      {
        "key": "months",
        "label": "Lease term (months)",
        "type": "number",
        "defaultValue": "36"
      },
      {
        "key": "down",
        "label": "Capitalized cost reduction ($)",
        "type": "number",
        "defaultValue": "2000"
      },
      {
        "key": "tax",
        "label": "Sales tax on payment (%)",
        "type": "number",
        "defaultValue": "7"
      }
    ],
    "button": "Calculate"
  },
  "present-value-calculator": {
    "fields": [
      {
        "key": "future",
        "label": "Future value ($)",
        "type": "number",
        "defaultValue": "10000"
      },
      {
        "key": "rate",
        "label": "Annual discount rate (%)",
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
        "key": "compounds",
        "label": "Compounds per year",
        "type": "number",
        "defaultValue": "12"
      }
    ],
    "button": "Calculate"
  },
  "annuity-payment-calculator": {
    "fields": [
      {
        "key": "present",
        "label": "Present value / principal ($)",
        "type": "number",
        "defaultValue": "100000"
      },
      {
        "key": "rate",
        "label": "Annual rate (%)",
        "type": "number",
        "defaultValue": "5"
      },
      {
        "key": "years",
        "label": "Years",
        "type": "number",
        "defaultValue": "20"
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
  "retirement-savings-calculator": {
    "fields": [
      {
        "key": "current",
        "label": "Current savings ($)",
        "type": "number",
        "defaultValue": "50000"
      },
      {
        "key": "monthly",
        "label": "Monthly contribution ($)",
        "type": "number",
        "defaultValue": "750"
      },
      {
        "key": "rate",
        "label": "Annual return (%)",
        "type": "number",
        "defaultValue": "7"
      },
      {
        "key": "years",
        "label": "Years",
        "type": "number",
        "defaultValue": "25"
      }
    ],
    "button": "Calculate"
  },
  "401k-calculator": {
    "fields": [
      {
        "key": "current",
        "label": "Current 401(k) balance ($)",
        "type": "number",
        "defaultValue": "50000"
      },
      {
        "key": "salary",
        "label": "Annual salary ($)",
        "type": "number",
        "defaultValue": "90000"
      },
      {
        "key": "employee",
        "label": "Employee contribution (%)",
        "type": "number",
        "defaultValue": "8"
      },
      {
        "key": "match",
        "label": "Employer match rate (%)",
        "type": "number",
        "defaultValue": "50"
      },
      {
        "key": "matchLimit",
        "label": "Employer match up to salary (%)",
        "type": "number",
        "defaultValue": "6"
      },
      {
        "key": "rate",
        "label": "Annual return (%)",
        "type": "number",
        "defaultValue": "7"
      },
      {
        "key": "years",
        "label": "Years",
        "type": "number",
        "defaultValue": "25"
      }
    ],
    "button": "Calculate"
  },
  "roth-ira-calculator": {
    "fields": [
      {
        "key": "current",
        "label": "Current balance ($)",
        "type": "number",
        "defaultValue": "20000"
      },
      {
        "key": "annual",
        "label": "Annual contribution ($)",
        "type": "number",
        "defaultValue": "7000"
      },
      {
        "key": "rate",
        "label": "Annual return (%)",
        "type": "number",
        "defaultValue": "7"
      },
      {
        "key": "years",
        "label": "Years",
        "type": "number",
        "defaultValue": "25"
      }
    ],
    "button": "Calculate"
  },
  "inflation-calculator": {
    "fields": [
      {
        "key": "amount",
        "label": "Today's amount ($)",
        "type": "number",
        "defaultValue": "1000"
      },
      {
        "key": "rate",
        "label": "Annual inflation rate (%)",
        "type": "number",
        "defaultValue": "3"
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
  "cd-calculator": {
    "fields": [
      {
        "key": "deposit",
        "label": "Initial deposit ($)",
        "type": "number",
        "defaultValue": "10000"
      },
      {
        "key": "apy",
        "label": "APY (%)",
        "type": "number",
        "defaultValue": "4.5"
      },
      {
        "key": "years",
        "label": "Term (years)",
        "type": "number",
        "defaultValue": "2"
      }
    ],
    "button": "Calculate"
  },
  "net-worth-calculator": {
    "fields": [
      {
        "key": "assets",
        "label": "Total assets ($)",
        "type": "number",
        "defaultValue": "500000"
      },
      {
        "key": "liabilities",
        "label": "Total liabilities ($)",
        "type": "number",
        "defaultValue": "250000"
      }
    ],
    "button": "Calculate"
  },
  "emergency-fund-calculator": {
    "fields": [
      {
        "key": "expenses",
        "label": "Essential monthly expenses ($)",
        "type": "number",
        "defaultValue": "4000"
      },
      {
        "key": "months",
        "label": "Months of coverage",
        "type": "number",
        "defaultValue": "6"
      },
      {
        "key": "current",
        "label": "Current emergency savings ($)",
        "type": "number",
        "defaultValue": "10000"
      }
    ],
    "button": "Calculate"
  },
  "current-ratio-calculator": {
    "fields": [
      {
        "key": "assets",
        "label": "Current assets ($)",
        "type": "number",
        "defaultValue": "150000"
      },
      {
        "key": "liabilities",
        "label": "Current liabilities ($)",
        "type": "number",
        "defaultValue": "100000"
      }
    ],
    "button": "Calculate"
  },
  "business-burn-rate-calculator": {
    "fields": [
      {
        "key": "start",
        "label": "Starting cash ($)",
        "type": "number",
        "defaultValue": "500000"
      },
      {
        "key": "end",
        "label": "Ending cash ($)",
        "type": "number",
        "defaultValue": "380000"
      },
      {
        "key": "months",
        "label": "Elapsed months",
        "type": "number",
        "defaultValue": "3"
      }
    ],
    "button": "Calculate"
  },
  "cash-runway-calculator": {
    "fields": [
      {
        "key": "cash",
        "label": "Cash available ($)",
        "type": "number",
        "defaultValue": "380000"
      },
      {
        "key": "burn",
        "label": "Monthly net burn ($)",
        "type": "number",
        "defaultValue": "40000"
      }
    ],
    "button": "Calculate"
  },
  "working-capital-calculator": {
    "fields": [
      {
        "key": "assets",
        "label": "Current assets ($)",
        "type": "number",
        "defaultValue": "150000"
      },
      {
        "key": "liabilities",
        "label": "Current liabilities ($)",
        "type": "number",
        "defaultValue": "100000"
      }
    ],
    "button": "Calculate"
  },
  "debt-service-coverage-ratio-calculator": {
    "fields": [
      {
        "key": "noi",
        "label": "Annual net operating income ($)",
        "type": "number",
        "defaultValue": "180000"
      },
      {
        "key": "debt",
        "label": "Annual debt service ($)",
        "type": "number",
        "defaultValue": "120000"
      }
    ],
    "button": "Calculate"
  },
  "drywall-mud-calculator": {
    "fields": [
      {
        "key": "area",
        "label": "Drywall area (sq ft)",
        "type": "number",
        "defaultValue": "1500"
      },
      {
        "key": "coats",
        "label": "Coats / passes",
        "type": "number",
        "defaultValue": "2"
      },
      {
        "key": "coverage",
        "label": "Coverage per gallon per coat (sq ft)",
        "type": "number",
        "defaultValue": "350"
      },
      {
        "key": "waste",
        "label": "Waste allowance (%)",
        "type": "number",
        "defaultValue": "10"
      }
    ],
    "button": "Calculate"
  },
  "drywall-screw-calculator": {
    "fields": [
      {
        "key": "area",
        "label": "Drywall area (sq ft)",
        "type": "number",
        "defaultValue": "1500"
      },
      {
        "key": "sheetArea",
        "label": "Sheet area (sq ft)",
        "type": "number",
        "defaultValue": "32"
      },
      {
        "key": "perSheet",
        "label": "Screws per sheet",
        "type": "number",
        "defaultValue": "32"
      },
      {
        "key": "waste",
        "label": "Waste allowance (%)",
        "type": "number",
        "defaultValue": "10"
      }
    ],
    "button": "Calculate"
  },
  "drywall-cost-calculator": {
    "fields": [
      {
        "key": "area",
        "label": "Drywall area (sq ft)",
        "type": "number",
        "defaultValue": "1500"
      },
      {
        "key": "sheetArea",
        "label": "Sheet area (sq ft)",
        "type": "number",
        "defaultValue": "32"
      },
      {
        "key": "sheetCost",
        "label": "Cost per sheet ($)",
        "type": "number",
        "defaultValue": "15"
      },
      {
        "key": "waste",
        "label": "Waste allowance (%)",
        "type": "number",
        "defaultValue": "10"
      },
      {
        "key": "labor",
        "label": "Labor per sq ft ($)",
        "type": "number",
        "defaultValue": "1.5"
      }
    ],
    "button": "Calculate"
  },
  "paint-cost-calculator": {
    "fields": [
      {
        "key": "area",
        "label": "Paintable area (sq ft)",
        "type": "number",
        "defaultValue": "1200"
      },
      {
        "key": "coats",
        "label": "Coats",
        "type": "number",
        "defaultValue": "2"
      },
      {
        "key": "coverage",
        "label": "Coverage per gallon per coat (sq ft)",
        "type": "number",
        "defaultValue": "350"
      },
      {
        "key": "price",
        "label": "Price per gallon ($)",
        "type": "number",
        "defaultValue": "45"
      }
    ],
    "button": "Calculate"
  },
  "flooring-cost-calculator": {
    "fields": [
      {
        "key": "area",
        "label": "Floor area (sq ft)",
        "type": "number",
        "defaultValue": "800"
      },
      {
        "key": "waste",
        "label": "Waste allowance (%)",
        "type": "number",
        "defaultValue": "10"
      },
      {
        "key": "material",
        "label": "Material cost per sq ft ($)",
        "type": "number",
        "defaultValue": "4.5"
      },
      {
        "key": "labor",
        "label": "Labor cost per sq ft ($)",
        "type": "number",
        "defaultValue": "3"
      }
    ],
    "button": "Calculate"
  },
  "tile-cost-calculator": {
    "fields": [
      {
        "key": "area",
        "label": "Tile area (sq ft)",
        "type": "number",
        "defaultValue": "250"
      },
      {
        "key": "waste",
        "label": "Waste allowance (%)",
        "type": "number",
        "defaultValue": "10"
      },
      {
        "key": "material",
        "label": "Tile cost per sq ft ($)",
        "type": "number",
        "defaultValue": "5"
      },
      {
        "key": "labor",
        "label": "Installation cost per sq ft ($)",
        "type": "number",
        "defaultValue": "6"
      }
    ],
    "button": "Calculate"
  },
  "fence-post-spacing-calculator": {
    "fields": [
      {
        "key": "length",
        "label": "Fence length (ft)",
        "type": "number",
        "defaultValue": "120"
      },
      {
        "key": "spacing",
        "label": "Maximum post spacing (ft)",
        "type": "number",
        "defaultValue": "8"
      }
    ],
    "button": "Calculate"
  },
  "gutter-size-calculator": {
    "fields": [
      {
        "key": "area",
        "label": "Roof drainage area (sq ft)",
        "type": "number",
        "defaultValue": "2000"
      },
      {
        "key": "rain",
        "label": "Rainfall intensity (in/hr)",
        "type": "number",
        "defaultValue": "3"
      }
    ],
    "button": "Calculate",
    "note": "Planning estimate only. Local codes and gutter profiles can require different sizing."
  },
  "gutter-slope-calculator": {
    "fields": [
      {
        "key": "run",
        "label": "Gutter run (ft)",
        "type": "number",
        "defaultValue": "40"
      },
      {
        "key": "dropPer10",
        "label": "Drop per 10 ft (inches)",
        "type": "number",
        "defaultValue": "0.25"
      }
    ],
    "button": "Calculate"
  },
  "downspout-calculator": {
    "fields": [
      {
        "key": "area",
        "label": "Roof drainage area (sq ft)",
        "type": "number",
        "defaultValue": "2000"
      },
      {
        "key": "rain",
        "label": "Rainfall intensity (in/hr)",
        "type": "number",
        "defaultValue": "3"
      },
      {
        "key": "capacity",
        "label": "Planning capacity per downspout (GPM)",
        "type": "number",
        "defaultValue": "20"
      }
    ],
    "button": "Calculate"
  },
  "insulation-r-value-calculator": {
    "fields": [
      {
        "key": "existing",
        "label": "Existing R-value",
        "type": "number",
        "defaultValue": "13"
      },
      {
        "key": "thickness",
        "label": "Added insulation thickness (inches)",
        "type": "number",
        "defaultValue": "6"
      },
      {
        "key": "rPerInch",
        "label": "Added material R-value per inch",
        "type": "number",
        "defaultValue": "3.5"
      }
    ],
    "button": "Calculate"
  },
  "room-btu-calculator": {
    "fields": [
      {
        "key": "area",
        "label": "Room area (sq ft)",
        "type": "number",
        "defaultValue": "400"
      },
      {
        "key": "height",
        "label": "Ceiling height (ft)",
        "type": "number",
        "defaultValue": "8"
      },
      {
        "key": "btuPerSqFt",
        "label": "Base BTU per sq ft at 8 ft ceiling",
        "type": "number",
        "defaultValue": "20"
      },
      {
        "key": "factor",
        "label": "Insulation / climate adjustment factor",
        "type": "number",
        "defaultValue": "1"
      }
    ],
    "button": "Calculate"
  },
  "hvac-tonnage-calculator": {
    "fields": [
      {
        "key": "area",
        "label": "Conditioned area (sq ft)",
        "type": "number",
        "defaultValue": "2000"
      },
      {
        "key": "btuPerSqFt",
        "label": "Planning load (BTU/hr per sq ft)",
        "type": "number",
        "defaultValue": "20"
      }
    ],
    "button": "Calculate",
    "note": "Rule-of-thumb planning estimate only; use a Manual J load calculation for final HVAC sizing."
  },
  "cfm-calculator": {
    "fields": [
      {
        "key": "length",
        "label": "Room length (ft)",
        "type": "number",
        "defaultValue": "20"
      },
      {
        "key": "width",
        "label": "Room width (ft)",
        "type": "number",
        "defaultValue": "15"
      },
      {
        "key": "height",
        "label": "Room height (ft)",
        "type": "number",
        "defaultValue": "8"
      },
      {
        "key": "ach",
        "label": "Desired air changes per hour",
        "type": "number",
        "defaultValue": "6"
      }
    ],
    "button": "Calculate"
  },
  "air-changes-per-hour-calculator": {
    "fields": [
      {
        "key": "length",
        "label": "Room length (ft)",
        "type": "number",
        "defaultValue": "20"
      },
      {
        "key": "width",
        "label": "Room width (ft)",
        "type": "number",
        "defaultValue": "15"
      },
      {
        "key": "height",
        "label": "Room height (ft)",
        "type": "number",
        "defaultValue": "8"
      },
      {
        "key": "cfm",
        "label": "Airflow (CFM)",
        "type": "number",
        "defaultValue": "240"
      }
    ],
    "button": "Calculate"
  },
  "duct-size-calculator": {
    "fields": [
      {
        "key": "cfm",
        "label": "Airflow (CFM)",
        "type": "number",
        "defaultValue": "800"
      },
      {
        "key": "velocity",
        "label": "Target air velocity (FPM)",
        "type": "number",
        "defaultValue": "700"
      }
    ],
    "button": "Calculate"
  },
  "pipe-slope-calculator": {
    "fields": [
      {
        "key": "run",
        "label": "Horizontal run (ft)",
        "type": "number",
        "defaultValue": "50"
      },
      {
        "key": "slope",
        "label": "Slope (%)",
        "type": "number",
        "defaultValue": "2"
      }
    ],
    "button": "Calculate"
  },
  "water-pressure-loss-calculator": {
    "fields": [
      {
        "key": "length",
        "label": "Pipe length (ft)",
        "type": "number",
        "defaultValue": "100"
      },
      {
        "key": "flow",
        "label": "Flow (GPM)",
        "type": "number",
        "defaultValue": "10"
      },
      {
        "key": "diameter",
        "label": "Inside diameter (inches)",
        "type": "number",
        "defaultValue": "1"
      },
      {
        "key": "c",
        "label": "Hazen-Williams C coefficient",
        "type": "number",
        "defaultValue": "150"
      }
    ],
    "button": "Calculate",
    "note": "Hazen-Williams is an empirical water-flow estimate and is not appropriate for every fluid or piping condition."
  },
  "rainwater-harvesting-calculator": {
    "fields": [
      {
        "key": "area",
        "label": "Roof catchment area (sq ft)",
        "type": "number",
        "defaultValue": "1500"
      },
      {
        "key": "rain",
        "label": "Rainfall depth (inches)",
        "type": "number",
        "defaultValue": "1"
      },
      {
        "key": "runoff",
        "label": "Runoff coefficient",
        "type": "number",
        "defaultValue": "0.9"
      }
    ],
    "button": "Calculate"
  },
  "lawn-seed-calculator": {
    "fields": [
      {
        "key": "area",
        "label": "Lawn area (sq ft)",
        "type": "number",
        "defaultValue": "5000"
      },
      {
        "key": "rate",
        "label": "Seeding rate (lb per 1,000 sq ft)",
        "type": "number",
        "defaultValue": "5"
      }
    ],
    "button": "Calculate"
  },
  "sod-calculator": {
    "fields": [
      {
        "key": "area",
        "label": "Lawn area (sq ft)",
        "type": "number",
        "defaultValue": "2000"
      },
      {
        "key": "pieceArea",
        "label": "Area per sod piece (sq ft)",
        "type": "number",
        "defaultValue": "2.67"
      },
      {
        "key": "waste",
        "label": "Waste allowance (%)",
        "type": "number",
        "defaultValue": "5"
      }
    ],
    "button": "Calculate"
  },
  "concrete-weight-calculator": {
    "fields": [
      {
        "key": "volume",
        "label": "Concrete volume (cubic ft)",
        "type": "number",
        "defaultValue": "27"
      },
      {
        "key": "density",
        "label": "Concrete density (lb/cubic ft)",
        "type": "number",
        "defaultValue": "145"
      }
    ],
    "button": "Calculate"
  },
  "fraction-to-decimal-calculator": {
    "fields": [
      {
        "key": "numerator",
        "label": "Numerator",
        "type": "number",
        "defaultValue": "1"
      },
      {
        "key": "denominator",
        "label": "Denominator",
        "type": "number",
        "defaultValue": "8"
      }
    ],
    "button": "Calculate"
  },
  "scientific-notation-calculator": {
    "fields": [
      {
        "key": "value",
        "label": "Number",
        "type": "input",
        "defaultValue": "1234567"
      }
    ],
    "button": "Calculate"
  },
  "significant-figures-calculator": {
    "fields": [
      {
        "key": "value",
        "label": "Number",
        "type": "input",
        "defaultValue": "12345.6789"
      },
      {
        "key": "figures",
        "label": "Significant figures",
        "type": "number",
        "defaultValue": "4"
      }
    ],
    "button": "Calculate"
  },
  "rounding-calculator": {
    "fields": [
      {
        "key": "value",
        "label": "Number",
        "type": "number",
        "defaultValue": "123.456789"
      },
      {
        "key": "places",
        "label": "Decimal places",
        "type": "number",
        "defaultValue": "2"
      }
    ],
    "button": "Calculate"
  },
  "arithmetic-sequence-calculator": {
    "fields": [
      {
        "key": "first",
        "label": "First term",
        "type": "number",
        "defaultValue": "3"
      },
      {
        "key": "difference",
        "label": "Common difference",
        "type": "number",
        "defaultValue": "5"
      },
      {
        "key": "n",
        "label": "Term number n",
        "type": "number",
        "defaultValue": "10"
      }
    ],
    "button": "Calculate"
  },
  "geometric-sequence-calculator": {
    "fields": [
      {
        "key": "first",
        "label": "First term",
        "type": "number",
        "defaultValue": "3"
      },
      {
        "key": "ratio",
        "label": "Common ratio",
        "type": "number",
        "defaultValue": "2"
      },
      {
        "key": "n",
        "label": "Term number n",
        "type": "number",
        "defaultValue": "8"
      }
    ],
    "button": "Calculate"
  },
  "binomial-probability-calculator": {
    "fields": [
      {
        "key": "n",
        "label": "Number of trials n",
        "type": "number",
        "defaultValue": "10"
      },
      {
        "key": "k",
        "label": "Successes k",
        "type": "number",
        "defaultValue": "3"
      },
      {
        "key": "p",
        "label": "Probability of success p",
        "type": "number",
        "defaultValue": "0.5"
      }
    ],
    "button": "Calculate"
  },
  "expected-value-calculator": {
    "fields": [
      {
        "key": "outcomes",
        "label": "Outcomes (comma separated)",
        "type": "input",
        "defaultValue": "0,10,20"
      },
      {
        "key": "probabilities",
        "label": "Probabilities (comma separated)",
        "type": "input",
        "defaultValue": "0.2,0.5,0.3"
      }
    ],
    "button": "Calculate"
  },
  "percentile-calculator": {
    "fields": [
      {
        "key": "data",
        "label": "Numbers (comma or space separated)",
        "type": "textarea",
        "placeholder": "10, 20, 30, 40, 50"
      },
      {
        "key": "percentile",
        "label": "Percentile (0-100)",
        "type": "number",
        "defaultValue": "75"
      }
    ],
    "button": "Calculate"
  },
  "percentile-rank-calculator": {
    "fields": [
      {
        "key": "data",
        "label": "Numbers (comma or space separated)",
        "type": "textarea",
        "placeholder": "10, 20, 30, 40, 50"
      },
      {
        "key": "value",
        "label": "Value",
        "type": "number",
        "defaultValue": "30"
      }
    ],
    "button": "Calculate"
  },
  "normal-distribution-calculator": {
    "fields": [
      {
        "key": "x",
        "label": "Value x",
        "type": "number",
        "defaultValue": "115"
      },
      {
        "key": "mean",
        "label": "Mean",
        "type": "number",
        "defaultValue": "100"
      },
      {
        "key": "sd",
        "label": "Standard deviation",
        "type": "number",
        "defaultValue": "15"
      }
    ],
    "button": "Calculate"
  },
  "confidence-interval-calculator": {
    "fields": [
      {
        "key": "mean",
        "label": "Sample mean",
        "type": "number",
        "defaultValue": "50"
      },
      {
        "key": "sd",
        "label": "Sample standard deviation",
        "type": "number",
        "defaultValue": "10"
      },
      {
        "key": "n",
        "label": "Sample size",
        "type": "number",
        "defaultValue": "100"
      },
      {
        "key": "confidence",
        "label": "Confidence level",
        "type": "select",
        "defaultValue": "95",
        "options": [
          {
            "label": "90%",
            "value": "90"
          },
          {
            "label": "95%",
            "value": "95"
          },
          {
            "label": "99%",
            "value": "99"
          }
        ]
      }
    ],
    "button": "Calculate"
  },
  "margin-of-error-calculator": {
    "fields": [
      {
        "key": "sd",
        "label": "Sample standard deviation",
        "type": "number",
        "defaultValue": "10"
      },
      {
        "key": "n",
        "label": "Sample size",
        "type": "number",
        "defaultValue": "100"
      },
      {
        "key": "confidence",
        "label": "Confidence level",
        "type": "select",
        "defaultValue": "95",
        "options": [
          {
            "label": "90%",
            "value": "90"
          },
          {
            "label": "95%",
            "value": "95"
          },
          {
            "label": "99%",
            "value": "99"
          }
        ]
      }
    ],
    "button": "Calculate"
  },
  "sample-size-calculator": {
    "fields": [
      {
        "key": "margin",
        "label": "Margin of error (%)",
        "type": "number",
        "defaultValue": "5"
      },
      {
        "key": "proportion",
        "label": "Expected proportion (0-1)",
        "type": "number",
        "defaultValue": "0.5"
      },
      {
        "key": "confidence",
        "label": "Confidence level",
        "type": "select",
        "defaultValue": "95",
        "options": [
          {
            "label": "90%",
            "value": "90"
          },
          {
            "label": "95%",
            "value": "95"
          },
          {
            "label": "99%",
            "value": "99"
          }
        ]
      }
    ],
    "button": "Calculate"
  },
  "correlation-coefficient-calculator": {
    "fields": [
      {
        "key": "x",
        "label": "X values",
        "type": "textarea",
        "placeholder": "1,2,3,4,5"
      },
      {
        "key": "y",
        "label": "Y values",
        "type": "textarea",
        "placeholder": "2,4,5,4,5"
      }
    ],
    "button": "Calculate"
  },
  "covariance-calculator": {
    "fields": [
      {
        "key": "x",
        "label": "X values",
        "type": "textarea",
        "placeholder": "1,2,3,4,5"
      },
      {
        "key": "y",
        "label": "Y values",
        "type": "textarea",
        "placeholder": "2,4,5,4,5"
      },
      {
        "key": "mode",
        "label": "Covariance type",
        "type": "select",
        "defaultValue": "sample",
        "options": [
          {
            "label": "Sample",
            "value": "sample"
          },
          {
            "label": "Population",
            "value": "population"
          }
        ]
      }
    ],
    "button": "Calculate"
  },
  "linear-regression-calculator": {
    "fields": [
      {
        "key": "x",
        "label": "X values",
        "type": "textarea",
        "placeholder": "1,2,3,4,5"
      },
      {
        "key": "y",
        "label": "Y values",
        "type": "textarea",
        "placeholder": "2,4,5,4,5"
      }
    ],
    "button": "Calculate"
  },
  "arc-length-calculator": {
    "fields": [
      {
        "key": "radius",
        "label": "Radius",
        "type": "number",
        "defaultValue": "10"
      },
      {
        "key": "angle",
        "label": "Central angle (degrees)",
        "type": "number",
        "defaultValue": "90"
      }
    ],
    "button": "Calculate"
  },
  "sector-area-calculator": {
    "fields": [
      {
        "key": "radius",
        "label": "Radius",
        "type": "number",
        "defaultValue": "10"
      },
      {
        "key": "angle",
        "label": "Central angle (degrees)",
        "type": "number",
        "defaultValue": "90"
      }
    ],
    "button": "Calculate"
  },
  "ellipse-calculator": {
    "fields": [
      {
        "key": "a",
        "label": "Semi-major axis a",
        "type": "number",
        "defaultValue": "10"
      },
      {
        "key": "b",
        "label": "Semi-minor axis b",
        "type": "number",
        "defaultValue": "6"
      }
    ],
    "button": "Calculate"
  },
  "trapezoid-calculator": {
    "fields": [
      {
        "key": "a",
        "label": "Base a",
        "type": "number",
        "defaultValue": "10"
      },
      {
        "key": "b",
        "label": "Base b",
        "type": "number",
        "defaultValue": "6"
      },
      {
        "key": "height",
        "label": "Height",
        "type": "number",
        "defaultValue": "4"
      }
    ],
    "button": "Calculate"
  },
  "polygon-area-calculator": {
    "fields": [
      {
        "key": "points",
        "label": "Points, one x,y pair per line",
        "type": "textarea",
        "placeholder": "0,0\\n4,0\\n4,3\\n0,3"
      }
    ],
    "button": "Calculate"
  },
  "pcb-trace-width-calculator": {
    "fields": [
      {
        "key": "current",
        "label": "Current (A)",
        "type": "number",
        "defaultValue": "2"
      },
      {
        "key": "rise",
        "label": "Allowed temperature rise (°C)",
        "type": "number",
        "defaultValue": "10"
      },
      {
        "key": "copper",
        "label": "Copper weight (oz/ft²)",
        "type": "number",
        "defaultValue": "1"
      }
    ],
    "button": "Calculate",
    "note": "Uses the common IPC-2221 external-trace approximation; modern fabrication and standards can require more detailed analysis."
  },
  "resistor-power-rating-calculator": {
    "fields": [
      {
        "key": "voltage",
        "label": "Voltage across resistor (V)",
        "type": "number",
        "defaultValue": "12"
      },
      {
        "key": "resistance",
        "label": "Resistance (ohms)",
        "type": "number",
        "defaultValue": "100"
      }
    ],
    "button": "Calculate"
  },
  "capacitor-code-calculator": {
    "fields": [
      {
        "key": "code",
        "label": "Three-digit capacitor code",
        "type": "input",
        "defaultValue": "104"
      }
    ],
    "button": "Decode"
  },
  "battery-pack-series-parallel-calculator": {
    "fields": [
      {
        "key": "cellVoltage",
        "label": "Cell nominal voltage (V)",
        "type": "number",
        "defaultValue": "3.7"
      },
      {
        "key": "cellAh",
        "label": "Cell capacity (Ah)",
        "type": "number",
        "defaultValue": "3"
      },
      {
        "key": "series",
        "label": "Cells in series",
        "type": "number",
        "defaultValue": "4"
      },
      {
        "key": "parallel",
        "label": "Parallel strings",
        "type": "number",
        "defaultValue": "2"
      }
    ],
    "button": "Calculate"
  },
  "ups-runtime-calculator": {
    "fields": [
      {
        "key": "voltage",
        "label": "Battery voltage (V)",
        "type": "number",
        "defaultValue": "24"
      },
      {
        "key": "ah",
        "label": "Battery capacity (Ah)",
        "type": "number",
        "defaultValue": "18"
      },
      {
        "key": "load",
        "label": "Load (W)",
        "type": "number",
        "defaultValue": "300"
      },
      {
        "key": "efficiency",
        "label": "Inverter efficiency (%)",
        "type": "number",
        "defaultValue": "85"
      },
      {
        "key": "usable",
        "label": "Usable battery capacity (%)",
        "type": "number",
        "defaultValue": "80"
      }
    ],
    "button": "Calculate",
    "note": "UPS runtime is a rough energy estimate; real runtime changes with battery age, discharge rate, inverter losses, and manufacturer controls."
  },
  "motor-torque-calculator": {
    "fields": [
      {
        "key": "power",
        "label": "Shaft power (kW)",
        "type": "number",
        "defaultValue": "5.5"
      },
      {
        "key": "rpm",
        "label": "Speed (RPM)",
        "type": "number",
        "defaultValue": "1750"
      }
    ],
    "button": "Calculate"
  },
  "current-density-calculator": {
    "fields": [
      {
        "key": "current",
        "label": "Current (A)",
        "type": "number",
        "defaultValue": "10"
      },
      {
        "key": "area",
        "label": "Conductor cross-sectional area (mm²)",
        "type": "number",
        "defaultValue": "2.5"
      }
    ],
    "button": "Calculate"
  },
  "capacitor-discharge-time-calculator": {
    "fields": [
      {
        "key": "resistance",
        "label": "Resistance (ohms)",
        "type": "number",
        "defaultValue": "10000"
      },
      {
        "key": "capacitance",
        "label": "Capacitance (µF)",
        "type": "number",
        "defaultValue": "100"
      },
      {
        "key": "start",
        "label": "Starting voltage (V)",
        "type": "number",
        "defaultValue": "12"
      },
      {
        "key": "target",
        "label": "Target voltage (V)",
        "type": "number",
        "defaultValue": "1"
      }
    ],
    "button": "Calculate"
  }
};

const S = (...pairs: [string, string][]): ResultItem[] =>
  pairs.map(([label, value]) => ({ label, value }));

function num(v: string, label: string): number {
  const n = Number(v);
  if (!Number.isFinite(n)) throw new Error(`${label} must be a valid number.`);
  return n;
}
function pos(v: string, label: string): number {
  const n = num(v, label);
  if (n <= 0) throw new Error(`${label} must be greater than zero.`);
  return n;
}
function nonneg(v: string, label: string): number {
  const n = num(v, label);
  if (n < 0) throw new Error(`${label} cannot be negative.`);
  return n;
}
function integer(v: string, label: string): number {
  const n = num(v, label);
  if (!Number.isSafeInteger(n)) throw new Error(`${label} must be a whole number.`);
  return n;
}
function fmt(n: number, digits = 6): string {
  if (!Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  if (abs !== 0 && (abs >= 1e9 || abs < 1e-6))
    return n.toExponential(Math.min(6, digits));
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits,
  }).format(n);
}
function money(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(n);
}
function pct(n: number, digits = 2): string {
  return `${fmt(n, digits)}%`;
}
function parseList(text: string): number[] {
  const values = text
    .trim()
    .split(/[\s,;]+/)
    .filter(Boolean)
    .map(Number);
  if (!values.length || values.some((n) => !Number.isFinite(n)))
    throw new Error("Enter a valid list of numbers.");
  return values;
}
function zFor(level: string): number {
  if (level === "90") return 1.6448536269514722;
  if (level === "99") return 2.5758293035489004;
  return 1.959963984540054;
}
function pmt(principal: number, annualRatePct: number, months: number): number {
  if (months <= 0) throw new Error("Term must be greater than zero.");
  const r = annualRatePct / 100 / 12;
  if (Math.abs(r) < 1e-12) return principal / months;
  return (principal * r) / (1 - Math.pow(1 + r, -months));
}
function remainingBalance(
  principal: number,
  annualRatePct: number,
  totalMonths: number,
  paidMonths: number
): number {
  const payment = pmt(principal, annualRatePct, totalMonths);
  const r = annualRatePct / 100 / 12;
  if (Math.abs(r) < 1e-12)
    return Math.max(0, principal - payment * paidMonths);
  return Math.max(
    0,
    principal * Math.pow(1 + r, paidMonths) -
      payment * ((Math.pow(1 + r, paidMonths) - 1) / r)
  );
}
function amortizeWithExtra(
  principal: number,
  annualRatePct: number,
  months: number,
  extra: number
) {
  const required = pmt(principal, annualRatePct, months);
  const r = annualRatePct / 100 / 12;
  let balance = principal;
  let totalInterest = 0;
  let count = 0;
  while (balance > 0.005 && count < months * 5 + 1200) {
    const interest = balance * r;
    const payment = Math.min(balance + interest, required + extra);
    balance = balance + interest - payment;
    totalInterest += interest;
    count++;
  }
  return { months: count, totalInterest, required, payment: required + extra };
}

function quoteCsv(value: string, delim: string) {
  if (
    value.includes('"') ||
    value.includes("\n") ||
    value.includes("\r") ||
    value.includes(delim)
  )
    return `"${value.replace(/"/g, '""')}"`;
  return value;
}
function parseDelimited(text: string, delimiter = ","): string[][] {
  const d = delimiter === "\\t" ? "\t" : delimiter;
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') {
        quoted = false;
      } else {
        cell += ch;
      }
    } else if (ch === '"') {
      quoted = true;
    } else if (ch === d) {
      row.push(cell);
      cell = "";
    } else if (ch === "\n") {
      row.push(cell.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += ch;
    }
  }
  row.push(cell.replace(/\r$/, ""));
  if (row.length > 1 || row[0] !== "" || !rows.length) rows.push(row);
  return rows.filter((r) => r.some((c) => c !== ""));
}
function stringifyDelimited(rows: string[][], delimiter = ","): string {
  const d = delimiter === "\\t" ? "\t" : delimiter;
  return rows.map((r) => r.map((c) => quoteCsv(c, d)).join(d)).join("\n");
}
function sqlIdent(value: string): string {
  const cleaned = value.trim();
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(cleaned))
    throw new Error(`Invalid SQL identifier: ${value}`);
  return cleaned;
}
function sqlValue(value: unknown): string {
  if (value === null || value === undefined) return "NULL";
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  if (typeof value === "boolean") return value ? "TRUE" : "FALSE";
  const s = String(value);
  if (/^-?(?:\d+|\d*\.\d+)$/.test(s.trim())) return s.trim();
  if (/^null$/i.test(s.trim())) return "NULL";
  if (/^(true|false)$/i.test(s.trim())) return s.trim().toUpperCase();
  return `'${s.replace(/'/g, "''")}'`;
}
function rowsToInsert(tableRaw: string, rows: string[][]): string {
  if (rows.length < 2) throw new Error("CSV must include a header and at least one data row.");
  const table = sqlIdent(tableRaw);
  const headers = rows[0].map(sqlIdent);
  return rows
    .slice(1)
    .filter((r) => r.some((c) => c.trim() !== ""))
    .map((r) => {
      const vals = headers.map((_, i) => sqlValue(r[i] ?? ""));
      return `INSERT INTO ${table} (${headers.join(", ")}) VALUES (${vals.join(", ")});`;
    })
    .join("\n");
}
function splitSqlValues(text: string): string[] {
  const values: string[] = [];
  let cur = "";
  let quoted = false;
  let depth = 0;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === "'" && text[i + 1] === "'") {
        cur += "''";
        i++;
      } else if (ch === "'") {
        quoted = false;
        cur += ch;
      } else cur += ch;
    } else if (ch === "'") {
      quoted = true;
      cur += ch;
    } else if (ch === "(") {
      depth++;
      cur += ch;
    } else if (ch === ")") {
      depth--;
      cur += ch;
    } else if (ch === "," && depth === 0) {
      values.push(cur.trim());
      cur = "";
    } else cur += ch;
  }
  values.push(cur.trim());
  return values;
}
function parseSqlLiteral(raw: string): unknown {
  const s = raw.trim();
  if (/^NULL$/i.test(s)) return null;
  if (/^TRUE$/i.test(s)) return true;
  if (/^FALSE$/i.test(s)) return false;
  if (/^-?(?:\d+|\d*\.\d+)(?:e[+-]?\d+)?$/i.test(s)) return Number(s);
  if (s.startsWith("'") && s.endsWith("'"))
    return s.slice(1, -1).replace(/''/g, "'");
  return s;
}
function parseInsertSql(sql: string): unknown[] {
  const m = sql.match(
    /INSERT\s+INTO\s+[A-Za-z_][A-Za-z0-9_]*\s*\(([^)]+)\)\s*VALUES\s*([\s\S]+?);?\s*$/i
  );
  if (!m) throw new Error("Use an INSERT INTO table (columns) VALUES (...) statement.");
  const cols = m[1].split(",").map((c) => c.trim().replace(/^["`]|["`]$/g, ""));
  const valuePart = m[2].replace(/;\s*$/, "").trim();
  const groups: string[] = [];
  let depth = 0, quoted = false, start = -1;
  for (let i = 0; i < valuePart.length; i++) {
    const ch = valuePart[i];
    if (quoted) {
      if (ch === "'" && valuePart[i + 1] === "'") i++;
      else if (ch === "'") quoted = false;
    } else if (ch === "'") quoted = true;
    else if (ch === "(") {
      if (depth === 0) start = i + 1;
      depth++;
    } else if (ch === ")") {
      depth--;
      if (depth === 0 && start >= 0) groups.push(valuePart.slice(start, i));
    }
  }
  if (!groups.length) throw new Error("No VALUES rows were found.");
  return groups.map((g) => {
    const vals = splitSqlValues(g);
    const obj: Record<string, unknown> = {};
    cols.forEach((c, i) => (obj[c] = parseSqlLiteral(vals[i] ?? "NULL")));
    return obj;
  });
}

function parseScalar(raw: string): unknown {
  const s = raw.trim();
  if (!s) return "";
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'")))
    return s.slice(1, -1).replace(/\\"/g, '"');
  if (/^(true|false)$/i.test(s)) return /^true$/i.test(s);
  if (/^[+-]?(?:\d+|\d*\.\d+)(?:e[+-]?\d+)?$/i.test(s)) return Number(s);
  if (s.startsWith("[") && s.endsWith("]")) {
    return splitSqlValues(s.slice(1, -1)).map(parseScalar);
  }
  return s;
}
function setPath(root: Record<string, any>, path: string[], value: unknown) {
  let cur = root;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    if (!cur[key] || typeof cur[key] !== "object" || Array.isArray(cur[key])) cur[key] = {};
    cur = cur[key];
  }
  cur[path[path.length - 1]] = value;
}
function parseToml(text: string): Record<string, any> {
  const out: Record<string, any> = {};
  let section: string[] = [];
  for (const original of text.split(/\r?\n/)) {
    const line = original.trim();
    if (!line || line.startsWith("#")) continue;
    const sec = line.match(/^\[([^\]]+)\]$/);
    if (sec) {
      section = sec[1].split(".").map((x) => x.trim().replace(/^"|"$/g, ""));
      continue;
    }
    const eq = line.indexOf("=");
    if (eq < 1) throw new Error(`Unsupported TOML line: ${original}`);
    const key = line.slice(0, eq).trim().replace(/^"|"$/g, "");
    const val = line.slice(eq + 1).replace(/\s+#.*$/, "").trim();
    setPath(out, [...section, key], parseScalar(val));
  }
  return out;
}
function tomlScalar(v: unknown): string {
  if (v === null) return '""';
  if (typeof v === "boolean" || typeof v === "number") return String(v);
  if (Array.isArray(v)) return `[${v.map(tomlScalar).join(", ")}]`;
  return JSON.stringify(String(v));
}
function toToml(obj: any): string {
  if (!obj || typeof obj !== "object" || Array.isArray(obj))
    throw new Error("TOML conversion expects a JSON object.");
  const lines: string[] = [];
  const tables: { path: string[]; value: Record<string, any> }[] = [];
  const walk = (value: Record<string, any>, path: string[]) => {
    const scalars = Object.entries(value).filter(
      ([, v]) => !(v && typeof v === "object" && !Array.isArray(v))
    );
    if (path.length) lines.push(`[${path.join(".")}]`);
    for (const [k, v] of scalars) lines.push(`${k} = ${tomlScalar(v)}`);
    if (path.length && scalars.length) lines.push("");
    for (const [k, v] of Object.entries(value))
      if (v && typeof v === "object" && !Array.isArray(v))
        tables.push({ path: [...path, k], value: v as Record<string, any> });
  };
  walk(obj, []);
  while (tables.length) {
    const t = tables.shift()!;
    walk(t.value, t.path);
  }
  return lines.join("\n").trim();
}
function parseSimpleYaml(text: string): Record<string, any> {
  const root: Record<string, any> = {};
  const stack: { indent: number; obj: Record<string, any> }[] = [{ indent: -1, obj: root }];
  for (const original of text.split(/\r?\n/)) {
    if (!original.trim() || original.trim().startsWith("#")) continue;
    const indent = original.match(/^\s*/)?.[0].length ?? 0;
    const line = original.trim();
    const colon = line.indexOf(":");
    if (colon < 1) throw new Error(`Unsupported YAML line: ${original}`);
    const key = line.slice(0, colon).trim().replace(/^["']|["']$/g, "");
    const rest = line.slice(colon + 1).trim();
    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) stack.pop();
    const parent = stack[stack.length - 1].obj;
    if (!rest) {
      const child: Record<string, any> = {};
      parent[key] = child;
      stack.push({ indent, obj: child });
    } else parent[key] = parseScalar(rest);
  }
  return root;
}
function yamlScalar(v: unknown): string {
  if (v === null) return "null";
  if (typeof v === "boolean" || typeof v === "number") return String(v);
  if (Array.isArray(v)) return `[${v.map(yamlScalar).join(", ")}]`;
  const s = String(v);
  return /[:#\[\]{},&*!|>'"%@`]/.test(s) ? JSON.stringify(s) : s;
}
function toYaml(obj: any, indent = 0): string {
  if (!obj || typeof obj !== "object" || Array.isArray(obj))
    return `${" ".repeat(indent)}${yamlScalar(obj)}`;
  const lines: string[] = [];
  for (const [k, v] of Object.entries(obj)) {
    const pad = " ".repeat(indent);
    if (v && typeof v === "object" && !Array.isArray(v)) {
      lines.push(`${pad}${k}:`);
      lines.push(toYaml(v, indent + 2));
    } else lines.push(`${pad}${k}: ${yamlScalar(v)}`);
  }
  return lines.join("\n");
}
function flattenObject(obj: any, prefix = "", out: Record<string, unknown> = {}) {
  if (obj && typeof obj === "object" && !Array.isArray(obj)) {
    for (const [k, v] of Object.entries(obj))
      flattenObject(v, prefix ? `${prefix}.${k}` : k, out);
  } else out[prefix] = obj;
  return out;
}
function unflattenObject(obj: Record<string, unknown>) {
  const out: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) setPath(out, key.split("."), value);
  return out;
}

function punyAdapt(delta: number, numPoints: number, firstTime: boolean) {
  delta = firstTime ? Math.floor(delta / 700) : delta >> 1;
  delta += Math.floor(delta / numPoints);
  let k = 0;
  while (delta > 455) {
    delta = Math.floor(delta / 35);
    k += 36;
  }
  return k + Math.floor((36 * delta) / (delta + 38));
}
function punyDigit(cp: number) {
  if (cp >= 48 && cp <= 57) return cp - 22;
  if (cp >= 65 && cp <= 90) return cp - 65;
  if (cp >= 97 && cp <= 122) return cp - 97;
  return 36;
}
function decodePunyLabel(input: string) {
  let n = 128, i = 0, bias = 72;
  const output: number[] = [];
  const dash = input.lastIndexOf("-");
  let index = 0;
  if (dash >= 0) {
    for (let j = 0; j < dash; j++) output.push(input.charCodeAt(j));
    index = dash + 1;
  }
  while (index < input.length) {
    const oldi = i;
    let w = 1;
    for (let k = 36; ; k += 36) {
      if (index >= input.length) throw new Error("Invalid Punycode label.");
      const digit = punyDigit(input.charCodeAt(index++));
      if (digit >= 36) throw new Error("Invalid Punycode digit.");
      i += digit * w;
      const t = k <= bias ? 1 : k >= bias + 26 ? 26 : k - bias;
      if (digit < t) break;
      w *= 36 - t;
      if (!Number.isSafeInteger(w) || !Number.isSafeInteger(i))
        throw new Error("Punycode label is too large.");
    }
    const outLen = output.length + 1;
    bias = punyAdapt(i - oldi, outLen, oldi === 0);
    n += Math.floor(i / outLen);
    i %= outLen;
    if (n > 0x10ffff) throw new Error("Invalid Unicode code point.");
    output.splice(i, 0, n);
    i++;
  }
  return String.fromCodePoint(...output);
}
function decodeDomain(domain: string) {
  return domain
    .split(".")
    .map((label) =>
      label.toLowerCase().startsWith("xn--")
        ? decodePunyLabel(label.slice(4))
        : label
    )
    .join(".");
}
function xmlText(el: Element) {
  return (el.textContent ?? "").trim();
}
function normalCdf(z: number) {
  const sign = z < 0 ? -1 : 1;
  const x = Math.abs(z) / Math.sqrt(2);
  const t = 1 / (1 + 0.3275911 * x);
  const erf =
    1 -
    (((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t -
      0.284496736) *
      t +
      0.254829592) *
      t *
      Math.exp(-x * x));
  return 0.5 * (1 + sign * erf);
}
function comb(n: number, k: number) {
  if (!Number.isInteger(n) || !Number.isInteger(k) || n < 0 || k < 0 || k > n)
    throw new Error("n and k must be whole numbers with 0 ≤ k ≤ n.");
  k = Math.min(k, n - k);
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
  return r;
}

async function runTool(
  kind: Batch651758Kind,
  v: Record<string, string>
): Promise<ToolResult> {
  switch (kind) {
    case "px-to-em-converter": {
      const px = num(v.px, "Pixels"), base = pos(v.base, "Element font size");
      const em = px / base;
      return { summary: S(["EM", `${fmt(em)}em`], ["Formula", `${fmt(px)}px ÷ ${fmt(base)}px`]) };
    }
    case "rem-to-em-converter": {
      const rem = num(v.rem, "REM"), root = pos(v.root, "Root font size"), element = pos(v.element, "Element font size");
      const em = rem * root / element;
      return { summary: S(["EM", `${fmt(em)}em`], ["Pixel equivalent", `${fmt(rem * root)}px`]) };
    }
    case "em-to-rem-converter": {
      const em = num(v.em, "EM"), element = pos(v.element, "Element font size"), root = pos(v.root, "Root font size");
      const rem = em * element / root;
      return { summary: S(["REM", `${fmt(rem)}rem`], ["Pixel equivalent", `${fmt(em * element)}px`]) };
    }
    case "pt-to-px-converter": {
      const pt = num(v.pt, "Points"), px = pt * 96 / 72;
      return { summary: S(["Pixels", `${fmt(px)}px`], ["CSS conversion", "1pt = 1.333333px at 96 DPI"]) };
    }
    case "px-to-pt-converter": {
      const px = num(v.px, "Pixels"), pt = px * 72 / 96;
      return { summary: S(["Points", `${fmt(pt)}pt`], ["CSS conversion", "1px = 0.75pt at 96 DPI"]) };
    }
    case "vw-to-px-converter": {
      const vw = num(v.vw, "VW"), viewport = pos(v.viewport, "Viewport width"), px = viewport * vw / 100;
      return { summary: S(["Pixels", `${fmt(px)}px`], ["Viewport width", `${fmt(viewport)}px`]) };
    }
    case "px-to-vw-converter": {
      const px = num(v.px, "Pixels"), viewport = pos(v.viewport, "Viewport width"), vw = px / viewport * 100;
      return { summary: S(["VW", `${fmt(vw)}vw`], ["Viewport width", `${fmt(viewport)}px`]) };
    }
    case "vh-to-px-converter": {
      const vh = num(v.vh, "VH"), viewport = pos(v.viewport, "Viewport height"), px = viewport * vh / 100;
      return { summary: S(["Pixels", `${fmt(px)}px`], ["Viewport height", `${fmt(viewport)}px`]) };
    }
    case "px-to-vh-converter": {
      const px = num(v.px, "Pixels"), viewport = pos(v.viewport, "Viewport height"), vh = px / viewport * 100;
      return { summary: S(["VH", `${fmt(vh)}vh`], ["Viewport height", `${fmt(viewport)}px`]) };
    }
    case "screen-ppi-calculator": {
      const width = pos(v.width, "Horizontal pixels"), height = pos(v.height, "Vertical pixels"), diagonal = pos(v.diagonal, "Diagonal size");
      const diagonalPixels = Math.hypot(width, height), ppi = diagonalPixels / diagonal;
      return { summary: S(["Pixel density", `${fmt(ppi, 2)} PPI`], ["Diagonal pixels", fmt(diagonalPixels, 2)], ["Approx. pixel pitch", `${fmt(25.4 / ppi, 4)} mm`]) };
    }
    case "punycode-encoder": {
      const input = v.text.trim();
      if (!input) throw new Error("Enter a domain name.");
      const hostname = new URL(`http://${input}`).hostname;
      return { output: hostname, summary: S(["ASCII domain", hostname]) };
    }
    case "punycode-decoder": {
      const input = v.text.trim().replace(/^https?:\/\//i, "").split("/")[0];
      if (!input) throw new Error("Enter a Punycode domain.");
      const decoded = decodeDomain(input);
      return { output: decoded, summary: S(["Unicode domain", decoded]) };
    }
    case "utf8-byte-counter": {
      const text = v.text ?? "";
      const bytes = new TextEncoder().encode(text).length;
      const codePoints = Array.from(text).length;
      return { summary: S(["UTF-8 bytes", String(bytes)], ["Unicode code points", String(codePoints)], ["JavaScript UTF-16 units", String(text.length)]) };
    }
    case "csv-to-sql-converter":
    case "sql-insert-generator": {
      const rows = parseDelimited(v.text, ",");
      const output = rowsToInsert(v.table, rows);
      return { output, summary: S(["INSERT statements", String(Math.max(0, rows.length - 1))]) };
    }
    case "json-to-sql-converter": {
      const parsed = JSON.parse(v.text);
      const arr = Array.isArray(parsed) ? parsed : [parsed];
      if (!arr.length || arr.some((x) => !x || typeof x !== "object" || Array.isArray(x)))
        throw new Error("JSON must be an object or an array of objects.");
      const table = sqlIdent(v.table);
      const columns = Array.from(new Set(arr.flatMap((x: any) => Object.keys(x)))).map(sqlIdent);
      const output = arr.map((obj: any) =>
        `INSERT INTO ${table} (${columns.join(", ")}) VALUES (${columns.map((c) => sqlValue(obj[c])).join(", ")});`
      ).join("\n");
      return { output, summary: S(["Rows", String(arr.length)], ["Columns", String(columns.length)]) };
    }
    case "sql-to-json-converter": {
      const arr = parseInsertSql(v.text);
      const output = JSON.stringify(arr, null, 2);
      return { output, summary: S(["Rows", String(arr.length)]) };
    }
    case "xml-to-csv-converter": {
      const doc = new DOMParser().parseFromString(v.text, "application/xml");
      if (doc.querySelector("parsererror")) throw new Error("The XML could not be parsed.");
      const root = doc.documentElement;
      const rows = Array.from(root.children);
      if (!rows.length) throw new Error("XML needs repeated child elements under a root element.");
      const headers = Array.from(new Set(rows.flatMap((row) => Array.from(row.children).map((c) => c.tagName))));
      const matrix = [headers, ...rows.map((row) => headers.map((h) => {
        const child = Array.from(row.children).find((c) => c.tagName === h);
        return child ? xmlText(child) : "";
      }))];
      return { output: stringifyDelimited(matrix, ","), summary: S(["Rows", String(rows.length)], ["Columns", String(headers.length)]) };
    }
    case "csv-to-xml-converter": {
      const rows = parseDelimited(v.text, ",");
      if (rows.length < 2) throw new Error("CSV must include a header and at least one row.");
      const root = sqlIdent(v.root), rowName = sqlIdent(v.row), headers = rows[0].map(sqlIdent);
      const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
      const body = rows.slice(1).map((r) =>
        `  <${rowName}>\n${headers.map((h, i) => `    <${h}>${esc(r[i] ?? "")}</${h}>`).join("\n")}\n  </${rowName}>`
      ).join("\n");
      return { output: `<?xml version="1.0" encoding="UTF-8"?>\n<${root}>\n${body}\n</${root}>`, summary: S(["Rows", String(rows.length - 1)]) };
    }
    case "json-to-toml-converter": {
      const obj = JSON.parse(v.text);
      const output = toToml(obj);
      return { output };
    }
    case "toml-to-json-converter": {
      const obj = parseToml(v.text);
      return { output: JSON.stringify(obj, null, 2) };
    }
    case "yaml-to-toml-converter": {
      const obj = parseSimpleYaml(v.text);
      return { output: toToml(obj) };
    }
    case "toml-to-yaml-converter": {
      const obj = parseToml(v.text);
      return { output: toYaml(obj) };
    }
    case "json-flattener": {
      const obj = JSON.parse(v.text);
      if (!obj || typeof obj !== "object" || Array.isArray(obj)) throw new Error("Enter a JSON object.");
      const flat = flattenObject(obj);
      return { output: JSON.stringify(flat, null, 2), summary: S(["Flattened keys", String(Object.keys(flat).length)]) };
    }
    case "json-unflattener": {
      const obj = JSON.parse(v.text);
      if (!obj || typeof obj !== "object" || Array.isArray(obj)) throw new Error("Enter a flat JSON object.");
      return { output: JSON.stringify(unflattenObject(obj), null, 2) };
    }
    case "csv-delimiter-converter": {
      const rows = parseDelimited(v.text, v.from);
      return { output: stringifyDelimited(rows, v.to), summary: S(["Rows", String(rows.length)]) };
    }
    case "csv-row-filter": {
      const rows = parseDelimited(v.text, ",");
      if (rows.length < 1) throw new Error("Enter CSV data.");
      const idx = rows[0].findIndex((h) => h.trim().toLowerCase() === v.column.trim().toLowerCase());
      if (idx < 0) throw new Error(`Column "${v.column}" was not found.`);
      const needle = v.match.toLowerCase();
      const filtered = [rows[0], ...rows.slice(1).filter((r) => (r[idx] ?? "").toLowerCase().includes(needle))];
      return { output: stringifyDelimited(filtered, ","), summary: S(["Matching rows", String(filtered.length - 1)]) };
    }
    case "csv-column-remover": {
      const rows = parseDelimited(v.text, ",");
      if (!rows.length) throw new Error("Enter CSV data.");
      const remove = new Set(v.columns.split(",").map((x) => x.trim().toLowerCase()).filter(Boolean));
      const keep = rows[0].map((h, i) => ({ h, i })).filter(({ h }) => !remove.has(h.trim().toLowerCase()));
      if (keep.length === rows[0].length) throw new Error("None of the requested columns were found.");
      const result = rows.map((r) => keep.map(({ i }) => r[i] ?? ""));
      return { output: stringifyDelimited(result, ","), summary: S(["Columns kept", String(keep.length)], ["Columns removed", String(rows[0].length - keep.length)]) };
    }
    case "csv-merge-tool": {
      const a = parseDelimited(v.first, ","), b = parseDelimited(v.second, ",");
      if (!a.length || !b.length) throw new Error("Enter both CSV datasets.");
      if (a[0].join("\u0000") !== b[0].join("\u0000")) throw new Error("Both CSV files must have the same headers in the same order.");
      const merged = [a[0], ...a.slice(1), ...b.slice(1)];
      return { output: stringifyDelimited(merged, ","), summary: S(["Merged rows", String(merged.length - 1)]) };
    }
    case "xpath-tester": {
      const doc = new DOMParser().parseFromString(v.text, "application/xml");
      if (doc.querySelector("parsererror")) throw new Error("The XML could not be parsed.");
      const result = doc.evaluate(v.xpath, doc, null, XPathResult.ANY_TYPE, null);
      const matches: string[] = [];
      if (result.resultType === XPathResult.STRING_TYPE) matches.push(result.stringValue);
      else if (result.resultType === XPathResult.NUMBER_TYPE) matches.push(String(result.numberValue));
      else if (result.resultType === XPathResult.BOOLEAN_TYPE) matches.push(String(result.booleanValue));
      else {
        let node = result.iterateNext();
        while (node) {
          matches.push(node.nodeType === Node.ATTRIBUTE_NODE ? node.nodeValue ?? "" : node.textContent?.trim() ?? "");
          node = result.iterateNext();
        }
      }
      return { output: matches.join("\n"), summary: S(["Matches / result items", String(matches.length)]) };
    }
    case "chmod-calculator": {
      const raw = v.mode.trim();
      if (!/^[0-7]{3,4}$/.test(raw)) throw new Error("Enter a 3- or 4-digit octal mode such as 755 or 0644.");
      const digits = raw.slice(-3).split("").map(Number);
      const rwx = digits.map((d) => `${d & 4 ? "r" : "-"}${d & 2 ? "w" : "-"}${d & 1 ? "x" : "-"}`).join("");
      return { output: rwx, summary: S(["Symbolic permissions", rwx], ["Owner", rwx.slice(0, 3)], ["Group", rwx.slice(3, 6)], ["Others", rwx.slice(6, 9)]) };
    }
    case "ini-to-json-converter": {
      const text = (v.text ?? "").trim();
      if (!text) throw new Error("Enter INI data to convert.");
      const result: Record<string, any> = {};
      let target: Record<string, any> = result;
      let section = "";
      const parseValue = (raw: string): any => {
        const value = raw.trim();
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) return value.slice(1, -1);
        if (/^(true|false)$/i.test(value)) return value.toLowerCase() === "true";
        if (/^(null|none)$/i.test(value)) return null;
        if (/^[+-]?(?:\d+\.?\d*|\.\d+)$/.test(value)) return Number(value);
        return value;
      };
      for (const [index, rawLine] of text.split(/\r?\n/).entries()) {
        const line = rawLine.trim();
        if (!line || line.startsWith(";") || line.startsWith("#")) continue;
        const sectionMatch = line.match(/^\[([^\]]+)\]$/);
        if (sectionMatch) {
          section = sectionMatch[1].trim();
          if (!section) throw new Error(`Empty section name on line ${index + 1}.`);
          if (!result[section] || typeof result[section] !== "object" || Array.isArray(result[section])) result[section] = {};
          target = result[section];
          continue;
        }
        const eq = line.indexOf("=");
        const colon = line.indexOf(":");
        const splitAt = eq >= 0 ? eq : colon >= 0 ? colon : -1;
        if (splitAt < 1) throw new Error(`Expected key=value on line ${index + 1}.`);
        const key = line.slice(0, splitAt).trim();
        if (!key) throw new Error(`Missing key on line ${index + 1}.`);
        target[key] = parseValue(line.slice(splitAt + 1));
      }
      const output = JSON.stringify(result, null, 2);
      return { output, summary: S(["Sections", String(Object.values(result).filter((x) => x && typeof x === "object" && !Array.isArray(x)).length)], ["Top-level keys", String(Object.keys(result).length)]) };
    }

    case "mortgage-extra-payment-calculator": {
      const principal = pos(v.principal, "Loan balance"), rate = nonneg(v.rate, "Interest rate"), years = pos(v.years, "Term"), extra = nonneg(v.extra, "Extra payment");
      const months = Math.round(years * 12);
      const base = amortizeWithExtra(principal, rate, months, 0);
      const accelerated = amortizeWithExtra(principal, rate, months, extra);
      return { summary: S(
        ["Required monthly payment", money(base.required)],
        ["Payment with extra", money(accelerated.payment)],
        ["New payoff time", `${accelerated.months} months (${fmt(accelerated.months / 12, 2)} years)`],
        ["Months saved", String(Math.max(0, base.months - accelerated.months))],
        ["Estimated interest saved", money(Math.max(0, base.totalInterest - accelerated.totalInterest))]
      ) };
    }
    case "pmi-calculator": {
      const price = pos(v.price, "Home price"), down = nonneg(v.down, "Down payment"), rate = nonneg(v.rate, "PMI rate");
      if (down >= price) throw new Error("Down payment must be less than home price.");
      const loan = price - down, ltv = loan / price * 100, annual = loan * rate / 100;
      return { summary: S(["Loan amount", money(loan)], ["Loan-to-value", pct(ltv)], ["Estimated annual PMI", money(annual)], ["Estimated monthly PMI", money(annual / 12)]) };
    }
    case "mortgage-points-calculator": {
      const loan = pos(v.loan, "Loan amount"), points = nonneg(v.points, "Points"), before = nonneg(v.rateBefore, "Rate without points"), after = nonneg(v.rateAfter, "Rate with points"), years = pos(v.years, "Term");
      const months = Math.round(years * 12), cost = loan * points / 100, p1 = pmt(loan, before, months), p2 = pmt(loan, after, months), savings = p1 - p2;
      const breakEven = savings > 0 ? cost / savings : Infinity;
      return { summary: S(["Points cost", money(cost)], ["Payment without points", money(p1)], ["Payment with points", money(p2)], ["Monthly savings", money(savings)], ["Simple break-even", Number.isFinite(breakEven) ? `${fmt(breakEven, 1)} months` : "No positive payment savings"]) };
    }
    case "closing-cost-calculator": {
      const price = pos(v.price, "Home price"), percent = nonneg(v.percent, "Closing cost percentage"), fixed = nonneg(v.fixed, "Fixed fees");
      const variable = price * percent / 100, total = variable + fixed;
      return { summary: S(["Percentage-based costs", money(variable)], ["Fixed fees", money(fixed)], ["Estimated closing costs", money(total)], ["Percent of purchase price", pct(total / price * 100)]) };
    }
    case "home-affordability-calculator": {
      const income = pos(v.income, "Annual income"), debts = nonneg(v.debts, "Monthly debts"), down = nonneg(v.down, "Down payment"), rate = nonneg(v.rate, "Mortgage rate"), years = pos(v.years, "Term"), housing = nonneg(v.housing, "Taxes / insurance / HOA");
      const monthlyIncome = income / 12;
      const front = monthlyIncome * 0.28;
      const back = monthlyIncome * 0.36 - debts;
      const maxHousing = Math.max(0, Math.min(front, back));
      const pi = Math.max(0, maxHousing - housing);
      if (pi <= 0) return { summary: S(["Estimated max housing payment", money(maxHousing)], ["Available principal & interest", money(0)], ["Estimated affordable loan", money(0)]) };
      const months = Math.round(years * 12), r = rate / 100 / 12;
      const loan = r === 0 ? pi * months : pi * (1 - Math.pow(1 + r, -months)) / r;
      return { summary: S(["Estimated max housing payment", money(maxHousing)], ["Available principal & interest", money(pi)], ["Estimated affordable loan", money(loan)], ["Estimated home price incl. down payment", money(loan + down)]) };
    }
    case "heloc-payment-calculator": {
      const balance = pos(v.balance, "HELOC balance"), rate = nonneg(v.rate, "Annual rate"), years = pos(v.years, "Term");
      const interestOnly = balance * rate / 100 / 12;
      const amortized = pmt(balance, rate, Math.round(years * 12));
      return { summary: S(["Interest-only monthly payment", money(interestOnly)], ["Amortized monthly payment", money(amortized)], ["Selected payment", money(v.mode === "amortized" ? amortized : interestOnly)]) };
    }
    case "balloon-loan-calculator": {
      const principal = pos(v.principal, "Loan amount"), rate = nonneg(v.rate, "Interest rate"), amortYears = pos(v.amortYears, "Amortization period"), balloonYears = pos(v.balloonYears, "Balloon period");
      if (balloonYears >= amortYears) throw new Error("Balloon due date should be earlier than the amortization period.");
      const totalMonths = Math.round(amortYears * 12), paid = Math.round(balloonYears * 12), payment = pmt(principal, rate, totalMonths), balloon = remainingBalance(principal, rate, totalMonths, paid);
      return { summary: S(["Monthly payment", money(payment)], ["Payments before balloon", String(paid)], ["Estimated balloon balance", money(balloon)]) };
    }
    case "interest-only-loan-calculator": {
      const principal = pos(v.principal, "Loan amount"), rate = nonneg(v.rate, "Interest rate"), months = pos(v.months, "Interest-only period");
      const monthly = principal * rate / 100 / 12;
      return { summary: S(["Monthly interest-only payment", money(monthly)], ["Interest over selected period", money(monthly * months)], ["Principal remaining", money(principal)]) };
    }
    case "student-loan-calculator": {
      const principal = pos(v.principal, "Loan balance"), rate = nonneg(v.rate, "Interest rate"), years = pos(v.years, "Term");
      const months = Math.round(years * 12), payment = pmt(principal, rate, months), total = payment * months;
      return { summary: S(["Monthly payment", money(payment)], ["Total repayment", money(total)], ["Total interest", money(total - principal)]) };
    }
    case "car-lease-calculator": {
      const msrp = pos(v.msrp, "MSRP"), price = pos(v.price, "Negotiated price"), residualPct = nonneg(v.residual, "Residual percentage"), mf = nonneg(v.moneyFactor, "Money factor"), months = pos(v.months, "Lease term"), down = nonneg(v.down, "Down payment"), tax = nonneg(v.tax, "Tax rate");
      const residual = msrp * residualPct / 100, cap = price - down;
      const depreciation = (cap - residual) / months, finance = (cap + residual) * mf, pretax = depreciation + finance, payment = pretax * (1 + tax / 100);
      return { summary: S(["Adjusted cap cost", money(cap)], ["Residual value", money(residual)], ["Depreciation charge / month", money(depreciation)], ["Finance charge / month", money(finance)], ["Estimated monthly payment incl. tax", money(payment)]) };
    }
    case "present-value-calculator": {
      const future = num(v.future, "Future value"), rate = num(v.rate, "Discount rate"), years = nonneg(v.years, "Years"), compounds = pos(v.compounds, "Compounds per year");
      const pv = future / Math.pow(1 + rate / 100 / compounds, compounds * years);
      return { summary: S(["Present value", money(pv)], ["Future value", money(future)], ["Discount factor", fmt(pv / future, 6)]) };
    }
    case "annuity-payment-calculator": {
      const present = pos(v.present, "Present value"), rate = nonneg(v.rate, "Rate"), years = pos(v.years, "Years"), payments = pos(v.payments, "Payments per year");
      const periods = Math.round(years * payments), r = rate / 100 / payments;
      const payment = r === 0 ? present / periods : present * r / (1 - Math.pow(1 + r, -periods));
      return { summary: S(["Periodic payment", money(payment)], ["Number of payments", String(periods)], ["Total payments", money(payment * periods)]) };
    }
    case "retirement-savings-calculator": {
      const current = nonneg(v.current, "Current savings"), monthly = nonneg(v.monthly, "Monthly contribution"), rate = num(v.rate, "Return"), years = nonneg(v.years, "Years"), months = Math.round(years * 12), r = rate / 100 / 12;
      const currentFV = current * Math.pow(1 + r, months);
      const contribFV = r === 0 ? monthly * months : monthly * ((Math.pow(1 + r, months) - 1) / r);
      const total = currentFV + contribFV, contributions = current + monthly * months;
      return { summary: S(["Projected balance", money(total)], ["Total contributions", money(contributions)], ["Estimated growth", money(total - contributions)]) };
    }
    case "401k-calculator": {
      const current = nonneg(v.current, "Current balance"), salary = pos(v.salary, "Salary"), employee = nonneg(v.employee, "Employee contribution"), match = nonneg(v.match, "Employer match rate"), limit = nonneg(v.matchLimit, "Match limit"), rate = num(v.rate, "Return"), years = Math.round(nonneg(v.years, "Years"));
      const employeeAnnual = salary * employee / 100;
      const matchedSalary = salary * Math.min(employee, limit) / 100;
      const employerAnnual = matchedSalary * match / 100;
      const annual = employeeAnnual + employerAnnual;
      let balance = current;
      for (let y = 0; y < years; y++) balance = balance * (1 + rate / 100) + annual;
      return { summary: S(["Employee contribution / year", money(employeeAnnual)], ["Employer match / year", money(employerAnnual)], ["Total annual contribution", money(annual)], ["Projected balance", money(balance)]) };
    }
    case "roth-ira-calculator": {
      const current = nonneg(v.current, "Current balance"), annual = nonneg(v.annual, "Annual contribution"), rate = num(v.rate, "Return"), years = Math.round(nonneg(v.years, "Years"));
      let balance = current;
      for (let y = 0; y < years; y++) balance = balance * (1 + rate / 100) + annual;
      const contributions = current + annual * years;
      return { summary: S(["Projected balance", money(balance)], ["Total contributions", money(contributions)], ["Estimated growth", money(balance - contributions)]) };
    }
    case "inflation-calculator": {
      const amount = pos(v.amount, "Amount"), rate = num(v.rate, "Inflation rate"), years = nonneg(v.years, "Years");
      const factor = Math.pow(1 + rate / 100, years), future = amount * factor, purchasing = amount / factor;
      return { summary: S(["Future price equivalent", money(future)], ["Future purchasing power of today's amount", money(purchasing)], ["Cumulative price increase", pct((factor - 1) * 100)]) };
    }
    case "cd-calculator": {
      const deposit = nonneg(v.deposit, "Deposit"), apy = num(v.apy, "APY"), years = nonneg(v.years, "Term");
      const final = deposit * Math.pow(1 + apy / 100, years);
      return { summary: S(["Maturity value", money(final)], ["Interest earned", money(final - deposit)]) };
    }
    case "net-worth-calculator": {
      const assets = nonneg(v.assets, "Assets"), liabilities = nonneg(v.liabilities, "Liabilities");
      return { summary: S(["Net worth", money(assets - liabilities)], ["Total assets", money(assets)], ["Total liabilities", money(liabilities)]) };
    }
    case "emergency-fund-calculator": {
      const expenses = nonneg(v.expenses, "Monthly expenses"), months = nonneg(v.months, "Coverage months"), current = nonneg(v.current, "Current savings");
      const target = expenses * months;
      return { summary: S(["Emergency fund target", money(target)], ["Current emergency savings", money(current)], ["Remaining gap", money(Math.max(0, target - current))], ["Coverage currently funded", expenses > 0 ? `${fmt(current / expenses, 2)} months` : "—"]) };
    }
    case "current-ratio-calculator": {
      const assets = nonneg(v.assets, "Current assets"), liabilities = pos(v.liabilities, "Current liabilities");
      return { summary: S(["Current ratio", fmt(assets / liabilities, 3)], ["Working capital", money(assets - liabilities)]) };
    }
    case "business-burn-rate-calculator": {
      const start = nonneg(v.start, "Starting cash"), end = nonneg(v.end, "Ending cash"), months = pos(v.months, "Elapsed months");
      const burn = (start - end) / months;
      return { summary: S(["Average monthly burn", money(burn)], ["Net cash change", money(start - end)], ["Ending cash", money(end)]) };
    }
    case "cash-runway-calculator": {
      const cash = nonneg(v.cash, "Cash"), burn = pos(v.burn, "Monthly burn"), runway = cash / burn;
      return { summary: S(["Cash runway", `${fmt(runway, 2)} months`], ["Approx. years", fmt(runway / 12, 2)]) };
    }
    case "working-capital-calculator": {
      const assets = nonneg(v.assets, "Current assets"), liabilities = nonneg(v.liabilities, "Current liabilities");
      return { summary: S(["Working capital", money(assets - liabilities)], ["Current ratio", liabilities > 0 ? fmt(assets / liabilities, 3) : "No current liabilities"]) };
    }
    case "debt-service-coverage-ratio-calculator": {
      const noi = num(v.noi, "Net operating income"), debt = pos(v.debt, "Debt service"), dscr = noi / debt;
      return { summary: S(["DSCR", `${fmt(dscr, 3)}×`], ["Net operating income", money(noi)], ["Annual debt service", money(debt)]) };
    }

    case "drywall-mud-calculator": {
      const area = pos(v.area, "Area"), coats = pos(v.coats, "Coats"), coverage = pos(v.coverage, "Coverage"), waste = nonneg(v.waste, "Waste");
      const gallons = area * coats / coverage * (1 + waste / 100);
      return { summary: S(["Estimated joint compound", `${fmt(gallons, 2)} gal`], ["Round-up purchase quantity", `${Math.ceil(gallons)} gal`]) };
    }
    case "drywall-screw-calculator": {
      const area = pos(v.area, "Area"), sheetArea = pos(v.sheetArea, "Sheet area"), perSheet = pos(v.perSheet, "Screws per sheet"), waste = nonneg(v.waste, "Waste");
      const sheets = Math.ceil(area / sheetArea), screws = Math.ceil(sheets * perSheet * (1 + waste / 100));
      return { summary: S(["Estimated sheets", String(sheets)], ["Estimated screws incl. waste", String(screws)]) };
    }
    case "drywall-cost-calculator": {
      const area = pos(v.area, "Area"), sheetArea = pos(v.sheetArea, "Sheet area"), sheetCost = nonneg(v.sheetCost, "Sheet cost"), waste = nonneg(v.waste, "Waste"), labor = nonneg(v.labor, "Labor cost");
      const sheets = Math.ceil(area * (1 + waste / 100) / sheetArea), material = sheets * sheetCost, laborCost = area * labor;
      return { summary: S(["Sheets incl. waste", String(sheets)], ["Material cost", money(material)], ["Labor cost", money(laborCost)], ["Estimated total", money(material + laborCost)]) };
    }
    case "paint-cost-calculator": {
      const area = pos(v.area, "Area"), coats = pos(v.coats, "Coats"), coverage = pos(v.coverage, "Coverage"), price = nonneg(v.price, "Price");
      const exact = area * coats / coverage, gallons = Math.ceil(exact);
      return { summary: S(["Calculated paint", `${fmt(exact, 2)} gal`], ["Whole gallons to buy", String(gallons)], ["Estimated paint cost", money(gallons * price)]) };
    }
    case "flooring-cost-calculator":
    case "tile-cost-calculator": {
      const area = pos(v.area, "Area"), waste = nonneg(v.waste, "Waste"), material = nonneg(v.material, "Material cost"), labor = nonneg(v.labor, "Labor cost");
      const purchaseArea = area * (1 + waste / 100), materialCost = purchaseArea * material, laborCost = area * labor;
      return { summary: S(["Purchase area incl. waste", `${fmt(purchaseArea, 2)} sq ft`], ["Material cost", money(materialCost)], ["Labor cost", money(laborCost)], ["Estimated total", money(materialCost + laborCost)]) };
    }
    case "fence-post-spacing-calculator": {
      const length = pos(v.length, "Fence length"), spacing = pos(v.spacing, "Maximum spacing");
      const bays = Math.ceil(length / spacing), posts = bays + 1, actual = length / bays;
      return { summary: S(["Fence sections / bays", String(bays)], ["Posts including both ends", String(posts)], ["Actual equal spacing", `${fmt(actual, 3)} ft`]) };
    }
    case "gutter-size-calculator": {
      const area = pos(v.area, "Roof area"), rain = pos(v.rain, "Rainfall intensity"), gpm = area * rain * 0.01039;
      const size = gpm <= 15 ? '5-inch K-style planning range' : gpm <= 30 ? '6-inch K-style planning range' : 'Large / commercial sizing review recommended';
      return { summary: S(["Estimated runoff", `${fmt(gpm, 2)} GPM`], ["Planning gutter range", size]) };
    }
    case "gutter-slope-calculator": {
      const run = pos(v.run, "Gutter run"), per10 = nonneg(v.dropPer10, "Drop per 10 ft"), drop = run / 10 * per10;
      return { summary: S(["Required total drop", `${fmt(drop, 3)} in`], ["Equivalent slope", `${fmt(drop / (run * 12) * 100, 3)}%`]) };
    }
    case "downspout-calculator": {
      const area = pos(v.area, "Roof area"), rain = pos(v.rain, "Rainfall intensity"), capacity = pos(v.capacity, "Downspout capacity");
      const gpm = area * rain * 0.01039, count = Math.max(1, Math.ceil(gpm / capacity));
      return { summary: S(["Estimated runoff", `${fmt(gpm, 2)} GPM`], ["Planning downspout count", String(count)], ["Flow per downspout", `${fmt(gpm / count, 2)} GPM`]) };
    }
    case "insulation-r-value-calculator": {
      const existing = nonneg(v.existing, "Existing R-value"), thickness = nonneg(v.thickness, "Thickness"), per = nonneg(v.rPerInch, "R per inch"), added = thickness * per;
      return { summary: S(["Added R-value", fmt(added, 2)], ["Estimated total R-value", fmt(existing + added, 2)]) };
    }
    case "room-btu-calculator": {
      const area = pos(v.area, "Room area"), height = pos(v.height, "Ceiling height"), base = pos(v.btuPerSqFt, "BTU per sq ft"), factor = pos(v.factor, "Adjustment factor");
      const btu = area * base * (height / 8) * factor;
      return { summary: S(["Estimated load", `${fmt(btu, 0)} BTU/hr`], ["Equivalent cooling tons", `${fmt(btu / 12000, 2)} tons`]) };
    }
    case "hvac-tonnage-calculator": {
      const area = pos(v.area, "Conditioned area"), factor = pos(v.btuPerSqFt, "BTU per sq ft"), btu = area * factor;
      return { summary: S(["Planning cooling load", `${fmt(btu, 0)} BTU/hr`], ["Estimated tonnage", `${fmt(btu / 12000, 2)} tons`]) };
    }
    case "cfm-calculator": {
      const l = pos(v.length, "Length"), w = pos(v.width, "Width"), h = pos(v.height, "Height"), ach = pos(v.ach, "ACH"), volume = l * w * h, cfm = volume * ach / 60;
      return { summary: S(["Room volume", `${fmt(volume, 1)} cu ft`], ["Required airflow", `${fmt(cfm, 1)} CFM`]) };
    }
    case "air-changes-per-hour-calculator": {
      const l = pos(v.length, "Length"), w = pos(v.width, "Width"), h = pos(v.height, "Height"), cfm = nonneg(v.cfm, "CFM"), volume = l * w * h, ach = cfm * 60 / volume;
      return { summary: S(["Room volume", `${fmt(volume, 1)} cu ft`], ["Air changes per hour", fmt(ach, 2)]) };
    }
    case "duct-size-calculator": {
      const cfm = pos(v.cfm, "CFM"), velocity = pos(v.velocity, "Velocity"), areaFt = cfm / velocity, diameterFt = Math.sqrt(4 * areaFt / Math.PI), diameterIn = diameterFt * 12;
      return { summary: S(["Required duct area", `${fmt(areaFt * 144, 2)} sq in`], ["Equivalent round duct diameter", `${fmt(diameterIn, 2)} in`]) };
    }
    case "pipe-slope-calculator": {
      const run = pos(v.run, "Run"), slope = nonneg(v.slope, "Slope"), dropFt = run * slope / 100;
      return { summary: S(["Vertical drop", `${fmt(dropFt, 3)} ft`], ["Vertical drop", `${fmt(dropFt * 12, 2)} in`], ["Slope ratio", slope > 0 ? `1 in ${fmt(100 / slope, 2)}` : "Level"]) };
    }
    case "water-pressure-loss-calculator": {
      const L = pos(v.length, "Length"), Q = pos(v.flow, "Flow"), d = pos(v.diameter, "Diameter"), C = pos(v.c, "C coefficient");
      const head = 4.52 * L * Math.pow(Q, 1.85) / (Math.pow(C, 1.85) * Math.pow(d, 4.87)), psi = head * 0.433;
      return { summary: S(["Estimated head loss", `${fmt(head, 3)} ft of water`], ["Estimated pressure loss", `${fmt(psi, 3)} psi`]) };
    }
    case "rainwater-harvesting-calculator": {
      const area = pos(v.area, "Catchment area"), rain = nonneg(v.rain, "Rainfall"), runoff = num(v.runoff, "Runoff coefficient");
      if (runoff < 0 || runoff > 1) throw new Error("Runoff coefficient must be between 0 and 1.");
      const gallons = area * rain * 0.623 * runoff;
      return { summary: S(["Collectible rainwater", `${fmt(gallons, 1)} gallons`], ["Theoretical before runoff loss", `${fmt(area * rain * 0.623, 1)} gallons`]) };
    }
    case "lawn-seed-calculator": {
      const area = pos(v.area, "Lawn area"), rate = pos(v.rate, "Seeding rate"), pounds = area / 1000 * rate;
      return { summary: S(["Seed required", `${fmt(pounds, 2)} lb`], ["Area", `${fmt(area, 0)} sq ft`]) };
    }
    case "sod-calculator": {
      const area = pos(v.area, "Area"), piece = pos(v.pieceArea, "Piece area"), waste = nonneg(v.waste, "Waste"), purchase = area * (1 + waste / 100), pieces = Math.ceil(purchase / piece);
      return { summary: S(["Sod coverage incl. waste", `${fmt(purchase, 1)} sq ft`], ["Estimated pieces", String(pieces)]) };
    }
    case "concrete-weight-calculator": {
      const volume = pos(v.volume, "Volume"), density = pos(v.density, "Density"), pounds = volume * density;
      return { summary: S(["Estimated weight", `${fmt(pounds, 0)} lb`], ["Short tons", `${fmt(pounds / 2000, 3)} tons`], ["Kilograms", `${fmt(pounds * 0.45359237, 1)} kg`]) };
    }

    case "fraction-to-decimal-calculator": {
      const a = num(v.numerator, "Numerator"), b = num(v.denominator, "Denominator");
      if (b === 0) throw new Error("Denominator cannot be zero.");
      return { summary: S(["Decimal", fmt(a / b, 12)], ["Percentage", pct(a / b * 100, 8)]) };
    }
    case "scientific-notation-calculator": {
      const n = num(v.value, "Number");
      if (n === 0) return { summary: S(["Scientific notation", "0 × 10^0"], ["Exponent", "0"]) };
      const exponent = Math.floor(Math.log10(Math.abs(n))), coefficient = n / Math.pow(10, exponent);
      return { summary: S(["Scientific notation", `${fmt(coefficient, 12)} × 10^${exponent}`], ["Coefficient", fmt(coefficient, 12)], ["Exponent", String(exponent)]) };
    }
    case "significant-figures-calculator": {
      const n = num(v.value, "Number"), figures = integer(v.figures, "Significant figures");
      if (figures < 1 || figures > 100) throw new Error("Significant figures must be between 1 and 100.");
      const rounded = n.toPrecision(figures);
      return { summary: S(["Rounded value", rounded], ["Significant figures", String(figures)]) };
    }
    case "rounding-calculator": {
      const n = num(v.value, "Number"), places = integer(v.places, "Decimal places");
      if (places < -15 || places > 15) throw new Error("Use decimal places from -15 to 15.");
      const factor = Math.pow(10, places), rounded = Math.round((n + Number.EPSILON) * factor) / factor;
      return { summary: S(["Rounded value", String(rounded)], ["Decimal places", String(places)]) };
    }
    case "arithmetic-sequence-calculator": {
      const first = num(v.first, "First term"), d = num(v.difference, "Common difference"), n = integer(v.n, "n");
      if (n < 1) throw new Error("n must be at least 1.");
      const nth = first + (n - 1) * d, sum = n / 2 * (2 * first + (n - 1) * d);
      return { summary: S(["nth term", fmt(nth, 8)], ["Sum of first n terms", fmt(sum, 8)]) };
    }
    case "geometric-sequence-calculator": {
      const first = num(v.first, "First term"), r = num(v.ratio, "Common ratio"), n = integer(v.n, "n");
      if (n < 1) throw new Error("n must be at least 1.");
      const nth = first * Math.pow(r, n - 1), sum = r === 1 ? first * n : first * (1 - Math.pow(r, n)) / (1 - r);
      return { summary: S(["nth term", fmt(nth, 8)], ["Sum of first n terms", fmt(sum, 8)]) };
    }
    case "binomial-probability-calculator": {
      const n = integer(v.n, "n"), k = integer(v.k, "k"), p = num(v.p, "Probability");
      if (p < 0 || p > 1) throw new Error("Probability p must be between 0 and 1.");
      const probability = comb(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
      return { summary: S(["P(X = k)", fmt(probability, 10)], ["Percentage", pct(probability * 100, 8)], ["Combinations", fmt(comb(n, k), 0)]) };
    }
    case "expected-value-calculator": {
      const outcomes = parseList(v.outcomes), probs = parseList(v.probabilities);
      if (outcomes.length !== probs.length) throw new Error("Outcomes and probabilities must have the same number of values.");
      if (probs.some((p) => p < 0)) throw new Error("Probabilities cannot be negative.");
      const totalP = probs.reduce((a, b) => a + b, 0);
      if (Math.abs(totalP - 1) > 0.000001) throw new Error(`Probabilities must sum to 1. Current sum: ${fmt(totalP, 8)}`);
      const ev = outcomes.reduce((sum, x, i) => sum + x * probs[i], 0);
      return { summary: S(["Expected value", fmt(ev, 10)], ["Probability sum", fmt(totalP, 8)]) };
    }
    case "percentile-calculator": {
      const data = parseList(v.data).sort((a, b) => a - b), p = num(v.percentile, "Percentile");
      if (p < 0 || p > 100) throw new Error("Percentile must be between 0 and 100.");
      const index = (p / 100) * (data.length - 1), lo = Math.floor(index), hi = Math.ceil(index), value = data[lo] + (data[hi] - data[lo]) * (index - lo);
      return { summary: S([`${fmt(p, 2)}th percentile`, fmt(value, 10)], ["Data points", String(data.length)]) };
    }
    case "percentile-rank-calculator": {
      const data = parseList(v.data), value = num(v.value, "Value");
      const below = data.filter((x) => x < value).length, equal = data.filter((x) => x === value).length;
      const rank = (below + 0.5 * equal) / data.length * 100;
      return { summary: S(["Percentile rank", pct(rank, 4)], ["Values below", String(below)], ["Values equal", String(equal)], ["Data points", String(data.length)]) };
    }
    case "normal-distribution-calculator": {
      const x = num(v.x, "x"), mean = num(v.mean, "Mean"), sd = pos(v.sd, "Standard deviation"), z = (x - mean) / sd, cdf = normalCdf(z);
      return { summary: S(["Z-score", fmt(z, 6)], ["P(X ≤ x)", fmt(cdf, 8)], ["Percentile", pct(cdf * 100, 6)]) };
    }
    case "confidence-interval-calculator": {
      const mean = num(v.mean, "Mean"), sd = pos(v.sd, "Standard deviation"), n = pos(v.n, "Sample size"), z = zFor(v.confidence), margin = z * sd / Math.sqrt(n);
      return { summary: S(["Margin of error", fmt(margin, 8)], ["Lower bound", fmt(mean - margin, 8)], ["Upper bound", fmt(mean + margin, 8)], ["Confidence level", `${v.confidence}%`]) };
    }
    case "margin-of-error-calculator": {
      const sd = pos(v.sd, "Standard deviation"), n = pos(v.n, "Sample size"), z = zFor(v.confidence), margin = z * sd / Math.sqrt(n);
      return { summary: S(["Margin of error", fmt(margin, 8)], ["Standard error", fmt(sd / Math.sqrt(n), 8)], ["Confidence level", `${v.confidence}%`]) };
    }
    case "sample-size-calculator": {
      const margin = pos(v.margin, "Margin of error") / 100, proportion = num(v.proportion, "Expected proportion"), z = zFor(v.confidence);
      if (proportion <= 0 || proportion >= 1) throw new Error("Expected proportion must be greater than 0 and less than 1.");
      const n = Math.ceil(z * z * proportion * (1 - proportion) / (margin * margin));
      return { summary: S(["Required sample size", String(n)], ["Confidence level", `${v.confidence}%`], ["Margin of error", pct(margin * 100)]) };
    }
    case "correlation-coefficient-calculator":
    case "covariance-calculator":
    case "linear-regression-calculator": {
      const x = parseList(v.x), y = parseList(v.y);
      if (x.length !== y.length || x.length < 2) throw new Error("X and Y must have the same length and at least two values.");
      const n = x.length, mx = x.reduce((a, b) => a + b, 0) / n, my = y.reduce((a, b) => a + b, 0) / n;
      let ssx = 0, ssy = 0, cross = 0;
      for (let i = 0; i < n; i++) { const dx = x[i] - mx, dy = y[i] - my; ssx += dx * dx; ssy += dy * dy; cross += dx * dy; }
      if (kind === "covariance-calculator") {
        const divisor = v.mode === "population" ? n : n - 1;
        return { summary: S([v.mode === "population" ? "Population covariance" : "Sample covariance", fmt(cross / divisor, 10)], ["Pairs", String(n)]) };
      }
      if (ssx === 0 || ssy === 0) throw new Error("Both datasets need non-zero variation.");
      const r = cross / Math.sqrt(ssx * ssy);
      if (kind === "correlation-coefficient-calculator") return { summary: S(["Pearson r", fmt(r, 10)], ["R²", fmt(r * r, 10)], ["Pairs", String(n)]) };
      const slope = cross / ssx, intercept = my - slope * mx;
      return { summary: S(["Slope", fmt(slope, 10)], ["Intercept", fmt(intercept, 10)], ["Regression equation", `y = ${fmt(slope, 8)}x + ${fmt(intercept, 8)}`], ["R²", fmt(r * r, 10)]) };
    }
    case "arc-length-calculator": {
      const r = pos(v.radius, "Radius"), angle = num(v.angle, "Angle"), length = 2 * Math.PI * r * angle / 360;
      return { summary: S(["Arc length", fmt(length, 10)], ["Angle in radians", fmt(angle * Math.PI / 180, 10)]) };
    }
    case "sector-area-calculator": {
      const r = pos(v.radius, "Radius"), angle = num(v.angle, "Angle"), area = Math.PI * r * r * angle / 360;
      return { summary: S(["Sector area", fmt(area, 10)], ["Full circle area", fmt(Math.PI * r * r, 10)]) };
    }
    case "ellipse-calculator": {
      const a = pos(v.a, "Semi-major axis"), b = pos(v.b, "Semi-minor axis");
      const area = Math.PI * a * b;
      const circumference = Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)));
      const major = Math.max(a, b), minor = Math.min(a, b), eccentricity = Math.sqrt(1 - minor * minor / (major * major));
      return { summary: S(["Area", fmt(area, 10)], ["Approx. circumference", fmt(circumference, 10)], ["Eccentricity", fmt(eccentricity, 10)]) };
    }
    case "trapezoid-calculator": {
      const a = pos(v.a, "Base a"), b = pos(v.b, "Base b"), h = pos(v.height, "Height"), area = (a + b) * h / 2;
      return { summary: S(["Area", fmt(area, 10)], ["Average base", fmt((a + b) / 2, 10)]) };
    }
    case "polygon-area-calculator": {
      const points = v.points.trim().split(/\r?\n/).filter(Boolean).map((line) => {
        const parts = line.split(/[,\s]+/).filter(Boolean).map(Number);
        if (parts.length !== 2 || parts.some((n) => !Number.isFinite(n))) throw new Error(`Invalid point: ${line}`);
        return parts as [number, number];
      });
      if (points.length < 3) throw new Error("Enter at least three points.");
      let twice = 0, perimeter = 0;
      for (let i = 0; i < points.length; i++) {
        const [x1, y1] = points[i], [x2, y2] = points[(i + 1) % points.length];
        twice += x1 * y2 - x2 * y1;
        perimeter += Math.hypot(x2 - x1, y2 - y1);
      }
      return { summary: S(["Area", fmt(Math.abs(twice) / 2, 10)], ["Perimeter", fmt(perimeter, 10)], ["Vertices", String(points.length)]) };
    }

    case "pcb-trace-width-calculator": {
      const current = pos(v.current, "Current"), rise = pos(v.rise, "Temperature rise"), copper = pos(v.copper, "Copper weight");
      const k = 0.048;
      const areaMil2 = Math.pow(current / (k * Math.pow(rise, 0.44)), 1 / 0.725);
      const thicknessMil = 1.37 * copper, widthMil = areaMil2 / thicknessMil, widthMm = widthMil * 0.0254;
      return { summary: S(["Estimated external trace width", `${fmt(widthMil, 2)} mil`], ["Estimated width", `${fmt(widthMm, 3)} mm`], ["Copper thickness used", `${fmt(thicknessMil, 3)} mil`]) };
    }
    case "resistor-power-rating-calculator": {
      const voltage = num(v.voltage, "Voltage"), resistance = pos(v.resistance, "Resistance"), current = voltage / resistance, power = voltage * voltage / resistance;
      const standards = [0.125,0.25,0.5,1,2,3,5,10,20,25,50,100];
      const target = power * 2, recommended = standards.find((x) => x >= target) ?? target;
      return { summary: S(["Current", `${fmt(current, 6)} A`], ["Power dissipated", `${fmt(power, 6)} W`], ["2× design target", `${fmt(target, 3)} W`], ["Suggested standard rating ≥", `${fmt(recommended, 3)} W`]) };
    }
    case "capacitor-code-calculator": {
      const code = v.code.trim();
      if (!/^\d{3}$/.test(code)) throw new Error("Enter a common three-digit capacitor code such as 104.");
      const sig = Number(code.slice(0, 2)), multiplier = Number(code[2]), pf = sig * Math.pow(10, multiplier);
      return { summary: S(["Capacitance", `${fmt(pf, 4)} pF`], ["Nanofarads", `${fmt(pf / 1000, 6)} nF`], ["Microfarads", `${fmt(pf / 1e6, 9)} µF`]) };
    }
    case "battery-pack-series-parallel-calculator": {
      const cellV = pos(v.cellVoltage, "Cell voltage"), cellAh = pos(v.cellAh, "Cell capacity"), series = integer(v.series, "Series cells"), parallel = integer(v.parallel, "Parallel strings");
      if (series < 1 || parallel < 1) throw new Error("Series and parallel counts must be at least 1.");
      const voltage = cellV * series, ah = cellAh * parallel, wh = voltage * ah;
      return { summary: S(["Pack voltage", `${fmt(voltage, 3)} V`], ["Pack capacity", `${fmt(ah, 3)} Ah`], ["Nominal energy", `${fmt(wh, 3)} Wh`], ["Total cells", String(series * parallel)]) };
    }
    case "ups-runtime-calculator": {
      const voltage = pos(v.voltage, "Battery voltage"), ah = pos(v.ah, "Battery capacity"), load = pos(v.load, "Load"), efficiency = num(v.efficiency, "Efficiency"), usable = num(v.usable, "Usable capacity");
      if (efficiency <= 0 || efficiency > 100 || usable <= 0 || usable > 100) throw new Error("Efficiency and usable capacity must be greater than 0 and no more than 100%.");
      const nominalWh = voltage * ah, usableWh = nominalWh * efficiency / 100 * usable / 100, hours = usableWh / load;
      return { summary: S(["Nominal battery energy", `${fmt(nominalWh, 1)} Wh`], ["Estimated usable AC energy", `${fmt(usableWh, 1)} Wh`], ["Estimated runtime", `${fmt(hours, 3)} hours`], ["Estimated runtime", `${fmt(hours * 60, 1)} minutes`]) };
    }
    case "motor-torque-calculator": {
      const power = pos(v.power, "Power"), rpm = pos(v.rpm, "RPM"), torque = 9550 * power / rpm;
      return { summary: S(["Torque", `${fmt(torque, 4)} N·m`], ["Torque", `${fmt(torque * 8.85074579, 3)} lb·in`], ["Torque", `${fmt(torque * 0.737562149, 3)} lb·ft`]) };
    }
    case "current-density-calculator": {
      const current = num(v.current, "Current"), area = pos(v.area, "Area"), density = current / area;
      return { summary: S(["Current density", `${fmt(density, 6)} A/mm²`], ["Current density", `${fmt(density * 645.16, 3)} A/in²`]) };
    }
    case "capacitor-discharge-time-calculator": {
      const R = pos(v.resistance, "Resistance"), Cuf = pos(v.capacitance, "Capacitance"), start = pos(v.start, "Starting voltage"), target = pos(v.target, "Target voltage");
      if (target >= start) throw new Error("Target voltage must be lower than starting voltage.");
      const C = Cuf * 1e-6, tau = R * C, seconds = -tau * Math.log(target / start);
      return { summary: S(["Time constant τ", `${fmt(tau, 6)} s`], ["Time to target voltage", `${fmt(seconds, 6)} s`], ["Time in minutes", `${fmt(seconds / 60, 6)} min`]) };
    }
    }
  throw new Error("Unsupported tool.");
}

export function Batch651758Tool({
  kind,
}: {
  kind: Batch651758Kind;
}) {
  const config = CONFIG[kind];

  const makeInitialValues = () =>
    Object.fromEntries(
      config.fields.map((field) => [
        field.key,
        field.defaultValue ?? "",
      ])
    ) as Record<string, string>;

  const [values, setValues] =
    useState<Record<string, string>>(
      makeInitialValues
    );
  const [result, setResult] =
    useState<ToolResult | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  const hasResult = Boolean(
    result?.output ||
      (result?.summary &&
        result.summary.length > 0)
  );

  const copyText = useMemo(() => {
    if (!result) return "";
    const lines: string[] = [];
    if (result.summary) {
      for (const item of result.summary) {
        lines.push(
          `${item.label}: ${item.value}${
            item.note ? ` — ${item.note}` : ""
          }`
        );
      }
    }
    if (result.output) {
      if (lines.length) lines.push("");
      lines.push(result.output);
    }
    return lines.join("\n");
  }, [result]);

  const updateValue = (
    key: string,
    value: string
  ) => {
    setValues((current) => ({
      ...current,
      [key]: value,
    }));
    setResult(null);
    setError("");
    setCopied(false);
  };

  const run = async () => {
    setBusy(true);
    setError("");
    setResult(null);
    setCopied(false);

    try {
      const next = await runTool(kind, values);
      setResult(next);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to calculate the result."
      );
    } finally {
      setBusy(false);
    }
  };

  const reset = () => {
    setValues(makeInitialValues());
    setResult(null);
    setError("");
    setCopied(false);
  };

  const copy = async () => {
    if (!copyText) return;

    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      window.setTimeout(
        () => setCopied(false),
        1400
      );
    } catch {
      setError(
        "Copy failed. Select the result and copy it manually."
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-card p-5 shadow-sm sm:p-6">
        <div className="grid gap-4 md:grid-cols-2">
          {config.fields.map((field) => (
            <label
              key={field.key}
              className={
                field.type === "textarea"
                  ? "space-y-2 md:col-span-2"
                  : "space-y-2"
              }
            >
              <span className="block text-sm font-medium">
                {field.label}
              </span>

              {field.type === "textarea" ? (
                <textarea
                  className={textareaClass}
                  value={
                    values[field.key] ?? ""
                  }
                  placeholder={
                    field.placeholder ?? ""
                  }
                  onChange={(event) =>
                    updateValue(
                      field.key,
                      event.target.value
                    )
                  }
                  spellCheck={false}
                />
              ) : field.type === "select" ? (
                <select
                  className={inputClass}
                  value={
                    values[field.key] ?? ""
                  }
                  onChange={(event) =>
                    updateValue(
                      field.key,
                      event.target.value
                    )
                  }
                >
                  {(field.options ?? []).map(
                    (option) => (
                      <option
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    )
                  )}
                </select>
              ) : (
                <input
                  className={inputClass}
                  type={
                    field.type === "number"
                      ? "number"
                      : "text"
                  }
                  step={
                    field.type === "number"
                      ? "any"
                      : undefined
                  }
                  value={
                    values[field.key] ?? ""
                  }
                  placeholder={
                    field.placeholder ?? ""
                  }
                  onChange={(event) =>
                    updateValue(
                      field.key,
                      event.target.value
                    )
                  }
                />
              )}
            </label>
          ))}
        </div>

        {config.note ? (
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {config.note}
          </p>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            className={buttonClass}
            onClick={run}
            disabled={busy}
          >
            {busy
              ? "Working..."
              : config.button ?? "Calculate"}
          </button>

          <button
            type="button"
            className={secondaryButtonClass}
            onClick={reset}
            disabled={busy}
          >
            Reset
          </button>
        </div>
      </div>

      {error ? (
        <div
          className="rounded-xl border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive"
          role="alert"
        >
          {error}
        </div>
      ) : null}

      {hasResult && result ? (
        <div className="rounded-xl border bg-card p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold">
              Result
            </h3>

            <button
              type="button"
              className={secondaryButtonClass}
              onClick={copy}
            >
              {copied ? "Copied" : "Copy result"}
            </button>
          </div>

          {result.summary &&
          result.summary.length > 0 ? (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {result.summary.map(
                (item, index) => (
                  <div
                    key={`${item.label}-${index}`}
                    className="rounded-lg border bg-muted/30 p-4"
                  >
                    <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {item.label}
                    </div>
                    <div className="mt-1 break-words text-lg font-semibold">
                      {item.value}
                    </div>
                    {item.note ? (
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {item.note}
                      </p>
                    ) : null}
                  </div>
                )
              )}
            </div>
          ) : null}

          {result.output ? (
            <pre className="mt-4 max-h-[36rem] overflow-auto whitespace-pre-wrap break-words rounded-lg border bg-muted/30 p-4 font-mono text-sm leading-relaxed">
              {result.output}
            </pre>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
