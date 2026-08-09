const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const OUT = path.join("qa-screenshots", "p0-2-hero");
const PAGES = [
  ["home", "/en"],
  ["games", "/en/games"],
  ["providers", "/en/providers"],
  ["provider-detail", "/en/provider/pragmatic-play"],
  ["game-detail", "/en/game/hacksaw/ze-zeus"],
  ["promotions", "/en/promotions"],
  ["promotion-detail", "/en/promotion/daily-188-free-spins-200-1026182"],
  ["guides", "/en/guides"],
  ["guide-detail", "/en/guide/beginner/how-to-get-started-on-gglbet"],
  ["news", "/en/news"],
  ["about", "/en/about"],
  ["faq", "/en/faq"],
  ["support", "/en/support"],
  ["payment", "/en/payment"],
  ["download", "/en/download"],
  ["responsible-gaming", "/en/responsible-gaming"],
  ["contact", "/en/contact"],
];

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const report = [];

  for (const [w, h, label] of [
    [1920, 1080, "desktop"],
    [375, 812, "mobile"],
  ]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await ctx.newPage();
    for (const [key, url] of PAGES) {
      const dir = path.join(OUT, label, String(w), key);
      fs.mkdirSync(dir, { recursive: true });
      await page.goto(`http://localhost:3000${url}`, {
        waitUntil: "domcontentloaded",
        timeout: 120000,
      });
      await page.waitForTimeout(400);
      const metrics = await page.evaluate(() => {
        const hero = document.querySelector(".home-v2-hero--split");
        if (!hero) return { ok: false };
        const r = hero.getBoundingClientRect();
        const stage = hero.querySelector(".home-v2-hero__stage");
        const frame = hero.querySelector(".home-v2-hero__visual-frame");
        const img = stage?.querySelector("img");
        const grid = getComputedStyle(
          hero.querySelector(".home-v2-hero__grid") || hero,
        ).gridTemplateColumns;
        return {
          ok: true,
          height: Math.round(r.height),
          width: Math.round(r.width),
          hasStage: !!stage,
          hasFrameCard: !!frame,
          imgSrc: img?.getAttribute("src") || img?.currentSrc || "",
          cols: grid,
          overflowX:
            document.documentElement.scrollWidth > window.innerWidth + 2,
        };
      });
      const loc = page.locator(".home-v2-hero--split").first();
      if (await loc.count()) {
        await loc.screenshot({
          path: path.join(dir, "hero.png"),
          animations: "disabled",
        });
      }
      report.push({ key, label, w, ...metrics });
      console.log(
        `${label} ${w} ${key} h=${metrics.height} stage=${metrics.hasStage} frame=${metrics.hasFrameCard} ov=${metrics.overflowX}`,
      );
    }
    await ctx.close();
  }

  fs.writeFileSync(path.join(OUT, "summary.json"), JSON.stringify(report, null, 2));
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
