import Link from "next/link";

import { GameCard } from "@/components/cards/GameCard";
import { GuideCard } from "@/components/cards/GuideCard";
import { ProviderCard } from "@/components/cards/ProviderCard";
import { DS } from "@/components/design-system/classes";
import { DsFaqAccordion } from "@/components/design-system/DsFaqAccordion";
import { SplitHero } from "@/components/heroes/SplitHero";
import { CmsImageView } from "@/components/media/CmsImageView";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { GeoDefinition, GeoEeatMeta, GeoTldr } from "@/components/seo/GeoContent";
import { InternalLinkRail } from "@/components/seo/InternalLinkRail";
import { SeoContainer } from "@/components/seo/SeoContainer";
import { Button } from "@/components/ui/Button";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { HUB_MEDIA } from "@/constants/hub-media";
import { SITE_NAME } from "@/constants/site";
import { ContentRenderer, ContentToc } from "@/features/content";
import { GAMES_MEDIA } from "@/features/games/games-media";
import { HomeMediaFigure } from "@/features/home/components/HomeMediaFigure";
import { SectionIntro } from "@/features/home/components/SectionIntro";
import { buildGameDetailJsonLd } from "@/features/games/seo/game-json-ld";
import {
  ROUTES,
  getAuthorHref,
  getProviderHref,
  getPromotionHref,
} from "@/constants/routes";
import { createBreadcrumbs } from "@/lib/seo/breadcrumb";
import type { Game } from "@/types/game";
import type { Guide } from "@/types/guide";
import type { Provider } from "@/types/provider";
import { cn } from "@/utils/cn";

type GameDetailPageProps = {
  readonly game: Game;
  readonly provider: Provider | null;
  readonly relatedGames: readonly Game[];
  readonly sameProviderGames: readonly Game[];
  readonly sameCategoryGames: readonly Game[];
  readonly relatedProviders: readonly Provider[];
  readonly relatedGuides?: readonly Guide[];
};

function BulletListSection({
  headingId,
  heading,
  subheading,
  body,
  items,
}: {
  readonly headingId: string;
  readonly heading: string;
  readonly subheading: string;
  readonly body: string;
  readonly items: readonly string[];
}) {
  return (
    <Section
      padding="lg"
      containerSize="wide"
      aria-labelledby={headingId}
      tone="glow"
    >
      <SectionIntro
        headingId={headingId}
        heading={heading}
        subheading={subheading}
        body={body}
      />
      <ul className="relative z-[1] mt-8 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className={cn(DS.glassPad, "text-sm text-ink-muted")}>
            {item}
          </li>
        ))}
      </ul>
    </Section>
  );
}

function GameGridSection({
  id,
  headingId,
  heading,
  subheading,
  body,
  games,
  className,
  tone = "default",
}: {
  readonly id: string;
  readonly headingId: string;
  readonly heading: string;
  readonly subheading: string;
  readonly body: string;
  readonly games: readonly Game[];
  readonly className?: string;
  readonly tone?: "default" | "muted" | "glow";
}) {
  if (games.length === 0) return null;

  return (
    <Section
      id={id}
      padding="lg"
      containerSize="wide"
      aria-labelledby={headingId}
      className={className}
      tone={tone}
    >
      <SectionIntro
        headingId={headingId}
        heading={heading}
        subheading={subheading}
        body={body}
      />
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {games.map((item) => (
          <li key={item.id}>
            <GameCard game={item} />
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function GameDetailPage({
  game,
  provider,
  relatedGames,
  sameProviderGames,
  sameCategoryGames,
  relatedProviders,
  relatedGuides = [],
}: GameDetailPageProps) {
  const breadcrumb = createBreadcrumbs([
    { name: "Games", path: ROUTES.games },
    { name: game.providerName, path: getProviderHref(game.providerSlug) },
    { name: game.gameName, path: game.canonicalPath },
  ]);

  const specs = [
    { label: "RTP", value: typeof game.rtp === "number" ? `${game.rtp}%` : "—" },
    { label: "Volatility", value: game.volatility },
    { label: "Reels", value: game.reels ?? "—" },
    { label: "Rows", value: game.rows ?? "—" },
    { label: "Paylines", value: game.paylines ?? "—" },
    { label: "Jackpot", value: game.jackpot ?? "—" },
    { label: "Min bet", value: game.minBet ?? "—" },
    { label: "Max bet", value: game.maxBet ?? "—" },
    { label: "Max win", value: game.maxWin ?? "—" },
    { label: "Demo", value: game.demoAvailable ? "Available" : "Not available" },
  ] as const;

  const discoveryGames =
    sameProviderGames.length > 0 ? sameProviderGames : sameCategoryGames;
  const discoveryIsProvider = sameProviderGames.length > 0;
  /** P0-2: Game-detail fused stage art — never logo, never empty cover. */
  const heroImageSrc = GAMES_MEDIA.detailHero || GAMES_MEDIA.hero || HUB_MEDIA.gameDetail;

  return (
    <>
      <SeoContainer
        jsonLd={buildGameDetailJsonLd({
          game,
          breadcrumb,
          relatedGames,
        })}
      />

      <SplitHero
        id="game-hero"
        headingId="game-hero-heading"
        eyebrow={`${game.providerName} · ${game.category.replace("-", " ")}`}
        brand={SITE_NAME}
        heading={game.heroTitle}
        subheading={game.heroDescription}
        imageSrc={heroImageSrc}
        imageAlt={`${game.gameName} on GGLBET`}
        ctas={[
          {
            label: game.ctaPrimaryLabel,
            href: game.ctaPrimaryHref,
            variant: "primary",
          },
          {
            label: game.ctaSecondaryLabel,
            href: game.ctaSecondaryHref,
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
        aria-label={`${game.gameName} overview`}
        tone="glow"
      >
        <div className="relative z-[1] space-y-4">
          <GeoEeatMeta
            updatedDate={game.lastUpdated}
            authorName={game.author.name}
            authorHref={getAuthorHref(game.author.slug)}
            factChecked
          />
          <GeoTldr text={game.shortDescription} />
          <GeoDefinition
            term={game.gameName}
            text={`${game.gameName} is a ${game.category.replace("-", " ")} title from ${game.providerName} available on GGLBET.`}
          />
        </div>
      </Section>

      <Section
        id="game-overview"
        padding="lg"
        containerSize="wide"
        aria-labelledby="game-overview-heading"
      >
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <SectionIntro
            headingId="game-overview-heading"
            heading={`${game.gameName} overview`}
            subheading={`Code ${game.gameCode}`}
            body={game.shortDescription}
          />
          <CmsImageView image={game.thumbnail} aspect="wide" />
        </div>
        <dl className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {specs.map((item) => (
            <div
              key={item.label}
              className={DS.glassPad}
            >
              <dt className="text-xs uppercase tracking-wide text-ink-subtle">
                {item.label}
              </dt>
              <dd className="mt-2 text-base font-semibold capitalize text-ink">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section
        id="game-content-engine"
        padding="lg"
        containerSize="wide"
        aria-labelledby="game-content-engine-heading"
        tone="muted"
      >
        <h2 id="game-content-engine-heading" className="sr-only">
          {game.gameName} content
        </h2>
        <ContentToc items={game.tableOfContents} className="mb-8" />
        <ContentRenderer blocks={game.content} />
      </Section>

      <Section
        id="game-description"
        padding="lg"
        containerSize="wide"
        aria-labelledby="game-description-heading"
        tone="muted"
      >
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <SectionIntro
            headingId="game-description-heading"
            heading="Game description"
            subheading={`What to expect from ${game.gameName}`}
            body={game.fullDescription}
          />
          <HomeMediaFigure
            src={GAMES_MEDIA.seo || HUB_MEDIA.games}
            alt={`${game.gameName} on GGLBET`}
            aspect="wide"
            fallbackSrc={GAMES_MEDIA.seo || HUB_MEDIA.games}
            sizes="(max-width: 1024px) 42vw, 440px"
          />
        </div>
        {game.gallery.length > 0 ? (
          <ul
            className="mt-8 grid gap-4 sm:grid-cols-2"
            aria-label={`${game.gameName} gallery`}
          >
            {game.gallery.map((image) => (
              <li key={image.id}>
                <CmsImageView image={image} aspect="wide" />
              </li>
            ))}
          </ul>
        ) : null}
      </Section>

      <Section
        id="game-provider"
        padding="lg"
        containerSize="wide"
        aria-labelledby="game-provider-heading"
      >
        <SectionIntro
          headingId="game-provider-heading"
          heading="Provider introduction"
          subheading={game.providerName}
          body={
            provider?.intro ??
            `${game.gameName} is provided by ${game.providerName} on GGLBET.`
          }
          ctas={[
            {
              label: `Visit ${game.providerName}`,
              href: getProviderHref(game.providerSlug),
              variant: "outline",
            },
          ]}
        />
        {provider ? (
          <div className="mt-8 max-w-md">
            <ProviderCard provider={provider} />
          </div>
        ) : null}
      </Section>

      <BulletListSection
        headingId="game-features-heading"
        heading="Game features"
        subheading={`Key mechanics in ${game.gameName}`}
        body={`Core capabilities that shape how ${game.gameName} plays on GGLBET.`}
        items={game.features}
      />

      <BulletListSection
        headingId="game-bonus-features-heading"
        heading="Bonus features"
        subheading="Feature rounds and extras"
        body={`Bonus rounds and extras you may encounter while playing ${game.gameName}.`}
        items={game.bonusFeatures}
      />

      <Section
        id="game-rtp-volatility"
        padding="lg"
        containerSize="wide"
        aria-labelledby="game-rtp-heading"
      >
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <SectionIntro
            headingId="game-rtp-heading"
            heading="RTP information"
            subheading={
              typeof game.rtp === "number"
                ? `Reference RTP: ${game.rtp}%`
                : "Title-level RTP varies"
            }
            body={game.rtpNotes ?? "Confirm RTP inside the game information panel."}
          />
          <SectionIntro
            headingId="game-volatility-heading"
            heading="Volatility"
            subheading={`Profile: ${game.volatility}`}
            body={game.volatilityGuide}
            headingLevel="h2"
          />
        </div>
      </Section>

      <Section
        id="game-mechanics"
        padding="lg"
        containerSize="wide"
        aria-labelledby="game-mechanics-heading"
        tone="muted"
      >
        <SectionIntro
          headingId="game-mechanics-heading"
          heading="Reels, rows, paylines, and jackpot"
          subheading={`Layout details for ${game.gameName}`}
          body="Reel layout and jackpot fields when this title uses a classic grid format."
        />
        <dl className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Reels", value: game.reels ?? "—" },
            { label: "Rows", value: game.rows ?? "—" },
            { label: "Paylines", value: game.paylines ?? "—" },
            { label: "Jackpot", value: game.jackpot ?? "—" },
          ].map((item) => (
            <div
              key={item.label}
              className={DS.glassPad}
            >
              <dt className="text-xs uppercase tracking-wide text-ink-subtle">
                {item.label}
              </dt>
              <dd className="mt-2 text-lg font-semibold text-ink">{item.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section
        id="game-devices"
        padding="lg"
        containerSize="wide"
        aria-labelledby="game-devices-heading"
      >
        <SectionIntro
          headingId="game-devices-heading"
          heading="Supported devices and platforms"
          subheading="Where this title can be played"
          body={`Devices and platforms where you can open ${game.gameName} on GGLBET.`}
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Card glass>
            <CardTitle as="h3">Devices</CardTitle>
            <ul className="mt-4 space-y-2 text-sm text-ink-muted">
              {game.supportedDevices.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </Card>
          <Card glass>
            <CardTitle as="h3">Platforms</CardTitle>
            <ul className="mt-4 space-y-2 text-sm text-ink-muted">
              {game.supportedPlatforms.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </Card>
        </div>
        <div className={cn("mt-5", DS.glassPad)}>
          <h3 className="text-base font-semibold text-ink">Languages</h3>
          <p className="mt-2 text-sm text-ink-muted">
            {game.supportedLanguages.join(", ")}
          </p>
        </div>
      </Section>

      <BulletListSection
        headingId="game-how-to-play-heading"
        heading="How to play"
        subheading={`Getting started with ${game.gameName}`}
        body={`Simple steps to start a session with ${game.gameName} on GGLBET.`}
        items={game.howToPlay}
      />

      <BulletListSection
        headingId="game-tips-heading"
        heading="Winning tips"
        subheading="Practical session advice"
        body="Tips emphasize helpful habits and bankroll awareness—not guaranteed outcomes."
        items={game.tips}
      />

      <BulletListSection
        headingId="game-strategy-heading"
        heading="Strategy"
        subheading="How to approach this title thoughtfully"
        body="Strategy notes stay educational and responsible."
        items={game.strategy}
      />

      <Section
        id="game-faq"
        padding="lg"
        containerSize="wide"
        aria-labelledby="game-faq-heading"
      >
        <SectionIntro
          headingId="game-faq-heading"
          heading={`${game.gameName} FAQ`}
          subheading="Common questions before you play"
          body={`Quick answers about ${game.gameName} on GGLBET.`}
        />
        <DsFaqAccordion items={game.faq} />
      </Section>

      <GameGridSection
        id="related-games"
        headingId="related-games-heading"
        heading="Related games"
        subheading="Similar titles on GGLBET"
        body={`More GGLBET games players often browse after ${game.gameName}.`}
        games={relatedGames}
      />

      {discoveryIsProvider ? (
        <GameGridSection
          id="same-provider-games"
          headingId="same-provider-games-heading"
          heading="Same provider games"
          subheading={`More from ${game.providerName}`}
          body={`Other ${game.providerName} titles available on GGLBET.`}
          games={discoveryGames}
          tone="muted"
        />
      ) : (
        <GameGridSection
          id="same-category-games"
          headingId="same-category-games-heading"
          heading="Same category games"
          subheading={`More ${game.category.replace("-", " ")} titles`}
          body={`More ${game.category.replace("-", " ")} games to explore on GGLBET.`}
          games={discoveryGames}
          tone="muted"
        />
      )}

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
            subheading="Studios connected to this title"
            body="Studios players often compare next on GGLBET."
          />
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {relatedProviders.map((item) => (
              <li key={item.id}>
                <ProviderCard provider={item} />
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
      >
        <SectionIntro
          headingId="related-content-heading"
          heading="Related promotions, guides, and news"
          subheading="Keep exploring GGLBET"
          body={`Offers, guides, and news tied to ${game.gameName} on GGLBET.`}
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <Card glass>
            <CardTitle as="h3">Related promotions</CardTitle>
            <ul className="mt-4 space-y-2 text-sm">
              {game.relatedPromotionSlugs.length > 0 ? (
                game.relatedPromotionSlugs.map((slug) => (
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
          <Card glass>
            <CardTitle as="h3">Related guides</CardTitle>
            {relatedGuides.length > 0 ? (
              <ul className="mt-4 space-y-3">
                {relatedGuides.map((guide) => (
                  <li key={guide.id}>
                    <GuideCard guide={guide} />
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="mt-4 space-y-2 text-sm">
                <li className="text-ink-muted">
                  <Link href={ROUTES.guides}>Browse guides</Link>
                </li>
              </ul>
            )}
          </Card>
          <Card glass>
            <CardTitle as="h3">Related news</CardTitle>
            <ul className="mt-4 space-y-2 text-sm">
              {game.relatedNewsSlugs.length > 0 ? (
                game.relatedNewsSlugs.map((slug) => (
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
      </Section>

      <Section
        id="game-responsible-gaming"
        padding="lg"
        containerSize="wide"
        aria-labelledby="game-responsible-gaming-heading"
        tone="muted"
      >
        <SectionIntro
          headingId="game-responsible-gaming-heading"
          heading="Responsible gaming"
          subheading="Keep play within your limits"
          body={game.responsibleGamingNotes}
          ctas={[
            {
              label: "Responsible gaming tools",
              href: ROUTES.responsibleGaming,
              variant: "outline",
            },
          ]}
        />
      </Section>

      <Section
        id="game-internal-links"
        padding="md"
        containerSize="wide"
        aria-label="Site internal links"
      >
        <InternalLinkRail
          links={[
            {
              href: getProviderHref(game.providerSlug),
              label: game.providerName,
              group: "related",
            },
          ]}
        />
      </Section>

      <Section
        id="game-final-cta"
        padding="lg"
        containerSize="wide"
        aria-labelledby="game-final-cta-heading"
        className="home-v2-section border-t border-border-brand/40 bg-surface"
      >
        <div className="home-v2-section__bg" aria-hidden />
        <div className={DS.split}>
          <SectionIntro
            headingId="game-final-cta-heading"
            heading={`Play ${game.gameName} on GGLBET`}
            subheading="Register, log in, or continue browsing"
            body={`Choose the next step that fits how you want to play ${game.gameName} on GGLBET.`}
            ctas={[
              {
                label: game.ctaPrimaryLabel,
                href: game.ctaPrimaryHref,
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
                label: "Download",
                href: ROUTES.download,
                variant: "soft",
              },
            ]}
          />
          <HomeMediaFigure
            src={GAMES_MEDIA.cta || HUB_MEDIA.cta}
            alt={`Play ${game.gameName} on GGLBET`}
            aspect="wide"
            fallbackSrc={GAMES_MEDIA.cta || HUB_MEDIA.cta}
            sizes="(max-width: 1024px) 42vw, 440px"
            className={DS.mediaPremium}
          />
        </div>
        <CardDescription className="relative z-[1] mt-4">
          Theme: {game.theme} · Tags: {game.tags.join(", ")}
        </CardDescription>
      </Section>
    </>
  );
}
