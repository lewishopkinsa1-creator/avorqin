export type XmlFormatResult = {
  formatted: string;
  error?: string;
};

function getParserError(document: Document): string | null {
  const parserError = document.querySelector("parsererror");

  if (!parserError) {
    return null;
  }

  const message = parserError.textContent?.trim();

  return message || "Invalid XML.";
}

function indentXml(xml: string, indentSize: number): string {
  const normalized = xml
    .replace(/>\s*</g, "><")
    .replace(/(>)(<)(\/*)/g, "$1\n$2$3");

  const lines = normalized.split("\n");
  const indent = " ".repeat(indentSize);
  let depth = 0;

  return lines
    .map((line) => {
      const trimmed = line.trim();

      if (/^<\//.test(trimmed)) {
        depth = Math.max(depth - 1, 0);
      }

      const current = `${indent.repeat(depth)}${trimmed}`;

      const isOpeningTag =
        /^<[^!?/][^>]*>$/.test(trimmed) &&
        !/\/>$/.test(trimmed) &&
        !/<\/[^>]+>$/.test(trimmed);

      if (isOpeningTag) {
        depth += 1;
      }

      return current;
    })
    .join("\n");
}

export function formatXml(
  input: string,
  indentSize = 2
): XmlFormatResult {
  const trimmed = input.trim();

  if (!trimmed) {
    return { formatted: "", error: "Paste XML to format." };
  }

  try {
    const parser = new DOMParser();
    const document = parser.parseFromString(trimmed, "application/xml");
    const parserError = getParserError(document);

    if (parserError) {
      return {
        formatted: "",
        error: parserError.replace(/\s+/g, " "),
      };
    }

    const serializer = new XMLSerializer();
    const serialized = serializer.serializeToString(document);

    return {
      formatted: indentXml(serialized, indentSize),
    };
  } catch {
    return {
      formatted: "",
      error: "Unable to format XML.",
    };
  }
}

export function minifyXml(input: string): XmlFormatResult {
  const trimmed = input.trim();

  if (!trimmed) {
    return { formatted: "", error: "Paste XML to minify." };
  }

  try {
    const parser = new DOMParser();
    const document = parser.parseFromString(trimmed, "application/xml");
    const parserError = getParserError(document);

    if (parserError) {
      return {
        formatted: "",
        error: parserError.replace(/\s+/g, " "),
      };
    }

    const serializer = new XMLSerializer();

    return {
      formatted: serializer
        .serializeToString(document)
        .replace(/>\s+</g, "><")
        .trim(),
    };
  } catch {
    return {
      formatted: "",
      error: "Unable to minify XML.",
    };
  }
}
