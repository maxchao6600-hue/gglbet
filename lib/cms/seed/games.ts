import { ROUTES } from "@/constants/routes";
import { gamesFaqItems } from "@/lib/cms/seed/faq/games-faq";
import {
  buildOfficialGameSeeds,
  enrichOfficialGameSeedForDetail,
  type OfficialGameSeedInput,
} from "@/lib/cms/seed/content/games/from-official";
import { attachGameContentEngine } from "@/lib/content/attach";
import { L } from "@/lib/i18n";
import type { Game } from "@/types/game";

let catalogPromise: Promise<readonly OfficialGameSeedInput[]> | null = null;

/**
 * Compact catalog seeds (no static JSON import, no eager Featured SEO expansion).
 * Source file: public/cms/gglbet5-games.json (Workers Static Assets).
 */
export function loadGamesCatalog(): Promise<readonly OfficialGameSeedInput[]> {
  if (!catalogPromise) {
    catalogPromise = buildOfficialGameSeeds().catch((error) => {
      catalogPromise = null;
      throw error;
    });
  }
  return catalogPromise;
}

export async function getGamesSeed(): Promise<readonly Game[]> {
  const catalog = await loadGamesCatalog();
  return catalog.map((game) =>
    attachGameContentEngine(
      game as unknown as Parameters<typeof attachGameContentEngine>[0],
    ),
  );
}

export async function getGameSeedForDetail(
  providerSlug: string,
  slug: string,
): Promise<Game | null> {
  const catalog = await loadGamesCatalog();
  const match = catalog.find(
    (game) =>
      game.slug === slug &&
      game.providerSlug === providerSlug &&
      game.status === "published",
  );
  if (!match) return null;
  const enriched = await enrichOfficialGameSeedForDetail(match, catalog);
  return attachGameContentEngine(
    enriched as unknown as Parameters<typeof attachGameContentEngine>[0],
  );
}

export async function getGameSeedBySlug(slug: string): Promise<Game | null> {
  const catalog = await loadGamesCatalog();
  const match = catalog.find(
    (game) => game.slug === slug && game.status === "published",
  );
  if (!match) return null;
  const enriched = await enrichOfficialGameSeedForDetail(match, catalog);
  return attachGameContentEngine(
    enriched as unknown as Parameters<typeof attachGameContentEngine>[0],
  );
}

/**
 * Bilingual GGLBET games directory page CMS seed.
 * All visible SEO copy is GGLBET-branded (no generic casino filler).
 */
export const gamesPageSeed = {
  seo: {
    title: L(
      "GGLBET Games — Slots, Live Casino & Catalog Filters | GGLBET",
      "GGLBET 遊戲｜老虎機、真人娛樂與目錄篩選｜GGLBET",
    ),
    description: L(
      "Browse GGLBET games by provider, category, and theme. Compare RTP notes when published, find new and popular GGLBET titles, and open SEO-ready game pages on the GGLBET content hub.",
      "依遊戲商、分類與主題瀏覽 GGLBET 遊戲。在有公開資料時比較 RTP、查找 GGLBET 新作與熱門標題，並進入 GGLBET 內容中心的遊戲頁。",
    ),
    path: ROUTES.games,
  },
  hero: {
    heading: L(
      "GGLBET Games — find slots, live tables, and more",
      "GGLBET 遊戲｜搜尋老虎機、真人桌與更多標題",
    ),
    subheading: L(
      "The GGLBET game directory for Malaysia-focused players",
      "面向馬來西亞玩家的 GGLBET 遊戲目錄",
    ),
    body: L(
      "Search the GGLBET catalog by provider, category, or theme. Every GGLBET game page is generated from CMS fields so new titles publish on GGLBET without template rewrites.",
      "依遊戲商、分類或主題搜尋 GGLBET 目錄。每頁 GGLBET 遊戲由 CMS 欄位生成，新標題可上架至 GGLBET 而不必改模板。",
    ),
    mediaLabel: L("GGLBET games directory hero", "GGLBET 遊戲目錄主視覺"),
  },
  seoContent: {
    heading: L(
      "How the GGLBET game system helps players compare titles",
      "GGLBET 遊戲系統如何協助玩家比較標題",
    ),
    body: L(
      "GGLBET game pages standardize RTP notes when available, volatility guidance, device support, how-to-play steps, and related internal links across the GGLBET hub. Provider relationships stay consistent via providerSlug as the GGLBET catalog grows.",
      "GGLBET 遊戲頁在有資料時統一 RTP 說明、波動指引、裝置支援、遊玩步驟與 GGLBET 站內內連。遊戲商關係以 providerSlug 維護，GGLBET 目錄成長時仍保持一致。",
    ),
  },
  faq: gamesFaqItems,
  finalCta: {
    heading: L(
      "Ready to play GGLBET games?",
      "準備好遊玩 GGLBET 遊戲了嗎？",
    ),
    body: L(
      "Register on GGLBET to play, or continue browsing GGLBET providers and promotions with responsible gaming tools available throughout the GGLBET hub.",
      "在 GGLBET 註冊開玩，或繼續瀏覽 GGLBET 遊戲商與優惠；GGLBET 全站皆有負責任博彩工具。",
    ),
    primaryLabel: L("Register on GGLBET", "在 GGLBET 註冊"),
    primaryHref: ROUTES.register,
    secondaryLabel: L("Browse GGLBET providers", "瀏覽 GGLBET 遊戲商"),
    secondaryHref: ROUTES.providers,
  },
} as const;
