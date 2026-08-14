import { ToolResult } from "@/types";

export function encodeURL(input: string, component: boolean = false): ToolResult<string> {
  try {
    const encoded = component ? encodeURIComponent(input) : encodeURI(input);
    return { success: true, data: encoded };
  } catch {
    return { success: false, error: "Unable to encode URL." };
  }
}

export function decodeURL(input: string, component: boolean = false): ToolResult<string> {
  try {
    const decoded = component ? decodeURIComponent(input) : decodeURI(input);
    return { success: true, data: decoded };
  } catch {
    return { success: false, error: "Invalid percent-encoded string." };
  }
}
