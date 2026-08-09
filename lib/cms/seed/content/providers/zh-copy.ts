import type { GameCategory } from "@/types/game";
import type { ProviderFaqItem } from "@/types/provider";

/** Minimal official snapshot fields needed for zh SEO copy. */
export type OfficialProviderZhInput = {
  readonly code: string;
  readonly title: string;
  readonly badge: { readonly name: string; readonly title: string } | null;
  readonly products: readonly string[];
  readonly slug: string;
  readonly localLogoPath: string | null;
};

/**
 * Traditional Chinese SEO copy for official provider directory pages.
 * Rewritten for zh-Hant discovery — not machine translation of English strings.
 * Facts limited to verified GGLBET platform provider listings (title, code, badge, products).
 */

function badgeZh(badgeTitle: string | undefined | null): string | null {
  if (!badgeTitle) return null;
  const key = badgeTitle.toLowerCase();
  if (key === "jackpot") return "彩金";
  if (key === "top") return "精選";
  if (key === "hot") return "熱門";
  return badgeTitle;
}

function productsZh(products: readonly string[]): string {
  if (products.length === 0) return "娛樂城";
  return products
    .map((p) => {
      const key = p.toLowerCase();
      if (key === "casino" || key === "slots") return "娛樂城";
      if (key === "live-casino" || key === "live") return "真人娛樂城";
      return p;
    })
    .join("、");
}

export function shortNameForZh(title: string): string {
  if (title.length <= 22) return title;
  const first = title.split(/\s+/)[0] ?? title;
  return first.length <= 22 ? first : title.slice(0, 22).trim();
}

export function categoryLabelsZh(
  record: OfficialProviderZhInput,
  supportedGames: readonly GameCategory[],
): readonly string[] {
  const labels: string[] = [];
  if (supportedGames.includes("slots")) labels.push("娛樂城");
  if (supportedGames.includes("live-casino")) labels.push("真人娛樂城");
  const badge = badgeZh(record.badge?.title);
  if (badge) labels.push(badge);
  return labels.length > 0 ? labels : ["娛樂城"];
}

export function summaryZh(record: OfficialProviderZhInput): string {
  return `${record.title} 已收錄於 GGLBET 娛樂城供應商目錄（供應商代碼 ${record.code}）。`;
}

export function metaTitleZh(record: OfficialProviderZhInput): string {
  return `${record.title}｜知名娛樂城遊戲供應商｜GGLBET`;
}

export function metaDescriptionZh(record: OfficialProviderZhInput): string {
  const text = `${record.title} 遊戲供應商介紹。GGLBET 整理供應商代碼、產品別與目錄標記，方便在 Provider Directory 篩選與查詢。`;
  return text.length <= 155 ? text : text.slice(0, 155).replace(/\s+\S*$/, "");
}

export function heroTitleZh(record: OfficialProviderZhInput): string {
  return `${record.title}｜GGLBET 供應商`;
}

export function introZh(record: OfficialProviderZhInput): string {
  const badge = badgeZh(record.badge?.title);
  const badgeSentence = badge
    ? `目錄另標示「${badge}」標記。`
    : "";
  return `${record.title} 收錄於 GGLBET 娛樂城供應商目錄，代碼為 ${record.code}。GGLBET 將此筆目錄資訊公開於供應商頁，方便玩家在索引中找到該工作室，並在已串接遊戲時以供應商條件篩選。${badgeSentence}`;
}

export function historyZh(record: OfficialProviderZhInput): string {
  return `${record.title} 之所以出現在 GGLBET，是因為經驗證的 GGLBET 平台供應商列表已列出該供應商。本頁產品別為：${productsZh(record.products)}。成立年份、註冊地、牌照、RTP 或第三方評測等未經驗證的資訊，本頁一律不自行編寫，僅提供目錄層級的查詢說明。`;
}

export function featuresZh(record: OfficialProviderZhInput): readonly string[] {
  const badge = badgeZh(record.badge?.title);
  return [
    "已列入 GGLBET 供應商目錄",
    `供應商代碼：${record.code}`,
    `目錄產品別：${productsZh(record.products)}`,
    ...(badge ? [`目錄標記：${badge}`] : []),
    ...(record.localLogoPath
      ? ["GGLBET 目錄已提供供應商標誌"]
      : ["本快照尚未附上本地標誌檔，頁面以佔位圖顯示"]),
  ];
}

export function advantagesZh(record: OfficialProviderZhInput): readonly string[] {
  const badge = badgeZh(record.badge?.title);
  return [
    "收錄於 GGLBET 娛樂城供應商目錄",
    `GGLBET 目錄公布供應商代碼 ${record.code}`,
    ...(badge ? [`目錄標記：${badge}`] : []),
  ];
}

export function prosZh(record: OfficialProviderZhInput): readonly string[] {
  return [
    "可於 GGLBET 供應商目錄查詢",
    `供應商代碼 ${record.code} 便於跨頁辨識同一筆目錄`,
  ];
}

export function consZh(): readonly string[] {
  return [
    "本頁僅整理官方目錄登錄資訊，並非第三方工作室傳記",
    "遊戲數量、RTP、上架年表等未見於本供應商合作快照，故不予推估",
  ];
}

export function volatilityGuideZh(): string {
  return "波動度依個別遊戲而定。僅憑供應商目錄登錄，GGLBET 不會臆造全工作室 RTP 或波動數據；請以各遊戲資訊面板為準。";
}

export function securityNotesZh(): string {
  return "請僅透過已登入的 GGLBET 工作階段開啟供應商遊戲。勿使用第三方鏡像站，亦勿分享帳號憑證。";
}

export function fairPlayNotesZh(): string {
  return "公平遊戲與 RTP 細節以各遊戲公開資訊為準。本供應商頁僅說明目錄收錄事實，不自行編寫工作室數學參數。";
}

export function howToPlayZh(record: OfficialProviderZhInput): readonly string[] {
  return [
    `開啟 GGLBET 上的 ${record.title} 供應商頁。`,
    `於遊戲目錄使用 provider=${record.slug} 篩選已串接之標題。`,
    "遊玩前先查看個別遊戲資訊面板。",
    "較長遊玩前先設定負責任博彩限額。",
  ];
}

export function tipsZh(): readonly string[] {
  return [
    "請將本頁視為 GGLBET 的目錄條目，而非完整工作室檔案。",
    "實際上架情況請以登入後的 GGLBET 大廳為準。",
    "探索目錄時可一併比較 GGLBET 內其他供應商頁。",
  ];
}

export function whyChooseZh(record: OfficialProviderZhInput): readonly string[] {
  const badge = badgeZh(record.badge?.title);
  return [
    "GGLBET 供應商目錄收錄",
    `供應商代碼 ${record.code}`,
    ...(badge ? [`目錄標示「${badge}」`] : []),
  ];
}

export function paymentMethodsZh(): readonly string[] {
  return ["登入 GGLBET 後，使用 GGLBET 出納櫃檯提供的付款方式"];
}

export function supportedLanguagesZh(): readonly string[] {
  return ["以登入後 GGLBET 大廳語系為準"];
}

export function supportedDevicesZh(): readonly string[] {
  return ["網頁", "手機瀏覽器"];
}

export function supportedPlatformsZh(): readonly string[] {
  return ["網頁瀏覽器", "手機瀏覽器"];
}

export function ctaPrimaryLabelZh(record: OfficialProviderZhInput): string {
  return `瀏覽 ${shortNameForZh(record.title)} 遊戲`;
}

export function ctaSecondaryLabelZh(): string {
  return "全部供應商";
}

export function faqZh(record: OfficialProviderZhInput): readonly ProviderFaqItem[] {
  const badge = badgeZh(record.badge?.title);
  const short = shortNameForZh(record.title);
  return [
    {
      question: `${record.title} 是否為 GGLBET 娛樂城供應商？`,
      answer: `是。${record.title} 因收錄於 GGLBET 供應商目錄而被列出（網址代稱 ${record.slug}）。GGLBET 發布本頁是為了讓玩家發現工作室、閱讀目錄說明，並跳轉 GGLBET 遊戲篩選，而非杜撰工作室傳記。若與登入後的 GGLBET 大廳不同，請以即時大廳為準——GGLBET 目錄頁協助探索，不覆寫可用性。`,
    },
    {
      question: `${record.title} 在 GGLBET 的供應商代碼是什麼？`,
      answer: `GGLBET 公布 ${record.title} 的代碼為 ${record.code}。GGLBET 保留此代碼，方便依遊戲商篩選時追蹤目錄關係。代碼是目錄中繼資料，不是玩家密碼、優惠碼或自行發明的排名。`,
    },
    {
      question: `如何在 GGLBET 瀏覽 ${record.title} 的遊戲？`,
      answer: `開啟 GGLBET 遊戲目錄並以 provider=${record.slug} 篩選，或使用本頁主要行動按鈕。連結標題協助你從 ${short} 工作室頁進入可玩目錄。真人與老虎機是否可玩仍取決於已驗證的 GGLBET 工作階段，請把目錄連結視為探索路徑，存款前先確認大廳。`,
    },
    {
      question: `${record.title} 在 GGLBET 顯示多少款遊戲？`,
      answer: `當官方遊戲快照已將標題連結至此供應商代碼時，GGLBET 會為 ${record.title} 顯示真實遊戲數量。數量可協助馬來西亞玩家比較 GGLBET 供應商規模，但不保證登入後你的地區每一款都可玩。若與大廳不同，請以登入後目錄為準。`,
    },
    {
      question: `GGLBET 供應商頁會否杜撰 RTP 或成立年份？`,
      answer: `不會。當經驗證平台資料沒有提供時，GGLBET 不會在 ${record.title} 頁杜撰 RTP、執照、成立年份或第三方獎項。寧可留空也不猜測。標題層級 RTP 僅在遊戲頁有公開數字時顯示，並仍應在即時資訊面板再次確認。`,
    },
    {
      question: `GGLBET 的 ${record.title} 資料從哪裡來？`,
      answer: `${record.title} 在 GGLBET 的供應商名稱、遊戲數量與目錄資訊，彙整自官方供應商列表與經驗證的 GGLBET 平台資料。GGLBET 會改寫結構以利搜尋與閱讀，但目錄事實保持對齊。非官方代理站不是本頁來源。`,
    },
    {
      question: `像 ${record.title} 這類 GGLBET 供應商頁多久更新？`,
      answer: `當經驗證平台目錄或已連結遊戲關係變更時，GGLBET 會刷新供應商目錄頁。編輯更新是為了讓 GGLBET 更清楚，但可用性仍以即時 GGLBET 大廳為準。需要工作室脈絡時再回來 ${record.title} 頁，開玩則回到 GGLBET 遊戲。`,
    },
    {
      question: `為什麼在 GGLBET 開玩前要先看 ${record.title} 頁？`,
      answer: `GGLBET 的 ${record.title} 供應商頁說明誰製作遊戲、列出哪些產品分類，以及如何篩選相關 GGLBET 遊戲。這些脈絡可減少盲目點縮圖，並強化透明資訊。較長場次前請搭配負責任博彩限額。`,
    },
    ...(badge
      ? [
          {
            question: `「${badge}」標記在 GGLBET 的 ${record.title} 代表什麼？`,
            answer: `「${badge}」是 ${record.title} 在 GGLBET 公布的目錄中繼資料，不是 GGLBET 獨立評分，也不保證結果。請把它當探索提示，再於即時客戶端個別評估遊戲。`,
          },
        ]
      : []),
  ];
}

export function definitionZh(record: OfficialProviderZhInput): string {
  return `${record.title} 為 GGLBET 供應商目錄所登錄的娛樂城軟體供應商（代碼 ${record.code}）。`;
}

export function featuresSectionIntroZh(): string {
  return "以下重點皆來自官方供應商列表與經驗證的 GGLBET 平台資料。本頁不另加工作室創立故事或第三方評測說法。";
}

export function tipBoxTitleZh(): string {
  return "供應商資訊";
}

export function tipBoxBodyZh(): string {
  return "供應商名稱、遊戲數量與目錄資訊，彙整自官方供應商列表與經驗證的 GGLBET 平台資料。若與即時大廳不同，請以登入後的 GGLBET 工作階段確認。";
}

export function ctaBlockHeadingZh(record: OfficialProviderZhInput): string {
  return `在 GGLBET 探索 ${shortNameForZh(record.title)}`;
}

export function ctaBlockBodyZh(): string {
  return "前往依此供應商篩選的遊戲目錄，或返回完整官方供應商列表。";
}

export function headingBackgroundZh(): string {
  return "背景說明";
}

export function headingFeaturesZh(): string {
  return "目錄重點";
}

export function headingFaqZh(): string {
  return "常見問題";
}

export function headingSummaryZh(): string {
  return "摘要";
}

export function featuresListTitleZh(): string {
  return "官方目錄重點";
}

/** Providers index page (directory) — zh SEO copy */
export const providersPageZh = {
  seoTitle: "GGLBET 遊戲供應商｜娛樂城 Provider Directory",
  seoDescription:
    "瀏覽 GGLBET 娛樂城與遊戲供應商目錄。比較工作室、目錄標記與發現連結，並以 GGLBET 為唯一品牌核心。",
  heroHeading: "GGLBET 遊戲供應商目錄",
  heroSubheading: "GGLBET 上的娛樂城供應商與遊戲工作室",
  heroBody:
    "在同一個清楚的 Provider Directory 探索 GGLBET 娛樂城供應商。各工作室頁只呈現目錄事實——名稱、代碼、標記與產品別——不另撰寫虛構傳記。",
  mediaLabel: "GGLBET 供應商目錄",
  seoContentHeading: "如何使用 GGLBET 供應商目錄",
  seoContentBody:
    "可依名稱搜尋、字母或分類篩選，並開啟供應商頁查看目錄摘要、重點、常見問題與 GGLBET 遊戲篩選連結。若即時大廳可用性與此目錄不同，請在已登入的 GGLBET 工作階段確認。",
  faq: [
    {
      question: "什麼是 GGLBET 遊戲供應商？",
      answer:
        "遊戲供應商是指收錄於 GGLBET Provider Directory 的工作室，其遊戲可能出現在 GGLBET 遊戲大廳。",
    },
    {
      question: "供應商資訊從哪裡來？",
      answer:
        "供應商名稱、遊戲數量與目錄資訊，彙整自官方供應商列表與經驗證的 GGLBET 平台資料。未經驗證的工作室不會自行新增。",
    },
    {
      question: "供應商頁會列出熱門遊戲嗎？",
      answer:
        "僅在確實存在目錄關聯時才會加入熱門遊戲連結。目錄聚焦供應商中繼資料；遊戲關聯可能待另行串接後才顯示。",
    },
  ],
  finalCtaHeading: "準備瀏覽 GGLBET 供應商與遊戲了嗎？",
  finalCtaBody:
    "可在 GGLBET 註冊或登入開啟即時目錄，或在比較供應商列表時一併瀏覽 GGLBET 優惠活動。",
  primaryLabel: "註冊 GGLBET",
  secondaryLabel: "瀏覽 GGLBET 遊戲",
} as const;

export const authorZh = {
  name: "GGLBET 編輯團隊",
  bio: "負責整理 GGLBET 供應商目錄並發布的編輯團隊。",
} as const;
