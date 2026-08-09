import { getAuthorHref } from "@/constants/routes";
import {
  buildBreadcrumbJsonLd,
  buildCollectionPageJsonLd,
  buildFaqPageJsonLd,
  buildHowToJsonLd,
  buildOrganizationJsonLd,
  buildPersonJsonLd,
  buildProfilePageJsonLd,
  buildSiteNavigationJsonLd,
  buildWebPageJsonLd,
  compactJsonLd,
} from "@/lib/seo/json-ld";
import { buildCanonicalUrl } from "@/lib/seo/canonical";
import type { EditorialPerson, TrustPageDocument } from "@/types/eeat";
import type { BreadcrumbItem, JsonLd } from "@/types/seo";

function findFirstSteps(
  page: TrustPageDocument,
): readonly { readonly title: string; readonly text: string }[] {
  for (const block of page.blocks) {
    if (block.type === "steps") {
      return block.steps;
    }
  }

  return [];
}

function buildImageObjects(
  page: TrustPageDocument,
  heroImageSrc?: string,
): JsonLd[] {
  const images: Array<{ url: string; name: string }> = [];
  if (heroImageSrc || page.heroImageSrc) {
    images.push({
      url: heroImageSrc || page.heroImageSrc || "",
      name: `${page.title} hero`,
    });
  }
  for (const section of page.visualSections ?? []) {
    images.push({ url: section.mediaSrc, name: section.heading });
  }
  if (page.finalCta?.mediaSrc) {
    images.push({
      url: page.finalCta.mediaSrc,
      name: page.finalCta.heading,
    });
  }

  return images
    .filter((item) => item.url.length > 0)
    .map((item) => ({
      "@context": "https://schema.org",
      "@type": "ImageObject",
      contentUrl: buildCanonicalUrl(item.url),
      url: buildCanonicalUrl(item.url),
      name: item.name,
      caption: item.name,
    }));
}

export function buildTrustPageJsonLd(input: {
  readonly page: TrustPageDocument;
  readonly breadcrumb: readonly BreadcrumbItem[];
  readonly author: EditorialPerson | null;
  readonly reviewer: EditorialPerson | null;
  readonly heroImageSrc?: string;
}): readonly JsonLd[] {
  const { page, breadcrumb, author, reviewer, heroImageSrc } = input;
  const steps = findFirstSteps(page);

  const pageNode =
    page.schemaType === "CollectionPage"
      ? buildCollectionPageJsonLd({
          name: page.title,
          description: page.metaDescription,
          path: page.canonicalPath,
          numberOfItems: page.relatedPaths.length,
        })
      : buildWebPageJsonLd({
          name: page.title,
          description: page.metaDescription,
          path: page.canonicalPath,
          type: page.schemaType ?? "WebPage",
          dateModified: page.lastUpdated,
        });

  return compactJsonLd([
    buildOrganizationJsonLd(),
    pageNode,
    buildBreadcrumbJsonLd(breadcrumb),
    buildFaqPageJsonLd(page.faq),
    ...buildImageObjects(page, heroImageSrc),
    steps.length > 0
      ? buildHowToJsonLd({
          name: page.heroTitle,
          description: page.heroDescription,
          path: page.canonicalPath,
          steps,
        })
      : null,
    author
      ? buildPersonJsonLd({
          name: author.name,
          path: author.canonicalPath,
          jobTitle: author.jobTitle,
          description: author.bio,
          sameAs: author.sameAs,
        })
      : null,
    reviewer && reviewer.slug !== author?.slug
      ? buildPersonJsonLd({
          name: reviewer.name,
          path: reviewer.canonicalPath,
          jobTitle: reviewer.jobTitle,
          description: reviewer.bio,
          sameAs: reviewer.sameAs,
        })
      : null,
    buildSiteNavigationJsonLd(
      page.relatedPaths.map((item) => ({
        name: item.label,
        path: item.href,
      })),
    ),
  ]);
}

export function buildAuthorProfileJsonLd(input: {
  readonly author: EditorialPerson;
  readonly breadcrumb: readonly BreadcrumbItem[];
  readonly pages: readonly TrustPageDocument[];
}): readonly JsonLd[] {
  const { author, breadcrumb, pages } = input;

  return compactJsonLd([
    buildProfilePageJsonLd({
      name: author.name,
      description: author.bio,
      path: author.canonicalPath,
      jobTitle: author.jobTitle,
      sameAs: author.sameAs,
    }),
    buildBreadcrumbJsonLd(breadcrumb),
    pages.length > 0
      ? buildSiteNavigationJsonLd(
          pages.map((page) => ({
            name: page.title,
            path: page.canonicalPath,
          })),
        )
      : null,
  ]);
}

export function buildAuthorIndexJsonLd(input: {
  readonly authors: readonly EditorialPerson[];
  readonly path: string;
  readonly name: string;
  readonly description: string;
}): readonly JsonLd[] {
  return compactJsonLd([
    buildCollectionPageJsonLd({
      name: input.name,
      description: input.description,
      path: input.path,
      numberOfItems: input.authors.length,
    }),
    buildSiteNavigationJsonLd(
      input.authors.map((author) => ({
        name: author.name,
        path: getAuthorHref(author.slug),
      })),
    ),
  ]);
}
