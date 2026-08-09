const fs = require("fs");

const files = [
  "features/news/components/NewsCategoryPage.tsx",
  "features/guides/components/GuideCategoryPage.tsx",
  "features/promotions/components/PromotionDetailPage.tsx",
  "features/news/components/NewsDetailPage.tsx",
  "features/guides/components/GuideDetailPage.tsx",
];

function ensureImport(src) {
  if (src.includes("DsFaqAccordion")) return src;
  const needle = 'import { Section } from "@/components/ui/Section";';
  if (src.includes(needle)) {
    return src.replace(
      needle,
      'import { DsFaqAccordion } from "@/components/design-system/DsFaqAccordion";\n' +
        needle,
    );
  }
  return src;
}

function replaceFaq(src, expr) {
  const re = new RegExp(
    `<div className="mt-8 space-y-3">\\s*\\{${expr}\\.faq\\.map\\([\\s\\S]*?<\\/div>`,
    "m",
  );
  return src.replace(re, `<DsFaqAccordion items={${expr}.faq} />`);
}

for (const rel of files) {
  let s = fs.readFileSync(rel, "utf8");
  s = ensureImport(s);
  s = replaceFaq(s, "category");
  s = replaceFaq(s, "promotion");
  s = replaceFaq(s, "article");
  s = replaceFaq(s, "guide");
  s = s.split(
    'className="border-t border-border-brand/40 bg-surface"',
  ).join(
    'className="home-v2-section border-t border-border-brand/40 bg-surface"',
  );
  // Add tone glow near FAQ section openings that lack it
  s = s.replace(
    /(id="[^"]*faq[^"]*"\n\s*padding="lg"\n\s*containerSize="wide"\n\s*aria-labelledby="[^"]+"\n)(\s*)>/g,
    '$1$2tone="glow"\n$2>',
  );
  fs.writeFileSync(rel, s);
  console.log("patched", rel, "has DsFaq", s.includes("DsFaqAccordion"));
}
