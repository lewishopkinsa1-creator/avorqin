import { ReactNode } from "react";
import { Metadata } from "next";
import { ShieldCheck, Sparkles, Zap } from "lucide-react";
import { ToolConfig } from "@/types";
import { SITE_URL } from "@/lib/config";
import { SEOContent } from "./seo-content";
import { StructuredData } from "./structured-data";
import { ToolNav } from "./tool-nav";

interface ToolLayoutProps {
  tool: ToolConfig;
  children: ReactNode;
}

export function generateToolMetadata(tool: ToolConfig): Metadata {
  return {
    title: tool.name,
    description: tool.description,
    alternates: {
      canonical: `/tools/${tool.slug}/`,
    },
    openGraph: {
      title: `${tool.name} — Avorqin`,
      description: tool.description,
      type: "website",
      url: `/tools/${tool.slug}/`,
    },
    twitter: {
      card: "summary",
      title: `${tool.name} — Avorqin`,
      description: tool.description,
    },
  };
}

export function ToolLayout({ tool, children }: ToolLayoutProps) {
  const canonicalUrl = `${SITE_URL}/tools/${tool.slug}/`;

  return (
    <>
      <StructuredData tool={tool} url={canonicalUrl} />

      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto max-w-6xl">
          <header className="mx-auto mb-8 max-w-3xl text-center md:mb-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Free browser-based utility
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {tool.name}
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              {tool.description}
            </p>
          </header>

          <section
            className="overflow-hidden rounded-2xl border bg-card shadow-sm"
            aria-label={`${tool.name} tool`}
          >
            <div className="p-4 sm:p-6 md:p-8">{children}</div>
          </section>

          <div className="mx-auto mt-5 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck
                className="h-4 w-4"
                aria-hidden="true"
              />
              <span>Privacy focused</span>
            </div>

            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4" aria-hidden="true" />
              <span>Instant results</span>
            </div>

            <div className="flex items-center gap-2">
              <span
                className="flex h-4 w-4 items-center justify-center rounded-full border text-[10px] font-bold"
                aria-hidden="true"
              >
                ✓
              </span>
              <span>No signup required</span>
            </div>
          </div>

          <SEOContent tool={tool} />

          <ToolNav currentSlug={tool.slug} />
        </div>
      </div>
    </>
  );
}