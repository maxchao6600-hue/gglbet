const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const OUT = path.join("qa-screenshots", "p0-2-global-hero");
const BASE = process.env.QA_BASE || "http://localhost:3000";

const PAGES = [
  ["home", "/en"],
  ["games", "/en/games"],
  ["game-detail", "/en/game/pragmatic-play/gates-of-olympus"],
  ["providers", "/en/providers"],
  ["provider-detail", "/en/provider/pragmatic-play"],
  ["promotions", "/en/promotions"],
  ["promotion-detail", "/en/promotion/daily-188-free-spins-200-1026182"],
  ["guides", "/en/guides"],
  ["guide-detail", "/en/guide/beginner/how-to-get-started-on-gglbet"],
  ["news", "/en/news"],
  ["news-detail", "/en/news/promotions/singapore-national-day-61-official-announcement"],
];

async function resolveUrl(page, key, url) {
  if (!key.includes("detail") || key === "provider-detail") return url;
  try {
    const res = await page.goto(`${BASE}${url}`, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    if (res && res.status() < 400 && (await page.locator(".home-v2-hero--split").count())) {
      return url;
    }
  } catch {
    /* discover */
  }
  const listing =
    key === "game-detail"
      ? "/en/games"
      : key === "promotion-detail"
        ? "/en/promotions"
        : key === "guide-detail"
          ? "/en/guides"
          : "/en/news";
  const needle =
    key === "game-detail"
      ? "/game/"
      : key === "promotion-detail"
        ? "/promotion/"
        : key === "guide-detail"
          ? "/guide/"
          : "/news/";
  await page.goto(`${BASE}${listing}`, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  const hrefs = await page.$$eval("a[href]", (as, n) =>
    as
      .map((a) => a.getAttribute("href") || "")
      .filter((h) => h.includes(n) && h.split("/").length >= 4),
    needle,
  );
  const pick = hrefs.find((h) => !h.endsWith("/news") && h.split("/").filter(Boolean).length >= 3);
  if (!pick) return url;
  if (pick.startsWith("http")) return pick;
  if (pick.startsWith("/en/") || pick.startsWith("/zh/")) return pick;
  return `/en${pick.startsWith("/") ? pick : `/${pick}`}`;
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const report = [];

  for (const [w, h, label] of [
    [1440, 900, "desktop"],
    [390, 844, "mobile"],
  ]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await ctx.newPage();

    for (const [key, seedUrl] of PAGES) {
      const url = await resolveUrl(page, key, seedUrl);
      await page.goto(url.startsWith("http") ? url : `${BASE}${url}`, {
        waitUntil: "domcontentloaded",
        timeout: 120000,
      });
      await page.waitForTimeout(450);

      const metrics = await page.evaluate(() => {
        const hero = document.querySelector(".home-v2-hero--split");
        if (!hero) return { ok: false };
        const r = hero.getBoundingClientRect();
        const stage = hero.querySelector(".home-v2-hero__stage");
        const frame = hero.querySelector(".home-v2-hero__visual-frame");
        const img = stage?.querySelector("img");
        const h1 = hero.querySelector("h1");
        const eyebrow = hero.querySelector(".home-v2-hero__copy > p");
        const ctas = hero.querySelectorAll(".home-v2-hero__copy a, .home-v2-hero__copy button");
        const grid = getComputedStyle(
          hero.querySelector(".home-v2-hero__grid") || hero,
        ).gridTemplateColumns;
        return {
          ok: true,
          height: Math.round(r.height),
          hasStage: !!stage,
          hasFrameCard: !!frame,
          imgSrc: img?.getAttribute("src") || img?.currentSrc || "",
          cols: grid,
          hasH1: !!h1,
          hasEyebrow: !!eyebrow,
          ctaCount: ctas.length,
          overflowX:
            (() => {
              const hero = document.querySelector(".home-v2-hero--split");
              if (!hero) return false;
              return hero.scrollWidth > hero.clientWidth + 2;
            })(),
        };
      });

      const dir = path.join(OUT, label, key);
      fs.mkdirSync(dir, { recursive: true });
      const loc = page.locator(".home-v2-hero--split").first();
      if (await loc.count()) {
        await loc.screenshot({
          path: path.join(dir, "hero.png"),
          animations: "disabled",
        });
      }

      const pass =
        metrics.ok &&
        metrics.hasStage &&
        !metrics.hasFrameCard &&
        metrics.hasH1 &&
        metrics.hasEyebrow &&
        metrics.ctaCount >= 1 &&
        !metrics.overflowX;

      report.push({ key, label, w, pass, ...metrics, url });
      console.log(
        `${pass ? "PASS" : "FAIL"} ${label} ${key} h=${metrics.height} stage=${metrics.hasStage} frame=${metrics.hasFrameCard} ctas=${metrics.ctaCount} src=${(metrics.imgSrc || "").slice(0, 60)}`,
      );
    }
    await ctx.close();
  }

  await browser.close();
  fs.writeFileSync(path.join(OUT, "report.json"), JSON.stringify(report, null, 2));
  const fails = report.filter((r) => !r.pass);
  console.log(`\n${report.length - fails.length}/${report.length} pass`);
  if (fails.length) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
