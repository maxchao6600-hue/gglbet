const https = require("https");
const fs = require("fs");
const path = require("path");

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
          },
          timeout: 60000,
        },
        (res) => {
          const chunks = [];
          res.on("data", (d) => chunks.push(d));
          res.on("end", () =>
            resolve({
              status: res.statusCode,
              ct: res.headers["content-type"],
              body: Buffer.concat(chunks),
            }),
          );
        },
      )
      .on("error", reject);
  });
}

async function fetchJson(url) {
  const res = await fetch(url);
  try {
    return {
      status: res.status,
      json: JSON.parse(res.body.toString("utf8")),
    };
  } catch {
    return { status: res.status, json: null };
  }
}

function jsonIconToSvg(json) {
  const viewBox = json.viewBox || "0 0 100 100";
  const paths = Array.isArray(json.paths) ? json.paths : [];
  const pathEls = paths
    .map((d) => `<path fill="currentColor" d="${d}"/>`)
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" role="img">${pathEls}</svg>\n`;
}

async function main() {
  // Extra product endpoints on go-cms
  for (const product of ["live-casino", "games", "tv-games", "virtual-sports"]) {
    const url = `https://go-cms.vmemkhhgjigrjefb.com/api/public/v1/en/${product}/partners/891/platforms/0/providers`;
    const res = await fetchJson(url);
    console.log(
      product,
      res.status,
      res.json?.success,
      Array.isArray(res.json?.data) ? res.json.data.length : 0,
    );
  }

  const snapshot = JSON.parse(
    fs.readFileSync(
      "lib/cms/seed/content/providers/official/gglbet5-providers.json",
      "utf8",
    ),
  );

  const outDir = "public/providers/logos";
  fs.mkdirSync(outDir, { recursive: true });

  let ok = 0;
  let fail = 0;
  const updated = [];

  for (const p of snapshot.providers) {
    if (!p.logoUrl) {
      updated.push({ ...p, localLogoPath: null });
      fail++;
      continue;
    }
    try {
      const res = await fetch(p.logoUrl);
      if (res.status !== 200) {
        updated.push({ ...p, localLogoPath: null, logoUrl: null });
        fail++;
        continue;
      }
      const text = res.body.toString("utf8");
      const json = JSON.parse(text);
      const svg = jsonIconToSvg(json);
      const file = `${p.slug}.svg`;
      fs.writeFileSync(path.join(outDir, file), svg);
      updated.push({
        ...p,
        localLogoPath: `/providers/logos/${file}`,
      });
      ok++;
      process.stdout.write("+");
    } catch {
      updated.push({ ...p, localLogoPath: null });
      fail++;
      process.stdout.write("-");
    }
  }

  snapshot.providers = updated;
  snapshot.logoStats = { withLocalSvg: ok, withoutLogo: fail };
  fs.writeFileSync(
    "lib/cms/seed/content/providers/official/gglbet5-providers.json",
    JSON.stringify(snapshot, null, 2),
  );
  console.log("\nSVG ok", ok, "fail", fail);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
