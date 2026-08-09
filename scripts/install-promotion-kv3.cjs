/**
 * P0-5: Install AAA KVs into /public/promotions/kv3/ (cache-bust path).
 * Does NOT trust prior install-promotion-kv alone — rebuilds from audited sources.
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
const OUT = path.join(ROOT, "public", "promotions", "kv3");
const FALLBACK = path.join(ROOT, "public", "promotions", "fallback");
const OLD = path.join(ROOT, "public", "promotions");

/** slug.webp -> preferred PNG source in assets (overrides copying old webp) */
const OVERRIDE = {
  "daily-188-free-spins-200-1026182.webp": "v2-daily-188-200.png",
  "daily-188-free-spins-1000-1026184.webp": "v2-daily-188-1000.png",
  "61th-singapore-national-day-1035627.webp": "v2d-singapore-marina-only.png",
  "ewc-2026-free-bet-reward-boost-1011636.webp": "kv3b-ewc-stadium.png",
  "gglbet-telegram-exclusive-rewards-998453.webp": "kv-telegram-exclusive-rewards.png",
  "powerbank-advance-1009258.webp": "v2b-powerbank-advance.png",
  "multiple-bets-accumulator-bonus-214017.webp": "kv3-accumulator.png",
  "edit-your-bets-877375.webp": "kv3-edit-bets.png",
  "every-loss-in-multiple-leads-to-a-win-316914.webp": "kv3-every-loss.png",
  "perfect-attendance-bonus-30-8941.webp": "kv3-perfect-attendance.png",
  "gglbet-affiliate-program-241176.webp": "kv3-affiliate.png",
  "free-bet-from-your-favorite-team-322144.webp": "kv3-favorite-team.png",
  "10-live-casino-daily-unlimited-deposit-bonus-681086.webp": "kv3-live-deposit.png",
  "5-cashback-on-slots-live-casino-724757.webp": "kv3-cashback-5.png",
  "refer-a-friend-bonus-783750.webp": "kv3-refer-friend.png",
  "multiple-of-the-day-329517.webp": "kv3-multiple-day.png",
};

const FALLBACK_FROM = {
  "free-spins": "daily-188-free-spins-200-1026182.webp",
  festival: "61th-singapore-national-day-1035627.webp",
  telegram: "gglbet-telegram-exclusive-rewards-998453.webp",
  other: "birthday-bonus-834929.webp",
  deposit: "10-slots-daily-unlimited-deposit-bonus-680302.webp",
  sports: "2-goals-ahead-early-payout-427560.webp",
  welcome: "300-slots-welcome-bonus-680048.webp",
  "live-casino": "10-live-casino-daily-unlimited-deposit-bonus-681086.webp",
  reload: "20-slots-reload-bonus-every-day-684384.webp",
  cashback: "10-weekly-cashback-on-sports-on-monday-10-slots-bonus-on-tuesday-724731.webp",
  vip: "gglbet-vip-club-709613.webp",
  referral: "refer-a-friend-bonus-783750.webp",
  lottery: "drops-wins-114-000-000-daily-tournament-weekly-drops-936516.webp",
  fishing: "drops-wins-114-000-000-daily-tournament-weekly-drops-936516.webp",
  powerbank: "powerbank-advance-1009258.webp",
};

async function main() {
  const sharp = require("sharp");
  fs.mkdirSync(OUT, { recursive: true });
  fs.mkdirSync(FALLBACK, { recursive: true });

  const snap = JSON.parse(
    fs.readFileSync(
      path.join(
        ROOT,
        "lib/cms/seed/content/promotions/official/gglbet5-promotions.json",
      ),
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

  const used = new Set();
  const rows = [];
  for (const p of snap.promotions) {
    const fromMeta = p.metaUrl?.trim();
    const base = slugify(fromMeta && fromMeta.length ? fromMeta : p.title);
    let slug = `${base}-${p.id}`;
    if (used.has(slug)) slug = `${slug}-x`;
    used.add(slug);
    const destName = `${slug}.webp`;
    const dest = path.join(OUT, destName);
    const override = OVERRIDE[destName];
    let sourceLabel = "";
    let genTime = new Date().toISOString();

    if (override) {
      const src = path.join(ASSETS, override);
      if (!fs.existsSync(src)) {
        throw new Error(`Missing override asset: ${override}`);
      }
      await sharp(src)
        .resize(1600, 900, { fit: "cover", position: "centre" })
        .webp({ quality: 90 })
        .toFile(dest);
      sourceLabel = override;
      genTime = fs.statSync(src).mtime.toISOString();
    } else {
      const oldPath = path.join(OLD, destName);
      if (!fs.existsSync(oldPath)) {
        throw new Error(`Missing base webp: ${destName}`);
      }
      await sharp(oldPath)
        .resize(1600, 900, { fit: "cover", position: "centre" })
        .webp({ quality: 90 })
        .toFile(dest);
      sourceLabel = `carry:${destName}`;
      genTime = fs.statSync(oldPath).mtime.toISOString();
    }

    const buf = fs.readFileSync(dest);
    rows.push({
      title: p.title,
      slug,
      artworkPath: `/promotions/kv3/${destName}`,
      diskPath: dest.replace(/\\/g, "/"),
      source: sourceLabel,
      generationTime: genTime,
      bytes: buf.length,
      hash: crypto.createHash("md5").update(buf).digest("hex").slice(0, 12),
    });
    console.log("ok", destName, "←", sourceLabel);
  }

  // rebuild fallbacks from installed kv3
  for (const [theme, webpName] of Object.entries(FALLBACK_FROM)) {
    const src = path.join(OUT, webpName);
    if (!fs.existsSync(src)) continue;
    await sharp(src)
      .resize(1600, 900, { fit: "cover", position: "centre" })
      .webp({ quality: 88 })
      .toFile(path.join(FALLBACK, `${theme}.webp`));
  }

  // uniqueness
  const hashes = new Map();
  let dups = 0;
  for (const r of rows) {
    if (hashes.has(r.hash)) {
      dups += 1;
      console.log("DUP", r.slug, hashes.get(r.hash));
    } else hashes.set(r.hash, r.slug);
  }

  const report = {
    installedAt: new Date().toISOString(),
    count: rows.length,
    duplicateArtwork: dups,
    overrides: Object.keys(OVERRIDE).length,
    rows,
  };
  fs.mkdirSync(path.join(ROOT, "qa-screenshots"), { recursive: true });
  fs.writeFileSync(
    path.join(ROOT, "qa-screenshots", "promotion-kv3-install-report.json"),
    JSON.stringify(report, null, 2),
  );
  console.log(JSON.stringify({ count: rows.length, dups, overrides: Object.keys(OVERRIDE).length }, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
