import Link from "next/link";
import { tools } from "@/lib/tools-data";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">DevTools</h3>
            <p className="text-sm text-muted-foreground">
              Free, fast, and privacy-focused developer utilities. All tools run in your browser—no data is sent to any server.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-3">Tools</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {tools.slice(0, 6).map((tool) => (
                <li key={tool.slug}>
                  <Link href={`/tools/${tool.slug}/`} className="hover:text-foreground transition-colors">
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy/" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms/" className="hover:text-foreground transition-colors">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} DevTools. All processing happens client-side.
        </div>
      </div>
    </footer>
  );
}
