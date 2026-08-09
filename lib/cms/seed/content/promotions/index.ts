import { buildOfficialPromotionSeeds } from "@/lib/cms/seed/content/promotions/from-official";
import type { PromotionLongformSections } from "@/lib/cms/seed/content/promotions/longform";
import { countWordsInPromotionBlocks } from "@/lib/cms/seed/content/promotions/longform";
import type { ContentBlock } from "@/types/content";

async function officialSeeds() {
  return buildOfficialPromotionSeeds();
}

export async function getPromotionLongformBlocks(
  slug: string,
): Promise<readonly ContentBlock[] | undefined> {
  const seeds = await officialSeeds();
  return seeds.find((seed) => seed.slug === slug)?.blocks;
}

export async function getPromotionLongformSections(
  slug: string,
): Promise<PromotionLongformSections | undefined> {
  const seeds = await officialSeeds();
  return seeds.find((seed) => seed.slug === slug)?.longform;
}

export async function getPromotionLongformWordCounts(): Promise<
  readonly {
    readonly slug: string;
    readonly words: number;
    readonly title: string;
  }[]
> {
  const seeds = await officialSeeds();
  return seeds.map((seed) => ({
    slug: seed.slug,
    title: seed.title,
    words: countWordsInPromotionBlocks(seed.blocks),
  }));
}

export async function listOfficialPromotionTitles(): Promise<readonly string[]> {
  const seeds = await officialSeeds();
  return seeds.map((seed) => seed.title);
}
