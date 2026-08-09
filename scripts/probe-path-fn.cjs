const fs = require("fs");
const https = require("https");

const main = fs.readFileSync("scripts/_spa-chunk.js", "utf8");
const i = main.indexOf("enableFastDb");
console.log("enableFastDb contexts:");
let idx = 0;
let n = 0;
while ((idx = main.indexOf("enableFastDb", idx)) !== -1 && n < 10) {
  console.log("\n@", idx);
  console.log(main.slice(idx - 200, idx + 400).replace(/\s+/g, " "));
  idx += 12;
  n++;
}

idx = main.indexOf("function Path(");
if (idx < 0) idx = main.indexOf("Path(n,s){");
console.log("\n\nPATH FN", idx);
console.log(main.slice(idx, idx + 1500).replace(/\s+/g, " "));

// Search isMobile assignment
n = 0;
idx = 0;
console.log("\n\nisMobile samples:");
while ((idx = main.indexOf("isMobile", idx)) !== -1 && n < 15) {
  const slice = main.slice(Math.max(0, idx - 40), idx + 80);
  if (/Q\.isMobile|isMobile:|isMobile=/.test(slice)) {
    console.log(slice.replace(/\s+/g, " "));
    n++;
  }
  idx += 8;
}

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
          },
          timeout: 60000,
        },
        (res) => {
          const c = [];
          res.on("data", (d) => c.push(d));
          res.on("end", () =>
            resolve({
              status: res.statusCode,
              body: Buffer.concat(c).toString("utf8"),
            }),
          );
        },
      )
      .on("error", reject);
  });
}

(async () => {
  // Try boolean-like platforms and full game list paths from Path()
  const bases = [
    "https://cms.vmemkhhgjigrjefb.com/api/public/v1/en/partners/891/casino/platforms",
    "https://cms.vmemkhhgjigrjefb.com/api/public/v1/eng/partners/891/casino/platforms",
  ];
  const platforms = ["0", "1", "true", "false", "web", "desktop"];
  const tails = [
    "",
    "/games",
    "/games?page=1",
    "/games?page=1&use_webp=1",
    "?page=1",
  ];
  for (const base of bases) {
    for (const p of platforms) {
      for (const t of tails) {
        const url = `${base}/${p}${t}`;
        const res = await fetch(url);
        if (res.body.includes('"success":true') || res.body.length > 200) {
          console.log("HIT", res.status, res.body.length, url);
          console.log(res.body.slice(0, 300));
          fs.writeFileSync("scripts/_casino-ok.json", res.body.slice(0, 2000000));
          return;
        }
      }
    }
  }
  console.log("no hits");
})();
