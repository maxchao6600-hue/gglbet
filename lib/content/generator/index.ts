export {
  generateProviderContent,
  generateGameContent,
  generateGuideContent,
  generateNewsContent,
  generatePromotionContent,
  generateContentBlocksForProvider,
  generateContentBlocksForGame,
  generateContentBlocksForPromotion,
} from "@/lib/content/generator/generate";
export type {
  ProviderGeneratorInput,
  GameGeneratorInput,
  GuideGeneratorInput,
  NewsGeneratorInput,
  PromotionGeneratorInput,
} from "@/lib/content/generator/generate";
export {
  applyTemplatePattern,
  sectionAnchor,
  preferCmsProse,
  joinNaturalList,
} from "@/lib/content/generator/template-utils";
