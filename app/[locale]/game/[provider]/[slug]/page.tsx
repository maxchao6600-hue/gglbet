import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { APP_LOCALES, isAppLocale } from "@/config/i18n";
import { GameDetailPage } from "@/features/games/components/GameDetailPage";
import { localizePath } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";
import {
  getAllGameStaticParams,
  getGameByProviderAndSlug,
  listGames,
  listGamesByProvider,
  listRelatedGames,
} from "@/services/cms/games";
import { listGuidesBySlugs } from "@/services/cms/guides";
import {
  getProviderBySlug,
  getRelatedProviders,
} from "@/services/cms/providers";

/**
 * Phase 6 — static export safe.
 * `output: "export"` forbids an empty generateStaticParams().
 * Emit one sample HTML per locale so the hub build succeeds.
 * Full catalog / client shell + Pages 200 proxy = Phase 6B (not 16k×2 HTML).
 */
export const dynamic = "force-static";
export const dynamicParams = false;
export const revalidate = false;

type GamePageProps = {
  readonly params: Promise<{ locale: string; provider: string; slug: string }>;
};

export async function generateStaticParams() {
  const all = await getAllGameStaticParams();
  const sample = all[0];
  if (!sample) {
    throw new Error(
      "[Phase 6] No games in catalog — cannot satisfy output:export generateStaticParams",
    );
  }
  return APP_LOCALES.map((locale) => ({
    locale,
    provider: sample.provider,
    slug: sample.slug,
  }));
}

export async function generateMetadata({
  params,
}: GamePageProps): Promise<Metadata> {
  const { locale: localeParam, provider, slug } = await params;
  if (!isAppLocale(localeParam)) notFound();
  const locale = localeParam;

  const [game, zhGame] = await Promise.all([
    getGameByProviderAndSlug(provider, slug, locale),
    getGameByProviderAndSlug(provider, slug, "zh"),
  ]);

  if (!game) {
    notFound();
  }

  const image =
    game.coverImage.url.length > 0
      ? [
          {
            url: game.coverImage.url,
            width: game.coverImage.width,
            height: game.coverImage.height,
            alt: game.coverImage.alt,
          },
        ]
      : undefined;

  return createPageMetadata({
    title: game.metaTitle,
    description: game.metaDescription,
    path: localizePath(game.canonicalPath, locale),
    locale,
    absoluteTitle: true,
    seoContent: game,
    zhContent: zhGame,
    openGraph: {
      title: game.metaTitle,
      description: game.metaDescription,
      type: "website",
      images: image,
    },
    twitter: {
      card: "summary_large_image",
      title: game.metaTitle,
      description: game.metaDescription,
    },
    modifiedTime: game.lastUpdated,
  });
}

export default async function GamePage({ params }: GamePageProps) {
  const { locale: localeParam, provider: providerSlug, slug } = await params;
  if (!isAppLocale(localeParam)) notFound();
  const locale = localeParam;

  const game = await getGameByProviderAndSlug(providerSlug, slug, locale);

  if (!game) {
    notFound();
  }

  const [
    provider,
    relatedGames,
    sameProviderAll,
    sameCategory,
    relatedProviders,
    relatedGuides,
  ] = await Promise.all([
    getProviderBySlug(game.providerSlug, locale),
    listRelatedGames(game, 6, locale),
    listGamesByProvider(game.providerSlug, locale),
    listGames({
      category: game.category,
      pageSize: 6,
      sort: "popular",
      locale,
    }),
    getRelatedProviders(
      Array.from(
        new Set([game.providerSlug, ...game.relatedProviderSlugs]),
      ),
      locale,
    ),
    listGuidesBySlugs(game.relatedGuideSlugs, locale),
  ]);

  const sameProviderGames = sameProviderAll
    .filter((item) => item.slug !== game.slug)
    .slice(0, 6);

  const sameCategoryGames = sameCategory.items
    .filter((item) => item.slug !== game.slug)
    .slice(0, 6);

  return (
    <GameDetailPage
      game={game}
      provider={provider}
      relatedGames={relatedGames}
      sameProviderGames={sameProviderGames}
      sameCategoryGames={sameCategoryGames}
      relatedProviders={relatedProviders}
      relatedGuides={relatedGuides}
    />
  );
}
