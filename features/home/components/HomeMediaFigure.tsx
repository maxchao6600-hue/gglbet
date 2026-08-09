"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/utils/cn";

type HomeMediaFigureProps = {
  readonly src?: string;
  readonly alt: string;
  readonly label?: string;
  readonly tone?: "brand" | "secondary" | "neutral" | "accent";
  readonly aspect?: "hero" | "wide" | "square" | "portrait" | "auto" | "logo";
  readonly rounded?: "section" | "none" | "card";
  readonly priority?: boolean;
  readonly sizes?: string;
  readonly className?: string;
  readonly objectFit?: "cover" | "contain";
  /** Fallback artwork when src is missing — Home V2 never shows empty wash. */
  readonly fallbackSrc?: string;
};

const ASPECT = {
  hero: "aspect-[16/10]",
  wide: "aspect-[16/9]",
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  auto: "min-h-[12rem]",
  logo: "aspect-[5/3]",
} as const;

const DEFAULT_FALLBACK = "/home/v4/trending.png";

function isVectorSrc(src: string): boolean {
  const lower = src.toLowerCase();
  return lower.endsWith(".svg") || lower.endsWith(".gif");
}

/**
 * Home media — always renders a real premium image (src or section fallback).
 * Never renders wash / skeleton / empty gray frames as the visual.
 */
export function HomeMediaFigure({
  src,
  alt,
  label,
  aspect = "wide",
  rounded = "card",
  priority = false,
  sizes = "(max-width: 768px) 42vw, 480px",
  className,
  objectFit = "cover",
  fallbackSrc = DEFAULT_FALLBACK,
}: HomeMediaFigureProps) {
  const radius =
    rounded === "none"
      ? "rounded-none"
      : rounded === "section"
        ? "rounded-section"
        : "rounded-card";

  const preferred =
    src && src.length > 0
      ? src
      : fallbackSrc && fallbackSrc.length > 0
        ? fallbackSrc
        : DEFAULT_FALLBACK;
  const safeFallback =
    fallbackSrc && fallbackSrc.length > 0 ? fallbackSrc : DEFAULT_FALLBACK;

  const [brokenFor, setBrokenFor] = useState<string | null>(null);
  const resolved = brokenFor === preferred ? safeFallback : preferred;
  const isVector = isVectorSrc(resolved);

  return (
    <div
      className={cn(
        "home-v2-media relative overflow-hidden border border-border bg-[#12141a]",
        ASPECT[aspect],
        radius,
        className,
      )}
    >
      <Image
        src={resolved}
        alt={alt || label || "GGLBET"}
        fill
        priority={priority}
        unoptimized={isVector}
        sizes={sizes}
        className={cn(
          objectFit === "contain" ? "object-contain p-4" : "object-cover",
        )}
        onError={() => {
          if (preferred !== safeFallback) {
            setBrokenFor(preferred);
          }
        }}
      />
      <div className="home-v2-media__blend pointer-events-none absolute inset-0" />
    </div>
  );
}
