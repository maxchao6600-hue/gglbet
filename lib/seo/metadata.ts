import type { Metadata } from "next";

import {
  DEFAULT_LOCALE,
  HREFLANG,
  OG_LOCALE,
  type AppLocale,
} from "@/config/i18n";
import { DEFAULT_OG_IMAGE_PATH, SITE_LOCALE, SITE_NAME } from "@/config/site";
import { SEO_DEFAULTS } from "@/config/seo";
import { getAlternateLanguages, localizePath } from "@/lib/i18n";
import { buildCanonicalUrl, toAbsoluteUrl } from "@/lib/seo/canonical";
import { resolveLocaleSeoPolicy } from "@/lib/seo/locale-readiness";
import type { PageMetadataInput, SeoRobotsDirective } from "@/types/seo";

function mapRobots(robots?: SeoRobotsDirective): Metadata["robots"] {
  if (!robots) {
    return {
      index: true,
      follow: true,
    };
  }

  return {
    index: robots.index ?? true,
    follow: robots.follow ?? true,
    noarchive: robots.noarchive,
    nosnippet: robots.nosnippet,
    noimageindex: robots.noimageindex,
  };
}

function absoluteLanguageAlternates(
  path: string,
  locales: readonly AppLocale[],
): Record<string, string> {
  const relative = getAlternateLanguages(path);
  const languages: Record<string, string> = {};

  if (locales.includes("en")) {
    languages[HREFLANG.en] = buildCanonicalUrl(
      relative[HREFLANG.en] ?? localizePath(path, "en"),
    );
  }

  if (locales.includes("zh")) {
    languages[HREFLANG.zh] = buildCanonicalUrl(
      relative[HREFLANG.zh] ?? localizePath(path, "zh"),
    );
  }

  languages["x-default"] = buildCanonicalUrl(
    relative["x-default"] ?? localizePath(path, DEFAULT_LOCALE),
  );

  return languages;
}

function resolveOgLocale(locale?: AppLocale): string {
  if (locale) return OG_LOCALE[locale];
  return SITE_LOCALE || OG_LOCALE[DEFAULT_LOCALE];
}

function absolutizeOgImages(
  images: NonNullable<PageMetadataInput["openGraph"]>["images"],
): NonNullable<Metadata["openGraph"]>["images"] {
  if (!images || images.length === 0) {
    return [
      {
        url: toAbsoluteUrl(DEFAULT_OG_IMAGE_PATH),
        width: 1200,
        height: 630,
      },
    ];
  }

  return images.map((image) => ({
    ...image,
    url: toAbsoluteUrl(image.url, DEFAULT_OG_IMAGE_PATH),
  }));
}

export function createPageMetadata(input: PageMetadataInput): Metadata {
  const hasContentSignals =
    input.seoContent !== undefined ||
    input.zhContent !== undefined ||
    input.locale === "zh";

  const policy = hasContentSignals
    ? resolveLocaleSeoPolicy({
        locale: input.locale ?? DEFAULT_LOCALE,
        content:
          input.seoContent ?? {
            title: input.title,
            description: input.description,
          },
        zhContent: input.zhContent,
      })
    : {
        // Without locale content signals, do not advertise zh-Hant.
        indexable: true,
        hreflangLocales: ["en"] as const,
      };

  const hreflangLocales = input.hreflangLocales ?? policy.hreflangLocales;

  const robotsDirective: SeoRobotsDirective | undefined = !policy.indexable
    ? {
        ...(input.robots ?? {}),
        index: false,
        follow: input.robots?.follow ?? true,
      }
    : input.robots;

  const canonical = input.alternates?.canonical ?? buildCanonicalUrl(input.path);
  const ogTitle = input.openGraph?.title ?? input.title;
  const ogDescription = input.openGraph?.description ?? input.description;
  const ogUrl = input.openGraph?.url ?? canonical;
  const ogImageInputs =
    input.openGraph?.images ??
    ([
      {
        url: DEFAULT_OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — ${input.title}`,
      },
    ] as const);

  const ogImages = absolutizeOgImages(ogImageInputs);

  const twitterImages =
    input.twitter?.images?.map((url) => toAbsoluteUrl(url)) ??
    ogImageInputs.map((image) => toAbsoluteUrl(image.url));

  const languages =
    input.alternates?.languages === null
      ? undefined
      : (input.alternates?.languages ??
        absoluteLanguageAlternates(input.path, hreflangLocales));

  return {
    title: input.absoluteTitle
      ? { absolute: input.title }
      : input.title,
    description: input.description,
    keywords: input.keywords ? [...input.keywords] : [...SEO_DEFAULTS.keywords],
    robots: mapRobots(robotsDirective),
    alternates: {
      canonical,
      ...(languages ? { languages } : {}),
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: ogUrl,
      siteName: SITE_NAME,
      locale: resolveOgLocale(input.locale),
      type: input.openGraph?.type ?? "website",
      images: ogImages,
      ...(input.publishedTime ? { publishedTime: input.publishedTime } : {}),
      ...(input.modifiedTime ? { modifiedTime: input.modifiedTime } : {}),
    },
    twitter: {
      card: input.twitter?.card ?? "summary_large_image",
      title: input.twitter?.title ?? ogTitle,
      description: input.twitter?.description ?? ogDescription,
      site: SEO_DEFAULTS.twitterHandle,
      creator: SEO_DEFAULTS.twitterHandle,
      images: [...twitterImages],
    },
  };
}

export function createRootMetadata(): Metadata {
  const metadataBase = new URL(buildCanonicalUrl("/"));

  return {
    metadataBase,
    title: {
      default: SEO_DEFAULTS.title,
      template: SEO_DEFAULTS.titleTemplate,
    },
    description: SEO_DEFAULTS.description,
    applicationName: SITE_NAME,
    keywords: [...SEO_DEFAULTS.keywords],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
      shortcut: ["/favicon.ico"],
    },
    manifest: "/site.webmanifest",
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      title: SEO_DEFAULTS.title,
      description: SEO_DEFAULTS.description,
      url: buildCanonicalUrl("/"),
      images: [
        {
          url: toAbsoluteUrl(DEFAULT_OG_IMAGE_PATH),
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: SEO_DEFAULTS.title,
      description: SEO_DEFAULTS.description,
      site: SEO_DEFAULTS.twitterHandle,
      creator: SEO_DEFAULTS.twitterHandle,
      images: [toAbsoluteUrl(DEFAULT_OG_IMAGE_PATH)],
    },
    alternates: {
      canonical: buildCanonicalUrl("/"),
      languages: absoluteLanguageAlternates("/", ["en", "zh"]),
    },
  };
}
