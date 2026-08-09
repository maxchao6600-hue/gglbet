import type { AppLocale } from "@/config/i18n";

const EN = {
  supportCrumb: "Support",
  onThisPage: "On this GGLBET page",
  writtenBy: "Written by ",
  reviewedBy: "Reviewed by ",
  lastUpdated: "Last updated ",
  factChecked: "Fact-checked",
  howWeWork: "How we work",
  inShort: "In short",
  calloutInfo: "Info",
  calloutTip: "Tip",
  calloutWarning: "Warning",
  quickSummary: "Quick summary",
  quickSummarySub: "Key GGLBET points at a glance",
  quickSummaryBody:
    "Scan these cards before you dive into the full GGLBET guide on this page.",
  authorHeading: "Who produced this GGLBET page",
  authorSub: "Named ownership, published expertise",
  authorBody:
    "Every GGLBET Support landing carries a named owner and, where money or policy is involved, a separate reviewer.",
  relatedHeading: "GGLBET Support topic cluster",
  relatedSub: "Move between related GGLBET Support journeys",
  relatedBody:
    "Follow this cluster to the next GGLBET task — Register, Payment, FAQ, Download, Responsible Gaming, or Contact — without random detours.",
  heroOnBrand: "on GGLBET",
  defaultFaqHeading: "GGLBET frequently asked questions",
  defaultFaqSub: "Answers published for GGLBET readers",
  defaultFaqBody:
    "Each question below is written for GGLBET players and this page topic.",
  defaultEyebrow: "GGLBET Support",
  defaultFinalEyebrow: "GGLBET next step",
  defaultFinalHeading: "Next step with clear GGLBET documentation",
  defaultFinalSub:
    "Register, log in, or open Support when you need the next answer",
  defaultFinalBody:
    "Use GGLBET Support, FAQ, Payment, Download, and Responsible Gaming pages together before you deposit.",
  ctaRegister: "Register on GGLBET",
  ctaSupport: "GGLBET Support",
  ctaGames: "Browse GGLBET games",
  ctaFaq: "GGLBET FAQ",
  ctaContact: "Contact GGLBET",
  ctaPayment: "GGLBET Payment methods",
  ctaDownload: "Download GGLBET",
  ctaLogin: "Log in to GGLBET",
  ctaRg: "Responsible gaming",
  ctaAbout: "About GGLBET",
  ctaEditorial: "Editorial policy",
  ctaTeam: "About our team",
} as const;

const ZH: Record<keyof typeof EN, string> = {
  supportCrumb: "支援中心",
  onThisPage: "本頁 GGLBET 目錄",
  writtenBy: "撰寫：",
  reviewedBy: "審核：",
  lastUpdated: "最後更新 ",
  factChecked: "已事實查核",
  howWeWork: "我們如何運作",
  inShort: "簡要說明",
  calloutInfo: "資訊",
  calloutTip: "提示",
  calloutWarning: "警示",
  quickSummary: "重點摘要",
  quickSummarySub: "一眼掌握 GGLBET 重點",
  quickSummaryBody: "先掃過這些卡片，再閱讀本頁完整的 GGLBET 說明。",
  authorHeading: "本頁 GGLBET 內容負責人",
  authorSub: "具名負責、公開專長",
  authorBody:
    "每一個 GGLBET Support 落地頁都有具名負責人；涉及金流或政策時，另有獨立審核者。",
  relatedHeading: "GGLBET Support 主題叢集",
  relatedSub: "在相關 GGLBET Support 旅程之間移動",
  relatedBody:
    "依任務前往 GGLBET 註冊、支付、FAQ、下載、負責任博彩或聯絡頁，避免隨機跳轉。",
  heroOnBrand: "｜GGLBET",
  defaultFaqHeading: "GGLBET 常見問題",
  defaultFaqSub: "為 GGLBET 讀者發布的解答",
  defaultFaqBody: "下列問題皆針對 GGLBET 玩家與本頁主題撰寫。",
  defaultEyebrow: "GGLBET 支援",
  defaultFinalEyebrow: "GGLBET 下一步",
  defaultFinalHeading: "下一步：清楚的 GGLBET 說明",
  defaultFinalSub: "需要下一步時，請註冊、登入或開啟支援",
  defaultFinalBody:
    "存款前請一併閱讀 GGLBET Support、FAQ、支付、下載與負責任博彩頁面。",
  ctaRegister: "註冊 GGLBET",
  ctaSupport: "GGLBET 支援中心",
  ctaGames: "瀏覽 GGLBET 遊戲",
  ctaFaq: "GGLBET 常見問題",
  ctaContact: "聯絡 GGLBET",
  ctaPayment: "GGLBET 支付方式",
  ctaDownload: "下載 GGLBET",
  ctaLogin: "登入 GGLBET",
  ctaRg: "負責任博彩",
  ctaAbout: "關於 GGLBET",
  ctaEditorial: "編輯政策",
  ctaTeam: "關於我們的團隊",
};

export type SupportUiCopy = typeof EN;

export function getSupportUiCopy(locale: AppLocale): SupportUiCopy {
  return locale === "zh" ? (ZH as SupportUiCopy) : EN;
}
