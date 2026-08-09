import {
  DEFAULT_PROVIDER_LOGO_HEIGHT,
  DEFAULT_PROVIDER_LOGO_PATH,
  DEFAULT_PROVIDER_LOGO_WIDTH,
} from "@/constants/provider-media";
import { ROUTES } from "@/constants/routes";
import officialSnapshot from "@/lib/cms/seed/content/providers/official/gglbet5-providers.json";
import providerGameCounts from "@/lib/cms/seed/content/providers/official/provider-game-counts.json";
import * as zh from "@/lib/cms/seed/content/providers/zh-copy";
import {
  bulletList,
  ctaBlock,
  definition,
  faqBlock,
  heading,
  paragraph,
  summary,
  tipBox,
  tldr,
} from "@/lib/content/factories";
import { L, type LocalizedBlocks, type LocalizedString } from "@/lib/i18n";
import type { CmsImage } from "@/types/cms";
import type { ContentBlock } from "@/types/content";
import type { GameCategory } from "@/types/game";
import type { Provider, ProviderFaqItem } from "@/types/provider";

export type OfficialProviderBadge = {
  readonly name: string;
  readonly title: string;
} | null;

export type OfficialProviderRecord = {
  readonly code: string;
  readonly title: string;
  readonly icon: string | null;
  readonly badge: OfficialProviderBadge;
  readonly products: readonly string[];
  readonly slug: string;
  readonly logoUrl: string | null;
  readonly localLogoPath: string | null;
};

type LocalizedStringList = {
  readonly en: readonly string[];
  readonly zh: readonly string[];
};

type LocalizedFaq = readonly {
  readonly question: LocalizedString;
  readonly answer: LocalizedString;
}[];

/**
 * Official provider seed with bilingual CMS fields already filled.
 * Resolved to plain strings per locale in the repository layer.
 */
export type OfficialProviderSeedInput = Omit<
  Provider,
  | "content"
  | "tableOfContents"
  | "readingTimeMinutes"
  | "factChecked"
  | "publishDate"
  | "title"
  | "name"
  | "shortName"
  | "summary"
  | "metaTitle"
  | "metaDescription"
  | "heroTitle"
  | "heroDescription"
  | "intro"
  | "history"
  | "features"
  | "advantages"
  | "pros"
  | "cons"
  | "faq"
  | "volatilityGuide"
  | "securityNotes"
  | "fairPlayNotes"
  | "howToPlay"
  | "tips"
  | "whyChoose"
  | "categoryLabels"
  | "paymentMethods"
  | "supportedDevices"
  | "supportedPlatforms"
  | "supportedLanguages"
  | "ctaPrimaryLabel"
  | "ctaSecondaryLabel"
  | "author"
> & {
  readonly title: LocalizedString;
  readonly name: LocalizedString;
  readonly shortName: LocalizedString;
  readonly summary: LocalizedString;
  readonly metaTitle: LocalizedString;
  readonly metaDescription: LocalizedString;
  readonly heroTitle: LocalizedString;
  readonly heroDescription: LocalizedString;
  readonly intro: LocalizedString;
  readonly history: LocalizedString;
  readonly features: LocalizedStringList;
  readonly advantages: LocalizedStringList;
  readonly pros: LocalizedStringList;
  readonly cons: LocalizedStringList;
  readonly faq: LocalizedFaq;
  readonly volatilityGuide: LocalizedString;
  readonly securityNotes: LocalizedString;
  readonly fairPlayNotes: LocalizedString;
  readonly howToPlay: LocalizedStringList;
  readonly tips: LocalizedStringList;
  readonly whyChoose: LocalizedStringList;
  readonly categoryLabels: LocalizedStringList;
  readonly paymentMethods: LocalizedStringList;
  readonly supportedDevices: LocalizedStringList;
  readonly supportedPlatforms: LocalizedStringList;
  readonly supportedLanguages: LocalizedStringList;
  readonly ctaPrimaryLabel: LocalizedString;
  readonly ctaSecondaryLabel: LocalizedString;
  readonly author: {
    readonly id: string;
    readonly name: LocalizedString;
    readonly slug: string;
    readonly bio: LocalizedString;
  };
  readonly content: LocalizedBlocks;
};

function LL(
  en: readonly string[],
  zhList: readonly string[],
): LocalizedStringList {
  return { en, zh: zhList };
}

function LF(
  en: readonly ProviderFaqItem[],
  zhFaq: readonly ProviderFaqItem[],
): LocalizedFaq {
  return en.map((item, index) => ({
    question: L(item.question, zhFaq[index]?.question ?? item.question),
    answer: L(item.answer, zhFaq[index]?.answer ?? item.answer),
  }));
}

const AUTHOR = {
  id: "author-gglbet-editorial",
  name: L("GGLBET Editorial", zh.authorZh.name),
  slug: "gglbet-editorial",
  bio: L(
    "Catalog editors documenting GGLBET provider directory listings.",
    zh.authorZh.bio,
  ),
} as const;

const VERIFIED_DATE = "2026-08-06T00:00:00.000Z";
const SOURCE_SITE = "https://www.gglbet5.com";

const RELATED_GUIDE_SLUGS = [
  "how-to-get-started-on-gglbet",
  "slot-features-explained",
] as const;

const RELATED_PROMOTION_SLUGS = [
  "daily-188-free-spins-200-1026182",
  "spins-day-bet-day-990418",
  "drops-wins-114-000-000-daily-tournament-weekly-drops-936516",
] as const;

const RELATED_NEWS_SLUGS = [
  "slots-welcome-bonus-300-official-announcement",
  "drops-and-wins-114m-official-announcement",
] as const;

/**
 * Official API can emit duplicate slugs (same normalize, different codes).
 * Keep one record per slug so React keys and /provider/[slug] routes stay unique.
 */
function dedupeOfficialProviders(
  records: readonly OfficialProviderRecord[],
): OfficialProviderRecord[] {
  const bySlug = new Map<string, OfficialProviderRecord>();

  for (const record of records) {
    const slug = record.slug.trim().toLowerCase();
    const normalized: OfficialProviderRecord = { ...record, slug };
    const existing = bySlug.get(slug);
    if (!existing || providerRecordScore(normalized) > providerRecordScore(existing)) {
      bySlug.set(slug, normalized);
    }
  }

  return [...bySlug.values()];
}

function providerRecordScore(record: OfficialProviderRecord): number {
  let score = 0;
  if (record.localLogoPath) score += 10;
  if (record.logoUrl) score += 5;
  if (record.badge) score += 2;
  if (record.title !== record.title.toUpperCase()) score += 1;
  return score;
}

/**
 * Build CMS provider seeds exclusively from the gglbet5.com official snapshot.
 * English + Traditional Chinese SEO copy; no invented studio bios, RTP, or licenses.
 */
export function buildOfficialProviderSeeds(): readonly OfficialProviderSeedInput[] {
  const records = dedupeOfficialProviders(
    officialSnapshot.providers as readonly OfficialProviderRecord[],
  ).sort((a, b) =>
    a.title.localeCompare(b.title, "en", { sensitivity: "base" }),
  );

  const featuredSlugs = pickFeaturedSlugs(records);
  const allSlugs = records.map((r) => r.slug);

  return records.map((record, index) => {
    const relatedProviderSlugs = siblingSlugs(allSlugs, index, 4);
    const logo = buildLogo(record);
    const heroImage = {
      ...logo,
      id: `${logo.id}-hero`,
      alt: L(
        `${record.title} on GGLBET`,
        `${record.title}｜GGLBET`,
      ) as unknown as string,
    };
    const supportedGames = mapSupportedGames(record);
    const categoryLabelsEn = buildCategoryLabels(record, supportedGames);
    const featuresEn = buildFeatures(record);
    const faqEn = buildFaq(record);
    const summaryEn = `${record.title} is listed in the GGLBET casino provider directory (provider code ${record.code}).`;
    const introEn = buildIntro(record);
    const historyEn = buildBackground(record);
    const badgeLabel = record.badge?.title ?? null;
    const shortEn = shortNameFor(record.title);

    const summaryZh = zh.summaryZh(record);
    const introZh = zh.introZh(record);
    const historyZh = zh.historyZh(record);
    const featuresZh = zh.featuresZh(record);
    const faqZh = zh.faqZh(record);

    const contentEn = buildOfficialProviderBlocks(record, {
      summaryText: summaryEn,
      intro: introEn,
      history: historyEn,
      features: featuresEn,
      faq: faqEn,
      locale: "en",
    });
    const contentZh = buildOfficialProviderBlocks(record, {
      summaryText: summaryZh,
      intro: introZh,
      history: historyZh,
      features: featuresZh,
      faq: faqZh,
      locale: "zh",
    });

    const seed: OfficialProviderSeedInput = {
      id: `provider-gglbet5-${record.slug}-${record.code.toLowerCase()}`,
      slug: record.slug,
      title: L(record.title, record.title),
      locale: "en",
      createdAt: VERIFIED_DATE,
      updatedAt: VERIFIED_DATE,
      publishedAt: VERIFIED_DATE,
      lastUpdated: VERIFIED_DATE,
      name: L(record.title, record.title),
      shortName: L(shortEn, zh.shortNameForZh(record.title)),
      summary: L(summaryEn, summaryZh),
      metaTitle: L(
        `${record.title} — Casino Provider | GGLBET`,
        zh.metaTitleZh(record),
      ),
      metaDescription: L(
        summaryEn.slice(0, 155).replace(/\s+\S*$/, ""),
        zh.metaDescriptionZh(record),
      ),
      canonicalPath: `/provider/${record.slug}`,
      heroTitle: L(`${record.title} on GGLBET`, zh.heroTitleZh(record)),
      heroDescription: L(summaryEn, summaryZh),
      intro: L(introEn, introZh),
      history: L(historyEn, historyZh),
      features: LL(featuresEn, featuresZh),
      advantages: LL(
        [
          "Listed in the GGLBET casino provider directory",
          `Official provider code ${record.code} is published in the GGLBET directory`,
          ...(badgeLabel ? [`Catalog badge: ${badgeLabel}`] : []),
        ],
        zh.advantagesZh(record),
      ),
      supportedGames,
      popularGameSlugs: [],
      volatility: "mixed",
      volatilityGuide: L(
        "Volatility is title-specific. GGLBET does not invent studio-wide RTP or volatility figures from the provider directory listing alone—check each game information panel when available.",
        zh.volatilityGuideZh(),
      ),
      website: SOURCE_SITE,
      logo,
      heroImage,
      gallery: logo.url ? [logo] : [],
      rating: 0,
      reviewCount: 0,
      faq: LF(faqEn, faqZh),
      pros: LL(
        [
          "Available in the GGLBET provider directory",
          `Catalog code ${record.code} helps identify the listing across the platform`,
        ],
        zh.prosZh(record),
      ),
      cons: LL(
        [
          "This directory page summarizes the official catalog listing only—it is not a third-party studio biography",
          "Individual game counts, RTP, and release history are not published in the provider partners snapshot used here",
        ],
        zh.consZh(),
      ),
      licenses: [],
      supportedDevices: LL(
        ["Web", "Mobile browser"],
        zh.supportedDevicesZh(),
      ),
      supportedPlatforms: LL(
        ["Web browser", "Mobile browser"],
        zh.supportedPlatformsZh(),
      ),
      supportedLanguages: LL(["English"], zh.supportedLanguagesZh()),
      paymentMethods: LL(
        ["Uses GGLBET cashier methods after account login"],
        zh.paymentMethodsZh(),
      ),
      securityNotes: L(
        "Open provider titles only through authenticated GGLBET sessions. Do not use third-party mirrors or share account credentials.",
        zh.securityNotesZh(),
      ),
      fairPlayNotes: L(
        "Fair-play and RTP details are published per game when available. This provider page restates catalog presence only and does not invent studio math figures.",
        zh.fairPlayNotesZh(),
      ),
      howToPlay: LL(
        [
          `Open the ${record.title} provider page on GGLBET.`,
          `Use the games filter with provider=${record.slug} to browse matching catalog titles when they are linked.`,
          "Review each game information panel before playing.",
          "Set responsible-play limits before longer sessions.",
        ],
        zh.howToPlayZh(record),
      ),
      tips: LL(
        [
          "Treat this page as a GGLBET catalog directory entry, not a full studio dossier.",
          "Confirm live availability inside your signed-in GGLBET session.",
          "Compare sibling providers in the GGLBET directory when exploring the catalog.",
        ],
        zh.tipsZh(),
      ),
      whyChoose: LL(
        [
          "Listed in the GGLBET provider directory",
          `Provider code ${record.code}`,
          ...(badgeLabel ? [`Listed with ${badgeLabel} badge`] : []),
        ],
        zh.whyChooseZh(record),
      ),
      relatedProviderSlugs,
      relatedGuideSlugs: [...RELATED_GUIDE_SLUGS],
      relatedNewsSlugs: [...RELATED_NEWS_SLUGS],
      relatedPromotionSlugs: [...RELATED_PROMOTION_SLUGS],
      schema: {
        type: "Organization",
        additionalType: "SoftwareApplication",
      },
      author: AUTHOR,
      status: "published",
      sortOrder: (index + 1) * 10,
      featured: featuredSlugs.has(record.slug),
      categoryLabels: LL(
        categoryLabelsEn,
        zh.categoryLabelsZh(record, supportedGames),
      ),
      gameCount:
        (
          providerGameCounts.counts as Readonly<Record<string, number>>
        )[record.code] ?? 0,
      ctaPrimaryLabel: L(
        `Browse ${shortEn} games`,
        zh.ctaPrimaryLabelZh(record),
      ),
      ctaPrimaryHref: `${ROUTES.games}?provider=${record.slug}`,
      ctaSecondaryLabel: L("All providers", zh.ctaSecondaryLabelZh()),
      ctaSecondaryHref: ROUTES.providers,
      content: { en: contentEn, zh: contentZh },
    };

    return seed;
  });
}

function buildOfficialProviderBlocks(
  record: OfficialProviderRecord,
  copy: {
    readonly summaryText: string;
    readonly intro: string;
    readonly history: string;
    readonly features: readonly string[];
    readonly faq: readonly ProviderFaqItem[];
    readonly locale: "en" | "zh";
  },
): readonly ContentBlock[] {
  const short =
    copy.locale === "zh"
      ? zh.shortNameForZh(record.title)
      : shortNameFor(record.title);
  const isZh = copy.locale === "zh";

  return [
    tldr(copy.summaryText),
    definition(
      record.title,
      isZh
        ? zh.definitionZh(record)
        : `${record.title} is a casino software provider listed in the GGLBET provider directory (code ${record.code}).`,
    ),
    heading(
      isZh ? zh.headingBackgroundZh() : "Background",
      "background",
    ),
    paragraph(copy.intro),
    paragraph(copy.history),
    heading(
      isZh ? zh.headingFeaturesZh() : "Catalog features",
      "features",
    ),
    paragraph(
      isZh
        ? zh.featuresSectionIntroZh()
        : "The following facts come from official provider listings and verified GGLBET platform data. No studio founding story or third-party review claims are added here.",
    ),
    bulletList(
      copy.features,
      isZh ? zh.featuresListTitleZh() : "Official catalog facts",
    ),
    heading(
      isZh ? zh.headingFaqZh() : "Frequently asked questions",
      "faq",
    ),
    faqBlock(copy.faq),
    heading(isZh ? zh.headingSummaryZh() : "Summary", "summary"),
    summary(copy.summaryText),
    tipBox(
      isZh ? zh.tipBoxTitleZh() : "Provider Information",
      isZh
        ? zh.tipBoxBodyZh()
        : "Provider names, game counts, and catalog information are compiled from official provider listings and verified GGLBET platform data. If the live lobby differs, confirm inside your signed-in GGLBET session.",
    ),
    ctaBlock({
      heading: isZh
        ? zh.ctaBlockHeadingZh(record)
        : `Play ${short} games on GGLBET`,
      body: isZh
        ? zh.ctaBlockBodyZh()
        : "Open the GGLBET games catalog filtered by this provider, or return to the full GGLBET provider directory.",
      primary: {
        label: isZh
          ? zh.ctaPrimaryLabelZh(record)
          : `Browse ${short} games`,
        href: `${ROUTES.games}?provider=${record.slug}`,
        variant: "primary",
      },
      secondary: {
        label: isZh ? zh.ctaSecondaryLabelZh() : "All providers",
        href: ROUTES.providers,
        variant: "outline",
      },
    }),
  ];
}

function buildLogo(record: OfficialProviderRecord): CmsImage {
  const url = record.localLogoPath || DEFAULT_PROVIDER_LOGO_PATH;
  return {
    id: `logo-${record.slug}-${record.code.toLowerCase()}`,
    url,
    alt: L(
      `${record.title} logo`,
      `${record.title} 標誌`,
    ) as unknown as string,
    width: DEFAULT_PROVIDER_LOGO_WIDTH,
    height: DEFAULT_PROVIDER_LOGO_HEIGHT,
  };
}

function mapSupportedGames(
  record: OfficialProviderRecord,
): readonly GameCategory[] {
  const categories = new Set<GameCategory>();
  for (const product of record.products) {
    const key = product.toLowerCase();
    if (key === "casino" || key === "slots") categories.add("slots");
    if (key === "live-casino" || key === "live") categories.add("live-casino");
  }
  if (/\blive\b/i.test(record.title)) {
    categories.add("live-casino");
  }
  if (categories.size === 0) categories.add("slots");
  return [...categories];
}

function buildCategoryLabels(
  record: OfficialProviderRecord,
  supportedGames: readonly GameCategory[],
): readonly string[] {
  const labels: string[] = [];
  if (supportedGames.includes("slots")) labels.push("Casino");
  if (supportedGames.includes("live-casino")) labels.push("Live Casino");
  if (record.badge?.title) labels.push(record.badge.title);
  return labels.length > 0 ? labels : ["Casino"];
}

function buildFeatures(record: OfficialProviderRecord): readonly string[] {
  const badge = record.badge?.title;
  return [
    "Available in the GGLBET provider directory",
    `Official provider code: ${record.code}`,
    `Catalog products: ${record.products.join(", ") || "casino"}`,
    ...(badge ? [`Catalog badge: ${badge}`] : []),
    ...(record.localLogoPath
      ? ["Official provider logo available in the GGLBET directory"]
      : ["Directory listing without a local logo asset in this snapshot"]),
  ];
}

function buildIntro(record: OfficialProviderRecord): string {
  const badge = record.badge
    ? ` The listing carries a ${record.badge.title} badge in the catalog.`
    : "";
  return `${record.title} is listed in the GGLBET casino provider directory with code ${record.code}. GGLBET publishes this directory entry so players can find the studio in the provider index and filter games when titles are linked.${badge}`;
}

function buildBackground(record: OfficialProviderRecord): string {
  return `${record.title} is included on GGLBET because it appears in verified GGLBET platform provider listings. Products published for this listing: ${record.products.join(", ") || "casino"}. This page does not invent founding year, country, licenses, RTP, or third-party studio biographies—only catalog framing for discovery on GGLBET.`;
}

function buildFaq(record: OfficialProviderRecord): readonly ProviderFaqItem[] {
  const short = shortNameFor(record.title);
  return [
    {
      question: `Is ${record.title} a GGLBET casino provider?`,
      answer: `Yes. ${record.title} is listed in the GGLBET casino provider directory (slug ${record.slug}). GGLBET publishes this provider page so players can discover the studio, read catalog framing, and jump into the GGLBET games filter without inventing studio biographies. If the signed-in GGLBET lobby differs, follow the live lobby—directory pages orient discovery, they do not override availability.`,
    },
    {
      question: `What is the provider code for ${record.title} on GGLBET?`,
      answer: `GGLBET publishes code ${record.code} for ${record.title}. GGLBET keeps that code visible so catalog relationships stay traceable when you filter GGLBET games by provider. The code is catalog metadata—not a player password, bonus code, or invented ranking.`,
    },
    {
      question: `How do I browse ${record.title} games on GGLBET?`,
      answer: `Open the GGLBET Games directory and filter with provider=${record.slug}, or use the primary CTA on this GGLBET provider page. Linked titles help you move from the ${short} studio page into playable catalog entries. Live tables and slots still depend on your authenticated GGLBET session, so treat directory links as discovery paths and confirm the lobby before depositing.`,
    },
    {
      question: `How many games does ${record.title} show on GGLBET?`,
      answer: `GGLBET displays a real game count for ${record.title} when catalog titles are linked to this provider code. Counts help Malaysia-focused players compare GGLBET providers by footprint, but they are not a promise that every title is available in your region after login. If a count looks different from your lobby, trust the signed-in catalog.`,
    },
    {
      question: `Does this GGLBET provider page invent RTP or founding-year claims?`,
      answer: `No. GGLBET does not invent RTP, licenses, founding year, or third-party awards on ${record.title} pages when those fields are absent from verified platform data. Prefer empty fields over guesses. For title-level RTP notes, open individual GGLBET game pages only when figures are published—and still confirm inside the live information panel.`,
    },
    {
      question: `Where does GGLBET get ${record.title} provider information?`,
      answer: `Provider names, game counts, and catalog information for ${record.title} on GGLBET are compiled from official provider listings and verified GGLBET platform data. GGLBET rewrites structure for clarity while keeping catalog facts aligned. Unofficial agent sites are not sources for this GGLBET provider entry.`,
    },
    {
      question: `How often are GGLBET provider pages like ${record.title} updated?`,
      answer: `GGLBET refreshes provider directory entries when verified platform catalog data or linked game relationships change. Editorial updates improve clarity on GGLBET, but the signed-in GGLBET lobby remains the availability source of truth. Revisit this ${record.title} page when you need studio context, then return to GGLBET Games to play.`,
    },
    {
      question: `Why should I read the ${record.title} page before playing on GGLBET?`,
      answer: `The GGLBET provider page for ${record.title} explains who builds the titles, which product categories are listed, and how to filter related GGLBET games. That context reduces blind thumbnail clicking and supports EEAT-style transparency. Pair it with responsible-gaming limits before longer sessions on GGLBET.`,
    },
    ...(record.badge
      ? [
          {
            question: `What does the ${record.badge.title} badge mean for ${record.title} on GGLBET?`,
            answer: `The ${record.badge.title} badge is catalog metadata published for ${record.title} on GGLBET. It is not an independent GGLBET review score and does not guarantee outcomes. Use it as a discovery cue, then evaluate games individually inside the live client.`,
          },
        ]
      : []),
  ];
}

function shortNameFor(title: string): string {
  if (title.length <= 22) return title;
  const first = title.split(/\s+/)[0] ?? title;
  return first.length <= 22 ? first : title.slice(0, 22).trim();
}

function pickFeaturedSlugs(
  records: readonly OfficialProviderRecord[],
): ReadonlySet<string> {
  const featured = new Set<string>();
  for (const record of records) {
    const badgeName = record.badge?.name?.toLowerCase();
    if (badgeName === "top" || badgeName === "jackpot" || badgeName === "hot") {
      featured.add(record.slug);
    }
  }
  for (const record of records) {
    if (featured.size >= 12) break;
    featured.add(record.slug);
  }
  return featured;
}

function siblingSlugs(
  allSlugs: readonly string[],
  index: number,
  count: number,
): readonly string[] {
  const result: string[] = [];
  let left = index - 1;
  let right = index + 1;
  while (result.length < count && (left >= 0 || right < allSlugs.length)) {
    if (left >= 0) {
      result.push(allSlugs[left]!);
      left -= 1;
    }
    if (result.length >= count) break;
    if (right < allSlugs.length) {
      result.push(allSlugs[right]!);
      right += 1;
    }
  }
  return result;
}
