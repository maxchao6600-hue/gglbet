const fs = require("fs");

function cleanNewsOfficial() {
  const path = "lib/cms/seed/content/news/from-official.ts";
  let s = fs.readFileSync(path, "utf8");
  const pairs = [
    [
      'newsTitle: "GGLBET announces EWC 2026 Free Bet Reward Boost on gglbet5.com"',
      'newsTitle: "GGLBET announces EWC 2026 Free Bet Reward Boost"',
    ],
    ['ctaPrimaryLabel: "Open official page"', 'ctaPrimaryLabel: "Open GGLBET promotions"'],
    ["ctaPrimaryHref: sourceUrl", 'ctaPrimaryHref: "/promotions"'],
    [" on gglbet5.com", " on GGLBET"],
    ["on gglbet5.com", "on GGLBET"],
    ["from gglbet5.com", "from official GGLBET materials"],
    ["Official gglbet5.com", "Official GGLBET"],
    ["official gglbet5.com", "official GGLBET"],
    ["live gglbet5.com", "live GGLBET"],
    ["the gglbet5.com", "the GGLBET"],
    ["gglbet5.com promotion", "GGLBET promotion"],
    ["gglbet5.com /", "GGLBET /"],
    ["https://www.gglbet5.com before", "the live GGLBET product before"],
    [
      'const SOURCE_NOTE =\n  "Official source: https://www.gglbet5.com promotions CMS (partner site_id 891). Dates, names, and figures are taken only from the live official materials published there.";',
      'const SOURCE_NOTE =\n  "Editorial note: dates, names, and figures are taken only from official GGLBET materials verified against the live product.";',
    ],
  ];
  for (const [a, b] of pairs) s = s.split(a).join(b);
  s = s.replaceAll("https://www.GGLBET/", "https://www.gglbet5.com/");
  fs.writeFileSync(path, s);
  console.log(
    "news official remaining gglbet5.com",
    (s.match(/gglbet5\.com/g) || []).length,
  );
}

function cleanNewsSeed() {
  const path = "lib/cms/seed/news.ts";
  let s = fs.readFileSync(path, "utf8");
  s = s
    .replaceAll(
      "Rewrites official gglbet5.com announcements into SEO news documents. Does not invent offers.",
      "Rewrites official GGLBET announcements into SEO news documents. Does not invent offers.",
    )
    .replaceAll(
      "Checks that news facts match official gglbet5.com materials before publish.",
      "Checks that news facts match official GGLBET materials before publish.",
    )
    .replaceAll(
      "Official gglbet5.com announcements only.",
      "Official GGLBET announcements only.",
    )
    .replaceAll(
      "rewritten from official gglbet5.com announcements",
      "rewritten from official GGLBET announcements",
    )
    .replaceAll(
      "from official gglbet5.com materials",
      "from official GGLBET materials",
    )
    .replaceAll(
      "from official gglbet5.com announcements",
      "from official GGLBET announcements",
    )
    .replaceAll("on gglbet5.com", "on GGLBET")
    .replaceAll("from gglbet5.com", "from official GGLBET announcements")
    .replaceAll(
      'keywords: [...input.tags, "gglbet news", "gglbet5.com official"]',
      'keywords: [...input.tags, "gglbet news", "gglbet official"]',
    )
    .replaceAll(
      'title: "Official GGLBET News Hub | gglbet5.com Announcements"',
      'title: "GGLBET News | Platform, Promotions & Product Updates"',
    )
    .replaceAll(
      "Read GGLBET news rewritten from official gglbet5.com announcements only. Promotions, sports, slots, VIP, Telegram, and platform updatesâ€”no third-party sources.",
      "Read GGLBET news rewritten from official GGLBET announcements only. Promotions, sports, slots, VIP, Telegram, and platform updates—no third-party sources.",
    )
    .replaceAll(
      'subheading: "GGLBET news sourced only from gglbet5.com"',
      'subheading: "GGLBET news sourced only from official GGLBET announcements"',
    )
    .replaceAll(
      "Every news document on the GGLBET hub maps to an official gglbet5.com promotion or feature announcement. Facts stay exact; prose is rewritten for SEO. The live official page always wins.",
      "Every news document on the GGLBET hub maps to an official GGLBET announcement. Facts stay exact; prose is rewritten for SEO. The live GGLBET product always wins.",
    )
    .replaceAll(
      'heading: "How GGLBET news stays aligned with gglbet5.com"',
      'heading: "How GGLBET news stays aligned with official product updates"',
    )
    .replaceAll(
      'heading: "Verify on gglbet5.com, then explore GGLBET"',
      'heading: "Verify live GGLBET details, then keep browsing"',
    )
    .replaceAll(
      "Official casino-related announcements sourced from gglbet5.com.",
      "Official casino-related announcements sourced from GGLBET.",
    )
    .replaceAll(
      "Official slots tournament and free-spin announcements from gglbet5.com.",
      "Official slots tournament and free-spin announcements from GGLBET.",
    )
    .replaceAll(
      "Official provider mentions that appear inside gglbet5.com announcements.",
      "Official provider mentions that appear inside GGLBET announcements.",
    )
    .replaceAll(
      "Official promotion launches and seasonal offers from gglbet5.com.",
      "Official promotion launches and seasonal offers from GGLBET.",
    )
    .replaceAll(
      "Official sportsbook and esports announcements from gglbet5.com.",
      "Official sportsbook and esports announcements from GGLBET.",
    )
    .replaceAll(
      "Official lottery announcements when published on gglbet5.com.",
      "Official lottery announcements when published on GGLBET.",
    )
    .replaceAll(
      "Official cashier or deposit announcements from gglbet5.com.",
      "Official cashier or deposit announcements from GGLBET.",
    )
    .replaceAll(
      "Official security or verification announcements from gglbet5.com.",
      "Official security or verification announcements from GGLBET.",
    )
    .replaceAll(
      "Official platform, VIP, Telegram, and feature announcements from gglbet5.com.",
      "Official platform, VIP, Telegram, and feature announcements from GGLBET.",
    )
    .replaceAll(
      "Reserved for official industry notices published on gglbet5.com only.",
      "Reserved for official industry notices published on GGLBET only.",
    )
    .replaceAll(
      "Always confirm live details on gglbet5.com before depositing",
      "Always confirm live details on GGLBET before depositing",
    )
    .replaceAll(
      "preserves official figures, dates, and eligibility cues from gglbet5.com",
      "preserves official figures, dates, and eligibility cues from GGLBET",
    )
    .replaceAll(
      "re-check the live gglbet5.com page",
      "re-check the live GGLBET page",
    )
    .replaceAll(
      "then verify on gglbet5.com before acting",
      "then verify on GGLBET before acting",
    )
    .replaceAll(
      "helps you avoid unofficial mirrors that rewrite announcements incorrectly.",
      "helps you avoid unofficial copies that rewrite announcements incorrectly.",
    );

  fs.writeFileSync(path, s);
  console.log("news.ts remaining gglbet5.com", (s.match(/gglbet5\.com/g) || []).length);
}

cleanNewsOfficial();
cleanNewsSeed();
