import Link from "next/link";
import { Suspense } from "react";

import { GameCard } from "@/components/cards/GameCard";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { InternalLinkRail } from "@/components/seo/InternalLinkRail";
import { SeoContainer } from "@/components/seo/SeoContainer";
import { Button } from "@/components/ui/Button";
import { DsFaqAccordion } from "@/components/design-system/DsFaqAccordion";
import { Section } from "@/components/ui/Section";
import { HUB_MEDIA } from "@/constants/hub-media";
import { ROUTES } from "@/constants/routes";
import { GamesDirectoryResults } from "@/features/games/components/GamesDirectoryResults";
import { GamesDirectoryToolbar } from "@/features/games/components/GamesDirectoryToolbar";
import { GamesHeroSection } from "@/features/games/components/GamesHeroSection";
import { GAMES_MEDIA } from "@/features/games/games-media";
import type { GamesUiCopy } from "@/features/games/games-ui-copy";
import { buildGameItemListJsonLd } from "@/features/games/seo/game-json-ld";
import { HomeMediaFigure } from "@/features/home/components/HomeMediaFigure";
import { SectionIntro } from "@/features/home/components/SectionIntro";
import { createBreadcrumbs } from "@/lib/seo/breadcrumb";
import {
  buildBreadcrumbJsonLd,
  buildCollectionPageJsonLd,
  buildFaqPageJsonLd,
} from "@/lib/seo/json-ld";
import type { GamesPageContent } from "@/types/game";
import type { GamesDirectoryItem } from "@/lib/cms/seed/content/games/load-games-indexes";

type GamesListingPageProps = {
  readonly page: GamesPageContent;
  readonly games: readonly GamesDirectoryItem[];
  readonly featured: readonly GamesDirectoryItem[];
  readonly providers: readonly {
    readonly id: string;
    readonly slug: string;
    readonly name: string;
  }[];
  readonly themes: readonly string[];
  readonly copy: GamesUiCopy;
  readonly providerLogos: Readonly<Record<string, string>>;
};

function GameRow({
  games,
  copy,
  providerLogos,
}: {
  readonly games: readonly GamesDirectoryItem[];
  readonly copy: GamesUiCopy;
  readonly providerLogos: Readonly<Record<string, string>>;
}) {
  return (
    <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {games.map((game) => (
        <li key={game.id} className="flex">
          <GameCard
            game={game}
            className="w-full"
            providerLogoSrc={providerLogos[game.providerSlug]}
            playLabel={copy.playNow}
            detailsLabel={copy.viewDetails}
          />
        </li>
      ))}
    </ul>
  );
}

export function GamesListingPage({
  page,
  games,
  featured,
  providers,
  themes,
  copy,
  providerLogos,
}: GamesListingPageProps) {
  const breadcrumb = createBreadcrumbs([
    { name: copy.breadcrumbGames, path: ROUTES.games },
  ]);

  return (
    <>
      <SeoContainer
        jsonLd={[
          buildCollectionPageJsonLd({
            name: page.seo.title,
            description: page.seo.description,
            path: page.seo.path,
            numberOfItems: games.length,
          }),
          buildBreadcrumbJsonLd(breadcrumb),
          buildFaqPageJsonLd(page.faq),
          buildGameItemListJsonLd(games),
        ]}
      />

      <GamesHeroSection page={page} copy={copy} />

      <Section padding="sm" containerSize="wide" aria-label="Breadcrumb">
        <Breadcrumbs items={breadcrumb} />
      </Section>

      {featured.length > 0 ? (
        <Section
          id="featured-games"
          padding="md"
          containerSize="wide"
          aria-labelledby="featured-games-heading"
          tone="muted"
        >
          <SectionIntro
            headingId="featured-games-heading"
            heading={copy.featuredHeading}
            subheading={copy.featuredSub}
            body={copy.featuredBody}
          />
          <GameRow
            games={featured}
            copy={copy}
            providerLogos={providerLogos}
          />
        </Section>
      ) : null}

      <Section
        id="games-directory"
        padding="md"
        containerSize="wide"
        aria-labelledby="games-directory-heading"
      >
        <h2 id="games-directory-heading" className="sr-only">
          {copy.searchLabel}
        </h2>
        <Suspense
          fallback={
            <div className="home-v2-glass h-48 rounded-card bg-surface-muted" />
          }
        >
          <GamesDirectoryToolbar
            providers={providers}
            themes={themes}
            copy={copy}
          />
        </Suspense>
      </Section>

      <Suspense
        fallback={
          <Section padding="lg" containerSize="wide" aria-busy="true">
            <div className="home-v2-glass h-64 rounded-card bg-surface-muted" />
          </Section>
        }
      >
        <GamesDirectoryResults
          games={games}
          copy={copy}
          providerLogos={providerLogos}
        />
      </Suspense>

      <Section
        id="games-seo-content"
        padding="lg"
        containerSize="wide"
        aria-labelledby="games-seo-heading"
        tone="muted"
      >
        <div className="home-v2-split">
          <SectionIntro
            headingId="games-seo-heading"
            heading={page.seoContent.heading}
            subheading={copy.seoSub}
            body={page.seoContent.body}
          />
          <HomeMediaFigure
            src={GAMES_MEDIA.seo || HUB_MEDIA.seo}
            alt={page.seoContent.heading}
            aspect="wide"
            fallbackSrc={GAMES_MEDIA.seo || HUB_MEDIA.seo}
            sizes="(max-width: 1024px) 42vw, 440px"
          />
        </div>
        <nav aria-label="GGLBET game internal links" className="mt-8">
          <ul className="flex flex-wrap gap-3 text-sm">
            {[
              { href: ROUTES.home, label: "GGLBET Home" },
              { href: ROUTES.providers, label: "GGLBET Providers" },
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
                  className="home-v2-glass rounded-control px-3 py-2 text-ink-muted hover:border-border-brand hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Section>

      <Section
        id="games-faq"
        padding="lg"
        containerSize="wide"
        aria-labelledby="games-faq-heading"
      tone="glow"
      >
        <SectionIntro
          headingId="games-faq-heading"
          heading={copy.faqHeading}
          subheading={copy.faqSub}
          body={copy.faqBody}
        />
        <DsFaqAccordion items={page.faq} />
      </Section>

      <Section
        id="games-internal-links"
        padding="md"
        containerSize="wide"
        aria-label="Site internal links"
      >
        <InternalLinkRail />
      </Section>

      <Section
        id="games-final-cta"
        padding="lg"
        containerSize="wide"
        aria-labelledby="games-final-cta-heading"
        className="home-v2-section border-t border-border-brand/40 bg-surface"
      >
        <div className="home-v2-split">
          <SectionIntro
            headingId="games-final-cta-heading"
            heading={page.finalCta.heading}
            subheading={copy.finalSub}
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
          <HomeMediaFigure
            src={GAMES_MEDIA.cta || HUB_MEDIA.cta}
            alt={page.finalCta.heading}
            aspect="wide"
            fallbackSrc={GAMES_MEDIA.cta || HUB_MEDIA.cta}
            sizes="(max-width: 1024px) 42vw, 440px"
          />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href={ROUTES.download} variant="soft" aria-label={copy.download}>
            {copy.download}
          </Button>
          <Button
            href={ROUTES.promotions}
            variant="ghost"
            aria-label={copy.promotions}
          >
            {copy.promotions}
          </Button>
        </div>
      </Section>
    </>
  );
}
