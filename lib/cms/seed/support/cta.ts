import { L } from "@/lib/i18n";
import { CONTENT_PATHS, ROUTES } from "@/constants/routes";
import type { HomeCta } from "@/types/home";
import type { RelatedPath } from "./factory";

/** Bilingual CTA label helper for Support seeds. */
export function cta(
  en: string,
  zh: string,
  href: string,
  variant: HomeCta["variant"] = "primary",
): HomeCta {
  return {
    label: L(en, zh) as unknown as string,
    href,
    variant,
  };
}

export const CTA = {
  register: () => cta("Register on GGLBET", "註冊 GGLBET", ROUTES.register, "primary"),
  login: () => cta("Log in to GGLBET", "登入 GGLBET", ROUTES.login, "outline"),
  support: () => cta("GGLBET Support", "GGLBET 支援中心", ROUTES.support, "primary"),
  faq: () => cta("GGLBET FAQ", "GGLBET 常見問題", ROUTES.faq, "primary"),
  payment: () =>
    cta("GGLBET Payment methods", "GGLBET 支付方式", ROUTES.payment, "primary"),
  download: () => cta("Download GGLBET", "下載 GGLBET", ROUTES.download, "primary"),
  contact: () => cta("Contact GGLBET", "聯絡 GGLBET", ROUTES.contact, "outline"),
  responsible: () =>
    cta("Responsible gaming", "負責任博彩", ROUTES.responsibleGaming, "outline"),
  about: () => cta("About GGLBET", "關於 GGLBET", ROUTES.about, "outline"),
  editorial: () =>
    cta("Editorial policy", "編輯政策", ROUTES.editorialPolicy, "outline"),
  team: () => cta("About our team", "關於我們的團隊", ROUTES.team, "outline"),
  games: () => cta("Browse GGLBET games", "瀏覽 GGLBET 遊戲", ROUTES.games, "soft"),
} as const;

function link(en: string, zh: string, href: string): RelatedPath {
  return { label: L(en, zh) as unknown as string, href };
}

/**
 * Curated topic clusters — relevance over volume.
 * Each Support page only links the next logical GGLBET journeys.
 */
export const SUPPORT_TOPIC_CLUSTERS: Record<string, readonly RelatedPath[]> = {
  support: [
    link("GGLBET FAQ", "GGLBET 常見問題", ROUTES.faq),
    link("GGLBET Payment methods", "GGLBET 支付方式", ROUTES.payment),
    link("Download GGLBET", "下載 GGLBET", CONTENT_PATHS.download),
    link("Responsible gaming", "負責任博彩", ROUTES.responsibleGaming),
    link("Contact GGLBET", "聯絡 GGLBET", ROUTES.contact),
    link("About GGLBET", "關於 GGLBET", ROUTES.about),
    link("Register on GGLBET", "註冊 GGLBET", ROUTES.register),
    link("Log in to GGLBET", "登入 GGLBET", ROUTES.login),
  ],
  faq: [
    link("GGLBET Support hub", "GGLBET 支援中心", ROUTES.support),
    link("GGLBET Payment methods", "GGLBET 支付方式", ROUTES.payment),
    link("Download GGLBET", "下載 GGLBET", CONTENT_PATHS.download),
    link("Responsible gaming", "負責任博彩", ROUTES.responsibleGaming),
    link("Contact GGLBET", "聯絡 GGLBET", ROUTES.contact),
    link("Register on GGLBET", "註冊 GGLBET", ROUTES.register),
    link("Log in to GGLBET", "登入 GGLBET", ROUTES.login),
  ],
  payment: [
    link("Register on GGLBET", "註冊 GGLBET", ROUTES.register),
    link("Log in to GGLBET", "登入 GGLBET", ROUTES.login),
    link("GGLBET FAQ", "GGLBET 常見問題", ROUTES.faq),
    link("Responsible gaming", "負責任博彩", ROUTES.responsibleGaming),
    link("Contact GGLBET", "聯絡 GGLBET", ROUTES.contact),
    link("Download GGLBET", "下載 GGLBET", CONTENT_PATHS.download),
    link("GGLBET Support hub", "GGLBET 支援中心", ROUTES.support),
  ],
  download: [
    link("Register on GGLBET", "註冊 GGLBET", ROUTES.register),
    link("Log in to GGLBET", "登入 GGLBET", ROUTES.login),
    link("GGLBET FAQ", "GGLBET 常見問題", ROUTES.faq),
    link("GGLBET Payment methods", "GGLBET 支付方式", ROUTES.payment),
    link("Contact GGLBET", "聯絡 GGLBET", ROUTES.contact),
    link("GGLBET Support hub", "GGLBET 支援中心", ROUTES.support),
    link("Browse GGLBET games", "瀏覽 GGLBET 遊戲", ROUTES.games),
  ],
  "responsible-gaming": [
    link("GGLBET Payment methods", "GGLBET 支付方式", ROUTES.payment),
    link("GGLBET FAQ", "GGLBET 常見問題", ROUTES.faq),
    link("Contact GGLBET", "聯絡 GGLBET", ROUTES.contact),
    link("GGLBET Support hub", "GGLBET 支援中心", ROUTES.support),
    link("About GGLBET", "關於 GGLBET", ROUTES.about),
    link("Register on GGLBET", "註冊 GGLBET", ROUTES.register),
  ],
  about: [
    link("Editorial policy", "編輯政策", ROUTES.editorialPolicy),
    link("About our team", "關於我們的團隊", ROUTES.team),
    link("GGLBET Support hub", "GGLBET 支援中心", ROUTES.support),
    link("Responsible gaming", "負責任博彩", ROUTES.responsibleGaming),
    link("Contact GGLBET", "聯絡 GGLBET", ROUTES.contact),
    link("Browse GGLBET games", "瀏覽 GGLBET 遊戲", ROUTES.games),
  ],
  "editorial-policy": [
    link("About GGLBET", "關於 GGLBET", ROUTES.about),
    link("About our team", "關於我們的團隊", ROUTES.team),
    link("GGLBET Support hub", "GGLBET 支援中心", ROUTES.support),
    link("Contact GGLBET", "聯絡 GGLBET", ROUTES.contact),
    link("Responsible gaming", "負責任博彩", ROUTES.responsibleGaming),
  ],
  "about-our-team": [
    link("Editorial policy", "編輯政策", ROUTES.editorialPolicy),
    link("About GGLBET", "關於 GGLBET", ROUTES.about),
    link("Contact GGLBET", "聯絡 GGLBET", ROUTES.contact),
    link("GGLBET Support hub", "GGLBET 支援中心", ROUTES.support),
    link("GGLBET FAQ", "GGLBET 常見問題", ROUTES.faq),
  ],
  contact: [
    link("GGLBET Support hub", "GGLBET 支援中心", ROUTES.support),
    link("GGLBET FAQ", "GGLBET 常見問題", ROUTES.faq),
    link("GGLBET Payment methods", "GGLBET 支付方式", ROUTES.payment),
    link("Responsible gaming", "負責任博彩", ROUTES.responsibleGaming),
    link("Download GGLBET", "下載 GGLBET", CONTENT_PATHS.download),
    link("Register on GGLBET", "註冊 GGLBET", ROUTES.register),
  ],
};
