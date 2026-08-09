import { ContentRenderer } from "@/features/content/components/ContentRenderer";
import type { GuideContentBlock } from "@/types/guide";

type GuideContentRendererProps = {
  readonly blocks: readonly GuideContentBlock[];
};

/**
 * @deprecated Use ContentRenderer from `@/features/content`.
 * Kept as a thin alias so existing Guide/News imports keep working.
 */
export function GuideContentRenderer({ blocks }: GuideContentRendererProps) {
  return <ContentRenderer blocks={blocks} />;
}
