import type { ContentBlock, ContentTocItem } from "@/types/content";

export function slugifyAnchor(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/**
 * Auto-build TOC by scanning heading / subHeading blocks.
 */
export function buildTocFromBlocks(
  blocks: readonly ContentBlock[],
): readonly ContentTocItem[] {
  const items: ContentTocItem[] = [];

  for (const block of blocks) {
    if (block.type === "heading") {
      items.push({
        id: block.anchor,
        label: block.text,
        level: 2,
        anchor: block.anchor,
      });
    }
    if (block.type === "subHeading") {
      items.push({
        id: block.anchor,
        label: block.text,
        level: 3,
        anchor: block.anchor,
      });
    }
    if (block.type === "howTo") {
      const anchor = slugifyAnchor(block.name);
      items.push({
        id: anchor,
        label: block.name,
        level: 2,
        anchor,
      });
    }
  }

  return items;
}
