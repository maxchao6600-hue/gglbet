const fs = require("fs");
const https = require("https");

function fetch(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: { "User-Agent": "Mozilla/5.0", Accept: "*/*" },
          timeout: 60000,
        },
        (res) => {
          const chunks = [];
          res.on("data", (c) => chunks.push(c));
          res.on("end", () =>
            resolve({ status: res.statusCode, body: Buffer.concat(chunks).toString("utf8") }),
          );
        },
      )
      .on("error", reject);
  });
}

async function main() {
  // Download ProvidersWidget chunk
  const url = "https://www.gglbet5.com/assets/ProvidersWidget-uzcIqqkF.js";
  const res = await fetch(url);
  fs.writeFileSync("scripts/_providers-widget.js", res.body);
  console.log("widget size", res.body.length);

  // Extract interesting strings
  const patterns = [
    /https?:[^\"'\s]+/g,
    /\/api\/[^\"'\s]+/g,
    /partners\/\d+\/[^\"'\s]+/g,
    /get[A-Z][A-Za-z]+/g,
    /provider[^\"'\s]{0,60}/gi,
    /casino[^\"'\s]{0,60}/gi,
  ];
  for (const p of patterns) {
    const hits = [...new Set([...res.body.matchAll(p)].map((m) => m[0]))].slice(0, 40);
    if (hits.length) {
      console.log("\n===", p, "===");
      hits.forEach((h) => console.log(h));
    }
  }

  // Also search main chunk for swarm / games JSON
  const main = fs.readFileSync("scripts/_spa-chunk.js", "utf8");
  const swarm = [...main.matchAll(/swarm[^\"']{0,80}/gi)].slice(0, 20).map((m) => m[0]);
  const gamesApi = [...main.matchAll(/[^\"']*games[^\"']{0,40}/gi)]
    .map((m) => m[0])
    .filter((s) => /api|cms|partner|casino/i.test(s))
    .slice(0, 40);
  console.log("\nSWARM", swarm);
  console.log("\nGAMESAPI", gamesApi);

  // conf.json deep dump related keys
  const conf = JSON.parse(
    await new Promise((resolve, reject) => {
      https
        .get("https://www.gglbet5.com/conf.json", { headers: { "User-Agent": "Mozilla/5.0" } }, (r) => {
          const c = [];
          r.on("data", (d) => c.push(d));
          r.on("end", () => resolve(Buffer.concat(c).toString("utf8")));
        })
        .on("error", reject);
    }),
  );
  const interesting = {};
  for (const [k, v] of Object.entries(conf)) {
    if (/game|casino|provider|cdn|media|swarm|socket|api|cms|site/i.test(k)) {
      interesting[k] = typeof v === "object" ? JSON.stringify(v).slice(0, 300) : v;
    }
  }
  console.log("\nCONF", JSON.stringify(interesting, null, 2));
}

main().catch(console.error);
