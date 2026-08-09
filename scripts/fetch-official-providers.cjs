const https = require("https");
const fs = require("fs");
const path = require("path");

const OUT_DIR = "lib/cms/seed/content/providers/official";
fs.mkdirSync(OUT_DIR, { recursive: true });

function fetch(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            "User-Agent": "Mozilla/5.0",
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
              body: Buffer.concat(chunks),
              headers: res.headers,
            }),
          );
        },
      )
      .on("error", reject);
  });
}

async function fetchJson(url) {
  const res = await fetch(url);
  const text = res.body.toString("utf8");
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    json = null;
  }
  return { status: res.status, json, text, length: text.length };
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

async function main() {
  const products = ["casino", "live-casino", "games"];
  const byName = new Map();

  for (const product of products) {
    const url = `https://go-cms.vmemkhhgjigrjefb.com/api/public/v1/en/${product}/partners/891/platforms/0/providers`;
    const res = await fetchJson(url);
    console.log(product, res.status, res.length, res.json?.success);
    if (!res.json?.success) {
      console.log(res.text.slice(0, 200));
      continue;
    }
    fs.writeFileSync(
      path.join(OUT_DIR, `gglbet5-${product}-providers.json`),
      JSON.stringify(res.json, null, 2),
    );
    for (const item of res.json.data || []) {
      const key = item.name || item.title;
      const existing = byName.get(key) || {
        code: item.name,
        title: item.title,
        icon: item.icon || null,
        badge: item.badge || null,
        products: [],
      };
      if (!existing.products.includes(product)) existing.products.push(product);
      if (!existing.icon && item.icon) existing.icon = item.icon;
      if (!existing.badge && item.badge) existing.badge = item.badge;
      byName.set(key, existing);
    }
  }

  const providers = [...byName.values()]
    .map((p) => ({
      ...p,
      slug: slugify(p.title),
    }))
    .sort((a, b) => a.title.localeCompare(b.title));

  // Probe icon URLs
  const iconBase = "https://icons.cmsbetconstruct.com";
  const withLogos = [];
  for (const p of providers) {
    const candidates = [];
    if (p.icon) {
      candidates.push(
        `${iconBase}/svg/${p.icon}.svg`,
        `${iconBase}/svg/${p.icon}.json`,
        `${iconBase}/${p.icon}.svg`,
        `${iconBase}/providers/${p.icon}.svg`,
        `${iconBase}/providers/${p.icon}.png`,
        `${iconBase}/img/providers/${p.icon}.png`,
        `${iconBase}/img/casino-providers/${p.icon}.png`,
        `${iconBase}/img/casino-providers/${p.icon}.svg`,
      );
    }
    let logoUrl = null;
    for (const url of candidates) {
      try {
        const res = await fetch(url);
        const ct = String(res.headers["content-type"] || "");
        if (
          res.status === 200 &&
          res.body.length > 50 &&
          (ct.includes("image") ||
            ct.includes("svg") ||
            ct.includes("json") ||
            url.endsWith(".svg"))
        ) {
          logoUrl = url;
          break;
        }
      } catch {
        // ignore
      }
    }
    withLogos.push({ ...p, logoUrl });
    process.stdout.write(logoUrl ? "+" : "-");
  }
  console.log("");

  const snapshot = {
    verifiedDate: "2026-08-06",
    sourceName: "gglbet5.com",
    sourceSiteId: 891,
    sourceApi:
      "https://go-cms.vmemkhhgjigrjefb.com/api/public/v1/en/{casino|live-casino|games}/partners/891/platforms/0/providers",
    iconCdn: iconBase,
    count: withLogos.length,
    providers: withLogos,
  };

  fs.writeFileSync(
    path.join(OUT_DIR, "gglbet5-providers.json"),
    JSON.stringify(snapshot, null, 2),
  );

  console.log("TOTAL", withLogos.length);
  console.log(
    "WITH LOGO",
    withLogos.filter((p) => p.logoUrl).length,
  );
  console.log(
    "NO LOGO",
    withLogos.filter((p) => !p.logoUrl).length,
  );
  console.log(
    withLogos
      .map((p) => `${p.logoUrl ? "[L]" : "[ ]"} ${p.title} (${p.code}) ${p.products.join(",")}`)
      .join("\n"),
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
