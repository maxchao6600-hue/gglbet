import {
  parseLocale,
  resolveSeedDoc,
  resolveSeedDocs,
  toBilingualDoc,
  toBilingualSeed,
} from "@/lib/cms/locale";
import {
  getNewsSeed,
  newsCategoriesSeed,
  newsPageSeed,
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

const newsCategoriesBilingual = toBilingualSeed(
  newsCategoriesSeed as unknown as Record<string, unknown>[],
);
const newsPageBilingual = toBilingualDoc(
  newsPageSeed as unknown as Record<string, unknown>,
);

const newsByLocaleCache = new Map<string, NewsArticle[]>();

async function newsFor(locale?: string | null): Promise<NewsArticle[]> {
  const key = parseLocale(locale);
  const cached = newsByLocaleCache.get(key);
  if (cached) {
    return cached;
  }

  const seeds = await getNewsSeed();
  const bilingual = toBilingualSeed(
    seeds as unknown as Record<string, unknown>[],
  );
  const resolved = resolveSeedDocs(
    bilingual,
    locale,
  ) as unknown as NewsArticle[];
  newsByLocaleCache.set(key, resolved);
  return resolved;
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

export async function filterNews(
  query: NewsQuery = {},
): Promise<readonly NewsArticle[]> {
  const status = query.status ?? "published";
  let items = (await newsFor(query.locale)).filter(
    (article) => article.status === status,
  );

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

export async function queryNews(
  query: NewsQuery = {},
): Promise<CmsPaginatedResult<NewsArticle>> {
  return paginate(await filterNews(query), query.page, query.pageSize);
}

function toListItem(
  article: NewsArticle,
): import("@/types/news").NewsListItem {
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    category: article.category,
    coverImage: article.coverImage,
    featured: article.featured,
    breaking: article.breaking,
    popular: article.popular,
    readingTimeMinutes: article.readingTimeMinutes,
    publishDate: article.publishDate,
    updatedDate: article.updatedDate,
    tags: article.tags,
    keywords: article.keywords,
    sortOrder: article.sortOrder,
    canonicalPath: article.canonicalPath,
    status: article.status,
    author: { name: article.author.name },
  };
}

export async function queryNewsListItems(
  query: NewsQuery = {},
): Promise<CmsPaginatedResult<import("@/types/news").NewsListItem>> {
  const result = await queryNews(query);
  return {
    ...result,
    items: result.items.map(toListItem),
  };
}

export async function findNewsByCategoryAndSlug(
  category: string,
  slug: CmsSlug,
  locale?: string | null,
): Promise<NewsArticle | null> {
  const items = await newsFor(locale);
  return (
    items.find(
      (a) =>
        a.slug === slug &&
        a.category === category &&
        a.status === "published",
    ) ?? null
  );
}

export async function findNewsBySlug(
  slug: CmsSlug,
  locale?: string | null,
): Promise<NewsArticle | null> {
  const items = await newsFor(locale);
  return (
    items.find((a) => a.slug === slug && a.status === "published") ?? null
  );
}

export async function listPublishedNewsParams(): Promise<
  readonly {
    readonly category: string;
    readonly slug: string;
  }[]
> {
  const items = await newsFor(parseLocale("en"));
  return items
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
