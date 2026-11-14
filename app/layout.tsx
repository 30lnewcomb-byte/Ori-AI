import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { StatusNotice } from "@/components/status-notice";
import { SiteFooter } from "@/components/site-footer";
import { Analytics } from "@vercel/analytics/react";
import { MotionEnhancer } from "@/components/motion-enhancer";

export const revalidate = 60;

export const metadata: Metadata = {
  title: {
    default: "Ori — One idea. Many projects.",
    template: "%s — Ori"
  },
  description: "Ori is a personal technology project that grew from one question into AI systems, local experiments, developer tools, and independent software projects.",
  icons: { icon: "/ori-mark.svg" },
  openGraph: {
    title: "Ori — One idea. Many projects.",
    description: "A personal technology project, built through curiosity and experimentation.",
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
        <StatusNotice />
        <SiteHeader />
        <MotionEnhancer />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
