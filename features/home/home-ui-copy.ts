import type { AppLocale } from "@/config/i18n";

export type HomeUiCopy = {
  readonly viewProvider: string;
  readonly officialProvider: string;
  readonly gamesCountSuffix: string; // e.g. "games" / "款遊戲"
  readonly featuredBadge: string;
};

export function getHomeUiCopy(locale: AppLocale): HomeUiCopy {
  if (locale === "zh") {
    return {
      viewProvider: "在 GGLBET 查看",
      officialProvider: "GGLBET 官方遊戲商",
      gamesCountSuffix: "款遊戲",
      featuredBadge: "GGLBET 精選",
    };
  }
  return {
    viewProvider: "View on GGLBET",
    officialProvider: "Official GGLBET provider",
    gamesCountSuffix: "games",
    featuredBadge: "Featured on GGLBET",
  };
}

export function formatGamesCount(
  count: number,
  locale: AppLocale,
  suffix: string,
): string {
  if (locale === "zh") return `${count} ${suffix}`;
  const word = count === 1 ? "game" : "games";
  return `${count} ${word}`;
}
