import Image from "next/image";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SITE_NAME } from "@/constants/site";
import type { HomeCta } from "@/types/home";
import { cn } from "@/utils/cn";

export type SplitHeroCta = Pick<HomeCta, "label" | "href" | "variant">;

type SplitHeroProps = {
  readonly id?: string;
  readonly headingId: string;
  readonly eyebrow?: string;
  readonly brand?: string;
  readonly heading: string;
  readonly subheading: string;
  readonly body?: string;
  readonly trustLine?: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly ctas?: readonly SplitHeroCta[];
  readonly priority?: boolean;
  readonly className?: string;
  readonly children?: ReactNode;
};

/**
 * Sitewide TPOWER Hero (P0-1 Design System + P0-2 fused visual).
 * Left: eyebrow / H1 / description / CTAs.
 * Right: premium artwork fused into the dark pink/purple stage — not a framed card,
 * not a second image stacked on a background photo, not a logo placeholder.
 */
export function SplitHero({
  id,
  headingId,
  eyebrow,
  brand = SITE_NAME,
  heading,
  subheading,
  body,
  trustLine,
  imageSrc,
  imageAlt,
  ctas,
  priority = true,
  className,
  children,
}: SplitHeroProps) {
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      aria-label={imageAlt}
      className={cn(
        "home-v2-hero home-v2-hero--split relative overflow-hidden border-b border-border",
        className,
      )}
    >
      {/* Fused right-stage artwork — edge-to-edge into the hero plane */}
      <div className="home-v2-hero__stage" aria-hidden>
        <Image
          src={imageSrc}
          alt=""
          fill
          priority={priority}
          fetchPriority={priority ? "high" : "auto"}
          quality={88}
          sizes="(max-width: 1024px) 58vw, 56vw"
          className="home-v2-hero__stage-img object-cover object-center"
        />
        <div className="home-v2-hero__stage-fade" />
      </div>

      <div className="home-v2-hero__wash home-v2-hero__wash--split" aria-hidden />
      <div className="home-v2-hero__neon home-v2-hero__neon--split" aria-hidden />
      <div className="home-v2-hero__floor" aria-hidden />

      <Container
        size="wide"
        className="home-v2-hero__grid relative z-10 grid grid-cols-2 items-center"
      >
        <div className="home-v2-hero__copy home-v2-reveal min-w-0">
          {(eyebrow || brand) && (
            <p className="font-display text-[0.65rem] font-bold uppercase tracking-[0.22em] text-brand sm:text-sm">
              {[eyebrow, brand].filter(Boolean).join(" · ")}
            </p>
          )}
          <h1
            id={headingId}
            className="mt-2 text-balance font-display text-[1.35rem] font-bold tracking-tight text-ink sm:mt-3 sm:text-3xl lg:mt-4 lg:text-[3rem] lg:leading-[1.08]"
          >
            {heading}
          </h1>
          <p className="mt-2 max-w-xl text-xs leading-relaxed text-ink-muted sm:mt-4 sm:text-base lg:mt-5 lg:text-lg">
            {subheading}
          </p>
          {body ? (
            <p className="mt-2 max-w-lg text-[0.7rem] leading-relaxed text-ink-subtle sm:mt-3 sm:text-sm lg:mt-4 lg:text-base">
              {body}
            </p>
          ) : null}
          {ctas && ctas.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2 sm:mt-6 sm:gap-3 lg:mt-8">
              {ctas.map((cta) => (
                <Button
                  key={`${cta.href}-${cta.label}`}
                  href={cta.href}
                  variant={cta.variant ?? "primary"}
                  size="lg"
                  aria-label={cta.label}
                >
                  {cta.label}
                </Button>
              ))}
            </div>
          ) : null}
          {trustLine ? (
            <p className="mt-3 text-[0.65rem] text-ink-subtle sm:mt-5 sm:text-sm lg:mt-6">
              {trustLine}
            </p>
          ) : null}
          {children ? (
            <div className="home-v2-hero__extras mt-4 max-w-xl space-y-3 sm:mt-5 lg:mt-6">
              {children}
            </div>
          ) : null}
        </div>

        {/* Spacer column keeps left/right desktop composition; art is the fused stage */}
        <div className="home-v2-hero__spacer pointer-events-none min-w-0" aria-hidden />
      </Container>

      {/* Accessible image label for screen readers (decorative stage uses alt="") */}
      <span className="sr-only">{imageAlt}</span>
    </section>
  );
}
