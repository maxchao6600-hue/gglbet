import type { Provider, ProviderQuery } from "@/types/provider";

function sortProviders(
  items: readonly Provider[],
  sort: ProviderQuery["sort"],
): Provider[] {
  const next = [...items];

  switch (sort) {
    case "name-desc":
      return next.sort((a, b) => b.name.localeCompare(a.name));
    case "newest":
      return next.sort((a, b) => {
        const aTime = a.publishedAt ? Date.parse(a.publishedAt) : 0;
        const bTime = b.publishedAt ? Date.parse(b.publishedAt) : 0;
        return bTime - aTime;
      });
    case "popular":
      return next.sort(
        (a, b) => b.gameCount - a.gameCount || b.rating - a.rating,
      );
    case "rating":
      return next.sort(
        (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount,
      );
    case "name-asc":
    default:
      return next.sort(
        (a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name),
      );
  }
}

export function filterProviderDirectory(
  providers: readonly Provider[],
  query: {
    readonly search?: string;
    readonly letter?: string;
    readonly category?: string;
    readonly featured?: boolean;
    readonly sort?: string;
  },
): readonly Provider[] {
  let items = [...providers];

  if (query.featured) {
    items = items.filter((provider) => provider.featured);
  }

  if (query.category) {
    const category = query.category.toLowerCase();
    items = items.filter(
      (provider) =>
        provider.categoryLabels.some((label) =>
          label.toLowerCase().includes(category),
        ) ||
        provider.supportedGames.some((game) => game.includes(category)),
    );
  }

  if (query.letter) {
    const letter = query.letter.toUpperCase();
    items = items.filter((provider) =>
      provider.name.toUpperCase().startsWith(letter),
    );
  }

  if (query.search?.trim()) {
    const term = query.search.trim().toLowerCase();
    items = items.filter((provider) => {
      const haystack = [
        provider.name,
        provider.shortName,
        provider.summary,
        ...provider.categoryLabels,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(term);
    });
  }

  const sort =
    query.sort === "name-asc" ||
    query.sort === "name-desc" ||
    query.sort === "newest" ||
    query.sort === "popular" ||
    query.sort === "rating"
      ? query.sort
      : "name-asc";

  return sortProviders(items, sort);
}
