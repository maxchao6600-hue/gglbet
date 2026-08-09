import {
  parseLocale,
  resolveSeedDoc,
  resolveSeedDocs,
  toBilingualDoc,
  toBilingualSeed,
} from "@/lib/cms/locale";
import {
  guideCategoriesSeed,
  guidesPageSeed,
  guidesSeed,
} from "@/lib/cms/seed/guides";
import type { CmsPaginatedResult, CmsSlug } from "@/types/cms";
import type {
  Guide,
  GuideCategory,
  GuideCategorySlug,
  GuideListItem,
  GuideQuery,
  GuidesPageContent,
} from "@/types/guide";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 12;

/** Bilingual CMS store — English preserved, Chinese placeholders. */
const guidesBilingual = toBilingualSeed(
  guidesSeed as unknown as Record<string, unknown>[],
);
const guideCategoriesBilingual = toBilingualSeed(
  guideCategoriesSeed as unknown as Record<string, unknown>[],
);
const guidesPageBilingual = toBilingualDoc(
  guidesPageSeed as unknown as Record<string, unknown>,
);

function guidesFor(locale?: string | null): Guide[] {
  return resolveSeedDocs(guidesBilingual, locale) as unknown as Guide[];
}

function guideCategoriesFor(locale?: string | null): GuideCategory[] {
  return resolveSeedDocs(
    guideCategoriesBilingual,
    locale,
  ) as unknown as GuideCategory[];
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

function toListItem(guide: Guide): GuideListItem {
  return {
    id: guide.id,
    slug: guide.slug,
    title: guide.title,
    category: guide.category,
    subCategory: guide.subCategory,
    excerpt: guide.excerpt,
    coverImage: guide.coverImage,
    difficulty: guide.difficulty,
    readingTime: guide.readingTime,
    tags: guide.tags,
    featured: guide.featured,
    popular: guide.popular,
    publishDate: guide.publishDate,
    updatedDate: guide.updatedDate,
    canonicalPath: guide.canonicalPath,
    status: guide.status,
    sortOrder: guide.sortOrder,
    author: guide.author,
  };
}

function sortGuides(items: readonly Guide[], sort: GuideQuery["sort"]): Guide[] {
  const next = [...items];

  switch (sort) {
    case "updated":
      return next.sort(
        (a, b) => Date.parse(b.updatedDate) - Date.parse(a.updatedDate),
      );
    case "popular":
      return next.sort((a, b) => {
        const aScore = Number(a.popular) * 1000 + Number(a.featured) * 100;
        const bScore = Number(b.popular) * 1000 + Number(b.featured) * 100;
        return bScore - aScore || a.sortOrder - b.sortOrder;
      });
    case "reading-asc":
      return next.sort((a, b) => a.readingTime - b.readingTime);
    case "title-asc":
      return next.sort((a, b) => a.title.localeCompare(b.title));
    case "newest":
    default:
      return next.sort(
        (a, b) => Date.parse(b.publishDate) - Date.parse(a.publishDate),
      );
  }
}

export function filterGuides(query: GuideQuery = {}): readonly Guide[] {
  const status = query.status ?? "published";
  let items = guidesFor(query.locale).filter((guide) => guide.status === status);

  if (query.featured) {
    items = items.filter((guide) => guide.featured);
  }

  if (query.popular) {
    items = items.filter((guide) => guide.popular);
  }

  if (query.category) {
    items = items.filter((guide) => guide.category === query.category);
  }

  if (query.difficulty) {
    items = items.filter((guide) => guide.difficulty === query.difficulty);
  }

  if (query.search?.trim()) {
    const term = query.search.trim().toLowerCase();
    items = items.filter((guide) => {
      const haystack = [
        guide.title,
        guide.excerpt,
        guide.category,
        guide.subCategory,
        ...guide.tags,
        ...guide.keywords,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(term);
    });
  }

  if (query.slugs && query.slugs.length > 0) {
    const set = new Set(query.slugs);
    items = items.filter((guide) => set.has(guide.slug));
    return [...items].sort(
      (a, b) => query.slugs!.indexOf(a.slug) - query.slugs!.indexOf(b.slug),
    );
  }

  return sortGuides(items, query.sort);
}

export function queryGuides(query: GuideQuery = {}): CmsPaginatedResult<Guide> {
  return paginate(filterGuides(query), query.page, query.pageSize);
}

export function queryGuideListItems(
  query: GuideQuery = {},
): CmsPaginatedResult<GuideListItem> {
  const result = queryGuides(query);
  return {
    ...result,
    items: result.items.map(toListItem),
  };
}

export function findGuideByCategoryAndSlug(
  category: string,
  slug: CmsSlug,
  locale?: string | null,
): Guide | null {
  return (
    guidesFor(locale).find(
      (guide) =>
        guide.slug === slug &&
        guide.category === category &&
        guide.status === "published",
    ) ?? null
  );
}

export function findGuideBySlug(
  slug: CmsSlug,
  locale?: string | null,
): Guide | null {
  return (
    guidesFor(locale).find(
      (guide) => guide.slug === slug && guide.status === "published",
    ) ?? null
  );
}

export function listPublishedGuideParams(): readonly {
  readonly category: string;
  readonly slug: string;
}[] {
  return guidesFor(parseLocale("en"))
    .filter((guide) => guide.status === "published")
    .map((guide) => ({
      category: guide.category,
      slug: guide.slug,
    }));
}

export function listPublishedGuideCategories(
  locale?: string | null,
): readonly GuideCategory[] {
  return [...guideCategoriesFor(locale)]
    .filter((category) => category.status === "published")
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function findGuideCategoryBySlug(
  slug: string,
  locale?: string | null,
): GuideCategory | null {
  return (
    guideCategoriesFor(locale).find(
      (category) =>
        category.slug === slug && category.status === "published",
    ) ?? null
  );
}

export function listPublishedGuideCategorySlugs(): readonly GuideCategorySlug[] {
  return listPublishedGuideCategories(parseLocale("en")).map(
    (category) => category.slug,
  );
}

export function getGuidesPageContentSeed(
  locale?: string | null,
): GuidesPageContent {
  return resolveSeedDoc(
    guidesPageBilingual,
    locale,
  ) as unknown as GuidesPageContent;
}
