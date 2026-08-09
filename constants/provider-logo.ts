/**
 * Provider logo display policy for dark theme.
 * Never edits official logo files — only selects white variants,
 * applies CSS invert filter, or skips filter via whitelist.
 */

import { DEFAULT_PROVIDER_LOGO_PATH } from "@/constants/provider-media";

export type ProviderLogoTreatment = "white" | "invert" | "native";

/**
 * Colorful / already-light logos that must NOT receive the dark-theme invert filter.
 * Add a provider slug when invert makes the brand mark look wrong.
 */
export const PROVIDER_LOGO_FILTER_WHITELIST = [
  "default-provider",
] as const;

/**
 * Map provider slug → local white/light logo path when an official white asset exists.
 * Populate when white variants are added under /public/providers/logos (do not invent).
 */
export const PROVIDER_WHITE_LOGO_BY_SLUG: Readonly<Record<string, string>> = {
  // e.g. "pragmatic-play": "/providers/logos/pragmatic-play-white.svg",
};

const WHITELIST = new Set<string>(PROVIDER_LOGO_FILTER_WHITELIST);

function basenameFromPath(src: string): string {
  const clean = src.split("?")[0]?.split("#")[0] ?? src;
  const parts = clean.split("/");
  return parts[parts.length - 1] ?? "";
}

export function providerLogoSlugFromSrc(src: string): string {
  return basenameFromPath(src).replace(/\.(svg|png|jpe?g|webp)$/i, "");
}

/**
 * Resolve display src + treatment for dark UI.
 * Priority: white variant map → whitelist (native) → invert filter.
 */
export function resolveProviderLogoSrc(src?: string | null): {
  readonly src: string;
  readonly treatment: ProviderLogoTreatment;
  readonly slug: string;
} {
  const fallback = DEFAULT_PROVIDER_LOGO_PATH;
  const input = (src && src.trim().length > 0 ? src.trim() : fallback).replace(
    /\\/g,
    "/",
  );
  const slug = providerLogoSlugFromSrc(input);

  const white = PROVIDER_WHITE_LOGO_BY_SLUG[slug];
  if (white) {
    return { src: white, treatment: "white", slug };
  }

  if (WHITELIST.has(slug)) {
    return {
      src: input.length > 0 ? input : fallback,
      treatment: "native",
      slug,
    };
  }

  return {
    src: input.length > 0 ? input : fallback,
    treatment: "invert",
    slug,
  };
}

export function isProviderLogoWhitelisted(slugOrSrc: string): boolean {
  const slug = slugOrSrc.includes("/")
    ? providerLogoSlugFromSrc(slugOrSrc)
    : slugOrSrc.replace(/\.(svg|png|jpe?g|webp)$/i, "");
  return WHITELIST.has(slug);
}

/** Metrics helpers for audits / docs. */
export function getProviderLogoPolicyStats(logoSrcList: readonly string[]): {
  readonly total: number;
  readonly white: number;
  readonly invert: number;
  readonly whitelist: number;
} {
  let white = 0;
  let invert = 0;
  let whitelist = 0;
  for (const src of logoSrcList) {
    const { treatment } = resolveProviderLogoSrc(src);
    if (treatment === "white") white += 1;
    else if (treatment === "native") whitelist += 1;
    else invert += 1;
  }
  return { total: logoSrcList.length, white, invert, whitelist };
}
