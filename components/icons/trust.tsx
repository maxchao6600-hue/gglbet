import type { ReactNode, SVGProps } from "react";

import { cn } from "@/utils/cn";
import type { HomeTrustItem } from "@/types/home";

type IconProps = SVGProps<SVGSVGElement> & {
  readonly title?: string;
};

function BaseIcon({
  className,
  title,
  children,
  ...rest
}: IconProps & { readonly children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      className={cn("h-6 w-6 shrink-0", className)}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export function IconShield(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
    </BaseIcon>
  );
}

export function IconLock(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </BaseIcon>
  );
}

export function IconDeposit(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 3v12" />
      <path d="M8 11l4 4 4-4" />
      <path d="M5 19h14" />
    </BaseIcon>
  );
}

export function IconWithdraw(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 21V9" />
      <path d="M8 13l4-4 4 4" />
      <path d="M5 5h14" />
    </BaseIcon>
  );
}

export function IconPayments(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18" />
      <path d="M7 15h4" />
    </BaseIcon>
  );
}

export function IconSupport(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 3a7 7 0 0 0-7 7v2a3 3 0 0 0 3 3h1v-5H7a5 5 0 0 1 10 0h-2v5h1a3 3 0 0 0 3-3v-2a7 7 0 0 0-7-7z" />
      <path d="M9 18h6" />
    </BaseIcon>
  );
}

export function IconResponsible(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v5" />
      <path d="M12 16h.01" />
    </BaseIcon>
  );
}

export function IconFair(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 3v18" />
      <path d="M5 8h5l2 3 2-3h5" />
      <path d="M7 16h10" />
    </BaseIcon>
  );
}

export function IconProviders(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 19V7l8-4 8 4v12" />
      <path d="M9 19v-6h6v6" />
    </BaseIcon>
  );
}

const TRUST_ICON_MAP = {
  shield: IconShield,
  lock: IconLock,
  deposit: IconDeposit,
  withdraw: IconWithdraw,
  payments: IconPayments,
  support: IconSupport,
  responsible: IconResponsible,
  fair: IconFair,
  providers: IconProviders,
} as const;

export function TrustIcon({
  name,
  className,
  title,
}: {
  readonly name: HomeTrustItem["icon"];
  readonly className?: string;
  readonly title?: string;
}) {
  const Icon = TRUST_ICON_MAP[name];
  return <Icon className={className} title={title} />;
}
