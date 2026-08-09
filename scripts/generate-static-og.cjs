/**
 * Generate static OG/Twitter PNGs so next/og (@vercel/og + resvg.wasm)
 * is not bundled into the Cloudflare Worker.
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const WIDTH = 1200;
const HEIGHT = 630;
const BG = "#0B0614";
const PINK = "#EC008C";
const INK = "#FFFFFF";
const MUTED = "rgba(255,255,255,0.72)";

async function renderOgPng() {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="100%" height="100%" fill="${BG}"/>
  <text x="64" y="120" fill="${PINK}" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="700" letter-spacing="6">GGLBET</text>
  <text x="64" y="320" fill="${INK}" font-family="Arial, Helvetica, sans-serif" font-size="64" font-weight="800">GGLBET official content hub</text>
  <text x="64" y="390" fill="${MUTED}" font-family="Arial, Helvetica, sans-serif" font-size="28">Official GGLBET online casino content hub</text>
  <rect x="64" y="520" width="180" height="6" rx="3" fill="${PINK}"/>
</svg>`;

  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  const appDir = path.join(process.cwd(), "app");
  const publicDir = path.join(process.cwd(), "public");
  fs.writeFileSync(path.join(appDir, "opengraph-image.png"), png);
  fs.writeFileSync(path.join(appDir, "twitter-image.png"), png);
  fs.writeFileSync(path.join(publicDir, "og.png"), png);
  console.log("Wrote app/opengraph-image.png, app/twitter-image.png, public/og.png", png.length);
}

renderOgPng().catch((err) => {
  console.error(err);
  process.exit(1);
});
