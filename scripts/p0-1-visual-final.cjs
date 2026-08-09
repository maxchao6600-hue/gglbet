const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const OUT = path.join("qa-screenshots", "p0-1-final");
const pages = [
  ["home", "/en"],
  ["support", "/en/support"],
  ["about", "/en/about"],
  ["provider-detail", "/en/provider/pragmatic-play"],
  ["game-detail", "/en/game/hacksaw/ze-zeus"],
  ["faq", "/en/faq"],
];
const viewports = [
  [1920, 1080, "desktop"],
  [1440, 900, "desktop"],
  [1366, 768, "desktop"],
  [375, 812, "mobile"],
  [390, 844, "mobile"],
  [768, 1024, "mobile"],
];

async function main() {
  const browser = await chromium.launch();
  const report = [];
  for (const [w, h, label] of viewports) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await ctx.newPage();
    for (const [key, url] of pages) {
      const dir = path.join(OUT, label, String(w), key);
      fs.mkdirSync(dir, { recursive: true });
      await page.goto(`http://localhost:3000${url}`, {
        waitUntil: "networkidle",
        timeout: 120000,
      });
      await page.waitForTimeout(300);
      const m = await page.evaluate(() => ({
        hero: document.querySelector(".home-v2-hero--split") ? "split" : "legacy",
        glass: document.querySelectorAll(".home-v2-glass").length,
        plain: document.querySelectorAll(
          ".rounded-card.border.border-border.bg-card",
        ).length,
        overflow: document.documentElement.scrollWidth > window.innerWidth + 2,
      }));
      report.push({ key, w, label, ...m });
      const sections = {
        hero: "#home-hero, #support-hero, #trust-hero, #provider-hero, #game-hero, .home-v2-hero--split",
        content:
          "#support-links, #trust-content, #provider-overview, #game-overview, #featured-games, main section",
        faq: "#support-faq, #trust-faq, #provider-faq, #game-faq, [id*='faq']",
        cta: "#support-cta, #provider-final-cta, #game-final-cta, [id*='final-cta'], [id*='cta']",
        footer: "footer",
      };
      for (const [name, sel] of Object.entries(sections)) {
        const parts = sel.split(",").map((s) => s.trim());
        let shot = false;
        for (const s of parts) {
          const loc = page.locator(s).first();
          if ((await loc.count()) > 0) {
            try {
              if (await loc.isVisible()) {
                await loc.scrollIntoViewIfNeeded();
                await page.waitForTimeout(120);
                await loc.screenshot({
                  path: path.join(dir, `${name}.png`),
                  animations: "disabled",
                });
                shot = true;
                break;
              }
            } catch {
              /* continue */
            }
          }
        }
        if (!shot) fs.writeFileSync(path.join(dir, `${name}__MISSING.txt`), sel);
      }
      await page.screenshot({
        path: path.join(dir, "_full.png"),
        fullPage: true,
        animations: "disabled",
      });
      console.log(
        `${label} ${w} ${key} ${m.hero} glass=${m.glass} plain=${m.plain} ov=${m.overflow}`,
      );
    }
    await ctx.close();
  }
  fs.writeFileSync(path.join(OUT, "summary.json"), JSON.stringify(report, null, 2));
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
