import type { CmsDocumentBase, CmsImage, CmsSlug } from "@/types/cms";
import type { ContentBlock } from "@/types/content";
import type { GuideTocItem } from "@/types/guide";

export type NewsStatus = "draft" | "published" | "archived";

export type NewsCategorySlug =
  | "casino"
  | "slots"
  | "provider-updates"
  | "promotions"
  | "sports"
  | "lottery"
  | "payments"
  | "security"
  | "platform"
  | "industry";

export type NewsFaqItem = {
  readonly question: string;
  readonly answer: string;
};

export type NewsPerson = {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly bio?: string;
  readonly role?: string;
  readonly avatar?: CmsImage;
};

export type NewsTimelineItem = {
  readonly id: string;
  readonly date: string;
  readonly label: string;
  readonly body: string;
};

export type NewsSchemaOverrides = {
  readonly type?: string;
  readonly articleSection?: string;
};

export type NewsContentBlock = ContentBlock;
export type NewsTocItem = GuideTocItem;

/**
 * Full CMS-driven News article for the SEO content hub.
 */
export type NewsArticle = CmsDocumentBase & {
  readonly category: NewsCategorySlug;
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly canonicalPath: string;
  readonly excerpt: string;
  readonly heroTitle: string;
  readonly heroDescription: string;
  readonly coverImage: CmsImage;
  readonly gallery: readonly CmsImage[];
  readonly content: readonly NewsContentBlock[];
  readonly tableOfContents: readonly NewsTocItem[];
  readonly timeline: readonly NewsTimelineItem[];
  readonly tags: readonly string[];
  readonly keywords: readonly string[];
  readonly author: NewsPerson;
  readonly reviewer?: NewsPerson;
  readonly publishDate: string;
  readonly updatedDate: string;
  readonly featured: boolean;
  readonly breaking: boolean;
  readonly popular: boolean;
  readonly status: NewsStatus;
  readonly sortOrder: number;
  readonly readingTimeMinutes: number;
  readonly faq: readonly NewsFaqItem[];
  readonly relatedGameSlugs: readonly CmsSlug[];
  readonly relatedProviderSlugs: readonly CmsSlug[];
  readonly relatedGuideSlugs: readonly CmsSlug[];
  readonly relatedPromotionSlugs: readonly CmsSlug[];
  readonly relatedNewsSlugs: readonly CmsSlug[];
  readonly schema?: NewsSchemaOverrides;
  readonly ctaPrimaryLabel: string;
  readonly ctaPrimaryHref: string;
  readonly ctaSecondaryLabel: string;
  readonly ctaSecondaryHref: string;
};

/** Compact listing DTO — omit article body/faq from RSC flight. */
export type NewsListItem = Pick<
  NewsArticle,
  | "id"
  | "slug"
  | "title"
  | "excerpt"
  | "category"
  | "coverImage"
  | "featured"
  | "breaking"
  | "popular"
  | "readingTimeMinutes"
  | "publishDate"
  | "updatedDate"
  | "tags"
  | "keywords"
  | "sortOrder"
  | "canonicalPath"
  | "status"
> & {
  readonly author: Pick<NewsPerson, "name">;
};

export type NewsCategory = {
  readonly id: string;
  readonly slug: NewsCategorySlug;
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
  readonly faq: readonly NewsFaqItem[];
  readonly featured: boolean;
  readonly sortOrder: number;
  readonly status: NewsStatus;
};

/** Category fields needed on the news listing (cards + toolbar). */
export type NewsCategoryListItem = Pick<
  NewsCategory,
  "id" | "slug" | "name" | "intro"
>;

export type NewsPageContent = {
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
  readonly faq: readonly NewsFaqItem[];
  readonly finalCta: {
    readonly heading: string;
    readonly body: string;
    readonly primaryLabel: string;
    readonly primaryHref: string;
    readonly secondaryLabel: string;
    readonly secondaryHref: string;
  };
};

export type NewsQuery = {
  readonly locale?: string;
  readonly page?: number;
  readonly pageSize?: number;
  readonly search?: string;
  readonly category?: NewsCategorySlug | string;
  readonly featured?: boolean;
  readonly breaking?: boolean;
  readonly popular?: boolean;
  readonly sort?: "newest" | "updated" | "popular" | "title-asc";
  readonly status?: NewsStatus;
  readonly slugs?: readonly string[];
};
