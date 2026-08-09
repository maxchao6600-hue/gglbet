/**
 * Build GGLBET favicon pack from the official gglbet5.com pink-G favicon.
 * Source: https://www.gglbet5.com/favicon.ico (same bytes Google/DDG cache).
 * No invented mark — only scale + transparent pad from the official 16×16.
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const SRC_ICO = path.join(ROOT, "tmp-favicon-src", "favicon.ico");
const OUT_PUBLIC = path.join(ROOT, "public");
const OUT_ICONS = path.join(OUT_PUBLIC, "icons");
const OUT_APP = path.join(ROOT, "app");

const SIZES = [16, 32, 48, 180, 192, 512];

function parseOfficialIco(buf) {
  const offset = buf.readUInt32LE(18);
  const dib = buf.slice(offset);
  const biWidth = dib.readInt32LE(4);
  const biHeight = dib.readInt32LE(8);
  const xorH = Math.abs(biHeight) / 2;
  const rowSize = biWidth * 4;
  const pixels = Buffer.alloc(biWidth * xorH * 4);
  const xorOffset = 40;

  for (let y = 0; y < xorH; y++) {
    const srcY = xorH - 1 - y;
    const src = xorOffset + srcY * rowSize;
    for (let x = 0; x < biWidth; x++) {
      const si = src + x * 4;
      const di = (y * biWidth + x) * 4;
      pixels[di] = dib[si + 2];
      pixels[di + 1] = dib[si + 1];
      pixels[di + 2] = dib[si];
      pixels[di + 3] = dib[si + 3];
    }
  }

  // Official mark sits on black — keep pink G, clear near-black to transparent.
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    if (r + g + b < 40) pixels[i + 3] = 0;
  }

  return { width: biWidth, height: xorH, pixels };
}

/** PNG-in-ICO (Vista+) multi-size writer */
function writeIco(pngBuffers) {
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);

  const dir = Buffer.alloc(16 * count);
  let offset = 6 + 16 * count;
  const parts = [header, dir];

  for (let i = 0; i < count; i++) {
    const png = pngBuffers[i];
    const meta = png.meta;
    const sizeByte = meta.width >= 256 ? 0 : meta.width;
    dir.writeUInt8(sizeByte, i * 16 + 0);
    dir.writeUInt8(sizeByte, i * 16 + 1);
    dir.writeUInt8(0, i * 16 + 2);
    dir.writeUInt8(0, i * 16 + 3);
    dir.writeUInt16LE(1, i * 16 + 4);
    dir.writeUInt16LE(32, i * 16 + 6);
    dir.writeUInt32LE(png.buf.length, i * 16 + 8);
    dir.writeUInt32LE(offset, i * 16 + 12);
    parts.push(png.buf);
    offset += png.buf.length;
  }

  return Buffer.concat(parts);
}

async function renderSize(master, size) {
  // Nearest-neighbor upscale of official pixels — no auto-crop, full glyph kept.
  const scaled = await sharp(master.pixels, {
    raw: { width: master.width, height: master.height, channels: 4 },
  })
    .resize(size, size, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      kernel: sharp.kernel.nearest,
    })
    .png()
    .toBuffer({ resolveWithObject: true });

  return { buf: scaled.data, meta: { width: size, height: size } };
}

async function main() {
  if (!fs.existsSync(SRC_ICO)) {
    throw new Error(`Missing official source ICO: ${SRC_ICO}`);
  }

  fs.mkdirSync(OUT_ICONS, { recursive: true });

  const master = parseOfficialIco(fs.readFileSync(SRC_ICO));
  console.log(`Official pink G source: ${master.width}×${master.height}`);

  // Master PNG (transparent) kept under public/icons
  await sharp(master.pixels, {
    raw: { width: master.width, height: master.height, channels: 4 },
  })
    .png()
    .toFile(path.join(OUT_ICONS, "favicon-source-16.png"));

  const rendered = {};
  for (const size of SIZES) {
    rendered[size] = await renderSize(master, size);
  }

  // public/
  const publicMap = {
    "favicon-16x16.png": 16,
    "favicon-32x32.png": 32,
    "favicon.png": 32,
    "favicon-48x48.png": 48,
    "apple-touch-icon.png": 180,
    "icon-192.png": 192,
    "icon-512.png": 512,
  };

  for (const [name, size] of Object.entries(publicMap)) {
    fs.writeFileSync(path.join(OUT_PUBLIC, name), rendered[size].buf);
    fs.writeFileSync(path.join(OUT_ICONS, name), rendered[size].buf);
  }

  const ico = writeIco([
    rendered[16],
    rendered[32],
    rendered[48],
  ]);
  fs.writeFileSync(path.join(OUT_PUBLIC, "favicon.ico"), ico);
  fs.writeFileSync(path.join(OUT_APP, "favicon.ico"), ico);

  // App Router static icons (replace dynamic pink-square generators)
  fs.writeFileSync(path.join(OUT_APP, "icon.png"), rendered[32].buf);
  fs.writeFileSync(path.join(OUT_APP, "apple-icon.png"), rendered[180].buf);

  // site.webmanifest in public (static fallback alongside app/manifest.ts)
  const manifest = {
    name: "GGLBET",
    short_name: "GGLBET",
    icons: [
      {
        src: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    theme_color: "#EC008C",
    background_color: "#0B0614",
    display: "standalone",
    start_url: "/",
  };
  fs.writeFileSync(
    path.join(OUT_PUBLIC, "site.webmanifest"),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );

  console.log("Wrote public + app favicon pack from official gglbet5.com pink G");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
