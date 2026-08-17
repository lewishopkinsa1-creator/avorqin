type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringifyCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function escapeCsvCell(value: unknown, delimiter: string): string {
  const text = stringifyCell(value);
  const mustQuote =
    text.includes(delimiter) ||
    text.includes('"') ||
    text.includes("\n") ||
    text.includes("\r");

  if (!mustQuote) return text;

  return `"${text.replace(/"/g, '""')}"`;
}

export function jsonToCsv(
  input: string,
  delimiter = ",",
  includeHeader = true
): string {
  let parsed: unknown;

  try {
    parsed = JSON.parse(input);
  } catch {
    throw new Error("Invalid JSON. Check your syntax and try again.");
  }

  if (!Array.isArray(parsed)) {
    throw new Error("JSON must be an array of objects or values.");
  }

  if (parsed.length === 0) {
    return "";
  }

  const allRecords = parsed.every(isRecord);

  if (!allRecords) {
    const rows = parsed.map((value) => escapeCsvCell(value, delimiter));
    return rows.join("\n");
  }

  const records = parsed as JsonRecord[];
  const headers = Array.from(
    new Set(records.flatMap((record) => Object.keys(record)))
  );

  const rows = records.map((record) =>
    headers.map((header) => escapeCsvCell(record[header], delimiter)).join(delimiter)
  );

  if (!includeHeader) {
    return rows.join("\n");
  }

  const headerRow = headers
    .map((header) => escapeCsvCell(header, delimiter))
    .join(delimiter);

  return [headerRow, ...rows].join("\n");
}
