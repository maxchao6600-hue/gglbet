import { countWordsInBlocks } from "@/lib/cms/seed/content/providers/longform";
import { providersSeed } from "@/lib/cms/seed/providers";
import type { ContentBlock } from "@/types/content";

/**
 * Official provider Content Engine blocks keyed by provider slug.
 * Sourced from providersSeed (gglbet5.com snapshot) — demo longform maps removed.
 */
export const providerLongformBySlug: Readonly<
  Record<string, readonly ContentBlock[]>
> = Object.fromEntries(
  providersSeed.map((provider) => [provider.slug, provider.content]),
);

export function getProviderLongformBlocks(
  slug: string,
): readonly ContentBlock[] | undefined {
  return providerLongformBySlug[slug];
}

export function getProviderLongformWordCounts(): readonly {
  readonly slug: string;
  readonly words: number;
}[] {
  return Object.entries(providerLongformBySlug).map(([slug, blocks]) => ({
    slug,
    words: countWordsInBlocks(blocks),
  }));
}
