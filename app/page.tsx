import Link from "next/link";
import { ArrowRight, ShieldCheck, Smartphone, Zap } from "lucide-react";
import { tools } from "@/lib/tools-data";
import { ToolDiscovery } from "@/components/home/tool-discovery";

export default function HomePage() {
  return (
    <main>
      <section className="border-b bg-gradient-to-b from-muted/40 to-background">
        <div className="container px-4 py-16 text-center md:px-6 md:py-24">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 inline-flex items-center rounded-full border bg-background px-3 py-1 text-sm text-muted-foreground shadow-sm">
              {tools.length} free browser-based utility tools
            </div>

            <h1 className="mx-auto w-full max-w-4xl text-center text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              <span className="block w-full text-center">
                Simple tools.
              </span>
              <span className="block w-full text-center text-muted-foreground">
                Done right.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground md:text-xl">
              Fast, free developer tools for formatting, encoding, validating,
              converting, and everyday technical tasks. No signup. No clutter.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#tools"
                className="inline-flex h-11 items-center justify-center rounded-md bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                Find a tool
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

      <ToolDiscovery tools={tools} />

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