import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/shared/theme-toggle";

const primaryLinks = [
  { href: "/#tools", label: "All Tools" },
  { href: "/tools/calculators/", label: "Calculators" },
  { href: "/tools/finance/", label: "Finance" },
  { href: "/tools/pdf/", label: "PDF" },
  { href: "/tools/images/", label: "Images" },
  { href: "/tools/seo/", label: "SEO" },
];

const categoryLinks = [
  { href: "/tools/json/", label: "JSON & Data" },
  { href: "/tools/formatters/", label: "Formatters" },
  { href: "/tools/converters/", label: "Converters" },
  { href: "/tools/encode-decode/", label: "Encode & Decode" },
  { href: "/tools/generators/", label: "Generators" },
  { href: "/tools/web-code/", label: "Web & Code" },
  { href: "/tools/calculators/", label: "Calculators" },
  { href: "/tools/math/", label: "Math" },
  { href: "/tools/finance/", label: "Finance & Business" },
  { href: "/tools/date-time/", label: "Date & Time" },
  { href: "/tools/seo/", label: "SEO & Marketing" },
  { href: "/tools/colors/", label: "Color & Design" },
  { href: "/tools/pdf/", label: "PDF & Documents" },
  { href: "/tools/images/", label: "Images" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3"
            aria-label="Avorqin home"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-foreground font-bold text-background">
              A
            </div>

            <div className="leading-none">
              <div className="text-lg font-bold tracking-tight">
                Avorqin
              </div>

              <div className="hidden text-[11px] text-muted-foreground sm:block">
                Useful tools. Done.
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <nav
              className="hidden items-center gap-1 lg:flex"
              aria-label="Primary navigation"
            >
              {primaryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}

              <details className="group relative">
                <summary className="flex cursor-pointer list-none items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground [&::-webkit-details-marker]:hidden">
                  Categories
                  <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                </summary>

                <div className="absolute right-0 top-full mt-2 w-[560px] rounded-2xl border bg-background p-3 shadow-xl">
                  <div className="grid grid-cols-2 gap-1">
                    {categoryLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </details>
            </nav>

            <ThemeToggle />
          </div>
        </div>

        <nav
          className="flex gap-2 overflow-x-auto pb-3 lg:hidden"
          aria-label="Mobile navigation"
        >
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="shrink-0 rounded-lg border bg-background px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}

          {categoryLinks
            .filter(
              (link) =>
                !primaryLinks.some(
                  (primary) => primary.href === link.href
                )
            )
            .map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="shrink-0 rounded-lg border bg-background px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
        </nav>
      </div>
    </header>
  );
}