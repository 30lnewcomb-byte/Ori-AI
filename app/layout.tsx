import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://ori-ai.vercel.app"),
  title: {
    default: "Ori — Thoughtful technology, built to be useful",
    template: "%s — Ori"
  },
  description:
    "Explore Ori, an independent technology project building AI tools, developer experiences, and practical software.",
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
      </body>
    </html>
  );
}
