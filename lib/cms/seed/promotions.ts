import { ROUTES, getPromotionHref } from "@/constants/routes";
import { promotionsFaqItems } from "@/lib/cms/seed/faq/promotions-faq";
import {
  buildOfficialPromotionSeeds,
  type OfficialPromotionSeed,
} from "@/lib/cms/seed/content/promotions/from-official";
import { attachPromotionContentEngine } from "@/lib/content/attach";
import { estimateReadingTimeMinutes } from "@/lib/content/reading-meta";
import { buildTocFromBlocks } from "@/lib/content/toc";
import { L } from "@/lib/i18n";
import { resolvePromotionArtwork } from "@/lib/promotions/artwork";
import type { Promotion, PromotionsPageContent } from "@/types/promotion";

/**
 * Promotions are built from official GGLBET offer materials (CMS snapshot).
 * Source file: public/cms/gglbet5-promotions.json (Workers Static Assets).
 * Public Hero / Meta / CTA stay GGLBET-branded — no third-party domain in primary SEO.
 */
let catalogPromise: Promise<readonly OfficialPromotionSeed[]> | null = null;

function loadPromotionCatalog(): Promise<readonly OfficialPromotionSeed[]> {
  if (!catalogPromise) {
    catalogPromise = buildOfficialPromotionSeeds().catch((error) => {
      catalogPromise = null;
      throw error;
    });
  }
  return catalogPromise;
}

function mapOfficialSeedToPromotion(
  input: OfficialPromotionSeed,
  index: number,
): Promotion {
  const publishedAt = "2026-08-05T00:00:00.000Z";
  const endDate = input.endDate
    ? new Date(input.endDate.replace(" ", "T") + "Z").toISOString()
    : null;

  const artwork = resolvePromotionArtwork({
    slug: input.slug,
    title: input.title,
    excerpt: input.excerpt,
    promotionType: input.promotionType,
    bonusAmount: input.bonusAmount,
  });

  return attachPromotionContentEngine({
    id: input.id,
    slug: input.slug,
    title: input.title,
    locale: "en",
    createdAt: publishedAt,
    updatedAt: publishedAt,
    publishedAt,
    metaTitle: input.longform.metaTitle,
    metaDescription: input.longform.metaDescription,
    canonicalPath: getPromotionHref(input.slug),
    heroTitle: input.title,
    heroDescription: input.excerpt,
    excerpt: input.excerpt,
    overview: input.overview,
    coverImage: artwork.image,
    bannerImage: { ...artwork.image, id: `${artwork.image.id}-banner` },
    promotionType: input.promotionType,
    bonusType: input.bonusType,
    bonusAmount: input.bonusAmount,
    currency: input.currency,
    minimumDeposit: input.minimumDeposit,
    maximumBonus: input.maximumBonus,
    turnoverRequirement: input.turnoverRequirement,
    eligibleGames: input.eligibleGames,
    eligibleGameSlugs: [],
    requirements: input.requirements,
    startDate: input.startDate,
    endDate,
    status: endDate && Date.parse(endDate) < Date.now() ? "expired" : "active",
    featured: index < 8,
    popular: index < 12,
    sortOrder: (index + 1) * 10,
    terms: input.terms,
    faq: input.longform.faq,
    relatedGameSlugs: [],
    relatedProviderSlugs: [],
    relatedGuideSlugs: ["how-to-read-promotion-terms"],
    relatedNewsSlugs: [],
    lastVerified: input.lastVerified,
    verifiedDate: input.verifiedDate,
    sourceUrl: input.sourceUrl,
    sourceName: input.sourceName,
    schema: {
      type: "Offer",
      availability: "https://schema.org/InStock",
    },
    ctaPrimaryLabel: input.longform.ctaPrimaryLabel,
    ctaPrimaryHref: input.longform.ctaPrimaryHref,
    ctaSecondaryLabel: input.longform.ctaSecondaryLabel,
    ctaSecondaryHref: input.longform.ctaSecondaryHref,
    content: input.blocks,
    tableOfContents: buildTocFromBlocks(input.blocks),
    readingTimeMinutes: estimateReadingTimeMinutes(input.blocks),
    publishDate: publishedAt,
    updatedDate: publishedAt,
    factChecked: true,
  });
}

export async function getPromotionsSeed(): Promise<readonly Promotion[]> {
  const catalog = await loadPromotionCatalog();
  return catalog.map(mapOfficialSeedToPromotion);
}

export const promotionsPageSeed: PromotionsPageContent = {
  seo: {
    title: L(
      "GGLBET Promotions | Welcome, Cashback & Free Spins",
      "GGLBET 優惠｜迎新、返水與免費旋轉",
    ) as unknown as string,
    description: L(
      "Browse GGLBET promotions—welcome offers, daily deposit, cashback, free spins, and VIP rewards. Confirm live GGLBET terms before claiming.",
      "瀏覽 GGLBET 優惠——迎新、每日存款、返水、免費旋轉與 VIP 獎勵。領取前請先確認即時 GGLBET 條款。",
    ) as unknown as string,
    path: ROUTES.promotions,
  },
  hero: {
    heading: L(
      "GGLBET promotions — welcome, deposit & cashback offers",
      "GGLBET 優惠——迎新、存款與返水活動",
    ) as unknown as string,
    subheading: L(
      "Official GGLBET offer pages that restate live facts—never invent them",
      "官方 GGLBET 優惠頁只重述即時事實——從不杜撰數字",
    ) as unknown as string,
    body: L(
      "Every promotion on the GGLBET hub is sourced from official GGLBET offer materials. Bonus figures, turnover, dates, eligible games, and terms stay aligned with the live product.",
      "GGLBET 中心的每一檔優惠皆來自官方 GGLBET 優惠資料。獎金數字、流水、日期、適用遊戲與條款，與即時產品保持一致。",
    ) as unknown as string,
    mediaLabel: L(
      "GGLBET promotions hub hero",
      "GGLBET 優惠中心主視覺",
    ) as unknown as string,
  },
  seoContent: {
    heading: L(
      "GGLBET source rule for promotions",
      "GGLBET 優惠資料來源規則",
    ) as unknown as string,
    body: L(
      "Official GGLBET product materials are the only factual source for Promotion, Bonus, Campaign, Event, and Terms & Conditions content on this hub. Third-party reviews and agent sites are not used. SEO sections reorganize official text into introduction, eligibility, claim steps, FAQ, schema, and internal links.",
      "本中心的優惠、紅利、活動、賽事與條款內容，僅以官方 GGLBET 產品資料為事實來源。不採用第三方評論或代理站。SEO 區塊把官方文字重組為介紹、資格、領取步驟、FAQ、結構化資料與內連。",
    ) as unknown as string,
  },
  faq: promotionsFaqItems as unknown as PromotionsPageContent["faq"],
  finalCta: {
    heading: L(
      "Confirm live GGLBET terms before you claim",
      "領取前請先確認即時 GGLBET 條款",
    ) as unknown as string,
    body: L(
      "Open the live promotions list after login, read the full terms, then opt in only if the offer still matches your account and region.",
      "登入後開啟即時優惠清單、讀完整條款，僅在優惠仍符合你的帳號與地區時再參加。",
    ) as unknown as string,
    primaryLabel: L(
      "Register on GGLBET",
      "註冊 GGLBET",
    ) as unknown as string,
    primaryHref: ROUTES.register,
    secondaryLabel: L(
      "GGLBET responsible gaming",
      "GGLBET 負責任博彩",
    ) as unknown as string,
    secondaryHref: ROUTES.responsibleGaming,
  },
  categories: [
    {
      id: "cat-all",
      label: L("All offers", "全部優惠") as unknown as string,
      promotionType: "all",
      body: L(
        "All promotions currently published in the GGLBET promotions catalog.",
        "目前發布於 GGLBET 優惠目錄的全部活動。",
      ) as unknown as string,
    },
    {
      id: "cat-welcome",
      label: L("Welcome", "迎新") as unknown as string,
      promotionType: "welcome",
      body: L(
        "Welcome offers published in the GGLBET promotions catalog.",
        "發布於 GGLBET 優惠目錄的迎新活動。",
      ) as unknown as string,
    },
    {
      id: "cat-deposit",
      label: L("Deposit", "存款") as unknown as string,
      promotionType: "deposit",
      body: L(
        "Deposit bonuses published in the GGLBET promotions catalog.",
        "發布於 GGLBET 優惠目錄的存款紅利。",
      ) as unknown as string,
    },
    {
      id: "cat-reload",
      label: L("Reload", "再存") as unknown as string,
      promotionType: "reload",
      body: L(
        "Reload offers published in the GGLBET promotions catalog.",
        "發布於 GGLBET 優惠目錄的再存活動。",
      ) as unknown as string,
    },
    {
      id: "cat-cashback",
      label: L("Cashback", "返水") as unknown as string,
      promotionType: "cashback",
      body: L(
        "Cashback and rebate offers published in the GGLBET promotions catalog.",
        "發布於 GGLBET 優惠目錄的返水與回饋活動。",
      ) as unknown as string,
    },
    {
      id: "cat-spins",
      label: L("Free spins", "免費旋轉") as unknown as string,
      promotionType: "free-spins",
      body: L(
        "Free-spin offers published in the GGLBET promotions catalog.",
        "發布於 GGLBET 優惠目錄的免費旋轉活動。",
      ) as unknown as string,
    },
    {
      id: "cat-vip",
      label: L("VIP", "VIP") as unknown as string,
      promotionType: "vip",
      body: L(
        "VIP offers published in the GGLBET promotions catalog.",
        "發布於 GGLBET 優惠目錄的 VIP 活動。",
      ) as unknown as string,
    },
    {
      id: "cat-seasonal",
      label: L("Seasonal", "季節活動") as unknown as string,
      promotionType: "seasonal",
      body: L(
        "Seasonal or event offers published in the GGLBET promotions catalog.",
        "發布於 GGLBET 優惠目錄的季節或賽事活動。",
      ) as unknown as string,
    },
  ],
};
