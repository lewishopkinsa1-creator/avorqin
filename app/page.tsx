import Link from "next/link";
import type { ComponentType } from "react";
import { tools } from "@/lib/tools-data";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import * as LucideIcons from "lucide-react";
import { ArrowRight, ShieldCheck, Zap, Smartphone } from "lucide-react";

export default function HomePage() {
  return (
    <main>
      <section className="border-b bg-gradient-to-b from-muted/40 to-background">
        <div className="container px-4 py-20 text-center md:px-6 md:py-28">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 inline-flex items-center rounded-full border bg-background px-3 py-1 text-sm text-muted-foreground shadow-sm">
              Free browser-based utility tools
            </div>

            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              Simple tools.
              <br />
              <span className="text-muted-foreground">Done right.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Fast, free developer tools for formatting, encoding, validating,
              converting, and everyday technical tasks. No signup. No clutter.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#tools"
                className="inline-flex h-11 items-center justify-center rounded-md bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                Browse all tools
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>

              <Link
                href="/tools/json-formatter/"
                className="inline-flex h-11 items-center justify-center rounded-md border bg-background px-5 text-sm font-medium transition-colors hover:bg-muted"
              >
                Try JSON Formatter
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
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
        </div>
      </section>

      <section
        id="tools"
        className="container scroll-mt-24 px-4 py-16 md:px-6 md:py-20"
      >
        <div className="mb-10 flex flex-col items-center text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Utility Library
          </p>

          <h2 className="text-3xl font-bold tracking-tight">
            All {tools.length} Tools
          </h2>

          <p className="mt-3 max-w-xl text-muted-foreground">
            Pick a tool and get the job done. Everything runs directly in your
            browser.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => {
            const Icon =
              (
                LucideIcons as unknown as Record<
                  string,
                  ComponentType<{ className?: string }>
                >
              )[tool.icon] || LucideIcons.Circle;

            return (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}/`}
                className="group"
              >
                <Card className="h-full transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-foreground group-hover:text-background">
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

                    <div className="mt-5 flex items-center text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100">
                      Open tool
                      <ArrowRight className="ml-1.5 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-t bg-muted/30">
        <div className="container px-4 py-16 md:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight">
                Built to stay out of your way
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                Avorqin focuses on useful tools that load quickly, work
                immediately, and don't make simple tasks complicated.
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
    </main>
  );
}