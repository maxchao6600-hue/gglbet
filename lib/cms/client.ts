import {
  parseLocale,
  resolveSeedDoc,
  toBilingualDoc,
} from "@/lib/cms/locale";
import { homePageSeed } from "@/lib/cms/seed/home-page";
import {
  findAuthorBySlug,
  findTrustPageBySlug,
  getEeatContentSeed,
  listAuthorSlugs,
  listAuthors,
  listTrustPageSlugs,
  listTrustPages,
  listTrustPagesByAuthor,
} from "@/lib/cms/repositories/eeat";
import {
  findGameByProviderAndSlug,
  findGameBySlug,
  getGamesPageContentSeed,
  listAllPublishedGameParams,
  listGameThemes,
  listPublishedGameParams,
  queryGames,
} from "@/lib/cms/repositories/games";
import {
  findGuideByCategoryAndSlug,
  findGuideBySlug,
  findGuideCategoryBySlug,
  getGuidesPageContentSeed,
  listPublishedGuideCategories,
  listPublishedGuideCategorySlugs,
  listPublishedGuideParams,
  queryGuides,
} from "@/lib/cms/repositories/guides";
import {
  findProviderBySlug,
  getProvidersPageContentSeed,
  listPublishedProviderSlugs,
  queryProviders,
} from "@/lib/cms/repositories/providers";
import {
  findNewsByCategoryAndSlug,
  findNewsBySlug,
  findNewsCategoryBySlug,
  getNewsPageContentSeed,
  listPublishedNewsCategories,
  listPublishedNewsCategorySlugs,
  listPublishedNewsParams,
  queryNews,
} from "@/lib/cms/repositories/news";
import {
  findPromotionBySlug,
  getPromotionsPageContentSeed,
  listPublishedPromotionSlugs,
  queryPromotions,
} from "@/lib/cms/repositories/promotions";
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

const homePageBilingual = toBilingualDoc(
  homePageSeed as unknown as Record<string, unknown>,
);

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

/**
 * Stub CMS client. Wire Payload later without changing feature-layer call sites.
 */
export const cmsClient: CmsClient = {
  async getHomePage(locale): Promise<HomePageContent> {
    return resolveSeedDoc(
      homePageBilingual,
      locale,
    ) as unknown as HomePageContent;
  },
  async getProvidersPage(locale): Promise<ProvidersPageContent> {
    return getProvidersPageContentSeed(locale);
  },
  async getProviders(params) {
    return queryProviders(toProviderQuery(params));
  },
  async getProviderBySlug(slug, locale) {
    return findProviderBySlug(slug, locale);
  },
  async getProviderSlugs() {
    return listPublishedProviderSlugs();
  },
  async getGamesPage(locale): Promise<GamesPageContent> {
    return getGamesPageContentSeed(locale);
  },
  async getGames(params) {
    return queryGames(toGameQuery(params));
  },
  async getGameBySlug(slug, locale) {
    return findGameBySlug(slug, locale);
  },
  async getGameByProviderAndSlug(providerSlug, slug, locale) {
    return findGameByProviderAndSlug(providerSlug, slug, locale);
  },
  async getGameStaticParams() {
    return listPublishedGameParams();
  },
  async getAllGameStaticParams() {
    return listAllPublishedGameParams();
  },
  async getGameThemes(locale) {
    return listGameThemes(locale ?? parseLocale("en"));
  },
  async getGuidesPage(locale): Promise<GuidesPageContent> {
    return getGuidesPageContentSeed(locale);
  },
  async getGuides(params) {
    return queryGuides(toGuideQuery(params));
  },
  async getGuideBySlug(slug, locale) {
    return findGuideBySlug(slug, locale);
  },
  async getGuideByCategoryAndSlug(category, slug, locale) {
    return findGuideByCategoryAndSlug(category, slug, locale);
  },
  async getGuideStaticParams() {
    return listPublishedGuideParams();
  },
  async getGuideCategories(locale): Promise<readonly GuideCategory[]> {
    return listPublishedGuideCategories(locale);
  },
  async getGuideCategoryBySlug(slug, locale) {
    return findGuideCategoryBySlug(slug, locale);
  },
  async getGuideCategorySlugs() {
    return listPublishedGuideCategorySlugs();
  },
  async getNewsPage(locale): Promise<NewsPageContent> {
    return getNewsPageContentSeed(locale);
  },
  async getNews(params) {
    return queryNews(toNewsQuery(params));
  },
  async getNewsArticles(params) {
    return queryNews(toNewsQuery(params));
  },
  async getNewsBySlug(slug, locale) {
    return findNewsBySlug(slug, locale);
  },
  async getNewsByCategoryAndSlug(category, slug, locale) {
    return findNewsByCategoryAndSlug(category, slug, locale);
  },
  async getNewsStaticParams() {
    return listPublishedNewsParams();
  },
  async getNewsCategories(locale): Promise<readonly NewsCategory[]> {
    return listPublishedNewsCategories(locale);
  },
  async getNewsCategoryBySlug(slug, locale) {
    return findNewsCategoryBySlug(slug, locale);
  },
  async getNewsCategorySlugs() {
    return listPublishedNewsCategorySlugs();
  },
  async getPromotionsPage(locale): Promise<PromotionsPageContent> {
    return getPromotionsPageContentSeed(locale);
  },
  async getPromotions(params) {
    return queryPromotions(toPromotionQuery(params));
  },
  async getPromotionBySlug(slug, locale) {
    return findPromotionBySlug(slug, locale);
  },
  async getPromotionStaticParams() {
    const slugs = await listPublishedPromotionSlugs();
    return slugs.map((slug) => ({ slug }));
  },
  async getFaqs() {
    return emptyResult<FaqItem>();
  },
  async getEeatContent(locale): Promise<EeatContent> {
    return getEeatContentSeed(locale);
  },
  async getTrustPages(locale) {
    return listTrustPages(locale);
  },
  async getTrustPageBySlug(slug, locale) {
    return findTrustPageBySlug(slug, locale);
  },
  async getTrustPageSlugs() {
    return listTrustPageSlugs();
  },
  async getAuthors(locale) {
    return listAuthors(locale);
  },
  async getAuthorBySlug(slug, locale) {
    return findAuthorBySlug(slug, locale);
  },
  async getAuthorSlugs() {
    return listAuthorSlugs();
  },
  async getTrustPagesByAuthor(slug, locale) {
    return listTrustPagesByAuthor(slug, locale);
  },
};
