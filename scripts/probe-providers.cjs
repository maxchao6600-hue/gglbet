const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

function fetch(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    const req = lib.get(
      url,
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
          "Content-Key-Case": "camel",
          Accept: "application/json,text/html,*/*",
        },
        timeout: 30000,
      },
      (res) => {
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => {
          resolve({
            status: res.statusCode,
            body: Buffer.concat(chunks).toString("utf8"),
            headers: res.headers,
          });
        });
      },
    );
    req.on("error", reject);
    req.on("timeout", () => {
      req.destroy();
      reject(new Error("timeout"));
    });
  });
}

async function main() {
  const confRes = await fetch("https://www.gglbet5.com/conf.json");
  const conf = JSON.parse(confRes.body);
  fs.writeFileSync(
    path.join("lib/cms/seed/content/providers/official/gglbet5-conf-snippet.json"),
    JSON.stringify(
      {
        site_id: conf.site_id || conf.siteId || conf.app?.siteId,
        cms: conf.cms || conf.cmsUrl,
        enabledProducts: conf.enabledProducts,
        gameKeys: Object.keys(conf).filter((k) =>
          /game|casino|provider|cdn|media|swarm/i.test(k),
        ),
      },
      null,
      2,
    ),
  );

  const home = await fetch("https://www.gglbet5.com/en/");
  const assets = [...home.body.matchAll(/\/assets\/[^"'\\s]+\.js/g)].map(
    (m) => m[0],
  );
  console.log("assets", assets.slice(0, 8));

  const base = "https://cms.vmemkhhgjigrjefb.com/api/public/v1/en/partners/891";
  const candidates = [
    `${base}/casino/games?platform=0&use_webp=1&limit=20&paginate=1`,
    `${base}/casino/games?platform=0&use_webp=1&is_list=1`,
    `${base}/live-casino/games?platform=0&use_webp=1&limit=20&paginate=1`,
    `${base}/categories/casino?platform=0&use_webp=1`,
    `${base}/categories/live-casino?platform=0&use_webp=1`,
    `${base}/filters?platform=0`,
    `${base}/casino/filters?platform=0`,
    `${base}/game-providers?platform=0`,
    `${base}/partner-games?platform=0&limit=20`,
    `https://www.gglbet5.com/global/js/config.js`,
  ];

  for (const url of candidates) {
    try {
      const res = await fetch(url);
      console.log(res.status, res.body.length, url);
      console.log(" ", res.body.slice(0, 160).replace(/\s+/g, " "));
    } catch (e) {
      console.log("ERR", url, e.message);
    }
  }

  // Search main SPA chunk for provider API patterns
  if (assets[0]) {
    const jsUrl = `https://www.gglbet5.com${assets[0]}`;
    const js = await fetch(jsUrl);
    fs.writeFileSync("scripts/_spa-chunk.js", js.body);
    const patterns = [
      /providers[^\"']{0,40}/gi,
      /\/casino\/[a-z\-]+/gi,
      /gameProvider/gi,
      /provider_id/gi,
      /getProviders/gi,
    ];
    for (const p of patterns) {
      const hits = [...js.body.matchAll(p)].slice(0, 15).map((m) => m[0]);
      if (hits.length) console.log("HIT", p, hits);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
