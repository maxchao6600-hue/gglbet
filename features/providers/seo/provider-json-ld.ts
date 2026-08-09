import { SITE_NAME } from "@/config/site";
import { buildContentBlockJsonLd } from "@/lib/content/seo-from-blocks";
import { buildCanonicalUrl, toAbsoluteUrl } from "@/lib/seo/canonical";
import {
  buildHowToJsonLd,
  compactJsonLd,
} from "@/lib/seo/json-ld";
import type { Game } from "@/types/game";
import type { Provider } from "@/types/provider";
import type { BreadcrumbItem, JsonLd } from "@/types/seo";

export function buildProviderItemListJsonLd(
  providers: readonly Provider[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${SITE_NAME} Game Providers`,
    numberOfItems: providers.length,
    itemListElement: providers.map((provider, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: buildCanonicalUrl(provider.canonicalPath),
      name: provider.name,
    })),
  };
}

export function buildImageObjectJsonLd(input: {
  readonly url: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: toAbsoluteUrl(input.url || "/opengraph-image"),
    description: input.alt,
    width: input.width,
    height: input.height,
  };
}

export function buildProviderOrganizationJsonLd(provider: Provider): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": provider.schema?.type ?? "Organization",
    name: provider.name,
    alternateName: provider.shortName,
    url: buildCanonicalUrl(provider.canonicalPath),
    description: provider.metaDescription,
    foundingDate: provider.foundedYear
      ? String(provider.foundedYear)
      : undefined,
  };
}

export function buildProviderWebPageJsonLd(provider: Provider): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: provider.metaTitle,
    description: provider.metaDescription,
    url: buildCanonicalUrl(provider.canonicalPath),
    dateModified: provider.lastUpdated,
    author: {
      "@type": "Person",
      name: provider.author.name,
    },
    primaryImageOfPage: buildImageObjectJsonLd({
      url: provider.heroImage.url || "/opengraph-image",
      alt: provider.heroImage.alt,
      width: provider.heroImage.width,
      height: provider.heroImage.height,
    }),
    about: {
      "@type": "Organization",
      name: provider.name,
    },
  };
}

export function buildProviderDetailJsonLd(input: {
  readonly provider: Provider;
  readonly breadcrumb: readonly BreadcrumbItem[];
  readonly popularGames: readonly Game[];
}): readonly JsonLd[] {
  const { provider, breadcrumb, popularGames } = input;

  return compactJsonLd([
    buildProviderOrganizationJsonLd(provider),
    buildProviderWebPageJsonLd(provider),
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumb.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: buildCanonicalUrl(item.path),
      })),
    },
    provider.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: provider.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null,
    buildHowToJsonLd({
      name: `How to play ${provider.name} games`,
      description: provider.intro,
      path: provider.canonicalPath,
      steps: provider.howToPlay.map((text, index) => ({
        title: `Step ${index + 1}`,
        text,
      })),
    }),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${provider.name} popular games`,
      itemListElement: popularGames.map((game, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: game.gameName,
        url: buildCanonicalUrl(`/game/${game.providerSlug}/${game.slug}`),
      })),
    },
    buildImageObjectJsonLd({
      url: provider.logo.url || "/icon",
      alt: provider.logo.alt,
      width: provider.logo.width,
      height: provider.logo.height,
    }),
    ...buildContentBlockJsonLd({
      blocks: provider.content,
      path: provider.canonicalPath,
      extraFaq: provider.faq,
    }),
  ]);
}
