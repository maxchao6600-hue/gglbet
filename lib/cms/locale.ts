import {
  bilingualizeDocument,
  resolveDocument,
  resolveMany,
} from "@/lib/cms/bilingual";
import {
  DEFAULT_LOCALE,
  type AppLocale,
  isAppLocale,
} from "@/config/i18n";

export function toBilingualSeed<T extends Record<string, unknown>>(
  docs: readonly T[],
): T[] {
  return docs.map(
    (doc) => bilingualizeDocument({ ...doc } as Record<string, unknown>) as T,
  );
}

export function toBilingualDoc<T extends Record<string, unknown>>(doc: T): T {
  return bilingualizeDocument({ ...doc } as Record<string, unknown>) as T;
}

export function parseLocale(value?: string | null): AppLocale {
  if (value && isAppLocale(value)) return value;
  return DEFAULT_LOCALE;
}

export function resolveSeedDoc<T extends Record<string, unknown>>(
  doc: T,
  locale?: string | null,
): T {
  return resolveDocument(doc, parseLocale(locale));
}

export function resolveSeedDocs<T extends Record<string, unknown>>(
  docs: readonly T[],
  locale?: string | null,
): T[] {
  return resolveMany(docs, parseLocale(locale));
}
