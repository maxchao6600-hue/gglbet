/** Remove paper-plane regions from telegram KV using coin patches only (no UI sticker). */
const path = require("path");
const sharp = require("sharp");

const ASSETS = path.join(
  process.env.USERPROFILE || "",
  ".cursor",
  "projects",
  "c-Users-maxch-OneDrive-Desktop-gglbet",
  "assets",
);
const src = path.join(ASSETS, "kv3e-telegram-pure.png");
const out = path.join(ASSETS, "kv3f-telegram-no-plane.png");

async function main() {
  const meta = await sharp(src).metadata();
  const w = meta.width;
  const h = meta.height;

  // coin texture patches
  const coinA = await sharp(src)
    .extract({
      left: Math.floor(w * 0.08),
      top: Math.floor(h * 0.62),
      width: Math.floor(w * 0.22),
      height: Math.floor(h * 0.28),
    })
    .resize(Math.floor(w * 0.2), Math.floor(h * 0.26))
    .blur(0.5)
    .toBuffer();

  const darkGlass = await sharp({
    create: {
      width: Math.floor(w * 0.2),
      height: Math.floor(h * 0.36),
      channels: 4,
      background: { r: 20, g: 10, b: 30, alpha: 255 },
    },
  })
    .png()
    .toBuffer();

  // soft VIP text without logos/planes
  const svg = Buffer.from(
    `<svg width="${Math.floor(w * 0.18)}" height="${Math.floor(h * 0.32)}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" rx="24" fill="#1a0f24" fill-opacity="0.92" stroke="#ff2d8a" stroke-width="2"/>
      <text x="50%" y="42%" text-anchor="middle" fill="#ffffff" font-family="Georgia, serif" font-size="28">VIP Reward</text>
      <text x="50%" y="68%" text-anchor="middle" fill="#ff4da6" font-family="Arial" font-size="40" font-weight="700">Ready</text>
    </svg>`,
  );

  await sharp(src)
    .composite([
      // cover floating hologram plane (upper right)
      { input: coinA, left: Math.floor(w * 0.74), top: Math.floor(h * 0.05) },
      { input: coinA, left: Math.floor(w * 0.78), top: Math.floor(h * 0.28) },
      // cover phone screen plane
      { input: darkGlass, left: Math.floor(w * 0.5), top: Math.floor(h * 0.28) },
      { input: svg, left: Math.floor(w * 0.51), top: Math.floor(h * 0.3) },
    ])
    .png()
    .toFile(out);

  console.log("wrote", out);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
