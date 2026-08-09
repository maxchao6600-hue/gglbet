/**
 * Unify listing FAQ + Final CTA chrome to Home Design System (not SEO copy).
 * Run: node scripts/p0-1-listing-ds.cjs
 */
const fs = require("fs");
const path = require("path");

const files = [
  "features/games/components/GamesListingPage.tsx",
  "features/providers/components/ProvidersListingPage.tsx",
  "features/promotions/components/PromotionsListingPage.tsx",
  "features/guides/components/GuidesListingPage.tsx",
  "features/news/components/NewsListingPage.tsx",
];

function ensureImport(src, importLine) {
  if (src.includes(importLine)) return src;
  if (src.includes('from "@/components/design-system/DsFaqAccordion"')) return src;
  // insert after first import block line that imports from @/components
  const marker = 'import { Section } from "@/components/ui/Section";';
  if (src.includes(marker)) {
    return src.replace(
      marker,
      `${importLine}\n${marker}`,
    );
  }
  return `${importLine}\n${src}`;
}

for (const rel of files) {
  const file = path.join(process.cwd(), rel);
  let src = fs.readFileSync(file, "utf8");
  src = ensureImport(
    src,
    'import { DsFaqAccordion } from "@/components/design-system/DsFaqAccordion";',
  );
  if (!src.includes('import { DS }') && !src.includes("from \"@/components/design-system/classes\"")) {
    src = ensureImport(
      src,
      'import { DS } from "@/components/design-system/classes";',
    );
  }

  // Replace inline FAQ details block with DsFaqAccordion
  src = src.replace(
    /<div className="mt-8 space-y-3">\s*\{page\.faq\.map\(\(item\) => \(\s*<details[\s\S]*?<\/details>\s*\)\)\}\s*<\/div>/g,
    "<DsFaqAccordion items={page.faq} />",
  );
  src = src.replace(
    /<div className="mt-8 space-y-3">\s*\{page\.faq\.map\(\(item\) => \(\s*<details[\s\S]*?<\/details>\s*\)\)\}\s*<\/div>/g,
    "<DsFaqAccordion items={page.faq} />",
  );

  // FAQ section tone glow
  src = src.replace(
    /(id="[^"]*-faq"\s*\n\s*padding="lg"\s*\n\s*containerSize="wide"\s*\n\s*aria-labelledby="[^"]+"\s*\n)(\s*)>/g,
    '$1$2tone="glow"\n$2>',
  );

  // Final CTA: upgrade className to home-v2-section
  src = src.replace(
    'className="border-t border-border-brand/40 bg-surface"',
    'className="home-v2-section border-t border-border-brand/40 bg-surface"',
  );

  // Ensure section bg wash exists near final cta - add if missing after opening of final-cta section
  // Providers CTA lacks split+media - leave structural for now if already has SectionIntro only

  fs.writeFileSync(file, src);
  console.log("patched", rel);
}
