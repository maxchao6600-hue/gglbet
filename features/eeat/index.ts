export { AuthorProfilePage } from "@/features/eeat/components/AuthorProfilePage";
export type { AuthorProfilePageProps } from "@/features/eeat/components/AuthorProfilePage";
export { EeatBar } from "@/features/eeat/components/EeatBar";
export {
  GeoBlocks,
  GeoCallout,
  GeoChecklist,
  GeoComparison,
  GeoDefinition,
  GeoSteps,
  GeoTldr,
  getGeoHeadings,
} from "@/features/eeat/components/GeoBlocks";
export { TrustPageView } from "@/features/eeat/components/TrustPageView";
export type { TrustPageViewProps } from "@/features/eeat/components/TrustPageView";
export {
  createAuthorMetadata,
  createTrustPageMetadata,
  loadAuthorProfile,
  loadTrustPage,
} from "@/features/eeat/lib/load-trust-page";
export {
  buildAuthorIndexJsonLd,
  buildAuthorProfileJsonLd,
  buildTrustPageJsonLd,
} from "@/features/eeat/seo/eeat-json-ld";
