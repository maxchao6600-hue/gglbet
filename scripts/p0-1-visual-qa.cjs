/**
 * P0-1 visual verification — desktop + mobile screenshots.
 * Run: node scripts/p0-1-visual-qa.mjs
 */
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const BASE = process.env.QA_BASE || "http://localhost:3000";
const OUT = path.join("qa-screenshots", process.env.QA_OUT || "p0-1");

const DESKTOP = [1920, 1440, 1366];
const MOBILE = [375, 390, 768];

const PAGES = [
  {
    key: "home",
    path: "/en",
    sections: {
      hero: "#home-hero, [aria-labelledby='home-hero-heading'], .home-v2-hero--split",
      content: "#featured-games, #home-providers, main section.home-v2-section",
      faq: "#home-faq, [id*='faq']",
      cta: "[id*='final'], [id*='cta'], .home-v2-section.border-t",
      footer: "footer",
    },
  },
  {
    key: "support",
    path: "/en/support",
    sections: {
      hero: "#support-hero, .home-v2-hero--split",
      content: "#support-links",
      faq: "#support-faq",
      cta: "#support-cta",
      footer: "footer",
    },
  },
  {
    key: "about",
    path: "/en/about",
    sections: {
      hero: "#trust-hero, .home-v2-hero--split",
      content: "#trust-content",
      faq: "#trust-faq",
      cta: "#trust-related, #trust-internal-links",
      footer: "footer",
    },
  },
  {
    key: "provider-detail",
    path: "/en/provider/pragmatic-play",
    sections: {
      hero: "#provider-hero",
      content: "#provider-overview, #provider-popular-games",
      faq: "#provider-faq",
      cta: "#provider-final-cta, [id*='final-cta'], [id*='cta']",
      footer: "footer",
    },
  },
  {
    key: "game-detail",
    path: "/en/game/hacksaw/ze-zeus",
    sections: {
      hero: "#game-hero",
      content: "#game-specs, #game-overview, [id*='overview']",
      faq: "#game-faq",
      cta: "#game-final-cta",
      footer: "footer",
    },
  },
  {
    key: "faq",
    path: "/en/faq",
    sections: {
      hero: "#trust-hero, .home-v2-hero--split",
      content: "#trust-content",
      faq: "#trust-faq",
      cta: "#trust-related, #trust-internal-links",
      footer: "footer",
    },
  },
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

async function firstVisible(page, selectorList) {
  const parts = selectorList.split(",").map((s) => s.trim()).filter(Boolean);
  for (const sel of parts) {
    const loc = page.locator(sel).first();
    if ((await loc.count()) > 0) {
      try {
        if (await loc.isVisible()) return loc;
      } catch {
        /* continue */
      }
    }
  }
  return null;
}

async function shotSection(page, outDir, name, selectorList) {
  const loc = await firstVisible(page, selectorList);
  if (!loc) {
    fs.writeFileSync(
      path.join(outDir, `${name}__MISSING.txt`),
      `Missing selector: ${selectorList}\n`,
    );
    return { name, ok: false, reason: "missing" };
  }
  await loc.scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  await loc.screenshot({
    path: path.join(outDir, `${name}.png`),
    animations: "disabled",
  });
  return { name, ok: true };
}

async function analyzePage(page) {
  return page.evaluate(() => {
    const glass = document.querySelectorAll(".home-v2-glass").length;
    const glow = document.querySelectorAll(".home-v2-section__bg, .home-v2-section").length;
    const splitHero = document.querySelectorAll(".home-v2-hero--split").length;
    const plainCards = document.querySelectorAll(
      ".rounded-card.border.border-border.bg-card",
    ).length;
    const buttons = document.querySelectorAll("a[class*='rounded-control'], button[class*='rounded-control']").length;
    const overflowX = document.documentElement.scrollWidth > window.innerWidth + 2;
    const hero = document.querySelector(".home-v2-hero--split, #provider-hero, #game-hero");
    let heroStyle = "none";
    if (hero?.classList.contains("home-v2-hero--split")) heroStyle = "split";
    else if (hero) heroStyle = "legacy-section";
    return { glass, glow, splitHero, plainCards, buttons, overflowX, heroStyle };
  });
}

async function runViewport(browser, width, height, label) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  const report = [];

  for (const entry of PAGES) {
    const dir = path.join(OUT, label, `${width}`, entry.key);
    ensureDir(dir);
    const url = `${BASE}${entry.path}`;
    const row = { page: entry.key, width, label, url, sections: [], metrics: null, error: null };
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 120000 });
      await page.waitForTimeout(400);
      // full page overview
      await page.screenshot({
        path: path.join(dir, `_full.png`),
        fullPage: true,
        animations: "disabled",
      });
      row.metrics = await analyzePage(page);
      for (const [name, sel] of Object.entries(entry.sections)) {
        row.sections.push(await shotSection(page, dir, name, sel));
      }
    } catch (err) {
      row.error = String(err);
      fs.writeFileSync(path.join(dir, `_ERROR.txt`), String(err));
    }
    report.push(row);
    console.log(
      `[${label} ${width}] ${entry.key} hero=${row.metrics?.heroStyle} glass=${row.metrics?.glass} plain=${row.metrics?.plainCards} overflow=${row.metrics?.overflowX}`,
    );
  }

  await context.close();
  return report;
}

async function main() {
  ensureDir(OUT);
  const browser = await chromium.launch({ headless: true });
  const all = [];

  for (const w of DESKTOP) {
    all.push(...(await runViewport(browser, w, 1080, "desktop")));
  }
  for (const w of MOBILE) {
    all.push(...(await runViewport(browser, w, w === 768 ? 1024 : 812, "mobile")));
  }

  await browser.close();
  const summaryPath = path.join(OUT, "summary.json");
  fs.writeFileSync(summaryPath, JSON.stringify(all, null, 2));
  console.log(`Wrote ${summaryPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
