import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SkipLink } from "@/components/shared/skip-link";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { SITE_URL } from "@/lib/config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "DevTools — Free Online Developer Utilities",
    template: "%s — DevTools",
  },
  description:
    "A collection of free, fast, and privacy-focused developer tools. Format JSON, encode Base64, convert timestamps, and more. All processing happens in your browser.",
  keywords: [
    "developer tools",
    "online utilities",
    "json formatter",
    "base64 encoder",
    "url encoder",
    "timestamp converter",
  ],
  authors: [{ name: "DevTools" }],
  creator: "DevTools",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "DevTools",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen flex flex-col">
        <SkipLink />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
