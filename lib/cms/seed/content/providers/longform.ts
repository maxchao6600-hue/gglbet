import {
  bestPractice,
  bulletList,
  checklist,
  commonMistakes,
  consBlock,
  ctaBlock,
  definition,
  faqBlock,
  heading,
  howTo,
  infoBox,
  paragraph,
  prosBlock,
  relatedContentBlock,
  summary,
  tipBox,
  tldr,
  warningBox,
} from "@/lib/content/factories";
import { ROUTES } from "@/constants/routes";
import type { ContentBlock } from "@/types/content";
import type { ProviderFaqItem } from "@/types/provider";

export type ProviderLongformSections = {
  readonly name: string;
  readonly shortName: string;
  readonly tldr: string;
  readonly definition: string;
  /** Brand / platform introduction paragraphs */
  readonly platformIntro: readonly string[];
  readonly brandHistory: readonly string[];
  readonly gameFeaturesLead: string;
  readonly gameFeatures: readonly string[];
  readonly gameTypesLead: string;
  readonly gameTypes: readonly string[];
  readonly popularGamesLead: string;
  readonly popularGames: readonly string[];
  readonly rtpLead: string;
  readonly rtpBody: readonly string[];
  readonly volatilityLead: string;
  readonly volatilityBody: readonly string[];
  readonly playerFitLead: string;
  readonly playerFit: readonly string[];
  readonly platformTraitsLead: string;
  readonly platformTraits: readonly string[];
  readonly pros: readonly string[];
  readonly cons: readonly string[];
  readonly securityLead: string;
  readonly securityBody: readonly string[];
  readonly tipsLead: string;
  readonly tips: readonly string[];
  readonly howToSteps: readonly { readonly title: string; readonly text: string }[];
  readonly faq: readonly ProviderFaqItem[];
  readonly summary: string;
  readonly commonMistakes: readonly string[];
  readonly ctaPrimaryHref: string;
};

/**
 * Assemble publishable provider long-form into Content Engine blocks.
 * Section order mirrors the Provider SEO Template without changing that template.
 */
export function buildProviderLongformBlocks(
  input: ProviderLongformSections,
): readonly ContentBlock[] {
  const blocks: ContentBlock[] = [
    tldr(input.tldr),
    definition(input.name, input.definition),

    heading("Brand introduction", "platform-introduction"),
    ...input.platformIntro.map((text) => paragraph(text)),

    heading("Company history", "brand-history"),
    ...input.brandHistory.map((text) => paragraph(text)),

    heading("Game features", "game-features"),
    paragraph(input.gameFeaturesLead),
    checklist(input.gameFeatures, "Feature checklist"),

    heading("Game types", "game-types"),
    paragraph(input.gameTypesLead),
    bulletList(input.gameTypes, "Catalog focus"),

    heading("Popular games", "popular-games"),
    paragraph(input.popularGamesLead),
    bulletList(input.popularGames, "Titles players often open first"),

    heading("RTP notes", "rtp"),
    paragraph(input.rtpLead),
    ...input.rtpBody.map((text) => paragraph(text)),
    infoBox(
      "Confirm live figures",
      "Directory-level RTP notes are editorial context. The authoritative figure is always the one shown in each game’s information panel on GGLBET.",
    ),

    heading("Volatility", "volatility"),
    paragraph(input.volatilityLead),
    ...input.volatilityBody.map((text) => paragraph(text)),

    heading("Who this provider suits", "who-it-suits"),
    paragraph(input.playerFitLead),
    checklist(input.playerFit, "A good fit when you want"),

    heading("Platform traits on GGLBET", "platform-traits"),
    paragraph(input.platformTraitsLead),
    bulletList(input.platformTraits),

    heading("Advantages", "advantages"),
    prosBlock(input.pros, "Advantages"),

    heading("Limitations", "limitations"),
    consBlock(input.cons, "Limitations"),

    heading("Security and fair play", "security"),
    paragraph(input.securityLead),
    ...input.securityBody.map((text) => paragraph(text)),
    warningBox(
      "Account safety",
      "Only open provider titles through your signed-in GGLBET session. Do not share passwords, one-time codes, or wallet seed phrases with anyone claiming to be support.",
    ),

    heading("Practical tips", "beginner-advice"),
    paragraph(input.tipsLead),
    bestPractice(input.tips, "Session habits that travel well"),
    howTo({
      name: `Getting started with ${input.shortName} on GGLBET`,
      description: `A calm first path into the ${input.name} catalog.`,
      steps: input.howToSteps,
    }),
    commonMistakes(input.commonMistakes),

    heading("Frequently asked questions", "faq"),
    faqBlock(input.faq),

    heading("Summary", "summary"),
    summary(input.summary),
    tipBox(
      "Useful next pages",
      "From here, open linked games, compare other studios in the provider directory, or read a related guide before you raise stakes.",
    ),
    relatedContentBlock(
      {
        providerSlugs: [],
        gameSlugs: [],
        guideSlugs: [],
        newsSlugs: [],
        promotionSlugs: [],
      },
      "Related reading",
    ),
    ctaBlock({
      heading: `Explore ${input.shortName} games`,
      body: "Continue into the catalog with a clear stake plan, then keep responsible gaming tools available for longer sessions.",
      primary: {
        label: `Browse ${input.shortName} games`,
        href: input.ctaPrimaryHref,
        variant: "primary",
      },
      secondary: {
        label: "All providers",
        href: ROUTES.providers,
        variant: "outline",
      },
    }),
  ];

  return blocks;
}

/** Rough English word count for editorial QA. */
export function countWordsInBlocks(blocks: readonly ContentBlock[]): number {
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
    default:
      return 0;
  }
}

function wordCount(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}
