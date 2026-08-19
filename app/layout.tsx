import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SkipLink } from "@/components/shared/skip-link";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { SITE_URL } from "@/lib/config";

const inter = Inter({ subsets: ["latin"] });

const themeScript = `
(function () {
  try {
    var savedTheme = localStorage.getItem("avorqin-theme");
    var systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var theme =
      savedTheme === "light" || savedTheme === "dark"
        ? savedTheme
        : systemDark
          ? "dark"
          : "light";

    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
  } catch (e) {}
})();
`;

export const metadata: Metadata = {
  title: {
    default: "Avorqin — Free Online Utility Tools",
    template: "%s — Avorqin",
  },
  description:
    "Fast, free browser-based tools for formatting, encoding, validating, converting, calculating, and everyday technical tasks. No signup. No clutter.",
  keywords: [
    "online tools",
    "developer tools",
    "utility tools",
    "json formatter",
    "base64 encoder",
    "url encoder",
    "timestamp converter",
    "online calculators",
  ],
  authors: [{ name: "Avorqin" }],
  creator: "Avorqin",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Avorqin",
    title: "Avorqin — Free Online Utility Tools",
    description:
      "Fast, free browser-based tools for formatting, encoding, validating, converting, calculating, and everyday technical tasks.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Avorqin — Free Online Utility Tools",
    description:
      "Fast, free browser-based tools for formatting, encoding, validating, converting, calculating, and everyday technical tasks.",
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
    <html
      lang="en"
      className={inter.className}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>

      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
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