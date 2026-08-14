import { ToolResult } from "@/types";

export function formatHTML(input: string): ToolResult<string> {
  try {
    let formatted = "";
    let indent = 0;
    const tab = "  ";
    const lines = input
      .replace(/>\s*</g, ">\n<")
      .replace(/\n\s*\n/g, "\n")
      .split("\n");

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      if (!line) continue;

      if (line.match(/^<\/\w/)) {
        indent = Math.max(indent - 1, 0);
      }

      formatted += tab.repeat(indent) + line + "\n";

      if (
        line.match(/^<\w[^>]*[^/]>$/) &&
        !line.match(/^<(br|hr|img|input|meta|link|area|base|col|embed|param|source|track|wbr)/i)
      ) {
        indent++;
      }
    }

    return { success: true, data: formatted.trim() };
  } catch {
    return { success: false, error: "Unable to format HTML." };
  }
}
