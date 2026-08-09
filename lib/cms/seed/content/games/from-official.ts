import { ROUTES, getGameHref } from "@/constants/routes";
import { isFeaturedSeoGame } from "@/lib/cms/seed/content/games/featured-seo-flags";
import {
  loadOfficialGamesSnapshot,
  type OfficialGameRecord,
} from "@/lib/cms/seed/content/games/load-official-games";
import officialProviders from "@/lib/cms/seed/content/providers/official/gglbet5-providers.json";
import type { CmsImage } from "@/types/cms";
import type { ContentBlock } from "@/types/content";
import type { Game, GameCategory } from "@/types/game";

export type { OfficialGameRecord } from "@/lib/cms/seed/content/games/load-official-games";

const IMAGE_CDN = "https://cmsbetconstruct.com";
const VERIFIED_DATE = "2026-08-06T00:00:00.000Z";
const SOURCE_SITE = "https://www.gglbet5.com";

const AUTHOR = {
  id: "author-gglbet-editorial",
  name: "GGLBET Editorial",
  slug: "gglbet-editorial",
  bio: "Catalog editors documenting official gglbet5.com game listings on GGLBET.",
} as const;

/**
 * Official BetConstruct typeId → CMS category.
 * Source enum from gglbet5.com app bundle (xo game-type map).
 */
const TYPE_ID_CATEGORY: Record<number, GameCategory> = {
  1: "live-casino", // LiveGames
  2: "other", // VirtualGames
  3: "other", // SkillGames
  4: "other", // BettingGames
  5: "other", // PoolBettingGames
  6: "slots", // Slots
  7: "table", // TableGames
  9: "table", // VideoPoker
  10: "table", // Poker
  11: "other", // Fantasy
  12: "lottery", // LotteryGames
  13: "lottery", // VideoBingo
  14: "other", // ScratchcardGames
  15: "fishing", // FishingGames
  16: "other", // Interactive
  17: "other", // ArcadeGames
  18: "other", // Casual
  19: "other", // DiceGames
  20: "other", // Solitaire
  21: "other", // Promotions
  22: "other", // Sportsbook
};

const TYPE_ID_LABEL: Record<number, string> = {
  1: "Live Games",
  2: "Virtual Games",
  3: "Skill Games",
  4: "Betting Games",
  5: "Pool Betting",
  6: "Slots",
  7: "Table Games",
  9: "Video Poker",
  10: "Poker",
  11: "Fantasy",
  12: "Lottery",
  13: "Video Bingo",
  14: "Scratchcard",
  15: "Fishing",
  16: "Interactive",
  17: "Arcade",
  18: "Casual",
  19: "Dice",
  20: "Solitaire",
  21: "Promotions",
  22: "Sportsbook",
};

type ProviderRef = {
  readonly code: string;
  readonly title: string;
  readonly slug: string;
};

/**
 * Compact catalog Game seed. Long-form Featured SEO is attached on demand
 * via `enrichOfficialGameSeedForDetail` so the Worker bundle stays small.
 */
export type OfficialGameSeedInput = Omit<
  Game,
  | "tableOfContents"
  | "readingTimeMinutes"
  | "factChecked"
  | "publishDate"
  | "content"
> & {
  readonly content: readonly ContentBlock[];
  readonly officialId: number;
};

function absoluteImageUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${IMAGE_CDN}${normalized}`;
}

function buildImage(
  id: string,
  path: string | null,
  alt: string,
  width: number,
  height: number,
): CmsImage {
  const url = absoluteImageUrl(path);
  if (!url) {
    return {
      id,
      url: "",
      alt,
      width,
      height,
      placeholderTone: "brand",
    };
  }
  return { id, url, alt, width, height };
}

function mapCategory(typeId: number | null): GameCategory {
  if (typeId == null) return "other";
  return TYPE_ID_CATEGORY[typeId] ?? "other";
}

function typeLabel(typeId: number | null): string | null {
  if (typeId == null) return null;
  return TYPE_ID_LABEL[typeId] ?? null;
}

function buildProviderIndex(): ReadonlyMap<string, ProviderRef> {
  const map = new Map<string, ProviderRef>();
  for (const provider of officialProviders.providers as readonly {
    readonly code: string;
    readonly title: string;
    readonly slug: string;
  }[]) {
    map.set(provider.code, {
      code: provider.code,
      title: provider.title,
      slug: provider.slug.trim().toLowerCase(),
    });
  }
  return map;
}

function slugifyAlias(alias: string, officialId: number): string {
  const base = alias
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return base.length > 0 ? base : `game-${officialId}`;
}

/**
 * Build compact CMS game seeds from the official snapshot.
 * Long-form Featured SEO is NOT expanded here — use enrichOfficialGameSeedForDetail.
 */
export async function buildOfficialGameSeeds(): Promise<
  readonly OfficialGameSeedInput[]
> {
  const snapshot = await loadOfficialGamesSnapshot();
  const providersByCode = buildProviderIndex();
  const records = snapshot.games;
  const usedSlugsByProvider = new Map<string, Set<string>>();
  const seeds: OfficialGameSeedInput[] = [];

  for (let index = 0; index < records.length; index++) {
    const record = records[index]!;
    if (!record.providerCode) continue;
    const provider = providersByCode.get(record.providerCode);
    if (!provider) continue;

    let slug = slugifyAlias(record.alias || record.name, record.id);
    const used = usedSlugsByProvider.get(provider.slug) ?? new Set<string>();
    if (used.has(slug)) {
      slug = `${slug}-${record.id}`;
    }
    used.add(slug);
    usedSlugsByProvider.set(provider.slug, used);

    seeds.push(buildCompactSeed(record, provider, slug, index));
  }

  return seeds;
}

function buildCompactSeed(
  record: OfficialGameRecord,
  provider: ProviderRef,
  slug: string,
  index: number,
): OfficialGameSeedInput {
  const category = mapCategory(record.typeId);
  const categoryLabel = typeLabel(record.typeId) ?? "Casino";
  const badgeTitle = record.badge?.title?.trim() || null;
  const tags = [
    ...(categoryLabel ? [categoryLabel] : []),
    ...(badgeTitle ? [badgeTitle] : []),
    provider.title,
    ...(record.featured ? ["Featured"] : []),
    ...(record.popular ? ["Popular"] : []),
    ...(record.newGame ? ["New"] : []),
  ];

  const thumbnail = buildImage(
    `game-thumb-${record.id}`,
    record.icon,
    `${record.name} thumbnail`,
    320,
    320,
  );
  const cover = buildImage(
    `game-cover-${record.id}`,
    record.background ?? record.icon,
    `${record.name} cover`,
    960,
    540,
  );

  const rtp =
    typeof record.rtp === "number" && Number.isFinite(record.rtp)
      ? record.rtp
      : undefined;

  const catalogLine = `${record.name} — ${provider.title} on GGLBET.`;

  return {
    id: `game-gglbet5-${record.id}`,
    slug,
    title: record.name,
    locale: "en",
    createdAt: VERIFIED_DATE,
    updatedAt: VERIFIED_DATE,
    publishedAt: VERIFIED_DATE,
    gameName: record.name,
    gameCode: String(record.id),
    officialId: record.id,
    providerSlug: provider.slug,
    providerName: provider.title,
    metaTitle: `${record.name} | ${provider.title} | GGLBET`,
    metaDescription: catalogLine,
    canonicalPath: getGameHref(provider.slug, slug),
    shortDescription: catalogLine,
    fullDescription: catalogLine,
    heroTitle: record.name,
    heroDescription: catalogLine,
    thumbnail,
    coverImage: cover,
    gallery: thumbnail.url ? [thumbnail] : [],
    category,
    subCategory: categoryLabel,
    tags,
    theme: "",
    ...(rtp !== undefined ? { rtp } : {}),
    volatility: "unknown",
    volatilityGuide:
      "Volatility is not published in the official gglbet5.com game listing used for this catalog sync.",
    supportedDevices: ["Web", "Mobile browser"],
    supportedPlatforms: ["Web browser", "Mobile browser"],
    supportedLanguages: [],
    demoAvailable: Boolean(record.forFun),
    features: [],
    bonusFeatures: [],
    rating: 0,
    reviewCount: 0,
    howToPlay: [],
    tips: [],
    strategy: [],
    faq: [],
    relatedGameSlugs: [],
    relatedProviderSlugs: [provider.slug],
    relatedGuideSlugs: isFeaturedSeoGame(record)
      ? ["how-to-get-started-on-gglbet", "slot-features-explained"]
      : [],
    relatedPromotionSlugs: [],
    relatedNewsSlugs: [],
    status: "published",
    featured: Boolean(record.featured),
    newGame: Boolean(record.newGame),
    popular: Boolean(record.popular),
    sortOrder: index + 1,
    lastUpdated: VERIFIED_DATE,
    author: AUTHOR,
    schema: {
      type: "SoftwareApplication",
      applicationCategory: "Game",
    },
    ctaPrimaryLabel: "Play now",
    ctaPrimaryHref: ROUTES.register,
    ctaSecondaryLabel: `More from ${provider.title}`,
    ctaSecondaryHref: `/provider/${provider.slug}`,
    responsibleGamingNotes: `Open titles only through authenticated GGLBET / ${SOURCE_SITE.replace("https://", "")} sessions. Set responsible-play limits before longer sessions.`,
    content: [],
  };
}

/**
 * Attach Featured / Popular / New long-form SEO for a single game detail view.
 * Safe to call repeatedly; listing/query paths should keep compact seeds.
 * Featured SEO prose loads only when enriching a detail page.
 */
export async function enrichOfficialGameSeedForDetail(
  seed: OfficialGameSeedInput,
  catalog: readonly OfficialGameSeedInput[],
): Promise<OfficialGameSeedInput> {
  if (!isFeaturedSeoGame(seed)) return seed;
  if (seed.content.length > 0) return seed;

  const { buildFeaturedGameSeo } = await import(
    "@/lib/cms/seed/content/games/featured-seo"
  );

  const related = catalog
    .filter(
      (other) =>
        other.officialId !== seed.officialId &&
        other.providerSlug === seed.providerSlug &&
        isFeaturedSeoGame(other),
    )
    .slice(0, 3);

  const seo = buildFeaturedGameSeo({
    record: {
      id: seed.officialId,
      typeId: null,
      name: seed.gameName,
      alias: seed.slug,
      rtp: seed.rtp ?? null,
      badge: null,
      realPlay: true,
      forFun: seed.demoAvailable,
      providerCode: null,
      providerTitle: seed.providerName,
      featured: seed.featured,
      popular: seed.popular,
      newGame: seed.newGame,
    },
    provider: {
      code: seed.providerSlug,
      title: seed.providerName,
      slug: seed.providerSlug,
    },
    slug: seed.slug,
    category: seed.category,
    categoryLabel: seed.subCategory,
    relatedGameSlugs: related.map((other) => other.slug),
    relatedGameLabels: related.map((other) => other.gameName),
  });

  return {
    ...seed,
    metaTitle: seo.metaTitle,
    metaDescription: seo.metaDescription,
    shortDescription: seo.shortDescription,
    fullDescription: seo.fullDescription,
    heroDescription: seo.heroDescription,
    ...(seo.rtpNotes ? { rtpNotes: seo.rtpNotes } : {}),
    volatilityGuide: seo.volatilityGuide,
    features: seo.features,
    howToPlay: seo.howToPlay,
    tips: seo.tips,
    strategy: seo.strategy,
    faq: seo.faq,
    relatedGameSlugs: related.map((other) => other.slug),
    relatedGuideSlugs: [
      "how-to-get-started-on-gglbet",
      "slot-features-explained",
    ],
    responsibleGamingNotes: seo.responsibleGamingNotes,
    content: seo.content,
  };
}

export async function getFeaturedGameSeoStats(): Promise<{
  readonly featuredFlagCount: number;
  readonly popularFlagCount: number;
  readonly newFlagCount: number;
  readonly rawFlagSum: number;
  readonly uniqueSeoCount: number;
  readonly duplicatesRemoved: number;
  readonly categories: Readonly<Record<string, number>>;
}> {
  const snapshot = await loadOfficialGamesSnapshot();
  const records = snapshot.games;
  const featuredFlagCount = records.filter((g) => g.featured).length;
  const popularFlagCount = records.filter((g) => g.popular).length;
  const newFlagCount = records.filter((g) => g.newGame).length;
  const rawFlagSum = featuredFlagCount + popularFlagCount + newFlagCount;
  const unique = records.filter((g) => isFeaturedSeoGame(g));
  const categories: Record<string, number> = {};
  for (const record of unique) {
    const category = mapCategory(record.typeId);
    categories[category] = (categories[category] ?? 0) + 1;
  }
  return {
    featuredFlagCount,
    popularFlagCount,
    newFlagCount,
    rawFlagSum,
    uniqueSeoCount: unique.length,
    duplicatesRemoved: rawFlagSum - unique.length,
    categories,
  };
}

export async function getOfficialGameSyncStats(): Promise<{
  readonly snapshotCount: number;
  readonly seededCount: number;
  readonly providersWithGames: readonly string[];
  readonly providersWithoutGames: readonly string[];
  readonly missingOfficialFields: readonly string[];
}> {
  const snapshot = await loadOfficialGamesSnapshot();
  const providersByCode = buildProviderIndex();
  const records = snapshot.games;
  const withGames = new Set<string>();
  let seeded = 0;
  for (const record of records) {
    if (!record.providerCode) continue;
    const provider = providersByCode.get(record.providerCode);
    if (!provider) continue;
    withGames.add(provider.slug);
    seeded += 1;
  }
  const providersWithoutGames = (
    officialProviders.providers as readonly { slug: string; title: string }[]
  )
    .filter((p) => !withGames.has(p.slug))
    .map((p) => p.title)
    .sort((a, b) => a.localeCompare(b));

  return {
    snapshotCount: records.length,
    seededCount: seeded,
    providersWithGames: [...withGames].sort(),
    providersWithoutGames,
    missingOfficialFields: [
      "volatility",
      "theme",
      "bonus features",
      "reels",
      "rows",
      "paylines",
      "jackpot",
      "background (list endpoint; detail may include for some titles)",
      "description (null on sampled detail payloads)",
    ],
  };
}
