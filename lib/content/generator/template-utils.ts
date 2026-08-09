import type { TemplateTokenMap } from "@/types/content-template";
import { slugifyAnchor } from "@/lib/content/toc";

/**
 * Fill `{{token}}` patterns from CMS entity maps.
 * Missing tokens collapse to empty string (never leave raw braces in copy).
 */
export function applyTemplatePattern(
  pattern: string,
  tokens: TemplateTokenMap,
): string {
  return pattern
    .replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (_, key: string) => {
      const value = tokens[key];
      if (value === undefined || value === null) return "";
      return String(value);
    })
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([,.])/g, "$1")
    .trim();
}

export function sectionAnchor(
  heading: string,
  explicit?: string,
): string {
  return explicit && explicit.length > 0
    ? explicit
    : slugifyAnchor(heading);
}

/** Soft uniqueness helper — prefer CMS prose over generated filler when present. */
export function preferCmsProse(
  cmsValue: string | undefined,
  fallback: string,
): string {
  const trimmed = cmsValue?.trim() ?? "";
  if (trimmed.length >= 40) return trimmed;
  return fallback;
}

export function joinNaturalList(items: readonly string[], max = 4): string {
  const slice = items.filter(Boolean).slice(0, max);
  if (slice.length === 0) return "";
  if (slice.length === 1) return slice[0] ?? "";
  if (slice.length === 2) return `${slice[0]} and ${slice[1]}`;
  return `${slice.slice(0, -1).join(", ")}, and ${slice[slice.length - 1]}`;
}
