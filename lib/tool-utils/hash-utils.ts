const encoder = new TextEncoder();

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function digestText(
  input: string,
  algorithm: "SHA-1" | "SHA-256" | "SHA-512"
): Promise<string> {
  const digest = await crypto.subtle.digest(algorithm, encoder.encode(input));
  return toHex(digest);
}

export async function createHmac(
  input: string,
  key: string,
  algorithm: "SHA-256" | "SHA-512"
): Promise<string> {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(key),
    { name: "HMAC", hash: algorithm },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", cryptoKey, encoder.encode(input));
  return toHex(signature);
}
