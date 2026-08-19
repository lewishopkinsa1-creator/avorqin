import { tools } from "@/lib/tools-data";

export type ToolCategoryConfig = {
  slug: string;
  name: string;
  description: string;
  intro: string;
  keywords: string[];
  toolSlugs: string[];
};

export const toolCategories: ToolCategoryConfig[] = [
  {
    slug: "json",
    name: "JSON & Data Tools",
    description:
      "Format, validate, minify, convert, and work with JSON and structured data directly in your browser.",
    intro:
      "Avorqin's JSON and data tools help you format, validate, minify, and convert structured data for APIs, configuration files, exports, and everyday development workflows.",
    keywords: [
      "JSON tools",
      "JSON formatter",
      "JSON validator",
      "JSON minifier",
      "JSON converter",
      "JSON to CSV",
      "JSON to YAML",
      "XML to JSON",
    ],
    toolSlugs: [
      "json-formatter",
      "json-validator",
      "json-minifier",
      "csv-to-json",
      "json-to-csv",
      "yaml-to-json",
      "json-to-yaml",
      "xml-to-json",
      "json-to-xml",
    ],
  },

  {
    slug: "formatters",
    name: "Code Formatters",
    description:
      "Format, beautify, minify, and clean up JSON, HTML, CSS, YAML, XML, SQL, and JavaScript.",
    intro:
      "Clean up hard-to-read code and structured data with browser-based formatters and minifiers for common developer formats.",
    keywords: [
      "code formatter",
      "code beautifier",
      "JSON formatter",
      "HTML formatter",
      "CSS formatter",
      "YAML formatter",
      "XML formatter",
      "SQL formatter",
      "code minifier",
    ],
    toolSlugs: [
      "json-formatter",
      "html-formatter",
      "css-formatter",
      "yaml-formatter",
      "xml-formatter",
      "sql-formatter",
      "json-minifier",
      "css-minifier",
      "html-minifier",
      "javascript-minifier",
    ],
  },

  {
    slug: "converters",
    name: "Developer Converters",
    description:
      "Convert data formats, number bases, text encodings, storage units, dimensions, and color values online.",
    intro:
      "Convert common developer formats and representations without installing software. Avorqin converters run directly in your browser for fast everyday transformations.",
    keywords: [
      "developer converters",
      "data converter",
      "JSON converter",
      "YAML converter",
      "XML converter",
      "binary converter",
      "hex converter",
      "unit converter",
      "color converter",
    ],
    toolSlugs: [
      "csv-to-json",
      "json-to-csv",
      "yaml-to-json",
      "json-to-yaml",
      "xml-to-json",
      "json-to-xml",
      "timestamp-converter",
      "unix-timestamp-to-date",
      "number-base-converter",
      "binary-to-text",
      "text-to-binary",
      "hex-to-text",
      "text-to-hex",
      "hex-to-rgb",
      "rgb-to-hex",
      "rem-to-px-converter",
      "px-to-rem-converter",
      "em-to-px-converter",
      "bytes-converter",
      "url-slug-decoder",
    ],
  },

  {
    slug: "encode-decode",
    name: "Encode & Decode Tools",
    description:
      "Encode and decode Base64, URLs, HTML entities, JWTs, binary, hexadecimal text, and URL slugs.",
    intro:
      "Encode, decode, and inspect common web and developer formats quickly. These utilities are useful for debugging payloads, inspecting encoded strings, and transforming text representations.",
    keywords: [
      "encode decode tools",
      "Base64 encoder",
      "Base64 decoder",
      "URL encoder",
      "URL decoder",
      "HTML encoder",
      "JWT decoder",
      "binary decoder",
      "hex decoder",
    ],
    toolSlugs: [
      "base64-encoder",
      "base64-decoder",
      "url-encoder",
      "url-decoder",
      "html-encoder",
      "html-decoder",
      "binary-to-text",
      "text-to-binary",
      "hex-to-text",
      "text-to-hex",
      "jwt-decoder",
      "url-slug-decoder",
    ],
  },

  {
    slug: "generators",
    name: "Developer Generators",
    description:
      "Generate UUIDs, hashes, HMACs, passwords, random strings, QR codes, MAC addresses, placeholder text, and URL slugs.",
    intro:
      "Generate common development values instantly with browser-based utilities for identifiers, hashes, secure random values, QR codes, test data, placeholder copy, and clean URL slugs.",
    keywords: [
      "developer generators",
      "UUID generator",
      "hash generator",
      "password generator",
      "random string generator",
      "HMAC generator",
      "QR code generator",
      "MAC address generator",
      "slug generator",
    ],
    toolSlugs: [
      "uuid-generator",
      "uuid-validator",
      "qr-code-generator",
      "mac-address-generator",
      "sha256-hash-generator",
      "sha1-hash-generator",
      "sha512-hash-generator",
      "hmac-generator",
      "random-string-generator",
      "password-generator",
      "lorem-ipsum-generator",
      "slug-generator",
      "unix-timestamp-generator",
    ],
  },

  {
    slug: "web-code",
    name: "Web & Code Tools",
    description:
      "Inspect URLs, query strings, JWTs, regular expressions, cron expressions, HTTP data, Markdown, user agents, and text.",
    intro:
      "A collection of practical web and code utilities for inspecting, testing, transforming, and debugging common developer inputs directly in your browser.",
    keywords: [
      "web developer tools",
      "URL parser",
      "query string parser",
      "regex tester",
      "cron expression helper",
      "JWT decoder",
      "HTTP status lookup",
      "MIME type lookup",
      "user agent parser",
      "Markdown previewer",
      "text tools",
    ],
    toolSlugs: [
      "url-parser",
      "query-string-parser",
      "query-string-builder",
      "regex-tester",
      "cron-expression-helper",
      "jwt-decoder",
      "markdown-previewer",
      "text-diff-checker",
      "text-case-converter",
      "word-character-counter",
      "line-sorter",
      "duplicate-line-remover",
      "whitespace-cleaner",
      "text-reverser",
      "http-status-code-lookup",
      "mime-type-lookup",
      "user-agent-parser",
      "ip-subnet-calculator",
    ],
  },

  {
    slug: "calculators",
    name: "Developer Calculators",
    description:
      "Calculate percentages, dates, age, aspect ratios, resolutions, network values, data transfer times, and more.",
    intro:
      "Avorqin's calculators provide quick browser-based answers for everyday development, design, networking, date, percentage, storage, and data-transfer calculations.",
    keywords: [
      "developer calculators",
      "percentage calculator",
      "percentage change calculator",
      "date difference calculator",
      "age calculator",
      "aspect ratio calculator",
      "screen resolution calculator",
      "subnet calculator",
      "data transfer calculator",
    ],
    toolSlugs: [
      "date-difference-calculator",
      "age-calculator",
      "percentage-calculator",
      "percentage-change-calculator",
      "aspect-ratio-calculator",
      "screen-resolution-calculator",
      "ip-subnet-calculator",
      "data-transfer-time-calculator",
      "bytes-converter",
      "rem-to-px-converter",
      "px-to-rem-converter",
      "em-to-px-converter",
    ],
  },

  {
    slug: "colors",
    name: "Color Tools",
    description:
      "Convert hexadecimal and RGB color values quickly in your browser.",
    intro:
      "Convert between common web color formats with simple browser-based utilities for front-end development, design systems, CSS, and debugging.",
    keywords: [
      "color tools",
      "hex to RGB",
      "RGB to hex",
      "color converter",
      "CSS color converter",
    ],
    toolSlugs: [
      "hex-to-rgb",
      "rgb-to-hex",
    ],
  },
];

export function getToolCategory(
  slug: string
): ToolCategoryConfig | undefined {
  return toolCategories.find((category) => category.slug === slug);
}

export function getCategoryTools(category: ToolCategoryConfig) {
  const positions = new Map(
    category.toolSlugs.map((slug, index) => [slug, index])
  );

  return tools
    .filter((tool) => positions.has(tool.slug))
    .sort(
      (a, b) =>
        (positions.get(a.slug) ?? 0) -
        (positions.get(b.slug) ?? 0)
    );
}