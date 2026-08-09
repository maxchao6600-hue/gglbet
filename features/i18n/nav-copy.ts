import type { AppLocale } from "@/config/i18n";
import { FOOTER_NAV, FOOTER_TRUST_LINKS, AUTH_NAV } from "@/constants/navigation";
import { SITE_NAME } from "@/constants/site";

/** ZH labels for nav titles / item names. */
const ZH_LABELS: Record<string, string> = {
  Explore: "探索",
  Support: "支援",
  Company: "公司",
  Games: "遊戲",
  Providers: "供應商",
  Promotions: "優惠",
  Download: "下載",
  "Download App": "下載 App",
  "Support hub": "支援中心",
  FAQ: "常見問題",
  Guides: "指南",
  Payment: "支付",
  "Payment Methods": "支付方式",
  Contact: "聯絡客服",
  "Editorial Policy": "編輯政策",
  About: "關於",
  "About GGLBET": "關於 GGLBET",
  "About Our Team": "我們的團隊",
  News: "新聞",
  "Responsible Gaming": "負責任博彩",
  "Privacy Policy": "隱私政策",
  Terms: "條款",
  "Content Quality Policy": "內容品質政策",
  "Content Update Policy": "內容更新政策",
  "Log in": "登入",
  Register: "註冊",
  "Trust and transparency": "信任與透明",
  Categories: "分類",
  Discover: "發現",
  Help: "協助",
  Trust: "信任",
  "All Games": "全部遊戲",
  Slots: "老虎機",
  "Live Casino": "真人娛樂場",
  "Table Games": "桌面遊戲",
  "New Releases": "新上線",
  Featured: "精選",
  "Player guides": "玩家指南",
  "Help center": "協助中心",
  VIP: "VIP",
  Referral: "推薦",
  "Open menu": "開啟選單",
  "Close menu": "關閉選單",
};

/** ZH descriptions for mega-menu / nav copy. Keys = exact English description. */
const ZH_DESCRIPTIONS: Record<string, string> = {
  "Browse slots, live casino, and table games":
    "瀏覽老虎機、真人娛樂場與桌面遊戲",
  "Full catalog": "完整遊戲目錄",
  "High-volatility and classics": "高波動與經典老虎機",
  "Real dealers, real-time play": "真人荷官、即時對局",
  "Blackjack, roulette, and more": "二十一點、輪盤等桌面遊戲",
  "Fresh titles this month": "本月新上線遊戲",
  "Editor picks": "編輯精選",
  "Studios and software partners": "遊戲工作室與軟體夥伴",
  "Trusted game studios": "值得信賴的遊戲工作室",
  "Offers, bonuses, and campaigns": "優惠、紅利與活動",
  "How-to resources and education": "操作指南與玩家教育",
  "Product updates and insights": "產品更新與洞察",
  "Common questions": "常見問題與帳號幫助",
  "Deposit and withdrawal options": "存款與提款方式",
  "Reach our support team": "聯繫客服",
  "Safer play tools": "負責任博彩與玩家保護",
  "Company and standards": "關於 GGLBET",
  "How we research and publish": "內容編輯原則",
  "The people behind the content": "我們的團隊",
  "Mobile access": "APP 下載與安裝指南",
  "Help, payments, downloads, and safer play":
    "協助、支付、下載與較安全遊玩",
};

export function navLabel(label: string, locale: AppLocale): string {
  if (locale !== "zh") return label;
  return ZH_LABELS[label] ?? label;
}

export function navDescription(
  description: string | undefined,
  locale: AppLocale,
): string | undefined {
  if (!description) return undefined;
  if (locale !== "zh") return description;
  return ZH_DESCRIPTIONS[description] ?? description;
}

export function getFooterCopy(locale: AppLocale) {
  const groups = FOOTER_NAV.map((group) => ({
    title: navLabel(group.title, locale),
    items: group.items.map((item) => ({
      ...item,
      label: navLabel(item.label, locale),
      description: navDescription(item.description, locale),
    })),
  }));

  const trust = FOOTER_TRUST_LINKS.map((item) => ({
    ...item,
    label: navLabel(item.label, locale),
  }));

  const auth = AUTH_NAV.map((item) => ({
    ...item,
    label: navLabel(item.label, locale),
  }));

  return {
    groups,
    trust,
    auth,
    trustHeading: navLabel("Trust and transparency", locale),
    blurb:
      locale === "zh"
        ? `${SITE_NAME} 為玩家發布清楚的產品資訊、負責任遊玩指引與透明的支援資源。`
        : `${SITE_NAME} publishes clear product information, responsible play guidance, and transparent support resources for players.`,
  };
}
