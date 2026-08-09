import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/config/site";

export const DEFAULT_TITLE = SITE_NAME;

export const DEFAULT_TITLE_TEMPLATE = `%s | ${SITE_NAME}` as const;

export const DEFAULT_DESCRIPTION = SITE_DESCRIPTION;

export const DEFAULT_KEYWORDS = [
  SITE_NAME,
  "online casino",
  "slots",
  "live casino",
  "promotions",
  "responsible gaming",
] as const;

export const TWITTER_HANDLE = "@gglbet" as const;

export const ORGANIZATION_SAME_AS = [] as const;

export const SEO_DEFAULTS = {
  title: DEFAULT_TITLE,
  titleTemplate: DEFAULT_TITLE_TEMPLATE,
  description: DEFAULT_DESCRIPTION,
  tagline: SITE_TAGLINE,
  keywords: DEFAULT_KEYWORDS,
  twitterHandle: TWITTER_HANDLE,
} as const;
