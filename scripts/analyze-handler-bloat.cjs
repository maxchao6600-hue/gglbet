const fs = require("fs");
const path = require("path");

const handlerPath = ".open-next/server-functions/default/handler.mjs";
const s = fs.readFileSync(handlerPath, "utf8");
console.log("handler bytes", s.length);

function sampleIn(file, label) {
  if (!fs.existsSync(file)) {
    console.log(label, "MISSING");
    return;
  }
  const raw = fs.readFileSync(file, "utf8");
  const mid = Math.floor(raw.length * 0.4);
  const sample = raw.slice(mid, mid + 60).replace(/\s+/g, " ");
  console.log(
    label,
    "fileKB=" + (raw.length / 1024).toFixed(1),
    "inHandler=" + s.includes(sample.slice(0, 35)),
  );
}

sampleIn("public/cms/gglbet5-games.json", "games-json");
sampleIn(
  "lib/cms/seed/content/promotions/official/gglbet5-promotions.json",
  "promo-json",
);
sampleIn(
  "lib/cms/seed/content/providers/official/gglbet5-providers.json",
  "provider-json",
);

const phrases = [
  "Daily 188 Free Spins",
  "GGLBET payment methods",
  "Responsible gaming limits checklist",
  "slot-features-explained",
  "Touch 'n Go eWallet",
  "cmsbetconstruct.com/content/images",
  "resvg.wasm",
  "Geist-Regular",
  "yoga.wasm",
  "ImageResponse",
];
for (const p of phrases) {
  console.log(JSON.stringify(p), s.includes(p));
}

// Rough size of next/og related by finding nearby chunks in node_modules copied
const ogDir =
  ".open-next/server-functions/default/node_modules/next/dist/compiled/@vercel/og";
if (fs.existsSync(ogDir)) {
  let total = 0;
  for (const f of fs.readdirSync(ogDir)) {
    const st = fs.statSync(path.join(ogDir, f));
    if (st.isFile()) {
      total += st.size;
      console.log("og-file", f, (st.size / 1024).toFixed(1) + "KiB");
    }
  }
  console.log("og-dir-total-KiB", (total / 1024).toFixed(1));
}

// Top files under server-functions/default
function walk(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, acc);
    else acc.push({ p, size: fs.statSync(p).size });
  }
  return acc;
}
const files = walk(".open-next/server-functions/default")
  .sort((a, b) => b.size - a.size)
  .slice(0, 30);
for (const f of files) {
  console.log(
    (f.size / 1024).toFixed(1) + "KiB",
    f.p.replace(".open-next/server-functions/default/", ""),
  );
}
