const fs = require("fs");
const https = require("https");

const main = fs.readFileSync("scripts/_spa-chunk.js", "utf8");

function around(needle, n = 5, radius = 300) {
  let idx = 0;
  let c = 0;
  while ((idx = main.indexOf(needle, idx)) !== -1 && c < n) {
    console.log(`\n-- ${needle} @${idx}`);
    console.log(main.slice(Math.max(0, idx - radius), idx + radius).replace(/\s+/g, " "));
    idx += needle.length;
    c++;
  }
}

around("getBaseUrl", 8);
around("cacheLayerSubdomain", 8);
around("iconUrl", 5);
around("OPTIONS_PROVIDERS", 3);

function fetch(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            "User-Agent": "Mozilla/5.0",
            "Content-Key-Case": "camel",
            Accept: "application/json",
            Origin: "https://www.gglbet5.com",
            Referer: "https://www.gglbet5.com/en/casino/slots",
          },
          timeout: 120000,
        },
        (res) => {
          const chunks = [];
          res.on("data", (d) => chunks.push(d));
          res.on("end", () =>
            resolve({
              status: res.statusCode,
              body: Buffer.concat(chunks).toString("utf8"),
            }),
          );
        },
      )
      .on("error", reject);
  });
}

(async () => {
  // Try go-cms and alternative hosts with /providers and /pages/1
  const hosts = [
    "https://cms.vmemkhhgjigrjefb.com",
    "https://go-cms.vmemkhhgjigrjefb.com",
    "https://cmsbetconstruct.com",
  ];
  const paths = [
    "/api/public/v1/en/partners/891/casino/platforms/0/providers",
    "/api/public/v1/eng/partners/891/casino/platforms/0/providers",
    "/api/public/v1/en/partners/891/casino/platforms/0/games/pages/1",
    "/api/public/v1/eng/partners/891/casino/platforms/0/games/pages/1",
    "/api/public/v1/en/casino/partners/891/platforms/0/providers",
    "/api/public/v1/eng/casino/partners/891/platforms/0/providers",
    "/api/public/v1/en/casino/partners/891/platforms/0/games/pages/1",
  ];
  for (const host of hosts) {
    for (const path of paths) {
      const url = host + path;
      try {
        const res = await fetch(url);
        const ok = res.body.includes('"success":true');
        if (ok || res.body.length > 300) {
          console.log("\nHIT", res.status, res.body.length, url);
          console.log(res.body.slice(0, 400));
          fs.writeFileSync(
            "lib/cms/seed/content/providers/official/hit.json",
            res.body,
          );
          return;
        }
        process.stdout.write(".");
      } catch (e) {
        process.stdout.write("x");
      }
    }
  }
  console.log("\nno large hits");
})();
