import {
  checklist,
  codeBlock,
  comparisonTable,
  heading,
  imageBlock,
  infoBox,
  paragraph,
  subHeading,
  tipBox,
  videoBlock,
  warningBox,
} from "@/lib/content/factories";
import { toContentImageAsset } from "@/lib/content/image-placeholder";
import { slugifyAnchor } from "@/lib/content/toc";
import type { ContentBlock } from "@/types/content";
import type { TrustPageBlock } from "@/types/eeat";
import type { CmsImage } from "@/types/cms";

/**
 * Legacy editorial shapes still present in older CMS seeds / Trust pages.
 * Native ContentBlock payloads pass through unchanged.
 */
type LegacyEditorialBlock =
  | TrustPageBlock
  | {
      readonly type: "paragraph";
      readonly id: string;
      readonly text: string;
    }
  | {
      readonly type: "heading";
      readonly id: string;
      readonly level: 2 | 3;
      readonly text: string;
      readonly anchor: string;
    }
  | {
      readonly type: "callout";
      readonly id: string;
      readonly variant: "info" | "tip" | "warning";
      readonly title: string;
      readonly body: string;
    }
  | {
      readonly type: "checklist";
      readonly id: string;
      readonly title?: string;
      readonly items: readonly string[];
    }
  | {
      readonly type: "comparison";
      readonly id: string;
      readonly caption?: string;
      readonly headers: readonly string[];
      readonly rows: readonly (readonly string[])[];
    }
  | {
      readonly type: "image";
      readonly id: string;
      readonly image: CmsImage;
      readonly caption?: string;
    }
  | {
      readonly type: "video";
      readonly id: string;
      readonly title: string;
      readonly url?: string;
      readonly poster?: CmsImage;
    }
  | {
      readonly type: "code";
      readonly id: string;
      readonly language?: string;
      readonly code: string;
      readonly caption?: string;
    };

function isLegacyOnlyType(type: string): boolean {
  return (
    type === "callout" ||
    type === "comparison" ||
    type === "code" ||
    type === "steps"
  );
}

/**
 * Normalize legacy Guide / News / Trust blocks into the unified ContentBlock union.
 * Native ContentBlock payloads pass through unchanged.
 */
export function normalizeToContentBlocks(
  blocks: readonly (ContentBlock | LegacyEditorialBlock)[],
): readonly ContentBlock[] {
  return blocks.map((block) => {
    if (isLegacyOnlyType(block.type)) {
      return fromLegacyBlock(block as LegacyEditorialBlock);
    }

    if (block.type === "heading") {
      const level =
        "level" in block ? (block as { level?: 2 | 3 }).level : undefined;
      if (level === 3) {
        return subHeading(block.text, block.anchor, block.id);
      }
      return heading(block.text, block.anchor, block.id);
    }

    if (block.type === "tldr" || block.type === "definition") {
      if ("term" in block || block.type === "tldr") {
        return block as ContentBlock;
      }
    }

    if (block.type === "image" && "image" in block) {
      const imageBlockValue = block as {
        readonly id: string;
        readonly image: CmsImage;
        readonly caption?: string;
      };
      return imageBlock({
        image: toContentImageAsset(imageBlockValue.image),
        caption: imageBlockValue.caption,
        id: imageBlockValue.id,
      });
    }

    if (block.type === "video") {
      return fromLegacyBlock(block as LegacyEditorialBlock);
    }

    return block as ContentBlock;
  });
}

function fromLegacyBlock(block: LegacyEditorialBlock): ContentBlock {
  switch (block.type) {
    case "paragraph":
      return paragraph(block.text, block.id);
    case "heading": {
      if ("level" in block && block.level === 3) {
        return subHeading(block.text, block.anchor, block.id);
      }
      return heading(block.text, block.anchor, block.id);
    }
    case "callout":
      if (block.variant === "warning") {
        return warningBox(block.title, block.body, block.id);
      }
      if (block.variant === "tip") {
        return tipBox(block.title, block.body, block.id);
      }
      return infoBox(block.title, block.body, block.id);
    case "checklist":
      return checklist(block.items, block.title, block.id);
    case "comparison":
      return comparisonTable({
        headers: block.headers,
        rows: block.rows,
        caption: block.caption,
        id: block.id,
      });
    case "image":
      return imageBlock({
        image: toContentImageAsset(block.image),
        caption: block.caption,
        id: block.id,
      });
    case "video":
      return videoBlock({
        title: block.title,
        url: "url" in block ? block.url : undefined,
        poster:
          "poster" in block && block.poster
            ? toContentImageAsset(block.poster)
            : undefined,
        id: block.id,
      });
    case "code":
      return codeBlock({
        code: block.code,
        language: block.language,
        caption: block.caption,
        id: block.id,
      });
    case "tldr":
      return { type: "tldr", id: block.id, text: block.text };
    case "definition":
      return {
        type: "definition",
        id: block.id,
        term: block.term,
        text: block.text,
      };
    case "steps":
      return {
        type: "howTo",
        id: block.id,
        name: block.title,
        steps: block.steps.map((step) => ({
          title: step.title,
          text: step.text,
        })),
      };
    default: {
      const fallback = block as { readonly id: string; readonly type: string };
      return paragraph(
        `[Unsupported legacy block: ${fallback.type}]`,
        fallback.id ?? `legacy-${slugifyAnchor(fallback.type)}`,
      );
    }
  }
}
