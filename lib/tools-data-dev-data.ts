import { ToolConfig } from "@/types";

const localProcessingFaq = [
  {
    question: "Does Avorqin send my input to an external service?",
    answer:
      "No. These developer and data tools are designed to process the text you enter directly in your browser.",
  },
  {
    question: "Do I need an account to use these tools?",
    answer:
      "No. Avorqin developer and data tools can be used without creating an account.",
  },
  {
    question: "Can I copy the generated output?",
    answer:
      "Yes. Tools that generate TypeScript, HTML, or Markdown include a copy option for the output.",
  },
];

function devDataTool(
  config: Omit<ToolConfig, "faq"> & {
    faq?: ToolConfig["faq"];
  }
): ToolConfig {
  return {
    ...config,
    faq: config.faq ?? localProcessingFaq,
  };
}

export const devDataTools: ToolConfig[] = [
  devDataTool({
    id: "json-to-typescript",
    name: "JSON to TypeScript Converter",
    slug: "json-to-typescript",
    category: "JSON & Data",
    description:
      "Convert JSON objects and arrays into TypeScript interfaces and type declarations directly in your browser.",
    longDescription:
      "Generate TypeScript definitions from JSON without installing a package or sending data to an external conversion service. Paste valid JSON, choose a root type name, and Avorqin infers strings, numbers, booleans, null values, arrays, nested objects, and union-style array element types.",
    keywords: [
      "JSON to TypeScript",
      "JSON to TypeScript interface",
      "JSON TypeScript converter",
      "generate TypeScript from JSON",
      "JSON to TS",
      "TypeScript interface generator",
      "JSON type generator",
    ],
    icon: "Braces",
    howToUse: [
      "Paste valid JSON into the editor.",
      "Enter a root type name or keep the default.",
      "Click 'Generate TypeScript'.",
      "Review and copy the generated interfaces and type declarations.",
    ],
    faq: [
      {
        question: "What TypeScript types can the converter infer?",
        answer:
          "It infers common JSON values including strings, numbers, booleans, null, arrays, and nested objects.",
      },
      {
        question: "What happens when an array contains different value types?",
        answer:
          "The converter combines the detected element types into a TypeScript union where needed.",
      },
      {
        question: "Does it generate optional properties?",
        answer:
          "No. The generated interfaces describe the properties present in the JSON sample you provide and do not automatically infer optional fields from missing examples.",
      },
    ],
  }),

  devDataTool({
    id: "jsonpath-tester",
    name: "JSONPath Tester",
    slug: "jsonpath-tester",
    category: "JSON & Data",
    description:
      "Test JSONPath expressions against JSON and inspect matching values with their resolved paths.",
    longDescription:
      "Run common JSONPath expressions against a JSON document directly in your browser. The tester supports root expressions, dot notation, quoted bracket properties, array indexes, negative indexes, wildcards, and recursive descent, then shows every matched path and value.",
    keywords: [
      "JSONPath tester",
      "JSONPath evaluator",
      "test JSONPath",
      "JSONPath online",
      "JSONPath query tester",
      "JSON path finder",
      "JSONPath wildcard",
    ],
    icon: "SearchCode",
    howToUse: [
      "Paste valid JSON into the editor.",
      "Enter a JSONPath expression beginning with $.",
      "Click 'Run JSONPath'.",
      "Review each matching path and value.",
    ],
    faq: [
      {
        question: "Which JSONPath features are supported?",
        answer:
          "The tester supports dot notation, quoted bracket properties, array indexes, negative indexes, wildcards, and recursive descent.",
      },
      {
        question: "Are JSONPath filters supported?",
        answer:
          "No. Filters, slices, and unions are not supported in this version.",
      },
      {
        question: "What happens when there are no matches?",
        answer:
          "The tool reports zero matches without changing the JSON input.",
      },
    ],
  }),

  devDataTool({
    id: "json-diff",
    name: "JSON Diff",
    slug: "json-diff",
    category: "JSON & Data",
    description:
      "Compare two JSON documents and find added, removed, changed, and type-changed values by path.",
    longDescription:
      "Compare two JSON documents structurally and inspect exactly where they differ. Avorqin walks nested objects and arrays and reports additions, removals, changed values, and type changes using JSON-style paths for each difference.",
    keywords: [
      "JSON diff",
      "JSON compare",
      "compare JSON",
      "JSON difference checker",
      "JSON diff tool",
      "JSON comparison tool",
      "compare two JSON files",
    ],
    icon: "GitCompareArrows",
    howToUse: [
      "Paste the first JSON document into the left editor.",
      "Paste the second JSON document into the right editor.",
      "Click 'Compare JSON'.",
      "Review the paths and values for every detected difference.",
    ],
    faq: [
      {
        question: "What types of JSON differences are reported?",
        answer:
          "The tool reports added values, removed values, changed values, and cases where the value type changed.",
      },
      {
        question: "Does key order affect the comparison?",
        answer:
          "No. Object properties are compared by key rather than by their order in the source text.",
      },
      {
        question: "Are array positions compared?",
        answer:
          "Yes. Array elements are compared by index, so inserting or removing an item can create differences at affected positions.",
      },
    ],
  }),

  devDataTool({
    id: "markdown-to-html",
    name: "Markdown to HTML Converter",
    slug: "markdown-to-html",
    category: "Web & Code",
    description:
      "Convert common Markdown syntax into clean HTML for headings, lists, links, code, quotes, emphasis, and more.",
    longDescription:
      "Convert Markdown into HTML directly in your browser. The converter handles common headings, paragraphs, ordered and unordered lists, blockquotes, fenced code blocks, links, inline code, bold, italic, strikethrough, and horizontal rules while escaping raw HTML input.",
    keywords: [
      "Markdown to HTML",
      "Markdown to HTML converter",
      "convert Markdown to HTML",
      "MD to HTML",
      "Markdown converter",
      "Markdown HTML generator",
      "Markdown parser",
    ],
    icon: "CodeXml",
    howToUse: [
      "Paste or type Markdown into the editor.",
      "Click 'Convert'.",
      "Review the generated HTML.",
      "Copy the HTML for use in a webpage, CMS, or project.",
    ],
    faq: [
      {
        question: "What Markdown syntax is supported?",
        answer:
          "The converter supports common headings, paragraphs, ordered and unordered lists, blockquotes, fenced code blocks, links, inline code, bold, italic, strikethrough, and horizontal rules.",
      },
      {
        question: "Is raw HTML executed?",
        answer:
          "No. Raw HTML characters in the Markdown source are escaped instead of being injected into the page.",
      },
      {
        question: "Does it support every Markdown extension?",
        answer:
          "No. The converter focuses on common Markdown syntax rather than every platform-specific extension.",
      },
    ],
  }),

  devDataTool({
    id: "html-to-markdown",
    name: "HTML to Markdown Converter",
    slug: "html-to-markdown",
    category: "Web & Code",
    description:
      "Convert common HTML content into clean Markdown including headings, links, lists, tables, code, quotes, and formatting.",
    longDescription:
      "Convert HTML into readable Markdown locally in your browser. The converter handles common document structures such as headings, paragraphs, links, images, ordered and unordered lists, blockquotes, inline and fenced code, tables, emphasis, strikethrough, and horizontal rules while ignoring scripts and styles.",
    keywords: [
      "HTML to Markdown",
      "HTML to Markdown converter",
      "convert HTML to Markdown",
      "HTML to MD",
      "HTML Markdown converter",
      "web page HTML to Markdown",
      "HTML cleanup to Markdown",
    ],
    icon: "FileCode2",
    howToUse: [
      "Paste or type HTML into the editor.",
      "Click 'Convert'.",
      "Review the generated Markdown.",
      "Copy the Markdown for use in documentation, notes, repositories, or content systems.",
    ],
    faq: [
      {
        question: "Which HTML elements are converted?",
        answer:
          "The converter handles common headings, paragraphs, links, images, lists, blockquotes, code, tables, emphasis, strikethrough, horizontal rules, and common document containers.",
      },
      {
        question: "What happens to scripts and styles?",
        answer:
          "Script, style, noscript, and template content is removed before conversion.",
      },
      {
        question: "Will every complex webpage convert perfectly?",
        answer:
          "No. The converter focuses on document content and common semantic HTML rather than reproducing layout, CSS, JavaScript behavior, or every custom component.",
      },
    ],
  }),
];