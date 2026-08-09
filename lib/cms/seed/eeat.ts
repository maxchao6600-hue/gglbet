import { getAuthorHref } from "@/constants/routes";
import { createPlaceholderImage } from "@/lib/cms/media";
import { residualTrustPages } from "@/lib/cms/seed/residual-trust-pages";
import { supportHubTrustPages } from "@/lib/cms/seed/support";
import { L } from "@/lib/i18n";
import type {
  EditorialPerson,
  EeatContent,
  TrustPageDocument,
} from "@/types/eeat";

const SITE = "GGLBET";

function createAuthor(input: {
  readonly slug: string;
  readonly name: ReturnType<typeof L> | string;
  readonly jobTitle: ReturnType<typeof L> | string;
  readonly bio: ReturnType<typeof L> | string;
  readonly expertise: readonly (ReturnType<typeof L> | string)[];
  readonly credentials: readonly (ReturnType<typeof L> | string)[];
  readonly email?: string;
  readonly tone?: "brand" | "secondary" | "neutral" | "accent";
}): EditorialPerson {
  const nameEn = typeof input.name === "string" ? input.name : input.name.en;
  const nameZh = typeof input.name === "string" ? input.name : input.name.zh;
  const jobEn =
    typeof input.jobTitle === "string" ? input.jobTitle : input.jobTitle.en;
  const jobZh =
    typeof input.jobTitle === "string" ? input.jobTitle : input.jobTitle.zh;
  const bioEn = typeof input.bio === "string" ? input.bio : input.bio.en;
  const bioZh = typeof input.bio === "string" ? input.bio : input.bio.zh;

  return {
    id: `author-${input.slug}`,
    slug: input.slug,
    name: input.name as string,
    jobTitle: input.jobTitle as string,
    bio: input.bio as string,
    expertise: input.expertise as readonly string[],
    credentials: input.credentials as readonly string[],
    avatar: {
      ...createPlaceholderImage(`${nameEn} portrait`, input.tone ?? "brand", 600),
      alt: L(`${nameEn} portrait`, `${nameZh} 肖像`) as unknown as string,
    },
    sameAs: [],
    ...(input.email ? { email: input.email } : {}),
    metaTitle: L(
      `${nameEn} — ${jobEn} | ${SITE}`,
      `${nameZh} — ${jobZh} | ${SITE}`,
    ) as unknown as string,
    metaDescription: L(
      `${bioEn} Read the pages and reviews published by ${nameEn} at ${SITE}.`,
      `${bioZh} 閱讀 ${nameZh} 在 ${SITE} 發布的頁面與審核內容。`,
    ) as unknown as string,
    canonicalPath: getAuthorHref(input.slug),
  };
}

export const editorialAuthorsSeed: readonly EditorialPerson[] = [
  createAuthor({
    slug: "gglbet-editorial",
    name: L("GGLBET Editorial", "GGLBET 編輯團隊"),
    jobTitle: L("Editorial Team", "編輯團隊"),
    bio: L(
      "Product and trust-focused writers covering casino education, payments, and safer play. The editorial team owns every explainer, guide, and policy page on GGLBET.",
      "專注產品與信任的寫手，涵蓋娛樂場教育、支付與更安全遊玩。編輯團隊負責 GGLBET 上每一篇說明、指南與政策頁。",
    ),
    expertise: [
      L("Casino product education", "娛樂場產品教育"),
      L("Payment and withdrawal workflows", "存款與出款流程"),
      L("Bonus terms and wagering mechanics", "優惠條款與流水機制"),
      L("Slot and live casino mechanics", "老虎機與真人娛樂場機制"),
      L("Search and answer-engine content structure", "搜尋與答題引擎內容結構"),
    ],
    credentials: [
      L(
        "Combined 20+ years writing regulated iGaming content",
        "合計超過 20 年受監管 iGaming 內容寫作經驗",
      ),
      L(
        "Trained on responsible gambling communication standards",
        "受過負責任博彩溝通標準訓練",
      ),
      L(
        "Follows the GGLBET editorial policy for sourcing and disclosure",
        "依 GGLBET 編輯政策進行取材與揭露",
      ),
      L(
        "Every page carries a named owner and review date",
        "每一頁都有具名負責人與審核日期",
      ),
    ],
    email: "editorial@gglbet.example",
  }),
  createAuthor({
    slug: "gglbet-trust-desk",
    name: L("GGLBET Trust Desk", "GGLBET 信任審核台"),
    jobTitle: L("Compliance and Fact-Checking Lead", "合規與事實查核主管"),
    bio: L(
      "Reviews published content for accuracy, licensing claims, and responsible-gaming alignment before it reaches players. The trust desk is the final sign-off on every policy and money-related page.",
      "在內容到達玩家前審核準確性、牌照主張與負責任博彩對齊。信任審核台是每一頁政策與金流相關頁面的最終簽核。",
    ),
    expertise: [
      L("Fact-checking and source verification", "事實查核與來源驗證"),
      L("Responsible gaming tooling and self-exclusion", "負責任博彩工具與自我排除"),
      L("KYC, AML, and account verification", "KYC、AML 與帳戶驗證"),
      L("Terms, privacy, and disclosure review", "條款、隱私與揭露審核"),
      L("Player complaint handling", "玩家申訴處理"),
    ],
    credentials: [
      L(
        "Reviews all payment, bonus, and policy pages before publication",
        "出版前審核所有支付、優惠與政策頁",
      ),
      L("Maintains the GGLBET content correction log", "維護 GGLBET 內容更正紀錄"),
      L(
        "Escalates unverified claims instead of publishing them",
        "未經驗證的主張會升級而非直接發布",
      ),
      L(
        "Coordinates the quarterly full-site content audit",
        "協調每季全站內容稽核",
      ),
    ],
    email: "trust@gglbet.example",
    tone: "secondary",
  }),
  createAuthor({
    slug: "gglbet-newsroom",
    name: L("GGLBET Newsroom", "GGLBET 新聞台"),
    jobTitle: L("News Desk", "新聞台"),
    bio: L(
      "Covers product updates, promotions, and platform education for GGLBET. The newsroom publishes time-stamped updates and links every claim back to a primary source or product page.",
      "負責 GGLBET 產品更新、優惠與平台教育報導。新聞台發布帶時間戳的更新，並將每個主張連回主要來源或產品頁。",
    ),
    expertise: [
      L("Product release coverage", "產品發布報導"),
      L("Promotion and campaign reporting", "優惠與活動報導"),
      L("Provider and studio announcements", "供應商與工作室公告"),
      L("Industry and regulatory news", "產業與監管新聞"),
    ],
    credentials: [
      L(
        "Publishes with visible publish and update timestamps",
        "發布時顯示可見的發布與更新日期",
      ),
      L("Separates reporting from promotional copy", "將報導與行銷文案分開"),
      L(
        "Routes every factual claim through the trust desk",
        "每項事實主張都經信任審核台",
      ),
    ],
    tone: "accent",
  }),
] as const;

export const trustPagesSeed: readonly TrustPageDocument[] = [
  ...supportHubTrustPages,
  ...residualTrustPages,
] as const;

export const eeatSeed: EeatContent = {
  authors: editorialAuthorsSeed,
  pages: trustPagesSeed,
};
