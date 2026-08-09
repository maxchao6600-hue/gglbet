import { cn } from "@/utils/cn";

type GeoTldrProps = {
  readonly text: string;
  readonly className?: string;
};

/** AI-search friendly summary block for GEO citation. */
export function GeoTldr({ text, className }: GeoTldrProps) {
  return (
    <aside
      className={cn(
        "home-v2-glass rounded-card border border-border-brand p-card",
        className,
      )}
      aria-label="Summary"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-brand">
        TL;DR
      </p>
      <p className="mt-2 text-sm leading-relaxed text-ink">{text}</p>
    </aside>
  );
}

type GeoDefinitionProps = {
  readonly term: string;
  readonly text: string;
  readonly className?: string;
};

export function GeoDefinition({ term, text, className }: GeoDefinitionProps) {
  return (
    <aside
      className={cn(
        "home-v2-glass rounded-card p-card",
        className,
      )}
      aria-label={`Definition of ${term}`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-subtle">
        Definition
      </p>
      <p className="mt-2 text-base font-semibold text-ink">{term}</p>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{text}</p>
    </aside>
  );
}

type GeoFactCheckedProps = {
  readonly updatedDate: string;
  readonly authorName: string;
  readonly authorHref?: string;
  readonly reviewerName?: string;
  readonly factChecked?: boolean;
  readonly className?: string;
};

export function GeoEeatMeta({
  updatedDate,
  authorName,
  authorHref,
  reviewerName,
  factChecked = true,
  className,
}: GeoFactCheckedProps) {
  return (
    <p
      className={cn("text-sm text-ink-subtle", className)}
      data-eeat="true"
    >
      Updated {new Date(updatedDate).toLocaleDateString("en-GB")}
      {" · "}
      {authorHref ? (
        <a
          href={authorHref}
          className="text-brand hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          {authorName}
        </a>
      ) : (
        authorName
      )}
      {reviewerName ? ` · Reviewed by ${reviewerName}` : null}
      {factChecked ? " · Fact checked" : null}
    </p>
  );
}
