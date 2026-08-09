import {
  bestPractice,
  bulletList,
  checklist,
  commonMistakes,
  comparisonTable,
  ctaBlock,
  faqBlock,
  heading,
  howTo,
  infoBox,
  paragraph,
  relatedContentBlock,
  summary,
  tipBox,
  tldr,
  warningBox,
} from "@/lib/content/factories";
import { ROUTES } from "@/constants/routes";
import type { ContentBlock, ContentFaqItem } from "@/types/content";
import type { GuideCategorySlug, GuideDifficulty } from "@/types/guide";

export type GuideLongformSections = {
  readonly title: string;
  readonly category: GuideCategorySlug;
  readonly difficulty: GuideDifficulty;
  readonly tldr: string;
  readonly intro: readonly string[];
  readonly playerFitLead: string;
  readonly playerFit: readonly string[];
  readonly backgroundLead: string;
  readonly background: readonly string[];
  readonly stepsLead: string;
  readonly steps: readonly { readonly title: string; readonly text: string }[];
  readonly checklistLead: string;
  readonly checklistItems: readonly string[];
  readonly bestPracticesLead: string;
  readonly bestPractices: readonly string[];
  readonly mistakes: readonly string[];
  readonly comparisonLead: string;
  readonly comparisonHeaders: readonly string[];
  readonly comparisonRows: readonly (readonly string[])[];
  readonly comparisonCaption: string;
  readonly tipsLead: string;
  readonly tips: readonly string[];
  readonly warnings: readonly string[];
  readonly faq: readonly ContentFaqItem[];
  readonly summary: string;
  readonly responsibleNote: string;
  readonly relatedProviderSlugs: readonly string[];
  readonly relatedGameSlugs: readonly string[];
  readonly relatedGuideSlugs: readonly string[];
  readonly relatedPromotionSlugs: readonly string[];
  readonly relatedNewsSlugs: readonly string[];
  readonly ctaPrimaryLabel: string;
  readonly ctaPrimaryHref: string;
  readonly ctaSecondaryLabel: string;
  readonly ctaSecondaryHref: string;
};

/**
 * Build CMS ContentBlocks for Guide long-form SEO articles.
 * Consumed by Content Renderer + SEO — no hard-coded page templates.
 */
export function buildGuideLongformBlocks(
  input: GuideLongformSections,
): readonly ContentBlock[] {
  const blocks: ContentBlock[] = [
    tldr(input.tldr),

    heading("Introduction", "introduction"),
    ...input.intro.map((text) => paragraph(text)),
    tipBox(
      "Difficulty",
      `This guide is labeled ${input.difficulty}. Complete one section at a time if the topic is new to you.`,
    ),

    heading("Who this guide is for", "who-it-suits"),
    paragraph(input.playerFitLead),
    checklist(input.playerFit, "You will get the most value if"),

    heading("Background you need first", "background"),
    paragraph(input.backgroundLead),
    ...input.background.map((text) => paragraph(text)),
    infoBox(
      "Live product wins",
      "GGLBET screens, cashier figures, promotion terms, and game information panels are authoritative. This guide teaches process and judgment—not guaranteed outcomes.",
    ),

    heading("Step-by-step guide", "step-by-step"),
    paragraph(input.stepsLead),
    howTo({
      name: input.title,
      description: input.tldr,
      steps: input.steps,
    }),

    heading("Checklist", "checklist"),
    paragraph(input.checklistLead),
    checklist(input.checklistItems, "Do this before you continue"),

    heading("Best practices", "best-practices"),
    paragraph(input.bestPracticesLead),
    bestPractice(input.bestPractices, "Habits that keep learning useful"),

    heading("Common mistakes", "common-mistakes"),
    commonMistakes(input.mistakes),
    warningBox(
      "Safer play",
      input.responsibleNote ||
        (input.warnings[0] ??
          "Educational guides do not guarantee results. Use responsible gaming tools when you move from learning to playing."),
    ),

    heading("Comparison", "comparison"),
    paragraph(input.comparisonLead),
    comparisonTable({
      caption: input.comparisonCaption,
      headers: input.comparisonHeaders,
      rows: input.comparisonRows,
    }),

    heading("Practical tips", "tips"),
    paragraph(input.tipsLead),
    bulletList(input.tips, "Apply these on your next session"),
    ...(input.warnings.length > 0
      ? [
          warningBox(
            "Watch-outs",
            input.warnings.join(" "),
          ),
        ]
      : []),

    heading("Frequently asked questions", "faq"),
    faqBlock(input.faq),

    heading("Summary", "summary"),
    summary(input.summary),
    tipBox(
      "Related reading",
      "Continue with linked guides, providers, games, promotions, or news below—or open the site FAQ if you need a shorter answer first.",
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
      body: "Use what you learned on a live GGLBET screen, then keep responsible gaming tools available.",
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
      heading: "Need a shorter answer?",
      body: "Browse the FAQ hub, return to the guides library, or open responsible gaming tools before your next session.",
      primary: {
        label: "Site FAQ",
        href: ROUTES.faq,
        variant: "soft",
      },
      secondary: {
        label: "Responsible Gaming",
        href: ROUTES.responsibleGaming,
        variant: "ghost",
      },
    }),
  ];

  return blocks;
}

export function countWordsInGuideBlocks(
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
