"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { NewsCard } from "@/components/cards/NewsCard";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/features/home/components/SectionIntro";
import {
  NEWS_PAGE_SIZE,
  filterNewsDirectory,
  paginateNews,
} from "@/features/news/lib/filter-news";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/utils/cn";
import type { NewsArticle } from "@/types/news";

type NewsDirectoryResultsProps = {
  readonly articles: readonly NewsArticle[];
};

export function NewsDirectoryResults({ articles }: NewsDirectoryResultsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filtered = useMemo(
    () =>
      filterNewsDirectory(articles, {
        search: searchParams.get("q") ?? undefined,
        category: searchParams.get("category") ?? undefined,
        featured: searchParams.get("featured") === "1",
        breaking: searchParams.get("breaking") === "1",
        sort: searchParams.get("sort") ?? "newest",
      }),
    [articles, searchParams],
  );

  const pageParam = Number(searchParams.get("page") ?? "1");
  const paged = paginateNews(
    filtered,
    Number.isFinite(pageParam) ? pageParam : 1,
    NEWS_PAGE_SIZE,
  );

  function goToPage(nextPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    if (nextPage <= 1) params.delete("page");
    else params.set("page", String(nextPage));
    const next = params.toString();
    router.replace(next ? `${ROUTES.news}?${next}` : ROUTES.news, {
      scroll: false,
    });
  }

  return (
    <Section
      id="all-news"
      padding="lg"
      containerSize="wide"
      aria-labelledby="all-news-heading"
    >
      <SectionIntro
        headingId="all-news-heading"
        heading="All news"
        subheading={`${paged.total} matching stories · page ${paged.page} of ${paged.totalPages}`}
        body="Search and filter GGLBET news by category. Results update in the URL so you can share or return to the same browse view."
      />

      {paged.items.length > 0 ? (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {paged.items.map((article) => (
            <li key={article.id}>
              <NewsCard article={article} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-8 home-v2-glass rounded-card p-card text-ink-muted">
          No news match these filters. Clear filters to see the full hub.
        </p>
      )}

      {paged.totalPages > 1 ? (
        <nav
          className="mt-8 flex flex-wrap items-center justify-between gap-3"
          aria-label="News pagination"
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
