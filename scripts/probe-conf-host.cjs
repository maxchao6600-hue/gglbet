const https = require("https");
const fs = require("fs");

function fetch(url, opts = {}) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = https.request(
      {
        hostname: u.hostname,
        path: u.pathname + u.search,
        method: opts.method || "GET",
        headers: {
          "User-Agent": "Mozilla/5.0",
          Accept: "application/json",
          "Content-Key-Case": "camel",
          Origin: "https://www.gglbet5.com",
          Referer: "https://www.gglbet5.com/en/casino/slots",
          ...(opts.headers || {}),
        },
        timeout: 60000,
      },
      (res) => {
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () =>
          resolve({
            status: res.statusCode,
            body: Buffer.concat(chunks).toString("utf8"),
          }),
        );
      },
    );
    req.on("error", reject);
    if (opts.body) req.write(opts.body);
    req.end();
  });
}

async function main() {
  const conf = JSON.parse(
    (await fetch("https://www.gglbet5.com/conf.json")).body,
  );
  fs.writeFileSync(
    "lib/cms/seed/content/providers/official/gglbet5-conf-full.json",
    JSON.stringify(conf, null, 2),
  );
  console.log("cms", conf.cms);
  console.log("site", conf.site_id || conf.siteId || conf.app?.site_id);
  console.log(
    "keys",
    Object.keys(conf).filter((k) =>
      /cms|site|game|casino|icon|cdn|cache|swarm/i.test(k),
    ),
  );

  // Dump nested cms/app
  if (conf.cms) console.log("cms full", JSON.stringify(conf.cms, null, 2));
  if (conf.app) {
    console.log(
      "app keys",
      Object.keys(conf.app).filter((k) =>
        /site|cms|game|casino|icon|cdn|cache|swarm/i.test(k),
      ),
    );
    console.log("site_id", conf.app.site_id);
    console.log("swarm", conf.app.swarm);
  }

  // Try partner hostname based CMS URLs
  const hosts = ["www.gglbet5.com", "gglbet5.com", "891"];
  for (const host of hosts) {
    const urls = [
      `https://cms.vmemkhhgjigrjefb.com/api/public/v1/en/partners/${host}/banners?platform=0&use_webp=1`,
      `https://cms.vmemkhhgjigrjefb.com/api/public/v1/eng/casino/partners/${host}/platforms/0`,
      `https://cms.vmemkhhgjigrjefb.com/api/public/v1/eng/casino/partners/${host}/platforms/0/games`,
    ];
    for (const url of urls) {
      const res = await fetch(url);
      const ok = res.body.includes('"success":true');
      console.log(ok ? "OK" : "NO", res.status, res.body.length, url);
      if (ok) console.log(res.body.slice(0, 200));
    }
  }

  // Try Swarm HTTP endpoints for casino
  const swarmBodies = [
    {
      command: "get",
      params: { source: "config.casino", what: { gameProviders: [] }, subscribe: false },
    },
    {
      command: "get",
      params: {
        source: "casino.gameProviders",
        what: { gameProviders: [] },
        subscribe: false,
      },
    },
  ];

  // Also try icons CDN listing patterns for known providers
  const iconTries = [
    "https://icons.cmsbetconstruct.com/providers/",
    "https://icons.cmsbetconstruct.com/",
    "https://cmsbetconstruct.com/storage/",
  ];
  for (const url of iconTries) {
    const res = await fetch(url);
    console.log("ICON", res.status, res.body.length, url, res.body.slice(0, 120).replace(/\s+/g, " "));
  }
}

main().catch(console.error);
