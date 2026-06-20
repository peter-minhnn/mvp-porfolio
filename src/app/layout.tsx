import type { Metadata, Viewport } from "next";

import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";

import { SmoothScroll } from "@/components/smooth-scroll";
import { site } from "@/content/site";
import { SITE_URL } from "@/lib/site-url";

const { profile, hero } = site;
const fullTitle = `${profile.name} — ${profile.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: fullTitle,
    template: `%s — ${profile.name}`,
  },
  description: hero.lead,
  applicationName: profile.studio,
  authors: [{ name: profile.name, url: profile.github }],
  creator: profile.name,
  publisher: profile.name,
  keywords: [
    profile.name,
    "full-stack developer",
    "product engineer",
    "Next.js",
    "React",
    "TypeScript",
    "Supabase",
    "GSAP",
    "IELTS listening app",
    "developer tooling",
    "portfolio",
    "Ho Chi Minh City",
  ],
  category: "technology",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: profile.studio,
    title: fullTitle,
    description: hero.lead,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: fullTitle,
    description: hero.lead,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1013" },
  ],
};

/** Runs before paint: applies the saved theme (or system preference) to <html>
 * so there is no flash of the wrong theme on load. */
const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: SITE_URL,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  image: `${SITE_URL}/opengraph-image.png`,
  sameAs: [profile.github],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ho Chi Minh City",
    addressCountry: "VN",
  },
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Supabase",
    "GSAP",
    "Product engineering",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: fullTitle,
  url: SITE_URL,
  inLanguage: "en",
  author: { "@type": "Person", name: profile.name, url: SITE_URL },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="flex min-h-full flex-col overflow-x-clip">
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: trusted inline theme bootstrap, runs before paint to prevent FOUC */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <SmoothScroll />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:rounded-pill focus:bg-ink-900 focus:px-5 focus:py-2.5 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted, build-time structured data
          dangerouslySetInnerHTML={{ __html: JSON.stringify([personJsonLd, websiteJsonLd]) }}
        />
      </body>
    </html>
  );
}
