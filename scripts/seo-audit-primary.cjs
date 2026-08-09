/**
 * Live primary-SEO audit for Global SEO Copy Audit report.
 */
const BASE = process.env.QA_BASE || "http://localhost:3000";

const PAGES = [
  ["home", "/en"],
  ["games", "/en/games"],
  ["game-detail", "/en/game/pragmatic-play/gates-of-olympus"],
  ["providers", "/en/providers"],
  ["provider-detail", "/en/provider/pragmatic-play"],
  ["promotions", "/en/promotions"],
  ["promotion-detail", "/en/promotion/daily-188-free-spins-200-1026182"],
  ["guides", "/en/guides"],
  ["guide-detail", "/en/guide/beginner/how-to-get-started-on-gglbet"],
  ["news", "/en/news"],
  ["news-detail", "/en/news/promotions/singapore-national-day-61-official-announcement"],
  ["support", "/en/support"],
  ["faq", "/en/faq"],
  ["payment", "/en/payment"],
  ["download", "/en/download"],
  ["responsible-gaming", "/en/responsible-gaming"],
  ["about", "/en/about"],
  ["editorial-policy", "/en/editorial-policy"],
  ["about-our-team", "/en/about-our-team"],
  ["contact", "/en/contact"],
  ["privacy", "/en/privacy-policy"],
  ["terms", "/en/terms"],
  ["vip", "/en/vip"],
  ["referral", "/en/referral"],
  ["news-cat", "/en/news/promotions"],
  ["guide-cat", "/en/guides/beginner"],
  ["zh-home", "/zh"],
  ["zh-providers", "/zh/providers"],
  ["zh-promotions", "/zh/promotions"],
  ["zh-news", "/zh/news"],
];

async function audit(path) {
  const res = await fetch(`${BASE}${path}`);
  const html = await res.text();
  const title = (html.match(/<title>([^<]*)<\/title>/i) || [])[1] || "";
  const desc =
    (html.match(/name="description"\s+content="([^"]*)"/i) || [])[1] || "";
  const h1 = ((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1] || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const ogTitle =
    (html.match(/property="og:title"\s+content="([^"]*)"/i) || [])[1] || "";
  const ogDesc =
    (html.match(/property="og:description"\s+content="([^"]*)"/i) || [])[1] ||
    "";
  const primary = [title, desc, h1, ogTitle, ogDesc].join("\n");
  const hasDomain = /gglbet5\.com/i.test(primary);
  const hasMirror = /\b(mirrored from|copied from|powered by|imported from)\b/i.test(
    primary,
  );
  const hasGgl = /GGLBET/i.test(primary);
  return {
    path,
    status: res.status,
    hasDomain,
    hasMirror,
    hasGgl,
    title: title.slice(0, 90),
    h1: h1.slice(0, 90),
  };
}

(async () => {
  const rows = [];
  for (const [key, path] of PAGES) {
    try {
      const r = await audit(path);
      rows.push({ key, ...r });
      const flag = r.hasDomain || r.hasMirror || !r.hasGgl ? "FAIL" : "PASS";
      console.log(
        `${flag} ${key} domain=${r.hasDomain} mirror=${r.hasMirror} ggl=${r.hasGgl} | ${r.h1}`,
      );
    } catch (e) {
      console.log(`ERR ${key} ${e.message}`);
      rows.push({ key, path, error: e.message });
    }
  }
  const fail = rows.filter((r) => r.hasDomain || r.hasMirror || r.hasGgl === false);
  console.log(`\nscanned=${rows.length} failPrimary=${fail.length}`);
  require("fs").mkdirSync("qa-screenshots/seo-audit", { recursive: true });
  require("fs").writeFileSync(
    "qa-screenshots/seo-audit/primary-surfaces.json",
    JSON.stringify({ scanned: rows.length, fail, rows }, null, 2),
  );
})();
