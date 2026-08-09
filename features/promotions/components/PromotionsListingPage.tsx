import Link from "next/link";
import { Suspense } from "react";

import { PromotionCard } from "@/components/cards/PromotionCard";
import { SplitHero } from "@/components/heroes/SplitHero";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { InternalLinkRail } from "@/components/seo/InternalLinkRail";
import { SeoContainer } from "@/components/seo/SeoContainer";
import { Button } from "@/components/ui/Button";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { DsFaqAccordion } from "@/components/design-system/DsFaqAccordion";
import { Section } from "@/components/ui/Section";
import { HUB_MEDIA } from "@/constants/hub-media";
import { ROUTES } from "@/constants/routes";
import { SITE_NAME } from "@/constants/site";
import { HomeMediaFigure } from "@/features/home/components/HomeMediaFigure";
import { SectionIntro } from "@/features/home/components/SectionIntro";
import { PromotionsDirectoryResults } from "@/features/promotions/components/PromotionsDirectoryResults";
import { PromotionsDirectoryToolbar } from "@/features/promotions/components/PromotionsDirectoryToolbar";
import { buildPromotionItemListJsonLd } from "@/features/promotions/seo/promotion-json-ld";
import { createBreadcrumbs } from "@/lib/seo/breadcrumb";
import {
  buildBreadcrumbJsonLd,
  buildCollectionPageJsonLd,
  buildFaqPageJsonLd,
} from "@/lib/seo/json-ld";
import type { Promotion, PromotionsPageContent } from "@/types/promotion";

type PromotionsListingPageProps = {
  readonly page: PromotionsPageContent;
  readonly promotions: readonly Promotion[];
  readonly featured: readonly Promotion[];
};

export function PromotionsListingPage({
  page,
  promotions,
  featured,
}: PromotionsListingPageProps) {
  const breadcrumb = createBreadcrumbs([
    { name: "Promotions", path: ROUTES.promotions },
  ]);
  const listingHeroArt =
    featured[0]?.coverImage.url ||
    featured[0]?.bannerImage.url ||
    promotions[0]?.coverImage.url ||
    HUB_MEDIA.promotions;
  const listingHeroAlt =
    featured[0]?.coverImage.alt ||
    featured[0]?.bannerImage.alt ||
    page.hero.mediaLabel;

  return (
    <>
      <SeoContainer
        jsonLd={[
          buildCollectionPageJsonLd({
            name: page.seo.title,
            description: page.seo.description,
            path: page.seo.path,
            numberOfItems: promotions.length,
          }),
          buildBreadcrumbJsonLd(breadcrumb),
          buildFaqPageJsonLd(page.faq),
          buildPromotionItemListJsonLd(promotions),
        ]}
      />

      <SplitHero
        id="promotions-hero"
        headingId="promotions-hero-heading"
        eyebrow="GGLBET Promotions"
        brand={SITE_NAME}
        heading={page.hero.heading}
        subheading={page.hero.subheading}
        body={page.hero.body}
        imageSrc={listingHeroArt}
        imageAlt={listingHeroAlt}
        ctas={[
          { label: "Register on GGLBET", href: ROUTES.register, variant: "primary" },
          { label: "GGLBET Login", href: ROUTES.login, variant: "outline" },
        ]}
      />

      <Section padding="sm" containerSize="wide" aria-label="Breadcrumb">
        <Breadcrumbs items={breadcrumb} />
      </Section>

      {featured.length > 0 ? (
        <Section
          id="featured-promotions"
          padding="md"
          containerSize="wide"
          aria-labelledby="featured-promotions-heading"
          tone="muted"
        >
          <SectionIntro
            headingId="featured-promotions-heading"
            heading="Featured GGLBET promotions"
            subheading="Highlighted offers on GGLBET"
            body="A short list of GGLBET campaigns worth checking before you browse every offer."
          />
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {featured.map((promotion) => (
              <li key={promotion.id}>
                <PromotionCard promotion={promotion} />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section
        id="promotion-types"
        padding="lg"
        containerSize="wide"
        aria-labelledby="promotion-types-heading"
      >
        <SectionIntro
          headingId="promotion-types-heading"
          heading="GGLBET offer types"
          subheading="Browse GGLBET promotions by bonus mechanic"
          body="Pick a GGLBET offer type to understand how welcome, reload, cashback, and other bonuses differ."
        />
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {page.categories.map((category) => (
            <li key={category.id}>
              <Card as="article" className="h-full">
                <CardTitle as="h3">{category.label}</CardTitle>
                <CardDescription className="mt-2 line-clamp-3">
                  {category.body}
                </CardDescription>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="promotions-directory"
        padding="md"
        containerSize="wide"
        aria-labelledby="promotions-directory-heading"
        tone="muted"
      >
        <h2 id="promotions-directory-heading" className="sr-only">
          Search and filter promotions
        </h2>
        <Suspense fallback={<div className="h-40 rounded-card bg-surface-muted" />}>
          <PromotionsDirectoryToolbar categories={page.categories} />
        </Suspense>
      </Section>

      <Suspense
        fallback={
          <Section padding="lg" containerSize="wide" aria-busy="true">
            <div className="h-64 rounded-card bg-surface-muted" />
          </Section>
        }
      >
        <PromotionsDirectoryResults promotions={promotions} />
      </Suspense>

      <Section
        id="promotions-seo-content"
        padding="lg"
        containerSize="wide"
        aria-labelledby="promotions-seo-heading"
        tone="muted"
      >
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <SectionIntro
            headingId="promotions-seo-heading"
            heading={page.seoContent.heading}
            subheading="How GGLBET promotions help you compare offers"
            body={page.seoContent.body}
          />
          <HomeMediaFigure
            src={listingHeroArt}
            alt={page.seoContent.heading}
            aspect="wide"
            fallbackSrc={listingHeroArt}
            sizes="(max-width: 1024px) 42vw, 440px"
          />
        </div>
        <nav aria-label="GGLBET promotions internal links" className="mt-8">
          <ul className="flex flex-wrap gap-3 text-sm">
            {[
              { href: ROUTES.home, label: "GGLBET Home" },
              { href: ROUTES.games, label: "GGLBET Games" },
              { href: ROUTES.providers, label: "GGLBET Providers" },
              { href: ROUTES.guides, label: "GGLBET Guides" },
              { href: ROUTES.news, label: "GGLBET News" },
              { href: ROUTES.faq, label: "GGLBET FAQ" },
              { href: ROUTES.payment, label: "GGLBET Payment" },
              { href: ROUTES.download, label: "GGLBET Download" },
              { href: ROUTES.register, label: "Register on GGLBET" },
              { href: ROUTES.login, label: "GGLBET Login" },
              { href: ROUTES.responsibleGaming, label: "GGLBET Responsible Gaming" },
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
        id="promotions-faq"
        padding="lg"
        containerSize="wide"
        aria-labelledby="promotions-faq-heading"
      tone="glow"
      >
        <SectionIntro
          headingId="promotions-faq-heading"
          heading="GGLBET promotions FAQ"
          subheading="How the GGLBET offers hub works"
          body="Quick answers about reading and comparing GGLBET promotions."
        />
        <DsFaqAccordion items={page.faq} />
      </Section>

      <Section
        id="promotions-internal-links"
        padding="md"
        containerSize="wide"
        aria-label="Site internal links"
      >
        <InternalLinkRail />
      </Section>

      <Section
        id="promotions-final-cta"
        padding="lg"
        containerSize="wide"
        aria-labelledby="promotions-final-cta-heading"
        className="home-v2-section border-t border-border-brand/40 bg-surface"
      >
        <SectionIntro
          headingId="promotions-final-cta-heading"
          heading={page.finalCta.heading}
          subheading="Confirm on gglbet5.com, then return to GGLBET"
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
          <Button href={ROUTES.responsibleGaming} variant="soft">
            Responsible Gaming
          </Button>
          <Button href={ROUTES.guides} variant="ghost">
            Read guides
          </Button>
        </div>
      </Section>
    </>
  );
}
