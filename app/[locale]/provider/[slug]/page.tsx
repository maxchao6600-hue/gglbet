import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { APP_LOCALES, isAppLocale } from "@/config/i18n";
import { ProviderDetailPage } from "@/features/providers/components/ProviderDetailPage";
import { localizePath } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";
import { listGamesByProvider, listGamesBySlugs } from "@/services/cms/games";
import { listGuidesBySlugs } from "@/services/cms/guides";
import {
  getProviderBySlug,
  getProviderSlugs,
  getRelatedProviders,
} from "@/services/cms/providers";

export const revalidate = 3600;
export const dynamicParams = false;

type ProviderPageProps = {
  readonly params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getProviderSlugs();
  return APP_LOCALES.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: ProviderPageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  if (!isAppLocale(localeParam)) notFound();
  const locale = localeParam;

  const [provider, zhProvider] = await Promise.all([
    getProviderBySlug(slug, locale),
    getProviderBySlug(slug, "zh"),
  ]);

  if (!provider) {
    notFound();
  }

  const image =
    provider.heroImage.url.length > 0
      ? [
          {
            url: provider.heroImage.url,
            width: provider.heroImage.width,
            height: provider.heroImage.height,
            alt: provider.heroImage.alt,
          },
        ]
      : undefined;

  return createPageMetadata({
    title: provider.metaTitle,
    description: provider.metaDescription,
    path: localizePath(provider.canonicalPath, locale),
    locale,
    absoluteTitle: true,
    seoContent: provider,
    zhContent: zhProvider,
    openGraph: {
      title: provider.metaTitle,
      description: provider.metaDescription,
      type: "website",
      images: image,
    },
    twitter: {
      card: "summary_large_image",
      title: provider.metaTitle,
      description: provider.metaDescription,
    },
    modifiedTime: provider.lastUpdated,
  });
}

export default async function ProviderPage({ params }: ProviderPageProps) {
  const { locale: localeParam, slug } = await params;
  if (!isAppLocale(localeParam)) notFound();
  const locale = localeParam;

  const provider = await getProviderBySlug(slug, locale);

  if (!provider) {
    notFound();
  }

  const [popularGames, relatedProviders, providerGames, relatedGuides] =
    await Promise.all([
      listGamesBySlugs(provider.popularGameSlugs, locale),
      getRelatedProviders(provider.relatedProviderSlugs, locale),
      listGamesByProvider(provider.slug, locale),
      listGuidesBySlugs(provider.relatedGuideSlugs, locale),
    ]);

  const relatedGames = providerGames.filter(
    (game) => !provider.popularGameSlugs.includes(game.slug),
  );

  return (
    <ProviderDetailPage
      provider={provider}
      popularGames={popularGames}
      relatedProviders={relatedProviders}
      relatedGames={relatedGames}
      relatedGuides={relatedGuides}
    />
  );
}
