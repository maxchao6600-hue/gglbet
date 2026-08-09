"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { GuideCard } from "@/components/cards/GuideCard";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/features/home/components/SectionIntro";
import {
  GUIDES_PAGE_SIZE,
  filterGuideDirectory,
  paginateGuides,
} from "@/features/guides/lib/filter-guides";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/utils/cn";
import type { Guide } from "@/types/guide";

type GuidesDirectoryResultsProps = {
  readonly guides: readonly Guide[];
};

export function GuidesDirectoryResults({
  guides,
}: GuidesDirectoryResultsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filtered = useMemo(
    () =>
      filterGuideDirectory(guides, {
        search: searchParams.get("q") ?? undefined,
        category: searchParams.get("category") ?? undefined,
        featured: searchParams.get("featured") === "1",
        sort: searchParams.get("sort") ?? "newest",
      }),
    [guides, searchParams],
  );

  const pageParam = Number(searchParams.get("page") ?? "1");
  const paged = paginateGuides(
    filtered,
    Number.isFinite(pageParam) ? pageParam : 1,
    GUIDES_PAGE_SIZE,
  );

  function goToPage(nextPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    if (nextPage <= 1) params.delete("page");
    else params.set("page", String(nextPage));
    const next = params.toString();
    router.replace(next ? `${ROUTES.guides}?${next}` : ROUTES.guides, {
      scroll: false,
    });
  }

  return (
    <Section
      id="all-guides"
      padding="lg"
      containerSize="wide"
      aria-labelledby="all-guides-heading"
    >
      <SectionIntro
        headingId="all-guides-heading"
        heading="All guides"
        subheading={`${paged.total} matching articles · page ${paged.page} of ${paged.totalPages}`}
        body="Search and filter GGLBET guides by category. Results update in the URL so you can share or return to the same browse view."
      />

      {paged.items.length > 0 ? (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {paged.items.map((guide) => (
            <li key={guide.id}>
              <GuideCard guide={guide} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-8 home-v2-glass rounded-card p-card text-ink-muted">
          No guides match these filters. Clear filters to see the full library.
        </p>
      )}

      {paged.totalPages > 1 ? (
        <nav
          className="mt-8 flex flex-wrap items-center justify-between gap-3"
          aria-label="Guides pagination"
        >
          <button
            type="button"
            className={cn(
              "rounded-control border border-border px-4 py-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
              paged.page <= 1 && "pointer-events-none opacity-40",
            )}
            disabled={paged.page <= 1}
            onClick={() => goToPage(paged.page - 1)}
          >
            Previous
          </button>
          <p className="text-sm text-ink-muted">
            Page {paged.page} / {paged.totalPages}
          </p>
          <button
            type="button"
            className={cn(
              "rounded-control border border-border px-4 py-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
              paged.page >= paged.totalPages && "pointer-events-none opacity-40",
            )}
            disabled={paged.page >= paged.totalPages}
            onClick={() => goToPage(paged.page + 1)}
          >
            Next
          </button>
        </nav>
      ) : null}
    </Section>
  );
}
