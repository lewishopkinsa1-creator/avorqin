import { ToolConfig } from "@/types";

interface SEOContentProps {
  tool: ToolConfig;
}

export function SEOContent({ tool }: SEOContentProps) {
  return (
    <div className="mt-12 space-y-10">
      <section>
        <h2 className="text-2xl font-bold tracking-tight mb-4">
          About {tool.name}
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {tool.longDescription}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight mb-4">
          How to Use {tool.name}
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          {tool.howToUse.map((step, i) => (
            <li key={i} className="leading-relaxed">
              {step}
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {tool.faq.map((item, i) => (
            <details
              key={i}
              className="group rounded-lg border bg-card p-4"
            >
              <summary className="flex cursor-pointer items-center justify-between font-medium text-foreground">
                {item.question}
                <span className="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                    className="h-4 w-4"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
