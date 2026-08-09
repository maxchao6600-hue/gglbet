import fs from "node:fs";
import path from "node:path";

const dir = path.join(process.cwd(), "public/providers/logos");
const files = fs.readdirSync(dir).filter((f) => /\.(svg|png|webp)$/i.test(f));

function analyzeSvg(file, text) {
  const hasCurrentColor = /currentColor/i.test(text);
  const hexes = [...text.matchAll(/#([0-9a-fA-F]{3,8})\b/g)].map((m) =>
    m[0].toLowerCase(),
  );
  const named = [...text.matchAll(/\b(fill|stroke)=["']([a-zA-Z]+)["']/g)].map(
    (m) => m[2].toLowerCase(),
  );
  const all = [...hexes, ...named].filter(
    (c) => !["none", "currentcolor", "transparent"].includes(c),
  );
  const unique = [...new Set(all)];

  const isNearBlack = (c) => {
    if (["black", "#000", "#000000", "#111", "#111111"].includes(c)) return true;
    if (!c.startsWith("#")) return false;
    const hex =
      c.length === 4
        ? `${c[1]}${c[1]}${c[2]}${c[2]}${c[3]}${c[3]}`
        : c.slice(1, 7);
    if (hex.length < 6) return false;
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return r < 45 && g < 45 && b < 45;
  };

  const isNearWhite = (c) => {
    if (["white", "#fff", "#ffffff", "#fefefe"].includes(c)) return true;
    if (!c.startsWith("#")) return false;
    const hex =
      c.length === 4
        ? `${c[1]}${c[1]}${c[2]}${c[2]}${c[3]}${c[3]}`
        : c.slice(1, 7);
    if (hex.length < 6) return false;
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return r > 220 && g > 220 && b > 220;
  };

  const chromatic = unique.filter((c) => !isNearBlack(c) && !isNearWhite(c));
  const slug = file.replace(/\.(svg|png|webp)$/i, "");

  let mode = "invert";
  if (/white|light/i.test(file)) mode = "white";
  else if (chromatic.length >= 1 && !hasCurrentColor) mode = "whitelist";
  else if (hasCurrentColor || unique.every(isNearBlack) || unique.length === 0)
    mode = "invert";
  else if (chromatic.length >= 1) mode = "whitelist";

  return { slug, file, mode, hasCurrentColor, chromatic: chromatic.slice(0, 6) };
}

const rows = files.map((file) => {
  if (/\.svg$/i.test(file)) {
    return analyzeSvg(file, fs.readFileSync(path.join(dir, file), "utf8"));
  }
  return {
    slug: file.replace(/\.(png|webp)$/i, ""),
    file,
    mode: "invert",
    hasCurrentColor: false,
    chromatic: [],
  };
});

const byMode = { white: [], invert: [], whitelist: [] };
for (const r of rows) byMode[r.mode].push(r);

console.log(
  JSON.stringify(
    {
      total: rows.length,
      white: byMode.white.length,
      invert: byMode.invert.length,
      whitelist: byMode.whitelist.length,
      whitelistSlugs: byMode.whitelist.map((r) => r.slug),
      whiteFiles: byMode.white.map((r) => r.file),
      sampleInvert: byMode.invert.slice(0, 10).map((r) => r.slug),
    },
    null,
    2,
  ),
);
