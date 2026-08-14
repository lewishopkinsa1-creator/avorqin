# DevTools

Free, privacy-focused developer utilities. All tools run in your browser.

## Prerequisites

- Node.js 20+
- npm

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | **Yes (production)** | Your production domain, e.g. `https://yourdomain.com` |

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open http://localhost:3000.

## Production Build

```bash
# Set your production URL first
export NEXT_PUBLIC_SITE_URL=https://yourdomain.com

npm run build
```

The static export is written to `dist/`.

## Deployment

Deploy the `dist/` folder to any static host:
- Vercel
- Cloudflare Pages
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

## Adding a New Tool

1. Add tool config to `lib/tools-data.ts`
2. Create utility in `lib/tool-utils/`
3. Create tool component in `components/tools/`
4. Create page at `app/tools/[slug]/page.tsx`
5. Run `npm run build` — sitemap and navigation update automatically
