import Link from "next/link";
import { Suspense } from "react";

import { GuideCard } from "@/components/cards/GuideCard";
import { SplitHero } from "@/components/heroes/SplitHero";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { InternalLinkRail } from "@/components/seo/InternalLinkRail";
import { SeoContainer } from "@/components/seo/SeoContainer";
import { Button } from "@/components/ui/Button";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { DsFaqAccordion } from "@/components/design-system/DsFaqAccordion";
import { Section } from "@/components/ui/Section";
import { HUB_MEDIA } from "@/constants/hub-media";
import { ROUTES, getGuideCategoryHref } from "@/constants/routes";
import { SITE_NAME } from "@/constants/site";
import { GuidesDirectoryResults } from "@/features/guides/components/GuidesDirectoryResults";
import { GuidesDirectoryToolbar } from "@/features/guides/components/GuidesDirectoryToolbar";
import { buildGuideItemListJsonLd } from "@/features/guides/seo/guide-json-ld";
import { HomeMediaFigure } from "@/features/home/components/HomeMediaFigure";
import { SectionIntro } from "@/features/home/components/SectionIntro";
import { createBreadcrumbs } from "@/lib/seo/breadcrumb";
import {
  buildBreadcrumbJsonLd,
  buildCollectionPageJsonLd,
  buildFaqPageJsonLd,
} from "@/lib/seo/json-ld";
import type {
  GuideCategoryListItem,
  GuideListItem,
  GuidesPageContent,
} from "@/types/guide";

type GuidesListingPageProps = {
  readonly page: GuidesPageContent;
  readonly guides: readonly GuideListItem[];
  readonly featured: readonly GuideListItem[];
  readonly categories: readonly GuideCategoryListItem[];
};

export function GuidesListingPage({
  page,
  guides,
  featured,
  categories,
}: GuidesListingPageProps) {
  const breadcrumb = createBreadcrumbs([
    { name: "Guides", path: ROUTES.guides },
  ]);

  return (
    <>
      <SeoContainer
        jsonLd={[
          buildCollectionPageJsonLd({
            name: page.seo.title,
            description: page.seo.description,
            path: page.seo.path,
            numberOfItems: guides.length,
          }),
          buildBreadcrumbJsonLd(breadcrumb),
          buildFaqPageJsonLd(page.faq),
          buildGuideItemListJsonLd(guides),
        ]}
      />

      <SplitHero
        id="guides-hero"
        headingId="guides-hero-heading"
        eyebrow="GGLBET Guides"
        brand={SITE_NAME}
        heading={page.hero.heading}
        subheading={page.hero.subheading}
        body={page.hero.body}
        imageSrc={HUB_MEDIA.guides}
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

      {featured.length > 0 ? (
        <Section
          id="featured-guides"
          padding="md"
          containerSize="wide"
          aria-labelledby="featured-guides-heading"
          tone="muted"
        >
          <SectionIntro
            headingId="featured-guides-heading"
            heading="Featured GGLBET guides"
            subheading="Start here on the GGLBET knowledge base"
            body="A short list of GGLBET guides that cover the questions players ask most often."
          />
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {featured.map((guide) => (
              <li key={guide.id}>
                <GuideCard guide={guide} />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section
        id="guide-categories"
        padding="lg"
        containerSize="wide"
        aria-labelledby="guide-categories-heading"
      >
        <SectionIntro
          headingId="guide-categories-heading"
          heading="GGLBET guide categories"
          subheading="Browse the GGLBET knowledge base by topic"
          body="Jump into beginner, slots, live casino, payments, VIP, security, or responsible gaming on GGLBET."
        />
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <li key={category.id}>
              <Card as="article" interactive className="h-full">
                <Link
                  href={getGuideCategoryHref(category.slug)}
                  className="block focus-visible:outline-none"
                  aria-label={`Open ${category.name}`}
                >
                  <CardTitle as="h3">{category.name}</CardTitle>
                  <CardDescription className="mt-2 line-clamp-3">
                    {category.intro}
                  </CardDescription>
                </Link>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="guides-directory"
        padding="md"
        containerSize="wide"
        aria-labelledby="guides-directory-heading"
        tone="muted"
      >
        <h2 id="guides-directory-heading" className="sr-only">
          Search and filter guides
        </h2>
        <Suspense fallback={<div className="h-40 rounded-card bg-surface-muted" />}>
          <GuidesDirectoryToolbar categories={categories} />
        </Suspense>
      </Section>

      <Suspense
        fallback={
          <Section padding="lg" containerSize="wide" aria-busy="true">
            <div className="h-64 rounded-card bg-surface-muted" />
          </Section>
        }
      >
        <GuidesDirectoryResults guides={guides} />
      </Suspense>

      <Section
        id="guides-seo-content"
        padding="lg"
        containerSize="wide"
        aria-labelledby="guides-seo-heading"
        tone="muted"
      >
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <SectionIntro
            headingId="guides-seo-heading"
            heading={page.seoContent.heading}
            subheading="How the GGLBET guide system helps players"
            body={page.seoContent.body}
          />
          <HomeMediaFigure
            src={HUB_MEDIA.guides}
            alt={page.seoContent.heading}
            aspect="wide"
            fallbackSrc={HUB_MEDIA.guides}
            sizes="(max-width: 1024px) 42vw, 440px"
          />
        </div>
        <nav aria-label="GGLBET guide internal links" className="mt-8">
          <ul className="flex flex-wrap gap-3 text-sm">
            {[
              { href: ROUTES.home, label: "GGLBET Home" },
              { href: ROUTES.games, label: "GGLBET Games" },
              { href: ROUTES.providers, label: "GGLBET Providers" },
              { href: ROUTES.promotions, label: "GGLBET Promotions" },
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
        id="guides-faq"
        padding="lg"
        containerSize="wide"
        aria-labelledby="guides-faq-heading"
      tone="glow"
      >
        <SectionIntro
          headingId="guides-faq-heading"
          heading="GGLBET guides FAQ"
          subheading="How the GGLBET knowledge base works"
          body="Quick answers about finding and using GGLBET guides."
        />
        <DsFaqAccordion items={page.faq} />
      </Section>

      <Section
        id="guides-internal-links"
        padding="md"
        containerSize="wide"
        aria-label="Site internal links"
      >
        <InternalLinkRail />
      </Section>

      <Section
        id="guides-final-cta"
        padding="lg"
        containerSize="wide"
        aria-labelledby="guides-final-cta-heading"
        className="home-v2-section border-t border-border-brand/40 bg-surface"
      >
        <SectionIntro
          headingId="guides-final-cta-heading"
          heading={page.finalCta.heading}
          subheading="Keep learning on GGLBET"
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
          <Button href={ROUTES.download} variant="soft">
            Download
          </Button>
          <Button href={ROUTES.payment} variant="ghost">
            Payment
          </Button>
        </div>
      </Section>
    </>
  );
}
