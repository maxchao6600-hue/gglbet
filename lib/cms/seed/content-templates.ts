import type {
  ContentTemplateDocument,
  ContentTemplateSectionConfig,
  ContentTemplateType,
} from "@/types/content-template";
import { ROUTES } from "@/constants/routes";

function sections(
  items: readonly Omit<ContentTemplateSectionConfig, "order">[],
): readonly ContentTemplateSectionConfig[] {
  return items.map((item, index) => ({ ...item, order: (index + 1) * 10 }));
}

const UPDATED = "2026-08-05T00:00:00.000Z";

/**
 * CMS seed for SEO Content Templates.
 * Editors can reorder, rename, or disable sections without touching templates code.
 */
export const contentTemplatesSeed: readonly ContentTemplateDocument[] = [
  {
    id: "template-provider-seo-v1",
    type: "provider",
    name: "Provider SEO Template",
    description:
      "Long-form provider review structure for studio pages on GGLBET.",
    version: 1,
    locale: "en",
    status: "published",
    updatedAt: UPDATED,
    seo: {
      metaTitlePattern: "{{name}} — Provider Review | GGLBET",
      metaDescriptionPattern:
        "Learn about {{name}} on GGLBET: history, features, popular games, RTP notes, pros and cons, and FAQs.",
      h1Pattern: "{{name}} on GGLBET",
      includeFaqSchema: true,
      includeHowToSchema: true,
      includeToc: true,
    },
    cta: {
      primaryLabel: "Browse {{name}} games",
      primaryHrefPattern: "{{gamesHref}}",
      secondaryLabel: "All providers",
      secondaryHrefPattern: "{{providersHref}}",
    },
    internalLinks: [
      { label: "Games catalog", hrefPattern: "{{gamesHref}}" },
      { label: "Guides", hrefPattern: "{{guidesHref}}" },
      { label: "Promotions", hrefPattern: "{{promotionsHref}}" },
      { label: "Responsible Gaming", hrefPattern: "{{rgHref}}" },
    ],
    sections: sections([
      { id: "platform-intro", enabled: true, heading: "Platform introduction", anchor: "platform-introduction" },
      { id: "brand-history", enabled: true, heading: "Brand history", anchor: "brand-history" },
      { id: "game-features", enabled: true, heading: "Game features", anchor: "game-features" },
      { id: "popular-games", enabled: true, heading: "Popular games", anchor: "popular-games" },
      { id: "game-mechanics", enabled: true, heading: "Game mechanics", anchor: "game-mechanics" },
      { id: "rtp", enabled: true, heading: "RTP notes", anchor: "rtp" },
      { id: "volatility", enabled: true, heading: "Volatility", anchor: "volatility" },
      { id: "player-fit", enabled: true, heading: "Who this provider suits", anchor: "who-it-suits" },
      { id: "pros", enabled: true, heading: "Advantages", anchor: "advantages" },
      { id: "cons", enabled: true, heading: "Limitations", anchor: "limitations" },
      { id: "beginner-tips", enabled: true, heading: "Beginner advice", anchor: "beginner-advice" },
      { id: "faq", enabled: true, heading: "Frequently asked questions", anchor: "faq" },
      { id: "summary", enabled: true, heading: "Summary", anchor: "summary" },
      { id: "cta", enabled: true, heading: "Next step", anchor: "next-step" },
    ]),
  },
  {
    id: "template-game-seo-v1",
    type: "game",
    name: "Game SEO Template",
    description: "Game detail SEO body covering play, specs, and safer first sessions.",
    version: 1,
    locale: "en",
    status: "published",
    updatedAt: UPDATED,
    seo: {
      metaTitlePattern: "{{gameName}} by {{providerName}} | Play on GGLBET",
      metaDescriptionPattern:
        "{{shortDescription}} Review RTP, volatility, features, and how to play {{gameName}} on GGLBET.",
      h1Pattern: "{{gameName}}",
      includeFaqSchema: true,
      includeHowToSchema: true,
      includeToc: true,
    },
    cta: {
      primaryLabel: "Play {{gameName}}",
      primaryHrefPattern: "{{registerHref}}",
      secondaryLabel: "More from {{providerName}}",
      secondaryHrefPattern: "{{providerHref}}",
    },
    internalLinks: [
      { label: "Provider page", hrefPattern: "{{providerHref}}" },
      { label: "All games", hrefPattern: "{{gamesHref}}" },
      { label: "Guides", hrefPattern: "{{guidesHref}}" },
      { label: "Responsible Gaming", hrefPattern: "{{rgHref}}" },
    ],
    sections: sections([
      { id: "intro", enabled: true, heading: "Game introduction", anchor: "introduction" },
      { id: "background", enabled: true, heading: "Theme and background", anchor: "background" },
      { id: "how-to-play", enabled: true, heading: "How to play", anchor: "how-to-play" },
      { id: "rtp", enabled: true, heading: "RTP", anchor: "rtp" },
      { id: "volatility", enabled: true, heading: "Volatility", anchor: "volatility" },
      { id: "bonus-features", enabled: true, heading: "Bonus features", anchor: "bonus-features" },
      { id: "free-spins", enabled: true, heading: "Free spins and feature rounds", anchor: "free-spins" },
      { id: "jackpot", enabled: true, heading: "Jackpot notes", anchor: "jackpot" },
      { id: "bet-range", enabled: true, heading: "Bet range", anchor: "bet-range" },
      { id: "tips", enabled: true, heading: "Practical tips", anchor: "tips" },
      { id: "beginner-guide", enabled: true, heading: "Beginner path", anchor: "beginner-path" },
      { id: "common-mistakes", enabled: true, heading: "Common mistakes", anchor: "common-mistakes" },
      { id: "faq", enabled: true, heading: "FAQ", anchor: "faq" },
      { id: "summary", enabled: true, heading: "Summary", anchor: "summary" },
      { id: "cta", enabled: true, heading: "Next step", anchor: "next-step" },
    ]),
  },
  {
    id: "template-guide-seo-v1",
    type: "guide",
    name: "Guide SEO Template",
    description: "Instructional guide structure with TL;DR, steps, and FAQ.",
    version: 1,
    locale: "en",
    status: "published",
    updatedAt: UPDATED,
    seo: {
      metaTitlePattern: "{{title}} | GGLBET Guide",
      metaDescriptionPattern:
        "{{excerpt}} Step-by-step guidance, checklist, and FAQ from GGLBET.",
      h1Pattern: "{{title}}",
      includeFaqSchema: true,
      includeHowToSchema: true,
      includeToc: true,
    },
    cta: {
      primaryLabel: "{{ctaPrimaryLabel}}",
      primaryHrefPattern: "{{ctaPrimaryHref}}",
      secondaryLabel: "More guides",
      secondaryHrefPattern: "{{guidesHref}}",
    },
    internalLinks: [
      { label: "Guides hub", hrefPattern: "{{guidesHref}}" },
      { label: "Games", hrefPattern: "{{gamesHref}}" },
      { label: "FAQ", hrefPattern: "{{faqHref}}" },
      { label: "Responsible Gaming", hrefPattern: "{{rgHref}}" },
    ],
    sections: sections([
      { id: "tldr", enabled: true, heading: "TL;DR", anchor: "tldr" },
      { id: "intro", enabled: true, heading: "Introduction", anchor: "introduction" },
      { id: "steps", enabled: true, heading: "Steps", anchor: "steps" },
      { id: "checklist", enabled: true, heading: "Checklist", anchor: "checklist" },
      { id: "warnings", enabled: true, heading: "Things to watch", anchor: "warnings" },
      { id: "common-mistakes", enabled: true, heading: "Common mistakes", anchor: "common-mistakes" },
      { id: "faq", enabled: true, heading: "FAQ", anchor: "faq" },
      { id: "summary", enabled: true, heading: "Summary", anchor: "summary" },
      { id: "cta", enabled: true, heading: "Next step", anchor: "next-step" },
    ]),
  },
  {
    id: "template-news-seo-v1",
    type: "news",
    name: "News SEO Template",
    description: "News article structure for updates, impact, and FAQ.",
    version: 1,
    locale: "en",
    status: "published",
    updatedAt: UPDATED,
    seo: {
      metaTitlePattern: "{{title}} | GGLBET News",
      metaDescriptionPattern:
        "{{excerpt}} Context, impact, and key takeaways from GGLBET News.",
      h1Pattern: "{{title}}",
      includeFaqSchema: true,
      includeHowToSchema: false,
      includeToc: true,
    },
    cta: {
      primaryLabel: "{{ctaPrimaryLabel}}",
      primaryHrefPattern: "{{ctaPrimaryHref}}",
      secondaryLabel: "Latest news",
      secondaryHrefPattern: "{{newsHref}}",
    },
    internalLinks: [
      { label: "News hub", hrefPattern: "{{newsHref}}" },
      { label: "Promotions", hrefPattern: "{{promotionsHref}}" },
      { label: "Guides", hrefPattern: "{{guidesHref}}" },
    ],
    sections: sections([
      { id: "summary", enabled: true, heading: "Summary", anchor: "summary" },
      { id: "background", enabled: true, heading: "Background", anchor: "background" },
      { id: "latest", enabled: true, heading: "What is new", anchor: "what-is-new" },
      { id: "impact", enabled: true, heading: "Impact for players", anchor: "impact" },
      { id: "key-points", enabled: true, heading: "Key takeaways", anchor: "key-takeaways" },
      { id: "faq", enabled: true, heading: "FAQ", anchor: "faq" },
      { id: "cta", enabled: true, heading: "Next step", anchor: "next-step" },
    ]),
  },
  {
    id: "template-promotion-seo-v1",
    type: "promotion",
    name: "Promotion SEO Template",
    description: "Promotion detail structure covering bonus, rules, and FAQ.",
    version: 1,
    locale: "en",
    status: "published",
    updatedAt: UPDATED,
    seo: {
      metaTitlePattern: "{{title}} | GGLBET Promotions",
      metaDescriptionPattern:
        "{{excerpt}} Bonus details, requirements, eligible games, and terms on GGLBET.",
      h1Pattern: "{{title}}",
      includeFaqSchema: true,
      includeHowToSchema: false,
      includeToc: true,
    },
    cta: {
      primaryLabel: "Claim offer",
      primaryHrefPattern: "{{registerHref}}",
      secondaryLabel: "All promotions",
      secondaryHrefPattern: "{{promotionsHref}}",
    },
    internalLinks: [
      { label: "Promotions hub", hrefPattern: "{{promotionsHref}}" },
      { label: "Payment guide", hrefPattern: "{{paymentHref}}" },
      { label: "Responsible Gaming", hrefPattern: "{{rgHref}}" },
    ],
    sections: sections([
      { id: "overview", enabled: true, heading: "Promotion overview", anchor: "overview" },
      { id: "bonus", enabled: true, heading: "Bonus details", anchor: "bonus" },
      { id: "requirements", enabled: true, heading: "Requirements", anchor: "requirements" },
      { id: "terms", enabled: true, heading: "Terms", anchor: "terms" },
      { id: "eligible-games", enabled: true, heading: "Eligible games", anchor: "eligible-games" },
      { id: "faq", enabled: true, heading: "FAQ", anchor: "faq" },
      { id: "summary", enabled: true, heading: "Summary", anchor: "summary" },
      { id: "cta", enabled: true, heading: "Next step", anchor: "next-step" },
    ]),
  },
];

export function getContentTemplateByType(
  type: ContentTemplateType,
): ContentTemplateDocument {
  const found = contentTemplatesSeed.find(
    (item) => item.type === type && item.status === "published",
  );
  if (!found) {
    throw new Error(`No published content template for type: ${type}`);
  }
  return found;
}

export function listContentTemplates(): readonly ContentTemplateDocument[] {
  return contentTemplatesSeed;
}

/** Shared href tokens used across template patterns. */
export const TEMPLATE_BASE_HREFS = {
  gamesHref: ROUTES.games,
  providersHref: ROUTES.providers,
  guidesHref: ROUTES.guides,
  newsHref: ROUTES.news,
  promotionsHref: ROUTES.promotions,
  faqHref: ROUTES.faq,
  rgHref: ROUTES.responsibleGaming,
  registerHref: ROUTES.register,
  paymentHref: ROUTES.payment,
  homeHref: ROUTES.home,
} as const;
