import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { APP_LOCALES, isAppLocale } from "@/config/i18n";
import { GuideDetailPage } from "@/features/guides/components/GuideDetailPage";
import { localizePath } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";
import { listGamesBySlugs } from "@/services/cms/games";
import {
  getGuideByCategoryAndSlug,
  getGuideCategoryBySlug,
  getGuideStaticParams,
  listGuides,
  listRelatedGuides,
} from "@/services/cms/guides";
import { getRelatedProviders } from "@/services/cms/providers";

export const dynamic = 'force-static';
export const revalidate = false;
export const dynamicParams = false;

type GuidePageProps = {
  readonly params: Promise<{ locale: string; category: string; slug: string }>;
};

export async function generateStaticParams() {
  const params = await getGuideStaticParams();
  return APP_LOCALES.flatMap((locale) =>
    params.map((item) => ({
      locale,
      category: item.category,
      slug: item.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { locale: localeParam, category, slug } = await params;
  if (!isAppLocale(localeParam)) notFound();
  const locale = localeParam;

  const [guide, zhGuide] = await Promise.all([
    getGuideByCategoryAndSlug(category, slug, locale),
    getGuideByCategoryAndSlug(category, slug, "zh"),
  ]);

  if (!guide) {
    notFound();
  }

  const image =
    guide.coverImage.url.length > 0
      ? [
          {
            url: guide.coverImage.url,
            width: guide.coverImage.width,
            height: guide.coverImage.height,
            alt: guide.coverImage.alt,
          },
        ]
      : undefined;

  return createPageMetadata({
    title: guide.metaTitle,
    description: guide.metaDescription,
    path: localizePath(guide.canonicalPath, locale),
    locale,
    absoluteTitle: true,
    keywords: guide.keywords,
    seoContent: guide,
    zhContent: zhGuide,
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      type: "article",
      images: image,
    },
    twitter: {
      card: "summary_large_image",
      title: guide.metaTitle,
      description: guide.metaDescription,
    },
    publishedTime: guide.publishDate,
    modifiedTime: guide.updatedDate,
  });
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { locale: localeParam, category, slug } = await params;
  if (!isAppLocale(localeParam)) notFound();
  const locale = localeParam;

  const guide = await getGuideByCategoryAndSlug(category, slug, locale);

  if (!guide) {
    notFound();
  }

  const [
    categoryDoc,
    relatedGuides,
    sameCategory,
    relatedGames,
    relatedProviders,
  ] = await Promise.all([
    getGuideCategoryBySlug(guide.category, locale),
    listRelatedGuides(guide, 6, locale),
    listGuides({
      category: guide.category,
      pageSize: 7,
      sort: "popular",
      locale,
    }),
    listGamesBySlugs(guide.relatedGameSlugs, locale),
    getRelatedProviders(guide.relatedProviderSlugs, locale),
  ]);

  const sameCategoryGuides = sameCategory.items
    .filter((item) => item.slug !== guide.slug)
    .slice(0, 6);

  return (
    <GuideDetailPage
      guide={guide}
      category={categoryDoc}
      relatedGuides={relatedGuides}
      sameCategoryGuides={sameCategoryGuides}
      relatedGames={relatedGames}
      relatedProviders={relatedProviders}
    />
  );
}
