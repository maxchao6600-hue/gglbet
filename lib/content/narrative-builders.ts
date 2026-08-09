/**
 * Legacy narrative builders — now powered by the SEO Content Template Generator.
 * Kept so existing imports keep working without UI changes.
 */

import {
  generateContentBlocksForGame,
  generateContentBlocksForPromotion,
  generateContentBlocksForProvider,
} from "@/lib/content/generator/generate";
import { buildTocFromBlocks } from "@/lib/content/toc";
import type { ContentBlock, ContentTocItem } from "@/types/content";
import type { Game } from "@/types/game";
import type { Promotion } from "@/types/promotion";
import type { Provider } from "@/types/provider";

export function buildGameContentBlocks(
  game: Parameters<typeof generateContentBlocksForGame>[0],
): readonly ContentBlock[] {
  return generateContentBlocksForGame(game);
}

export function buildProviderContentBlocks(
  provider: Parameters<typeof generateContentBlocksForProvider>[0],
): readonly ContentBlock[] {
  return generateContentBlocksForProvider(provider);
}

export function buildPromotionContentBlocks(
  promotion: Parameters<typeof generateContentBlocksForPromotion>[0],
): readonly ContentBlock[] {
  return generateContentBlocksForPromotion(promotion);
}

export function withGeneratedToc(blocks: readonly ContentBlock[]): {
  readonly content: readonly ContentBlock[];
  readonly tableOfContents: readonly ContentTocItem[];
} {
  return {
    content: blocks,
    tableOfContents: buildTocFromBlocks(blocks),
  };
}

/** @deprecated Prefer generateGameContent from `@/lib/content/generator`. */
export type GameNarrativeInput = Pick<
  Game,
  | "gameName"
  | "shortDescription"
  | "fullDescription"
  | "features"
  | "bonusFeatures"
  | "howToPlay"
  | "tips"
  | "strategy"
  | "faq"
  | "gallery"
  | "responsibleGamingNotes"
  | "volatilityGuide"
  | "providerName"
>;

/** @deprecated Prefer generateProviderContent from `@/lib/content/generator`. */
export type ProviderNarrativeInput = Pick<
  Provider,
  | "name"
  | "shortName"
  | "intro"
  | "history"
  | "features"
  | "advantages"
  | "whyChoose"
  | "howToPlay"
  | "tips"
  | "pros"
  | "cons"
  | "faq"
  | "gallery"
  | "securityNotes"
  | "fairPlayNotes"
  | "volatilityGuide"
>;

/** @deprecated Prefer generatePromotionContent from `@/lib/content/generator`. */
export type PromotionNarrativeInput = Pick<
  Promotion,
  | "title"
  | "excerpt"
  | "overview"
  | "requirements"
  | "terms"
  | "faq"
  | "eligibleGames"
  | "bonusAmount"
>;
