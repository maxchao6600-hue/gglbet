import dynamic from "next/dynamic";
import Link from "next/link";

import { DS } from "@/components/design-system/classes";
import { CmsImageView } from "@/components/media/CmsImageView";
import { Button } from "@/components/ui/Button";
import { getAuthorHref } from "@/constants/routes";
import { normalizeToContentBlocks } from "@/lib/content/normalize";
import { slugifyAnchor } from "@/lib/content/toc";
import type { ContentBlock, ContentImageAsset } from "@/types/content";
import type { GuideContentBlock } from "@/types/guide";
import type { TrustPageBlock } from "@/types/eeat";
import { cn } from "@/utils/cn";

const CodeBlockView = dynamic(
  () =>
    import("@/features/content/components/CodeBlockView").then(
      (mod) => mod.CodeBlockView,
    ),
  {
    loading: () => (
      <p className="text-sm text-ink-subtle">Loading code block…</p>
    ),
  },
);

type ContentRendererProps = {
  readonly blocks: readonly (
    | ContentBlock
    | GuideContentBlock
    | TrustPageBlock
  )[];
  readonly className?: string;
};

/**
 * Unified Rich Text Renderer (Server Component).
 * Provider / Game / Guide / News / Promotion must all use this — no per-vertical forks.
 */
export function ContentRenderer({ blocks, className }: ContentRendererProps) {
  const normalized = normalizeToContentBlocks(blocks);

  return (
    <div className={cn("space-y-6", className)}>
      {normalized.map((block) => (
        <ContentBlockView key={block.id} block={block} />
      ))}
    </div>
  );
}

function ContentBlockView({ block }: { readonly block: ContentBlock }) {
  switch (block.type) {
    case "hero":
      return (
        <header className="space-y-4">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink">
            {block.heading}
          </h2>
          {block.subheading ? (
            <p className="text-lg text-ink-muted">{block.subheading}</p>
          ) : null}
          {block.body ? (
            <p className="text-base leading-relaxed text-ink-muted">
              {block.body}
            </p>
          ) : null}
          {block.image ? <ContentImageFigure image={block.image} /> : null}
        </header>
      );
    case "paragraph":
      return (
        <p className="text-base leading-relaxed text-ink-muted">{block.text}</p>
      );
    case "heading":
      return (
        <HeadingAnchor
          as="h2"
          id={block.anchor}
          text={block.text}
          className="text-2xl"
        />
      );
    case "subHeading":
      return (
        <HeadingAnchor
          as="h3"
          id={block.anchor}
          text={block.text}
          className="text-xl"
        />
      );
    case "quote":
      return (
        <blockquote className="rounded-card border-l-4 border-border-brand bg-brand/10 px-4 py-3">
          <p className="text-base leading-relaxed text-ink">{block.text}</p>
          {block.cite ? (
            <cite className="mt-2 block text-sm text-ink-subtle not-italic">
              — {block.cite}
            </cite>
          ) : null}
        </blockquote>
      );
    case "infoBox":
      return <CalloutBox variant="info" title={block.title} body={block.body} />;
    case "warningBox":
      return (
        <CalloutBox variant="warning" title={block.title} body={block.body} />
      );
    case "successBox":
      return (
        <CalloutBox variant="success" title={block.title} body={block.body} />
      );
    case "tipBox":
      return <CalloutBox variant="tip" title={block.title} body={block.body} />;
    case "checklist":
      return (
        <ListCard
          title={block.title}
          items={block.items}
          marker="check"
          ariaLabel={block.title ?? "Checklist"}
        />
      );
    case "bulletList":
      return (
        <ListCard
          title={block.title}
          items={block.items}
          marker="bullet"
          ariaLabel={block.title ?? "Bullet list"}
        />
      );
    case "numberList":
      return (
        <ListCard
          title={block.title}
          items={block.items}
          marker="number"
          ariaLabel={block.title ?? "Numbered list"}
        />
      );
    case "comparisonTable":
    case "standardTable":
      return (
        <DataTable
          caption={block.caption}
          headers={block.headers}
          rows={block.rows}
          comparison={block.type === "comparisonTable"}
        />
      );
    case "image":
      return (
        <ContentImageFigure
          image={block.image}
          caption={block.caption}
          credit={block.credit}
        />
      );
    case "imageGallery":
      return (
        <figure>
          <ul className="grid gap-4 sm:grid-cols-2">
            {block.images.map((image) => (
              <li key={image.id}>
                <ContentImageFigure image={image} />
              </li>
            ))}
          </ul>
          {block.caption ? (
            <figcaption className="mt-2 text-sm text-ink-subtle">
              {block.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    case "video":
      return (
        <div
          className="home-v2-glass rounded-card border border-dashed border-white/15 p-card"
          aria-label={`${block.title} video placeholder`}
        >
          <p className="text-sm font-semibold text-ink">{block.title}</p>
          <p className="mt-2 text-sm text-ink-muted">
            Video embed reserved for future CMS media assets
            {block.url ? ` (${block.url})` : ""}.
          </p>
        </div>
      );
    case "faq":
      return (
        <div className="space-y-3">
          {block.title ? (
            <h3 className="text-base font-semibold text-ink">{block.title}</h3>
          ) : null}
          <div className="space-y-3">
            {block.items.map((item) => (
              <details
                key={item.question}
                className="home-v2-glass rounded-card p-card"
              >
                <summary className="cursor-pointer list-none font-semibold text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      );
    case "pros":
      return (
        <ListCard
          title={block.title ?? "Pros"}
          items={block.items}
          marker="check"
          ariaLabel="Pros"
        />
      );
    case "cons":
      return (
        <ListCard
          title={block.title ?? "Cons"}
          items={block.items}
          marker="bullet"
          ariaLabel="Cons"
        />
      );
    case "timeline":
      return (
        <ol className="space-y-4 border-l border-border pl-4">
          {block.title ? (
            <li className="list-none -ml-4 mb-2">
              <h3 className="text-base font-semibold text-ink">{block.title}</h3>
            </li>
          ) : null}
          {block.items.map((item) => (
            <li key={item.id} className="relative">
              <span
                className="absolute -left-[1.35rem] top-1 size-2.5 rounded-full bg-brand"
                aria-hidden
              />
              <p className="text-sm font-semibold text-ink">
                {item.date ? `${item.date} · ` : ""}
                {item.label}
              </p>
              <p className="mt-1 text-sm text-ink-muted">{item.body}</p>
            </li>
          ))}
        </ol>
      );
    case "statistic":
      return (
        <div className="home-v2-glass rounded-card p-card">
          <p className="text-xs uppercase tracking-wide text-ink-subtle">
            {block.label}
          </p>
          <p className="mt-2 font-display text-2xl font-bold text-ink">
            {block.value}
          </p>
          {block.note ? (
            <p className="mt-2 text-sm text-ink-muted">{block.note}</p>
          ) : null}
        </div>
      );
    case "cta":
      return (
        <aside
          className="rounded-card border border-border-brand bg-brand/10 p-card"
          aria-label={block.heading}
        >
          <p className="font-display text-xl font-bold text-ink">
            {block.heading}
          </p>
          {block.body ? (
            <p className="mt-2 text-sm text-ink-muted">{block.body}</p>
          ) : null}
          <div className="mt-4 flex flex-wrap gap-3">
            <Button href={block.primary.href} variant={block.primary.variant ?? "primary"}>
              {block.primary.label}
            </Button>
            {block.secondary ? (
              <Button
                href={block.secondary.href}
                variant={block.secondary.variant ?? "outline"}
              >
                {block.secondary.label}
              </Button>
            ) : null}
          </div>
        </aside>
      );
    case "button":
      return (
        <Button href={block.href} variant={block.variant ?? "primary"}>
          {block.label}
        </Button>
      );
    case "divider":
      return <hr className="border-border" />;
    case "spacer": {
      const size =
        block.size === "sm" ? "h-4" : block.size === "lg" ? "h-12" : "h-8";
      return <div className={size} aria-hidden />;
    }
    case "author":
    case "reviewer":
      return (
        <p className="text-sm text-ink-subtle">
          {block.type === "author" ? "Author" : "Reviewer"}:{" "}
          <Link
            href={getAuthorHref(block.person.slug)}
            className="font-medium text-brand hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            {block.person.name}
          </Link>
          {block.person.role ? ` · ${block.person.role}` : ""}
        </p>
      );
    case "relatedContent":
      return (
        <nav aria-label={block.title ?? "Related content"}>
          {block.title ? (
            <p className="mb-2 text-sm font-semibold text-ink">{block.title}</p>
          ) : null}
          <p className="text-sm text-ink-muted">
            Related providers, games, guides, news, and promotions are resolved
            automatically from CMS slug refs — templates never hardcode links.
          </p>
        </nav>
      );
    case "tldr":
      return (
        <aside
          className="rounded-card border border-border-brand bg-brand/10 p-card"
          aria-label="Summary"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-brand">
            {block.label ?? "TL;DR"}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink">{block.text}</p>
        </aside>
      );
    case "summary":
      return (
        <aside
          className="home-v2-glass rounded-card p-card"
          aria-label={block.title ?? "Key takeaways"}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-subtle">
            {block.title ?? "Key takeaways"}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            {block.text}
          </p>
        </aside>
      );
    case "definition":
      return (
        <aside
          className="home-v2-glass rounded-card p-card"
          aria-label={`Definition of ${block.term}`}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-subtle">
            Definition
          </p>
          <p className="mt-2 text-base font-semibold text-ink">{block.term}</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            {block.text}
          </p>
        </aside>
      );
    case "bestPractice":
      return (
        <ListCard
          title={block.title ?? "Best practices"}
          items={block.items}
          marker="check"
          ariaLabel="Best practices"
        />
      );
    case "commonMistakes":
      return (
        <ListCard
          title={block.title ?? "Common mistakes"}
          items={block.items}
          marker="bullet"
          ariaLabel="Common mistakes"
        />
      );
    case "howTo": {
      const anchor = slugifyAnchor(block.name);
      return (
        <section aria-labelledby={anchor} id={anchor} className="scroll-mt-28">
          <h2
            id={`${anchor}-heading`}
            className="font-display text-2xl font-bold tracking-tight text-ink"
          >
            {block.name}
          </h2>
          {block.description ? (
            <p className="mt-2 text-sm text-ink-muted">{block.description}</p>
          ) : null}
          <ol className="mt-4 list-decimal space-y-3 pl-5">
            {block.steps.map((step, index) => (
              <li key={`${step.title}-${index}`} className="text-sm text-ink-muted">
                <span className="font-semibold text-ink">{step.title}. </span>
                {step.text}
              </li>
            ))}
          </ol>
        </section>
      );
    }
    case "codeBlock":
      return (
        <CodeBlockView
          code={block.code}
          language={block.language}
          caption={block.caption}
        />
      );
    case "htmlBlock":
      return (
        <aside
          className="rounded-card border border-dashed border-accent/50 bg-accent/10 p-card"
          role="note"
          aria-label="HTML block blocked"
        >
          <p className="text-sm font-semibold text-ink">
            HTML block disabled
          </p>
          <p className="mt-2 text-sm text-ink-muted">
            {block.note ??
              "Raw HTML is stored in CMS but never executed or injected into the page."}
          </p>
        </aside>
      );
    default: {
      const _exhaustive: never = block;
      return _exhaustive;
    }
  }
}

function HeadingAnchor({
  as: Tag,
  id,
  text,
  className,
}: {
  readonly as: "h2" | "h3";
  readonly id: string;
  readonly text: string;
  readonly className: string;
}) {
  return (
    <Tag
      id={id}
      className={cn(
        "scroll-mt-28 font-display font-bold tracking-tight text-ink",
        className,
      )}
    >
      <a
        href={`#${id}`}
        className="rounded-control focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        {text}
      </a>
    </Tag>
  );
}

function CalloutBox({
  variant,
  title,
  body,
}: {
  readonly variant: "info" | "tip" | "warning" | "success";
  readonly title: string;
  readonly body: string;
}) {
  const styles =
    variant === "warning"
      ? "border-accent/50 bg-accent/10"
      : variant === "tip" || variant === "success"
        ? "border-border-brand bg-brand/10"
        : "border-border bg-surface-elevated";

  return (
    <aside
      className={cn("rounded-card border px-4 py-4", styles)}
      role="note"
      aria-label={title}
    >
      <p className="text-sm font-semibold text-ink">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{body}</p>
    </aside>
  );
}

function ListCard({
  title,
  items,
  marker,
  ariaLabel,
}: {
  readonly title?: string;
  readonly items: readonly string[];
  readonly marker: "check" | "bullet" | "number";
  readonly ariaLabel: string;
}) {
  const ListTag = marker === "number" ? "ol" : "ul";

  return (
    <div
      className="home-v2-glass rounded-card p-card"
      aria-label={ariaLabel}
    >
      {title ? (
        <h3 className="text-base font-semibold text-ink">{title}</h3>
      ) : null}
      <ListTag
        className={cn(
          "mt-3 space-y-2",
          marker === "number" ? "list-decimal pl-5" : undefined,
        )}
      >
        {items.map((item, index) => (
          <li
            key={`${item}-${index}`}
            className={cn(
              "text-sm text-ink-muted",
              marker === "check" || marker === "bullet"
                ? "flex gap-3"
                : undefined,
            )}
          >
            {marker === "check" ? (
              <span
                className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-control border border-border-brand text-[11px] font-bold text-brand"
                aria-hidden
              >
                ✓
              </span>
            ) : null}
            {marker === "bullet" ? (
              <span
                className="mt-2 size-1.5 shrink-0 rounded-full bg-brand"
                aria-hidden
              />
            ) : null}
            <span>{item}</span>
          </li>
        ))}
      </ListTag>
    </div>
  );
}

function DataTable({
  caption,
  headers,
  rows,
  comparison,
}: {
  readonly caption?: string;
  readonly headers: readonly string[];
  readonly rows: readonly (readonly string[])[];
  readonly comparison: boolean;
}) {
  return (
    <div className="overflow-x-auto">
      {caption ? (
        <p className="mb-2 text-sm font-medium text-ink">{caption}</p>
      ) : null}
      <table className="min-w-full border-collapse overflow-hidden rounded-card border border-border text-left text-sm">
        <caption className="sr-only">
          {caption ?? (comparison ? "Comparison table" : "Data table")}
        </caption>
        <thead className="bg-surface-elevated">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                scope="col"
                className="border-b border-border px-3 py-3 font-semibold text-ink"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td
                  key={`${rowIndex}-${cellIndex}`}
                  className="border-b border-border px-3 py-3 text-ink-muted"
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

function ContentImageFigure({
  image,
  caption,
  credit,
}: {
  readonly image: ContentImageAsset;
  readonly caption?: string;
  readonly credit?: string;
}) {
  const captionText = caption ?? image.caption;
  const creditText = credit ?? image.credit;

  return (
    <figure>
      <CmsImageView
        image={image}
        aspect="wide"
        priority={image.priority === true}
      />
      {captionText || creditText ? (
        <figcaption className="mt-2 text-sm text-ink-subtle">
          {captionText}
          {creditText ? (
            <span className="block text-xs">Credit: {creditText}</span>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
