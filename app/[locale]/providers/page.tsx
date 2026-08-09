import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isAppLocale } from "@/config/i18n";
import { ProvidersListingPage } from "@/features/providers/components/ProvidersListingPage";
import { localizePath } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";
import {
  getProvidersPageContent,
  listProviders,
} from "@/services/cms/providers";

export const revalidate = 3600;

type ProvidersPageProps = {
  readonly params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: ProvidersPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isAppLocale(localeParam)) notFound();
  const locale = localeParam;

  const [page, zhPage] = await Promise.all([
    getProvidersPageContent(locale),
    getProvidersPageContent("zh"),
  ]);

  return createPageMetadata({
    title: page.seo.title,
    description: page.seo.description,
    path: localizePath(page.seo.path, locale),
    locale,
    absoluteTitle: true,
    seoContent: page,
    zhContent: zhPage,
    openGraph: {
      title: page.seo.title,
      description: page.seo.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.seo.title,
      description: page.seo.description,
    },
  });
}

export default async function ProvidersPage({ params }: ProvidersPageProps) {
  const { locale: localeParam } = await params;
  if (!isAppLocale(localeParam)) notFound();
  const locale = localeParam;

  const page = await getProvidersPageContent(locale);

  const [all, featured] = await Promise.all([
    listProviders({
      pageSize: 500,
      sort: "name-asc",
      status: "published",
      locale,
    }),
    listProviders({
      pageSize: 8,
      featured: true,
      sort: "rating",
      status: "published",
      locale,
    }),
  ]);

  return (
    <ProvidersListingPage
      page={page}
      providers={all.items}
      featured={featured.items}
    />
  );
}
