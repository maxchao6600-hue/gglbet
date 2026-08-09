import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { APP_LOCALES, isAppLocale } from "@/config/i18n";
import { GuideCategoryPageView } from "@/features/guides/components/GuideCategoryPage";
import { localizePath } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";
import {
  getGuideCategoryBySlug,
  getGuideCategorySlugs,
  listGuides,
} from "@/services/cms/guides";

export const revalidate = 3600;
export const dynamicParams = false;

type GuideCategoryPageProps = {
  readonly params: Promise<{ locale: string; category: string }>;
};

export async function generateStaticParams() {
  const slugs = await getGuideCategorySlugs();
  return APP_LOCALES.flatMap((locale) =>
    slugs.map((category) => ({ locale, category })),
  );
}

export async function generateMetadata({
  params,
}: GuideCategoryPageProps): Promise<Metadata> {
  const { locale: localeParam, category: categorySlug } = await params;
  if (!isAppLocale(localeParam)) notFound();
  const locale = localeParam;

  const [category, zhCategory] = await Promise.all([
    getGuideCategoryBySlug(categorySlug, locale),
    getGuideCategoryBySlug(categorySlug, "zh"),
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

export default async function GuideCategoryPage({
  params,
}: GuideCategoryPageProps) {
  const { locale: localeParam, category: categorySlug } = await params;
  if (!isAppLocale(localeParam)) notFound();
  const locale = localeParam;

  const category = await getGuideCategoryBySlug(categorySlug, locale);

  if (!category) {
    notFound();
  }

  const guides = await listGuides({
    category: category.slug,
    pageSize: 100,
    sort: "title-asc",
    locale,
  });

  return (
    <GuideCategoryPageView category={category} guides={guides.items} />
  );
}
