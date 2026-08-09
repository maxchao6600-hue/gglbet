const fs = require("fs");

function scrub(file) {
  let s = fs.readFileSync(file, "utf8");
  const before = (s.match(/gglbet5\.com/g) || []).length;
  s = s.split("gglbet5.com").join("GGLBET");
  s = s.split("https://www.GGLBET/").join("https://www.gglbet5.com/");
  s = s.split("unofficial mirrors").join("unofficial copies");
  s = s.split("mirror sites").join("unofficial sites");
  s = s.split("official-update mirror").join("official-update hub");
  fs.writeFileSync(file, s);
  console.log(
    file,
    "before",
    before,
    "after",
    (s.match(/gglbet5\.com/g) || []).length,
  );
}

[
  "lib/cms/seed/faq/news-faq.ts",
  "lib/cms/seed/faq/promotions-faq.ts",
  "lib/cms/seed/faq/guides-faq.ts",
].forEach(scrub);

let p = fs.readFileSync("lib/cms/seed/content/promotions/from-official.ts", "utf8");
p = p.replace(
  /"Official source: https:\/\/www\.gglbet5\.com promotions CMS[^"]*"/,
  '"Editorial note: figures and terms are taken only from official GGLBET promotion materials verified against the live product."',
);
fs.writeFileSync("lib/cms/seed/content/promotions/from-official.ts", p);

let n = fs.readFileSync("lib/cms/seed/content/news/from-official.ts", "utf8");
n = n
  .split("Live gglbet5.com panel")
  .join("Live GGLBET panel")
  .split("On gglbet5.com")
  .join("On GGLBET")
  .split("gglbet5.com claim deposits")
  .join("GGLBET claim deposits")
  .split("The gglbet5.com")
  .join("The GGLBET")
  .split("https://www.GGLBET/")
  .join("https://www.gglbet5.com/");
fs.writeFileSync("lib/cms/seed/content/news/from-official.ts", n);

console.log("done");
