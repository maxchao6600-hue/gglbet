import {
  bulletList,
  checklist,
  ctaBlock,
  faqBlock,
  heading,
  infoBox,
  paragraph,
  relatedContentBlock,
  standardTable,
  summary,
  tipBox,
  tldr,
  warningBox,
} from "@/lib/content/factories";
import { ROUTES } from "@/constants/routes";
import type { ContentBlock, ContentFaqItem } from "@/types/content";
import type { NewsCategorySlug, NewsTimelineItem } from "@/types/news";

/**
 * News longform sections for CMS Content Engine.
 * Facts must come from gglbet5.com official materials only.
 */
export type NewsLongformSections = {
  readonly title: string;
  readonly slug: string;
  readonly category: NewsCategorySlug;
  readonly tldr: string;
  readonly background: readonly string[];
  readonly officialAnnouncement: readonly string[];
  readonly keyHighlights: readonly string[];
  readonly impact: readonly string[];
  readonly importantNotes: readonly string[];
  readonly faq: readonly ContentFaqItem[];
  readonly closingSummary: string;
  readonly timeline: readonly NewsTimelineItem[];
  readonly factRows: readonly (readonly [string, string])[];
  readonly sourceNote: string;
  readonly lastVerified: boolean;
  readonly verifiedDate: string;
  readonly sourceUrl: string;
  readonly sourceName: string;
  readonly relatedProviderSlugs: readonly string[];
  readonly relatedGameSlugs: readonly string[];
  readonly relatedGuideSlugs: readonly string[];
  readonly relatedPromotionSlugs: readonly string[];
  readonly relatedNewsSlugs: readonly string[];
  readonly ctaPrimaryLabel: string;
  readonly ctaPrimaryHref: string;
  readonly ctaSecondaryLabel: string;
  readonly ctaSecondaryHref: string;
  readonly metaTitle: string;
  readonly metaDescription: string;
};

export function buildNewsLongformBlocks(
  input: NewsLongformSections,
): readonly ContentBlock[] {
  const blocks: ContentBlock[] = [
    tldr(input.tldr),

    heading("Summary", "summary"),
    paragraph(input.tldr),
    infoBox("GGLBET source note", input.sourceNote),
    infoBox(
      "Last verified",
      `Last Verified: ${input.lastVerified ? "Yes" : "No"}. Verified Date: ${input.verifiedDate}. Source Name: ${input.sourceName}. Source URL: ${input.sourceUrl}.`,
    ),

    heading("Background", "background"),
    ...input.background.map((text) => paragraph(text)),
    tipBox(
      "Reading rule",
      "This article rewrites official gglbet5.com materials for clarity and SEO. It does not invent offers, dates, or figures. If anything differs from the live official page, follow the live page.",
    ),

    heading("GGLBET Announcement", "gglbet-announcement"),
    ...input.officialAnnouncement.map((text) => paragraph(text)),
    standardTable({
      caption: "Facts published on the official gglbet5.com materials",
      headers: ["Field", "Official value"],
      rows: input.factRows.map(([field, value]) => [field, value]),
    }),

    heading("Key Highlights", "key-highlights"),
    checklist(input.keyHighlights, "What to verify on gglbet5.com"),

    heading("Impact", "impact"),
    ...input.impact.map((text) => paragraph(text)),
    bulletList(
      [
        "Open the linked official page on gglbet5.com before depositing or opting in",
        "Compare every figure, expiry, and eligibility line against the live panel for your account",
        "Use related guides only as reading aids—not as replacements for live terms",
      ],
      "Practical next checks",
    ),

    heading("Important Notes", "important-notes"),
    warningBox(
      "Live panel is authoritative",
      "GGLBET may amend, cancel, or terminate promotions. Always re-check the live gglbet5.com page for your wallet currency and account status.",
    ),
    bulletList(input.importantNotes, "Official constraints restated"),

    heading("How to verify on gglbet5.com", "verify-official"),
    paragraph(
      "Verification is part of reading any GGLBET news item. Open the Source URL listed above while logged into the same account and wallet currency you intend to use. Compare the official title, every numeric field in the facts table, and any published period or end date against the live panel. If a Stories tile, banner, or popup pointed you here, treat those surfaces as navigation only—the promotion or feature page remains the factual source.",
    ),
    paragraph(
      "Next, confirm process lines that are easy to mis-copy: Join Now clicks, claim-before-deposit order, live-bet versus pre-match requirements, loyalty-tier rows, and expiry windows measured in days. Do not substitute figures from a different GGLBET announcement, a mirrored domain, a chat screenshot, or a review website. If the live panel is missing, ended, or shows different numbers for your account, follow the live panel and ignore the older editorial summary.",
    ),
    paragraph(
      "Finally, keep responsible gaming settings in place before acting on a time-limited announcement. Official rewards never require ignoring deposit limits, loss limits, or session reminders. When you finish verifying, use the CTA links to return to the official page, the promotions hub, or safer-play tools—not to third-party claim forms.",
    ),
    checklist(
      [
        "Match official title and source URL on gglbet5.com",
        "Re-read every figure in the facts table on the live panel",
        "Confirm period, end date, or ongoing availability for your account",
        "Reject screenshots or third-party pages as factual sources",
        "Keep responsible gaming limits active before depositing",
      ],
      "Verification checklist",
    ),

    heading("Frequently asked questions", "faq"),
    faqBlock(input.faq),

    heading("Summary", "closing-summary"),
    summary(input.closingSummary),
    relatedContentBlock(
      {
        providerSlugs: input.relatedProviderSlugs,
        gameSlugs: input.relatedGameSlugs,
        guideSlugs: input.relatedGuideSlugs,
        newsSlugs: input.relatedNewsSlugs,
        promotionSlugs: input.relatedPromotionSlugs,
      },
      "Related reading",
    ),

    heading("CTA", "cta"),
    ctaBlock({
      heading: input.ctaPrimaryLabel,
      body: "Confirm the live GGLBET update on the product, then decide whether the offer or feature still applies to your account.",
      primary: {
        label: input.ctaPrimaryLabel,
        href: input.ctaPrimaryHref,
        variant: "primary",
      },
      secondary: {
        label: input.ctaSecondaryLabel,
        href: input.ctaSecondaryHref,
        variant: "outline",
      },
    }),
    ctaBlock({
      heading: "Register, promotions, or download",
      body: "Use site CTAs to create an account, return to the promotions hub, or open the download path before you play.",
      primary: {
        label: "Register",
        href: ROUTES.register,
        variant: "primary",
      },
      secondary: {
        label: "All promotions",
        href: ROUTES.promotions,
        variant: "outline",
      },
    }),
    ctaBlock({
      heading: "Safer play tools",
      body: "Review responsible gaming guidance before raising stakes around any time-limited announcement.",
      primary: {
        label: "Responsible Gaming",
        href: ROUTES.responsibleGaming,
        variant: "soft",
      },
      secondary: {
        label: "News hub",
        href: ROUTES.news,
        variant: "ghost",
      },
    }),
  ];

  return blocks;
}

export function countWordsInNewsBlocks(
  blocks: readonly ContentBlock[],
): number {
  let total = 0;
  for (const block of blocks) {
    total += wordsInBlock(block);
  }
  return total;
}

function wordsInBlock(block: ContentBlock): number {
  switch (block.type) {
    case "paragraph":
    case "quote":
    case "tldr":
    case "summary":
      return wordCount(block.text);
    case "definition":
      return wordCount(`${block.term} ${block.text}`);
    case "infoBox":
    case "warningBox":
    case "successBox":
    case "tipBox":
      return wordCount(`${block.title} ${block.body}`);
    case "heading":
    case "subHeading":
      return wordCount(block.text);
    case "checklist":
    case "bulletList":
    case "numberList":
    case "pros":
    case "cons":
    case "bestPractice":
    case "commonMistakes":
      return block.items.reduce((sum, item) => sum + wordCount(item), 0);
    case "faq":
      return block.items.reduce(
        (sum, item) => sum + wordCount(`${item.question} ${item.answer}`),
        0,
      );
    case "howTo":
      return (
        wordCount(`${block.name} ${block.description ?? ""}`) +
        block.steps.reduce(
          (sum, step) => sum + wordCount(`${step.title} ${step.text}`),
          0,
        )
      );
    case "cta":
      return wordCount(`${block.heading} ${block.body ?? ""}`);
    case "standardTable":
    case "comparisonTable":
      return (
        wordCount(block.caption ?? "") +
        block.headers.reduce((sum, h) => sum + wordCount(h), 0) +
        block.rows.reduce(
          (sum, row) =>
            sum + row.reduce((inner, cell) => inner + wordCount(cell), 0),
          0,
        )
      );
    default:
      return 0;
  }
}

function wordCount(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}
