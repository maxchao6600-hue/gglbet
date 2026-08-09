import { buildCanonicalUrl, toAbsoluteUrl } from "@/lib/seo/canonical";
import {
  buildFaqPageJsonLd,
  buildHowToJsonLd,
  compactJsonLd,
} from "@/lib/seo/json-ld";
import type { ContentBlock, ContentFaqItem, ContentHowToStep } from "@/types/content";
import type { JsonLd } from "@/types/seo";

export type ContentGeoSignals = {
  readonly tldr: readonly string[];
  readonly definitions: readonly { readonly term: string; readonly text: string }[];
  readonly quickAnswers: readonly string[];
  readonly keyTakeaways: readonly string[];
  readonly checklists: readonly {
    readonly title?: string;
    readonly items: readonly string[];
  }[];
  readonly comparisons: readonly {
    readonly caption?: string;
    readonly headers: readonly string[];
    readonly rows: readonly (readonly string[])[];
  }[];
  readonly faqs: readonly ContentFaqItem[];
};

/**
 * Pull FAQ items from faq blocks (and optional document-level FAQ merge upstream).
 */
export function extractFaqFromBlocks(
  blocks: readonly ContentBlock[],
): readonly ContentFaqItem[] {
  return blocks.flatMap((block) =>
    block.type === "faq" ? block.items : [],
  );
}

export function extractHowToFromBlocks(blocks: readonly ContentBlock[]): readonly {
  readonly name: string;
  readonly description?: string;
  readonly steps: readonly ContentHowToStep[];
}[] {
  return blocks.flatMap((block) =>
    block.type === "howTo"
      ? [
          {
            name: block.name,
            description: block.description,
            steps: block.steps,
          },
        ]
      : [],
  );
}

export function extractImageObjectsFromBlocks(
  blocks: readonly ContentBlock[],
): readonly {
  readonly url: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly caption?: string;
  readonly credit?: string;
}[] {
  const images: {
    url: string;
    alt: string;
    width: number;
    height: number;
    caption?: string;
    credit?: string;
  }[] = [];

  for (const block of blocks) {
    if (block.type === "image") {
      images.push({
        url: block.image.url || "/opengraph-image",
        alt: block.image.alt,
        width: block.image.width,
        height: block.image.height,
        caption: block.caption,
        credit: block.credit,
      });
    }
    if (block.type === "imageGallery") {
      for (const image of block.images) {
        images.push({
          url: image.url || "/opengraph-image",
          alt: image.alt,
          width: image.width,
          height: image.height,
          caption: image.caption,
          credit: image.credit,
        });
      }
    }
    if (block.type === "hero" && block.image) {
      images.push({
        url: block.image.url || "/opengraph-image",
        alt: block.image.alt,
        width: block.image.width,
        height: block.image.height,
        caption: block.image.caption,
        credit: block.image.credit,
      });
    }
  }

  return images;
}

/**
 * GEO signals for AI Overviews / ChatGPT / Perplexity citation.
 */
export function extractGeoSignalsFromBlocks(
  blocks: readonly ContentBlock[],
): ContentGeoSignals {
  const tldr: string[] = [];
  const definitions: { term: string; text: string }[] = [];
  const quickAnswers: string[] = [];
  const keyTakeaways: string[] = [];
  const checklists: {
    title?: string;
    items: readonly string[];
  }[] = [];
  const comparisons: {
    caption?: string;
    headers: readonly string[];
    rows: readonly (readonly string[])[];
  }[] = [];
  const faqs: ContentFaqItem[] = [];

  for (const block of blocks) {
    switch (block.type) {
      case "tldr":
        tldr.push(block.text);
        quickAnswers.push(block.text);
        break;
      case "summary":
        keyTakeaways.push(block.text);
        quickAnswers.push(block.text);
        break;
      case "definition":
        definitions.push({ term: block.term, text: block.text });
        quickAnswers.push(`${block.term}: ${block.text}`);
        break;
      case "checklist":
      case "bestPractice":
        checklists.push({ title: block.title, items: block.items });
        keyTakeaways.push(...block.items);
        break;
      case "comparisonTable":
        comparisons.push({
          caption: block.caption,
          headers: block.headers,
          rows: block.rows,
        });
        break;
      case "faq":
        faqs.push(...block.items);
        for (const item of block.items) {
          quickAnswers.push(`${item.question} ${item.answer}`);
        }
        break;
      default:
        break;
    }
  }

  return {
    tldr,
    definitions,
    quickAnswers,
    keyTakeaways,
    checklists,
    comparisons,
    faqs,
  };
}

type BuildContentBlockJsonLdInput = {
  readonly blocks: readonly ContentBlock[];
  readonly path: string;
  /** Extra FAQ from document-level CMS field. */
  readonly extraFaq?: readonly ContentFaqItem[];
};

/**
 * Auto JSON-LD derived from content blocks (FAQ / HowTo / ImageObject).
 * Article / NewsArticle / Game / SoftwareApplication remain vertical-specific
 * and are merged by feature SEO builders.
 */
export function buildContentBlockJsonLd(
  input: BuildContentBlockJsonLdInput,
): readonly JsonLd[] {
  const faq = [
    ...extractFaqFromBlocks(input.blocks),
    ...(input.extraFaq ?? []),
  ];
  const howTos = extractHowToFromBlocks(input.blocks);
  const images = extractImageObjectsFromBlocks(input.blocks);

  const nodes: Array<JsonLd | null> = [
    faq.length > 0 ? buildFaqPageJsonLd(faq) : null,
    ...howTos.map((item) =>
      buildHowToJsonLd({
        name: item.name,
        description: item.description ?? item.name,
        path: input.path,
        steps: item.steps,
      }),
    ),
    ...images.map(
      (image): JsonLd => ({
        "@context": "https://schema.org",
        "@type": "ImageObject",
        contentUrl: toAbsoluteUrl(image.url),
        description: image.alt,
        width: image.width,
        height: image.height,
        caption: image.caption,
        creditText: image.credit,
      }),
    ),
  ];

  // Table schema reserved — emit generic Dataset hint only when comparison present.
  const hasTable = input.blocks.some(
    (block) =>
      block.type === "comparisonTable" || block.type === "standardTable",
  );
  if (hasTable) {
    nodes.push({
      "@context": "https://schema.org",
      "@type": "Dataset",
      name: "Content comparison table",
      description: "Structured comparison data reserved for Table schema expansion.",
      url: buildCanonicalUrl(input.path),
    });
  }

  return compactJsonLd(nodes);
}
