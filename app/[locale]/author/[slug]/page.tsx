import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { APP_LOCALES, isAppLocale } from "@/config/i18n";
import {
  AuthorProfilePage,
  createAuthorMetadata,
  loadAuthorProfile,
} from "@/features/eeat";
import { getAuthorSlugs } from "@/services/cms/eeat";

export const dynamic = 'force-static';
export const revalidate = false;
export const dynamicParams = false;

type AuthorPageProps = {
  readonly params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAuthorSlugs();
  return APP_LOCALES.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: AuthorPageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  if (!isAppLocale(localeParam)) notFound();
  return createAuthorMetadata(slug, localeParam);
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { locale: localeParam, slug } = await params;
  if (!isAppLocale(localeParam)) notFound();
  const data = await loadAuthorProfile(slug, localeParam);

  return <AuthorProfilePage {...data} />;
}
