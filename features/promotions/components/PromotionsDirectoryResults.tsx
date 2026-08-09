"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { PromotionCard } from "@/components/cards/PromotionCard";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/features/home/components/SectionIntro";
import {
  PROMOTIONS_PAGE_SIZE,
  filterPromotionsDirectory,
  paginatePromotions,
} from "@/features/promotions/lib/filter-promotions";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/utils/cn";
import type { Promotion } from "@/types/promotion";

type PromotionsDirectoryResultsProps = {
  readonly promotions: readonly Promotion[];
};

export function PromotionsDirectoryResults({
  promotions,
}: PromotionsDirectoryResultsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filtered = useMemo(
    () =>
      filterPromotionsDirectory(promotions, {
        search: searchParams.get("q") ?? undefined,
        promotionType: searchParams.get("type") ?? undefined,
        featured: searchParams.get("featured") === "1",
        sort: searchParams.get("sort") ?? "newest",
      }),
    [promotions, searchParams],
  );

  const pageParam = Number(searchParams.get("page") ?? "1");
  const paged = paginatePromotions(
    filtered,
    Number.isFinite(pageParam) ? pageParam : 1,
    PROMOTIONS_PAGE_SIZE,
  );

  function goToPage(nextPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    if (nextPage <= 1) params.delete("page");
    else params.set("page", String(nextPage));
    const next = params.toString();
    router.replace(next ? `${ROUTES.promotions}?${next}` : ROUTES.promotions, {
      scroll: false,
    });
  }

  return (
    <Section
      id="all-promotions"
      padding="lg"
      containerSize="wide"
      aria-labelledby="all-promotions-heading"
    >
      <SectionIntro
        headingId="all-promotions-heading"
        heading="All promotions"
        subheading={`${paged.total} matching offers · page ${paged.page} of ${paged.totalPages}`}
        body="Search and filter GGLBET promotions by offer type. Results update in the URL so you can share or return to the same browse view."
      />

      {paged.items.length > 0 ? (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {paged.items.map((promotion) => (
            <li key={promotion.id}>
              <PromotionCard promotion={promotion} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-8 home-v2-glass rounded-card p-card text-ink-muted">
          No promotions match these filters. Clear filters to see the full offers hub.
        </p>
      )}

      {paged.totalPages > 1 ? (
        <nav
          className="mt-8 flex flex-wrap items-center justify-between gap-3"
          aria-label="Promotions pagination"
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
