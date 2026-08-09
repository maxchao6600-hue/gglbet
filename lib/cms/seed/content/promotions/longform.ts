import {
  bulletList,
  checklist,
  ctaBlock,
  faqBlock,
  heading,
  howTo,
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
import type { BonusType, PromotionType } from "@/types/promotion";

/**
 * Official figures must be copied exactly from the live GGLBET site.
 * SEO sections may paraphrase; they must not invent amounts, wagering, or dates.
 */
export type PromotionLongformSections = {
  readonly title: string;
  readonly slug: string;
  readonly promotionType: PromotionType;
  readonly bonusType: BonusType;
  readonly currency: string;
  /** Official headline bonus figure (exact). */
  readonly bonusAmount: string;
  readonly maximumBonus?: string;
  readonly minimumDeposit?: string;
  /** Official wagering string (exact meaning preserved). */
  readonly turnoverRequirement: string;
  readonly eligibleGames: readonly string[];
  readonly tldr: string;
  readonly introduction: readonly string[];
  readonly whoIsEligibleLead: string;
  readonly whoIsEligible: readonly string[];
  readonly howToClaimLead: string;
  readonly claimSteps: readonly { readonly title: string; readonly text: string }[];
  readonly importantNotesLead: string;
  readonly importantNotes: readonly string[];
  readonly requirements: readonly string[];
  readonly terms: readonly string[];
  readonly faq: readonly ContentFaqItem[];
  readonly summary: string;
  readonly sourceNote: string;
  readonly lastVerified: boolean;
  readonly verifiedDate: string;
  readonly sourceUrl: string;
  readonly sourceName: string;
  readonly relatedProviderSlugs: readonly string[];
  readonly relatedGameSlugs: readonly string[];
  readonly relatedGuideSlugs: readonly string[];
  readonly relatedNewsSlugs: readonly string[];
  readonly relatedPromotionSlugs: readonly string[];
  readonly ctaPrimaryLabel: string;
  readonly ctaPrimaryHref: string;
  readonly ctaSecondaryLabel: string;
  readonly ctaSecondaryHref: string;
  readonly metaTitle: string;
  readonly metaDescription: string;
};

export function buildPromotionLongformBlocks(
  input: PromotionLongformSections,
): readonly ContentBlock[] {
  return [
    tldr(input.tldr),

    heading("Promotion introduction", "introduction"),
    ...input.introduction.map((text) => paragraph(text)),
    infoBox("GGLBET source note", input.sourceNote),
    infoBox(
      "Last verified",
      `Last Verified: ${input.lastVerified ? "Yes" : "No"}. Verified Date: ${input.verifiedDate}. Source Name: ${input.sourceName}. Source URL: ${input.sourceUrl}.`,
    ),

    heading("Bonus snapshot", "bonus-snapshot"),
    standardTable({
      caption: "Figures published on the official GGLBET promotions materials",
      headers: ["Field", "Value"],
      rows: [
        ["Offer", input.title],
        ["Bonus", input.bonusAmount],
        ["Currency", input.currency],
        ["Maximum bonus", input.maximumBonus ?? "See live Promotions panel"],
        [
          "Minimum deposit",
          input.minimumDeposit ?? "Qualifying deposit — confirm on live panel",
        ],
        ["Wagering", input.turnoverRequirement],
      ],
    }),

    heading("Who is eligible", "who-is-eligible"),
    paragraph(input.whoIsEligibleLead),
    checklist(input.whoIsEligible, "Eligibility checklist"),

    heading("How to claim", "how-to-claim"),
    paragraph(input.howToClaimLead),

    heading("Claim steps", "claim-steps"),
    howTo({
      name: `How to claim ${input.title}`,
      description: input.tldr,
      steps: input.claimSteps,
    }),

    heading("Important notes", "important-notes"),
    paragraph(input.importantNotesLead),
    bulletList(input.importantNotes, "Read before you opt in"),
    warningBox(
      "Live panel is authoritative",
      "If any figure on this page differs from the live GGLBET Promotions panel for your account, follow the live panel.",
    ),

    heading("Requirements overview", "requirements"),
    checklist(input.requirements, "Before claiming"),

    heading("Terms reminders", "terms"),
    bulletList(input.terms, "Key conditions from official materials"),

    heading("Eligible play notes", "eligible-games"),
    bulletList(input.eligibleGames, "Where this offer is intended to apply"),

    heading("Frequently asked questions", "faq"),
    faqBlock(input.faq),

    heading("Summary", "summary"),
    summary(input.summary),
    tipBox(
      "Related reading",
      "Use the promotions guide for term literacy, then confirm the live offer before depositing.",
    ),
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
    ctaBlock({
      heading: input.ctaPrimaryLabel,
      body: "Open the live Promotions section on gglbet5.com, select this offer if still shown, then deposit only after you accept the full terms.",
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
      body: "Use site CTAs to create an account, return to the promotions hub, or open the download guide path before you play.",
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
      heading: "Need help reading terms?",
      body: "Browse the promotions guide, download path, FAQ, VIP page, or responsible gaming tools before you raise stakes.",
      primary: {
        label: "Download",
        href: ROUTES.download,
        variant: "soft",
      },
      secondary: {
        label: "Responsible Gaming",
        href: ROUTES.responsibleGaming,
        variant: "ghost",
      },
    }),
  ];
}

export function countWordsInPromotionBlocks(
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
