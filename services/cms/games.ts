import { getCmsClient } from "@/lib/cms";
import type {
  CmsListParams,
  CmsLocale,
  CmsPaginatedResult,
  CmsSlug,
} from "@/types/cms";
import type { Game, GamesPageContent } from "@/types/game";

export async function listGames(
  params?: CmsListParams & {
    readonly providerSlug?: string;
    readonly category?: string;
    readonly theme?: string;
    readonly slugs?: readonly string[];
  },
): Promise<CmsPaginatedResult<Game>> {
  return getCmsClient().getGames(params);
}

export async function getGameBySlug(
  slug: CmsSlug,
  locale?: CmsLocale,
): Promise<Game | null> {
  return getCmsClient().getGameBySlug(slug, locale);
}

export async function getGameByProviderAndSlug(
  providerSlug: string,
  slug: CmsSlug,
  locale?: CmsLocale,
): Promise<Game | null> {
  return getCmsClient().getGameByProviderAndSlug(providerSlug, slug, locale);
}

export async function getGameStaticParams(): Promise<
  readonly { readonly provider: string; readonly slug: string }[]
> {
  return getCmsClient().getGameStaticParams();
}

export async function getAllGameStaticParams(): Promise<
  readonly { readonly provider: string; readonly slug: string }[]
> {
  return getCmsClient().getAllGameStaticParams();
}

export async function getGamesPageContent(
  locale?: CmsLocale,
): Promise<GamesPageContent> {
  return getCmsClient().getGamesPage(locale);
}

export async function getGamesPageListing(): Promise<{
  readonly listing: readonly import("@/lib/cms/seed/content/games/load-games-indexes").GamesDirectoryItem[];
  readonly featured: readonly import("@/lib/cms/seed/content/games/load-games-indexes").GamesDirectoryItem[];
}> {
  const { getGamesPageListing: load } = await import(
    "@/lib/cms/repositories/games"
  );
  return load();
}

export async function getGameThemes(locale?: CmsLocale): Promise<readonly string[]> {
  return getCmsClient().getGameThemes(locale);
}

export async function listGamesByProvider(
  providerSlug: string,
  locale?: CmsLocale,
): Promise<readonly Game[]> {
  const result = await listGames({
    providerSlug,
    pageSize: 10000,
    sort: "name-asc",
    locale,
  });
  // Strip long-form SEO bodies for directory/provider cards (keep catalog fields).
  return result.items.map((game) => ({
    ...game,
    content: [],
    tableOfContents: [],
  }));
}

export async function listGamesBySlugs(
  slugs: readonly string[],
  locale?: CmsLocale,
): Promise<readonly Game[]> {
  if (slugs.length === 0) {
    return [];
  }
  const result = await listGames({ slugs, pageSize: slugs.length, locale });
  return result.items;
}

export async function listRelatedGames(
  game: Game,
  limit = 6,
  locale?: CmsLocale,
): Promise<readonly Game[]> {
  const bySlug = await listGamesBySlugs(game.relatedGameSlugs, locale);
  const trimmed = (items: readonly Game[]) =>
    items.map((item) => ({
      ...item,
      content: [],
      tableOfContents: [],
    }));
  if (bySlug.length >= limit) {
    return trimmed(bySlug.slice(0, limit));
  }

  const sameProvider = await listGames({
    providerSlug: game.providerSlug,
    pageSize: limit + 1,
    sort: "popular",
    locale,
  });
  const merged = [...bySlug];
  const seen = new Set(merged.map((item) => item.slug));
  seen.add(game.slug);

  for (const item of sameProvider.items) {
    if (seen.has(item.slug)) continue;
    merged.push(item);
    seen.add(item.slug);
    if (merged.length >= limit) break;
  }

  if (merged.length < limit) {
    const sameCategory = await listGames({
      category: game.category,
      pageSize: limit * 2,
      sort: "popular",
      locale,
    });
    for (const item of sameCategory.items) {
      if (seen.has(item.slug)) continue;
      merged.push(item);
      seen.add(item.slug);
      if (merged.length >= limit) break;
    }
  }

  return trimmed(merged.slice(0, limit));
}
