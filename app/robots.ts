import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/config/site";

/** Phase 6 — required for `output: "export"`. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/login", "/register", "/zh/login", "/zh/register"],
      },
    ],
    sitemap: [
      `${siteUrl}/sitemap.xml`,
      `${siteUrl}/sitemap-en.xml`,
      `${siteUrl}/sitemap-zh.xml`,
      `${siteUrl}/news-sitemap.xml`,
      `${siteUrl}/image-sitemap.xml`,
    ],
    host: siteUrl,
  };
}
