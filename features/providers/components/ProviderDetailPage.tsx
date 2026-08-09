import Link from "next/link";

import { GuideCard } from "@/components/cards/GuideCard";
import { DS } from "@/components/design-system/classes";
import { DsFaqAccordion } from "@/components/design-system/DsFaqAccordion";
import { ProviderCard } from "@/components/cards/ProviderCard";
import { SplitHero } from "@/components/heroes/SplitHero";
import { CmsImageView } from "@/components/media/CmsImageView";
import { ProviderLogo } from "@/components/media/ProviderLogo";
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
import { HomeMediaFigure } from "@/features/home/components/HomeMediaFigure";
import { SectionIntro } from "@/features/home/components/SectionIntro";
import { buildProviderDetailJsonLd } from "@/features/providers/seo/provider-json-ld";
import {
  ROUTES,
  getAuthorHref,
  getGameHref,
  getProviderHref,
  getPromotionHref,
} from "@/constants/routes";
import { createBreadcrumbs } from "@/lib/seo/breadcrumb";
import type { Game } from "@/types/game";
import type { Guide } from "@/types/guide";
import type { Provider } from "@/types/provider";
import { cn } from "@/utils/cn";

type ProviderDetailPageProps = {
  readonly provider: Provider;
  readonly popularGames: readonly Game[];
  readonly relatedProviders: readonly Provider[];
  readonly relatedGames: readonly Game[];
  readonly relatedGuides?: readonly Guide[];
};

function BulletCardList({
  headingId,
  heading,
  subheading,
  body,
  items,
  mediaAlt,
}: {
  readonly headingId: string;
  readonly heading: string;
  readonly subheading: string;
  readonly body: string;
  readonly items: readonly string[];
  readonly mediaAlt: string;
}) {
  return (
    <Section
      padding="lg"
      containerSize="wide"
      aria-labelledby={headingId}
      tone="glow"
    >
      <div className={DS.split}>
        <SectionIntro
          headingId={headingId}
          heading={heading}
          subheading={subheading}
          body={body}
        />
        <HomeMediaFigure
          src={HUB_MEDIA.providers}
          alt={mediaAlt}
          aspect="wide"
          fallbackSrc={HUB_MEDIA.providers}
          sizes="(max-width: 1024px) 42vw, 440px"
          className={DS.mediaPremium}
        />
      </div>
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

export function ProviderDetailPage({
  provider,
  popularGames,
  relatedProviders,
  relatedGames,
  relatedGuides = [],
}: ProviderDetailPageProps) {
  const breadcrumb = createBreadcrumbs([
    { name: "Providers", path: ROUTES.providers },
    { name: provider.name, path: getProviderHref(provider.slug) },
  ]);

  return (
    <>
      <SeoContainer
        jsonLd={buildProviderDetailJsonLd({
          provider,
          breadcrumb,
          popularGames,
        })}
      />

      <SplitHero
        id="provider-hero"
        headingId="provider-hero-heading"
        eyebrow={provider.shortName}
        brand={SITE_NAME}
        heading={provider.heroTitle}
        subheading={provider.heroDescription}
        imageSrc={HUB_MEDIA.providerDetail}
        imageAlt={`${provider.name} on GGLBET`}
        ctas={[
          {
            label: provider.ctaPrimaryLabel,
            href: provider.ctaPrimaryHref,
            variant: "primary",
          },
          {
            label: provider.ctaSecondaryLabel,
            href: provider.ctaSecondaryHref,
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
        aria-label={`${provider.name} overview`}
        tone="glow"
      >
        <div className="relative z-[1] space-y-4">
          <GeoEeatMeta
            updatedDate={provider.lastUpdated}
            authorName={provider.author.name}
            authorHref={getAuthorHref(provider.author.slug)}
            factChecked
          />
          <GeoTldr text={provider.intro} />
          <GeoDefinition
            term={provider.name}
            text={`${provider.name} (${provider.shortName}) is a game studio featured on GGLBET with ${provider.gameCount} listed titles.`}
          />
        </div>
      </Section>

      <Section
        id="provider-content-engine"
        padding="lg"
        containerSize="wide"
        aria-labelledby="provider-content-engine-heading"
      >
        <h2 id="provider-content-engine-heading" className="sr-only">
          {provider.name} content
        </h2>
        <ContentToc items={provider.tableOfContents} className="mb-8" />
        <ContentRenderer blocks={provider.content} />
      </Section>

      <Section
        id="provider-overview"
        padding="lg"
        containerSize="wide"
        aria-labelledby="provider-overview-heading"
      >
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <SectionIntro
            headingId="provider-overview-heading"
            heading={`${provider.name} overview`}
            subheading="Studio snapshot and catalog context"
            body={provider.intro}
          />
          <ProviderLogo
            src={provider.logo.url}
            alt={provider.logo.alt || `${provider.name} logo`}
            size="hero"
          />
        </div>
        <dl className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Founded", value: provider.foundedYear ?? "—" },
            { label: "Country", value: provider.country ?? "—" },
            { label: "Games listed", value: provider.gameCount },
            { label: "Volatility profile", value: provider.volatility },
          ].map((item) => (
            <div key={item.label} className={DS.glassPad}>
              <dt className="text-xs uppercase tracking-wide text-ink-subtle">
                {item.label}
              </dt>
              <dd className="mt-2 text-lg font-semibold text-ink">{item.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section
        id="provider-history"
        padding="lg"
        containerSize="wide"
        aria-labelledby="provider-history-heading"
        tone="glow"
      >
        <div className={DS.split}>
          <SectionIntro
            headingId="provider-history-heading"
            heading={`${provider.name} history`}
            subheading="How the studio evolved"
            body={provider.history}
          />
          <HomeMediaFigure
            src={HUB_MEDIA.providers}
            alt={`${provider.name} on GGLBET`}
            aspect="wide"
            fallbackSrc={HUB_MEDIA.providers}
            sizes="(max-width: 1024px) 42vw, 440px"
            className={DS.mediaPremium}
          />
        </div>
      </Section>

      <BulletCardList
        headingId="provider-why-choose-heading"
        heading={`Why choose ${provider.name}`}
        subheading="Practical reasons players explore this studio"
        body={`Reasons players look at ${provider.name} titles on GGLBET.`}
        items={provider.whyChoose}
        mediaAlt={`${provider.name} on GGLBET`}
      />

      <BulletCardList
        headingId="provider-advantages-heading"
        heading="Advantages"
        subheading={`What stands out from ${provider.name}`}
        body={`Studio strengths players notice when browsing ${provider.name} on GGLBET.`}
        items={provider.advantages}
        mediaAlt={`${provider.name} advantages on GGLBET`}
      />

      <Section
        id="provider-categories"
        padding="lg"
        containerSize="wide"
        aria-labelledby="provider-categories-heading"
      >
        <SectionIntro
          headingId="provider-categories-heading"
          heading="Game categories"
          subheading="Verticals covered by this provider"
          body={`${provider.name} covers the game categories below on GGLBET.`}
        />
        <ul className="mt-8 flex flex-wrap gap-3">
          {provider.categoryLabels.map((label) => (
            <li key={label} className={DS.glassChip}>
              {label}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="provider-popular-games"
        padding="lg"
        containerSize="wide"
        aria-labelledby="provider-popular-games-heading"
        tone="muted"
      >
        <SectionIntro
          headingId="provider-popular-games-heading"
          heading="Popular games"
          subheading={`Top ${provider.name} titles on GGLBET`}
          body={`Popular ${provider.name} games players open first on GGLBET.`}
          ctas={[
            {
              label: "Browse GGLBET games",
              href: provider.ctaPrimaryHref,
              variant: "outline",
            },
          ]}
        />
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {popularGames.map((game) => (
            <li key={game.id}>
              <Card
                as="article"
                interactive
                glass
                padding="none"
                className="home-v2-game-card overflow-hidden"
              >
                <Link
                  href={getGameHref(game.providerSlug, game.slug)}
                  className="block"
                  aria-label={`Open ${game.gameName}`}
                >
                  <CmsImageView
                    image={game.thumbnail}
                    aspect="wide"
                    rounded="none"
                    className="border-0 border-b border-border"
                  />
                  <div className="p-card">
                    <CardTitle as="h3">{game.gameName}</CardTitle>
                    <CardDescription className="mt-2">{game.shortDescription}</CardDescription>
                  </div>
                  <div className="home-v2-game-card__glow" aria-hidden />
                </Link>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <BulletCardList
        headingId="provider-features-heading"
        heading="Features"
        subheading="Product capabilities highlighted for this studio"
        body={provider.intro}
        items={provider.features}
        mediaAlt={`${provider.name} features on GGLBET`}
      />

      <Section
        id="provider-pros-cons"
        padding="lg"
        containerSize="wide"
        aria-labelledby="provider-pros-cons-heading"
      >
        <SectionIntro
          headingId="provider-pros-cons-heading"
          heading="Pros and cons"
          subheading="Balanced evaluation signals"
          body={`A balanced look at ${provider.name} so you can decide what fits your play style on GGLBET.`}
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Card glass>
            <CardTitle as="h3">Pros</CardTitle>
            <ul className="mt-4 space-y-2 text-sm text-ink-muted">
              {provider.pros.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </Card>
          <Card glass>
            <CardTitle as="h3">Cons</CardTitle>
            <ul className="mt-4 space-y-2 text-sm text-ink-muted">
              {provider.cons.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      <Section
        id="provider-devices"
        padding="lg"
        containerSize="wide"
        aria-labelledby="provider-devices-heading"
        tone="muted"
      >
        <SectionIntro
          headingId="provider-devices-heading"
          heading="Supported devices and platforms"
          subheading="Where players can access this catalog"
          body={`Devices and platforms where you can play ${provider.name} titles on GGLBET.`}
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Card glass>
            <CardTitle as="h3">Devices</CardTitle>
            <ul className="mt-4 space-y-2 text-sm text-ink-muted">
              {provider.supportedDevices.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </Card>
          <Card glass>
            <CardTitle as="h3">Platforms</CardTitle>
            <ul className="mt-4 space-y-2 text-sm text-ink-muted">
              {provider.supportedPlatforms.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </Card>
        </div>
        <div className={cn("mt-5", DS.glassPad)}>
          <h3 className="text-base font-semibold text-ink">Languages</h3>
          <p className="mt-2 text-sm text-ink-muted">
            {provider.supportedLanguages.join(", ")}
          </p>
        </div>
      </Section>

      <Section
        id="provider-payments"
        padding="lg"
        containerSize="wide"
        aria-labelledby="provider-payments-heading"
      >
        <SectionIntro
          headingId="provider-payments-heading"
          heading="Payment methods"
          subheading="Cashier context for playing this provider"
          body="Payment options for funding play when you open this provider on GGLBET."
          ctas={[
            { label: "Payment methods", href: ROUTES.payment, variant: "outline" },
          ]}
        />
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {provider.paymentMethods.map((method) => (
            <li
              key={method}
              className={cn(DS.glassPad, "text-sm text-ink-muted")}
            >
              {method}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="provider-security"
        padding="lg"
        containerSize="wide"
        aria-labelledby="provider-security-heading"
        tone="muted"
      >
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <SectionIntro
            headingId="provider-security-heading"
            heading="Security"
            subheading="Safer account and session practices"
            body={provider.securityNotes}
          />
          <SectionIntro
            headingId="provider-fair-play-heading"
            heading="Fair play"
            subheading="How to evaluate game integrity signals"
            body={provider.fairPlayNotes}
            headingLevel="h2"
          />
        </div>
      </Section>

      <Section
        id="provider-licensing"
        padding="lg"
        containerSize="wide"
        aria-labelledby="provider-licensing-heading"
      >
        <SectionIntro
          headingId="provider-licensing-heading"
          heading="Licensing and compliance notes"
          subheading="Transparency for trust"
          body={`Licensing notes published for ${provider.name} on GGLBET.`}
        />
        <ul className="mt-8 space-y-3">
          {provider.licenses.map((item) => (
            <li
              key={item}
              className={cn(DS.glassPad, "text-sm text-ink-muted")}
            >
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="provider-rtp"
        padding="lg"
        containerSize="wide"
        aria-labelledby="provider-rtp-heading"
        tone="muted"
      >
        <SectionIntro
          headingId="provider-rtp-heading"
          heading="RTP information"
          subheading={
            typeof provider.rtp === "number"
              ? `Reference RTP signal: ${provider.rtp}%`
              : "Title-level RTP varies"
          }
          body={
            provider.rtpNotes ??
            "RTP is title-specific. Always confirm figures inside each game information panel."
          }
        />
      </Section>

      <Section
        id="provider-volatility"
        padding="lg"
        containerSize="wide"
        aria-labelledby="provider-volatility-heading"
      >
        <SectionIntro
          headingId="provider-volatility-heading"
          heading="Volatility guide"
          subheading={`Profile: ${provider.volatility}`}
          body={provider.volatilityGuide}
        />
      </Section>

      <BulletCardList
        headingId="provider-how-to-play-heading"
        heading="How to play"
        subheading={`Getting started with ${provider.name}`}
        body={`Simple steps to start with ${provider.name} games on GGLBET.`}
        items={provider.howToPlay}
        mediaAlt={`How to play ${provider.name} on GGLBET`}
      />

      <BulletCardList
        headingId="provider-tips-heading"
        heading="Tips"
        subheading="Practical advice before you raise stakes"
        body="Tips emphasize helpful play habits and responsible decision-making."
        items={provider.tips}
        mediaAlt={`${provider.name} tips on GGLBET`}
      />

      <Section
        id="provider-faq"
        padding="lg"
        containerSize="wide"
        aria-labelledby="provider-faq-heading"
        tone="glow"
      >
        <SectionIntro
          headingId="provider-faq-heading"
          heading={`${provider.name} FAQ`}
          subheading="Common questions before you play"
          body={`Quick answers about ${provider.name} on GGLBET.`}
        />
        <DsFaqAccordion items={provider.faq} />
      </Section>

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
            subheading="Studios players often compare next"
            body="Other studios players often compare next on GGLBET."
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
            subheading={`More ${provider.name} titles on GGLBET`}
            body={`More games connected to ${provider.name} on GGLBET.`}
          />
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {relatedGames.map((game) => (
              <li key={game.id}>
                <Card as="article" interactive glass padding="none" className="home-v2-game-card overflow-hidden">
                  <Link href={getGameHref(game.providerSlug, game.slug)} aria-label={game.gameName}>
                    <CmsImageView
                      image={game.thumbnail}
                      aspect="wide"
                      rounded="none"
                      className="border-0 border-b border-border"
                    />
                    <div className="p-card">
                      <CardTitle as="h3">{game.gameName}</CardTitle>
                      <CardDescription className="mt-2">{game.shortDescription}</CardDescription>
                    </div>
                  </Link>
                </Card>
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
          body={`Offers, guides, and news tied to ${provider.name} on GGLBET.`}
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <Card glass>
            <CardTitle as="h3">Related promotions</CardTitle>
            <ul className="mt-4 space-y-2 text-sm">
              {provider.relatedPromotionSlugs.length > 0 ? (
                provider.relatedPromotionSlugs.map((slug) => (
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
              {provider.relatedNewsSlugs.length > 0 ? (
                provider.relatedNewsSlugs.map((slug) => (
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
        id="provider-internal-links"
        padding="md"
        containerSize="wide"
        aria-label="Site internal links"
      >
        <InternalLinkRail />
      </Section>

      <Section
        id="provider-final-cta"
        padding="lg"
        containerSize="wide"
        aria-labelledby="provider-final-cta-heading"
        className="home-v2-section border-t border-border-brand/40 bg-surface"
      >
        <div className="home-v2-section__bg" aria-hidden />
        <div className={DS.split}>
          <SectionIntro
            headingId="provider-final-cta-heading"
            heading={`Play ${provider.name} on GGLBET`}
            subheading="Register, log in, or continue browsing"
            body={`Choose the next step that fits how you want to explore ${provider.name} on GGLBET.`}
            ctas={[
              {
                label: provider.ctaPrimaryLabel,
                href: provider.ctaPrimaryHref,
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
            src={HUB_MEDIA.cta}
            alt={`Play ${provider.name} on GGLBET`}
            aspect="wide"
            fallbackSrc={HUB_MEDIA.cta}
            sizes="(max-width: 1024px) 42vw, 440px"
            className={DS.mediaPremium}
          />
        </div>
      </Section>
    </>
  );
}
