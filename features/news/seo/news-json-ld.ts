import { SITE_NAME } from "@/config/site";
import { getNewsHref } from "@/constants/routes";
import { normalizeToContentBlocks } from "@/lib/content/normalize";
import { buildContentBlockJsonLd } from "@/lib/content/seo-from-blocks";
import { buildCanonicalUrl, toAbsoluteUrl } from "@/lib/seo/canonical";
import { compactJsonLd } from "@/lib/seo/json-ld";
import type { NewsArticle, NewsCategory } from "@/types/news";
import type { BreadcrumbItem, JsonLd } from "@/types/seo";

export function buildNewsItemListJsonLd(
  articles: readonly {
    readonly title: string;
    readonly canonicalPath: string;
  }[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${SITE_NAME} News`,
    numberOfItems: articles.length,
    itemListElement: articles.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: buildCanonicalUrl(article.canonicalPath),
      name: article.title,
    })),
  };
}

export function buildNewsImageObjectJsonLd(input: {
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

export function buildNewsArticleJsonLd(article: NewsArticle): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": article.schema?.type ?? "NewsArticle",
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.publishDate,
    dateModified: article.updatedDate,
    articleSection: article.schema?.articleSection ?? article.category,
    keywords: article.keywords.join(", "),
    author: {
      "@type": "Person",
      name: article.author.name,
      url: buildCanonicalUrl(`/author/${article.author.slug}`),
    },
    ...(article.reviewer
      ? {
          reviewer: {
            "@type": "Person",
            name: article.reviewer.name,
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
    image: toAbsoluteUrl(article.coverImage.url || "/opengraph-image"),
    mainEntityOfPage: buildCanonicalUrl(article.canonicalPath),
  };
}

export function buildNewsWebPageJsonLd(article: NewsArticle): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: article.metaTitle,
    description: article.metaDescription,
    url: buildCanonicalUrl(article.canonicalPath),
    dateModified: article.updatedDate,
    primaryImageOfPage: buildNewsImageObjectJsonLd({
      url: article.coverImage.url || "/opengraph-image",
      alt: article.coverImage.alt,
      width: article.coverImage.width,
      height: article.coverImage.height,
    }),
  };
}

export function buildNewsCategoryWebPageJsonLd(category: NewsCategory): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: category.metaTitle,
    description: category.metaDescription,
    url: buildCanonicalUrl(category.canonicalPath),
  };
}

export function buildNewsDetailJsonLd(input: {
  readonly article: NewsArticle;
  readonly breadcrumb: readonly BreadcrumbItem[];
  readonly relatedNews: readonly NewsArticle[];
}): readonly JsonLd[] {
  const { article, breadcrumb, relatedNews } = input;

  return compactJsonLd([
    buildNewsArticleJsonLd(article),
    buildNewsWebPageJsonLd(article),
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
    article.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: article.faq.map((item) => ({
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
      name: `${article.title} related news`,
      itemListElement: relatedNews.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        url: buildCanonicalUrl(getNewsHref(item.category, item.slug)),
      })),
    },
    buildNewsImageObjectJsonLd({
      url: article.coverImage.url || "/icon",
      alt: article.coverImage.alt,
      width: article.coverImage.width,
      height: article.coverImage.height,
    }),
    ...buildContentBlockJsonLd({
      blocks: normalizeToContentBlocks(article.content),
      path: article.canonicalPath,
      extraFaq: article.faq,
    }),
  ]);
}
