/**
 * Shared premium hub visuals.
 * Support cluster artwork lives under `/public/support/*` only — no cross-page reuse
 * of slots / games / unrelated hub art inside Support landings.
 */
export const HUB_MEDIA = {
  home: "/home/v4/hero-visual.png",
  games: "/games/games-hero.png",
  gameDetail: "/games/game-detail-hero.png",
  providers: "/home/v4/providers.png",
  providerDetail: "/home/v4/provider-detail-hero.png",
  promotions: "/home/v4/promotions.png",
  promotionDetail: "/home/v4/promotion-detail-hero.png",
  guides: "/home/v4/guides.png",
  guideDetail: "/home/v4/guide-detail-hero.png",
  news: "/home/v4/news.png",
  newsDetail: "/home/v4/news-detail-hero.png",
  seo: "/games/games-seo.png",
  categoryFallback: "/home/v4/categories.png",

  // —— Support heroes ——
  support: "/support/support-hero.png",
  payment: "/support/payment-hero.png",
  responsible: "/support/rg-hero.png",
  about: "/support/about-hero.png",
  download: "/support/download-hero.png",
  faq: "/support/faq-hero.png",
  contact: "/support/contact-hero.png",
  editorial: "/support/editorial-hero.png",
  team: "/support/team-hero.png",

  // —— Support sections ——
  supportDesk: "/support/support-desk.png",
  supportPaymentJourney: "/support/support-payment-journey.png",
  supportDownloadJourney: "/support/support-download-journey.png",
  supportRgJourney: "/support/support-rg-journey.png",

  deposit: "/support/deposit.png",
  withdraw: "/support/withdraw.png",
  paymentMethods: "/support/payment-methods.png",
  paymentSecurity: "/support/payment-security.png",

  android: "/support/download-android.png",
  ios: "/support/download-ios.png",
  install: "/support/download-install.png",
  downloadUpdate: "/support/download-update.png",

  faqAccount: "/support/faq-account.png",
  faqPayment: "/support/faq-payment.png",
  faqDownload: "/support/faq-download.png",
  faqRg: "/support/faq-rg.png",

  rgTools: "/support/rg-tools.png",
  rgWarning: "/support/rg-warning.png",
  rgHelp: "/support/rg-help.png",
  rgExternalHelp: "/support/rg-external-help.png",

  aboutCompany: "/support/about-company.png",
  aboutMission: "/support/about-mission.png",
  aboutEditorial: "/support/about-editorial.png",
  aboutSecurity: "/support/about-security.png",
  aboutTeam: "/support/about-team.png",

  contactChat: "/support/contact-chat.png",
  contactEmail: "/support/contact-email.png",
  contactPrep: "/support/contact-prep.png",
  contactFaqDesk: "/support/contact-faq-desk.png",

  editorialFlow: "/support/editorial-flow.png",
  editorialStandards: "/support/editorial-standards.png",
  editorialAbout: "/support/editorial-about.png",
  editorialMalaysia: "/support/editorial-malaysia.png",

  teamTrust: "/support/team-trust.png",
  teamNews: "/support/team-news.png",
  teamEditorial: "/support/team-editorial.png",
  teamReview: "/support/team-review.png",

  // —— Support CTAs (page-specific) ——
  cta: "/support/cta-register.png",
  supportCta: "/support/support-cta.png",
  paymentCta: "/support/payment-cta.png",
  downloadCta: "/support/download-cta.png",
  faqCta: "/support/faq-cta.png",
  rgCta: "/support/rg-cta.png",
  aboutCta: "/support/about-cta.png",
  contactCta: "/support/contact-cta.png",
  editorialCta: "/support/editorial-cta.png",
  teamCta: "/support/team-cta.png",

  // legacy aliases kept for non-Support callers
  security: "/support/payment-security.png",
  finalCtaFallback: "/support/cta-register.png",
} as const;

export type HubMediaKey = keyof typeof HUB_MEDIA;
