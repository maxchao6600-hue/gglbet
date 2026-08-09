import { newsFaqItems } from "@/lib/cms/seed/faq/news-faq";
import {
  ROUTES,
  getNewsCategoryHref,
  getNewsHref,
} from "@/constants/routes";
import { createPlaceholderImage } from "@/lib/cms/media";
import { buildOfficialNewsSeeds } from "@/lib/cms/seed/content/news/from-official";
import { estimateReadingTimeMinutes } from "@/lib/content/reading-meta";
import { buildTocFromBlocks } from "@/lib/content/toc";
import { resolveNewsCoverImage } from "@/lib/news/artwork";
import { L } from "@/lib/i18n";
import type {
  NewsArticle,
  NewsCategory,
  NewsCategorySlug,
  NewsPageContent,
} from "@/types/news";

const AUTHOR = {
  id: "author-gglbet-newsroom",
  name: "GGLBET Newsroom",
  slug: "gglbet-newsroom",
  role: "Editor",
  bio: "Rewrites official GGLBET announcements into SEO news documents. Does not invent offers.",
} as const;

const REVIEWER = {
  id: "reviewer-trust",
  name: "GGLBET Trust Desk",
  slug: "gglbet-trust-desk",
  role: "Reviewer",
  bio: "Checks that news facts match official GGLBET materials before publish.",
} as const;

type CategorySeed = {
  readonly slug: NewsCategorySlug;
  readonly name: string;
  readonly shortName: string;
  readonly intro: string;
  readonly sortOrder: number;
  readonly featured?: boolean;
  readonly tone?: "brand" | "secondary" | "neutral" | "accent";
};

function createCategory(input: CategorySeed): NewsCategory {
  return {
    id: `news-category-${input.slug}`,
    slug: input.slug,
    name: input.name,
    shortName: input.shortName,
    metaTitle: `${input.name} | GGLBET News`,
    metaDescription: `${input.intro} GGLBET News only.`,
    canonicalPath: getNewsCategoryHref(input.slug),
    heroTitle: `GGLBET ${input.name}`,
    heroDescription: input.intro,
    intro: input.intro,
    seoContent: `${input.name} on GGLBET News collects CMS updates rewritten from GGLBET materials. No third-party review sites or forums are used as sources.`,
    coverImage: createPlaceholderImage(
      `${input.name} cover`,
      input.tone ?? "brand",
    ),
    faq: [
      {
        question: `What GGLBET news is covered in ${input.name}?`,
        answer: `${input.name} on GGLBET lists announcements rewritten from official GGLBET materials for ${input.shortName.toLowerCase()} topics. GGLBET news keeps dates and figures aligned with the official source while improving structure for readers and search. Third-party review sites are not used as sources for this GGLBET category.`,
      },
      {
        question: `Are ${input.shortName} stories invented for GGLBET SEO?`,
        answer: `No. GGLBET ${input.shortName.toLowerCase()} news does not invent product stories to fill empty categories. If an official announcement is missing, the GGLBET category may stay sparse. Always confirm live details on GGLBET before depositing or opting into offers mentioned in GGLBET news.`,
      },
      {
        question: `How does GGLBET rewrite ${input.name} without changing facts?`,
        answer: `GGLBET preserves official figures, dates, and eligibility cues from official GGLBET announcements, then reorganizes prose into clearer sections such as summary, highlights, notes, FAQ, and CTA. The live official page remains authoritative if anything differs from the GGLBET article.`,
      },
      {
        question: `How often is ${input.name} updated on GGLBET?`,
        answer: `GGLBET updates ${input.shortName.toLowerCase()} news when new official announcements are selected for the hub. Publish dates on GGLBET articles help you judge freshness. For time-sensitive promotions, re-check the live GGLBET page even if you arrived from GGLBET news.`,
      },
      {
        question: `Can I use ${input.name} to track GGLBET promotions?`,
        answer: `When ${input.shortName.toLowerCase()} announcements relate to offers, GGLBET news can introduce context—but claiming still requires reading live promotion terms. Use GGLBET Promotions alongside this category, and never treat a news paraphrase as a cashier contract.`,
      },
      {
        question: `Does ${input.name} include GGLBET new games updates?`,
        answer: `If official materials announce catalog or feature updates relevant to ${input.shortName.toLowerCase()}, GGLBET may publish them here. For browsing titles themselves, continue to GGLBET Games and Providers after you finish the news article.`,
      },
      {
        question: `How should Malaysia players read GGLBET ${input.shortName} news?`,
        answer: `Read the GGLBET summary first, note dates and eligibility language, then verify on GGLBET before acting. GGLBET ${input.shortName.toLowerCase()} coverage is orientation for Malaysia-focused readers—not a substitute for the signed-in lobby.`,
      },
      {
        question: `Where can I get more GGLBET context beyond ${input.name}?`,
        answer: `Open the main GGLBET News hub, related GGLBET Guides, Promotions, or FAQ pages. Keeping research on official GGLBET surfaces helps you avoid unofficial copies that rewrite announcements incorrectly.`,
      },
    ],
    featured: input.featured ?? false,
    sortOrder: input.sortOrder,
    status: "published",
  };
}

export const newsCategoriesSeed: readonly NewsCategory[] = [
  createCategory({
    slug: "casino",
    name: "Casino News",
    shortName: "Casino",
    intro: "GGLBET News on casino product updates and live-casino related GGLBET announcements.",
    sortOrder: 10,
    featured: true,
  }),
  createCategory({
    slug: "slots",
    name: "Slot News",
    shortName: "Slots",
    intro: "GGLBET News covering slots tournaments, free-spin campaigns, and GGLBET Games catalog notes.",
    sortOrder: 20,
    featured: true,
    tone: "accent",
  }),
  createCategory({
    slug: "provider-updates",
    name: "Provider Updates",
    shortName: "Providers",
    intro: "GGLBET Updates when provider studios appear inside GGLBET announcements.",
    sortOrder: 30,
    tone: "secondary",
  }),
  createCategory({
    slug: "promotions",
    name: "Promotion News",
    shortName: "Promotions",
    intro: "GGLBET Promotions news for campaign launches and seasonal offers published on GGLBET.",
    sortOrder: 40,
    featured: true,
    tone: "secondary",
  }),
  createCategory({
    slug: "sports",
    name: "Sports News",
    shortName: "Sports",
    intro: "GGLBET News for sportsbook and esports updates published on GGLBET.",
    sortOrder: 50,
    featured: true,
    tone: "neutral",
  }),
  createCategory({
    slug: "lottery",
    name: "Lottery News",
    shortName: "Lottery",
    intro: "GGLBET News for lottery updates when published on GGLBET.",
    sortOrder: 60,
    tone: "brand",
  }),
  createCategory({
    slug: "payments",
    name: "Payment News",
    shortName: "Payments",
    intro: "GGLBET Updates on cashier, deposit, or payment notes published for GGLBET players.",
    sortOrder: 70,
    tone: "neutral",
  }),
  createCategory({
    slug: "security",
    name: "Security Updates",
    shortName: "Security",
    intro: "GGLBET Updates on security or verification notes published for GGLBET accounts.",
    sortOrder: 80,
    tone: "secondary",
  }),
  createCategory({
    slug: "platform",
    name: "Platform Updates",
    shortName: "Platform",
    intro: "GGLBET Updates covering platform, VIP, Telegram, and feature notes on GGLBET.",
    sortOrder: 90,
    featured: true,
    tone: "brand",
  }),
  createCategory({
    slug: "industry",
    name: "Industry News",
    shortName: "Industry",
    intro: "Reserved for GGLBET News industry notices published on GGLBET only.",
    sortOrder: 100,
    tone: "neutral",
  }),
];

/**
 * News articles are built ONLY from official GGLBET announcements.
 * Prior fictional seed stories were removed.
 */
const officialNews = buildOfficialNewsSeeds();

export const newsSeed: readonly NewsArticle[] = officialNews.map((input) => {
  const canonicalPath = getNewsHref(input.category, input.slug);
  const tone =
    input.category === "slots"
      ? "accent"
      : input.category === "sports"
        ? "neutral"
        : input.category === "platform"
          ? "brand"
          : "secondary";

  return {
    id: input.id,
    slug: input.slug,
    title: input.title,
    locale: "en",
    createdAt: input.publishDate,
    updatedAt: input.updatedDate,
    publishedAt: input.publishDate,
    category: input.category,
    metaTitle: input.longform.metaTitle,
    metaDescription: input.longform.metaDescription,
    canonicalPath,
    excerpt: input.excerpt,
    heroTitle: input.title,
    heroDescription: input.excerpt,
    coverImage:
      resolveNewsCoverImage({ slug: input.slug, title: input.title }) ??
      createPlaceholderImage(`${input.title} cover`, tone),
    gallery: [createPlaceholderImage(`${input.title} gallery`, tone)],
    content: input.blocks,
    tableOfContents: buildTocFromBlocks(input.blocks),
    timeline: input.timeline,
    tags: input.tags,
    keywords: [...input.tags, "gglbet news", "gglbet official"],
    author: AUTHOR,
    reviewer: REVIEWER,
    publishDate: input.publishDate,
    updatedDate: input.updatedDate,
    featured: input.featured,
    breaking: input.breaking,
    popular: input.popular,
    status: "published",
    sortOrder: input.sortOrder,
    readingTimeMinutes: estimateReadingTimeMinutes(input.blocks),
    faq: input.longform.faq,
    relatedGameSlugs: input.relatedGameSlugs,
    relatedProviderSlugs: input.relatedProviderSlugs,
    relatedGuideSlugs: input.relatedGuideSlugs,
    relatedPromotionSlugs: input.relatedPromotionSlugs,
    relatedNewsSlugs: input.relatedNewsSlugs,
    schema: { type: "NewsArticle", articleSection: input.category },
    ctaPrimaryLabel: input.longform.ctaPrimaryLabel,
    ctaPrimaryHref: input.longform.ctaPrimaryHref,
    ctaSecondaryLabel: input.longform.ctaSecondaryLabel,
    ctaSecondaryHref: input.longform.ctaSecondaryHref,
  };
});

export const newsPageSeed: NewsPageContent = {
  seo: {
    title: L(
      "GGLBET News | Platform, Promotions & Product Updates",
      "GGLBET 新聞｜平台、優惠與產品更新",
    ) as unknown as string,
    description: L(
      "Read GGLBET news rewritten from official GGLBET announcements only. Promotions, sports, slots, VIP, Telegram, and platform updates—no third-party sources.",
      "閱讀僅依官方 GGLBET 公告改寫的新聞。涵蓋優惠、體育、老虎機、VIP、Telegram 與平台更新——不採用第三方來源。",
    ) as unknown as string,
    path: ROUTES.news,
  },
  hero: {
    heading: L(
      "GGLBET News and Updates, rewritten for clarity",
      "GGLBET 新聞與更新，改寫得更清楚",
    ) as unknown as string,
    subheading: L(
      "GGLBET News sourced from GGLBET product materials only",
      "GGLBET 新聞只採用 GGLBET 產品資料",
    ) as unknown as string,
    body: L(
      "Every GGLBET News document maps to a GGLBET product update. Facts stay exact; prose is rewritten for SEO. The live GGLBET product always wins.",
      "每一則 GGLBET 新聞都對應 GGLBET 產品更新。事實保持精確；文案為 SEO 改寫。即時 GGLBET 產品永遠優先。",
    ) as unknown as string,
    mediaLabel: L(
      "GGLBET news hub hero",
      "GGLBET 新聞中心主視覺",
    ) as unknown as string,
  },
  seoContent: {
    heading: L(
      "How GGLBET news stays aligned with official product updates",
      "GGLBET 新聞如何對齊官方產品更新",
    ) as unknown as string,
    body: L(
      "The GGLBET news collection no longer carries invented product stories. Editors select GGLBET product updates, preserve dates and figures, rewrite structure for Summary, Background, GGLBET Announcement, Key Highlights, Impact, Important Notes, FAQ, and CTA, then publish through the Content Engine.",
      "GGLBET 新聞集不再承載杜撰產品故事。編輯選取 GGLBET 產品更新、保留日期與數字，重組為摘要、背景、GGLBET 公告、重點、影響、注意事項、FAQ 與 CTA，再經內容引擎發布。",
    ) as unknown as string,
  },
  faq: newsFaqItems as unknown as NewsPageContent["faq"],
  finalCta: {
    heading: L(
      "Verify live GGLBET details, then keep browsing",
      "先核實即時 GGLBET 細節，再繼續瀏覽",
    ) as unknown as string,
    body: L(
      "Open the live GGLBET update, then use GGLBET Promotions, Guides, or Responsible Gaming tools when you are ready.",
      "開啟即時 GGLBET 更新後，再依需要使用 GGLBET 優惠、攻略或負責任博彩工具。",
    ) as unknown as string,
    primaryLabel: L(
      "Browse GGLBET promotions",
      "瀏覽 GGLBET 優惠",
    ) as unknown as string,
    primaryHref: ROUTES.promotions,
    secondaryLabel: L(
      "GGLBET responsible gaming",
      "GGLBET 負責任博彩",
    ) as unknown as string,
    secondaryHref: ROUTES.responsibleGaming,
  },
};
