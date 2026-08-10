import {
  parseLocale,
  resolveSeedDoc,
  toBilingualDoc,
} from "@/lib/cms/locale";
import {
  expandDenseGameRow,
  loadDenseGamesListing,
  type DenseGameRow,
  type GamesListingRow,
} from "@/lib/cms/seed/content/games/load-games-indexes";
import {
  getGameSeedBySlug,
  getGameSeedForDetail,
  gamesPageSeed,
} from "@/lib/cms/seed/games";
import type { CmsPaginatedResult, CmsSlug } from "@/types/cms";
import type {
  Game,
  GameListItem,
  GameQuery,
  GamesPageContent,
} from "@/types/game";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 24;

const gamesPageBilingual = toBilingualDoc(
  gamesPageSeed as unknown as Record<string, unknown>,
);

const denseByLocaleCache = new Map<string, readonly DenseGameRow[]>();

async function denseFor(locale?: string | null): Promise<readonly DenseGameRow[]> {
  const key = parseLocale(locale);
  const cached = denseByLocaleCache.get(key);
  if (cached) return cached;
  const rows = await loadDenseGamesListing();
  denseByLocaleCache.set(key, rows);
  return rows;
}

function paginate<T>(
  items: readonly T[],
  page = DEFAULT_PAGE,
  pageSize = DEFAULT_PAGE_SIZE,
): CmsPaginatedResult<T> {
  const safePage = Math.max(1, page);
  const safeSize = Math.max(1, pageSize);
  const start = (safePage - 1) * safeSize;
  return {
    items: items.slice(start, start + safeSize),
    total: items.length,
    page: safePage,
    pageSize: safeSize,
    hasMore: start + safeSize < items.length,
  };
}

/** Dense tuple indexes */
const D = {
  officialId: 0,
  slug: 1,
  gameName: 2,
  providerSlug: 3,
  providerName: 4,
  iconUrl: 5,
  category: 6,
  featured: 7,
  popular: 8,
  newGame: 9,
  rtp: 10,
  sortOrder: 11,
} as const;

function sortDense(
  items: readonly DenseGameRow[],
  sort: GameQuery["sort"],
): DenseGameRow[] {
  const next = [...items];
  switch (sort) {
    case "name-desc":
      return next.sort((a, b) =>
        String(b[D.gameName]).localeCompare(String(a[D.gameName])),
      );
    case "newest":
      return next.sort(
        (a, b) => Number(a[D.sortOrder]) - Number(b[D.sortOrder]),
      );
    case "updated":
      return next.sort(
        (a, b) => Number(a[D.sortOrder]) - Number(b[D.sortOrder]),
      );
    case "popular":
      return next.sort((a, b) => {
        const aScore = Number(a[D.popular]) * 1000;
        const bScore = Number(b[D.popular]) * 1000;
        return bScore - aScore || Number(a[D.sortOrder]) - Number(b[D.sortOrder]);
      });
    case "rating":
      return next.sort(
        (a, b) => Number(a[D.sortOrder]) - Number(b[D.sortOrder]),
      );
    case "name-asc":
    default:
      return next.sort((a, b) => {
        const order = Number(a[D.sortOrder]) - Number(b[D.sortOrder]);
        if (order !== 0) return order;
        return String(a[D.gameName]).localeCompare(String(b[D.gameName]));
      });
  }
}

function filterDenseRows(
  rows: readonly DenseGameRow[],
  query: GameQuery,
): DenseGameRow[] {
  let items = [...rows];

  if (query.featured) {
    items = items.filter((row) => row[D.featured] === 1);
  }
  if (query.newGame) {
    items = items.filter((row) => row[D.newGame] === 1);
  }
  if (query.popular) {
    items = items.filter((row) => row[D.popular] === 1);
  }
  if (query.providerSlug) {
    items = items.filter((row) => row[D.providerSlug] === query.providerSlug);
  }
  if (query.category) {
    const category = query.category.toLowerCase();
    items = items.filter((row) => String(row[D.category]) === category);
  }
  if (query.theme) {
    // Themes are empty in the official listing sync — keep filter for API compatibility.
    items = items.filter(() => false);
  }
  if (query.letter) {
    const letter = query.letter.toUpperCase();
    items = items.filter((row) =>
      String(row[D.gameName]).toUpperCase().startsWith(letter),
    );
  }
  if (query.search?.trim()) {
    const term = query.search.trim().toLowerCase();
    items = items.filter((row) => {
      const haystack = [
        row[D.gameName],
        row[D.officialId],
        row[D.providerName],
        row[D.category],
        row[D.slug],
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(term);
    });
  }
  if (query.slugs && query.slugs.length > 0) {
    const set = new Set(query.slugs);
    items = items.filter((row) => set.has(String(row[D.slug])));
    items = items.sort(
      (a, b) =>
        query.slugs!.indexOf(String(a[D.slug])) -
        query.slugs!.indexOf(String(b[D.slug])),
    );
    return items;
  }

  return sortDense(items, query.sort);
}

export async function filterGameListItems(
  query: GameQuery = {},
): Promise<readonly GameListItem[]> {
  const rows = filterDenseRows(await denseFor(query.locale), query);
  return rows.map(expandDenseGameRow);
}

export async function queryGameListItems(
  query: GameQuery = {},
): Promise<CmsPaginatedResult<GameListItem>> {
  const filtered = filterDenseRows(await denseFor(query.locale), query);
  const page = paginate(filtered, query.page, query.pageSize);
  return {
    ...page,
    items: page.items.map(expandDenseGameRow),
  };
}

export function listingRowAsGame(item: GamesListingRow): Game {
  const publishedAt = item.publishedAt ?? item.updatedAt;
  return {
    ...item,
    locale: "en",
    createdAt: publishedAt,
    title: item.gameName,
    metaTitle: `${item.gameName} | ${item.providerName} | GGLBET`,
    metaDescription: item.shortDescription,
    fullDescription: item.shortDescription,
    heroTitle: item.gameName,
    heroDescription: item.shortDescription,
    coverImage: item.thumbnail,
    gallery: item.thumbnail.url ? [item.thumbnail] : [],
    subCategory: item.subCategory || item.category,
    tags: item.tags ? [...item.tags] : [],
    volatilityGuide:
      "Volatility is not published in the official gglbet5.com game listing used for this catalog sync.",
    supportedDevices: ["Web", "Mobile browser"],
    supportedPlatforms: ["Web browser", "Mobile browser"],
    supportedLanguages: [],
    demoAvailable: false,
    features: [],
    bonusFeatures: [],
    howToPlay: [],
    tips: [],
    strategy: [],
    faq: [],
    relatedGameSlugs: [],
    relatedProviderSlugs: [],
    relatedGuideSlugs: [],
    relatedPromotionSlugs: [],
    relatedNewsSlugs: [],
    lastUpdated: item.updatedAt,
    author: {
      id: "author-gglbet-editorial",
      name: "GGLBET Editorial",
      slug: "gglbet-editorial",
    },
    publishDate: publishedAt,
    readingTimeMinutes: 1,
    factChecked: true,
    content: [],
    tableOfContents: [],
    ctaPrimaryLabel: "Play now",
    ctaPrimaryHref:
      item.ctaPrimaryHref ||
      "https://www.gglbet5.com/en/affiliates/?btag=2773567",
    ctaSecondaryLabel: `More from ${item.providerName}`,
    ctaSecondaryHref: `/provider/${item.providerSlug}`,
    responsibleGamingNotes:
      "Open titles only through authenticated GGLBET sessions. Set responsible-play limits before longer sessions.",
  };
}

export async function filterGames(
  query: GameQuery = {},
): Promise<readonly Game[]> {
  return (await filterGameListItems(query)).map(listingRowAsGame);
}

export async function queryGames(
  query: GameQuery = {},
): Promise<CmsPaginatedResult<Game>> {
  const result = await queryGameListItems(query);
  return {
    ...result,
    items: result.items.map((item) => listingRowAsGame(item as GamesListingRow)),
  };
}

/**
 * /games route data from build-time SSG payload (500 + featured 8).
 * Does not parse or filter the dense 16k-row listing index.
 * Returns ultra-compact GamesDirectoryItem for RSC flight size.
 */
export async function getGamesPageListing(): Promise<{
  readonly listing: readonly import("@/lib/cms/seed/content/games/load-games-indexes").GamesDirectoryItem[];
  readonly featured: readonly import("@/lib/cms/seed/content/games/load-games-indexes").GamesDirectoryItem[];
}> {
  const { loadGamesPageSsg, toGamesDirectoryItem } = await import(
    "@/lib/cms/seed/content/games/load-games-indexes"
  );
  const payload = await loadGamesPageSsg();
  return {
    listing: payload.listing.map(toGamesDirectoryItem),
    featured: payload.featured.map(toGamesDirectoryItem),
  };
}

export async function findGameBySlug(
  slug: CmsSlug,
  _locale?: string | null,
): Promise<Game | null> {
  return getGameSeedBySlug(slug);
}

export async function findGameByProviderAndSlug(
  providerSlug: string,
  slug: CmsSlug,
  _locale?: string | null,
): Promise<Game | null> {
  return getGameSeedForDetail(providerSlug, slug);
}

export async function listPublishedGameParams(): Promise<
  readonly {
    readonly provider: string;
    readonly slug: string;
  }[]
> {
  return [];
}

export async function listAllPublishedGameParams(): Promise<
  readonly {
    readonly provider: string;
    readonly slug: string;
  }[]
> {
  const rows = await denseFor(parseLocale("en"));
  return rows.map((row) => ({
    provider: String(row[D.providerSlug]),
    slug: String(row[D.slug]),
  }));
}

export async function listGameThemes(
  _locale?: string | null,
): Promise<readonly string[]> {
  // Official listing sync does not publish themes on catalog rows.
  return [];
}

export function getGamesPageContentSeed(
  locale?: string | null,
): GamesPageContent {
  return resolveSeedDoc(
    gamesPageBilingual,
    locale,
  ) as unknown as GamesPageContent;
}
