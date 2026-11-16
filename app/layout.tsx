import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Analytics } from "@vercel/analytics/react";
import { MotionEnhancer } from "@/components/motion-enhancer";

export const revalidate = 60;

export const metadata: Metadata = {
  title: {
    default: "Ori — Independent AI and software projects",
    template: "%s — Ori"
  },
  description: "Ori is a personal project with a chat workspace, a separate AI runtime, a developer workspace, and independent engineering work.",
  icons: { icon: "/ori-mark.svg" },
  openGraph: {
    title: "Ori — Independent AI and software projects",
    description: "Explore Ori's projects, their architecture, and current development status.",
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
        <MotionEnhancer />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
