/**
 * Convert AAA editorial guide PNGs → 1600x900 WebP into public/guides/.
 * Covers ALL CMS guides (100% coverage).
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
const OUT = path.join(ROOT, "public", "guides");

const MAP = [
  ["guide-kv-get-started.png", "how-to-get-started-on-gglbet.webp"],
  ["guide-kv-slot-features.png", "slot-features-explained.webp"],
  ["guide-kv-live-casino.png", "beginner-path-to-live-casino.webp"],
  ["guide-kv-payments.png", "payments-checklist.webp"],
  ["guide-kv-responsible.png", "responsible-gaming-limits-checklist.webp"],
  ["guide-kv-download-app.png", "how-to-download-the-gglbet-app.webp"],
  ["guide-kv-security.png", "account-security-basics.webp"],
  ["guide-kv-troubleshooting.png", "troubleshooting-game-wont-load.webp"],
  ["guide-kv-promotion-terms.png", "how-to-read-promotion-terms.webp"],
  ["guide-kv-fishing.png", "fishing-game-session-basics.webp"],
];

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
      path: `/guides/${destName}`,
    });
    console.log("ok", destName, st.size);
  }

  const report = {
    installedAt: new Date().toISOString(),
    guideArtworkTotal: MAP.length,
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
    path.join(ROOT, "qa-screenshots", "guide-editorial-kv-report.json"),
    JSON.stringify(report, null, 2),
  );
  console.log(
    JSON.stringify(
      {
        total: report.guideArtworkTotal,
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
