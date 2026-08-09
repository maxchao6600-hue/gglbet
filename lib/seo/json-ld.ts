import { SITE_NAME, getSiteUrl } from "@/config/site";
import { ORGANIZATION_SAME_AS } from "@/config/seo";
import { buildCanonicalUrl } from "@/lib/seo/canonical";
import type { BreadcrumbItem, JsonLd } from "@/types/seo";

export function buildOrganizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${getSiteUrl()}/#organization`,
    name: SITE_NAME,
    url: getSiteUrl(),
    logo: {
      "@type": "ImageObject",
      url: buildCanonicalUrl("/opengraph-image"),
      width: 1200,
      height: 630,
    },
    sameAs: [...ORGANIZATION_SAME_AS],
  };
}

export function buildWebSiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${getSiteUrl()}/#website`,
    name: SITE_NAME,
    url: getSiteUrl(),
    publisher: { "@id": `${getSiteUrl()}/#organization` },
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${getSiteUrl()}/games?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildBreadcrumbJsonLd(
  items: readonly BreadcrumbItem[],
): JsonLd | null {
  if (items.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: buildCanonicalUrl(item.path),
    })),
  };
}

export function buildFaqPageJsonLd(
  faqs: readonly { readonly question: string; readonly answer: string }[],
): JsonLd | null {
  if (faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildWebPageJsonLd(input: {
  readonly name: string;
  readonly description: string;
  readonly path: string;
  readonly type?: string;
  readonly dateModified?: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": input.type ?? "WebPage",
    "@id": buildCanonicalUrl(input.path),
    name: input.name,
    description: input.description,
    url: buildCanonicalUrl(input.path),
    isPartOf: { "@id": `${getSiteUrl()}/#website` },
    about: { "@id": `${getSiteUrl()}/#organization` },
    inLanguage: "en",
    ...(input.dateModified ? { dateModified: input.dateModified } : {}),
  };
}

export function buildCollectionPageJsonLd(input: {
  readonly name: string;
  readonly description: string;
  readonly path: string;
  readonly numberOfItems?: number;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": buildCanonicalUrl(input.path),
    name: input.name,
    description: input.description,
    url: buildCanonicalUrl(input.path),
    isPartOf: { "@id": `${getSiteUrl()}/#website` },
    about: { "@id": `${getSiteUrl()}/#organization` },
    inLanguage: "en",
    ...(typeof input.numberOfItems === "number"
      ? {
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: input.numberOfItems,
          },
        }
      : {}),
  };
}

export function buildHowToJsonLd(input: {
  readonly name: string;
  readonly description: string;
  readonly path: string;
  readonly steps: readonly { readonly title: string; readonly text: string }[];
}): JsonLd | null {
  if (input.steps.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: input.name,
    description: input.description,
    url: buildCanonicalUrl(input.path),
    step: input.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.text,
    })),
  };
}

export function buildSiteNavigationJsonLd(
  items: readonly { readonly name: string; readonly path: string }[],
): JsonLd | null {
  if (items.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${SITE_NAME} Site Navigation`,
    itemListElement: items.map((item, index) => ({
      "@type": "SiteNavigationElement",
      position: index + 1,
      name: item.name,
      url: buildCanonicalUrl(item.path),
    })),
  };
}

export function buildProfilePageJsonLd(input: {
  readonly name: string;
  readonly description: string;
  readonly path: string;
  readonly jobTitle: string;
  readonly sameAs?: readonly string[];
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": buildCanonicalUrl(input.path),
    name: input.name,
    description: input.description,
    url: buildCanonicalUrl(input.path),
    mainEntity: {
      "@type": "Person",
      name: input.name,
      jobTitle: input.jobTitle,
      url: buildCanonicalUrl(input.path),
      ...(input.sameAs && input.sameAs.length > 0
        ? { sameAs: [...input.sameAs] }
        : {}),
      worksFor: { "@id": `${getSiteUrl()}/#organization` },
    },
  };
}

export function buildPersonJsonLd(input: {
  readonly name: string;
  readonly path: string;
  readonly jobTitle?: string;
  readonly description?: string;
  readonly sameAs?: readonly string[];
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": buildCanonicalUrl(input.path),
    name: input.name,
    url: buildCanonicalUrl(input.path),
    ...(input.jobTitle ? { jobTitle: input.jobTitle } : {}),
    ...(input.description ? { description: input.description } : {}),
    ...(input.sameAs && input.sameAs.length > 0
      ? { sameAs: [...input.sameAs] }
      : {}),
    worksFor: { "@id": `${getSiteUrl()}/#organization` },
  };
}

export function compactJsonLd(
  items: readonly (JsonLd | null | undefined)[],
): JsonLd[] {
  return items.filter((item): item is JsonLd => Boolean(item));
}

export function serializeJsonLd(data: JsonLd | readonly JsonLd[]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
