import type { ContentBlock, ContentTocItem } from "@/types/content";

/**
 * CMS-editable SEO Content Template System.
 * Not live AI — deterministic templates filled from CMS entity fields.
 */

export type ContentTemplateType =
  | "provider"
  | "game"
  | "guide"
  | "news"
  | "promotion";

export type ContentTemplateSectionConfig = {
  readonly id: string;
  readonly enabled: boolean;
  readonly order: number;
  /** CMS-editable H2 label */
  readonly heading: string;
  /** Optional H3 / intro line under the heading */
  readonly subheading?: string;
  /** Anchor override; defaults to slugified heading */
  readonly anchor?: string;
};

export type ContentTemplateSeoConfig = {
  readonly metaTitlePattern: string;
  readonly metaDescriptionPattern: string;
  readonly h1Pattern: string;
  readonly includeFaqSchema: boolean;
  readonly includeHowToSchema: boolean;
  readonly includeToc: boolean;
};

export type ContentTemplateCtaConfig = {
  readonly primaryLabel: string;
  readonly primaryHrefPattern: string;
  readonly secondaryLabel: string;
  readonly secondaryHrefPattern: string;
};

export type ContentTemplateInternalLinkConfig = {
  readonly label: string;
  readonly hrefPattern: string;
};

/**
 * Full CMS document describing one vertical's SEO content template.
 * Editors can reorder/disable sections and adjust labels without code changes.
 */
export type ContentTemplateDocument = {
  readonly id: string;
  readonly type: ContentTemplateType;
  readonly name: string;
  readonly description: string;
  readonly version: number;
  readonly locale: string;
  readonly sections: readonly ContentTemplateSectionConfig[];
  readonly seo: ContentTemplateSeoConfig;
  readonly cta: ContentTemplateCtaConfig;
  readonly internalLinks: readonly ContentTemplateInternalLinkConfig[];
  readonly status: "draft" | "published" | "archived";
  readonly updatedAt: string;
};

export type GeneratedContentResult = {
  readonly blocks: readonly ContentBlock[];
  readonly tableOfContents: readonly ContentTocItem[];
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly h1: string;
  readonly templateId: string;
  readonly templateVersion: number;
};

export type TemplateTokenMap = Record<string, string | number | undefined>;
