import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: {
    default: "Ori — Thoughtful technology, built to be useful",
    template: "%s — Ori"
  },
  description:
    "Explore Ori, an independent technology project building AI tools, developer experiences, and practical software.",
  icons: { icon: "/ori-mark.svg" },
  openGraph: {
    title: "Ori",
    description: "Thoughtful technology, built to be useful.",
    siteName: "Ori",
    type: "website"
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
