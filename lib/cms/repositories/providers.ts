import {
  parseLocale,
  resolveSeedDoc,
  resolveSeedDocs,
  toBilingualDoc,
  toBilingualSeed,
} from "@/lib/cms/locale";
import { providersPageSeed, providersSeed } from "@/lib/cms/seed/providers";
import type { CmsPaginatedResult, CmsSlug } from "@/types/cms";
import type {
  Provider,
  ProviderListItem,
  ProviderQuery,
  ProvidersPageContent,
} from "@/types/provider";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 100;

/** Bilingual CMS store — English + Traditional Chinese provider SEO copy. */
const providersBilingual = toBilingualSeed(
  providersSeed as unknown as Record<string, unknown>[],
);
const providersPageBilingual = toBilingualDoc(
  providersPageSeed as unknown as Record<string, unknown>,
);

function providersFor(locale?: string | null): Provider[] {
  return resolveSeedDocs(providersBilingual, locale) as unknown as Provider[];
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

function toListItem(provider: Provider): ProviderListItem {
  return {
    id: provider.id,
    slug: provider.slug,
    name: provider.name,
    shortName: provider.shortName,
    summary: provider.summary,
    logo: provider.logo,
    featured: provider.featured,
    sortOrder: provider.sortOrder,
    rating: provider.rating,
    reviewCount: provider.reviewCount,
    gameCount: provider.gameCount,
    categoryLabels: provider.categoryLabels,
    country: provider.country,
    foundedYear: provider.foundedYear,
    status: provider.status,
    publishedAt: provider.publishedAt,
    updatedAt: provider.updatedAt,
  };
}

function sortProviders(
  items: readonly Provider[],
  sort: ProviderQuery["sort"],
): Provider[] {
  const next = [...items];

  switch (sort) {
    case "name-desc":
      return next.sort((a, b) => b.name.localeCompare(a.name));
    case "newest":
      return next.sort((a, b) => {
        const aTime = a.publishedAt ? Date.parse(a.publishedAt) : 0;
        const bTime = b.publishedAt ? Date.parse(b.publishedAt) : 0;
        return bTime - aTime;
      });
    case "popular":
      return next.sort((a, b) => b.gameCount - a.gameCount || b.rating - a.rating);
    case "rating":
      return next.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    case "name-asc":
    default:
      return next.sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
  }
}

export function filterProviders(query: ProviderQuery = {}): readonly Provider[] {
  const status = query.status ?? "published";
  let items = providersFor(query.locale).filter(
    (provider) => provider.status === status,
  );

  if (query.featured) {
    items = items.filter((provider) => provider.featured);
  }

  if (query.category) {
    const category = query.category.toLowerCase();
    items = items.filter(
      (provider) =>
        provider.categoryLabels.some((label) =>
          label.toLowerCase().includes(category),
        ) || provider.supportedGames.some((game) => game.includes(category)),
    );
  }

  if (query.letter) {
    const letter = query.letter.toUpperCase();
    items = items.filter((provider) =>
      provider.name.toUpperCase().startsWith(letter),
    );
  }

  if (query.search?.trim()) {
    const term = query.search.trim().toLowerCase();
    items = items.filter((provider) => {
      const haystack = [
        provider.name,
        provider.shortName,
        provider.summary,
        ...provider.categoryLabels,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(term);
    });
  }

  return sortProviders(items, query.sort);
}

export function queryProviders(
  query: ProviderQuery = {},
): CmsPaginatedResult<Provider> {
  return paginate(filterProviders(query), query.page, query.pageSize);
}

export function queryProviderListItems(
  query: ProviderQuery = {},
): CmsPaginatedResult<ProviderListItem> {
  const result = queryProviders(query);
  return {
    ...result,
    items: result.items.map(toListItem),
  };
}

export function findProviderBySlug(
  slug: CmsSlug,
  locale?: string | null,
): Provider | null {
  return (
    providersFor(locale).find(
      (provider) => provider.slug === slug && provider.status === "published",
    ) ?? null
  );
}

export function listPublishedProviderSlugs(): readonly string[] {
  return providersFor(parseLocale("en"))
    .filter((provider) => provider.status === "published")
    .map((provider) => provider.slug);
}

export function getProvidersPageContentSeed(
  locale?: string | null,
): ProvidersPageContent {
  return resolveSeedDoc(providersPageBilingual, locale) as unknown as ProvidersPageContent;
}

export function findProvidersBySlugs(
  slugs: readonly string[],
  locale?: string | null,
): readonly Provider[] {
  const set = new Set(slugs);
  return providersFor(locale).filter(
    (provider) => set.has(provider.slug) && provider.status === "published",
  );
}
