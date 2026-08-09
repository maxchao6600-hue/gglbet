import { getNewsStaticParams, getNewsByCategoryAndSlug } from "@/services/cms/news";
import { buildCanonicalUrl } from "@/lib/seo/canonical";

/**
 * Google News sitemap (reserved / ready).
 * Populates from published CMS news articles.
 */
export async function GET() {
  const params = await getNewsStaticParams();
  const urls: string[] = [];

  for (const item of params) {
    const article = await getNewsByCategoryAndSlug(item.category, item.slug);
    if (!article) continue;
    urls.push(`  <url>
    <loc>${buildCanonicalUrl(article.canonicalPath)}</loc>
    <news:news>
      <news:publication>
        <news:name>GGLBET</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${article.publishDate}</news:publication_date>
      <news:title>${escapeXml(article.title)}</news:title>
    </news:news>
  </url>`);
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
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
