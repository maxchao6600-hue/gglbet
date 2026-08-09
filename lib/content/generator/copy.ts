/**
 * Natural-language copy helpers for SEO templates.
 * Avoid keyword stuffing and repetitive “AI filler” openers.
 */

import { joinNaturalList, preferCmsProse } from "@/lib/content/generator/template-utils";

export function providerIntroCopy(input: {
  readonly name: string;
  readonly shortName: string;
  readonly intro?: string;
  readonly summary?: string;
  readonly categoryLabels: readonly string[];
}): string {
  return preferCmsProse(
    input.intro,
    `${input.name} (${input.shortName}) appears in the GGLBET provider directory with a focus on ${
      joinNaturalList(input.categoryLabels) || "catalog entertainment"
    }. Use this page to understand studio strengths before opening individual titles.`,
  );
}

export function providerHistoryCopy(input: {
  readonly name: string;
  readonly history?: string;
  readonly foundedYear?: number;
  readonly country?: string;
}): string {
  if (input.history && input.history.trim().length >= 40) {
    return input.history.trim();
  }
  const founded = input.foundedYear
    ? `Public materials place the studio’s timeline around ${input.foundedYear}`
    : "Public materials describe a gradual catalog expansion";
  const country = input.country ? ` with roots linked to ${input.country}` : "";
  return `${founded}${country}. On GGLBET, the practical question is how ${input.name} titles behave in real sessions—clarity of rules, device fit, and update cadence—rather than marketing slogans.`;
}

export function gameIntroCopy(input: {
  readonly gameName: string;
  readonly providerName: string;
  readonly shortDescription?: string;
  readonly fullDescription?: string;
  readonly category: string;
}): string {
  return preferCmsProse(
    input.fullDescription,
    preferCmsProse(
      input.shortDescription,
      `${input.gameName} is a ${input.category.replace("-", " ")} title from ${input.providerName} listed on GGLBET. This page covers how it plays, what the published specs suggest, and how to approach a first session without rushing stakes.`,
    ),
  );
}

export function guideIntroCopy(input: {
  readonly title: string;
  readonly excerpt?: string;
  readonly category: string;
}): string {
  return preferCmsProse(
    input.excerpt,
    `This ${input.category.replace("-", " ")} guide explains ${input.title.toLowerCase()} in plain steps so you can act with fewer surprises. Read the checklist before you change account settings or stake size.`,
  );
}

export function newsLeadCopy(input: {
  readonly title: string;
  readonly excerpt?: string;
  readonly heroDescription?: string;
}): string {
  return preferCmsProse(
    input.excerpt,
    preferCmsProse(
      input.heroDescription,
      `${input.title} is covered here with context, what changed, and what players should verify next inside their GGLBET account tools.`,
    ),
  );
}

export function promotionOverviewCopy(input: {
  readonly title: string;
  readonly overview?: string;
  readonly excerpt?: string;
  readonly bonusAmount: string;
}): string {
  return preferCmsProse(
    input.overview,
    preferCmsProse(
      input.excerpt,
      `${input.title} is presented as a structured offer on GGLBET. The headline figure is ${input.bonusAmount}, but eligibility, wagering, and game weighting decide whether the offer fits your session plan.`,
    ),
  );
}

export function closingSummaryCopy(kind: string, name: string): string {
  switch (kind) {
    case "provider":
      return `${name} is best judged by live titles, rule clarity, and how comfortably the catalog fits your devices and session length. Open a game page next, or return to the provider directory to compare studios.`;
    case "game":
      return `Approach ${name} with a clear stake limit and a short learning pass—especially if features or volatility are new to you. Specs on this page are editorial references; confirm live figures in the game information panel.`;
    case "guide":
      return `Use this guide as a checklist, not a shortcut around account rules. When you finish, apply one change at a time and keep responsible gaming tools switched on.`;
    case "news":
      return `Treat this update as context for decisions inside your account—not as a promise of outcomes. Re-check dates, eligibility, and safer-play settings before you act.`;
    case "promotion":
      return `If ${name} still looks relevant after the requirements and terms, confirm the live cashier panel before opting in. Offers can differ by region and account status.`;
    default:
      return `Review the details above, then continue through GGLBET with a plan that fits your time and budget.`;
  }
}
