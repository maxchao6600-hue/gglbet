import type { CmsImage } from "@/types/cms";

export const NEWS_ARTWORK_WIDTH = 1600;
export const NEWS_ARTWORK_HEIGHT = 900;
/** Cache-friendly per-article editorial KV path. */
export const NEWS_ARTWORK_DIR = "/news/kv";

/** All current official news seeds with dedicated AAA editorial key visuals. */
export const NEWS_EDITORIAL_ARTWORK_SLUGS = [
  "singapore-national-day-61-official-announcement",
  "ewc-2026-free-bet-reward-boost-official-announcement",
  "spins-day-bet-day-official-announcement",
  "drops-and-wins-114m-official-announcement",
  "gglbet-telegram-exclusive-rewards-official-announcement",
  "powerbank-advance-official-announcement",
  "gglbet-vip-club-official-announcement",
  "slots-welcome-bonus-300-official-announcement",
] as const;

export type NewsEditorialArtworkSlug =
  (typeof NEWS_EDITORIAL_ARTWORK_SLUGS)[number];

export function hasNewsEditorialArtwork(slug: string): boolean {
  return (NEWS_EDITORIAL_ARTWORK_SLUGS as readonly string[]).includes(slug);
}

export function newsArtworkPublicPath(slug: string): string {
  return `${NEWS_ARTWORK_DIR}/${slug}.webp`;
}

export function resolveNewsCoverImage(input: {
  readonly slug: string;
  readonly title: string;
}): CmsImage | null {
  if (!hasNewsEditorialArtwork(input.slug)) return null;

  return {
    id: `news-art-${input.slug}`,
    url: newsArtworkPublicPath(input.slug),
    alt: `GGLBET news: ${input.title} — editorial key visual`,
    width: NEWS_ARTWORK_WIDTH,
    height: NEWS_ARTWORK_HEIGHT,
  };
}
