/**
 * Export every public/promotions/*.webp (non-fallback) to PNG previews for visual QA.
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const DIR = path.join(ROOT, "public", "promotions");
const OUT = path.join(ROOT, "qa-screenshots", "promo-audit");

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const files = fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".webp"))
    .sort();
  for (const f of files) {
    const dest = path.join(OUT, f.replace(/\.webp$/i, ".png"));
    await sharp(path.join(DIR, f))
      .resize(640, 360, { fit: "cover" })
      .png()
      .toFile(dest);
    console.log("preview", f);
  }
  console.log(JSON.stringify({ count: files.length, out: OUT }));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
