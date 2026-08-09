"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useTransition } from "react";

import { IconSearch } from "@/components/icons";
import { Input } from "@/components/ui/Input";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/utils/cn";
import type { NewsCategory } from "@/types/news";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "updated", label: "Recently updated" },
  { value: "popular", label: "Popular" },
  { value: "title-asc", label: "Title A–Z" },
] as const;

type NewsDirectoryToolbarProps = {
  readonly categories: readonly NewsCategory[];
  readonly className?: string;
};

export function NewsDirectoryToolbar({
  categories,
  className,
}: NewsDirectoryToolbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(searchParams.get("q") ?? "");

  const activeSort = searchParams.get("sort") ?? "newest";
  const activeCategory = searchParams.get("category") ?? "";
  const featuredOnly = searchParams.get("featured") === "1";
  const breakingOnly = searchParams.get("breaking") === "1";
  const queryString = useMemo(() => searchParams.toString(), [searchParams]);

  function updateParams(mutate: (params: URLSearchParams) => void) {
    const params = new URLSearchParams(queryString);
    mutate(params);
    params.delete("page");
    const next = params.toString();
    startTransition(() => {
      router.replace(next ? `${ROUTES.news}?${next}` : ROUTES.news, {
        scroll: false,
      });
    });
  }

  return (
    <div
      className={cn(
        "home-v2-glass rounded-card p-card",
        isPending && "opacity-80",
        className,
      )}
    >
      <form
        className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)_auto]"
        onSubmit={(event) => {
          event.preventDefault();
          updateParams((params) => {
            if (search.trim()) params.set("q", search.trim());
            else params.delete("q");
          });
        }}
      >
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-ink-subtle">
            Search
          </span>
          <div className="relative">
            <IconSearch
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-subtle"
              aria-hidden
            />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search news, tags, keywords…"
              className="pl-10"
              aria-label="Search news"
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-ink-subtle">
            Category
          </span>
          <select
            className="h-11 w-full rounded-control border border-white/10 bg-[rgb(22_24_29_/_0.78)] px-3 text-sm text-ink"
            value={activeCategory}
            aria-label="Filter by category"
            onChange={(event) => {
              const value = event.target.value;
              updateParams((params) => {
                if (value) params.set("category", value);
                else params.delete("category");
              });
            }}
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-ink-subtle">
            Sort
          </span>
          <select
            className="h-11 w-full rounded-control border border-white/10 bg-[rgb(22_24_29_/_0.78)] px-3 text-sm text-ink"
            value={activeSort}
            aria-label="Sort news"
            onChange={(event) => {
              updateParams((params) => {
                params.set("sort", event.target.value);
              });
            }}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <div className="flex items-end gap-2">
          <button
            type="submit"
            className="h-11 flex-1 rounded-control bg-brand px-4 text-sm font-semibold text-brand-foreground hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            Apply
          </button>
          <button
            type="button"
            aria-pressed={featuredOnly}
            className={cn(
              "h-11 rounded-control border px-4 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
              featuredOnly
                ? "border-border-brand bg-brand/15 text-ink"
                : "border-border bg-card text-ink-muted",
            )}
            onClick={() => {
              updateParams((params) => {
                if (featuredOnly) params.delete("featured");
                else params.set("featured", "1");
              });
            }}
          >
            Featured
          </button>
          <button
            type="button"
            aria-pressed={breakingOnly}
            className={cn(
              "h-11 rounded-control border px-4 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
              breakingOnly
                ? "border-border-brand bg-accent/15 text-ink"
                : "border-border bg-card text-ink-muted",
            )}
            onClick={() => {
              updateParams((params) => {
                if (breakingOnly) params.delete("breaking");
                else params.set("breaking", "1");
              });
            }}
          >
            Breaking
          </button>
        </div>
      </form>
    </div>
  );
}
