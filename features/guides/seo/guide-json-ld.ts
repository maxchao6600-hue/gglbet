import { SITE_NAME } from "@/config/site";
import { getGuideHref } from "@/constants/routes";
import { buildContentBlockJsonLd } from "@/lib/content/seo-from-blocks";
import { normalizeToContentBlocks } from "@/lib/content/normalize";
import { buildCanonicalUrl, toAbsoluteUrl } from "@/lib/seo/canonical";
import { compactJsonLd } from "@/lib/seo/json-ld";
import type { Guide, GuideCategory } from "@/types/guide";
import type { BreadcrumbItem, JsonLd } from "@/types/seo";

export function buildGuideItemListJsonLd(guides: readonly Guide[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${SITE_NAME} Casino Guides`,
    numberOfItems: guides.length,
    itemListElement: guides.map((guide, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: buildCanonicalUrl(guide.canonicalPath),
      name: guide.title,
    })),
  };
}

export function buildGuideImageObjectJsonLd(input: {
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

export function buildGuideArticleJsonLd(guide: Guide): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": guide.schema?.type ?? "Article",
    headline: guide.title,
    description: guide.metaDescription,
    datePublished: guide.publishDate,
    dateModified: guide.updatedDate,
    articleSection: guide.schema?.articleSection ?? guide.category,
    keywords: guide.keywords.join(", "),
    author: {
      "@type": "Person",
      name: guide.author.name,
      url: buildCanonicalUrl(`/author/${guide.author.slug}`),
    },
    ...(guide.reviewer
      ? {
          reviewer: {
            "@type": "Person",
            name: guide.reviewer.name,
          },
        }
      : {}),
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: buildCanonicalUrl("/icon"),
      },
    },
    image: toAbsoluteUrl(guide.coverImage.url || "/opengraph-image"),
    mainEntityOfPage: buildCanonicalUrl(guide.canonicalPath),
  };
}

export function buildGuideWebPageJsonLd(guide: Guide): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: guide.metaTitle,
    description: guide.metaDescription,
    url: buildCanonicalUrl(guide.canonicalPath),
    dateModified: guide.updatedDate,
    primaryImageOfPage: buildGuideImageObjectJsonLd({
      url: guide.coverImage.url || "/opengraph-image",
      alt: guide.coverImage.alt,
      width: guide.coverImage.width,
      height: guide.coverImage.height,
    }),
  };
}

export function buildGuideCategoryWebPageJsonLd(
  category: GuideCategory,
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: category.metaTitle,
    description: category.metaDescription,
    url: buildCanonicalUrl(category.canonicalPath),
  };
}

export function buildGuideDetailJsonLd(input: {
  readonly guide: Guide;
  readonly breadcrumb: readonly BreadcrumbItem[];
  readonly relatedGuides: readonly Guide[];
}): readonly JsonLd[] {
  const { guide, breadcrumb, relatedGuides } = input;

  return compactJsonLd([
    buildGuideArticleJsonLd(guide),
    buildGuideWebPageJsonLd(guide),
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
    guide.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: guide.faq.map((item) => ({
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
      name: `${guide.title} related guides`,
      itemListElement: relatedGuides.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        url: buildCanonicalUrl(getGuideHref(item.category, item.slug)),
      })),
    },
    buildGuideImageObjectJsonLd({
      url: guide.coverImage.url || "/icon",
      alt: guide.coverImage.alt,
      width: guide.coverImage.width,
      height: guide.coverImage.height,
    }),
    ...buildContentBlockJsonLd({
      blocks: normalizeToContentBlocks(guide.content),
      path: guide.canonicalPath,
      extraFaq: guide.faq,
    }),
  ]);
}
