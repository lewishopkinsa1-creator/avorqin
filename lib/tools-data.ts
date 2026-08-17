import { ToolConfig } from "@/types";

export const tools: ToolConfig[] = [
  {
    id: "json-formatter",
    name: "JSON Formatter",
    slug: "json-formatter",
    description:
      "Format, beautify, and minify JSON data with syntax error detection. Paste your JSON and instantly get clean, indented output.",
    longDescription:
      "Our JSON Formatter helps developers clean up messy JSON data in seconds. Whether you are debugging API responses, preparing configuration files, or sharing data with your team, this tool ensures your JSON is properly indented and valid. Supports both pretty-print formatting and minification for production use.",
    keywords: [
      "json formatter",
      "json beautifier",
      "format json",
      "json pretty print",
      "online json formatter",
    ],
    category: "Developer",
    icon: "Braces",
    howToUse: [
      "Paste your JSON data into the input area.",
      "Click 'Format JSON' to beautify with proper indentation.",
      "Use 'Minify' to compress JSON into a single line.",
      "Copy the result or download it as a .json file.",
    ],
    faq: [
      {
        question: "Is my JSON data sent to a server?",
        answer:
          "No. All formatting happens entirely in your browser. Your data never leaves your device.",
      },
      {
        question: "What is the maximum file size?",
        answer:
          "The tool handles JSON up to several megabytes. For very large files, browser memory may become a constraint.",
      },
      {
        question: "Can I format JSON with comments?",
        answer:
          "Standard JSON does not support comments. Remove comments before formatting, or use a JSON5 parser if needed.",
      },
    ],
  },
  {
    id: "json-validator",
    name: "JSON Validator",
    slug: "json-validator",
    description:
      "Validate JSON syntax and structure online. Get precise error messages with line and column numbers to fix issues fast.",
    longDescription:
      "The JSON Validator checks your JSON documents for syntax errors, missing commas, unmatched brackets, and invalid data types. It provides clear error messages with exact positions, helping you debug configuration files, API payloads, and data exports quickly and accurately.",
    keywords: [
      "json validator",
      "validate json",
      "json syntax checker",
      "json lint",
      "online json validator",
    ],
    category: "Developer",
    icon: "CheckCircle",
    howToUse: [
      "Paste your JSON into the input field.",
      "Click 'Validate JSON' to run the syntax check.",
      "Review any error messages with line and column details.",
      "Fix the errors and re-validate until the JSON is valid.",
    ],
    faq: [
      {
        question: "What errors does the validator catch?",
        answer:
          "It catches syntax errors such as trailing commas, unquoted keys, unmatched braces, invalid escape sequences, and incorrect data types.",
      },
      {
        question: "Does it validate against a schema?",
        answer:
          "This tool validates syntax only. For schema validation (JSON Schema), use a dedicated schema validator.",
      },
      {
        question: "Is validation performed locally?",
        answer:
          "Yes. All validation runs in your browser. No data is transmitted externally.",
      },
    ],
  },
  {
    id: "base64-encoder",
    name: "Base64 Encoder",
    slug: "base64-encoder",
    description:
      "Encode text to Base64 online. Fast, client-side encoding for data URIs, API payloads, and embedded assets.",
    longDescription:
      "Base64 encoding converts text data into an ASCII string format safe for transmission over text-based protocols. Use this tool to encode strings for data URIs, embed content in CSS or HTML, or prepare payloads for APIs. All processing happens locally in your browser.",
    keywords: [
      "base64 encoder",
      "encode base64",
      "text to base64",
      "base64 online",
      "base64 encode string",
    ],
    category: "Developer",
    icon: "Lock",
    howToUse: [
      "Type or paste the text you want to encode.",
      "Click 'Encode to Base64' to transform the input.",
      "Copy the Base64 output to your clipboard.",
    ],
    faq: [
      {
        question: "What is Base64 encoding used for?",
        answer:
          "Base64 is commonly used for encoding data in email attachments, embedding content in HTML/CSS, and transmitting data in URL parameters or JSON fields.",
      },
      {
        question: "Is there a size limit?",
        answer:
          "The tool handles text up to several megabytes. Very large inputs may slow down your browser due to memory constraints.",
      },
      {
        question: "Is this tool secure for sensitive data?",
        answer:
          "Base64 is not encryption—it is encoding. Anyone can decode it. Do not use Base64 to protect sensitive information.",
      },
    ],
  },
  {
    id: "base64-decoder",
    name: "Base64 Decoder",
    slug: "base64-decoder",
    description:
      "Decode Base64 strings back to readable text. Supports UTF-8 and detects invalid Base64 input with helpful errors.",
    longDescription:
      "The Base64 Decoder reverses Base64-encoded text back to its original string form. It handles standard Base64, URL-safe Base64, and padded or unpadded strings. All decoding is performed client-side for privacy.",
    keywords: [
      "base64 decoder",
      "decode base64",
      "base64 to text",
      "base64 decode online",
      "base64 string decoder",
    ],
    category: "Developer",
    icon: "Unlock",
    howToUse: [
      "Paste your Base64-encoded string into the input.",
      "Click 'Decode Base64' to reveal the original text.",
      "Copy the decoded output to your clipboard.",
    ],
    faq: [
      {
        question: "Why is my Base64 not decoding?",
        answer:
          "Ensure the string uses valid Base64 characters (A-Z, a-z, 0-9, +, /, =). Remove any whitespace or line breaks if present.",
      },
      {
        question: "Can I decode binary data?",
        answer:
          "This tool decodes to text. For binary data such as images, use a dedicated binary decoder or save the decoded bytes directly.",
      },
      {
        question: "Does this support URL-safe Base64?",
        answer:
          "Yes. The decoder automatically handles both standard Base64 (+, /) and URL-safe Base64 (-, _) variants.",
      },
    ],
  },
  {
    id: "url-encoder",
    name: "URL Encoder",
    slug: "url-encoder",
    description:
      "Encode URLs and strings to percent-encoded format. Ensure special characters are safely transmitted in web addresses and query parameters.",
    longDescription:
      "URL encoding (percent-encoding) converts characters into a format that can be transmitted over the internet. Special characters, spaces, and non-ASCII characters are replaced with a percent sign followed by hexadecimal values. This tool encodes both full URLs and individual components, helping you construct valid web addresses and API requests.",
    keywords: [
      "url encoder",
      "encode url",
      "percent encode",
      "url encode online",
      "url escape",
    ],
    category: "Developer",
    icon: "Link",
    howToUse: [
      "Paste the text or URL you need to encode.",
      "Choose between 'Encode Full URL' or 'Encode Component' mode.",
      "Click 'Encode' to generate the percent-encoded result.",
      "Copy the encoded output for use in your application.",
    ],
    faq: [
      {
        question: "What is the difference between encodeURI and encodeURIComponent?",
        answer:
          "encodeURI is meant for full URLs and preserves characters with meaning in URLs (like ? and &). encodeURIComponent is for query parameters and encodes almost all special characters.",
      },
      {
        question: "Should I encode spaces as %20 or +?",
        answer:
          "In URLs, spaces are typically encoded as %20. The plus sign (+) is used in application/x-www-form-urlencoded data such as HTML form submissions.",
      },
      {
        question: "Does this handle Unicode characters?",
        answer:
          "Yes. Non-ASCII characters are encoded using UTF-8 percent-encoding, which is the modern web standard.",
      },
    ],
  },
  {
    id: "url-decoder",
    name: "URL Decoder",
    slug: "url-decoder",
    description:
      "Decode percent-encoded URLs and strings back to readable text. Fix garbled URLs and inspect encoded query parameters.",
    longDescription:
      "The URL Decoder reverses percent-encoding, converting sequences like %20 back to spaces and %3A back to colons. It is essential for debugging encoded URLs, reading query parameters, and cleaning up data that has been escaped for transmission. The tool handles both full URLs and individual encoded components.",
    keywords: [
      "url decoder",
      "decode url",
      "percent decode",
      "url decode online",
      "url unescape",
    ],
    category: "Developer",
    icon: "Unlink",
    howToUse: [
      "Paste the percent-encoded URL or string.",
      "Click 'Decode' to convert it back to plain text.",
      "Review the decoded output for readability.",
      "Copy the result or use it directly in your workflow.",
    ],
    faq: [
      {
        question: "Why does my decoded URL look wrong?",
        answer:
          "Ensure the input is properly percent-encoded. Double-encoded strings (where % itself is encoded as %25) may need to be decoded twice.",
      },
      {
        question: "Can this decode form data?",
        answer:
          "Yes. The decoder handles both %20 and + representations of spaces, making it suitable for decoding form-encoded data.",
      },
      {
        question: "Is decoding safe for malicious URLs?",
        answer:
          "Decoding itself is safe, but always inspect decoded URLs before visiting them, as attackers may hide malicious destinations behind encoding.",
      },
    ],
  },
  {
    id: "timestamp-converter",
    name: "Timestamp Converter",
    slug: "timestamp-converter",
    description:
      "Convert Unix timestamps to human-readable dates and vice versa. Supports seconds and milliseconds, with timezone awareness.",
    longDescription:
      "Unix timestamps count the number of seconds (or milliseconds) since January 1, 1970 UTC. This converter translates between these numeric timestamps and readable calendar dates. It supports both seconds and milliseconds formats, displays results in your local timezone and UTC, and includes a live current timestamp for quick reference.",
    keywords: [
      "timestamp converter",
      "unix timestamp",
      "epoch converter",
      "timestamp to date",
      "date to timestamp",
    ],
    category: "Developer",
    icon: "Clock",
    howToUse: [
      "Enter a Unix timestamp or a date string in the input.",
      "Select whether your timestamp is in seconds or milliseconds.",
      "Click 'Convert' to see the corresponding date and time.",
      "Use 'Current Timestamp' to get the live Unix time.",
    ],
    faq: [
      {
        question: "What is a Unix timestamp?",
        answer:
          "A Unix timestamp is the number of seconds (or milliseconds) that have elapsed since midnight UTC on January 1, 1970, not counting leap seconds.",
      },
      {
        question: "Does this account for timezones?",
        answer:
          "The converter displays results in both your local timezone and UTC. The input timestamp itself is always in UTC.",
      },
      {
        question: "How do I know if my timestamp is seconds or milliseconds?",
        answer:
          "Millisecond timestamps are typically 13 digits long (e.g., 1700000000000), while second timestamps are 10 digits (e.g., 1700000000).",
      },
    ],
  },
  {
    id: "html-formatter",
    name: "HTML Formatter",
    slug: "html-formatter",
    description:
      "Beautify and indent HTML code for better readability. Clean up minified HTML with proper line breaks and nesting.",
    longDescription:
      "The HTML Formatter takes compressed or messy HTML markup and restructures it with consistent indentation and line breaks. It preserves tag structure, attributes, and content while making the code readable for debugging, code review, and learning. The tool handles self-closing tags, comments, and inline text appropriately.",
    keywords: [
      "html formatter",
      "html beautifier",
      "format html",
      "html pretty print",
      "online html formatter",
    ],
    category: "Developer",
    icon: "Code2",
    howToUse: [
      "Paste your HTML markup into the input area.",
      "Click 'Format HTML' to apply indentation and line breaks.",
      "Review the formatted output for readability.",
      "Copy the result or download it as an .html file.",
    ],
    faq: [
      {
        question: "Will this change my HTML functionality?",
        answer:
          "No. The formatter only adjusts whitespace and indentation. It does not modify tags, attributes, or content.",
      },
      {
        question: "Does it handle inline CSS and JavaScript?",
        answer:
          "Yes. The formatter preserves content inside <style> and <script> tags, though it does not format the CSS or JS itself.",
      },
      {
        question: "Can I format HTML fragments?",
        answer:
          "Yes. You do not need a complete document. Partial HTML snippets are formatted correctly.",
      },
    ],
  },
  {
    id: "css-formatter",
    name: "CSS Formatter",
    slug: "css-formatter",
    description:
      "Format and beautify CSS stylesheets with proper indentation. Organize your styles for easier maintenance and collaboration.",
    longDescription:
      "The CSS Formatter cleans up minified or poorly formatted CSS by adding consistent indentation, line breaks between rules, and proper spacing around selectors and declarations. It helps teams maintain readable stylesheets, simplifies debugging, and makes code reviews more efficient. The tool preserves all CSS rules, media queries, and comments.",
    keywords: [
      "css formatter",
      "css beautifier",
      "format css",
      "css pretty print",
      "online css formatter",
    ],
    category: "Developer",
    icon: "Palette",
    howToUse: [
      "Paste your CSS code into the input field.",
      "Click 'Format CSS' to apply indentation and spacing.",
      "Review the formatted stylesheet.",
      "Copy the output or download it as a .css file.",
    ],
    faq: [
      {
        question: "Does this support CSS3 and modern features?",
        answer:
          "Yes. The formatter handles standard CSS syntax including variables, grid, flexbox, animations, and media queries.",
      },
      {
        question: "Will it sort my CSS properties?",
        answer:
          "The current version preserves property order while adding indentation. Property sorting may be added in a future update.",
      },
      {
        question: "Can it format SCSS or Less?",
        answer:
          "Basic nesting is handled, but full SCSS/Less preprocessing features like mixins and variables may not format perfectly.",
      },
    ],
  },
  {
    id: "csv-to-json",
    name: "CSV to JSON Converter",
    slug: "csv-to-json",
    description:
      "Convert CSV files and data to JSON format online. Choose delimiters, toggle headers, and get clean JSON arrays or objects.",
    longDescription:
      "The CSV to JSON Converter transforms comma-separated values into structured JSON. It supports custom delimiters, quoted fields, and header row detection. Use it to migrate spreadsheet data, prepare API payloads, or convert exports from databases and analytics tools into a format ready for JavaScript applications.",
    keywords: [
      "csv to json",
      "convert csv to json",
      "csv json converter",
      "csv parser online",
      "excel to json",
    ],
    category: "Developer",
    icon: "Table",
    howToUse: [
      "Paste your CSV data into the input area.",
      "Choose your delimiter (comma, tab, or semicolon).",
      "Toggle 'First row is header' if your CSV has column names.",
      "Click 'Convert' and copy or download the JSON result.",
    ],
    faq: [
      {
        question: "What delimiter options are supported?",
        answer:
          "Comma, tab, and semicolon delimiters are supported. The tool auto-detects commas by default.",
      },
      {
        question: "Does it handle quoted fields?",
        answer:
          "Yes. Fields wrapped in double quotes are parsed correctly, including quotes that contain the delimiter or line breaks.",
      },
      {
        question: "What JSON output format does it produce?",
        answer:
          "If headers are enabled, the output is an array of objects. Without headers, it is an array of arrays.",
      },
    ],
  },
  {
    id: "uuid-generator",
    name: "UUID Generator",
    slug: "uuid-generator",
    description:
      "Generate secure random UUID v4 identifiers instantly in your browser. Create one UUID or generate up to 50 at once.",
    longDescription:
      "The UUID Generator creates version 4 universally unique identifiers using cryptographically secure browser APIs. Generate a single UUID or create batches of up to 50 identifiers for databases, APIs, test data, distributed systems, and application development. UUID generation happens locally in your browser and does not require an external service.",
    keywords: [
      "uuid generator",
      "uuid v4 generator",
      "guid generator",
      "random uuid",
      "generate uuid",
    ],
    category: "Developer",
    icon: "Fingerprint",
    howToUse: [
      "Choose how many UUIDs you want to generate: 1, 5, 10, 25, or 50.",
      "Click 'Generate UUID' or 'Generate UUIDs' to create secure random UUID v4 identifiers.",
      "Review the generated identifiers, with one UUID displayed per line.",
      "Use the Copy button to copy the complete output to your clipboard.",
    ],
    faq: [
      {
        question: "What is a UUID?",
        answer:
          "A UUID is a 128-bit identifier designed to be unique across systems without requiring a central coordinating service. UUIDs are commonly used as database keys, API identifiers, request IDs, and identifiers in distributed applications.",
      },
      {
        question: "What is UUID v4?",
        answer:
          "UUID version 4 is generated primarily from random data. Its version and variant bits follow the UUID format, while the remaining bits are generated securely. A UUID v4 looks like 550e8400-e29b-41d4-a716-446655440000.",
      },
      {
        question: "Can two generated UUIDs ever be the same?",
        answer:
          "A collision is theoretically possible, but extraordinarily unlikely when UUID v4 values are generated correctly with cryptographically secure randomness.",
      },
      {
        question: "Are UUIDs generated on Avorqin sent to a server?",
        answer:
          "No. UUID generation happens locally in your browser using secure browser cryptography APIs. Avorqin does not need to send generated UUIDs to an external API.",
      },
    ],
  },

  {
    id: "jwt-decoder",
    name: "JWT Decoder",
    slug: "jwt-decoder",
    description:
      "Decode JWT headers and payloads instantly in your browser. Inspect claims and common token timestamps without sending your token to a server.",
    longDescription:
      "The JWT Decoder reads the Base64URL-encoded header and payload sections of a JSON Web Token and displays them as formatted JSON. It also converts common exp, iat, and nbf Unix timestamp claims into readable UTC dates. Decoding happens locally in your browser. This tool does not verify JWT signatures and should not be used as proof that a token is authentic or trusted.",
    keywords: [
      "jwt decoder",
      "decode jwt",
      "json web token decoder",
      "jwt payload decoder",
      "jwt claims",
    ],
    category: "Developer",
    icon: "KeyRound",
    howToUse: [
      "Paste a JSON Web Token into the input field.",
      "Click 'Decode JWT' to decode the token header and payload.",
      "Review the formatted JSON and any recognized exp, iat, or nbf timestamps.",
      "Copy the decoded sections when needed. Remember that decoding does not verify the JWT signature.",
    ],
    faq: [
      {
        question: "What is a JWT?",
        answer:
          "A JSON Web Token is a compact token format commonly used to transmit claims between systems. A typical JWT contains a header, payload, and signature section separated by periods.",
      },
      {
        question: "Does this JWT Decoder verify signatures?",
        answer:
          "No. It only decodes the token contents. Signature verification requires the correct cryptographic key and algorithm and must be performed separately before a token is trusted.",
      },
      {
        question: "What do exp, iat, and nbf mean?",
        answer:
          "exp is the expiration time, iat is the issued-at time, and nbf is the not-before time. JWT numeric date claims are generally represented as Unix timestamps in seconds.",
      },
      {
        question: "Does Avorqin upload my JWT?",
        answer:
          "No. Decoding is performed locally in your browser. Even so, avoid sharing sensitive production tokens with other people or services.",
      },
    ],
  },

  {
    id: "json-to-csv",
    name: "JSON to CSV Converter",
    slug: "json-to-csv",
    description:
      "Convert JSON arrays into clean CSV data instantly in your browser. Choose comma, semicolon, or tab delimiters and include headers when needed.",
    longDescription:
      "The JSON to CSV Converter transforms JSON arrays into CSV text that can be opened in spreadsheet applications, imported into databases, or used in reporting workflows. It supports arrays of objects, automatically combines object keys into columns, handles missing values, safely quotes fields that contain delimiters or line breaks, and works entirely in your browser.",
    keywords: [
      "json to csv",
      "convert json to csv",
      "json csv converter",
      "json to spreadsheet",
      "json array to csv",
    ],
    category: "Developer",
    icon: "FileSpreadsheet",
    howToUse: [
      "Paste a JSON array into the input area.",
      "Choose a comma, semicolon, or tab delimiter.",
      "Choose whether to include a header row.",
      "Click 'Convert to CSV' and copy the generated CSV output.",
    ],
    faq: [
      {
        question: "What JSON format works best?",
        answer:
          "An array of objects works best because object keys become CSV columns. Arrays of simple values are also supported and are written as one value per row.",
      },
      {
        question: "What happens if objects have different keys?",
        answer:
          "The converter combines all keys found across the array into the CSV header. Missing values are left blank for records that do not contain a particular key.",
      },
      {
        question: "Does it handle commas and quotes inside values?",
        answer:
          "Yes. Fields containing the selected delimiter, double quotes, or line breaks are wrapped in quotes, and embedded double quotes are escaped according to CSV conventions.",
      },
      {
        question: "Is my JSON uploaded anywhere?",
        answer:
          "No. Conversion happens locally in your browser, so Avorqin does not need to send your JSON to an external API.",
      },
    ],
  },

  {
    id: "xml-formatter",
    name: "XML Formatter",
    slug: "xml-formatter",
    description:
      "Format, beautify, validate, and minify XML directly in your browser. Clean up compact XML with readable indentation and helpful syntax errors.",
    longDescription:
      "The XML Formatter makes XML documents easier to read by adding consistent indentation and line breaks while preserving document structure. It also validates XML syntax before formatting, reports malformed XML, supports 2-space and 4-space indentation, and can minify XML when compact output is needed. Processing happens entirely in your browser.",
    keywords: [
      "xml formatter",
      "xml beautifier",
      "format xml",
      "xml pretty print",
      "online xml formatter",
    ],
    category: "Developer",
    icon: "FileCode2",
    howToUse: [
      "Paste XML into the input area.",
      "Choose 2-space or 4-space indentation.",
      "Click 'Format XML' to validate and beautify the document.",
      "Use 'Minify' for compact XML or copy the formatted result.",
    ],
    faq: [
      {
        question: "Does the XML Formatter validate my XML?",
        answer:
          "Yes. The tool parses the XML before formatting and displays an error when the document is malformed.",
      },
      {
        question: "Will formatting change my XML data?",
        answer:
          "The formatter is designed to preserve the XML document structure while making the serialized markup easier to read.",
      },
      {
        question: "Can I minify XML too?",
        answer:
          "Yes. Use the Minify button to remove unnecessary whitespace between XML elements after the document has been validated.",
      },
      {
        question: "Is my XML uploaded to a server?",
        answer:
          "No. XML parsing, formatting, validation, and minification happen locally in your browser.",
      },
    ],
  },


  {
    id: "sql-formatter",
    name: "SQL Formatter",
    slug: "sql-formatter",
    description:
      "Format and beautify SQL queries instantly in your browser. Clean up common SQL syntax, adjust indentation, or minify SQL without sending your code to a server.",
    longDescription:
      "The SQL Formatter cleans up common SQL queries into a more readable layout directly in your browser. Format SELECT statements, joins, filters, ordering, and other common SQL syntax, or minify SQL when you need a compact query. Processing happens locally in your browser, and the tool does not execute queries against a database.",
    keywords: [
      "sql formatter",
      "format sql",
      "sql beautifier",
      "sql pretty print",
      "minify sql",
    ],
    category: "Developer",
    icon: "Database",
    howToUse: [
      "Paste your SQL query into the input box.",
      "Choose 2-space or 4-space indentation.",
      "Click 'Format SQL' to beautify the query, or 'Minify' for compact SQL.",
      "Copy the formatted result when finished.",
    ],
    faq: [
      {
        question: "Does Avorqin execute my SQL?",
        answer:
          "No. The formatter only transforms SQL text in your browser. It does not connect to a database or execute your query.",
      },
      {
        question: "Is my SQL uploaded to a server?",
        answer:
          "No. SQL formatting and minification are performed locally in your browser.",
      },
      {
        question: "Which SQL dialects are supported?",
        answer:
          "The formatter is designed for common SQL syntax. Vendor-specific extensions may not always be formatted perfectly.",
      },
      {
        question: "Can I minify SQL?",
        answer:
          "Yes. Use the Minify button to produce a compact version of your SQL query.",
      },
    ],
  },

];

export function getToolBySlug(slug: string): ToolConfig | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getAllToolSlugs(): string[] {
  return tools.map((t) => t.slug);
}

export function getToolsByCategory(category: string): ToolConfig[] {
  return tools.filter((t) => t.category === category);
}