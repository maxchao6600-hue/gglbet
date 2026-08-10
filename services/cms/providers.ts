import { getCmsClient } from "@/lib/cms";
import type {
  CmsListParams,
  CmsLocale,
  CmsPaginatedResult,
  CmsSlug,
} from "@/types/cms";
import type {
  Provider,
  ProviderListItem,
  ProvidersPageContent,
} from "@/types/provider";

export async function listProviders(
  params?: CmsListParams,
): Promise<CmsPaginatedResult<Provider>> {
  return getCmsClient().getProviders(params);
}

/** Compact directory rows — no longform content/faq in RSC flight. */
export async function listProviderListItems(
  params?: CmsListParams,
): Promise<CmsPaginatedResult<ProviderListItem>> {
  const { queryProviderListItems } = await import(
    "@/lib/cms/repositories/providers"
  );
  return queryProviderListItems({
    page: params?.page,
    pageSize: params?.pageSize,
    search: params?.search,
    featured: params?.featured,
    status: params?.status,
    sort: params?.sort as never,
    locale: params?.locale,
    category: params?.category,
    letter: params?.letter,
  });
}

export async function getProviderBySlug(
  slug: CmsSlug,
  locale?: CmsLocale,
): Promise<Provider | null> {
  return getCmsClient().getProviderBySlug(slug, locale);
}

export async function getProviderSlugs(): Promise<readonly string[]> {
  return getCmsClient().getProviderSlugs();
}

export async function getProvidersPageContent(
  locale?: CmsLocale,
): Promise<ProvidersPageContent> {
  return getCmsClient().getProvidersPage(locale);
}

export async function getRelatedProviders(
  slugs: readonly string[],
  locale?: CmsLocale,
): Promise<readonly Provider[]> {
  if (slugs.length === 0) {
    return [];
  }

  const result = await listProviders({
    pageSize: 200,
    status: "published",
    locale,
  });
  const set = new Set(slugs);
  return result.items.filter((provider) => set.has(provider.slug));
}
