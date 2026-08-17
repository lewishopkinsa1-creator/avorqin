function nodeToValue(node: Element): unknown {
  const children = Array.from(node.children);
  const attributes = Array.from(node.attributes);

  if (!children.length && !attributes.length) {
    return node.textContent?.trim() ?? "";
  }

  const result: Record<string, unknown> = {};

  for (const attr of attributes) result[`@${attr.name}`] = attr.value;

  const text = Array.from(node.childNodes)
    .filter((n) => n.nodeType === Node.TEXT_NODE)
    .map((n) => n.textContent ?? "")
    .join("")
    .trim();
  if (text) result["#text"] = text;

  for (const child of children) {
    const value = nodeToValue(child);
    if (child.tagName in result) {
      const existing = result[child.tagName];
      result[child.tagName] = Array.isArray(existing) ? [...existing, value] : [existing, value];
    } else {
      result[child.tagName] = value;
    }
  }

  return result;
}

export function xmlToJson(input: string): string {
  const doc = new DOMParser().parseFromString(input, "application/xml");
  const error = doc.querySelector("parsererror");
  if (error) throw new Error("Invalid XML. Check the document structure and try again.");
  const root = doc.documentElement;
  return JSON.stringify({ [root.tagName]: nodeToValue(root) }, null, 2);
}

function escapeXml(value: unknown) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildXml(name: string, value: unknown, indent = 0): string {
  const pad = "  ".repeat(indent);

  if (Array.isArray(value)) {
    return value.map((item) => buildXml(name, item, indent)).join("\n");
  }

  if (value === null || value === undefined) return `${pad}<${name} />`;

  if (typeof value !== "object") return `${pad}<${name}>${escapeXml(value)}</${name}>`;

  const obj = value as Record<string, unknown>;
  const attrs = Object.entries(obj)
    .filter(([key]) => key.startsWith("@"))
    .map(([key, val]) => ` ${key.slice(1)}="${escapeXml(val)}"`)
    .join("");
  const text = obj["#text"];
  const children = Object.entries(obj).filter(([key]) => !key.startsWith("@") && key !== "#text");

  if (!children.length) {
    return `${pad}<${name}${attrs}>${text === undefined ? "" : escapeXml(text)}</${name}>`;
  }

  const inner = children.map(([key, val]) => buildXml(key, val, indent + 1)).join("\n");
  const prefix = text === undefined ? "" : escapeXml(text);
  return `${pad}<${name}${attrs}>${prefix ? prefix : ""}\n${inner}\n${pad}</${name}>`;
}

export function jsonToXml(input: string): string {
  const parsed = JSON.parse(input) as unknown;
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("JSON must be an object with a single root element.");
  }
  const entries = Object.entries(parsed as Record<string, unknown>);
  if (entries.length !== 1) {
    throw new Error("JSON must contain exactly one top-level key to use as the XML root element.");
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n${buildXml(entries[0][0], entries[0][1])}`;
}
