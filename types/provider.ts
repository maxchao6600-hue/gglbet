import type { CmsDocumentBase, CmsImage, CmsSlug } from "@/types/cms";
import type { GameCategory } from "@/types/game";

export type ProviderStatus = "draft" | "published" | "archived";

export type ProviderVolatility = "low" | "medium" | "high" | "mixed";

export type ProviderFaqItem = {
  readonly question: string;
  readonly answer: string;
};

export type ProviderAuthor = {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly bio?: string;
  readonly avatar?: CmsImage;
};

export type ProviderRelatedRef = {
  readonly slug: CmsSlug;
  readonly title: string;
};

export type ProviderSchemaOverrides = {
  readonly type?: string;
  readonly additionalType?: string;
};

/**
 * Full CMS-driven Provider document.
 * Adding a provider in CMS should not require code changes.
 */
export type Provider = CmsDocumentBase & {
  readonly name: string;
  readonly shortName: string;
  readonly summary: string;
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly canonicalPath: string;
  readonly heroTitle: string;
  readonly heroDescription: string;
  readonly intro: string;
  readonly history: string;
  readonly features: readonly string[];
  readonly advantages: readonly string[];
  readonly supportedGames: readonly GameCategory[];
  readonly popularGameSlugs: readonly CmsSlug[];
  readonly rtp?: number;
  readonly rtpNotes?: string;
  readonly volatility: ProviderVolatility;
  readonly volatilityGuide: string;
  readonly foundedYear?: number;
  readonly country?: string;
  readonly website?: string;
  readonly logo: CmsImage;
  readonly heroImage: CmsImage;
  readonly gallery: readonly CmsImage[];
  readonly rating: number;
  readonly reviewCount: number;
  readonly faq: readonly ProviderFaqItem[];
  readonly pros: readonly string[];
  readonly cons: readonly string[];
  readonly licenses: readonly string[];
  readonly supportedDevices: readonly string[];
  readonly supportedPlatforms: readonly string[];
  readonly supportedLanguages: readonly string[];
  readonly paymentMethods: readonly string[];
  readonly securityNotes: string;
  readonly fairPlayNotes: string;
  readonly howToPlay: readonly string[];
  readonly tips: readonly string[];
  readonly whyChoose: readonly string[];
  readonly relatedProviderSlugs: readonly CmsSlug[];
  readonly relatedGuideSlugs: readonly CmsSlug[];
  readonly relatedNewsSlugs: readonly CmsSlug[];
  readonly relatedPromotionSlugs: readonly CmsSlug[];
  readonly schema?: ProviderSchemaOverrides;
  readonly lastUpdated: string;
  readonly author: ProviderAuthor;
  readonly reviewer?: ProviderAuthor;
  readonly publishDate: string;
  readonly readingTimeMinutes: number;
  readonly difficulty?: import("@/types/content").ContentDifficulty;
  readonly factChecked: boolean;
  /** Unified Content Engine body. */
  readonly content: readonly import("@/types/content").ContentBlock[];
  readonly tableOfContents: readonly import("@/types/content").ContentTocItem[];
  readonly status: ProviderStatus;
  readonly sortOrder: number;
  readonly featured: boolean;
  readonly categoryLabels: readonly string[];
  readonly gameCount: number;
  readonly ctaPrimaryLabel: string;
  readonly ctaPrimaryHref: string;
  readonly ctaSecondaryLabel: string;
  readonly ctaSecondaryHref: string;
};

export type ProviderListItem = Pick<
  Provider,
  | "id"
  | "slug"
  | "name"
  | "shortName"
  | "summary"
  | "logo"
  | "featured"
  | "sortOrder"
  | "rating"
  | "reviewCount"
  | "gameCount"
  | "categoryLabels"
  | "supportedGames"
  | "canonicalPath"
  | "country"
  | "foundedYear"
  | "status"
  | "publishedAt"
  | "updatedAt"
>;

export type ProvidersPageContent = {
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
  readonly faq: readonly ProviderFaqItem[];
  readonly finalCta: {
    readonly heading: string;
    readonly body: string;
    readonly primaryLabel: string;
    readonly primaryHref: string;
    readonly secondaryLabel: string;
    readonly secondaryHref: string;
  };
};

export type ProviderQuery = {
  readonly locale?: string;
  readonly page?: number;
  readonly pageSize?: number;
  readonly search?: string;
  readonly letter?: string;
  readonly category?: string;
  readonly featured?: boolean;
  readonly sort?: "name-asc" | "name-desc" | "newest" | "popular" | "rating";
  readonly status?: ProviderStatus;
};
