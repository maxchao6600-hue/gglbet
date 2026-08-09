const fs = require("fs");
const s = fs.readFileSync(
  ".open-next/server-functions/default/handler.mjs",
  "utf8",
);

const re = /`((?:\\.|[^`\\]){5000,})`/g;
const items = [];
let m;
while ((m = re.exec(s))) {
  const body = m[1];
  items.push({
    len: body.length,
    preview: body.slice(0, 120).replace(/\n/g, "\\n"),
  });
}
items.sort((a, b) => b.len - a.len);
console.log("top 25 template literals:");
for (const it of items.slice(0, 25)) {
  console.log((it.len / 1024).toFixed(1) + "KiB", it.preview);
}
console.log("total templates", items.length);
console.log(
  "sum MB",
  (items.reduce((a, b) => a + b.len, 0) / 1e6).toFixed(2),
);
