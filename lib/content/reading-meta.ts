import type { ContentBlock } from "@/types/content";

/**
 * Rough reading-time estimate from block text density.
 */
export function estimateReadingTimeMinutes(
  blocks: readonly ContentBlock[],
  wordsPerMinute = 220,
): number {
  let words = 0;

  for (const block of blocks) {
    words += countBlockWords(block);
  }

  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

function countBlockWords(block: ContentBlock): number {
  switch (block.type) {
    case "paragraph":
    case "quote":
    case "tldr":
    case "summary":
      return wordCount(block.text);
    case "definition":
      return wordCount(`${block.term} ${block.text}`);
    case "infoBox":
    case "warningBox":
    case "successBox":
    case "tipBox":
      return wordCount(`${block.title} ${block.body}`);
    case "heading":
    case "subHeading":
      return wordCount(block.text);
    case "hero":
      return wordCount(
        `${block.heading} ${block.subheading ?? ""} ${block.body ?? ""}`,
      );
    case "checklist":
    case "bulletList":
    case "numberList":
    case "pros":
    case "cons":
    case "bestPractice":
    case "commonMistakes":
      return block.items.reduce((sum, item) => sum + wordCount(item), 0);
    case "faq":
      return block.items.reduce(
        (sum, item) => sum + wordCount(`${item.question} ${item.answer}`),
        0,
      );
    case "howTo":
      return (
        wordCount(`${block.name} ${block.description ?? ""}`) +
        block.steps.reduce(
          (sum, step) => sum + wordCount(`${step.title} ${step.text}`),
          0,
        )
      );
    case "timeline":
      return block.items.reduce(
        (sum, item) => sum + wordCount(`${item.label} ${item.body}`),
        0,
      );
    case "comparisonTable":
    case "standardTable":
      return (
        wordCount(block.caption ?? "") +
        block.headers.reduce((sum, h) => sum + wordCount(h), 0) +
        block.rows.reduce(
          (sum, row) =>
            sum + row.reduce((inner, cell) => inner + wordCount(cell), 0),
          0,
        )
      );
    case "cta":
      return wordCount(`${block.heading} ${block.body ?? ""}`);
    case "codeBlock":
      return Math.ceil(block.code.length / 12);
    case "htmlBlock":
      return Math.ceil(block.html.replace(/<[^>]+>/g, " ").length / 5);
    default:
      return 0;
  }
}

function wordCount(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}
