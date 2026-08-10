import { getCmsClient } from "@/lib/cms";
import type {
  CmsListParams,
  CmsLocale,
  CmsPaginatedResult,
  CmsSlug,
} from "@/types/cms";
import type {
  NewsArticle,
  NewsCategory,
  NewsListItem,
  NewsPageContent,
} from "@/types/news";

export async function listNews(
  params?: CmsListParams & {
    readonly category?: string;
    readonly breaking?: boolean;
    readonly popular?: boolean;
    readonly slugs?: readonly string[];
  },
): Promise<CmsPaginatedResult<NewsArticle>> {
  return getCmsClient().getNews(params);
}

export async function listNewsListItems(
  params?: CmsListParams & {
    readonly category?: string;
    readonly breaking?: boolean;
    readonly popular?: boolean;
    readonly featured?: boolean;
  },
): Promise<CmsPaginatedResult<NewsListItem>> {
  const { queryNewsListItems } = await import("@/lib/cms/repositories/news");
  return queryNewsListItems({
    page: params?.page,
    pageSize: params?.pageSize,
    search: params?.search,
    featured: params?.featured,
    breaking: params?.breaking,
    popular: params?.popular,
    category: params?.category,
    status: params?.status as never,
    sort: params?.sort as never,
    locale: params?.locale,
  });
}

export async function listNewsArticles(
  params?: CmsListParams,
): Promise<CmsPaginatedResult<NewsArticle>> {
  return getCmsClient().getNewsArticles(params);
}

export async function getNewsBySlug(
  slug: CmsSlug,
  locale?: CmsLocale,
): Promise<NewsArticle | null> {
  return getCmsClient().getNewsBySlug(slug, locale);
}

export async function getNewsByCategoryAndSlug(
  category: string,
  slug: CmsSlug,
  locale?: CmsLocale,
): Promise<NewsArticle | null> {
  return getCmsClient().getNewsByCategoryAndSlug(category, slug, locale);
}

export async function getNewsStaticParams(): Promise<
  readonly { readonly category: string; readonly slug: string }[]
> {
  return getCmsClient().getNewsStaticParams();
}

export async function getNewsPageContent(
  locale?: CmsLocale,
): Promise<NewsPageContent> {
  return getCmsClient().getNewsPage(locale);
}

export async function listNewsCategories(
  locale?: CmsLocale,
): Promise<readonly NewsCategory[]> {
  return getCmsClient().getNewsCategories(locale);
}

export async function getNewsCategoryBySlug(
  slug: string,
  locale?: CmsLocale,
): Promise<NewsCategory | null> {
  return getCmsClient().getNewsCategoryBySlug(slug, locale);
}

export async function getNewsCategorySlugs(): Promise<readonly string[]> {
  return getCmsClient().getNewsCategorySlugs();
}

export async function listNewsBySlugs(
  slugs: readonly string[],
  locale?: CmsLocale,
): Promise<readonly NewsArticle[]> {
  if (slugs.length === 0) return [];
  const result = await listNews({ slugs, pageSize: slugs.length, locale });
  return result.items;
}

export async function listRelatedNews(
  article: NewsArticle,
  limit = 6,
  locale?: CmsLocale,
): Promise<readonly NewsArticle[]> {
  const bySlug = await listNewsBySlugs(article.relatedNewsSlugs, locale);
  if (bySlug.length >= limit) {
    return bySlug.slice(0, limit);
  }

  const sameCategory = await listNews({
    category: article.category,
    pageSize: limit + 1,
    sort: "newest",
    locale,
  });

  const merged = [...bySlug];
  const seen = new Set(merged.map((item) => item.slug));
  seen.add(article.slug);

  for (const item of sameCategory.items) {
    if (seen.has(item.slug)) continue;
    merged.push(item);
    seen.add(item.slug);
    if (merged.length >= limit) break;
  }

  return merged.slice(0, limit);
}
