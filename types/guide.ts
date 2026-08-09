import type { CmsDocumentBase, CmsImage, CmsSlug } from "@/types/cms";
import type { ContentBlock, ContentTocItem } from "@/types/content";

export type GuideStatus = "draft" | "published" | "archived";

export type GuideDifficulty = "beginner" | "intermediate" | "advanced";

export type GuideCategorySlug =
  | "beginner"
  | "casino"
  | "slots"
  | "live-casino"
  | "sports"
  | "fishing"
  | "lottery"
  | "promotions"
  | "payments"
  | "vip"
  | "security"
  | "responsible-gaming"
  | "app-download"
  | "troubleshooting";

export type GuideFaqItem = {
  readonly question: string;
  readonly answer: string;
};

export type GuidePerson = {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly bio?: string;
  readonly role?: string;
  readonly avatar?: CmsImage;
};

export type GuideTocItem = ContentTocItem | {
  readonly id: string;
  readonly label: string;
  readonly level: 2 | 3;
};

/**
 * Guide body uses the unified Content Engine block union.
 * Legacy callout/comparison/code shapes are still accepted via normalizeToContentBlocks.
 */
export type GuideContentBlock = ContentBlock;

export type GuideSchemaOverrides = {
  readonly type?: string;
  readonly articleSection?: string;
};

/**
 * Full CMS-driven Guide document for the SEO knowledge base.
 */
export type Guide = CmsDocumentBase & {
  readonly category: GuideCategorySlug;
  readonly subCategory: string;
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly canonicalPath: string;
  readonly excerpt: string;
  readonly heroTitle: string;
  readonly heroDescription: string;
  readonly coverImage: CmsImage;
  readonly gallery: readonly CmsImage[];
  readonly content: readonly GuideContentBlock[];
  readonly tableOfContents: readonly GuideTocItem[];
  readonly tips: readonly string[];
  readonly warnings: readonly string[];
  readonly bestPractices: readonly string[];
  readonly difficulty: GuideDifficulty;
  readonly readingTime: number;
  readonly tags: readonly string[];
  readonly keywords: readonly string[];
  readonly author: GuidePerson;
  readonly reviewer?: GuidePerson;
  readonly publishDate: string;
  readonly updatedDate: string;
  readonly faq: readonly GuideFaqItem[];
  readonly relatedGameSlugs: readonly CmsSlug[];
  readonly relatedProviderSlugs: readonly CmsSlug[];
  readonly relatedGuideSlugs: readonly CmsSlug[];
  readonly relatedPromotionSlugs: readonly CmsSlug[];
  readonly relatedNewsSlugs: readonly CmsSlug[];
  readonly relatedCategorySlugs: readonly GuideCategorySlug[];
  readonly featured: boolean;
  readonly popular: boolean;
  readonly status: GuideStatus;
  readonly sortOrder: number;
  readonly schema?: GuideSchemaOverrides;
  readonly ctaPrimaryLabel: string;
  readonly ctaPrimaryHref: string;
  readonly ctaSecondaryLabel: string;
  readonly ctaSecondaryHref: string;
};

export type GuideCategory = {
  readonly id: string;
  readonly slug: GuideCategorySlug;
  readonly name: string;
  readonly shortName: string;
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly canonicalPath: string;
  readonly heroTitle: string;
  readonly heroDescription: string;
  readonly intro: string;
  readonly seoContent: string;
  readonly coverImage: CmsImage;
  readonly faq: readonly GuideFaqItem[];
  readonly featured: boolean;
  readonly sortOrder: number;
  readonly status: GuideStatus;
  readonly ctaPrimaryLabel: string;
  readonly ctaPrimaryHref: string;
  readonly ctaSecondaryLabel: string;
  readonly ctaSecondaryHref: string;
};

export type GuideListItem = Pick<
  Guide,
  | "id"
  | "slug"
  | "title"
  | "category"
  | "subCategory"
  | "excerpt"
  | "coverImage"
  | "difficulty"
  | "readingTime"
  | "tags"
  | "featured"
  | "popular"
  | "publishDate"
  | "updatedDate"
  | "canonicalPath"
  | "status"
  | "sortOrder"
  | "author"
>;

export type GuidesPageContent = {
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
  readonly faq: readonly GuideFaqItem[];
  readonly finalCta: {
    readonly heading: string;
    readonly body: string;
    readonly primaryLabel: string;
    readonly primaryHref: string;
    readonly secondaryLabel: string;
    readonly secondaryHref: string;
  };
};

export type GuideQuery = {
  readonly locale?: string;
  readonly page?: number;
  readonly pageSize?: number;
  readonly search?: string;
  readonly category?: GuideCategorySlug | string;
  readonly featured?: boolean;
  readonly popular?: boolean;
  readonly difficulty?: GuideDifficulty;
  readonly sort?: "newest" | "updated" | "popular" | "reading-asc" | "title-asc";
  readonly status?: GuideStatus;
  readonly slugs?: readonly string[];
};
