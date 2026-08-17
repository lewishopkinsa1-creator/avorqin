import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCategoryTools,
  getToolCategory,
  toolCategories,
} from "@/lib/tool-categories";

type Props = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return toolCategories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getToolCategory(slug);

  if (!category) return {};

  const canonical = `https://avorqin.com/tools/${category.slug}/`;

  return {
    title: `${category.name} | Avorqin`,
    description: category.description,
    keywords: category.keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${category.name} | Avorqin`,
      description: category.description,
      url: canonical,
      type: "website",
      siteName: "Avorqin",
    },
  };
}

export default async function ToolCategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const category = getToolCategory(slug);

  if (!category) {
    notFound();
  }

  const categoryTools = getCategoryTools(category);
  const related = toolCategories.filter(
    (item) => item.slug !== category.slug
  );

  return (
    <main className="w-full">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center justify-center text-sm text-muted-foreground"
        >
          <Link
            href="/"
            className="transition-colors hover:text-foreground"
          >
            Home
          </Link>

          <span className="mx-2">/</span>

          <span>{category.name}</span>
        </nav>

        <section className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Avorqin Developer Tools
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {category.name}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            {category.intro}
          </p>

          <p className="mt-4 text-sm text-muted-foreground">
            {categoryTools.length} tools in this collection. No account
            required.
          </p>
        </section>

        <section className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categoryTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}/`}
              className="group flex h-full flex-col rounded-xl border bg-card p-6 text-left transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <h2 className="text-lg font-semibold group-hover:underline">
                {tool.name}
              </h2>

              <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                {tool.description}
              </p>

              <span className="mt-5 inline-block text-sm font-medium">
                Open tool →
              </span>
            </Link>
          ))}
        </section>

        <section className="mx-auto mt-16 max-w-4xl border-t pt-12 text-center">
          <h2 className="text-2xl font-semibold">
            Why use Avorqin?
          </h2>

          <p className="mx-auto mt-4 max-w-3xl leading-7 text-muted-foreground">
            Avorqin focuses on quick, focused utilities for common developer
            tasks. Tools in this collection are designed to be easy to open,
            use, and understand without unnecessary setup. Where a tool states
            that processing is local, its transformation runs in your browser.
          </p>
        </section>

        <section className="mx-auto mt-12 max-w-4xl text-center">
          <h2 className="text-2xl font-semibold">
            Explore other tool categories
          </h2>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/tools/${item.slug}/`}
                className="rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}