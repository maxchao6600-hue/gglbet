const fs = require("fs");
const s = fs.readFileSync(
  ".open-next/server-functions/default/handler.mjs",
  "utf8",
);

const checks = [
  ["capsize unitsPerEm", "unitsPerEm"],
  ["font-metrics sample", '"familyName"'],
  ["promo HTML content", "<p>"],
  ["support bilingual", "馬來西亞"],
  ["home seed", "Featured Games"],
  ["provider zh", "遊戲商"],
  ["guide longform", "How to get started"],
  ["news longform", "official announcement"],
  ["next font metrics path", "capsize-font-metrics"],
];

for (const [label, needle] of checks) {
  const idx = s.indexOf(needle);
  console.log(label, idx >= 0 ? "YES@" + idx : "no");
}

// Estimate: split handler into quarters by size and search unique seed names
const supportFiles = [
  "lib/cms/seed/support/payment.ts",
  "lib/cms/seed/support/about.ts",
  "lib/cms/seed/home-page.ts",
  "lib/cms/seed/content/providers/zh-copy.ts",
  "lib/cms/seed/content/games/featured-seo.ts",
  "lib/cms/seed/promotions.ts",
];

for (const f of supportFiles) {
  if (!fs.existsSync(f)) continue;
  const raw = fs.readFileSync(f, "utf8");
  // find a distinctive non-import line
  const lines = raw.split(/\n/).filter((l) => l.length > 80 && !l.includes("import"));
  const sample = (lines[Math.floor(lines.length / 2)] || "").trim().slice(0, 50);
  if (!sample) continue;
  console.log(
    f.split("/").pop(),
    "sampleInHandler=",
    s.includes(sample.slice(0, 30)),
    "fileKB=",
    (raw.length / 1024).toFixed(1),
  );
}

// Count approximate contribution: gzip of handler alone
const zlib = require("zlib");
const gz = zlib.gzipSync(Buffer.from(s), { level: 9 });
console.log("handler gzip KiB", (gz.length / 1024).toFixed(1));
