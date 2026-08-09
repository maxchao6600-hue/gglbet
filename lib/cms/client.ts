import {
  parseLocale,
  resolveSeedDoc,
  toBilingualDoc,
} from "@/lib/cms/locale";
import type { CmsClient, CmsListParams, CmsPaginatedResult } from "@/types/cms";
import type { EeatContent } from "@/types/eeat";
import type { FaqItem } from "@/types/faq";
import type { GameQuery, GamesPageContent } from "@/types/game";
import type {
  GuideCategory,
  GuideDifficulty,
  GuideQuery,
  GuidesPageContent,
} from "@/types/guide";
import type { HomePageContent } from "@/types/home";
import type { NewsCategory, NewsPageContent, NewsQuery } from "@/types/news";
import type { PromotionQuery, PromotionsPageContent } from "@/types/promotion";
import type { ProviderQuery, ProvidersPageContent } from "@/types/provider";

const EMPTY_PAGE = 1;
const EMPTY_PAGE_SIZE = 20;

function emptyResult<T>(): CmsPaginatedResult<T> {
  return {
    items: [],
    total: 0,
    page: EMPTY_PAGE,
    pageSize: EMPTY_PAGE_SIZE,
    hasMore: false,
  };
}

function toProviderQuery(params?: CmsListParams): ProviderQuery {
  const sort = params?.sort;
  const allowedSort =
    sort === "name-asc" ||
    sort === "name-desc" ||
    sort === "newest" ||
    sort === "popular" ||
    sort === "rating"
      ? sort
      : "name-asc";

  return {
    locale: params?.locale,
    page: params?.page,
    pageSize: params?.pageSize,
    search: params?.search,
    letter: params?.letter,
    category: params?.category,
    featured: params?.featured,
    sort: allowedSort,
    status: params?.status ?? "published",
  };
}

function toGameQuery(
  params?: CmsListParams & {
    readonly providerSlug?: string;
    readonly category?: string;
    readonly theme?: string;
    readonly newGame?: boolean;
    readonly popular?: boolean;
    readonly slugs?: readonly string[];
  },
): GameQuery {
  const sort = params?.sort;
  const allowedSort =
    sort === "name-asc" ||
    sort === "name-desc" ||
    sort === "newest" ||
    sort === "popular" ||
    sort === "rating" ||
    sort === "updated"
      ? sort
      : "name-asc";

  return {
    locale: params?.locale,
    page: params?.page,
    pageSize: params?.pageSize,
    search: params?.search,
    letter: params?.letter,
    category: params?.category,
    theme: params?.theme,
    providerSlug: params?.providerSlug,
    featured: params?.featured,
    newGame: params?.newGame,
    popular: params?.popular,
    sort: allowedSort,
    status: "published",
    slugs: params?.slugs,
  };
}

function toGuideQuery(
  params?: CmsListParams & {
    readonly category?: string;
    readonly difficulty?: string;
    readonly slugs?: readonly string[];
  },
): GuideQuery {
  const sort = params?.sort;
  const allowedSort =
    sort === "newest" ||
    sort === "updated" ||
    sort === "popular" ||
    sort === "reading-asc" ||
    sort === "title-asc"
      ? sort
      : "newest";

  const difficulty =
    params?.difficulty === "beginner" ||
    params?.difficulty === "intermediate" ||
    params?.difficulty === "advanced"
      ? (params.difficulty as GuideDifficulty)
      : undefined;

  return {
    locale: params?.locale,
    page: params?.page,
    pageSize: params?.pageSize,
    search: params?.search,
    category: params?.category,
    featured: params?.featured,
    popular: params?.popular,
    difficulty,
    sort: allowedSort,
    status: "published",
    slugs: params?.slugs,
  };
}

function toNewsQuery(
  params?: CmsListParams & {
    readonly category?: string;
    readonly breaking?: boolean;
    readonly popular?: boolean;
    readonly slugs?: readonly string[];
  },
): NewsQuery {
  const sort = params?.sort;
  const allowedSort =
    sort === "newest" ||
    sort === "updated" ||
    sort === "popular" ||
    sort === "title-asc"
      ? sort
      : "newest";

  return {
    locale: params?.locale,
    page: params?.page,
    pageSize: params?.pageSize,
    search: params?.search,
    category: params?.category,
    featured: params?.featured,
    breaking: params?.breaking,
    popular: params?.popular,
    sort: allowedSort,
    status: "published",
    slugs: params?.slugs,
  };
}

function toPromotionQuery(
  params?: CmsListParams & {
    readonly promotionType?: string;
    readonly featured?: boolean;
    readonly popular?: boolean;
    readonly slugs?: readonly string[];
  },
): PromotionQuery {
  const sort = params?.sort;
  const allowedSort =
    sort === "newest" ||
    sort === "ending" ||
    sort === "popular" ||
    sort === "title-asc"
      ? sort
      : "newest";

  return {
    locale: params?.locale,
    page: params?.page,
    pageSize: params?.pageSize,
    search: params?.search,
    promotionType: params?.promotionType,
    featured: params?.featured,
    popular: params?.popular,
    sort: allowedSort,
    status: "published",
    slugs: params?.slugs,
  };
}

async function homeSeed() {
  const { homePageSeed } = await import("@/lib/cms/seed/home-page");
  return toBilingualDoc(homePageSeed as unknown as Record<string, unknown>);
}

/**
 * CMS client with per-domain dynamic imports so OpenNext/webpack can
 * tree-shake and avoid one monolithic server chunk of all seeds.
 */
export const cmsClient: CmsClient = {
  async getHomePage(locale): Promise<HomePageContent> {
    return resolveSeedDoc(
      await homeSeed(),
      locale,
    ) as unknown as HomePageContent;
  },
  async getProvidersPage(locale): Promise<ProvidersPageContent> {
    const { getProvidersPageContentSeed } = await import(
      "@/lib/cms/repositories/providers"
    );
    return getProvidersPageContentSeed(locale);
  },
  async getProviders(params) {
    const { queryProviders } = await import("@/lib/cms/repositories/providers");
    return queryProviders(toProviderQuery(params));
  },
  async getProviderBySlug(slug, locale) {
    const { findProviderBySlug } = await import(
      "@/lib/cms/repositories/providers"
    );
    return findProviderBySlug(slug, locale);
  },
  async getProviderSlugs() {
    const { listPublishedProviderSlugs } = await import(
      "@/lib/cms/repositories/providers"
    );
    return listPublishedProviderSlugs();
  },
  async getGamesPage(locale): Promise<GamesPageContent> {
    const { getGamesPageContentSeed } = await import(
      "@/lib/cms/repositories/games"
    );
    return getGamesPageContentSeed(locale);
  },
  async getGames(params) {
    const { queryGames } = await import("@/lib/cms/repositories/games");
    return queryGames(toGameQuery(params));
  },
  async getGameBySlug(slug, locale) {
    const { findGameBySlug } = await import("@/lib/cms/repositories/games");
    return findGameBySlug(slug, locale);
  },
  async getGameByProviderAndSlug(providerSlug, slug, locale) {
    const { findGameByProviderAndSlug } = await import(
      "@/lib/cms/repositories/games"
    );
    return findGameByProviderAndSlug(providerSlug, slug, locale);
  },
  async getGameStaticParams() {
    const { listPublishedGameParams } = await import(
      "@/lib/cms/repositories/games"
    );
    return listPublishedGameParams();
  },
  async getAllGameStaticParams() {
    const { listAllPublishedGameParams } = await import(
      "@/lib/cms/repositories/games"
    );
    return listAllPublishedGameParams();
  },
  async getGameThemes(locale) {
    const { listGameThemes } = await import("@/lib/cms/repositories/games");
    return listGameThemes(locale ?? parseLocale("en"));
  },
  async getGuidesPage(locale): Promise<GuidesPageContent> {
    const { getGuidesPageContentSeed } = await import(
      "@/lib/cms/repositories/guides"
    );
    return getGuidesPageContentSeed(locale);
  },
  async getGuides(params) {
    const { queryGuides } = await import("@/lib/cms/repositories/guides");
    return queryGuides(toGuideQuery(params));
  },
  async getGuideBySlug(slug, locale) {
    const { findGuideBySlug } = await import("@/lib/cms/repositories/guides");
    return findGuideBySlug(slug, locale);
  },
  async getGuideByCategoryAndSlug(category, slug, locale) {
    const { findGuideByCategoryAndSlug } = await import(
      "@/lib/cms/repositories/guides"
    );
    return findGuideByCategoryAndSlug(category, slug, locale);
  },
  async getGuideStaticParams() {
    const { listPublishedGuideParams } = await import(
      "@/lib/cms/repositories/guides"
    );
    return listPublishedGuideParams();
  },
  async getGuideCategories(locale): Promise<readonly GuideCategory[]> {
    const { listPublishedGuideCategories } = await import(
      "@/lib/cms/repositories/guides"
    );
    return listPublishedGuideCategories(locale);
  },
  async getGuideCategoryBySlug(slug, locale) {
    const { findGuideCategoryBySlug } = await import(
      "@/lib/cms/repositories/guides"
    );
    return findGuideCategoryBySlug(slug, locale);
  },
  async getGuideCategorySlugs() {
    const { listPublishedGuideCategorySlugs } = await import(
      "@/lib/cms/repositories/guides"
    );
    return listPublishedGuideCategorySlugs();
  },
  async getNewsPage(locale): Promise<NewsPageContent> {
    const { getNewsPageContentSeed } = await import(
      "@/lib/cms/repositories/news"
    );
    return getNewsPageContentSeed(locale);
  },
  async getNews(params) {
    const { queryNews } = await import("@/lib/cms/repositories/news");
    return queryNews(toNewsQuery(params));
  },
  async getNewsArticles(params) {
    const { queryNews } = await import("@/lib/cms/repositories/news");
    return queryNews(toNewsQuery(params));
  },
  async getNewsBySlug(slug, locale) {
    const { findNewsBySlug } = await import("@/lib/cms/repositories/news");
    return findNewsBySlug(slug, locale);
  },
  async getNewsByCategoryAndSlug(category, slug, locale) {
    const { findNewsByCategoryAndSlug } = await import(
      "@/lib/cms/repositories/news"
    );
    return findNewsByCategoryAndSlug(category, slug, locale);
  },
  async getNewsStaticParams() {
    const { listPublishedNewsParams } = await import(
      "@/lib/cms/repositories/news"
    );
    return listPublishedNewsParams();
  },
  async getNewsCategories(locale): Promise<readonly NewsCategory[]> {
    const { listPublishedNewsCategories } = await import(
      "@/lib/cms/repositories/news"
    );
    return listPublishedNewsCategories(locale);
  },
  async getNewsCategoryBySlug(slug, locale) {
    const { findNewsCategoryBySlug } = await import(
      "@/lib/cms/repositories/news"
    );
    return findNewsCategoryBySlug(slug, locale);
  },
  async getNewsCategorySlugs() {
    const { listPublishedNewsCategorySlugs } = await import(
      "@/lib/cms/repositories/news"
    );
    return listPublishedNewsCategorySlugs();
  },
  async getPromotionsPage(locale): Promise<PromotionsPageContent> {
    const { getPromotionsPageContentSeed } = await import(
      "@/lib/cms/repositories/promotions"
    );
    return getPromotionsPageContentSeed(locale);
  },
  async getPromotions(params) {
    const { queryPromotions } = await import(
      "@/lib/cms/repositories/promotions"
    );
    return queryPromotions(toPromotionQuery(params));
  },
  async getPromotionBySlug(slug, locale) {
    const { findPromotionBySlug } = await import(
      "@/lib/cms/repositories/promotions"
    );
    return findPromotionBySlug(slug, locale);
  },
  async getPromotionStaticParams() {
    const { listPublishedPromotionSlugs } = await import(
      "@/lib/cms/repositories/promotions"
    );
    const slugs = await listPublishedPromotionSlugs();
    return slugs.map((slug) => ({ slug }));
  },
  async getFaqs() {
    return emptyResult<FaqItem>();
  },
  async getEeatContent(locale): Promise<EeatContent> {
    const { getEeatContentSeed } = await import("@/lib/cms/repositories/eeat");
    return getEeatContentSeed(locale);
  },
  async getTrustPages(locale) {
    const { listTrustPages } = await import("@/lib/cms/repositories/eeat");
    return listTrustPages(locale);
  },
  async getTrustPageBySlug(slug, locale) {
    const { findTrustPageBySlug } = await import("@/lib/cms/repositories/eeat");
    return findTrustPageBySlug(slug, locale);
  },
  async getTrustPageSlugs() {
    const { listTrustPageSlugs } = await import("@/lib/cms/repositories/eeat");
    return listTrustPageSlugs();
  },
  async getAuthors(locale) {
    const { listAuthors } = await import("@/lib/cms/repositories/eeat");
    return listAuthors(locale);
  },
  async getAuthorBySlug(slug, locale) {
    const { findAuthorBySlug } = await import("@/lib/cms/repositories/eeat");
    return findAuthorBySlug(slug, locale);
  },
  async getAuthorSlugs() {
    const { listAuthorSlugs } = await import("@/lib/cms/repositories/eeat");
    return listAuthorSlugs();
  },
  async getTrustPagesByAuthor(slug, locale) {
    const { listTrustPagesByAuthor } = await import(
      "@/lib/cms/repositories/eeat"
    );
    return listTrustPagesByAuthor(slug, locale);
  },
};
