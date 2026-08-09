import { buildOfficialPromotionSeeds } from "@/lib/cms/seed/content/promotions/from-official";
import type { PromotionLongformSections } from "@/lib/cms/seed/content/promotions/longform";
import { countWordsInPromotionBlocks } from "@/lib/cms/seed/content/promotions/longform";
import type { ContentBlock } from "@/types/content";

const officialSeeds = buildOfficialPromotionSeeds();

export const promotionLongformBySlug: Readonly<
  Record<string, readonly ContentBlock[]>
> = Object.fromEntries(
  officialSeeds.map((seed) => [seed.slug, seed.blocks]),
);

export const promotionLongformSectionsBySlug: Readonly<
  Record<string, PromotionLongformSections>
> = Object.fromEntries(
  officialSeeds.map((seed) => [seed.slug, seed.longform]),
);

export function getPromotionLongformBlocks(
  slug: string,
): readonly ContentBlock[] | undefined {
  return promotionLongformBySlug[slug];
}

export function getPromotionLongformSections(
  slug: string,
): PromotionLongformSections | undefined {
  return promotionLongformSectionsBySlug[slug];
}

export function getPromotionLongformWordCounts(): readonly {
  readonly slug: string;
  readonly words: number;
  readonly title: string;
}[] {
  return officialSeeds.map((seed) => ({
    slug: seed.slug,
    title: seed.title,
    words: countWordsInPromotionBlocks(seed.blocks),
  }));
}

export function listOfficialPromotionTitles(): readonly string[] {
  return officialSeeds.map((seed) => seed.title);
}
