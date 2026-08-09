const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const OUT = path.join("qa-screenshots", "p0-mobile-header");
fs.mkdirSync(OUT, { recursive: true });

const views = [
  ["desktop", 1440, 900],
  ["mobile-375", 375, 812],
  ["mobile-390", 390, 844],
  ["mobile-430", 430, 932],
  ["tablet-768", 768, 1024],
];

async function main() {
  const browser = await chromium.launch();
  const report = [];

  for (const [label, w, h] of views) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await ctx.newPage();
    await page.goto("http://localhost:3000/en", {
      waitUntil: "domcontentloaded",
      timeout: 120000,
    });
    await page.waitForTimeout(600);

    const metrics = await page.evaluate(() => {
      const header = document.querySelector("header");
      const r = header?.getBoundingClientRect();
      const links = [...document.querySelectorAll("header a")]
        .map((a) => ({
          text: (a.textContent || "").trim().replace(/\s+/g, " "),
          href: a.getAttribute("href") || "",
          visible: !!(a.offsetWidth || a.offsetHeight),
        }))
        .filter((x) => x.visible && x.text);
      const menuBtn = document.querySelector(
        'header button[aria-controls="mobile-navigation-panel"]',
      );
      const menuVisible = !!(
        menuBtn &&
        (menuBtn.offsetWidth || menuBtn.offsetHeight)
      );
      return {
        headerH: r ? Math.round(r.height) : null,
        overflowX:
          document.documentElement.scrollWidth > window.innerWidth + 2,
        visibleLinkTexts: links.map((l) => l.text),
        hasLogin: links.some((l) => /log\s*in/i.test(l.text)),
        hasRegister: links.some((l) => /register/i.test(l.text)),
        hasMenuBtn: menuVisible,
      };
    });

    await page.locator("header").screenshot({
      path: path.join(OUT, `${label}-header.png`),
      animations: "disabled",
    });
    await page.screenshot({
      path: path.join(OUT, `${label}-top.png`),
      animations: "disabled",
      clip: { x: 0, y: 0, width: w, height: Math.min(180, h) },
    });

    report.push({ label, w, ...metrics });
    console.log(
      `${label} h=${metrics.headerH} login=${metrics.hasLogin} register=${metrics.hasRegister} menu=${metrics.hasMenuBtn} ov=${metrics.overflowX} [${metrics.visibleLinkTexts.join(" | ")}]`,
    );
    await ctx.close();
  }

  fs.writeFileSync(
    path.join(OUT, "summary.json"),
    JSON.stringify(report, null, 2),
  );
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
