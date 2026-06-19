import type { MetadataRoute } from "next";

import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.profile.name} — ${site.profile.role}`,
    short_name: site.profile.wordmark,
    description: site.hero.lead,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#17171c",
    icons: [
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
  };
}
