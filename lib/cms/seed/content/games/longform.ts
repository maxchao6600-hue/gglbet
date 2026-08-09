import {
  bestPractice,
  bulletList,
  checklist,
  commonMistakes,
  ctaBlock,
  definition,
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
import { ROUTES, getProviderHref } from "@/constants/routes";
import type { ContentBlock, ContentFaqItem } from "@/types/content";

export type GameLongformSections = {
  readonly gameName: string;
  readonly providerName: string;
  readonly providerSlug: string;
  readonly categoryLabel: string;
  readonly tldr: string;
  readonly definition: string;
  readonly intro: readonly string[];
  readonly background: readonly string[];
  readonly featuresLead: string;
  readonly features: readonly string[];
  readonly howToLead: string;
  readonly howToSteps: readonly { readonly title: string; readonly text: string }[];
  readonly rtpLead: string;
  readonly rtpBody: readonly string[];
  readonly volatilityLead: string;
  readonly volatilityBody: readonly string[];
  readonly bonusLead: string;
  readonly bonusFeatures: readonly string[];
  /** Empty array skips Free Spins section body extras but heading still explains N/A when flag false */
  readonly hasFreeSpins: boolean;
  readonly freeSpinsLead: string;
  readonly freeSpinsBody: readonly string[];
  readonly hasJackpot: boolean;
  readonly jackpotLead: string;
  readonly jackpotBody: readonly string[];
  readonly betRangeLead: string;
  readonly betRows: readonly (readonly [string, string])[];
  readonly playerFitLead: string;
  readonly playerFit: readonly string[];
  readonly tipsLead: string;
  readonly tips: readonly string[];
  readonly beginnerLead: string;
  readonly beginnerPath: readonly string[];
  readonly mistakes: readonly string[];
  readonly winningTipsLead: string;
  readonly winningTips: readonly string[];
  readonly strategyLead: string;
  readonly strategy: readonly string[];
  readonly faq: readonly ContentFaqItem[];
  readonly summary: string;
  readonly responsibleNote: string;
  readonly relatedGameLabels: readonly string[];
  /** CMS game slugs for Content Renderer related links (must exist in catalog). */
  readonly relatedGameSlugs: readonly string[];
  readonly ctaPrimaryHref: string;
};

export function buildGameLongformBlocks(
  input: GameLongformSections,
): readonly ContentBlock[] {
  const blocks: ContentBlock[] = [
    tldr(input.tldr),
    definition(input.gameName, input.definition),

    heading("Game introduction", "introduction"),
    ...input.intro.map((text) => paragraph(text)),

    heading("Theme and background", "background"),
    ...input.background.map((text) => paragraph(text)),

    heading("Game features", "features"),
    paragraph(input.featuresLead),
    checklist(input.features, "Feature checklist"),

    heading("How to play", "how-to-play"),
    paragraph(input.howToLead),
    howTo({
      name: `How to play ${input.gameName}`,
      description: input.tldr,
      steps: input.howToSteps,
    }),

    heading("RTP notes", "rtp"),
    paragraph(input.rtpLead),
    ...input.rtpBody.map((text) => paragraph(text)),
    infoBox(
      "Confirm live figures",
      "Editorial RTP notes are context only. The authoritative figure is always the one shown in this game’s information panel on GGLBET.",
    ),

    heading("Volatility", "volatility"),
    paragraph(input.volatilityLead),
    ...input.volatilityBody.map((text) => paragraph(text)),

    heading("Bonus features", "bonus-features"),
    paragraph(input.bonusLead),
    bulletList(input.bonusFeatures, "Bonus and feature notes"),

    heading("Free spins and feature rounds", "free-spins"),
    paragraph(input.freeSpinsLead),
    ...(input.hasFreeSpins
      ? input.freeSpinsBody.map((text) => paragraph(text))
      : [
          tipBox(
            "Not a free-spins-first title",
            `${input.gameName} is not built around classic free-spin rounds. Use the rules panel for the feature set that actually ships in your market.`,
          ),
        ]),

    heading("Jackpot notes", "jackpot"),
    paragraph(input.jackpotLead),
    ...(input.hasJackpot
      ? input.jackpotBody.map((text) => paragraph(text))
      : [
          tipBox(
            "No progressive focus",
            `${input.gameName} is not presented here as a progressive jackpot focus. If a jackpot meter appears in your market, confirm rules inside the live panel.`,
          ),
        ]),

    heading("Bet range", "bet-range"),
    paragraph(input.betRangeLead),
    standardTable({
      caption: "Stake and layout snapshot",
      headers: ["Spec", "Value"],
      rows: input.betRows,
    }),

    heading("Who this game suits", "who-it-suits"),
    paragraph(input.playerFitLead),
    checklist(input.playerFit, "A good fit when you want"),

    heading("Practical tips", "tips"),
    paragraph(input.tipsLead),
    bestPractice(input.tips, "Session habits"),

    heading("Beginner path", "beginner-path"),
    paragraph(input.beginnerLead),
    bulletList(input.beginnerPath, "First-session checklist"),

    heading("Common mistakes", "common-mistakes"),
    commonMistakes(input.mistakes),
    warningBox("Safer play", input.responsibleNote),

    heading("Winning tips", "winning-tips"),
    paragraph(input.winningTipsLead),
    checklist(input.winningTips, "Discipline tips"),

    heading("Strategy notes", "strategy"),
    paragraph(input.strategyLead),
    bulletList(input.strategy, "Strategy framing"),

    heading("Frequently asked questions", "faq"),
    faqBlock(input.faq),

    heading("Summary", "summary"),
    summary(input.summary),
    tipBox(
      "Useful next pages",
      `Continue to the ${input.providerName} provider page, open related titles (${input.relatedGameLabels.join(", ") || "catalog picks"}), or browse the ${input.categoryLabel} filter on GGLBET.`,
    ),
    relatedContentBlock(
      {
        providerSlugs: [input.providerSlug],
        gameSlugs: input.relatedGameSlugs,
        guideSlugs: [],
        newsSlugs: [],
        promotionSlugs: [],
      },
      "Related reading",
    ),
    ctaBlock({
      heading: `Play ${input.gameName}`,
      body: "Open the title with a clear stake plan, then keep responsible gaming tools available for longer sessions.",
      primary: {
        label: "Play now",
        href: input.ctaPrimaryHref,
        variant: "primary",
      },
      secondary: {
        label: `${input.providerName} studio`,
        href: getProviderHref(input.providerSlug),
        variant: "outline",
      },
    }),
    ctaBlock({
      heading: "More from the catalog",
      body: "Compare related games or return to the full games directory.",
      primary: {
        label: "All games",
        href: ROUTES.games,
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

export function countWordsInGameBlocks(blocks: readonly ContentBlock[]): number {
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
