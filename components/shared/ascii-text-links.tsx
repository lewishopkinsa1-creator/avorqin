import Link from "next/link";

const asciiTextTools = [
  {
    slug: "ascii-to-text-converter",
    name: "ASCII to Text Converter",
    description: "Convert ASCII character codes into readable text.",
  },
  {
    slug: "text-to-ascii-converter",
    name: "Text to ASCII Converter",
    description: "Convert text characters into their ASCII code values.",
  },
  {
    slug: "text-to-hex-converter",
    name: "Text to Hex Converter",
    description: "Encode plain text as hexadecimal byte values.",
  },
  {
    slug: "hex-to-text-converter",
    name: "Hex to Text Converter",
    description: "Decode hexadecimal values back into readable text.",
  },
  {
    slug: "binary-to-text-converter",
    name: "Binary to Text Converter",
    description: "Decode binary byte values into readable text.",
  },
  {
    slug: "text-to-binary-converter",
    name: "Text to Binary Converter",
    description: "Convert text into binary byte values for encoding and debugging.",
  },
] as const;

const asciiTextSlugs = new Set<string>(
  asciiTextTools.map((tool) => tool.slug),
);

export function AsciiTextLinks({ currentSlug }: { currentSlug: string }) {
  if (!asciiTextSlugs.has(currentSlug)) {
    return null;
  }

  const related = asciiTextTools.filter((tool) => tool.slug !== currentSlug);

  return (
    <section className="mt-10" aria-labelledby="related-ascii-text-tools">
      <div className="rounded-xl border bg-card p-5 md:p-6">
        <h2
          id="related-ascii-text-tools"
          className="text-xl font-bold tracking-tight"
        >
          Related ASCII, hex &amp; binary converters
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Moving text between character codes and encoded byte formats? Use
          these related converters for ASCII, hexadecimal, binary, and plain
          text conversions.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {related.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}/`}
              className="group rounded-lg border p-4 transition-colors hover:bg-accent"
            >
              <span className="font-medium text-foreground group-hover:underline">
                {tool.name}
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                {tool.description}
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-5 text-sm text-muted-foreground">
          Need another encoding tool?{" "}
          <Link
            href="/tools/encode-decode/"
            className="font-medium text-foreground underline underline-offset-4"
          >
            Browse all encoding and decoding tools
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
