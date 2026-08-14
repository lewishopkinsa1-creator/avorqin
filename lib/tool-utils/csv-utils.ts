import { ToolResult } from "@/types";

export function csvToJSON(
  input: string,
  delimiter: string = ",",
  hasHeader: boolean = true
): ToolResult<unknown[]> {
  try {
    const rows = parseCSV(input, delimiter);
    if (rows.length === 0) {
      return { success: true, data: [] };
    }

    if (hasHeader) {
      const headers = rows[0];
      const data = rows.slice(1).map((row) => {
        const obj: Record<string, string> = {};
        headers.forEach((header, i) => {
          obj[header] = row[i] ?? "";
        });
        return obj;
      });
      return { success: true, data };
    } else {
      return { success: true, data: rows };
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid CSV";
    return { success: false, error: message };
  }
}

function parseCSV(text: string, delimiter: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (inQuotes) {
      if (char === '"') {
        if (nextChar === '"') {
          cell += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cell += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === delimiter) {
        row.push(cell);
        cell = "";
      } else if (char === "\n" || char === "\r") {
        if (char === "\r" && nextChar === "\n") {
          i++;
        }
        row.push(cell);
        rows.push(row);
        row = [];
        cell = "";
      } else {
        cell += char;
      }
    }
  }

  row.push(cell);
  if (row.length > 1 || row[0] !== "") {
    rows.push(row);
  }

  return rows;
}
