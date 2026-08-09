import Link from "next/link";

import { ROUTES, getAuthorHref } from "@/constants/routes";
import type { AppLocale } from "@/config/i18n";
import { getSupportUiCopy } from "@/features/support/support-ui-copy";
import { cn } from "@/utils/cn";
import type { EditorialPerson } from "@/types/eeat";

type EeatBarProps = {
  readonly author: EditorialPerson | null;
  readonly reviewer?: EditorialPerson | null;
  readonly lastUpdated: string;
  readonly factChecked: boolean;
  readonly locale?: AppLocale;
  readonly className?: string;
};

function formatDate(value: string, locale: AppLocale): string {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime())
    ? value
    : parsed.toLocaleDateString(locale === "zh" ? "zh-HK" : "en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
}

export function EeatBar({
  author,
  reviewer,
  lastUpdated,
  factChecked,
  locale = "en",
  className,
}: EeatBarProps) {
  const copy = getSupportUiCopy(locale);

  return (
    <div
      className={cn(
        "flex flex-col gap-3 home-v2-glass rounded-card p-card text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6",
        className,
      )}
    >
      {author ? (
        <p className="text-ink-muted">
          <span className="text-ink-subtle">{copy.writtenBy}</span>
          <Link
            href={getAuthorHref(author.slug)}
            className="font-semibold text-brand hover:text-primary-hover"
          >
            {author.name}
          </Link>
          <span className="text-ink-subtle"> · {author.jobTitle}</span>
        </p>
      ) : null}

      {reviewer ? (
        <p className="text-ink-muted">
          <span className="text-ink-subtle">{copy.reviewedBy}</span>
          <Link
            href={getAuthorHref(reviewer.slug)}
            className="font-semibold text-brand hover:text-primary-hover"
          >
            {reviewer.name}
          </Link>
        </p>
      ) : null}

      <p className="text-ink-muted">
        <span className="text-ink-subtle">{copy.lastUpdated}</span>
        <time dateTime={lastUpdated} className="font-semibold text-ink">
          {formatDate(lastUpdated, locale)}
        </time>
      </p>

      {factChecked ? (
        <p className="inline-flex items-center gap-2 rounded-control border border-success/40 bg-success-muted px-3 py-1 text-xs font-semibold text-success">
          <span aria-hidden="true">✓</span>
          {copy.factChecked}
        </p>
      ) : null}

      <Link
        href={ROUTES.editorialPolicy}
        className="text-xs font-medium text-ink-subtle underline underline-offset-4 hover:text-ink"
      >
        {copy.howWeWork}
      </Link>
    </div>
  );
}
