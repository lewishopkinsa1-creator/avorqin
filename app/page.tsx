import Link from "next/link";
import { tools } from "@/lib/tools-data";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import * as LucideIcons from "lucide-react";

export default function HomePage() {
  return (
    <div className="container px-4 md:px-6 py-12 md:py-20">
      <section className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Free Developer Tools
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          A collection of fast, privacy-focused utilities for developers. 
          All tools run entirely in your browser—no data ever leaves your device.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight mb-8 text-center">
          All {tools.length} Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const Icon = (LucideIcons as Record<string, React.ComponentType<{ className?: string }>>)[tool.icon] || LucideIcons.Circle;
            return (
              <Link key={tool.slug} href={`/tools/${tool.slug}/`} className="group">
                <Card className="h-full transition-colors hover:border-primary/50 hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {tool.name}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      {tool.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold tracking-tight mb-4 text-center">
          Why Use Our Tools?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <h3 className="font-semibold">100% Private</h3>
            <p className="text-sm text-muted-foreground">
              All processing happens client-side. Your data never touches our servers.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Fast & Free</h3>
            <p className="text-sm text-muted-foreground">
              No registration, no ads, no delays. Just open and use.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Mobile Friendly</h3>
            <p className="text-sm text-muted-foreground">
              Every tool is designed to work perfectly on phones and tablets.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
