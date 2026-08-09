import { getSiteUrl } from "@/config/site";

/**
 * Builds an absolute canonical URL for a site path.
 * Accepts paths with or without a leading slash.
 * Do not pass absolute http(s) media URLs here — use `toAbsoluteUrl`.
 */
export function buildCanonicalUrl(path = "/"): string {
  const origin = getSiteUrl();
  const normalized = normalizePath(path);

  if (normalized === "/") {
    return `${origin}/`;
  }

  return `${origin}${normalized}`;
}

/**
 * Absolutizes a site path or returns an already-absolute http(s) URL unchanged.
 * Prevents `https://site/https://cdn...` double-prefix bugs in Schema/OG/Twitter.
 */
export function toAbsoluteUrl(
  url: string | undefined | null,
  fallbackPath = "/opengraph-image",
): string {
  const value = (url ?? "").trim();
  if (!value) {
    return buildCanonicalUrl(fallbackPath);
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  if (value.startsWith("//")) {
    return `https:${value}`;
  }

  return buildCanonicalUrl(value);
}

export function normalizePath(path: string): string {
  if (!path || path === "/") {
    return "/";
  }

  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  return withLeadingSlash.replace(/\/+$/, "");
}
