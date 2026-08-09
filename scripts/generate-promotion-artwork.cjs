/**
 * Generate dedicated 16:9 WebP promotion artworks under public/promotions/.
 * Visual language matches Home Hero: dark stage, pink/purple neon, glow, depth.
 *
 * Usage: node scripts/generate-promotion-artwork.mjs
 */
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "promotions");
const FALLBACK_DIR = path.join(OUT_DIR, "fallback");
const SNAPSHOT = path.join(
  ROOT,
  "lib",
  "cms",
  "seed",
  "content",
  "promotions",
  "official",
  "gglbet5-promotions.json",
);

const W = 1600;
const H = 900;

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);
}

function uniqueSlug(promo, used) {
  const base = slugify(promo.metaUrl?.trim() || promo.title) || `promo-${promo.id}`;
  let slug = `${base}-${promo.id}`;
  if (used.has(slug)) slug = `${slug}-x`;
  used.add(slug);
  return slug;
}

function inferCmsType(title) {
  const t = title.toLowerCase();
  if (t.includes("welcome")) return "welcome";
  if (t.includes("cashback") || t.includes("rebate")) return "cashback";
  if (t.includes("free spin") || t.includes("free spins") || t.includes("spins"))
    return "free-spins";
  if (t.includes("reload")) return "reload";
  if (t.includes("vip")) return "vip";
  if (t.includes("deposit bonus") || t.includes("daily") || t.includes("weekly"))
    return "deposit";
  if (t.includes("national day") || t.includes("festival") || t.includes("ewc"))
    return "seasonal";
  return "other";
}

function resolveTheme(title, promotionType) {
  const t = title.toLowerCase();
  if (
    /national day|merdeka|chinese new year|hari raya|deepavali|christmas|new year|festival|ewc/.test(
      t,
    )
  )
    return "festival";
  if (/vip|loyalty|affiliate/.test(t) || promotionType === "vip") return "vip";
  if (/refer|referral|friend/.test(t)) return "referral";
  if (/telegram/.test(t)) return "telegram";
  if (/free spin|free spins|spins day/.test(t) || promotionType === "free-spins")
    return "free-spins";
  if (/welcome/.test(t) || promotionType === "welcome") return "welcome";
  if (/cashback|rebate/.test(t) || promotionType === "cashback") return "cashback";
  if (/reload/.test(t) || promotionType === "reload") return "reload";
  if (
    /sports|sportsbook|football|soccer|bet day|goals|odds|free bet|accumulator|multiple|cash out|edit your bets|stake back/.test(
      t,
    )
  )
    return "sports";
  if (/live casino|roulette|baccarat|blackjack/.test(t)) return "live-casino";
  if (/lottery|lotto|jackpot draw/.test(t)) return "lottery";
  if (/deposit/.test(t) || promotionType === "deposit") return "deposit";
  if (promotionType === "seasonal") return "festival";
  return "other";
}

function extractHighlight(title, bonusHint) {
  const fromTitle = title.match(
    /(\d+\s*%|\$?\d[\d,]*(?:\.\d+)?|RM\s?\d+|SGD\s?\d+|188|888|61)/i,
  )?.[1];
  if (fromTitle) return fromTitle.replace(/\s+/g, " ").trim();
  if (bonusHint) return String(bonusHint).replace(/\s+/g, " ").trim();
  return "GGLBET";
}

function buildExcerpt(title) {
  return `Official GGLBET promotion: ${title}. Confirm live terms before claiming.`;
}

function motifSvg(theme) {
  const commonGlow = `
    <defs>
      <radialGradient id="g1" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stop-color="#FF4DB8" stop-opacity="0.55"/>
        <stop offset="45%" stop-color="#7B2FFF" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="#07080b" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#FFE566"/>
        <stop offset="50%" stop-color="#FFB020"/>
        <stop offset="100%" stop-color="#FF6B00"/>
      </linearGradient>
      <linearGradient id="pink" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#FF6BCB"/>
        <stop offset="100%" stop-color="#EC008C"/>
      </linearGradient>
      <filter id="glow"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <circle cx="420" cy="280" r="260" fill="url(#g1)"/>
  `;

  const motifs = {
    "free-spins": `
      ${commonGlow}
      <rect x="280" y="160" width="280" height="360" rx="28" fill="#12141c" stroke="url(#pink)" stroke-width="4" filter="url(#glow)"/>
      <rect x="310" y="200" width="70" height="90" rx="10" fill="#1c1020" stroke="#EC008C"/>
      <rect x="385" y="200" width="70" height="90" rx="10" fill="#1c1020" stroke="#EC008C"/>
      <rect x="460" y="200" width="70" height="90" rx="10" fill="#1c1020" stroke="#EC008C"/>
      <text x="345" y="260" fill="#FFE566" font-size="42" font-weight="800" text-anchor="middle">7</text>
      <text x="420" y="260" fill="#FFE566" font-size="42" font-weight="800" text-anchor="middle">7</text>
      <text x="495" y="260" fill="#FFE566" font-size="42" font-weight="800" text-anchor="middle">7</text>
      <circle cx="250" cy="480" r="36" fill="url(#gold)" filter="url(#glow)"/>
      <circle cx="560" cy="500" r="28" fill="url(#gold)"/>
      <circle cx="600" cy="420" r="18" fill="#EC008C" opacity="0.9"/>
      <path d="M340 420 h160" stroke="#FF6BCB" stroke-width="6" stroke-linecap="round"/>
    `,
    welcome: `
      ${commonGlow}
      <rect x="330" y="220" width="200" height="160" rx="18" fill="#1a1024" stroke="url(#gold)" stroke-width="5" filter="url(#glow)"/>
      <path d="M330 250 h200" stroke="#EC008C" stroke-width="14"/>
      <path d="M430 220 v160" stroke="#EC008C" stroke-width="14"/>
      <path d="M350 220 q80 -70 160 0" fill="none" stroke="url(#gold)" stroke-width="10"/>
      <circle cx="260" cy="420" r="30" fill="url(#gold)"/>
      <circle cx="560" cy="450" r="24" fill="url(#gold)"/>
      <circle cx="520" cy="360" r="14" fill="#FF6BCB"/>
      <path d="M300 480 q130 -80 260 0" fill="none" stroke="#7B2FFF" stroke-width="3" opacity="0.7"/>
    `,
    cashback: `
      ${commonGlow}
      <rect x="300" y="240" width="260" height="180" rx="28" fill="#141824" stroke="#EC008C" stroke-width="4" filter="url(#glow)"/>
      <circle cx="430" cy="330" r="54" fill="none" stroke="url(#gold)" stroke-width="8"/>
      <path d="M430 290 v80 M400 330 h60" stroke="url(#gold)" stroke-width="8" stroke-linecap="round"/>
      <path d="M520 200 l40 60 -50 10 z" fill="#EC008C" filter="url(#glow)"/>
      <circle cx="250" cy="460" r="26" fill="url(#gold)"/>
      <circle cx="580" cy="480" r="22" fill="url(#gold)"/>
    `,
    deposit: `
      ${commonGlow}
      <rect x="290" y="230" width="280" height="180" rx="22" fill="#12141c" stroke="#7B2FFF" stroke-width="4" filter="url(#glow)"/>
      <rect x="320" y="270" width="120" height="24" rx="8" fill="#EC008C"/>
      <rect x="320" y="320" width="180" height="16" rx="6" fill="#2a2e3a"/>
      <rect x="320" y="350" width="140" height="16" rx="6" fill="#2a2e3a"/>
      <circle cx="520" cy="360" r="34" fill="url(#gold)" filter="url(#glow)"/>
      <text x="520" y="370" text-anchor="middle" fill="#1a0a10" font-size="28" font-weight="800">+</text>
      <circle cx="250" cy="470" r="24" fill="url(#gold)"/>
    `,
    reload: `
      ${commonGlow}
      <circle cx="430" cy="320" r="110" fill="none" stroke="url(#pink)" stroke-width="16" filter="url(#glow)"/>
      <path d="M430 210 a110 110 0 1 1 -78 188" fill="none" stroke="url(#gold)" stroke-width="16" stroke-linecap="round"/>
      <path d="M340 390 l-30 40 50 -10 z" fill="#FFE566"/>
      <circle cx="560" cy="460" r="26" fill="url(#gold)"/>
    `,
    sports: `
      ${commonGlow}
      <ellipse cx="430" cy="460" rx="220" ry="40" fill="#0d1018" stroke="#7B2FFF" stroke-width="2"/>
      <circle cx="430" cy="300" r="100" fill="#1a5c2e" stroke="#FFE566" stroke-width="5" filter="url(#glow)"/>
      <path d="M430 200 v200 M330 300 h200" stroke="#dfffe8" stroke-width="3" opacity="0.5"/>
      <path d="M370 240 q60 40 120 0 M370 360 q60 -40 120 0" fill="none" stroke="#dfffe8" stroke-width="3" opacity="0.55"/>
      <rect x="250" y="160" width="18" height="220" fill="#EC008C" opacity="0.7"/>
      <rect x="592" y="160" width="18" height="220" fill="#7B2FFF" opacity="0.7"/>
    `,
    "live-casino": `
      ${commonGlow}
      <ellipse cx="430" cy="420" rx="240" ry="90" fill="#0f3d28" stroke="#EC008C" stroke-width="5" filter="url(#glow)"/>
      <circle cx="430" cy="300" r="88" fill="#12141c" stroke="url(#gold)" stroke-width="8"/>
      <circle cx="430" cy="300" r="58" fill="none" stroke="#EC008C" stroke-width="4"/>
      <rect x="300" y="470" width="70" height="100" rx="8" fill="#f5f5f5" transform="rotate(-12 335 520)"/>
      <rect x="390" y="480" width="70" height="100" rx="8" fill="#ffefef" transform="rotate(8 425 530)"/>
      <text x="335" y="540" fill="#c00" font-size="36" font-weight="800">A</text>
    `,
    lottery: `
      ${commonGlow}
      <circle cx="340" cy="300" r="55" fill="#EC008C" filter="url(#glow)"/>
      <circle cx="430" cy="250" r="55" fill="#7B2FFF" filter="url(#glow)"/>
      <circle cx="520" cy="310" r="55" fill="url(#gold)" filter="url(#glow)"/>
      <circle cx="390" cy="390" r="48" fill="#FF6BCB"/>
      <circle cx="490" cy="400" r="48" fill="#2dd4bf"/>
      <text x="340" y="310" text-anchor="middle" fill="#fff" font-size="32" font-weight="800">6</text>
      <text x="430" y="260" text-anchor="middle" fill="#fff" font-size="32" font-weight="800">1</text>
      <text x="520" y="320" text-anchor="middle" fill="#1a0a10" font-size="32" font-weight="800">8</text>
      <rect x="300" y="480" width="260" height="70" rx="10" fill="#1a1024" stroke="#FFE566" stroke-width="3"/>
    `,
    vip: `
      ${commonGlow}
      <path d="M300 360 l50 -120 40 70 40 -100 40 100 40 -70 50 120 z" fill="url(#gold)" filter="url(#glow)"/>
      <rect x="300" y="360" width="260" height="36" fill="#EC008C"/>
      <circle cx="430" cy="250" r="28" fill="#fff" opacity="0.9"/>
      <path d="M430 200 l18 40 44 4 -34 28 10 42 -38 -24 -38 24 10 -42 -34 -28 44 -4 z" fill="#7B2FFF"/>
    `,
    festival: `
      ${commonGlow}
      <path d="M430 160 l40 120 h126 l-102 74 40 120 -104 -76 -104 76 40 -120 -102 -74 h126 z" fill="url(#gold)" filter="url(#glow)"/>
      <rect x="250" y="420" width="40" height="140" fill="#EC008C"/>
      <rect x="570" y="420" width="40" height="140" fill="#7B2FFF"/>
      <circle cx="270" cy="400" r="28" fill="#FF6BCB"/>
      <circle cx="590" cy="400" r="28" fill="#FFE566"/>
    `,
    referral: `
      ${commonGlow}
      <circle cx="360" cy="280" r="70" fill="#1a1024" stroke="#EC008C" stroke-width="6" filter="url(#glow)"/>
      <circle cx="500" cy="280" r="70" fill="#1a1024" stroke="#7B2FFF" stroke-width="6" filter="url(#glow)"/>
      <path d="M360 360 q70 80 140 0" fill="none" stroke="url(#gold)" stroke-width="10" stroke-linecap="round"/>
      <circle cx="430" cy="470" r="30" fill="url(#gold)"/>
    `,
    telegram: `
      ${commonGlow}
      <path d="M250 320 l360 -120 -70 280 -90 -70 -70 90 z" fill="#2AABEE" filter="url(#glow)"/>
      <path d="M340 360 l160 -70 -120 140 z" fill="#fff" opacity="0.9"/>
      <circle cx="560" cy="460" r="24" fill="url(#gold)"/>
    `,
    other: `
      ${commonGlow}
      <rect x="310" y="220" width="240" height="240" rx="32" fill="#141824" stroke="url(#pink)" stroke-width="5" filter="url(#glow)"/>
      <text x="430" y="360" text-anchor="middle" fill="#FFE566" font-size="64" font-weight="800">G</text>
      <circle cx="260" cy="460" r="24" fill="url(#gold)"/>
      <circle cx="580" cy="440" r="20" fill="#EC008C"/>
    `,
  };

  return motifs[theme] || motifs.other;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function artboardHtml({ title, excerpt, highlight, theme, typeLabel }) {
  const motif = motifSvg(theme);
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8"/>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@500;700;800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { width: ${W}px; height: ${H}px; overflow: hidden; background: #07080b; font-family: "Segoe UI", Outfit, system-ui, sans-serif; color: #f5f2f8; }
  .stage {
    position: relative; width: ${W}px; height: ${H}px;
    background:
      radial-gradient(900px 500px at 75% 35%, rgba(236,0,140,0.28), transparent 60%),
      radial-gradient(700px 420px at 20% 80%, rgba(123,47,255,0.22), transparent 55%),
      linear-gradient(135deg, #07080b 0%, #12081a 45%, #0a0c12 100%);
  }
  .grid {
    position: absolute; inset: 0; opacity: 0.18;
    background-image:
      linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: radial-gradient(ellipse at center, #000 30%, transparent 75%);
  }
  .particles span {
    position: absolute; width: 4px; height: 4px; border-radius: 50%;
    background: #ff6bcb; box-shadow: 0 0 12px #ec008c; opacity: 0.7;
  }
  .frame {
    position: absolute; inset: 28px; border: 1px solid rgba(236,0,140,0.35);
    border-radius: 28px; box-shadow: inset 0 0 80px rgba(123,47,255,0.12), 0 0 40px rgba(236,0,140,0.15);
  }
  .layout {
    position: relative; z-index: 2; display: grid; grid-template-columns: 1.05fr 0.95fr;
    height: 100%; padding: 72px 80px 72px 88px; gap: 24px;
  }
  .copy { display: flex; flex-direction: column; justify-content: center; max-width: 680px; }
  .brand {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 18px; letter-spacing: 0.22em; text-transform: uppercase;
    color: #ff6bcb; font-weight: 700; margin-bottom: 18px;
  }
  .brand i {
    width: 10px; height: 10px; border-radius: 50%; background: #ec008c;
    box-shadow: 0 0 16px #ec008c;
  }
  .type {
    display: inline-block; align-self: flex-start;
    padding: 8px 14px; border-radius: 999px;
    border: 1px solid rgba(255,107,203,0.45);
    background: rgba(236,0,140,0.12);
    color: #ffc2e8; font-size: 15px; font-weight: 700; letter-spacing: 0.08em;
    text-transform: uppercase; margin-bottom: 22px;
  }
  .highlight {
    font-size: 128px; line-height: 0.92; font-weight: 800;
    background: linear-gradient(180deg, #ffe566 0%, #ffb020 45%, #ec008c 100%);
    -webkit-background-clip: text; background-clip: text; color: transparent;
    text-shadow: 0 0 40px rgba(236,0,140,0.25);
    margin-bottom: 18px; letter-spacing: -0.03em;
  }
  .title {
    font-size: 44px; line-height: 1.12; font-weight: 800;
    max-width: 18ch; margin-bottom: 18px;
  }
  .excerpt {
    font-size: 22px; line-height: 1.45; color: rgba(245,242,248,0.72);
    max-width: 28ch; font-weight: 500;
  }
  .visual {
    display: flex; align-items: center; justify-content: center;
    position: relative;
  }
  .visual::before {
    content: ""; position: absolute; width: 520px; height: 520px; border-radius: 50%;
    background: radial-gradient(circle, rgba(236,0,140,0.2), transparent 65%);
    filter: blur(8px);
  }
  .visual svg { position: relative; z-index: 1; width: 700px; height: 620px; }
  .floor {
    position: absolute; left: 8%; right: 8%; bottom: 48px; height: 90px;
    background: radial-gradient(ellipse at center, rgba(236,0,140,0.25), transparent 70%);
    filter: blur(18px);
  }
</style>
</head>
<body>
  <div class="stage">
    <div class="grid"></div>
    <div class="particles">
      <span style="left:12%;top:18%"></span>
      <span style="left:22%;top:62%;width:6px;height:6px"></span>
      <span style="left:68%;top:14%"></span>
      <span style="left:78%;top:58%;background:#a78bfa"></span>
      <span style="left:88%;top:30%;width:5px;height:5px"></span>
      <span style="left:40%;top:78%;background:#ffe566"></span>
    </div>
    <div class="frame"></div>
    <div class="layout">
      <div class="copy">
        <div class="brand"><i></i> GGLBET</div>
        <div class="type">${escapeHtml(typeLabel)}</div>
        <div class="highlight">${escapeHtml(highlight)}</div>
        <h1 class="title">${escapeHtml(title)}</h1>
        <p class="excerpt">${escapeHtml(excerpt)}</p>
      </div>
      <div class="visual">
        <svg viewBox="0 0 760 620" xmlns="http://www.w3.org/2000/svg">${motif}</svg>
      </div>
    </div>
    <div class="floor"></div>
  </div>
</body>
</html>`;
}

async function renderToWebp(browser, spec, outFile) {
  const page = await browser.newPage({
    viewport: { width: W, height: H },
    deviceScaleFactor: 1,
  });
  await page.setContent(artboardHtml(spec), { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(80);
  await page.screenshot({ path: outFile, type: "png" });
  await page.close();

  // Convert PNG → WebP via Playwright CDP screenshot is png-only in many builds;
  // Prefer sharp if present, else keep png and rename after conversion attempt.
  return outFile;
}

async function pngToWebp(pngPath, webpPath) {
  try {
    const sharp = require("sharp");
    await sharp(pngPath)
      .resize(W, H, { fit: "cover" })
      .webp({ quality: 86 })
      .toFile(webpPath);
    fs.unlinkSync(pngPath);
    return true;
  } catch {
    // Fallback: keep PNG renamed as .webp is wrong — install sharp.
    return false;
  }
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.mkdirSync(FALLBACK_DIR, { recursive: true });

  const snapshot = JSON.parse(fs.readFileSync(SNAPSHOT, "utf8"));
  const used = new Set();
  const promotions = snapshot.promotions.map((promo) => {
    const slug = uniqueSlug(promo, used);
    const promotionType = inferCmsType(promo.title);
    const theme = resolveTheme(promo.title, promotionType);
    const highlight = extractHighlight(promo.title);
    const excerpt = buildExcerpt(promo.title);
    return {
      id: promo.id,
      slug,
      title: promo.title,
      promotionType,
      theme,
      highlight,
      excerpt,
      typeLabel: theme.replace(/-/g, " "),
    };
  });

  const themes = [...new Set(promotions.map((p) => p.theme))];
  // Ensure "other" fallback always exists
  if (!themes.includes("other")) themes.push("other");

  console.log(`Promotions: ${promotions.length}`);
  console.log(`Themes: ${themes.join(", ")}`);

  // Ensure sharp is available
  let hasSharp = true;
  try {
    require.resolve("sharp");
  } catch {
    hasSharp = false;
    console.log("Installing sharp for WebP conversion...");
    require("child_process").execSync("npm install --no-save sharp", {
      cwd: ROOT,
      stdio: "inherit",
    });
    hasSharp = true;
  }

  const browser = await chromium.launch({ headless: true });
  let generated = 0;
  let fallbacks = 0;

  // Fallbacks first
  for (const theme of themes) {
    const png = path.join(FALLBACK_DIR, `${theme}.png`);
    const webp = path.join(FALLBACK_DIR, `${theme}.webp`);
    const label = theme.replace(/-/g, " ");
    await renderToWebp(
      browser,
      {
        title: `GGLBET ${label} offers`,
        excerpt: `Browse GGLBET ${label} promotions and confirm live terms before claiming.`,
        highlight: theme === "vip" ? "VIP" : theme === "free-spins" ? "188" : "GGLBET",
        theme,
        typeLabel: label,
      },
      png,
    );
    const ok = await pngToWebp(png, webp);
    if (!ok) throw new Error("sharp WebP conversion failed — cannot ship PNG as WebP");
    fallbacks += 1;
    console.log(`fallback ${theme}`);
  }

  for (const promo of promotions) {
    const png = path.join(OUT_DIR, `${promo.slug}.png`);
    const webp = path.join(OUT_DIR, `${promo.slug}.webp`);
    await renderToWebp(
      browser,
      {
        title: promo.title,
        excerpt: promo.excerpt,
        highlight: promo.highlight,
        theme: promo.theme,
        typeLabel: promo.typeLabel,
      },
      png,
    );
    const ok = await pngToWebp(png, webp);
    if (!ok) throw new Error(`WebP failed for ${promo.slug}`);
    generated += 1;
    console.log(`art ${generated}/${promotions.length} ${promo.slug}`);
  }

  await browser.close();

  const report = {
    totalPromotions: promotions.length,
    dedicatedArtwork: generated,
    fallbackThemes: fallbacks,
    missing: 0,
    outDir: "public/promotions",
  };
  fs.writeFileSync(
    path.join(ROOT, "qa-screenshots", "promotion-artwork-report.json"),
    JSON.stringify(report, null, 2),
  );
  console.log(JSON.stringify(report, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
