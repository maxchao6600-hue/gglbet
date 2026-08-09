import {
  APP_LOCALES,
  DEFAULT_LOCALE,
  LOCALE_PREFIX,
  type AppLocale,
  isAppLocale,
} from "@/config/i18n";
import type { ContentBlock } from "@/types/content";

export type LocalizedString = {
  readonly en: string;
  readonly zh: string;
};

export type LocalizedBlocks = {
  readonly en: readonly ContentBlock[];
  readonly zh: readonly ContentBlock[];
};

export type LocalizedFaqItem = {
  readonly question: LocalizedString;
  readonly answer: LocalizedString;
};

/**
 * Build a bilingual string.
 * When ZH is omitted, mirror English so /zh never renders 【中文待補】.
 * Pass an explicit zh string for authored Traditional Chinese.
 */
export function L(en: string, zh: string = en): LocalizedString {
  return { en, zh };
}

export function resolveL(
  value: LocalizedString | string | undefined | null,
  locale: AppLocale,
): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[locale] || value.en || "";
}

export function bilingualBlocks(
  en: readonly ContentBlock[],
): LocalizedBlocks {
  // Mirror English blocks when ZH narrative is not authored yet.
  // Explicit LocalizedBlocks { en, zh } in seeds always win over this helper.
  return {
    en,
    zh: en,
  };
}

export function resolveBlocks(
  value: LocalizedBlocks | readonly ContentBlock[] | undefined,
  locale: AppLocale,
): readonly ContentBlock[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  const localized = value as LocalizedBlocks;
  return localized[locale] ?? localized.en ?? [];
}

export function bilingualFaq(
  items: readonly { readonly question: string; readonly answer: string }[],
): readonly LocalizedFaqItem[] {
  return items.map((item) => ({
    question: L(item.question, item.question),
    answer: L(item.answer, item.answer),
  }));
}

export function resolveFaq(
  items:
    | readonly LocalizedFaqItem[]
    | readonly { readonly question: string; readonly answer: string }[]
    | undefined,
  locale: AppLocale,
): readonly { readonly question: string; readonly answer: string }[] {
  if (!items) return [];
  return items.map((item) => {
    if (typeof item.question === "string") {
      return item as { readonly question: string; readonly answer: string };
    }
    const localized = item as LocalizedFaqItem;
    return {
      question: resolveL(localized.question, locale),
      answer: resolveL(localized.answer, locale),
    };
  });
}

/**
 * Strip a leading `/zh` locale prefix from a pathname.
 * Returns the locale-neutral path (always starting with `/`).
 */
export function stripLocalePrefix(pathname: string): string {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (path === "/zh") return "/";
  if (path.startsWith("/zh/")) {
    const rest = path.slice(3);
    return rest.startsWith("/") ? rest : `/${rest}`;
  }
  return path;
}

/**
 * Detect locale from a URL pathname.
 */
export function localeFromPathname(pathname: string): AppLocale {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (path === "/zh" || path.startsWith("/zh/")) return "zh";
  return DEFAULT_LOCALE;
}

/**
 * Prefix a locale-neutral path for the target locale.
 * English has no prefix. Chinese uses `/zh`.
 */
export function localizePath(path: string, locale: AppLocale): string {
  // Absolute CTAs (affiliate register/login/download) must not be locale-prefixed.
  if (/^https?:\/\//i.test(path)) return path;

  const [pathnamePart, query = ""] = path.split("?");
  const neutral = stripLocalePrefix(pathnamePart || "/");
  const prefix = LOCALE_PREFIX[locale];
  const localized =
    !prefix
      ? neutral || "/"
      : neutral === "/"
        ? prefix
        : `${prefix}${neutral}`;
  return query ? `${localized}?${query}` : localized;
}

/**
 * Switch the locale of the current pathname while keeping the page path.
 * Example: /provider/x + zh → /zh/provider/x
 * Example: /zh/provider/x + en → /provider/x
 */
export function switchLocalePath(
  pathname: string,
  targetLocale: AppLocale,
): string {
  return localizePath(stripLocalePrefix(pathname), targetLocale);
}

export function getAlternateLanguages(
  path: string,
): Record<string, string> {
  const neutral = stripLocalePrefix(path);
  return {
    en: localizePath(neutral, "en"),
    "zh-Hant": localizePath(neutral, "zh"),
    "x-default": localizePath(neutral, DEFAULT_LOCALE),
  };
}

export { APP_LOCALES, DEFAULT_LOCALE, isAppLocale };
export type { AppLocale };
