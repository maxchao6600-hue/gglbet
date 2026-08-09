import type { MetadataRoute } from "next";

import type { AppLocale } from "@/config/i18n";
import { HREFLANG } from "@/config/i18n";
import { getSiteUrl } from "@/config/site";
import {
  CONTENT_PATHS,
  ROUTES,
  getAuthorHref,
  getGameHref,
  getGuideCategoryHref,
  getGuideHref,
  getNewsCategoryHref,
  getNewsHref,
  getProviderHref,
  getPromotionHref,
} from "@/constants/routes";
import { localizePath } from "@/lib/i18n";
import { getAuthorSlugs } from "@/services/cms/eeat";
import { getAllGameStaticParams } from "@/services/cms/games";
import {
  getGuideCategorySlugs,
  getGuideStaticParams,
} from "@/services/cms/guides";
import {
  getNewsCategorySlugs,
  getNewsStaticParams,
} from "@/services/cms/news";
import { getPromotionStaticParams } from "@/services/cms/promotions";
import { getProviderSlugs } from "@/services/cms/providers";

const PUBLIC_PATHS = [
  ROUTES.home,
  CONTENT_PATHS.download,
  ROUTES.promotions,
  ROUTES.providers,
  ROUTES.games,
  ROUTES.guides,
  ROUTES.vip,
  ROUTES.referral,
  ROUTES.faq,
  ROUTES.support,
  ROUTES.news,
  ROUTES.payment,
  ROUTES.about,
  ROUTES.contact,
  ROUTES.responsibleGaming,
  ROUTES.privacyPolicy,
  ROUTES.terms,
  ROUTES.editorialPolicy,
  ROUTES.contentQuality,
  ROUTES.contentUpdates,
  ROUTES.team,
] as const;

function absoluteUrl(path: string): string {
  const siteUrl = getSiteUrl();
  return path === "/" ? `${siteUrl}/` : `${siteUrl}${path}`;
}

function languageAlternates(neutralPath: string): Record<string, string> {
  return {
    [HREFLANG.en]: absoluteUrl(localizePath(neutralPath, "en")),
    [HREFLANG.zh]: absoluteUrl(localizePath(neutralPath, "zh")),
  };
}

function priorityFor(path: string): number {
  if (path === "/") return 1;
  if (
    path === ROUTES.providers ||
    path === ROUTES.games ||
    path === ROUTES.guides
  ) {
    return 0.9;
  }
  return 0.8;
}

async function collectNeutralPaths(): Promise<
  readonly {
    readonly path: string;
    readonly changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    readonly priority: number;
  }[]
> {
  const [
    providerSlugs,
    gameParams,
    guideParams,
    guideCategories,
    newsParams,
    newsCategories,
    promotionParams,
    authorSlugs,
  ] = await Promise.all([
    getProviderSlugs(),
    getAllGameStaticParams(),
    getGuideStaticParams(),
    getGuideCategorySlugs(),
    getNewsStaticParams(),
    getNewsCategorySlugs(),
    getPromotionStaticParams(),
    getAuthorSlugs(),
  ]);

  return [
    ...PUBLIC_PATHS.map((path) => ({
      path,
      changeFrequency:
        path === "/"
          ? ("daily" as const)
          : ("weekly" as const),
      priority: priorityFor(path),
    })),
    ...authorSlugs.map((slug) => ({
      path: getAuthorHref(slug),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...providerSlugs.map((slug) => ({
      path: getProviderHref(slug),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...gameParams.map((item) => ({
      path: getGameHref(item.provider, item.slug),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...guideCategories.map((category) => ({
      path: getGuideCategoryHref(category),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...guideParams.map((item) => ({
      path: getGuideHref(item.category, item.slug),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...newsCategories.map((category) => ({
      path: getNewsCategoryHref(category),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...newsParams.map((item) => ({
      path: getNewsHref(item.category, item.slug),
      changeFrequency: "daily" as const,
      priority: 0.75,
    })),
    ...promotionParams.map((item) => ({
      path: getPromotionHref(item.slug),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
  ];
}

/** Combined bilingual sitemap entries with hreflang alternates. */
export async function buildCombinedSitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const paths = await collectNeutralPaths();

  return paths.map((entry) => ({
    url: absoluteUrl(localizePath(entry.path, "en")),
    lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
    alternates: {
      languages: languageAlternates(entry.path),
    },
  }));
}

/** Locale-specific urlset entries (no cross-locale alternates required). */
export async function buildLocaleSitemap(
  locale: AppLocale,
): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const paths = await collectNeutralPaths();

  return paths.map((entry) => ({
    url: absoluteUrl(localizePath(entry.path, locale)),
    lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
    alternates: {
      languages: languageAlternates(entry.path),
    },
  }));
}

export function renderUrlsetXml(entries: MetadataRoute.Sitemap): string {
  const urls = entries
    .map((entry) => {
      const lastmod =
        entry.lastModified instanceof Date
          ? entry.lastModified.toISOString()
          : entry.lastModified
            ? String(entry.lastModified)
            : undefined;

      const xhtmlLinks = entry.alternates?.languages
        ? Object.entries(entry.alternates.languages)
            .map(
              ([hreflang, href]) =>
                `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}" />`,
            )
            .join("\n")
        : "";

      return [
        "  <url>",
        `    <loc>${entry.url}</loc>`,
        lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
        entry.changeFrequency
          ? `    <changefreq>${entry.changeFrequency}</changefreq>`
          : null,
        entry.priority != null ? `    <priority>${entry.priority}</priority>` : null,
        xhtmlLinks || null,
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}
