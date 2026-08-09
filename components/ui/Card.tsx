import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

type CardProps = {
  readonly children: ReactNode;
  readonly className?: string;
  readonly as?: "div" | "article" | "section" | "li";
  readonly interactive?: boolean;
  /**
   * Design System surface. Defaults to glass — the only card chrome allowed
   * sitewide. Set `glass={false}` only for rare non-panel wrappers.
   */
  readonly glass?: boolean;
  readonly padding?: "none" | "sm" | "md";
};

const PADDING_CLASS = {
  none: "p-0",
  sm: "p-3",
  md: "p-card",
} as const;

/**
 * Sitewide card primitive — Home Design System glass by default.
 * Do not reintroduce border+bg-card plain chrome.
 */
export function Card({
  children,
  className,
  as: Tag = "div",
  interactive = false,
  glass = true,
  padding = "md",
}: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-card text-ink",
        glass && "home-v2-glass",
        PADDING_CLASS[padding],
        interactive && glass && "home-v2-hover-card",
        interactive &&
          !glass &&
          "border border-border bg-surface-muted transition-[border-color,transform] duration-motion-base ease-standard hover:-translate-y-0.5 hover:border-border-brand",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

type CardHeaderProps = {
  readonly children: ReactNode;
  readonly className?: string;
};

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn("mb-3 flex flex-col gap-1", className)}>{children}</div>
  );
}

type CardTitleProps = {
  readonly children: ReactNode;
  readonly className?: string;
  readonly as?: "h2" | "h3" | "h4" | "p";
};

export function CardTitle({
  children,
  className,
  as: Tag = "h3",
}: CardTitleProps) {
  return (
    <Tag
      className={cn(
        "text-base font-semibold tracking-tight text-ink md:text-lg",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

type CardDescriptionProps = {
  readonly children: ReactNode;
  readonly className?: string;
};

export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={cn("text-sm leading-relaxed text-ink-muted", className)}>
      {children}
    </p>
  );
}

type CardBodyProps = {
  readonly children: ReactNode;
  readonly className?: string;
};

export function CardBody({ children, className }: CardBodyProps) {
  return <div className={cn("text-ink", className)}>{children}</div>;
}

type CardMediaProps = {
  readonly children: ReactNode;
  readonly className?: string;
};

export function CardMedia({ children, className }: CardMediaProps) {
  return (
    <div
      className={cn(
        "relative aspect-[16/10] overflow-hidden rounded-lg bg-surface-muted",
        className,
      )}
    >
      {children}
    </div>
  );
}
