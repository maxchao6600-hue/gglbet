import { guidesFaqItems } from "@/lib/cms/seed/faq/guides-faq";
import {
  ROUTES,
  getGuideCategoryHref,
  getGuideHref,
} from "@/constants/routes";
import { createPlaceholderImage } from "@/lib/cms/media";
import {
  getGuideLongformBlocks,
  getGuideLongformSections,
} from "@/lib/cms/seed/content/guides";
import { resolveGuideCoverImage } from "@/lib/guides/artwork";
import { generateGuideContent } from "@/lib/content/generator";
import { estimateReadingTimeMinutes } from "@/lib/content/reading-meta";
import { buildTocFromBlocks } from "@/lib/content/toc";
import type {
  Guide,
  GuideCategory,
  GuideCategorySlug,
  GuideDifficulty,
  GuidesPageContent,
} from "@/types/guide";

const AUTHOR = {
  id: "author-gglbet-editorial",
  name: "GGLBET Editorial",
  slug: "gglbet-editorial",
  role: "Editor",
  bio: "Product and trust-focused writers covering casino education, payments, and safer play.",
} as const;

const REVIEWER = {
  id: "reviewer-trust",
  name: "GGLBET Trust Desk",
  slug: "gglbet-trust-desk",
  role: "Reviewer",
  bio: "Reviews guides for clarity, accuracy, and responsible-gaming alignment.",
} as const;

type CategorySeed = {
  readonly slug: GuideCategorySlug;
  readonly name: string;
  readonly shortName: string;
  readonly heroTitle: string;
  readonly heroDescription: string;
  readonly intro: string;
  readonly seoContent: string;
  readonly sortOrder: number;
  readonly featured?: boolean;
  readonly tone?: "brand" | "secondary" | "neutral" | "accent";
};

function createCategory(input: CategorySeed): GuideCategory {
  return {
    id: `guide-category-${input.slug}`,
    slug: input.slug,
    name: input.name,
    shortName: input.shortName,
    metaTitle: `${input.name} | GGLBET Casino Guides`,
    metaDescription: `${input.intro} Browse ${input.name.toLowerCase()} on GGLBET with clear educational content for GGLBET players.`,
    canonicalPath: getGuideCategoryHref(input.slug),
    heroTitle: input.heroTitle,
    heroDescription: input.heroDescription,
    intro: input.intro,
    seoContent: input.seoContent,
    coverImage: createPlaceholderImage(
      `${input.name} cover`,
      input.tone ?? "brand",
    ),
    faq: [
      {
        question: `What GGLBET guides will I find in ${input.name}?`,
        answer: `${input.name} on GGLBET collects educational articles for ${input.shortName.toLowerCase()} topics—written so GGLBET players can complete practical tasks such as register, login, deposit, withdraw, or safer play without guessing. Each guide links back into GGLBET games, providers, promotions, or responsible-gaming resources when relevant. Browse this GGLBET category hub first, then open a single guide for step-by-step detail. Facts about live bonuses still belong on official promotion pages; guides teach process, not invented offers.`,
      },
      {
        question: `How do ${input.shortName} guides help me use GGLBET better?`,
        answer: `GGLBET ${input.shortName.toLowerCase()} guides break high-intent actions into readable steps so you spend less time hunting menus and more time deciding responsibly. They explain what to prepare before GGLBET login or payments, which screens to open, and which mistakes to avoid. Use them alongside the GGLBET FAQ hub when you need a short answer, then return to the guide for depth. Updates are reflected through each guide’s updated date on GGLBET.`,
      },
      {
        question: `Are ${input.name} articles official GGLBET education?`,
        answer: `Yes. These ${input.shortName.toLowerCase()} articles are published on the GGLBET guides knowledge base for the GGLBET content hub. They are educational SEO pages—not third-party forum tips. When a topic depends on live cashier figures, GGLBET guides tell you to confirm inside your signed-in session rather than inventing numbers here.`,
      },
      {
        question: `How often does GGLBET refresh ${input.shortName} guides?`,
        answer: `GGLBET editors refresh ${input.shortName.toLowerCase()} guides when product journeys, payment education, or safer-play guidance changes. Each GGLBET guide stores an updated date so you can see freshness at a glance. If something differs from the live GGLBET lobby, follow the live product—guides orient you; they do not override the cashier.`,
      },
      {
        question: `Can beginners start with ${input.name} on GGLBET?`,
        answer: `${input.name} is designed so newcomers can enter GGLBET topics without assuming advanced casino jargon. Start with one GGLBET guide, complete the checklist mindset (limits, verification, official links), then explore related GGLBET categories. Pair education with responsible-gaming tools before longer sessions.`,
      },
      {
        question: `Do ${input.shortName} guides link to GGLBET games and providers?`,
        answer: `Where helpful, GGLBET ${input.shortName.toLowerCase()} guides include internal links to GGLBET games, providers, promotions, news, or support pages so you can move from education into action without orphan pages. Links are discovery aids—always re-check live availability after GGLBET login.`,
      },
      {
        question: `What should I do after reading a GGLBET ${input.shortName} guide?`,
        answer: `After a GGLBET ${input.shortName.toLowerCase()} guide, either practice the steps on official GGLBET register/login/payment screens, open a related guide category, or visit responsible gaming if you need limits. Do not skip verification or terms because a guide made the flow feel simple—GGLBET education accelerates clarity, not risk-taking.`,
      },
      {
        question: `Where else can I ask GGLBET questions about ${input.shortName}?`,
        answer: `Use the GGLBET FAQ hub for short answers, GGLBET Contact for account-specific support, and other GGLBET guide categories when your question spans payments, security, or app download. Keeping questions on official GGLBET surfaces reduces phishing risk from unofficial “help” pages.`,
      },
    ],
    featured: input.featured ?? false,
    sortOrder: input.sortOrder,
    status: "published",
    ctaPrimaryLabel: "Browse GGLBET Guides",
    ctaPrimaryHref: ROUTES.guides,
    ctaSecondaryLabel: "Register on GGLBET",
    ctaSecondaryHref: ROUTES.register,
  };
}

export const guideCategoriesSeed: readonly GuideCategory[] = [
  createCategory({
    slug: "beginner",
    name: "Beginner Guides",
    shortName: "Beginner",
    heroTitle: "GGLBET beginner guides",
    heroDescription:
      "Start with GGLBET account basics, safer play habits, and how to browse the GGLBET catalog confidently.",
    intro:
      "GGLBET beginner guides help new players understand GGLBET registration, navigation, and responsible first sessions.",
    seoContent:
      "Use GGLBET beginner guides before your first GGLBET deposit so expectations, tools, and limits are clear.",
    sortOrder: 10,
    featured: true,
    tone: "brand",
  }),
  createCategory({
    slug: "casino",
    name: "Casino Guides",
    shortName: "Casino",
    heroTitle: "GGLBET casino platform guides",
    heroDescription:
      "Learn how GGLBET lobbies, categories, and studio pages fit together.",
    intro:
      "GGLBET casino guides explain GGLBET platform navigation, catalog structure, and how to compare experiences on GGLBET.",
    seoContent:
      "GGLBET casino guides strengthen topical authority around lobby discovery and studio context on GGLBET.",
    sortOrder: 20,
    featured: true,
    tone: "secondary",
  }),
  createCategory({
    slug: "slots",
    name: "Slot Guides",
    shortName: "Slots",
    heroTitle: "GGLBET slot guides",
    heroDescription:
      "Understand RTP notes, volatility, features, and how to evaluate GGLBET slot pages.",
    intro:
      "GGLBET slot guides translate mechanics into plain language so players can compare GGLBET titles thoughtfully.",
    seoContent:
      "GGLBET slot guides support long-tail discovery for features, volatility, and provider catalogs on GGLBET.",
    sortOrder: 30,
    featured: true,
    tone: "accent",
  }),
  createCategory({
    slug: "live-casino",
    name: "Live Casino Guides",
    shortName: "Live Casino",
    heroTitle: "GGLBET live casino guides",
    heroDescription:
      "Learn table etiquette, stream quality cues, and mobile live-play basics on GGLBET.",
    intro:
      "GGLBET live casino guides cover roulette, baccarat, and dealer-led experiences with practical tips for GGLBET tables.",
    seoContent:
      "GGLBET live casino guides build trust around real-time play and device readiness on GGLBET.",
    sortOrder: 40,
    featured: true,
    tone: "secondary",
  }),
  createCategory({
    slug: "sports",
    name: "Sports Betting Guides",
    shortName: "Sports",
    heroTitle: "GGLBET sports betting guides",
    heroDescription:
      "Read GGLBET markets, slips, and responsible staking concepts in plain language.",
    intro:
      "GGLBET sports guides focus on clarity—markets, odds reading, and session discipline on GGLBET.",
    seoContent:
      "GGLBET sports betting guides expand the knowledge base into event-based entertainment on GGLBET.",
    sortOrder: 50,
    tone: "neutral",
  }),
  createCategory({
    slug: "fishing",
    name: "Fishing Guides",
    shortName: "Fishing",
    heroTitle: "GGLBET fishing guides",
    heroDescription:
      "Learn room pacing, target basics, and short-session habits for GGLBET fishing titles.",
    intro:
      "GGLBET fishing guides help players understand arcade-style shooting games on GGLBET.",
    seoContent:
      "GGLBET fishing guides support category-level discovery for mobile-first arcade sessions on GGLBET.",
    sortOrder: 60,
    tone: "accent",
  }),
  createCategory({
    slug: "lottery",
    name: "Lottery Guides",
    shortName: "Lottery",
    heroTitle: "GGLBET lottery guides",
    heroDescription:
      "Understand draw formats, ticket basics, and result timing expectations on GGLBET.",
    intro:
      "GGLBET lottery guides explain draw-style rounds with transparent pacing notes on GGLBET.",
    seoContent:
      "GGLBET lottery guides help players compare fast-draw experiences responsibly on GGLBET.",
    sortOrder: 70,
    tone: "brand",
  }),
  createCategory({
    slug: "promotions",
    name: "Promotion Guides",
    shortName: "Promotions",
    heroTitle: "GGLBET promotion guides",
    heroDescription:
      "Learn how to read GGLBET offer terms, wagering notes, and eligibility basics.",
    intro:
      "GGLBET promotion guides teach players to evaluate GGLBET offers before opting in.",
    seoContent:
      "GGLBET promotion guides reduce confusion and support transparent campaign communication on GGLBET.",
    sortOrder: 80,
    featured: true,
    tone: "secondary",
  }),
  createCategory({
    slug: "payments",
    name: "Payment Guides",
    shortName: "Payments",
    heroTitle: "GGLBET payment guides",
    heroDescription:
      "GGLBET deposit and withdrawal walkthroughs with checklist-style clarity.",
    intro:
      "GGLBET payment guides cover cashier basics, verification reminders, and timing expectations on GGLBET.",
    seoContent:
      "GGLBET payment guides strengthen trust signals around deposits and withdrawals on GGLBET.",
    sortOrder: 90,
    featured: true,
    tone: "neutral",
  }),
  createCategory({
    slug: "vip",
    name: "VIP Guides",
    shortName: "VIP",
    heroTitle: "GGLBET VIP guides",
    heroDescription:
      "Understand GGLBET loyalty tiers, rewards context, and how VIP support differs.",
    intro:
      "GGLBET VIP guides explain programme structure without overpromising outcomes.",
    seoContent:
      "GGLBET VIP guides help members navigate loyalty benefits with clear expectations on GGLBET.",
    sortOrder: 100,
    tone: "brand",
  }),
  createCategory({
    slug: "security",
    name: "Security Guides",
    shortName: "Security",
    heroTitle: "GGLBET account security guides",
    heroDescription:
      "Practical steps for safer GGLBET logins, device hygiene, and account protection.",
    intro:
      "GGLBET security guides focus on habits that protect GGLBET accounts and personal details.",
    seoContent:
      "GGLBET security guides reinforce EEAT and player trust across the GGLBET knowledge base.",
    sortOrder: 110,
    tone: "secondary",
  }),
  createCategory({
    slug: "responsible-gaming",
    name: "Responsible Gaming",
    shortName: "Safer Play",
    heroTitle: "GGLBET responsible gaming guides",
    heroDescription:
      "GGLBET tools, limits, and healthier play habits for long-term entertainment.",
    intro:
      "GGLBET responsible gaming guides center player wellbeing and practical control tools on GGLBET.",
    seoContent:
      "Safer-play education is a core pillar of the GGLBET Guides knowledge base.",
    sortOrder: 120,
    featured: true,
    tone: "accent",
  }),
  createCategory({
    slug: "app-download",
    name: "App Download Guides",
    shortName: "App Download",
    heroTitle: "GGLBET app download guides",
    heroDescription:
      "Install, update, and access GGLBET on mobile with clear steps.",
    intro:
      "GGLBET app download guides walk through installation paths and mobile access basics for GGLBET.",
    seoContent:
      "GGLBET download guides support conversion intent while keeping steps accessible on GGLBET.",
    sortOrder: 130,
    tone: "brand",
  }),
  createCategory({
    slug: "troubleshooting",
    name: "Troubleshooting",
    shortName: "Troubleshooting",
    heroTitle: "GGLBET troubleshooting guides",
    heroDescription:
      "Fix common GGLBET login, payment, and game-load issues with structured checklists.",
    intro:
      "GGLBET troubleshooting guides help players resolve issues before contacting GGLBET support.",
    seoContent:
      "GGLBET troubleshooting guides reduce friction and capture helpful long-tail queries on GGLBET.",
    sortOrder: 140,
    tone: "neutral",
  }),
];

type GuideSeedInput = {
  readonly id: string;
  readonly slug: string;
  readonly category: GuideCategorySlug;
  readonly subCategory: string;
  readonly title: string;
  readonly excerpt: string;
  readonly publishDate: string;
  readonly updatedDate?: string;
  readonly difficulty: GuideDifficulty;
  readonly readingTime: number;
  readonly featured?: boolean;
  readonly popular?: boolean;
  readonly sortOrder: number;
  readonly tags: readonly string[];
  readonly keywords: readonly string[];
  readonly relatedGuideSlugs?: readonly string[];
  readonly relatedProviderSlugs?: readonly string[];
  readonly relatedGameSlugs?: readonly string[];
  readonly relatedCategorySlugs?: readonly GuideCategorySlug[];
  readonly tone?: "brand" | "secondary" | "neutral" | "accent";
};

function createGuide(input: GuideSeedInput): Guide {
  const updatedDate = input.updatedDate ?? input.publishDate;
  const canonicalPath = getGuideHref(input.category, input.slug);
  const tone = input.tone ?? "brand";
  const article = getGuideLongformSections(input.slug);
  const longform = getGuideLongformBlocks(input.slug);

  const tips = (article?.tips ?? [
    "Skim the table of contents before deep reading.",
    "Cross-check product pages for live figures and eligibility.",
    "Set session limits when moving from learning to playing.",
  ]) as readonly string[];

  const warnings = (article?.warnings ?? [
    "Guides are educational and do not guarantee outcomes.",
    "Ignore unsolicited messages asking for account credentials.",
  ]) as readonly string[];

  const bestPractices = (article?.bestPractices ?? [
    "Keep one intentional goal per session.",
    "Use related internal links to deepen understanding gradually.",
    "Revisit updatedDate when returning to an older guide.",
  ]) as readonly string[];

  const faq = (article?.faq ?? [
    {
      question: `Who is ${input.title} for?`,
      answer: `This guide is written for players at a ${input.difficulty} level who want clear, actionable education on GGLBET.`,
    },
    {
      question: "Can I trust the update date?",
      answer:
        "Yes. updatedDate is a CMS field and appears on the page for transparency.",
    },
    {
      question: "Where should I go after reading?",
      answer:
        "Use related guides, the category hub, or linked games and providers depending on your next goal.",
    },
  ]) as Guide["faq"];

  const ctaPrimaryLabel = article?.ctaPrimaryLabel ?? "Browse GGLBET games";
  const ctaPrimaryHref = article?.ctaPrimaryHref ?? ROUTES.games;
  const ctaSecondaryLabel = article?.ctaSecondaryLabel ?? "Browse category";
  const ctaSecondaryHref =
    article?.ctaSecondaryHref ?? getGuideCategoryHref(input.category);

  const generated = generateGuideContent({
    title: input.title,
    excerpt: article?.tldr ?? input.excerpt,
    category: input.category,
    tips,
    warnings,
    bestPractices,
    faq,
    difficulty: input.difficulty,
    ctaPrimaryLabel,
    ctaPrimaryHref,
    ctaSecondaryLabel,
    ctaSecondaryHref,
    steps: article?.steps,
  });

  const content = longform && longform.length > 0 ? longform : generated.blocks;
  const tableOfContents =
    longform && longform.length > 0
      ? buildTocFromBlocks(longform)
      : generated.tableOfContents;
  const readingTime =
    longform && longform.length > 0
      ? estimateReadingTimeMinutes(longform)
      : input.readingTime;

  return {
    id: input.id,
    slug: input.slug,
    title: input.title,
    locale: "en",
    createdAt: input.publishDate,
    updatedAt: updatedDate,
    publishedAt: input.publishDate,
    category: input.category,
    subCategory: input.subCategory,
    metaTitle: `${input.title} | GGLBET Guides`,
    metaDescription: (article?.tldr ?? input.excerpt)
      .slice(0, 155)
      .replace(/\s+\S*$/, ""),
    canonicalPath,
    excerpt: article?.tldr ?? input.excerpt,
    heroTitle: input.title,
    heroDescription: article?.tldr ?? input.excerpt,
    coverImage:
      resolveGuideCoverImage({
        slug: input.slug,
        title: input.title,
        excerpt: article?.tldr ?? input.excerpt,
      }) ?? createPlaceholderImage(`${input.title} cover`, tone),
    gallery: [
      createPlaceholderImage(`${input.title} gallery one`, tone),
      createPlaceholderImage(`${input.title} gallery two`, "secondary"),
    ],
    content,
    tableOfContents,
    tips,
    warnings,
    bestPractices,
    difficulty: input.difficulty,
    readingTime,
    tags: input.tags,
    keywords: input.keywords,
    author: AUTHOR,
    reviewer: REVIEWER,
    publishDate: input.publishDate,
    updatedDate,
    faq,
    relatedGameSlugs:
      article?.relatedGameSlugs ?? input.relatedGameSlugs ?? [],
    relatedProviderSlugs:
      article?.relatedProviderSlugs ?? input.relatedProviderSlugs ?? [],
    relatedGuideSlugs:
      article?.relatedGuideSlugs ?? input.relatedGuideSlugs ?? [],
    relatedPromotionSlugs: article?.relatedPromotionSlugs ?? [],
    relatedNewsSlugs: article?.relatedNewsSlugs ?? [],
    relatedCategorySlugs: input.relatedCategorySlugs ?? [input.category],
    featured: input.featured ?? false,
    popular: input.popular ?? false,
    status: "published",
    sortOrder: input.sortOrder,
    schema: {
      type: "Article",
      articleSection: input.category,
    },
    ctaPrimaryLabel,
    ctaPrimaryHref,
    ctaSecondaryLabel,
    ctaSecondaryHref,
  };
}

export const guidesSeed: readonly Guide[] = [
  createGuide({
    id: "guide-beginner-start",
    slug: "how-to-get-started-on-gglbet",
    category: "beginner",
    subCategory: "getting-started",
    title: "How to get started on GGLBET",
    excerpt:
      "A calm first-session path covering registration mindset, navigation, and safer-play setup.",
    publishDate: "2026-01-10T08:00:00.000Z",
    updatedDate: "2026-03-01T08:00:00.000Z",
    difficulty: "beginner",
    readingTime: 6,
    featured: true,
    popular: true,
    sortOrder: 10,
    tags: ["beginner", "register", "safer-play"],
    keywords: ["get started gglbet", "beginner casino guide"],
    relatedGuideSlugs: ["responsible-gaming-limits-checklist", "payments-checklist"],
    relatedCategorySlugs: ["beginner", "responsible-gaming", "payments"],
    tone: "brand",
  }),
  createGuide({
    id: "guide-slot-features",
    slug: "slot-features-explained",
    category: "slots",
    subCategory: "mechanics",
    title: "Slot features explained",
    excerpt:
      "Decode free spins, cascades, and volatility labels before opening a slot page.",
    publishDate: "2026-01-22T08:00:00.000Z",
    updatedDate: "2026-02-18T08:00:00.000Z",
    difficulty: "beginner",
    readingTime: 8,
    featured: true,
    popular: true,
    sortOrder: 20,
    tags: ["slots", "features", "rtp"],
    keywords: ["slot features", "volatility guide"],
    relatedGuideSlugs: ["how-to-get-started-on-gglbet"],
    relatedProviderSlugs: ["pragmatic-play", "pg-soft"],
    relatedGameSlugs: ["sweet-bonanza-xmas", "cosmic-clusters"],
    relatedCategorySlugs: ["slots", "casino"],
    tone: "accent",
  }),
  createGuide({
    id: "guide-live-path",
    slug: "beginner-path-to-live-casino",
    category: "live-casino",
    subCategory: "getting-started",
    title: "Beginner path to live casino",
    excerpt:
      "Learn table basics, mobile stream cues, and how to pick your first live experience.",
    publishDate: "2026-02-05T08:00:00.000Z",
    difficulty: "beginner",
    readingTime: 7,
    featured: true,
    popular: true,
    sortOrder: 30,
    tags: ["live-casino", "beginner"],
    keywords: ["live casino beginner", "baccarat roulette basics"],
    relatedGuideSlugs: ["how-to-get-started-on-gglbet"],
    relatedProviderSlugs: ["evolution", "pragmatic-play-live"],
    relatedGameSlugs: ["fireball-roulette", "lightning-blackjack"],
    relatedCategorySlugs: ["live-casino", "beginner"],
    tone: "secondary",
  }),
  createGuide({
    id: "guide-payments",
    slug: "payments-checklist",
    category: "payments",
    subCategory: "cashier",
    title: "Payments checklist for deposits and withdrawals",
    excerpt:
      "A structured checklist for cashier readiness, verification reminders, and timing expectations.",
    publishDate: "2026-02-12T08:00:00.000Z",
    updatedDate: "2026-03-15T08:00:00.000Z",
    difficulty: "intermediate",
    readingTime: 9,
    featured: true,
    popular: true,
    sortOrder: 40,
    tags: ["payments", "deposit", "withdrawal"],
    keywords: ["gglbet payments", "deposit checklist"],
    relatedGuideSlugs: ["how-to-get-started-on-gglbet", "account-security-basics"],
    relatedCategorySlugs: ["payments", "security"],
    tone: "neutral",
  }),
  createGuide({
    id: "guide-rg",
    slug: "responsible-gaming-limits-checklist",
    category: "responsible-gaming",
    subCategory: "limits",
    title: "Responsible gaming limits checklist",
    excerpt:
      "Set deposit, loss, and session limits before entertainment turns into pressure.",
    publishDate: "2026-02-20T08:00:00.000Z",
    difficulty: "beginner",
    readingTime: 5,
    featured: true,
    popular: true,
    sortOrder: 50,
    tags: ["responsible-gaming", "limits"],
    keywords: ["responsible gaming", "session limits"],
    relatedGuideSlugs: ["how-to-get-started-on-gglbet"],
    relatedCategorySlugs: ["responsible-gaming", "beginner"],
    tone: "accent",
  }),
  createGuide({
    id: "guide-security",
    slug: "account-security-basics",
    category: "security",
    subCategory: "account",
    title: "Account security basics",
    excerpt:
      "Protect logins with stronger habits, device hygiene, and phishing awareness.",
    publishDate: "2026-03-02T08:00:00.000Z",
    difficulty: "beginner",
    readingTime: 6,
    popular: true,
    sortOrder: 60,
    tags: ["security", "account"],
    keywords: ["account security", "phishing"],
    relatedGuideSlugs: ["payments-checklist", "troubleshooting-game-wont-load"],
    relatedCategorySlugs: ["security", "troubleshooting"],
    tone: "secondary",
  }),
  createGuide({
    id: "guide-app",
    slug: "how-to-download-the-gglbet-app",
    category: "app-download",
    subCategory: "install",
    title: "How to download the GGLBET app",
    excerpt:
      "Follow a clear install path for mobile access and keep your app updated safely.",
    publishDate: "2026-03-08T08:00:00.000Z",
    difficulty: "beginner",
    readingTime: 4,
    featured: true,
    sortOrder: 70,
    tags: ["app", "download", "mobile"],
    keywords: ["gglbet app download"],
    relatedGuideSlugs: ["troubleshooting-game-wont-load"],
    relatedCategorySlugs: ["app-download", "troubleshooting"],
    tone: "brand",
  }),
  createGuide({
    id: "guide-trouble",
    slug: "troubleshooting-game-wont-load",
    category: "troubleshooting",
    subCategory: "gamesplay",
    title: "Troubleshooting: game wonâ€™t load",
    excerpt:
      "Work through connection, cache, and account checks when a title fails to open.",
    publishDate: "2026-03-18T08:00:00.000Z",
    difficulty: "intermediate",
    readingTime: 7,
    popular: true,
    sortOrder: 80,
    tags: ["troubleshooting", "games"],
    keywords: ["game wonâ€™t load", "gglbet troubleshooting"],
    relatedGuideSlugs: ["how-to-download-the-gglbet-app", "account-security-basics"],
    relatedCategorySlugs: ["troubleshooting", "app-download"],
    tone: "neutral",
  }),
  createGuide({
    id: "guide-promo",
    slug: "how-to-read-promotion-terms",
    category: "promotions",
    subCategory: "terms",
    title: "How to read promotion terms",
    excerpt:
      "Spot wagering notes, eligibility rules, and expiry cues before you opt in.",
    publishDate: "2026-03-20T08:00:00.000Z",
    difficulty: "intermediate",
    readingTime: 8,
    featured: true,
    sortOrder: 90,
    tags: ["promotions", "terms"],
    keywords: ["promotion terms", "wagering"],
    relatedGuideSlugs: ["payments-checklist"],
    relatedCategorySlugs: ["promotions", "payments"],
    tone: "secondary",
  }),
  createGuide({
    id: "guide-fishing",
    slug: "fishing-game-session-basics",
    category: "fishing",
    subCategory: "gameplay",
    title: "Fishing game session basics",
    excerpt:
      "Understand room intensity, short sessions, and how fishing titles differ from slots.",
    publishDate: "2026-03-22T08:00:00.000Z",
    difficulty: "beginner",
    readingTime: 5,
    sortOrder: 100,
    tags: ["fishing", "mobile"],
    keywords: ["fishing games guide"],
    relatedProviderSlugs: ["kagaming"],
    relatedGameSlugs: ["dark-domain-hunt", "cluck-chaos", "fantasy-jungle"],
    relatedCategorySlugs: ["fishing", "casino"],
    tone: "accent",
  }),
];

export const guidesPageSeed: GuidesPageContent = {
  seo: {
    title: "GGLBET Guides | Official Knowledge Base",
    description:
      "Browse GGLBET Guides by category—beginner, slots, live casino, payments, VIP, security, responsible gaming, and more. The official GGLBET educational hub.",
    path: ROUTES.guides,
  },
  hero: {
    heading: "GGLBET Guides for clearer play decisions",
    subheading: "Official GGLBET Guides knowledge base for long-term discovery",
    body: "Every GGLBET guide uses structured sections, FAQs, and internal links to GGLBET games, providers, and safer-play resources—so the GGLBET Guides library can grow without template changes.",
    mediaLabel: "GGLBET Guides knowledge base hero",
  },
  seoContent: {
    heading: "How GGLBET Guides support search and players",
    body: "GGLBET category hubs and article pages share one Guide model. Editors publish educational content once; listing modules, related links, metadata, and schema update automatically. This architecture is designed for hundreds to thousands of GGLBET Guides without engineering churn.",
  },
  faq: guidesFaqItems as unknown as GuidesPageContent["faq"],
  finalCta: {
    heading: "Keep learning with GGLBET Guides, then open games with intention",
    body: "Move from GGLBET Guides into GGLBET games, payments, or registration when you are ready—and keep GGLBET responsible gaming tools within reach.",
    primaryLabel: "Browse GGLBET Games",
    primaryHref: ROUTES.games,
    secondaryLabel: "GGLBET Responsible Gaming",
    secondaryHref: ROUTES.responsibleGaming,
  },
};
