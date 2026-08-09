const fs = require("fs");

function replaceAll(file, pairs) {
  let s = fs.readFileSync(file, "utf8");
  for (const [a, b] of pairs) s = s.split(a).join(b);
  fs.writeFileSync(file, s);
  return (s.match(/gglbet5\.com/g) || []).length;
}

// --- news FAQ ---
replaceAll("lib/cms/seed/faq/news-faq.ts", [
  [
    "Why should I verify GGLBET news on gglbet5.com?",
    "Why should I verify GGLBET news on the live product?",
  ],
  [
    "為何應在 gglbet5.com 核實 GGLBET 新聞？",
    "為何應在即時 GGLBET 產品核實新聞？",
  ],
  ["gglbet5.com", "GGLBET"],
  ["official-update mirror", "official-update hub"],
  ["鏡像", "改寫"],
  ["mirrored into the CMS", "published into the CMS"],
  ["mirrored typos", "copied typos"],
]);

// --- support FAQ questions ---
replaceAll("lib/cms/seed/support/support-hub.ts", [
  [
    "Does the Support hub replace gglbet5.com?",
    "Does the Support hub replace the live GGLBET product?",
  ],
  [
    "Support 中心會取代 gglbet5.com 嗎？",
    "Support 中心會取代即時 GGLBET 產品嗎？",
  ],
]);

replaceAll("lib/cms/seed/support/editorial-policy.ts", [
  [
    "What is the difference between hub pages and gglbet5.com?",
    "What is the difference between hub pages and the live GGLBET product?",
  ],
  [
    "中心頁與 gglbet5.com 有何差別？",
    "中心頁與即時 GGLBET 產品有何差別？",
  ],
]);

replaceAll("lib/cms/seed/support/about-our-team.ts", [
  [
    "How does the team relate to gglbet5.com?",
    "How does the team relate to the live GGLBET product?",
  ],
  [
    "團隊與 gglbet5.com 有何關係？",
    "團隊與即時 GGLBET 產品有何關係？",
  ],
]);

// --- Support meta (primary SEO) ---
replaceAll("lib/cms/seed/support/download.ts", [
  [
    "Confirm live download details on gglbet5.com.",
    "Confirm live download details after GGLBET login.",
  ],
  [
    "請在 gglbet5.com 確認即時下載細節。",
    "請於登入 GGLBET 後確認即時下載細節。",
  ],
]);

replaceAll("lib/cms/seed/support/payment.ts", [
  [
    "Confirm live methods inside your signed-in GGLBET session on gglbet5.com.",
    "Confirm live methods inside your signed-in GGLBET cashier.",
  ],
  [
    "請在已登入的 GGLBET 工作階段於 gglbet5.com 確認即時可用方式。",
    "請在已登入的 GGLBET 出納確認即時可用方式。",
  ],
]);

// --- residual EEAT heroes ---
replaceAll("lib/cms/seed/residual-trust-pages.ts", [
  ['heroTitle: "Privacy policy"', 'heroTitle: "GGLBET privacy policy"'],
  [
    'heroTitle: "Terms and conditions"',
    'heroTitle: "GGLBET terms and conditions"',
  ],
  ['heroTitle: "VIP programme"', 'heroTitle: "GGLBET VIP programme"'],
  [
    'heroTitle: "Referral programme"',
    'heroTitle: "GGLBET referral programme"',
  ],
  [
    'heroTitle: "Content quality policy"',
    'heroTitle: "GGLBET content quality policy"',
  ],
  [
    'heroTitle: "Content update policy"',
    'heroTitle: "GGLBET content update policy"',
  ],
]);

// --- guides category heroes + CTAs ---
replaceAll("lib/cms/seed/guides.ts", [
  ['heroTitle: "Beginner casino guides"', 'heroTitle: "GGLBET beginner guides"'],
  [
    'heroTitle: "Casino platform guides"',
    'heroTitle: "GGLBET casino platform guides"',
  ],
  ['heroTitle: "Slot game guides"', 'heroTitle: "GGLBET slot guides"'],
  ['heroTitle: "Live casino guides"', 'heroTitle: "GGLBET live casino guides"'],
  [
    'heroTitle: "Sports betting guides"',
    'heroTitle: "GGLBET sports betting guides"',
  ],
  ['heroTitle: "Fishing game guides"', 'heroTitle: "GGLBET fishing guides"'],
  ['heroTitle: "Lottery guides"', 'heroTitle: "GGLBET lottery guides"'],
  ['heroTitle: "Promotion guides"', 'heroTitle: "GGLBET promotion guides"'],
  [
    'heroTitle: "Payment method guides"',
    'heroTitle: "GGLBET payment guides"',
  ],
  ['heroTitle: "VIP program guides"', 'heroTitle: "GGLBET VIP guides"'],
  [
    'heroTitle: "Account security guides"',
    'heroTitle: "GGLBET account security guides"',
  ],
  [
    'heroTitle: "Responsible gaming guides"',
    'heroTitle: "GGLBET responsible gaming guides"',
  ],
  [
    'heroTitle: "App download guides"',
    'heroTitle: "GGLBET app download guides"',
  ],
  [
    'heroTitle: "Troubleshooting guides"',
    'heroTitle: "GGLBET troubleshooting guides"',
  ],
  ['ctaPrimaryLabel: "Browse all guides"', 'ctaPrimaryLabel: "Browse GGLBET guides"'],
  [
    'const ctaPrimaryLabel = article?.ctaPrimaryLabel ?? "Explore games";',
    'const ctaPrimaryLabel = article?.ctaPrimaryLabel ?? "Browse GGLBET games";',
  ],
  ["live GGLBET / gglbet5.com lobby", "live GGLBET lobby"],
  [
    "Keep learning on GGLBET, then explore with intention",
    "Keep learning on GGLBET, then open games with intention",
  ],
]);

// --- featured game SEO ---
{
  const f = "lib/cms/seed/content/games/featured-seo.ts";
  let s = fs.readFileSync(f, "utf8");
  s = s
    .split("official gglbet5.com partners game list and mirrored on GGLBET")
    .join("official GGLBET partners game catalog listed on GGLBET")
    .split(
      "official gglbet5.com casino partners game catalog and mirrored on GGLBET",
    )
    .join("official GGLBET casino partners game catalog listed on GGLBET")
    .split("gglbet5.com")
    .join("GGLBET")
    .split('"Continue on GGLBET"')
    .join('"Play more on GGLBET"');
  // restore URL if any
  s = s.split("https://www.GGLBET/").join("https://www.gglbet5.com/");
  fs.writeFileSync(f, s);
  console.log("featured-seo remaining", (s.match(/gglbet5\.com/g) || []).length);
}

// --- home generic CTAs ---
replaceAll("lib/cms/seed/home-page.ts", [
  ['label: L("Explore games", "探索遊戲")', 'label: L("Browse GGLBET games", "瀏覽 GGLBET 遊戲")'],
  ['label: L("Explore VIP", "了解 VIP")', 'label: L("GGLBET VIP", "GGLBET VIP")'],
]);

// --- games listing CTA ---
{
  const f = "lib/cms/seed/games.ts";
  if (fs.existsSync(f)) {
    let s = fs.readFileSync(f, "utf8");
    s = s
      .split("Ready to explore GGLBET games?")
      .join("Ready to play GGLBET games?")
      .split("準備好探索 GGLBET 遊戲了嗎？")
      .join("準備好遊玩 GGLBET 遊戲了嗎？")
      .split("gglbet5.com")
      .join("GGLBET");
    s = s.split("https://www.GGLBET/").join("https://www.gglbet5.com/");
    fs.writeFileSync(f, s);
    console.log("games.ts remaining", (s.match(/gglbet5\.com/g) || []).length);
  }
}

// --- providers mild ---
replaceAll("lib/cms/seed/providers.ts", [
  [
    "Explore GGLBET casino providers in one clear provider directory.",
    "Browse GGLBET casino providers in one clear provider directory.",
  ],
  [
    "Ready to explore GGLBET providers and games?",
    "Ready to browse GGLBET providers and games?",
  ],
]);

replaceAll("lib/cms/seed/content/providers/zh-copy.ts", [
  [
    "準備探索 GGLBET 供應商與遊戲了嗎？",
    "準備瀏覽 GGLBET 供應商與遊戲了嗎？",
  ],
]);

replaceAll("lib/cms/seed/content/providers/from-official.ts", [
  ["Explore ${short} on GGLBET", "Play ${short} games on GGLBET"],
  [
    "Continue to the games catalog filtered by this provider, or return to the full official provider directory.",
    "Open the GGLBET games catalog filtered by this provider, or return to the full GGLBET provider directory.",
  ],
]);

// --- features hardcoded ---
[
  [
    "features/news/components/NewsDetailPage.tsx",
    [["Learn more before you act", "Read GGLBET guides before you act"]],
  ],
  [
    "features/providers/components/ProviderDetailPage.tsx",
    [["Browse all games", "Browse GGLBET games"]],
  ],
  [
    "features/support/support-ui-copy.ts",
    [
      [
        "Continue with clear GGLBET documentation",
        "Next step with clear GGLBET documentation",
      ],
      [
        "用清楚的 GGLBET 說明繼續",
        "下一步：清楚的 GGLBET 說明",
      ],
    ],
  ],
].forEach(([file, pairs]) => {
  if (fs.existsSync(file)) replaceAll(file, pairs);
});

// promotions SOURCE_NOTE cleanup
replaceAll("lib/cms/seed/content/promotions/from-official.ts", [
  [
    'const SOURCE_NOTE =\n  "Official source: https://www.gglbet5.com promotions CMS (partner site_id 891). Figures and terms are taken only from the live promotion content published there.";',
    'const SOURCE_NOTE =\n  "Editorial note: figures and terms are taken only from official GGLBET promotion materials verified against the live product.";',
  ],
]);

console.log("batch done");
