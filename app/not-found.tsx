import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container px-4 md:px-6 py-24 text-center">
      <h1 className="text-6xl font-bold tracking-tight mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">
        This page does not exist. It may have been moved or deleted.
      </p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
