const https = require("https");
const fs = require("fs");

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
          res.on("data", (c) => chunks.push(c));
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

async function main() {
  const urls = [
    "https://cms.vmemkhhgjigrjefb.com/api/public/v1/en/partners/891/casino/platforms/0",
    "https://cms.vmemkhhgjigrjefb.com/api/public/v1/en/partners/891/casino/platforms/0?use_webp=1",
    "https://cms.vmemkhhgjigrjefb.com/api/public/v1/eng/partners/891/casino/platforms/0",
    "https://cms.vmemkhhgjigrjefb.com/api/public/v1/en/partners/891/casino/platforms/0/games",
    "https://cms.vmemkhhgjigrjefb.com/api/public/v1/en/partners/891/casino/platforms/0/providers",
    "https://cms.vmemkhhgjigrjefb.com/api/public/v1/en/partners/891/casino/platforms/1",
    "https://cms.vmemkhhgjigrjefb.com/api/public/v1/en/partners/891/live-casino/platforms/0",
    "https://cms.vmemkhhgjigrjefb.com/api/public/v1/en/partners/891/games/platforms/0",
    "https://cms.vmemkhhgjigrjefb.com/api/public/v1/en/partners/891/casino/platforms/0?only_providers=1",
    "https://cms.vmemkhhgjigrjefb.com/api/public/v1/en/partners/891/casino/platforms/0?providerName=pragmatic",
  ];

  for (const url of urls) {
    const res = await fetch(url);
    const ok = res.body.includes('"success":true');
    console.log(ok ? "OK" : "NO", res.status, res.body.length, url);
    console.log(" ", res.body.slice(0, 240).replace(/\s+/g, " "));
    if (ok && res.body.length > 500) {
      const out =
        "lib/cms/seed/content/providers/official/gglbet5-casino-platform.json";
      fs.writeFileSync(out, res.body);
      console.log("WROTE", out);
    }
  }
}

main().catch(console.error);
