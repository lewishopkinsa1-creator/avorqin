import Link from "next/link";

const cssUnitTools = [
  {
    slug: "rem-to-px-converter",
    name: "REM to PX Converter",
    description: "Convert rem values to pixels using a chosen root font size.",
  },
  {
    slug: "px-to-rem-converter",
    name: "PX to REM Converter",
    description: "Convert pixel values to rem for responsive CSS sizing.",
  },
  {
    slug: "em-to-px-converter",
    name: "EM to PX Converter",
    description: "Convert em values to pixels using the relevant font size.",
  },
  {
    slug: "px-to-em-converter",
    name: "PX to EM Converter",
    description: "Convert pixel values to em for relative CSS sizing.",
  },
  {
    slug: "rem-to-em-converter",
    name: "REM to EM Converter",
    description: "Convert rem values to em when working across CSS contexts.",
  },
  {
    slug: "em-to-rem-converter",
    name: "EM to REM Converter",
    description: "Convert em values to rem for root-relative CSS sizing.",
  },
] as const;

const cssUnitSlugs = new Set<string>(cssUnitTools.map((tool) => tool.slug));

export function CssUnitLinks({ currentSlug }: { currentSlug: string }) {
  if (!cssUnitSlugs.has(currentSlug)) {
    return null;
  }

  const related = cssUnitTools.filter((tool) => tool.slug !== currentSlug);

  return (
    <section className="mt-10" aria-labelledby="related-css-unit-tools">
      <div className="rounded-xl border bg-card p-5 md:p-6">
        <h2
          id="related-css-unit-tools"
          className="text-xl font-bold tracking-tight"
        >
          Related CSS unit converters
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Working with relative CSS sizing? Use these related converters to move
          between pixels, rem, and em without doing the math manually.
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
          Need a different conversion?{" "}
          <Link
            href="/tools/converters/"
            className="font-medium text-foreground underline underline-offset-4"
          >
            Browse all developer converters
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
