const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const OUT = path.join("qa-screenshots", "support-freeze");
const BASE = process.env.QA_BASE || "http://localhost:3000";

const PAGES = [
  ["support", "/en/support", "/zh/support"],
  ["faq", "/en/faq", "/zh/faq"],
  ["payment", "/en/payment", "/zh/payment"],
  ["download", "/en/download", "/zh/download"],
  ["responsible-gaming", "/en/responsible-gaming", "/zh/responsible-gaming"],
  ["about", "/en/about", "/zh/about"],
  ["editorial-policy", "/en/editorial-policy", "/zh/editorial-policy"],
  ["about-our-team", "/en/about-our-team", "/zh/about-our-team"],
  ["contact", "/en/contact", "/zh/contact"],
];

async function shot(page, file) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  await page.screenshot({ path: file, fullPage: false, animations: "disabled" });
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const megaReport = { en: [], zh: [], zhEnglishResidue: [] };

  for (const [label, w, h] of [
    ["desktop", 1440, 900],
    ["mobile", 390, 844],
  ]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await ctx.newPage();
    for (const [key, en, zh] of PAGES) {
      for (const [loc, url] of [
        ["en", en],
        ["zh", zh],
      ]) {
        await page.goto(`${BASE}${url}`, {
          waitUntil: "domcontentloaded",
          timeout: 120000,
        });
        await page.waitForTimeout(500);
        const dir = path.join(OUT, label, loc, key);
        fs.mkdirSync(dir, { recursive: true });
        await shot(page, path.join(dir, "viewport.png"));
        const hero = page.locator(".home-v2-hero--split").first();
        if (await hero.count()) {
          await hero.screenshot({
            path: path.join(dir, "hero.png"),
            animations: "disabled",
          });
        }
        console.log(`${label} ${loc} ${key}`);
      }
    }
    await ctx.close();
  }

  // Mega menu bilingual check (desktop only)
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  for (const [loc, url] of [
    ["en", "/en/support"],
    ["zh", "/zh/support"],
  ]) {
    await page.goto(`${BASE}${url}`, {
      waitUntil: "domcontentloaded",
      timeout: 120000,
    });
    await page.waitForTimeout(400);
    const supportBtn = page
      .locator("nav button")
      .filter({ hasText: loc === "zh" ? "支援" : "Support" })
      .first();
    await supportBtn.hover();
    await page.waitForTimeout(300);
    const panel = page.locator("nav [id]").filter({ hasText: loc === "zh" ? "協助" : "Help" }).first();
    const text = (await panel.innerText()).trim();
    megaReport[loc] = text.split(/\n+/).map((s) => s.trim()).filter(Boolean);
    if (loc === "zh") {
      const latinOnly = megaReport.zh.filter((line) =>
        /^[A-Za-z][A-Za-z0-9 &/'-]*$/.test(line),
      );
      // Allow brand tokens
      megaReport.zhEnglishResidue = latinOnly.filter(
        (line) => !/^(GGLBET|FAQ|APP|VIP)$/i.test(line) && line !== "GGLBET",
      );
    }
    await shot(page, path.join(OUT, "mega", `${loc}-support-panel.png`));
    console.log(`mega ${loc} lines=${megaReport[loc].length}`);
  }
  await ctx.close();
  await browser.close();

  fs.writeFileSync(
    path.join(OUT, "mega-bilingual.json"),
    JSON.stringify(megaReport, null, 2),
  );
  if (megaReport.zhEnglishResidue.length) {
    console.error("ZH mega English residue:", megaReport.zhEnglishResidue);
    process.exit(1);
  }
  console.log("OK freeze shots + mega bilingual");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
