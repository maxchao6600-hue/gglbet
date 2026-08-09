"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useTransition } from "react";

import { Input } from "@/components/ui/Input";
import { IconSearch } from "@/components/icons";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/utils/cn";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const SORT_OPTIONS = [
  { value: "name-asc", label: "A–Z" },
  { value: "name-desc", label: "Z–A" },
  { value: "popular", label: "Popular" },
  { value: "newest", label: "Newest" },
  { value: "rating", label: "Top rated" },
] as const;

const CATEGORY_OPTIONS = [
  { value: "", label: "All categories" },
  { value: "slots", label: "Slots" },
  { value: "live", label: "Live Casino" },
  { value: "table", label: "Table" },
  { value: "fishing", label: "Fishing" },
  { value: "lottery", label: "Lottery" },
  { value: "instant", label: "Instant" },
] as const;

type ProviderDirectoryToolbarProps = {
  readonly categories?: readonly string[];
  readonly className?: string;
};

export function ProviderDirectoryToolbar({
  className,
}: ProviderDirectoryToolbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(searchParams.get("q") ?? "");

  const activeLetter = searchParams.get("letter") ?? "";
  const activeSort = searchParams.get("sort") ?? "name-asc";
  const activeCategory = searchParams.get("category") ?? "";
  const featuredOnly = searchParams.get("featured") === "1";

  const queryString = useMemo(() => searchParams.toString(), [searchParams]);

  function updateParams(mutate: (params: URLSearchParams) => void) {
    const params = new URLSearchParams(queryString);
    mutate(params);
    const next = params.toString();
    startTransition(() => {
      router.replace(next ? `${ROUTES.providers}?${next}` : ROUTES.providers, {
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
        className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_auto]"
        onSubmit={(event) => {
          event.preventDefault();
          updateParams((params) => {
            if (search.trim()) {
              params.set("q", search.trim());
            } else {
              params.delete("q");
            }
          });
        }}
      >
        <Input
          label="Search providers"
          name="q"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          placeholder="Search by studio name"
          leading={<IconSearch aria-hidden="true" />}
          aria-label="Search providers"
        />
        <label className="flex flex-col gap-2 text-sm font-medium text-ink">
          Sort
          <select
            className="h-control-md rounded-control border border-border bg-surface px-3 text-ink"
            value={activeSort}
            aria-label="Sort providers"
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
        <label className="flex flex-col gap-2 text-sm font-medium text-ink">
          Category
          <select
            className="h-control-md rounded-control border border-border bg-surface px-3 text-ink"
            value={activeCategory}
            aria-label="Filter by category"
            onChange={(event) => {
              updateParams((params) => {
                if (event.target.value) {
                  params.set("category", event.target.value);
                } else {
                  params.delete("category");
                }
              });
            }}
          >
            {CATEGORY_OPTIONS.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </form>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          className={cn(
            "rounded-control border px-3 py-2 text-sm font-medium",
            featuredOnly
              ? "border-border-brand bg-brand-muted text-ink"
              : "border-border text-ink-muted hover:bg-surface-muted",
          )}
          aria-pressed={featuredOnly}
          aria-label="Show featured providers only"
          onClick={() => {
            updateParams((params) => {
              if (featuredOnly) {
                params.delete("featured");
              } else {
                params.set("featured", "1");
              }
            });
          }}
        >
          Featured
        </button>
        <button
          type="button"
          className="rounded-control border border-border px-3 py-2 text-sm text-ink-muted hover:bg-surface-muted"
          aria-label="Clear provider filters"
          onClick={() => {
            setSearch("");
            startTransition(() => {
              router.replace(ROUTES.providers, { scroll: false });
            });
          }}
        >
          Clear
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-1" role="group" aria-label="A to Z filter">
        {LETTERS.map((letter) => {
          const active = activeLetter === letter;
          return (
            <button
              key={letter}
              type="button"
              className={cn(
                "h-9 w-9 rounded-control text-sm font-semibold",
                active
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface text-ink-muted hover:bg-surface-muted",
              )}
              aria-pressed={active}
              aria-label={`Filter providers starting with ${letter}`}
              onClick={() => {
                updateParams((params) => {
                  if (active) {
                    params.delete("letter");
                  } else {
                    params.set("letter", letter);
                  }
                });
              }}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </div>
  );
}
