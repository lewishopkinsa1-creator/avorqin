export type JsonToTypeScriptResult = {
  code: string;
  rootType: string;
  typeCount: number;
};

export type JsonPathMatch = {
  path: string;
  value: unknown;
};

export type JsonPathResult = {
  matches: JsonPathMatch[];
  count: number;
};

export type JsonDiffType =
  | "added"
  | "removed"
  | "changed"
  | "type-changed";

export type JsonDiffEntry = {
  path: string;
  type: JsonDiffType;
  left?: unknown;
  right?: unknown;
};

export type JsonDiffResult = {
  differences: JsonDiffEntry[];
  count: number;
  identical: boolean;
};

type JsonPathToken =
  | { type: "property"; key: string }
  | { type: "index"; index: number }
  | { type: "wildcard" }
  | { type: "recursive"; key: string | "*" };

function parseJson(input: string, label = "JSON"): unknown {
  if (!input.trim()) {
    throw new Error(`Enter ${label}.`);
  }

  try {
    return JSON.parse(input);
  } catch (error) {
    const detail =
      error instanceof Error && error.message
        ? ` ${error.message}`
        : "";

    throw new Error(`Invalid ${label}.${detail}`);
  }
}

function isPlainObject(
  value: unknown
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function toPascalCase(value: string): string {
  const words = value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[^A-Za-z0-9_$]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  let output = words
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join("");

  if (!output) {
    output = "Value";
  }

  if (/^\d/.test(output)) {
    output = `Type${output}`;
  }

  return output;
}

function isValidIdentifier(value: string): boolean {
  return /^[$A-Z_a-z][$\w]*$/.test(value);
}

function propertyName(value: string): string {
  return isValidIdentifier(value)
    ? value
    : JSON.stringify(value);
}

function mergeTypes(types: string[]): string {
  const unique = [...new Set(types)];

  if (unique.length === 0) {
    return "unknown";
  }

  if (unique.length === 1) {
    return unique[0];
  }

  return unique.sort().join(" | ");
}

export function jsonToTypeScript(
  input: string,
  rootName = "Root"
): JsonToTypeScriptResult {
  const data = parseJson(input);
  const safeRootName = toPascalCase(rootName || "Root");

  const declarations: string[] = [];
  const usedNames = new Map<string, number>();

  function uniqueName(base: string): string {
    const safe = toPascalCase(base);
    const count = usedNames.get(safe) ?? 0;
    usedNames.set(safe, count + 1);

    return count === 0 ? safe : `${safe}${count + 1}`;
  }

  function infer(
    value: unknown,
    suggestedName: string
  ): string {
    if (value === null) {
      return "null";
    }

    if (typeof value === "string") {
      return "string";
    }

    if (typeof value === "number") {
      return "number";
    }

    if (typeof value === "boolean") {
      return "boolean";
    }

    if (Array.isArray(value)) {
      if (value.length === 0) {
        return "unknown[]";
      }

      const itemTypes = value.map((item) =>
        infer(item, `${suggestedName}Item`)
      );

      const itemType = mergeTypes(itemTypes);

      return itemType.includes(" | ")
        ? `(${itemType})[]`
        : `${itemType}[]`;
    }

    if (isPlainObject(value)) {
      const interfaceName = uniqueName(suggestedName);
      const lines: string[] = [];

      for (const [key, child] of Object.entries(value)) {
        const childType = infer(
          child,
          `${interfaceName}${toPascalCase(key)}`
        );

        lines.push(
          `  ${propertyName(key)}: ${childType};`
        );
      }

      declarations.push(
        `export interface ${interfaceName} {\n${lines.join(
          "\n"
        )}\n}`
      );

      return interfaceName;
    }

    return "unknown";
  }

  const rootType = infer(data, safeRootName);

  let code: string;

  if (isPlainObject(data)) {
    /*
     * The first object inferred is pushed after its nested
     * declarations, so reverse the list to put the root first.
     */
    code = [...declarations].reverse().join("\n\n");
  } else {
    code = [
      ...declarations.reverse(),
      `export type ${safeRootName} = ${rootType};`,
    ]
      .filter(Boolean)
      .join("\n\n");
  }

  return {
    code,
    rootType,
    typeCount:
      declarations.length +
      (isPlainObject(data) ? 0 : 1),
  };
}

/* ---------------- JSONPath ---------------- */

function readBracket(
  path: string,
  startIndex: number
): { content: string; endIndex: number } {
  let quote: "'" | '"' | null = null;
  let escaped = false;

  for (
    let index = startIndex + 1;
    index < path.length;
    index += 1
  ) {
    const character = path[index];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (character === "\\") {
      escaped = true;
      continue;
    }

    if (quote) {
      if (character === quote) {
        quote = null;
      }
      continue;
    }

    if (character === "'" || character === '"') {
      quote = character;
      continue;
    }

    if (character === "]") {
      return {
        content: path.slice(startIndex + 1, index).trim(),
        endIndex: index,
      };
    }
  }

  throw new Error("JSONPath contains an unclosed bracket.");
}

function unquoteBracketProperty(content: string): string {
  const quote = content[0];

  if (
    (quote !== "'" && quote !== '"') ||
    content.at(-1) !== quote
  ) {
    throw new Error("Invalid quoted property in JSONPath.");
  }

  const inner = content.slice(1, -1);

  try {
    if (quote === '"') {
      return JSON.parse(content);
    }

    return inner
      .replace(/\\'/g, "'")
      .replace(/\\\\/g, "\\");
  } catch {
    throw new Error("Invalid quoted property in JSONPath.");
  }
}

function parseJsonPath(path: string): JsonPathToken[] {
  const source = path.trim();

  if (!source) {
    throw new Error("Enter a JSONPath expression.");
  }

  if (source[0] !== "$") {
    throw new Error("JSONPath must start with $.");
  }

  const tokens: JsonPathToken[] = [];
  let index = 1;

  while (index < source.length) {
    const character = source[index];

    if (/\s/.test(character)) {
      index += 1;
      continue;
    }

    if (source.startsWith("..", index)) {
      index += 2;

      if (source[index] === "*") {
        tokens.push({ type: "recursive", key: "*" });
        index += 1;
        continue;
      }

      const match = source
        .slice(index)
        .match(/^[$A-Z_a-z][$\w]*/);

      if (!match) {
        throw new Error(
          "Recursive JSONPath syntax must be followed by a property name or *."
        );
      }

      tokens.push({
        type: "recursive",
        key: match[0],
      });
      index += match[0].length;
      continue;
    }

    if (character === ".") {
      index += 1;

      if (source[index] === "*") {
        tokens.push({ type: "wildcard" });
        index += 1;
        continue;
      }

      const match = source
        .slice(index)
        .match(/^[$A-Z_a-z][$\w]*/);

      if (!match) {
        throw new Error(
          "Dot notation must be followed by a property name or *."
        );
      }

      tokens.push({
        type: "property",
        key: match[0],
      });
      index += match[0].length;
      continue;
    }

    if (character === "[") {
      const { content, endIndex } = readBracket(
        source,
        index
      );

      if (content === "*") {
        tokens.push({ type: "wildcard" });
      } else if (
        (content.startsWith('"') &&
          content.endsWith('"')) ||
        (content.startsWith("'") &&
          content.endsWith("'"))
      ) {
        tokens.push({
          type: "property",
          key: unquoteBracketProperty(content),
        });
      } else if (/^-?\d+$/.test(content)) {
        tokens.push({
          type: "index",
          index: Number(content),
        });
      } else {
        throw new Error(
          "This JSONPath tester supports quoted properties, array indexes, wildcards, dot notation, and recursive descent. Filters, slices, and unions are not supported."
        );
      }

      index = endIndex + 1;
      continue;
    }

    throw new Error(
      `Unexpected JSONPath character "${character}" at position ${
        index + 1
      }.`
    );
  }

  return tokens;
}

function childPathForProperty(
  base: string,
  key: string
): string {
  return isValidIdentifier(key)
    ? `${base}.${key}`
    : `${base}[${JSON.stringify(key)}]`;
}

function collectRecursive(
  value: unknown,
  path: string,
  key: string | "*",
  output: JsonPathMatch[]
): void {
  if (Array.isArray(value)) {
    value.forEach((child, index) => {
      const childPath = `${path}[${index}]`;

      if (key === "*") {
        output.push({
          path: childPath,
          value: child,
        });
      }

      collectRecursive(child, childPath, key, output);
    });

    return;
  }

  if (!isPlainObject(value)) {
    return;
  }

  for (const [childKey, child] of Object.entries(value)) {
    const childPath = childPathForProperty(
      path,
      childKey
    );

    if (key === "*" || childKey === key) {
      output.push({
        path: childPath,
        value: child,
      });
    }

    collectRecursive(child, childPath, key, output);
  }
}

export function evaluateJsonPath(
  jsonInput: string,
  pathInput: string
): JsonPathResult {
  const data = parseJson(jsonInput);
  const tokens = parseJsonPath(pathInput);

  let current: JsonPathMatch[] = [
    {
      path: "$",
      value: data,
    },
  ];

  for (const token of tokens) {
    const next: JsonPathMatch[] = [];

    for (const match of current) {
      const value = match.value;

      if (token.type === "property") {
        if (
          isPlainObject(value) &&
          Object.prototype.hasOwnProperty.call(
            value,
            token.key
          )
        ) {
          next.push({
            path: childPathForProperty(
              match.path,
              token.key
            ),
            value: value[token.key],
          });
        }

        continue;
      }

      if (token.type === "index") {
        if (Array.isArray(value)) {
          const resolvedIndex =
            token.index < 0
              ? value.length + token.index
              : token.index;

          if (
            resolvedIndex >= 0 &&
            resolvedIndex < value.length
          ) {
            next.push({
              path: `${match.path}[${resolvedIndex}]`,
              value: value[resolvedIndex],
            });
          }
        }

        continue;
      }

      if (token.type === "wildcard") {
        if (Array.isArray(value)) {
          value.forEach((child, index) => {
            next.push({
              path: `${match.path}[${index}]`,
              value: child,
            });
          });
        } else if (isPlainObject(value)) {
          for (const [key, child] of Object.entries(
            value
          )) {
            next.push({
              path: childPathForProperty(
                match.path,
                key
              ),
              value: child,
            });
          }
        }

        continue;
      }

      if (token.type === "recursive") {
        collectRecursive(
          value,
          match.path,
          token.key,
          next
        );
      }
    }

    current = next;
  }

  return {
    matches: current,
    count: current.length,
  };
}

/* ---------------- JSON Diff ---------------- */

function valueKind(value: unknown): string {
  if (value === null) {
    return "null";
  }

  if (Array.isArray(value)) {
    return "array";
  }

  return typeof value;
}

export function diffJson(
  leftInput: string,
  rightInput: string,
  maxDifferences = 5000
): JsonDiffResult {
  const left = parseJson(leftInput, "left JSON");
  const right = parseJson(rightInput, "right JSON");

  if (
    !Number.isInteger(maxDifferences) ||
    maxDifferences <= 0
  ) {
    throw new Error(
      "Maximum differences must be a positive whole number."
    );
  }

  const differences: JsonDiffEntry[] = [];

  function addDifference(entry: JsonDiffEntry) {
    if (differences.length >= maxDifferences) {
      throw new Error(
        `More than ${maxDifferences.toLocaleString(
          "en-US"
        )} differences were found. Use smaller JSON documents or increase the comparison limit.`
      );
    }

    differences.push(entry);
  }

  function compare(
    leftValue: unknown,
    rightValue: unknown,
    path: string
  ): void {
    if (Object.is(leftValue, rightValue)) {
      return;
    }

    const leftKind = valueKind(leftValue);
    const rightKind = valueKind(rightValue);

    if (leftKind !== rightKind) {
      addDifference({
        path,
        type: "type-changed",
        left: leftValue,
        right: rightValue,
      });
      return;
    }

    if (
      leftValue === null ||
      rightValue === null ||
      typeof leftValue !== "object" ||
      typeof rightValue !== "object"
    ) {
      addDifference({
        path,
        type: "changed",
        left: leftValue,
        right: rightValue,
      });
      return;
    }

    if (
      Array.isArray(leftValue) &&
      Array.isArray(rightValue)
    ) {
      const maxLength = Math.max(
        leftValue.length,
        rightValue.length
      );

      for (let index = 0; index < maxLength; index += 1) {
        const childPath = `${path}[${index}]`;

        if (index >= leftValue.length) {
          addDifference({
            path: childPath,
            type: "added",
            right: rightValue[index],
          });
        } else if (index >= rightValue.length) {
          addDifference({
            path: childPath,
            type: "removed",
            left: leftValue[index],
          });
        } else {
          compare(
            leftValue[index],
            rightValue[index],
            childPath
          );
        }
      }

      return;
    }

    const leftObject = leftValue as Record<
      string,
      unknown
    >;
    const rightObject = rightValue as Record<
      string,
      unknown
    >;

    const keys = new Set([
      ...Object.keys(leftObject),
      ...Object.keys(rightObject),
    ]);

    for (const key of keys) {
      const childPath = childPathForProperty(path, key);
      const inLeft = Object.prototype.hasOwnProperty.call(
        leftObject,
        key
      );
      const inRight = Object.prototype.hasOwnProperty.call(
        rightObject,
        key
      );

      if (!inLeft) {
        addDifference({
          path: childPath,
          type: "added",
          right: rightObject[key],
        });
      } else if (!inRight) {
        addDifference({
          path: childPath,
          type: "removed",
          left: leftObject[key],
        });
      } else {
        compare(
          leftObject[key],
          rightObject[key],
          childPath
        );
      }
    }
  }

  compare(left, right, "$");

  return {
    differences,
    count: differences.length,
    identical: differences.length === 0,
  };
}

/* ---------------- Markdown to HTML ---------------- */

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttribute(value: string): string {
  return escapeHtml(value).replace(/`/g, "&#96;");
}

function safeHref(value: string): string | null {
  const trimmed = value.trim();

  if (
    /^https?:\/\//i.test(trimmed) ||
    /^mailto:/i.test(trimmed) ||
    /^#/.test(trimmed) ||
    /^\//.test(trimmed)
  ) {
    return trimmed;
  }

  return null;
}

function inlineMarkdownToHtml(value: string): string {
  const codeTokens: string[] = [];

  let output = value.replace(
    /`([^`\n]+)`/g,
    (_, code: string) => {
      const token = `@@CODE${codeTokens.length}@@`;
      codeTokens.push(
        `<code>${escapeHtml(code)}</code>`
      );
      return token;
    }
  );

  output = escapeHtml(output);

  output = output.replace(
    /\[([^\]]+)\]\(([^)\s]+)(?:\s+&quot;([^&]*)&quot;)?\)/g,
    (_, label: string, url: string, title?: string) => {
      const decodedUrl = url
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");

      const href = safeHref(decodedUrl);

      if (!href) {
        return label;
      }

      return `<a href="${escapeAttribute(href)}"${
        title
          ? ` title="${escapeAttribute(title)}"`
          : ""
      }>${label}</a>`;
    }
  );

  output = output
    .replace(
      /(\*\*|__)(.+?)\1/g,
      "<strong>$2</strong>"
    )
    .replace(
      /(^|[^\w])(\*|_)([^*_]+?)\2(?=$|[^\w])/g,
      "$1<em>$3</em>"
    )
    .replace(
      /~~(.+?)~~/g,
      "<del>$1</del>"
    );

  codeTokens.forEach((html, index) => {
    output = output.replace(
      `@@CODE${index}@@`,
      html
    );
  });

  return output;
}

export function markdownToHtml(
  markdown: string
): string {
  if (!markdown.trim()) {
    throw new Error("Enter Markdown to convert.");
  }

  const lines = markdown
    .replace(/\r\n?/g, "\n")
    .split("\n");

  const html: string[] = [];
  let paragraph: string[] = [];
  let listType: "ul" | "ol" | null = null;
  let inCodeBlock = false;
  let codeLanguage = "";
  let codeLines: string[] = [];
  let quoteLines: string[] = [];

  function flushParagraph() {
    if (paragraph.length === 0) {
      return;
    }

    html.push(
      `<p>${inlineMarkdownToHtml(
        paragraph.join(" ")
      )}</p>`
    );
    paragraph = [];
  }

  function closeList() {
    if (!listType) {
      return;
    }

    html.push(`</${listType}>`);
    listType = null;
  }

  function flushQuote() {
    if (quoteLines.length === 0) {
      return;
    }

    html.push(
      `<blockquote><p>${inlineMarkdownToHtml(
        quoteLines.join(" ")
      )}</p></blockquote>`
    );
    quoteLines = [];
  }

  function flushCode() {
    if (!inCodeBlock) {
      return;
    }

    const className = codeLanguage
      ? ` class="language-${escapeAttribute(
          codeLanguage
        )}"`
      : "";

    html.push(
      `<pre><code${className}>${escapeHtml(
        codeLines.join("\n")
      )}</code></pre>`
    );

    inCodeBlock = false;
    codeLanguage = "";
    codeLines = [];
  }

  for (const rawLine of lines) {
    const trimmed = rawLine.trim();

    const fence = /^```([A-Za-z0-9_-]*)\s*$/.exec(
      trimmed
    );

    if (fence) {
      if (inCodeBlock) {
        flushCode();
      } else {
        flushParagraph();
        closeList();
        flushQuote();
        inCodeBlock = true;
        codeLanguage = fence[1] ?? "";
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(rawLine);
      continue;
    }

    if (!trimmed) {
      flushParagraph();
      closeList();
      flushQuote();
      continue;
    }

    const heading = /^(#{1,6})\s+(.+)$/.exec(trimmed);

    if (heading) {
      flushParagraph();
      closeList();
      flushQuote();

      const level = heading[1].length;
      html.push(
        `<h${level}>${inlineMarkdownToHtml(
          heading[2]
        )}</h${level}>`
      );
      continue;
    }

    if (/^(---+|\*\*\*+|___+)$/.test(trimmed)) {
      flushParagraph();
      closeList();
      flushQuote();
      html.push("<hr>");
      continue;
    }

    const quote = /^>\s?(.*)$/.exec(trimmed);

    if (quote) {
      flushParagraph();
      closeList();
      quoteLines.push(quote[1]);
      continue;
    }

    const unordered = /^[-*+]\s+(.+)$/.exec(trimmed);

    if (unordered) {
      flushParagraph();
      flushQuote();

      if (listType !== "ul") {
        closeList();
        listType = "ul";
        html.push("<ul>");
      }

      html.push(
        `<li>${inlineMarkdownToHtml(
          unordered[1]
        )}</li>`
      );
      continue;
    }

    const ordered = /^\d+[.)]\s+(.+)$/.exec(trimmed);

    if (ordered) {
      flushParagraph();
      flushQuote();

      if (listType !== "ol") {
        closeList();
        listType = "ol";
        html.push("<ol>");
      }

      html.push(
        `<li>${inlineMarkdownToHtml(
          ordered[1]
        )}</li>`
      );
      continue;
    }

    closeList();
    flushQuote();
    paragraph.push(trimmed);
  }

  if (inCodeBlock) {
    flushCode();
  }

  flushParagraph();
  closeList();
  flushQuote();

  return html.join("\n");
}

/* ---------------- HTML to Markdown ---------------- */

function escapeMarkdownText(value: string): string {
  return value.replace(
    /([\\`*_[\]<>])/g,
    "\\$1"
  );
}

function normalizeMarkdown(markdown: string): string {
  return markdown
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function htmlToMarkdown(html: string): string {
  if (!html.trim()) {
    throw new Error("Enter HTML to convert.");
  }

  if (typeof DOMParser === "undefined") {
    throw new Error(
      "HTML to Markdown conversion is only available in the browser."
    );
  }

  const parser = new DOMParser();
  const documentNode = parser.parseFromString(
    html,
    "text/html"
  );

  documentNode
    .querySelectorAll(
      "script, style, noscript, template"
    )
    .forEach((element) => element.remove());

  function convertChildren(
    node: Node,
    listDepth = 0
  ): string {
    return Array.from(node.childNodes)
      .map((child) =>
        convertNode(child, listDepth)
      )
      .join("");
  }

  function convertList(
    element: Element,
    ordered: boolean,
    listDepth: number
  ): string {
    const items = Array.from(element.children).filter(
      (child) => child.tagName.toLowerCase() === "li"
    );

    return (
      items
        .map((item, index) => {
          const directParts: string[] = [];
          const nestedLists: Element[] = [];

          for (const child of Array.from(
            item.childNodes
          )) {
            if (
              child.nodeType === Node.ELEMENT_NODE &&
              ["ul", "ol"].includes(
                (child as Element).tagName.toLowerCase()
              )
            ) {
              nestedLists.push(child as Element);
            } else {
              directParts.push(
                convertNode(child, listDepth + 1)
              );
            }
          }

          const marker = ordered
            ? `${index + 1}. `
            : "- ";
          const indent = "  ".repeat(listDepth);

          let output = `${indent}${marker}${normalizeMarkdown(
            directParts.join("")
          )}`;

          for (const nested of nestedLists) {
            const nestedOrdered =
              nested.tagName.toLowerCase() === "ol";

            output += `\n${convertList(
              nested,
              nestedOrdered,
              listDepth + 1
            ).trimEnd()}`;
          }

          return output;
        })
        .join("\n") + "\n\n"
    );
  }

  function convertNode(
    node: Node,
    listDepth = 0
  ): string {
    if (node.nodeType === Node.TEXT_NODE) {
      return escapeMarkdownText(
        node.textContent ?? ""
      );
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      return "";
    }

    const element = node as Element;
    const tag = element.tagName.toLowerCase();

    if (
      ["script", "style", "noscript", "template"].includes(
        tag
      )
    ) {
      return "";
    }

    if (/^h[1-6]$/.test(tag)) {
      const level = Number(tag[1]);

      return `${"#".repeat(level)} ${normalizeMarkdown(
        convertChildren(element, listDepth)
      )}\n\n`;
    }

    if (tag === "p") {
      return `${normalizeMarkdown(
        convertChildren(element, listDepth)
      )}\n\n`;
    }

    if (tag === "br") {
      return "  \n";
    }

    if (tag === "strong" || tag === "b") {
      return `**${convertChildren(
        element,
        listDepth
      )}**`;
    }

    if (tag === "em" || tag === "i") {
      return `*${convertChildren(
        element,
        listDepth
      )}*`;
    }

    if (tag === "del" || tag === "s") {
      return `~~${convertChildren(
        element,
        listDepth
      )}~~`;
    }

    if (tag === "code" && element.parentElement?.tagName.toLowerCase() !== "pre") {
      const text = element.textContent ?? "";
      const fence = text.includes("`") ? "``" : "`";
      return `${fence}${text}${fence}`;
    }

    if (tag === "pre") {
      const code =
        element.querySelector("code")?.textContent ??
        element.textContent ??
        "";

      const languageClass =
        element.querySelector("code")?.getAttribute(
          "class"
        ) ?? "";

      const languageMatch =
        /(?:^|\s)language-([A-Za-z0-9_-]+)/.exec(
          languageClass
        );

      return `\`\`\`${languageMatch?.[1] ?? ""}\n${code.replace(
        /\n$/,
        ""
      )}\n\`\`\`\n\n`;
    }

    if (tag === "a") {
      const label = normalizeMarkdown(
        convertChildren(element, listDepth)
      );
      const href = element.getAttribute("href") ?? "";

      if (!href) {
        return label;
      }

      return `[${label}](${href})`;
    }

    if (tag === "img") {
      const alt = element.getAttribute("alt") ?? "";
      const src = element.getAttribute("src") ?? "";

      if (!src) {
        return escapeMarkdownText(alt);
      }

      return `![${escapeMarkdownText(
        alt
      )}](${src})`;
    }

    if (tag === "ul") {
      return convertList(element, false, listDepth);
    }

    if (tag === "ol") {
      return convertList(element, true, listDepth);
    }

    if (tag === "blockquote") {
      const content = normalizeMarkdown(
        convertChildren(element, listDepth)
      );

      return (
        content
          .split("\n")
          .map((line) => `> ${line}`)
          .join("\n") + "\n\n"
      );
    }

    if (tag === "hr") {
      return "---\n\n";
    }

    if (tag === "table") {
      const rows = Array.from(
        element.querySelectorAll(":scope > thead > tr, :scope > tbody > tr, :scope > tr")
      );

      if (rows.length === 0) {
        return `${normalizeMarkdown(
          convertChildren(element, listDepth)
        )}\n\n`;
      }

      const matrix = rows.map((row) =>
        Array.from(row.children)
          .filter((cell) =>
            ["th", "td"].includes(
              cell.tagName.toLowerCase()
            )
          )
          .map((cell) =>
            normalizeMarkdown(
              convertChildren(cell, listDepth)
            ).replace(/\|/g, "\\|")
          )
      );

      const width = Math.max(
        ...matrix.map((row) => row.length)
      );

      if (width === 0) {
        return "";
      }

      const first = matrix[0];
      while (first.length < width) {
        first.push("");
      }

      const output = [
        `| ${first.join(" | ")} |`,
        `| ${Array(width).fill("---").join(" | ")} |`,
      ];

      for (const row of matrix.slice(1)) {
        while (row.length < width) {
          row.push("");
        }
        output.push(`| ${row.join(" | ")} |`);
      }

      return `${output.join("\n")}\n\n`;
    }

    if (
      [
        "div",
        "section",
        "article",
        "header",
        "footer",
        "main",
        "aside",
        "nav",
        "figure",
        "figcaption",
      ].includes(tag)
    ) {
      const content = normalizeMarkdown(
        convertChildren(element, listDepth)
      );

      return content ? `${content}\n\n` : "";
    }

    return convertChildren(element, listDepth);
  }

  return normalizeMarkdown(
    convertChildren(documentNode.body)
  );
}