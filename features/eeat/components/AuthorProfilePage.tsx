import Link from "next/link";

import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SeoContainer } from "@/components/seo/SeoContainer";
import { Card, CardTitle } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { ROUTES, getAuthorHref } from "@/constants/routes";
import { buildAuthorProfileJsonLd } from "@/features/eeat/seo/eeat-json-ld";
import { SectionIntro } from "@/features/home/components/SectionIntro";
import { createBreadcrumbs } from "@/lib/seo/breadcrumb";
import type { EditorialPerson, TrustPageDocument } from "@/types/eeat";

export type AuthorProfilePageProps = {
  readonly author: EditorialPerson;
  readonly pages: readonly TrustPageDocument[];
  readonly colleagues: readonly EditorialPerson[];
};

function formatDate(value: string): string {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime())
    ? value
    : parsed.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
}

export function AuthorProfilePage({
  author,
  pages,
  colleagues,
}: AuthorProfilePageProps) {
  const breadcrumb = createBreadcrumbs([
    { name: "About our team", path: ROUTES.team },
    { name: author.name, path: author.canonicalPath },
  ]);

  return (
    <>
      <SeoContainer
        jsonLd={buildAuthorProfileJsonLd({ author, breadcrumb, pages })}
      />

      <Section
        id="author-hero"
        padding="lg"
        containerSize="wide"
        aria-labelledby="author-hero-heading"
        className="border-b border-border"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
          Author profile
        </p>
        <h1
          id="author-hero-heading"
          className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl"
        >
          {author.name}
        </h1>
        <p className="mt-2 text-lg font-medium text-ink-muted">
          {author.jobTitle}
        </p>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-subtle">
          {author.bio}
        </p>
        {author.email ? (
          <p className="mt-6 text-sm text-ink-subtle">
            Content corrections:{" "}
            <Link
              href={ROUTES.contact}
              className="font-medium text-brand hover:text-primary-hover"
            >
              contact this desk
            </Link>
          </p>
        ) : null}
      </Section>

      <Section padding="sm" containerSize="wide" aria-label="Breadcrumb">
        <Breadcrumbs items={breadcrumb} />
      </Section>

      <Section
        id="author-expertise"
        padding="lg"
        containerSize="wide"
        aria-labelledby="author-expertise-heading"
      >
        <SectionIntro
          headingId="author-expertise-heading"
          heading="Expertise and credentials"
          subheading="What this desk is accountable for"
          body="Expertise areas define which pages this desk owns. Credentials describe the process guarantees attached to that ownership."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Card>
            <CardTitle as="h3">Areas of expertise</CardTitle>
            <ul className="mt-4 space-y-2 text-sm text-ink-muted">
              {author.expertise.map((item) => (
                <li key={item} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <CardTitle as="h3">Credentials and standards</CardTitle>
            <ul className="mt-4 space-y-2 text-sm text-ink-muted">
              {author.credentials.map((item) => (
                <li key={item} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      <Section
        id="author-pages"
        padding="lg"
        containerSize="wide"
        aria-labelledby="author-pages-heading"
        tone="muted"
      >
        <SectionIntro
          headingId="author-pages-heading"
          heading="Pages produced by this desk"
          subheading={`${pages.length} trust page${pages.length === 1 ? "" : "s"} written or reviewed`}
          body="Guides, news, and game content credited to this desk live in their own collections; the trust and policy pages below are owned here directly."
        />
        {pages.length > 0 ? (
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {pages.map((page) => (
              <li key={page.id}>
                <Card as="article" interactive className="h-full">
                  <CardTitle as="h3">
                    <Link
                      href={page.canonicalPath}
                      className="text-ink hover:text-brand"
                    >
                      {page.title}
                    </Link>
                  </CardTitle>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {page.heroDescription}
                  </p>
                  <p className="mt-4 text-xs text-ink-subtle">
                    {page.authorSlug === author.slug ? "Written" : "Reviewed"} ·
                    Updated{" "}
                    <time dateTime={page.lastUpdated}>
                      {formatDate(page.lastUpdated)}
                    </time>
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-8 text-sm text-ink-muted">
            No trust pages are currently attributed to this desk.{" "}
            <Link href={ROUTES.news} className="text-brand hover:text-primary-hover">
              Browse GGLBET news
            </Link>{" "}
            for its latest published work.
          </p>
        )}
      </Section>

      {colleagues.length > 0 ? (
        <Section
          id="author-colleagues"
          padding="lg"
          containerSize="wide"
          aria-labelledby="author-colleagues-heading"
        >
          <SectionIntro
            headingId="author-colleagues-heading"
            heading="Other desks"
            subheading="The rest of the editorial organisation"
            body="Each desk publishes its own profile so you can see who is accountable for any part of the site."
          />
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {colleagues.map((person) => (
              <li key={person.id}>
                <Card as="article" interactive className="h-full">
                  <CardTitle as="h3">
                    <Link
                      href={getAuthorHref(person.slug)}
                      className="text-ink hover:text-brand"
                    >
                      {person.name}
                    </Link>
                  </CardTitle>
                  <p className="mt-1 text-sm font-medium text-brand">
                    {person.jobTitle}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {person.bio}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section
        id="author-links"
        padding="lg"
        containerSize="wide"
        aria-labelledby="author-links-heading"
        tone="muted"
      >
        <SectionIntro
          headingId="author-links-heading"
          heading="How we work"
          subheading="Policies behind every page"
          body="Our sourcing standards, quality bar, and review cadence are published rather than implied."
          ctas={[
            {
              label: "Editorial policy",
              href: ROUTES.editorialPolicy,
              variant: "primary",
            },
            {
              label: "Content quality policy",
              href: ROUTES.contentQuality,
              variant: "outline",
            },
            {
              label: "Content update policy",
              href: ROUTES.contentUpdates,
              variant: "ghost",
            },
            { label: "About our team", href: ROUTES.team, variant: "soft" },
          ]}
        />
      </Section>
    </>
  );
}
