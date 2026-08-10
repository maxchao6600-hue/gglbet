import type { GuideListItem, GuideQuery } from "@/types/guide";

function sortGuides(
  items: readonly GuideListItem[],
  sort: GuideQuery["sort"],
): GuideListItem[] {
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

export function filterGuideDirectory(
  guides: readonly GuideListItem[],
  query: {
    readonly search?: string;
    readonly category?: string;
    readonly featured?: boolean;
    readonly sort?: string;
  },
): readonly GuideListItem[] {
  let items = [...guides];

  if (query.featured) {
    items = items.filter((guide) => guide.featured);
  }

  if (query.category) {
    items = items.filter((guide) => guide.category === query.category);
  }

  if (query.search?.trim()) {
    const term = query.search.trim().toLowerCase();
    items = items.filter((guide) => {
      const haystack = [
        guide.title,
        guide.excerpt,
        guide.category,
        ...guide.tags,
        ...guide.keywords,
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
    query.sort === "reading-asc" ||
    query.sort === "title-asc"
      ? query.sort
      : "newest";

  return sortGuides(items, sort);
}

export const GUIDES_PAGE_SIZE = 9;

export function paginateGuides(
  guides: readonly GuideListItem[],
  page: number,
  pageSize = GUIDES_PAGE_SIZE,
): {
  readonly items: readonly GuideListItem[];
  readonly page: number;
  readonly totalPages: number;
  readonly total: number;
} {
  const total = guides.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    items: guides.slice(start, start + pageSize),
    page: safePage,
    totalPages,
    total,
  };
}
