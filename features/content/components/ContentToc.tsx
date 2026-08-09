"use client";

import { useEffect, useMemo, useState } from "react";

import { cn } from "@/utils/cn";

type ContentTocProps = {
  readonly items: readonly {
    readonly id: string;
    readonly label: string;
    readonly level: 2 | 3;
    readonly anchor?: string;
  }[];
  readonly heading?: string;
  readonly className?: string;
};

/**
 * Auto TOC with anchors, smooth scroll, and active reading position.
 */
export function ContentToc({
  items,
  heading = "Table of contents",
  className,
}: ContentTocProps) {
  const resolved = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        anchor: item.anchor ?? item.id,
      })),
    [items],
  );

  const [activeId, setActiveId] = useState<string | null>(
    resolved[0]?.anchor ?? null,
  );

  useEffect(() => {
    if (resolved.length === 0) return;

    const headings = resolved
      .map((item) => document.getElementById(item.anchor))
      .filter((node): node is HTMLElement => node !== null);

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top,
          );
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0, 1],
      },
    );

    for (const headingEl of headings) {
      observer.observe(headingEl);
    }

    return () => observer.disconnect();
  }, [resolved]);

  if (resolved.length === 0) return null;

  return (
    <nav aria-label={heading} className={cn(className)}>
      <p className="font-display text-xl font-bold text-ink">{heading}</p>
      <ol className="mt-4 space-y-2">
        {resolved.map((item) => {
          const isActive = activeId === item.anchor;
          return (
            <li
              key={item.id}
              className={item.level === 3 ? "ml-4" : undefined}
            >
              <a
                href={`#${item.anchor}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "text-sm font-medium transition-colors duration-motion-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                  isActive
                    ? "text-brand"
                    : "text-ink-muted hover:text-brand",
                )}
                onClick={(event) => {
                  const target = document.getElementById(item.anchor);
                  if (!target) return;
                  event.preventDefault();
                  target.scrollIntoView({ behavior: "smooth", block: "start" });
                  setActiveId(item.anchor);
                  history.replaceState(null, "", `#${item.anchor}`);
                }}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
