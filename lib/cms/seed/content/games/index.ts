import {
  countWordsInGameBlocks,
  type GameLongformSections,
} from "@/lib/cms/seed/content/games/longform";
import type { ContentBlock } from "@/types/content";

/**
 * CMS long-form game articles keyed by game slug.
 * Official catalog SEO is generated via featured-seo / from-official.
 */
export const gameLongformBySlug: Readonly<
  Record<string, readonly ContentBlock[]>
> = {};

export const gameLongformSectionsBySlug: Readonly<
  Record<string, GameLongformSections>
> = {};

export function getGameLongformBlocks(
  slug: string,
): readonly ContentBlock[] | undefined {
  return gameLongformBySlug[slug];
}

export function getGameLongformSections(
  slug: string,
): GameLongformSections | undefined {
  return gameLongformSectionsBySlug[slug];
}

export function getGameLongformWordCounts(): readonly {
  readonly slug: string;
  readonly words: number;
  readonly providerSlug: string;
}[] {
  return Object.entries(gameLongformBySlug).map(([slug, blocks]) => ({
    slug,
    words: countWordsInGameBlocks(blocks),
    providerSlug: gameLongformSectionsBySlug[slug]?.providerSlug ?? "",
  }));
}
