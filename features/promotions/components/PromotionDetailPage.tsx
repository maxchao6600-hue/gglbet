import Link from "next/link";

import { GameCard } from "@/components/cards/GameCard";
import { NewsCard } from "@/components/cards/NewsCard";
import { PromotionCard } from "@/components/cards/PromotionCard";
import { ProviderCard } from "@/components/cards/ProviderCard";
import { DsFaqAccordion } from "@/components/design-system/DsFaqAccordion";
import { SplitHero } from "@/components/heroes/SplitHero";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { GeoTldr } from "@/components/seo/GeoContent";
import { InternalLinkRail } from "@/components/seo/InternalLinkRail";
import { SeoContainer } from "@/components/seo/SeoContainer";
import { Card, CardTitle } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SITE_NAME } from "@/constants/site";
import { ContentRenderer, ContentToc } from "@/features/content";
import { SectionIntro } from "@/features/home/components/SectionIntro";
import { buildPromotionDetailJsonLd } from "@/features/promotions/seo/promotion-json-ld";
import { ROUTES, getGuideHref } from "@/constants/routes";
import {
  promotionArtworkFallbackPath,
  resolvePromotionArtworkTheme,
} from "@/lib/promotions/artwork";
import { createBreadcrumbs } from "@/lib/seo/breadcrumb";
import { guidesSeed } from "@/lib/cms/seed/guides";
import type { Game } from "@/types/game";
import type { NewsArticle } from "@/types/news";
import type { Promotion } from "@/types/promotion";
import type { Provider } from "@/types/provider";

type PromotionDetailPageProps = {
  readonly promotion: Promotion;
  readonly relatedPromotions: readonly Promotion[];
  readonly relatedGames: readonly Game[];
  readonly relatedProviders: readonly Provider[];
  readonly relatedNews: readonly NewsArticle[];
};

function formatDate(value: string | null): string {
  if (!value) return "Ongoing";
  return new Date(value).toLocaleDateString("en-GB");
}

export function PromotionDetailPage({
  promotion,
  relatedPromotions,
  relatedGames,
  relatedProviders,
  relatedNews,
}: PromotionDetailPageProps) {
  const breadcrumb = createBreadcrumbs([
    { name: "Promotions", path: ROUTES.promotions },
    { name: promotion.title, path: promotion.canonicalPath },
  ]);

  const bonusDetails = [
    { label: "Bonus type", value: promotion.bonusType.replace("-", " ") },
    { label: "Bonus amount", value: promotion.bonusAmount },
    { label: "Currency", value: promotion.currency },
    { label: "Minimum deposit", value: promotion.minimumDeposit ?? "N/A" },
    { label: "Maximum bonus", value: promotion.maximumBonus ?? "N/A" },
    {
      label: "Turnover requirement",
      value: promotion.turnoverRequirement ?? "N/A",
    },
    { label: "Start date", value: formatDate(promotion.startDate) },
    { label: "End date", value: formatDate(promotion.endDate) },
  ] as const;

  const artworkSrc =
    promotion.coverImage.url ||
    promotion.bannerImage.url ||
    promotionArtworkFallbackPath(
      resolvePromotionArtworkTheme(promotion.title, promotion.promotionType),
    );
  const artworkAlt =
    promotion.coverImage.alt ||
    `GGLBET ${promotion.title} promotion artwork`;

  return (
    <>
      <SeoContainer
        jsonLd={buildPromotionDetailJsonLd({
          promotion,
          breadcrumb,
          relatedPromotions,
        })}
      />

      <SplitHero
        id="promotion-hero"
        headingId="promotion-hero-heading"
        eyebrow={`${promotion.promotionType.replace("-", " ")} · ${promotion.status}`}
        brand={SITE_NAME}
        heading={promotion.heroTitle}
        subheading={promotion.heroDescription}
        imageSrc={artworkSrc}
        imageAlt={artworkAlt}
        ctas={[
          {
            label: promotion.ctaPrimaryLabel,
            href: promotion.ctaPrimaryHref,
            variant: "primary",
          },
          { label: "Register on GGLBET", href: ROUTES.register, variant: "outline" },
        ]}
      />

      <Section padding="sm" containerSize="wide" aria-label="Breadcrumb">
        <Breadcrumbs items={breadcrumb} />
      </Section>

      <Section
        padding="md"
        containerSize="wide"
        aria-label={`${promotion.title} overview`}
        tone="glow"
      >
        <div className="relative z-[1] space-y-3">
          <p className="text-sm text-ink-subtle">
            {formatDate(promotion.startDate)} – {formatDate(promotion.endDate)}
          </p>
          <p className="text-xs text-ink-subtle">
            Last Verified: {promotion.lastVerified ? "Yes" : "No"} · Verified
            Date: {promotion.verifiedDate} · Source:{" "}
            <a
              href={promotion.sourceUrl}
              className="text-brand hover:text-primary-hover"
              rel="noopener noreferrer"
              target="_blank"
            >
              {promotion.sourceName}
            </a>
            {" · "}
            Last Updated: {formatDate(promotion.updatedDate)}
          </p>
          <GeoTldr text={promotion.excerpt} />
        </div>
      </Section>

      <Section
        id="promotion-content-engine"
        padding="lg"
        containerSize="wide"
        aria-labelledby="promotion-content-engine-heading"
      >
        <h2 id="promotion-content-engine-heading" className="sr-only">
          {promotion.title} content
        </h2>
        <ContentToc items={promotion.tableOfContents} className="mb-8" />
        <ContentRenderer blocks={promotion.content} />
      </Section>

      <Section
        id="promotion-overview"
        padding="lg"
        containerSize="wide"
        aria-labelledby="promotion-overview-heading"
      >
        <SectionIntro
          headingId="promotion-overview-heading"
          heading="Overview"
          subheading={promotion.excerpt}
          body={promotion.overview}
        />
      </Section>

      <Section
        id="promotion-details"
        padding="lg"
        containerSize="wide"
        aria-labelledby="promotion-details-heading"
        tone="muted"
      >
        <SectionIntro
          headingId="promotion-details-heading"
          heading="Bonus details"
          subheading="Confirm figures on the live cashier before opting in"
          body="Key bonus figures for this GGLBET promotion—confirm on the live cashier before opting in."
        />
        <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {bonusDetails.map((item) => (
            <div
              key={item.label}
              className="home-v2-glass rounded-card p-card"
            >
              <dt className="text-xs font-semibold uppercase tracking-wide text-ink-subtle">
                {item.label}
              </dt>
              <dd className="mt-2 text-base font-semibold capitalize text-ink">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {promotion.eligibleGames.length > 0 ? (
        <Section
          id="promotion-eligible-games"
          padding="lg"
          containerSize="wide"
          aria-labelledby="promotion-eligible-games-heading"
        >
          <SectionIntro
            headingId="promotion-eligible-games-heading"
            heading="Eligible games"
            subheading="Titles referenced by this offer"
            body="Games that can count toward this GGLBET promotion when listed."
          />
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Eligible games">
            {promotion.eligibleGames.map((game) => (
              <li
                key={game}
                className="home-v2-glass rounded-control px-3 py-1 text-xs font-medium text-ink-muted"
              >
                {game}
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section
        id="promotion-requirements"
        padding="lg"
        containerSize="wide"
        aria-labelledby="promotion-requirements-heading"
        tone="muted"
      >
        <SectionIntro
          headingId="promotion-requirements-heading"
          heading="Requirements"
          subheading="Read before you opt in"
          body="What you need to know before claiming this GGLBET offer."
        />
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {promotion.requirements.map((item) => (
            <li
              key={item}
              className="home-v2-glass rounded-card px-4 py-4 text-sm text-ink-muted"
            >
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="promotion-terms"
        padding="lg"
        containerSize="wide"
        aria-labelledby="promotion-terms-heading"
      >
        <SectionIntro
          headingId="promotion-terms-heading"
          heading="Terms"
          subheading="Full terms summary"
          body="Terms for this GGLBET promotion—always cross-check with the live cashier offer panel."
        />
        <ul className="mt-8 space-y-3">
          {promotion.terms.map((item) => (
            <li
              key={item}
              className="home-v2-glass rounded-card px-4 py-4 text-sm leading-relaxed text-ink-muted"
            >
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="promotion-faq"
        padding="lg"
        containerSize="wide"
        aria-labelledby="promotion-faq-heading"
        tone="muted"
      >
        <SectionIntro
          headingId="promotion-faq-heading"
          heading="FAQ"
          subheading="Common questions about this offer"
          body="Quick answers about this GGLBET promotion."
        />
        <DsFaqAccordion items={promotion.faq} />
      </Section>

      {relatedPromotions.length > 0 ? (
        <Section
          id="related-promotions"
          padding="lg"
          containerSize="wide"
          aria-labelledby="related-promotions-heading"
        >
          <SectionIntro
            headingId="related-promotions-heading"
            heading="Related promotions"
            subheading="More offers in this category"
            body="More GGLBET promotions players often compare next."
            ctas={[
              {
                label: "All promotions",
                href: ROUTES.promotions,
                variant: "outline",
              },
            ]}
          />
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {relatedPromotions.map((item) => (
              <li key={item.id}>
                <PromotionCard promotion={item} />
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
            subheading="Games connected to this offer"
            body="GGLBET games that pair with this promotion."
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
            subheading="Studios connected to this offer"
            body="Studios connected to this GGLBET promotion."
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
            subheading="Coverage connected to this offer"
            body="GGLBET news that connects to this promotion."
          />
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {relatedNews.map((article) => (
              <li key={article.id}>
                <NewsCard article={article} />
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
          subheading="Learn how to read this offer"
          body="GGLBET guides that help you understand this promotion."
        />
        <Card className="mt-8">
          <CardTitle as="h3">Related guides</CardTitle>
          <ul className="mt-4 space-y-2 text-sm">
            {promotion.relatedGuideSlugs.length > 0 ? (
              promotion.relatedGuideSlugs.map((slug) => {
                const guide = guidesSeed.find((item) => item.slug === slug);
                const href = guide
                  ? getGuideHref(guide.category, guide.slug)
                  : ROUTES.guides;
                return (
                  <li key={slug}>
                    <Link
                      href={href}
                      className="text-brand hover:text-primary-hover"
                    >
                      {guide?.title ?? slug}
                    </Link>
                  </li>
                );
              })
            ) : (
              <li className="text-ink-muted">
                <Link href={ROUTES.guides}>Browse guides</Link>
              </li>
            )}
          </ul>
        </Card>
      </Section>

      <Section
        id="promotion-internal-links"
        padding="md"
        containerSize="wide"
        aria-label="Site internal links"
      >
        <InternalLinkRail />
      </Section>

      <Section
        id="promotion-final-cta"
        padding="lg"
        containerSize="wide"
        aria-labelledby="promotion-final-cta-heading"
        className="home-v2-section border-t border-border-brand/40 bg-surface"
      >
        <SectionIntro
          headingId="promotion-final-cta-heading"
          heading="Ready to review this offer?"
          subheading="Confirm live terms before opting in"
          body="Confirm live terms on GGLBET before opting in—and keep responsible gaming tools nearby."
          ctas={[
            {
              label: promotion.ctaPrimaryLabel,
              href: promotion.ctaPrimaryHref,
              variant: "primary",
            },
            {
              label: "Register",
              href: ROUTES.register,
              variant: "secondary",
            },
            {
              label: "All promotions",
              href: ROUTES.promotions,
              variant: "outline",
            },
            {
              label: "Download",
              href: ROUTES.download,
              variant: "soft",
            },
            {
              label: "Responsible Gaming",
              href: ROUTES.responsibleGaming,
              variant: "ghost",
            },
          ]}
        />
      </Section>
    </>
  );
}
