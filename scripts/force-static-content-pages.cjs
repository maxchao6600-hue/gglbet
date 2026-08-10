/**
 * Convert content pages from ISR (revalidate=3600) to force-static SSG.
 * Skips individual game detail pages (on-demand / heavy catalog load).
 */
const fs = require("fs");
const path = require("path");

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (entry.name === "page.tsx") acc.push(full);
  }
  return acc;
}

const skip = path.normalize(
  path.join("app", "[locale]", "game", "[provider]", "[slug]", "page.tsx"),
);

const pages = walk("app");
let changed = 0;

for (const pagePath of pages) {
  if (path.normalize(pagePath) === skip) continue;
  let source = fs.readFileSync(pagePath, "utf8");
  if (!source.includes("export const revalidate = 3600")) continue;
  if (source.includes("export const dynamic = 'force-static'")) continue;

  source = source.replace(
    "export const revalidate = 3600;",
    [
      "export const dynamic = 'force-static';",
      "export const revalidate = false;",
    ].join("\n"),
  );
  fs.writeFileSync(pagePath, source);
  changed += 1;
  console.log("updated", pagePath);
}

console.log("changed", changed);
