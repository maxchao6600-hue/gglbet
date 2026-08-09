import Link from "next/link";

import { GuideCard } from "@/components/cards/GuideCard";
import { SplitHero } from "@/components/heroes/SplitHero";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SeoContainer } from "@/components/seo/SeoContainer";
import { Button } from "@/components/ui/Button";
import { DsFaqAccordion } from "@/components/design-system/DsFaqAccordion";
import { Section } from "@/components/ui/Section";
import { HUB_MEDIA } from "@/constants/hub-media";
import { ROUTES } from "@/constants/routes";
import { SITE_NAME } from "@/constants/site";
import {
  buildGuideCategoryWebPageJsonLd,
  buildGuideItemListJsonLd,
} from "@/features/guides/seo/guide-json-ld";
import { HomeMediaFigure } from "@/features/home/components/HomeMediaFigure";
import { SectionIntro } from "@/features/home/components/SectionIntro";
import { createBreadcrumbs } from "@/lib/seo/breadcrumb";
import {
  buildBreadcrumbJsonLd,
  buildFaqPageJsonLd,
} from "@/lib/seo/json-ld";
import type { Guide, GuideCategory } from "@/types/guide";

type GuideCategoryPageProps = {
  readonly category: GuideCategory;
  readonly guides: readonly Guide[];
};

export function GuideCategoryPageView({
  category,
  guides,
}: GuideCategoryPageProps) {
  const breadcrumb = createBreadcrumbs([
    { name: "Guides", path: ROUTES.guides },
    { name: category.name, path: category.canonicalPath },
  ]);

  return (
    <>
      <SeoContainer
        jsonLd={[
          buildGuideCategoryWebPageJsonLd(category),
          buildBreadcrumbJsonLd(breadcrumb),
          buildFaqPageJsonLd(category.faq),
          buildGuideItemListJsonLd(guides),
        ]}
      />

      <SplitHero
        id="guide-category-hero"
        headingId="guide-category-hero-heading"
        eyebrow="Guide category"
        brand={SITE_NAME}
        heading={category.heroTitle}
        subheading={category.heroDescription}
        body={category.intro}
        imageSrc={HUB_MEDIA.guides}
        imageAlt={`${category.name} on GGLBET`}
        ctas={[
          {
            label: category.ctaPrimaryLabel,
            href: category.ctaPrimaryHref,
            variant: "primary",
          },
          {
            label: category.ctaSecondaryLabel,
            href: category.ctaSecondaryHref,
            variant: "outline",
          },
        ]}
      />

      <Section padding="sm" containerSize="wide" aria-label="Breadcrumb">
        <Breadcrumbs items={breadcrumb} />
      </Section>

      <Section
        id="guide-category-list"
        padding="lg"
        containerSize="wide"
        aria-labelledby="guide-category-list-heading"
      >
        <SectionIntro
          headingId="guide-category-list-heading"
          heading={`${category.name} articles`}
          subheading={`${guides.length} published guides in this GGLBET category`}
          body={`Browse every GGLBET guide filed under ${category.shortName}.`}
        />
        {guides.length > 0 ? (
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {guides.map((guide) => (
              <li key={guide.id}>
                <GuideCard guide={guide} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-8 home-v2-glass rounded-card p-card text-ink-muted">
            No published guides in this category yet.
          </p>
        )}
      </Section>

      <Section
        id="guide-category-seo"
        padding="lg"
        containerSize="wide"
        aria-labelledby="guide-category-seo-heading"
        tone="muted"
      >
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <SectionIntro
            headingId="guide-category-seo-heading"
            heading={`${category.name} on GGLBET`}
            subheading="Category-level educational context"
            body={category.seoContent}
          />
          <HomeMediaFigure
            src={HUB_MEDIA.guides}
            alt={`${category.name} on GGLBET`}
            aspect="wide"
            fallbackSrc={HUB_MEDIA.guides}
            sizes="(max-width: 1024px) 42vw, 440px"
          />
        </div>
      </Section>

      <Section
        id="guide-category-faq"
        padding="lg"
        containerSize="wide"
        aria-labelledby="guide-category-faq-heading"
      tone="glow"
      >
        <SectionIntro
          headingId="guide-category-faq-heading"
          heading={`${category.name} FAQ`}
          subheading="Category questions"
          body={`Quick answers about ${category.shortName} guides on GGLBET.`}
        />
        <DsFaqAccordion items={category.faq} />
      </Section>

      <Section
        id="guide-category-cta"
        padding="lg"
        containerSize="wide"
        aria-labelledby="guide-category-cta-heading"
        className="home-v2-section border-t border-border-brand/40 bg-surface"
      >
        <SectionIntro
          headingId="guide-category-cta-heading"
          heading={`Continue exploring ${category.shortName}`}
          subheading="Return to the library or open related product areas"
          body="Keep learning on GGLBET, or jump into games when you are ready."
          ctas={[
            {
              label: category.ctaPrimaryLabel,
              href: category.ctaPrimaryHref,
              variant: "primary",
            },
            {
              label: "Games",
              href: ROUTES.games,
              variant: "outline",
            },
          ]}
        />
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href={ROUTES.responsibleGaming} variant="soft">
            Responsible Gaming
          </Button>
          <Button href={ROUTES.register} variant="ghost">
            Register
          </Button>
          <Link
            href={ROUTES.guides}
            className="inline-flex h-11 items-center rounded-control border border-border px-4 text-sm font-semibold text-ink-muted hover:border-border-brand hover:text-ink"
          >
            All guides
          </Link>
        </div>
      </Section>
    </>
  );
}
