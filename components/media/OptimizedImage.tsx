"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

import { IMAGE_QUALITY_DEFAULT } from "@/config/images";
import { cn } from "@/utils/cn";

type OptimizedImageProps = Omit<ImageProps, "alt"> & {
  readonly alt: string;
  readonly className?: string;
  /** Shown when the primary src fails to load (404 / broken). */
  readonly fallbackSrc?: string;
};

function isVectorSrc(src: ImageProps["src"]): boolean {
  if (typeof src !== "string") return false;
  const lower = src.toLowerCase();
  return lower.endsWith(".svg") || lower.endsWith(".gif");
}

/**
 * Site-wide next/image wrapper enforcing alt text and default quality.
 * Vectors skip the optimizer; failed loads swap to an optional fallback.
 */
export function OptimizedImage({
  alt,
  className,
  quality = IMAGE_QUALITY_DEFAULT,
  sizes,
  src,
  fallbackSrc,
  onError,
  unoptimized,
  ...rest
}: OptimizedImageProps) {
  const [brokenFor, setBrokenFor] = useState<string | null>(null);
  const primary = typeof src === "string" ? src : null;
  const resolved =
    primary && brokenFor === primary && fallbackSrc ? fallbackSrc : src;

  return (
    <Image
      {...rest}
      alt={alt}
      quality={quality}
      sizes={sizes}
      src={resolved}
      unoptimized={unoptimized === true || isVectorSrc(resolved)}
      className={cn("h-auto w-full", className)}
      onError={(event) => {
        if (primary && fallbackSrc && primary !== fallbackSrc) {
          setBrokenFor(primary);
        }
        onError?.(event);
      }}
    />
  );
}
