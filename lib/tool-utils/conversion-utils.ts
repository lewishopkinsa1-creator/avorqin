export function convertBase(input: string, fromBase: number, toBase: number): string {
  const value = input.trim();
  if (![2, 8, 10, 16].includes(fromBase) || ![2, 8, 10, 16].includes(toBase)) {
    throw new Error("Unsupported number base.");
  }
  if (!value) throw new Error("Enter a value.");
  const parsed = Number.parseInt(value, fromBase);
  if (!Number.isFinite(parsed) || parsed.toString(fromBase).toLowerCase() !== value.replace(/^0+/, "").toLowerCase() && !(parsed === 0 && /^0+$/.test(value))) {
    // Fallback validation for leading zeros.
    const valid = new RegExp(
      fromBase === 2 ? "^[01]+$" :
      fromBase === 8 ? "^[0-7]+$" :
      fromBase === 10 ? "^[0-9]+$" : "^[0-9a-fA-F]+$"
    ).test(value);
    if (!valid) throw new Error(`Invalid base-${fromBase} number.`);
  }
  return parsed.toString(toBase).toUpperCase();
}

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export function textToBinary(input: string): string {
  return Array.from(encoder.encode(input))
    .map((byte) => byte.toString(2).padStart(8, "0"))
    .join(" ");
}

export function binaryToText(input: string): string {
  const parts = input.trim().split(/\s+/).filter(Boolean);
  if (!parts.every((part) => /^[01]{8}$/.test(part))) {
    throw new Error("Enter 8-bit binary bytes separated by spaces.");
  }
  return decoder.decode(new Uint8Array(parts.map((part) => Number.parseInt(part, 2))));
}

export function textToHex(input: string): string {
  return Array.from(encoder.encode(input))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join(" ");
}

export function hexToText(input: string): string {
  const cleaned = input.trim().replace(/0x/gi, "").replace(/[^0-9a-fA-F]/g, "");
  if (!cleaned || cleaned.length % 2 !== 0 || !/^[0-9a-fA-F]+$/.test(cleaned)) {
    throw new Error("Enter an even number of hexadecimal digits.");
  }
  const bytes = cleaned.match(/.{2}/g)!.map((pair) => Number.parseInt(pair, 16));
  return decoder.decode(new Uint8Array(bytes));
}
