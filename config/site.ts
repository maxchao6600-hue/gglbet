export const SITE_NAME = "GGLBET" as const;

export const SITE_TAGLINE =
  "Official GGLBET online casino content hub" as const;

export const SITE_DESCRIPTION =
  "GGLBET is the official content hub for GGLBET online casino—games, providers, promotions, guides, payments, and responsible play for Malaysia players." as const;

export const SITE_LOCALE = "en" as const;

/** Served by app/opengraph-image.tsx */
export const DEFAULT_OG_IMAGE_PATH = "/opengraph-image" as const;

/**
 * Production origin used only when NEXT_PUBLIC_SITE_URL is missing in
 * production builds. Never localhost. Prefer setting the env var explicitly.
 */
const PRODUCTION_SITE_URL_FALLBACK = "https://www.gglbet.com";

let didWarnMissingSiteUrl = false;

/**
 * Canonical site origin from NEXT_PUBLIC_SITE_URL (no trailing slash).
 * Development may fall back to localhost. Production never emits localhost.
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (fromEnv) {
    return fromEnv.replace(/\/$/, "");
  }

  if (process.env.NODE_ENV === "production") {
    if (!didWarnMissingSiteUrl) {
      didWarnMissingSiteUrl = true;
      console.warn(
        "[gglbet] NEXT_PUBLIC_SITE_URL is not set. Using https://www.gglbet.com for canonical/OG/schema/robots/sitemap. Set NEXT_PUBLIC_SITE_URL before deploy.",
      );
    }
    return PRODUCTION_SITE_URL_FALLBACK;
  }

  return "http://localhost:3000";
}
