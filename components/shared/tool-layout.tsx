import { ReactNode } from "react";
import { Metadata } from "next";
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
    title: `${tool.name} — DevTools`,
    description: tool.description,
    alternates: {
      canonical: `/tools/${tool.slug}/`,
    },
    openGraph: {
      title: tool.name,
      description: tool.description,
      type: "website",
      url: `/tools/${tool.slug}/`,
    },
    twitter: {
      card: "summary",
      title: tool.name,
      description: tool.description,
    },
  };
}

export function ToolLayout({ tool, children }: ToolLayoutProps) {
  const canonicalUrl = `${SITE_URL}/tools/${tool.slug}/`;

  return (
    <>
      <StructuredData tool={tool} url={canonicalUrl} />
      <div className="container px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <main className="lg:col-span-9">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
              {tool.name}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {tool.description}
            </p>
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              {children}
            </div>
            <SEOContent tool={tool} />
          </main>
          <aside className="lg:col-span-3">
            <ToolNav currentSlug={tool.slug} />
          </aside>
        </div>
      </div>
    </>
  );
}
