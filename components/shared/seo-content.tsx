import { ToolConfig } from "@/types";

interface SEOContentProps {
  tool: ToolConfig;
}

export function SEOContent({ tool }: SEOContentProps) {
  const hasLongDescription =
    typeof tool.longDescription === "string" &&
    tool.longDescription.trim().length > 0;

  const hasHowToUse =
    Array.isArray(tool.howToUse) && tool.howToUse.length > 0;

  const hasFaq =
    Array.isArray(tool.faq) && tool.faq.length > 0;

  if (!hasLongDescription && !hasHowToUse && !hasFaq) {
    return null;
  }

  return (
    <section className="mx-auto mt-14 max-w-4xl md:mt-16">
      {hasLongDescription && (
        <div className="border-b pb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            About this tool
          </p>

          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            What is {tool.name}?
          </h2>

          <p className="mt-4 text-base leading-8 text-muted-foreground">
            {tool.longDescription}
          </p>
        </div>
      )}

      {hasHowToUse && (
        <div className="border-b py-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            How to use
          </p>

          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Get your result in a few steps
          </h2>

          <ol className="mt-7 grid gap-4 sm:grid-cols-2">
            {tool.howToUse!.map((step, index) => (
              <li
                key={`${tool.slug}-step-${index}`}
                className="flex gap-4 rounded-xl border bg-card p-5"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-bold text-background">
                  {index + 1}
                </div>

                <p className="pt-1 text-sm leading-6 text-muted-foreground">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>
      )}

      {hasFaq && (
        <div className="pt-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Frequently asked questions
          </p>

          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Questions about {tool.name}
          </h2>

          <div className="mt-7 divide-y rounded-xl border bg-card">
            {tool.faq!.map((item, index) => (
              <details
                key={`${tool.slug}-faq-${index}`}
                className="group px-5 py-1 sm:px-6"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-medium">
                  <span>{item.question}</span>

                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-muted-foreground transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>

                <p className="max-w-3xl pb-5 pr-8 text-sm leading-7 text-muted-foreground">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}