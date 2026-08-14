import { ToolResult } from "@/types";

export function formatCSS(input: string): ToolResult<string> {
  try {
    let formatted = "";
    let indent = 0;
    const tab = "  ";
    // Remove comments temporarily
    const comments: string[] = [];
    const noComments = input.replace(/\/\*[\s\S]*?\*\//g, (match) => {
      comments.push(match);
      return `___CSSCOMMENT${comments.length - 1}___`;
    });

    const cleaned = noComments
      .replace(/\s*{\s*/g, " {\n")
      .replace(/;\s*/g, ";\n")
      .replace(/\s*}\s*/g, "\n}\n")
      .replace(/,\s*/g, ", ")
      .trim();

    const lines = cleaned.split("\n");

    for (let line of lines) {
      line = line.trim();
      if (!line) continue;

      if (line === "}") {
        indent = Math.max(indent - 1, 0);
        formatted += tab.repeat(indent) + line + "\n";
      } else if (line.endsWith("{")) {
        formatted += tab.repeat(indent) + line + "\n";
        indent++;
      } else {
        formatted += tab.repeat(indent) + line + "\n";
      }
    }

    // Restore comments
    let result = formatted;
    comments.forEach((comment, i) => {
      result = result.replace(`___CSSCOMMENT${i}___`, comment);
    });

    return { success: true, data: result.trim() };
  } catch {
    return { success: false, error: "Unable to format CSS." };
  }
}
