import { buildLocaleSitemap, renderUrlsetXml } from "@/lib/seo/sitemap-entries";

export async function GET() {
  const entries = await buildLocaleSitemap("zh");
  const body = renderUrlsetXml(entries);

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
