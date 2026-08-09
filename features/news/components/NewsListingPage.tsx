import Link from "next/link";
import { Suspense } from "react";

import { NewsCard } from "@/components/cards/NewsCard";
import { SplitHero } from "@/components/heroes/SplitHero";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { InternalLinkRail } from "@/components/seo/InternalLinkRail";
import { SeoContainer } from "@/components/seo/SeoContainer";
import { Button } from "@/components/ui/Button";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { DsFaqAccordion } from "@/components/design-system/DsFaqAccordion";
import { Section } from "@/components/ui/Section";
import { HUB_MEDIA } from "@/constants/hub-media";
import { ROUTES, getNewsCategoryHref } from "@/constants/routes";
import { SITE_NAME } from "@/constants/site";
import { HomeMediaFigure } from "@/features/home/components/HomeMediaFigure";
import { SectionIntro } from "@/features/home/components/SectionIntro";
import { NewsDirectoryResults } from "@/features/news/components/NewsDirectoryResults";
import { NewsDirectoryToolbar } from "@/features/news/components/NewsDirectoryToolbar";
import { buildNewsItemListJsonLd } from "@/features/news/seo/news-json-ld";
import { createBreadcrumbs } from "@/lib/seo/breadcrumb";
import {
  buildBreadcrumbJsonLd,
  buildCollectionPageJsonLd,
  buildFaqPageJsonLd,
} from "@/lib/seo/json-ld";
import type { NewsArticle, NewsCategory, NewsPageContent } from "@/types/news";

type NewsListingPageProps = {
  readonly page: NewsPageContent;
  readonly articles: readonly NewsArticle[];
  readonly featured: readonly NewsArticle[];
  readonly breaking: readonly NewsArticle[];
  readonly categories: readonly NewsCategory[];
};

export function NewsListingPage({
  page,
  articles,
  featured,
  breaking,
  categories,
}: NewsListingPageProps) {
  const breadcrumb = createBreadcrumbs([{ name: "News", path: ROUTES.news }]);
  const curated = breaking.length > 0 ? breaking : featured;
  const curatedIsBreaking = breaking.length > 0;

  return (
    <>
      <SeoContainer
        jsonLd={[
          buildCollectionPageJsonLd({
            name: page.seo.title,
            description: page.seo.description,
            path: page.seo.path,
            numberOfItems: articles.length,
          }),
          buildBreadcrumbJsonLd(breadcrumb),
          buildFaqPageJsonLd(page.faq),
          buildNewsItemListJsonLd(articles),
        ]}
      />

      <SplitHero
        id="news-hero"
        headingId="news-hero-heading"
        eyebrow="GGLBET News"
        brand={SITE_NAME}
        heading={page.hero.heading}
        subheading={page.hero.subheading}
        body={page.hero.body}
        imageSrc={HUB_MEDIA.news}
        imageAlt={page.hero.mediaLabel}
        ctas={[
          { label: "GGLBET Promotions", href: ROUTES.promotions, variant: "primary" },
          { label: "Register on GGLBET", href: ROUTES.register, variant: "outline" },
        ]}
      />

      <Section padding="sm" containerSize="wide" aria-label="Breadcrumb">
        <Breadcrumbs items={breadcrumb} />
      </Section>

      {curated.length > 0 ? (
        <Section
          id={curatedIsBreaking ? "breaking-news" : "featured-news"}
          padding="md"
          containerSize="wide"
          aria-labelledby={
            curatedIsBreaking ? "breaking-news-heading" : "featured-news-heading"
          }
          tone="muted"
        >
          <SectionIntro
            headingId={
              curatedIsBreaking ? "breaking-news-heading" : "featured-news-heading"
            }
            heading={
              curatedIsBreaking ? "Breaking GGLBET news" : "Featured GGLBET stories"
            }
            subheading={
              curatedIsBreaking
                ? "Time-sensitive updates on GGLBET"
                : "Highlighted announcements on GGLBET"
            }
            body={
              curatedIsBreaking
                ? "Urgent GGLBET updates to verify before you act on offers or account changes."
                : "A short list of GGLBET stories worth reading before you browse the full newsroom."
            }
          />
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {curated.map((article) => (
              <li key={article.id}>
                <NewsCard article={article} />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section
        id="news-categories"
        padding="lg"
        containerSize="wide"
        aria-labelledby="news-categories-heading"
      >
        <SectionIntro
          headingId="news-categories-heading"
          heading="GGLBET news categories"
          subheading="Browse the GGLBET newsroom by topic"
          body="Jump into promotions, sports, slots, VIP, and platform updates on GGLBET."
        />
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <li key={category.id}>
              <Card as="article" interactive className="h-full">
                <Link
                  href={getNewsCategoryHref(category.slug)}
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
        id="news-directory"
        padding="md"
        containerSize="wide"
        aria-labelledby="news-directory-heading"
        tone="muted"
      >
        <h2 id="news-directory-heading" className="sr-only">
          Search and filter news
        </h2>
        <Suspense fallback={<div className="h-40 rounded-card bg-surface-muted" />}>
          <NewsDirectoryToolbar categories={categories} />
        </Suspense>
      </Section>

      <Suspense
        fallback={
          <Section padding="lg" containerSize="wide" aria-busy="true">
            <div className="h-64 rounded-card bg-surface-muted" />
          </Section>
        }
      >
        <NewsDirectoryResults articles={articles} />
      </Suspense>

      <Section
        id="news-seo-content"
        padding="lg"
        containerSize="wide"
        aria-labelledby="news-seo-heading"
        tone="muted"
      >
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <SectionIntro
            headingId="news-seo-heading"
            heading={page.seoContent.heading}
            subheading="How the GGLBET news hub stays useful"
            body={page.seoContent.body}
          />
          <HomeMediaFigure
            src={HUB_MEDIA.news}
            alt={page.seoContent.heading}
            aspect="wide"
            fallbackSrc={HUB_MEDIA.news}
            sizes="(max-width: 1024px) 42vw, 440px"
          />
        </div>
        <nav aria-label="GGLBET news internal links" className="mt-8">
          <ul className="flex flex-wrap gap-3 text-sm">
            {[
              { href: ROUTES.home, label: "GGLBET Home" },
              { href: ROUTES.games, label: "GGLBET Games" },
              { href: ROUTES.providers, label: "GGLBET Providers" },
              { href: ROUTES.promotions, label: "GGLBET Promotions" },
              { href: ROUTES.guides, label: "GGLBET Guides" },
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
        id="news-faq"
        padding="lg"
        containerSize="wide"
        aria-labelledby="news-faq-heading"
      tone="glow"
      >
        <SectionIntro
          headingId="news-faq-heading"
          heading="GGLBET news FAQ"
          subheading="How the GGLBET newsroom works"
          body="Quick answers about reading and verifying GGLBET news."
        />
        <DsFaqAccordion items={page.faq} />
      </Section>

      <Section
        id="news-internal-links"
        padding="md"
        containerSize="wide"
        aria-label="Site internal links"
      >
        <InternalLinkRail />
      </Section>

      <Section
        id="news-final-cta"
        padding="lg"
        containerSize="wide"
        aria-labelledby="news-final-cta-heading"
        className="home-v2-section border-t border-border-brand/40 bg-surface"
      >
        <SectionIntro
          headingId="news-final-cta-heading"
          heading={page.finalCta.heading}
          subheading="Stay with GGLBET after you verify"
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
