const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const PAGES = [
  ["support", "/en/support"],
  ["faq", "/en/faq"],
  ["payment", "/en/payment"],
  ["download", "/en/download"],
  ["responsible-gaming", "/en/responsible-gaming"],
  ["about", "/en/about"],
  ["editorial-policy", "/en/editorial-policy"],
  ["about-our-team", "/en/about-our-team"],
  ["contact", "/en/contact"],
];

function wordCount(text) {
  return (text || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean).length;
}

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const report = [];

  for (const [key, url] of PAGES) {
    await page.goto(`http://localhost:3000${url}`, {
      waitUntil: "domcontentloaded",
      timeout: 120000,
    });
    await page.waitForTimeout(500);

    const metrics = await page.evaluate(() => {
      const hero = !!document.querySelector(".home-v2-hero--split");
      const summary = document.querySelectorAll("#support-summary li").length;
      const content = document.querySelector("#trust-content");
      const contentText = content ? content.innerText : "";
      const faq = document.querySelectorAll("#trust-faq details, #trust-faq button, #trust-faq [data-faq-item]").length;
      const faqItems = document.querySelectorAll("#trust-faq details").length
        || document.querySelectorAll("#trust-faq li").length
        || document.querySelectorAll('[id=\"trust-faq\"] summary').length;
      const visuals = document.querySelectorAll('section.home-v2-section[id]:not(#support-final-cta)').length;
      // count visual sections by id pattern excluding summary/cta
      const visualSections = [...document.querySelectorAll("section[id]")].filter((el) => {
        const id = el.id;
        return ![
          "trust-hero",
          "support-summary",
          "trust-toc",
          "trust-content",
          "trust-faq",
          "trust-author",
          "trust-related",
          "trust-internal-links",
          "support-final-cta",
        ].includes(id) && el.querySelector(".home-v2-split");
      }).length;
      const imgs = [...document.querySelectorAll("main img, header img, section img")]
        .map((img) => img.getAttribute("src") || "")
        .filter((src) => src && !src.includes("placeholder") && !src.includes("data:"));
      const uniqueImgs = [...new Set(imgs.map((s) => s.split("&")[0]))];
      const related = document.querySelectorAll("#trust-related a").length;
      const chips = document.querySelectorAll("#trust-internal-links a").length;
      const hasFinalCta = !!document.querySelector("#support-final-cta");
      const placeholder = /placeholder-media|【中文待補】|Lorem ipsum/i.test(document.body.innerText);
      const jsonLd = [...document.querySelectorAll('script[type="application/ld+json"]')]
        .map((s) => s.textContent || "")
        .join("\n");
      const schema = {
        faq: /FAQPage/.test(jsonLd),
        breadcrumb: /BreadcrumbList/.test(jsonLd),
        org: /Organization/.test(jsonLd),
        image: /ImageObject/.test(jsonLd),
        webpage: /WebPage|AboutPage|FAQPage|CollectionPage/.test(jsonLd),
      };
      const h1 = (document.querySelector("h1")?.innerText || "").trim();
      const title = document.title;
      return {
        hero,
        summary,
        contentWords: contentText.replace(/\s+/g, " ").trim().split(" ").filter(Boolean).length,
        faqDetails: document.querySelectorAll("#trust-faq details").length,
        faqSummaries: document.querySelectorAll("#trust-faq summary").length,
        visualSections,
        imageCount: uniqueImgs.length,
        related,
        chips,
        hasFinalCta,
        placeholder,
        schema,
        h1,
        title,
      };
    });

    // Prefer accordion count
    const faqCount = Math.max(metrics.faqDetails, metrics.faqSummaries);
    report.push({
      key,
      url,
      ...metrics,
      faqCount,
      internalLinks: metrics.related + metrics.chips,
    });
    console.log(
      `${key} hero=${metrics.hero} summary=${metrics.summary} words=${metrics.contentWords} faq=${faqCount} visuals=${metrics.visualSections} imgs=${metrics.imageCount} links=${metrics.related + metrics.chips} cta=${metrics.hasFinalCta} ph=${metrics.placeholder} schema=${JSON.stringify(metrics.schema)}`,
    );
  }

  fs.mkdirSync("qa-screenshots/support-hub", { recursive: true });
  fs.writeFileSync(
    path.join("qa-screenshots/support-hub", "report.json"),
    JSON.stringify(report, null, 2),
  );
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
