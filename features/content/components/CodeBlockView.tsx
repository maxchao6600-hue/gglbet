type CodeBlockViewProps = {
  readonly code: string;
  readonly language?: string;
  readonly caption?: string;
};

/** Dynamically loaded code block view (reserved / code-split). */
export function CodeBlockView({
  code,
  language,
  caption,
}: CodeBlockViewProps) {
  return (
    <figure>
      <pre className="overflow-x-auto rounded-card border border-border bg-surface-elevated p-card text-sm text-ink-muted">
        <code>{code}</code>
      </pre>
      {caption || language ? (
        <figcaption className="mt-2 text-sm text-ink-subtle">
          {caption}
          {language ? `${caption ? " · " : ""}${language}` : ""}
        </figcaption>
      ) : null}
    </figure>
  );
}
