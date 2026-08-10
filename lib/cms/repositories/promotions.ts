import {
  parseLocale,
  resolveSeedDoc,
  resolveSeedDocs,
  toBilingualDoc,
  toBilingualSeed,
} from "@/lib/cms/locale";
import {
  getPromotionsSeed,
  promotionsPageSeed,
} from "@/lib/cms/seed/promotions";
import type { CmsPaginatedResult, CmsSlug } from "@/types/cms";
import type {
  Promotion,
  PromotionQuery,
  PromotionsPageContent,
} from "@/types/promotion";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 12;

const promotionsPageBilingual = toBilingualDoc(
  promotionsPageSeed as unknown as Record<string, unknown>,
);

const promotionsByLocaleCache = new Map<string, Promotion[]>();

async function promotionsFor(locale?: string | null): Promise<Promotion[]> {
  const key = parseLocale(locale);
  const cached = promotionsByLocaleCache.get(key);
  if (cached) {
    return cached;
  }

  const seeds = await getPromotionsSeed();
  const bilingual = toBilingualSeed(
    seeds as unknown as Record<string, unknown>[],
  );
  const resolved = resolveSeedDocs(
    bilingual,
    locale,
  ) as unknown as Promotion[];
  promotionsByLocaleCache.set(key, resolved);
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
  return {
    items: items.slice(start, start + safeSize),
    total: items.length,
    page: safePage,
    pageSize: safeSize,
    hasMore: start + safeSize < items.length,
  };
}

function sortPromotions(
  items: readonly Promotion[],
  sort: PromotionQuery["sort"],
): Promotion[] {
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

export async function filterPromotions(
  query: PromotionQuery = {},
): Promise<readonly Promotion[]> {
  let items = [...(await promotionsFor(query.locale))];

  if (query.status === "published" || !query.status) {
    items = items.filter(
      (p) => p.status === "active" || p.status === "scheduled",
    );
  } else {
    items = items.filter((p) => p.status === query.status);
  }

  if (query.featured) items = items.filter((p) => p.featured);
  if (query.popular) items = items.filter((p) => p.popular);
  if (query.promotionType) {
    items = items.filter((p) => p.promotionType === query.promotionType);
  }

  if (query.search?.trim()) {
    const term = query.search.trim().toLowerCase();
    items = items.filter((p) =>
      [p.title, p.excerpt, p.promotionType, p.bonusAmount, ...p.eligibleGames]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }

  if (query.slugs && query.slugs.length > 0) {
    const set = new Set(query.slugs);
    return [...items.filter((p) => set.has(p.slug))].sort(
      (a, b) => query.slugs!.indexOf(a.slug) - query.slugs!.indexOf(b.slug),
    );
  }

  return sortPromotions(items, query.sort);
}

export async function queryPromotions(
  query: PromotionQuery = {},
): Promise<CmsPaginatedResult<Promotion>> {
  return paginate(await filterPromotions(query), query.page, query.pageSize);
}

function toListItem(promotion: Promotion): import("@/types/promotion").PromotionListItem {
  return {
    id: promotion.id,
    slug: promotion.slug,
    title: promotion.title,
    excerpt: promotion.excerpt,
    promotionType: promotion.promotionType,
    bonusAmount: promotion.bonusAmount,
    featured: promotion.featured,
    popular: promotion.popular,
    sortOrder: promotion.sortOrder,
    startDate: promotion.startDate,
    endDate: promotion.endDate,
    bannerImage: promotion.bannerImage,
    coverImage: promotion.coverImage,
    eligibleGames: promotion.eligibleGames,
    canonicalPath: promotion.canonicalPath,
    status: promotion.status,
  };
}

export async function queryPromotionListItems(
  query: PromotionQuery = {},
): Promise<CmsPaginatedResult<import("@/types/promotion").PromotionListItem>> {
  const result = await queryPromotions(query);
  return {
    ...result,
    items: result.items.map(toListItem),
  };
}

export async function findPromotionBySlug(
  slug: CmsSlug,
  locale?: string | null,
): Promise<Promotion | null> {
  const items = await promotionsFor(locale);
  return items.find((p) => p.slug === slug) ?? null;
}

export async function listPublishedPromotionSlugs(): Promise<readonly string[]> {
  const items = await promotionsFor(parseLocale("en"));
  return items
    .filter((p) => p.status === "active" || p.status === "scheduled")
    .map((p) => p.slug);
}

export function getPromotionsPageContentSeed(
  locale?: string | null,
): PromotionsPageContent {
  return resolveSeedDoc(
    promotionsPageBilingual,
    locale,
  ) as unknown as PromotionsPageContent;
}
