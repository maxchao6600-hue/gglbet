/**
 * Promotion Final Audit — compares CMS seeds to live gglbet5.com official CMS.
 * Run: npx tsx scripts/audit-promotions.ts
 */
import { writeFileSync } from "node:fs";
import { promotionsSeed } from "../lib/cms/seed/promotions";
import official from "../lib/cms/seed/content/promotions/official/gglbet5-promotions.json";
import { guidesSeed } from "../lib/cms/seed/guides";
import { gamesSeed } from "../lib/cms/seed/games";
import { providersSeed } from "../lib/cms/seed/providers";
import { newsSeed } from "../lib/cms/seed/news";
import { ROUTES } from "../constants/routes";

type OfficialPromo = (typeof official.promotions)[number];

function stripTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function extractOfficialFacts(content: string) {
  const text = stripTags(content);
  const turnover =
    text.match(/Turnover Requirement[:\s]*([0-9]+x)/i)?.[1] ??
    text.match(/([0-9]+x)\s*turnover/i)?.[1] ??
    null;
  const percent = text.match(/\b(\d{2,3}%)\b/)?.[1] ?? null;
  const table = content.match(/<table[\s\S]*?<\/table>/i)?.[0] ?? "";
  const rows = [...table.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map((m) =>
    [...(m[1] ?? "").matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((c) =>
      stripTags(c[1] ?? ""),
    ),
  );
  const header = (rows[0] ?? []).slice(1);
  const sgdIdx = header.findIndex((h) => h.toUpperCase() === "SGD");
  const find = (label: RegExp) =>
    rows.find((r) => label.test(r[0] ?? "")) ?? null;
  const cell = (row: string[] | null) =>
    row && sgdIdx >= 0 ? (row[sgdIdx + 1]?.replace(/,/g, "") ?? null) : null;
  return {
    turnover,
    percent,
    minDepositSgd: cell(find(/min\s*deposit/i)),
    maxBonusSgd: cell(find(/max\s*bonus/i)),
    endDateInText:
      text.match(/Bonus Expiry\s*[-–:]?\s*([^.<]+)/i)?.[1]?.trim() ?? null,
  };
}

async function fetchLive(): Promise<OfficialPromo[] | null> {
  try {
    const res = await fetch(
      "https://cms.vmemkhhgjigrjefb.com/api/public/v1/en/partners/891/promotions?platform=0&use_webp=1&category=all&with_meta=1&limit=100&paginate=1",
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
          "Content-Key-Case": "camel",
        },
      },
    );
    if (!res.ok) return null;
    const json = (await res.json()) as {
      success: boolean;
      data: { data: OfficialPromo[] };
    };
    return json.success ? json.data.data : null;
  } catch {
    return null;
  }
}

function officialIdFromSlug(slug: string): number | null {
  const m = slug.match(/-(\d+)$/);
  return m ? Number(m[1]) : null;
}

async function main() {
  const guideSlugs = new Set(guidesSeed.map((g) => g.slug));
  const gameSlugs = new Set(gamesSeed.map((g) => g.slug));
  const providerSlugs = new Set(providersSeed.map((p) => p.slug));
  const newsSlugs = new Set(newsSeed.map((n) => n.slug));
  const promoSlugs = new Set(promotionsSeed.map((p) => p.slug));

  const report: Record<string, unknown> = {
    auditedAt: new Date().toISOString(),
    seedCount: promotionsSeed.length,
    snapshotCount: official.promotions.length,
  };

  const seoGaps: string[] = [];
  const factMismatches: string[] = [];
  const brokenLinks: string[] = [];
  const ctaGaps: string[] = [];
  const faqDupes: string[] = [];
  const missingUpdated: string[] = [];
  const copyRisks: string[] = [];

  for (const p of promotionsSeed) {
    if (!p.title?.trim()) seoGaps.push(`${p.slug}: missing title`);
    if (!p.metaTitle?.trim()) seoGaps.push(`${p.slug}: missing metaTitle`);
    if (!p.metaDescription?.trim())
      seoGaps.push(`${p.slug}: missing metaDescription`);
    if (!p.canonicalPath?.trim())
      seoGaps.push(`${p.slug}: missing canonicalPath`);
    if (!p.excerpt?.trim() && !p.heroDescription?.trim())
      seoGaps.push(`${p.slug}: missing description/excerpt`);
    if (!p.schema?.type) seoGaps.push(`${p.slug}: missing schema.type`);
    if (!p.updatedAt && !p.updatedDate) missingUpdated.push(p.slug);
    if (!p.ctaPrimaryHref || !p.ctaSecondaryHref)
      ctaGaps.push(`${p.slug}: missing primary/secondary CTA`);

    const hrefs: string[] = [p.ctaPrimaryHref, p.ctaSecondaryHref];
    for (const block of p.content) {
      if (block.type === "cta") {
        if (block.primary?.href) hrefs.push(block.primary.href);
        if (block.secondary?.href) hrefs.push(block.secondary.href);
      }
      if (block.type === "relatedContent") {
        for (const s of block.refs.guideSlugs ?? []) {
          if (!guideSlugs.has(s))
            brokenLinks.push(`${p.slug}: broken guide ${s}`);
        }
        for (const s of block.refs.gameSlugs ?? []) {
          if (!gameSlugs.has(s)) brokenLinks.push(`${p.slug}: broken game ${s}`);
        }
        for (const s of block.refs.providerSlugs ?? []) {
          if (!providerSlugs.has(s))
            brokenLinks.push(`${p.slug}: broken provider ${s}`);
        }
        for (const s of block.refs.newsSlugs ?? []) {
          if (!newsSlugs.has(s)) brokenLinks.push(`${p.slug}: broken news ${s}`);
        }
        for (const s of block.refs.promotionSlugs ?? []) {
          if (!promoSlugs.has(s))
            brokenLinks.push(`${p.slug}: broken promotion ${s}`);
        }
      }
    }

    for (const s of p.relatedGuideSlugs) {
      if (!guideSlugs.has(s)) brokenLinks.push(`${p.slug}: relatedGuide ${s}`);
    }
    for (const s of p.relatedGameSlugs) {
      if (!gameSlugs.has(s)) brokenLinks.push(`${p.slug}: relatedGame ${s}`);
    }
    for (const s of p.relatedProviderSlugs) {
      if (!providerSlugs.has(s))
        brokenLinks.push(`${p.slug}: relatedProvider ${s}`);
    }
    for (const s of p.relatedNewsSlugs) {
      if (!newsSlugs.has(s)) brokenLinks.push(`${p.slug}: relatedNews ${s}`);
    }

    const hasRegister = hrefs.some(
      (h) => h === ROUTES.register || h.includes("/register"),
    );
    const hasPromotions = hrefs.some(
      (h) =>
        h === ROUTES.promotions ||
        h.includes("/promotions") ||
        h.includes("gglbet5.com"),
    );
    const hasDownload = hrefs.some(
      (h) => h === ROUTES.download || h.includes("/download"),
    );
    if (!hasRegister) ctaGaps.push(`${p.slug}: missing Register CTA`);
    if (!hasPromotions) ctaGaps.push(`${p.slug}: missing Promotion CTA`);
    if (!hasDownload) ctaGaps.push(`${p.slug}: missing Download CTA`);

    const oid = officialIdFromSlug(p.slug);
    const snap = official.promotions.find((o) => o.id === oid);
    if (!snap) {
      factMismatches.push(`${p.slug}: no official snapshot id ${oid}`);
      continue;
    }
    if (snap.title !== p.title) {
      factMismatches.push(
        `${p.slug}: title differs seed="${p.title}" official="${snap.title}"`,
      );
    }
    const facts = extractOfficialFacts(snap.content);
    if (
      facts.turnover &&
      p.turnoverRequirement &&
      !p.turnoverRequirement.includes(facts.turnover) &&
      p.turnoverRequirement !== "See official terms on gglbet5.com"
    ) {
      factMismatches.push(
        `${p.slug}: turnover seed="${p.turnoverRequirement}" official="${facts.turnover}"`,
      );
    }
    if (
      facts.minDepositSgd &&
      p.minimumDeposit &&
      p.minimumDeposit !== facts.minDepositSgd
    ) {
      factMismatches.push(
        `${p.slug}: minDeposit seed="${p.minimumDeposit}" official SGD="${facts.minDepositSgd}"`,
      );
    }
    if (
      facts.maxBonusSgd &&
      p.maximumBonus &&
      p.maximumBonus !== facts.maxBonusSgd
    ) {
      factMismatches.push(
        `${p.slug}: maxBonus seed="${p.maximumBonus}" official SGD="${facts.maxBonusSgd}"`,
      );
    }
    const seedEnd = p.endDate ? p.endDate.slice(0, 10) : null;
    const officialEnd = snap.endDate ? snap.endDate.slice(0, 10) : null;
    if (seedEnd !== officialEnd) {
      factMismatches.push(
        `${p.slug}: endDate seed="${seedEnd}" official="${officialEnd}"`,
      );
    }

    const officialPlain = stripTags(snap.content);
    const introBlocks = p.content
      .filter((b) => b.type === "paragraph")
      .map((b) => (b.type === "paragraph" ? b.text : ""))
      .join(" ");
    const sample = officialPlain.slice(0, 80);
    if (sample.length > 40 && introBlocks.includes(sample)) {
      copyRisks.push(`${p.slug}: possible verbatim official copy`);
    }
  }

  const answerMap = new Map<string, string[]>();
  for (const p of promotionsSeed) {
    for (const f of p.faq) {
      const key = f.answer.trim().toLowerCase();
      const list = answerMap.get(key) ?? [];
      list.push(p.slug);
      answerMap.set(key, list);
    }
  }
  for (const [answer, slugs] of answerMap) {
    if (slugs.length > 3 && answer.length > 40) {
      faqDupes.push(
        `FAQ answer repeated ${slugs.length}x (e.g. ${slugs.slice(0, 3).join(", ")})`,
      );
    }
  }

  const live = await fetchLive();
  let liveDiffs: string[] = [];
  if (live) {
    report.liveCount = live.length;
    const liveIds = new Set(live.map((p) => p.id));
    const snapIds = new Set(official.promotions.map((p) => p.id));
    for (const id of snapIds) {
      if (!liveIds.has(id)) liveDiffs.push(`snapshot id ${id} missing on live`);
    }
    for (const id of liveIds) {
      if (!snapIds.has(id)) liveDiffs.push(`live id ${id} not in snapshot/seed`);
    }
    for (const lp of live) {
      const seed = promotionsSeed.find(
        (p) => officialIdFromSlug(p.slug) === lp.id,
      );
      if (!seed) continue;
      if (seed.title !== lp.title) {
        liveDiffs.push(
          `${seed.slug}: live title "${lp.title}" vs seed "${seed.title}"`,
        );
      }
      const liveEnd = lp.endDate ? String(lp.endDate).slice(0, 10) : null;
      const seedEnd = seed.endDate ? seed.endDate.slice(0, 10) : null;
      if (liveEnd !== seedEnd) {
        liveDiffs.push(
          `${seed.slug}: live end "${liveEnd}" vs seed "${seedEnd}"`,
        );
      }
    }
  } else {
    liveDiffs = ["Could not fetch live CMS — compared snapshot only"];
  }

  report.seoGaps = seoGaps;
  report.factMismatches = factMismatches;
  report.brokenLinks = brokenLinks;
  report.ctaGaps = [...new Set(ctaGaps)];
  report.faqDupes = [...new Set(faqDupes)].slice(0, 20);
  report.missingUpdated = missingUpdated;
  report.copyRisks = copyRisks;
  report.liveDiffs = liveDiffs;
  report.summary = {
    seoOk: seoGaps.length === 0,
    factsOk: factMismatches.length === 0,
    linksOk: brokenLinks.length === 0,
    ctaOk: ctaGaps.filter((c) => !c.includes("missing Register") && !c.includes("missing Download") && !c.includes("missing Promotion")).length === 0 &&
      !ctaGaps.some((c) => c.includes("missing primary")),
    registerCtaMissing: ctaGaps.filter((c) => c.includes("missing Register")).length,
    downloadCtaMissing: ctaGaps.filter((c) => c.includes("missing Download")).length,
    promotionCtaMissing: ctaGaps.filter((c) => c.includes("missing Promotion")).length,
    faqUniqueOk: faqDupes.length === 0,
    updatedOk: missingUpdated.length === 0,
    copyOk: copyRisks.length === 0,
    liveParityOk: liveDiffs.length === 0,
  };

  writeFileSync(
    "scripts/promotion-audit-report.json",
    JSON.stringify(report, null, 2),
  );
  console.log(JSON.stringify(report.summary, null, 2));
  console.log("ctaGaps count", (report.ctaGaps as string[]).length);
  console.log("factMismatches", factMismatches.slice(0, 20));
  console.log("faqDupes", faqDupes.length, faqDupes.slice(0, 5));
  console.log("liveDiffs", liveDiffs.slice(0, 20));
  console.log("brokenLinks", brokenLinks.slice(0, 20));
  console.log("seoGaps", seoGaps);
  console.log("copyRisks", copyRisks);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
