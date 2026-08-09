const pages = [
  ["support", "/en/support", "/zh/support"],
  ["faq", "/en/faq", "/zh/faq"],
  ["payment", "/en/payment", "/zh/payment"],
  ["download", "/en/download", "/zh/download"],
  ["responsible-gaming", "/en/responsible-gaming", "/zh/responsible-gaming"],
  ["about", "/en/about", "/zh/about"],
  ["editorial-policy", "/en/editorial-policy", "/zh/editorial-policy"],
  ["about-our-team", "/en/about-our-team", "/zh/about-our-team"],
  ["contact", "/en/contact", "/zh/contact"],
];

function pick(html, re) {
  const m = html.match(re);
  return m ? m[1].replace(/\s+/g, " ").trim() : "";
}

(async () => {
  for (const [key, enPath, zhPath] of pages) {
    for (const [locale, path] of [
      ["en", enPath],
      ["zh", zhPath],
    ]) {
      const r = await fetch(`http://localhost:3000${path}`);
      const h = await r.text();
      const title = pick(h, /<title>([^<]*)<\/title>/i);
      const desc = pick(
        h,
        /name="description"\s+content="([^"]*)"|content="([^"]*)"\s+name="description"/i,
      );
      const canon = pick(h, /rel="canonical"\s+href="([^"]+)"/i);
      const og = pick(h, /property="og:title"\s+content="([^"]+)"/i);
      const tw = pick(h, /name="twitter:card"\s+content="([^"]+)"/i);
      const h1 = pick(h, /<h1[^>]*>([\s\S]*?)<\/h1>/i).replace(/<[^>]+>/g, "");
      const pending = (h.match(/中文待補/g) || []).length;
      const ggl = /GGLBET|GGLBET/.test(title + h1 + desc);
      const schema = {
        faq: /FAQPage/.test(h),
        breadcrumb: /BreadcrumbList/.test(h),
        org: /Organization/.test(h),
        image: /ImageObject/.test(h),
      };
      const imgs = [...h.matchAll(/\/_next\/image\?url=([^&]+)/g)].map((m) =>
        decodeURIComponent(m[1]),
      );
      const unique = [...new Set(imgs.filter((u) => u.includes("/support/") || u.includes("/home/") || u.includes("/games/")))];
      console.log(
        JSON.stringify({
          key,
          locale,
          pending,
          gglTitle: /GGLBET/i.test(title),
          gglH1: /GGLBET/i.test(h1),
          hasCanon: !!canon,
          hasOg: !!og,
          hasTw: !!tw,
          schema,
          imgCount: unique.length,
          title: title.slice(0, 70),
          h1: h1.slice(0, 60),
        }),
      );
    }
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
