import type { Game, GameQuery } from "@/types/game";

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

export function filterGameDirectory(
  games: readonly Game[],
  query: {
    readonly search?: string;
    readonly letter?: string;
    readonly category?: string;
    readonly theme?: string;
    readonly provider?: string;
    readonly featured?: boolean;
    readonly popular?: boolean;
    readonly newGame?: boolean;
    readonly collection?: string;
    readonly sort?: string;
  },
): readonly Game[] {
  let items = [...games];

  const collection = query.collection?.toLowerCase();
  const featuredOnly =
    query.featured === true || collection === "featured";
  const popularOnly = query.popular === true || collection === "popular";
  const newOnly = query.newGame === true || collection === "new";

  if (featuredOnly) {
    items = items.filter((game) => game.featured);
  }
  if (popularOnly) {
    items = items.filter((game) => game.popular);
  }
  if (newOnly) {
    items = items.filter((game) => game.newGame);
  }

  if (query.provider) {
    items = items.filter((game) => game.providerSlug === query.provider);
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
        ...game.tags,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(term);
    });
  }

  const sort =
    query.sort === "name-asc" ||
    query.sort === "name-desc" ||
    query.sort === "newest" ||
    query.sort === "popular" ||
    query.sort === "rating" ||
    query.sort === "updated"
      ? query.sort
      : "name-asc";

  return sortGames(items, sort);
}

export const GAMES_PAGE_SIZE = 12;

export function paginateGames(
  games: readonly Game[],
  page: number,
  pageSize = GAMES_PAGE_SIZE,
): {
  readonly items: readonly Game[];
  readonly page: number;
  readonly totalPages: number;
  readonly total: number;
} {
  const total = games.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    items: games.slice(start, start + pageSize),
    page: safePage,
    totalPages,
    total,
  };
}
