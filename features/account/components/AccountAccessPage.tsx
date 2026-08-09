import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { ROUTES, externalLinkProps } from "@/constants/routes";
import { GeoChecklist, GeoTldr } from "@/features/eeat";
import { SectionIntro } from "@/features/home/components/SectionIntro";

export type AccountAccessPageProps = {
  readonly mode: "login" | "register";
};

const COPY = {
  login: {
    eyebrow: "Account access",
    heading: "Log in to GGLBET",
    description:
      "Account sign-in is handled on the secure GGLBET platform. This page explains what you need before you sign in and where to go if you cannot get in.",
    tldr: "Sign-in happens on the secure platform, not on this documentation page. If you cannot access your account, check your registered email first, then contact support.",
    checklistTitle: "Before you sign in",
    checklist: [
      "Use the email address registered to the account.",
      "Check that any password manager entry points at the official domain.",
      "Never enter your details from a link sent by message or social media.",
      "Support will never ask for your password or a one-time code.",
    ],
    primaryCtaLabel: "Log in",
    primaryCtaHref: ROUTES.login,
  },
  register: {
    eyebrow: "Account access",
    heading: "Register a GGLBET account",
    description:
      "Registration is completed on the secure GGLBET platform. This page covers the eligibility rules, the documents you will need, and the limits worth setting before your first deposit.",
    tldr: "You must be of legal gambling age, hold only one account, and complete identity verification before your first withdrawal. Setting a deposit limit at registration is the single most effective safer-play step.",
    checklistTitle: "What registration requires",
    checklist: [
      "Legal gambling age in your jurisdiction, with online play permitted there.",
      "One account per person, registered with accurate personal details.",
      "A government ID and proof of address for identity verification.",
      "A payment method held in your own name.",
      "A deposit limit you decide before you fund the account.",
    ],
    primaryCtaLabel: "Register",
    primaryCtaHref: ROUTES.register,
  },
} as const;

export function AccountAccessPage({ mode }: AccountAccessPageProps) {
  const copy = COPY[mode];

  const links = [
    { href: ROUTES.home, label: "Back to home" },
    { href: ROUTES.games, label: "Browse games" },
    { href: ROUTES.faq, label: "Read the FAQ" },
    { href: ROUTES.payment, label: "Payment methods" },
    { href: ROUTES.responsibleGaming, label: "Responsible gaming" },
    { href: ROUTES.terms, label: "Terms and conditions" },
    {
      href: mode === "login" ? ROUTES.register : ROUTES.login,
      label: mode === "login" ? "Register instead" : "Log in instead",
    },
  ] as const;

  return (
    <>
      <Section
        id="account-hero"
        padding="lg"
        containerSize="content"
        aria-labelledby="account-hero-heading"
        className="border-b border-border"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
          {copy.eyebrow}
        </p>
        <h1
          id="account-hero-heading"
          className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl"
        >
          {copy.heading}
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-ink-muted">
          {copy.description}
        </p>
        <div className="mt-6">
          <Button href={copy.primaryCtaHref} size="lg">
            {copy.primaryCtaLabel}
          </Button>
        </div>
        <GeoTldr className="mt-8" text={copy.tldr} />
      </Section>

      <Section
        id="account-requirements"
        padding="lg"
        containerSize="content"
        aria-labelledby="account-requirements-heading"
      >
        <SectionIntro
          headingId="account-requirements-heading"
          heading={copy.checklistTitle}
          subheading="Requirements and safeguards"
          body="These requirements come from the platform terms and from anti-money-laundering rules that apply to every regulated operator."
        />
        <GeoChecklist className="mt-8" items={copy.checklist} />
      </Section>

      <Section
        id="account-links"
        padding="lg"
        containerSize="content"
        aria-label="Where to go next"
        tone="muted"
      >
        <ul className="flex flex-wrap gap-3 text-sm">
          {links.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="rounded-control border border-border px-3 py-2 text-ink-muted hover:border-border-brand hover:text-ink"
                {...externalLinkProps(item.href)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-ink-subtle">
          18+ only. Gambling involves risk — never play with money you cannot
          afford to lose.
        </p>
      </Section>
    </>
  );
}
