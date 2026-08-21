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
      "Convert data formats, number bases, text encodings, measurements, storage units, dimensions, rates, and color values online.",
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
      "length converter",
      "temperature converter",
      "data rate converter",
      "ASCII converter",
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
      "fraction-to-percentage-calculator",
      "percentage-to-fraction-calculator",
      "decimal-to-percentage-calculator",
      "percentage-to-decimal-calculator",
      "length-converter",
      "weight-converter",
      "temperature-converter",
      "area-converter",
      "volume-converter",
      "speed-converter",
      "time-converter",
      "pressure-converter",
      "energy-converter",
      "power-converter",
      "frequency-converter",
      "angle-converter",
      "data-rate-converter",
      "fuel-economy-converter",
      "ascii-to-text-converter",
      "text-to-ascii-converter",
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
      "ascii-to-text-converter",
      "text-to-ascii-converter",
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
    slug: "seo",
    name: "SEO & Marketing Tools",
    description:
      "Generate and inspect meta tags, search snippets, Open Graph metadata, robots.txt rules, sitemaps, schema markup, UTM links, keywords, and headings.",
    intro:
      "Avorqin's SEO and marketing tools help site owners, developers, marketers, and content teams create and inspect common technical SEO and campaign data directly in the browser. Generate metadata, structured data, robots.txt rules, XML sitemaps, hreflang tags, tracking URLs, and content checks without installing software.",
    keywords: [
      "SEO tools",
      "meta tag generator",
      "SERP preview",
      "Open Graph preview",
      "robots.txt generator",
      "robots.txt tester",
      "XML sitemap generator",
      "schema markup generator",
      "FAQ schema generator",
      "hreflang generator",
      "UTM builder",
      "keyword density checker",
      "heading structure analyzer",
    ],
    toolSlugs: [
      "meta-tag-generator",
      "serp-preview",
      "open-graph-preview",
      "robots-txt-generator",
      "robots-txt-tester",
      "xml-sitemap-generator",
      "schema-markup-generator",
      "faq-schema-generator",
      "hreflang-generator",
      "utm-builder",
      "keyword-density-checker",
      "heading-structure-analyzer",
    ],
  },

  {
    slug: "calculators",
    name: "Developer Calculators",
    description:
      "Calculate averages, ratios, percentages, discounts, sales tax, tips, dates, age, resolutions, network values, data transfer times, and more.",
    intro:
      "Avorqin's calculators provide quick browser-based answers for everyday development, design, networking, date, percentage, storage, and data-transfer calculations.",
    keywords: [
      "developer calculators",
      "percentage calculator",
      "percentage change calculator",
      "average calculator",
      "ratio calculator",
      "discount calculator",
      "sales tax calculator",
      "tip calculator",
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
      "average-calculator",
      "ratio-calculator",
      "fraction-to-percentage-calculator",
      "percentage-to-fraction-calculator",
      "decimal-to-percentage-calculator",
      "percentage-to-decimal-calculator",
      "discount-calculator",
      "sales-tax-calculator",
      "tip-calculator",
    ],
  },

  {
    slug: "colors",
    name: "Color & Design Tools",
    description:
      "Pick, convert, compare, and generate colors, palettes, gradients, shades, tints, and accessibility contrast values directly in your browser.",
    intro:
      "Avorqin's color and design tools help developers and designers convert between HEX, RGB, HSL, and CMYK, check WCAG contrast, create color palettes, build CSS gradients, and generate shades and tints without installing design software.",
    keywords: [
      "color tools",
      "color converter",
      "color picker",
      "HEX to RGB",
      "RGB to HEX",
      "HEX to HSL",
      "HSL to HEX",
      "RGB to HSL",
      "HSL to RGB",
      "RGB to CMYK",
      "CMYK to RGB",
      "color contrast checker",
      "color palette generator",
      "CSS gradient generator",
      "shades and tints generator",
    ],
    toolSlugs: [
      "hex-to-rgb",
      "rgb-to-hex",
      "color-picker",
      "color-converter",
      "hex-to-hsl",
      "hsl-to-hex",
      "rgb-to-hsl",
      "hsl-to-rgb",
      "rgb-to-cmyk",
      "cmyk-to-rgb",
      "color-contrast-checker",
      "color-palette-generator",
      "gradient-generator",
      "shades-and-tints-generator",
    ],
  },

  {
    slug: "pdf",
    name: "PDF & Document Tools",
    description:
      "Merge, split, rotate, inspect, edit, and convert PDF documents and images directly in your browser.",
    intro:
      "Avorqin's PDF and document tools help you combine, split, extract, organize, inspect, and modify PDF files without installing desktop software. Supported files are processed directly in your browser rather than intentionally uploaded to Avorqin for processing.",
    keywords: [
      "PDF tools",
      "PDF converter",
      "merge PDF",
      "split PDF",
      "rotate PDF",
      "PDF page extractor",
      "PDF metadata",
      "PDF page counter",
      "image to PDF",
      "JPG to PDF",
      "PNG to PDF",
    ],
    toolSlugs: [
      "merge-pdf",
      "split-pdf",
      "extract-pdf-pages",
      "remove-pdf-pages",
      "reorder-pdf-pages",
      "rotate-pdf",
      "pdf-page-counter",
      "pdf-metadata-viewer",
      "pdf-metadata-remover",
      "pdf-page-size-checker",
      "pdf-orientation-checker",
      "pdf-info",
      "add-page-numbers-to-pdf",
      "add-watermark-to-pdf",
      "images-to-pdf",
      "jpg-to-pdf",
      "png-to-pdf",
    ],
  },

  {
    slug: "images",
    name: "Image Tools",
    description:
      "Compress, resize, crop, rotate, inspect, encode, and convert JPG, PNG, WebP, and SVG images directly in your browser.",
    intro:
      "Avorqin's image tools help you resize, compress, crop, rotate, inspect, encode, and convert common image formats without installing desktop software. Supported images are processed directly in your browser rather than intentionally uploaded to Avorqin for processing.",
    keywords: [
      "image tools",
      "image converter",
      "image compressor",
      "image resizer",
      "image cropper",
      "JPG to PNG",
      "PNG to JPG",
      "WebP converter",
      "SVG to PNG",
      "image dimensions",
      "image DPI calculator",
      "image to Base64",
    ],
    toolSlugs: [
      "image-compressor",
      "image-resizer",
      "image-cropper",
      "image-rotator",
      "jpg-to-png",
      "png-to-jpg",
      "webp-to-png",
      "png-to-webp",
      "jpg-to-webp",
      "webp-to-jpg",
      "svg-to-png",
      "image-dimensions-checker",
      "image-dpi-calculator",
      "image-to-base64",
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