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
  standardTable,
  summary,
  tipBox,
  tldr,
  warningBox,
} from "@/lib/content/factories";
import {
  closingSummaryCopy,
  gameIntroCopy,
  guideIntroCopy,
  newsLeadCopy,
  promotionOverviewCopy,
  providerHistoryCopy,
  providerIntroCopy,
} from "@/lib/content/generator/copy";
import {
  applyTemplatePattern,
  sectionAnchor,
} from "@/lib/content/generator/template-utils";
import {
  TEMPLATE_BASE_HREFS,
  getContentTemplateByType,
} from "@/lib/cms/seed/content-templates";
import { buildTocFromBlocks } from "@/lib/content/toc";
import {
  ROUTES,
  getProviderHref,
} from "@/constants/routes";
import type { ContentBlock } from "@/types/content";
import type {
  ContentTemplateDocument,
  ContentTemplateSectionConfig,
  GeneratedContentResult,
  TemplateTokenMap,
} from "@/types/content-template";
import type { Game } from "@/types/game";
import type { Guide } from "@/types/guide";
import type { NewsArticle } from "@/types/news";
import type { Promotion } from "@/types/promotion";
import type { Provider } from "@/types/provider";

type SectionBuilder = (
  section: ContentTemplateSectionConfig,
) => readonly ContentBlock[];

function enabledSections(
  template: ContentTemplateDocument,
): readonly ContentTemplateSectionConfig[] {
  return [...template.sections]
    .filter((section) => section.enabled)
    .sort((a, b) => a.order - b.order);
}

function runTemplate(
  template: ContentTemplateDocument,
  tokens: TemplateTokenMap,
  buildSection: SectionBuilder,
): GeneratedContentResult {
  const blocks: ContentBlock[] = [];

  for (const section of enabledSections(template)) {
    blocks.push(...buildSection(section));
  }

  // Always append related-content signal block for the Related Content Engine.
  blocks.push(
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
  );

  return {
    blocks,
    tableOfContents: template.seo.includeToc
      ? buildTocFromBlocks(blocks)
      : [],
    metaTitle: applyTemplatePattern(template.seo.metaTitlePattern, tokens),
    metaDescription: applyTemplatePattern(
      template.seo.metaDescriptionPattern,
      tokens,
    ),
    h1: applyTemplatePattern(template.seo.h1Pattern, tokens),
    templateId: template.id,
    templateVersion: template.version,
  };
}

function sectionHeading(section: ContentTemplateSectionConfig): ContentBlock {
  return heading(
    section.heading,
    sectionAnchor(section.heading, section.anchor),
  );
}

function templateCta(
  template: ContentTemplateDocument,
  tokens: TemplateTokenMap,
): ContentBlock {
  return ctaBlock({
    heading: applyTemplatePattern(template.cta.primaryLabel, tokens),
    body: "Continue with a clear next action, then keep responsible gaming tools available.",
    primary: {
      label: applyTemplatePattern(template.cta.primaryLabel, tokens),
      href: applyTemplatePattern(template.cta.primaryHrefPattern, tokens),
      variant: "primary",
    },
    secondary: {
      label: applyTemplatePattern(template.cta.secondaryLabel, tokens),
      href: applyTemplatePattern(template.cta.secondaryHrefPattern, tokens),
      variant: "outline",
    },
  });
}

function internalLinkParagraph(
  template: ContentTemplateDocument,
  tokens: TemplateTokenMap,
): ContentBlock {
  const labels = template.internalLinks
    .map((link) => applyTemplatePattern(link.label, tokens))
    .filter(Boolean);
  return tipBox(
    "Useful next pages",
    labels.length > 0
      ? `From here you can open ${labels.join(", ")} without leaving the GGLBET content graph.`
      : "Browse related hubs from the site navigation to continue reading.",
  );
}

/* -------------------------------------------------------------------------- */
/* Provider                                                                    */
/* -------------------------------------------------------------------------- */

export type ProviderGeneratorInput = Pick<
  Provider,
  | "name"
  | "shortName"
  | "intro"
  | "summary"
  | "history"
  | "features"
  | "advantages"
  | "whyChoose"
  | "howToPlay"
  | "tips"
  | "pros"
  | "cons"
  | "faq"
  | "popularGameSlugs"
  | "rtp"
  | "rtpNotes"
  | "volatility"
  | "volatilityGuide"
  | "foundedYear"
  | "country"
  | "categoryLabels"
  | "canonicalPath"
  | "ctaPrimaryLabel"
  | "ctaPrimaryHref"
  | "ctaSecondaryLabel"
  | "ctaSecondaryHref"
>;

export function generateProviderContent(
  provider: ProviderGeneratorInput,
  template: ContentTemplateDocument = getContentTemplateByType("provider"),
): GeneratedContentResult {
  const tokens: TemplateTokenMap = {
    name: provider.name,
    shortName: provider.shortName,
    ...TEMPLATE_BASE_HREFS,
    gamesHref: `${ROUTES.games}?provider=${provider.name}`,
    providersHref: ROUTES.providers,
  };

  return runTemplate(template, tokens, (section) => {
    switch (section.id) {
      case "platform-intro":
        return [
          sectionHeading(section),
          tldr(provider.summary || provider.intro),
          definition(
            provider.name,
            `${provider.name} is a studio listed on GGLBET for ${provider.categoryLabels.join(", ") || "catalog games"}.`,
          ),
          paragraph(providerIntroCopy(provider)),
        ];
      case "brand-history":
        return [
          sectionHeading(section),
          paragraph(providerHistoryCopy(provider)),
        ];
      case "game-features":
        return [
          sectionHeading(section),
          checklist(provider.features, "Feature highlights"),
        ];
      case "popular-games":
        return [
          sectionHeading(section),
          provider.popularGameSlugs.length > 0
            ? bulletList(
                provider.popularGameSlugs.map(
                  (slug) => `${slug.replace(/-/g, " ")} (CMS-linked title)`,
                ),
                "Titles commonly highlighted for this studio",
              )
            : paragraph(
                "Popular titles are linked from CMS relationships on this provider page once the catalog is populated.",
              ),
        ];
      case "game-mechanics":
        return [
          sectionHeading(section),
          paragraph(
            `${provider.name} catalogs lean on readable feature rules and consistent device layouts. Mechanics differ by title—open a game page for reels, tables, or draw formats before raising stakes.`,
          ),
          provider.howToPlay.length > 0
            ? howTo({
                name: `Getting started with ${provider.name}`,
                description: provider.intro,
                steps: provider.howToPlay.map((text, index) => ({
                  title: `Step ${index + 1}`,
                  text,
                })),
              })
            : tipBox(
                "Mechanics tip",
                "Start on one representative title and confirm the information panel before exploring the wider catalog.",
              ),
        ];
      case "rtp":
        return [
          sectionHeading(section),
          infoBox(
            "RTP is title-specific",
            provider.rtpNotes ||
              (typeof provider.rtp === "number"
                ? `A directory-level reference near ${provider.rtp}% may appear for some titles, but live figures belong in each game panel.`
                : "Confirm published RTP inside each game information panel before you play."),
          ),
        ];
      case "volatility":
        return [
          sectionHeading(section),
          paragraph(provider.volatilityGuide),
          tipBox(
            "Volatility label",
            `This studio is tagged ${provider.volatility} at directory level. Match session length to the individual game label, not the studio average alone.`,
          ),
        ];
      case "player-fit":
        return [
          sectionHeading(section),
          checklist(
            provider.whyChoose.length > 0
              ? provider.whyChoose
              : [
                  "Players comparing modern feature clarity",
                  "Sessions that move between desktop and mobile",
                  "Readers who want studio context before opening a title",
                ],
            "A good fit when you want",
          ),
        ];
      case "pros":
        return [sectionHeading(section), prosBlock(provider.pros, "Advantages")];
      case "cons":
        return [
          sectionHeading(section),
          consBlock(
            provider.cons.length > 0
              ? provider.cons
              : [
                  "Studio-level ratings never replace title-level checks",
                  "Catalog depth varies by category",
                ],
            "Limitations",
          ),
        ];
      case "beginner-tips":
        return [
          sectionHeading(section),
          bestPractice(
            provider.tips.length > 0
              ? provider.tips
              : [
                  "Open one popular title first and learn its panel labels",
                  "Keep stakes low until feature timing feels familiar",
                  "Use responsible gaming limits before longer sessions",
                ],
          ),
        ];
      case "faq":
        return [
          sectionHeading(section),
          faqBlock(
            provider.faq.length > 0
              ? provider.faq
              : [
                  {
                    question: `What does the ${provider.name} page cover?`,
                    answer:
                      "Studio context, features, volatility notes, beginner advice, and links into related games and guides.",
                  },
                ],
          ),
        ];
      case "summary":
        return [
          sectionHeading(section),
          summary(closingSummaryCopy("provider", provider.name)),
          internalLinkParagraph(template, tokens),
        ];
      case "cta":
        return [templateCta(template, tokens)];
      default:
        return [];
    }
  });
}

/* -------------------------------------------------------------------------- */
/* Game                                                                        */
/* -------------------------------------------------------------------------- */

export type GameGeneratorInput = Pick<
  Game,
  | "gameName"
  | "providerName"
  | "providerSlug"
  | "shortDescription"
  | "fullDescription"
  | "category"
  | "theme"
  | "features"
  | "bonusFeatures"
  | "howToPlay"
  | "tips"
  | "strategy"
  | "faq"
  | "rtp"
  | "rtpNotes"
  | "volatility"
  | "volatilityGuide"
  | "minBet"
  | "maxBet"
  | "maxWin"
  | "jackpot"
  | "paylines"
  | "reels"
  | "rows"
  | "responsibleGamingNotes"
  | "canonicalPath"
>;

export function generateGameContent(
  game: GameGeneratorInput,
  template: ContentTemplateDocument = getContentTemplateByType("game"),
): GeneratedContentResult {
  const tokens: TemplateTokenMap = {
    gameName: game.gameName,
    providerName: game.providerName,
    shortDescription: game.shortDescription,
    ...TEMPLATE_BASE_HREFS,
    providerHref: getProviderHref(game.providerSlug),
  };

  return runTemplate(template, tokens, (section) => {
    switch (section.id) {
      case "intro":
        return [
          sectionHeading(section),
          tldr(game.shortDescription),
          definition(
            game.gameName,
            `${game.gameName} is a ${game.category.replace("-", " ")} title from ${game.providerName} on GGLBET.`,
          ),
          paragraph(gameIntroCopy(game)),
        ];
      case "background":
        return [
          sectionHeading(section),
          paragraph(
            `${game.gameName} leans on a ${game.theme} theme. Treat theme as atmosphere; outcomes still follow the published math model and feature rules in the game panel.`,
          ),
        ];
      case "how-to-play":
        return [
          sectionHeading(section),
          howTo({
            name: `How to play ${game.gameName}`,
            description: game.shortDescription,
            steps:
              game.howToPlay.length > 0
                ? game.howToPlay.map((text, index) => ({
                    title: `Step ${index + 1}`,
                    text,
                  }))
                : [
                    {
                      title: "Open the title",
                      text: "Launch the game from the GGLBET catalog or provider page.",
                    },
                    {
                      title: "Read the panel",
                      text: "Confirm stakes, rules, and any published RTP notes.",
                    },
                    {
                      title: "Set a limit",
                      text: "Choose a session budget before raising stakes.",
                    },
                  ],
          }),
        ];
      case "rtp":
        return [
          sectionHeading(section),
          infoBox(
            "RTP reference",
            game.rtpNotes ||
              (typeof game.rtp === "number"
                ? `Editorial reference RTP is ${game.rtp}%. Always confirm the live figure inside the game information panel.`
                : "RTP varies by market configuration. Confirm the live figure inside the game information panel."),
          ),
        ];
      case "volatility":
        return [
          sectionHeading(section),
          paragraph(game.volatilityGuide),
        ];
      case "bonus-features":
        return [
          sectionHeading(section),
          checklist(
            game.bonusFeatures.length > 0
              ? game.bonusFeatures
              : game.features.slice(0, 4),
            "Feature notes",
          ),
        ];
      case "free-spins":
        return [
          sectionHeading(section),
          paragraph(
            `Feature rounds on ${game.gameName} are explained in the in-game rules. Free-spin style rounds—when present—are pacing tools, not guarantees. Learn trigger conditions in demo mode when available.`,
          ),
        ];
      case "jackpot":
        return [
          sectionHeading(section),
          paragraph(
            game.jackpot
              ? `Jackpot labeling for this title: ${game.jackpot}. Confirm whether any progressive values are network-linked or local before you play.`
              : `${game.gameName} is not presented here as a progressive jackpot focus. Check the live panel if a jackpot meter appears in your market.`,
          ),
        ];
      case "bet-range":
        return [
          sectionHeading(section),
          standardTable({
            caption: "Stake snapshot",
            headers: ["Spec", "Value"],
            rows: [
              ["Min bet", game.minBet ?? "See game panel"],
              ["Max bet", game.maxBet ?? "See game panel"],
              ["Max win note", game.maxWin ?? "See game panel"],
              [
                "Layout",
                [
                  game.reels ? `${game.reels} reels` : null,
                  game.rows ? `${game.rows} rows` : null,
                  game.paylines ? `${game.paylines} paylines` : null,
                ]
                  .filter(Boolean)
                  .join(" · ") || "See game panel",
              ],
            ],
          }),
        ];
      case "tips":
        return [
          sectionHeading(section),
          bestPractice(
            game.tips.length > 0
              ? game.tips
              : [
                  "Keep the first session short while learning feature timing",
                  "Match stake size to volatility comfort",
                  "Use account limits before longer play",
                ],
          ),
        ];
      case "beginner-guide":
        return [
          sectionHeading(section),
          bulletList(
            game.strategy.length > 0
              ? game.strategy
              : [
                  "Start in demo when available",
                  "Read paytable and feature pages fully",
                  "Raise stakes only after you understand the pace of returns",
                ],
            "First-session path",
          ),
        ];
      case "common-mistakes":
        return [
          sectionHeading(section),
          commonMistakes([
            "Skipping the information panel before real-money play",
            "Raising stakes to “catch up” after a quiet stretch",
            "Ignoring responsible gaming tools during longer sessions",
          ]),
          warningBox("Safer play", game.responsibleGamingNotes),
        ];
      case "faq":
        return [
          sectionHeading(section),
          faqBlock(
            game.faq.length > 0
              ? game.faq
              : [
                  {
                    question: `Is ${game.gameName} available on mobile?`,
                    answer:
                      "Most GGLBET catalog titles support modern mobile browsers and the app experience where enabled.",
                  },
                ],
          ),
        ];
      case "summary":
        return [
          sectionHeading(section),
          summary(closingSummaryCopy("game", game.gameName)),
          internalLinkParagraph(template, tokens),
        ];
      case "cta":
        return [templateCta(template, tokens)];
      default:
        return [];
    }
  });
}

/* -------------------------------------------------------------------------- */
/* Guide                                                                       */
/* -------------------------------------------------------------------------- */

export type GuideGeneratorInput = Pick<
  Guide,
  | "title"
  | "excerpt"
  | "category"
  | "tips"
  | "warnings"
  | "bestPractices"
  | "faq"
  | "difficulty"
  | "ctaPrimaryLabel"
  | "ctaPrimaryHref"
  | "ctaSecondaryLabel"
  | "ctaSecondaryHref"
> & {
  readonly steps?: readonly { readonly title: string; readonly text: string }[];
};

export function generateGuideContent(
  guide: GuideGeneratorInput,
  template: ContentTemplateDocument = getContentTemplateByType("guide"),
): GeneratedContentResult {
  const tokens: TemplateTokenMap = {
    title: guide.title,
    excerpt: guide.excerpt,
    ctaPrimaryLabel: guide.ctaPrimaryLabel,
    ctaPrimaryHref: guide.ctaPrimaryHref,
    ...TEMPLATE_BASE_HREFS,
  };

  const steps =
    guide.steps && guide.steps.length > 0
      ? guide.steps
      : guide.bestPractices.slice(0, 4).map((text, index) => ({
          title: `Step ${index + 1}`,
          text,
        }));

  return runTemplate(template, tokens, (section) => {
    switch (section.id) {
      case "tldr":
        return [tldr(guide.excerpt)];
      case "intro":
        return [
          sectionHeading(section),
          paragraph(guideIntroCopy(guide)),
          tipBox(
            "Difficulty",
            `This guide is labeled ${guide.difficulty}. Move one checklist item at a time if you are new to the topic.`,
          ),
        ];
      case "steps":
        return [
          sectionHeading(section),
          howTo({
            name: guide.title,
            description: guide.excerpt,
            steps:
              steps.length > 0
                ? steps
                : [
                    {
                      title: "Read the overview",
                      text: "Skim the TL;DR and introduction before changing any account setting.",
                    },
                    {
                      title: "Follow the checklist",
                      text: "Complete each checklist item in order.",
                    },
                    {
                      title: "Verify in-product",
                      text: "Confirm the live GGLBET screen matches what you expected.",
                    },
                  ],
          }),
        ];
      case "checklist":
        return [
          sectionHeading(section),
          checklist(
            guide.bestPractices.length > 0
              ? guide.bestPractices
              : guide.tips,
            "Before you continue",
          ),
        ];
      case "warnings":
        return [
          sectionHeading(section),
          warningBox(
            "Watch-outs",
            (guide.warnings[0] ??
              "Do not skip eligibility or safer-play checks when a guide mentions account tools.") +
              (guide.warnings.length > 1
                ? ` Also: ${guide.warnings.slice(1).join(" ")}`
                : ""),
          ),
        ];
      case "common-mistakes":
        return [
          sectionHeading(section),
          commonMistakes(
            guide.tips.length > 0
              ? guide.tips.map((tip) => `Ignoring this reminder: ${tip}`)
              : [
                  "Skipping checklist items to save time",
                  "Mixing multiple account changes in one sitting",
                  "Treating editorial examples as live cashier figures",
                ],
          ),
        ];
      case "faq":
        return [
          sectionHeading(section),
          faqBlock(
            guide.faq.length > 0
              ? guide.faq
              : [
                  {
                    question: "Is this guide a substitute for live terms?",
                    answer:
                      "No. Guides explain process; live account panels and published terms remain authoritative.",
                  },
                ],
          ),
        ];
      case "summary":
        return [
          sectionHeading(section),
          summary(closingSummaryCopy("guide", guide.title)),
          internalLinkParagraph(template, tokens),
        ];
      case "cta":
        return [templateCta(template, tokens)];
      default:
        return [];
    }
  });
}

/* -------------------------------------------------------------------------- */
/* News                                                                        */
/* -------------------------------------------------------------------------- */

export type NewsGeneratorInput = Pick<
  NewsArticle,
  | "title"
  | "excerpt"
  | "heroDescription"
  | "faq"
  | "timeline"
  | "tags"
  | "ctaPrimaryLabel"
  | "ctaPrimaryHref"
  | "ctaSecondaryLabel"
  | "ctaSecondaryHref"
  | "category"
>;

export function generateNewsContent(
  article: NewsGeneratorInput,
  template: ContentTemplateDocument = getContentTemplateByType("news"),
): GeneratedContentResult {
  const tokens: TemplateTokenMap = {
    title: article.title,
    excerpt: article.excerpt,
    ctaPrimaryLabel: article.ctaPrimaryLabel,
    ctaPrimaryHref: article.ctaPrimaryHref,
    ...TEMPLATE_BASE_HREFS,
  };

  return runTemplate(template, tokens, (section) => {
    switch (section.id) {
      case "summary":
        return [
          tldr(article.excerpt),
          sectionHeading(section),
          paragraph(newsLeadCopy(article)),
        ];
      case "background":
        return [
          sectionHeading(section),
          paragraph(
            `This update sits in the ${article.category.replace("-", " ")} news stream. Background matters because eligibility, dates, and product labels can change how the story applies to your account.`,
          ),
          article.tags.length > 0
            ? bulletList(article.tags.map((tag) => `Topic tag: ${tag}`))
            : tipBox(
                "Context",
                "Related tags will appear here when editors attach CMS topic labels.",
              ),
        ];
      case "latest":
        return [
          sectionHeading(section),
          article.timeline.length > 0
            ? bulletList(
                article.timeline.map(
                  (item) =>
                    `${item.date ? `${item.date}: ` : ""}${item.label} — ${item.body}`,
                ),
                "Timeline",
              )
            : paragraph(article.heroDescription || article.excerpt),
        ];
      case "impact":
        return [
          sectionHeading(section),
          paragraph(
            "Impact is usually practical: what to verify in promotions, payments, catalog labels, or safer-play tools. Avoid assuming every headline changes your available offers.",
          ),
        ];
      case "key-points":
        return [
          sectionHeading(section),
          checklist(
            [
              "Re-read dates and eligibility before acting",
              "Confirm live panels over editorial summaries",
              "Keep responsible gaming settings in place",
            ],
            "Key takeaways",
          ),
        ];
      case "faq":
        return [
          sectionHeading(section),
          faqBlock(
            article.faq.length > 0
              ? article.faq
              : [
                  {
                    question: "Where should I confirm live details?",
                    answer:
                      "Use the relevant GGLBET product panel (promotion, cashier, or game info) for figures that can change by region or account.",
                  },
                ],
          ),
        ];
      case "cta":
        return [
          summary(closingSummaryCopy("news", article.title)),
          internalLinkParagraph(template, tokens),
          templateCta(template, tokens),
        ];
      default:
        return [];
    }
  });
}

/* -------------------------------------------------------------------------- */
/* Promotion                                                                   */
/* -------------------------------------------------------------------------- */

export type PromotionGeneratorInput = Pick<
  Promotion,
  | "title"
  | "excerpt"
  | "overview"
  | "bonusAmount"
  | "currency"
  | "minimumDeposit"
  | "maximumBonus"
  | "turnoverRequirement"
  | "requirements"
  | "terms"
  | "eligibleGames"
  | "faq"
  | "promotionType"
  | "bonusType"
  | "canonicalPath"
>;

export function generatePromotionContent(
  promotion: PromotionGeneratorInput,
  template: ContentTemplateDocument = getContentTemplateByType("promotion"),
): GeneratedContentResult {
  const tokens: TemplateTokenMap = {
    title: promotion.title,
    excerpt: promotion.excerpt,
    ...TEMPLATE_BASE_HREFS,
  };

  return runTemplate(template, tokens, (section) => {
    switch (section.id) {
      case "overview":
        return [
          sectionHeading(section),
          tldr(promotion.excerpt),
          definition(
            promotion.title,
            `${promotion.title} is a ${promotion.promotionType.replace("-", " ")} offer on GGLBET with a headline figure of ${promotion.bonusAmount}.`,
          ),
          paragraph(promotionOverviewCopy(promotion)),
        ];
      case "bonus":
        return [
          sectionHeading(section),
          standardTable({
            caption: "Bonus snapshot",
            headers: ["Field", "Value"],
            rows: [
              ["Bonus amount", promotion.bonusAmount],
              ["Currency", promotion.currency],
              ["Bonus type", promotion.bonusType],
              ["Minimum deposit", promotion.minimumDeposit ?? "See live panel"],
              ["Maximum bonus", promotion.maximumBonus ?? "See live panel"],
              [
                "Turnover",
                promotion.turnoverRequirement ?? "See live panel",
              ],
            ],
          }),
        ];
      case "requirements":
        return [
          sectionHeading(section),
          checklist(promotion.requirements, "Eligibility checklist"),
        ];
      case "terms":
        return [
          sectionHeading(section),
          bulletList(promotion.terms, "Key terms"),
          warningBox(
            "Live terms win",
            "Editorial pages summarize structure. The cashier offer panel remains authoritative for your account and region.",
          ),
        ];
      case "eligible-games":
        return [
          sectionHeading(section),
          promotion.eligibleGames.length > 0
            ? bulletList(promotion.eligibleGames, "Eligible game notes")
            : paragraph(
                "Eligible games are configured in CMS and shown on the live offer. Weighting can differ by title.",
              ),
        ];
      case "faq":
        return [
          sectionHeading(section),
          faqBlock(
            promotion.faq.length > 0
              ? promotion.faq
              : [
                  {
                    question: `Who can claim ${promotion.title}?`,
                    answer:
                      "Eligible verified accounts that meet the requirements shown on the live offer panel.",
                  },
                ],
          ),
        ];
      case "summary":
        return [
          sectionHeading(section),
          summary(closingSummaryCopy("promotion", promotion.title)),
          internalLinkParagraph(template, tokens),
        ];
      case "cta":
        return [templateCta(template, tokens)];
      default:
        return [];
    }
  });
}

/** Facade used by Content Engine attach helpers. */
export function generateContentBlocksForProvider(
  provider: ProviderGeneratorInput,
): readonly ContentBlock[] {
  return generateProviderContent(provider).blocks;
}

export function generateContentBlocksForGame(
  game: GameGeneratorInput,
): readonly ContentBlock[] {
  return generateGameContent(game).blocks;
}

export function generateContentBlocksForPromotion(
  promotion: PromotionGeneratorInput,
): readonly ContentBlock[] {
  return generatePromotionContent(promotion).blocks;
}
