/**
 * Central site configuration.
 *
 * Set NEXT_PUBLIC_SITE_URL in your environment before building for production.
 * Example: NEXT_PUBLIC_SITE_URL=https://yourdomain.com
 *
 * During development, this falls back to http://localhost:3000.
 * The build will warn if the production variable is missing.
 */
export const SITE_URL = (() => {
  const env = process.env.NEXT_PUBLIC_SITE_URL;
  if (env) {
    // Strip trailing slash for consistency
    return env.replace(/\/$/, "");
  }
  if (process.env.NODE_ENV === "production") {
    // eslint-disable-next-line no-console
    console.warn(
      "[CONFIG WARNING] NEXT_PUBLIC_SITE_URL is not set. Canonical URLs, sitemap, and Open Graph will use localhost. Set this environment variable before deploying."
    );
  }
  return "http://localhost:3000";
})();
