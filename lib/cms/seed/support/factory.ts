import { HUB_MEDIA } from "@/constants/hub-media";
import { ROUTES } from "@/constants/routes";
import { L, type LocalizedString } from "@/lib/i18n";
import { SUPPORT_TOPIC_CLUSTERS } from "@/lib/cms/seed/support/cta";
import type {
  TrustFinalCta,
  TrustPageBlock,
  TrustPageDocument,
  TrustSummaryCard,
  TrustVisualSection,
} from "@/types/eeat";

const SITE = "GGLBET";

export type RelatedPath = {
  readonly label: string;
  readonly href: string;
};

/** Prefer curated topic cluster; ignore volume-padding extras. */
export function withSupportRelated(
  slug: string,
  _extras: readonly RelatedPath[] = [],
): readonly RelatedPath[] {
  return SUPPORT_TOPIC_CLUSTERS[slug] ?? SUPPORT_TOPIC_CLUSTERS.support ?? [];
}

export type TrustPageSeed = {
  readonly slug: string;
  readonly title: string | LocalizedString;
  readonly metaTitle?: string | LocalizedString;
  readonly metaDescription: string | LocalizedString;
  readonly heroTitle: string | LocalizedString;
  readonly heroDescription: string | LocalizedString;
  readonly heroEyebrow?: string | LocalizedString;
  readonly heroImageSrc?: string;
  readonly lastUpdated: string;
  readonly authorSlug: string;
  readonly reviewerSlug?: string;
  readonly factChecked?: boolean;
  readonly schemaType?: TrustPageDocument["schemaType"];
  readonly summaryCards?: readonly {
    readonly title: string | LocalizedString;
    readonly description: string | LocalizedString;
  }[];
  readonly visualSections?: readonly {
    readonly id: string;
    readonly eyebrow?: string | LocalizedString;
    readonly heading: string | LocalizedString;
    readonly subheading: string | LocalizedString;
    readonly body: string | LocalizedString;
    readonly mediaSrc: string;
    readonly mediaAlt: string | LocalizedString;
    readonly points?: readonly {
      readonly title: string | LocalizedString;
      readonly body: string | LocalizedString;
    }[];
    readonly flip?: boolean;
    readonly ctas?: TrustVisualSection["ctas"];
  }[];
  readonly finalCta?: {
    readonly eyebrow?: string | LocalizedString;
    readonly heading: string | LocalizedString;
    readonly subheading: string | LocalizedString;
    readonly body: string | LocalizedString;
    readonly mediaSrc?: string;
    readonly mediaAlt?: string | LocalizedString;
    readonly ctas: TrustFinalCta["ctas"];
  };
  readonly faqHeading?: string | LocalizedString;
  readonly faqSubheading?: string | LocalizedString;
  readonly faqBody?: string | LocalizedString;
  readonly blocks: readonly TrustPageBlock[];
  readonly faq: readonly {
    readonly question: string | LocalizedString;
    readonly answer: string | LocalizedString;
  }[];
  readonly relatedPaths?: readonly RelatedPath[];
};

export function createTrustPage(input: TrustPageSeed): TrustPageDocument {
  return {
    id: `trust-page-${input.slug}`,
    slug: input.slug,
    title: input.title as string,
    metaTitle: (input.metaTitle ?? `${String(input.title)} | ${SITE}`) as string,
    metaDescription: input.metaDescription as string,
    canonicalPath: `/${input.slug}`,
    heroTitle: input.heroTitle as string,
    heroDescription: input.heroDescription as string,
    ...(input.heroEyebrow
      ? { heroEyebrow: input.heroEyebrow as string }
      : {}),
    ...(input.heroImageSrc ? { heroImageSrc: input.heroImageSrc } : {}),
    lastUpdated: input.lastUpdated,
    factChecked: input.factChecked ?? true,
    authorSlug: input.authorSlug,
    ...(input.reviewerSlug ? { reviewerSlug: input.reviewerSlug } : {}),
    ...(input.summaryCards
      ? { summaryCards: input.summaryCards as readonly TrustSummaryCard[] }
      : {}),
    ...(input.visualSections
      ? {
          visualSections: input.visualSections as readonly TrustVisualSection[],
        }
      : {}),
    ...(input.finalCta
      ? {
          finalCta: {
            eyebrow: input.finalCta.eyebrow as string | undefined,
            heading: input.finalCta.heading as string,
            subheading: input.finalCta.subheading as string,
            body: input.finalCta.body as string,
            mediaSrc: input.finalCta.mediaSrc ?? HUB_MEDIA.cta,
            mediaAlt: (input.finalCta.mediaAlt as string | undefined) ??
              (L("GGLBET next steps", "GGLBET 下一步") as unknown as string),
            ctas: input.finalCta.ctas,
          },
        }
      : {}),
    ...(input.faqHeading ? { faqHeading: input.faqHeading as string } : {}),
    ...(input.faqSubheading
      ? { faqSubheading: input.faqSubheading as string }
      : {}),
    ...(input.faqBody ? { faqBody: input.faqBody as string } : {}),
    blocks: input.blocks,
    faq: input.faq as TrustPageDocument["faq"],
    relatedPaths: withSupportRelated(input.slug, input.relatedPaths ?? []),
    schemaType: input.schemaType ?? "WebPage",
  };
}

export { HUB_MEDIA, ROUTES, SITE };
export { CTA, cta } from "./cta";
