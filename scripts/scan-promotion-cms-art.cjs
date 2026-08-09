const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

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
const rows = snap.promotions.map((p) => {
  const slug = uniqueSlug(p, used);
    const artPath = path.join("public", "promotions", "kv3", `${slug}.webp`);
  const exists = fs.existsSync(artPath);
  let size = 0;
  let mtime = "";
  let hash = "";
  if (exists) {
    const buf = fs.readFileSync(artPath);
    const st = fs.statSync(artPath);
    size = st.size;
    mtime = st.mtime.toISOString();
    hash = crypto.createHash("md5").update(buf).digest("hex").slice(0, 12);
  }
  return {
    title: p.title,
    slug,
    coverImage: `/promotions/kv3/${slug}.webp`,
    bannerImage: `/promotions/kv3/${slug}.webp`,
    heroImage: `/promotions/kv3/${slug}.webp`,
    artworkPath: artPath.replace(/\\/g, "/"),
    exists,
    size,
    mtime,
    hash,
  };
});

fs.writeFileSync(
  "qa-screenshots/promotion-artwork-cms-scan.json",
  JSON.stringify(rows, null, 2),
);
console.log(JSON.stringify({ count: rows.length, missing: rows.filter((r) => !r.exists).length }, null, 2));
console.log(rows.map((r) => `${r.exists ? "OK" : "MISS"} ${r.size} ${r.title}`).join("\n"));
