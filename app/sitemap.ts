import type { MetadataRoute } from "next";

import { buildCombinedSitemap } from "@/lib/seo/sitemap-entries";

/**
 * Combined sitemap with hreflang alternates for both locales.
 * Locale-specific urlsets also live at /sitemap-en.xml and /sitemap-zh.xml.
 */
/** Phase 6 — required for `output: "export"`. */
export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return buildCombinedSitemap();
}
