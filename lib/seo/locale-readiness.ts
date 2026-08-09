import { ZH_STRING_PLACEHOLDER, type AppLocale } from "@/config/i18n";

/**
 * Detects unresolved Traditional Chinese CMS placeholders in any resolved
 * document tree (strings, arrays, nested objects).
 */
export function containsZhPlaceholder(value: unknown): boolean {
  if (typeof value === "string") {
    return value.includes(ZH_STRING_PLACEHOLDER);
  }

  if (Array.isArray(value)) {
    return value.some((item) => containsZhPlaceholder(item));
  }

  if (value && typeof value === "object") {
    return Object.values(value as Record<string, unknown>).some((item) =>
      containsZhPlaceholder(item),
    );
  }

  return false;
}

/** True when the tree includes at least one Han ideograph (Chinese copy present). */
export function containsHanScript(value: unknown): boolean {
  if (typeof value === "string") {
    return /[\u4e00-\u9fff]/.test(value);
  }

  if (Array.isArray(value)) {
    return value.some((item) => containsHanScript(item));
  }

  if (value && typeof value === "object") {
    return Object.values(value as Record<string, unknown>).some((item) =>
      containsHanScript(item),
    );
  }

  return false;
}

/**
 * True when a zh-resolved document is ready to index and join hreflang.
 * Requires no 【中文待補】 and real Chinese copy (not English-only on /zh).
 */
export function isZhContentReady(zhContent: unknown): boolean {
  if (zhContent == null) {
    return false;
  }
  if (containsZhPlaceholder(zhContent)) {
    return false;
  }
  return containsHanScript(zhContent);
}

export type LocaleSeoPolicy = {
  readonly indexable: boolean;
  readonly hreflangLocales: readonly AppLocale[];
};

/**
 * Incomplete zh pages stay crawlable (follow) but must not index, and must
 * not appear as a zh-Hant alternate until copy is finished.
 *
 * EN pages must pass `zhContent` to opt zh into hreflang; otherwise zh is
 * omitted so incomplete Traditional Chinese URLs are never advertised.
 */
export function resolveLocaleSeoPolicy(input: {
  readonly locale: AppLocale;
  readonly content: unknown;
  readonly zhContent?: unknown;
}): LocaleSeoPolicy {
  const zhReady =
    input.zhContent !== undefined
      ? isZhContentReady(input.zhContent)
      : input.locale === "zh"
        ? isZhContentReady(input.content)
        : false;

  const indexable = input.locale === "zh" ? zhReady : true;
  const hreflangLocales: AppLocale[] = zhReady ? ["en", "zh"] : ["en"];

  return { indexable, hreflangLocales };
}
