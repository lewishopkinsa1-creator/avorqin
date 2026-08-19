import Link from "next/link";
import { tools } from "@/lib/tools-data";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-3 text-lg font-semibold">Avorqin</h3>
            <p className="text-sm text-muted-foreground">
              Fast, practical browser-based utilities for developers and
              everyday technical tasks.
            </p>
          </div>

          <div>
            <h4 className="mb-3 font-medium">Tools</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {tools.slice(0, 6).map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/tools/${tool.slug}/`}
                    className="transition-colors hover:text-foreground"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-medium">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/privacy/"
                  className="transition-colors hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms/"
                  className="transition-colors hover:text-foreground"
                >
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Avorqin. Simple tools, done right.
        </div>
      </div>
    </footer>
  );
}