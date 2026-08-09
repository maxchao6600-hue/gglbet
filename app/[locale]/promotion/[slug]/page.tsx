import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { APP_LOCALES, isAppLocale } from "@/config/i18n";
import { PromotionDetailPage } from "@/features/promotions/components/PromotionDetailPage";
import { localizePath } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";
import { listGamesBySlugs } from "@/services/cms/games";
import { listNewsBySlugs } from "@/services/cms/news";
import {
  getPromotionBySlug,
  getPromotionStaticParams,
  listRelatedPromotions,
} from "@/services/cms/promotions";
import { getRelatedProviders } from "@/services/cms/providers";

export const revalidate = 3600;
export const dynamicParams = false;

type PromotionPageProps = {
  readonly params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const params = await getPromotionStaticParams();
  return APP_LOCALES.flatMap((locale) =>
    params.map((item) => ({ locale, slug: item.slug })),
  );
}

export async function generateMetadata({
  params,
}: PromotionPageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  if (!isAppLocale(localeParam)) notFound();
  const locale = localeParam;

  const [promotion, zhPromotion] = await Promise.all([
    getPromotionBySlug(slug, locale),
    getPromotionBySlug(slug, "zh"),
  ]);

  if (!promotion) {
    notFound();
  }

  const image =
    promotion.bannerImage.url.length > 0
      ? [
          {
            url: promotion.bannerImage.url,
            width: promotion.bannerImage.width,
            height: promotion.bannerImage.height,
            alt: promotion.bannerImage.alt,
          },
        ]
      : undefined;

  return createPageMetadata({
    title: promotion.metaTitle,
    description: promotion.metaDescription,
    path: localizePath(promotion.canonicalPath, locale),
    locale,
    absoluteTitle: true,
    seoContent: promotion,
    zhContent: zhPromotion,
    openGraph: {
      title: promotion.metaTitle,
      description: promotion.metaDescription,
      type: "website",
      images: image,
    },
    twitter: {
      card: "summary_large_image",
      title: promotion.metaTitle,
      description: promotion.metaDescription,
    },
    publishedTime: promotion.createdAt,
    modifiedTime: promotion.updatedAt,
  });
}

export default async function PromotionPage({ params }: PromotionPageProps) {
  const { locale: localeParam, slug } = await params;
  if (!isAppLocale(localeParam)) notFound();
  const locale = localeParam;

  const promotion = await getPromotionBySlug(slug, locale);

  if (!promotion) {
    notFound();
  }

  const [relatedPromotions, relatedGames, relatedProviders, relatedNews] =
    await Promise.all([
      listRelatedPromotions(promotion, 6, locale),
      listGamesBySlugs(promotion.relatedGameSlugs, locale),
      getRelatedProviders(promotion.relatedProviderSlugs, locale),
      listNewsBySlugs(promotion.relatedNewsSlugs, locale),
    ]);

  return (
    <PromotionDetailPage
      promotion={promotion}
      relatedPromotions={relatedPromotions}
      relatedGames={relatedGames}
      relatedProviders={relatedProviders}
      relatedNews={relatedNews}
    />
  );
}
