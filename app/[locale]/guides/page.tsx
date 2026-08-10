import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isAppLocale } from "@/config/i18n";
import { GuidesListingPage } from "@/features/guides/components/GuidesListingPage";
import { localizePath } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";
import {
  getGuidesPageContent,
  listGuideCategories,
  listGuideListItems,
} from "@/services/cms/guides";

export const dynamic = 'force-static';
export const revalidate = false;

type GuidesPageProps = {
  readonly params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: GuidesPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isAppLocale(localeParam)) notFound();
  const locale = localeParam;

  const [page, zhPage] = await Promise.all([
    getGuidesPageContent(locale),
    getGuidesPageContent("zh"),
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

export default async function GuidesPage({ params }: GuidesPageProps) {
  const { locale: localeParam } = await params;
  if (!isAppLocale(localeParam)) notFound();
  const locale = localeParam;

  const page = await getGuidesPageContent(locale);

  const [all, featured, categories] = await Promise.all([
    listGuideListItems({ pageSize: 500, sort: "newest", locale }),
    listGuideListItems({ pageSize: 6, featured: true, sort: "popular", locale }),
    listGuideCategories(locale),
  ]);

  return (
    <GuidesListingPage
      page={page}
      guides={all.items}
      featured={featured.items}
      categories={categories.map((category) => ({
        id: category.id,
        slug: category.slug,
        name: category.name,
        intro: category.intro,
      }))}
    />
  );
}
