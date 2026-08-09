import Link from "next/link";

import { DS } from "@/components/design-system/classes";
import { DsFaqAccordion } from "@/components/design-system/DsFaqAccordion";
import { SplitHero } from "@/components/heroes/SplitHero";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { HUB_MEDIA } from "@/constants/hub-media";
import { CONTENT_PATHS, ROUTES, externalLinkProps } from "@/constants/routes";
import { SITE_NAME } from "@/constants/site";
import { SectionIntro } from "@/features/home/components/SectionIntro";
import { createBreadcrumbs } from "@/lib/seo/breadcrumb";
import { cn } from "@/utils/cn";

const SUPPORT_LINKS = [
  {
    href: ROUTES.faq,
    label: "FAQ",
    description: "Common GGLBET account, payment, and play questions",
  },
  {
    href: ROUTES.payment,
    label: "Payment methods",
    description: "Deposit and withdrawal guidance for GGLBET",
  },
  {
    href: ROUTES.contact,
    label: "Contact",
    description: "Reach GGLBET support for corrections and help",
  },
  {
    href: ROUTES.responsibleGaming,
    label: "Responsible gaming",
    description: "Limits, cool-off, and safer play tools",
  },
  {
    href: CONTENT_PATHS.download,
    label: "Download",
    description: "Official GGLBET app install notes",
  },
  {
    href: ROUTES.about,
    label: "About GGLBET",
    description: "How the GGLBET content hub is produced",
  },
] as const;

const SUPPORT_FAQ = [
  {
    question: "Where do I start with GGLBET support?",
    answer:
      "Use this GGLBET Support hub to jump to FAQ, payment methods, contact, downloads, and responsible gaming. Each destination keeps the same Home Design System layout so you can move between help tasks without leaving the GGLBET content hub.",
  },
  {
    question: "How do I contact GGLBET?",
    answer:
      "Open the Contact page from this Support hub when you need a correction, media request, or player help handoff. GGLBET Support routes you to the official contact form rather than unofficial chat mirrors.",
  },
  {
    question: "Where are GGLBET payment answers?",
    answer:
      "Payment methods and cashier timing notes live on the GGLBET Payment page linked from this Support hub. Confirm live limits inside your signed-in GGLBET session after you read the documentation.",
  },
  {
    question: "Does GGLBET Support replace the live cashier?",
    answer:
      "No. GGLBET Support explains journeys and safer-play tools. Deposits, withdrawals, and lobby play still happen in your authenticated GGLBET account on the live product.",
  },
] as const;

/**
 * Support hub — Home Design System shell (SplitHero + glass cards).
 * Structural navigation only; SEO copy polish is deferred to the SEO stage.
 */
export function SupportHubPage() {
  const breadcrumb = createBreadcrumbs([
    { name: "Support", path: ROUTES.support },
  ]);

  return (
    <>
      <SplitHero
        id="support-hero"
        headingId="support-hero-heading"
        eyebrow="Help center"
        brand={SITE_NAME}
        heading="GGLBET Support"
        subheading="Find answers, payment help, downloads, and safer-play tools for GGLBET in one place."
        imageSrc={HUB_MEDIA.support}
        imageAlt="GGLBET support"
        ctas={[
          { label: "Open FAQ", href: ROUTES.faq, variant: "primary" },
          { label: "Contact GGLBET", href: ROUTES.contact, variant: "outline" },
        ]}
      />

      <Section padding="sm" containerSize="wide" aria-label="Breadcrumb">
        <Breadcrumbs items={breadcrumb} />
      </Section>

      <Section
        id="support-links"
        padding="lg"
        containerSize="wide"
        aria-labelledby="support-links-heading"
        tone="glow"
      >
        <SectionIntro
          headingId="support-links-heading"
          heading="Support destinations"
          subheading="Jump to the GGLBET page that matches your task"
          body="Use these cards to move between FAQ, payments, contact, downloads, and responsible gaming without leaving the Home Design System layout."
        />
        <ul className="relative z-[1] mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {SUPPORT_LINKS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  DS.glassInteractive,
                  "flex h-full flex-col p-card",
                )}
                {...externalLinkProps(item.href)}
              >
                <span className="font-display text-lg font-semibold text-ink">
                  {item.label}
                </span>
                <span className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {item.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="support-faq"
        padding="lg"
        containerSize="wide"
        aria-labelledby="support-faq-heading"
        tone="glow"
      >
        <SectionIntro
          headingId="support-faq-heading"
          heading="GGLBET Support FAQ"
          subheading="Quick answers before you open a deeper help page"
          body="Short GGLBET Support answers that point you to FAQ, payments, contact, and safer-play pages."
        />
        <DsFaqAccordion items={SUPPORT_FAQ} />
      </Section>

      <Section
        id="support-cta"
        padding="lg"
        containerSize="wide"
        aria-labelledby="support-cta-heading"
        tone="muted"
      >
        <SectionIntro
          headingId="support-cta-heading"
          heading="Need a live GGLBET session?"
          subheading="Register, log in, or download when you are ready to play"
          body="Support pages explain the product; live cashier and lobby actions still happen inside your GGLBET account."
          ctas={[
            { label: "Register", href: ROUTES.register, variant: "primary" },
            { label: "Log in", href: ROUTES.login, variant: "outline" },
            { label: "Download", href: ROUTES.download, variant: "soft" },
          ]}
        />
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href={ROUTES.games} variant="ghost">
            Browse GGLBET games
          </Button>
        </div>
      </Section>
    </>
  );
}
