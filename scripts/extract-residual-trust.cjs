const fs = require("fs");
const src = fs.readFileSync("lib/cms/seed/eeat.ts", "utf8");
const slugs = [
  "privacy-policy",
  "terms",
  "content-quality-policy",
  "content-update-policy",
  "vip",
  "referral",
];

const marker = "createTrustPage({";
const indices = [];
let from = 0;
while (true) {
  const i = src.indexOf(marker, from);
  if (i < 0) break;
  const slice = src.slice(i, i + 120);
  const slugMatch = slice.match(/slug:\s*"([^"]+)"/);
  if (slugMatch && slugs.includes(slugMatch[1])) {
    indices.push({ slug: slugMatch[1], index: i });
  }
  from = i + marker.length;
}

function extractBlock(start) {
  let depth = 0;
  let begun = false;
  for (let i = start; i < src.length; i++) {
    const ch = src[i];
    if (ch === "(") {
      depth++;
      begun = true;
    } else if (ch === ")") {
      depth--;
      if (begun && depth === 0) {
        // include trailing `),` or `})`
        let end = i + 1;
        if (src[end] === ",") end++;
        return src.slice(start, end);
      }
    }
  }
  throw new Error("unclosed");
}

const blocks = indices.map((item) => extractBlock(item.index));
const out = `import { ROUTES } from "@/constants/routes";
import type { TrustPageDocument } from "@/types/eeat";
import { createTrustPage } from "./support/factory";

/** Non-Support-hub trust pages retained from legacy eeat seed. */
export const residualTrustPages: readonly TrustPageDocument[] = [
${blocks.join("\n")}
] as const;
`;

fs.writeFileSync("lib/cms/seed/residual-trust-pages.ts", out);
console.log(
  "wrote residual-trust-pages.ts",
  indices.map((x) => x.slug),
  "bytes",
  out.length,
);
