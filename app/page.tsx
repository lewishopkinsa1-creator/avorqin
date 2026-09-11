import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Code2,
  FileText,
  Image,
  Palette,
  Search,
  ShieldCheck,
  Smartphone,
  Zap,
} from "lucide-react";
import { tools } from "@/lib/tools-data";
import { ToolDiscovery } from "@/components/home/tool-discovery";

const popularCategories = [
  {
    href: "/tools/calculators/",
    label: "Calculators",
    description: "Everyday and technical calculators",
    icon: Calculator,
  },
  {
    href: "/tools/finance/",
    label: "Finance & Business",
    description: "Loans, margins, ROI, salary, savings",
    icon: FileText,
  },
  {
    href: "/tools/pdf/",
    label: "PDF & Documents",
    description: "Convert, edit, inspect, and create PDFs",
    icon: FileText,
  },
  {
    href: "/tools/images/",
    label: "Images",
    description: "Resize, compress, convert, and inspect",
    icon: Image,
  },
  {
    href: "/tools/seo/",
    label: "SEO & Marketing",
    description: "Metadata, sitemaps, schema, and audits",
    icon: Search,
  },
  {
    href: "/tools/colors/",
    label: "Color & Design",
    description: "Convert colors, build palettes, check contrast",
    icon: Palette,
  },
];

export default function HomePage() {
  return (
    <>
      <section className="border-b bg-gradient-to-b from-muted/40 via-background to-background">
        <div className="container mx-auto px-4 py-12 md:px-6 md:py-16 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <div>
              <div className="mb-5 inline-flex items-center rounded-full border bg-background px-3 py-1 text-sm text-muted-foreground shadow-sm">
                1,000+ free browser-based tools
              </div>

              <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                1,000+ free online tools.
                <span className="mt-1 block text-muted-foreground">
                  One clean place.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                Calculators, finance tools, PDFs, images, SEO, data,
                converters, developer utilities, design tools, and more.
                No signup. No clutter.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#tools"
                  className="inline-flex h-11 items-center justify-center rounded-md bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
                >
                  Browse all tools
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>

                <Link
                  href="/tools/calculators/"
                  className="inline-flex h-11 items-center justify-center rounded-md border bg-background px-5 text-sm font-medium transition-colors hover:bg-muted"
                >
                  Explore calculators
                </Link>
              </div>

              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4" />
                  Privacy focused
                </span>

                <span className="flex items-center gap-1.5">
                  <Zap className="h-4 w-4" />
                  Instant results
                </span>

                <span className="flex items-center gap-1.5">
                  <Smartphone className="h-4 w-4" />
                  Mobile friendly
                </span>
              </div>
            </div>

            <div className="rounded-2xl border bg-background/80 p-4 shadow-sm backdrop-blur sm:p-5">
              <div className="mb-4 flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold">
                    Popular categories
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Jump straight to the tools you need.
                  </p>
                </div>

                <a
                  href="#tools"
                  className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline"
                >
                  See all
                </a>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {popularCategories.map((category) => {
                  const Icon = category.icon;

                  return (
                    <Link
                      key={category.href}
                      href={category.href}
                      className="group rounded-xl border p-3.5 transition-colors hover:bg-muted/60"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border bg-muted/30">
                          <Icon className="h-4 w-4" />
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-1 font-medium">
                            <span>{category.label}</span>
                            <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                          </div>

                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                            {category.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <Link
                href="/tools/web-code/"
                className="mt-3 flex items-center justify-between rounded-xl border bg-muted/20 px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
              >
                <span className="flex items-center gap-2">
                  <Code2 className="h-4 w-4" />
                  Developer & web tools
                </span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ToolDiscovery tools={tools} />

      <section className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-16 md:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight">
                Built to stay out of your way
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                Avorqin focuses on useful tools that load quickly, work
                immediately, and don&apos;t make simple tasks complicated.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
              <div className="space-y-3">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl border bg-background">
                  <ShieldCheck className="h-5 w-5" />
                </div>

                <h3 className="font-semibold">Privacy focused</h3>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  Tool processing happens locally in your browser whenever
                  possible.
                </p>
              </div>

              <div className="space-y-3">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl border bg-background">
                  <Zap className="h-5 w-5" />
                </div>

                <h3 className="font-semibold">Fast by design</h3>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  No registration flow or unnecessary steps between you and the
                  result.
                </p>
              </div>

              <div className="space-y-3">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl border bg-background">
                  <Smartphone className="h-5 w-5" />
                </div>

                <h3 className="font-semibold">Works everywhere</h3>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  Responsive interfaces designed for desktop, tablet, and
                  mobile use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}