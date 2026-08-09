/** Cover messenger logo on telegram news KV screen; write clean PNG + WebP. */
const path = require("path");
const sharp = require("sharp");

const ASSETS = path.join(
  process.env.USERPROFILE || "",
  ".cursor",
  "projects",
  "c-Users-maxch-OneDrive-Desktop-gglbet",
  "assets",
);
const src = path.join(ASSETS, "news-kv-telegram-rewards-v4.png");
const destPng = path.join(ASSETS, "news-kv-telegram-rewards-clean.png");
const destWebp = path.join(
  __dirname,
  "..",
  "public",
  "news",
  "kv",
  "gglbet-telegram-exclusive-rewards-official-announcement.webp",
);

async function main() {
  const meta = await sharp(src).metadata();
  const w = meta.width;
  const h = meta.height;
  const sw = Math.floor(w * 0.14);
  const sh = Math.floor(h * 0.38);
  const svg = Buffer.from(
    `<svg width="${sw}" height="${sh}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1a1028"/>
          <stop offset="100%" stop-color="#0c0814"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" rx="18" fill="url(#g)"/>
      <text x="50%" y="28%" text-anchor="middle" fill="#ffffff" font-family="Arial" font-size="22" font-weight="700">VIP</text>
      <text x="50%" y="42%" text-anchor="middle" fill="#ff4da6" font-family="Arial" font-size="18">REWARD</text>
      <rect x="18%" y="55%" width="64%" height="14%" rx="10" fill="#e91e8c"/>
      <text x="50%" y="65%" text-anchor="middle" fill="#ffffff" font-family="Arial" font-size="14" font-weight="700">CLAIM</text>
      <text x="50%" y="82%" text-anchor="middle" fill="#c9b8d4" font-family="Arial" font-size="12">UNLOCKED</text>
    </svg>`,
  );

  await sharp(src)
    .composite([
      { input: svg, left: Math.floor(w * 0.455), top: Math.floor(h * 0.28) },
    ])
    .png()
    .toFile(destPng);

  await sharp(destPng)
    .resize(1600, 900, { fit: "cover", position: "centre" })
    .webp({ quality: 90 })
    .toFile(destWebp);

  console.log("ok", destWebp);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
