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
    "slug": "json",
    "name": "JSON Tools",
    "description": "Format, validate, convert, and work with JSON directly in your browser.",
    "intro": "Avorqin's JSON tools help you format, validate, and convert JSON for APIs, configuration files, data exports, and everyday development workflows.",
    "keywords": [
      "JSON tools",
      "JSON formatter",
      "JSON validator",
      "JSON converter",
      "JSON to CSV",
      "JSON to YAML",
      "XML to JSON"
    ],
    "toolSlugs": [
      "json-formatter",
      "json-validator",
      "csv-to-json",
      "json-to-csv",
      "yaml-to-json",
      "json-to-yaml",
      "xml-to-json",
      "json-to-xml"
    ]
  },
  {
    "slug": "formatters",
    "name": "Code Formatters",
    "description": "Beautify and clean up JSON, HTML, CSS, YAML, XML, and SQL in your browser.",
    "intro": "Clean up hard-to-read code and structured data with browser-based formatters for common developer formats. These tools are designed for quick debugging, review, and cleanup.",
    "keywords": [
      "code formatter",
      "JSON formatter",
      "HTML formatter",
      "CSS formatter",
      "YAML formatter",
      "XML formatter",
      "SQL formatter"
    ],
    "toolSlugs": [
      "json-formatter",
      "html-formatter",
      "css-formatter",
      "yaml-formatter",
      "xml-formatter",
      "sql-formatter"
    ]
  },
  {
    "slug": "converters",
    "name": "Developer Converters",
    "description": "Convert data formats, number bases, binary, hexadecimal, and color values online.",
    "intro": "Convert common developer data formats and representations without installing software. Avorqin converters run directly in your browser for fast everyday transformations.",
    "keywords": [
      "developer converters",
      "data converter",
      "JSON converter",
      "YAML converter",
      "XML converter",
      "binary converter",
      "hex converter",
      "color converter"
    ],
    "toolSlugs": [
      "csv-to-json",
      "json-to-csv",
      "yaml-to-json",
      "json-to-yaml",
      "xml-to-json",
      "json-to-xml",
      "timestamp-converter",
      "number-base-converter",
      "binary-to-text",
      "text-to-binary",
      "hex-to-text",
      "text-to-hex",
      "hex-to-rgb",
      "rgb-to-hex"
    ]
  },
  {
    "slug": "encode-decode",
    "name": "Encode & Decode Tools",
    "description": "Encode and decode Base64, URLs, HTML entities, binary, and hexadecimal text.",
    "intro": "Encode and decode common web and developer formats quickly. These utilities are useful for debugging payloads, inspecting encoded strings, and transforming text representations.",
    "keywords": [
      "encode decode tools",
      "Base64 encoder",
      "Base64 decoder",
      "URL encoder",
      "URL decoder",
      "HTML encoder",
      "binary to text",
      "hex to text"
    ],
    "toolSlugs": [
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
      "jwt-decoder"
    ]
  },
  {
    "slug": "generators",
    "name": "Developer Generators",
    "description": "Generate UUIDs, hashes, HMACs, passwords, random strings, placeholder text, and URL slugs.",
    "intro": "Generate common development values instantly with local browser-based utilities. Create identifiers, hashes, secure random values, placeholder copy, and clean URL slugs.",
    "keywords": [
      "developer generators",
      "UUID generator",
      "hash generator",
      "password generator",
      "random string generator",
      "HMAC generator",
      "slug generator"
    ],
    "toolSlugs": [
      "uuid-generator","qr-code-generator","mac-address-generator",
      "sha256-hash-generator",
      "sha1-hash-generator",
      "sha512-hash-generator",
      "hmac-generator",
      "random-string-generator",
      "password-generator",
      "lorem-ipsum-generator",
      "slug-generator"
    ]
  },
  {
    "slug": "web-code",
    "name": "Web & Code Tools",
    "description": "Inspect URLs, query strings, JWTs, regular expressions, cron expressions, Markdown, and text.",
    "intro": "A collection of practical web and code utilities for inspecting, testing, transforming, and debugging common developer inputs directly in your browser.",
    "keywords": [
      "web developer tools",
      "URL parser",
      "query string parser",
      "regex tester",
      "cron expression helper",
      "JWT decoder",
      "Markdown previewer",
      "text tools"
    ],
    "toolSlugs": [
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
      "text-reverser"
    ]
  },
  {
    "slug": "colors",
    "name": "Color Tools",
    "description": "Convert hexadecimal and RGB color values quickly in your browser.",
    "intro": "Convert between common web color formats with simple browser-based utilities for front-end development, design systems, CSS, and debugging.",
    "keywords": [
      "color tools",
      "hex to RGB",
      "RGB to hex",
      "color converter",
      "CSS color converter"
    ],
    "toolSlugs": [
      "hex-to-rgb",
      "rgb-to-hex"
    ]
  }
];

export function getToolCategory(slug: string): ToolCategoryConfig | undefined {
  return toolCategories.find((category) => category.slug === slug);
}

export function getCategoryTools(category: ToolCategoryConfig) {
  const positions = new Map(category.toolSlugs.map((slug, index) => [slug, index]));
  return tools
    .filter((tool) => positions.has(tool.slug))
    .sort((a, b) => (positions.get(a.slug) ?? 0) - (positions.get(b.slug) ?? 0));
}
