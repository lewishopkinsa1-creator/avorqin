import Link from "next/link";

const screenDisplayTools = [
  {
    slug: "screen-resolution-calculator",
    name: "Screen Resolution Calculator",
    description: "Calculate total pixels and megapixels from screen width and height.",
  },
  {
    slug: "screen-ppi-calculator",
    name: "Screen PPI Calculator",
    description: "Calculate display pixel density from resolution and diagonal screen size.",
  },
  {
    slug: "aspect-ratio-calculator",
    name: "Aspect Ratio Calculator",
    description: "Calculate aspect ratios and proportional width or height dimensions.",
  },
  {
    slug: "image-dimensions-checker",
    name: "Image Dimensions Checker",
    description: "Check an image's pixel width, height, megapixels, and aspect ratio.",
  },
  {
    slug: "image-dpi-calculator",
    name: "Image DPI Calculator",
    description: "Calculate image DPI from pixel dimensions and physical print size.",
  },
] as const;

const screenDisplaySlugs = new Set<string>(
  screenDisplayTools.map((tool) => tool.slug),
);

export function ScreenDisplayLinks({ currentSlug }: { currentSlug: string }) {
  if (!screenDisplaySlugs.has(currentSlug)) {
    return null;
  }

  const related = screenDisplayTools.filter((tool) => tool.slug !== currentSlug);

  return (
    <section className="mt-10" aria-labelledby="related-screen-display-tools">
      <div className="rounded-xl border bg-card p-5 md:p-6">
        <h2
          id="related-screen-display-tools"
          className="text-xl font-bold tracking-tight"
        >
          Related screen &amp; display calculators
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Working with screen resolution, pixel density, aspect ratio, or image
          dimensions? These related tools help you move between the most common
          display and pixel measurements.
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
          Need another technical calculator?{" "}
          <Link
            href="/tools/calculators/"
            className="font-medium text-foreground underline underline-offset-4"
          >
            Browse developer calculators
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
