/**
 * Central image policy for next/image and CMS media.
 * Remote patterns are expanded when a CMS CDN is connected.
 */
export const IMAGE_QUALITY_DEFAULT = 80 as const;

export const IMAGE_QUALITY_HERO = 85 as const;

export const IMAGE_SIZES = {
  thumbnail: 96,
  card: 480,
  content: 960,
  hero: 1920,
} as const;

/** Official gglbet5.com game / media CDN hosts allowed for next/image. */
export const REMOTE_IMAGE_HOSTS: readonly string[] = [
  "cmsbetconstruct.com",
  "icons.cmsbetconstruct.com",
];
