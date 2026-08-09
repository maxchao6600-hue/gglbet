/**
 * Related Content Engine — builds consistent cross-hub internal links
 * so catalog and content pages are never orphaned from the SEO graph.
 */
import {
  CONTENT_PATHS,
  ROUTES,
  getGuideHref,
  getNewsHref,
  getPromotionHref,
  getProviderHref,
  getGameHref,
  getAuthorHref,
} from "@/constants/routes";

export type RelatedLink = {
  readonly href: string;
  readonly label: string;
  readonly group: "hub" | "related" | "trust" | "auth";
};

export const SITE_HUB_LINKS: readonly RelatedLink[] = [
  { href: ROUTES.home, label: "GGLBET Home", group: "hub" },
  { href: ROUTES.providers, label: "GGLBET Providers", group: "hub" },
  { href: ROUTES.games, label: "GGLBET Games", group: "hub" },
  { href: ROUTES.guides, label: "GGLBET Guides", group: "hub" },
  { href: ROUTES.news, label: "GGLBET News", group: "hub" },
  { href: ROUTES.promotions, label: "GGLBET Promotions", group: "hub" },
  { href: ROUTES.vip, label: "GGLBET VIP", group: "hub" },
  { href: ROUTES.faq, label: "GGLBET FAQ", group: "hub" },
  { href: ROUTES.payment, label: "GGLBET Payment", group: "hub" },
  { href: CONTENT_PATHS.download, label: "GGLBET Download", group: "hub" },
  { href: ROUTES.about, label: "About GGLBET", group: "hub" },
  {
    href: ROUTES.responsibleGaming,
    label: "GGLBET Responsible Gaming",
    group: "trust",
  },
  { href: ROUTES.editorialPolicy, label: "GGLBET Editorial Policy", group: "trust" },
  { href: ROUTES.team, label: "GGLBET Team", group: "trust" },
  { href: ROUTES.register, label: "Register on GGLBET", group: "auth" },
  { href: ROUTES.login, label: "GGLBET Login", group: "auth" },
] as const;

export function buildHubInternalLinks(
  extras: readonly RelatedLink[] = [],
): readonly RelatedLink[] {
  const seen = new Set<string>();
  const merged = [...extras, ...SITE_HUB_LINKS];
  return merged.filter((link) => {
    if (seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  });
}

export function relatedProviderLink(
  slug: string,
  name: string,
): RelatedLink {
  return {
    href: getProviderHref(slug),
    label: name,
    group: "related",
  };
}

export function relatedGameLink(
  providerSlug: string,
  slug: string,
  name: string,
): RelatedLink {
  return {
    href: getGameHref(providerSlug, slug),
    label: name,
    group: "related",
  };
}

export function relatedGuideLink(
  category: string,
  slug: string,
  title: string,
): RelatedLink {
  return {
    href: getGuideHref(category, slug),
    label: title,
    group: "related",
  };
}

export function relatedNewsLink(
  category: string,
  slug: string,
  title: string,
): RelatedLink {
  return {
    href: getNewsHref(category, slug),
    label: title,
    group: "related",
  };
}

export function relatedPromotionLink(
  slug: string,
  title: string,
): RelatedLink {
  return {
    href: getPromotionHref(slug),
    label: title,
    group: "related",
  };
}

export function relatedAuthorLink(slug: string, name: string): RelatedLink {
  return {
    href: getAuthorHref(slug),
    label: name,
    group: "related",
  };
}
