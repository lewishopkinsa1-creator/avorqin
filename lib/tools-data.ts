import { ToolConfig } from "@/types";
import { batch6Tools } from "@/lib/tools-data-batch-6";
import { pdfTools } from "@/lib/tools-data-pdf";
import { imageTools } from "@/lib/tools-data-images";
import { seoTools } from "@/lib/tools-data-seo";

const existingTools: ToolConfig[] = [
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

  {
    id: "yaml-formatter",
    name: "YAML Formatter",
    slug: "yaml-formatter",
    description:
      "Format and clean up YAML with consistent indentation directly in your browser.",
    longDescription:
      "Format and clean up YAML with consistent indentation directly in your browser. Avorqin processes the input locally in your browser so you can work quickly without sending the content to an external conversion service.",
    keywords: ["yaml formatter", "yaml formatter", "online yaml formatter"],
    category: "Developer",
    icon: "FileCode2",
    howToUse: [
      "Enter or paste your input into the tool.",
      "Run the conversion or formatting action.",
      "Review the result for accuracy.",
      "Copy the result when finished.",
    ],
    faq: [
      {
        question: "Does this tool send my data to a server?",
        answer:
          "No. Processing is performed locally in your browser.",
      },
      {
        question: "Can I use this tool for development work?",
        answer:
          "Yes. It is designed for quick formatting, conversion, debugging, and everyday developer workflows.",
      },
      {
        question: "Do I need to install anything?",
        answer:
          "No. The tool runs directly in a modern web browser.",
      },
    ],
  },

  {
    id: "yaml-to-json",
    name: "YAML to JSON Converter",
    slug: "yaml-to-json",
    description:
      "Convert common YAML documents to formatted JSON directly in your browser.",
    longDescription:
      "Convert common YAML documents to formatted JSON directly in your browser. Avorqin processes the input locally in your browser so you can work quickly without sending the content to an external conversion service.",
    keywords: ["yaml to json converter", "yaml to json", "online yaml to json"],
    category: "Developer",
    icon: "ArrowRightLeft",
    howToUse: [
      "Enter or paste your input into the tool.",
      "Run the conversion or formatting action.",
      "Review the result for accuracy.",
      "Copy the result when finished.",
    ],
    faq: [
      {
        question: "Does this tool send my data to a server?",
        answer:
          "No. Processing is performed locally in your browser.",
      },
      {
        question: "Can I use this tool for development work?",
        answer:
          "Yes. It is designed for quick formatting, conversion, debugging, and everyday developer workflows.",
      },
      {
        question: "Do I need to install anything?",
        answer:
          "No. The tool runs directly in a modern web browser.",
      },
    ],
  },

  {
    id: "json-to-yaml",
    name: "JSON to YAML Converter",
    slug: "json-to-yaml",
    description:
      "Convert JSON objects and arrays to readable YAML directly in your browser.",
    longDescription:
      "Convert JSON objects and arrays to readable YAML directly in your browser. Avorqin processes the input locally in your browser so you can work quickly without sending the content to an external conversion service.",
    keywords: ["json to yaml converter", "json to yaml", "online json to yaml"],
    category: "Developer",
    icon: "ArrowRightLeft",
    howToUse: [
      "Enter or paste your input into the tool.",
      "Run the conversion or formatting action.",
      "Review the result for accuracy.",
      "Copy the result when finished.",
    ],
    faq: [
      {
        question: "Does this tool send my data to a server?",
        answer:
          "No. Processing is performed locally in your browser.",
      },
      {
        question: "Can I use this tool for development work?",
        answer:
          "Yes. It is designed for quick formatting, conversion, debugging, and everyday developer workflows.",
      },
      {
        question: "Do I need to install anything?",
        answer:
          "No. The tool runs directly in a modern web browser.",
      },
    ],
  },

  {
    id: "xml-to-json",
    name: "XML to JSON Converter",
    slug: "xml-to-json",
    description:
      "Convert XML documents to structured JSON directly in your browser.",
    longDescription:
      "Convert XML documents to structured JSON directly in your browser. Avorqin processes the input locally in your browser so you can work quickly without sending the content to an external conversion service.",
    keywords: ["xml to json converter", "xml to json", "online xml to json"],
    category: "Developer",
    icon: "ArrowRightLeft",
    howToUse: [
      "Enter or paste your input into the tool.",
      "Run the conversion or formatting action.",
      "Review the result for accuracy.",
      "Copy the result when finished.",
    ],
    faq: [
      {
        question: "Does this tool send my data to a server?",
        answer:
          "No. Processing is performed locally in your browser.",
      },
      {
        question: "Can I use this tool for development work?",
        answer:
          "Yes. It is designed for quick formatting, conversion, debugging, and everyday developer workflows.",
      },
      {
        question: "Do I need to install anything?",
        answer:
          "No. The tool runs directly in a modern web browser.",
      },
    ],
  },

  {
    id: "json-to-xml",
    name: "JSON to XML Converter",
    slug: "json-to-xml",
    description:
      "Convert JSON objects and arrays to XML directly in your browser.",
    longDescription:
      "Convert JSON objects and arrays to XML directly in your browser. Avorqin processes the input locally in your browser so you can work quickly without sending the content to an external conversion service.",
    keywords: ["json to xml converter", "json to xml", "online json to xml"],
    category: "Developer",
    icon: "ArrowRightLeft",
    howToUse: [
      "Enter or paste your input into the tool.",
      "Run the conversion or formatting action.",
      "Review the result for accuracy.",
      "Copy the result when finished.",
    ],
    faq: [
      {
        question: "Does this tool send my data to a server?",
        answer:
          "No. Processing is performed locally in your browser.",
      },
      {
        question: "Can I use this tool for development work?",
        answer:
          "Yes. It is designed for quick formatting, conversion, debugging, and everyday developer workflows.",
      },
      {
        question: "Do I need to install anything?",
        answer:
          "No. The tool runs directly in a modern web browser.",
      },
    ],
  },

  {
    id: "markdown-previewer",
    name: "Markdown Previewer",
    slug: "markdown-previewer",
    description:
      "Preview Markdown as rendered HTML instantly in your browser.",
    longDescription:
      "Preview Markdown as rendered HTML instantly in your browser. Avorqin processes the input locally in your browser so you can work quickly without sending the content to an external conversion service.",
    keywords: ["markdown previewer", "markdown previewer", "online markdown previewer"],
    category: "Developer",
    icon: "FileText",
    howToUse: [
      "Enter or paste your input into the tool.",
      "Run the conversion or formatting action.",
      "Review the result for accuracy.",
      "Copy the result when finished.",
    ],
    faq: [
      {
        question: "Does this tool send my data to a server?",
        answer:
          "No. Processing is performed locally in your browser.",
      },
      {
        question: "Can I use this tool for development work?",
        answer:
          "Yes. It is designed for quick formatting, conversion, debugging, and everyday developer workflows.",
      },
      {
        question: "Do I need to install anything?",
        answer:
          "No. The tool runs directly in a modern web browser.",
      },
    ],
  },

  {
    id: "html-encoder",
    name: "HTML Encoder",
    slug: "html-encoder",
    description:
      "Encode HTML special characters into safe entities directly in your browser.",
    longDescription:
      "Encode HTML special characters into safe entities directly in your browser. Avorqin processes the input locally in your browser so you can work quickly without sending the content to an external conversion service.",
    keywords: ["html encoder", "html encoder", "online html encoder"],
    category: "Developer",
    icon: "Code2",
    howToUse: [
      "Enter or paste your input into the tool.",
      "Run the conversion or formatting action.",
      "Review the result for accuracy.",
      "Copy the result when finished.",
    ],
    faq: [
      {
        question: "Does this tool send my data to a server?",
        answer:
          "No. Processing is performed locally in your browser.",
      },
      {
        question: "Can I use this tool for development work?",
        answer:
          "Yes. It is designed for quick formatting, conversion, debugging, and everyday developer workflows.",
      },
      {
        question: "Do I need to install anything?",
        answer:
          "No. The tool runs directly in a modern web browser.",
      },
    ],
  },

  {
    id: "html-decoder",
    name: "HTML Decoder",
    slug: "html-decoder",
    description:
      "Decode HTML entities back into readable characters directly in your browser.",
    longDescription:
      "Decode HTML entities back into readable characters directly in your browser. Avorqin processes the input locally in your browser so you can work quickly without sending the content to an external conversion service.",
    keywords: ["html decoder", "html decoder", "online html decoder"],
    category: "Developer",
    icon: "Code2",
    howToUse: [
      "Enter or paste your input into the tool.",
      "Run the conversion or formatting action.",
      "Review the result for accuracy.",
      "Copy the result when finished.",
    ],
    faq: [
      {
        question: "Does this tool send my data to a server?",
        answer:
          "No. Processing is performed locally in your browser.",
      },
      {
        question: "Can I use this tool for development work?",
        answer:
          "Yes. It is designed for quick formatting, conversion, debugging, and everyday developer workflows.",
      },
      {
        question: "Do I need to install anything?",
        answer:
          "No. The tool runs directly in a modern web browser.",
      },
    ],
  },

  {
    id: "hex-to-rgb",
    name: "Hex to RGB Converter",
    slug: "hex-to-rgb",
    description:
      "Convert hexadecimal colors to RGB and RGBA values instantly.",
    longDescription:
      "Convert hexadecimal colors to RGB and RGBA values instantly. Avorqin processes the input locally in your browser so you can work quickly without sending the content to an external conversion service.",
    keywords: ["hex to rgb converter", "hex to rgb", "online hex to rgb"],
    category: "Developer",
    icon: "Palette",
    howToUse: [
      "Enter or paste your input into the tool.",
      "Run the conversion or formatting action.",
      "Review the result for accuracy.",
      "Copy the result when finished.",
    ],
    faq: [
      {
        question: "Does this tool send my data to a server?",
        answer:
          "No. Processing is performed locally in your browser.",
      },
      {
        question: "Can I use this tool for development work?",
        answer:
          "Yes. It is designed for quick formatting, conversion, debugging, and everyday developer workflows.",
      },
      {
        question: "Do I need to install anything?",
        answer:
          "No. The tool runs directly in a modern web browser.",
      },
    ],
  },

  {
    id: "rgb-to-hex",
    name: "RGB to Hex Converter",
    slug: "rgb-to-hex",
    description:
      "Convert RGB color values to hexadecimal color codes instantly.",
    longDescription:
      "Convert RGB color values to hexadecimal color codes instantly. Avorqin processes the input locally in your browser so you can work quickly without sending the content to an external conversion service.",
    keywords: ["rgb to hex converter", "rgb to hex", "online rgb to hex"],
    category: "Developer",
    icon: "Palette",
    howToUse: [
      "Enter or paste your input into the tool.",
      "Run the conversion or formatting action.",
      "Review the result for accuracy.",
      "Copy the result when finished.",
    ],
    faq: [
      {
        question: "Does this tool send my data to a server?",
        answer:
          "No. Processing is performed locally in your browser.",
      },
      {
        question: "Can I use this tool for development work?",
        answer:
          "Yes. It is designed for quick formatting, conversion, debugging, and everyday developer workflows.",
      },
      {
        question: "Do I need to install anything?",
        answer:
          "No. The tool runs directly in a modern web browser.",
      },
    ],
  },

  {
    id: "sha256-hash-generator",
    name: "SHA-256 Hash Generator",
    slug: "sha256-hash-generator",
    description:
      "Generate SHA-256 hashes from text directly in your browser.",
    longDescription:
      "Generate SHA-256 hashes from text directly in your browser. Processing happens locally in your browser so the input does not need to be sent to an external conversion service.",
    keywords: ["sha-256 hash generator", "sha256 hash generator", "online sha256 hash generator"],
    category: "Developer",
    icon: "Hash",
    howToUse: [
      "Enter or paste the input into the tool.",
      "Choose any available options for the transformation.",
      "Run the tool and review the result.",
      "Copy the result when finished.",
    ],
    faq: [
      {
        question: "Does this tool send my data to a server?",
        answer:
          "No. Processing is performed locally in your browser.",
      },
      {
        question: "Do I need to install anything?",
        answer:
          "No. The tool runs directly in a modern web browser.",
      },
      {
        question: "Can I use this for development work?",
        answer:
          "Yes. It is designed for quick developer, debugging, formatting, conversion, and testing workflows.",
      },
    ],
  },

  {
    id: "sha1-hash-generator",
    name: "SHA-1 Hash Generator",
    slug: "sha1-hash-generator",
    description:
      "Generate SHA-1 hashes for checksums and legacy compatibility directly in your browser.",
    longDescription:
      "Generate SHA-1 hashes for checksums and legacy compatibility directly in your browser. Processing happens locally in your browser so the input does not need to be sent to an external conversion service. SHA-1 is considered legacy for security-sensitive uses; this page is intended for compatibility and checksum workflows.",
    keywords: ["sha-1 hash generator", "sha1 hash generator", "online sha1 hash generator"],
    category: "Developer",
    icon: "Hash",
    howToUse: [
      "Enter or paste the input into the tool.",
      "Choose any available options for the transformation.",
      "Run the tool and review the result.",
      "Copy the result when finished.",
    ],
    faq: [
      {
        question: "Does this tool send my data to a server?",
        answer:
          "No. Processing is performed locally in your browser.",
      },
      {
        question: "Do I need to install anything?",
        answer:
          "No. The tool runs directly in a modern web browser.",
      },
      {
        question: "Can I use this for development work?",
        answer:
          "Yes. It is designed for quick developer, debugging, formatting, conversion, and testing workflows.",
      },
    ],
  },

  {
    id: "sha512-hash-generator",
    name: "SHA-512 Hash Generator",
    slug: "sha512-hash-generator",
    description:
      "Generate SHA-512 hashes from text directly in your browser.",
    longDescription:
      "Generate SHA-512 hashes from text directly in your browser. Processing happens locally in your browser so the input does not need to be sent to an external conversion service.",
    keywords: ["sha-512 hash generator", "sha512 hash generator", "online sha512 hash generator"],
    category: "Developer",
    icon: "Hash",
    howToUse: [
      "Enter or paste the input into the tool.",
      "Choose any available options for the transformation.",
      "Run the tool and review the result.",
      "Copy the result when finished.",
    ],
    faq: [
      {
        question: "Does this tool send my data to a server?",
        answer:
          "No. Processing is performed locally in your browser.",
      },
      {
        question: "Do I need to install anything?",
        answer:
          "No. The tool runs directly in a modern web browser.",
      },
      {
        question: "Can I use this for development work?",
        answer:
          "Yes. It is designed for quick developer, debugging, formatting, conversion, and testing workflows.",
      },
    ],
  },

  {
    id: "hmac-generator",
    name: "HMAC Generator",
    slug: "hmac-generator",
    description:
      "Generate keyed HMAC signatures with SHA-256 or SHA-512 directly in your browser.",
    longDescription:
      "Generate keyed HMAC signatures with SHA-256 or SHA-512 directly in your browser. Processing happens locally in your browser so the input does not need to be sent to an external conversion service.",
    keywords: ["hmac generator", "hmac generator", "online hmac generator"],
    category: "Developer",
    icon: "KeyRound",
    howToUse: [
      "Enter or paste the input into the tool.",
      "Choose any available options for the transformation.",
      "Run the tool and review the result.",
      "Copy the result when finished.",
    ],
    faq: [
      {
        question: "Does this tool send my data to a server?",
        answer:
          "No. Processing is performed locally in your browser.",
      },
      {
        question: "Do I need to install anything?",
        answer:
          "No. The tool runs directly in a modern web browser.",
      },
      {
        question: "Can I use this for development work?",
        answer:
          "Yes. It is designed for quick developer, debugging, formatting, conversion, and testing workflows.",
      },
    ],
  },

  {
    id: "random-string-generator",
    name: "Random String Generator",
    slug: "random-string-generator",
    description:
      "Generate secure random strings with letters, numbers, and symbols.",
    longDescription:
      "Generate secure random strings with letters, numbers, and symbols. Processing happens locally in your browser so the input does not need to be sent to an external conversion service.",
    keywords: ["random string generator", "random string generator", "online random string generator"],
    category: "Developer",
    icon: "Shuffle",
    howToUse: [
      "Enter or paste the input into the tool.",
      "Choose any available options for the transformation.",
      "Run the tool and review the result.",
      "Copy the result when finished.",
    ],
    faq: [
      {
        question: "Does this tool send my data to a server?",
        answer:
          "No. Processing is performed locally in your browser.",
      },
      {
        question: "Do I need to install anything?",
        answer:
          "No. The tool runs directly in a modern web browser.",
      },
      {
        question: "Can I use this for development work?",
        answer:
          "Yes. It is designed for quick developer, debugging, formatting, conversion, and testing workflows.",
      },
    ],
  },

  {
    id: "password-generator",
    name: "Password Generator",
    slug: "password-generator",
    description:
      "Generate strong random passwords locally in your browser.",
    longDescription:
      "Generate strong random passwords locally in your browser. Processing happens locally in your browser so the input does not need to be sent to an external conversion service.",
    keywords: ["password generator", "password generator", "online password generator"],
    category: "Developer",
    icon: "KeyRound",
    howToUse: [
      "Enter or paste the input into the tool.",
      "Choose any available options for the transformation.",
      "Run the tool and review the result.",
      "Copy the result when finished.",
    ],
    faq: [
      {
        question: "Does this tool send my data to a server?",
        answer:
          "No. Processing is performed locally in your browser.",
      },
      {
        question: "Do I need to install anything?",
        answer:
          "No. The tool runs directly in a modern web browser.",
      },
      {
        question: "Can I use this for development work?",
        answer:
          "Yes. It is designed for quick developer, debugging, formatting, conversion, and testing workflows.",
      },
    ],
  },

  {
    id: "lorem-ipsum-generator",
    name: "Lorem Ipsum Generator",
    slug: "lorem-ipsum-generator",
    description:
      "Generate placeholder words, sentences, or paragraphs instantly.",
    longDescription:
      "Generate placeholder words, sentences, or paragraphs instantly. Processing happens locally in your browser so the input does not need to be sent to an external conversion service.",
    keywords: ["lorem ipsum generator", "lorem ipsum generator", "online lorem ipsum generator"],
    category: "Developer",
    icon: "FileText",
    howToUse: [
      "Enter or paste the input into the tool.",
      "Choose any available options for the transformation.",
      "Run the tool and review the result.",
      "Copy the result when finished.",
    ],
    faq: [
      {
        question: "Does this tool send my data to a server?",
        answer:
          "No. Processing is performed locally in your browser.",
      },
      {
        question: "Do I need to install anything?",
        answer:
          "No. The tool runs directly in a modern web browser.",
      },
      {
        question: "Can I use this for development work?",
        answer:
          "Yes. It is designed for quick developer, debugging, formatting, conversion, and testing workflows.",
      },
    ],
  },

  {
    id: "slug-generator",
    name: "Slug Generator",
    slug: "slug-generator",
    description:
      "Turn titles and text into clean URL-friendly slugs.",
    longDescription:
      "Turn titles and text into clean URL-friendly slugs. Processing happens locally in your browser so the input does not need to be sent to an external conversion service.",
    keywords: ["slug generator", "slug generator", "online slug generator"],
    category: "Developer",
    icon: "Link",
    howToUse: [
      "Enter or paste the input into the tool.",
      "Choose any available options for the transformation.",
      "Run the tool and review the result.",
      "Copy the result when finished.",
    ],
    faq: [
      {
        question: "Does this tool send my data to a server?",
        answer:
          "No. Processing is performed locally in your browser.",
      },
      {
        question: "Do I need to install anything?",
        answer:
          "No. The tool runs directly in a modern web browser.",
      },
      {
        question: "Can I use this for development work?",
        answer:
          "Yes. It is designed for quick developer, debugging, formatting, conversion, and testing workflows.",
      },
    ],
  },

  {
    id: "text-case-converter",
    name: "Text Case Converter",
    slug: "text-case-converter",
    description:
      "Convert text between uppercase, lowercase, title case, camelCase, PascalCase, snake_case, and kebab-case.",
    longDescription:
      "Convert text between uppercase, lowercase, title case, camelCase, PascalCase, snake_case, and kebab-case. Processing happens locally in your browser so the input does not need to be sent to an external conversion service.",
    keywords: ["text case converter", "text case converter", "online text case converter"],
    category: "Developer",
    icon: "CaseSensitive",
    howToUse: [
      "Enter or paste the input into the tool.",
      "Choose any available options for the transformation.",
      "Run the tool and review the result.",
      "Copy the result when finished.",
    ],
    faq: [
      {
        question: "Does this tool send my data to a server?",
        answer:
          "No. Processing is performed locally in your browser.",
      },
      {
        question: "Do I need to install anything?",
        answer:
          "No. The tool runs directly in a modern web browser.",
      },
      {
        question: "Can I use this for development work?",
        answer:
          "Yes. It is designed for quick developer, debugging, formatting, conversion, and testing workflows.",
      },
    ],
  },

  {
    id: "word-character-counter",
    name: "Word & Character Counter",
    slug: "word-character-counter",
    description:
      "Count words, characters, lines, and sentences instantly.",
    longDescription:
      "Count words, characters, lines, and sentences instantly. Processing happens locally in your browser so the input does not need to be sent to an external conversion service.",
    keywords: ["word & character counter", "word character counter", "online word character counter"],
    category: "Developer",
    icon: "TextCursorInput",
    howToUse: [
      "Enter or paste the input into the tool.",
      "Choose any available options for the transformation.",
      "Run the tool and review the result.",
      "Copy the result when finished.",
    ],
    faq: [
      {
        question: "Does this tool send my data to a server?",
        answer:
          "No. Processing is performed locally in your browser.",
      },
      {
        question: "Do I need to install anything?",
        answer:
          "No. The tool runs directly in a modern web browser.",
      },
      {
        question: "Can I use this for development work?",
        answer:
          "Yes. It is designed for quick developer, debugging, formatting, conversion, and testing workflows.",
      },
    ],
  },

  {
    id: "line-sorter",
    name: "Line Sorter",
    slug: "line-sorter",
    description:
      "Sort lines alphabetically or in reverse order directly in your browser.",
    longDescription:
      "Sort lines alphabetically or in reverse order directly in your browser. Processing happens locally in your browser so the input does not need to be sent to an external conversion service.",
    keywords: ["line sorter", "line sorter", "online line sorter"],
    category: "Developer",
    icon: "ArrowDownAZ",
    howToUse: [
      "Enter or paste the input into the tool.",
      "Choose any available options for the transformation.",
      "Run the tool and review the result.",
      "Copy the result when finished.",
    ],
    faq: [
      {
        question: "Does this tool send my data to a server?",
        answer:
          "No. Processing is performed locally in your browser.",
      },
      {
        question: "Do I need to install anything?",
        answer:
          "No. The tool runs directly in a modern web browser.",
      },
      {
        question: "Can I use this for development work?",
        answer:
          "Yes. It is designed for quick developer, debugging, formatting, conversion, and testing workflows.",
      },
    ],
  },

  {
    id: "duplicate-line-remover",
    name: "Duplicate Line Remover",
    slug: "duplicate-line-remover",
    description:
      "Remove duplicate lines while preserving the original order.",
    longDescription:
      "Remove duplicate lines while preserving the original order. Processing happens locally in your browser so the input does not need to be sent to an external conversion service.",
    keywords: ["duplicate line remover", "duplicate line remover", "online duplicate line remover"],
    category: "Developer",
    icon: "ListX",
    howToUse: [
      "Enter or paste the input into the tool.",
      "Choose any available options for the transformation.",
      "Run the tool and review the result.",
      "Copy the result when finished.",
    ],
    faq: [
      {
        question: "Does this tool send my data to a server?",
        answer:
          "No. Processing is performed locally in your browser.",
      },
      {
        question: "Do I need to install anything?",
        answer:
          "No. The tool runs directly in a modern web browser.",
      },
      {
        question: "Can I use this for development work?",
        answer:
          "Yes. It is designed for quick developer, debugging, formatting, conversion, and testing workflows.",
      },
    ],
  },

  {
    id: "whitespace-cleaner",
    name: "Whitespace Cleaner",
    slug: "whitespace-cleaner",
    description:
      "Trim lines, collapse repeated spaces, and remove empty lines.",
    longDescription:
      "Trim lines, collapse repeated spaces, and remove empty lines. Processing happens locally in your browser so the input does not need to be sent to an external conversion service.",
    keywords: ["whitespace cleaner", "whitespace cleaner", "online whitespace cleaner"],
    category: "Developer",
    icon: "Eraser",
    howToUse: [
      "Enter or paste the input into the tool.",
      "Choose any available options for the transformation.",
      "Run the tool and review the result.",
      "Copy the result when finished.",
    ],
    faq: [
      {
        question: "Does this tool send my data to a server?",
        answer:
          "No. Processing is performed locally in your browser.",
      },
      {
        question: "Do I need to install anything?",
        answer:
          "No. The tool runs directly in a modern web browser.",
      },
      {
        question: "Can I use this for development work?",
        answer:
          "Yes. It is designed for quick developer, debugging, formatting, conversion, and testing workflows.",
      },
    ],
  },

  {
    id: "text-reverser",
    name: "Text Reverser",
    slug: "text-reverser",
    description:
      "Reverse text by characters, words, or lines.",
    longDescription:
      "Reverse text by characters, words, or lines. Processing happens locally in your browser so the input does not need to be sent to an external conversion service.",
    keywords: ["text reverser", "text reverser", "online text reverser"],
    category: "Developer",
    icon: "Undo2",
    howToUse: [
      "Enter or paste the input into the tool.",
      "Choose any available options for the transformation.",
      "Run the tool and review the result.",
      "Copy the result when finished.",
    ],
    faq: [
      {
        question: "Does this tool send my data to a server?",
        answer:
          "No. Processing is performed locally in your browser.",
      },
      {
        question: "Do I need to install anything?",
        answer:
          "No. The tool runs directly in a modern web browser.",
      },
      {
        question: "Can I use this for development work?",
        answer:
          "Yes. It is designed for quick developer, debugging, formatting, conversion, and testing workflows.",
      },
    ],
  },

  {
    id: "text-diff-checker",
    name: "Text Diff Checker",
    slug: "text-diff-checker",
    description:
      "Compare two text blocks line by line and identify additions, removals, and changes.",
    longDescription:
      "Compare two text blocks line by line and identify additions, removals, and changes. Processing happens locally in your browser so the input does not need to be sent to an external conversion service.",
    keywords: ["text diff checker", "text diff checker", "online text diff checker"],
    category: "Developer",
    icon: "GitCompare",
    howToUse: [
      "Enter or paste the input into the tool.",
      "Choose any available options for the transformation.",
      "Run the tool and review the result.",
      "Copy the result when finished.",
    ],
    faq: [
      {
        question: "Does this tool send my data to a server?",
        answer:
          "No. Processing is performed locally in your browser.",
      },
      {
        question: "Do I need to install anything?",
        answer:
          "No. The tool runs directly in a modern web browser.",
      },
      {
        question: "Can I use this for development work?",
        answer:
          "Yes. It is designed for quick developer, debugging, formatting, conversion, and testing workflows.",
      },
    ],
  },

  {
    id: "query-string-parser",
    name: "Query String Parser",
    slug: "query-string-parser",
    description:
      "Parse URL query strings into readable key-value data.",
    longDescription:
      "Parse URL query strings into readable key-value data. Processing happens locally in your browser so the input does not need to be sent to an external conversion service.",
    keywords: ["query string parser", "query string parser", "online query string parser"],
    category: "Developer",
    icon: "ListTree",
    howToUse: [
      "Enter or paste the input into the tool.",
      "Choose any available options for the transformation.",
      "Run the tool and review the result.",
      "Copy the result when finished.",
    ],
    faq: [
      {
        question: "Does this tool send my data to a server?",
        answer:
          "No. Processing is performed locally in your browser.",
      },
      {
        question: "Do I need to install anything?",
        answer:
          "No. The tool runs directly in a modern web browser.",
      },
      {
        question: "Can I use this for development work?",
        answer:
          "Yes. It is designed for quick developer, debugging, formatting, conversion, and testing workflows.",
      },
    ],
  },

  {
    id: "query-string-builder",
    name: "Query String Builder",
    slug: "query-string-builder",
    description:
      "Build encoded URL query strings from key-value pairs.",
    longDescription:
      "Build encoded URL query strings from key-value pairs. Processing happens locally in your browser so the input does not need to be sent to an external conversion service.",
    keywords: ["query string builder", "query string builder", "online query string builder"],
    category: "Developer",
    icon: "ListPlus",
    howToUse: [
      "Enter or paste the input into the tool.",
      "Choose any available options for the transformation.",
      "Run the tool and review the result.",
      "Copy the result when finished.",
    ],
    faq: [
      {
        question: "Does this tool send my data to a server?",
        answer:
          "No. Processing is performed locally in your browser.",
      },
      {
        question: "Do I need to install anything?",
        answer:
          "No. The tool runs directly in a modern web browser.",
      },
      {
        question: "Can I use this for development work?",
        answer:
          "Yes. It is designed for quick developer, debugging, formatting, conversion, and testing workflows.",
      },
    ],
  },

  {
    id: "url-parser",
    name: "URL Parser",
    slug: "url-parser",
    description:
      "Break a URL into protocol, host, path, query, hash, and other components.",
    longDescription:
      "Break a URL into protocol, host, path, query, hash, and other components. Processing happens locally in your browser so the input does not need to be sent to an external conversion service.",
    keywords: ["url parser", "url parser", "online url parser"],
    category: "Developer",
    icon: "ScanSearch",
    howToUse: [
      "Enter or paste the input into the tool.",
      "Choose any available options for the transformation.",
      "Run the tool and review the result.",
      "Copy the result when finished.",
    ],
    faq: [
      {
        question: "Does this tool send my data to a server?",
        answer:
          "No. Processing is performed locally in your browser.",
      },
      {
        question: "Do I need to install anything?",
        answer:
          "No. The tool runs directly in a modern web browser.",
      },
      {
        question: "Can I use this for development work?",
        answer:
          "Yes. It is designed for quick developer, debugging, formatting, conversion, and testing workflows.",
      },
    ],
  },

  {
    id: "regex-tester",
    name: "Regex Tester",
    slug: "regex-tester",
    description:
      "Test JavaScript regular expressions against text and inspect matches.",
    longDescription:
      "Test JavaScript regular expressions against text and inspect matches. Processing happens locally in your browser so the input does not need to be sent to an external conversion service.",
    keywords: ["regex tester", "regex tester", "online regex tester"],
    category: "Developer",
    icon: "Regex",
    howToUse: [
      "Enter or paste the input into the tool.",
      "Choose any available options for the transformation.",
      "Run the tool and review the result.",
      "Copy the result when finished.",
    ],
    faq: [
      {
        question: "Does this tool send my data to a server?",
        answer:
          "No. Processing is performed locally in your browser.",
      },
      {
        question: "Do I need to install anything?",
        answer:
          "No. The tool runs directly in a modern web browser.",
      },
      {
        question: "Can I use this for development work?",
        answer:
          "Yes. It is designed for quick developer, debugging, formatting, conversion, and testing workflows.",
      },
    ],
  },

  {
    id: "cron-expression-helper",
    name: "Cron Expression Helper",
    slug: "cron-expression-helper",
    description:
      "Inspect common five-field cron expressions and understand each schedule field.",
    longDescription:
      "Inspect common five-field cron expressions and understand each schedule field. Processing happens locally in your browser so the input does not need to be sent to an external conversion service.",
    keywords: ["cron expression helper", "cron expression helper", "online cron expression helper"],
    category: "Developer",
    icon: "CalendarClock",
    howToUse: [
      "Enter or paste the input into the tool.",
      "Choose any available options for the transformation.",
      "Run the tool and review the result.",
      "Copy the result when finished.",
    ],
    faq: [
      {
        question: "Does this tool send my data to a server?",
        answer:
          "No. Processing is performed locally in your browser.",
      },
      {
        question: "Do I need to install anything?",
        answer:
          "No. The tool runs directly in a modern web browser.",
      },
      {
        question: "Can I use this for development work?",
        answer:
          "Yes. It is designed for quick developer, debugging, formatting, conversion, and testing workflows.",
      },
    ],
  },

  {
    id: "number-base-converter",
    name: "Number Base Converter",
    slug: "number-base-converter",
    description:
      "Convert integers between binary, octal, decimal, and hexadecimal.",
    longDescription:
      "Convert integers between binary, octal, decimal, and hexadecimal. Processing happens locally in your browser so the input does not need to be sent to an external conversion service.",
    keywords: ["number base converter", "number base converter", "online number base converter"],
    category: "Developer",
    icon: "Binary",
    howToUse: [
      "Enter or paste the input into the tool.",
      "Choose any available options for the transformation.",
      "Run the tool and review the result.",
      "Copy the result when finished.",
    ],
    faq: [
      {
        question: "Does this tool send my data to a server?",
        answer:
          "No. Processing is performed locally in your browser.",
      },
      {
        question: "Do I need to install anything?",
        answer:
          "No. The tool runs directly in a modern web browser.",
      },
      {
        question: "Can I use this for development work?",
        answer:
          "Yes. It is designed for quick developer, debugging, formatting, conversion, and testing workflows.",
      },
    ],
  },

  {
    id: "binary-to-text",
    name: "Binary to Text Converter",
    slug: "binary-to-text",
    description:
      "Convert 8-bit binary byte sequences into readable UTF-8 text.",
    longDescription:
      "Convert 8-bit binary byte sequences into readable UTF-8 text. Processing happens locally in your browser so the input does not need to be sent to an external conversion service.",
    keywords: ["binary to text converter", "binary to text", "online binary to text"],
    category: "Developer",
    icon: "Binary",
    howToUse: [
      "Enter or paste the input into the tool.",
      "Choose any available options for the transformation.",
      "Run the tool and review the result.",
      "Copy the result when finished.",
    ],
    faq: [
      {
        question: "Does this tool send my data to a server?",
        answer:
          "No. Processing is performed locally in your browser.",
      },
      {
        question: "Do I need to install anything?",
        answer:
          "No. The tool runs directly in a modern web browser.",
      },
      {
        question: "Can I use this for development work?",
        answer:
          "Yes. It is designed for quick developer, debugging, formatting, conversion, and testing workflows.",
      },
    ],
  },

  {
    id: "text-to-binary",
    name: "Text to Binary Converter",
    slug: "text-to-binary",
    description:
      "Convert text into 8-bit binary byte sequences.",
    longDescription:
      "Convert text into 8-bit binary byte sequences. Processing happens locally in your browser so the input does not need to be sent to an external conversion service.",
    keywords: ["text to binary converter", "text to binary", "online text to binary"],
    category: "Developer",
    icon: "Binary",
    howToUse: [
      "Enter or paste the input into the tool.",
      "Choose any available options for the transformation.",
      "Run the tool and review the result.",
      "Copy the result when finished.",
    ],
    faq: [
      {
        question: "Does this tool send my data to a server?",
        answer:
          "No. Processing is performed locally in your browser.",
      },
      {
        question: "Do I need to install anything?",
        answer:
          "No. The tool runs directly in a modern web browser.",
      },
      {
        question: "Can I use this for development work?",
        answer:
          "Yes. It is designed for quick developer, debugging, formatting, conversion, and testing workflows.",
      },
    ],
  },

  {
    id: "hex-to-text",
    name: "Hex to Text Converter",
    slug: "hex-to-text",
    description:
      "Convert hexadecimal byte strings into readable UTF-8 text.",
    longDescription:
      "Convert hexadecimal byte strings into readable UTF-8 text. Processing happens locally in your browser so the input does not need to be sent to an external conversion service.",
    keywords: ["hex to text converter", "hex to text", "online hex to text"],
    category: "Developer",
    icon: "Braces",
    howToUse: [
      "Enter or paste the input into the tool.",
      "Choose any available options for the transformation.",
      "Run the tool and review the result.",
      "Copy the result when finished.",
    ],
    faq: [
      {
        question: "Does this tool send my data to a server?",
        answer:
          "No. Processing is performed locally in your browser.",
      },
      {
        question: "Do I need to install anything?",
        answer:
          "No. The tool runs directly in a modern web browser.",
      },
      {
        question: "Can I use this for development work?",
        answer:
          "Yes. It is designed for quick developer, debugging, formatting, conversion, and testing workflows.",
      },
    ],
  },

  {
    id: "text-to-hex",
    name: "Text to Hex Converter",
    slug: "text-to-hex",
    description:
      "Convert text into hexadecimal UTF-8 bytes.",
    longDescription:
      "Convert text into hexadecimal UTF-8 bytes. Processing happens locally in your browser so the input does not need to be sent to an external conversion service.",
    keywords: ["text to hex converter", "text to hex", "online text to hex"],
    category: "Developer",
    icon: "Braces",
    howToUse: [
      "Enter or paste the input into the tool.",
      "Choose any available options for the transformation.",
      "Run the tool and review the result.",
      "Copy the result when finished.",
    ],
    faq: [
      {
        question: "Does this tool send my data to a server?",
        answer:
          "No. Processing is performed locally in your browser.",
      },
      {
        question: "Do I need to install anything?",
        answer:
          "No. The tool runs directly in a modern web browser.",
      },
      {
        question: "Can I use this for development work?",
        answer:
          "Yes. It is designed for quick developer, debugging, formatting, conversion, and testing workflows.",
      },
    ],
  },

  {
    id: "qr-code-generator",
    name: "QR Code Generator",
    slug: "qr-code-generator",
    description: "Generate QR codes from text or URLs directly in your browser.",
    longDescription: "Generate QR codes from text or URLs directly in your browser. This tool is designed for fast browser-based use within Avorqin.",
    keywords: ["qr code generator", "qr code generator", "online qr code generator"],
    category: "Developer",
    icon: "QrCode",
    howToUse: ["Enter the required values or text.","Choose any available options.","Run the tool and review the result.","Copy the result when needed."],
    faq: [
      { question: "Do I need an account?", answer: "No. Avorqin tools work without an account." },
      { question: "Does this run in my browser?", answer: "Yes. The calculation or transformation runs in your browser unless the tool clearly states otherwise." },
      { question: "Can I use this for everyday development work?", answer: "Yes. It is designed for quick calculations, conversions, inspection, and developer workflows." }
    ],
  },

  {
    id: "json-minifier",
    name: "JSON Minifier",
    slug: "json-minifier",
    description: "Minify JSON by removing unnecessary whitespace while validating syntax.",
    longDescription: "Minify JSON by removing unnecessary whitespace while validating syntax. This tool is designed for fast browser-based use within Avorqin.",
    keywords: ["json minifier", "json minifier", "online json minifier"],
    category: "Developer",
    icon: "Braces",
    howToUse: ["Enter the required values or text.","Choose any available options.","Run the tool and review the result.","Copy the result when needed."],
    faq: [
      { question: "Do I need an account?", answer: "No. Avorqin tools work without an account." },
      { question: "Does this run in my browser?", answer: "Yes. The calculation or transformation runs in your browser unless the tool clearly states otherwise." },
      { question: "Can I use this for everyday development work?", answer: "Yes. It is designed for quick calculations, conversions, inspection, and developer workflows." }
    ],
  },

  {
    id: "css-minifier",
    name: "CSS Minifier",
    slug: "css-minifier",
    description: "Minify CSS by removing comments and unnecessary whitespace.",
    longDescription: "Minify CSS by removing comments and unnecessary whitespace. This tool is designed for fast browser-based use within Avorqin.",
    keywords: ["css minifier", "css minifier", "online css minifier"],
    category: "Developer",
    icon: "Palette",
    howToUse: ["Enter the required values or text.","Choose any available options.","Run the tool and review the result.","Copy the result when needed."],
    faq: [
      { question: "Do I need an account?", answer: "No. Avorqin tools work without an account." },
      { question: "Does this run in my browser?", answer: "Yes. The calculation or transformation runs in your browser unless the tool clearly states otherwise." },
      { question: "Can I use this for everyday development work?", answer: "Yes. It is designed for quick calculations, conversions, inspection, and developer workflows." }
    ],
  },

  {
    id: "html-minifier",
    name: "HTML Minifier",
    slug: "html-minifier",
    description: "Minify HTML markup by removing comments and unnecessary whitespace.",
    longDescription: "Minify HTML markup by removing comments and unnecessary whitespace. This tool is designed for fast browser-based use within Avorqin.",
    keywords: ["html minifier", "html minifier", "online html minifier"],
    category: "Developer",
    icon: "Code2",
    howToUse: ["Enter the required values or text.","Choose any available options.","Run the tool and review the result.","Copy the result when needed."],
    faq: [
      { question: "Do I need an account?", answer: "No. Avorqin tools work without an account." },
      { question: "Does this run in my browser?", answer: "Yes. The calculation or transformation runs in your browser unless the tool clearly states otherwise." },
      { question: "Can I use this for everyday development work?", answer: "Yes. It is designed for quick calculations, conversions, inspection, and developer workflows." }
    ],
  },

  {
    id: "javascript-minifier",
    name: "JavaScript Minifier",
    slug: "javascript-minifier",
    description: "Compact JavaScript with conservative whitespace and comment cleanup.",
    longDescription: "Compact JavaScript with conservative whitespace and comment cleanup. This tool is designed for fast browser-based use within Avorqin.",
    keywords: ["javascript minifier", "javascript minifier", "online javascript minifier"],
    category: "Developer",
    icon: "FileCode2",
    howToUse: ["Enter the required values or text.","Choose any available options.","Run the tool and review the result.","Copy the result when needed."],
    faq: [
      { question: "Do I need an account?", answer: "No. Avorqin tools work without an account." },
      { question: "Does this run in my browser?", answer: "Yes. The calculation or transformation runs in your browser unless the tool clearly states otherwise." },
      { question: "Can I use this for everyday development work?", answer: "Yes. It is designed for quick calculations, conversions, inspection, and developer workflows." }
    ],
  },

  {
    id: "unix-timestamp-generator",
    name: "Unix Timestamp Generator",
    slug: "unix-timestamp-generator",
    description: "Generate the current Unix timestamp in seconds and milliseconds.",
    longDescription: "Generate the current Unix timestamp in seconds and milliseconds. This tool is designed for fast browser-based use within Avorqin.",
    keywords: ["unix timestamp generator", "unix timestamp generator", "online unix timestamp generator"],
    category: "Developer",
    icon: "Clock3",
    howToUse: ["Enter the required values or text.","Choose any available options.","Run the tool and review the result.","Copy the result when needed."],
    faq: [
      { question: "Do I need an account?", answer: "No. Avorqin tools work without an account." },
      { question: "Does this run in my browser?", answer: "Yes. The calculation or transformation runs in your browser unless the tool clearly states otherwise." },
      { question: "Can I use this for everyday development work?", answer: "Yes. It is designed for quick calculations, conversions, inspection, and developer workflows." }
    ],
  },

  {
    id: "unix-timestamp-to-date",
    name: "Unix Timestamp to Date",
    slug: "unix-timestamp-to-date",
    description: "Convert Unix timestamps into readable dates.",
    longDescription: "Convert Unix timestamps into readable dates. This tool is designed for fast browser-based use within Avorqin.",
    keywords: ["unix timestamp to date", "unix timestamp to date", "online unix timestamp to date"],
    category: "Developer",
    icon: "CalendarDays",
    howToUse: ["Enter the required values or text.","Choose any available options.","Run the tool and review the result.","Copy the result when needed."],
    faq: [
      { question: "Do I need an account?", answer: "No. Avorqin tools work without an account." },
      { question: "Does this run in my browser?", answer: "Yes. The calculation or transformation runs in your browser unless the tool clearly states otherwise." },
      { question: "Can I use this for everyday development work?", answer: "Yes. It is designed for quick calculations, conversions, inspection, and developer workflows." }
    ],
  },

  {
    id: "date-difference-calculator",
    name: "Date Difference Calculator",
    slug: "date-difference-calculator",
    description: "Calculate the difference between two dates.",
    longDescription: "Calculate the difference between two dates. This tool is designed for fast browser-based use within Avorqin.",
    keywords: ["date difference calculator", "date difference calculator", "online date difference calculator"],
    category: "Developer",
    icon: "CalendarRange",
    howToUse: ["Enter the required values or text.","Choose any available options.","Run the tool and review the result.","Copy the result when needed."],
    faq: [
      { question: "Do I need an account?", answer: "No. Avorqin tools work without an account." },
      { question: "Does this run in my browser?", answer: "Yes. The calculation or transformation runs in your browser unless the tool clearly states otherwise." },
      { question: "Can I use this for everyday development work?", answer: "Yes. It is designed for quick calculations, conversions, inspection, and developer workflows." }
    ],
  },

  {
    id: "age-calculator",
    name: "Age Calculator",
    slug: "age-calculator",
    description: "Calculate age from a birth date to another date.",
    longDescription: "Calculate age from a birth date to another date. This tool is designed for fast browser-based use within Avorqin.",
    keywords: ["age calculator", "age calculator", "online age calculator"],
    category: "Developer",
    icon: "Cake",
    howToUse: ["Enter the required values or text.","Choose any available options.","Run the tool and review the result.","Copy the result when needed."],
    faq: [
      { question: "Do I need an account?", answer: "No. Avorqin tools work without an account." },
      { question: "Does this run in my browser?", answer: "Yes. The calculation or transformation runs in your browser unless the tool clearly states otherwise." },
      { question: "Can I use this for everyday development work?", answer: "Yes. It is designed for quick calculations, conversions, inspection, and developer workflows." }
    ],
  },

  {
    id: "percentage-calculator",
    name: "Percentage Calculator",
    slug: "percentage-calculator",
    description: "Calculate percentages quickly.",
    longDescription: "Calculate percentages quickly. This tool is designed for fast browser-based use within Avorqin.",
    keywords: ["percentage calculator", "percentage calculator", "online percentage calculator"],
    category: "Developer",
    icon: "Percent",
    howToUse: ["Enter the required values or text.","Choose any available options.","Run the tool and review the result.","Copy the result when needed."],
    faq: [
      { question: "Do I need an account?", answer: "No. Avorqin tools work without an account." },
      { question: "Does this run in my browser?", answer: "Yes. The calculation or transformation runs in your browser unless the tool clearly states otherwise." },
      { question: "Can I use this for everyday development work?", answer: "Yes. It is designed for quick calculations, conversions, inspection, and developer workflows." }
    ],
  },

  {
    id: "percentage-change-calculator",
    name: "Percentage Change Calculator",
    slug: "percentage-change-calculator",
    description: "Calculate percentage increase or decrease.",
    longDescription: "Calculate percentage increase or decrease. This tool is designed for fast browser-based use within Avorqin.",
    keywords: ["percentage change calculator", "percentage change calculator", "online percentage change calculator"],
    category: "Developer",
    icon: "TrendingUp",
    howToUse: ["Enter the required values or text.","Choose any available options.","Run the tool and review the result.","Copy the result when needed."],
    faq: [
      { question: "Do I need an account?", answer: "No. Avorqin tools work without an account." },
      { question: "Does this run in my browser?", answer: "Yes. The calculation or transformation runs in your browser unless the tool clearly states otherwise." },
      { question: "Can I use this for everyday development work?", answer: "Yes. It is designed for quick calculations, conversions, inspection, and developer workflows." }
    ],
  },

  {
    id: "aspect-ratio-calculator",
    name: "Aspect Ratio Calculator",
    slug: "aspect-ratio-calculator",
    description: "Calculate aspect ratios and proportional dimensions.",
    longDescription: "Calculate aspect ratios and proportional dimensions. This tool is designed for fast browser-based use within Avorqin.",
    keywords: ["aspect ratio calculator", "aspect ratio calculator", "online aspect ratio calculator"],
    category: "Developer",
    icon: "Ratio",
    howToUse: ["Enter the required values or text.","Choose any available options.","Run the tool and review the result.","Copy the result when needed."],
    faq: [
      { question: "Do I need an account?", answer: "No. Avorqin tools work without an account." },
      { question: "Does this run in my browser?", answer: "Yes. The calculation or transformation runs in your browser unless the tool clearly states otherwise." },
      { question: "Can I use this for everyday development work?", answer: "Yes. It is designed for quick calculations, conversions, inspection, and developer workflows." }
    ],
  },

  {
    id: "screen-resolution-calculator",
    name: "Screen Resolution Calculator",
    slug: "screen-resolution-calculator",
    description: "Calculate total pixels and megapixels from width and height.",
    longDescription: "Calculate total pixels and megapixels from width and height. This tool is designed for fast browser-based use within Avorqin.",
    keywords: ["screen resolution calculator", "screen resolution calculator", "online screen resolution calculator"],
    category: "Developer",
    icon: "Monitor",
    howToUse: ["Enter the required values or text.","Choose any available options.","Run the tool and review the result.","Copy the result when needed."],
    faq: [
      { question: "Do I need an account?", answer: "No. Avorqin tools work without an account." },
      { question: "Does this run in my browser?", answer: "Yes. The calculation or transformation runs in your browser unless the tool clearly states otherwise." },
      { question: "Can I use this for everyday development work?", answer: "Yes. It is designed for quick calculations, conversions, inspection, and developer workflows." }
    ],
  },

  {
    id: "rem-to-px-converter",
    name: "REM to PX Converter",
    slug: "rem-to-px-converter",
    description: "Convert rem units to pixels.",
    longDescription: "Convert rem units to pixels. This tool is designed for fast browser-based use within Avorqin.",
    keywords: ["rem to px converter", "rem to px converter", "online rem to px converter"],
    category: "Developer",
    icon: "Ruler",
    howToUse: ["Enter the required values or text.","Choose any available options.","Run the tool and review the result.","Copy the result when needed."],
    faq: [
      { question: "Do I need an account?", answer: "No. Avorqin tools work without an account." },
      { question: "Does this run in my browser?", answer: "Yes. The calculation or transformation runs in your browser unless the tool clearly states otherwise." },
      { question: "Can I use this for everyday development work?", answer: "Yes. It is designed for quick calculations, conversions, inspection, and developer workflows." }
    ],
  },

  {
    id: "px-to-rem-converter",
    name: "PX to REM Converter",
    slug: "px-to-rem-converter",
    description: "Convert pixels to rem units.",
    longDescription: "Convert pixels to rem units. This tool is designed for fast browser-based use within Avorqin.",
    keywords: ["px to rem converter", "px to rem converter", "online px to rem converter"],
    category: "Developer",
    icon: "Ruler",
    howToUse: ["Enter the required values or text.","Choose any available options.","Run the tool and review the result.","Copy the result when needed."],
    faq: [
      { question: "Do I need an account?", answer: "No. Avorqin tools work without an account." },
      { question: "Does this run in my browser?", answer: "Yes. The calculation or transformation runs in your browser unless the tool clearly states otherwise." },
      { question: "Can I use this for everyday development work?", answer: "Yes. It is designed for quick calculations, conversions, inspection, and developer workflows." }
    ],
  },

  {
    id: "em-to-px-converter",
    name: "EM to PX Converter",
    slug: "em-to-px-converter",
    description: "Convert em units to pixels.",
    longDescription: "Convert em units to pixels. This tool is designed for fast browser-based use within Avorqin.",
    keywords: ["em to px converter", "em to px converter", "online em to px converter"],
    category: "Developer",
    icon: "Ruler",
    howToUse: ["Enter the required values or text.","Choose any available options.","Run the tool and review the result.","Copy the result when needed."],
    faq: [
      { question: "Do I need an account?", answer: "No. Avorqin tools work without an account." },
      { question: "Does this run in my browser?", answer: "Yes. The calculation or transformation runs in your browser unless the tool clearly states otherwise." },
      { question: "Can I use this for everyday development work?", answer: "Yes. It is designed for quick calculations, conversions, inspection, and developer workflows." }
    ],
  },

  {
    id: "bytes-converter",
    name: "Bytes Converter",
    slug: "bytes-converter",
    description: "Convert between byte units.",
    longDescription: "Convert between byte units. This tool is designed for fast browser-based use within Avorqin.",
    keywords: ["bytes converter", "bytes converter", "online bytes converter"],
    category: "Developer",
    icon: "Database",
    howToUse: ["Enter the required values or text.","Choose any available options.","Run the tool and review the result.","Copy the result when needed."],
    faq: [
      { question: "Do I need an account?", answer: "No. Avorqin tools work without an account." },
      { question: "Does this run in my browser?", answer: "Yes. The calculation or transformation runs in your browser unless the tool clearly states otherwise." },
      { question: "Can I use this for everyday development work?", answer: "Yes. It is designed for quick calculations, conversions, inspection, and developer workflows." }
    ],
  },

  {
    id: "data-transfer-time-calculator",
    name: "Data Transfer Time Calculator",
    slug: "data-transfer-time-calculator",
    description: "Estimate transfer time from file size and network speed.",
    longDescription: "Estimate transfer time from file size and network speed. This tool is designed for fast browser-based use within Avorqin.",
    keywords: ["data transfer time calculator", "data transfer time calculator", "online data transfer time calculator"],
    category: "Developer",
    icon: "Gauge",
    howToUse: ["Enter the required values or text.","Choose any available options.","Run the tool and review the result.","Copy the result when needed."],
    faq: [
      { question: "Do I need an account?", answer: "No. Avorqin tools work without an account." },
      { question: "Does this run in my browser?", answer: "Yes. The calculation or transformation runs in your browser unless the tool clearly states otherwise." },
      { question: "Can I use this for everyday development work?", answer: "Yes. It is designed for quick calculations, conversions, inspection, and developer workflows." }
    ],
  },

  {
    id: "url-slug-decoder",
    name: "URL Slug Decoder",
    slug: "url-slug-decoder",
    description: "Convert URL slugs into readable text.",
    longDescription: "Convert URL slugs into readable text. This tool is designed for fast browser-based use within Avorqin.",
    keywords: ["url slug decoder", "url slug decoder", "online url slug decoder"],
    category: "Developer",
    icon: "Link2",
    howToUse: ["Enter the required values or text.","Choose any available options.","Run the tool and review the result.","Copy the result when needed."],
    faq: [
      { question: "Do I need an account?", answer: "No. Avorqin tools work without an account." },
      { question: "Does this run in my browser?", answer: "Yes. The calculation or transformation runs in your browser unless the tool clearly states otherwise." },
      { question: "Can I use this for everyday development work?", answer: "Yes. It is designed for quick calculations, conversions, inspection, and developer workflows." }
    ],
  },

  {
    id: "http-status-code-lookup",
    name: "HTTP Status Code Lookup",
    slug: "http-status-code-lookup",
    description: "Look up common HTTP status codes.",
    longDescription: "Look up common HTTP status codes. This tool is designed for fast browser-based use within Avorqin.",
    keywords: ["http status code lookup", "http status code lookup", "online http status code lookup"],
    category: "Developer",
    icon: "ServerCog",
    howToUse: ["Enter the required values or text.","Choose any available options.","Run the tool and review the result.","Copy the result when needed."],
    faq: [
      { question: "Do I need an account?", answer: "No. Avorqin tools work without an account." },
      { question: "Does this run in my browser?", answer: "Yes. The calculation or transformation runs in your browser unless the tool clearly states otherwise." },
      { question: "Can I use this for everyday development work?", answer: "Yes. It is designed for quick calculations, conversions, inspection, and developer workflows." }
    ],
  },

  {
    id: "mime-type-lookup",
    name: "MIME Type Lookup",
    slug: "mime-type-lookup",
    description: "Look up common MIME types.",
    longDescription: "Look up common MIME types. This tool is designed for fast browser-based use within Avorqin.",
    keywords: ["mime type lookup", "mime type lookup", "online mime type lookup"],
    category: "Developer",
    icon: "FileSearch",
    howToUse: ["Enter the required values or text.","Choose any available options.","Run the tool and review the result.","Copy the result when needed."],
    faq: [
      { question: "Do I need an account?", answer: "No. Avorqin tools work without an account." },
      { question: "Does this run in my browser?", answer: "Yes. The calculation or transformation runs in your browser unless the tool clearly states otherwise." },
      { question: "Can I use this for everyday development work?", answer: "Yes. It is designed for quick calculations, conversions, inspection, and developer workflows." }
    ],
  },

  {
    id: "user-agent-parser",
    name: "User Agent Parser",
    slug: "user-agent-parser",
    description: "Inspect browser, OS, and device clues in user agent strings.",
    longDescription: "Inspect browser, OS, and device clues in user agent strings. This tool is designed for fast browser-based use within Avorqin.",
    keywords: ["user agent parser", "user agent parser", "online user agent parser"],
    category: "Developer",
    icon: "ScanSearch",
    howToUse: ["Enter the required values or text.","Choose any available options.","Run the tool and review the result.","Copy the result when needed."],
    faq: [
      { question: "Do I need an account?", answer: "No. Avorqin tools work without an account." },
      { question: "Does this run in my browser?", answer: "Yes. The calculation or transformation runs in your browser unless the tool clearly states otherwise." },
      { question: "Can I use this for everyday development work?", answer: "Yes. It is designed for quick calculations, conversions, inspection, and developer workflows." }
    ],
  },

  {
    id: "ip-subnet-calculator",
    name: "IP Subnet Calculator",
    slug: "ip-subnet-calculator",
    description: "Calculate IPv4 subnet details from CIDR notation.",
    longDescription: "Calculate IPv4 subnet details from CIDR notation. This tool is designed for fast browser-based use within Avorqin.",
    keywords: ["ip subnet calculator", "ip subnet calculator", "online ip subnet calculator"],
    category: "Developer",
    icon: "Network",
    howToUse: ["Enter the required values or text.","Choose any available options.","Run the tool and review the result.","Copy the result when needed."],
    faq: [
      { question: "Do I need an account?", answer: "No. Avorqin tools work without an account." },
      { question: "Does this run in my browser?", answer: "Yes. The calculation or transformation runs in your browser unless the tool clearly states otherwise." },
      { question: "Can I use this for everyday development work?", answer: "Yes. It is designed for quick calculations, conversions, inspection, and developer workflows." }
    ],
  },

  {
    id: "mac-address-generator",
    name: "MAC Address Generator",
    slug: "mac-address-generator",
    description: "Generate random locally administered MAC addresses.",
    longDescription: "Generate random locally administered MAC addresses. This tool is designed for fast browser-based use within Avorqin.",
    keywords: ["mac address generator", "mac address generator", "online mac address generator"],
    category: "Developer",
    icon: "Network",
    howToUse: ["Enter the required values or text.","Choose any available options.","Run the tool and review the result.","Copy the result when needed."],
    faq: [
      { question: "Do I need an account?", answer: "No. Avorqin tools work without an account." },
      { question: "Does this run in my browser?", answer: "Yes. The calculation or transformation runs in your browser unless the tool clearly states otherwise." },
      { question: "Can I use this for everyday development work?", answer: "Yes. It is designed for quick calculations, conversions, inspection, and developer workflows." }
    ],
  },

  {
    id: "uuid-validator",
    name: "UUID Validator",
    slug: "uuid-validator",
    description: "Validate UUID/GUID strings and identify versions.",
    longDescription: "Validate UUID/GUID strings and identify versions. This tool is designed for fast browser-based use within Avorqin.",
    keywords: ["uuid validator", "uuid validator", "online uuid validator"],
    category: "Developer",
    icon: "BadgeCheck",
    howToUse: ["Enter the required values or text.","Choose any available options.","Run the tool and review the result.","Copy the result when needed."],
    faq: [
      { question: "Do I need an account?", answer: "No. Avorqin tools work without an account." },
      { question: "Does this run in my browser?", answer: "Yes. The calculation or transformation runs in your browser unless the tool clearly states otherwise." },
      { question: "Can I use this for everyday development work?", answer: "Yes. It is designed for quick calculations, conversions, inspection, and developer workflows." }
    ],
  },

];

export const tools: ToolConfig[] = [
  ...existingTools,
  ...batch6Tools,
  ...pdfTools,
  ...imageTools,
  ...seoTools,
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