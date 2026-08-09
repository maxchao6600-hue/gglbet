"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { GameCard } from "@/components/cards/GameCard";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/features/home/components/SectionIntro";
import {
  GAMES_PAGE_SIZE,
  filterGameDirectory,
  paginateGames,
} from "@/features/games/lib/filter-games";
import type { GamesUiCopy } from "@/features/games/games-ui-copy";
import { formatGamesTemplate } from "@/features/games/games-ui-copy";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/utils/cn";
import type { Game } from "@/types/game";

type GamesDirectoryResultsProps = {
  readonly games: readonly Game[];
  readonly copy: GamesUiCopy;
  readonly providerLogos: Readonly<Record<string, string>>;
};

export function GamesDirectoryResults({
  games,
  copy,
  providerLogos,
}: GamesDirectoryResultsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filtered = useMemo(() => {
    const featuredLegacy = searchParams.get("featured") === "1";
    const collection =
      searchParams.get("collection") ??
      (featuredLegacy ? "featured" : undefined);
    return filterGameDirectory(games, {
      search: searchParams.get("q") ?? undefined,
      letter: searchParams.get("letter") ?? undefined,
      category: searchParams.get("category") ?? undefined,
      theme: searchParams.get("theme") ?? undefined,
      provider: searchParams.get("provider") ?? undefined,
      collection: collection ?? undefined,
      featured: featuredLegacy,
      sort: searchParams.get("sort") ?? "name-asc",
    });
  }, [games, searchParams]);

  const pageParam = Number(searchParams.get("page") ?? "1");
  const paged = paginateGames(
    filtered,
    Number.isFinite(pageParam) ? pageParam : 1,
    GAMES_PAGE_SIZE,
  );

  function goToPage(nextPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    if (nextPage <= 1) params.delete("page");
    else params.set("page", String(nextPage));
    const next = params.toString();
    router.replace(next ? `${ROUTES.games}?${next}` : ROUTES.games, {
      scroll: false,
    });
  }

  return (
    <Section
      id="all-games"
      padding="lg"
      containerSize="wide"
      aria-labelledby="all-games-heading"
    >
      <SectionIntro
        headingId="all-games-heading"
        heading={copy.allGamesHeading}
        subheading={formatGamesTemplate(copy.matchingTitlesTemplate, {
          total: paged.total,
          page: paged.page,
          totalPages: paged.totalPages,
        })}
        body={copy.allGamesBody}
      />

      {paged.items.length > 0 ? (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {paged.items.map((game) => (
            <li key={game.id} className="flex">
              <GameCard
                game={game}
                className="w-full"
                providerLogoSrc={providerLogos[game.providerSlug]}
                playLabel={copy.playNow}
                detailsLabel={copy.viewDetails}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="home-v2-glass mt-8 rounded-card p-card text-ink-muted">
          {copy.emptyResults}
        </p>
      )}

      {paged.totalPages > 1 ? (
        <nav
          className="mt-8 flex flex-wrap items-center justify-between gap-3"
          aria-label="Games pagination"
        >
          <button
            type="button"
            className={cn(
              "rounded-control border border-border px-4 py-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
              paged.page <= 1 && "pointer-events-none opacity-40",
            )}
            disabled={paged.page <= 1}
            onClick={() => goToPage(paged.page - 1)}
          >
            {copy.previous}
          </button>
          <p className="text-sm text-ink-muted">
            {formatGamesTemplate(copy.pageLabelTemplate, {
              page: paged.page,
              totalPages: paged.totalPages,
            })}
          </p>
          <button
            type="button"
            className={cn(
              "rounded-control border border-border px-4 py-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
              paged.page >= paged.totalPages && "pointer-events-none opacity-40",
            )}
            disabled={paged.page >= paged.totalPages}
            onClick={() => goToPage(paged.page + 1)}
          >
            {copy.next}
          </button>
        </nav>
      ) : null}
    </Section>
  );
}
