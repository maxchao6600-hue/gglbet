import { cn } from "@/utils/cn";
import { DS } from "@/components/design-system/classes";
import type { AppLocale } from "@/config/i18n";
import { getSupportUiCopy } from "@/features/support/support-ui-copy";
import type { TrustPageBlock } from "@/types/eeat";

type GeoTldrProps = {
  readonly text: string;
  readonly label?: string;
  readonly className?: string;
};

/**
 * Answer-first summary block. Generative engines and featured snippets both
 * favour a direct answer before any supporting context.
 */
export function GeoTldr({ text, label, className }: GeoTldrProps) {
  return (
    <div
      className={cn(
        DS.glassPad,
        "border-border-brand bg-brand-muted/40",
        className,
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
        {label ?? "In short"}
      </p>
      <p className="mt-2 text-base leading-relaxed text-ink">{text}</p>
    </div>
  );
}

type GeoDefinitionProps = {
  readonly term: string;
  readonly text: string;
  readonly className?: string;
};

export function GeoDefinition({ term, text, className }: GeoDefinitionProps) {
  return (
    <dl className={cn(DS.glassPad, className)}>
      <dt className="font-display text-lg font-semibold tracking-tight text-ink">
        {term}
      </dt>
      <dd className="mt-2 text-sm leading-relaxed text-ink-muted">{text}</dd>
    </dl>
  );
}

type GeoChecklistProps = {
  readonly items: readonly string[];
  readonly title?: string;
  readonly className?: string;
};

export function GeoChecklist({ items, title, className }: GeoChecklistProps) {
  if (items.length === 0) return null;

  return (
    <div className={className}>
      {title ? (
        <p className="mb-4 text-base font-semibold text-ink">{title}</p>
      ) : null}
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={item}
            className={cn(DS.glassPad, "text-sm leading-relaxed text-ink-muted")}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

type GeoStepsProps = {
  readonly title: string;
  readonly steps: readonly { readonly title: string; readonly text: string }[];
  readonly className?: string;
};

export function GeoSteps({ title, steps, className }: GeoStepsProps) {
  if (steps.length === 0) return null;

  return (
    <div className={className}>
      <p className="mb-4 text-base font-semibold text-ink">{title}</p>
      <ol className="space-y-3">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className={cn(DS.glassPad, "flex gap-4")}
          >
            <span
              aria-hidden="true"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-muted text-sm font-semibold text-brand"
            >
              {index + 1}
            </span>
            <span className="flex flex-col gap-1">
              <span className="font-semibold text-ink">{step.title}</span>
              <span className="text-sm leading-relaxed text-ink-muted">
                {step.text}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

type GeoComparisonProps = {
  readonly headers: readonly string[];
  readonly rows: readonly (readonly string[])[];
  readonly caption?: string;
  readonly className?: string;
};

export function GeoComparison({
  headers,
  rows,
  caption,
  className,
}: GeoComparisonProps) {
  if (headers.length === 0 || rows.length === 0) return null;

  return (
    <div className={cn(DS.glass, "overflow-x-auto", className)}>
      <table className="w-full border-collapse text-left text-sm">
        {caption ? (
          <caption className="px-4 pt-4 text-left text-sm text-ink-subtle">
            {caption}
          </caption>
        ) : null}
        <thead>
          <tr className="border-b border-border">
            {headers.map((header) => (
              <th
                key={header}
                scope="col"
                className="px-4 py-3 font-semibold text-ink"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("|")} className="border-b border-border last:border-0">
              {row.map((cell, cellIndex) => (
                <td
                  key={`${cell}-${cellIndex}`}
                  className="px-4 py-3 align-top text-ink-muted"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const CALLOUT_CLASS = {
  info: "border-info/40 bg-info-muted",
  tip: "border-success/40 bg-success-muted",
  warning: "border-warning/50 bg-warning-muted",
} as const;

const CALLOUT_LABEL_CLASS = {
  info: "text-info",
  tip: "text-success",
  warning: "text-warning",
} as const;

type GeoCalloutProps = {
  readonly variant: "info" | "tip" | "warning";
  readonly title: string;
  readonly body: string;
  readonly label?: string;
  readonly className?: string;
};

export function GeoCallout({
  variant,
  title,
  body,
  label,
  className,
}: GeoCalloutProps) {
  return (
    <aside
      className={cn(
        "rounded-card border p-card",
        CALLOUT_CLASS[variant],
        className,
      )}
    >
      <p
        className={cn(
          "text-xs font-semibold uppercase tracking-[0.14em]",
          CALLOUT_LABEL_CLASS[variant],
        )}
      >
        {label ?? variant}
      </p>
      <p className="mt-2 font-semibold text-ink">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{body}</p>
    </aside>
  );
}

function GeoBlock({
  block,
  locale,
}: {
  readonly block: TrustPageBlock;
  readonly locale: AppLocale;
}) {
  const copy = getSupportUiCopy(locale);
  switch (block.type) {
    case "tldr":
      return <GeoTldr text={block.text} label={copy.inShort} />;
    case "definition":
      return <GeoDefinition term={block.term} text={block.text} />;
    case "heading":
      return (
        <h2
          id={block.anchor}
          className="scroll-mt-header pt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl"
        >
          {block.text}
        </h2>
      );
    case "paragraph":
      return (
        <p className="max-w-3xl text-base leading-relaxed text-ink-muted">
          {block.text}
        </p>
      );
    case "checklist":
      return <GeoChecklist title={block.title} items={block.items} />;
    case "steps":
      return <GeoSteps title={block.title} steps={block.steps} />;
    case "comparison":
      return (
        <GeoComparison
          headers={block.headers}
          rows={block.rows}
          caption={block.caption}
        />
      );
    case "callout":
      return (
        <GeoCallout
          variant={block.variant}
          title={block.title}
          body={block.body}
          label={
            block.variant === "info"
              ? copy.calloutInfo
              : block.variant === "tip"
                ? copy.calloutTip
                : copy.calloutWarning
          }
        />
      );
    default:
      return null;
  }
}

type GeoBlocksProps = {
  readonly blocks: readonly TrustPageBlock[];
  readonly className?: string;
  readonly locale?: AppLocale;
};

export function GeoBlocks({
  blocks,
  className,
  locale = "en",
}: GeoBlocksProps) {
  if (blocks.length === 0) return null;

  return (
    <div className={cn("flex flex-col gap-8", className)}>
      {blocks.map((block) => (
        <GeoBlock key={block.id} block={block} locale={locale} />
      ))}
    </div>
  );
}

/**
 * Anchor list built from heading blocks, for on-page navigation.
 */
export function getGeoHeadings(
  blocks: readonly TrustPageBlock[],
): readonly { readonly id: string; readonly label: string }[] {
  const headings: { readonly id: string; readonly label: string }[] = [];

  for (const block of blocks) {
    if (block.type === "heading") {
      headings.push({ id: block.anchor, label: block.text });
    }
  }

  return headings;
}
