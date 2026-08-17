function scalar(value: string): unknown {
  const v = value.trim();
  if (v === "null" || v === "~") return null;
  if (v === "true") return true;
  if (v === "false") return false;
  if (/^-?\d+(?:\.\d+)?$/.test(v)) return Number(v);
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    return v.slice(1, -1);
  }
  return v;
}

function cleanLines(input: string) {
  return input
    .replace(/\t/g, "  ")
    .split(/\r?\n/)
    .map((raw) => {
      const match = raw.match(/^(\s*)(.*)$/)!;
      return { indent: match[1].length, text: match[2].trimEnd() };
    })
    .filter((line) => line.text.trim() && !line.text.trimStart().startsWith("#"));
}

function parseBlock(lines: ReturnType<typeof cleanLines>, start: number, indent: number): [unknown, number] {
  const isArray = lines[start]?.indent === indent && lines[start].text.trimStart().startsWith("- ");
  const out: any = isArray ? [] : {};
  let i = start;

  while (i < lines.length) {
    const line = lines[i];
    if (line.indent < indent) break;
    if (line.indent > indent) throw new Error(`Unexpected indentation near: ${line.text.trim()}`);

    const text = line.text.trim();

    if (isArray) {
      if (!text.startsWith("- ")) break;
      const rest = text.slice(2).trim();
      if (!rest) {
        if (i + 1 >= lines.length || lines[i + 1].indent <= indent) {
          out.push(null);
          i++;
        } else {
          const [child, next] = parseBlock(lines, i + 1, lines[i + 1].indent);
          out.push(child);
          i = next;
        }
        continue;
      }

      const colon = rest.indexOf(":");
      if (colon > 0) {
        const obj: Record<string, unknown> = {};
        const key = rest.slice(0, colon).trim();
        const value = rest.slice(colon + 1).trim();
        obj[key] = value ? scalar(value) : null;
        i++;
        while (i < lines.length && lines[i].indent > indent) {
          const childLine = lines[i];
          const childText = childLine.text.trim();
          const childColon = childText.indexOf(":");
          if (childColon <= 0) break;
          const childKey = childText.slice(0, childColon).trim();
          const childValue = childText.slice(childColon + 1).trim();
          if (childValue) {
            obj[childKey] = scalar(childValue);
            i++;
          } else if (i + 1 < lines.length && lines[i + 1].indent > childLine.indent) {
            const [child, next] = parseBlock(lines, i + 1, lines[i + 1].indent);
            obj[childKey] = child;
            i = next;
          } else {
            obj[childKey] = null;
            i++;
          }
        }
        out.push(obj);
        continue;
      }

      out.push(scalar(rest));
      i++;
      continue;
    }

    const colon = text.indexOf(":");
    if (colon <= 0) throw new Error(`Expected "key: value" near: ${text}`);
    const key = text.slice(0, colon).trim();
    const value = text.slice(colon + 1).trim();

    if (value) {
      out[key] = scalar(value);
      i++;
    } else if (i + 1 < lines.length && lines[i + 1].indent > indent) {
      const [child, next] = parseBlock(lines, i + 1, lines[i + 1].indent);
      out[key] = child;
      i = next;
    } else {
      out[key] = null;
      i++;
    }
  }

  return [out, i];
}

export function parseYaml(input: string): unknown {
  const lines = cleanLines(input.trim());
  if (!lines.length) return {};
  return parseBlock(lines, 0, lines[0].indent)[0];
}

function quoteString(value: string) {
  if (!value || /[:#\-\{\}\[\],&*!|>'"%@`]/.test(value) || /^(true|false|null|~|-?\d+(?:\.\d+)?)$/i.test(value)) {
    return JSON.stringify(value);
  }
  return value;
}

function dump(value: unknown, indent = 0): string {
  const pad = " ".repeat(indent);
  if (Array.isArray(value)) {
    return value.map((item) => {
      if (item && typeof item === "object") {
        const nested = dump(item, indent + 2);
        const parts = nested.split("\n");
        return `${pad}- ${parts[0].trimStart()}${parts.length > 1 ? "\n" + parts.slice(1).join("\n") : ""}`;
      }
      return `${pad}- ${formatScalar(item)}`;
    }).join("\n");
  }

  if (value && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>).map(([key, item]) => {
      if (item && typeof item === "object") {
        return `${pad}${key}:\n${dump(item, indent + 2)}`;
      }
      return `${pad}${key}: ${formatScalar(item)}`;
    }).join("\n");
  }

  return `${pad}${formatScalar(value)}`;
}

function formatScalar(value: unknown): string {
  if (value === null) return "null";
  if (typeof value === "string") return quoteString(value);
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return JSON.stringify(value);
}

export function toYaml(value: unknown): string {
  return dump(value).trim();
}

export function formatYaml(input: string): string {
  return toYaml(parseYaml(input));
}
