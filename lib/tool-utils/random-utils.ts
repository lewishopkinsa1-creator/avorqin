function randomInt(max: number): number {
  if (max <= 0) throw new Error("Random range must be positive.");
  const maxUint = 0xffffffff;
  const limit = maxUint - (maxUint % max);
  const buffer = new Uint32Array(1);
  do crypto.getRandomValues(buffer); while (buffer[0] >= limit);
  return buffer[0] % max;
}

export function secureRandomString(
  length: number,
  options: { lower: boolean; upper: boolean; numbers: boolean; symbols: boolean }
): string {
  const groups = [
    options.lower ? "abcdefghijklmnopqrstuvwxyz" : "",
    options.upper ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "",
    options.numbers ? "0123456789" : "",
    options.symbols ? "!@#$%^&*()-_=+[]{};:,.?" : "",
  ].filter(Boolean);

  if (!groups.length) throw new Error("Select at least one character set.");
  const chars = groups.join("");
  const safeLength = Math.min(Math.max(Math.floor(length), 1), 256);

  const required = groups.map((group) => group[randomInt(group.length)]);
  const remaining = Array.from(
    { length: Math.max(0, safeLength - required.length) },
    () => chars[randomInt(chars.length)]
  );
  const result = [...required.slice(0, safeLength), ...remaining];

  for (let i = result.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result.join("");
}
