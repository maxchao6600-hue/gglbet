import Link from "next/link";

import { getAuthorHref } from "@/constants/routes";
import type { ContentDocumentMeta } from "@/types/content";

type ContentDocumentMetaBarProps = {
  readonly meta: ContentDocumentMeta;
};

/**
 * Shared Author / Reviewer / dates / reading time / difficulty / fact-checked bar.
 */
export function ContentDocumentMetaBar({ meta }: ContentDocumentMetaBarProps) {
  return (
    <p className="text-sm text-ink-subtle" data-eeat="true" data-content-meta="true">
      <time dateTime={meta.publishDate}>
        Published {new Date(meta.publishDate).toLocaleDateString("en-GB")}
      </time>
      {" · "}
      <time dateTime={meta.updatedDate}>
        Updated {new Date(meta.updatedDate).toLocaleDateString("en-GB")}
      </time>
      {" · "}
      {meta.readingTimeMinutes} min read
      {meta.difficulty ? ` · ${meta.difficulty}` : ""}
      {" · "}
      <Link
        href={getAuthorHref(meta.author.slug)}
        className="text-brand hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        {meta.author.name}
      </Link>
      {meta.reviewer ? (
        <>
          {" · Reviewed by "}
          <Link
            href={getAuthorHref(meta.reviewer.slug)}
            className="text-brand hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            {meta.reviewer.name}
          </Link>
        </>
      ) : null}
      {meta.factChecked ? " · Fact checked" : null}
    </p>
  );
}
