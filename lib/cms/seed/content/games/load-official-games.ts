import { loadPublicCmsJson } from "@/lib/cms/load-public-json";

export type OfficialGameRecord = {
  readonly id: number;
  readonly typeId: number | null;
  readonly name: string;
  readonly alias: string;
  readonly rtp: number | null;
  readonly badge: { readonly name?: string; readonly title?: string } | null;
  readonly realPlay: boolean;
  readonly forFun: boolean;
  readonly providerCode: string | null;
  readonly providerTitle: string | null;
  readonly providerIcon: string | null;
  readonly icon: string | null;
  readonly background: string | null;
  readonly newGame: boolean;
  readonly popular: boolean;
  readonly featured: boolean;
};

export type OfficialGamesSnapshot = {
  readonly verifiedDate?: string;
  readonly sourceName?: string;
  readonly sourceSiteId?: number;
  readonly count?: number;
  readonly games: readonly OfficialGameRecord[];
};

/**
 * Load the official games catalog without statically bundling the ~6MB JSON
 * into the Cloudflare Worker server function.
 */
export function loadOfficialGamesSnapshot(): Promise<OfficialGamesSnapshot> {
  return loadPublicCmsJson<OfficialGamesSnapshot>("gglbet5-games.json");
}
