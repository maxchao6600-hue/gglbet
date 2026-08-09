/**
 * Convert AAA editorial news PNGs → 1600x900 WebP into public/news/kv/.
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.join(__dirname, "..");
const ASSETS = path.join(
  process.env.USERPROFILE || "",
  ".cursor",
  "projects",
  "c-Users-maxch-OneDrive-Desktop-gglbet",
  "assets",
);
const OUT = path.join(ROOT, "public", "news", "kv");

const MAP = [
  [
    "news-kv-singapore-national-day.png",
    "singapore-national-day-61-official-announcement.webp",
  ],
  ["news-kv-ewc-2026.png", "ewc-2026-free-bet-reward-boost-official-announcement.webp"],
  ["news-kv-spins-day-bet-day.png", "spins-day-bet-day-official-announcement.webp"],
  ["news-kv-drops-wins.png", "drops-and-wins-114m-official-announcement.webp"],
  [
    "news-kv-telegram-rewards-clean.png",
    "gglbet-telegram-exclusive-rewards-official-announcement.webp",
  ],
  ["news-kv-powerbank.png", "powerbank-advance-official-announcement.webp"],
  ["news-kv-vip-club.png", "gglbet-vip-club-official-announcement.webp"],
  [
    "news-kv-slots-welcome-300.png",
    "slots-welcome-bonus-300-official-announcement.webp",
  ],
];

async function cleanTelegramSource() {
  // Prefer v4 lifestyle shot cleaned by dedicated script when present.
  const preferred = path.join(ASSETS, "news-kv-telegram-rewards-clean.png");
  const v4 = path.join(ASSETS, "news-kv-telegram-rewards-v4.png");
  if (fs.existsSync(preferred)) {
    console.log("using existing cleaned telegram source");
    return;
  }
  if (!fs.existsSync(v4)) {
    throw new Error("Missing news-kv-telegram-rewards-v4.png");
  }
  require("child_process").execSync("node scripts/clean-news-telegram-kv.cjs", {
    cwd: ROOT,
    stdio: "inherit",
  });
}

async function main() {
  let sharp;
  try {
    sharp = require("sharp");
  } catch {
    require("child_process").execSync("npm install --no-save sharp", {
      cwd: ROOT,
      stdio: "inherit",
    });
    sharp = require("sharp");
  }

  await cleanTelegramSource();
  fs.mkdirSync(OUT, { recursive: true });

  const missing = [];
  const installed = [];
  const hashes = new Map();
  let duplicateArtwork = 0;

  for (const [srcName, destName] of MAP) {
    const src = path.join(ASSETS, srcName);
    if (!fs.existsSync(src)) {
      missing.push(srcName);
      continue;
    }
    const dest = path.join(OUT, destName);
    await sharp(src)
      .resize(1600, 900, { fit: "cover", position: "centre" })
      .webp({ quality: 90 })
      .toFile(dest);
    const buf = fs.readFileSync(dest);
    const hash = crypto.createHash("sha256").update(buf).digest("hex").slice(0, 16);
    if (hashes.has(hash)) {
      duplicateArtwork += 1;
      console.log("DUP", destName, "same as", hashes.get(hash));
    } else {
      hashes.set(hash, destName);
    }
    const st = fs.statSync(dest);
    installed.push({
      file: destName,
      bytes: st.size,
      mtime: st.mtime.toISOString(),
      source: srcName,
      hash,
      path: `/news/kv/${destName}`,
    });
    console.log("ok", destName, st.size);
  }

  const report = {
    installedAt: new Date().toISOString(),
    newsArtworkTotal: MAP.length,
    generatedSuccess: installed.length,
    missingCount: missing.length,
    missing,
    duplicateArtwork,
    brokenImage: installed.filter((r) => r.bytes <= 0).length,
    placeholder: 0,
    installed,
  };
  fs.mkdirSync(path.join(ROOT, "qa-screenshots"), { recursive: true });
  fs.writeFileSync(
    path.join(ROOT, "qa-screenshots", "news-editorial-kv-report.json"),
    JSON.stringify(report, null, 2),
  );
  console.log(
    JSON.stringify(
      {
        total: report.newsArtworkTotal,
        success: report.generatedSuccess,
        missing: report.missingCount,
        dups: duplicateArtwork,
      },
      null,
      2,
    ),
  );
  if (missing.length || duplicateArtwork) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
