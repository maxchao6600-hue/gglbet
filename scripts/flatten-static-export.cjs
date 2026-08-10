/**
 * Phase 6 — flatten Next.js `output: "export"` locale tree for public URLs.
 *
 * Next emits `out/en/...` and `out/zh/...` because of `app/[locale]`.
 * Public EN canonicals are unprefixed (`/`, `/games`, …). Copy `out/en/*`
 * to `out/` root while keeping `out/zh/` and leaving `/en` → `/` to `_redirects`.
 *
 * Cloudflare Pages settings (do not deploy from this script):
 *   Build command: npm run build
 *   Output directory: out
 *   Functions: none
 */
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "out");
const EN = path.join(OUT, "en");

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const name of fs.readdirSync(src)) {
      copyRecursive(path.join(src, name), path.join(dest, name));
    }
    return;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function main() {
  if (!fs.existsSync(OUT)) {
    console.error("[flatten-static-export] missing out/ — run next build first");
    process.exit(1);
  }
  if (!fs.existsSync(EN)) {
    console.error("[flatten-static-export] missing out/en/ — unexpected export layout");
    process.exit(1);
  }

  for (const name of fs.readdirSync(EN)) {
    const from = path.join(EN, name);
    const to = path.join(OUT, name);
    copyRecursive(from, to);
  }

  // Keep out/en/ so /en/* still resolve as files until Cloudflare 301s apply;
  // `_redirects` maps /en → / and /en/* → /:splat on Pages.
  console.log("[flatten-static-export] copied out/en/* → out/ (EN unprefixed canonicals ready)");
}

main();
