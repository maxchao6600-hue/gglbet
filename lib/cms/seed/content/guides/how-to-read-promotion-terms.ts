import {
  buildGuideLongformBlocks,
  type GuideLongformSections,
} from "@/lib/cms/seed/content/guides/longform";
import { ROUTES, getGuideCategoryHref } from "@/constants/routes";

export const howToReadPromotionTermsLongformSections: GuideLongformSections = {
  title: "How to read promotion terms",
  category: "promotions",
  difficulty: "intermediate",

  tldr:
    "Every GGLBET promotion is defined by four load-bearing details: wagering requirement, eligibility, expiry window, and game weighting. Read those four before you opt in, using the live promotion page as the authoritative source. This guide walks through Welcome Boost, Weekend Reload, and Orchid Free Spins as worked examples so you can build a repeatable checklist instead of skimming headline percentages.",

  intro: [
    "A promotion headline like '100% up to a bonus amount' or 'free spins on a featured slot' tells you almost nothing about whether the offer suits your bankroll or your favorite games. The number that matters most is usually printed further down the page, inside a wagering requirement, an eligibility clause, or a game weighting table. Players who opt in based on the headline alone frequently discover mid-session that their preferred live-casino table contributes nothing toward clearing the bonus, or that a bet cap silently reduced their stake size the moment bonus funds entered play.",
    "This guide teaches a repeatable reading process rather than summarizing any single offer. You will learn what wagering requirement multipliers actually multiply, how eligibility restrictions narrow who can claim and what games count, why expiry windows come in at least two flavors, and how game weighting quietly changes the real cost of clearing a bonus. Three GGLBET promotions anchor the examples throughout: Welcome Boost, a deposit-matched offer aimed at new accounts; Weekend Reload, a recurring reload bonus for returning players; and Orchid Free Spins, a spins-based promotion tied to a featured slot title.",
    "None of the figures attached to those three promotions in this guide should be treated as current live terms. Promotion pages update on their own schedule—percentages change, expiry windows shift, and weighting tables get revised as new games launch. The process taught here is durable even when the specific numbers are not: open the full terms link, work through the same four questions in the same order, and you will reach a sound opt-in decision regardless of which promotion is running when you read this.",
    "Reading promotion terms is a skill, not a formality. Treat it the way you would treat a contract for a subscription service: skimming the marketing copy and skipping the fine print is how people end up locked into obligations they did not intend to accept. A wagering requirement is exactly that kind of obligation—it determines how much you must turn over in real bets before bonus-derived winnings become withdrawable. Understanding it before you opt in protects both your bankroll and your expectations.",
    "By the end of this guide you should be able to open any GGLBET promotion, locate its wagering requirement, eligibility scope, expiry window, and weighting table within a couple of minutes, and decide—using a short checklist—whether the offer fits how you actually play. That decision-making habit transfers to every promotion you encounter afterward, not just the three used as examples here.",
    "It also helps to understand why operators structure promotions this way in the first place. A bonus is not a gift with no strings attached—it is a marketing tool designed to encourage deposits and extended play, and the wagering requirement exists so the operator is not simply handing out withdrawable cash on signup. That is a normal and disclosed part of how casino promotions work everywhere, not a hidden trick specific to any one offer. Understanding the business logic behind the requirement makes the fine print feel less like a trap and more like a known cost you can evaluate rationally before opting in.",
  ],

  playerFitLead:
    "This guide is written for players who have claimed at least one bonus before but want a sharper, more consistent process for deciding whether to opt in next time.",
  playerFit: [
    "You have deposited on GGLBET before and seen a promotion banner or opt-in toggle at least once",
    "You want a repeatable checklist rather than a one-off explanation of a single current offer",
    "You play a mix of slots and other categories and want to know how weighting affects you specifically",
    "You have been surprised before by a wagering requirement, expiry date, or bet cap you did not expect",
    "You are comfortable reading a terms page slowly rather than opting in from the banner alone",
    "You want to compare a deposit-matched bonus, a reload bonus, and a free-spins offer using the same framework",
  ],

  backgroundLead:
    "Before working through Welcome Boost, Weekend Reload, and Orchid Free Spins as examples, it helps to fix the vocabulary that every promotion page relies on. These four concepts recur across nearly every casino bonus you will ever read.",
  background: [
    "Wagering requirement is a multiplier applied to a base amount—usually the bonus itself, sometimes the bonus plus deposit combined—that tells you how much total betting turnover you need to generate before associated winnings unlock for withdrawal. A 35x wagering requirement on a bonus amount means your qualifying bets across the promotion's eligible games must add up to thirty-five times that bonus figure. This is turnover, not net loss: a $10 bet that returns $8 still counts as $10 of wagering progress even though your balance moved in the wrong direction.",
    "Eligibility narrows two things at once: who can claim the promotion, and which games count once you have. Account-level eligibility might restrict an offer to first-time depositors, to a specific region, or to accounts that have not claimed a similar bonus recently. Game-level eligibility is separate—some promotions only credit wagering progress on slots, others exclude specific high-RTP titles entirely, and live-dealer or sportsbook wagers frequently do not count at all even when the promotion is nominally 'casino-wide.'",
    "Expiry works on two independent clocks that are easy to conflate. The first clock is the activation or claim window—how long you have to opt in or deposit after becoming eligible. The second clock is the completion window—how long you have, after the bonus is credited, to finish the wagering requirement before unclaimed bonus funds and any related winnings are removed from your account. A promotion can have a generous claim window and a tight completion window, or the reverse, and missing either one forfeits the offer.",
    "Game weighting determines how much of each wager actually counts toward the wagering requirement, and it is the detail most players skip. Slots commonly weight at or near 100%, meaning a dollar wagered counts as close to a dollar of progress. Live-dealer tables, video poker, and certain table games often weight far lower—sometimes 10% or less—because their house edge is lower and their payout structure differs from slots. A player who opts into a slots-funded bonus and then plays mostly blackjack can end up needing to wager many times more in actual stakes than the headline multiplier implies.",
    "One more distinction worth fixing early is the difference between a sticky bonus and a non-sticky, or cash-convertible, bonus. A sticky bonus sits in a separate bonus balance that cannot itself be withdrawn—only winnings generated from wagering it become eligible for withdrawal once the requirement clears, and the bonus amount is removed at the end. A non-sticky structure blends bonus funds with your cash balance for wagering purposes, which changes how you should think about tracking remaining balance during play. The terms page states which structure applies; do not assume one over the other based on a previous promotion from the same operator.",
  ],

  stepsLead:
    "Work through these steps in order every time you consider opting into a promotion. The sequence matters: eligibility and game weighting change whether the headline offer is even worth pursuing before you look at anything else.",
  steps: [
    {
      title: "Open the full terms page, not just the banner",
      text:
        "Promotion banners and short descriptions on the promotions hub summarize an offer in a sentence or two. Click through to the dedicated promotion page and locate the full terms section—usually below the hero description—before doing anything else. Bookmark or screenshot this page once you opt in, since terms can be revised on the operator's own schedule and your claim is generally governed by the version in effect when you accepted it.",
    },
    {
      title: "Confirm you meet account-level eligibility",
      text:
        "Check whether the promotion is restricted to new accounts, a specific deposit method, a minimum deposit amount, or a cooldown since your last similar claim. Welcome Boost, for example, is framed around new-account deposits, so an existing player checking it should look for whether a reload-style alternative like Weekend Reload applies to their account instead. Do not assume eligibility from the marketing headline—confirm it against the stated criteria.",
    },
    {
      title: "Identify the wagering requirement multiplier and its base",
      text:
        "Locate the exact multiplier (for example 35x or 40x) and, just as importantly, what it is multiplied against. A 35x requirement on the bonus alone is a very different obligation than 35x on the deposit plus bonus combined. Write down the resulting dollar figure using your intended deposit size before deciding anything else—an abstract multiplier is hard to evaluate, but a concrete turnover target is not.",
    },
    {
      title: "Check both expiry clocks separately",
      text:
        "Find the claim or activation deadline first, then find the separate completion deadline for finishing the wagering requirement. For a reload-style offer like Weekend Reload, the claim window may reset weekly while the completion window for each individual credit runs on its own shorter clock. For a spins-based offer like Orchid Free Spins, note whether spins expire before you use them and whether winnings from those spins carry their own separate wagering clock afterward.",
    },
    {
      title: "Read the game weighting table line by line",
      text:
        "Scroll to the weighting section and find your preferred game categories specifically, not just the overall summary. If a promotion credits slots at 100% but live-casino tables at 10% or 0%, and you mostly play live tables, the effective cost of clearing the bonus is far higher than the multiplier alone suggests—or the bonus may be effectively unclearable through your normal play. Orchid Free Spins ties its wagering to a specific featured slot, so confirm whether winnings from those spins must be wagered on that same title or across a broader eligible list.",
    },
    {
      title: "Check maximum bet and maximum win caps",
      text:
        "Most bonus terms cap the size of any single bet you can place while a bonus is active—commonly a fixed dollar amount or a percentage of the bonus balance—and some cap the total amount you can withdraw from bonus-derived winnings. Placing a bet above the stated cap while bonus funds are active can void the wagering progress or the bonus entirely under many operators' terms, so confirm the cap before increasing your stake size mid-session.",
    },
    {
      title: "Decide opt-in using a short threshold checklist",
      text:
        "Combine what you found in the previous steps into a single yes-or-no decision: does the game weighting favor the games you actually play, is the turnover target achievable within the completion window at your normal stake size, and does the eligibility clause clearly include your account. If any answer is no, it is reasonable to decline the promotion and continue playing on your regular balance without it.",
    },
    {
      title: "Opt in through the correct control, not by depositing blindly",
      text:
        "Some promotions activate automatically on a qualifying deposit, while others require an explicit opt-in toggle on the promotion page or in the cashier before you deposit. Depositing before opting in can mean the deposit does not qualify at all. Confirm the activation mechanism stated in the terms, then verify in your account or bonus balance view that the promotion actually shows as active before you start wagering toward it.",
    },
    {
      title: "Track wagering progress and confirm before requesting withdrawal",
      text:
        "Most accounts show a live wagering progress indicator once a bonus is active—use it rather than estimating from memory. When progress reaches the full requirement, check the promotion terms again for any final conditions, such as a minimum number of qualifying bets or a manual conversion step, before submitting a withdrawal request that includes bonus-derived funds.",
    },
  ],

  checklistLead:
    "Before you click opt-in on any promotion, confirm each of these items using the live terms page for that specific offer.",
  checklistItems: [
    "You have opened the full terms page, not just the promotion banner",
    "Your account meets the stated eligibility criteria for this specific offer",
    "You know the exact wagering multiplier and what base amount it applies to",
    "You have written down the resulting turnover target in real currency",
    "You know both the claim deadline and the separate completion deadline",
    "You have checked the weighting percentage for the games you actually play",
    "You know the maximum bet size allowed while the bonus is active",
    "You know whether there is a maximum withdrawal cap on bonus winnings",
    "You have confirmed the correct opt-in mechanism for this promotion type",
  ],

  bestPracticesLead:
    "These habits keep promotion terms from becoming a source of surprise fees, forfeited bonuses, or wasted deposits over time.",
  bestPractices: [
    "Read the terms page fresh for every promotion, even ones you have claimed before, since figures change between campaigns",
    "Convert every multiplier into a real dollar turnover figure before deciding whether it is realistic for your bankroll",
    "Check game weighting against your actual play habits, not against the game you might theoretically try",
    "Keep a simple note of your active bonus's completion deadline somewhere you will actually see it",
    "Confirm the opt-in mechanism before depositing so the deposit is not wasted on a non-qualifying transaction",
    "Compare a deposit-matched offer, a reload offer, and a spins offer using the same four-question framework rather than separate mental models",
    "Treat the in-account promotion page as the authoritative source over any summary, including this guide",
  ],

  mistakes: [
    "Opting in based on the headline percentage without reading the wagering requirement base",
    "Assuming live-casino or table-game wagers count fully toward a slots-focused promotion",
    "Missing the completion deadline because only the claim deadline was checked",
    "Placing a bet above the maximum stake cap while a bonus is active",
    "Depositing before opting in in cases where the terms require opt-in first",
    "Ignoring the separate wagering clock that can apply to winnings from free spins",
    "Stacking assumptions from one promotion type onto a different promotion without rereading its specific terms",
  ],

  comparisonLead:
    "The table below illustrates how the same four questions apply differently across a deposit-matched bonus, a reload bonus, and a free-spins promotion. Treat these as illustrative examples of structure, and always confirm live figures on each promotion's own terms page before opting in.",
  comparisonHeaders: [
    "Promotion",
    "Bonus structure",
    "What sets the turnover base",
    "Weighting emphasis to check",
    "Expiry pattern to watch",
  ],
  comparisonRows: [
    [
      "Welcome Boost",
      "Deposit-matched bonus for new accounts",
      "Bonus amount, or bonus plus deposit depending on stated terms",
      "Slots typically weighted highest; confirm live-casino and table exclusions",
      "Claim window tied to first deposit; separate completion window for the wagering requirement",
    ],
    [
      "Weekend Reload",
      "Recurring reload bonus on qualifying deposits",
      "Each reload credit's own bonus amount, reset per qualifying deposit",
      "Recheck weighting each cycle, since reload terms can be revised between weekends",
      "Short recurring claim window; completion deadline resets with each new credit",
    ],
    [
      "Orchid Free Spins",
      "Spins credited on a featured slot title",
      "Winnings generated from the spins, not a deposited amount",
      "Confirm whether winnings must be wagered on the same featured title or a broader list",
      "Spins themselves expire quickly if unused; winnings carry their own separate wagering clock",
    ],
  ],
  comparisonCaption:
    "Illustrative structure only—confirm live percentages, multipliers, and dates on each promotion's current terms page.",

  tipsLead:
    "Apply these habits the next time a promotion banner catches your attention, before you tap opt-in.",
  tips: [
    "Screenshot the terms page at the moment you opt in so you have a fixed reference if questions come up later",
    "Calculate your turnover target in currency before your first wagering session, not after",
    "Play your normal game mix first in your head, then check whether that mix clears the bonus efficiently",
    "Set a reminder a few days before the completion deadline so you are not rushing at the last moment",
    "Ask support to clarify a specific clause in writing if a term is ambiguous, rather than guessing",
    "Avoid switching game categories mid-bonus without rechecking the weighting table for the new category",
    "Review your bonus balance and progress indicator regularly rather than estimating from memory",
    "Decline a promotion entirely when the weighting clearly disfavors your normal games—declining is a valid outcome",
  ],

  warnings: [
    "Wagering requirements are real financial obligations, not marketing flourishes—unmet requirements typically forfeit the bonus and associated winnings when the completion window closes.",
    "Exceeding a stated maximum bet cap while a bonus is active can void wagering progress under many operators' terms, even if the bet itself would otherwise be permitted.",
    "Terms shown on a promotion page can be revised between campaigns, so a term you remember from a previous claim may not apply to the current offer.",
  ],

  faq: [
    {
      question: "What does a wagering requirement of 35x actually mean?",
      answer:
        "It means your total qualifying bets must add up to thirty-five times the stated base amount before bonus-derived winnings become withdrawable. If the base is a $20 bonus, you need $700 in qualifying turnover. Turnover counts total bets placed, not net losses, so wins and losses both contribute to progress as long as the wagers are on eligible games.",
    },
    {
      question: "Does every game count the same toward the wagering requirement?",
      answer:
        "No. Each promotion publishes a game weighting table, and contribution percentages vary widely—slots are commonly weighted near 100%, while live-dealer tables, video poker, and some table games are often weighted much lower or excluded entirely. Always check the weighting for the specific games you play rather than assuming a uniform rate across the whole catalog.",
    },
    {
      question: "What is the difference between a claim deadline and a completion deadline?",
      answer:
        "The claim deadline is how long you have to opt in or make a qualifying deposit after becoming eligible. The completion deadline is how long you have, after the bonus is credited, to finish the wagering requirement. These are separate clocks—meeting one does not guarantee you have met the other, so check both explicitly on the terms page.",
    },
    {
      question: "Can I withdraw my deposit while a bonus is still active?",
      answer:
        "Many operators restrict withdrawals of the underlying deposit while an associated bonus is active and unwagered, or treat an early withdrawal request as forfeiting the bonus and its progress. Review the specific promotion's terms for its withdrawal restrictions before requesting a payout mid-bonus.",
    },
    {
      question: "Do free spins winnings need to be wagered again?",
      answer:
        "Often yes. Promotions like Orchid Free Spins frequently attach a separate wagering requirement to the winnings generated from the spins themselves, distinct from any wagering requirement on a deposit bonus. Check whether that secondary requirement applies to the same game or a broader eligible list before assuming the spin winnings are immediately withdrawable.",
    },
    {
      question: "Is it better to skip a promotion if I mostly play live-casino tables?",
      answer:
        "If a promotion's weighting table credits live-casino wagers at a low percentage or zero, opting in can make the effective turnover target far higher than the headline multiplier suggests, or make the bonus practically unclearable through your normal play. In that case, declining the promotion and playing on your regular balance is often the more sensible choice.",
    },
    {
      question: "What happens if I place a bet above the maximum stake cap?",
      answer:
        "Terms for most promotions specify a maximum bet size permitted while a bonus is active. Placing a larger bet can void wagering progress or the bonus itself under many operators' rules. If you plan to bet at higher stakes, confirm the cap first or consider declining the bonus so your stake sizing is not constrained.",
    },
    {
      question: "Can I have more than one promotion active at the same time?",
      answer:
        "This depends on the specific terms of each offer—some promotions explicitly exclude combining with other active bonuses, while others are designed to stack. Check the eligibility section of each promotion for language about concurrent offers before assuming two bonuses can run together on the same account.",
    },
    {
      question: "What is the difference between a sticky bonus and a non-sticky bonus?",
      answer:
        "A sticky bonus stays in a separate bonus balance and is removed once wagering is complete—only the winnings it generates become withdrawable. A non-sticky, or cash-convertible, bonus blends into your main balance for wagering purposes, so the whole balance moves together as you play. The terms page states which structure a given promotion uses; the two behave differently enough that it is worth confirming before you start tracking progress.",
    },
  ],

  summary:
    "Reading promotion terms well comes down to answering four questions in order for every offer: who is eligible, what is the wagering requirement and its base, when do the claim and completion windows close, and how does game weighting treat the titles you actually play. Welcome Boost, Weekend Reload, and Orchid Free Spins illustrate three different promotion structures—deposit-matched, recurring reload, and spins-based—but the same four-question process applies to all of them and to any future promotion you encounter. Convert multipliers into real turnover figures, check weighting against your normal game mix, and treat the live terms page as the final word over any summary, including this one.",

  responsibleNote:
    "Treat wagering requirements as real obligations you are choosing to take on, not as a formality to skim past. If a promotion's turnover target does not fit your normal bankroll or session length, it is reasonable to decline it and continue playing on your regular balance instead.",

  relatedProviderSlugs: [],
  relatedGameSlugs: [],
  relatedGuideSlugs: ["payments-checklist"],
  relatedPromotionSlugs: [
    "300-slots-welcome-bonus-680048",
    "250-sportsbook-welcome-bonus-680055",
    "100-live-casino-welcome-bonus-680038",
    "10-slots-daily-unlimited-deposit-bonus-680302",
  ],
  relatedNewsSlugs: ["slots-welcome-bonus-300-official-announcement"],

  ctaPrimaryLabel: "Browse current promotions",
  ctaPrimaryHref: ROUTES.promotions,
  ctaSecondaryLabel: "More promotions guides",
  ctaSecondaryHref: getGuideCategoryHref("promotions"),
};

export const howToReadPromotionTermsLongformBlocks = buildGuideLongformBlocks(
  howToReadPromotionTermsLongformSections,
);
