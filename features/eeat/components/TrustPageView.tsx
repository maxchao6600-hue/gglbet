import Link from "next/link";

import { DsFaqAccordion } from "@/components/design-system/DsFaqAccordion";
import { DS } from "@/components/design-system/classes";
import { SplitHero } from "@/components/heroes/SplitHero";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SeoContainer } from "@/components/seo/SeoContainer";
import { Card, CardTitle } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import type { AppLocale } from "@/config/i18n";
import { HUB_MEDIA, type HubMediaKey } from "@/constants/hub-media";
import { CONTENT_PATHS, ROUTES, externalLinkProps } from "@/constants/routes";
import { SITE_NAME } from "@/constants/site";
import { EeatBar } from "@/features/eeat/components/EeatBar";
import {
  GeoBlocks,
  getGeoHeadings,
} from "@/features/eeat/components/GeoBlocks";
import { buildTrustPageJsonLd } from "@/features/eeat/seo/eeat-json-ld";
import { SectionIntro } from "@/features/home/components/SectionIntro";
import { SupportFinalCta } from "@/features/support/components/SupportFinalCta";
import { SupportSummaryGrid } from "@/features/support/components/SupportSummaryGrid";
import { SupportVisualSections } from "@/features/support/components/SupportVisualSections";
import { getSupportUiCopy } from "@/features/support/support-ui-copy";
import { localizePath } from "@/lib/i18n";
import { createBreadcrumbs } from "@/lib/seo/breadcrumb";
import type { EditorialPerson, TrustPageDocument } from "@/types/eeat";
import { cn } from "@/utils/cn";

export type TrustPageViewProps = {
  readonly page: TrustPageDocument;
  readonly author: EditorialPerson | null;
  readonly reviewer: EditorialPerson | null;
  readonly locale?: AppLocale;
};

function hubMediaForTrustPath(path: string, override?: string): string {
  if (override) return override;
  const normalized = path.toLowerCase();
  const map: Array<{ match: string; key: HubMediaKey }> = [
    { match: "/payment", key: "payment" },
    { match: "/responsible-gaming", key: "responsible" },
    { match: "/about-our-team", key: "team" },
    { match: "/about", key: "about" },
    { match: "/faq", key: "faq" },
    { match: "/contact", key: "contact" },
    { match: "/download", key: "download" },
    { match: "/editorial-policy", key: "editorial" },
    { match: "/support", key: "support" },
  ];

  for (const entry of map) {
    if (normalized === entry.match || normalized.startsWith(`${entry.match}/`)) {
      return HUB_MEDIA[entry.key];
    }
  }

  return HUB_MEDIA.support;
}

function trustHeroCtas(path: string, locale: AppLocale) {
  const copy = getSupportUiCopy(locale);
  const normalized = path.toLowerCase();
  const L = localizePath;
  if (normalized.startsWith("/faq")) {
    return [
      { label: copy.ctaSupport, href: L(ROUTES.support, locale), variant: "primary" as const },
      { label: copy.ctaContact, href: L(ROUTES.contact, locale), variant: "outline" as const },
    ];
  }
  if (normalized.startsWith("/payment")) {
    return [
      { label: copy.ctaFaq, href: L(ROUTES.faq, locale), variant: "primary" as const },
      { label: copy.ctaRegister, href: L(ROUTES.register, locale), variant: "outline" as const },
    ];
  }
  if (normalized.startsWith("/download")) {
    return [
      { label: copy.ctaGames, href: L(ROUTES.games, locale), variant: "primary" as const },
      { label: copy.ctaSupport, href: L(ROUTES.support, locale), variant: "outline" as const },
    ];
  }
  if (normalized.startsWith("/contact")) {
    return [
      { label: copy.ctaSupport, href: L(ROUTES.support, locale), variant: "primary" as const },
      { label: copy.ctaFaq, href: L(ROUTES.faq, locale), variant: "outline" as const },
    ];
  }
  if (normalized.startsWith("/responsible-gaming")) {
    return [
      { label: copy.ctaSupport, href: L(ROUTES.support, locale), variant: "primary" as const },
      { label: copy.ctaPayment, href: L(ROUTES.payment, locale), variant: "outline" as const },
    ];
  }
  if (normalized.startsWith("/editorial-policy")) {
    return [
      { label: copy.ctaAbout, href: L(ROUTES.about, locale), variant: "primary" as const },
      { label: copy.ctaTeam, href: L(ROUTES.team, locale), variant: "outline" as const },
    ];
  }
  if (normalized.startsWith("/about-our-team")) {
    return [
      { label: copy.ctaEditorial, href: L(ROUTES.editorialPolicy, locale), variant: "primary" as const },
      { label: copy.ctaContact, href: L(ROUTES.contact, locale), variant: "outline" as const },
    ];
  }
  if (normalized === "/about" || normalized.startsWith("/about/")) {
    return [
      { label: copy.ctaGames, href: L(ROUTES.games, locale), variant: "primary" as const },
      { label: copy.ctaContact, href: L(ROUTES.contact, locale), variant: "outline" as const },
    ];
  }
  if (normalized.startsWith("/support")) {
    return [
      { label: copy.ctaFaq, href: L(ROUTES.faq, locale), variant: "primary" as const },
      { label: copy.ctaContact, href: L(ROUTES.contact, locale), variant: "outline" as const },
    ];
  }
  return [
    { label: copy.ctaSupport, href: L(ROUTES.support, locale), variant: "primary" as const },
    { label: copy.ctaFaq, href: L(ROUTES.faq, locale), variant: "outline" as const },
  ];
}

export function TrustPageView({
  page,
  author,
  reviewer,
  locale = "en",
}: TrustPageViewProps) {
  const copy = getSupportUiCopy(locale);
  const breadcrumb = createBreadcrumbs([
    { name: copy.supportCrumb, path: localizePath(ROUTES.support, locale) },
    { name: page.title, path: localizePath(page.canonicalPath, locale) },
  ]);
  const headings = getGeoHeadings(page.blocks);
  const heroImage = hubMediaForTrustPath(page.canonicalPath, page.heroImageSrc);
  const finalCta = page.finalCta ?? {
    eyebrow: copy.defaultFinalEyebrow,
    heading: copy.defaultFinalHeading,
    subheading: copy.defaultFinalSub,
    body: copy.defaultFinalBody,
    mediaSrc: HUB_MEDIA.cta,
    mediaAlt: copy.defaultFinalHeading,
    ctas: [
      {
        label: copy.ctaRegister,
        href: localizePath(ROUTES.register, locale),
        variant: "primary" as const,
      },
      {
        label: copy.ctaSupport,
        href: localizePath(ROUTES.support, locale),
        variant: "outline" as const,
      },
      {
        label: copy.ctaGames,
        href: localizePath(ROUTES.games, locale),
        variant: "soft" as const,
      },
    ],
  };

  const siteLinks = [
    { href: localizePath(ROUTES.support, locale), label: copy.ctaSupport },
    { href: localizePath(ROUTES.faq, locale), label: copy.ctaFaq },
    { href: localizePath(ROUTES.payment, locale), label: copy.ctaPayment },
    { href: localizePath(CONTENT_PATHS.download, locale), label: copy.ctaDownload },
    { href: localizePath(ROUTES.responsibleGaming, locale), label: copy.ctaRg },
    { href: localizePath(ROUTES.about, locale), label: copy.ctaAbout },
    { href: localizePath(ROUTES.editorialPolicy, locale), label: copy.ctaEditorial },
    { href: localizePath(ROUTES.team, locale), label: copy.ctaTeam },
    { href: localizePath(ROUTES.contact, locale), label: copy.ctaContact },
    { href: localizePath(ROUTES.register, locale), label: copy.ctaRegister },
    { href: localizePath(ROUTES.login, locale), label: copy.ctaLogin },
    { href: localizePath(ROUTES.games, locale), label: copy.ctaGames },
  ];

  return (
    <>
      <SeoContainer
        jsonLd={buildTrustPageJsonLd({
          page,
          breadcrumb,
          author,
          reviewer,
          heroImageSrc: heroImage,
        })}
      />

      <SplitHero
        id="trust-hero"
        headingId="trust-hero-heading"
        eyebrow={page.heroEyebrow ?? copy.defaultEyebrow}
        brand={SITE_NAME}
        heading={page.heroTitle}
        subheading={page.heroDescription}
        imageSrc={heroImage}
        imageAlt={`${page.title} ${copy.heroOnBrand}`}
        ctas={trustHeroCtas(page.canonicalPath, locale)}
      />

      <Section padding="sm" containerSize="wide" aria-label={copy.howWeWork}>
        <EeatBar
          author={author}
          reviewer={reviewer}
          lastUpdated={page.lastUpdated}
          factChecked={page.factChecked}
          locale={locale}
        />
      </Section>

      <Section padding="sm" containerSize="wide" aria-label="Breadcrumb">
        <Breadcrumbs items={breadcrumb} />
      </Section>

      {page.summaryCards && page.summaryCards.length > 0 ? (
        <SupportSummaryGrid
          cards={page.summaryCards}
          heading={copy.quickSummary}
          subheading={copy.quickSummarySub}
          body={copy.quickSummaryBody}
        />
      ) : null}

      {headings.length > 0 ? (
        <Section
          id="trust-toc"
          padding="md"
          containerSize="wide"
          aria-labelledby="trust-toc-heading"
          tone="glow"
        >
          <h2
            id="trust-toc-heading"
            className="font-display text-xl font-bold text-ink"
          >
            {copy.onThisPage}
          </h2>
          <nav aria-label={copy.onThisPage} className="mt-4">
            <ol className="grid gap-2 sm:grid-cols-2">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <a
                    href={`#${heading.id}`}
                    className={cn(
                      DS.glassPad,
                      "block text-sm font-medium text-brand hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                    )}
                  >
                    {heading.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </Section>
      ) : null}

      <Section
        id="trust-content"
        padding="lg"
        containerSize="wide"
        aria-labelledby="trust-content-heading"
      >
        <h2 id="trust-content-heading" className="sr-only">
          {page.title}
        </h2>
        <GeoBlocks blocks={page.blocks} locale={locale} />
      </Section>

      {page.visualSections && page.visualSections.length > 0 ? (
        <SupportVisualSections sections={page.visualSections} />
      ) : null}

      {page.faq.length > 0 ? (
        <Section
          id="trust-faq"
          padding="lg"
          containerSize="wide"
          aria-labelledby="trust-faq-heading"
          tone="glow"
        >
          <SectionIntro
            headingId="trust-faq-heading"
            heading={page.faqHeading ?? copy.defaultFaqHeading}
            subheading={page.faqSubheading ?? copy.defaultFaqSub}
            body={page.faqBody ?? copy.defaultFaqBody}
          />
          <DsFaqAccordion items={page.faq} />
        </Section>
      ) : null}

      {author ? (
        <Section
          id="trust-author"
          padding="lg"
          containerSize="wide"
          aria-labelledby="trust-author-heading"
        >
          <SectionIntro
            headingId="trust-author-heading"
            heading={copy.authorHeading}
            subheading={copy.authorSub}
            body={copy.authorBody}
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <Card glass>
              <CardTitle as="h3">
                <Link
                  href={author.canonicalPath}
                  className="text-ink hover:text-brand"
                >
                  {author.name}
                </Link>
              </CardTitle>
              <p className="mt-1 text-sm font-medium text-brand">
                {author.jobTitle}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {author.bio}
              </p>
            </Card>
            {reviewer && reviewer.slug !== author.slug ? (
              <Card glass>
                <CardTitle as="h3">
                  <Link
                    href={reviewer.canonicalPath}
                    className="text-ink hover:text-brand"
                  >
                    {reviewer.name}
                  </Link>
                </CardTitle>
                <p className="mt-1 text-sm font-medium text-brand">
                  {reviewer.jobTitle}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {reviewer.bio}
                </p>
              </Card>
            ) : null}
          </div>
        </Section>
      ) : null}

      {page.relatedPaths.length > 0 ? (
        <Section
          id="trust-related"
          padding="lg"
          containerSize="wide"
          aria-labelledby="trust-related-heading"
          tone="muted"
        >
          <SectionIntro
            headingId="trust-related-heading"
            heading={copy.relatedHeading}
            subheading={copy.relatedSub}
            body={copy.relatedBody}
          />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {page.relatedPaths.map((item) => {
              const href = localizePath(item.href, locale);
              return (
              <li key={item.href}>
                <Link
                  href={href}
                  className={cn(
                    DS.glassInteractive,
                    "flex h-full items-center px-4 py-4 text-sm font-medium text-ink-muted hover:text-ink",
                  )}
                  {...externalLinkProps(href)}
                >
                  {item.label}
                </Link>
              </li>
              );
            })}
          </ul>
        </Section>
      ) : null}

      <Section
        id="trust-internal-links"
        padding="md"
        containerSize="wide"
        aria-label={copy.relatedHeading}
      >
        <ul className="flex flex-wrap gap-3 text-sm">
          {siteLinks.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="home-v2-glass inline-flex rounded-control px-3 py-2 text-ink-muted hover:text-ink"
                {...externalLinkProps(item.href)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <SupportFinalCta data={finalCta} />
    </>
  );
}
