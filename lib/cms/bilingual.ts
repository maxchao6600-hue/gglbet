import { type AppLocale } from "@/config/i18n";
import {
  L,
  bilingualBlocks,
  bilingualFaq,
  resolveBlocks,
  resolveFaq,
  resolveL,
  type LocalizedBlocks,
  type LocalizedFaqItem,
  type LocalizedString,
} from "@/lib/i18n";

/**
 * Known CMS prose fields that must be stored as { en, zh }.
 */
const LOCALIZED_STRING_KEYS = new Set([
  "title",
  "name",
  "shortName",
  "gameName",
  "summary",
  "subtitle",
  "description",
  "excerpt",
  "overview",
  "intro",
  "history",
  "metaTitle",
  "metaDescription",
  "heroTitle",
  "heroDescription",
  "heroHeading",
  "heroSubheading",
  "heroBody",
  "mediaLabel",
  "volatilityGuide",
  "rtpNotes",
  "securityNotes",
  "fairPlayNotes",
  "ctaPrimaryLabel",
  "ctaSecondaryLabel",
  "heading",
  "subheading",
  "body",
  "label",
  "bio",
  "role",
  "seoContent",
  "eyebrow",
  "brand",
  "question",
  "answer",
  "player",
  "amount",
  "value",
  "meta",
  "text",
  "paragraph",
  "alt",
  "supporting",
  "trustLine",
  "mediaAlt",
  "faqHeading",
  "faqSubheading",
  "faqBody",
  "heroEyebrow",
]);

const LOCALIZED_STRING_LIST_KEYS = new Set([
  "features",
  "advantages",
  "pros",
  "cons",
  "howToPlay",
  "tips",
  "whyChoose",
  "categoryLabels",
  "keywords",
  "tags",
  "requirements",
  "terms",
  "eligibleGames",
  "paragraphs",
  "points",
]);

export type LocalizedStringList = {
  readonly en: readonly string[];
  readonly zh: readonly string[];
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isLocalizedString(value: unknown): value is LocalizedString {
  return (
    isPlainObject(value) &&
    typeof value.en === "string" &&
    typeof value.zh === "string" &&
    Object.keys(value).every((k) => k === "en" || k === "zh")
  );
}

function isLocalizedStringList(value: unknown): value is LocalizedStringList {
  return (
    isPlainObject(value) &&
    Array.isArray(value.en) &&
    Array.isArray(value.zh)
  );
}

function isLocalizedBlocks(value: unknown): value is LocalizedBlocks {
  return (
    isPlainObject(value) &&
    Array.isArray(value.en) &&
    Array.isArray(value.zh)
  );
}

function bilingualizeStringList(values: readonly string[]): LocalizedStringList {
  // Prefer real ZH when authors supply L(en, zh). For EN-only CMS strings,
  // mirror English into zh so /zh never surfaces 【中文待補】 placeholders.
  return {
    en: values,
    zh: values,
  };
}

/**
 * Convert an English CMS document into a bilingual CMS record.
 * Existing English strings are preserved under `en`.
 * Chinese fields use placeholders (no translation generated).
 */
export function bilingualizeDocument<T extends Record<string, unknown>>(
  doc: T,
): T {
  return walkBilingualize(doc) as T;
}

function walkBilingualize(value: unknown, key?: string): unknown {
  if (value == null) return value;

  // Preserve CMS fields that already ship real { en, zh } content.
  if (isLocalizedString(value)) return value;
  if (isLocalizedStringList(value)) return value;
  if (isLocalizedBlocks(value)) return value;

  if (key === "content" && Array.isArray(value)) {
    return bilingualBlocks(value as never);
  }

  if (key === "faq" && Array.isArray(value)) {
    const items = value as { question?: unknown; answer?: unknown }[];
    if (
      items.every(
        (item) =>
          isLocalizedString(item?.question) && isLocalizedString(item?.answer),
      )
    ) {
      return items;
    }
    if (
      items.every(
        (item) =>
          typeof item?.question === "string" && typeof item?.answer === "string",
      )
    ) {
      return bilingualFaq(
        items as { question: string; answer: string }[],
      );
    }
  }

  if (key && LOCALIZED_STRING_KEYS.has(key) && typeof value === "string") {
    return L(value, value);
  }

  if (
    key &&
    LOCALIZED_STRING_LIST_KEYS.has(key) &&
    Array.isArray(value) &&
    value.every((item) => typeof item === "string")
  ) {
    return bilingualizeStringList(value as string[]);
  }

  if (Array.isArray(value)) {
    return value.map((item) => walkBilingualize(item));
  }

  if (isPlainObject(value)) {
    // Nested seo / hero / cta objects
    if (
      "title" in value ||
      "description" in value ||
      "heading" in value ||
      "body" in value ||
      "path" in value
    ) {
      const next: Record<string, unknown> = {};
      for (const [childKey, childValue] of Object.entries(value)) {
        next[childKey] = walkBilingualize(childValue, childKey);
      }
      return next;
    }

    const next: Record<string, unknown> = {};
    for (const [childKey, childValue] of Object.entries(value)) {
      next[childKey] = walkBilingualize(childValue, childKey);
    }
    return next;
  }

  return value;
}

/**
 * Resolve a bilingual CMS record into a locale-specific document
 * with plain strings for UI/SEO consumers.
 */
export function resolveDocument<T extends Record<string, unknown>>(
  doc: T,
  locale: AppLocale,
): T {
  return walkResolve(doc, locale) as T;
}

function walkResolve(value: unknown, locale: AppLocale, key?: string): unknown {
  if (value == null) return value;

  if (key === "content" && isLocalizedBlocks(value)) {
    return resolveBlocks(value, locale);
  }

  if (key === "faq" && Array.isArray(value)) {
    return resolveFaq(value as LocalizedFaqItem[], locale);
  }

  if (isLocalizedString(value)) {
    return resolveL(value, locale);
  }

  if (isLocalizedStringList(value)) {
    return value[locale] ?? value.en;
  }

  if (isLocalizedBlocks(value)) {
    return resolveBlocks(value, locale);
  }

  if (Array.isArray(value)) {
    return value.map((item) => walkResolve(item, locale));
  }

  if (isPlainObject(value)) {
    const next: Record<string, unknown> = {};
    for (const [childKey, childValue] of Object.entries(value)) {
      next[childKey] = walkResolve(childValue, locale, childKey);
    }
    // Stamp resolved locale when present on documents
    if ("locale" in next) {
      next.locale = locale;
    }
    return next;
  }

  return value;
}

export function resolveMany<T extends Record<string, unknown>>(
  docs: readonly T[],
  locale: AppLocale,
): T[] {
  return docs.map((doc) => resolveDocument(doc, locale));
}
