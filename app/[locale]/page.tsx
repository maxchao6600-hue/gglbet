import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getGameHref, getProviderHref } from "@/constants/routes";
import { DEFAULT_PROVIDER_LOGO_PATH } from "@/constants/provider-media";
import { isAppLocale, ZH_STRING_PLACEHOLDER } from "@/config/i18n";
import { HomePage } from "@/features/home/components/HomePage";
import { HOME_V2_MEDIA } from "@/features/home/home-v2-media";
import { getHomeUiCopy } from "@/features/home/home-ui-copy";
import { localizePath } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";
import { listGames } from "@/services/cms/games";
import { getHomePageContent } from "@/services/cms/home";
import { listNews } from "@/services/cms/news";
import { listPromotions } from "@/services/cms/promotions";
import { listProviders } from "@/services/cms/providers";
import { listGuides } from "@/services/cms/guides";
import type { Game, GameCategory } from "@/types/game";
import type { HomeCardItem, HomeMedia } from "@/types/home";

export const revalidate = 3600;

function isRenderableCopy(value: string | undefined | null): boolean {
  if (!value) return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  return !trimmed.includes(ZH_STRING_PLACEHOLDER);
}

type HomePageProps = {
  readonly params: Promise<{ locale: string }>;
};

const CATEGORY_LABELS: Record<GameCategory, string> = {
  slots: "Slots",
  "live-casino": "Live Casino",
  table: "Table",
  crash: "Crash",
  fishing: "Fishing",
  lottery: "Lottery",
  other: "Other",
};

const CATEGORY_LABELS_ZH: Record<GameCategory, string> = {
  slots: "老虎機",
  "live-casino": "真人娛樂",
  table: "桌遊",
  crash: "爆點",
  fishing: "捕魚",
  lottery: "彩票",
  other: "其他",
};

const CARD_TONES: readonly NonNullable<HomeMedia["tone"]>[] = [
  "brand",
  "secondary",
  "accent",
  "neutral",
];

function gameToHomeCard(
  game: Game,
  index: number,
  locale: "en" | "zh",
  providerLogoBySlug: ReadonlyMap<string, string>,
): HomeCardItem {
  const body = isRenderableCopy(game.shortDescription)
    ? game.shortDescription.slice(0, 140)
    : game.providerName;
  const thumb = game.thumbnail.url || game.coverImage.url;
  const detailsHref =
    game.canonicalPath || getGameHref(game.providerSlug, game.slug);

  return {
    title: game.gameName,
    body,
    href: detailsHref,
    meta:
      locale === "zh"
        ? CATEGORY_LABELS_ZH[game.category]
        : CATEGORY_LABELS[game.category],
    media: {
      label: game.gameName,
      alt: `${game.gameName} — ${game.providerName}`,
      tone: CARD_TONES[index % CARD_TONES.length],
      src: thumb || HOME_V2_MEDIA.trending,
      width: Math.min(game.thumbnail.width || 480, 640),
      height: Math.min(game.thumbnail.height || 300, 400),
    },
    providerName: game.providerName,
    providerLogoSrc:
      providerLogoBySlug.get(game.providerSlug) || DEFAULT_PROVIDER_LOGO_PATH,
    rtp: typeof game.rtp === "number" && game.rtp > 0 ? game.rtp : undefined,
    featured: game.featured,
    popular: game.popular,
    newGame: game.newGame,
    playHref: game.ctaPrimaryHref || detailsHref,
  };
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isAppLocale(localeParam)) notFound();
  const locale = localeParam;

  const [content, zhContent] = await Promise.all([
    getHomePageContent(locale),
    getHomePageContent("zh"),
  ]);

  return createPageMetadata({
    title: content.seo.title,
    description: content.seo.description,
    path: localizePath(content.seo.path, locale),
    locale,
    absoluteTitle: true,
    seoContent: content,
    zhContent,
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: content.seo.title,
      description: content.seo.description,
    },
  });
}

export default async function Page({ params }: HomePageProps) {
  const { locale: localeParam } = await params;
  if (!isAppLocale(localeParam)) notFound();
  const locale = localeParam;

  const [
    content,
    featuredPromotions,
    latestNews,
    featuredGames,
    popularGames,
    newestGames,
    providers,
    allProviders,
    guides,
  ] = await Promise.all([
    getHomePageContent(locale),
    listPromotions({ pageSize: 3, featured: true, sort: "popular", locale }),
    listNews({ pageSize: 3, sort: "newest", locale }),
    listGames({ pageSize: 4, featured: true, sort: "rating", locale }),
    listGames({ pageSize: 4, popular: true, sort: "popular", locale }),
    listGames({ pageSize: 4, newGame: true, sort: "newest", locale }),
    listProviders({ pageSize: 4, sort: "popular", locale }),
    listProviders({ pageSize: 200, sort: "name-asc", locale }),
    listGuides({ pageSize: 3, featured: true, sort: "popular", locale }),
  ]);

  const providerLogoBySlug = new Map<string, string>();
  for (const provider of allProviders.items) {
    providerLogoBySlug.set(
      provider.slug,
      provider.logo.url && provider.logo.url.length > 0
        ? provider.logo.url
        : DEFAULT_PROVIDER_LOGO_PATH,
    );
  }

  const trendingSource =
    featuredGames.items.length > 0 ? featuredGames.items : popularGames.items;
  const trendingItems = trendingSource
    .filter((game) => isRenderableCopy(game.gameName))
    .map((game, index) =>
      gameToHomeCard(game, index, locale, providerLogoBySlug),
    );
  const newItems = newestGames.items
    .filter((game) => isRenderableCopy(game.gameName))
    .map((game, index) =>
      gameToHomeCard(game, index, locale, providerLogoBySlug),
    );

  const providerItems: HomeCardItem[] = providers.items.slice(0, 4).map(
    (provider, index) => ({
      title: provider.name,
      body: provider.summary?.slice(0, 140) || provider.name,
      href: provider.canonicalPath || getProviderHref(provider.slug),
      featured: provider.featured,
      gameCount: provider.gameCount,
      media: {
        label: provider.name,
        alt: `${provider.name} logo`,
        tone: CARD_TONES[index % CARD_TONES.length],
        src:
          provider.logo.url && provider.logo.url.length > 0
            ? provider.logo.url
            : DEFAULT_PROVIDER_LOGO_PATH,
        width: provider.logo.width || 240,
        height: provider.logo.height || 144,
      },
    }),
  );

  const guideItems: HomeCardItem[] = guides.items
    .filter(
      (guide) =>
        isRenderableCopy(guide.title) &&
        isRenderableCopy(guide.excerpt || guide.title),
    )
    .slice(0, 3)
    .map((guide, index) => ({
      title: guide.title,
      body: (guide.excerpt || guide.title).slice(0, 140),
      href: guide.canonicalPath,
      meta: guide.category,
      media: {
        label: guide.title,
        alt: guide.title,
        tone: CARD_TONES[index % CARD_TONES.length],
        src:
          guide.coverImage?.url && guide.coverImage.url.length > 0
            ? guide.coverImage.url
            : HOME_V2_MEDIA.guides,
        width: guide.coverImage?.width || 1536,
        height: guide.coverImage?.height || 1024,
      },
    }));

  const winnerGames =
    trendingSource.length > 0
      ? trendingSource
      : newestGames.items.length > 0
        ? newestGames.items
        : popularGames.items;

  const patchedContent = {
    ...content,
    hero: {
      ...content.hero,
      media: {
        ...content.hero.media,
        src: content.hero.media.src || HOME_V2_MEDIA.hero,
        alt: content.hero.media.alt || content.hero.media.label,
      },
    },
    about: {
      ...content.about,
      media: {
        ...content.about.media,
        src: content.about.media.src || HOME_V2_MEDIA.about,
        alt: content.about.media.alt || content.about.media.label,
      },
    },
    whyChoose: {
      ...content.whyChoose,
      media: {
        ...content.whyChoose.media,
        src: content.whyChoose.media.src || HOME_V2_MEDIA.whyChoose,
        alt: content.whyChoose.media.alt || content.whyChoose.media.label,
      },
    },
    trustSecurity: {
      ...content.trustSecurity,
      media: {
        ...content.trustSecurity.media,
        src: content.trustSecurity.media.src || HOME_V2_MEDIA.trust,
        alt: content.trustSecurity.media.alt || content.trustSecurity.media.label,
      },
    },
    trendingGames: {
      ...content.trendingGames,
      media: {
        ...content.trendingGames.media,
        src: content.trendingGames.media.src || HOME_V2_MEDIA.trending,
      },
      items: trendingItems,
    },
    gameCategories: {
      ...content.gameCategories,
      media: {
        ...content.gameCategories.media,
        src: content.gameCategories.media.src || HOME_V2_MEDIA.categories,
      },
      items: content.gameCategories.items.map((item, index) => {
        const categoryArt = [
          HOME_V2_MEDIA.slots,
          HOME_V2_MEDIA.live,
          HOME_V2_MEDIA.sports,
          HOME_V2_MEDIA.fishing,
          HOME_V2_MEDIA.lottery,
        ] as const;
        return {
          ...item,
          media: {
            ...item.media,
            src: item.media.src || categoryArt[index] || HOME_V2_MEDIA.categories,
          },
        };
      }),
    },
    newGames: {
      ...content.newGames,
      items: newItems,
    },
    popularProviders: {
      ...content.popularProviders,
      media: {
        ...content.popularProviders.media,
        src: content.popularProviders.media.src || HOME_V2_MEDIA.providers,
      },
      items:
        providerItems.length > 0
          ? providerItems
          : content.popularProviders.items,
    },
    featuredPromotions: {
      ...content.featuredPromotions,
      media: {
        ...content.featuredPromotions.media,
        src: content.featuredPromotions.media.src || HOME_V2_MEDIA.promotions,
      },
    },
    casinoGuides: {
      ...content.casinoGuides,
      media: {
        ...content.casinoGuides.media,
        src: content.casinoGuides.media.src || HOME_V2_MEDIA.guides,
      },
      items: guideItems.length > 0 ? guideItems : content.casinoGuides.items,
    },
    latestNews: {
      ...content.latestNews,
      media: {
        ...content.latestNews.media,
        src: content.latestNews.media.src || HOME_V2_MEDIA.news,
      },
    },
    paymentMethods: {
      ...content.paymentMethods,
      media: {
        ...content.paymentMethods.media,
        src: content.paymentMethods.media.src || HOME_V2_MEDIA.payments,
      },
    },
    responsibleGaming: {
      ...content.responsibleGaming,
      media: {
        ...content.responsibleGaming.media,
        src: content.responsibleGaming.media.src || HOME_V2_MEDIA.responsible,
      },
    },
    faq: {
      ...content.faq,
      media: {
        ...content.faq.media,
        src: content.faq.media.src || HOME_V2_MEDIA.faq,
      },
    },
    finalCta: {
      ...content.finalCta,
      media: {
        ...content.finalCta.media,
        src: content.finalCta.media.src || HOME_V2_MEDIA.finalCta,
      },
    },
    latestWinners: {
      ...content.latestWinners,
      media: {
        ...content.latestWinners.media,
        src: content.latestWinners.media.src || HOME_V2_MEDIA.winners,
      },
      items: content.latestWinners.items.map((winner, index) => {
        const game = winnerGames[index % Math.max(winnerGames.length, 1)];
        if (!game) return winner;
        return {
          ...winner,
          game: game.gameName,
          category:
            locale === "zh"
              ? CATEGORY_LABELS_ZH[game.category]
              : CATEGORY_LABELS[game.category],
          media: {
            label: game.gameName,
            alt: game.gameName,
            src:
              game.thumbnail.url ||
              game.coverImage.url ||
              HOME_V2_MEDIA.winners,
            width: game.thumbnail.width || 320,
            height: game.thumbnail.height || 200,
            tone: CARD_TONES[index % CARD_TONES.length],
          },
        };
      }),
    },
  };

  return (
    <HomePage
      content={patchedContent}
      featuredPromotions={featuredPromotions.items}
      latestNews={latestNews.items}
      locale={locale}
      uiCopy={getHomeUiCopy(locale)}
    />
  );
}
