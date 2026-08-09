import type { CmsDocumentBase, CmsImage, CmsSlug } from "@/types/cms";

export type GameCategory =
  | "slots"
  | "live-casino"
  | "table"
  | "crash"
  | "fishing"
  | "lottery"
  | "other";

export type GameVolatility =
  | "low"
  | "medium"
  | "high"
  | "mixed"
  /** Official listing did not publish a volatility value. */
  | "unknown";

export type GameStatus = "draft" | "published" | "archived";

export type GameFaqItem = {
  readonly question: string;
  readonly answer: string;
};

export type GameAuthor = {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly bio?: string;
  readonly avatar?: CmsImage;
};

export type GameSchemaOverrides = {
  readonly type?: string;
  readonly applicationCategory?: string;
  readonly videoUrl?: string;
};

/**
 * Full CMS-driven Game document.
 * Adding a game in CMS should not require code changes.
 * Provider relationship is via providerSlug (single source of truth).
 */
export type Game = CmsDocumentBase & {
  readonly gameName: string;
  readonly gameCode: string;
  /** Official gglbet5.com / BetConstruct game id when synced from the partners API. */
  readonly officialId?: number;
  readonly providerSlug: CmsSlug;
  readonly providerName: string;
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly canonicalPath: string;
  readonly shortDescription: string;
  readonly fullDescription: string;
  readonly heroTitle: string;
  readonly heroDescription: string;
  readonly thumbnail: CmsImage;
  readonly coverImage: CmsImage;
  readonly gallery: readonly CmsImage[];
  readonly category: GameCategory;
  readonly subCategory: string;
  readonly tags: readonly string[];
  readonly theme: string;
  readonly rtp?: number;
  readonly rtpNotes?: string;
  readonly volatility: GameVolatility;
  readonly volatilityGuide: string;
  readonly minBet?: string;
  readonly maxBet?: string;
  readonly maxWin?: string;
  readonly releaseDate?: string;
  readonly supportedDevices: readonly string[];
  readonly supportedPlatforms: readonly string[];
  readonly supportedLanguages: readonly string[];
  readonly demoAvailable: boolean;
  readonly features: readonly string[];
  readonly bonusFeatures: readonly string[];
  readonly paylines?: string;
  readonly reels?: number;
  readonly rows?: number;
  readonly jackpot?: string;
  readonly rating: number;
  readonly reviewCount: number;
  readonly howToPlay: readonly string[];
  readonly tips: readonly string[];
  readonly strategy: readonly string[];
  readonly faq: readonly GameFaqItem[];
  readonly relatedGameSlugs: readonly CmsSlug[];
  readonly relatedProviderSlugs: readonly CmsSlug[];
  readonly relatedGuideSlugs: readonly CmsSlug[];
  readonly relatedPromotionSlugs: readonly CmsSlug[];
  readonly relatedNewsSlugs: readonly CmsSlug[];
  readonly status: GameStatus;
  readonly featured: boolean;
  readonly newGame: boolean;
  readonly popular: boolean;
  readonly sortOrder: number;
  readonly lastUpdated: string;
  readonly author: GameAuthor;
  readonly reviewer?: GameAuthor;
  readonly publishDate: string;
  readonly readingTimeMinutes: number;
  readonly difficulty?: import("@/types/content").ContentDifficulty;
  readonly factChecked: boolean;
  /** Unified Content Engine body — CMS blocks shared with Guide/News/Promotion/Provider. */
  readonly content: readonly import("@/types/content").ContentBlock[];
  readonly tableOfContents: readonly import("@/types/content").ContentTocItem[];
  readonly schema?: GameSchemaOverrides;
  readonly ctaPrimaryLabel: string;
  readonly ctaPrimaryHref: string;
  readonly ctaSecondaryLabel: string;
  readonly ctaSecondaryHref: string;
  readonly responsibleGamingNotes: string;
};

export type GameListItem = Pick<
  Game,
  | "id"
  | "slug"
  | "gameName"
  | "gameCode"
  | "providerSlug"
  | "providerName"
  | "shortDescription"
  | "thumbnail"
  | "category"
  | "theme"
  | "rtp"
  | "volatility"
  | "featured"
  | "newGame"
  | "popular"
  | "rating"
  | "reviewCount"
  | "status"
  | "sortOrder"
  | "publishedAt"
  | "updatedAt"
  | "canonicalPath"
>;

export type GamesPageContent = {
  readonly seo: {
    readonly title: string;
    readonly description: string;
    readonly path: string;
  };
  readonly hero: {
    readonly heading: string;
    readonly subheading: string;
    readonly body: string;
    readonly mediaLabel: string;
  };
  readonly seoContent: {
    readonly heading: string;
    readonly body: string;
  };
  readonly faq: readonly GameFaqItem[];
  readonly finalCta: {
    readonly heading: string;
    readonly body: string;
    readonly primaryLabel: string;
    readonly primaryHref: string;
    readonly secondaryLabel: string;
    readonly secondaryHref: string;
  };
};

export type GameQuery = {
  readonly locale?: string;
  readonly page?: number;
  readonly pageSize?: number;
  readonly search?: string;
  readonly letter?: string;
  readonly category?: string;
  readonly theme?: string;
  readonly providerSlug?: string;
  readonly featured?: boolean;
  readonly newGame?: boolean;
  readonly popular?: boolean;
  readonly sort?:
    | "name-asc"
    | "name-desc"
    | "newest"
    | "popular"
    | "rating"
    | "updated";
  readonly status?: GameStatus;
  readonly slugs?: readonly string[];
};
