import Link from "next/link";

import { NewsCard } from "@/components/cards/NewsCard";
import { SplitHero } from "@/components/heroes/SplitHero";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SeoContainer } from "@/components/seo/SeoContainer";
import { Button } from "@/components/ui/Button";
import { DsFaqAccordion } from "@/components/design-system/DsFaqAccordion";
import { Section } from "@/components/ui/Section";
import { HUB_MEDIA } from "@/constants/hub-media";
import { ROUTES } from "@/constants/routes";
import { SITE_NAME } from "@/constants/site";
import { HomeMediaFigure } from "@/features/home/components/HomeMediaFigure";
import { SectionIntro } from "@/features/home/components/SectionIntro";
import {
  buildNewsCategoryWebPageJsonLd,
  buildNewsItemListJsonLd,
} from "@/features/news/seo/news-json-ld";
import { createBreadcrumbs } from "@/lib/seo/breadcrumb";
import { buildBreadcrumbJsonLd, buildFaqPageJsonLd } from "@/lib/seo/json-ld";
import type { NewsArticle, NewsCategory } from "@/types/news";

type NewsCategoryPageProps = {
  readonly category: NewsCategory;
  readonly articles: readonly NewsArticle[];
};

export function NewsCategoryPageView({
  category,
  articles,
}: NewsCategoryPageProps) {
  const breadcrumb = createBreadcrumbs([
    { name: "News", path: ROUTES.news },
    { name: category.name, path: category.canonicalPath },
  ]);

  return (
    <>
      <SeoContainer
        jsonLd={[
          buildNewsCategoryWebPageJsonLd(category),
          buildBreadcrumbJsonLd(breadcrumb),
          buildFaqPageJsonLd(category.faq),
          buildNewsItemListJsonLd(articles),
        ]}
      />

      <SplitHero
        id="news-category-hero"
        headingId="news-category-hero-heading"
        eyebrow="News category"
        brand={SITE_NAME}
        heading={category.heroTitle}
        subheading={category.heroDescription}
        body={category.intro}
        imageSrc={HUB_MEDIA.news}
        imageAlt={`${category.name} on GGLBET`}
        ctas={[
          { label: "All news", href: ROUTES.news, variant: "primary" },
          {
            label: "Browse promotions",
            href: ROUTES.promotions,
            variant: "outline",
          },
        ]}
      />

      <Section padding="sm" containerSize="wide" aria-label="Breadcrumb">
        <Breadcrumbs items={breadcrumb} />
      </Section>

      <Section
        id="news-category-list"
        padding="lg"
        containerSize="wide"
        aria-labelledby="news-category-list-heading"
      >
        <SectionIntro
          headingId="news-category-list-heading"
          heading={`${category.name} articles`}
          subheading={`${articles.length} published stories in this GGLBET category`}
          body={`Browse every GGLBET story filed under ${category.shortName}.`}
        />
        {articles.length > 0 ? (
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {articles.map((article) => (
              <li key={article.id}>
                <NewsCard article={article} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-8 home-v2-glass rounded-card p-card text-ink-muted">
            No published news in this category yet.
          </p>
        )}
      </Section>

      <Section
        id="news-category-seo"
        padding="lg"
        containerSize="wide"
        aria-labelledby="news-category-seo-heading"
        tone="muted"
      >
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <SectionIntro
            headingId="news-category-seo-heading"
            heading={`${category.name} on GGLBET`}
            subheading="Category-level editorial context"
            body={category.seoContent}
          />
          <HomeMediaFigure
            src={HUB_MEDIA.news}
            alt={`${category.name} on GGLBET`}
            aspect="wide"
            fallbackSrc={HUB_MEDIA.news}
            sizes="(max-width: 1024px) 42vw, 440px"
          />
        </div>
      </Section>

      <Section
        id="news-category-faq"
        padding="lg"
        containerSize="wide"
        aria-labelledby="news-category-faq-heading"
      tone="glow"
      >
        <SectionIntro
          headingId="news-category-faq-heading"
          heading={`${category.name} FAQ`}
          subheading="Category questions"
          body={`Quick answers about ${category.shortName} news on GGLBET.`}
        />
        <DsFaqAccordion items={category.faq} />
      </Section>

      <Section
        id="news-category-cta"
        padding="lg"
        containerSize="wide"
        aria-labelledby="news-category-cta-heading"
        className="home-v2-section border-t border-border-brand/40 bg-surface"
      >
        <SectionIntro
          headingId="news-category-cta-heading"
          heading={`Continue exploring ${category.shortName}`}
          subheading="Return to the hub or open related product areas"
          body="Stay with GGLBET news, or jump into games and promotions when you are ready."
          ctas={[
            { label: "All news", href: ROUTES.news, variant: "primary" },
            { label: "Games", href: ROUTES.games, variant: "outline" },
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
            href={ROUTES.news}
            className="inline-flex h-11 items-center rounded-control border border-border px-4 text-sm font-semibold text-ink-muted hover:border-border-brand hover:text-ink"
          >
            All news
          </Link>
        </div>
      </Section>
    </>
  );
}
