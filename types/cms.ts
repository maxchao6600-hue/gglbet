import type { AppLocale } from "@/config/i18n";

export type CmsLocale = AppLocale;

export type CmsSlug = string;

export type CmsId = string;

export type CmsImage = {
  readonly id: CmsId;
  readonly url: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly blurDataUrl?: string;
  readonly placeholderTone?: "brand" | "secondary" | "neutral" | "accent";
};

export type CmsSeoFields = {
  readonly metaTitle?: string;
  readonly metaDescription?: string;
  readonly canonicalPath?: string;
  readonly ogImage?: CmsImage;
  readonly noIndex?: boolean;
  readonly noFollow?: boolean;
};

export type CmsDocumentBase = {
  readonly id: CmsId;
  readonly slug: CmsSlug;
  readonly title: string;
  readonly locale: CmsLocale;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly publishedAt: string | null;
  readonly seo?: CmsSeoFields;
};

export type CmsListParams = {
  readonly locale?: CmsLocale;
  readonly page?: number;
  readonly pageSize?: number;
  readonly sort?: string;
  readonly search?: string;
  readonly letter?: string;
  readonly category?: string;
  readonly theme?: string;
  readonly featured?: boolean;
  readonly newGame?: boolean;
  readonly popular?: boolean;
  readonly status?: import("@/types/provider").ProviderStatus;
};

export type CmsPaginatedResult<T> = {
  readonly items: readonly T[];
  readonly total: number;
  readonly page: number;
  readonly pageSize: number;
  readonly hasMore: boolean;
};

export type CmsClient = {
  readonly getHomePage: (
    locale?: CmsLocale,
  ) => Promise<import("@/types/home").HomePageContent>;
  readonly getProvidersPage: (
    locale?: CmsLocale,
  ) => Promise<import("@/types/provider").ProvidersPageContent>;
  readonly getProviders: (
    params?: CmsListParams,
  ) => Promise<CmsPaginatedResult<import("@/types/provider").Provider>>;
  readonly getProviderBySlug: (
    slug: CmsSlug,
    locale?: CmsLocale,
  ) => Promise<import("@/types/provider").Provider | null>;
  readonly getProviderSlugs: () => Promise<readonly string[]>;
  readonly getGamesPage: (
    locale?: CmsLocale,
  ) => Promise<import("@/types/game").GamesPageContent>;
  readonly getGames: (
    params?: CmsListParams & {
      readonly providerSlug?: string;
      readonly category?: string;
      readonly theme?: string;
      readonly slugs?: readonly string[];
    },
  ) => Promise<CmsPaginatedResult<import("@/types/game").Game>>;
  readonly getGameBySlug: (
    slug: CmsSlug,
    locale?: CmsLocale,
  ) => Promise<import("@/types/game").Game | null>;
  readonly getGameByProviderAndSlug: (
    providerSlug: string,
    slug: CmsSlug,
    locale?: CmsLocale,
  ) => Promise<import("@/types/game").Game | null>;
  readonly getGameStaticParams: () => Promise<
    readonly { readonly provider: string; readonly slug: string }[]
  >;
  readonly getAllGameStaticParams: () => Promise<
    readonly { readonly provider: string; readonly slug: string }[]
  >;
  readonly getGameThemes: (
    locale?: CmsLocale,
  ) => Promise<readonly string[]>;
  readonly getGuidesPage: (
    locale?: CmsLocale,
  ) => Promise<import("@/types/guide").GuidesPageContent>;
  readonly getGuides: (
    params?: CmsListParams & {
      readonly category?: string;
      readonly difficulty?: string;
      readonly slugs?: readonly string[];
    },
  ) => Promise<CmsPaginatedResult<import("@/types/guide").Guide>>;
  readonly getGuideBySlug: (
    slug: CmsSlug,
    locale?: CmsLocale,
  ) => Promise<import("@/types/guide").Guide | null>;
  readonly getGuideByCategoryAndSlug: (
    category: string,
    slug: CmsSlug,
    locale?: CmsLocale,
  ) => Promise<import("@/types/guide").Guide | null>;
  readonly getGuideStaticParams: () => Promise<
    readonly { readonly category: string; readonly slug: string }[]
  >;
  readonly getGuideCategories: (
    locale?: CmsLocale,
  ) => Promise<readonly import("@/types/guide").GuideCategory[]>;
  readonly getGuideCategoryBySlug: (
    slug: string,
    locale?: CmsLocale,
  ) => Promise<import("@/types/guide").GuideCategory | null>;
  readonly getGuideCategorySlugs: () => Promise<readonly string[]>;
  readonly getNewsPage: (
    locale?: CmsLocale,
  ) => Promise<import("@/types/news").NewsPageContent>;
  readonly getNews: (
    params?: CmsListParams & {
      readonly category?: string;
      readonly breaking?: boolean;
      readonly popular?: boolean;
      readonly slugs?: readonly string[];
    },
  ) => Promise<CmsPaginatedResult<import("@/types/news").NewsArticle>>;
  readonly getNewsArticles: (
    params?: CmsListParams,
  ) => Promise<CmsPaginatedResult<import("@/types/news").NewsArticle>>;
  readonly getNewsBySlug: (
    slug: CmsSlug,
    locale?: CmsLocale,
  ) => Promise<import("@/types/news").NewsArticle | null>;
  readonly getNewsByCategoryAndSlug: (
    category: string,
    slug: CmsSlug,
    locale?: CmsLocale,
  ) => Promise<import("@/types/news").NewsArticle | null>;
  readonly getNewsStaticParams: () => Promise<
    readonly { readonly category: string; readonly slug: string }[]
  >;
  readonly getNewsCategories: (
    locale?: CmsLocale,
  ) => Promise<readonly import("@/types/news").NewsCategory[]>;
  readonly getNewsCategoryBySlug: (
    slug: string,
    locale?: CmsLocale,
  ) => Promise<import("@/types/news").NewsCategory | null>;
  readonly getNewsCategorySlugs: () => Promise<readonly string[]>;
  readonly getPromotionsPage: (
    locale?: CmsLocale,
  ) => Promise<import("@/types/promotion").PromotionsPageContent>;
  readonly getPromotions: (
    params?: CmsListParams & {
      readonly promotionType?: string;
      readonly featured?: boolean;
      readonly popular?: boolean;
      readonly slugs?: readonly string[];
    },
  ) => Promise<CmsPaginatedResult<import("@/types/promotion").Promotion>>;
  readonly getPromotionBySlug: (
    slug: CmsSlug,
    locale?: CmsLocale,
  ) => Promise<import("@/types/promotion").Promotion | null>;
  readonly getPromotionStaticParams: () => Promise<
    readonly { readonly slug: string }[]
  >;
  readonly getFaqs: (
    params?: CmsListParams,
  ) => Promise<CmsPaginatedResult<import("@/types/faq").FaqItem>>;
  readonly getEeatContent: (
    locale?: CmsLocale,
  ) => Promise<import("@/types/eeat").EeatContent>;
  readonly getTrustPages: (
    locale?: CmsLocale,
  ) => Promise<readonly import("@/types/eeat").TrustPageDocument[]>;
  readonly getTrustPageBySlug: (
    slug: CmsSlug,
    locale?: CmsLocale,
  ) => Promise<import("@/types/eeat").TrustPageDocument | null>;
  readonly getTrustPageSlugs: () => Promise<readonly string[]>;
  readonly getAuthors: (
    locale?: CmsLocale,
  ) => Promise<readonly import("@/types/eeat").EditorialPerson[]>;
  readonly getAuthorBySlug: (
    slug: CmsSlug,
    locale?: CmsLocale,
  ) => Promise<import("@/types/eeat").EditorialPerson | null>;
  readonly getAuthorSlugs: () => Promise<readonly string[]>;
  readonly getTrustPagesByAuthor: (
    slug: CmsSlug,
    locale?: CmsLocale,
  ) => Promise<readonly import("@/types/eeat").TrustPageDocument[]>;
};
