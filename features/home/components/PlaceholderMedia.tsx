import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

type PlaceholderTone = "brand" | "secondary" | "neutral" | "accent";

const TONE_CLASS: Record<PlaceholderTone, string> = {
  brand: "placeholder-tone-brand",
  secondary: "placeholder-tone-secondary",
  neutral: "placeholder-tone-neutral",
  accent: "placeholder-tone-accent",
};

type PlaceholderMediaProps = {
  readonly label: string;
  readonly className?: string;
  readonly tone?: PlaceholderTone;
  readonly aspect?: "hero" | "wide" | "square" | "portrait" | "auto";
  readonly priority?: boolean;
  readonly rounded?: "section" | "none" | "card";
  readonly children?: ReactNode;
};

const ASPECT_CLASS = {
  hero: "min-h-[22rem] sm:min-h-[28rem] lg:min-h-[36rem]",
  wide: "aspect-[16/10]",
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  auto: "min-h-[14rem]",
} as const;

const ROUNDED_CLASS = {
  section: "rounded-section",
  card: "rounded-card",
  none: "rounded-none",
} as const;

/**
 * Brand-safe media placeholder. No remote images, no official assets.
 */
export function PlaceholderMedia({
  label,
  className,
  tone = "brand",
  aspect = "wide",
  priority = false,
  rounded = "section",
  children,
}: PlaceholderMediaProps) {
  return (
    <figure
      role="img"
      aria-label={label}
      data-priority={priority ? "true" : undefined}
      className={cn(
        "placeholder-media relative overflow-hidden border border-border bg-surface-muted",
        ASPECT_CLASS[aspect],
        ROUNDED_CLASS[rounded],
        TONE_CLASS[tone],
        className,
      )}
    >
      <div className="placeholder-media__wash" />
      <div className="placeholder-media__grid" />
      <div className="placeholder-media__shade" />
      <figcaption className="sr-only">{label}</figcaption>
      {children}
    </figure>
  );
}
