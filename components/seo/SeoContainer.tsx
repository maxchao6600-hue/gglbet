import { compactJsonLd, serializeJsonLd } from "@/lib/seo/json-ld";
import type { JsonLd } from "@/types/seo";

type SeoContainerProps = {
  readonly jsonLd?:
    | JsonLd
    | readonly (JsonLd | null | undefined)[]
    | null;
};

/**
 * SEO container for page-level structured data.
 * Nullable entries are dropped so builders can return null for empty input.
 */
export function SeoContainer({ jsonLd }: SeoContainerProps) {
  if (!jsonLd) {
    return null;
  }

  const payload = compactJsonLd(Array.isArray(jsonLd) ? jsonLd : [jsonLd]);

  if (payload.length === 0) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(payload) }}
    />
  );
}
