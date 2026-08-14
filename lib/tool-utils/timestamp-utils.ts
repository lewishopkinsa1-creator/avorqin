import { ToolResult } from "@/types";

export function timestampToDate(
  timestamp: number,
  unit: "seconds" | "milliseconds"
): ToolResult<string> {
  try {
    const ms = unit === "seconds" ? timestamp * 1000 : timestamp;
    const date = new Date(ms);
    if (isNaN(date.getTime())) {
      return { success: false, error: "Invalid timestamp." };
    }
    return { success: true, data: date.toISOString() };
  } catch {
    return { success: false, error: "Invalid timestamp." };
  }
}

export function dateToTimestamp(
  dateStr: string,
  unit: "seconds" | "milliseconds"
): ToolResult<number> {
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      return { success: false, error: "Invalid date string." };
    }
    const ts = unit === "seconds" ? Math.floor(date.getTime() / 1000) : date.getTime();
    return { success: true, data: ts };
  } catch {
    return { success: false, error: "Invalid date string." };
  }
}

export function getCurrentTimestamp(unit: "seconds" | "milliseconds"): number {
  return unit === "seconds" ? Math.floor(Date.now() / 1000) : Date.now();
}
