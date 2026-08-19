import Link from "next/link";
import { ThemeToggle } from "@/components/shared/theme-toggle";

const navLinks = [
  { href: "/tools/json-formatter/", label: "JSON" },
  { href: "/tools/base64-encoder/", label: "Base64" },
  { href: "/tools/url-encoder/", label: "URL" },
  { href: "/tools/timestamp-converter/", label: "Timestamp" },
  { href: "/tools/html-formatter/", label: "HTML" },
  { href: "/tools/css-formatter/", label: "CSS" },
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
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-foreground text-background font-bold">
              A
            </div>

            <div className="leading-none">
              <div className="text-lg font-bold tracking-tight">
                Avorqin
              </div>

              <div className="hidden text-[11px] text-muted-foreground sm:block">
                Simple tools. Done.
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <nav
              className="hidden items-center gap-1 md:flex"
              aria-label="Primary navigation"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/#tools"
                className="ml-1 rounded-lg border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                All Tools
              </Link>
            </nav>

            <ThemeToggle />
          </div>
        </div>

        <nav
          className="flex gap-1 overflow-x-auto pb-3 md:hidden"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="shrink-0 rounded-lg bg-muted px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/#tools"
            className="shrink-0 rounded-lg border px-3 py-2 text-sm font-medium"
          >
            All Tools
          </Link>
        </nav>
      </div>
    </header>
  );
}