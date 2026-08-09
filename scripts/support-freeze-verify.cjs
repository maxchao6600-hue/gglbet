/**
 * Support freeze gate: media uniqueness, ZH mega descriptions, path hygiene.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SEED_DIR = path.join(ROOT, "lib", "cms", "seed", "support");
const NAV = path.join(ROOT, "constants", "navigation.ts");
const NAV_COPY = path.join(ROOT, "features", "i18n", "nav-copy.ts");
const HUB = path.join(ROOT, "constants", "hub-media.ts");

function read(p) {
  return fs.readFileSync(p, "utf8");
}

function extractDescriptions(navSrc) {
  const out = [];
  const re = /description:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(navSrc))) out.push(m[1]);
  return out;
}

function extractZhMap(copySrc) {
  const block = copySrc.match(
    /const ZH_DESCRIPTIONS: Record<string, string> = \{([\s\S]*?)\n\};/,
  );
  if (!block) return {};
  const map = {};
  const re = /"([^"]+)":\s*\n?\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(block[1]))) map[m[1]] = m[2];
  return map;
}

function extractMediaFromSeed(src) {
  const keys = [];
  const hero = src.match(/heroImageSrc:\s*HUB_MEDIA\.(\w+)/);
  if (hero) keys.push(["hero", hero[1]]);
  const re = /mediaSrc:\s*HUB_MEDIA\.(\w+)/g;
  let m;
  while ((m = re.exec(src))) keys.push(["media", m[1]]);
  return keys;
}

function hubPaths(hubSrc) {
  const map = {};
  const re = /(\w+):\s*"(\/support\/[^"]+)"/g;
  let m;
  while ((m = re.exec(hubSrc))) map[m[1]] = m[2];
  return map;
}

const hub = hubPaths(read(HUB));
const navDescs = extractDescriptions(read(NAV));
const zhMap = extractZhMap(read(NAV_COPY));

const missingZh = navDescs.filter((d) => !zhMap[d]);
const seeds = fs
  .readdirSync(SEED_DIR)
  .filter((f) => f.endsWith(".ts") && !["factory.ts", "cta.ts", "index.ts"].includes(f));

const pageMedia = {};
const allPaths = [];
let badPath = [];

for (const file of seeds) {
  const src = read(path.join(SEED_DIR, file));
  const keys = extractMediaFromSeed(src);
  const paths = keys.map(([kind, key]) => {
    const p = hub[key];
    if (!p) return { kind, key, path: null };
    if (!p.startsWith("/support/")) badPath.push({ file, key, path: p });
    if (/slots|games\/|home\/v4/i.test(p)) badPath.push({ file, key, path: p });
    return { kind, key, path: p };
  });
  pageMedia[file] = paths;
  for (const row of paths) if (row.path) allPaths.push({ file, ...row });
}

const byPath = new Map();
for (const row of allPaths) {
  if (!byPath.has(row.path)) byPath.set(row.path, []);
  byPath.get(row.path).push(`${row.file}:${row.key}`);
}
const shared = [...byPath.entries()].filter(([, owners]) => {
  const pages = new Set(owners.map((o) => o.split(":")[0]));
  return pages.size > 1;
});

const supportPngs = fs
  .readdirSync(path.join(ROOT, "public", "support"))
  .filter((f) => f.endsWith(".png"));

const referenced = new Set(allPaths.map((r) => r.path).filter(Boolean));
const missingFiles = [...referenced].filter((p) => {
  const name = p.replace("/support/", "");
  return !fs.existsSync(path.join(ROOT, "public", "support", name));
});

const report = {
  navDescriptionCount: navDescs.length,
  missingZhDescriptions: missingZh,
  seedFiles: seeds.length,
  referencedSupportImages: referenced.size,
  publicSupportPngCount: supportPngs.length,
  badPaths: badPath,
  crossPageSharedPaths: shared.map(([p, owners]) => ({ path: p, owners })),
  missingFiles,
  perPage: Object.fromEntries(
    Object.entries(pageMedia).map(([file, rows]) => [
      file,
      {
        count: rows.length,
        paths: rows.map((r) => r.path),
      },
    ]),
  ),
};

const outDir = path.join(ROOT, "qa-screenshots", "support-freeze");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, "verify.json"),
  JSON.stringify(report, null, 2),
);

console.log(JSON.stringify(report, null, 2));
const ok =
  missingZh.length === 0 &&
  badPath.length === 0 &&
  shared.length === 0 &&
  missingFiles.length === 0;
process.exit(ok ? 0 : 1);
