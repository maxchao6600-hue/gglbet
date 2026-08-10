import { SITE_NAME } from "@/config/site";
import { getGameHref } from "@/constants/routes";
import { buildContentBlockJsonLd } from "@/lib/content/seo-from-blocks";
import { buildCanonicalUrl, toAbsoluteUrl } from "@/lib/seo/canonical";
import { buildHowToJsonLd, compactJsonLd } from "@/lib/seo/json-ld";
import type { Game } from "@/types/game";
import type { BreadcrumbItem, JsonLd } from "@/types/seo";

export function buildGameItemListJsonLd(
  games: readonly { readonly gameName: string; readonly canonicalPath: string }[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${SITE_NAME} Games`,
    numberOfItems: games.length,
    itemListElement: games.map((game, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: buildCanonicalUrl(game.canonicalPath),
      name: game.gameName,
    })),
  };
}

export function buildGameImageObjectJsonLd(input: {
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

export function buildGameSoftwareApplicationJsonLd(game: Game): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": game.schema?.type ?? "SoftwareApplication",
    name: game.gameName,
    applicationCategory: game.schema?.applicationCategory ?? "Game",
    operatingSystem: game.supportedPlatforms.join(", "),
    description: game.metaDescription,
    url: buildCanonicalUrl(game.canonicalPath),
    image: toAbsoluteUrl(game.thumbnail.url || "/opengraph-image"),
    provider: {
      "@type": "Organization",
      name: game.providerName,
      url: buildCanonicalUrl(`/provider/${game.providerSlug}`),
    },
  };
}

export function buildGameEntityJsonLd(game: Game): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Game",
    name: game.gameName,
    description: game.shortDescription,
    url: buildCanonicalUrl(game.canonicalPath),
    genre: game.category,
    gamePlatform: game.supportedPlatforms,
    author: {
      "@type": "Organization",
      name: game.providerName,
    },
  };
}

/** Reserved for future CMS video assets. */
export function buildGameVideoObjectJsonLd(game: Game): JsonLd | null {
  if (!game.schema?.videoUrl) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: `${game.gameName} preview`,
    description: game.shortDescription,
    thumbnailUrl: toAbsoluteUrl(game.coverImage.url || "/opengraph-image"),
    contentUrl: game.schema.videoUrl,
    uploadDate: game.releaseDate ?? game.publishedAt ?? game.lastUpdated,
  };
}

export function buildGameWebPageJsonLd(game: Game): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: game.metaTitle,
    description: game.metaDescription,
    url: buildCanonicalUrl(game.canonicalPath),
    dateModified: game.lastUpdated,
    author: {
      "@type": "Person",
      name: game.author.name,
    },
    primaryImageOfPage: buildGameImageObjectJsonLd({
      url: game.coverImage.url || "/opengraph-image",
      alt: game.coverImage.alt,
      width: game.coverImage.width,
      height: game.coverImage.height,
    }),
    about: {
      "@type": "Game",
      name: game.gameName,
    },
  };
}

export function buildGameDetailJsonLd(input: {
  readonly game: Game;
  readonly breadcrumb: readonly BreadcrumbItem[];
  readonly relatedGames: readonly Game[];
}): readonly JsonLd[] {
  const { game, breadcrumb, relatedGames } = input;
  const video = buildGameVideoObjectJsonLd(game);

  return compactJsonLd([
    buildGameSoftwareApplicationJsonLd(game),
    buildGameEntityJsonLd(game),
    buildGameWebPageJsonLd(game),
    buildHowToJsonLd({
      name: `How to play ${game.gameName}`,
      description: game.shortDescription,
      path: game.canonicalPath,
      steps: game.howToPlay.map((text, index) => ({
        title: `Step ${index + 1}`,
        text,
      })),
    }),
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
    game.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: game.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null,
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${game.gameName} related games`,
      itemListElement: relatedGames.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.gameName,
        url: buildCanonicalUrl(getGameHref(item.providerSlug, item.slug)),
      })),
    },
    buildGameImageObjectJsonLd({
      url: game.thumbnail.url || "/icon",
      alt: game.thumbnail.alt,
      width: game.thumbnail.width,
      height: game.thumbnail.height,
    }),
    video,
    ...buildContentBlockJsonLd({
      blocks: game.content,
      path: game.canonicalPath,
      extraFaq: game.faq,
    }),
  ]);
}
