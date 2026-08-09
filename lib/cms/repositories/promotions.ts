import {
  parseLocale,
  resolveSeedDoc,
  resolveSeedDocs,
  toBilingualDoc,
  toBilingualSeed,
} from "@/lib/cms/locale";
import {
  promotionsPageSeed,
  promotionsSeed,
} from "@/lib/cms/seed/promotions";
import type { CmsPaginatedResult, CmsSlug } from "@/types/cms";
import type {
  Promotion,
  PromotionQuery,
  PromotionsPageContent,
} from "@/types/promotion";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 12;

/** Bilingual CMS store — English preserved, Chinese placeholders. */
const promotionsBilingual = toBilingualSeed(
  promotionsSeed as unknown as Record<string, unknown>[],
);
const promotionsPageBilingual = toBilingualDoc(
  promotionsPageSeed as unknown as Record<string, unknown>,
);

function promotionsFor(locale?: string | null): Promotion[] {
  return resolveSeedDocs(
    promotionsBilingual,
    locale,
  ) as unknown as Promotion[];
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

export function filterPromotions(
  query: PromotionQuery = {},
): readonly Promotion[] {
  let items = [...promotionsFor(query.locale)];

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

export function queryPromotions(
  query: PromotionQuery = {},
): CmsPaginatedResult<Promotion> {
  return paginate(filterPromotions(query), query.page, query.pageSize);
}

export function findPromotionBySlug(
  slug: CmsSlug,
  locale?: string | null,
): Promotion | null {
  return promotionsFor(locale).find((p) => p.slug === slug) ?? null;
}

export function listPublishedPromotionSlugs(): readonly string[] {
  return promotionsFor(parseLocale("en"))
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
