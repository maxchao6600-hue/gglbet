import { createPlaceholderImage } from "@/lib/cms/media";
import type { CmsImage } from "@/types/cms";
import type { ContentImageAsset } from "@/types/content";

type PlaceholderTone = "brand" | "secondary" | "neutral" | "accent";

type CreateContentImagePlaceholderInput = {
  readonly alt: string;
  readonly caption?: string;
  readonly credit?: string;
  readonly tone?: PlaceholderTone;
  readonly width?: number;
  readonly height?: number;
  readonly priority?: boolean;
  readonly blurDataUrl?: string;
};

/**
 * Image Placeholder Engine — all CMS images go through this shape
 * (alt, caption, credit, width, height, priority, blur).
 */
export function createContentImagePlaceholder(
  input: CreateContentImagePlaceholderInput,
): ContentImageAsset {
  const base = createPlaceholderImage(
    input.alt,
    input.tone ?? "brand",
    input.width ?? 1200,
  );

  return {
    ...base,
    height: input.height ?? base.height,
    caption: input.caption,
    credit: input.credit,
    priority: input.priority,
    blurDataUrl: input.blurDataUrl ?? base.blurDataUrl,
  };
}

export function toContentImageAsset(
  image: CmsImage,
  extras?: {
    readonly caption?: string;
    readonly credit?: string;
    readonly priority?: boolean;
  },
): ContentImageAsset {
  return {
    ...image,
    caption: extras?.caption,
    credit: extras?.credit,
    priority: extras?.priority,
  };
}
