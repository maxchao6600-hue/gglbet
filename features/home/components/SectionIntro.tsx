import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import type { HomeCta } from "@/types/home";
import { cn } from "@/utils/cn";

type SectionIntroProps = {
  readonly headingId: string;
  readonly heading: string;
  readonly subheading: string;
  readonly body: string;
  readonly eyebrow?: string;
  readonly align?: "left" | "center";
  readonly ctas?: readonly HomeCta[];
  readonly className?: string;
  readonly headingLevel?: "h1" | "h2" | "h3";
  readonly children?: ReactNode;
};

export function SectionIntro({
  headingId,
  heading,
  subheading,
  body,
  eyebrow,
  align = "left",
  ctas,
  className,
  headingLevel = "h2",
  children,
}: SectionIntroProps) {
  const HeadingTag = headingLevel;

  return (
    <div
      className={cn(
        "home-v2-reveal flex min-w-0 flex-col gap-3 sm:gap-4",
        align === "center" && "mx-auto max-w-3xl items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-brand sm:text-sm">
          {eyebrow}
        </p>
      ) : null}
      <HeadingTag
        id={headingId}
        className="text-balance font-display text-xl font-bold tracking-tight text-ink sm:text-3xl lg:text-4xl"
      >
        {heading}
      </HeadingTag>
      <p className="text-sm font-medium text-ink-muted sm:text-lg">{subheading}</p>
      <p className="max-w-3xl text-xs leading-relaxed text-ink-subtle sm:text-base">
        {body}
      </p>
      {ctas && ctas.length > 0 ? (
        <div
          className={cn(
            "mt-1 flex flex-wrap gap-2 sm:mt-2 sm:gap-3",
            align === "center" && "justify-center",
          )}
        >
          {ctas.map((cta) => (
            <Button
              key={`${cta.href}-${cta.label}`}
              href={cta.href}
              variant={cta.variant ?? "primary"}
              aria-label={cta.label}
            >
              {cta.label}
            </Button>
          ))}
        </div>
      ) : null}
      {children}
    </div>
  );
}
