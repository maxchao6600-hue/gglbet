/**
 * Fetch official gglbet5.com casino games into a compact CMS snapshot.
 * Source API (BetConstruct public CMS for site_id 891):
 *   GET /api/public/v1/en/casino/partners/891/platforms/0/games/pages/{page}
 * Category membership (New / Popular / Top):
 *   same endpoint with ?category={id}
 *
 * Run: node scripts/fetch-official-games.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(
  ROOT,
  "lib/cms/seed/content/games/official/gglbet5-games.json",
);
const META_OUT = path.join(
  ROOT,
  "lib/cms/seed/content/games/official/gglbet5-games-meta.json",
);

const BASE =
  "https://go-cms.vmemkhhgjigrjefb.com/api/public/v1/en/casino/partners/891/platforms/0";
const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  Accept: "application/json",
  Origin: "https://www.gglbet5.com",
  Referer: "https://www.gglbet5.com/",
  "Content-Key-Case": "camel",
};

const CATEGORY_FLAGS = {
  new: 65,
  popular: 95,
  featured: 93, // TopSlots
};

const CONCURRENCY = 12;
const MAX_RETRIES = 5;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchJson(url) {
  let lastErr;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetch(url, { headers: HEADERS });
      if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
      const body = await res.json();
      if (!body?.success) {
        throw new Error(`API fail ${url}: ${JSON.stringify(body).slice(0, 200)}`);
      }
      return body;
    } catch (err) {
      lastErr = err;
      await sleep(400 * attempt);
    }
  }
  throw lastErr;
}

function compactGame(raw) {
  return {
    id: raw.id,
    typeId: raw.typeId ?? null,
    name: raw.name,
    alias: raw.alias,
    rtp: typeof raw.rtp === "number" ? raw.rtp : null,
    badge: raw.badge ?? null,
    realPlay: Boolean(raw.realPlay),
    forFun: Boolean(raw.forFun),
    providerCode: raw.provider?.name ?? null,
    providerTitle: raw.provider?.title ?? null,
    providerIcon: raw.provider?.icon ?? null,
    icon: raw.src?.icon ?? raw.webpSrc?.icon ?? null,
    background:
      raw.src?.background ?? raw.webpSrc?.background ?? null,
  };
}

async function fetchAllPages(label, query = "") {
  const firstUrl = `${BASE}/games/pages/1${query}`;
  const first = await fetchJson(firstUrl);
  const total = first.data.total;
  const lastPage = first.data.lastPage;
  const byId = new Map();
  for (const g of first.data.data ?? []) {
    byId.set(g.id, compactGame(g));
  }
  console.log(`[${label}] total=${total} lastPage=${lastPage} page1=${byId.size}`);

  let next = 2;
  async function worker() {
    while (true) {
      const page = next++;
      if (page > lastPage) return;
      const url = `${BASE}/games/pages/${page}${query}`;
      const body = await fetchJson(url);
      const rows = body.data?.data ?? [];
      for (const g of rows) {
        if (!byId.has(g.id)) byId.set(g.id, compactGame(g));
        else {
          // keep first; merge only nullish icon/rtp if needed
          const prev = byId.get(g.id);
          if (!prev.icon && (g.src?.icon || g.webpSrc?.icon)) {
            prev.icon = g.src?.icon ?? g.webpSrc?.icon;
          }
          if (prev.rtp == null && typeof g.rtp === "number") prev.rtp = g.rtp;
        }
      }
      if (page % 25 === 0 || page === lastPage) {
        console.log(`[${label}] page ${page}/${lastPage} unique=${byId.size}`);
      }
    }
  }

  await Promise.all(
    Array.from({ length: CONCURRENCY }, () => worker()),
  );
  return { total, lastPage, games: [...byId.values()], byId };
}

async function fetchCategoryIds(label, categoryId) {
  const query = `?category=${categoryId}`;
  const first = await fetchJson(`${BASE}/games/pages/1${query}`);
  const lastPage = first.data.lastPage;
  const ids = new Set((first.data.data ?? []).map((g) => g.id));
  let next = 2;
  async function worker() {
    while (true) {
      const page = next++;
      if (page > lastPage) return;
      const body = await fetchJson(`${BASE}/games/pages/${page}${query}`);
      for (const g of body.data?.data ?? []) ids.add(g.id);
      if (page % 20 === 0 || page === lastPage) {
        console.log(`[${label}] page ${page}/${lastPage} ids=${ids.size}`);
      }
    }
  }
  await Promise.all(
    Array.from({ length: CONCURRENCY }, () => worker()),
  );
  return ids;
}

async function main() {
  console.log("Fetching full game catalog…");
  const catalog = await fetchAllPages("all");

  console.log("Fetching New / Popular / TopSlots membership…");
  const [newIds, popularIds, featuredIds] = await Promise.all([
    fetchCategoryIds("new", CATEGORY_FLAGS.new),
    fetchCategoryIds("popular", CATEGORY_FLAGS.popular),
    fetchCategoryIds("featured", CATEGORY_FLAGS.featured),
  ]);

  const games = catalog.games.map((g) => ({
    ...g,
    newGame: newIds.has(g.id),
    popular: popularIds.has(g.id),
    featured: featuredIds.has(g.id),
  }));

  const snapshot = {
    verifiedDate: new Date().toISOString().slice(0, 10),
    sourceName: "gglbet5.com",
    sourceSiteId: 891,
    sourceApi: `${BASE}/games/pages/{page}`,
    imageCdn: "https://cmsbetconstruct.com",
    categoryFlags: CATEGORY_FLAGS,
    reportedTotal: catalog.total,
    count: games.length,
    games,
  };

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(snapshot));
  fs.writeFileSync(
    META_OUT,
    JSON.stringify(
      {
        verifiedDate: snapshot.verifiedDate,
        count: snapshot.count,
        reportedTotal: snapshot.reportedTotal,
        newCount: [...newIds].length,
        popularCount: [...popularIds].length,
        featuredCount: [...featuredIds].length,
        providers: [...new Set(games.map((g) => g.providerCode).filter(Boolean))]
          .sort(),
        withRtp: games.filter((g) => g.rtp != null).length,
        withIcon: games.filter((g) => Boolean(g.icon)).length,
        withBadge: games.filter((g) => Boolean(g.badge)).length,
      },
      null,
      2,
    ),
  );

  console.log("Wrote", OUT);
  console.log("Wrote", META_OUT);
  console.log("count", games.length, "reportedTotal", catalog.total);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
