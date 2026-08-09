import type { ContentRelatedRefs } from "@/types/content";
import type { CmsSlug } from "@/types/cms";

type RelatedSlugBag = {
  readonly relatedProviderSlugs?: readonly CmsSlug[];
  readonly relatedGameSlugs?: readonly CmsSlug[];
  readonly relatedGuideSlugs?: readonly CmsSlug[];
  readonly relatedNewsSlugs?: readonly CmsSlug[];
  readonly relatedPromotionSlugs?: readonly CmsSlug[];
};

/**
 * Build related refs from CMS document slug fields — no manual link maintenance.
 */
export function buildRelatedRefsFromDocument(
  doc: RelatedSlugBag,
): ContentRelatedRefs {
  return {
    providerSlugs: doc.relatedProviderSlugs ?? [],
    gameSlugs: doc.relatedGameSlugs ?? [],
    guideSlugs: doc.relatedGuideSlugs ?? [],
    newsSlugs: doc.relatedNewsSlugs ?? [],
    promotionSlugs: doc.relatedPromotionSlugs ?? [],
  };
}

export function mergeRelatedRefs(
  ...parts: readonly ContentRelatedRefs[]
): ContentRelatedRefs {
  return {
    providerSlugs: unique(parts.flatMap((part) => part.providerSlugs ?? [])),
    gameSlugs: unique(parts.flatMap((part) => part.gameSlugs ?? [])),
    guideSlugs: unique(parts.flatMap((part) => part.guideSlugs ?? [])),
    newsSlugs: unique(parts.flatMap((part) => part.newsSlugs ?? [])),
    promotionSlugs: unique(parts.flatMap((part) => part.promotionSlugs ?? [])),
  };
}

/**
 * Collect related refs declared inside relatedContent blocks + document fields.
 */
export function collectRelatedRefsFromBlocks(
  blockRefs: readonly ContentRelatedRefs[],
  documentRefs: ContentRelatedRefs,
): ContentRelatedRefs {
  return mergeRelatedRefs(...blockRefs, documentRefs);
}

function unique(values: readonly string[]): readonly string[] {
  return [...new Set(values)];
}
