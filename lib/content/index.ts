/**
 * Content Engine — shared pipeline for Provider / Game / Guide / News / Promotion.
 * Scale to 10k+ articles via CMS blocks without template changes.
 */

export type { ContentBlock, ContentBlockType, ContentDocumentMeta, ContentDocumentSlice, ContentFaqItem, ContentHowToStep, ContentImageAsset, ContentPerson, ContentRelatedRefs, ContentTocItem } from "@/types/content";

export {
  blockId,
  heading,
  subHeading,
  paragraph,
  quote,
  infoBox,
  warningBox,
  successBox,
  tipBox,
  checklist,
  bulletList,
  numberList,
  comparisonTable,
  standardTable,
  imageBlock,
  imageGallery,
  videoBlock,
  faqBlock,
  prosBlock,
  consBlock,
  timelineBlock,
  statistic,
  ctaBlock,
  buttonBlock,
  divider,
  spacer,
  authorBlock,
  reviewerBlock,
  relatedContentBlock,
  tldr,
  summary,
  definition,
  bestPractice,
  commonMistakes,
  howTo,
  codeBlock,
  htmlBlock,
  heroBlock,
} from "@/lib/content/factories";

export { buildTocFromBlocks, slugifyAnchor } from "@/lib/content/toc";
export { estimateReadingTimeMinutes } from "@/lib/content/reading-meta";
export {
  extractFaqFromBlocks,
  extractHowToFromBlocks,
  extractImageObjectsFromBlocks,
  extractGeoSignalsFromBlocks,
  buildContentBlockJsonLd,
} from "@/lib/content/seo-from-blocks";
export { normalizeToContentBlocks } from "@/lib/content/normalize";
export {
  buildGameContentBlocks,
  buildProviderContentBlocks,
  buildPromotionContentBlocks,
} from "@/lib/content/narrative-builders";
export {
  attachGameContentEngine,
  attachProviderContentEngine,
  attachPromotionContentEngine,
} from "@/lib/content/attach";
export {
  createContentImagePlaceholder,
  toContentImageAsset,
} from "@/lib/content/image-placeholder";
export {
  buildRelatedRefsFromDocument,
  mergeRelatedRefs,
} from "@/lib/content/related-engine";
export {
  generateProviderContent,
  generateGameContent,
  generateGuideContent,
  generateNewsContent,
  generatePromotionContent,
} from "@/lib/content/generator";
export type {
  GeneratedContentResult,
  ContentTemplateDocument,
  ContentTemplateType,
} from "@/types/content-template";
