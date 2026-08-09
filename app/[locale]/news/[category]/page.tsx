import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { APP_LOCALES, isAppLocale } from "@/config/i18n";
import { NewsCategoryPageView } from "@/features/news/components/NewsCategoryPage";
import { localizePath } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";
import {
  getNewsCategoryBySlug,
  getNewsCategorySlugs,
  listNews,
} from "@/services/cms/news";

export const revalidate = 3600;
export const dynamicParams = false;

type NewsCategoryPageProps = {
  readonly params: Promise<{ locale: string; category: string }>;
};

export async function generateStaticParams() {
  const slugs = await getNewsCategorySlugs();
  return APP_LOCALES.flatMap((locale) =>
    slugs.map((category) => ({ locale, category })),
  );
}

export async function generateMetadata({
  params,
}: NewsCategoryPageProps): Promise<Metadata> {
  const { locale: localeParam, category: categorySlug } = await params;
  if (!isAppLocale(localeParam)) notFound();
  const locale = localeParam;

  const [category, zhCategory] = await Promise.all([
    getNewsCategoryBySlug(categorySlug, locale),
    getNewsCategoryBySlug(categorySlug, "zh"),
  ]);

  if (!category) {
    notFound();
  }

  return createPageMetadata({
    title: category.metaTitle,
    description: category.metaDescription,
    path: localizePath(category.canonicalPath, locale),
    locale,
    absoluteTitle: true,
    seoContent: category,
    zhContent: zhCategory,
    openGraph: {
      title: category.metaTitle,
      description: category.metaDescription,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: category.metaTitle,
      description: category.metaDescription,
    },
  });
}

export default async function NewsCategoryPage({
  params,
}: NewsCategoryPageProps) {
  const { locale: localeParam, category: categorySlug } = await params;
  if (!isAppLocale(localeParam)) notFound();
  const locale = localeParam;

  const category = await getNewsCategoryBySlug(categorySlug, locale);

  if (!category) {
    notFound();
  }

  const articles = await listNews({
    category: category.slug,
    pageSize: 100,
    sort: "title-asc",
    locale,
  });

  return (
    <NewsCategoryPageView category={category} articles={articles.items} />
  );
}
