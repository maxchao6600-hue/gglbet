import Image from "next/image";

import {
  resolveProviderLogoSrc,
  type ProviderLogoTreatment,
} from "@/constants/provider-logo";
import { DEFAULT_PROVIDER_LOGO_PATH } from "@/constants/provider-media";
import { cn } from "@/utils/cn";

export type ProviderLogoSize = "sm" | "md" | "lg" | "hero";

type ProviderLogoProps = {
  readonly src?: string | null;
  readonly alt: string;
  readonly size?: ProviderLogoSize;
  /** When false, renders only the img (caller supplies container). Default true. */
  readonly framed?: boolean;
  readonly className?: string;
  readonly imgClassName?: string;
  readonly priority?: boolean;
};

const SIZE: Record<
  ProviderLogoSize,
  { readonly wrap: string; readonly img: string; readonly w: number; readonly h: number }
> = {
  sm: {
    wrap: "provider-logo provider-logo--sm",
    img: "provider-logo__img",
    w: 96,
    h: 48,
  },
  md: {
    wrap: "provider-logo provider-logo--md",
    img: "provider-logo__img",
    w: 160,
    h: 80,
  },
  lg: {
    wrap: "provider-logo provider-logo--lg",
    img: "provider-logo__img",
    w: 220,
    h: 110,
  },
  hero: {
    wrap: "provider-logo provider-logo--hero",
    img: "provider-logo__img",
    w: 320,
    h: 160,
  },
};

function treatmentClass(treatment: ProviderLogoTreatment): string {
  if (treatment === "invert") return "provider-logo__img--invert";
  if (treatment === "white") return "provider-logo__img--white";
  return "provider-logo__img--native";
}

/**
 * Sitewide provider logo for dark theme.
 * White variant → native; whitelist → native; else CSS invert to white.
 */
export function ProviderLogo({
  src,
  alt,
  size = "md",
  framed = true,
  className,
  imgClassName,
  priority = false,
}: ProviderLogoProps) {
  const resolved = resolveProviderLogoSrc(src || DEFAULT_PROVIDER_LOGO_PATH);
  const dims = SIZE[size];
  const isVector = resolved.src.toLowerCase().endsWith(".svg");

  const image = (
    <Image
      src={resolved.src}
      alt={alt}
      width={dims.w}
      height={dims.h}
      priority={priority}
      unoptimized={isVector}
      className={cn(
        dims.img,
        treatmentClass(resolved.treatment),
        imgClassName,
      )}
    />
  );

  if (!framed) {
    return (
      <span className={cn("provider-logo__bare inline-flex", className)}>
        {image}
      </span>
    );
  }

  return (
    <div
      className={cn(dims.wrap, className)}
      data-logo-treatment={resolved.treatment}
      data-logo-slug={resolved.slug}
    >
      {image}
    </div>
  );
}
