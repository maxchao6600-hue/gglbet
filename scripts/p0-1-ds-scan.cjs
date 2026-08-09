/**
 * P0-1 Design System residual scan across all key routes.
 * Counts: Plain Card, Old Section, Old CTA, Old FAQ, Old Hero
 */
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const BASE = "http://localhost:3000";
const PAGES = [
  ["/en", "Home"],
  ["/en/games", "Games"],
  ["/en/providers", "Providers"],
  ["/en/provider/pragmatic-play", "Provider Detail"],
  ["/en/game/hacksaw/ze-zeus", "Game Detail"],
  ["/en/promotions", "Promotions"],
  ["/en/promotion/daily-188-free-spins-200-1026182", "Promotion Detail"],
  ["/en/guides", "Guides"],
  ["/en/guide/beginner/how-to-get-started-on-gglbet", "Guide Detail"],
  ["/en/news", "News"],
  ["/en/support", "Support"],
  ["/en/faq", "FAQ"],
  ["/en/about", "About"],
  ["/en/payment", "Payment"],
  ["/en/download", "Download"],
  ["/en/responsible-gaming", "Responsible Gaming"],
  ["/en/contact", "Contact"],
];

async function analyze(page) {
  return page.evaluate(() => {
    const plainCard = [
      ...document.querySelectorAll(".rounded-card"),
    ].filter((el) => {
      const c = el.className || "";
      const hasPlain =
        c.includes("border-border") &&
        (c.includes("bg-card") || c.includes("shadow-soft"));
      const hasGlass = c.includes("home-v2-glass");
      return hasPlain && !hasGlass;
    }).length;

    const oldFaq = [...document.querySelectorAll("details.rounded-card")].filter(
      (el) => !(el.className || "").includes("home-v2-glass"),
    ).length;

    const oldCta = [
      ...document.querySelectorAll(
        'section[id*="final-cta"], section[id$="-cta"], section[id*="cta"]',
      ),
    ].filter((el) => {
      const id = el.id || "";
      if (id.includes("internal")) return false;
      const c = el.className || "";
      return !c.includes("home-v2-section");
    }).length;

    const oldSection = [
      ...document.querySelectorAll("section.bg-surface, section[class*='bg-surface']"),
    ].filter((el) => {
      const c = el.className || "";
      // muted without glow wash is allowed only if not a CTA/FAQ; count as old if no home-v2-section and looks like major surface
      return !c.includes("home-v2-section") && !c.includes("py-section-sm");
    }).length;

    const heroes = [
      ...document.querySelectorAll(
        '[id$="-hero"], [id*="hero"], .home-v2-hero--split',
      ),
    ];
    const oldHero = heroes.filter((el) => {
      const c = el.className || "";
      const isSplit =
        c.includes("home-v2-hero--split") ||
        el.classList.contains("home-v2-hero--split") ||
        !!el.closest(".home-v2-hero--split");
      // Only count dedicated hero sections
      const id = el.id || "";
      if (!id.includes("hero") && !c.includes("home-v2-hero")) return false;
      return !isSplit;
    }).length;

    return { plainCard, oldFaq, oldCta, oldSection, oldHero };
  });
}

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const rows = [];
  let totals = { plainCard: 0, oldFaq: 0, oldCta: 0, oldSection: 0, oldHero: 0 };

  for (const [url, name] of PAGES) {
    try {
      await page.goto(BASE + url, { waitUntil: "domcontentloaded", timeout: 120000 });
      await page.waitForTimeout(500);
      const m = await analyze(page);
      rows.push({ name, url, ...m });
      for (const k of Object.keys(totals)) totals[k] += m[k];
      console.log(
        `${name.padEnd(22)} plain=${m.plainCard} faq=${m.oldFaq} cta=${m.oldCta} section=${m.oldSection} hero=${m.oldHero}`,
      );
    } catch (err) {
      console.log(`${name} ERR ${err.message}`);
      rows.push({ name, url, error: String(err) });
    }
  }

  await browser.close();
  const out = { totals, rows };
  fs.mkdirSync("qa-screenshots/p0-1-final", { recursive: true });
  fs.writeFileSync(
    path.join("qa-screenshots/p0-1-final", "ds-scan.json"),
    JSON.stringify(out, null, 2),
  );
  console.log("\nTOTALS", totals);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
