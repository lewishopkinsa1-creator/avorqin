import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { tools } from "@/lib/tools-data";
import { toolCategories } from "@/lib/tool-categories";
import type { ToolConfig } from "@/types";

interface ToolNavProps {
  currentSlug: string;
}

function getCategorySlugs(toolSlug: string): string[] {
  return toolCategories
    .filter((category) => category.toolSlugs.includes(toolSlug))
    .map((category) => category.slug);
}

function getRelatedTools(currentSlug: string): ToolConfig[] {
  const currentTool = tools.find((tool) => tool.slug === currentSlug);

  if (!currentTool) {
    return tools.slice(0, 6);
  }

  const currentCategories = getCategorySlugs(currentSlug);

  const rankedTools = tools
    .filter((tool) => tool.slug !== currentSlug)
    .map((tool) => {
      const toolCategories = getCategorySlugs(tool.slug);

      const sharedCategories = toolCategories.filter((categorySlug) =>
        currentCategories.includes(categorySlug)
      ).length;

      return {
        tool,
        score: sharedCategories,
      };
    })
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return a.tool.name.localeCompare(b.tool.name);
    });

  const categoryMatches = rankedTools
    .filter((item) => item.score > 0)
    .map((item) => item.tool);

  const fallbackTools = rankedTools
    .filter((item) => item.score === 0)
    .map((item) => item.tool);

  return [...categoryMatches, ...fallbackTools].slice(0, 6);
}

export function ToolNav({ currentSlug }: ToolNavProps) {
  const relatedTools = getRelatedTools(currentSlug);

  return (
    <section className="mx-auto mt-14 max-w-5xl border-t pt-10 md:mt-16">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Keep exploring
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Related tools
          </h2>
        </div>

        <Link
          href="/#tools"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Browse all tools →
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {relatedTools.map((tool) => {
          const Icon =
            (
              LucideIcons as unknown as Record<
                string,
                React.ComponentType<{ className?: string }>
              >
            )[tool.icon] || LucideIcons.Circle;

          return (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}/`}
              className="group rounded-xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Icon className="h-4 w-4" />
                </div>

                <div className="min-w-0">
                  <h3 className="font-semibold group-hover:underline">
                    {tool.name}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                    {tool.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}