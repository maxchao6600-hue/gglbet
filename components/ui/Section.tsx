import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import { cn } from "@/utils/cn";

const PADDING_CLASS = {
  none: "py-0",
  sm: "py-section-sm",
  md: "py-section-md",
  lg: "py-section-lg",
} as const;

type SectionPadding = keyof typeof PADDING_CLASS;

/** Home Design System section surfaces. */
type SectionTone = "default" | "muted" | "glow";

type SectionProps = {
  readonly children: ReactNode;
  readonly id?: string;
  readonly className?: string;
  readonly containerClassName?: string;
  readonly padding?: SectionPadding;
  readonly contained?: boolean;
  readonly containerSize?: "narrow" | "content" | "wide" | "full";
  /** `glow` = Home pink/purple wash; `muted` = bg-surface only. */
  readonly tone?: SectionTone;
  readonly as?: "section" | "div" | "aside";
  readonly "aria-labelledby"?: string;
  readonly "aria-label"?: string;
};

export function Section({
  children,
  id,
  className,
  containerClassName,
  padding = "md",
  contained = true,
  containerSize = "content",
  tone = "default",
  as: Tag = "section",
  "aria-labelledby": ariaLabelledBy,
  "aria-label": ariaLabel,
}: SectionProps) {
  const inner = contained ? (
    <Container
      size={containerSize}
      className={cn(tone !== "default" && "relative z-[1]", containerClassName)}
    >
      {children}
    </Container>
  ) : (
    children
  );

  return (
    <Tag
      id={id}
      aria-labelledby={ariaLabelledBy}
      aria-label={ariaLabel}
      className={cn(
        PADDING_CLASS[padding],
        tone === "muted" && "home-v2-section bg-surface",
        tone === "glow" && "home-v2-section bg-surface",
        className,
      )}
    >
      {tone === "glow" || tone === "muted" ? (
        <div className="home-v2-section__bg" aria-hidden />
      ) : null}
      {inner}
    </Tag>
  );
}
