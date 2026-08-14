import { ToolResult } from "@/types";

export function formatJSON(input: string, indent: number = 2): ToolResult<string> {
  try {
    const parsed = JSON.parse(input);
    return { success: true, data: JSON.stringify(parsed, null, indent) };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid JSON";
    return { success: false, error: message };
  }
}

export function minifyJSON(input: string): ToolResult<string> {
  try {
    const parsed = JSON.parse(input);
    return { success: true, data: JSON.stringify(parsed) };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid JSON";
    return { success: false, error: message };
  }
}

function computeLineColumn(input: string, position: number): { line: number; column: number } {
  let line = 1;
  let column = 1;
  for (let i = 0; i < position && i < input.length; i++) {
    if (input[i] === "\n") {
      line++;
      column = 1;
    } else {
      column++;
    }
  }
  return { line, column };
}

export function validateJSON(input: string): ToolResult<{ valid: true } | { valid: false; line: number; column: number; message: string }> {
  try {
    JSON.parse(input);
    return { success: true, data: { valid: true } };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid JSON";

    // Try to extract position from the error message (V8 format: at position N)
    const posMatch = message.match(/position\s+(\d+)/i);
    let position: number | undefined;
    if (posMatch) {
      position = parseInt(posMatch[1], 10);
    }

    // Fallback: scan to find where parse fails
    if (position === undefined) {
      const trimmed = input.trim();
      if (trimmed.length === 0) {
        position = 0;
      } else {
        for (let i = 1; i <= trimmed.length; i++) {
          try {
            JSON.parse(trimmed.slice(0, i));
          } catch {
            position = i - 1;
            break;
          }
        }
        if (position === undefined) position = 0;
      }
    }

    const { line, column } = computeLineColumn(input, position);

    return {
      success: true,
      data: {
        valid: false,
        line,
        column,
        message,
      },
    };
  }
}
