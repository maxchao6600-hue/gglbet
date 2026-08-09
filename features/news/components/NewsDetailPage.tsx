import Link from "next/link";

import { GameCard } from "@/components/cards/GameCard";
import { NewsCard } from "@/components/cards/NewsCard";
import { PromotionCard } from "@/components/cards/PromotionCard";
import { ProviderCard } from "@/components/cards/ProviderCard";
import { DsFaqAccordion } from "@/components/design-system/DsFaqAccordion";
import { DS } from "@/components/design-system/classes";
import { SplitHero } from "@/components/heroes/SplitHero";
import { CmsImageView } from "@/components/media/CmsImageView";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { GeoEeatMeta, GeoTldr } from "@/components/seo/GeoContent";
import { InternalLinkRail } from "@/components/seo/InternalLinkRail";
import { SeoContainer } from "@/components/seo/SeoContainer";
import { Button } from "@/components/ui/Button";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { HUB_MEDIA } from "@/constants/hub-media";
import { SITE_NAME } from "@/constants/site";
import { ContentRenderer, ContentToc } from "@/features/content";
import { SectionIntro } from "@/features/home/components/SectionIntro";
import { HomeMediaFigure } from "@/features/home/components/HomeMediaFigure";
import { buildNewsDetailJsonLd } from "@/features/news/seo/news-json-ld";
import {
  ROUTES,
  getAuthorHref,
  getGuideHref,
  getNewsCategoryHref,
} from "@/constants/routes";
import { createBreadcrumbs } from "@/lib/seo/breadcrumb";
import type { Game } from "@/types/game";
import type { NewsArticle, NewsCategory } from "@/types/news";
import type { Promotion } from "@/types/promotion";
import type { Provider } from "@/types/provider";
import { cn } from "@/utils/cn";

type NewsDetailPageProps = {
  readonly article: NewsArticle;
  readonly category: NewsCategory | null;
  readonly relatedNews: readonly NewsArticle[];
  readonly sameCategoryNews: readonly NewsArticle[];
  readonly relatedGames: readonly Game[];
  readonly relatedProviders: readonly Provider[];
  readonly relatedPromotions: readonly Promotion[];
};

export function NewsDetailPage({
  article,
  category,
  relatedNews,
  sameCategoryNews,
  relatedGames,
  relatedProviders,
  relatedPromotions,
}: NewsDetailPageProps) {
  const breadcrumb = createBreadcrumbs([
    { name: "News", path: ROUTES.news },
    {
      name: category?.name ?? article.category,
      path: getNewsCategoryHref(article.category),
    },
    { name: article.title, path: article.canonicalPath },
  ]);

  return (
    <>
      <SeoContainer
        jsonLd={buildNewsDetailJsonLd({
          article,
          breadcrumb,
          relatedNews,
        })}
      />

      <SplitHero
        id="news-hero"
        headingId="news-hero-heading"
        eyebrow={`${category?.shortName ?? article.category}${article.breaking ? " · Breaking" : ""}`}
        brand={SITE_NAME}
        heading={article.heroTitle}
        subheading={article.heroDescription}
        imageSrc={
          article.coverImage.url && article.coverImage.url.length > 0
            ? article.coverImage.url
            : HUB_MEDIA.newsDetail
        }
        imageAlt={
          article.coverImage.alt || `${article.title} on GGLBET`
        }
        ctas={[
          {
            label: article.ctaPrimaryLabel,
            href: article.ctaPrimaryHref,
            variant: "primary",
          },
          {
            label: article.ctaSecondaryLabel,
            href: article.ctaSecondaryHref,
            variant: "outline",
          },
        ]}
      />

      <Section padding="sm" containerSize="wide" aria-label="Breadcrumb">
        <Breadcrumbs items={breadcrumb} />
      </Section>

      <Section
        padding="md"
        containerSize="wide"
        aria-label={`${article.title} overview`}
        tone="glow"
      >
        <div className="relative z-[1] space-y-4">
          <GeoEeatMeta
            updatedDate={article.updatedDate}
            authorName={article.author.name}
            authorHref={getAuthorHref(article.author.slug)}
            reviewerName={article.reviewer?.name}
            factChecked
          />
          <GeoTldr text={article.excerpt} />
        </div>
      </Section>

      <Section
        id="news-introduction"
        padding="lg"
        containerSize="wide"
        aria-labelledby="news-introduction-heading"
      >
        <SectionIntro
          headingId="news-introduction-heading"
          heading="Introduction"
          subheading={article.category.replace("-", " ")}
          body={article.excerpt}
        />
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="News tags">
          {article.tags.map((tag) => (
            <li
              key={tag}
              className="home-v2-glass rounded-control px-3 py-1 text-xs font-medium text-ink-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      </Section>

      {article.tableOfContents.length > 0 ? (
        <Section
          id="news-toc"
          padding="md"
          containerSize="wide"
          aria-labelledby="news-toc-heading"
          tone="muted"
        >
          <h2 id="news-toc-heading" className="sr-only">
            Table of contents
          </h2>
          <ContentToc items={article.tableOfContents} />
        </Section>
      ) : null}

      <Section
        id="news-main-content"
        padding="lg"
        containerSize="wide"
        aria-labelledby="news-main-content-heading"
      >
        <h2 id="news-main-content-heading" className="sr-only">
          Main content
        </h2>
        <ContentRenderer blocks={article.content} />
      </Section>

      {article.timeline.length > 0 ? (
        <Section
          id="news-timeline"
          padding="lg"
          containerSize="wide"
          aria-labelledby="news-timeline-heading"
          tone="muted"
        >
          <SectionIntro
            headingId="news-timeline-heading"
            heading="Timeline"
            subheading="Key dates for this story"
            body="Key dates that track how this GGLBET news story developed."
          />
          <ol className="mt-8 space-y-4">
            {article.timeline.map((item) => (
              <li
                key={item.id}
                className="home-v2-glass rounded-card p-card"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-brand">
                  {new Date(item.date).toLocaleDateString("en-GB")} ·{" "}
                  {item.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </Section>
      ) : null}

      <Section
        id="news-faq"
        padding="lg"
        containerSize="wide"
        aria-labelledby="news-faq-heading"
      tone="glow"
      >
        <SectionIntro
          headingId="news-faq-heading"
          heading="FAQ"
          subheading="Common questions about this story"
          body="Quick answers about the topics covered in this GGLBET news article."
        />
        <DsFaqAccordion items={article.faq} />
      </Section>

      {relatedNews.length > 0 ? (
        <Section
          id="related-news"
          padding="lg"
          containerSize="wide"
          aria-labelledby="related-news-heading"
          tone="muted"
        >
          <SectionIntro
            headingId="related-news-heading"
            heading="Related news"
            subheading="Continue reading on GGLBET"
            body="More GGLBET news that connects to this story."
          />
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {relatedNews.map((item) => (
              <li key={item.id}>
                <NewsCard article={item} />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {sameCategoryNews.length > 0 ? (
        <Section
          id="same-category-news"
          padding="lg"
          containerSize="wide"
          aria-labelledby="same-category-news-heading"
        >
          <SectionIntro
            headingId="same-category-news-heading"
            heading="Same category"
            subheading={`More ${category?.name ?? article.category}`}
            body={`More ${category?.name ?? article.category} coverage on GGLBET.`}
            ctas={[
              {
                label: "View category",
                href: getNewsCategoryHref(article.category),
                variant: "outline",
              },
            ]}
          />
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {sameCategoryNews.map((item) => (
              <li key={item.id}>
                <NewsCard article={item} />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {relatedPromotions.length > 0 ? (
        <Section
          id="related-promotions"
          padding="lg"
          containerSize="wide"
          aria-labelledby="related-promotions-heading"
          tone="muted"
        >
          <SectionIntro
            headingId="related-promotions-heading"
            heading="Related promotions"
            subheading="Offers connected to this story"
            body="GGLBET promotions that pair with this news story."
          />
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {relatedPromotions.map((promotion) => (
              <li key={promotion.id}>
                <PromotionCard promotion={promotion} />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {relatedGames.length > 0 ? (
        <Section
          id="related-games"
          padding="lg"
          containerSize="wide"
          aria-labelledby="related-games-heading"
        >
          <SectionIntro
            headingId="related-games-heading"
            heading="Related games"
            subheading="Games connected to this story"
            body="GGLBET games mentioned or useful alongside this article."
          />
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {relatedGames.map((game) => (
              <li key={game.id}>
                <GameCard game={game} />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {relatedProviders.length > 0 ? (
        <Section
          id="related-providers"
          padding="lg"
          containerSize="wide"
          aria-labelledby="related-providers-heading"
          tone="muted"
        >
          <SectionIntro
            headingId="related-providers-heading"
            heading="Related providers"
            subheading="Studios connected to this story"
            body="Studios mentioned or useful alongside this GGLBET news article."
          />
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {relatedProviders.map((provider) => (
              <li key={provider.id}>
                <ProviderCard provider={provider} />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section
        id="related-guides"
        padding="lg"
        containerSize="wide"
        aria-labelledby="related-guides-heading"
      >
        <SectionIntro
          headingId="related-guides-heading"
          heading="Related guides"
          subheading="Read GGLBET guides before you act"
          body="GGLBET guides that go deeper on topics from this story."
        />
        <Card className="mt-8">
          <CardTitle as="h3">Related guides</CardTitle>
          <ul className="mt-4 space-y-2 text-sm">
            {article.relatedGuideSlugs.length > 0 ? (
              article.relatedGuideSlugs.map((slug) => (
                <li key={slug}>
                  <Link
                    href={getGuideHref(article.category, slug)}
                    className="text-brand hover:text-primary-hover"
                  >
                    {slug}
                  </Link>
                </li>
              ))
            ) : (
              <li className="text-ink-muted">
                <Link href={ROUTES.guides}>Browse guides</Link>
              </li>
            )}
          </ul>
        </Card>
      </Section>

      <Section
        id="news-author"
        padding="lg"
        containerSize="wide"
        aria-labelledby="news-author-heading"
      >
        <SectionIntro
          headingId="news-author-heading"
          heading="Author and reviewer"
          subheading="Who wrote and reviewed this story"
          body="Meet the people behind this GGLBET news article."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Card>
            <CardTitle as="h3">
              <Link
                href={getAuthorHref(article.author.slug)}
                className="hover:text-brand"
              >
                {article.author.name}
              </Link>
            </CardTitle>
            <CardDescription className="mt-2">
              {article.author.role ?? "Author"}
              {article.author.bio ? ` · ${article.author.bio}` : ""}
            </CardDescription>
          </Card>
          {article.reviewer ? (
            <Card>
              <CardTitle as="h3">
                <Link
                  href={getAuthorHref(article.reviewer.slug)}
                  className="hover:text-brand"
                >
                  {article.reviewer.name}
                </Link>
              </CardTitle>
              <CardDescription className="mt-2">
                {article.reviewer.role ?? "Reviewer"}
                {article.reviewer.bio ? ` · ${article.reviewer.bio}` : ""}
              </CardDescription>
            </Card>
          ) : null}
        </div>
        <p className="mt-6 text-sm text-ink-subtle">
          Last updated{" "}
          <time dateTime={article.updatedDate}>
            {new Date(article.updatedDate).toLocaleDateString("en-GB")}
          </time>
        </p>
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
          heading="Ready for the next step?"
          subheading="Apply what you learned on GGLBET"
          body="Choose a clear next step—and keep responsible gaming tools nearby when reading turns into play."
          ctas={[
            {
              label: article.ctaPrimaryLabel,
              href: article.ctaPrimaryHref,
              variant: "primary",
            },
            {
              label: "Register",
              href: ROUTES.register,
              variant: "outline",
            },
            {
              label: "Log in",
              href: ROUTES.login,
              variant: "ghost",
            },
            {
              label: "Responsible Gaming",
              href: ROUTES.responsibleGaming,
              variant: "soft",
            },
          ]}
        />
      </Section>
    </>
  );
}
