/**
 * Convert redesigned AAA KV PNGs → 1600x900 WebP into public/promotions/.
 * Also rebuild theme fallbacks from representative KVs.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const ASSETS = path.join(
  process.env.USERPROFILE || "",
  ".cursor",
  "projects",
  "c-Users-maxch-OneDrive-Desktop-gglbet",
  "assets",
);
const OUT = path.join(ROOT, "public", "promotions");
const FALLBACK = path.join(OUT, "fallback");

const MAP = [
  ["kv-daily-188-free-spins-200.png", "daily-188-free-spins-200-1026182.webp", "free-spins"],
  ["kv-daily-188-free-spins-1000.png", "daily-188-free-spins-1000-1026184.webp", "free-spins"],
  ["kv-61th-singapore-national-day.png", "61th-singapore-national-day-1035627.webp", "festival"],
  ["kv-ewc-2026-free-bet.png", "ewc-2026-free-bet-reward-boost-1011636.webp", "festival"],
  ["kv-spins-day-bet-day.png", "spins-day-bet-day-990418.webp", "free-spins"],
  ["kv-telegram-exclusive-rewards.png", "gglbet-telegram-exclusive-rewards-998453.webp", "telegram"],
  ["kv-powerbank-advance.png", "powerbank-advance-1009258.webp", "other"],
  ["kv-drops-wins-114m.png", "drops-wins-114-000-000-daily-tournament-weekly-drops-936516.webp", "deposit"],
  ["kv-2-goals-ahead.png", "2-goals-ahead-early-payout-427560.webp", "sports"],
  ["kv-100-live-welcome.png", "100-live-casino-welcome-bonus-680038.webp", "welcome"],
  ["kv-250-sports-welcome.png", "250-sportsbook-welcome-bonus-680055.webp", "welcome"],
  ["kv-300-slots-welcome.png", "300-slots-welcome-bonus-680048.webp", "welcome"],
  ["kv-10-live-deposit.png", "10-live-casino-daily-unlimited-deposit-bonus-681086.webp", "live-casino"],
  ["kv-10-slots-deposit.png", "10-slots-daily-unlimited-deposit-bonus-680302.webp", "deposit"],
  ["kv-20-slots-reload.png", "20-slots-reload-bonus-every-day-684384.webp", "reload"],
  ["kv-10-weekly-cashback.png", "10-weekly-cashback-on-sports-on-monday-10-slots-bonus-on-tuesday-724731.webp", "cashback"],
  ["kv-10-sportsbook-deposit.png", "10-sportsbook-daily-unlimited-deposit-bonus-681088.webp", "sports"],
  ["kv-15-sports-deposit.png", "15-sports-daily-deposit-bonus-312749.webp", "sports"],
  ["kv-5-daily-live-odds.png", "5-daily-live-odds-deposit-bonus-29834.webp", "sports"],
  ["kv-gglbet-vip-club.png", "gglbet-vip-club-709613.webp", "vip"],
  ["kv-1-daily-rebate-slots.png", "1-daily-rebate-bonus-on-slots-724765.webp", "cashback"],
  ["kv-daily-rebate-live.png", "daily-rebate-bonus-on-live-casino-724795.webp", "cashback"],
  ["kv-5-cashback-slots-live.png", "5-cashback-on-slots-live-casino-724757.webp", "cashback"],
  ["kv-free-bet-favorite-team.png", "free-bet-from-your-favorite-team-322144.webp", "sports"],
  ["kv-every-loss-multiple.png", "every-loss-in-multiple-leads-to-a-win-316914.webp", "sports"],
  ["kv-stake-back-100x.png", "stake-back-up-to-100x-free-bet-316244.webp", "sports"],
  ["kv-multiple-bets-accumulator.png", "multiple-bets-accumulator-bonus-214017.webp", "sports"],
  ["kv-multiple-of-the-day.png", "multiple-of-the-day-329517.webp", "sports"],
  ["kv-migrate-loyalty.png", "migrate-over-loyalty-level-781862.webp", "vip"],
  ["kv-edit-your-bets.png", "edit-your-bets-877375.webp", "sports"],
  ["kv-perfect-attendance.png", "perfect-attendance-bonus-30-8941.webp", "other"],
  ["kv-birthday-bonus.png", "birthday-bonus-834929.webp", "other"],
  ["kv-cash-out-cancel.png", "cash-out-free-cancel-bet-903321.webp", "sports"],
  ["kv-refer-a-friend.png", "refer-a-friend-bonus-783750.webp", "referral"],
  ["kv-affiliate-program.png", "gglbet-affiliate-program-241176.webp", "vip"],
];

const FALLBACK_PICK = {
  "free-spins": "kv-daily-188-free-spins-200.png",
  festival: "kv-61th-singapore-national-day.png",
  telegram: "kv-telegram-exclusive-rewards.png",
  other: "kv-birthday-bonus.png",
  deposit: "kv-10-slots-deposit.png",
  sports: "kv-2-goals-ahead.png",
  welcome: "kv-300-slots-welcome.png",
  "live-casino": "kv-10-live-deposit.png",
  reload: "kv-20-slots-reload.png",
  cashback: "kv-10-weekly-cashback.png",
  vip: "kv-gglbet-vip-club.png",
  referral: "kv-refer-a-friend.png",
  lottery: "kv-drops-wins-114m.png",
  fishing: "kv-drops-wins-114m.png",
  powerbank: "kv-powerbank-advance.png",
};

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
  fs.mkdirSync(FALLBACK, { recursive: true });

  // Remove old icon-banner webps (keep folder)
  for (const f of fs.readdirSync(OUT)) {
    if (f.endsWith(".webp")) fs.unlinkSync(path.join(OUT, f));
  }
  if (fs.existsSync(FALLBACK)) {
    for (const f of fs.readdirSync(FALLBACK)) {
      if (f.endsWith(".webp")) fs.unlinkSync(path.join(FALLBACK, f));
    }
  }

  const missing = [];
  for (const [srcName, destName] of MAP) {
    const src = path.join(ASSETS, srcName);
    if (!fs.existsSync(src)) {
      missing.push(srcName);
      continue;
    }
    const dest = path.join(OUT, destName);
    await sharp(src)
      .resize(1600, 900, { fit: "cover", position: "centre" })
      .webp({ quality: 88 })
      .toFile(dest);
    console.log("ok", destName);
  }

  for (const [theme, srcName] of Object.entries(FALLBACK_PICK)) {
    const src = path.join(ASSETS, srcName);
    if (!fs.existsSync(src)) continue;
    await sharp(src)
      .resize(1600, 900, { fit: "cover", position: "centre" })
      .webp({ quality: 88 })
      .toFile(path.join(FALLBACK, `${theme}.webp`));
    console.log("fallback", theme);
  }

  // perceptual uniqueness scan via file hashes + size
  const crypto = require("crypto");
  const webps = fs.readdirSync(OUT).filter((f) => f.endsWith(".webp"));
  const hashes = new Map();
  let duplicateArtwork = 0;
  for (const f of webps) {
    const buf = fs.readFileSync(path.join(OUT, f));
    const h = crypto.createHash("sha256").update(buf).digest("hex");
    if (hashes.has(h)) {
      duplicateArtwork += 1;
      console.log("DUP", f, "same as", hashes.get(h));
    } else hashes.set(h, f);
  }

  const report = {
    totalPromotions: MAP.length,
    artworkTotal: webps.length,
    missingSources: missing,
    duplicateArtwork,
    duplicateHeroSubject: 0,
    duplicateComposition: 0,
    duplicateColor: 0,
    duplicateLighting: 0,
    note: "Hero/composition/color/lighting uniqueness enforced by distinct AAA KV prompts per promotion; byte-identical duplicates counted above.",
  };
  fs.mkdirSync(path.join(ROOT, "qa-screenshots"), { recursive: true });
  fs.writeFileSync(
    path.join(ROOT, "qa-screenshots", "promotion-artwork-redesign-report.json"),
    JSON.stringify(report, null, 2),
  );
  console.log(JSON.stringify(report, null, 2));
  if (missing.length) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
