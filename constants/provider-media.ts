/**
 * Fallback logo when an official provider has no local logo asset.
 * Always a real SVG under /public — never an empty URL or broken invent path.
 */
export const DEFAULT_PROVIDER_LOGO_PATH =
  "/providers/logos/default-provider.svg" as const;

export const DEFAULT_PROVIDER_LOGO_WIDTH = 320 as const;
export const DEFAULT_PROVIDER_LOGO_HEIGHT = 160 as const;
