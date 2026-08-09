export {
  getAuthorBySlug,
  getAuthorSlugs,
  getEeatContent,
  getTrustPageBySlug,
  getTrustPagePeople,
  getTrustPageSlugs,
  listAuthors,
  listTrustPages,
  listTrustPagesByAuthor,
} from "@/services/cms/eeat";
export {
  getContentTemplate,
  getContentTemplateById,
  getContentTemplates,
} from "@/services/cms/content-templates";
export { listFaqs } from "@/services/cms/faqs";
export {
  getGameByProviderAndSlug,
  getGameBySlug,
  getGameStaticParams,
  getGameThemes,
  getGamesPageContent,
  listGames,
  listGamesByProvider,
  listGamesBySlugs,
  listRelatedGames,
} from "@/services/cms/games";
export {
  getGuideByCategoryAndSlug,
  getGuideBySlug,
  getGuideCategoryBySlug,
  getGuideCategorySlugs,
  getGuideStaticParams,
  getGuidesPageContent,
  listGuideCategories,
  listGuides,
  listGuidesBySlugs,
  listRelatedGuides,
} from "@/services/cms/guides";
export { getHomePageContent } from "@/services/cms/home";
export {
  getNewsByCategoryAndSlug,
  getNewsBySlug,
  getNewsCategoryBySlug,
  getNewsCategorySlugs,
  getNewsPageContent,
  getNewsStaticParams,
  listNews,
  listNewsArticles,
  listNewsBySlugs,
  listNewsCategories,
  listRelatedNews,
} from "@/services/cms/news";
export {
  getPromotionBySlug,
  getPromotionStaticParams,
  getPromotionsPageContent,
  listPromotions,
  listPromotionsBySlugs,
  listRelatedPromotions,
} from "@/services/cms/promotions";
export {
  getProviderBySlug,
  getProviderSlugs,
  getProvidersPageContent,
  getRelatedProviders,
  listProviders,
} from "@/services/cms/providers";
