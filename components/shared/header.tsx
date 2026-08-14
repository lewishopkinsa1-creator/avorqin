"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Wrench } from "lucide-react";
import { tools } from "@/lib/tools-data";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <Wrench className="h-5 w-5" aria-hidden="true" />
          <span>DevTools</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {tools.slice(0, 5).map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}/`}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {tool.name}
            </Link>
          ))}
          <Link
            href="/"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            All Tools
          </Link>
        </nav>

        <button
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container px-4 py-4 space-y-2">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}/`}
                className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                onClick={() => setMobileOpen(false)}
              >
                {tool.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
