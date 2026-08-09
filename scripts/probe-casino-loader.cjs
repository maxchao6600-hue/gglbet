const https = require("https");
const fs = require("fs");

function fetch(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "Content-Key-Case": "camel",
            Accept: "application/json",
            Origin: "https://www.gglbet5.com",
            Referer: "https://www.gglbet5.com/en/casino/slots",
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

async function main() {
  // Download casino loader chunks
  const files = [
    "CasinoGamesLoader-Cv5rwny2.js",
    "CasinoGamesWidget-wH7pTvDl.js",
    "ProvidersWidget-uzcIqqkF.js",
  ];
  for (const f of files) {
    const res = await fetch(`https://www.gglbet5.com/assets/${f}`);
    fs.writeFileSync(`scripts/_${f}`, res.body);
    console.log("saved", f, res.body.length);
  }

  const loader = fs.readFileSync("scripts/_CasinoGamesLoader-Cv5rwny2.js", "utf8");
  // Find API call construction near platforms
  const idx = loader.indexOf("platforms/");
  console.log("\nloader context around platforms:");
  for (let i = 0; i < loader.length; i++) {
    if (loader.slice(i, i + 20).includes("platforms/")) {
      console.log(loader.slice(Math.max(0, i - 120), i + 200).replace(/\s+/g, " "));
      console.log("---");
      i += 50;
      if (i > 5000) break;
    }
  }

  // Try platform values that BC uses: 0,1,"0","1", web, desktop, true/false
  const site = 891;
  const tries = [];
  for (const platform of ["0", "1", "web", "desktop", "2", "false", "true"]) {
    tries.push(
      `https://cms.vmemkhhgjigrjefb.com/api/public/v1/eng/casino/partners/${site}/platforms/${platform}`,
      `https://cms.vmemkhhgjigrjefb.com/api/public/v1/eng/casino/partners/${site}/platforms/${platform}?partner_id=${site}`,
      `https://cms.vmemkhhgjigrjefb.com/api/public/v1/eng/casino/partners/${site}/platforms/${platform}/games?partner_id=${site}`,
    );
  }

  // Also try with count/offset pagination used by BC
  tries.push(
    `https://cms.vmemkhhgjigrjefb.com/api/public/v1/eng/casino/partners/${site}/platforms/0/games?partner_id=${site}&count=20&from=0`,
    `https://cms.vmemkhhgjigrjefb.com/api/public/v1/eng/casino/partners/${site}/platforms/0?only_providers=1`,
  );

  for (const url of tries) {
    const res = await fetch(url);
    const ok = res.body.includes('"success":true');
    if (ok || res.body.length > 200) {
      console.log("HIT", res.status, res.body.length, url);
      console.log(res.body.slice(0, 300));
      fs.writeFileSync("scripts/_casino-hit.json", res.body);
      break;
    } else {
      process.stdout.write(".");
    }
  }
  console.log("\ndone");
}

main().catch(console.error);
