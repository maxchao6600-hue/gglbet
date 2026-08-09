import {
  parseLocale,
  resolveSeedDoc,
  resolveSeedDocs,
  toBilingualDoc,
  toBilingualSeed,
} from "@/lib/cms/locale";
import {
  newsCategoriesSeed,
  newsPageSeed,
  newsSeed,
} from "@/lib/cms/seed/news";
import type { CmsPaginatedResult, CmsSlug } from "@/types/cms";
import type {
  NewsArticle,
  NewsCategory,
  NewsCategorySlug,
  NewsPageContent,
  NewsQuery,
} from "@/types/news";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 12;

/** Bilingual CMS store — English preserved, Chinese placeholders. */
const newsBilingual = toBilingualSeed(
  newsSeed as unknown as Record<string, unknown>[],
);
const newsCategoriesBilingual = toBilingualSeed(
  newsCategoriesSeed as unknown as Record<string, unknown>[],
);
const newsPageBilingual = toBilingualDoc(
  newsPageSeed as unknown as Record<string, unknown>,
);

function newsFor(locale?: string | null): NewsArticle[] {
  return resolveSeedDocs(newsBilingual, locale) as unknown as NewsArticle[];
}

function newsCategoriesFor(locale?: string | null): NewsCategory[] {
  return resolveSeedDocs(
    newsCategoriesBilingual,
    locale,
  ) as unknown as NewsCategory[];
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

function sortNews(
  items: readonly NewsArticle[],
  sort: NewsQuery["sort"],
): NewsArticle[] {
  const next = [...items];
  switch (sort) {
    case "updated":
      return next.sort(
        (a, b) => Date.parse(b.updatedDate) - Date.parse(a.updatedDate),
      );
    case "popular":
      return next.sort((a, b) => {
        const aScore =
          Number(a.popular) * 1000 +
          Number(a.featured) * 100 +
          Number(a.breaking) * 50;
        const bScore =
          Number(b.popular) * 1000 +
          Number(b.featured) * 100 +
          Number(b.breaking) * 50;
        return bScore - aScore || a.sortOrder - b.sortOrder;
      });
    case "title-asc":
      return next.sort((a, b) => a.title.localeCompare(b.title));
    case "newest":
    default:
      return next.sort(
        (a, b) => Date.parse(b.publishDate) - Date.parse(a.publishDate),
      );
  }
}

export function filterNews(query: NewsQuery = {}): readonly NewsArticle[] {
  const status = query.status ?? "published";
  let items = newsFor(query.locale).filter((article) => article.status === status);

  if (query.featured) items = items.filter((a) => a.featured);
  if (query.breaking) items = items.filter((a) => a.breaking);
  if (query.popular) items = items.filter((a) => a.popular);
  if (query.category) {
    items = items.filter((a) => a.category === query.category);
  }

  if (query.search?.trim()) {
    const term = query.search.trim().toLowerCase();
    items = items.filter((a) =>
      [a.title, a.excerpt, a.category, ...a.tags, ...a.keywords]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }

  if (query.slugs && query.slugs.length > 0) {
    const set = new Set(query.slugs);
    return [...items.filter((a) => set.has(a.slug))].sort(
      (a, b) => query.slugs!.indexOf(a.slug) - query.slugs!.indexOf(b.slug),
    );
  }

  return sortNews(items, query.sort);
}

export function queryNews(
  query: NewsQuery = {},
): CmsPaginatedResult<NewsArticle> {
  return paginate(filterNews(query), query.page, query.pageSize);
}

export function findNewsByCategoryAndSlug(
  category: string,
  slug: CmsSlug,
  locale?: string | null,
): NewsArticle | null {
  return (
    newsFor(locale).find(
      (a) =>
        a.slug === slug &&
        a.category === category &&
        a.status === "published",
    ) ?? null
  );
}

export function findNewsBySlug(
  slug: CmsSlug,
  locale?: string | null,
): NewsArticle | null {
  return (
    newsFor(locale).find(
      (a) => a.slug === slug && a.status === "published",
    ) ?? null
  );
}

export function listPublishedNewsParams(): readonly {
  readonly category: string;
  readonly slug: string;
}[] {
  return newsFor(parseLocale("en"))
    .filter((a) => a.status === "published")
    .map((a) => ({ category: a.category, slug: a.slug }));
}

export function listPublishedNewsCategories(
  locale?: string | null,
): readonly NewsCategory[] {
  return [...newsCategoriesFor(locale)]
    .filter((c) => c.status === "published")
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function findNewsCategoryBySlug(
  slug: string,
  locale?: string | null,
): NewsCategory | null {
  return (
    newsCategoriesFor(locale).find(
      (c) => c.slug === slug && c.status === "published",
    ) ?? null
  );
}

export function listPublishedNewsCategorySlugs(): readonly NewsCategorySlug[] {
  return listPublishedNewsCategories(parseLocale("en")).map((c) => c.slug);
}

export function getNewsPageContentSeed(
  locale?: string | null,
): NewsPageContent {
  return resolveSeedDoc(newsPageBilingual, locale) as unknown as NewsPageContent;
}
