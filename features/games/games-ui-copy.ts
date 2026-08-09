import type { AppLocale } from "@/config/i18n";

export type GamesUiCopy = {
  readonly eyebrow: string;
  readonly browseProviders: string;
  readonly register: string;
  readonly searchLabel: string;
  readonly searchPlaceholder: string;
  readonly apply: string;
  readonly providerLabel: string;
  readonly allProviders: string;
  readonly categoryLabel: string;
  readonly allCategories: string;
  readonly themeLabel: string;
  readonly allThemes: string;
  readonly sortLabel: string;
  readonly collectionLabel: string;
  readonly collectionAll: string;
  readonly collectionFeatured: string;
  readonly collectionPopular: string;
  readonly collectionNew: string;
  readonly azLabel: string;
  readonly azAll: string;
  readonly featuredHeading: string;
  readonly featuredSub: string;
  readonly featuredBody: string;
  readonly popularHeading: string;
  readonly popularSub: string;
  readonly popularBody: string;
  readonly newHeading: string;
  readonly newSub: string;
  readonly newBody: string;
  readonly trendingHeading: string;
  readonly trendingSub: string;
  readonly trendingBody: string;
  readonly updatedHeading: string;
  readonly updatedSub: string;
  readonly updatedBody: string;
  readonly allGamesHeading: string;
  readonly allGamesBody: string;
  readonly matchingTitlesTemplate: string;
  readonly emptyResults: string;
  readonly previous: string;
  readonly next: string;
  readonly pageLabelTemplate: string;
  readonly seoSub: string;
  readonly faqHeading: string;
  readonly faqSub: string;
  readonly faqBody: string;
  readonly finalSub: string;
  readonly download: string;
  readonly promotions: string;
  readonly playNow: string;
  readonly viewDetails: string;
  readonly breadcrumbGames: string;
  readonly sortOptions: ReadonlyArray<{ value: string; label: string }>;
  readonly categoryTabs: ReadonlyArray<{ value: string; label: string }>;
};

const EN: GamesUiCopy = {
  eyebrow: "GGLBET Games",
  browseProviders: "Browse GGLBET providers",
  register: "Register on GGLBET",
  searchLabel: "Search GGLBET",
  searchPlaceholder: "Search GGLBET games, codes, providers…",
  apply: "Apply",
  providerLabel: "GGLBET provider",
  allProviders: "All GGLBET providers",
  categoryLabel: "GGLBET category",
  allCategories: "All",
  themeLabel: "Theme",
  allThemes: "All themes",
  sortLabel: "Sort",
  collectionLabel: "GGLBET collections",
  collectionAll: "All",
  collectionFeatured: "Featured",
  collectionPopular: "Popular",
  collectionNew: "New",
  azLabel: "A–Z",
  azAll: "All",
  featuredHeading: "Featured GGLBET games",
  featuredSub: "Standout titles worth opening first on GGLBET",
  featuredBody:
    "A short list of GGLBET picks to start with before you dig into the full directory.",
  popularHeading: "Popular GGLBET games",
  popularSub: "High-traffic picks on GGLBET",
  popularBody:
    "GGLBET titles players open most often across the catalog.",
  newHeading: "New GGLBET games",
  newSub: "Freshly published on GGLBET",
  newBody: "Recently added GGLBET titles in the catalog.",
  trendingHeading: "Trending GGLBET games",
  trendingSub: "Strong rating mix on GGLBET",
  trendingBody: "GGLBET titles with strong player interest right now.",
  updatedHeading: "Recently updated on GGLBET",
  updatedSub: "Latest editorial refreshes",
  updatedBody: "GGLBET game pages refreshed with clearer details.",
  allGamesHeading: "All GGLBET games",
  matchingTitlesTemplate:
    "{total} GGLBET titles · page {page} of {totalPages}",
  allGamesBody:
    "Browse the full GGLBET catalog with search, filters, and pagination.",
  emptyResults:
    "No GGLBET games match these filters. Clear filters to see the full GGLBET catalog.",
  previous: "Previous",
  next: "Next",
  pageLabelTemplate: "Page {page} / {totalPages}",
  seoSub: "How the GGLBET game hub helps players compare titles",
  faqHeading: "GGLBET Games FAQ",
  faqSub: "Common questions about the GGLBET catalog",
  faqBody:
    "Quick answers about browsing and choosing games on GGLBET.",
  finalSub: "Register on GGLBET or keep browsing the hub",
  download: "GGLBET Download",
  promotions: "GGLBET Promotions",
  playNow: "Play on GGLBET",
  viewDetails: "View on GGLBET",
  breadcrumbGames: "GGLBET Games",
  sortOptions: [
    { value: "name-asc", label: "A–Z" },
    { value: "name-desc", label: "Z–A" },
    { value: "popular", label: "Popular" },
    { value: "newest", label: "Newest" },
    { value: "updated", label: "Recently updated" },
    { value: "rating", label: "Top rated" },
  ],
  categoryTabs: [
    { value: "", label: "All" },
    { value: "slots", label: "Slots" },
    { value: "live-casino", label: "Live Casino" },
    { value: "table", label: "Table" },
    { value: "fishing", label: "Fishing" },
    { value: "crash", label: "Crash" },
    { value: "lottery", label: "Lottery" },
  ],
};

const ZH: GamesUiCopy = {
  eyebrow: "GGLBET 遊戲",
  browseProviders: "瀏覽 GGLBET 遊戲商",
  register: "在 GGLBET 註冊",
  searchLabel: "搜尋 GGLBET",
  searchPlaceholder: "搜尋 GGLBET 遊戲、代碼、遊戲商…",
  apply: "套用",
  providerLabel: "GGLBET 遊戲商",
  allProviders: "全部 GGLBET 遊戲商",
  categoryLabel: "GGLBET 分類",
  allCategories: "全部",
  themeLabel: "主題",
  allThemes: "全部主題",
  sortLabel: "排序",
  collectionLabel: "GGLBET 精選集",
  collectionAll: "全部",
  collectionFeatured: "精選",
  collectionPopular: "熱門",
  collectionNew: "新作",
  azLabel: "A–Z",
  azAll: "全部",
  featuredHeading: "GGLBET 精選遊戲",
  featuredSub: "值得先打開的 GGLBET 精選標題",
  featuredBody: "先從這份 GGLBET 精選開始，再深入完整目錄。",
  popularHeading: "GGLBET 熱門遊戲",
  popularSub: "GGLBET 高流量精選",
  popularBody: "玩家最常打開的 GGLBET 標題。",
  newHeading: "GGLBET 新遊戲",
  newSub: "剛上架至 GGLBET",
  newBody: "目錄中新加入的 GGLBET 標題。",
  trendingHeading: "GGLBET 趨勢遊戲",
  trendingSub: "GGLBET 評分與熱度組合",
  trendingBody: "目前關注度較高的 GGLBET 標題。",
  updatedHeading: "GGLBET 近期更新",
  updatedSub: "最新編輯刷新",
  updatedBody: "內容已更新的 GGLBET 遊戲頁。",
  allGamesHeading: "全部 GGLBET 遊戲",
  matchingTitlesTemplate: "{total} 款 GGLBET 標題 · 第 {page} / {totalPages} 頁",
  allGamesBody: "以搜尋、篩選與分頁瀏覽完整 GGLBET 目錄。",
  emptyResults: "沒有符合篩選的 GGLBET 遊戲。清除篩選以查看完整目錄。",
  previous: "上一頁",
  next: "下一頁",
  pageLabelTemplate: "第 {page} / {totalPages} 頁",
  seoSub: "GGLBET 遊戲中心如何協助玩家比較標題",
  faqHeading: "GGLBET 遊戲常見問題",
  faqSub: "關於 GGLBET 目錄的常見疑問",
  faqBody: "關於在 GGLBET 瀏覽與選遊戲的快速解答。",
  finalSub: "在 GGLBET 註冊或繼續瀏覽內容中心",
  download: "GGLBET 下載",
  promotions: "GGLBET 優惠",
  playNow: "在 GGLBET 遊玩",
  viewDetails: "在 GGLBET 查看",
  breadcrumbGames: "GGLBET 遊戲",
  sortOptions: [
    { value: "name-asc", label: "A–Z" },
    { value: "name-desc", label: "Z–A" },
    { value: "popular", label: "熱門" },
    { value: "newest", label: "最新" },
    { value: "updated", label: "近期更新" },
    { value: "rating", label: "最高評分" },
  ],
  categoryTabs: [
    { value: "", label: "全部" },
    { value: "slots", label: "老虎機" },
    { value: "live-casino", label: "真人娛樂" },
    { value: "table", label: "桌遊" },
    { value: "fishing", label: "捕魚" },
    { value: "crash", label: "爆點" },
    { value: "lottery", label: "彩票" },
  ],
};

export function getGamesUiCopy(locale: AppLocale): GamesUiCopy {
  return locale === "zh" ? ZH : EN;
}

export function formatGamesTemplate(
  template: string,
  values: Readonly<Record<string, string | number>>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    String(values[key] ?? ""),
  );
}
