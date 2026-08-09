import Link from "next/link";

import { GameCard } from "@/components/cards/GameCard";
import { GuideCard } from "@/components/cards/GuideCard";
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
import { buildGuideDetailJsonLd } from "@/features/guides/seo/guide-json-ld";
import { SectionIntro } from "@/features/home/components/SectionIntro";
import { HomeMediaFigure } from "@/features/home/components/HomeMediaFigure";
import {
  ROUTES,
  getAuthorHref,
  getGuideCategoryHref,
  getPromotionHref,
} from "@/constants/routes";
import { createBreadcrumbs } from "@/lib/seo/breadcrumb";
import type { Game } from "@/types/game";
import type { Guide, GuideCategory } from "@/types/guide";
import type { Provider } from "@/types/provider";
import { cn } from "@/utils/cn";

type GuideDetailPageProps = {
  readonly guide: Guide;
  readonly category: GuideCategory | null;
  readonly relatedGuides: readonly Guide[];
  readonly sameCategoryGuides: readonly Guide[];
  readonly relatedGames: readonly Game[];
  readonly relatedProviders: readonly Provider[];
};

function BulletSection({
  headingId,
  heading,
  subheading,
  body,
  items,
  className,
}: {
  readonly headingId: string;
  readonly heading: string;
  readonly subheading: string;
  readonly body: string;
  readonly items: readonly string[];
  readonly className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <Section
      padding="lg"
      containerSize="wide"
      aria-labelledby={headingId}
      tone="glow"
      className={className}
    >
      <SectionIntro
        headingId={headingId}
        heading={heading}
        subheading={subheading}
        body={body}
      />
      <ul className="relative z-[1] mt-8 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={item}
            className={cn(DS.glassPad, "text-sm text-ink-muted")}
          >
            {item}
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function GuideDetailPage({
  guide,
  category,
  relatedGuides,
  sameCategoryGuides,
  relatedGames,
  relatedProviders,
}: GuideDetailPageProps) {
  const breadcrumb = createBreadcrumbs([
    { name: "Guides", path: ROUTES.guides },
    {
      name: category?.name ?? guide.category,
      path: getGuideCategoryHref(guide.category),
    },
    { name: guide.title, path: guide.canonicalPath },
  ]);

  return (
    <>
      <SeoContainer
        jsonLd={buildGuideDetailJsonLd({
          guide,
          breadcrumb,
          relatedGuides,
        })}
      />

      <SplitHero
        id="guide-hero"
        headingId="guide-hero-heading"
        eyebrow={`${category?.shortName ?? guide.category} · ${guide.difficulty}`}
        brand={SITE_NAME}
        heading={guide.heroTitle}
        subheading={guide.heroDescription}
        imageSrc={
          guide.coverImage.url && guide.coverImage.url.length > 0
            ? guide.coverImage.url
            : HUB_MEDIA.guideDetail
        }
        imageAlt={
          guide.coverImage.alt || `${guide.title} on GGLBET`
        }
        ctas={[
          {
            label: guide.ctaPrimaryLabel,
            href: guide.ctaPrimaryHref,
            variant: "primary",
          },
          {
            label: guide.ctaSecondaryLabel,
            href: guide.ctaSecondaryHref,
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
        aria-label={`${guide.title} overview`}
        tone="glow"
      >
        <div className="relative z-[1] space-y-4">
          <GeoEeatMeta
            updatedDate={guide.updatedDate}
            authorName={guide.author.name}
            authorHref={getAuthorHref(guide.author.slug)}
            reviewerName={guide.reviewer?.name}
            factChecked
          />
          <p className="text-sm text-ink-subtle">
            {guide.readingTime} min read · {guide.difficulty}
          </p>
          <GeoTldr text={guide.excerpt} />
        </div>
      </Section>

      <Section
        id="guide-introduction"
        padding="lg"
        containerSize="wide"
        aria-labelledby="guide-introduction-heading"
      >
        <SectionIntro
          headingId="guide-introduction-heading"
          heading="Introduction"
          subheading={guide.subCategory.replace("-", " ")}
          body={guide.excerpt}
        />
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Guide tags">
          {guide.tags.map((tag) => (
            <li
              key={tag}
              className="home-v2-glass rounded-control px-3 py-1 text-xs font-medium text-ink-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="guide-toc"
        padding="md"
        containerSize="wide"
        aria-labelledby="guide-toc-heading"
        tone="muted"
      >
        <h2 id="guide-toc-heading" className="sr-only">
          Table of contents
        </h2>
        <ContentToc items={guide.tableOfContents} />
      </Section>

      <Section
        id="guide-main-content"
        padding="lg"
        containerSize="wide"
        aria-labelledby="guide-main-content-heading"
      >
        <h2 id="guide-main-content-heading" className="sr-only">
          Main content
        </h2>
        <ContentRenderer blocks={guide.content} />
      </Section>

      <BulletSection
        headingId="guide-tips-heading"
        heading="Tips"
        subheading="Practical reminders"
        body="Quick reminders to apply while you follow this GGLBET guide."
        items={guide.tips}
        className="bg-surface"
      />

      <BulletSection
        headingId="guide-warnings-heading"
        heading="Warnings"
        subheading="Safety and accuracy callouts"
        body="Important callouts to keep in mind before you act on this guide."
        items={guide.warnings}
      />

      <BulletSection
        headingId="guide-best-practices-heading"
        heading="Best practices"
        subheading="Recommended habits"
        body="Recommended habits for applying this GGLBET guide thoughtfully."
        items={guide.bestPractices}
        className="bg-surface"
      />

      <Section
        id="guide-faq"
        padding="lg"
        containerSize="wide"
        aria-labelledby="guide-faq-heading"
      tone="glow"
      >
        <SectionIntro
          headingId="guide-faq-heading"
          heading="FAQ"
          subheading="Common questions about this guide"
          body="Quick answers about the topics covered in this GGLBET guide."
        />
        <DsFaqAccordion items={guide.faq} />
      </Section>

      {relatedGuides.length > 0 ? (
        <Section
          id="related-guides"
          padding="lg"
          containerSize="wide"
          aria-labelledby="related-guides-heading"
          tone="muted"
        >
          <SectionIntro
            headingId="related-guides-heading"
            heading="Related guides"
            subheading="Continue learning on GGLBET"
            body="More GGLBET guides that connect to this topic."
          />
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {relatedGuides.map((item) => (
              <li key={item.id}>
                <GuideCard guide={item} />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {sameCategoryGuides.length > 0 ? (
        <Section
          id="same-category-guides"
          padding="lg"
          containerSize="wide"
          aria-labelledby="same-category-guides-heading"
        >
          <SectionIntro
            headingId="same-category-guides-heading"
            heading="Same category"
            subheading={`More ${category?.name ?? guide.category}`}
            body={`More ${category?.name ?? guide.category} guides on GGLBET.`}
            ctas={[
              {
                label: "View category",
                href: getGuideCategoryHref(guide.category),
                variant: "outline",
              },
            ]}
          />
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {sameCategoryGuides.map((item) => (
              <li key={item.id}>
                <GuideCard guide={item} />
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
          tone="muted"
        >
          <SectionIntro
            headingId="related-games-heading"
            heading="Related games"
            subheading="Games connected to this guide"
            body="GGLBET games that pair with the topics in this guide."
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
        >
          <SectionIntro
            headingId="related-providers-heading"
            heading="Related providers"
            subheading="Studios connected to this guide"
            body="Studios mentioned or useful alongside this GGLBET guide."
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
        id="related-content"
        padding="lg"
        containerSize="wide"
        aria-labelledby="related-content-heading"
        tone="muted"
      >
        <SectionIntro
          headingId="related-content-heading"
          heading="Related promotions and news"
          subheading="Keep exploring GGLBET"
          body="Offers and news that connect to this guide on GGLBET."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Card>
            <CardTitle as="h3">Related promotions</CardTitle>
            <ul className="mt-4 space-y-2 text-sm">
              {guide.relatedPromotionSlugs.length > 0 ? (
                guide.relatedPromotionSlugs.map((slug) => (
                  <li key={slug}>
                    <Link
                      href={getPromotionHref(slug)}
                      className="text-brand hover:text-primary-hover"
                    >
                      {slug}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-ink-muted">
                  <Link href={ROUTES.promotions}>Browse promotions</Link>
                </li>
              )}
            </ul>
          </Card>
          <Card>
            <CardTitle as="h3">Related news</CardTitle>
            <ul className="mt-4 space-y-2 text-sm">
              {guide.relatedNewsSlugs.length > 0 ? (
                guide.relatedNewsSlugs.map((slug) => (
                  <li key={slug}>
                    <Link
                      href={ROUTES.news}
                      className="text-brand hover:text-primary-hover"
                    >
                      {slug}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-ink-muted">
                  <Link href={ROUTES.news}>Browse news</Link>
                </li>
              )}
            </ul>
          </Card>
        </div>
        {guide.relatedCategorySlugs.length > 0 ? (
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Related categories">
            {guide.relatedCategorySlugs.map((slug) => (
              <li key={slug}>
                <Link
                  href={getGuideCategoryHref(slug)}
                  className="rounded-control border border-border px-3 py-1 text-xs font-medium text-ink-muted hover:border-border-brand hover:text-ink"
                >
                  {slug.replace("-", " ")}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </Section>

      <Section
        id="guide-author"
        padding="lg"
        containerSize="wide"
        aria-labelledby="guide-author-heading"
      >
        <SectionIntro
          headingId="guide-author-heading"
          heading="Author and reviewer"
          subheading="Who wrote and reviewed this guide"
          body="Meet the people behind this GGLBET guide."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Card>
            <CardTitle as="h3">{guide.author.name}</CardTitle>
            <CardDescription className="mt-2">
              {guide.author.role ?? "Author"}
              {guide.author.bio ? ` · ${guide.author.bio}` : ""}
            </CardDescription>
          </Card>
          {guide.reviewer ? (
            <Card>
              <CardTitle as="h3">{guide.reviewer.name}</CardTitle>
              <CardDescription className="mt-2">
                {guide.reviewer.role ?? "Reviewer"}
                {guide.reviewer.bio ? ` · ${guide.reviewer.bio}` : ""}
              </CardDescription>
            </Card>
          ) : null}
        </div>
        <p className="mt-6 text-sm text-ink-subtle">
          Last updated{" "}
          <time dateTime={guide.updatedDate}>
            {new Date(guide.updatedDate).toLocaleDateString("en-GB")}
          </time>
        </p>
      </Section>

      <Section
        id="guide-internal-links"
        padding="md"
        containerSize="wide"
        aria-label="Site internal links"
      >
        <InternalLinkRail />
      </Section>

      <Section
        id="guide-final-cta"
        padding="lg"
        containerSize="wide"
        aria-labelledby="guide-final-cta-heading"
        className="home-v2-section border-t border-border-brand/40 bg-surface"
      >
        <SectionIntro
          headingId="guide-final-cta-heading"
          heading="Ready for the next step?"
          subheading="Apply what you learned on GGLBET"
          body="Choose a clear next step—and keep responsible gaming tools nearby when learning turns into play."
          ctas={[
            {
              label: guide.ctaPrimaryLabel,
              href: guide.ctaPrimaryHref,
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
