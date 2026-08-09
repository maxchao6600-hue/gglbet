import type { CmsDocumentBase, CmsImage, CmsSlug } from "@/types/cms";

export type PromotionLifecycleStatus =
  | "draft"
  | "scheduled"
  | "active"
  | "expired"
  | "archived";

export type PromotionType =
  | "welcome"
  | "deposit"
  | "cashback"
  | "free-spins"
  | "reload"
  | "vip"
  | "seasonal"
  | "other";

export type BonusType =
  | "percentage"
  | "fixed"
  | "free-spins"
  | "cashback"
  | "mixed";

export type PromotionFaqItem = {
  readonly question: string;
  readonly answer: string;
};

export type PromotionSchemaOverrides = {
  readonly type?: string;
  readonly availability?: string;
};

/**
 * Full CMS-driven Promotion document for the SEO content hub.
 */
export type Promotion = CmsDocumentBase & {
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly canonicalPath: string;
  readonly heroTitle: string;
  readonly heroDescription: string;
  readonly excerpt: string;
  readonly overview: string;
  readonly coverImage: CmsImage;
  readonly bannerImage: CmsImage;
  readonly promotionType: PromotionType;
  readonly bonusType: BonusType;
  readonly bonusAmount: string;
  readonly currency: string;
  readonly minimumDeposit?: string;
  readonly maximumBonus?: string;
  readonly turnoverRequirement?: string;
  readonly eligibleGames: readonly string[];
  readonly eligibleGameSlugs: readonly CmsSlug[];
  readonly requirements: readonly string[];
  readonly startDate: string | null;
  readonly endDate: string | null;
  readonly status: PromotionLifecycleStatus;
  readonly featured: boolean;
  readonly popular: boolean;
  readonly sortOrder: number;
  readonly terms: readonly string[];
  readonly faq: readonly PromotionFaqItem[];
  readonly relatedGameSlugs: readonly CmsSlug[];
  readonly relatedProviderSlugs: readonly CmsSlug[];
  readonly relatedGuideSlugs: readonly CmsSlug[];
  readonly relatedNewsSlugs: readonly CmsSlug[];
  readonly schema?: PromotionSchemaOverrides;
  /** Editorial verification — does not change official bonus figures. */
  readonly lastVerified: boolean;
  readonly verifiedDate: string;
  readonly sourceUrl: string;
  readonly sourceName: string;
  readonly author: import("@/types/content").ContentPerson;
  readonly reviewer?: import("@/types/content").ContentPerson;
  readonly publishDate: string;
  readonly updatedDate: string;
  readonly readingTimeMinutes: number;
  readonly difficulty?: import("@/types/content").ContentDifficulty;
  readonly factChecked: boolean;
  /** Unified Content Engine body. */
  readonly content: readonly import("@/types/content").ContentBlock[];
  readonly tableOfContents: readonly import("@/types/content").ContentTocItem[];
  readonly ctaPrimaryLabel: string;
  readonly ctaPrimaryHref: string;
  readonly ctaSecondaryLabel: string;
  readonly ctaSecondaryHref: string;
};

export type PromotionsPageContent = {
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
  readonly faq: readonly PromotionFaqItem[];
  readonly finalCta: {
    readonly heading: string;
    readonly body: string;
    readonly primaryLabel: string;
    readonly primaryHref: string;
    readonly secondaryLabel: string;
    readonly secondaryHref: string;
  };
  readonly categories: readonly {
    readonly id: string;
    readonly label: string;
    readonly promotionType: PromotionType | "all";
    readonly body: string;
  }[];
};

export type PromotionQuery = {
  readonly locale?: string;
  readonly page?: number;
  readonly pageSize?: number;
  readonly search?: string;
  readonly promotionType?: PromotionType | string;
  readonly featured?: boolean;
  readonly popular?: boolean;
  readonly sort?: "newest" | "ending" | "popular" | "title-asc";
  readonly status?: PromotionLifecycleStatus | "published";
  readonly slugs?: readonly string[];
};
