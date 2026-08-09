"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { ProviderCard } from "@/components/cards/ProviderCard";
import { SectionIntro } from "@/features/home/components/SectionIntro";
import { filterProviderDirectory } from "@/features/providers/lib/filter-providers";
import { Section } from "@/components/ui/Section";
import type { Provider } from "@/types/provider";

type ProviderDirectoryResultsProps = {
  readonly providers: readonly Provider[];
};

export function ProviderDirectoryResults({
  providers,
}: ProviderDirectoryResultsProps) {
  const searchParams = useSearchParams();

  const filtered = useMemo(
    () =>
      filterProviderDirectory(providers, {
        search: searchParams.get("q") ?? undefined,
        letter: searchParams.get("letter") ?? undefined,
        category: searchParams.get("category") ?? undefined,
        featured: searchParams.get("featured") === "1",
        sort: searchParams.get("sort") ?? "name-asc",
      }),
    [providers, searchParams],
  );

  return (
    <Section
      id="all-providers"
      padding="lg"
      containerSize="wide"
      aria-labelledby="all-providers-heading"
    >
      <SectionIntro
        headingId="all-providers-heading"
        heading="All GGLBET providers"
        subheading={`${filtered.length} of ${providers.length} published studios on GGLBET`}
        body="This GGLBET grid is filterable by search, category, A–Z, featured, and sort. URL updates keep the GGLBET provider directory discoverable as studios are added."
      />
      {filtered.length > 0 ? (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((provider) => (
            <li key={provider.id}>
              <ProviderCard provider={provider} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-8 home-v2-glass rounded-card p-card text-ink-muted">
          No GGLBET providers match these filters. Clear filters to see the full
          GGLBET directory.
        </p>
      )}
    </Section>
  );
}
