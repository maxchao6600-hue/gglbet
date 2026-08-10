import { getCmsClient } from "@/lib/cms";
import type {
  CmsListParams,
  CmsLocale,
  CmsPaginatedResult,
  CmsSlug,
} from "@/types/cms";
import type {
  Promotion,
  PromotionListItem,
  PromotionsPageContent,
} from "@/types/promotion";

export async function listPromotions(
  params?: CmsListParams & {
    readonly promotionType?: string;
    readonly featured?: boolean;
    readonly popular?: boolean;
    readonly slugs?: readonly string[];
  },
): Promise<CmsPaginatedResult<Promotion>> {
  return getCmsClient().getPromotions(params);
}

export async function listPromotionListItems(
  params?: CmsListParams & {
    readonly promotionType?: string;
    readonly featured?: boolean;
    readonly popular?: boolean;
  },
): Promise<CmsPaginatedResult<PromotionListItem>> {
  const { queryPromotionListItems } = await import(
    "@/lib/cms/repositories/promotions"
  );
  return queryPromotionListItems({
    page: params?.page,
    pageSize: params?.pageSize,
    search: params?.search,
    featured: params?.featured,
    popular: params?.popular,
    promotionType: params?.promotionType,
    status: params?.status as never,
    sort: params?.sort as never,
    locale: params?.locale,
  });
}

export async function getPromotionBySlug(
  slug: CmsSlug,
  locale?: CmsLocale,
): Promise<Promotion | null> {
  return getCmsClient().getPromotionBySlug(slug, locale);
}

export async function getPromotionStaticParams(): Promise<
  readonly { readonly slug: string }[]
> {
  return getCmsClient().getPromotionStaticParams();
}

export async function getPromotionsPageContent(
  locale?: CmsLocale,
): Promise<PromotionsPageContent> {
  return getCmsClient().getPromotionsPage(locale);
}

export async function listPromotionsBySlugs(
  slugs: readonly string[],
  locale?: CmsLocale,
): Promise<readonly Promotion[]> {
  if (slugs.length === 0) return [];
  const result = await listPromotions({ slugs, pageSize: slugs.length, locale });
  return result.items;
}

export async function listRelatedPromotions(
  promotion: Promotion,
  limit = 6,
  locale?: CmsLocale,
): Promise<readonly Promotion[]> {
  const merged: Promotion[] = [];
  const seen = new Set<string>();
  seen.add(promotion.slug);

  const samePromotionType = await listPromotions({
    promotionType: promotion.promotionType,
    pageSize: limit + 1,
    sort: "popular",
    locale,
  });

  for (const item of samePromotionType.items) {
    if (seen.has(item.slug)) continue;
    merged.push(item);
    seen.add(item.slug);
    if (merged.length >= limit) break;
  }

  if (merged.length < limit) {
    const popular = await listPromotions({
      pageSize: limit * 2,
      popular: true,
      sort: "popular",
      locale,
    });
    for (const item of popular.items) {
      if (seen.has(item.slug)) continue;
      merged.push(item);
      seen.add(item.slug);
      if (merged.length >= limit) break;
    }
  }

  return merged.slice(0, limit);
}
