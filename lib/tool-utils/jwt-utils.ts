export type DecodedJwt = {
  header: unknown;
  payload: unknown;
  signature: string;
};

function decodeBase64Url(value: string): string {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(
    normalized.length + ((4 - (normalized.length % 4)) % 4),
    "="
  );

  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

  return new TextDecoder().decode(bytes);
}

function parseJwtPart(value: string, label: string): unknown {
  try {
    return JSON.parse(decodeBase64Url(value));
  } catch {
    throw new Error(`Invalid JWT ${label}.`);
  }
}

export function decodeJwt(token: string): DecodedJwt {
  const trimmed = token.trim();
  const parts = trimmed.split(".");

  if (parts.length !== 3 || parts.some((part) => part.length === 0)) {
    throw new Error(
      "A JWT must contain three non-empty sections separated by periods."
    );
  }

  return {
    header: parseJwtPart(parts[0], "header"),
    payload: parseJwtPart(parts[1], "payload"),
    signature: parts[2],
  };
}

export function formatJwtJson(value: unknown): string {
  return JSON.stringify(value, null, 2);
}

export function formatJwtTimestamp(value: unknown): string | null {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return null;
  }

  const date = new Date(value * 1000);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString();
}
