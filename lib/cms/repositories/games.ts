import {
  parseLocale,
  resolveSeedDoc,
  resolveSeedDocs,
  toBilingualDoc,
} from "@/lib/cms/locale";
import { gamesPageSeed, gamesSeed } from "@/lib/cms/seed/games";
import type { CmsPaginatedResult, CmsSlug } from "@/types/cms";
import type {
  Game,
  GameListItem,
  GameQuery,
  GamesPageContent,
} from "@/types/game";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 24;

/**
 * Official catalog is large (10k+ titles). Keep English catalog strings as-is
 * until dedicated Game zh SEO is authored — avoids doubling memory via placeholders.
 */
const gamesBilingual = gamesSeed as unknown as Record<string, unknown>[];
const gamesPageBilingual = toBilingualDoc(
  gamesPageSeed as unknown as Record<string, unknown>,
);

const gamesByLocaleCache = new Map<string, Game[]>();

function gamesFor(locale?: string | null): Game[] {
  const key = parseLocale(locale);
  const cached = gamesByLocaleCache.get(key);
  if (cached) {
    return cached;
  }

  const resolved = resolveSeedDocs(gamesBilingual, locale) as unknown as Game[];
  gamesByLocaleCache.set(key, resolved);
  return resolved;
}

function paginate<T>(
  items: readonly T[],
  page = DEFAULT_PAGE,
  pageSize = DEFAULT_PAGE_SIZE,
): CmsPaginatedResult<T> {
  const safePage = Math.max(1, page);
  const safeSize = Math.max(1, pageSize);
  const start = (safePage - 1) * safeSize;
  const slice = items.slice(start, start + safeSize);

  return {
    items: slice,
    total: items.length,
    page: safePage,
    pageSize: safeSize,
    hasMore: start + safeSize < items.length,
  };
}

function toListItem(game: Game): GameListItem {
  return {
    id: game.id,
    slug: game.slug,
    gameName: game.gameName,
    gameCode: game.gameCode,
    providerSlug: game.providerSlug,
    providerName: game.providerName,
    shortDescription: game.shortDescription,
    thumbnail: game.thumbnail,
    category: game.category,
    theme: game.theme,
    rtp: game.rtp,
    volatility: game.volatility,
    featured: game.featured,
    newGame: game.newGame,
    popular: game.popular,
    rating: game.rating,
    reviewCount: game.reviewCount,
    status: game.status,
    sortOrder: game.sortOrder,
    publishedAt: game.publishedAt,
    updatedAt: game.updatedAt,
    canonicalPath: game.canonicalPath,
  };
}

function sortGames(items: readonly Game[], sort: GameQuery["sort"]): Game[] {
  const next = [...items];

  switch (sort) {
    case "name-desc":
      return next.sort((a, b) => b.gameName.localeCompare(a.gameName));
    case "newest":
      return next.sort((a, b) => {
        const aTime = a.publishedAt ? Date.parse(a.publishedAt) : 0;
        const bTime = b.publishedAt ? Date.parse(b.publishedAt) : 0;
        return bTime - aTime;
      });
    case "updated":
      return next.sort(
        (a, b) => Date.parse(b.lastUpdated) - Date.parse(a.lastUpdated),
      );
    case "popular":
      return next.sort((a, b) => {
        const aScore = Number(a.popular) * 1000 + a.reviewCount + a.rating * 10;
        const bScore = Number(b.popular) * 1000 + b.reviewCount + b.rating * 10;
        return bScore - aScore;
      });
    case "rating":
      return next.sort(
        (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount,
      );
    case "name-asc":
    default:
      return next.sort(
        (a, b) =>
          a.sortOrder - b.sortOrder || a.gameName.localeCompare(b.gameName),
      );
  }
}

export function filterGames(query: GameQuery = {}): readonly Game[] {
  const status = query.status ?? "published";
  let items = gamesFor(query.locale).filter((game) => game.status === status);

  if (query.featured) {
    items = items.filter((game) => game.featured);
  }

  if (query.newGame) {
    items = items.filter((game) => game.newGame);
  }

  if (query.popular) {
    items = items.filter((game) => game.popular);
  }

  if (query.providerSlug) {
    items = items.filter((game) => game.providerSlug === query.providerSlug);
  }

  if (query.category) {
    const category = query.category.toLowerCase();
    items = items.filter(
      (game) =>
        game.category === category ||
        game.subCategory.toLowerCase().includes(category) ||
        game.tags.some((tag) => tag.toLowerCase().includes(category)),
    );
  }

  if (query.theme) {
    const theme = query.theme.toLowerCase();
    items = items.filter((game) => game.theme.toLowerCase() === theme);
  }

  if (query.letter) {
    const letter = query.letter.toUpperCase();
    items = items.filter((game) =>
      game.gameName.toUpperCase().startsWith(letter),
    );
  }

  if (query.search?.trim()) {
    const term = query.search.trim().toLowerCase();
    items = items.filter((game) => {
      const haystack = [
        game.gameName,
        game.gameCode,
        game.providerName,
        game.shortDescription,
        game.theme,
        game.category,
        ...game.tags,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(term);
    });
  }

  if (query.slugs && query.slugs.length > 0) {
    const set = new Set(query.slugs);
    items = items.filter((game) => set.has(game.slug));
    items = [...items].sort(
      (a, b) => query.slugs!.indexOf(a.slug) - query.slugs!.indexOf(b.slug),
    );
    return items;
  }

  return sortGames(items, query.sort);
}

export function queryGames(query: GameQuery = {}): CmsPaginatedResult<Game> {
  return paginate(filterGames(query), query.page, query.pageSize);
}

export function queryGameListItems(
  query: GameQuery = {},
): CmsPaginatedResult<GameListItem> {
  const result = queryGames(query);
  return {
    ...result,
    items: result.items.map(toListItem),
  };
}

export function findGameBySlug(
  slug: CmsSlug,
  locale?: string | null,
): Game | null {
  return (
    gamesFor(locale).find(
      (game) => game.slug === slug && game.status === "published",
    ) ?? null
  );
}

export function findGameByProviderAndSlug(
  providerSlug: string,
  slug: CmsSlug,
  locale?: string | null,
): Game | null {
  return (
    gamesFor(locale).find(
      (game) =>
        game.slug === slug &&
        game.providerSlug === providerSlug &&
        game.status === "published",
    ) ?? null
  );
}

export function listPublishedGameParams(): readonly {
  readonly provider: string;
  readonly slug: string;
}[] {
  // Featured SEO lives in CMS; pages render on demand so build stays within
  // static-generation time limits for 700+ long-form articles × locales.
  return [];
}

export function listAllPublishedGameParams(): readonly {
  readonly provider: string;
  readonly slug: string;
}[] {
  return gamesFor(parseLocale("en"))
    .filter((game) => game.status === "published")
    .map((game) => ({
      provider: game.providerSlug,
      slug: game.slug,
    }));
}

export function listGameThemes(locale?: string | null): readonly string[] {
  return [...new Set(gamesFor(locale).map((game) => game.theme))].sort((a, b) =>
    a.localeCompare(b),
  );
}

export function getGamesPageContentSeed(
  locale?: string | null,
): GamesPageContent {
  return resolveSeedDoc(
    gamesPageBilingual,
    locale,
  ) as unknown as GamesPageContent;
}
