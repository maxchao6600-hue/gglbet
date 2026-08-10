import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { APP_LOCALES, isAppLocale } from "@/config/i18n";
import { NewsDetailPage } from "@/features/news/components/NewsDetailPage";
import { localizePath } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";
import { listGamesBySlugs } from "@/services/cms/games";
import {
  getNewsByCategoryAndSlug,
  getNewsCategoryBySlug,
  getNewsStaticParams,
  listNews,
  listRelatedNews,
} from "@/services/cms/news";
import { listPromotionsBySlugs } from "@/services/cms/promotions";
import { getRelatedProviders } from "@/services/cms/providers";

export const dynamic = 'force-static';
export const revalidate = false;
export const dynamicParams = false;

type NewsPageProps = {
  readonly params: Promise<{ locale: string; category: string; slug: string }>;
};

export async function generateStaticParams() {
  const params = await getNewsStaticParams();
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
}: NewsPageProps): Promise<Metadata> {
  const { locale: localeParam, category, slug } = await params;
  if (!isAppLocale(localeParam)) notFound();
  const locale = localeParam;

  const [article, zhArticle] = await Promise.all([
    getNewsByCategoryAndSlug(category, slug, locale),
    getNewsByCategoryAndSlug(category, slug, "zh"),
  ]);

  if (!article) {
    notFound();
  }

  const image =
    article.coverImage.url.length > 0
      ? [
          {
            url: article.coverImage.url,
            width: article.coverImage.width,
            height: article.coverImage.height,
            alt: article.coverImage.alt,
          },
        ]
      : undefined;

  return createPageMetadata({
    title: article.metaTitle,
    description: article.metaDescription,
    path: localizePath(article.canonicalPath, locale),
    locale,
    absoluteTitle: true,
    keywords: article.keywords,
    seoContent: article,
    zhContent: zhArticle,
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: "article",
      images: image,
    },
    twitter: {
      card: "summary_large_image",
      title: article.metaTitle,
      description: article.metaDescription,
    },
    publishedTime: article.publishDate,
    modifiedTime: article.updatedDate,
  });
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { locale: localeParam, category, slug } = await params;
  if (!isAppLocale(localeParam)) notFound();
  const locale = localeParam;

  const article = await getNewsByCategoryAndSlug(category, slug, locale);

  if (!article) {
    notFound();
  }

  const [
    categoryDoc,
    relatedNews,
    sameCategory,
    relatedGames,
    relatedProviders,
    relatedPromotions,
  ] = await Promise.all([
    getNewsCategoryBySlug(article.category, locale),
    listRelatedNews(article, 6, locale),
    listNews({
      category: article.category,
      pageSize: 7,
      sort: "newest",
      locale,
    }),
    listGamesBySlugs(article.relatedGameSlugs, locale),
    getRelatedProviders(article.relatedProviderSlugs, locale),
    listPromotionsBySlugs(article.relatedPromotionSlugs, locale),
  ]);

  const sameCategoryNews = sameCategory.items
    .filter((item) => item.slug !== article.slug)
    .slice(0, 6);

  return (
    <NewsDetailPage
      article={article}
      category={categoryDoc}
      relatedNews={relatedNews}
      sameCategoryNews={sameCategoryNews}
      relatedGames={relatedGames}
      relatedProviders={relatedProviders}
      relatedPromotions={relatedPromotions}
    />
  );
}
