import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container px-4 md:px-6 py-24 text-center">
      <h1 className="text-6xl font-bold tracking-tight mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">
        This page does not exist. It may have been moved or deleted.
      </p>
      <Link
  href="/"
  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
>
  Return Home
</Link>
  );
}
