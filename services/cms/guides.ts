import { getCmsClient } from "@/lib/cms";
import type {
  CmsListParams,
  CmsLocale,
  CmsPaginatedResult,
  CmsSlug,
} from "@/types/cms";
import type {
  Guide,
  GuideCategory,
  GuideListItem,
  GuidesPageContent,
} from "@/types/guide";

export async function listGuides(
  params?: CmsListParams & {
    readonly category?: string;
    readonly difficulty?: string;
    readonly slugs?: readonly string[];
  },
): Promise<CmsPaginatedResult<Guide>> {
  return getCmsClient().getGuides(params);
}

export async function listGuideListItems(
  params?: CmsListParams & {
    readonly category?: string;
    readonly featured?: boolean;
  },
): Promise<CmsPaginatedResult<GuideListItem>> {
  const { queryGuideListItems } = await import(
    "@/lib/cms/repositories/guides"
  );
  return queryGuideListItems({
    page: params?.page,
    pageSize: params?.pageSize,
    search: params?.search,
    featured: params?.featured,
    category: params?.category,
    status: params?.status as never,
    sort: params?.sort as never,
    locale: params?.locale,
  });
}

export async function getGuideBySlug(
  slug: CmsSlug,
  locale?: CmsLocale,
): Promise<Guide | null> {
  return getCmsClient().getGuideBySlug(slug, locale);
}

export async function getGuideByCategoryAndSlug(
  category: string,
  slug: CmsSlug,
  locale?: CmsLocale,
): Promise<Guide | null> {
  return getCmsClient().getGuideByCategoryAndSlug(category, slug, locale);
}

export async function getGuideStaticParams(): Promise<
  readonly { readonly category: string; readonly slug: string }[]
> {
  return getCmsClient().getGuideStaticParams();
}

export async function getGuidesPageContent(
  locale?: CmsLocale,
): Promise<GuidesPageContent> {
  return getCmsClient().getGuidesPage(locale);
}

export async function listGuideCategories(
  locale?: CmsLocale,
): Promise<readonly GuideCategory[]> {
  return getCmsClient().getGuideCategories(locale);
}

export async function getGuideCategoryBySlug(
  slug: string,
  locale?: CmsLocale,
): Promise<GuideCategory | null> {
  return getCmsClient().getGuideCategoryBySlug(slug, locale);
}

export async function getGuideCategorySlugs(): Promise<readonly string[]> {
  return getCmsClient().getGuideCategorySlugs();
}

export async function listGuidesBySlugs(
  slugs: readonly string[],
  locale?: CmsLocale,
): Promise<readonly Guide[]> {
  if (slugs.length === 0) return [];
  const result = await listGuides({ slugs, pageSize: slugs.length, locale });
  return result.items;
}

export async function listRelatedGuides(
  guide: Guide,
  limit = 6,
  locale?: CmsLocale,
): Promise<readonly Guide[]> {
  const bySlug = await listGuidesBySlugs(guide.relatedGuideSlugs, locale);
  if (bySlug.length >= limit) {
    return bySlug.slice(0, limit);
  }

  const sameCategory = await listGuides({
    category: guide.category,
    pageSize: limit + 1,
    sort: "popular",
    locale,
  });

  const merged = [...bySlug];
  const seen = new Set(merged.map((item) => item.slug));
  seen.add(guide.slug);

  for (const item of sameCategory.items) {
    if (seen.has(item.slug)) continue;
    merged.push(item);
    seen.add(item.slug);
    if (merged.length >= limit) break;
  }

  return merged.slice(0, limit);
}
