/**
 * Build CMS News seeds exclusively from official GGLBET materials official promotion announcements.
 * Official News API is not enabled on partner site_id 891; live announcements
 * are published through the Promotions CMS (and related Stories links).
 *
 * Rules:
 * - Do not invent offers, dates, names, or figures
 * - Do not copy official prose verbatim — rewrite for SEO
 * - Do not cite third-party review sites or forums
 */
import {
  buildNewsLongformBlocks,
  type NewsLongformSections,
} from "@/lib/cms/seed/content/news/longform";
import type { NewsCategorySlug, NewsTimelineItem } from "@/types/news";
import officialPromotions from "@/lib/cms/seed/content/promotions/official/gglbet5-promotions.json";

export type OfficialNewsSeed = {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly officialPromotionId: number;
  readonly category: NewsCategorySlug;
  readonly excerpt: string;
  readonly publishDate: string;
  readonly updatedDate: string;
  readonly featured: boolean;
  readonly breaking: boolean;
  readonly popular: boolean;
  readonly sortOrder: number;
  readonly tags: readonly string[];
  readonly timeline: readonly NewsTimelineItem[];
  readonly relatedPromotionSlugs: readonly string[];
  readonly relatedGuideSlugs: readonly string[];
  readonly relatedNewsSlugs: readonly string[];
  readonly relatedProviderSlugs: readonly string[];
  readonly relatedGameSlugs: readonly string[];
  readonly lastVerified: boolean;
  readonly verifiedDate: string;
  readonly sourceUrl: string;
  readonly sourceName: string;
  readonly longform: NewsLongformSections;
  readonly blocks: ReturnType<typeof buildNewsLongformBlocks>;
};

type OfficialPromotionRecord = {
  readonly id: number;
  readonly title: string;
  readonly endDate: string | null;
  readonly content: string;
  readonly metaUrl: string | null;
};

const SOURCE_NAME = "gglbet5.com";
const VERIFIED_DATE = "2026-08-05";
const SOURCE_NOTE =
  "GGLBET source note: product materials from the GGLBET promotions CMS (partner site_id 891). Dates, names, and figures are taken only from live GGLBET materials published there.";

/** Curated announcement set replacing the prior fictional newsSeed (8 articles). */
const ANNOUNCEMENT_IDS = [
  1035627, // 61th Singapore National Day
  1011636, // EWC 2026 Free Bet Reward Boost
  990418, // Spins Day, Bet Day
  936516, // Drops & Wins
  998453, // Telegram Exclusive Rewards
  1009258, // PowerBank Advance
  709613, // GGLBET VIP Club
  680048, // 300% Slots Welcome Bonus
] as const;

type AnnouncementSpec = {
  readonly officialId: number;
  readonly slug: string;
  readonly category: NewsCategorySlug;
  readonly newsTitle: string;
  readonly publishDate: string;
  readonly featured?: boolean;
  readonly breaking?: boolean;
  readonly popular?: boolean;
  readonly sortOrder: number;
  readonly tags: readonly string[];
  readonly relatedPromotionSlugs: readonly string[];
  readonly relatedGuideSlugs: readonly string[];
  readonly relatedNewsSlugs: readonly string[];
  readonly build: (promo: OfficialPromotionRecord) => Omit<
    NewsLongformSections,
    | "title"
    | "slug"
    | "category"
    | "sourceNote"
    | "lastVerified"
    | "verifiedDate"
    | "sourceUrl"
    | "sourceName"
    | "relatedProviderSlugs"
    | "relatedGameSlugs"
    | "relatedGuideSlugs"
    | "relatedPromotionSlugs"
    | "relatedNewsSlugs"
    | "ctaPrimaryLabel"
    | "ctaPrimaryHref"
    | "ctaSecondaryLabel"
    | "ctaSecondaryHref"
    | "metaTitle"
    | "metaDescription"
  > & { readonly excerpt: string; readonly timeline: readonly NewsTimelineItem[] };
};

const SPECS: readonly AnnouncementSpec[] = [
  {
    officialId: 1035627,
    slug: "singapore-national-day-61-official-announcement",
    category: "promotions",
    newsTitle: "GGLBET publishes Singapore National Day 61 reward announcement",
    publishDate: "2026-08-09T00:00:00.000Z",
    featured: true,
    breaking: true,
    popular: true,
    sortOrder: 10,
    tags: ["promotions", "national-day", "sports", "casino", "official"],
    relatedPromotionSlugs: ["61th-singapore-national-day-1035627"],
    relatedGuideSlugs: ["how-to-read-promotion-terms"],
    relatedNewsSlugs: ["ewc-2026-free-bet-reward-boost-official-announcement"],
    build: () => ({
      excerpt:
        "Official GGLBET promotion for Singapore National Day lists a promotion day of 09/08/2026, a $61 sports free-bet path, and a 6.1% casino deposit bonus lane with published currency tables.",
      tldr:
        "GGLBET’s official National Day announcement on GGLBET sets promotion day 09/08/2026, a sports path requiring an exact $61 deposit and an exact $61 sportsbook bet at minimum selection odds 1.30 for a $61 Free Bet, plus a casino lane with 6.1% deposit bonus after a minimum deposit of 300 (MYR/SGD), 3,600 (PHP), or 60 (USDT), max bonus 61 / 61 / 732 / 12.2, and 12x casino turnover.",
      background: [
        "National-day promotions on GGLBET are published only through the official promotions materials on GGLBET. This news item exists so players can read the announcement structure without treating social screenshots, agent chats, or review websites as facts.",
        "The official title on GGLBET is “61th Singapore National Day.” The CMS end date published for the promotion record is 2026-08-11 20:00:00. The promotion content itself states Promotion Period: 09/08/2026. Those official dates are preserved exactly in this article.",
        "The announcement splits into a sports free-bet path and a casino deposit-bonus path. Each path has its own qualifying deposit logic, settlement rules, and expiry windows. Mixing the two paths or assuming one deposit unlocks both rewards is not supported by the official text.",
        "Because currency tables are published for MYR, SGD, PHP, and USDT on the casino lane, players must match the live table for their wallet rather than converting third-party currency guesses. This hub only restates the published table values.",
        "Use this article as a reading map: confirm the live promotion panel, then decide whether the sports path, the casino path, or neither fits your account timing on the promotion day.",
      ],
      officialAnnouncement: [
        "According to the official GGLBET promotion content, players are invited to celebrate Singapore’s 61st National Day with an exclusive reward structured for that promotion day.",
        "Sports path (official): deposit exactly $61 during the promotion day; place a sportsbook bet of exactly $61 using real money on any sportsbook event with minimum selection odds of 1.30 during the same day; after those requirements are completed and the qualifying bet has settled, players automatically receive a $61 Free Bet. Qualifying bets must be settled within 3 days of being placed. Free Bet terms state the bonus is available for ALL Sportsbook Games and Bonus Expiry is 1 day.",
        "Casino path (official): make a minimum deposit of $300 during the promotion day to receive a 6.1% Casino Bonus based on the deposit amount. The deposit amount remains real money and can be used immediately. Casino bonus terms state availability for ALL Slots & Live Casino Games, Turnover Requirement 12x, and Bonus Expiry 1 days.",
        "Official casino currency table values: Minimum Deposit MYR 300 / SGD 300 / PHP 3,600 / USDT 60. Max Bonus MYR 61 / SGD 61 / PHP 732 / USDT 12.2.",
        "General terms published on the same page exclude BetBuilder, bonuses, or free bets from qualifying sports action; cash-out (full or partial) does not qualify; only settled bets count; voided, cancelled, or refunded selections do not qualify; buy-bonus is unavailable while using the casino bonus; Games-category titles are excluded; cancelling or deactivating a bonus removes bonus money; fraud suspicion may bar participation; GGLBET may amend, cancel, or terminate the promotion; English text prevails if translations differ.",
      ],
      keyHighlights: [
        "Official promotion title: 61th Singapore National Day",
        "Official promotion day / period stated in content: 09/08/2026",
        "CMS end date on the promotion record: 2026-08-11 20:00:00",
        "Sports path: exact $61 deposit + exact $61 sportsbook bet, min selection odds 1.30 → $61 Free Bet",
        "Sports Free Bet expiry: 1 day; available for ALL Sportsbook Games",
        "Casino path: 6.1% deposit bonus after published minimum deposits; turnover 12x; expiry 1 days",
        "Casino max bonus table: 61 / 61 / 732 / 12.2 across MYR / SGD / PHP / USDT",
        "Live GGLBET panel overrides this editorial summary if figures differ for your account",
      ],
      impact: [
        "Impact is time-bound. Players who intend to use either path must complete the published deposit and betting steps on the official promotion day of 09/08/2026 and must still see the offer on the live GGLBET promotions panel.",
        "Sports participants need settlement within 3 days of placing the qualifying bet, then only a 1-day Free Bet window after award. That sequence is short—plan stake size and market selection before the day starts rather than improvising mid-session.",
        "Casino participants should confirm the 12x turnover and 1-day bonus expiry against the live panel before depositing. Real-money deposit funds remain usable immediately per the official text, but bonus money remains subject to the published casino terms.",
        "If you are comparing this announcement with other GGLBET news such as EWC or weekly spins days, treat each promotion page as a separate official source. Figures from one page never transfer to another unless the live panel explicitly says so.",
      ],
      importantNotes: [
        "Promotion Period stated officially: 09/08/2026",
        "Sports Free Bet amount stated officially: $61",
        "Casino bonus rate stated officially: 6.1%",
        "Casino turnover stated officially: 12x",
        "BetBuilder, bonus, free-bet, and cash-out actions do not qualify for the sports path as published",
        "Buy bonus feature is not available while using the casino bonus",
        "Games in the Games category are excluded from the casino bonus terms",
        "English official text prevails over translations",
        "Confirm live availability on the live GGLBET product before any deposit",
      ],
      faq: [
        {
          question: "Where is the official National Day announcement published?",
          answer:
            "On GGLBET in the promotions materials for “61th Singapore National Day” (official promotion id 1035627). This news page only rewrites that official source.",
        },
        {
          question: "What is the official promotion day?",
          answer:
            "The official content states Promotion Period: 09/08/2026. The CMS promotion record also publishes end date 2026-08-11 20:00:00. Confirm both on the live page.",
        },
        {
          question: "Does one $61 deposit unlock both sports and casino rewards?",
          answer:
            "The official page describes separate sports and casino paths with different deposit and qualification rules. Follow each path’s published requirements; do not assume a combined unlock unless the live panel says so.",
        },
        {
          question: "What odds are required for the sports path?",
          answer:
            "The official sports path requires minimum selection odds of 1.30 on the exact $61 sportsbook bet placed during the promotion day.",
        },
        {
          question: "What is the casino turnover?",
          answer:
            "The official casino bonus terms state Turnover Requirement: 12x, with Bonus Expiry: 1 days.",
        },
        {
          question: "Can I rely on a screenshot from a chat group?",
          answer:
            "No. Only the live GGLBET promotion panel is the factual source for this announcement.",
        },
      ],
      closingSummary:
        "The official Singapore National Day announcement on GGLBET is a one-day structured reward with a precise sports free-bet path and a separate 6.1% casino deposit-bonus path. Keep the published dates, exact $61 sports steps, currency table values, 12x casino turnover, and one-day expiries unchanged when you plan. Re-open the live promotion before depositing.",
      timeline: [
        {
          id: "nd-period",
          date: "2026-08-09",
          label: "Official promotion day",
          body: "Promotion Period stated on GGLBET: 09/08/2026.",
        },
        {
          id: "nd-end",
          date: "2026-08-11",
          label: "CMS end date",
          body: "Promotion record end date published as 2026-08-11 20:00:00.",
        },
      ],
      factRows: [
        ["Official title", "61th Singapore National Day"],
        ["Promotion period (content)", "09/08/2026"],
        ["CMS end date", "2026-08-11 20:00:00"],
        ["Sports free bet", "$61"],
        ["Sports min selection odds", "1.30"],
        ["Casino bonus", "6.1%"],
        ["Casino turnover", "12x"],
        ["Casino min deposit (MYR/SGD/PHP/USDT)", "300 / 300 / 3,600 / 60"],
        ["Casino max bonus (MYR/SGD/PHP/USDT)", "61 / 61 / 732 / 12.2"],
      ],
    }),
  },
  {
    officialId: 1011636,
    slug: "ewc-2026-free-bet-reward-boost-official-announcement",
    category: "sports",
    newsTitle: "GGLBET announces EWC 2026 Free Bet Reward Boost",
    publishDate: "2026-07-06T00:00:00.000Z",
    featured: true,
    breaking: true,
    popular: true,
    sortOrder: 20,
    tags: ["sports", "esports", "ewc", "free-bet", "official"],
    relatedPromotionSlugs: ["ewc-2026-free-bet-reward-boost-1011636"],
    relatedGuideSlugs: ["how-to-read-promotion-terms"],
    relatedNewsSlugs: ["singapore-national-day-61-official-announcement"],
    build: () => ({
      excerpt:
        "Official EWC 2026 Free Bet Reward Boost on GGLBET runs 06/07/2026–23/08/2026 with 30% daily free-bet rewards after four-plus qualifying live esports bets.",
      tldr:
        "GGLBET’s official EWC 2026 Free Bet Reward Boost on GGLBET covers 06/07/2026–23/08/2026, pays a free bet equal to 30% of average stake after four or more qualifying live bets on listed esports titles, uses published min bet / max free-bet tables (SGD min 25, max free bet 150), and limits claims to twice per day under the published additional terms.",
      background: [
        "Esports World Cup coverage on GGLBET is announced through official promotions and Stories rails on GGLBET—not through third-party tipsters. This article maps the official Free Bet Reward Boost so players can verify period, markets, and settlement rules before staking.",
        "The official promotion title is “EWC 2026 Free Bet Reward Boost.” The content states Promotion Period: 06/07/2026 - 23/08/2026. The CMS promotion end date is 2026-08-23 20:00:00. Stories on the official site also surface an EWC item linked to this promotion.",
        "Qualification is live-bet oriented. The official text requires four and more live bets on listed esports games during a day, minimum final odds 1.80, and settlement the same day (00:00 GMT+8).",
        "Reward math is published via a case study: average the four stakes, then award 30% of that average as a free bet, capped by the max free-bet table for each currency.",
        "Treat this as a sportsbook/esports announcement. Casino or slots headlines elsewhere on the news hub do not change EWC free-bet math.",
      ],
      officialAnnouncement: [
        "The official GGLBET copy invites players to bet live on Esports World Cup 2026 and earn 30% daily rewards during the stated period.",
        "How to qualify (official): place 4 and more live bets on any of DOTA2, Counter Strike 2, League of Legends, Valorant, or Esports World Cup 2026 during a day; bets must be live; Minimum Final Odds: 1.80; after 4 bets settled, receive a free bet equal to 30% of average bet stake.",
        "Official currency table: Min Bet MYR 25 / SGD 25 / PHP 300 / USDT 5. Max Free Bet amount MYR 150 / SGD 150 / PHP 1,800 / USDT 30.",
        "Case study published officially: stakes 50 + 150 + 100 + 100 → average 100 → awarded free bet 30 (30% of average).",
        "Free bet terms: available for ALL Sportsbook Games without restriction on bet type, markets, or odds; Bonus Expiry 1 days. Additional terms: for every qualified third bet you receive a free bet, claimable TWICE per day; BetBuilder/bonus/free-bet stakes do not qualify; cash-out full or partial does not qualify; only settled bets count; voided/cancelled/refunded selections do not qualify; all qualifying bets must be settled the same day (00:00 GMT+8); returned/cancelled/void free-bet results count as lost; English text prevails.",
      ],
      keyHighlights: [
        "Official title: EWC 2026 Free Bet Reward Boost",
        "Official period: 06/07/2026 - 23/08/2026",
        "CMS end date: 2026-08-23 20:00:00",
        "Reward rate: 30% of average stake after 4+ qualifying live bets",
        "Minimum final odds: 1.80",
        "Eligible titles include DOTA2, CS2, LoL, Valorant, and Esports World Cup 2026",
        "Claimable twice per day under the published additional terms",
        "Free bet expiry: 1 days",
      ],
      impact: [
        "Players following EWC markets should plan live-bet volume around the four-bet threshold and the twice-per-day claim limit published on GGLBET.",
        "Because settlement must land the same day (00:00 GMT+8), late-settling markets can break qualification even when odds and stake look correct. Prefer markets you can realistically see settled inside the day window.",
        "Max free-bet caps differ by currency. An SGD player should treat 150 as the published max free-bet amount for that wallet line—not convert unofficially from another currency column.",
        "Stories rails may show CS2, TI, or EWC tiles; those tiles are discovery aids. The promotion page for id 1011636 remains the factual source for reward math.",
      ],
      importantNotes: [
        "Promotion Period: 06/07/2026 - 23/08/2026",
        "Live bets only for qualification",
        "Minimum Final Odds: 1.80",
        "Four or more qualifying live bets required before the 30% free-bet calculation",
        "Claimable TWICE per day per the additional terms",
        "Same-day settlement window: 00:00 GMT+8",
        "Cash-out and BetBuilder/bonus/free-bet stakes do not qualify",
        "English version prevails if translations differ",
      ],
      faq: [
        {
          question: "What dates does the official EWC boost cover?",
          answer:
            "The official content states 06/07/2026 - 23/08/2026. The CMS end date is 2026-08-23 20:00:00.",
        },
        {
          question: "How is the free bet calculated?",
          answer:
            "After four settled qualifying live bets, the free bet equals 30% of the average stake, subject to the published max free-bet table. The official case study uses stakes 50/150/100/100 → average 100 → free bet 30.",
        },
        {
          question: "Which games qualify?",
          answer:
            "The official list includes DOTA2, Counter Strike 2, League of Legends, Valorant, and Esports World Cup 2026, with live placement required.",
        },
        {
          question: "How many times can I claim per day?",
          answer:
            "Additional terms state the free bet is claimable TWICE per day under the published qualification rules.",
        },
        {
          question: "What is the free bet expiry?",
          answer: "Official Free bet Terms state Bonus Expiry - 1 days.",
        },
        {
          question: "Is this the same as National Day sports free bets?",
          answer:
            "No. National Day and EWC are separate official promotions with different dates, stakes, and odds rules. Confirm each live page separately.",
        },
      ],
      closingSummary:
        "The official EWC 2026 Free Bet Reward Boost is a dated live-esports offer: four-plus live bets at min final odds 1.80, 30% of average stake as a free bet, twice-daily claim limits, and a 06/07/2026–23/08/2026 period. Verify currency caps and same-day settlement on GGLBET before you build a card.",
      timeline: [
        {
          id: "ewc-start",
          date: "2026-07-06",
          label: "Period start",
          body: "Official Promotion Period begins 06/07/2026.",
        },
        {
          id: "ewc-end",
          date: "2026-08-23",
          label: "Period end",
          body: "Official period ends 23/08/2026; CMS end date 2026-08-23 20:00:00.",
        },
      ],
      factRows: [
        ["Official title", "EWC 2026 Free Bet Reward Boost"],
        ["Promotion period", "06/07/2026 - 23/08/2026"],
        ["CMS end date", "2026-08-23 20:00:00"],
        ["Daily reward rate", "30% of average stake"],
        ["Min final odds", "1.80"],
        ["Min bet (MYR/SGD/PHP/USDT)", "25 / 25 / 300 / 5"],
        ["Max free bet (MYR/SGD/PHP/USDT)", "150 / 150 / 1,800 / 30"],
        ["Daily claim limit", "Twice per day (as published)"],
      ],
    }),
  },
  {
    officialId: 990418,
    slug: "spins-day-bet-day-official-announcement",
    category: "promotions",
    newsTitle: "GGLBET Spins Day, Bet Day official Thursday/Friday reward table",
    publishDate: "2026-08-05T00:00:00.000Z",
    featured: true,
    popular: true,
    sortOrder: 30,
    tags: ["promotions", "free-spins", "free-bet", "loyalty", "official"],
    relatedPromotionSlugs: ["spins-day-bet-day-990418"],
    relatedGuideSlugs: ["how-to-read-promotion-terms"],
    relatedNewsSlugs: ["slots-welcome-bonus-300-official-announcement"],
    build: (promo) => ({
      excerpt:
        "Official Spins Day, Bet Day on GGLBET awards Thursday Free Spins or Friday Free Bets after a loyalty-tier deposit and Join Now click, with published loyalty tables and 3-day reward expiry.",
      tldr:
        "GGLBET’s official Spins Day, Bet Day promotion requires a loyalty-level deposit plus Join Now: Thursday yields Free Spins and Friday yields Free Bets, with Beginner through God tables (for example Beginner deposit $50 → 10 Free Spins / 10 Free Bet), Free Spins worth $0.20 each, Free Bet min odds 1.50, and 3-day expiry on both reward types. CMS end date: 2026-08-05 19:59:00.",
      background: [
        "Weekly cadence promotions on GGLBET are easy to misread because loyalty tiers change the deposit and reward size. The official Spins Day, Bet Day page on GGLBET publishes a full loyalty table—this news article exists to walk that table without inventing extra tiers.",
        "The official title is “Spins Day, Bet Day.” The CMS promotion end date is 2026-08-05 19:59:00. Always confirm whether the live panel still shows the offer after that timestamp.",
        "Participation is two-step: make a single deposit based on loyalty level, then click Join Now on the promotion page. The official text states each valid deposit can only claim one Join Now promotion.",
        "Thursday and Friday are separate claim days. Joining on Thursday for Free Spins does not automatically grant Friday Free Bets; players must deposit and click Join Now again on Friday per the published participation requirement.",
        "Related official promotions mentioned on the Daily 188 Free Spins page include Spins Day & Bet Day—treat them as sibling offers, not interchangeable math.",
      ],
      officialAnnouncement: [
        "Official headline intent: deposit and join to receive Thursday Free Spins or Friday Free Bet according to loyalty level.",
        "How to Join (official): make your single deposit based on your Loyalty Level; click Join Now on this Promotion Page; Free Spins (Thursday) / Free Bet (Friday) are granted automatically after those steps.",
        "Official loyalty table (Thursday Free Spins / Friday Free Bet): Beginner deposit $50 → 10 Free Spins / 10 Free Bet; Elite deposit $100 → 30 / 30; Expert deposit $100 → 50 / 50; Pro deposit $200 → 60 / 60; Master deposit $200 → 100 / 100; Champion deposit $200 → 150 / 150; God deposit $200 → 200 / 200.",
        "Free Spin terms: each Free Spin worth $0.20; available for selected Pragmatic Play games listed on the official page; Free Spins Expiry: 3 Days.",
        "Free Bet terms: minimum selection odds 1.50; bet type Single & Multiple; market type Live & Pre-Match; available for ALL Sportsbook; Free Bet Expiry: 3 Days.",
        "General terms restate Join Now eligibility, one Join Now per valid deposit, separate Thursday/Friday participation, and standard GGLBET promotion controls including amend/cancel rights and English-text precedence.",
      ],
      keyHighlights: [
        "Official title: Spins Day, Bet Day",
        `CMS end date: ${promo.endDate ?? "confirm live"}`,
        "Thursday = Free Spins; Friday = Free Bet",
        "Must deposit then click Join Now",
        "Loyalty tiers: Beginner, Elite, Expert, Pro, Master, Champion, God",
        "Each Free Spin worth $0.20",
        "Free Bet minimum selection odds: 1.50",
        "Reward expiry: 3 Days for Free Spins and Free Bets",
      ],
      impact: [
        "Loyalty level determines both deposit threshold and reward size. Check your live loyalty rank on GGLBET before assuming a Beginner or God row applies.",
        "Because Join Now is required after deposit, players who deposit without opening the promotion page may not receive the reward even when the deposit amount matches a table row.",
        "Friday Free Bet participation requires a fresh Join Now even if Thursday Free Spins were claimed earlier—plan two separate sessions if you want both weekly rewards.",
        "Selected Pragmatic Play games for Free Spins are listed on the live page. Do not assume every slot in the lobby is eligible.",
      ],
      importantNotes: [
        "Each valid deposit can only claim one Join Now promotion",
        "Thursday and Friday require separate Join Now actions for their respective rewards",
        "Free Spins value: $0.20 each",
        "Free Spins expiry: 3 Days",
        "Free Bet expiry: 3 Days",
        "Free Bet min selection odds: 1.50",
        "Confirm CMS end date 2026-08-05 19:59:00 against live availability",
        "English official text prevails over translations",
      ],
      faq: [
        {
          question: "What happens on Thursday vs Friday?",
          answer:
            "Officially, a qualifying Thursday deposit plus Join Now grants Free Spins; a qualifying Friday deposit plus Join Now grants Free Bet, using the loyalty table amounts.",
        },
        {
          question: "Do I need Join Now every time?",
          answer:
            "Yes. The official eligibility line requires a qualifying deposit and Join Now. Friday still requires Join Now even after a Thursday claim.",
        },
        {
          question: "How much are Free Spins worth?",
          answer: "Official Free Spin terms state each Free Spins worth $0.20.",
        },
        {
          question: "What odds apply to Free Bets?",
          answer:
            "Official Free Bet terms require minimum selection odds 1.50 on Single & Multiple, Live & Pre-Match sportsbook markets.",
        },
        {
          question: "When does the CMS record end?",
          answer:
            "The promotion record publishes end date 2026-08-05 19:59:00. Confirm whether the live panel still lists the offer.",
        },
        {
          question: "Is this the same as Daily 188 Free Spins?",
          answer:
            "No. Daily 188 is a separate official promotion. The Daily 188 page notes Spins Day & Bet Day as a related promotion, but figures do not transfer automatically.",
        },
      ],
      closingSummary:
        "Spins Day, Bet Day is an official loyalty-table weekly cadence: deposit to your tier, click Join Now, collect Thursday Free Spins or Friday Free Bets, and use rewards within 3 days under the published spin value and free-bet odds rules. Re-check the live GGLBET panel, especially around the CMS end timestamp.",
      timeline: [
        {
          id: "sbd-verified",
          date: "2026-08-05",
          label: "CMS end date / verification day",
          body: "Promotion record end date 2026-08-05 19:59:00; confirm live listing on GGLBET.",
        },
      ],
      factRows: [
        ["Official title", "Spins Day, Bet Day"],
        ["CMS end date", "2026-08-05 19:59:00"],
        ["Thursday reward", "Free Spins by loyalty tier"],
        ["Friday reward", "Free Bet by loyalty tier"],
        ["Free Spin value", "$0.20"],
        ["Free Bet min odds", "1.50"],
        ["Reward expiry", "3 Days"],
        ["Beginner example", "Deposit $50 → 10 Free Spins / 10 Free Bet"],
      ],
    }),
  },
  {
    officialId: 936516,
    slug: "drops-and-wins-114m-official-announcement",
    category: "slots",
    newsTitle: "GGLBET lists Drops & Wins $114,000,000 tournament announcement",
    publishDate: "2026-03-04T00:00:00.000Z",
    featured: true,
    popular: true,
    sortOrder: 40,
    tags: ["slots", "pragmatic-play", "tournament", "drops-wins", "official"],
    relatedPromotionSlugs: [
      "drops-wins-114-000-000-daily-tournament-weekly-drops-936516",
    ],
    relatedGuideSlugs: ["slot-features-explained", "how-to-read-promotion-terms"],
    relatedNewsSlugs: ["spins-day-bet-day-official-announcement"],
    build: () => ({
      excerpt:
        "Official Drops & Wins announcement on GGLBET covers 04/03/2026–03/04/2027 with daily tournaments, weekly wheel drops, and an expected daily prize pool of $92,000 across 500 cash wager-free prizes.",
      tldr:
        "GGLBET’s official Drops & Wins page announces event period 04/03/2026–03/04/2027 for eligible Pragmatic Play slots, weekly Wheel of Random Wins drops (max 2 per player per week), daily tournaments with min stakes MYR0.70 / SGD0.25, first 5,000 bets scoring, and an expected daily prize pool of $92,000 across 500 cash wager-free prizes.",
      background: [
        "Long-running slot tournament frameworks need careful reading because prize pools, opt-in rules, and eligible game lists can change inside the event window. This news item only restates the official GGLBET Drops & Wins promotion content.",
        "The official title includes “Drops & Wins $114,000,000， Daily Tournament + Weekly Drops.” The event period in the content is 04/03/2026 - 03/04/2027. The CMS end date is 2027-04-03 20:00:00.",
        "Two mechanics sit side by side: Random Weekly Wheel Drops and a Daily Tournament leaderboard. Eligibility for games is determined inside the tournament/opt-in experience—players must follow the live eligible-game list, not a guessed catalog.",
        "Stories on GGLBET also surface a Drops & Wins tile pointing players toward this promotion family. The promotion page remains the factual source for stakes and prize-pool language.",
        "Because the period spans more than a year, players should re-open the live page periodically rather than relying on a saved screenshot from an earlier month.",
      ],
      officialAnnouncement: [
        "Official framing: participate in eligible Pragmatic Play slot games to earn points, climb each tournament leaderboard, and stand a chance to win a share of the tournament prize pool, plus random prizes through weekly prize wheel drops.",
        "Event Period (official): 04/03/2026 - 03/04/2027.",
        "Random Weekly Wheel Drops (official): no min bet require; promotion week Wednesday 02:01 to next Wednesday 01:59 (GMT+8); collect 3 “WHEEL OF RANDOM WINS” pieces while playing favourite slots; completing the wheel unlocks a guaranteed spin with rewards including a top prize of up to 100,000x bet, or 20 free spins, or bonus rewards; rewards credit automatically and must be claimed/used within 7 days; maximum 2 wheels per player per week.",
        "Daily Tournament (official): opt in and place qualifying bets with minimum stake MYR0.70 / SGD0.25 on participating games; win criteria = sum of win multipliers (win/bet) until tournament end; only the first 5,000 bets per player count; expected daily prize pool of $92,000 in total across 500 cash wager free prizes; points void after each tournament and restart.",
        "Participating games differ per tournament and appear when the player places the min bet and joins. Only games showing the wheel piece are eligible. General terms require real-money bets to collect wheel pieces.",
      ],
      keyHighlights: [
        "Official event period: 04/03/2026 - 03/04/2027",
        "CMS end date: 2027-04-03 20:00:00",
        "Weekly wheel: max 2 per player per week",
        "Wheel reward claim/use window: 7 days after win recorded",
        "Daily tournament min stake: MYR0.70 / SGD0.25",
        "First 5,000 bets per player count toward daily score",
        "Expected daily prize pool: $92,000 across 500 cash wager-free prizes",
        "Eligible games: Pragmatic Play list inside live tournament UI",
      ],
      impact: [
        "Slot players who want tournament points must opt in and meet the published minimum stake before assuming spins contribute to the leaderboard.",
        "Weekly wheel collectors should track the Wednesday–Wednesday GMT+8 week and the two-wheel weekly cap so they do not expect unlimited piece drops.",
        "Because only the first 5,000 bets count daily, extremely high-volume sessions do not infinitely grow score after that threshold.",
        "Prize-pool language is “expected daily prize pool of $92,000.” Treat that as the official published expectation and confirm live tournament UI for the day you play.",
      ],
      importantNotes: [
        "Event Period: 04/03/2026 - 03/04/2027",
        "Only real money bets qualify to collect WHEEL OF RANDOM WINS pieces",
        "Max 2 wheels per player per week",
        "Wheel rewards must be claimed and used within 7 days",
        "Daily tournament min stakes: MYR0.70 / SGD0.25",
        "First 5,000 bets per player count",
        "Eligible game lists are live inside the tournament—confirm before staking",
        "English official text prevails over translations",
      ],
      faq: [
        {
          question: "How long does the official Drops & Wins event run?",
          answer:
            "Official content states 04/03/2026 - 03/04/2027. CMS end date is 2027-04-03 20:00:00.",
        },
        {
          question: "What is the expected daily prize pool?",
          answer:
            "The official page states an expected daily prize pool of $92,000 in total across 500 cash wager free prizes.",
        },
        {
          question: "Is there a minimum bet for weekly wheel drops?",
          answer:
            "Official Random Weekly Wheel Drops text states no min bet require, while daily tournament qualifying bets publish MYR0.70 / SGD0.25 minimums.",
        },
        {
          question: "How many wheels can I complete weekly?",
          answer:
            "Each player can only receive a maximum of 2 “WHEEL OF RANDOM WINS” per week per the official terms.",
        },
        {
          question: "Which games qualify?",
          answer:
            "Eligible Pragmatic Play games differ by tournament and are shown in the live tournament UI when you place the min bet and join. Games with the wheel piece are eligible for wheel collection.",
        },
        {
          question: "Do bonus bets count for wheel pieces?",
          answer:
            "General terms state only real money bets qualify to collect WHEEL OF RANDOM WINS pieces.",
        },
      ],
      closingSummary:
        "The official Drops & Wins announcement is a long-window Pragmatic Play framework combining weekly wheel drops and daily tournaments with published stakes, caps, and an expected $92,000 daily prize-pool line. Re-check eligible games and opt-in status on GGLBET each session.",
      timeline: [
        {
          id: "dw-start",
          date: "2026-03-04",
          label: "Event period start",
          body: "Official Event Period begins 04/03/2026.",
        },
        {
          id: "dw-end",
          date: "2027-04-03",
          label: "Event period end",
          body: "Official Event Period ends 03/04/2027; CMS end date 2027-04-03 20:00:00.",
        },
      ],
      factRows: [
        ["Official title", "Drops & Wins $114,000,000， Daily Tournament + Weekly Drops"],
        ["Event period", "04/03/2026 - 03/04/2027"],
        ["CMS end date", "2027-04-03 20:00:00"],
        ["Daily prize pool (expected)", "$92,000 across 500 prizes"],
        ["Tournament min stake", "MYR0.70 / SGD0.25"],
        ["Bets counted per day", "First 5,000 per player"],
        ["Weekly wheel cap", "2 per player"],
      ],
    }),
  },
  {
    officialId: 998453,
    slug: "gglbet-telegram-exclusive-rewards-official-announcement",
    category: "platform",
    newsTitle: "GGLBET Telegram Exclusive Rewards official community announcement",
    publishDate: "2026-08-05T00:00:00.000Z",
    featured: true,
    popular: true,
    sortOrder: 50,
    tags: ["platform", "telegram", "community", "free-bet", "free-spins", "official"],
    relatedPromotionSlugs: ["gglbet-telegram-exclusive-rewards-998453"],
    relatedGuideSlugs: ["account-security-basics", "how-to-read-promotion-terms"],
    relatedNewsSlugs: ["gglbet-vip-club-official-announcement"],
    build: () => ({
      excerpt:
        "Official GGLBET Telegram Exclusive Rewards on GGLBET detail Spin Rain, weekday engagement rewards, and weekend Hidden Word Challenge rules with published prize and deposit conditions.",
      tldr:
        "GGLBET’s official Telegram Exclusive Rewards page describes community airdrops plus structured events: Spin Rain (1-minute burst, first 5 valid keyword entries, min $20 deposit within 3 days), weekday Daily Engagement Rewards at 5:00PM Mon–Fri ($20 Free Bet or 48 Free Spins), and weekend Hidden Word Challenge ($20 Free Bet), each with published free-bet odds and claim deposit rules.",
      background: [
        "Community rewards are frequently mis-copied in unofficial chats. GGLBET publishes Telegram Exclusive Rewards as an official promotion on GGLBET; this news article only restates that page.",
        "The official title is “GGLBET Telegram Exclusive Rewards.” No fixed CMS end date is published on the promotion record—availability must be confirmed live.",
        "The page separates evergreen community messaging from three concrete mechanics: Spin Rain, Daily Engagement Rewards (weekday), and Hidden Word Challenge (weekend).",
        "Claim terms repeatedly require a minimum $20 deposit within 3 days on a GGLBET account for several rewards. That deposit condition is an official claim gate, not an optional tip.",
        "Stories on GGLBET include a Telegram tile linking to this promotion. Use the promotion page for prize rules; treat Stories as navigation only.",
      ],
      officialAnnouncement: [
        "Official community framing: join the official GGLBET Telegram group for exclusive random airdrops, Free Bets, and Free Spins announced to active members.",
        "Spin Rain 1 Minute Burst (official): when activated, participants have a limited window; reward is 1 Minute Unlimited Free Spin; announcement posts a required keyword (examples given such as GGLWIN or other specified terms); first 5 valid entries win; minimum $20 deposit required within 3 days (GGLBET account).",
        "Daily Engagement Rewards Weekday (official): one active member selected at random for prize options $20 Free Bet (Sports & Esports) or 48 Free Spins; winners selected daily at 5:00PM (Mon-Fri); announcements in Telegram; winners contacted via DM; Free Bet applicable to all Sportsbooks markets; minimum selection odds 1.50; maximum payout 1000%; minimum $20 deposit within 3 days to claim.",
        "Hidden Word Challenge Weekend (official): find a hidden keyword in a posted quote/poem/passage; submit in the voucher code section; reward $20 Free Bet (Sportsbook) with the same free-bet market, 1.50 odds, 1000% max payout, and $20/3-day deposit claim terms.",
      ],
      keyHighlights: [
        "Official title: GGLBET Telegram Exclusive Rewards",
        "Spin Rain: first 5 valid keyword entries; 1 Minute Unlimited Free Spin reward",
        "Weekday winners announced at 5:00PM Mon–Fri",
        "Weekday prize options: $20 Free Bet or 48 Free Spins",
        "Weekend Hidden Word Challenge reward: $20 Free Bet",
        "Free Bet min selection odds: 1.50; max payout: 1000%",
        "Common claim gate: minimum $20 deposit within 3 days",
        "Confirm live Telegram instructions and the GGLBET promotion page together",
      ],
      impact: [
        "Players who want these rewards must follow the official Telegram group instructions and still satisfy GGLBET claim deposits—group activity alone is not enough when a $20/3-day deposit is required.",
        "Spin Rain is speed-based and limited to the first five valid entries per round. Keyword spelling must match the announcement exactly.",
        "Weekday selection at 5:00PM Mon–Fri means weekend engagement rewards follow the separate Hidden Word rules instead of the weekday random draw.",
        "Security note: only treat links that match the official GGLBET / official Telegram path. This article does not publish third-party invite mirrors.",
      ],
      importantNotes: [
        "Rewards are announced in the official Telegram community and documented on GGLBET",
        "Spin Rain: first 5 valid keyword entries win",
        "Weekday draw time: 5:00PM Mon–Fri",
        "Free Bet min odds 1.50; max payout 1000% where stated",
        "Minimum $20 deposit within 3 days applies to published claim terms",
        "No CMS end date on the promotion record—confirm live listing",
        "Do not use unofficial Telegram forwards as proof of prize rules",
        "English official text prevails over translations",
      ],
      faq: [
        {
          question: "Where are Telegram reward rules officially published?",
          answer:
            "On the GGLBET promotion “GGLBET Telegram Exclusive Rewards” (id 998453), alongside announcements inside the official Telegram group.",
        },
        {
          question: "What is Spin Rain?",
          answer:
            "An official 1-minute burst event where players reply with the announced keyword; the first 5 valid entries win 1 Minute Unlimited Free Spin, with a minimum $20 deposit within 3 days required under reward terms.",
        },
        {
          question: "When are weekday winners selected?",
          answer:
            "Official Daily Engagement Rewards select winners daily at 5:00PM Monday through Friday.",
        },
        {
          question: "What can weekday winners receive?",
          answer:
            "Prize options listed officially are $20 Free Bet (Sports & Esports) or 48 Free Spins.",
        },
        {
          question: "What are Free Bet restrictions?",
          answer:
            "Where stated, Free Bets apply to all Sportsbooks markets with minimum selection odds 1.50 and maximum payout 1000%, plus the $20/3-day deposit claim condition.",
        },
        {
          question: "Can I trust a forwarded screenshot?",
          answer:
            "No. Confirm the live official Telegram announcement and the GGLBET promotion page.",
        },
      ],
      closingSummary:
        "Telegram Exclusive Rewards are an official GGLBET community program with concrete Spin Rain, weekday, and weekend rules. Keep the published prize options, 5:00PM weekday timing, odds, payout cap, and $20/3-day deposit claim gates intact, and verify live instructions before depositing.",
      timeline: [],
      factRows: [
        ["Official title", "GGLBET Telegram Exclusive Rewards"],
        ["Spin Rain winners", "First 5 valid keyword entries"],
        ["Weekday selection time", "5:00PM Mon–Fri"],
        ["Weekday prizes", "$20 Free Bet or 48 Free Spins"],
        ["Weekend prize", "$20 Free Bet"],
        ["Free Bet min odds", "1.50"],
        ["Max payout", "1000%"],
        ["Claim deposit gate", "Min $20 within 3 days"],
      ],
    }),
  },
  {
    officialId: 1009258,
    slug: "powerbank-advance-official-announcement",
    category: "platform",
    newsTitle: "GGLBET PowerBank Advance official feature announcement",
    publishDate: "2026-08-05T00:00:00.000Z",
    featured: true,
    popular: true,
    sortOrder: 60,
    tags: ["platform", "sports", "casino", "powerbank", "official"],
    relatedPromotionSlugs: ["powerbank-advance-1009258"],
    relatedGuideSlugs: ["how-to-read-promotion-terms", "beginner-path-to-live-casino"],
    relatedNewsSlugs: ["gglbet-vip-club-official-announcement"],
    build: () => ({
      excerpt:
        "Official PowerBank Advance on GGLBET lets players use potential sports winnings to play casino games before the sports bet settles, with published win/loss outcome matrix and irreversible Join rules.",
      tldr:
        "GGLBET’s official PowerBank feature advances potential sports winnings for casino play before settlement. After Join, Cash Out and Edit Bets are unavailable on that slip; only real-money sports bets qualify; void/return selections forfeit PowerBank funds; final sports results still control whether casino winnings or remaining PowerBank balance can be kept.",
      background: [
        "PowerBank is published on GGLBET as a GGLBET exclusive feature/promotion hybrid. It is not free bonus money—the official page states it is an advance of potential sports winnings.",
        "Because outcomes depend on both casino results and the original sports settlement, players need the official outcome matrix before clicking Join. This news article restates that matrix without adding unofficial examples beyond the published $100 illustration.",
        "Stories on GGLBET include a PowerBank tile linking to this promotion page. Use the promotion content for rules; Stories are navigation only.",
        "No CMS end date is published on the promotion record. Confirm the feature still appears for your account on the live site.",
        "PowerBank interacts with Cash Out and Edit Bets: once Join is clicked, those tools are no longer available on that bet slip per official terms.",
      ],
      officialAnnouncement: [
        "Official definition: PowerBank allows you to use potential Sports winnings to play casino games before the Sports bet is settled. Example published: place a Sports bet that can potentially win $100; before the match ends, use that $100 PowerBank to play Casino; final payout depends on the Sports result and remaining PowerBank balance.",
        "How it works (official): after placing a Sports bet, open Open Bets; click Join to use potential Sports winnings as PowerBank Fund; click Play to select available Casino games.",
        "If you win from PowerBank (official): Sports bet won → keep Slot winnings and any remaining PowerBank paid as Sports winnings; Sports bet lost → Slot winnings cancelled because the original Sports bet lost.",
        "If you lose from PowerBank (official): Sports bet won → remaining PowerBank paid as Sports winnings (if PowerBank is fully lost, no Sports winnings remain); Sports bet lost → no payout.",
        "General terms (official): Join is final and cannot be reversed; Cash Out and Edit Bets unavailable after Join; each bet slip has a standalone PowerBank; only real-money bets eligible (bonus/free bets not eligible); if Sports settles during casino play, casino ends and winnings pay per rules; resettlement forfeits PowerBank-related winnings; only sports bets with all selections settled WON are eligible to receive PowerBank Fund regardless of casino win/loss; any VOIDED/RETURN selection forfeits PowerBank Fund; if entire original bet settles VOID/RETURN, PowerBank is forfeited and only original stake is refunded.",
      ],
      keyHighlights: [
        "Official name: PowerBank / PowerBank Advance",
        "Not free bonus money—advance of potential sports winnings",
        "Join is irreversible; Cash Out and Edit Bets disabled on that slip",
        "Only real-money sports bets qualify",
        "Each bet slip has its own standalone PowerBank",
        "Void/return selections forfeit PowerBank funds",
        "Published example potential win amount: $100",
        "Confirm live availability on GGLBET before Join",
      ],
      impact: [
        "Sports bettors who value Cash Out flexibility should treat Join as a deliberate trade-off: PowerBank access removes Cash Out/Edit Bets on that slip.",
        "Casino play funded by PowerBank can look like a win mid-session but still be cancelled if the originating sports bet loses—plan bankroll psychology around the official matrix.",
        "Players running multiple slips cannot pool PowerBank funds; manage each slip independently.",
        "Resettlement risk is explicit: if the sports bet is resettled, PowerBank-related winnings are forfeited per official terms.",
      ],
      importantNotes: [
        "PowerBank is an advance of potential Sports winnings, not free bonus money",
        "Join decision is final and cannot be reversed",
        "Cash Out and Edit Bets unavailable after Join on that slip",
        "Bonus Bets and Free Bets are not eligible",
        "VOIDED/RETURN selections forfeit the PowerBank Fund",
        "Resettlement forfeits PowerBank-related winnings",
        "No CMS end date—confirm live feature availability",
        "English official text prevails over translations",
      ],
      faq: [
        {
          question: "Is PowerBank free bonus money?",
          answer:
            "No. The official page states PowerBank is an advance of your potential Sports winnings, not free bonus money.",
        },
        {
          question: "Can I Cash Out after joining PowerBank?",
          answer:
            "No. Official terms state that once you click Join, Cash Out and Edit Bets will no longer be available for that bet slip.",
        },
        {
          question: "What if my sports bet loses after I win in casino?",
          answer:
            "Official outcome: if you win from PowerBank but the Sports bet loses, Slot winnings are cancelled because the original Sports bet lost.",
        },
        {
          question: "Do bonus bets qualify?",
          answer:
            "No. Only Real Money Bets are eligible; Bonus Bets and Free Bets are not eligible.",
        },
        {
          question: "What happens on void or return selections?",
          answer:
            "If any selection is VOIDED/RETURN, the PowerBank Fund is forfeited and payout follows the original Sports bet result rules published on the page.",
        },
        {
          question: "Where is this announced?",
          answer:
            "On GGLBET under the PowerBank Advance promotion/feature page (id 1009258).",
        },
      ],
      closingSummary:
        "PowerBank Advance is an official GGLBET feature that advances potential sports winnings into casino play with strict Join irreversibility and an explicit win/loss matrix. Read the live GGLBET terms before enabling it on any slip.",
      timeline: [],
      factRows: [
        ["Official title", "PowerBank Advance"],
        ["Nature", "Advance of potential Sports winnings (not free bonus)"],
        ["Join", "Final / irreversible"],
        ["Cash Out after Join", "Unavailable on that slip"],
        ["Eligible bets", "Real money only"],
        ["Example potential win", "$100"],
        ["Void/return effect", "PowerBank Fund forfeited"],
      ],
    }),
  },
  {
    officialId: 709613,
    slug: "gglbet-vip-club-official-announcement",
    category: "platform",
    newsTitle: "GGLBET VIP Club / Loyalty Program official announcement",
    publishDate: "2026-08-05T00:00:00.000Z",
    featured: true,
    popular: true,
    sortOrder: 70,
    tags: ["platform", "vip", "loyalty", "cashback", "official"],
    relatedPromotionSlugs: ["gglbet-vip-club-709613"],
    relatedGuideSlugs: ["how-to-get-started-on-gglbet", "how-to-read-promotion-terms"],
    relatedNewsSlugs: ["spins-day-bet-day-official-announcement"],
    build: () => ({
      excerpt:
        "Official GGLBET VIP Club / Loyalty Program on GGLBET publishes 7 lifetime ranks, XP earn rates, cashback caps, Thursday/Friday deposit rewards, birthday bonuses, and withdrawal limits by currency.",
      tldr:
        "GGLBET’s official Loyalty Program announces 7 ranks (Beginner to God), 10 levels each, lifetime ranks that do not drop, XP from Sports ($5→1 XP), Casino ($25→1 XP), and Slots ($12.50→1 XP) with sports odds ≥1.3 on real-money bets, plus published weekly/daily cashback caps, Thursday/Friday deposit rewards, birthday bonuses, and daily withdrawal limits across MYR/SGD/PHP.",
      background: [
        "VIP and loyalty language is often paraphrased incorrectly outside official channels. The GGLBET “GGLBET VIP Club” promotion is the factual source for ranks, XP rates, and benefit tables used in this news article.",
        "Official messaging states the new GGLBET Loyalty Program awards Loyalty Points as XP, recalibrates level from existing loyalty history, and keeps ranks lifetime once achieved.",
        "There are 7 total ranks and 10 levels per rank. Real money prizes are issued when unlocking a new level or rank per the published level-up tables.",
        "Spins Day / Bet Day deposit rewards on the VIP page align with the separate Spins Day, Bet Day promotion tables—confirm both live pages if you are claiming Thursday/Friday rewards.",
        "No CMS end date is published on this promotion record. Re-verify tables on GGLBET whenever you change rank or currency.",
      ],
      officialAnnouncement: [
        "Official program points: automatic recalibration from existing loyalty history; new loyalty rank is lifetime and will not drop; 7 ranks; each rank has 10 levels; unlocking levels/ranks awards real money prizes.",
        "Ranks (official): Beginner (1-10), Elite (11-20), Expert (21-30), Pro (31-40), Master (41-50), Champion (51-60), God (61-70).",
        "XP collection (official): Sports earn 1 XP per $5 bet; Casino earn 1 XP per $25 bet; Slots earn 1 XP per $12.50 bet. Example for a $100 bet: Sports 20 XP, Live Casino 4 XP, Slots 8 XP. Only sports bets with odds of 1.3 or higher qualify; only real money bets earn XP; Bonus/Free Bets do not; eligible categories Sports, Casino, and Slots—Games category excluded.",
        "Benefit examples published by rank include Weekly 10% Sports CashBack max from $150 to $500, Weekly 5% Live Casino CashBack max from $2,000 to $4,000, Daily 5% Slots CashBack max from $2,000 to $4,000, Daily 1% Slots Turnover max from $500 to $1,000, Daily 0.25% Live Casino Turnover max from $150 to $500, Thursday/Friday deposit reward rows matching loyalty tiers, Birthday Bonus amounts from $28 to $2,888, dedicated account manager from Pro upward, and daily withdrawal limits for MYR/SGD/PHP with 3-count structure (for example Beginner SGD 5,000; God SGD 50,000).",
        "Membership Renewal is listed as Lifetime across ranks. Detailed Level Up Bonus tables publish XP thresholds and currency prize amounts on the official page—confirm the live table for your level rather than memorizing a partial extract.",
      ],
      keyHighlights: [
        "7 ranks × 10 levels; ranks are lifetime and do not drop",
        "XP: Sports $5=1 XP; Casino $25=1 XP;Slots $12.50=1 XP",
        "Sports XP requires odds 1.3+",
        "Only real-money bets earn XP",
        "Birthday Bonus table ranges $28–$2,888 by rank",
        "Dedicated Account Manager from Pro, Master, Champion, God",
        "Daily SGD withdrawal examples: 5,000 (Beginner) up to 50,000 (God), 3 count",
        "Confirm full level-up prize tables on the live GGLBET page",
      ],
      impact: [
        "Players migrating focus or comparing VIP claims should use the official XP rates and odds floor rather than informal “points per dollar” summaries from chats.",
        "Cashback and turnover benefit caps differ by rank. Moving from Elite to Expert changes several published max lines—re-read the live table after each rank-up.",
        "Thursday/Friday deposit rewards listed on the VIP page should be cross-checked with the Spins Day, Bet Day promotion if both are visible, to avoid double-claim confusion.",
        "Withdrawal limit rows are currency-specific. An SGD wallet must use the SGD column, not convert MYR limits unofficially.",
      ],
      importantNotes: [
        "Ranks are lifetime and do not drop once achieved",
        "Sports XP requires odds of 1.3 or higher",
        "Bonus Bets and Free Bets do not earn XP",
        "Games category is excluded from XP-eligible categories",
        "Membership Renewal listed as Lifetime",
        "Level-up prize amounts vary by level and currency—use the live table",
        "No CMS end date—confirm live program tables",
        "English official text prevails over translations",
      ],
      faq: [
        {
          question: "How many VIP/loyalty ranks are there?",
          answer:
            "The official program publishes 7 ranks: Beginner, Elite, Expert, Pro, Master, Champion, and God, with 10 levels each.",
        },
        {
          question: "Do ranks drop?",
          answer:
            "Official text states your new loyalty rank is lifetime and will not drop once achieved.",
        },
        {
          question: "How do I earn XP?",
          answer:
            "Official rates: 1 XP per $5 Sports bet, 1 XP per $25 Casino bet, 1 XP per $12.50 Slots bet, with sports odds ≥1.3 and real-money bets only.",
        },
        {
          question: "What is an example XP calculation?",
          answer:
            "Official example for a $100 bet: Sports 20 XP, Live Casino 4 XP, Slots 8 XP.",
        },
        {
          question: "When do dedicated account managers appear?",
          answer:
            "The published benefit table lists Dedicated Account Manager as Yes from Pro through God (not for Beginner/Elite/Expert).",
        },
        {
          question: "Where is the full level-up prize list?",
          answer:
            "On the live GGLBET GGLBET VIP Club promotion page (id 709613). This article does not invent missing level rows.",
        },
      ],
      closingSummary:
        "The official GGLBET VIP Club / Loyalty Program announcement defines lifetime ranks, XP earn rates, and multi-currency benefit tables. Use the live GGLBET page as the calculator for your current level—especially cashback caps, birthday amounts, and withdrawal limits.",
      timeline: [],
      factRows: [
        ["Official title", "GGLBET VIP Club"],
        ["Ranks", "7 (Beginner→God), 10 levels each"],
        ["Rank durability", "Lifetime / does not drop"],
        ["Sports XP", "1 XP per $5 (odds ≥1.3)"],
        ["Casino XP", "1 XP per $25"],
        ["Slots XP", "1 XP per $12.50"],
        ["Birthday bonus range", "$28–$2,888"],
      ],
    }),
  },
  {
    officialId: 680048,
    slug: "slots-welcome-bonus-300-official-announcement",
    category: "promotions",
    newsTitle: "GGLBET 300% Slots Welcome Bonus official announcement",
    publishDate: "2026-08-05T00:00:00.000Z",
    featured: true,
    popular: true,
    sortOrder: 80,
    tags: ["promotions", "welcome", "slots", "official"],
    relatedPromotionSlugs: [
      "300-slots-welcome-bonus-680048",
      "100-live-casino-welcome-bonus-680038",
      "250-sportsbook-welcome-bonus-680055",
    ],
    relatedGuideSlugs: [
      "how-to-get-started-on-gglbet",
      "how-to-read-promotion-terms",
    ],
    relatedNewsSlugs: ["singapore-national-day-61-official-announcement"],
    build: () => ({
      excerpt:
        "Official 300% Slots Welcome Bonus on GGLBET publishes min deposit / max bonus / max bet tables, 35x turnover, 7-day expiry, and claim-before-deposit steps for Local Bank Transfer MY/SG.",
      tldr:
        "GGLBET’s official 300% Slots Welcome Bonus offers 300% for slots with published mins (SGD 50), max bonus (SGD 3,000), max bet (SGD 10), turnover 35x, bonus expiry 7 days, claimable once per account, claim-first-then-deposit via Profile > Promotional Bonuses, funded through Local Bank Transfer (MY) or Local Bank Transfer (SG).",
      background: [
        "Welcome bonuses are the most commonly misquoted GGLBET offers online. This news item only uses the official “300% Slots Welcome Bonus” page on GGLBET.",
        "Sibling official welcome pages also exist for 100% Live Casino Welcome Bonus and 250% Sportsbook Welcome Bonus. Each has its own tables—do not mix percentages across products.",
        "The claim sequence is explicit: claim first, then deposit. Depositing first can fail the published flow even when the amount matches the minimum.",
        "No CMS end date is published on this promotion record. Confirm the offer still appears under Promotional Bonuses for new eligible accounts.",
        "Turnover 35x and 7-day expiry are short operational windows relative to the bonus size—read them before opting in.",
        "Players comparing welcome packages should open each official welcome page side by side on GGLBET rather than trusting a single combined “welcome boost” summary from chats or agents. The slots welcome page never republishes live-casino or sportsbook percentages as interchangeable figures.",
        "Because max bet lines are published beside max bonus lines, wagering plans must respect both. Clearing 35x while ignoring the max bet row is a common reading failure this announcement is meant to prevent.",
      ],
      officialAnnouncement: [
        "Official framing: enjoy 300% Slots Welcome Bonus for Slots Games.",
        "Official currency table: Min Deposit MYR 50 / SGD 50 / PHP 600 / USDT 10; Max Bonus MYR 3,000 / SGD 3,000 / PHP 36,000 / USDT 600; Max Bet MYR 10 / SGD 10 / PHP 120 / USDT 2.",
        "Bonus terms (official): available for ALL Slots Games; Turnover Requirement 35x; Bonus Expiry 7 days.",
        "How to claim (official): Register and Login on GGLBET website; click Profile > Promotional Bonuses; search for “300% Slots Welcome Bonus” and Claim; note Claim first then Deposit; deposit using Local Bank Transfer (MY) or Local Bank Transfer (SG); bonus credits automatically.",
        "General terms: claimable once per GGLBET account; buy bonus unavailable while using this bonus; Games category excluded; some providers may not offer a bonus system; cancelling/deactivating removes bonus money; fraud suspicion may bar participation; GGLBET may amend/cancel/terminate; English text prevails.",
        "Operational reading note: the official claim path names Local Bank Transfer (MY) and Local Bank Transfer (SG). If your cashier shows additional methods, still follow the methods named on this promotion page for this bonus unless the live panel updates those lines.",
      ],
      impact: [
        "New slots-focused players should compare this page with the live casino and sportsbook welcome pages before claiming, because only one welcome path may fit how they actually play.",
        "Max bet limits (for example SGD 10) can invalidate progress if ignored during wagering—confirm the live max-bet line while clearing 35x.",
        "The once-per-account rule means testing claims on multiple profiles is outside published terms and may trigger fraud controls.",
        "If Local Bank Transfer MY/SG is unavailable for your account routing, follow the live cashier options shown on GGLBET rather than inventing alternative methods not listed on this promotion page.",
        "Players who need a slower onboarding path can read the related getting-started and promotion-terms guides first, then return to the live welcome panel—guides do not change the 300%, 35x, or 7-day figures.",
      ],
      keyHighlights: [
        "Official title: 300% Slots Welcome Bonus",
        "Bonus rate: 300%",
        "SGD min deposit 50 / max bonus 3,000 / max bet 10",
        "Turnover: 35x",
        "Bonus expiry: 7 days",
        "Claimable once per GGLBET account",
        "Claim before deposit",
        "Deposit methods named: Local Bank Transfer (MY) or (SG)",
      ],
      importantNotes: [
        "Available for ALL Slots Games per official bonus terms",
        "Turnover Requirement: 35x",
        "Bonus Expiry: 7 days",
        "Claimable Once per GGLBET account",
        "Claim first then Deposit",
        "Buy bonus feature not available while using this bonus",
        "Games category excluded",
        "English official text prevails over translations",
      ],
      faq: [
        {
          question: "What is the official welcome percentage for slots?",
          answer: "The official page title and content state 300% Slots Welcome Bonus.",
        },
        {
          question: "What is the SGD max bonus?",
          answer: "The official table lists Max Bonus SGD 3,000 with Min Deposit SGD 50 and Max Bet SGD 10.",
        },
        {
          question: "What turnover applies?",
          answer: "Official Bonus Terms state Turnover Requirement: 35x.",
        },
        {
          question: "How long does the bonus last?",
          answer: "Official Bonus Expiry is 7 days.",
        },
        {
          question: "Do I deposit before claiming?",
          answer:
            "No. Official claim steps say Claim first then Deposit after locating the bonus under Profile > Promotional Bonuses.",
        },
        {
          question: "Are live casino or sports welcome offers the same page?",
          answer:
            "No. Separate official pages publish 100% Live Casino Welcome Bonus and 250% Sportsbook Welcome Bonus with their own figures.",
        },
      ],
      closingSummary:
        "The official 300% Slots Welcome Bonus announcement is a once-per-account slots welcome with published currency tables, 35x turnover, 7-day expiry, and a claim-before-deposit flow via Local Bank Transfer MY/SG. Confirm the live GGLBET promotional bonus panel before registering funds.",
      timeline: [],
      factRows: [
        ["Official title", "300% Slots Welcome Bonus"],
        ["Bonus", "300%"],
        ["Min deposit (MYR/SGD/PHP/USDT)", "50 / 50 / 600 / 10"],
        ["Max bonus (MYR/SGD/PHP/USDT)", "3,000 / 3,000 / 36,000 / 600"],
        ["Max bet (MYR/SGD/PHP/USDT)", "10 / 10 / 120 / 2"],
        ["Turnover", "35x"],
        ["Expiry", "7 days"],
        ["Claim limit", "Once per account"],
      ],
    }),
  },
];

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);
}

function buildSourceUrl(promo: OfficialPromotionRecord): string {
  const titlePath = slugify(promo.metaUrl?.trim() || promo.title);
  return `https://www.gglbet5.com/en/promotions/all/${promo.id}/${titlePath}`;
}

export function buildOfficialNewsSeeds(): readonly OfficialNewsSeed[] {
  const promotions = (officialPromotions as { promotions: OfficialPromotionRecord[] })
    .promotions;
  const byId = new Map(promotions.map((p) => [p.id, p]));

  // Fix related news placeholders that were temporary stubs in specs
  const seeds = SPECS.map((spec, index) => {
    const promo = byId.get(spec.officialId);
    if (!promo) {
      throw new Error(
        `Missing official promotion ${spec.officialId} required for news seed`,
      );
    }
    if (!(ANNOUNCEMENT_IDS as readonly number[]).includes(spec.officialId)) {
      throw new Error(`Announcement id ${spec.officialId} not in curated set`);
    }

    const partial = spec.build(promo);
    const sourceUrl = buildSourceUrl(promo);
    const relatedNewsSlugs = spec.relatedNewsSlugs.filter((slug) =>
      SPECS.some((s) => s.slug === slug),
    );

    const longform: NewsLongformSections = {
      title: spec.newsTitle,
      slug: spec.slug,
      category: spec.category,
      tldr: partial.tldr,
      background: partial.background,
      officialAnnouncement: partial.officialAnnouncement,
      keyHighlights: partial.keyHighlights,
      impact: partial.impact,
      importantNotes: partial.importantNotes,
      faq: partial.faq,
      closingSummary: partial.closingSummary,
      timeline: partial.timeline,
      factRows: partial.factRows,
      sourceNote: SOURCE_NOTE,
      lastVerified: true,
      verifiedDate: VERIFIED_DATE,
      sourceUrl,
      sourceName: SOURCE_NAME,
      relatedProviderSlugs: [],
      relatedGameSlugs: [],
      relatedGuideSlugs: spec.relatedGuideSlugs,
      relatedPromotionSlugs: spec.relatedPromotionSlugs,
      relatedNewsSlugs,
      ctaPrimaryLabel: "Open GGLBET promotions",
      ctaPrimaryHref: "/promotions",
      ctaSecondaryLabel: "How to read promotion terms",
      ctaSecondaryHref: "/guide/promotions/how-to-read-promotion-terms",
      metaTitle: `${spec.newsTitle} | GGLBET News`,
      metaDescription: partial.excerpt.slice(0, 155).replace(/\s+\S*$/, ""),
    };

    return {
      id: `news-gglbet5-${spec.officialId}`,
      slug: spec.slug,
      title: spec.newsTitle,
      officialPromotionId: spec.officialId,
      category: spec.category,
      excerpt: partial.excerpt,
      publishDate: spec.publishDate,
      updatedDate: `${VERIFIED_DATE}T00:00:00.000Z`,
      featured: spec.featured ?? false,
      breaking: spec.breaking ?? false,
      popular: spec.popular ?? false,
      sortOrder: spec.sortOrder || (index + 1) * 10,
      tags: spec.tags,
      timeline: partial.timeline,
      relatedPromotionSlugs: spec.relatedPromotionSlugs,
      relatedGuideSlugs: spec.relatedGuideSlugs,
      relatedNewsSlugs,
      relatedProviderSlugs: [] as string[],
      relatedGameSlugs: [] as string[],
      lastVerified: true,
      verifiedDate: VERIFIED_DATE,
      sourceUrl,
      sourceName: SOURCE_NAME,
      longform,
      blocks: buildNewsLongformBlocks(longform),
    } satisfies OfficialNewsSeed;
  });

  // Wire bidirectional related news among the curated set
  const slugSet = new Set(seeds.map((s) => s.slug));
  return seeds.map((seed, index) => {
    const prev = seeds[(index - 1 + seeds.length) % seeds.length]?.slug;
    const next = seeds[(index + 1) % seeds.length]?.slug;
    const relatedNewsSlugs = [
      ...seed.relatedNewsSlugs.filter((s) => slugSet.has(s)),
      ...(prev && prev !== seed.slug ? [prev] : []),
      ...(next && next !== seed.slug && next !== prev ? [next] : []),
    ].filter((slug, i, arr) => arr.indexOf(slug) === i);

    const longform: NewsLongformSections = {
      ...seed.longform,
      relatedNewsSlugs,
    };

    return {
      ...seed,
      relatedNewsSlugs,
      longform,
      blocks: buildNewsLongformBlocks(longform),
    };
  });
}
