const fs = require("fs");
const path = require("path");

const DIR = path.join("lib", "cms", "seed", "support");
const files = [
  "about.ts",
  "faq.ts",
  "payment.ts",
  "download.ts",
  "responsible-gaming.ts",
  "contact.ts",
  "editorial-policy.ts",
  "about-our-team.ts",
  "support-hub.ts",
];

const MAP = [
  [/label:\s*"Register on GGLBET"/g, 'label: L("Register on GGLBET", "註冊 GGLBET") as unknown as string'],
  [/label:\s*"Register"/g, 'label: L("Register on GGLBET", "註冊 GGLBET") as unknown as string'],
  [/label:\s*"Log in to GGLBET"/g, 'label: L("Log in to GGLBET", "登入 GGLBET") as unknown as string'],
  [/label:\s*"Log in"/g, 'label: L("Log in to GGLBET", "登入 GGLBET") as unknown as string'],
  [/label:\s*"GGLBET Support hub"/g, 'label: L("GGLBET Support", "GGLBET 支援中心") as unknown as string'],
  [/label:\s*"GGLBET Support"/g, 'label: L("GGLBET Support", "GGLBET 支援中心") as unknown as string'],
  [/label:\s*"Support hub"/g, 'label: L("GGLBET Support", "GGLBET 支援中心") as unknown as string'],
  [/label:\s*"Support"/g, 'label: L("GGLBET Support", "GGLBET 支援中心") as unknown as string'],
  [/label:\s*"GGLBET FAQ"/g, 'label: L("GGLBET FAQ", "GGLBET 常見問題") as unknown as string'],
  [/label:\s*"Open FAQ"/g, 'label: L("GGLBET FAQ", "GGLBET 常見問題") as unknown as string'],
  [/label:\s*"GGLBET Payment methods"/g, 'label: L("GGLBET Payment methods", "GGLBET 支付方式") as unknown as string'],
  [/label:\s*"Payment methods"/g, 'label: L("GGLBET Payment methods", "GGLBET 支付方式") as unknown as string'],
  [/label:\s*"Download GGLBET"/g, 'label: L("Download GGLBET", "下載 GGLBET") as unknown as string'],
  [/label:\s*"Download app"/g, 'label: L("Download GGLBET", "下載 GGLBET") as unknown as string'],
  [/label:\s*"Contact GGLBET"/g, 'label: L("Contact GGLBET", "聯絡 GGLBET") as unknown as string'],
  [/label:\s*"Contact support"/g, 'label: L("Contact GGLBET", "聯絡 GGLBET") as unknown as string'],
  [/label:\s*"Contact"/g, 'label: L("Contact GGLBET", "聯絡 GGLBET") as unknown as string'],
  [/label:\s*"Responsible gaming"/g, 'label: L("Responsible gaming", "負責任博彩") as unknown as string'],
  [/label:\s*"About GGLBET"/g, 'label: L("About GGLBET", "關於 GGLBET") as unknown as string'],
  [/label:\s*"Editorial policy"/g, 'label: L("Editorial policy", "編輯政策") as unknown as string'],
  [/label:\s*"About our team"/g, 'label: L("About our team", "關於我們的團隊") as unknown as string'],
  [/label:\s*"Browse GGLBET games"/g, 'label: L("Browse GGLBET games", "瀏覽 GGLBET 遊戲") as unknown as string'],
  [/label:\s*"Browse games"/g, 'label: L("Browse GGLBET games", "瀏覽 GGLBET 遊戲") as unknown as string'],
  [/label:\s*"Learn More"/gi, 'label: L("GGLBET FAQ", "GGLBET 常見問題") as unknown as string'],
  [/label:\s*"Read More"/gi, 'label: L("GGLBET FAQ", "GGLBET 常見問題") as unknown as string'],
  [/label:\s*"Continue"/gi, 'label: L("GGLBET Support", "GGLBET 支援中心") as unknown as string'],
  [/label:\s*"Explore"/gi, 'label: L("Browse GGLBET games", "瀏覽 GGLBET 遊戲") as unknown as string'],
];

for (const file of files) {
  const full = path.join(DIR, file);
  let src = fs.readFileSync(full, "utf8");
  if (!src.includes('from "@/lib/i18n"') && !src.includes("from '@/lib/i18n'")) {
    if (src.includes('import { L }')) {
      // ok
    } else if (src.includes('from "./factory"')) {
      // L usually already imported
    }
  }
  if (!/\bL\b/.test(src.match(/import[\s\S]*?from ["']@\/lib\/i18n["']/)?.[0] || "") && !src.includes("import { L }")) {
    src = src.replace(
      /import \{ L \} from "@\/lib\/i18n";\n?/,
      "",
    );
    if (!src.includes('from "@/lib/i18n"')) {
      src = `import { L } from "@/lib/i18n";\n` + src;
    }
  }

  // Remove relatedPaths blocks (factory uses curated clusters)
  src = src.replace(/\n\s*relatedPaths:\s*\[[\s\S]*?\],\n/g, "\n");

  for (const [re, rep] of MAP) {
    src = src.replace(re, rep);
  }

  fs.writeFileSync(full, src);
  const leftover = [...src.matchAll(/ctas:\s*\[[\s\S]*?\]/g)]
    .map((m) => m[0])
    .join("\n");
  const plain = leftover.match(/label:\s*"[^"]+"/g) || [];
  console.log(file, "plain labels left in ctas:", plain.length, plain.slice(0, 5));
}
