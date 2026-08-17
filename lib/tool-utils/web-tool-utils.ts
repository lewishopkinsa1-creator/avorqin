export function parseQueryString(input: string): Array<{ key: string; value: string }> {
  const value = input.trim().replace(/^[^?]*\?/, "").replace(/^\?/, "").split("#")[0];
  const params = new URLSearchParams(value);
  return Array.from(params.entries()).map(([key, val]) => ({ key, value: val }));
}

export function buildQueryString(input: string): string {
  const params = new URLSearchParams();
  const lines = input.split(/\r?\n/).filter((line) => line.trim());
  for (const line of lines) {
    const index = line.indexOf("=");
    if (index < 0) throw new Error(`Expected key=value near: ${line}`);
    params.append(line.slice(0, index).trim(), line.slice(index + 1).trim());
  }
  return params.toString();
}

export function parseUrl(input: string) {
  const url = new URL(input.trim());
  return {
    protocol: url.protocol,
    username: url.username,
    password: url.password,
    hostname: url.hostname,
    port: url.port,
    pathname: url.pathname,
    search: url.search,
    hash: url.hash,
    origin: url.origin,
  };
}

export function testRegex(pattern: string, flags: string, input: string) {
  const regex = new RegExp(pattern, flags);
  const matches = Array.from(input.matchAll(regex.global ? regex : new RegExp(pattern, flags.includes("g") ? flags : flags + "g")));
  return matches.map((match) => ({
    match: match[0],
    index: match.index ?? 0,
    groups: match.slice(1),
  }));
}

const cronDescriptions: Record<string, string> = {
  "*": "every value",
};

export function explainCron(input: string): Array<{ field: string; value: string; meaning: string }> {
  const parts = input.trim().split(/\s+/);
  if (parts.length !== 5) throw new Error("Enter a standard five-field cron expression.");
  const fields = ["Minute", "Hour", "Day of month", "Month", "Day of week"];
  return parts.map((value, i) => {
    let meaning = cronDescriptions[value] ?? value;
    if (/^\*\/\d+$/.test(value)) meaning = `every ${value.slice(2)} units`;
    else if (/^\d+$/.test(value)) meaning = `at ${value}`;
    else if (/^\d+-\d+$/.test(value)) meaning = `from ${value.replace("-", " through ")}`;
    else if (/^\d+(,\d+)+$/.test(value)) meaning = `at ${value.split(",").join(", ")}`;
    return { field: fields[i], value, meaning };
  });
}
