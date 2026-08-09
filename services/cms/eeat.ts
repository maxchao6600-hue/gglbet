import { getCmsClient } from "@/lib/cms";
import type { CmsLocale, CmsSlug } from "@/types/cms";
import type {
  EditorialPerson,
  EeatContent,
  TrustPageDocument,
} from "@/types/eeat";

export async function getEeatContent(locale?: CmsLocale): Promise<EeatContent> {
  return getCmsClient().getEeatContent(locale);
}

export async function listTrustPages(
  locale?: CmsLocale,
): Promise<readonly TrustPageDocument[]> {
  return getCmsClient().getTrustPages(locale);
}

export async function getTrustPageBySlug(
  slug: CmsSlug,
  locale?: CmsLocale,
): Promise<TrustPageDocument | null> {
  return getCmsClient().getTrustPageBySlug(slug, locale);
}

export async function getTrustPageSlugs(): Promise<readonly string[]> {
  return getCmsClient().getTrustPageSlugs();
}

export async function listAuthors(
  locale?: CmsLocale,
): Promise<readonly EditorialPerson[]> {
  return getCmsClient().getAuthors(locale);
}

export async function getAuthorBySlug(
  slug: CmsSlug,
  locale?: CmsLocale,
): Promise<EditorialPerson | null> {
  return getCmsClient().getAuthorBySlug(slug, locale);
}

export async function getAuthorSlugs(): Promise<readonly string[]> {
  return getCmsClient().getAuthorSlugs();
}

export async function listTrustPagesByAuthor(
  slug: CmsSlug,
  locale?: CmsLocale,
): Promise<readonly TrustPageDocument[]> {
  return getCmsClient().getTrustPagesByAuthor(slug, locale);
}

/**
 * Resolves the author and reviewer records referenced by a trust page.
 */
export async function getTrustPagePeople(
  page: TrustPageDocument,
  locale?: CmsLocale,
): Promise<{
  readonly author: EditorialPerson | null;
  readonly reviewer: EditorialPerson | null;
}> {
  const [author, reviewer] = await Promise.all([
    getAuthorBySlug(page.authorSlug, locale),
    page.reviewerSlug
      ? getAuthorBySlug(page.reviewerSlug, locale)
      : Promise.resolve(null),
  ]);

  return { author, reviewer };
}
