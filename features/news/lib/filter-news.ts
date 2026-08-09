import type { NewsArticle, NewsQuery } from "@/types/news";

function sortNewsDirectory(
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

export function filterNewsDirectory(
  articles: readonly NewsArticle[],
  query: {
    readonly search?: string;
    readonly category?: string;
    readonly featured?: boolean;
    readonly breaking?: boolean;
    readonly popular?: boolean;
    readonly sort?: string;
  },
): readonly NewsArticle[] {
  let items = [...articles];

  if (query.featured) {
    items = items.filter((article) => article.featured);
  }

  if (query.breaking) {
    items = items.filter((article) => article.breaking);
  }

  if (query.popular) {
    items = items.filter((article) => article.popular);
  }

  if (query.category) {
    items = items.filter((article) => article.category === query.category);
  }

  if (query.search?.trim()) {
    const term = query.search.trim().toLowerCase();
    items = items.filter((article) => {
      const haystack = [
        article.title,
        article.excerpt,
        article.category,
        ...article.tags,
        ...article.keywords,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(term);
    });
  }

  const sort =
    query.sort === "newest" ||
    query.sort === "updated" ||
    query.sort === "popular" ||
    query.sort === "title-asc"
      ? query.sort
      : "newest";

  return sortNewsDirectory(items, sort);
}

export const NEWS_PAGE_SIZE = 9;

export function paginateNews(
  articles: readonly NewsArticle[],
  page: number,
  pageSize = NEWS_PAGE_SIZE,
): {
  readonly items: readonly NewsArticle[];
  readonly page: number;
  readonly totalPages: number;
  readonly total: number;
} {
  const total = articles.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    items: articles.slice(start, start + pageSize),
    page: safePage,
    totalPages,
    total,
  };
}
