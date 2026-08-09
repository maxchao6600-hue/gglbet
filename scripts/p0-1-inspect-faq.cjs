const { chromium } = require("playwright");

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto("http://localhost:3000/en/faq", {
    waitUntil: "networkidle",
    timeout: 120000,
  });
  const info = await p.evaluate(() => {
    const ctas = [
      ...document.querySelectorAll(
        'section[id*="final-cta"], section[id$="-cta"], section[id*="cta"]',
      ),
    ].map((el) => ({ id: el.id, cls: el.className }));
    const secs = [
      ...document.querySelectorAll(
        "section.bg-surface, section[class*='bg-surface']",
      ),
    ]
      .filter((el) => !(el.className || "").includes("home-v2-section"))
      .map((el) => ({ id: el.id, cls: el.className.slice(0, 140) }));
    const all = [...document.querySelectorAll("section[id]")].map(
      (s) => `${s.id} :: ${s.className}`,
    );
    return { ctas, secs, all };
  });
  console.log(JSON.stringify(info, null, 2));
  await b.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
