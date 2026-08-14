import Link from "next/link";
import { tools } from "@/lib/tools-data";
import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";

interface ToolNavProps {
  currentSlug: string;
}

export function ToolNav({ currentSlug }: ToolNavProps) {
  return (
    <div className="sticky top-24 space-y-4">
      <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
        All Tools
      </h3>

      <nav className="space-y-1" aria-label="Tool navigation">
        {tools.map((tool) => {
          const Icon =
            (
              LucideIcons as unknown as Record<
                string,
                React.ComponentType<{ className?: string }>
              >
            )[tool.icon] || LucideIcons.Circle;

          const isActive = tool.slug === currentSlug;

          return (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}/`}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="h-4 w-4" />
              {tool.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}