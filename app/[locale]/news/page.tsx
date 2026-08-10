import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isAppLocale } from "@/config/i18n";
import { NewsListingPage } from "@/features/news/components/NewsListingPage";
import { localizePath } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";
import {
  getNewsPageContent,
  listNewsCategories,
  listNewsListItems,
} from "@/services/cms/news";

export const dynamic = 'force-static';
export const revalidate = false;

type NewsListingPageProps = {
  readonly params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: NewsListingPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isAppLocale(localeParam)) notFound();
  const locale = localeParam;

  const [page, zhPage] = await Promise.all([
    getNewsPageContent(locale),
    getNewsPageContent("zh"),
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

export default async function NewsPage({ params }: NewsListingPageProps) {
  const { locale: localeParam } = await params;
  if (!isAppLocale(localeParam)) notFound();
  const locale = localeParam;

  const page = await getNewsPageContent(locale);

  const [all, featured, breaking, categories] = await Promise.all([
    listNewsListItems({ pageSize: 500, sort: "newest", locale }),
    listNewsListItems({ pageSize: 6, featured: true, sort: "popular", locale }),
    listNewsListItems({ pageSize: 6, breaking: true, sort: "newest", locale }),
    listNewsCategories(locale),
  ]);

  return (
    <NewsListingPage
      page={page}
      articles={all.items}
      featured={featured.items}
      breaking={breaking.items}
      categories={categories.map((category) => ({
        id: category.id,
        slug: category.slug,
        name: category.name,
        intro: category.intro,
      }))}
    />
  );
}
