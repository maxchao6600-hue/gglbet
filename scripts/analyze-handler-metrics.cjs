const fs = require("fs");
const zlib = require("zlib");

const s = fs.readFileSync(
  ".open-next/server-functions/default/handler.mjs",
  "utf8",
);

const metricsPath =
  ".open-next/server-functions/default/node_modules/next/dist/server/capsize-font-metrics.json";
const metrics = fs.readFileSync(metricsPath, "utf8");
console.log("metrics file KB", (metrics.length / 1024).toFixed(1));
console.log("metrics in handler?", s.includes(metrics.slice(1000, 1080)));

// Find how much of handler looks like font metrics by counting familyName occurrences
const familyCount = (s.match(/familyName/g) || []).length;
console.log("familyName count in handler", familyCount);
const metricsFamily = (metrics.match(/familyName/g) || []).length;
console.log("familyName count in metrics file", metricsFamily);

// Estimate: if nearly all metrics are inlined
const ratio = familyCount / Math.max(metricsFamily, 1);
console.log("approx metrics inclusion ratio", ratio.toFixed(3));
console.log(
  "approx metrics contribution MB",
  ((metrics.length * Math.min(ratio, 1)) / 1e6).toFixed(2),
);

// Size of next/og related strings in handler
for (const n of ["resvg.wasm", "yoga.wasm", "Geist-Regular", "ImageResponse"]) {
  console.log(n, (s.match(new RegExp(n.replace(".", "\\."), "g")) || []).length);
}

// Try to find large JSON-like blobs - count length of string literals over 10k
let longLit = 0;
let longLitCount = 0;
const re = /"(?:\\.|[^"\\]){10000,}"/g;
let m;
while ((m = re.exec(s))) {
  longLit += m[0].length;
  longLitCount++;
}
console.log("long string literals >10k chars:", longLitCount, "totalMB", (longLit / 1e6).toFixed(2));

// What about template literals
const re2 = /`(?:\\.|[^`\\]){5000,}`/g;
let longT = 0;
let longTCount = 0;
while ((m = re2.exec(s))) {
  longT += m[0].length;
  longTCount++;
}
console.log("long template literals >5k:", longTCount, "totalMB", (longT / 1e6).toFixed(2));
