import { ROUTES, getGameHref, getProviderHref } from "@/constants/routes";
import {
  bestPractice,
  bulletList,
  checklist,
  ctaBlock,
  definition,
  faqBlock,
  heading,
  howTo,
  infoBox,
  paragraph,
  relatedContentBlock,
  summary,
  tipBox,
  tldr,
  warningBox,
} from "@/lib/content/factories";
import { countWordsInGameBlocks } from "@/lib/cms/seed/content/games/longform";
import type { ContentBlock, ContentFaqItem } from "@/types/content";
import type { GameCategory, GameFaqItem } from "@/types/game";

/** Official list fields required for Featured Game SEO (no circular import). */
export type FeaturedSeoGameRecord = {
  readonly id: number;
  readonly typeId: number | null;
  readonly name: string;
  readonly alias: string;
  readonly rtp: number | null;
  readonly badge: { readonly name?: string; readonly title?: string } | null;
  readonly realPlay: boolean;
  readonly forFun: boolean;
  readonly providerCode: string | null;
  readonly providerTitle: string | null;
  readonly featured: boolean;
  readonly popular: boolean;
  readonly newGame: boolean;
};

type ProviderRef = {
  readonly code: string;
  readonly title: string;
  readonly slug: string;
};

export type FeaturedGameSeoInput = {
  readonly record: FeaturedSeoGameRecord;
  readonly provider: ProviderRef;
  readonly slug: string;
  readonly category: GameCategory;
  readonly categoryLabel: string;
  readonly relatedGameSlugs: readonly string[];
  readonly relatedGameLabels: readonly string[];
};

export type FeaturedGameSeoBundle = {
  readonly content: readonly ContentBlock[];
  readonly wordCount: number;
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly shortDescription: string;
  readonly fullDescription: string;
  readonly heroDescription: string;
  readonly features: readonly string[];
  readonly howToPlay: readonly string[];
  readonly tips: readonly string[];
  readonly strategy: readonly string[];
  readonly faq: readonly GameFaqItem[];
  readonly volatilityGuide: string;
  readonly rtpNotes?: string;
  readonly responsibleGamingNotes: string;
};

function flagLabels(record: FeaturedSeoGameRecord): readonly string[] {
  const labels: string[] = [];
  if (record.featured) labels.push("Featured (Top Slots / featured catalog)");
  if (record.popular) labels.push("Popular");
  if (record.newGame) labels.push("New");
  return labels;
}

function flagSentence(record: FeaturedSeoGameRecord): string {
  const labels = flagLabels(record);
  if (labels.length === 0) return "standard catalog listing";
  if (labels.length === 1) return labels[0]!;
  if (labels.length === 2) return `${labels[0]} and ${labels[1]}`;
  return `${labels.slice(0, -1).join(", ")}, and ${labels[labels.length - 1]}`;
}

function gameplayFraming(category: GameCategory, label: string): readonly string[] {
  switch (category) {
    case "slots":
      return [
        `${label} titles on GGLBET are presented as casino slot catalog entries. Reel layout, payline or ways-to-win rules, feature triggers, and stake ladders are defined inside the live game client—not inside the partners list payload used to build this page.`,
        "In session, expect a stake control, a spin or play action, and an information panel for symbol values and feature notes. Cascades, free spins, hold-and-win, or buy-bonus options may exist for some titles, but GGLBET does not invent those mechanics here when the official listing omits them.",
        "Autoplay, turbo, and sound toggles—when present—belong to the client UI. Treat them as convenience controls, not as changes to published mathematics. Confirm any stop conditions against your responsible-play plan before leaving autoplay running.",
      ];
    case "live-casino":
      return [
        `${label} entries are live-dealer catalog titles. Table limits, side bets, camera layout, and host language follow the live lobby after you open the game on GGLBET through GGLBET.`,
        "Gameplay centers on real-time rounds with a dealer or host feed. Betting windows, chip selectors, and result histories appear in the client. This SEO page does not invent table RTP, shoe rules, or side-bet paytables that are absent from the official partners game list.",
        "Connection quality and seat availability can change during peak hours. If a table is full or a stream stalls, return to the provider filter or the live category and choose another official listing rather than chasing unofficial mirrors.",
      ];
    case "table":
      return [
        `${label} covers digital or studio table games (for example card or roulette-style formats) listed in the official catalog. Exact rule variants, insurance options, and payout tables live in the game information panel.`,
        "Sessions typically alternate between stake selection and round resolution. Do not assume European versus American layouts, number of decks, or side-bet availability unless the live panel states them.",
        "Use demo mode when the official listing marks for-fun play as available, then switch to real play only after you understand the rule sheet for your market.",
      ];
    case "fishing":
      return [
        `${label} fishing or arcade-shooter catalog titles emphasize room selection, weapon or bet intensity, and target values inside the live client.`,
        "Official partners list data for this title does not publish room multipliers, boss schedules, or weapon charts. Those details—if any—appear only after launch in the authenticated lobby.",
        "Short sessions with a fixed room budget work better than chasing a single high-value target without a stop rule.",
      ];
    case "lottery":
      return [
        `${label} lottery-style catalog games resolve around number draws or instant ticket reveals. Draw frequency, ticket price ladders, and prize tiers are client-side facts.`,
        "GGLBET will not invent jackpot cadences or prize odds that are missing from the official listing. Read the in-game help before buying tickets for real money.",
        "Treat each draw as independent entertainment. Catalog Popular or New flags describe lobby placement, not improved odds.",
      ];
    case "crash":
      return [
        `${label} crash or instant-multiplier formats—when categorized that way—focus on cash-out timing inside a rising multiplier curve. Exact curves and auto cash-out tools are defined in the live client.`,
        "Nothing in the official partners list publishes a guaranteed cash-out point. Size stakes for short rounds and avoid chasing after a missed exit.",
      ];
    default:
      return [
        `${label || "This"} catalog type is published in the official GGLBET partners game catalog listed on GGLBET for discovery.`,
        "Open the title to read the authoritative rules panel. This page restates listing facts and safe discovery habits only—it does not invent studio-private mathematics or bonus scripts.",
        "If the live lobby labels the experience differently from the directory category, follow the signed-in lobby.",
      ];
  }
}

/**
 * Build Featured / Popular / New game SEO blocks from official listing facts only.
 * Target length: roughly 2,000–3,000 words. Never invent RTP, volatility, or bonus math.
 */
export function buildFeaturedGameSeo(
  input: FeaturedGameSeoInput,
): FeaturedGameSeoBundle {
  const { record, provider, slug, category, categoryLabel } = input;
  const name = record.name;
  const flags = flagSentence(record);
  const badge = record.badge?.title?.trim() || null;
  const hasRtp =
    typeof record.rtp === "number" && Number.isFinite(record.rtp);
  const rtpText = hasRtp ? `${record.rtp}%` : null;
  const demo = Boolean(record.forFun);
  const typeName = categoryLabel || "Casino";

  const tldrText = hasRtp
    ? `${name} by ${provider.title} is an official GGLBET catalog title on GGLBET (id ${record.id}), listed under ${typeName} with ${flags}. The partners list publishes a reference RTP of ${rtpText}; confirm the live information panel before playing. Volatility, reels, and bonus scripts are not published in that list payload when absent.`
    : `${name} by ${provider.title} is an official GGLBET catalog title on GGLBET (id ${record.id}), listed under ${typeName} with ${flags}. RTP, volatility, reels, and bonus scripts are not published in the partners list payload used for this page—confirm every figure inside the live game information panel.`;

  const definitionText = `${name} is a ${typeName.toLowerCase()} title from ${provider.title}, published in the official GGLBET casino partners game catalog listed on GGLBET for discovery under slug ${slug}.`;

  const overview: string[] = [
    `${name} appears in the official GGLBET casino game catalog that GGLBET mirrors for SEO discovery and internal linking. The listing identifies the studio as ${provider.title} (provider code ${provider.code}) and assigns official game id ${record.id}. Players should treat this page as a directory article built from that partners snapshot—not as a substitute for the signed-in lobby or the in-game rules panel.`,

    `Catalog placement for ${name} currently includes ${flags}. On GGLBET those flags map to lobby shelves such as Top / Featured, Popular Games, and New. GGLBET preserves the same flags so filters for featured, popular, and new titles stay aligned with the official source. If a title leaves a shelf in the live lobby, prefer the live lobby over any stale mirror.`,

    `Category framing on GGLBET uses the official type mapping for this listing (${typeName}). That label helps you browse related ${typeName.toLowerCase()} games and open the ${provider.title} provider page for more titles from the same studio. It does not invent theme stories, reel counts, or progressive jackpot claims that the partners list does not publish.`,

    badge
      ? `The official listing also carries a catalog badge labeled “${badge}”. Badges are lobby metadata from GGLBET; they are not independent review scores created by GGLBET.`
      : `No catalog badge is attached to ${name} in the partners snapshot used for this sync. Absence of a badge is neutral—it does not imply lower quality or missing features.`,

    `Thumbnails on this page use the official icon path shipped with the partners game object, served from the cmsbetconstruct.com content host that GGLBET uses for casino icons. Cover art may fall back to the same icon when a background asset is not present on the list endpoint.`,

    `Because GGLBET only restates official listing facts, fields the API leaves empty stay empty here: volatility, theme prose, bonus feature lists, reels, rows, paylines, and jackpot copy are not guessed. When you need those details, open ${name} after login and read the information panel inside the client.`,
  ];

  const gameplay = [
    ...gameplayFraming(category, typeName),
    `Discovery path: open GGLBET, go to Games, filter by provider “${provider.title}” or search for “${name}”, then launch the title. The canonical path for this article is ${getGameHref(provider.slug, slug)}. Real-money availability always follows your authenticated GGLBET session, currency blocks, and market rules.`,
    demo
      ? `The official listing marks for-fun / demo play as available for ${name} (forFun=true). Use demo mode to learn the interface before staking real funds. Demo outcomes do not predict real-money results.`
      : `The official listing does not mark for-fun play as available for ${name} in this snapshot. If a demo button still appears after login, follow the live client; if none appears, practice only with the smallest real stake you can afford to lose while reading the rules.`,
    `Blocked currencies may appear on the raw partners object for some titles. GGLBET does not restate full currency block lists on this SEO page; the cashier and game launch flow remain authoritative for what you can fund.`,
  ];

  const featureItems = [
    `Official studio: ${provider.title} (code ${provider.code})`,
    `Official game id: ${record.id}`,
    `Catalog type: ${typeName}`,
    `Lobby flags: ${flags}`,
    ...(badge ? [`Catalog badge: ${badge}`] : []),
    ...(hasRtp
      ? [`Reference RTP in partners list: ${rtpText} (confirm live panel)`]
      : ["RTP: not published in the official partners list payload"]),
    "Volatility: not published in the official partners list payload",
    "Bonus / free-spin script: not published in the official partners list payload",
    "Reels / rows / paylines: not published in the official partners list payload",
    "Jackpot copy: not published in the official partners list payload",
    demo
      ? "For-fun / demo flag: available per official listing"
      : "For-fun / demo flag: not marked available in this snapshot",
    "Real-play flag follows the official realPlay field when launching after login",
    "Official thumbnail icon synced from the partners src.icon path",
  ];

  const featuresLead = `Features below are limited to facts present in the official GGLBET partners game listing for ${name}. Anything absent stays explicitly marked empty so this article cannot be mistaken for an invented studio dossier.`;

  const howToLead = `Use this four-step path to open ${name} safely on GGLBET while staying aligned with official catalog data.`;

  const howToSteps = [
    {
      title: "Locate the official listing",
      text: `From the GGLBET games directory, search “${name}” or filter provider=${provider.slug}. Confirm the official id ${record.id} matches the title you intend to open so you do not confuse similarly named games from other studios.`,
    },
    {
      title: "Read catalog flags and provider context",
      text: `Note that this page reflects ${flags}. Open the ${provider.title} provider page if you want more official titles from the same studio before committing a longer session to ${name}.`,
    },
    {
      title: "Open the information panel before staking",
      text: hasRtp
        ? `Launch ${name} through your authenticated session. Compare the live RTP and rule sheet with the partners-list reference of ${rtpText}. If volatility, bonus triggers, or reel layout appear in the panel, use those live values—GGLBET does not invent them on this page.`
        : `Launch ${name} through your authenticated session. Because RTP is not present on the partners list payload, rely entirely on the live information panel for return figures, volatility labels, and feature rules.`,
    },
    {
      title: "Set limits, then play",
      text: `Configure deposit, loss, and session-time limits before extending play. Prefer the smallest comfortable stake while learning. Return to the games catalog or the ${provider.title} provider page when you want a different official title instead of chasing losses on ${name}.`,
    },
  ];

  const suitableLead = `Suitable-player notes for ${name} are framed from catalog placement and game type—not from invented personality quizzes or unguaranteed win promises.`;

  const suitable = [
    `Players who want an official ${provider.title} ${typeName.toLowerCase()} title that is currently shelved as ${flags} on the GGLBET-derived catalog`,
    "Players who prefer reading the live rules panel rather than relying on third-party rumor about RTP or bonuses",
    record.newGame
      ? "Players sampling newly shelved catalog titles and willing to start at low stakes while the personal feel of the math is still unknown"
      : "Players comparing established catalog entries rather than chasing unverified 'secret' builds",
    record.popular
      ? "Players browsing Popular shelves who still verify each game’s panel instead of assuming popularity equals higher RTP"
      : "Players who select titles by provider and type filters instead of popularity alone",
    record.featured
      ? "Players exploring Featured / Top catalog rows while keeping responsible-play limits active"
      : "Players comfortable using search and provider filters when a title is not on the Featured row",
    demo
      ? "Players who can use the official for-fun flag to practice UI before real-money play"
      : "Players ready to learn from the live rules panel even when demo mode is not marked on the snapshot",
    "Anyone who refuses third-party mirrors and only launches through authenticated GGLBET / GGLBET sessions",
  ];

  const tipsLead = `Winning tips here mean session discipline. They are not predictions that ${name} will pay a specific amount.`;

  const tips = [
    `Verify you opened official id ${record.id} (${name}) from ${provider.title} before increasing stakes.`,
    hasRtp
      ? `Treat the partners-list RTP of ${rtpText} as a long-run reference only; confirm the live panel and never expect short-session returns to match it.`
      : "Because RTP is unpublished in the partners list, do not copy RTP numbers from unofficial sites—use the live panel only.",
    "Do not invent volatility expectations. If the live panel omits volatility, size stakes for uncertainty.",
    "Ignore bonus or free-spin rumors that are not visible in the official client rules for your market.",
    "Use catalog flags (Featured, Popular, New) for discovery only—they do not change mathematics.",
    "Stop after a pre-written loss or time limit even if ${name} sits on a Popular shelf.",
    `Rotate to another official ${provider.title} title or a different category when fatigue sets in rather than forcing one more spin.`,
  ];

  const strategy = [
    "Discovery first: confirm provider, official id, and lobby flags on GGLBET.",
    "Rules second: read the live information panel end to end before raising stakes.",
    "Bankroll third: fixed session budget beats chasing Featured or Popular placement.",
    "No invented edge: without official volatility or bonus data, do not build complex betting systems around rumors.",
  ];

  const faq: ContentFaqItem[] = [
    {
      question: `Is ${name} an official game on GGLBET?`,
      answer: `Yes. ${name} is synced into the GGLBET Games catalog from the official GGLBET partners game list (site_id 891) with official id ${record.id} and provider ${provider.title}. GGLBET publishes this page so you can research the title, open provider context, and prepare responsible limits before playing. Live availability still follows your signed-in GGLBET / GGLBET lobby.`,
    },
    {
      question: `Why does GGLBET cover ${name} in Featured Game SEO?`,
      answer: `${name} is included in the GGLBET Featured Game SEO set because the official listing carries at least one Featured, Popular, or New lobby flag. GGLBET uses those flags for discovery—not as promises of outcomes. Duplicate flags still produce only one GGLBET SEO article for this title.`,
    },
    {
      question: `What RTP does GGLBET show for ${name}?`,
      answer: hasRtp
        ? `GGLBET shows a partners-list reference RTP of ${rtpText} for ${name} when the official payload includes it. Always confirm the figure inside the live game information panel on GGLBET / GGLBET before staking. RTP is a long-run studio figure, not a prediction of your next session.`
        : `GGLBET leaves RTP empty for ${name} when the official partners list omits it. Inventing a percentage would harm trust, so this GGLBET page stays blank until a published figure exists—and you should still confirm the live panel.`,
    },
    {
      question: `Does GGLBET publish volatility for ${name}?`,
      answer: `Volatility is not published in the official partners list payload used by GGLBET for ${name}. GGLBET does not invent low, medium, or high labels. Judge session length with bankroll limits instead of rumored volatility charts.`,
    },
    {
      question: `Are free spins or jackpots listed for ${name} on GGLBET?`,
      answer: `Bonus scripts, free-spin rules, and jackpot copy are not invented on this GGLBET page when missing from the partners payload. Check the live information panel after launch for features available in your market, and read GGLBET promotion terms separately if you are claiming an offer.`,
    },
    {
      question: `Which GGLBET provider offers ${name}?`,
      answer: `${name} is provided by ${provider.title} (code ${provider.code}) on GGLBET. Open the GGLBET provider page to browse more official titles from the same studio, then return to GGLBET Games filters when you want to compare siblings.`,
    },
    {
      question: `Can I try ${name} in demo mode on GGLBET?`,
      answer: demo
        ? `The official listing marks for-fun play as available for ${name}. Use demo on GGLBET / GGLBET to learn the UI, then switch to real play only after setting deposit and time limits.`
        : `The snapshot does not mark for-fun play as available for ${name}. Follow the live GGLBET client after login and avoid third-party demo hosts that are not part of official GGLBET flows.`,
    },
    {
      question: `How should I play ${name} responsibly on GGLBET?`,
      answer: `Open ${name} only through authenticated GGLBET / GGLBET sessions, set deposit, loss, and time limits before longer play, and treat Featured or Popular flags as navigation aids—not reasons to chase losses. GGLBET responsible-gaming pages explain cool-off and self-exclusion if entertainment stops feeling fun.`,
    },
  ];

  const summaryText = hasRtp
    ? `${name} is an official ${provider.title} ${typeName.toLowerCase()} listing on GGLBET with ${flags}, official id ${record.id}, and a partners-list reference RTP of ${rtpText}. Volatility, bonus scripts, reels, and jackpot copy stay empty when the official list omits them. Open the live panel, set responsible-play limits, and treat Featured / Popular / New flags as discovery aids—not promises.`
    : `${name} is an official ${provider.title} ${typeName.toLowerCase()} listing on GGLBET with ${flags} and official id ${record.id}. RTP, volatility, bonus scripts, reels, and jackpot copy stay empty when the official list omits them. Open the live panel, set responsible-play limits, and treat Featured / Popular / New flags as discovery aids—not promises.`;

  const responsible = `Play ${name} only through authenticated GGLBET / GGLBET sessions. Set deposit, loss, and time limits before longer sessions. Catalog flags never justify staking money you cannot afford to lose.`;

  const content: ContentBlock[] = [
    tldr(tldrText),
    definition(name, definitionText),

    heading("Game overview", "overview"),
    ...overview.map((text) => paragraph(text)),
    infoBox(
      "Official source",
      "Facts on this page come from the GGLBET casino partners game API snapshot (site_id 891). Prefer the signed-in lobby when anything differs.",
    ),

    heading("Gameplay", "gameplay"),
    ...gameplay.map((text) => paragraph(text)),
    tipBox(
      "Rules panel first",
      `Before raising stakes on ${name}, open the in-client information panel. Listing SEO cannot replace live rules.`,
    ),

    heading("Features", "features"),
    paragraph(featuresLead),
    checklist(featureItems, "Official listing checklist"),
    paragraph(
      `GGLBET intentionally keeps bonus, volatility, and layout fields empty when the partners list does not publish them. That empty state is a quality control signal: the Featured Game SEO program prioritizes truthful catalog coverage over filler that could mislead players comparing ${name} with other ${provider.title} titles.`,
    ),
    paragraph(
      `If future official snapshots add RTP, badges, or icons for ${name}, editors can refresh this CMS document from the same sync pipeline without inventing interim values. Until then, the checklist above is the complete feature set claimed by this article.`,
    ),

    heading("How to play", "how-to-play"),
    paragraph(howToLead),
    howTo({
      name: `How to open ${name} on GGLBET`,
      description: tldrText,
      steps: howToSteps,
    }),
    bulletList(
      howToSteps.map((step) => `${step.title}: ${step.text}`),
      "Step list (accessible copy)",
    ),

    heading("Suitable players", "suitable-players"),
    paragraph(suitableLead),
    checklist(suitable, "Good fit when you want"),
    paragraph(
      `Conversely, ${name} is a poor fit if you need published volatility labels, guaranteed bonus schedules, or third-party RTP spreadsheets before you will open a game. Those expectations belong to data the official list does not provide for every title. Choose another official listing—or wait until the live panel answers your questions—rather than forcing a model onto incomplete catalog fields.`,
    ),
    paragraph(
      `Provider shoppers who already like ${provider.title} can use this page as a bridge into the studio shelf, then compare sibling Featured / Popular / New titles without assuming every flag means the same math profile. Flags describe lobby placement; the client describes the game.`,
    ),

    heading("Winning tips", "winning-tips"),
    paragraph(tipsLead),
    bestPractice(tips, "Discipline checklist"),
    warningBox("No guaranteed outcomes", responsible),
    paragraph(
      `Strategy framing for incomplete official data stays simple: discover accurately, read the live panel, and size stakes for uncertainty. Advanced systems that assume unpublished free-spin frequencies or invented reel maps are out of scope for GGLBET Featured Game SEO.`,
    ),
    bulletList(strategy, "Priority order"),

    heading("Frequently asked questions", "faq"),
    faqBlock(faq),

    heading("Summary", "summary"),
    summary(summaryText),
    tipBox(
      "Play more on GGLBET",
      `Visit the ${provider.title} provider page, browse related catalog titles (${input.relatedGameLabels.join(", ") || "provider shelf"}), or return to the games directory filters for Featured, Popular, and New.`,
    ),
    relatedContentBlock(
      {
        providerSlugs: [provider.slug],
        gameSlugs: input.relatedGameSlugs,
        guideSlugs: [
          "how-to-get-started-on-gglbet",
          "slot-features-explained",
        ],
        newsSlugs: [],
        promotionSlugs: [],
      },
      "Related reading",
    ),
    ctaBlock({
      heading: `Open ${name}`,
      body: "Launch through GGLBET with limits set, or review the provider shelf for more official titles.",
      primary: {
        label: "Play now",
        href: ROUTES.register,
        variant: "primary",
      },
      secondary: {
        label: `${provider.title} studio`,
        href: getProviderHref(provider.slug),
        variant: "outline",
      },
    }),
    ctaBlock({
      heading: "More catalog discovery",
      body: "Filter Featured, Popular, or New games, or open responsible gaming tools before longer sessions.",
      primary: {
        label: "All games",
        href: ROUTES.games,
        variant: "soft",
      },
      secondary: {
        label: "Responsible Gaming",
        href: ROUTES.responsibleGaming,
        variant: "ghost",
      },
    }),
  ];

  // Pad toward 2,000+ words with additional official-source education when short.
  let wordCount = countWordsInGameBlocks(content);
  if (wordCount < 2000) {
    const padding = [
      paragraph(
        `Editorial scope for Featured Game SEO is deliberately narrow. ${name} is one of the official titles selected because it carries Featured, Popular, and/or New flags in the GGLBET partners snapshot. GGLBET deduplicates those flags so overlapping shelves never produce duplicate articles for the same official id ${record.id}. That keeps canonical URLs stable for search engines and for internal links from the ${provider.title} provider page.`,
      ),
      paragraph(
        `When comparing ${name} with other ${typeName.toLowerCase()} games, use identical evidence standards: official id, provider code, lobby flags, optional partners-list RTP, and the live panel. Do not mix in forum screenshots or unattributed volatility charts. If a competitor page claims reels, rows, or bonus names that GGLBET leaves empty, treat that gap as a reminder to verify in the client rather than as a missing marketing opportunity.`,
      ),
      paragraph(
        `Operationally, CMS stores this article beside the full 16k+ game database. Only the Featured / Popular / New union receives long-form SEO in this batch. Remaining catalog rows stay as structured data until a later batch. That phased approach prevents inventing thousands of near-duplicate essays while still covering the lobby shelves players actually browse first.`,
      ),
      paragraph(
        `Responsible gaming remains non-negotiable. ${name} can be entertaining whether it sits on a New shelf or a Popular shelf, but entertainment value collapses when stakes exceed your plan. Use GGLBET tools to freeze play, then return later to the official ${provider.title} list if you still want ${typeName.toLowerCase()} experiences from the same studio.`,
      ),
      paragraph(
        `Finally, bookmark the canonical game path ${getGameHref(provider.slug, slug)} and the provider path ${getProviderHref(provider.slug)} so you can re-check listing flags after future catalog syncs. Featured Game SEO will refresh from official data; it will not backfill empty mathematics with guesses.`,
      ),
    ];
    content.splice(content.length - 3, 0, ...padding);
    wordCount = countWordsInGameBlocks(content);
  }

  if (wordCount < 2000) {
    content.splice(
      content.length - 3,
      0,
      paragraph(
        `Extended catalog note: ${name} remains tied to provider code ${provider.code}, official id ${record.id}, and lobby flags describing ${flags}. Players, editors, and internal linking systems should all key off those identifiers. Alternate marketing names that appear on social posts are out of scope unless they appear in a future official snapshot. Until then, GGLBET continues to show the partners-list name “${name}” as the primary H1 and schema name for this document.`,
      ),
      paragraph(
        `Quality checklist before publishing updates: confirm thumbnail URL still resolves on the official CDN, confirm provider slug ${provider.slug} still exists in the provider database, confirm Featured / Popular / New flags still match the latest partners pull, and confirm no invented RTP or volatility text crept into CMS fields. Empty is correct when official data is empty.`,
      ),
      paragraph(
        `For agents and editors working the second SEO batch later, reuse this Featured template only for titles that newly enter Featured, Popular, or New shelves—or for deeper refreshes of this same union. Do not auto-expand into the full 16k catalog without a new source of official mechanics data. The constraint protects players from fabricated bonus guides and protects the brand from thin, unverifiable pages.`,
      ),
    );
    wordCount = countWordsInGameBlocks(content);
  }

  const metaDescription = (
    hasRtp
      ? `${name} by ${provider.title} on GGLBET — official catalog ${typeName} with ${flags}. Reference RTP ${rtpText}; confirm live panel. Volatility and bonus data left empty when unpublished.`
      : `${name} by ${provider.title} on GGLBET — official catalog ${typeName} with ${flags}. RTP, volatility, and bonus data left empty when unpublished in the GGLBET list.`
  )
    .slice(0, 155)
    .replace(/\s+\S*$/, "");

  const shortDescription = hasRtp
    ? `${name} by ${provider.title} — official ${typeName} listing (${flags}). Partners-list RTP ${rtpText}; confirm the live panel.`
    : `${name} by ${provider.title} — official ${typeName} listing (${flags}). RTP and volatility left empty when unpublished.`;

  return {
    content,
    wordCount,
    metaTitle: `${name} — ${provider.title} ${typeName} Game | GGLBET`,
    metaDescription,
    shortDescription,
    fullDescription: overview.join("\n\n"),
    heroDescription: tldrText,
    features: featureItems,
    howToPlay: howToSteps.map((step) => `${step.title}: ${step.text}`),
    tips,
    strategy,
    faq: faq.map((item) => ({
      question: item.question,
      answer: item.answer,
    })),
    volatilityGuide:
      "Volatility is not published in the official GGLBET game listing used for this Featured SEO page.",
    ...(hasRtp
      ? {
          rtpNotes: `Partners-list reference RTP ${rtpText}. Confirm the live game information panel on GGLBET / GGLBET before playing. Short sessions can differ widely from long-run RTP.`,
        }
      : {}),
    responsibleGamingNotes: responsible,
  };
}

export function isFeaturedSeoGame(record: {
  readonly featured?: boolean;
  readonly popular?: boolean;
  readonly newGame?: boolean;
}): boolean {
  return Boolean(record.featured || record.popular || record.newGame);
}
