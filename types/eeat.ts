import type { CmsImage } from "@/types/cms";
import type { HomeCta } from "@/types/home";

export type EditorialPerson = {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly jobTitle: string;
  readonly bio: string;
  readonly expertise: readonly string[];
  readonly credentials: readonly string[];
  readonly avatar?: CmsImage;
  readonly sameAs: readonly string[];
  readonly email?: string;
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly canonicalPath: string;
};

export type TrustPageBlock =
  | { readonly type: "tldr"; readonly id: string; readonly text: string }
  | {
      readonly type: "definition";
      readonly id: string;
      readonly term: string;
      readonly text: string;
    }
  | { readonly type: "paragraph"; readonly id: string; readonly text: string }
  | {
      readonly type: "heading";
      readonly id: string;
      readonly text: string;
      readonly anchor: string;
    }
  | {
      readonly type: "checklist";
      readonly id: string;
      readonly title?: string;
      readonly items: readonly string[];
    }
  | {
      readonly type: "steps";
      readonly id: string;
      readonly title: string;
      readonly steps: readonly { readonly title: string; readonly text: string }[];
    }
  | {
      readonly type: "comparison";
      readonly id: string;
      readonly caption?: string;
      readonly headers: readonly string[];
      readonly rows: readonly (readonly string[])[];
    }
  | {
      readonly type: "callout";
      readonly id: string;
      readonly variant: "info" | "tip" | "warning";
      readonly title: string;
      readonly body: string;
    };

export type TrustSummaryCard = {
  readonly title: string;
  readonly description: string;
};

export type TrustVisualSection = {
  readonly id: string;
  readonly eyebrow?: string;
  readonly heading: string;
  readonly subheading: string;
  readonly body: string;
  readonly mediaSrc: string;
  readonly mediaAlt: string;
  readonly points?: readonly { readonly title: string; readonly body: string }[];
  readonly flip?: boolean;
  readonly ctas?: readonly HomeCta[];
};

export type TrustFinalCta = {
  readonly eyebrow?: string;
  readonly heading: string;
  readonly subheading: string;
  readonly body: string;
  readonly mediaSrc: string;
  readonly mediaAlt: string;
  readonly ctas: readonly HomeCta[];
};

export type TrustPageDocument = {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly canonicalPath: string;
  readonly heroTitle: string;
  readonly heroDescription: string;
  readonly heroEyebrow?: string;
  readonly heroImageSrc?: string;
  readonly lastUpdated: string;
  readonly factChecked: boolean;
  readonly authorSlug: string;
  readonly reviewerSlug?: string;
  readonly summaryCards?: readonly TrustSummaryCard[];
  readonly visualSections?: readonly TrustVisualSection[];
  readonly finalCta?: TrustFinalCta;
  readonly faqHeading?: string;
  readonly faqSubheading?: string;
  readonly faqBody?: string;
  readonly blocks: readonly TrustPageBlock[];
  readonly faq: readonly { readonly question: string; readonly answer: string }[];
  readonly relatedPaths: readonly { readonly label: string; readonly href: string }[];
  readonly schemaType?: "WebPage" | "AboutPage" | "FAQPage" | "CollectionPage";
};

export type EeatContent = {
  readonly authors: readonly EditorialPerson[];
  readonly pages: readonly TrustPageDocument[];
};
