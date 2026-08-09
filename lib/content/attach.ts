import {
  buildGameContentBlocks,
  buildPromotionContentBlocks,
  buildProviderContentBlocks,
} from "@/lib/content/narrative-builders";
import { estimateReadingTimeMinutes } from "@/lib/content/reading-meta";
import { buildTocFromBlocks } from "@/lib/content/toc";
import { L, type LocalizedBlocks, type LocalizedString } from "@/lib/i18n";
import type { ContentBlock, ContentTocItem } from "@/types/content";
import type { Game } from "@/types/game";
import type { Promotion } from "@/types/promotion";
import type { Provider } from "@/types/provider";

type ContentEngineFields = {
  readonly content: readonly ContentBlock[];
  readonly tableOfContents: readonly ContentTocItem[];
  readonly readingTimeMinutes: number;
  readonly factChecked: boolean;
  readonly publishDate: string;
};

type BilingualTocItem = Omit<ContentTocItem, "label"> & {
  readonly label: LocalizedString | string;
};

function isLocalizedBlocks(value: unknown): value is LocalizedBlocks {
  return (
    typeof value === "object" &&
    value !== null &&
    Array.isArray((value as LocalizedBlocks).en) &&
    Array.isArray((value as LocalizedBlocks).zh)
  );
}

function bilingualTocFromBlocks(
  blocks: LocalizedBlocks,
): readonly BilingualTocItem[] {
  const enToc = buildTocFromBlocks(blocks.en);
  const zhToc = buildTocFromBlocks(blocks.zh);
  return enToc.map((item) => {
    const zhItem = zhToc.find((z) => z.anchor === item.anchor);
    return {
      ...item,
      label: L(item.label, zhItem?.label ?? item.label),
    };
  });
}

/**
 * Attach unified Content Engine fields when CMS stores narrative fields only.
 * If `content` is already populated, TOC/reading time are derived from it.
 */
export function attachGameContentEngine(
  game: Omit<
    Game,
    | "content"
    | "tableOfContents"
    | "readingTimeMinutes"
    | "factChecked"
    | "publishDate"
  > &
    Partial<ContentEngineFields>,
): Game {
  // Explicit `content` (including empty catalog sync) must not regenerate SEO narrative.
  const content =
    game.content !== undefined
      ? game.content
      : buildGameContentBlocks(game);
  return {
    ...game,
    content,
    tableOfContents:
      game.tableOfContents && game.tableOfContents.length > 0
        ? game.tableOfContents
        : buildTocFromBlocks(content),
    readingTimeMinutes:
      game.readingTimeMinutes ?? estimateReadingTimeMinutes(content),
    factChecked: game.factChecked ?? true,
    publishDate: game.publishDate ?? game.publishedAt ?? game.lastUpdated,
  };
}

export function attachProviderContentEngine(
  provider: Omit<
    Provider,
    | "content"
    | "tableOfContents"
    | "readingTimeMinutes"
    | "factChecked"
    | "publishDate"
  > &
    Partial<ContentEngineFields> & {
      readonly content?: readonly ContentBlock[] | LocalizedBlocks;
    },
): Provider {
  if (isLocalizedBlocks(provider.content)) {
    const blocks = provider.content;
    return {
      ...provider,
      content: blocks as unknown as ContentBlock[],
      tableOfContents: bilingualTocFromBlocks(blocks) as unknown as ContentTocItem[],
      readingTimeMinutes:
        provider.readingTimeMinutes ??
        estimateReadingTimeMinutes(blocks.en),
      factChecked: provider.factChecked ?? true,
      publishDate:
        provider.publishDate ?? provider.publishedAt ?? provider.lastUpdated,
    };
  }

  const content =
    provider.content &&
    Array.isArray(provider.content) &&
    provider.content.length > 0
      ? provider.content
      : buildProviderContentBlocks(provider);
  return {
    ...provider,
    content,
    tableOfContents:
      provider.tableOfContents && provider.tableOfContents.length > 0
        ? provider.tableOfContents
        : buildTocFromBlocks(content),
    readingTimeMinutes:
      provider.readingTimeMinutes ?? estimateReadingTimeMinutes(content),
    factChecked: provider.factChecked ?? true,
    publishDate:
      provider.publishDate ?? provider.publishedAt ?? provider.lastUpdated,
  };
}

export function attachPromotionContentEngine(
  promotion: Omit<
    Promotion,
    | "content"
    | "tableOfContents"
    | "readingTimeMinutes"
    | "factChecked"
    | "publishDate"
    | "updatedDate"
    | "author"
  > &
    Partial<
      ContentEngineFields & {
        readonly updatedDate: string;
        readonly author: Promotion["author"];
      }
    >,
): Promotion {
  const content =
    promotion.content && promotion.content.length > 0
      ? promotion.content
      : buildPromotionContentBlocks(promotion);
  const publishDate =
    promotion.publishDate ?? promotion.publishedAt ?? promotion.startDate ?? new Date().toISOString();
  return {
    ...promotion,
    author:
      promotion.author ??
      ({
        id: "author-gglbet-editorial",
        name: "GGLBET Editorial",
        slug: "gglbet-editorial",
      } as const),
    content,
    tableOfContents:
      promotion.tableOfContents && promotion.tableOfContents.length > 0
        ? promotion.tableOfContents
        : buildTocFromBlocks(content),
    readingTimeMinutes:
      promotion.readingTimeMinutes ?? estimateReadingTimeMinutes(content),
    factChecked: promotion.factChecked ?? true,
    publishDate,
    updatedDate: promotion.updatedDate ?? promotion.updatedAt ?? publishDate,
  };
}
