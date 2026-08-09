import type { CmsImage, CmsSlug } from "@/types/cms";

/**
 * Unified CMS Content Block System.
 * Provider / Game / Guide / News / Promotion share this engine.
 * New article volume scales via CMS only — templates stay fixed.
 */

export type ContentDifficulty = "beginner" | "intermediate" | "advanced";

export type ContentPerson = {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly bio?: string;
  readonly role?: string;
  readonly avatar?: CmsImage;
};

export type ContentTocItem = {
  readonly id: string;
  readonly label: string;
  readonly level: 2 | 3;
  readonly anchor: string;
};

export type ContentFaqItem = {
  readonly question: string;
  readonly answer: string;
};

export type ContentHowToStep = {
  readonly title: string;
  readonly text: string;
};

export type ContentCtaAction = {
  readonly label: string;
  readonly href: string;
  readonly variant?: "primary" | "outline" | "ghost" | "soft";
};

export type ContentRelatedRefs = {
  readonly providerSlugs?: readonly CmsSlug[];
  readonly gameSlugs?: readonly CmsSlug[];
  readonly guideSlugs?: readonly CmsSlug[];
  readonly newsSlugs?: readonly CmsSlug[];
  readonly promotionSlugs?: readonly CmsSlug[];
};

export type ContentImageAsset = CmsImage & {
  readonly caption?: string;
  readonly credit?: string;
  readonly priority?: boolean;
};

export type ContentBlockBase = {
  readonly id: string;
};

export type ContentBlock =
  | (ContentBlockBase & {
      readonly type: "hero";
      readonly heading: string;
      readonly subheading?: string;
      readonly body?: string;
      readonly image?: ContentImageAsset;
    })
  | (ContentBlockBase & {
      readonly type: "paragraph";
      readonly text: string;
    })
  | (ContentBlockBase & {
      readonly type: "heading";
      readonly text: string;
      readonly anchor: string;
      readonly level?: 2;
    })
  | (ContentBlockBase & {
      readonly type: "subHeading";
      readonly text: string;
      readonly anchor: string;
      readonly level?: 3;
    })
  | (ContentBlockBase & {
      readonly type: "quote";
      readonly text: string;
      readonly cite?: string;
    })
  | (ContentBlockBase & {
      readonly type: "infoBox";
      readonly title: string;
      readonly body: string;
    })
  | (ContentBlockBase & {
      readonly type: "warningBox";
      readonly title: string;
      readonly body: string;
    })
  | (ContentBlockBase & {
      readonly type: "successBox";
      readonly title: string;
      readonly body: string;
    })
  | (ContentBlockBase & {
      readonly type: "tipBox";
      readonly title: string;
      readonly body: string;
    })
  | (ContentBlockBase & {
      readonly type: "checklist";
      readonly title?: string;
      readonly items: readonly string[];
    })
  | (ContentBlockBase & {
      readonly type: "bulletList";
      readonly title?: string;
      readonly items: readonly string[];
    })
  | (ContentBlockBase & {
      readonly type: "numberList";
      readonly title?: string;
      readonly items: readonly string[];
    })
  | (ContentBlockBase & {
      readonly type: "comparisonTable";
      readonly caption?: string;
      readonly headers: readonly string[];
      readonly rows: readonly (readonly string[])[];
    })
  | (ContentBlockBase & {
      readonly type: "standardTable";
      readonly caption?: string;
      readonly headers: readonly string[];
      readonly rows: readonly (readonly string[])[];
    })
  | (ContentBlockBase & {
      readonly type: "image";
      readonly image: ContentImageAsset;
      readonly caption?: string;
      readonly credit?: string;
    })
  | (ContentBlockBase & {
      readonly type: "imageGallery";
      readonly images: readonly ContentImageAsset[];
      readonly caption?: string;
    })
  | (ContentBlockBase & {
      /** Reserved — renders accessible placeholder until CMS video lands. */
      readonly type: "video";
      readonly title: string;
      readonly url?: string;
      readonly poster?: ContentImageAsset;
    })
  | (ContentBlockBase & {
      readonly type: "faq";
      readonly title?: string;
      readonly items: readonly ContentFaqItem[];
    })
  | (ContentBlockBase & {
      readonly type: "pros";
      readonly title?: string;
      readonly items: readonly string[];
    })
  | (ContentBlockBase & {
      readonly type: "cons";
      readonly title?: string;
      readonly items: readonly string[];
    })
  | (ContentBlockBase & {
      readonly type: "timeline";
      readonly title?: string;
      readonly items: readonly {
        readonly id: string;
        readonly date?: string;
        readonly label: string;
        readonly body: string;
      }[];
    })
  | (ContentBlockBase & {
      readonly type: "statistic";
      readonly label: string;
      readonly value: string;
      readonly note?: string;
    })
  | (ContentBlockBase & {
      readonly type: "cta";
      readonly heading: string;
      readonly body?: string;
      readonly primary: ContentCtaAction;
      readonly secondary?: ContentCtaAction;
    })
  | (ContentBlockBase & {
      readonly type: "button";
      readonly label: string;
      readonly href: string;
      readonly variant?: ContentCtaAction["variant"];
    })
  | (ContentBlockBase & {
      readonly type: "divider";
    })
  | (ContentBlockBase & {
      readonly type: "spacer";
      readonly size?: "sm" | "md" | "lg";
    })
  | (ContentBlockBase & {
      readonly type: "author";
      readonly person: ContentPerson;
    })
  | (ContentBlockBase & {
      readonly type: "reviewer";
      readonly person: ContentPerson;
    })
  | (ContentBlockBase & {
      readonly type: "relatedContent";
      readonly title?: string;
      readonly refs: ContentRelatedRefs;
    })
  | (ContentBlockBase & {
      readonly type: "tldr";
      readonly text: string;
      readonly label?: string;
    })
  | (ContentBlockBase & {
      readonly type: "summary";
      readonly title?: string;
      readonly text: string;
    })
  | (ContentBlockBase & {
      readonly type: "definition";
      readonly term: string;
      readonly text: string;
    })
  | (ContentBlockBase & {
      readonly type: "bestPractice";
      readonly title?: string;
      readonly items: readonly string[];
    })
  | (ContentBlockBase & {
      readonly type: "commonMistakes";
      readonly title?: string;
      readonly items: readonly string[];
    })
  | (ContentBlockBase & {
      readonly type: "howTo";
      readonly name: string;
      readonly description?: string;
      readonly steps: readonly ContentHowToStep[];
    })
  | (ContentBlockBase & {
      /** Reserved — never executes; shown as preformatted text only. */
      readonly type: "codeBlock";
      readonly language?: string;
      readonly code: string;
      readonly caption?: string;
    })
  | (ContentBlockBase & {
      /**
       * Forbidden for direct HTML output.
       * Stored for CMS migration; renderer never uses dangerouslySetInnerHTML.
       */
      readonly type: "htmlBlock";
      readonly html: string;
      readonly note?: string;
    });

export type ContentBlockType = ContentBlock["type"];

/**
 * Editorial metadata attached to every long-form CMS document.
 */
export type ContentDocumentMeta = {
  readonly author: ContentPerson;
  readonly reviewer?: ContentPerson;
  readonly publishDate: string;
  readonly updatedDate: string;
  readonly readingTimeMinutes: number;
  readonly difficulty?: ContentDifficulty;
  readonly factChecked: boolean;
};

/**
 * Shared content document slice used across verticals.
 */
export type ContentDocumentSlice = {
  readonly content: readonly ContentBlock[];
  readonly tableOfContents: readonly ContentTocItem[];
  readonly meta: ContentDocumentMeta;
  readonly related: ContentRelatedRefs;
};
