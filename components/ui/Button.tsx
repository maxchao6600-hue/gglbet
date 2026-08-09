import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import { externalLinkProps, isExternalHref } from "@/constants/routes";
import { cn } from "@/utils/cn";

const VARIANT_CLASS = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-brand-active shadow-brand",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary-hover",
  outline:
    "border border-border bg-transparent text-ink hover:border-border-brand hover:bg-brand-muted",
  ghost: "bg-transparent text-ink-muted hover:bg-surface-muted hover:text-ink",
  soft: "bg-brand-muted text-ink hover:border-border-brand",
  danger: "bg-danger text-danger-foreground hover:bg-danger-hover",
} as const;

const SIZE_CLASS = {
  sm: "h-control-sm px-3 text-sm",
  md: "h-control-md px-4 text-sm",
  lg: "h-control-lg px-6 text-base",
} as const;

type ButtonVariant = keyof typeof VARIANT_CLASS;
type ButtonSize = keyof typeof SIZE_CLASS;

type SharedProps = {
  readonly children: ReactNode;
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly className?: string;
  readonly fullWidth?: boolean;
};

type ButtonAsButton = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    readonly href?: undefined;
  };

type ButtonAsLink = SharedProps &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "className" | "children" | "href"
  > & {
    readonly href: string;
    readonly prefetch?: boolean;
    readonly replace?: boolean;
    readonly scroll?: boolean;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function buildClassName(
  variant: ButtonVariant,
  size: ButtonSize,
  fullWidth: boolean,
  className: string | undefined,
): string {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-control font-semibold transition-colors duration-motion-fast ease-standard",
    "focus-visible:outline-none focus-visible:shadow-focus",
    "disabled:pointer-events-none disabled:opacity-45",
    VARIANT_CLASS[variant],
    SIZE_CLASS[size],
    fullWidth && "w-full",
    className,
  );
}

export function Button(props: ButtonProps) {
  const classes = buildClassName(
    props.variant ?? "primary",
    props.size ?? "md",
    props.fullWidth ?? false,
    props.className,
  );

  const inferredLabel =
    props["aria-label"] ??
    (typeof props.children === "string" ? props.children : undefined);

  if (typeof props.href === "string") {
    const external = isExternalHref(props.href);
    const auto = externalLinkProps(props.href);
    return (
      <Link
        href={props.href}
        className={classes}
        prefetch={external ? false : props.prefetch}
        replace={props.replace}
        scroll={props.scroll}
        target={props.target ?? auto.target}
        rel={props.rel ?? auto.rel}
        onClick={props.onClick}
        onMouseEnter={props.onMouseEnter}
        aria-label={inferredLabel}
        id={props.id}
      >
        {props.children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      className={classes}
      disabled={props.disabled}
      name={props.name}
      value={props.value}
      form={props.form}
      onClick={props.onClick}
      aria-label={inferredLabel}
      id={props.id}
    >
      {props.children}
    </button>
  );
}
