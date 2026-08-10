/**
 * Build compact game indexes for Cloudflare Worker SSR / SSG.
 * Reads public/cms/gglbet5-games.json (never bundled into Worker JS) and writes:
 *   - public/cms/games-listing-index.json  (dense catalog for provider/detail queries)
 *   - public/cms/home-game-rails.json      (tiny homepage featured/popular/new rails)
 *   - public/cms/games-page-ssg.json       (precomputed /games 500 + featured 8)
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const GAMES_JSON = path.join(ROOT, "public", "cms", "gglbet5-games.json");
const PROVIDERS_JSON = path.join(
  ROOT,
  "lib",
  "cms",
  "seed",
  "content",
  "providers",
  "official",
  "gglbet5-providers.json",
);
const OUT_LISTING = path.join(ROOT, "public", "cms", "games-listing-index.json");
const OUT_RAILS = path.join(ROOT, "public", "cms", "home-game-rails.json");
const OUT_GAMES_PAGE = path.join(ROOT, "public", "cms", "games-page-ssg.json");

const IMAGE_CDN = "https://cmsbetconstruct.com";
const VERIFIED_DATE = "2026-08-06T00:00:00.000Z";
const CTA =
  "https://www.gglbet5.com/en/affiliates/?btag=2773567";

const TYPE_ID_CATEGORY = {
  1: "live-casino",
  2: "other",
  3: "other",
  4: "other",
  5: "other",
  6: "slots",
  7: "table",
  9: "table",
  10: "table",
  11: "other",
  12: "lottery",
  13: "lottery",
  14: "other",
  15: "fishing",
  16: "other",
  17: "other",
  18: "other",
  19: "other",
  20: "other",
  21: "other",
  22: "other",
};

function absoluteImageUrl(p) {
  if (!p) return "";
  if (p.startsWith("http://") || p.startsWith("https://")) return p;
  const normalized = p.startsWith("/") ? p : `/${p}`;
  return `${IMAGE_CDN}${normalized}`;
}

function slugifyAlias(alias, officialId) {
  const base = String(alias || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return base.length > 0 ? base : `game-${officialId}`;
}

function mapCategory(typeId) {
  if (typeId == null) return "other";
  return TYPE_ID_CATEGORY[typeId] ?? "other";
}

function buildProviderIndex(providers) {
  const map = new Map();
  for (const provider of providers) {
    map.set(provider.code, {
      code: provider.code,
      title: provider.title,
      slug: String(provider.slug || "")
        .trim()
        .toLowerCase(),
    });
  }
  return map;
}

/**
 * Dense row:
 * [officialId, slug, name, providerSlug, providerName, iconUrl, category,
 *  featured(0|1), popular(0|1), newGame(0|1), rtp|null, sortOrder]
 */
function toDenseRow(record, provider, slug, index) {
  const rtp =
    typeof record.rtp === "number" && Number.isFinite(record.rtp)
      ? record.rtp
      : null;
  return [
    record.id,
    slug,
    record.name,
    provider.slug,
    provider.title,
    absoluteImageUrl(record.icon),
    mapCategory(record.typeId),
    record.featured ? 1 : 0,
    record.popular ? 1 : 0,
    record.newGame ? 1 : 0,
    rtp,
    (index + 1) * 10,
  ];
}

function expandDense(row) {
  const [
    officialId,
    slug,
    gameName,
    providerSlug,
    providerName,
    iconUrl,
    category,
    featured,
    popular,
    newGame,
    rtp,
    sortOrder,
  ] = row;
  return {
    id: `game-gglbet5-${officialId}`,
    slug,
    gameName,
    gameCode: String(officialId),
    officialId,
    providerSlug,
    providerName,
    shortDescription: `${gameName} — ${providerName} on GGLBET.`,
    thumbnail: {
      id: `game-thumb-${officialId}`,
      url: iconUrl || "",
      alt: `${gameName} thumbnail`,
      width: 320,
      height: 320,
    },
    category,
    subCategory: category,
    tags: [],
    theme: "",
    ...(rtp != null ? { rtp } : {}),
    volatility: "unknown",
    featured: Boolean(featured),
    newGame: Boolean(newGame),
    popular: Boolean(popular),
    rating: 0,
    reviewCount: 0,
    status: "published",
    sortOrder,
    publishedAt: VERIFIED_DATE,
    updatedAt: VERIFIED_DATE,
    canonicalPath: `/game/${providerSlug}/${slug}`,
    ctaPrimaryHref: CTA,
  };
}

function sortExpanded(items, sort) {
  const next = [...items];
  switch (sort) {
    case "newest":
      return next.sort((a, b) => a.sortOrder - b.sortOrder);
    case "popular":
      return next.sort((a, b) => {
        const aScore = Number(a.popular) * 1000;
        const bScore = Number(b.popular) * 1000;
        return bScore - aScore || a.sortOrder - b.sortOrder;
      });
    case "rating":
      return next.sort((a, b) => a.sortOrder - b.sortOrder);
    case "name-asc":
    default:
      return next.sort(
        (a, b) =>
          a.sortOrder - b.sortOrder || a.gameName.localeCompare(b.gameName),
      );
  }
}

function pickRail(items, predicate, sort, limit) {
  return sortExpanded(items.filter(predicate), sort).slice(0, limit);
}

function main() {
  const snapshot = JSON.parse(fs.readFileSync(GAMES_JSON, "utf8"));
  const providersFile = JSON.parse(fs.readFileSync(PROVIDERS_JSON, "utf8"));
  const providersByCode = buildProviderIndex(providersFile.providers || []);
  const usedSlugsByProvider = new Map();
  const dense = [];
  const expanded = [];

  const records = snapshot.games || [];
  for (let index = 0; index < records.length; index++) {
    const record = records[index];
    if (!record?.providerCode) continue;
    const provider = providersByCode.get(record.providerCode);
    if (!provider) continue;

    let slug = slugifyAlias(record.alias || record.name, record.id);
    const used = usedSlugsByProvider.get(provider.slug) ?? new Set();
    if (used.has(slug)) slug = `${slug}-${record.id}`;
    used.add(slug);
    usedSlugsByProvider.set(provider.slug, used);

    const row = toDenseRow(record, provider, slug, index);
    dense.push(row);
    expanded.push(expandDense(row));
  }

  const generatedAt = new Date().toISOString();
  const rails = {
    featured: pickRail(expanded, (g) => g.featured, "rating", 4),
    popular: pickRail(expanded, (g) => g.popular, "popular", 4),
    newGame: pickRail(expanded, (g) => g.newGame, "newest", 4),
    generatedAt,
    sourceCount: dense.length,
  };

  // Exact /games page payload — built once so request/regen never parses 16k rows.
  const gamesPageSsg = {
    v: 1,
    generatedAt,
    sourceCount: dense.length,
    listing: sortExpanded(expanded, "name-asc").slice(0, 500),
    featured: pickRail(expanded, (g) => g.featured, "rating", 8),
  };

  fs.writeFileSync(
    OUT_LISTING,
    JSON.stringify({
      v: 1,
      generatedAt,
      count: dense.length,
      // Dense rows keep Worker JSON.parse + memory small.
      rows: dense,
    }),
  );
  fs.writeFileSync(OUT_RAILS, JSON.stringify(rails));
  fs.writeFileSync(OUT_GAMES_PAGE, JSON.stringify(gamesPageSsg));

  console.log(
    `[generate-games-indexes] rows=${dense.length} listing=${(fs.statSync(OUT_LISTING).size / 1024).toFixed(1)}KiB rails=${(fs.statSync(OUT_RAILS).size / 1024).toFixed(1)}KiB gamesPage=${(fs.statSync(OUT_GAMES_PAGE).size / 1024).toFixed(1)}KiB`,
  );
}

main();
