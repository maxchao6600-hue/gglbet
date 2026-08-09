/**
 * Home Visual Asset System v4 — unified premium dark / pink / purple / neon casino art.
 * Paths under /public/home/v4/ (AI original) and /public/home/payments/ (payment marks).
 */
export const HOME_V2_MEDIA = {
  hero: "/home/v4/hero-visual.png",
  heroStage: "/home/v4/hero-visual.png",
  about: "/home/v4/about.png",
  whyChoose: "/home/v4/trending.png",
  trending: "/home/v4/trending.png",
  providers: "/home/v4/providers.png",
  promotions: "/home/v4/promotions.png",
  categories: "/home/v4/categories.png",
  winners: "/home/v4/winners.png",
  payments: "/home/v4/payments.png",
  register: "/home/v4/trending.png",
  login: "/home/v4/trending.png",
  download: "/home/v4/trending.png",
  deposit: "/home/v4/payments.png",
  withdraw: "/home/v4/payments.png",
  vip: "/home/v4/trending.png",
  referral: "/home/v4/trending.png",
  responsible: "/home/v4/responsible.png",
  news: "/home/v4/news.png",
  guides: "/home/v4/guides.png",
  trust: "/home/v4/responsible.png",
  support: "/home/v4/faq.png",
  statistics: "/home/v4/winners.png",
  newGames: "/home/v4/trending.png",
  features: "/home/v4/trending.png",
  faq: "/home/v4/faq.png",
  hub: "/home/v4/categories.png",
  finalCta: "/home/v4/final-cta.png",
  slots: "/home/v4/slots.png",
  live: "/home/v4/live.png",
  sports: "/home/v4/sports.png",
  fishing: "/home/v4/fishing.png",
  lottery: "/home/v4/lottery.png",
} as const;

export type HomeV2MediaKey = keyof typeof HOME_V2_MEDIA;
