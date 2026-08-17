export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function words(input: string): string[] {
  return input.trim().match(/[A-Za-z0-9]+(?:'[A-Za-z0-9]+)*/g) ?? [];
}

export function toTitleCase(input: string): string {
  return input.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

export function toCamelCase(input: string): string {
  const parts = input.toLowerCase().match(/[a-z0-9]+/g) ?? [];
  return parts.map((p, i) => (i === 0 ? p : p[0].toUpperCase() + p.slice(1))).join("");
}

export function toPascalCase(input: string): string {
  const camel = toCamelCase(input);
  return camel ? camel[0].toUpperCase() + camel.slice(1) : "";
}

export function toSnakeCase(input: string): string {
  return (input.match(/[A-Za-z0-9]+/g) ?? []).map((x) => x.toLowerCase()).join("_");
}

export function toKebabCase(input: string): string {
  return (input.match(/[A-Za-z0-9]+/g) ?? []).map((x) => x.toLowerCase()).join("-");
}

export function countText(input: string) {
  const wordCount = words(input).length;
  const chars = input.length;
  const charsNoSpaces = input.replace(/\s/g, "").length;
  const lines = input ? input.split(/\r?\n/).length : 0;
  const sentences = input.trim() ? (input.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? []).length : 0;
  return { wordCount, chars, charsNoSpaces, lines, sentences };
}

export function sortLines(input: string, reverse = false): string {
  const lines = input.split(/\r?\n/);
  lines.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base", numeric: true }));
  if (reverse) lines.reverse();
  return lines.join("\n");
}

export function removeDuplicateLines(input: string): string {
  const seen = new Set<string>();
  return input.split(/\r?\n/).filter((line) => {
    if (seen.has(line)) return false;
    seen.add(line);
    return true;
  }).join("\n");
}

export function cleanWhitespace(input: string, removeEmpty = true): string {
  let lines = input.split(/\r?\n/).map((line) => line.trim().replace(/[ \t]+/g, " "));
  if (removeEmpty) lines = lines.filter((line) => line.length > 0);
  return lines.join("\n");
}

export function reverseText(input: string, mode: "characters" | "words" | "lines"): string {
  if (mode === "characters") return Array.from(input).reverse().join("");
  if (mode === "words") return input.trim().split(/\s+/).reverse().join(" ");
  return input.split(/\r?\n/).reverse().join("\n");
}

export type DiffRow = { type: "same" | "added" | "removed" | "changed"; left: string; right: string };

export function lineDiff(left: string, right: string): DiffRow[] {
  const a = left.split(/\r?\n/);
  const b = right.split(/\r?\n/);
  const max = Math.max(a.length, b.length);
  const rows: DiffRow[] = [];
  for (let i = 0; i < max; i++) {
    const l = a[i];
    const r = b[i];
    if (l === undefined) rows.push({ type: "added", left: "", right: r ?? "" });
    else if (r === undefined) rows.push({ type: "removed", left: l, right: "" });
    else if (l === r) rows.push({ type: "same", left: l, right: r });
    else rows.push({ type: "changed", left: l, right: r });
  }
  return rows;
}
