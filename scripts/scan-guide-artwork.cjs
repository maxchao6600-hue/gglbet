/**
 * Scan all guide seeds for artwork coverage (not featured-only).
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// Slugs from lib/cms/seed/guides.ts — keep in sync with createGuide calls
const GUIDE_META = [
  { slug: "how-to-get-started-on-gglbet", title: "How to get started on GGLBET", theme: "casino-basics" },
  { slug: "slot-features-explained", title: "Slot features explained", theme: "slots" },
  { slug: "beginner-path-to-live-casino", title: "Beginner path to live casino", theme: "live-casino" },
  { slug: "payments-checklist", title: "Payments checklist for deposits and withdrawals", theme: "payments" },
  { slug: "responsible-gaming-limits-checklist", title: "Responsible gaming limits checklist", theme: "responsible" },
  { slug: "account-security-basics", title: "Account security basics", theme: "security" },
  { slug: "how-to-download-the-gglbet-app", title: "How to download the GGLBET app", theme: "download" },
  { slug: "troubleshooting-game-wont-load", title: "Troubleshooting: game won't load", theme: "troubleshooting" },
  { slug: "how-to-read-promotion-terms", title: "How to read promotion terms", theme: "promotions" },
  { slug: "fishing-game-session-basics", title: "Fishing game session basics", theme: "fishing" },
];

function main() {
  const rows = GUIDE_META.map((g) => {
    const artPath = path.join("public", "guides", `${g.slug}.webp`);
    const url = `/guides/${g.slug}.webp`;
    const exists = fs.existsSync(artPath);
    let bytes = 0;
    let hash = "";
    let mtime = "";
    if (exists) {
      const buf = fs.readFileSync(artPath);
      const st = fs.statSync(artPath);
      bytes = buf.length;
      hash = crypto.createHash("sha256").update(buf).digest("hex").slice(0, 16);
      mtime = st.mtime.toISOString();
    }
    return {
      ...g,
      coverImage: exists ? url : "",
      heroImage: exists ? url : "",
      thumbnail: exists ? url : "",
      artworkPath: artPath.replace(/\\/g, "/"),
      exists,
      bytes,
      hash,
      mtime,
      placeholder: !exists || bytes <= 0,
      broken: exists && bytes <= 0,
    };
  });

  const hashes = new Map();
  let duplicateArtwork = 0;
  for (const r of rows) {
    if (!r.hash) continue;
    if (hashes.has(r.hash)) {
      duplicateArtwork += 1;
      r.duplicateOf = hashes.get(r.hash);
    } else hashes.set(r.hash, r.slug);
  }

  const report = {
    guideTotal: rows.length,
    guideWithArtwork: rows.filter((r) => r.exists && !r.broken).length,
    guideMissingArtwork: rows.filter((r) => !r.exists || r.broken).length,
    brokenImage: rows.filter((r) => r.broken).length,
    placeholder: rows.filter((r) => r.placeholder).length,
    duplicateArtwork,
    coveragePct:
      rows.length === 0
        ? 0
        : Math.round(
            (rows.filter((r) => r.exists && !r.broken).length / rows.length) *
              100,
          ),
    missingSlugs: rows.filter((r) => r.placeholder).map((r) => r.slug),
    rows,
  };

  fs.mkdirSync("qa-screenshots", { recursive: true });
  fs.writeFileSync(
    "qa-screenshots/guide-artwork-coverage-scan.json",
    JSON.stringify(report, null, 2),
  );
  console.log(
    JSON.stringify(
      {
        total: report.guideTotal,
        withArt: report.guideWithArtwork,
        missing: report.guideMissingArtwork,
        placeholder: report.placeholder,
        broken: report.brokenImage,
        dups: report.duplicateArtwork,
        coverage: report.coveragePct + "%",
        missingSlugs: report.missingSlugs,
      },
      null,
      2,
    ),
  );
}

main();
