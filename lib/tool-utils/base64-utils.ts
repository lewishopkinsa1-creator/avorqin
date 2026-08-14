import { ToolResult } from "@/types";

export function encodeBase64(input: string): ToolResult<string> {
  try {
    const encoded = btoa(unescape(encodeURIComponent(input)));
    return { success: true, data: encoded };
  } catch {
    return { success: false, error: "Unable to encode input to Base64." };
  }
}

export function decodeBase64(input: string): ToolResult<string> {
  try {
    // Normalize URL-safe base64
    const normalized = input
      .replace(/-/g, "+")
      .replace(/_/g, "/")
      .replace(/\s/g, "");
    // Add padding if needed
    const pad = normalized.length % 4;
    const padded = pad ? normalized + "=".repeat(4 - pad) : normalized;
    const decoded = decodeURIComponent(escape(atob(padded)));
    return { success: true, data: decoded };
  } catch {
    return { success: false, error: "Invalid Base64 string." };
  }
}

export function isBinaryBase64(input: string): boolean {
  try {
    const normalized = input.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "");
    const pad = normalized.length % 4;
    const padded = pad ? normalized + "=".repeat(4 - pad) : normalized;
    const decoded = atob(padded);
    for (let i = 0; i < Math.min(decoded.length, 1000); i++) {
      const code = decoded.charCodeAt(i);
      if (code === 0 || (code < 32 && code !== 9 && code !== 10 && code !== 13)) {
        return true;
      }
    }
    return false;
  } catch {
    return false;
  }
}
