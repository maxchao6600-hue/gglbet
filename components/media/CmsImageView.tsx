import type { CmsImage } from "@/types/cms";
import { isPlaceholderImage } from "@/lib/cms/media";
import { OptimizedImage } from "@/components/media/OptimizedImage";
import { PlaceholderMedia } from "@/features/home/components/PlaceholderMedia";
import { DEFAULT_PROVIDER_LOGO_PATH } from "@/constants/provider-media";
import { cn } from "@/utils/cn";

type PlaceholderTone = "brand" | "secondary" | "neutral" | "accent";

type CmsImageViewProps = {
  readonly image: CmsImage & { readonly placeholderTone?: PlaceholderTone };
  readonly className?: string;
  readonly imgClassName?: string;
  readonly aspect?: "hero" | "wide" | "square" | "portrait" | "auto";
  readonly rounded?: "section" | "none" | "card";
  readonly priority?: boolean;
  readonly sizes?: string;
  /** When primary image 404s. Defaults to the unified provider logo. */
  readonly fallbackSrc?: string;
};

export function CmsImageView({
  image,
  className,
  imgClassName,
  aspect = "wide",
  rounded = "card",
  priority = false,
  sizes,
  fallbackSrc = DEFAULT_PROVIDER_LOGO_PATH,
}: CmsImageViewProps) {
  if (isPlaceholderImage(image)) {
    return (
      <PlaceholderMedia
        label={image.alt}
        tone={image.placeholderTone ?? "brand"}
        aspect={aspect}
        rounded={rounded}
        priority={priority}
        className={className}
      />
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <OptimizedImage
        src={image.url}
        alt={image.alt}
        width={image.width}
        height={image.height}
        priority={priority}
        sizes={sizes}
        fallbackSrc={fallbackSrc}
        className={cn("h-full w-full object-cover", imgClassName)}
      />
    </div>
  );
}
