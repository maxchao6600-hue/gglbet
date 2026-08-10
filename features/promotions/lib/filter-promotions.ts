import type { PromotionListItem, PromotionQuery } from "@/types/promotion";

function sortPromotionsDirectory(
  items: readonly PromotionListItem[],
  sort: PromotionQuery["sort"],
): PromotionListItem[] {
  const next = [...items];

  switch (sort) {
    case "ending":
      return next.sort((a, b) => {
        const aEnd = a.endDate ? Date.parse(a.endDate) : Number.MAX_SAFE_INTEGER;
        const bEnd = b.endDate ? Date.parse(b.endDate) : Number.MAX_SAFE_INTEGER;
        return aEnd - bEnd;
      });
    case "popular":
      return next.sort((a, b) => {
        const aScore = Number(a.popular) * 1000 + Number(a.featured) * 100;
        const bScore = Number(b.popular) * 1000 + Number(b.featured) * 100;
        return bScore - aScore || a.sortOrder - b.sortOrder;
      });
    case "title-asc":
      return next.sort((a, b) => a.title.localeCompare(b.title));
    case "newest":
    default:
      return next.sort((a, b) => {
        const aTime = a.startDate ? Date.parse(a.startDate) : 0;
        const bTime = b.startDate ? Date.parse(b.startDate) : 0;
        return bTime - aTime;
      });
  }
}

export function filterPromotionsDirectory(
  promotions: readonly PromotionListItem[],
  query: {
    readonly search?: string;
    readonly promotionType?: string;
    readonly featured?: boolean;
    readonly popular?: boolean;
    readonly sort?: string;
  },
): readonly PromotionListItem[] {
  let items = [...promotions];

  if (query.featured) {
    items = items.filter((promotion) => promotion.featured);
  }

  if (query.popular) {
    items = items.filter((promotion) => promotion.popular);
  }

  if (query.promotionType) {
    items = items.filter(
      (promotion) => promotion.promotionType === query.promotionType,
    );
  }

  if (query.search?.trim()) {
    const term = query.search.trim().toLowerCase();
    items = items.filter((promotion) =>
      [
        promotion.title,
        promotion.excerpt,
        promotion.promotionType,
        promotion.bonusAmount,
        ...promotion.eligibleGames,
      ]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }

  const sort =
    query.sort === "newest" ||
    query.sort === "ending" ||
    query.sort === "popular" ||
    query.sort === "title-asc"
      ? query.sort
      : "newest";

  return sortPromotionsDirectory(items, sort);
}

export const PROMOTIONS_PAGE_SIZE = 9;

export function paginatePromotions(
  promotions: readonly PromotionListItem[],
  page: number,
  pageSize = PROMOTIONS_PAGE_SIZE,
): {
  readonly items: readonly PromotionListItem[];
  readonly page: number;
  readonly totalPages: number;
  readonly total: number;
} {
  const total = promotions.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    items: promotions.slice(start, start + pageSize),
    page: safePage,
    totalPages,
    total,
  };
}
