import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { CmsImageView } from "@/components/media/CmsImageView";
import { ProviderLogo } from "@/components/media/ProviderLogo";
import { DEFAULT_PROVIDER_LOGO_PATH } from "@/constants/provider-media";
import { getGameHref } from "@/constants/routes";
import { GAMES_MEDIA } from "@/features/games/games-media";
import type { GamesDirectoryItem } from "@/lib/cms/seed/content/games/load-games-indexes";
import type { Game, GameListItem } from "@/types/game";
import { cn } from "@/utils/cn";

type GameCardProps = {
  readonly game: Game | GameListItem | GamesDirectoryItem;
  readonly href?: string;
  readonly className?: string;
  readonly providerLogoSrc?: string;
  readonly playLabel?: string;
  readonly detailsLabel?: string;
  /** Compact listing card vs directory premium card with CTAs. */
  readonly variant?: "default" | "directory";
};

function resolveThumbnail(game: Game | GameListItem | GamesDirectoryItem) {
  if ("thumbUrl" in game) {
    return {
      id: `thumb-${game.id}`,
      url: game.thumbUrl,
      alt: `${game.gameName} thumbnail`,
      width: 320,
      height: 320,
    };
  }
  return game.thumbnail;
}

function resolveShortDescription(
  game: Game | GameListItem | GamesDirectoryItem,
): string {
  if ("shortDescription" in game && game.shortDescription) {
    return game.shortDescription;
  }
  return `${game.gameName} — ${game.providerName} on GGLBET.`;
}

export function GameCard({
  game,
  href,
  className,
  providerLogoSrc,
  playLabel = "Play Now",
  detailsLabel = "View Details",
  variant = "directory",
}: GameCardProps) {
  const detailsHref =
    href ?? game.canonicalPath ?? getGameHref(game.providerSlug, game.slug);
  const playHref =
    "ctaPrimaryHref" in game && game.ctaPrimaryHref
      ? game.ctaPrimaryHref
      : detailsHref;
  const logoSrc = providerLogoSrc || DEFAULT_PROVIDER_LOGO_PATH;
  const thumbnail = resolveThumbnail(game);
  const shortDescription = resolveShortDescription(game);

  const badges: string[] = [];
  if (game.featured) badges.push("Featured");
  if (game.popular) badges.push("Popular");
  if (game.newGame) badges.push("New");

  return (
    <Card
      as="article"
      interactive
      glass
      padding="none"
      className={cn(
        "home-v2-game-card home-v2-hover-card h-full overflow-hidden",
        className,
      )}
    >
      <div className="relative">
        <CmsImageView
          image={thumbnail}
          aspect="wide"
          rounded="none"
          className="border-0 border-b border-border bg-surface-elevated"
          sizes="(max-width: 768px) 50vw, 280px"
          fallbackSrc={GAMES_MEDIA.fallbackThumb}
        />
        {badges.length > 0 ? (
          <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-wrap gap-1.5 p-2.5 sm:p-3">
            {badges.map((badge) => (
              <span
                key={badge}
                className={cn(
                  "rounded-control px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide sm:text-[11px]",
                  badge === "New" && "bg-accent text-accent-foreground",
                  badge === "Featured" && "bg-brand text-brand-foreground",
                  badge === "Popular" &&
                    "bg-secondary text-secondary-foreground",
                )}
              >
                {badge}
              </span>
            ))}
          </div>
        ) : null}
        <div className="home-v2-game-card__glow" aria-hidden />
      </div>

      <div className="flex h-full flex-col p-card">
        <div className="flex items-center gap-2.5">
          <ProviderLogo
            src={logoSrc}
            alt=""
            size="sm"
            className="w-12 shrink-0 sm:w-14"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[0.65rem] font-semibold uppercase tracking-wide text-brand sm:text-xs">
              {game.category.replaceAll("-", " ")}
            </p>
            <p className="truncate text-[0.65rem] text-ink-subtle sm:text-xs">
              {game.providerName}
            </p>
          </div>
          <p className="shrink-0 text-xs font-semibold text-brand">
            {game.rating.toFixed(1)}
          </p>
        </div>

        <CardTitle as="h3" className="mt-3 line-clamp-2">
          <Link href={detailsHref} className="hover:text-brand">
            {game.gameName}
          </Link>
        </CardTitle>
        <CardDescription className="mt-2 line-clamp-2">
          {shortDescription}
        </CardDescription>

        <div className="mt-3 flex flex-wrap gap-2 text-xs text-ink-subtle">
          {"theme" in game && game.theme ? <span>{game.theme}</span> : null}
          {typeof game.rtp === "number" && game.rtp > 0 ? (
            <span>
              · RTP{" "}
              <span className="font-semibold text-brand">
                {game.rtp.toFixed(2).replace(/\.00$/, "")}%
              </span>
            </span>
          ) : null}
        </div>

        {variant === "directory" ? (
          <div className="mt-auto flex flex-wrap gap-2 pt-4">
            <Button href={playHref} size="sm" className="flex-1">
              {playLabel}
            </Button>
            <Button
              href={detailsHref}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              {detailsLabel}
            </Button>
          </div>
        ) : (
          <Link
            href={detailsHref}
            className="mt-4 text-xs font-semibold text-brand hover:underline"
          >
            {detailsLabel}
          </Link>
        )}
      </div>
    </Card>
  );
}
