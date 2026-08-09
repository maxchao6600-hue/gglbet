import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

const SIZE_CLASS = {
  narrow: "max-w-container-narrow",
  content: "max-w-container-content",
  wide: "max-w-container-wide",
  full: "max-w-none",
} as const;

type ContainerSize = keyof typeof SIZE_CLASS;

type ContainerProps = {
  readonly children: ReactNode;
  readonly size?: ContainerSize;
  readonly className?: string;
  readonly as?: "div" | "main" | "section" | "article" | "header" | "footer";
};

/**
 * Responsive page container.
 * Mobile / tablet / desktop gutters come from --ggl-space-page-x.
 */
export function Container({
  children,
  size = "content",
  className,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-page-x",
        SIZE_CLASS[size],
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** @deprecated Prefer Container — alias retained for existing imports */
export const PageContainer = Container;
