"use strict";

const fs = require("fs");
const http = require("http");
const path = require("path");

const OUT = path.join(__dirname, "..", "out");
const BASE = process.env.STATIC_BASE || "http://127.0.0.1:4173";

function readMeta(file) {
  const html = fs.readFileSync(file, "utf8");
  const grab = (re) => {
    const m = html.match(re);
    return m ? m[1] : null;
  };
  const hreflang = [
    ...html.matchAll(/hreflang="([^"]+)"[^>]*href="([^"]+)"/g),
  ].map((m) => `${m[1]}→${m[2]}`);
  if (!hreflang.length) {
    hreflang.push(
      ...[...html.matchAll(/href="([^"]+)"[^>]*hreflang="([^"]+)"/g)].map(
        (m) => `${m[2]}→${m[1]}`,
      ),
    );
  }
  return {
    title: grab(/<title[^>]*>([^<]*)<\/title>/i),
    canonical: grab(/rel="canonical"[^>]*href="([^"]+)"/i) || grab(/href="([^"]+)"[^>]*rel="canonical"/i),
    robots: grab(/name="robots"[^>]*content="([^"]*)"/i),
    description: grab(/name="description"[^>]*content="([^"]*)"/i),
    ogTitle: grab(/property="og:title"[^>]*content="([^"]*)"/i),
    hreflang,
  };
}

function get(urlPath) {
  return new Promise((resolve) => {
    const url = `${BASE}${urlPath}`;
    const req = http.get(url, { timeout: 15000 }, (res) => {
      let body = "";
      res.on("data", (c) => {
        body += c;
      });
      res.on("end", () => {
        resolve({
          path: urlPath,
          status: res.statusCode,
          type: res.headers["content-type"] || "",
          len: body.length,
          title: (body.match(/<title[^>]*>([^<]*)<\/title>/i) || [])[1] || null,
        });
      });
    });
    req.on("error", (err) => {
      resolve({ path: urlPath, status: 0, error: String(err) });
    });
  });
}

async function main() {
  console.log("=== HTML META (filesystem) ===");
  for (const rel of [
    "index.html",
    "zh/index.html",
    "games/index.html",
    "zh/games/index.html",
    "providers/index.html",
    "zh/providers/index.html",
  ]) {
    const meta = readMeta(path.join(OUT, rel));
    console.log(rel, JSON.stringify(meta, null, 0));
  }

  const routes = [
    "/",
    "/zh",
    "/zh/",
    "/games",
    "/games/",
    "/zh/games",
    "/zh/games/",
    "/providers/",
    "/zh/providers/",
    "/promotions/",
    "/zh/promotions/",
    "/guides/",
    "/zh/guides/",
    "/news/",
    "/zh/news/",
    "/sitemap.xml",
    "/sitemap-en.xml",
    "/sitemap-zh.xml",
    "/news-sitemap.xml",
    "/image-sitemap.xml",
    "/robots.txt",
  ];

  console.log("\n=== HTTP STATIC SERVER ===");
  for (const r of routes) {
    const result = await get(r);
    console.log(JSON.stringify(result));
  }

  console.log("\n=== EN↔ZH NAV LINKS ===");
  for (const p of ["/", "/zh/", "/games/", "/zh/games/"]) {
    const html = await new Promise((resolve, reject) => {
      http.get(`${BASE}${p}`, (res) => {
        let body = "";
        res.on("data", (c) => {
          body += c;
        });
        res.on("end", () => resolve(body));
      }).on("error", reject);
    });
    const alts = [
      ...html.matchAll(/hrefLang="([^"]+)" href="([^"]+)"/g),
    ].map((m) => `${m[1]}=${m[2]}`);
    const switchLinks = [
      ...html.matchAll(/hrefLang="(en|zh-Hant)" class="[^"]*"[^>]*>(EN|中文)</g),
    ].map((m) => m[0]);
    // LanguageSwitch anchors
    const enA = /href="(\/|\/games\/|\/[^"]*)"[^>]*hrefLang="en"/i.test(html) ||
      /hrefLang="en"[^>]*href="([^"]+)"/.test(html);
    const zhA = html.includes('hrefLang="zh-Hant"');
    console.log(
      JSON.stringify({
        path: p,
        alternates: alts,
        hasEnAlt: alts.some((a) => a.startsWith("en=")),
        hasZhAlt: alts.some((a) => a.startsWith("zh-Hant=")),
        hasLangSwitchMarkers: /aria-label="Language"/.test(html),
        switchSnippet: (() => {
          const i = html.indexOf('aria-label="Language"');
          return i >= 0 ? html.slice(i, i + 350).replace(/\s+/g, " ") : null;
        })(),
      }),
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
