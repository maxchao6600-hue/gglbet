import {
  parseLocale,
  resolveSeedDoc,
  resolveSeedDocs,
  toBilingualDoc,
  toBilingualSeed,
} from "@/lib/cms/locale";
import { editorialAuthorsSeed, eeatSeed, trustPagesSeed } from "@/lib/cms/seed/eeat";
import type { CmsSlug } from "@/types/cms";
import type {
  EditorialPerson,
  EeatContent,
  TrustPageDocument,
} from "@/types/eeat";

/** Bilingual CMS store — English preserved, Chinese placeholders. */
const eeatBilingual = toBilingualDoc(
  eeatSeed as unknown as Record<string, unknown>,
);
const trustPagesBilingual = toBilingualSeed(
  trustPagesSeed as unknown as Record<string, unknown>[],
);
const authorsBilingual = toBilingualSeed(
  editorialAuthorsSeed as unknown as Record<string, unknown>[],
);

function trustPagesFor(locale?: string | null): TrustPageDocument[] {
  return resolveSeedDocs(
    trustPagesBilingual,
    locale,
  ) as unknown as TrustPageDocument[];
}

function authorsFor(locale?: string | null): EditorialPerson[] {
  return resolveSeedDocs(
    authorsBilingual,
    locale,
  ) as unknown as EditorialPerson[];
}

export function getEeatContentSeed(locale?: string | null): EeatContent {
  return resolveSeedDoc(eeatBilingual, locale) as unknown as EeatContent;
}

export function listTrustPages(
  locale?: string | null,
): readonly TrustPageDocument[] {
  return trustPagesFor(locale);
}

export function findTrustPageBySlug(
  slug: CmsSlug,
  locale?: string | null,
): TrustPageDocument | null {
  return trustPagesFor(locale).find((page) => page.slug === slug) ?? null;
}

export function listTrustPageSlugs(): readonly string[] {
  return trustPagesFor(parseLocale("en")).map((page) => page.slug);
}

export function listAuthors(
  locale?: string | null,
): readonly EditorialPerson[] {
  return authorsFor(locale);
}

export function findAuthorBySlug(
  slug: CmsSlug,
  locale?: string | null,
): EditorialPerson | null {
  return authorsFor(locale).find((author) => author.slug === slug) ?? null;
}

export function listAuthorSlugs(): readonly string[] {
  return authorsFor(parseLocale("en")).map((author) => author.slug);
}

export function listTrustPagesByAuthor(
  slug: CmsSlug,
  locale?: string | null,
): readonly TrustPageDocument[] {
  return trustPagesFor(locale).filter(
    (page) => page.authorSlug === slug || page.reviewerSlug === slug,
  );
}
