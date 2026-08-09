import type { AppLocale } from "@/config/i18n";
import { localizePath } from "@/lib/i18n";

/**
 * Unified conversion CTA for Register / Log in / Download App.
 * Opens official affiliate register flow (new tab via Button / NavLink helpers).
 */
export const GGLBET_AFFILIATE_CTA_URL =
  "https://www.gglbet5.com/en/affiliates/?btag=2773567" as const;

/**
 * In-app content paths that still exist as SEO/support pages.
 * Do not use these for Register / Login / Download App CTAs.
 */
export const CONTENT_PATHS = {
  login: "/login",
  register: "/register",
  download: "/download",
} as const;

export const ROUTES = {
  home: "/",
  login: GGLBET_AFFILIATE_CTA_URL,
  register: GGLBET_AFFILIATE_CTA_URL,
  download: GGLBET_AFFILIATE_CTA_URL,
  promotions: "/promotions",
  promotion: "/promotion",
  providers: "/providers",
  provider: "/provider",
  games: "/games",
  game: "/game",
  slots: "/games/slots",
  liveCasino: "/games/live-casino",
  sports: "/games/sports",
  fishing: "/games/fishing",
  lottery: "/games/lottery",
  faq: "/faq",
  support: "/support",
  guides: "/guides",
  guide: "/guide",
  news: "/news",
  payment: "/payment",
  about: "/about",
  contact: "/contact",
  responsibleGaming: "/responsible-gaming",
  privacyPolicy: "/privacy-policy",
  terms: "/terms",
  editorialPolicy: "/editorial-policy",
  contentQuality: "/content-quality-policy",
  contentUpdates: "/content-update-policy",
  team: "/about-our-team",
  author: "/author",
  vip: "/vip",
  referral: "/referral",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];

export function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

/** target/rel for affiliate and other absolute CTAs */
export function externalLinkProps(href: string): {
  readonly target?: "_blank";
  readonly rel?: "noopener noreferrer";
} {
  if (!isExternalHref(href)) return {};
  return { target: "_blank", rel: "noopener noreferrer" };
}

/**
 * Locale-prefixed copies of the canonical route map.
 * Prefer this (or `localizePath`) when building locale-aware URLs / SEO paths.
 */
export function localizedRoutes(
  locale: AppLocale,
): { readonly [K in keyof typeof ROUTES]: string } {
  return {
    home: localizePath(ROUTES.home, locale),
    login: ROUTES.login,
    register: ROUTES.register,
    download: ROUTES.download,
    promotions: localizePath(ROUTES.promotions, locale),
    promotion: localizePath(ROUTES.promotion, locale),
    providers: localizePath(ROUTES.providers, locale),
    provider: localizePath(ROUTES.provider, locale),
    games: localizePath(ROUTES.games, locale),
    game: localizePath(ROUTES.game, locale),
    slots: localizePath(ROUTES.slots, locale),
    liveCasino: localizePath(ROUTES.liveCasino, locale),
    sports: localizePath(ROUTES.sports, locale),
    fishing: localizePath(ROUTES.fishing, locale),
    lottery: localizePath(ROUTES.lottery, locale),
    faq: localizePath(ROUTES.faq, locale),
    support: localizePath(ROUTES.support, locale),
    guides: localizePath(ROUTES.guides, locale),
    guide: localizePath(ROUTES.guide, locale),
    news: localizePath(ROUTES.news, locale),
    payment: localizePath(ROUTES.payment, locale),
    about: localizePath(ROUTES.about, locale),
    contact: localizePath(ROUTES.contact, locale),
    responsibleGaming: localizePath(ROUTES.responsibleGaming, locale),
    privacyPolicy: localizePath(ROUTES.privacyPolicy, locale),
    terms: localizePath(ROUTES.terms, locale),
    editorialPolicy: localizePath(ROUTES.editorialPolicy, locale),
    contentQuality: localizePath(ROUTES.contentQuality, locale),
    contentUpdates: localizePath(ROUTES.contentUpdates, locale),
    team: localizePath(ROUTES.team, locale),
    author: localizePath(ROUTES.author, locale),
    vip: localizePath(ROUTES.vip, locale),
    referral: localizePath(ROUTES.referral, locale),
  };
}

export function getProviderHref(slug: string): string {
  return `${ROUTES.provider}/${slug}`;
}

export function getGameHref(providerSlug: string, slug: string): string {
  return `${ROUTES.game}/${providerSlug}/${slug}`;
}

export function getGuideCategoryHref(category: string): string {
  return `${ROUTES.guide}/${category}`;
}

export function getGuideHref(category: string, slug: string): string {
  return `${ROUTES.guide}/${category}/${slug}`;
}

export function getNewsCategoryHref(category: string): string {
  return `${ROUTES.news}/${category}`;
}

export function getNewsHref(category: string, slug: string): string {
  return `${ROUTES.news}/${category}/${slug}`;
}

export function getPromotionHref(slug: string): string {
  return `${ROUTES.promotion}/${slug}`;
}

export function getAuthorHref(slug: string): string {
  return `${ROUTES.author}/${slug}`;
}
