const s = require("../lib/cms/seed/content/providers/official/gglbet5-providers.json");
const want = [
  "pragmatic play",
  "pg soft",
  "evolution",
  "jili",
  "jdb",
  "habanero",
  "spadegaming",
  "play'n go",
  "play n go",
  "spribe",
  "microgaming",
  "games global",
  "sexy",
  "dream gaming",
  "sbo",
  "cq9",
  "yggdrasil",
  "netent",
  "red tiger",
  "blueprint",
  "playstar",
  "ion",
  "kingmaker",
  "big gaming",
  "rich88",
  "nextspin",
  "live22",
  "918",
  "mega888",
  "pussy",
  "fa chai",
  "fachai",
  "asia gaming",
  "sa gaming",
  "wm casino",
  "ezugi",
  "allbet",
  "bti",
  "cmd368",
];
for (const w of want) {
  const hit = s.providers.filter(
    (p) =>
      p.title.toLowerCase().includes(w) ||
      p.slug.includes(w.replace(/\s+/g, "-").replace(/'/g, "")),
  );
  console.log(hit.length ? "Y" : "N", w, "=>", hit.map((p) => p.title).join(", ") || "-");
}
