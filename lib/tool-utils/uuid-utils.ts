function secureUuidFallback(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);

  // UUID v4 version bits.
  bytes[6] = (bytes[6] & 0x0f) | 0x40;

  // RFC 4122 variant bits.
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = Array.from(bytes, (byte) =>
    byte.toString(16).padStart(2, "0")
  );

  return [
    hex.slice(0, 4).join(""),
    hex.slice(4, 6).join(""),
    hex.slice(6, 8).join(""),
    hex.slice(8, 10).join(""),
    hex.slice(10, 16).join(""),
  ].join("-");
}

export function generateUuidV4(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return secureUuidFallback();
}

export function generateUuids(count: number): string[] {
  const safeCount = Math.min(Math.max(Math.floor(count), 1), 50);

  return Array.from({ length: safeCount }, () => generateUuidV4());
}
