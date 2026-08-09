/**
 * Image sitemap reserved endpoint.
 * Ready for CMS media inventory; currently emits cover placeholders for
 * published providers, games, guides, news, and promotions.
 */
import { buildCanonicalUrl, toAbsoluteUrl } from "@/lib/seo/canonical";
import { getGameStaticParams, getGameByProviderAndSlug } from "@/services/cms/games";
import { getGuideStaticParams, getGuideByCategoryAndSlug } from "@/services/cms/guides";
import { getNewsStaticParams, getNewsByCategoryAndSlug } from "@/services/cms/news";
import { getPromotionStaticParams, getPromotionBySlug } from "@/services/cms/promotions";
import { getProviderSlugs, getProviderBySlug } from "@/services/cms/providers";

type ImageEntry = {
  readonly loc: string;
  readonly imageLoc: string;
  readonly title: string;
};

export async function GET() {
  const entries: ImageEntry[] = [];

  const providerSlugs = await getProviderSlugs();
  for (const slug of providerSlugs) {
    const provider = await getProviderBySlug(slug);
    if (!provider) continue;
    entries.push({
      loc: buildCanonicalUrl(provider.canonicalPath),
      imageLoc: toAbsoluteUrl(
        provider.heroImage.url || "/opengraph-image",
      ),
      title: provider.name,
    });
  }

  const games = await getGameStaticParams();
  for (const item of games) {
    const game = await getGameByProviderAndSlug(item.provider, item.slug);
    if (!game) continue;
    entries.push({
      loc: buildCanonicalUrl(game.canonicalPath),
      imageLoc: toAbsoluteUrl(game.coverImage.url || "/opengraph-image"),
      title: game.gameName,
    });
  }

  const guides = await getGuideStaticParams();
  for (const item of guides) {
    const guide = await getGuideByCategoryAndSlug(item.category, item.slug);
    if (!guide) continue;
    entries.push({
      loc: buildCanonicalUrl(guide.canonicalPath),
      imageLoc: toAbsoluteUrl(guide.coverImage.url || "/opengraph-image"),
      title: guide.title,
    });
  }

  const news = await getNewsStaticParams();
  for (const item of news) {
    const article = await getNewsByCategoryAndSlug(item.category, item.slug);
    if (!article) continue;
    entries.push({
      loc: buildCanonicalUrl(article.canonicalPath),
      imageLoc: toAbsoluteUrl(article.coverImage.url || "/opengraph-image"),
      title: article.title,
    });
  }

  const promotions = await getPromotionStaticParams();
  for (const item of promotions) {
    const promotion = await getPromotionBySlug(item.slug);
    if (!promotion) continue;
    entries.push({
      loc: buildCanonicalUrl(promotion.canonicalPath),
      imageLoc: toAbsoluteUrl(
        promotion.coverImage.url || "/opengraph-image",
      ),
      title: promotion.title,
    });
  }

  const urls = entries.map(
    (entry) => `  <url>
    <loc>${entry.loc}</loc>
    <image:image>
      <image:loc>${entry.imageLoc}</image:loc>
      <image:title>${escapeXml(entry.title)}</image:title>
    </image:image>
  </url>`,
  );

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
