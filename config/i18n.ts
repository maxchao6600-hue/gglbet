/**
 * Site locale configuration.
 * English is the default and has no URL prefix.
 * Traditional Chinese uses the `/zh` prefix.
 */
export const APP_LOCALES = ["en", "zh"] as const;

export type AppLocale = (typeof APP_LOCALES)[number];

export const DEFAULT_LOCALE: AppLocale = "en";

export const LOCALE_PREFIX: Record<AppLocale, string> = {
  en: "",
  zh: "/zh",
};

/** HTML lang attribute values */
export const HTML_LANG: Record<AppLocale, string> = {
  en: "en",
  zh: "zh-Hant",
};

/** hreflang / alternates.languages keys */
export const HREFLANG: Record<AppLocale, string> = {
  en: "en",
  zh: "zh-Hant",
};

/** Open Graph locale tags */
export const OG_LOCALE: Record<AppLocale, string> = {
  en: "en_US",
  zh: "zh_TW",
};

export const ZH_STRING_PLACEHOLDER = "【中文待補】";

export function isAppLocale(value: string): value is AppLocale {
  return (APP_LOCALES as readonly string[]).includes(value);
}
