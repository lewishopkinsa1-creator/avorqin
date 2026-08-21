"use client";

import Link from "next/link";
import { useMemo, useState, type ComponentType } from "react";
import * as LucideIcons from "lucide-react";
import { ArrowRight, Search, X } from "lucide-react";
import type { ToolConfig } from "@/types";
import { toolCategories } from "@/lib/tool-categories";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CategoryId =
  | "all"
  | "json"
  | "formatters"
  | "converters"
  | "encode-decode"
  | "generators"
  | "web-code"
  | "calculators"
  | "colors"
  | "pdf"
  | "images";

type DiscoveryCategory = {
  id: Exclude<CategoryId, "all">;
  label: string;
  description: string;
  slugs: string[];
};

const categoryOrder: Array<{
  id: Exclude<CategoryId, "all">;
  label: string;
}> = [
  { id: "json", label: "JSON & Data" },
  { id: "formatters", label: "Formatters" },
  { id: "converters", label: "Converters" },
  { id: "encode-decode", label: "Encode & Decode" },
  { id: "generators", label: "Generators" },
  { id: "web-code", label: "Web & Code" },
  { id: "calculators", label: "Calculators" },
  { id: "colors", label: "Colors" },
  { id: "pdf", label: "PDF & Documents" },
  { id: "images", label: "Images" },
];

const categories: DiscoveryCategory[] = categoryOrder
  .map(({ id, label }) => {
    const source = toolCategories.find(
      (category) => category.slug === id
    );

    if (!source) {
      return null;
    }

    return {
      id,
      label,
      description: source.description,
      slugs: source.toolSlugs,
    };
  })
  .filter(
    (category): category is DiscoveryCategory =>
      category !== null
  );

const categoryTabs: Array<{
  id: CategoryId;
  label: string;
}> = [
  { id: "all", label: "All" },
  ...categories.map((category) => ({
    id: category.id,
    label: category.label,
  })),
];

function getToolCategoryIds(
  slug: string
): CategoryId[] {
  return categories
    .filter((category) =>
      category.slugs.includes(slug)
    )
    .map((category) => category.id);
}

function searchText(tool: ToolConfig): string {
  return [
    tool.name,
    tool.slug,
    tool.description,
    tool.longDescription,
    ...(tool.keywords ?? []),
  ]
    .join(" ")
    .toLowerCase();
}

function ToolCard({
  tool,
}: {
  tool: ToolConfig;
}) {
  const Icon =
    (
      LucideIcons as unknown as Record<
        string,
        ComponentType<{ className?: string }>
      >
    )[tool.icon] || LucideIcons.Circle;

  return (
    <Link
      href={`/tools/${tool.slug}/`}
      className="group"
    >
      <Card className="h-full transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-foreground group-hover:text-background">
              <Icon className="h-5 w-5" />
            </div>

            <CardTitle className="text-lg">
              {tool.name}
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent>
          <CardDescription className="text-sm leading-relaxed">
            {tool.description}
          </CardDescription>

          <div className="mt-5 flex items-center text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
            Open tool
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export function ToolDiscovery({
  tools,
}: {
  tools: ToolConfig[];
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] =
    useState<CategoryId>("all");

  const filteredTools = useMemo(() => {
    const normalizedQuery = query
      .trim()
      .toLowerCase();

    return tools.filter((tool) => {
      const categoryMatch =
        activeCategory === "all" ||
        getToolCategoryIds(tool.slug).includes(
          activeCategory
        );

      const queryMatch =
        !normalizedQuery ||
        searchText(tool).includes(
          normalizedQuery
        );

      return categoryMatch && queryMatch;
    });
  }, [activeCategory, query, tools]);

  const groupedTools = useMemo(() => {
    if (
      activeCategory !== "all" ||
      query.trim()
    ) {
      return [];
    }

    const assigned = new Set<string>();

    const groups = categories
      .map((category) => {
        const categoryTools = tools.filter(
          (tool) =>
            category.slugs.includes(
              tool.slug
            ) &&
            !assigned.has(tool.slug)
        );

        categoryTools.forEach((tool) =>
          assigned.add(tool.slug)
        );

        return {
          ...category,
          tools: categoryTools,
        };
      })
      .filter(
        (category) =>
          category.tools.length > 0
      );

    const uncategorized = tools.filter(
      (tool) => !assigned.has(tool.slug)
    );

    if (uncategorized.length > 0) {
      groups.push({
        id: "web-code",
        label: "More Developer Tools",
        description:
          "Additional utilities for everyday technical work.",
        slugs: uncategorized.map(
          (tool) => tool.slug
        ),
        tools: uncategorized,
      });
    }

    return groups;
  }, [activeCategory, query, tools]);

  const clearSearch = () => {
    setQuery("");
    setActiveCategory("all");
  };

  const activeCategoryLabel =
    categoryTabs.find(
      (category) =>
        category.id === activeCategory
    )?.label;

  return (
    <section
      id="tools"
      className="container scroll-mt-24 px-4 py-14 md:px-6 md:py-20"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Utility Library
        </p>

        <h2 className="text-3xl font-bold tracking-tight">
          Find the right tool
        </h2>

        <p className="mt-3 text-muted-foreground">
          Search all {tools.length} Avorqin
          tools or browse by category.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-3xl">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />

          <input
            type="search"
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
            placeholder={`Search ${tools.length} tools...`}
            aria-label="Search Avorqin tools"
            className="h-14 w-full rounded-xl border bg-background pl-12 pr-12 text-base shadow-sm outline-none transition focus:border-foreground/30 focus:ring-2 focus:ring-foreground/10"
          />

          {query && (
            <button
              type="button"
              onClick={() =>
                setQuery("")
              }
              className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div
          className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:flex-wrap md:justify-center md:px-0"
          aria-label="Tool categories"
        >
          {categoryTabs.map(
            (category) => {
              const isActive =
                activeCategory ===
                category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() =>
                    setActiveCategory(
                      category.id
                    )
                  }
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "border-foreground bg-foreground text-background"
                      : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {category.label}
                </button>
              );
            }
          )}
        </div>
      </div>

      {(query.trim() ||
        activeCategory !== "all") && (
        <div className="mt-10">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h3 className="text-2xl font-bold tracking-tight">
                {activeCategory ===
                "all"
                  ? "Search results"
                  : activeCategoryLabel}
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                {filteredTools.length}{" "}
                {filteredTools.length === 1
                  ? "tool"
                  : "tools"}{" "}
                found
                {query.trim()
                  ? ` for “${query.trim()}”`
                  : ""}
                .
              </p>
            </div>

            {(query ||
              activeCategory !==
                "all") && (
              <button
                type="button"
                onClick={clearSearch}
                className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Reset filters
              </button>
            )}
          </div>

          {filteredTools.length >
          0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTools.map(
                (tool) => (
                  <ToolCard
                    key={tool.slug}
                    tool={tool}
                  />
                )
              )}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed py-16 text-center">
              <Search className="mx-auto h-8 w-8 text-muted-foreground" />

              <h3 className="mt-4 font-semibold">
                No tools found
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Try another search or
                reset the category filter.
              </p>

              <button
                type="button"
                onClick={clearSearch}
                className="mt-4 rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
              >
                Show all tools
              </button>
            </div>
          )}
        </div>
      )}

      {!query.trim() &&
        activeCategory === "all" && (
          <div className="mt-14 space-y-14">
            {groupedTools.map(
              (group) => (
                <div
                  key={`${group.id}-${group.label}`}
                >
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold tracking-tight">
                      {group.label}
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {
                        group.description
                      }
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {group.tools.map(
                      (tool) => (
                        <ToolCard
                          key={
                            tool.slug
                          }
                          tool={tool}
                        />
                      )
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        )}
    </section>
  );
}