const fs = require("fs");
const path = require("path");

const snap = JSON.parse(
  fs.readFileSync(
    "lib/cms/seed/content/promotions/official/gglbet5-promotions.json",
    "utf8",
  ),
);

function slugify(v) {
  return v
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);
}

function uniqueSlug(promo, used) {
  const fromMeta = promo.metaUrl?.trim();
  const base = slugify(fromMeta && fromMeta.length ? fromMeta : promo.title);
  let slug = `${base}-${promo.id}`;
  if (used.has(slug)) slug = `${slug}-x`;
  used.add(slug);
  return slug;
}

const used = new Set();
const slugs = snap.promotions.map((p) => uniqueSlug(p, used));
const missing = slugs.filter(
  (s) => !fs.existsSync(path.join("public/promotions", `${s}.webp`)),
);
const dedicated = fs
  .readdirSync("public/promotions")
  .filter((f) => f.endsWith(".webp")).length;
const fallbacks = fs
  .readdirSync("public/promotions/fallback")
  .filter((f) => f.endsWith(".webp")).length;

console.log(
  JSON.stringify(
    {
      totalPromotions: slugs.length,
      dedicatedWebpOnDisk: dedicated,
      fallbackWebpOnDisk: fallbacks,
      missingDedicated: missing.length,
      missingSlugs: missing,
    },
    null,
    2,
  ),
);
