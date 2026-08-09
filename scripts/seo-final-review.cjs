/**
 * Global SEO Final Review — read-only brand-blind + theme coherence audit.
 */
const BASE = process.env.QA_BASE || "http://localhost:3000";

const PAGES = [
  ["home", "/en", ["casino", "slots", "login", "register", "download", "malaysia"]],
  ["games", "/en/games", ["game", "slot", "live", "catalog", "provider"]],
  ["game-detail", "/en/game/pragmatic-play/gates-of-olympus", ["game", "slot", "provider", "play"]],
  ["providers", "/en/providers", ["provider", "studio", "directory", "catalog"]],
  ["provider-detail", "/en/provider/pragmatic-play", ["provider", "studio", "game"]],
  ["promotions", "/en/promotions", ["promotion", "bonus", "offer", "cashback", "spin"]],
  ["promotion-detail", "/en/promotion/daily-188-free-spins-200-1026182", ["promotion", "bonus", "offer", "claim", "term"]],
  ["guides", "/en/guides", ["guide", "how", "tutorial", "step"]],
  ["guide-detail", "/en/guide/beginner/how-to-get-started-on-gglbet", ["guide", "start", "register", "login"]],
  ["news", "/en/news", ["news", "announcement", "update"]],
  ["news-detail", "/en/news/promotions/singapore-national-day-61-official-announcement", ["news", "announcement", "promotion"]],
  ["support", "/en/support", ["support", "help", "faq", "payment", "contact"]],
  ["faq", "/en/faq", ["faq", "question", "account", "help"]],
  ["payment", "/en/payment", ["payment", "deposit", "withdraw", "cashier"]],
  ["download", "/en/download", ["download", "app", "android", "ios", "install"]],
  ["responsible-gaming", "/en/responsible-gaming", ["responsible", "limit", "safer", "exclusion"]],
  ["about", "/en/about", ["about", "company", "brand", "mission"]],
  ["editorial-policy", "/en/editorial-policy", ["editorial", "policy", "source", "correction"]],
  ["about-our-team", "/en/about-our-team", ["team", "editor", "desk"]],
  ["contact", "/en/contact", ["contact", "support", "chat", "email"]],
  ["privacy", "/en/privacy-policy", ["privacy", "data", "personal"]],
  ["terms", "/en/terms", ["term", "condition", "agreement"]],
  ["vip", "/en/vip", ["vip", "loyalty", "tier"]],
  ["referral", "/en/referral", ["referral", "invite", "friend"]],
  ["news-cat", "/en/news/promotions", ["news", "promotion", "announcement"]],
  ["guide-cat", "/en/guide/beginner", ["guide", "beginner"]],
  ["zh-home", "/zh", ["娛樂", "老虎", "登入", "註冊"]],
  ["zh-providers", "/zh/providers", ["供應商", "目錄", "工作室"]],
  ["zh-promotions", "/zh/promotions", ["優惠", "返水", "迎新"]],
  ["zh-news", "/zh/news", ["新聞", "公告"]],
  ["zh-support", "/zh/support", ["支援", "協助"]],
];

function strip(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function brandBlindScore(text) {
  // Remove GGLBET mentions; remaining copy should still feel weak if only generic.
  const without = text.replace(/GGLBET/gi, "BRAND").replace(/gglbet/gi, "BRAND");
  const generic =
    /\b(discover|explore|learn more|continue|built for|curated|premium experience|trusted platform|best experience|high[- ]intent)\b/i.test(
      without,
    );
  const concrete =
    /\b(slot|live casino|provider|studio|deposit|withdraw|login|register|download|promotion|bonus|guide|faq|payment|news|announcement|vip|referral|malaysia|online casino|cashier|responsible)\b/i.test(
      without,
    ) ||
    /(老虎機|真人|供應商|存款|提款|登入|註冊|下載|優惠|指南|新聞|公告|支付|支援)/.test(
      without,
    );
  // If removing brand leaves only vague marketing → template-like
  const brandCount = (text.match(/GGLBET/gi) || []).length;
  return { brandCount, generic, concrete, withoutPreview: without.slice(0, 160) };
}

function themeHits(text, themes) {
  const lower = text.toLowerCase();
  return themes.filter((t) => lower.includes(t.toLowerCase()));
}

function offThemeFlags(key, text) {
  const t = text.toLowerCase();
  const flags = [];
  if (key.startsWith("provider") && /\b(bonus|free spin|cashback)\b/i.test(t) && !/\bprovider|studio|catalog|directory\b/i.test(t)) {
    flags.push("providers-copy-leans-promo");
  }
  if (key === "providers" || key === "provider-detail") {
    // CTA-only register is ok; body dominated by register/bonus is not
    const promoHeavy = (t.match(/\b(bonus|welcome offer|free spin)\b/g) || []).length;
    const providerHeavy = (t.match(/\b(provider|studio|directory|catalog|software)\b/g) || []).length;
    if (promoHeavy > providerHeavy + 2) flags.push("providers-theme-diluted");
  }
  if (key.startsWith("guide") && /\b(provider directory|company mission|newsroom)\b/i.test(t)) {
    flags.push("guides-off-theme");
  }
  if (key.startsWith("news") && /\b(how to register step|faq accordion tutorial)\b/i.test(t)) {
    flags.push("news-reads-like-guide");
  }
  if (key === "support" || key === "faq" || key === "payment" || key === "download" || key === "contact" || key === "responsible-gaming") {
    if (/\b(studio ranking|provider directory SEO)\b/i.test(t)) flags.push("support-off-theme");
  }
  return flags;
}

async function review(key, path, themes) {
  const res = await fetch(`${BASE}${path}`);
  const html = await res.text();
  const title = (html.match(/<title>([^<]*)<\/title>/i) || [])[1] || "";
  const desc = (html.match(/name="description"\s+content="([^"]*)"/i) || [])[1] || "";
  const h1 = strip((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1] || "");
  // Approximate hero block text
  const heroMatch = html.match(/home-v2-hero[\s\S]{0,4000}/);
  const heroText = heroMatch ? strip(heroMatch[0]).slice(0, 500) : "";
  const primary = `${title}\n${desc}\n${h1}\n${heroText}`;
  const blind = brandBlindScore(primary);
  const hits = themeHits(primary, themes);
  const off = offThemeFlags(key, primary);
  const pending = html.includes("【中文待補】");
  const hasDomain = /gglbet5\.com/i.test(primary);
  // Brand-blind pass: must have brand in primary AND concrete theme terms even after brand token swap
  const templateRisk =
    blind.brandCount < 1 ||
    (!blind.concrete && blind.generic) ||
    (blind.brandCount >= 1 && !blind.concrete && themes.length > 0 && hits.length === 0);
  const themeWeak = hits.length === 0 && themes.length > 0;
  return {
    key,
    path,
    status: res.status,
    title: title.slice(0, 80),
    h1: h1.slice(0, 80),
    brandCount: blind.brandCount,
    themeHits: hits,
    themeWeak,
    templateRisk,
    pending,
    hasDomain,
    off,
    pass:
      res.status < 400 &&
      !pending &&
      !hasDomain &&
      !templateRisk &&
      !themeWeak &&
      off.length === 0,
  };
}

(async () => {
  const rows = [];
  for (const [key, path, themes] of PAGES) {
    try {
      const r = await review(key, path, themes);
      rows.push(r);
      console.log(
        `${r.pass ? "PASS" : "REVIEW"} ${key} brand=${r.brandCount} themes=${r.themeHits.join(",") || "-"} template=${r.templateRisk} pending=${r.pending} | ${r.h1}`,
      );
    } catch (e) {
      rows.push({ key, path, pass: false, error: e.message });
      console.log(`ERR ${key} ${e.message}`);
    }
  }
  const fail = rows.filter((r) => !r.pass);
  const out = {
    scanned: rows.length,
    pass: rows.length - fail.length,
    fail,
    rows,
  };
  require("fs").mkdirSync("qa-screenshots/seo-final-review", { recursive: true });
  require("fs").writeFileSync(
    "qa-screenshots/seo-final-review/report.json",
    JSON.stringify(out, null, 2),
  );
  console.log(`\nscanned=${out.scanned} pass=${out.pass} review=${fail.length}`);
})();
