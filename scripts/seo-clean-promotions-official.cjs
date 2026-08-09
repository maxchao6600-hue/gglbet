const fs = require("fs");
const path = "lib/cms/seed/content/promotions/from-official.ts";
let s = fs.readFileSync(path, "utf8");

const pairs = [
  ['ctaPrimaryLabel: "Open gglbet5.com"', 'ctaPrimaryLabel: "Claim on GGLBET"'],
  ["ctaPrimaryHref: sourceUrl", 'ctaPrimaryHref: "/register"'],
  ["`${title} on gglbet5.com`", "`${title} on GGLBET`"],
  [
    "Confirm live terms on gglbet5.com before claiming.",
    "Confirm live GGLBET terms before claiming.",
  ],
  ["Open the official gglbet5.com site", "Open the live GGLBET product"],
  ["Claim or opt in on gglbet5.com", "Claim or opt in on GGLBET"],
  [
    "Use the official claim / bonuses controls on gglbet5.com",
    "Use the official claim / bonuses controls on GGLBET",
  ],
  [
    "Go to https://www.gglbet5.com and sign in to your account. Do not use third-party mirrors.",
    "Sign in on GGLBET. Do not use third-party mirrors.",
  ],
  ["official gglbet5.com promotions catalog", "official GGLBET promotions catalog"],
  ["official gglbet5.com promotion", "official GGLBET promotion"],
  ["official gglbet5.com content", "official GGLBET content"],
  ["live gglbet5.com", "live GGLBET"],
  ["On gglbet5.com", "On GGLBET"],
  ["on gglbet5.com", "on GGLBET"],
  ["from gglbet5.com", "from official GGLBET materials"],
  ["gglbet5.com publishes", "GGLBET publishes"],
  ["gglbet5.com for", "GGLBET for"],
  ["gglbet5.com record", "GGLBET record"],
  ["Only from the official gglbet5.com", "Only from the official GGLBET"],
  ["differs from gglbet5.com", "differs from the live GGLBET panel"],
  ["is an official gglbet5.com promotion", "is an official GGLBET promotion"],
  ["Claim only through gglbet5.com", "Claim only through GGLBET"],
  [
    "See eligible games listed in the official promotion terms on gglbet5.com",
    "See eligible games listed in the official GGLBET promotion terms",
  ],
  [
    "Follow the full terms published on the official gglbet5.com promotion page.",
    "Follow the full terms published on the official GGLBET promotion page.",
  ],
  [
    "Open the promotion on gglbet5.com while logged in",
    "Open the promotion on GGLBET while logged in",
  ],
  ["See official terms on gglbet5.com", "See official GGLBET terms"],
  [
    "Eligibility is defined only by the official gglbet5.com promotion terms",
    "Eligibility is defined only by the official GGLBET promotion terms",
  ],
  [
    "You can access the official gglbet5.com promotions area",
    "You can access the official GGLBET promotions area",
  ],
  ["not marked ended on gglbet5.com", "not marked ended on GGLBET"],
  [
    "You accept that the live gglbet5.com panel",
    "You accept that the live GGLBET panel",
  ],
  [
    "Claim flow follows the official gglbet5.com promotion page",
    "Claim flow follows the official GGLBET promotion page",
  ],
  [
    "Official end date published on gglbet5.com:",
    "Official end date published on GGLBET:",
  ],
  [
    "confirm live availability on gglbet5.com",
    "confirm live availability on GGLBET",
  ],
  ["Always re-check figures on gglbet5.com", "Always re-check figures on GGLBET"],
  [
    "Promotion end date published on gglbet5.com:",
    "Promotion end date published on GGLBET:",
  ],
  ["when published on gglbet5.com", "when published on GGLBET"],
  [
    "identical to the official gglbet5.com content",
    "identical to the official GGLBET content",
  ],
  [
    "follow exactly what the live gglbet5.com terms",
    "follow exactly what the live GGLBET terms",
  ],
  [
    "Confirm turnover on the live gglbet5.com terms",
    "Confirm turnover on the live GGLBET terms",
  ],
  [
    'const SOURCE_NOTE =\n  "Official source: https://www.gglbet5.com promotions CMS (partner site_id 891). Figures and terms are taken only from the live promotion content published there.";',
    'const SOURCE_NOTE =\n  "Editorial note: figures and terms are taken only from official GGLBET promotion materials verified against the live product.";',
  ],
];

for (const [a, b] of pairs) {
  if (!s.includes(a)) {
    // try without exact match — continue
  }
  s = s.split(a).join(b);
}

// Keep URL builder host intact for sourceUrl field (editorial source metadata)
s = s.replaceAll("https://www.GGLBET/", "https://www.gglbet5.com/");

fs.writeFileSync(path, s);
console.log("remaining gglbet5.com", (s.match(/gglbet5\.com/g) || []).length);
console.log("has Claim CTA", s.includes("Claim on GGLBET"));
console.log("has Open gglbet CTA", s.includes('Open gglbet5.com'));
