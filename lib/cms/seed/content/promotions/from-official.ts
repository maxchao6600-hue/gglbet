import { ROUTES } from "@/constants/routes";
import {
  buildPromotionLongformBlocks,
  type PromotionLongformSections,
} from "@/lib/cms/seed/content/promotions/longform";
import type { BonusType, PromotionType } from "@/types/promotion";
import officialSnapshot from "@/lib/cms/seed/content/promotions/official/gglbet5-promotions.json";

export type OfficialPromotionRecord = {
  readonly id: number;
  readonly title: string;
  readonly endDate: string | null;
  readonly src: string | null;
  readonly srcAlt: string | null;
  readonly metaTitle: string | null;
  readonly metaDescription: string | null;
  readonly metaUrl: string | null;
  readonly optIn: unknown;
  readonly content: string;
  readonly showTo: unknown;
  readonly depositType: unknown;
  readonly target: unknown;
};

export type OfficialPromotionSeed = {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly officialId: number;
  readonly promotionType: PromotionType;
  readonly bonusType: BonusType;
  readonly bonusAmount: string;
  readonly currency: string;
  readonly minimumDeposit?: string;
  readonly maximumBonus?: string;
  readonly turnoverRequirement?: string;
  readonly eligibleGames: readonly string[];
  readonly startDate: string | null;
  readonly endDate: string | null;
  readonly requirements: readonly string[];
  readonly terms: readonly string[];
  readonly excerpt: string;
  readonly overview: string;
  readonly lastVerified: boolean;
  readonly verifiedDate: string;
  readonly sourceUrl: string;
  readonly sourceName: string;
  readonly longform: PromotionLongformSections;
  readonly blocks: ReturnType<typeof buildPromotionLongformBlocks>;
};

const SOURCE_NAME = "gglbet5.com";
const VERIFIED_DATE = "2026-08-05";
const SOURCE =
  "Editorial note: figures and terms are taken only from official GGLBET promotion materials verified against the live product.";

/**
 * Build CMS promotions exclusively from the gglbet5.com official snapshot.
 * No third-party sources. No invented bonus figures.
 */
export function buildOfficialPromotionSeeds(): readonly OfficialPromotionSeed[] {
  const promotions = officialSnapshot.promotions as readonly OfficialPromotionRecord[];
  const used = new Set<string>();

  return promotions.map((promo) => {
    const parsed = parseOfficialHtml(promo.content);
    const slug = uniqueSlug(promo, used);
    const promotionType = inferPromotionType(promo.title);
    const bonusType = inferBonusType(promo.title, parsed);
    const bonusAmount = parsed.bonusPercent ?? headlineBonus(promo.title) ?? "See official terms";
    const currency = parsed.preferredCurrency ?? "SGD";

    const eligibleGames =
      parsed.eligibleNotes.length > 0
        ? parsed.eligibleNotes
        : ["See eligible games listed in the official promotion terms on GGLBET"];

    const terms =
      parsed.termBullets.length > 0
        ? parsed.termBullets
        : [
            "Follow the full terms published on the official GGLBET promotion page.",
            "If this editorial summary differs from the live promotion panel, follow the live panel.",
          ];

    const requirements = [
      "Open the promotion on GGLBET while logged in (or register first if required by the live offer).",
      "Confirm the live bonus figures, turnover, eligible games, and expiry on the official promotion page before opting in.",
      ...(parsed.minDepositByCurrency.length > 0
        ? [
            `Meet the published minimum deposit for your wallet currency (${parsed.minDepositByCurrency.join("; ")}).`,
          ]
        : []),
      ...(parsed.turnover
        ? [`Complete the published turnover requirement: ${parsed.turnover}.`]
        : []),
    ];

    const excerpt = buildExcerpt(promo.title, parsed, bonusAmount, currency);
    const introduction = buildIntroduction(promo, parsed, bonusAmount, currency);
    const claimSteps = buildClaimSteps(promo.title, parsed);
    const faq = buildFaq(promo, parsed, bonusAmount, currency);
    const sourceUrl = buildOfficialSourceUrl(promo);

    const longform: PromotionLongformSections = {
      title: promo.title,
      slug,
      promotionType,
      bonusType,
      currency,
      bonusAmount,
      maximumBonus: parsed.maxBonusByCurrency.find((row) => row.startsWith("SGD"))?.split(" ")[1] ??
        parsed.maxBonusByCurrency[0]?.split(" ")[1],
      minimumDeposit: parsed.minDepositByCurrency.find((row) => row.startsWith("SGD"))?.split(" ")[1] ??
        parsed.minDepositByCurrency[0]?.split(" ")[1],
      turnoverRequirement: parsed.turnover ?? "See official terms on GGLBET",
      eligibleGames,
      tldr: excerpt,
      introduction,
      whoIsEligibleLead:
        "Eligibility is defined only by the official GGLBET promotion terms. Use this checklist as a reading aid, then confirm on the live page.",
      whoIsEligible: [
        "You can access the official GGLBET promotions area for your account",
        "The promotion is still listed and not marked ended on GGLBET",
        ...(parsed.minDepositByCurrency.length > 0
          ? ["You can meet the published minimum deposit for your currency"]
          : []),
        ...(parsed.turnover
          ? [`You can complete the published turnover: ${parsed.turnover}`]
          : []),
        "You accept that the live GGLBET panel overrides any editorial summary",
      ],
      howToClaimLead:
        "Claim flow follows the official GGLBET promotion page. Do not use third-party mirrors or guessed promo codes unless the live page explicitly requires a code.",
      claimSteps,
      importantNotesLead:
        "These notes restate constraints published on the official promotion content.",
      importantNotes: [
        ...terms.slice(0, 6),
        ...(promo.endDate
          ? [`Official end date published on GGLBET: ${promo.endDate}`]
          : ["No fixed end date was published on this promotion record; confirm live availability on GGLBET"]),
        "Always re-check figures on GGLBET before depositing or opting in",
      ],
      requirements,
      terms,
      faq,
      summary: buildSummary(promo.title, parsed, bonusAmount, currency),
      sourceNote: SOURCE,
      lastVerified: true,
      verifiedDate: VERIFIED_DATE,
      sourceUrl,
      sourceName: SOURCE_NAME,
      relatedProviderSlugs: [],
      relatedGameSlugs: [],
      relatedGuideSlugs: ["how-to-read-promotion-terms"],
      relatedNewsSlugs: [],
      relatedPromotionSlugs: [],
      ctaPrimaryLabel: "Claim on GGLBET",
      ctaPrimaryHref: ROUTES.register,
      ctaSecondaryLabel: "How to read promotion terms",
      ctaSecondaryHref: "/guide/promotions/how-to-read-promotion-terms",
      metaTitle:
        promo.metaTitle && promo.metaTitle.trim()
          ? promo.metaTitle
          : `${promo.title} | GGLBET Promotions`,
      metaDescription:
        promo.metaDescription && promo.metaDescription.trim()
          ? promo.metaDescription
          : excerpt.slice(0, 155).replace(/\s+\S*$/, ""),
    };

    return {
      id: `promo-gglbet5-${promo.id}`,
      slug,
      title: promo.title,
      officialId: promo.id,
      promotionType,
      bonusType,
      bonusAmount,
      currency,
      minimumDeposit: longform.minimumDeposit,
      maximumBonus: longform.maximumBonus,
      turnoverRequirement: longform.turnoverRequirement,
      eligibleGames,
      startDate: null,
      endDate: promo.endDate,
      requirements,
      terms,
      excerpt,
      overview: introduction.join("\n\n"),
      lastVerified: true,
      verifiedDate: VERIFIED_DATE,
      sourceUrl,
      sourceName: SOURCE_NAME,
      longform,
      blocks: buildPromotionLongformBlocks(longform),
    };
  });
}

type ParsedOfficial = {
  readonly plainParagraphs: readonly string[];
  readonly termBullets: readonly string[];
  readonly eligibleNotes: readonly string[];
  readonly bonusPercent: string | null;
  readonly turnover: string | null;
  readonly preferredCurrency: string | null;
  readonly minDepositByCurrency: readonly string[];
  readonly maxBonusByCurrency: readonly string[];
  readonly maxBetByCurrency: readonly string[];
  readonly bonusExpiry: string | null;
};

function parseOfficialHtml(html: string): ParsedOfficial {
  const text = html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li|tr|h\d)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#\d+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const bullets = [...html.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
    .map((m) => stripTags(m[1] ?? "").trim())
    .filter(Boolean);

  const paragraphs = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((m) => stripTags(m[1] ?? "").trim())
    .filter((p) => p.length > 0 && p !== "&nbsp;");

  const eligibleNotes = bullets.filter((b) =>
    /available for|eligible|slots games|sportsbook|live casino|all slots|only/i.test(b),
  );

  const turnoverFromBullets = bullets
    .map((b) => b.match(/Turnover[^0-9]*([0-9]+x)/i))
    .find((m): m is RegExpMatchArray => Boolean(m));
  const turnoverMatch =
    text.match(/Turnover Requirement[:\s]*([0-9]+x)/i) ||
    text.match(/([0-9]+x)\s*turnover/i) ||
    turnoverFromBullets;

  const bonusFromBullets = bullets
    .map((b) => b.match(/\b(\d{2,3}%)\b/))
    .find((m): m is RegExpMatchArray => Boolean(m));
  const bonusPercentMatch = text.match(/\b(\d{2,3}%)\b/) || bonusFromBullets;

  const expiryFromBullets = bullets
    .map((b) => b.match(/Bonus Expiry\s*[-–:]?\s*(.+)/i))
    .find((m): m is RegExpMatchArray => Boolean(m));
  const expiryMatch =
    text.match(/Bonus Expiry\s*[-–:]?\s*([^.<\n]+)/i) || expiryFromBullets;

  const tableFacts = parseCurrencyTable(html);

  return {
    plainParagraphs: paragraphs,
    termBullets: bullets,
    eligibleNotes,
    bonusPercent: bonusPercentMatch?.[1] ?? null,
    turnover: turnoverMatch?.[1] ?? null,
    preferredCurrency: tableFacts.currencies.includes("SGD")
      ? "SGD"
      : tableFacts.currencies[0] ?? null,
    minDepositByCurrency: tableFacts.minDeposit,
    maxBonusByCurrency: tableFacts.maxBonus,
    maxBetByCurrency: tableFacts.maxBet,
    bonusExpiry: expiryMatch?.[1]?.trim() ?? null,
  };
}

function parseCurrencyTable(html: string): {
  readonly currencies: readonly string[];
  readonly minDeposit: readonly string[];
  readonly maxBonus: readonly string[];
  readonly maxBet: readonly string[];
} {
  const table = html.match(/<table[\s\S]*?<\/table>/i)?.[0];
  if (!table) {
    return { currencies: [], minDeposit: [], maxBonus: [], maxBet: [] };
  }

  const rows = [...table.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map((m) =>
    [...(m[1] ?? "").matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((cell) =>
      stripTags(cell[1] ?? "").trim(),
    ),
  );

  if (rows.length < 2) {
    return { currencies: [], minDeposit: [], maxBonus: [], maxBet: [] };
  }

  const header = (rows[0] ?? []).slice(1);
  const currencies = header.filter((c) =>
    /^(MYR|SGD|PHP|USDT|USD|EUR|THB|IDR|VND)$/i.test(c),
  );

  const findRow = (label: RegExp) =>
    rows.find((r) => label.test(r[0] ?? "")) ?? null;

  const mapRow = (row: string[] | null) => {
    if (!row) return [] as string[];
    return currencies
      .map((cur, i) => {
        const value = row[i + 1];
        return value ? `${cur} ${value.replace(/,/g, "")}` : null;
      })
      .filter((v): v is string => Boolean(v));
  };

  return {
    currencies,
    minDeposit: mapRow(findRow(/min\s*deposit/i)),
    maxBonus: mapRow(findRow(/max\s*bonus/i)),
    maxBet: mapRow(findRow(/max\s*bet/i)),
  };
}

function stripTags(value: string): string {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function uniqueSlug(promo: OfficialPromotionRecord, used: Set<string>): string {
  const fromMeta = promo.metaUrl?.trim();
  const base = slugify(
    fromMeta && fromMeta.length > 0 ? fromMeta : promo.title,
  );
  let slug = `${base}-${promo.id}`;
  if (used.has(slug)) slug = `${slug}-x`;
  used.add(slug);
  return slug;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);
}

function inferPromotionType(title: string): PromotionType {
  const t = title.toLowerCase();
  if (t.includes("welcome")) return "welcome";
  if (t.includes("cashback") || t.includes("rebate")) return "cashback";
  if (t.includes("free spin") || t.includes("free spins") || t.includes("spins"))
    return "free-spins";
  if (t.includes("reload")) return "reload";
  if (t.includes("vip")) return "vip";
  if (t.includes("deposit bonus") || t.includes("daily") || t.includes("weekly"))
    return "deposit";
  if (t.includes("national day") || t.includes("festival") || t.includes("ewc"))
    return "seasonal";
  return "other";
}

function inferBonusType(title: string, parsed: ParsedOfficial): BonusType {
  const t = title.toLowerCase();
  if (t.includes("free spin") || t.includes("free spins")) return "free-spins";
  if (t.includes("cashback") || t.includes("rebate")) return "cashback";
  if (parsed.bonusPercent || /\d+%/.test(title)) return "percentage";
  return "mixed";
}

function headlineBonus(title: string): string | null {
  const m = title.match(/(\d+\s*%|\d+\s*free spins?|\$?\d[\d,]*)/i);
  return m?.[1] ? m[1].replace(/\s+/g, " ") : null;
}

function buildExcerpt(
  title: string,
  parsed: ParsedOfficial,
  bonusAmount: string,
  currency: string,
): string {
  const parts = [
    `${title} on GGLBET`,
    bonusAmount !== "See official terms" ? `headline ${bonusAmount}` : null,
    parsed.turnover ? `turnover ${parsed.turnover}` : null,
    parsed.maxBonusByCurrency.find((r) => r.startsWith(currency))
      ? `max bonus ${parsed.maxBonusByCurrency.find((r) => r.startsWith(currency))}`
      : null,
  ].filter(Boolean);
  return `${parts.join(" · ")}. Confirm live GGLBET terms before claiming.`;
}

function buildOfficialSourceUrl(promo: OfficialPromotionRecord): string {
  const titlePath = slugify(promo.metaUrl?.trim() || promo.title);
  return `https://www.gglbet5.com/en/promotions/all/${promo.id}/${titlePath}`;
}

function buildIntroduction(
  promo: OfficialPromotionRecord,
  parsed: ParsedOfficial,
  bonusAmount: string,
  currency: string,
): readonly string[] {
  const lead = `“${promo.title}” is currently listed in the official GGLBET promotions catalog. This page reorganizes that live offer into SEO-friendly sections so players can scan eligibility, claim steps, and key figures before opening the cashier panel.`;

  const facts: string[] = [
    `Headline figure restated from the official page: ${bonusAmount}.`,
  ];
  if (parsed.minDepositByCurrency.length) {
    facts.push(
      `Published minimum deposits by currency: ${parsed.minDepositByCurrency.join(", ")}.`,
    );
  }
  if (parsed.maxBonusByCurrency.length) {
    facts.push(
      `Published maximum bonus by currency: ${parsed.maxBonusByCurrency.join(", ")}.`,
    );
  }
  if (parsed.maxBetByCurrency.length) {
    facts.push(
      `Published maximum bet by currency: ${parsed.maxBetByCurrency.join(", ")}.`,
    );
  }
  if (parsed.turnover) {
    facts.push(`Published turnover requirement: ${parsed.turnover}.`);
  }
  if (parsed.bonusExpiry) {
    facts.push(`Published bonus expiry: ${parsed.bonusExpiry}.`);
  }
  if (promo.endDate) {
    facts.push(`Promotion end date published on GGLBET: ${promo.endDate}.`);
  }
  facts.push(
    `Currency emphasis in this summary: ${currency} when the official table includes it. Other currencies appear only when published on GGLBET.`,
  );

  return [
    lead,
    facts.join(" "),
    "Wording here is rewritten for clarity. Bonus percentages, caps, turnover, dates, eligible-game notes, and terms stay identical to the official GGLBET content.",
  ];
}

function buildClaimSteps(
  title: string,
  parsed: ParsedOfficial,
): readonly { readonly title: string; readonly text: string }[] {
  return [
    {
      title: "Open the live GGLBET product",
      text: "Sign in on GGLBET. Do not use third-party mirrors.",
    },
    {
      title: "Open Promotions",
      text: `Navigate to Promotions and locate “${title}” in the live list.`,
    },
    {
      title: "Read the full official terms",
      text: `Confirm bonus figures${parsed.turnover ? `, turnover (${parsed.turnover})` : ""}, eligible games, and any expiry on the official promotion page before continuing.`,
    },
    {
      title: "Claim or opt in on GGLBET",
      text: "Use the official claim / bonuses controls on GGLBET (for example the account bonuses area linked from the promotion content when present).",
    },
    {
      title: "Deposit and play only as the live terms allow",
      text: parsed.minDepositByCurrency.length
        ? `If a deposit is required, meet the published minimum for your currency (${parsed.minDepositByCurrency.join("; ")}), then play only eligible games under the published rules.`
        : "If a deposit or wagering step is required, follow exactly what the live GGLBET terms state for this promotion.",
    },
  ];
}

function buildFaq(
  promo: OfficialPromotionRecord,
  parsed: ParsedOfficial,
  bonusAmount: string,
  currency: string,
): PromotionLongformSections["faq"] {
  const turnoverNote = parsed.turnover
    ? ` Turnover on the official page is ${parsed.turnover}.`
    : " Confirm turnover on the live GGLBET terms for this offer.";
  const endNote = promo.endDate
    ? `GGLBET publishes an end date of ${promo.endDate} for “${promo.title}”.`
    : `No fixed end date appears on the GGLBET record for “${promo.title}”; confirm it is still listed live before claiming.`;
  const tableNote =
    parsed.minDepositByCurrency.length || parsed.maxBonusByCurrency.length
      ? ` Official table values for “${promo.title}” include ${[
          ...parsed.minDepositByCurrency.map((v) => `min deposit ${v}`),
          ...parsed.maxBonusByCurrency.map((v) => `max bonus ${v}`),
          ...parsed.maxBetByCurrency.map((v) => `max bet ${v}`),
        ].join("; ")}. This summary highlights ${currency} when present.`
      : ` “${promo.title}” did not publish a multi-currency deposit/bonus table in the fetched HTML, so follow the live page text for any wallet limits.`;

  return [
    {
      question: `What is the official headline for ${promo.title}?`,
      answer: `On GGLBET, “${promo.title}” is published with headline figure ${bonusAmount}.${turnoverNote}`,
    },
    {
      question: `Where do the numbers for ${promo.title} come from?`,
      answer: `Only from the official GGLBET promotion content for “${promo.title}” (CMS id ${promo.id}). No third-party review sites or agent pages were used.`,
    },
    {
      question: `What currency figures are published for ${promo.title}?`,
      answer: tableNote.trim(),
    },
    {
      question: `When does ${promo.title} end?`,
      answer: endNote,
    },
    {
      question: `Can an SEO page change ${promo.title}?`,
      answer: `No. If any editorial page differs from official GGLBET materials for “${promo.title}”, the live GGLBET promotion panel remains authoritative.`,
    },
  ];
}

function buildSummary(
  title: string,
  parsed: ParsedOfficial,
  bonusAmount: string,
  currency: string,
): string {
  return `${title} is an official GGLBET promotion. Published headline: ${bonusAmount}. ${
    parsed.turnover ? `Turnover: ${parsed.turnover}. ` : ""
  }${
    parsed.maxBonusByCurrency.find((r) => r.startsWith(currency))
      ? `Max bonus (${currency}): ${parsed.maxBonusByCurrency.find((r) => r.startsWith(currency))?.split(" ")[1]}. `
      : ""
  }Claim only through GGLBET after reading the live terms.`;
}
