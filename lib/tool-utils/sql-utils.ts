const MULTI_WORD_KEYWORDS = [
  "LEFT OUTER JOIN",
  "RIGHT OUTER JOIN",
  "FULL OUTER JOIN",
  "LEFT JOIN",
  "RIGHT JOIN",
  "FULL JOIN",
  "INNER JOIN",
  "CROSS JOIN",
  "GROUP BY",
  "ORDER BY",
  "UNION ALL",
  "INSERT INTO",
  "DELETE FROM",
];

const LINE_KEYWORDS = [
  ...MULTI_WORD_KEYWORDS,
  "SELECT",
  "FROM",
  "WHERE",
  "HAVING",
  "LIMIT",
  "OFFSET",
  "VALUES",
  "SET",
  "UPDATE",
  "JOIN",
  "UNION",
  "EXCEPT",
  "INTERSECT",
];

const LOGICAL_KEYWORDS = ["AND", "OR"];

function protectStrings(sql: string) {
  const strings: string[] = [];
  const protectedSql = sql.replace(
    /'(?:''|[^'])*'|"(?:""|[^"])*"|`(?:``|[^`])*`|\[(?:[^\]])*\]/g,
    (match) => {
      const token = `__AVORQIN_SQL_STRING_${strings.length}__`;
      strings.push(match);
      return token;
    }
  );

  return { protectedSql, strings };
}

function restoreStrings(sql: string, strings: string[]) {
  return sql.replace(/__AVORQIN_SQL_STRING_(\d+)__/g, (_, index: string) => {
    return strings[Number(index)] ?? "";
  });
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function uppercaseKeywords(sql: string) {
  const keywords = [
    ...LINE_KEYWORDS,
    ...LOGICAL_KEYWORDS,
    "AS",
    "ON",
    "IN",
    "IS",
    "NOT",
    "NULL",
    "LIKE",
    "BETWEEN",
    "CASE",
    "WHEN",
    "THEN",
    "ELSE",
    "END",
    "ASC",
    "DESC",
    "DISTINCT",
    "CREATE",
    "TABLE",
    "ALTER",
    "DROP",
    "PRIMARY KEY",
    "FOREIGN KEY",
    "REFERENCES",
  ].sort((a, b) => b.length - a.length);

  let output = sql;

  for (const keyword of keywords) {
    const pattern = new RegExp(`\\b${escapeRegExp(keyword).replace(/\\ /g, "\\\\s+")}\\b`, "gi");
    output = output.replace(pattern, keyword);
  }

  return output;
}

export function formatSql(sql: string, indentSize: 2 | 4 = 2): string {
  const trimmed = sql.trim();

  if (!trimmed) {
    return "";
  }

  const { protectedSql, strings } = protectStrings(trimmed);

  let output = uppercaseKeywords(protectedSql)
    .replace(/\s+/g, " ")
    .replace(/\s*,\s*/g, ", ")
    .replace(/\s*;\s*/g, ";\n");

  const lineKeywords = [...LINE_KEYWORDS].sort((a, b) => b.length - a.length);

  for (const keyword of lineKeywords) {
    const pattern = new RegExp(
      `\\s+(${escapeRegExp(keyword).replace(/\\ /g, "\\\\s+")})\\s+`,
      "gi"
    );
    output = output.replace(pattern, "\n$1 ");
  }

  for (const keyword of LOGICAL_KEYWORDS) {
    const pattern = new RegExp(`\\s+(${keyword})\\s+`, "gi");
    output = output.replace(pattern, `\n${" ".repeat(indentSize)}$1 `);
  }

  output = output
    .split("\n")
    .map((line) => line.trimEnd())
    .filter((line, index, lines) => line.length > 0 || index === lines.length - 1)
    .join("\n")
    .replace(/\n{2,}/g, "\n")
    .trim();

  return restoreStrings(output, strings);
}

export function minifySql(sql: string): string {
  const trimmed = sql.trim();

  if (!trimmed) {
    return "";
  }

  const { protectedSql, strings } = protectStrings(trimmed);

  const output = protectedSql
    .replace(/--[^\n\r]*/g, " ")
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/\s+/g, " ")
    .replace(/\s*,\s*/g, ",")
    .replace(/\s*;\s*/g, ";")
    .trim();

  return restoreStrings(output, strings);
}
