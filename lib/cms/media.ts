import type { CmsImage } from "@/types/cms";

type PlaceholderTone = "brand" | "secondary" | "neutral" | "accent";

/**
 * CMS image helper for seed/demo media.
 * Empty URL signals PlaceholderMedia fallback (no remote asset required).
 */
export function createPlaceholderImage(
  alt: string,
  tone: PlaceholderTone = "brand",
  size = 1200,
): CmsImage & { readonly placeholderTone: PlaceholderTone } {
  return {
    id: `placeholder-${alt.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    url: "",
    alt,
    width: size,
    height: Math.round(size * 0.625),
    placeholderTone: tone,
  };
}

export function isPlaceholderImage(image: CmsImage): boolean {
  return !image.url || image.url.startsWith("placeholder:");
}
