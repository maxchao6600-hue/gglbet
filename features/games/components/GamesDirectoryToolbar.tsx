"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useTransition } from "react";

import { IconSearch } from "@/components/icons";
import { Input } from "@/components/ui/Input";
import { ROUTES } from "@/constants/routes";
import type { GamesUiCopy } from "@/features/games/games-ui-copy";
import { cn } from "@/utils/cn";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

type GamesDirectoryToolbarProps = {
  readonly providers: readonly {
    readonly id: string;
    readonly slug: string;
    readonly name: string;
  }[];
  readonly themes: readonly string[];
  readonly copy: GamesUiCopy;
  readonly className?: string;
};

export function GamesDirectoryToolbar({
  providers,
  themes,
  copy,
  className,
}: GamesDirectoryToolbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(searchParams.get("q") ?? "");

  const activeLetter = searchParams.get("letter") ?? "";
  const activeSort = searchParams.get("sort") ?? "name-asc";
  const activeCategory = searchParams.get("category") ?? "";
  const activeTheme = searchParams.get("theme") ?? "";
  const activeProvider = searchParams.get("provider") ?? "";
  const activeCollection = searchParams.get("collection") ?? "";

  const queryString = useMemo(() => searchParams.toString(), [searchParams]);

  function updateParams(mutate: (params: URLSearchParams) => void) {
    const params = new URLSearchParams(queryString);
    mutate(params);
    params.delete("page");
    // Migrate legacy featured=1 into collection=featured
    if (params.get("featured") === "1" && !params.get("collection")) {
      params.set("collection", "featured");
    }
    params.delete("featured");
    const next = params.toString();
    startTransition(() => {
      router.replace(next ? `${ROUTES.games}?${next}` : ROUTES.games, {
        scroll: false,
      });
    });
  }

  const collections = [
    { value: "", label: copy.collectionAll },
    { value: "featured", label: copy.collectionFeatured },
    { value: "popular", label: copy.collectionPopular },
    { value: "new", label: copy.collectionNew },
  ] as const;

  return (
    <div
      className={cn(
        "home-v2-glass games-dir-toolbar rounded-card p-card",
        isPending && "opacity-80",
        className,
      )}
    >
      <div className="mb-4" role="tablist" aria-label={copy.categoryLabel}>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-subtle">
          {copy.categoryLabel}
        </p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {copy.categoryTabs.map((tab) => {
            const active = activeCategory === tab.value;
            return (
              <button
                key={tab.value || "all"}
                type="button"
                role="tab"
                aria-selected={active}
                className={cn(
                  "games-dir-tab rounded-control border px-3 py-2 text-xs font-semibold sm:text-sm",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                  active
                    ? "border-border-brand bg-brand/20 text-ink shadow-[0_0_20px_rgb(236_0_140_/_0.25)]"
                    : "border-border bg-card/60 text-ink-muted hover:border-border-brand hover:text-ink",
                )}
                onClick={() => {
                  updateParams((params) => {
                    if (tab.value) params.set("category", tab.value);
                    else params.delete("category");
                  });
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-4" role="group" aria-label={copy.collectionLabel}>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-subtle">
          {copy.collectionLabel}
        </p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {collections.map((item) => {
            const active = activeCollection === item.value;
            return (
              <button
                key={item.value || "all-collections"}
                type="button"
                aria-pressed={active}
                className={cn(
                  "rounded-control border px-3 py-2 text-xs font-semibold sm:text-sm",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                  active
                    ? "border-border-brand bg-brand text-brand-foreground"
                    : "border-border bg-card/60 text-ink-muted hover:border-border-brand hover:text-ink",
                )}
                onClick={() => {
                  updateParams((params) => {
                    if (item.value) params.set("collection", item.value);
                    else params.delete("collection");
                  });
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

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
            {copy.searchLabel}
          </span>
          <div className="relative">
            <IconSearch
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-brand"
              aria-hidden
            />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={copy.searchPlaceholder}
              className="border-border/80 bg-card/80 pl-10 focus-visible:border-border-brand focus-visible:ring-brand/40"
              aria-label={copy.searchLabel}
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-ink-subtle">
            {copy.providerLabel}
          </span>
          <select
            className="h-11 w-full rounded-control border border-white/10 bg-[rgb(22_24_29_/_0.78)] px-3 text-sm text-ink"
            value={activeProvider}
            aria-label={copy.providerLabel}
            onChange={(event) => {
              const value = event.target.value;
              updateParams((params) => {
                if (value) params.set("provider", value);
                else params.delete("provider");
              });
            }}
          >
            <option value="">{copy.allProviders}</option>
            {providers.map((provider) => (
              <option key={provider.id} value={provider.slug}>
                {provider.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-ink-subtle">
            {copy.sortLabel}
          </span>
          <select
            className="h-11 w-full rounded-control border border-white/10 bg-[rgb(22_24_29_/_0.78)] px-3 text-sm text-ink"
            value={activeSort}
            aria-label={copy.sortLabel}
            onChange={(event) => {
              updateParams((params) => {
                params.set("sort", event.target.value);
              });
            }}
          >
            {copy.sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <div className="flex items-end">
          <button
            type="submit"
            className="h-11 w-full rounded-control bg-brand px-4 text-sm font-semibold text-brand-foreground shadow-[0_0_24px_rgb(236_0_140_/_0.35)] hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            {copy.apply}
          </button>
        </div>
      </form>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-ink-subtle">
            {copy.themeLabel}
          </span>
          <select
            className="h-11 w-full rounded-control border border-white/10 bg-[rgb(22_24_29_/_0.78)] px-3 text-sm text-ink"
            value={activeTheme}
            aria-label={copy.themeLabel}
            onChange={(event) => {
              const value = event.target.value;
              updateParams((params) => {
                if (value) params.set("theme", value);
                else params.delete("theme");
              });
            }}
          >
            <option value="">{copy.allThemes}</option>
            {themes.map((theme, index) => (
              <option key={`${theme}-${index}`} value={theme}>
                {theme}
              </option>
            ))}
          </select>
        </label>

        <div className="block" role="group" aria-label={copy.azLabel}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-subtle">
            {copy.azLabel}
          </p>
          <div className="flex flex-wrap gap-1">
            <button
              type="button"
              className={cn(
                "rounded-control border px-2 py-1 text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                !activeLetter
                  ? "border-border-brand bg-brand/15 text-ink"
                  : "border-border text-ink-muted",
              )}
              onClick={() => {
                updateParams((params) => {
                  params.delete("letter");
                });
              }}
            >
              {copy.azAll}
            </button>
            {LETTERS.map((letter) => (
              <button
                key={letter}
                type="button"
                className={cn(
                  "rounded-control border px-2 py-1 text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                  activeLetter === letter
                    ? "border-border-brand bg-brand/15 text-ink"
                    : "border-border text-ink-muted",
                )}
                onClick={() => {
                  updateParams((params) => {
                    params.set("letter", letter);
                  });
                }}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
