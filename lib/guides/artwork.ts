import type { CmsImage } from "@/types/cms";

export const GUIDE_ARTWORK_WIDTH = 1600;
export const GUIDE_ARTWORK_HEIGHT = 900;
export const GUIDE_ARTWORK_DIR = "/guides";

/** Every CMS guide slug with a dedicated AAA editorial key visual (100% coverage). */
export const GUIDE_EDITORIAL_ARTWORK_SLUGS = [
  "how-to-get-started-on-gglbet",
  "slot-features-explained",
  "beginner-path-to-live-casino",
  "payments-checklist",
  "responsible-gaming-limits-checklist",
  "account-security-basics",
  "how-to-download-the-gglbet-app",
  "troubleshooting-game-wont-load",
  "how-to-read-promotion-terms",
  "fishing-game-session-basics",
] as const;

export type GuideEditorialArtworkSlug =
  (typeof GUIDE_EDITORIAL_ARTWORK_SLUGS)[number];

export function hasGuideEditorialArtwork(slug: string): boolean {
  return (GUIDE_EDITORIAL_ARTWORK_SLUGS as readonly string[]).includes(slug);
}

export function guideArtworkPublicPath(slug: string): string {
  return `${GUIDE_ARTWORK_DIR}/${slug}.webp`;
}

/**
 * Resolve cover / hero / thumbnail for a guide.
 * CMS schema uses a single `coverImage`; Detail Hero + Cards + Related all read it.
 */
export function resolveGuideCoverImage(input: {
  readonly slug: string;
  readonly title: string;
  readonly excerpt: string;
}): CmsImage | null {
  if (!hasGuideEditorialArtwork(input.slug)) return null;

  return {
    id: `guide-art-${input.slug}`,
    url: guideArtworkPublicPath(input.slug),
    alt: `GGLBET guide: ${input.title} — editorial key visual`,
    width: GUIDE_ARTWORK_WIDTH,
    height: GUIDE_ARTWORK_HEIGHT,
  };
}
