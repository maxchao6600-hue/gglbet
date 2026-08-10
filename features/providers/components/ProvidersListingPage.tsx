import Link from "next/link";
import { Suspense } from "react";

import { ProviderCard } from "@/components/cards/ProviderCard";
import { SplitHero } from "@/components/heroes/SplitHero";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { InternalLinkRail } from "@/components/seo/InternalLinkRail";
import { SeoContainer } from "@/components/seo/SeoContainer";
import { Button } from "@/components/ui/Button";
import { DsFaqAccordion } from "@/components/design-system/DsFaqAccordion";
import { Section } from "@/components/ui/Section";
import { HUB_MEDIA } from "@/constants/hub-media";
import { ROUTES } from "@/constants/routes";
import { SITE_NAME } from "@/constants/site";
import { HomeMediaFigure } from "@/features/home/components/HomeMediaFigure";
import { SectionIntro } from "@/features/home/components/SectionIntro";
import { ProviderDirectoryToolbar } from "@/features/providers/components/ProviderDirectoryToolbar";
import { ProviderDirectoryResults } from "@/features/providers/components/ProviderDirectoryResults";
import { buildProviderItemListJsonLd } from "@/features/providers/seo/provider-json-ld";
import { createBreadcrumbs } from "@/lib/seo/breadcrumb";
import {
  buildBreadcrumbJsonLd,
  buildCollectionPageJsonLd,
  buildFaqPageJsonLd,
} from "@/lib/seo/json-ld";
import type { ProviderListItem, ProvidersPageContent } from "@/types/provider";

type ProvidersListingPageProps = {
  readonly page: ProvidersPageContent;
  readonly providers: readonly ProviderListItem[];
  readonly featured: readonly ProviderListItem[];
};

export function ProvidersListingPage({
  page,
  providers,
  featured,
}: ProvidersListingPageProps) {
  const breadcrumb = createBreadcrumbs([
    { name: "Providers", path: ROUTES.providers },
  ]);

  return (
    <>
      <SeoContainer
        jsonLd={[
          buildCollectionPageJsonLd({
            name: page.seo.title,
            description: page.seo.description,
            path: page.seo.path,
            numberOfItems: providers.length,
          }),
          buildBreadcrumbJsonLd(breadcrumb),
          buildFaqPageJsonLd(page.faq),
          buildProviderItemListJsonLd(providers),
        ]}
      />

      <SplitHero
        id="providers-hero"
        headingId="providers-hero-heading"
        eyebrow="GGLBET Provider Directory"
        brand={SITE_NAME}
        heading={page.hero.heading}
        subheading={page.hero.subheading}
        body={page.hero.body}
        imageSrc={HUB_MEDIA.providers}
        imageAlt={page.hero.mediaLabel}
        ctas={[
          {
            label: "Browse GGLBET Games",
            href: ROUTES.games,
            variant: "primary",
          },
          {
            label: "Register on GGLBET",
            href: ROUTES.register,
            variant: "outline",
          },
        ]}
      />

      <Section padding="sm" containerSize="wide" aria-label="Breadcrumb">
        <Breadcrumbs items={breadcrumb} />
      </Section>

      <Section
        id="provider-information"
        padding="md"
        containerSize="wide"
        aria-labelledby="provider-information-heading"
        tone="muted"
      >
        <SectionIntro
          headingId="provider-information-heading"
          heading="Official GGLBET Game Providers"
          subheading="GGLBET Editorial Note"
          body="GGLBET provider names, game counts, and catalog information are compiled from official GGLBET provider listings and verified GGLBET platform data."
        />
      </Section>

      {featured.length > 0 ? (
        <Section
          id="featured-providers"
          padding="md"
          containerSize="wide"
          aria-labelledby="featured-providers-heading"
          tone="muted"
        >
          <SectionIntro
            headingId="featured-providers-heading"
            heading="Featured GGLBET providers"
            subheading="Studios worth opening first on GGLBET"
            body="A short list of standout studios before you browse the full GGLBET provider directory."
            ctas={[{ label: "Browse GGLBET Games", href: ROUTES.games, variant: "soft" }]}
          />
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {featured.map((provider) => (
              <li key={provider.id}>
                <ProviderCard provider={provider} />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section
        id="providers-directory"
        padding="md"
        containerSize="wide"
        aria-labelledby="providers-directory-heading"
      >
        <h2 id="providers-directory-heading" className="sr-only">
          Search and filter GGLBET providers
        </h2>
        <Suspense fallback={<div className="h-40 rounded-card bg-surface-muted" />}>
          <ProviderDirectoryToolbar />
        </Suspense>
      </Section>

      <Suspense
        fallback={
          <Section padding="lg" containerSize="wide" aria-busy="true">
            <div className="h-64 rounded-card bg-surface-muted" />
          </Section>
        }
      >
        <ProviderDirectoryResults providers={providers} />
      </Suspense>

      <Section
        id="providers-seo-content"
        padding="lg"
        containerSize="wide"
        aria-labelledby="providers-seo-heading"
        tone="muted"
      >
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <SectionIntro
            headingId="providers-seo-heading"
            heading={page.seoContent.heading}
            subheading="How the GGLBET provider directory helps players"
            body={page.seoContent.body}
          />
          <HomeMediaFigure
            src={HUB_MEDIA.providers}
            alt={page.seoContent.heading}
            aspect="wide"
            fallbackSrc={HUB_MEDIA.providers}
            sizes="(max-width: 1024px) 42vw, 440px"
          />
        </div>
        <nav aria-label="GGLBET provider internal links" className="mt-8">
          <ul className="flex flex-wrap gap-3 text-sm">
            {[
              { href: ROUTES.home, label: "GGLBET Home" },
              { href: ROUTES.games, label: "Browse GGLBET Games" },
              { href: ROUTES.promotions, label: "GGLBET Promotions" },
              { href: ROUTES.guides, label: "GGLBET Guides" },
              { href: ROUTES.news, label: "GGLBET News" },
              { href: ROUTES.faq, label: "GGLBET FAQ" },
              { href: ROUTES.about, label: "About GGLBET" },
              { href: ROUTES.responsibleGaming, label: "GGLBET Responsible Gaming" },
              { href: ROUTES.payment, label: "GGLBET Payment" },
              { href: ROUTES.download, label: "GGLBET Download" },
              { href: ROUTES.register, label: "Register on GGLBET" },
              { href: ROUTES.login, label: "GGLBET Login" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-control border border-border px-3 py-2 text-ink-muted hover:border-border-brand hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Section>

      <Section
        id="providers-faq"
        padding="lg"
        containerSize="wide"
        aria-labelledby="providers-faq-heading"
      tone="glow"
      >
        <SectionIntro
          headingId="providers-faq-heading"
          heading="GGLBET provider directory FAQ"
          subheading="Common questions about studios on GGLBET"
          body="Quick answers about finding and comparing game studios on GGLBET."
        />
        <DsFaqAccordion items={page.faq} />
      </Section>

      <Section
        id="providers-internal-links"
        padding="md"
        containerSize="wide"
        aria-label="Site internal links"
      >
        <InternalLinkRail />
      </Section>

      <Section
        id="providers-final-cta"
        padding="lg"
        containerSize="wide"
        aria-labelledby="providers-final-cta-heading"
        className="home-v2-section border-t border-border-brand/40 bg-surface"
      >
        <SectionIntro
          headingId="providers-final-cta-heading"
          heading={page.finalCta.heading}
          subheading="Register on GGLBET or browse GGLBET games"
          body={page.finalCta.body}
          ctas={[
            {
              label: page.finalCta.primaryLabel,
              href: page.finalCta.primaryHref,
              variant: "primary",
            },
            {
              label: page.finalCta.secondaryLabel,
              href: page.finalCta.secondaryHref,
              variant: "outline",
            },
          ]}
        />
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href={ROUTES.download} variant="soft" aria-label="GGLBET Download">
            GGLBET Download
          </Button>
          <Button href={ROUTES.promotions} variant="ghost" aria-label="GGLBET Promotions">
            GGLBET Promotions
          </Button>
        </div>
      </Section>
    </>
  );
}
