/**
 * Tiny predicate kept separate from featured-seo prose so listing/catalog
 * paths do not pull long-form SEO templates into the Worker bundle.
 */
export function isFeaturedSeoGame(record: {
  readonly featured?: boolean;
  readonly popular?: boolean;
  readonly newGame?: boolean;
}): boolean {
  return Boolean(record.featured || record.popular || record.newGame);
}
