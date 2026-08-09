import { SITE_NAME } from "@/config/site";
import { getPromotionHref } from "@/constants/routes";
import { buildContentBlockJsonLd } from "@/lib/content/seo-from-blocks";
import { buildCanonicalUrl, toAbsoluteUrl } from "@/lib/seo/canonical";
import { compactJsonLd } from "@/lib/seo/json-ld";
import type { Promotion } from "@/types/promotion";
import type { BreadcrumbItem, JsonLd } from "@/types/seo";

export function buildPromotionItemListJsonLd(
  promotions: readonly Promotion[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${SITE_NAME} Promotions`,
    numberOfItems: promotions.length,
    itemListElement: promotions.map((promotion, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: buildCanonicalUrl(promotion.canonicalPath),
      name: promotion.title,
    })),
  };
}

export function buildPromotionImageObjectJsonLd(input: {
  readonly url: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: toAbsoluteUrl(input.url || "/opengraph-image"),
    description: input.alt,
    width: input.width,
    height: input.height,
  };
}

export function buildPromotionOfferJsonLd(promotion: Promotion): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": promotion.schema?.type ?? "Offer",
    name: promotion.title,
    description: promotion.metaDescription,
    category: promotion.promotionType,
    availability:
      promotion.schema?.availability ?? "https://schema.org/InStock",
    priceCurrency: promotion.currency,
    validFrom: promotion.startDate ?? undefined,
    validThrough: promotion.endDate ?? undefined,
    url: buildCanonicalUrl(promotion.canonicalPath),
    image: toAbsoluteUrl(promotion.coverImage.url || "/opengraph-image"),
    seller: {
      "@type": "Organization",
      name: SITE_NAME,
      url: buildCanonicalUrl("/"),
    },
  };
}

export function buildPromotionWebPageJsonLd(promotion: Promotion): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: promotion.metaTitle,
    description: promotion.metaDescription,
    url: buildCanonicalUrl(promotion.canonicalPath),
    dateModified: promotion.updatedAt,
    primaryImageOfPage: buildPromotionImageObjectJsonLd({
      url: promotion.coverImage.url || "/opengraph-image",
      alt: promotion.coverImage.alt,
      width: promotion.coverImage.width,
      height: promotion.coverImage.height,
    }),
  };
}

export function buildPromotionDetailJsonLd(input: {
  readonly promotion: Promotion;
  readonly breadcrumb: readonly BreadcrumbItem[];
  readonly relatedPromotions: readonly Promotion[];
}): readonly JsonLd[] {
  const { promotion, breadcrumb, relatedPromotions } = input;

  return compactJsonLd([
    buildPromotionOfferJsonLd(promotion),
    buildPromotionWebPageJsonLd(promotion),
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: buildCanonicalUrl("/"),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumb.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: buildCanonicalUrl(item.path),
      })),
    },
    promotion.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: promotion.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null,
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${promotion.title} related promotions`,
      itemListElement: relatedPromotions.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        url: buildCanonicalUrl(getPromotionHref(item.slug)),
      })),
    },
    buildPromotionImageObjectJsonLd({
      url: promotion.bannerImage.url || "/icon",
      alt: promotion.bannerImage.alt,
      width: promotion.bannerImage.width,
      height: promotion.bannerImage.height,
    }),
    ...buildContentBlockJsonLd({
      blocks: promotion.content,
      path: promotion.canonicalPath,
      extraFaq: promotion.faq,
    }),
  ]);
}
