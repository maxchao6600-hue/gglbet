import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isAppLocale } from "@/config/i18n";
import { DEFAULT_PROVIDER_LOGO_PATH } from "@/constants/provider-media";
import { GamesListingPage } from "@/features/games/components/GamesListingPage";
import { getGamesUiCopy } from "@/features/games/games-ui-copy";
import { localizePath } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";
import {
  getGameThemes,
  getGamesPageContent,
  listGames,
} from "@/services/cms/games";
import { listProviders } from "@/services/cms/providers";

export const revalidate = 3600;

type GamesPageProps = {
  readonly params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: GamesPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isAppLocale(localeParam)) notFound();
  const locale = localeParam;

  const [page, zhPage] = await Promise.all([
    getGamesPageContent(locale),
    getGamesPageContent("zh"),
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

export default async function GamesPage({ params }: GamesPageProps) {
  const { locale: localeParam } = await params;
  if (!isAppLocale(localeParam)) notFound();
  const locale = localeParam;
  const copy = getGamesUiCopy(locale);

  const page = await getGamesPageContent(locale);

  const [all, featured, providers, themes] = await Promise.all([
    listGames({ pageSize: 500, sort: "name-asc", locale }),
    listGames({ pageSize: 8, featured: true, sort: "rating", locale }),
    listProviders({ pageSize: 200, sort: "name-asc", locale }),
    getGameThemes(locale),
  ]);

  const providerLogos: Record<string, string> = {};
  for (const provider of providers.items) {
    providerLogos[provider.slug] =
      provider.logo.url && provider.logo.url.length > 0
        ? provider.logo.url
        : DEFAULT_PROVIDER_LOGO_PATH;
  }

  return (
    <GamesListingPage
      page={page}
      games={all.items}
      featured={featured.items}
      providers={providers.items.map((provider) => ({
        id: provider.id,
        slug: provider.slug,
        name: provider.name,
      }))}
      themes={themes}
      copy={copy}
      providerLogos={providerLogos}
    />
  );
}
