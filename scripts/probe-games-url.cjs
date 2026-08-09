const fs = require("fs");
const https = require("https");

function fetch(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            "User-Agent": "Mozilla/5.0",
            Accept: "*/*",
            Origin: "https://www.gglbet5.com",
            Referer: "https://www.gglbet5.com/",
          },
          timeout: 60000,
        },
        (res) => {
          const chunks = [];
          res.on("data", (c) => chunks.push(c));
          res.on("end", () =>
            resolve({
              status: res.statusCode,
              headers: res.headers,
              body: Buffer.concat(chunks).toString("utf8"),
            }),
          );
        },
      )
      .on("error", reject);
  });
}

async function main() {
  const main = fs.readFileSync("scripts/_spa-chunk.js", "utf8");

  // Extract gamesUrl and related config snippets
  const around = (needle, radius = 250) => {
    let i = 0;
    let n = 0;
    while ((i = main.indexOf(needle, i)) !== -1 && n < 8) {
      console.log("\n--", needle, "@", i);
      console.log(main.slice(Math.max(0, i - radius), i + radius).replace(/\s+/g, " "));
      i += needle.length;
      n++;
    }
  };

  around("gamesUrl");
  around("loadDataFromNewAPI");
  around("onlyProviders");
  around("getProviders");
  around("providersViewList");
  around("ProvidersKinds");
  around("providerImages");
  around("/layouts");

  // Search for CDN hostnames
  const hosts = [
    ...main.matchAll(/https:\/\/[a-z0-9.\-]+/gi),
  ].map((m) => m[0]);
  const uniq = [...new Set(hosts)].filter((h) =>
    /betconstruct|cdn|media|cms|game|casino|ggl/i.test(h),
  );
  console.log("\nHOSTS", uniq);

  // Try common BC games dump URLs
  const site = 891;
  const urls = [
    `https://cms.vmemkhhgjigrjefb.com/api/public/v1/eng/casino/partners/${site}/platforms/0/layouts`,
    `https://cms.vmemkhhgjigrjefb.com/api/public/v1/eng/casino/partners/${site}/platforms/0/layouts?partner_id=${site}`,
    `https://go-cms.vmemkhhgjigrjefb.com/api/public/v1/eng/casino/partners/${site}/platforms/0/layouts`,
    `https://cms.vmemkhhgjigrjefb.com/storage/medias/gglbet/`,
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url);
      console.log(res.status, res.body.length, url);
      console.log(res.body.slice(0, 220).replace(/\s+/g, " "));
      if (res.body.includes('"success":true') || res.body.length > 1000) {
        fs.writeFileSync("scripts/_layout-hit.json", res.body.slice(0, 500000));
      }
    } catch (e) {
      console.log("ERR", url, e.message);
    }
  }
}

main().catch(console.error);
