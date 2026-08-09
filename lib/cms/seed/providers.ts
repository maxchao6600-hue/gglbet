import { ROUTES } from "@/constants/routes";
import { providersFaqItems } from "@/lib/cms/seed/faq/providers-faq";
import { buildOfficialProviderSeeds } from "@/lib/cms/seed/content/providers/from-official";
import { providersPageZh } from "@/lib/cms/seed/content/providers/zh-copy";
import { attachProviderContentEngine } from "@/lib/content/attach";
import { L } from "@/lib/i18n";
import type { Provider, ProvidersPageContent } from "@/types/provider";

/**
 * CMS seed providers — built from the official partners snapshot.
 * Source file: lib/cms/seed/content/providers/official/gglbet5-providers.json
 * English + Traditional Chinese SEO fields are filled in the seed builder.
 * Public-facing Hero / SEO copy stays GGLBET-branded (no third-party domain in H1).
 */
export const providersSeed: readonly Provider[] = buildOfficialProviderSeeds().map(
  (provider) =>
    attachProviderContentEngine(
      provider as unknown as Parameters<typeof attachProviderContentEngine>[0],
    ),
);

export const providersPageSeed: ProvidersPageContent = {
  seo: {
    title: L(
      "GGLBET Provider Directory | Official GGLBET Game Providers",
      providersPageZh.seoTitle,
    ) as unknown as string,
    description: L(
      "Browse the GGLBET Provider Directory. Compare official GGLBET game providers, catalog badges, and discovery links across the GGLBET platform.",
      providersPageZh.seoDescription,
    ) as unknown as string,
    path: ROUTES.providers,
  },
  hero: {
    heading: L(
      "Official GGLBET Game Providers",
      providersPageZh.heroHeading,
    ) as unknown as string,
    subheading: L(
      "GGLBET Provider Directory for casino and game studios",
      providersPageZh.heroSubheading,
    ) as unknown as string,
    body: L(
      "Browse official GGLBET game providers in one clear GGLBET Provider Directory. Each studio page highlights catalog facts—title, code, badge, and products—without invented biographies.",
      providersPageZh.heroBody,
    ) as unknown as string,
    mediaLabel: L(
      "GGLBET Provider Directory",
      providersPageZh.mediaLabel,
    ) as unknown as string,
  },
  seoContent: {
    heading: L(
      "How to use the GGLBET provider directory",
      providersPageZh.seoContentHeading,
    ) as unknown as string,
    body: L(
      "Search by name, filter by letter or category, and open a provider page for catalog summary, features, FAQs, and links into the GGLBET games filter. When live lobby availability differs from this directory, confirm inside your signed-in GGLBET session.",
      providersPageZh.seoContentBody,
    ) as unknown as string,
  },
  faq: providersFaqItems as unknown as ProvidersPageContent["faq"],
  finalCta: {
    heading: L(
      "Ready to browse GGLBET providers and games?",
      providersPageZh.finalCtaHeading,
    ) as unknown as string,
    body: L(
      "Register or log in on GGLBET to open the live catalog, or browse GGLBET promotions while you compare provider listings.",
      providersPageZh.finalCtaBody,
    ) as unknown as string,
    primaryLabel: L(
      "Register on GGLBET",
      providersPageZh.primaryLabel,
    ) as unknown as string,
    primaryHref: ROUTES.register,
    secondaryLabel: L(
      "Browse GGLBET Games",
      providersPageZh.secondaryLabel,
    ) as unknown as string,
    secondaryHref: ROUTES.games,
  },
};
