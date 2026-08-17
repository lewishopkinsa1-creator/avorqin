export function hexToRgb(input: string) {
  let hex = input.trim().replace(/^#/, "");
  if (/^[0-9a-fA-F]{3}$/.test(hex)) hex = hex.split("").map((c) => c + c).join("");
  if (!/^[0-9a-fA-F]{6}$/.test(hex)) throw new Error("Enter a valid 3- or 6-digit hex color.");
  const n = Number.parseInt(hex, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export function rgbToHex(r: number, g: number, b: number) {
  for (const value of [r, g, b]) {
    if (!Number.isInteger(value) || value < 0 || value > 255) {
      throw new Error("RGB values must be whole numbers from 0 to 255.");
    }
  }
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase()}`;
}
