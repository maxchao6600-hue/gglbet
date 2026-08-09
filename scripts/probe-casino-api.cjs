const https = require("https");
const fs = require("fs");

function fetch(url, headers = {}) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            "User-Agent": "Mozilla/5.0",
            "Content-Key-Case": "camel",
            Accept: "application/json",
            ...headers,
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
      )
      .on("error", reject);
  });
}

async function tryUrl(url) {
  try {
    const res = await fetch(url);
    const ok = res.body.includes('"success":true') || res.body.includes('"data"');
    console.log(res.status, res.body.length, ok ? "OK" : "?", url);
    console.log(" ", res.body.slice(0, 200).replace(/\s+/g, " "));
    return res;
  } catch (e) {
    console.log("ERR", url, e.message);
    return null;
  }
}

async function main() {
  const site = 891;
  const bases = [
    `https://cms.vmemkhhgjigrjefb.com/api/public/v1/eng/casino/partners/${site}`,
    `https://cms.vmemkhhgjigrjefb.com/api/public/v1/en/casino/partners/${site}`,
    `https://cms.vmemkhhgjigrjefb.com/api/public/v1/eng/partners/${site}`,
    `https://www.gglbet5.com/api/public/v1/eng/casino/partners/${site}`,
  ];

  const suffixes = [
    `/platforms/0/providers`,
    `/platforms/0/providers?use_webp=1`,
    `/platforms/1/providers`,
    `/platforms/0/games?limit=5&paginate=1`,
    `/platforms/0/games?is_list=1`,
    `/platforms/0/categories`,
    `/platforms/0/filters`,
    `/providers`,
    `/providers?platform=0`,
    `/platforms/0`,
  ];

  for (const base of bases) {
    for (const suffix of suffixes) {
      await tryUrl(base + suffix);
    }
  }

  // Search main SPA for casino partners path templates
  const main = fs.readFileSync("scripts/_spa-chunk.js", "utf8");
  const hits = [
    ...main.matchAll(/casino\/partners\/[^\"'`]+/g),
    ...main.matchAll(/platforms\/\$\{[^}]+\}\/[a-zA-Z\-]+/g),
    ...main.matchAll(/\/providers[^\"'`]{0,80}/g),
  ]
    .map((m) => m[0])
    .filter((v, i, a) => a.indexOf(v) === i)
    .slice(0, 60);
  console.log("\nPATH TEMPLATES");
  hits.forEach((h) => console.log(h));
}

main().catch(console.error);
