import type { Metadata } from "next";

import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";

import { SmoothScroll } from "@/components/smooth-scroll";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `${site.profile.studio} — ${site.profile.role}`,
  description: site.hero.lead,
  openGraph: {
    title: `${site.profile.studio} — from idea to shipped product in weeks`,
    description: site.hero.lead,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col overflow-x-clip">
        <SmoothScroll />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:rounded-pill focus:bg-primary focus:px-5 focus:py-2.5 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
