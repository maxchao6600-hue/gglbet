import { loadPublicCmsJson } from "@/lib/cms/load-public-json";
import type { GameCategory, GameListItem } from "@/types/game";

/** Compact listing row — GameListItem plus filter helpers used by /games. */
export type GamesListingRow = GameListItem & {
  readonly subCategory?: string;
  readonly tags?: readonly string[];
  readonly ctaPrimaryHref?: string;
  readonly officialId?: number;
};

/**
 * Ultra-compact /games directory DTO for RSC flight (Phase 5).
 * Visible cards synthesize shortDescription; thumbnail is URL-only.
 */
export type GamesDirectoryItem = {
  readonly id: string;
  readonly slug: string;
  readonly gameName: string;
  readonly gameCode: string;
  readonly providerSlug: string;
  readonly providerName: string;
  readonly thumbUrl: string;
  readonly category: GameCategory;
  readonly subCategory?: string;
  readonly tags?: readonly string[];
  readonly theme?: string;
  readonly rtp?: number | null;
  readonly featured: boolean;
  readonly popular: boolean;
  readonly newGame: boolean;
  readonly rating: number;
  readonly reviewCount: number;
  readonly sortOrder: number;
  readonly publishedAt: string;
  readonly updatedAt: string;
  readonly canonicalPath: string;
  readonly ctaPrimaryHref?: string;
};

export function toGamesDirectoryItem(row: GamesListingRow): GamesDirectoryItem {
  return {
    id: row.id,
    slug: row.slug,
    gameName: row.gameName,
    gameCode: row.gameCode,
    providerSlug: row.providerSlug,
    providerName: row.providerName,
    thumbUrl: row.thumbnail?.url || "",
    category: row.category,
    ...(row.subCategory ? { subCategory: row.subCategory } : {}),
    ...((row.tags?.length ?? 0) > 0 ? { tags: row.tags } : {}),
    ...(row.theme ? { theme: row.theme } : {}),
    ...(row.rtp != null ? { rtp: row.rtp } : {}),
    featured: row.featured,
    popular: row.popular,
    newGame: row.newGame,
    rating: row.rating,
    reviewCount: row.reviewCount,
    sortOrder: row.sortOrder,
    publishedAt: row.publishedAt ?? row.updatedAt,
    updatedAt: row.updatedAt,
    canonicalPath: row.canonicalPath,
    ...(row.ctaPrimaryHref ? { ctaPrimaryHref: row.ctaPrimaryHref } : {}),
  };
}

export type DenseGameRow = readonly [
  officialId: number,
  slug: string,
  gameName: string,
  providerSlug: string,
  providerName: string,
  iconUrl: string,
  category: GameCategory,
  featured: 0 | 1,
  popular: 0 | 1,
  newGame: 0 | 1,
  rtp: number | null,
  sortOrder: number,
];

type DenseListingIndex = {
  readonly v?: number;
  readonly generatedAt?: string;
  readonly count?: number;
  readonly rows: readonly DenseGameRow[];
};

export type HomeGameRails = {
  readonly featured: readonly GamesListingRow[];
  readonly popular: readonly GamesListingRow[];
  readonly newGame: readonly GamesListingRow[];
  readonly generatedAt?: string;
  readonly sourceCount?: number;
};

/** Precomputed /games page payload — no 16k-row filter/sort at request time. */
export type GamesPageSsgPayload = {
  readonly v?: number;
  readonly generatedAt?: string;
  readonly sourceCount?: number;
  readonly listing: readonly GamesListingRow[];
  readonly featured: readonly GamesListingRow[];
};

const VERIFIED_DATE = "2026-08-06T00:00:00.000Z";
const CTA = "https://www.gglbet5.com/en/affiliates/?btag=2773567";

export function expandDenseGameRow(row: DenseGameRow): GamesListingRow {
  const [
    officialId,
    slug,
    gameName,
    providerSlug,
    providerName,
    iconUrl,
    category,
    featured,
    popular,
    newGame,
    rtp,
    sortOrder,
  ] = row;

  return {
    id: `game-gglbet5-${officialId}`,
    slug,
    gameName,
    gameCode: String(officialId),
    officialId,
    providerSlug,
    providerName,
    shortDescription: `${gameName} — ${providerName} on GGLBET.`,
    thumbnail: {
      id: `game-thumb-${officialId}`,
      url: iconUrl || "",
      alt: `${gameName} thumbnail`,
      width: 320,
      height: 320,
    },
    category,
    subCategory: category,
    tags: [],
    theme: "",
    ...(rtp != null ? { rtp } : {}),
    volatility: "unknown",
    featured: Boolean(featured),
    newGame: Boolean(newGame),
    popular: Boolean(popular),
    rating: 0,
    reviewCount: 0,
    status: "published",
    sortOrder,
    publishedAt: VERIFIED_DATE,
    updatedAt: VERIFIED_DATE,
    canonicalPath: `/game/${providerSlug}/${slug}`,
    ctaPrimaryHref: CTA,
  };
}

let densePromise: Promise<readonly DenseGameRow[]> | null = null;
let railsPromise: Promise<HomeGameRails> | null = null;
let gamesPageSsgPromise: Promise<GamesPageSsgPayload> | null = null;

/**
 * Dense listing rows from Static Assets — filter before expanding objects.
 * Prefer loadGamesPageSsg() for the /games route itself.
 */
export function loadDenseGamesListing(): Promise<readonly DenseGameRow[]> {
  if (!densePromise) {
    densePromise = loadPublicCmsJson<DenseListingIndex>(
      "games-listing-index.json",
    )
      .then((data) => data.rows ?? [])
      .catch((error) => {
        densePromise = null;
        throw error;
      });
  }
  return densePromise;
}

/**
 * Tiny homepage rails payload (few cards only) — avoids loading the full catalog.
 */
export function loadHomeGameRails(): Promise<HomeGameRails> {
  if (!railsPromise) {
    railsPromise = loadPublicCmsJson<HomeGameRails>("home-game-rails.json").catch(
      (error) => {
        railsPromise = null;
        throw error;
      },
    );
  }
  return railsPromise;
}

/**
 * Precomputed /games listing (500) + featured (8) from build-time generation.
 */
export function loadGamesPageSsg(): Promise<GamesPageSsgPayload> {
  if (!gamesPageSsgPromise) {
    gamesPageSsgPromise = loadPublicCmsJson<GamesPageSsgPayload>(
      "games-page-ssg.json",
    ).catch((error) => {
      gamesPageSsgPromise = null;
      throw error;
    });
  }
  return gamesPageSsgPromise;
}
