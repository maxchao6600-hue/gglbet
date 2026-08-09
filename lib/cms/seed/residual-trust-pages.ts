import { ROUTES, getGuideCategoryHref } from "@/constants/routes";
import type { TrustPageDocument } from "@/types/eeat";
import { createTrustPage } from "./support/factory";

/** Non-Support-hub trust pages retained from legacy eeat seed. */
export const residualTrustPages: readonly TrustPageDocument[] = [
createTrustPage({
    slug: "privacy-policy",
    title: "Privacy Policy",
    metaTitle: "GGLBET Privacy Policy | Data We Collect and Why",
    metaDescription:
      "What personal data GGLBET collects, the legal reasons we process it, how long it is retained, who it is shared with, and the rights you can exercise over it.",
    heroTitle: "GGLBET privacy policy",
    heroDescription:
      "A plain-language GGLBET summary of what we collect, why we are allowed to, and how you exercise your rights.",
    faqHeading: "GGLBET Privacy FAQ",
    faqSubheading: "Answers about GGLBET data practices",
    faqBody:
      "These GGLBET Privacy FAQ answers explain how GGLBET handles personal data for account, payment, and safer-play journeys.",
    lastUpdated: "2026-06-30",
    authorSlug: "gglbet-trust-desk",
    reviewerSlug: "gglbet-editorial",
    blocks: [
      {
        type: "tldr",
        id: "tldr",
        text: "We collect the account, identity, payment, and usage data needed to run a regulated gaming service. Verification data is kept because law requires it. You can request access, correction, deletion, or a copy of your data at any time.",
      },
      {
        type: "definition",
        id: "definition",
        term: "Personal data",
        text: "Personal data is any information that identifies you directly or in combination with other data — including your name, contact details, identity documents, payment records, device identifiers, and play history.",
      },
      {
        type: "heading",
        id: "what-we-collect",
        text: "What we collect",
        anchor: "what-we-collect",
      },
      {
        type: "comparison",
        id: "collection-table",
        caption: "Categories, purpose, and legal basis",
        headers: ["Category", "Why we process it", "Basis"],
        rows: [
          ["Account details", "Create and secure your account", "Contract"],
          ["Identity documents", "Age and identity verification", "Legal obligation"],
          ["Payment records", "Process transactions, prevent fraud", "Contract and legal obligation"],
          ["Play history", "Provide the service, detect harm", "Contract and legitimate interest"],
          ["Device and usage data", "Security, performance, analytics", "Legitimate interest or consent"],
          ["Marketing preferences", "Send offers you opted into", "Consent"],
        ],
      },
      {
        type: "heading",
        id: "retention",
        text: "How long we keep it",
        anchor: "retention",
      },
      {
        type: "paragraph",
        id: "retention-body",
        text: "Account and transaction records are retained for the period regulation requires after an account closes, because gaming and anti-money-laundering rules mandate it. Marketing preferences are deleted when consent is withdrawn. Data that has no legal retention requirement is removed once its purpose has ended.",
      },
      {
        type: "heading",
        id: "your-rights",
        text: "Your rights",
        anchor: "your-rights",
      },
      {
        type: "checklist",
        id: "rights-list",
        title: "Rights you can exercise",
        items: [
          "Access — request a copy of the personal data we hold about you.",
          "Correction — have inaccurate details fixed.",
          "Deletion — request removal where no legal retention duty applies.",
          "Portability — receive your data in a machine-readable format.",
          "Objection — object to processing based on legitimate interest.",
          "Withdraw consent — stop marketing at any time without affecting your account.",
        ],
      },
      {
        type: "callout",
        id: "sharing",
        variant: "info",
        title: "Who we share data with",
        body: "Data is shared with payment processors, verification providers, game studios where a session requires it, and regulators when legally compelled. We do not sell personal data.",
      },
      {
        type: "steps",
        id: "request-flow",
        title: "Making a data request",
        steps: [
          {
            title: "Send the request",
            text: "Contact us from the email address registered to your account and state which right you are exercising.",
          },
          {
            title: "Verify your identity",
            text: "We confirm the request comes from you before releasing or changing anything, to protect against impersonation.",
          },
          {
            title: "Receive a response",
            text: "We respond within the statutory window and explain any data we must retain and the legal reason for keeping it.",
          },
        ],
      },
    ],
    faq: [
      {
        question: "Does GGLBET sell personal data?",
        answer:
          "No. Data is shared only with processors that deliver the service, such as payment and verification providers, and with regulators where legally required.",
      },
      {
        question: "Can I ask GGLBET to delete my data?",
        answer:
          "Yes, and GGLBET deletes what we are able to. Verification and transaction records subject to a legal retention period must be kept until that period expires; GGLBET will tell you which records those are.",
      },
      {
        question: "Why does GGLBET need my identity documents?",
        answer:
          "Regulated operators must verify age and identity before processing withdrawals. This is a legal obligation on GGLBET, not an optional step, and documents are stored under restricted access.",
      },
      {
        question: "How do I stop GGLBET marketing emails?",
        answer:
          "Withdraw consent in your GGLBET account settings or use the unsubscribe link in any message. Withdrawing marketing consent does not affect service messages about your GGLBET account.",
      },
      {
        question: "Are cookies used on GGLBET?",
        answer:
          "Yes. Essential cookies keep you signed in and secure the GGLBET session. Analytics and marketing cookies are used only where you have consented, and consent can be changed at any time.",
      },
    ],
    relatedPaths: [
      { label: "GGLBET Terms", href: ROUTES.terms },
      { label: "Contact GGLBET", href: ROUTES.contact },
      { label: "GGLBET Responsible Gaming", href: ROUTES.responsibleGaming },
      { label: "GGLBET Editorial Policy", href: ROUTES.editorialPolicy },
    ],
  }),
createTrustPage({
    slug: "terms",
    title: "Terms and Conditions",
    metaTitle: "GGLBET Terms and Conditions | Account and Play Rules",
    metaDescription:
      "The rules that govern a GGLBET account: eligibility, one account per person, bonus abuse, dormancy, dispute handling, and the circumstances in which a bet can be voided.",
    heroTitle: "GGLBET terms and conditions",
    heroDescription:
      "The GGLBET account rules explained in the order they actually matter, with the clauses that most often cause disputes highlighted.",
    faqHeading: "GGLBET Terms FAQ",
    faqSubheading: "Answers about GGLBET account rules",
    faqBody:
      "These GGLBET Terms FAQ answers cover account limits, bonuses, dormancy, and dispute paths on GGLBET.",
    lastUpdated: "2026-06-30",
    authorSlug: "gglbet-trust-desk",
    reviewerSlug: "gglbet-editorial",
    blocks: [
      {
        type: "tldr",
        id: "tldr",
        text: "One account per person, legal age required, accurate details mandatory, and bonus terms binding once you opt in. Bets can be voided for obvious pricing errors or technical failures, and disputes follow a documented escalation path.",
      },
      {
        type: "definition",
        id: "definition",
        term: "Void bet",
        text: "A void bet is a wager cancelled and refunded because it could not stand — for example a game malfunction, an obvious pricing error, or an event that did not take place under the terms offered.",
      },
      {
        type: "heading",
        id: "eligibility",
        text: "Eligibility and account rules",
        anchor: "eligibility",
      },
      {
        type: "checklist",
        id: "eligibility-list",
        title: "You must be able to confirm all of the following",
        items: [
          "You are of legal gambling age in your jurisdiction.",
          "Online gambling is lawful where you are located.",
          "You are opening the account for yourself, not on behalf of another person.",
          "The details you register are accurate and kept current.",
          "You hold only one GGLBET account.",
          "You are not self-excluded here or through a national scheme.",
        ],
      },
      {
        type: "heading",
        id: "bonus-rules",
        text: "Bonus rules",
        anchor: "bonus-rules",
      },
      {
        type: "paragraph",
        id: "bonus-body",
        text: "Opting into a promotion makes its terms binding on the balance affected. Exceeding the maximum stake while wagering, using patterns designed to lock in value with no real risk, or coordinating accounts to claim the same offer are all treated as bonus abuse and can forfeit the bonus and its winnings — deposited funds remain yours.",
      },
      {
        type: "comparison",
        id: "consequences",
        caption: "What happens in common breach scenarios",
        headers: ["Situation", "Outcome"],
        rows: [
          ["Duplicate account detected", "Secondary accounts closed, bonuses removed"],
          ["Max bet exceeded during wagering", "Bonus and bonus winnings forfeited"],
          ["Verification never completed", "Withdrawals held until documents supplied"],
          ["Account dormant for the stated period", "Dormancy handling applies to the balance"],
          ["Obvious pricing or display error", "Affected bets voided and stakes returned"],
        ],
      },
      {
        type: "heading",
        id: "disputes",
        text: "Disputes",
        anchor: "disputes",
      },
      {
        type: "steps",
        id: "dispute-steps",
        title: "How to escalate a disagreement",
        steps: [
          {
            title: "Raise it with support",
            text: "Provide the date, amount, and any reference numbers so the transaction can be traced.",
          },
          {
            title: "Request a formal review",
            text: "If the answer does not resolve it, ask for escalation and you will receive a written position.",
          },
          {
            title: "Go to independent resolution",
            text: "Unresolved disputes can be referred to the applicable alternative dispute resolution body or regulator.",
          },
        ],
      },
      {
        type: "callout",
        id: "changes",
        variant: "info",
        title: "Changes to these terms",
        body: "Terms change when products, payment rails, or regulations change. Material changes are announced before they take effect and the last-updated date on this page always reflects the current version.",
      },
    ],
    faq: [
      {
        question: "Can I have more than one GGLBET account?",
        answer:
          "No. One GGLBET account per person, household, and device is permitted. Duplicate accounts are closed and any bonuses claimed through them are removed.",
      },
      {
        question: "What counts as GGLBET bonus abuse?",
        answer:
          "Exceeding the maximum stake during wagering, low-risk betting patterns designed to convert bonus funds without genuine exposure, and coordinating multiple accounts to claim the same GGLBET offer.",
      },
      {
        question: "When can a GGLBET bet be voided?",
        answer:
          "Where a game malfunctions, an obvious pricing or display error occurred, or the event did not take place under the terms offered. Voided stakes are returned under the GGLBET terms.",
      },
      {
        question: "What happens to a dormant GGLBET account?",
        answer:
          "After the dormancy period stated in the full GGLBET terms, the account is flagged and the balance is handled according to the applicable rules. GGLBET contacts the registered email before that point.",
      },
      {
        question: "How do I escalate a dispute on GGLBET?",
        answer:
          "Start with GGLBET support, request a formal written position if that does not resolve it, and then refer the matter to the applicable alternative dispute resolution body or regulator.",
      },
    ],
    relatedPaths: [
      { label: "GGLBET Privacy Policy", href: ROUTES.privacyPolicy },
      { label: "GGLBET Payment", href: ROUTES.payment },
      { label: "GGLBET Responsible Gaming", href: ROUTES.responsibleGaming },
      { label: "Contact GGLBET", href: ROUTES.contact },
    ],
  }),
createTrustPage({
    slug: "content-quality-policy",
    title: "Content Quality Policy",
    metaTitle: "GGLBET Content Quality Policy | Standards We Publish Against",
    metaDescription:
      "The quality bar every GGLBET page must clear before publication: accuracy, clarity, structure, accessibility, and the specific checks that block a page from going live.",
    heroTitle: "GGLBET content quality policy",
    heroDescription:
      "The checklist a page must pass before it publishes, and the conditions that stop it shipping at all.",
    lastUpdated: "2026-07-20",
    authorSlug: "gglbet-trust-desk",
    reviewerSlug: "gglbet-editorial",
    blocks: [
      {
        type: "tldr",
        id: "tldr",
        text: "A page publishes only if it answers one clear question, opens with a direct answer, defines its key term, sources every factual claim, and passes accessibility and responsible-gaming checks. Any unverified money or licensing claim blocks publication outright.",
      },
      {
        type: "definition",
        id: "definition",
        term: "Content quality bar",
        text: "The quality bar is the fixed set of checks a page must pass before publication. It is deliberately mechanical, so that quality does not depend on who happens to review a draft on a given day.",
      },
      {
        type: "heading",
        id: "accuracy",
        text: "Accuracy",
        anchor: "accuracy",
      },
      {
        type: "checklist",
        id: "accuracy-list",
        title: "Accuracy checks",
        items: [
          "Every numeric claim traces to a primary source or the live product.",
          "Bonus terms match the promotion record exactly, including weighting and expiry.",
          "Licensing and regulatory statements are verified, never paraphrased from a competitor.",
          "Time-sensitive figures carry the date they were captured.",
          "Uncertain claims are removed rather than softened with vague language.",
        ],
      },
      {
        type: "heading",
        id: "clarity",
        text: "Clarity and structure",
        anchor: "clarity",
      },
      {
        type: "checklist",
        id: "clarity-list",
        title: "Structure checks",
        items: [
          "One page answers one question; overlapping pages are merged, not duplicated.",
          "The answer appears in the first paragraph, before any context.",
          "The key term is defined once, plainly, near the top.",
          "Headings describe content rather than tease it.",
          "Steps are numbered, comparisons are tabulated, and requirements are listed.",
          "Jargon is either defined on first use or replaced.",
        ],
      },
      {
        type: "heading",
        id: "accessibility",
        text: "Accessibility and presentation",
        anchor: "accessibility",
      },
      {
        type: "comparison",
        id: "accessibility-table",
        caption: "Presentation requirements",
        headers: ["Requirement", "Standard"],
        rows: [
          ["Heading order", "No skipped levels, one H1 per page"],
          ["Link text", "Describes the destination without surrounding context"],
          ["Images", "Meaningful alternative text or marked decorative"],
          ["Tables", "Header row present, no layout-only tables"],
          ["Contrast", "Meets WCAG AA for body and interface text"],
        ],
      },
      {
        type: "heading",
        id: "blockers",
        text: "What blocks publication",
        anchor: "blockers",
      },
      {
        type: "callout",
        id: "blockers-callout",
        variant: "warning",
        title: "Hard stops",
        body: "An unverified monetary or licensing claim, a missing named owner, a promotion without full terms, or copy that presents gambling as income all block publication. None of these can be waived for a deadline.",
      },
      {
        type: "steps",
        id: "qa-steps",
        title: "The pre-publication pass",
        steps: [
          {
            title: "Self-check against the bar",
            text: "The writer runs the accuracy, clarity, and accessibility checklists before handing over.",
          },
          {
            title: "Independent review",
            text: "A second person re-checks the factual claims against sources without relying on the writer's summary.",
          },
          {
            title: "Responsible-gaming read",
            text: "The page is read specifically for tone: no urgency pressure, no loss-chasing framing, safer-play route visible.",
          },
          {
            title: "Ship and record",
            text: "The page publishes with owner, date, and its next scheduled review.",
          },
        ],
      },
    ],
    faq: [
      {
        question: "What stops a page from being published?",
        answer:
          "An unverified money or licensing claim, no named owner, a promotion described without its full terms, or copy that frames gambling as a way to make money.",
      },
      {
        question: "How is readability assessed?",
        answer:
          "By structure rather than a score: one question per page, the answer first, a plain definition of the key term, descriptive headings, and steps or tables wherever they beat prose.",
      },
      {
        question: "Do you publish thin pages to cover keywords?",
        answer:
          "No. If a topic does not justify a page, it becomes a section of an existing one. Overlapping pages are merged rather than maintained in parallel.",
      },
      {
        question: "How does accessibility factor into quality?",
        answer:
          "It is part of the same bar: heading order, descriptive link text, alternative text on meaningful images, real table headers, and AA contrast are all pre-publication requirements.",
      },
    ],
    relatedPaths: [
      { label: "Editorial policy", href: ROUTES.editorialPolicy },
      { label: "Content update policy", href: ROUTES.contentUpdates },
      { label: "About our team", href: ROUTES.team },
      { label: "FAQ", href: ROUTES.faq },
    ],
  }),
createTrustPage({
    slug: "content-update-policy",
    title: "Content Update Policy",
    metaTitle: "GGLBET Content Update Policy | Review Cadence and Corrections",
    metaDescription:
      "How often GGLBET re-checks each type of page, what triggers an unscheduled update, how corrections are recorded, and what the last-updated date on a page actually means.",
    heroTitle: "GGLBET content update policy",
    heroDescription:
      "What our dates mean, how often each page type is re-checked, and what forces an immediate update.",
    lastUpdated: "2026-07-24",
    authorSlug: "gglbet-trust-desk",
    reviewerSlug: "gglbet-editorial",
    blocks: [
      {
        type: "tldr",
        id: "tldr",
        text: "Payment, bonus, and policy pages are re-checked monthly; game, provider, and guide pages quarterly; news is dated at publication. The last-updated date changes only when the content changed — never to make a page look fresh.",
      },
      {
        type: "definition",
        id: "definition",
        term: "Last updated",
        text: "The last-updated date is the date a substantive change to the page's content was published. Formatting, styling, and infrastructure changes do not move it.",
      },
      {
        type: "heading",
        id: "cadence",
        text: "Review cadence",
        anchor: "cadence",
      },
      {
        type: "comparison",
        id: "cadence-table",
        caption: "How often each content type is re-checked",
        headers: ["Content type", "Scheduled review", "Owner"],
        rows: [
          ["Payments and cashier", "Monthly", "Trust desk"],
          ["Promotions and bonus terms", "Monthly, plus at every change", "Trust desk"],
          ["Policies and legal pages", "Monthly", "Trust desk"],
          ["Games and providers", "Quarterly", "Editorial"],
          ["Guides and education", "Quarterly", "Editorial"],
          ["News", "Dated at publication, corrected as needed", "Newsroom"],
        ],
      },
      {
        type: "heading",
        id: "triggers",
        text: "Unscheduled update triggers",
        anchor: "triggers",
      },
      {
        type: "checklist",
        id: "trigger-list",
        title: "Any of these forces an immediate review",
        items: [
          "A payment method, limit, or processing time changes.",
          "Bonus terms, weighting, or expiry windows change.",
          "A regulatory or licensing requirement changes.",
          "A provider withdraws, renames, or re-rates a game.",
          "A reader reports a factual error that is verified.",
          "A product flow described step-by-step no longer matches the live product.",
        ],
      },
      {
        type: "heading",
        id: "corrections",
        text: "Corrections and versioning",
        anchor: "corrections",
      },
      {
        type: "steps",
        id: "correction-steps",
        title: "How an update is processed",
        steps: [
          {
            title: "Verify the change",
            text: "The trust desk confirms the change against the primary source before anything is edited.",
          },
          {
            title: "Assess the blast radius",
            text: "One change often affects several pages; every page repeating the claim is identified and queued together.",
          },
          {
            title: "Edit and re-review",
            text: "The revised text goes through the same review as a new page, not a lighter one.",
          },
          {
            title: "Publish and re-date",
            text: "All affected pages ship together, with new last-updated dates and a note where the correction was material.",
          },
        ],
      },
      {
        type: "callout",
        id: "no-date-washing",
        variant: "warning",
        title: "We do not refresh dates cosmetically",
        body: "Changing a date without changing the content misleads readers and search engines about how current a page is. If the date moved, something in the content moved with it.",
      },
      {
        type: "heading",
        id: "archiving",
        text: "Retiring content",
        anchor: "archiving",
      },
      {
        type: "paragraph",
        id: "archiving-body",
        text: "When a product is discontinued, the page is either updated to describe the current state or retired and redirected to the closest still-accurate resource. Expired promotions are marked as expired rather than deleted, so players who followed an old link understand what happened instead of hitting a dead end.",
      },
    ],
    faq: [
      {
        question: "What does the last-updated date mean?",
        answer:
          "It is the date a substantive content change was published. Styling and infrastructure changes do not move it, so the date reflects the age of the information rather than the age of the deployment.",
      },
      {
        question: "How often are payment pages checked?",
        answer:
          "Monthly on a schedule, and immediately whenever a method, limit, fee, or processing time changes.",
      },
      {
        question: "What happens to expired promotions?",
        answer:
          "They are marked as expired rather than deleted, so anyone arriving from an old link sees what the offer was and where the current offers are.",
      },
      {
        question: "Do you update dates without changing content?",
        answer:
          "No. Refreshing a date cosmetically misrepresents how current a page is, so a date only moves when the content behind it moved.",
      },
    ],
    relatedPaths: [
      { label: "Editorial policy", href: ROUTES.editorialPolicy },
      { label: "Content quality policy", href: ROUTES.contentQuality },
      { label: "Platform news", href: ROUTES.news },
      { label: "About our team", href: ROUTES.team },
    ],
  }),
createTrustPage({
    slug: "vip",
    title: "VIP Programme",
    metaTitle: "GGLBET VIP Programme | Tiers, Benefits and Fair Terms",
    metaDescription:
      "How the GGLBET VIP programme works: how tiers are earned, what each level changes, how status is maintained, and the responsible-gaming safeguards built into it.",
    heroTitle: "GGLBET VIP programme",
    heroDescription:
      "How GGLBET VIP tiers are earned and what actually changes at each level — with the safeguards that apply regardless of status.",
    faqHeading: "GGLBET VIP FAQ",
    faqSubheading: "Answers about the GGLBET VIP programme",
    faqBody:
      "These GGLBET VIP FAQ answers explain joining, withdrawals, status changes, and bonus terms on GGLBET.",
    lastUpdated: "2026-07-12",
    authorSlug: "gglbet-editorial",
    reviewerSlug: "gglbet-trust-desk",
    blocks: [
      {
        type: "tldr",
        id: "tldr",
        text: "GGLBET VIP status is earned through qualifying play over a review period and improves withdrawal priority, support access, and offer quality. It never removes verification requirements, wagering terms, or responsible-gaming limits.",
      },
      {
        type: "definition",
        id: "definition",
        term: "Qualifying play",
        text: "Qualifying play is the portion of your activity that counts toward VIP progression. Weightings differ by product, and bonus-funded stakes typically count differently to cash stakes.",
      },
      {
        type: "heading",
        id: "tiers",
        text: "How tiers work",
        anchor: "tiers",
      },
      {
        type: "comparison",
        id: "tier-table",
        caption: "What changes as you move up",
        headers: ["Level", "Focus", "Typical benefit"],
        rows: [
          ["Entry", "Getting oriented", "Standard support and offers"],
          ["Mid", "Consistent play", "Faster withdrawal review, better offer targeting"],
          ["Upper", "Established players", "Priority support queue, tailored offers"],
          ["Top", "Invitation only", "Dedicated contact and bespoke terms"],
        ],
      },
      {
        type: "heading",
        id: "maintaining",
        text: "Earning and keeping status",
        anchor: "maintaining",
      },
      {
        type: "steps",
        id: "tier-steps",
        title: "The progression cycle",
        steps: [
          {
            title: "Play qualifies automatically",
            text: "Eligible activity is tracked on your account with no opt-in step required.",
          },
          {
            title: "Status is assessed per review period",
            text: "Progression is measured over a defined window rather than a single session.",
          },
          {
            title: "Benefits apply from the next period",
            text: "Once a level is reached, its benefits are attached to the account for the following period.",
          },
          {
            title: "Status is re-checked, not permanent",
            text: "Sustained inactivity reduces status. Levels are maintained by continued eligible play, never by deposit alone.",
          },
        ],
      },
      {
        type: "checklist",
        id: "vip-truths",
        title: "What VIP status does not do",
        items: [
          "It does not waive identity verification or anti-money-laundering checks.",
          "It does not remove wagering requirements on bonus funds.",
          "It does not override deposit limits, cool-off, or self-exclusion.",
          "It does not change the return-to-player percentage of any game.",
          "It does not guarantee a specific offer in any given period.",
        ],
      },
      {
        type: "callout",
        id: "vip-safety",
        variant: "warning",
        title: "Status is never a reason to play more",
        body: "Chasing a tier is a poor reason to increase spend. Your deposit and loss limits apply at every level, and the responsible-gaming team can tighten them for you at any time.",
      },
    ],
    faq: [
      {
        question: "How do I join the GGLBET VIP programme?",
        answer:
          "Eligible play is tracked automatically on any verified GGLBET account. There is no separate application for the standard tiers; the highest level is invitation only.",
      },
      {
        question: "Does GGLBET VIP status speed up withdrawals?",
        answer:
          "It can shorten the review queue, but it never removes the review itself. Verification and anti-money-laundering checks apply identically at every GGLBET VIP level.",
      },
      {
        question: "Can I lose GGLBET VIP status?",
        answer:
          "Yes. GGLBET VIP status is re-assessed each review period and sustained inactivity moves an account down. Levels reflect recent play rather than lifetime history.",
      },
      {
        question: "Do GGLBET VIP bonuses still carry wagering requirements?",
        answer:
          "Yes. Terms may be more favourable at higher GGLBET VIP levels, but every bonus has published terms and those terms are binding once you opt in.",
      },
    ],
    relatedPaths: [
      { label: "GGLBET Promotions", href: ROUTES.promotions },
      { label: "GGLBET Referral", href: ROUTES.referral },
      { label: "GGLBET Payment", href: ROUTES.payment },
      { label: "GGLBET Responsible Gaming", href: ROUTES.responsibleGaming },
      { label: "GGLBET Promotion Guides", href: getGuideCategoryHref("promotions") },
    ],
  }),
createTrustPage({
    slug: "referral",
    title: "Referral Programme",
    metaTitle: "GGLBET Referral Programme | How Referrals Work",
    metaDescription:
      "How the GGLBET referral programme works: who can refer, when a referral qualifies, how rewards are credited, and the rules that disqualify a referral.",
    heroTitle: "GGLBET referral programme",
    heroDescription:
      "Invite people who genuinely want to play on GGLBET, understand when a referral qualifies, and know exactly what disqualifies one.",
    faqHeading: "GGLBET Referral FAQ",
    faqSubheading: "Answers about the GGLBET referral programme",
    faqBody:
      "These GGLBET Referral FAQ answers cover rewards, self-referrals, limits, and invited-player benefits on GGLBET.",
    lastUpdated: "2026-07-12",
    authorSlug: "gglbet-editorial",
    reviewerSlug: "gglbet-trust-desk",
    blocks: [
      {
        type: "tldr",
        id: "tldr",
        text: "Share your personal referral link, and when the person you invited registers through it, verifies their account, and completes the qualifying activity, a reward is credited. Self-referrals and duplicate accounts do not qualify.",
      },
      {
        type: "definition",
        id: "definition",
        term: "Qualifying referral",
        text: "A qualifying referral is a new player who registered through your link, is a distinct person with their own verified identity and payment method, and has completed the activity threshold stated in the programme terms.",
      },
      {
        type: "heading",
        id: "how-it-works",
        text: "How it works",
        anchor: "how-it-works",
      },
      {
        type: "steps",
        id: "referral-steps",
        title: "Four steps from invite to reward",
        steps: [
          {
            title: "Get your link",
            text: "Your referral link is generated on a verified account and is unique to you.",
          },
          {
            title: "Share it with people who want to play",
            text: "Send it directly. Do not post it as spam, buy traffic to it, or bid on brand terms to promote it.",
          },
          {
            title: "They register and verify",
            text: "The invited player must sign up through your link and complete their own identity verification.",
          },
          {
            title: "The reward is credited",
            text: "Once the qualifying threshold is met, the reward is credited under the terms stated in the programme.",
          },
        ],
      },
      {
        type: "heading",
        id: "rules",
        text: "Rules that disqualify a referral",
        anchor: "rules",
      },
      {
        type: "checklist",
        id: "disqualifiers",
        title: "These will void a referral",
        items: [
          "Referring yourself through a second account or a shared device.",
          "Referring an account that shares your payment method or address details.",
          "Spamming the link, buying traffic to it, or bidding on brand search terms.",
          "Referring an existing GGLBET account holder as if they were new.",
          "Referring anyone below the legal gambling age or in a restricted region.",
        ],
      },
      {
        type: "comparison",
        id: "reward-table",
        caption: "When each side benefits",
        headers: ["Stage", "Referrer", "Invited player"],
        rows: [
          ["Registration through link", "Tracked, not yet credited", "Standard welcome eligibility"],
          ["Verification complete", "Still pending", "Full account access"],
          ["Qualifying activity met", "Reward credited", "Reward credited if stated in terms"],
        ],
      },
      {
        type: "callout",
        id: "referral-ethics",
        variant: "warning",
        title: "Do not refer someone who should not be playing",
        body: "Never send a referral link to a person who is self-excluded, underage, or has told you they have a gambling problem. Referral rewards are not worth the harm, and such referrals are void in any case.",
      },
    ],
    faq: [
      {
        question: "When is a GGLBET referral reward credited?",
        answer:
          "After the invited player registers through your GGLBET link, completes identity verification, and meets the qualifying activity threshold stated in the GGLBET programme terms.",
      },
      {
        question: "Can I refer myself to GGLBET with a second account?",
        answer:
          "No. Only one GGLBET account per person is permitted, and self-referrals through duplicate accounts or shared devices are void along with any reward.",
      },
      {
        question: "Is there a limit on how many people I can refer to GGLBET?",
        answer:
          "The GGLBET programme terms state any cap on rewards per period. Genuine referrals are welcome; bulk or purchased traffic is not and will be disqualified.",
      },
      {
        question: "Does the person I invite to GGLBET get anything?",
        answer:
          "Where the GGLBET programme terms provide a reward for the invited player, it is stated in those terms and credited once their own qualifying conditions are met.",
      },
    ],
    relatedPaths: [
      { label: "GGLBET VIP", href: ROUTES.vip },
      { label: "GGLBET Promotions", href: ROUTES.promotions },
      { label: "GGLBET Terms", href: ROUTES.terms },
      { label: "GGLBET Responsible Gaming", href: ROUTES.responsibleGaming },
    ],
  }),
] as const;
