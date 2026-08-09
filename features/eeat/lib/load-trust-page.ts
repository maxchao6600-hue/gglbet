import type { Metadata } from "next";
import { notFound } from "next/navigation";

import type { AppLocale } from "@/config/i18n";
import { createPageMetadata } from "@/lib/seo";
import { localizePath } from "@/lib/i18n";
import {
  getAuthorBySlug,
  getTrustPageBySlug,
  getTrustPagePeople,
  listAuthors,
  listTrustPagesByAuthor,
} from "@/services/cms/eeat";
import type { AuthorProfilePageProps } from "@/features/eeat/components/AuthorProfilePage";
import type { TrustPageViewProps } from "@/features/eeat/components/TrustPageView";

export async function loadTrustPage(
  slug: string,
  locale?: AppLocale,
): Promise<TrustPageViewProps> {
  const resolvedLocale = locale ?? "en";
  const page = await getTrustPageBySlug(slug, resolvedLocale);

  if (!page) {
    notFound();
  }

  const { author, reviewer } = await getTrustPagePeople(page, resolvedLocale);

  return { page, author, reviewer, locale: resolvedLocale };
}

export async function createTrustPageMetadata(
  slug: string,
  locale?: AppLocale,
): Promise<Metadata> {
  const resolvedLocale = locale ?? "en";
  const [page, zhPage] = await Promise.all([
    getTrustPageBySlug(slug, resolvedLocale),
    getTrustPageBySlug(slug, "zh"),
  ]);

  if (!page) {
    notFound();
  }

  return createPageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: localizePath(page.canonicalPath, resolvedLocale),
    locale: resolvedLocale,
    absoluteTitle: true,
    seoContent: page,
    zhContent: zhPage,
    modifiedTime: page.lastUpdated,
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.metaDescription,
    },
  });
}

export async function loadAuthorProfile(
  slug: string,
  locale?: AppLocale,
): Promise<AuthorProfilePageProps> {
  const author = await getAuthorBySlug(slug, locale);

  if (!author) {
    notFound();
  }

  const [pages, everyone] = await Promise.all([
    listTrustPagesByAuthor(author.slug, locale),
    listAuthors(locale),
  ]);

  return {
    author,
    pages,
    colleagues: everyone.filter((person) => person.slug !== author.slug),
  };
}

export async function createAuthorMetadata(
  slug: string,
  locale?: AppLocale,
): Promise<Metadata> {
  const resolvedLocale = locale ?? "en";
  const [author, zhAuthor] = await Promise.all([
    getAuthorBySlug(slug, resolvedLocale),
    getAuthorBySlug(slug, "zh"),
  ]);

  if (!author) {
    notFound();
  }

  return createPageMetadata({
    title: author.metaTitle,
    description: author.metaDescription,
    path: localizePath(author.canonicalPath, resolvedLocale),
    locale: resolvedLocale,
    absoluteTitle: true,
    seoContent: author,
    zhContent: zhAuthor,
    openGraph: {
      title: author.metaTitle,
      description: author.metaDescription,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: author.name,
      description: author.metaDescription,
    },
  });
}
