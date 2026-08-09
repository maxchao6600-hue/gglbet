import {
  buildGuideLongformBlocks,
  type GuideLongformSections,
} from "@/lib/cms/seed/content/guides/longform";
import { ROUTES, getGuideCategoryHref } from "@/constants/routes";

export const accountSecurityBasicsLongformSections: GuideLongformSections = {
  title: "Account security basics",
  category: "security",
  difficulty: "beginner",

  tldr:
    "Most account takeovers do not involve sophisticated hacking—they involve a reused password from another breached site, a phishing link that looked close enough to the real thing, or a session left open on a shared device. This guide covers building a genuinely strong and unique password, keeping the devices you log in from clean, recognizing phishing attempts aimed at GGLBET players specifically, logging out properly on shared or public devices, and the exact steps to take within the first few minutes of noticing suspicious activity on your account.",

  intro: [
    "Account security tends to get treated as an afterthought—something to configure once during signup and never look at again. That approach works fine right up until it does not, and the moment it fails is rarely dramatic. It usually looks like a login notification you did not trigger, a password that suddenly does not work, or a small unfamiliar transaction in your account history. None of these require a sophisticated attacker; the overwhelming majority of account compromises trace back to a handful of ordinary, preventable habits rather than anything exotic.",
    "This guide focuses specifically on the basics that matter for a GGLBET account: a password strong and unique enough that a breach at an unrelated website does not put your gambling account at risk too, device habits that keep your session out of reach of anyone else who uses the same computer or phone, the ability to recognize phishing attempts that specifically target players by imitating GGLBET's login page or promotions, the habit of actually logging out on shared devices instead of just closing a tab, and a clear, calm sequence of steps to follow if something looks wrong.",
    "None of this requires technical expertise or special software beyond what you likely already use. A password manager, two-factor authentication if GGLBET offers it on your account tier, and a few minutes spent learning what a real GGLBET email or login page looks like will cover the vast majority of realistic risk. The goal here is not paranoia—it is closing the small number of doors that account takeovers actually walk through.",
    "This is also a guide worth revisiting periodically rather than reading once. Phishing techniques evolve, browsers change how they display security indicators, and habits that felt automatic when you first set up your account can quietly slip—a saved password on a friend's laptop, a browser extension you installed without checking its permissions, an old recovery email address you no longer check. Treat the checklist and review cadence in this guide the same way you would treat any other periodic maintenance task.",
    "By the end of this guide you will have a password built the right way (or confirmation that your current one already qualifies), know exactly what to check before entering credentials on any page claiming to be GGLBET, understand why logging out matters even on your own devices, and have a specific, ordered list of actions to take the moment you suspect your account has been accessed by someone else.",
  ],

  playerFitLead:
    "This guide is written for any GGLBET player, but it is especially relevant in a few common situations.",
  playerFit: [
    "You use the same password, or a close variation of it, across more than one website",
    "You log into GGLBET from a shared family computer, a work device, or a public or borrowed device occasionally",
    "You have clicked a link in a text message or email claiming to be from GGLBET without checking it carefully first",
    "You are not sure whether your GGLBET account has two-factor authentication enabled or how to turn it on",
    "You want a clear, memorized action plan in case you ever see a login or transaction you do not recognize",
    "You are setting up a new account and want to configure security correctly from the start rather than fixing it later",
  ],

  backgroundLead:
    "Before working through the checklist, it helps to understand the three main ways gambling accounts actually get compromised, because the defenses in this guide map directly onto them.",
  background: [
    "The most common cause by a wide margin is credential reuse combined with an unrelated data breach. When a forum, retailer, or app you signed up for years ago gets breached, the leaked email-and-password combinations get compiled into large lists and tested automatically against other popular sites, including gambling platforms. If your GGLBET password matches or closely resembles a password you used anywhere else, a breach that had nothing to do with GGLBET can still expose your account. This is why a unique password for GGLBET specifically, not a strong-looking password shared across accounts, is the single highest-impact change most players can make.",
    "The second common cause is phishing: a message or fake page designed to look enough like GGLBET that you enter your real credentials into it. Effective phishing rarely looks obviously wrong—it copies the real logo, uses a domain name that differs by a single character or an extra word, and often creates urgency with claims like an expiring bonus, a flagged withdrawal, or a security alert that needs immediate action. The defense against phishing is not spotting bad design; it is developing a habit of checking the exact domain and never clicking through a login link from an email or text message when you can navigate to GGLBET directly instead.",
    "The third cause is physical or session-level exposure: a saved password on a device other people use, a browser left logged in on a public computer, or a phone left unlocked with the GGLBET app open. This category does not require any technical skill from whoever gains access—just proximity to a device where your session or saved credentials are already sitting available. Logging out explicitly, rather than just closing a browser tab, and avoiding saved-password prompts on shared devices closes most of this risk.",
    "Two-factor authentication, where GGLBET offers it, adds a second independent check beyond your password—typically a one-time code sent to your phone or generated by an authenticator app. Its value is specifically in defending against the first two causes above: even if your password leaks in an unrelated breach or you are tricked into typing it into a phishing page, a correctly configured second factor stops the login from completing without the additional code, which an attacker sitting on a leaked password list or a fake page almost never has access to.",
    "It is worth being clear about what these basics do not cover: they will not protect you from giving your credentials to someone you trust who then misuses them, and they will not undo a transaction you approved yourself under a false pretense, such as a scam claiming to be GGLBET support asking you to move funds. Account security habits reduce the number of ways someone else can get in without your knowledge or consent; they are not a substitute for skepticism toward unsolicited requests, which this guide also covers in the phishing section below.",
  ],

  stepsLead:
    "Work through these steps once to set your account up correctly, then use steps eight through ten as your response plan if something ever looks wrong.",
  steps: [
    {
      title: "Check whether your current password is reused",
      text: "Think honestly about whether your GGLBET password, or something close to it, is used on any other site. If the answer is yes, or you are not sure, treat that as reason enough to change it during this session rather than waiting. Reuse is the single biggest factor behind account takeovers that have nothing to do with GGLBET's own security.",
    },
    {
      title: "Build or generate a unique, long password",
      text: "Use a password manager to generate a long, random password for your GGLBET account specifically, or construct a passphrase of four or five unrelated words if you prefer something you can type from memory. Length matters more than complexity rules like forced symbols; a long passphrase is both easier to type accurately and harder to guess than a short password stuffed with substitutions.",
    },
    {
      title: "Store the password in a manager, not a note or browser autofill alone",
      text: "A dedicated password manager keeps your GGLBET credentials encrypted and separate from your browsing history, and most can also flag if a stored password appears in a known breach. If you rely on browser-saved passwords instead, make sure the browser profile itself is protected by a device passcode, since anyone with access to an unlocked device can otherwise view saved passwords directly.",
    },
    {
      title: "Turn on two-factor authentication if it is available on your account",
      text: "Open your GGLBET account security settings and enable two-factor authentication if it is offered. Prefer an authenticator app over SMS codes where both options exist, since SMS can be intercepted through number-porting scams in ways that an authenticator app cannot. Save any backup codes provided during setup somewhere separate from your phone.",
    },
    {
      title: "Learn what a real GGLBET login page and email look like",
      text: "Bookmark the official GGLBET login page directly in your browser rather than relying on search results or saved links, and take a moment to note the exact domain name. Real GGLBET emails will not ask you to enter your password by clicking an embedded link with urgent countdown language; when in doubt, open a new browser tab and navigate to the site manually instead of clicking through.",
    },
    {
      title: "Practice logging out properly on shared or public devices",
      text: "On any device you do not exclusively control—a family computer, a library terminal, a friend's phone—use the explicit log out option in your account menu before walking away, and decline any prompt to save your password on that device. Closing the browser tab or window alone does not always end an active session.",
    },
    {
      title: "Set a periodic security review reminder",
      text: "Every few months, check your GGLBET account's recent login history if the feature is available, confirm your recovery email and phone number are still current and accessible to you, and verify two-factor authentication is still active. This takes a few minutes and catches drift—an old recovery email, a device you forgot was still logged in—before it becomes a problem.",
    },
    {
      title: "Recognize the early signs of suspicious activity",
      text: "Watch for a login or password-reset email you did not request, a device or location in your login history you do not recognize, a balance that does not match your own recent activity, or being logged out of a session you did not end yourself. Any one of these is worth acting on immediately rather than waiting to see if it happens again.",
    },
    {
      title: "Change your password and revoke sessions immediately",
      text: "The moment you notice a warning sign, change your GGLBET password right away from a device you trust, and use the option to log out of all other active sessions if your account settings offer it. This cuts off access for anyone using a session or credential you no longer control, even before you have fully diagnosed how it happened.",
    },
    {
      title: "Contact GGLBET support and review recent transactions",
      text: "After securing your password and sessions, contact GGLBET support directly through the official site to report the suspicious activity and ask them to review your account's recent login and transaction history. Note down anything unfamiliar—dates, amounts, device types—since specific details make it easier for support to investigate and, if necessary, reverse unauthorized transactions.",
    },
  ],

  checklistLead:
    "Run through this list once to set your account up correctly, and again during each periodic review.",
  checklistItems: [
    "Your GGLBET password is unique and not reused, even in modified form, on any other website",
    "Your password is stored in a password manager or a browser profile protected by a device passcode",
    "Two-factor authentication is enabled if your account tier offers it, preferably through an authenticator app",
    "You have bookmarked the official GGLBET login page directly rather than relying on search results or emailed links",
    "Your recovery email and phone number on file are current and accessible only to you",
    "You know where to find recent login history in your account settings, if the feature is available",
    "You log out explicitly on any shared or public device rather than just closing the browser tab",
    "You have a written or memorized plan for what to do first if you ever see unfamiliar account activity",
  ],

  bestPracticesLead:
    "These habits keep the basics from quietly slipping over time, which is usually how security gaps actually form.",
  bestPractices: [
    "Use a password manager for every account, not just GGLBET, so reuse never becomes a shortcut under time pressure",
    "Treat any message creating urgency around your account—an expiring bonus, a locked balance, a security alert—as a reason to slow down, not speed up",
    "Navigate to GGLBET by typing the address or using a saved bookmark rather than clicking links in emails, texts, or search ads",
    "Keep your device's operating system and browser updated, since many phishing and session-hijacking techniques rely on known, patched vulnerabilities",
    "Avoid logging into GGLBET over unsecured public Wi-Fi without a trusted VPN, particularly on networks with no password",
    "Review connected devices or active sessions in your account settings periodically, not only when something feels wrong",
    "Never share your password, one-time codes, or account details with anyone claiming to be GGLBET support—legitimate support will not ask for them",
    "Use a distinct, current recovery email that you actually check, rather than an old address you rarely open",
  ],

  mistakes: [
    "Reusing a password from another site because it already meets that site's complexity requirements",
    "Clicking a login link directly from an email or text instead of navigating to GGLBET manually",
    "Saving a password on a shared or public device without a device passcode protecting that browser profile",
    "Assuming closing a browser tab ends a session the same way explicitly logging out does",
    "Ignoring a login or password-reset notification because it seemed like it might be a false alarm",
    "Waiting to see if suspicious activity happens again before changing a password or contacting support",
    "Giving out a one-time verification code over phone or chat to someone claiming to be GGLBET staff",
  ],

  comparisonLead:
    "Different security habits defend against different risks. This table maps each basic to the specific threat it is designed to stop.",
  comparisonHeaders: [
    "Habit",
    "Threat it defends against",
    "Effort to set up",
    "Ongoing effort",
  ],
  comparisonRows: [
    [
      "Unique password per site",
      "Credential leaks from unrelated site breaches",
      "Low, especially with a password manager",
      "Very low once stored",
    ],
    [
      "Two-factor authentication",
      "Login using a leaked or phished password alone",
      "A few minutes to enable",
      "One code per login",
    ],
    [
      "Checking domains before login",
      "Phishing pages imitating GGLBET",
      "None, just a habit to build",
      "A few seconds per login",
    ],
    [
      "Explicit logout on shared devices",
      "Session or credential exposure on devices you do not control",
      "None",
      "A few seconds per session",
    ],
  ],
  comparisonCaption:
    "No single habit covers every risk; combining a unique password, two-factor authentication, domain awareness, and proper logout closes the most common paths to account compromise.",

  tipsLead:
    "A handful of small habits make these basics easier to maintain without turning security into a chore.",
  tips: [
    "Let your password manager's built-in generator create your GGLBET password rather than inventing one yourself, since generated passwords avoid predictable patterns entirely",
    "Enable login notifications if GGLBET offers them, so you find out about a new device or location immediately rather than during a periodic review",
    "Hover over links in any email claiming to be from GGLBET before clicking, to check whether the underlying domain actually matches the official site",
    "Keep a small set of backup two-factor codes somewhere separate from your phone, in case your phone is lost or unavailable when you need to log in",
    "Use your browser's private or incognito mode as an extra precaution when logging in from a device you do not own",
    "Set a recurring reminder, such as every three months, to review login history and recovery details rather than relying on memory",
    "If a friend or family member needs to use your device, log out of GGLBET first rather than trusting them not to see your session",
    "Report phishing emails or messages to GGLBET support even if you did not click through, since it helps them warn other players",
  ],

  warnings: [
    "GGLBET support will never ask for your password or a one-time verification code through email, chat, or phone—treat any such request as a phishing attempt regardless of how official it looks.",
    "Do not wait to see if suspicious activity repeats before acting; change your password and contact support the first time you notice anything unfamiliar in your login history or balance.",
    "Avoid entering your GGLBET credentials on any device or network you do not trust, including public computers and open Wi-Fi without a VPN, even for a quick balance check.",
  ],

  faq: [
    {
      question: "What makes a password actually strong for a gambling account?",
      answer:
        "Length and uniqueness matter far more than complexity rules. A long passphrase of four or five unrelated words, used only for your GGLBET account and nowhere else, is both easier to remember or store and harder to guess or crack than a short password packed with forced symbols and numbers. The uniqueness part is non-negotiable: a strong password that is reused elsewhere is only as safe as the least secure site it is also used on.",
    },
    {
      question: "Should I enable two-factor authentication even if it adds an extra step to logging in?",
      answer:
        "Yes, if your GGLBET account tier offers it. The extra step—typically entering a short code from an authenticator app—takes a few seconds and specifically defends against the scenario where your password has already leaked or been phished, since an attacker with just the password still cannot complete the login without the second factor. The small inconvenience is worth the protection it adds.",
    },
    {
      question: "How do I tell a phishing email or page apart from a real GGLBET one?",
      answer:
        "Check the exact domain name character by character rather than trusting the logo or layout, which are easy to copy. Be suspicious of urgent language about expiring bonuses, locked accounts, or time-limited security actions, since creating urgency is a common pressure tactic. When in doubt, do not click through the message at all—open a new tab and navigate to GGLBET directly using a bookmark or by typing the address yourself.",
    },
    {
      question: "Is it actually necessary to log out on my own personal phone or computer?",
      answer:
        "It is lower priority than on a shared device, but still worth doing if your device is not protected by a strong lock screen, or if other people occasionally borrow it. On a personal device that only you use and that is protected by a passcode or biometric lock, staying logged in is a reasonable trade-off for convenience, provided the device itself is secured.",
    },
    {
      question: "What should I do first if I see a login I do not recognize?",
      answer:
        "Change your GGLBET password immediately from a device you trust, then use the option to log out of all other active sessions if it is available in your account settings. Do this before trying to fully investigate how the login happened—cutting off access comes first, diagnosis comes second. Then contact GGLBET support to report the activity and ask them to review your account history.",
    },
    {
      question: "Can someone access my account just from my email being part of a data breach?",
      answer:
        "Not directly, but it raises real risk if you reuse the same password that was exposed in that breach. Breached email-and-password combinations are commonly tested automatically against other popular sites, including gambling platforms. If you use a unique password for GGLBET, an unrelated breach involving your email address alone does not give an attacker anything usable to log into your account.",
    },
    {
      question: "Is it safe to log into GGLBET on public Wi-Fi?",
      answer:
        "It carries more risk than a private, password-protected network, particularly on open networks with no password at all. If you need to log in while using public Wi-Fi, use a trusted VPN if you have one, and avoid entering credentials on networks you have never used before, such as an unfamiliar café or airport hotspot with no encryption.",
    },
    {
      question: "What information will real GGLBET support actually ask me for?",
      answer:
        "Legitimate support may ask for account identifying details like your username, email on file, or specifics about a transaction to verify you are the account holder, but they will never ask for your password or a one-time verification code. If anyone contacting you—by phone, chat, or email—asks for either of those, treat it as a phishing attempt and stop the conversation.",
    },
  ],

  summary:
    "The habits that prevent the overwhelming majority of gambling account takeovers are ordinary and low-effort once set up: a unique, sufficiently long password stored in a password manager, two-factor authentication enabled wherever GGLBET offers it, a habit of checking the exact domain before entering credentials anywhere, and an explicit logout on any device you do not exclusively control. None of these require technical expertise, and together they close the three most common paths to compromise—credential reuse following an unrelated breach, phishing pages or messages designed to look official, and session or credential exposure on shared devices. Build a short periodic review into your routine to catch drift, such as an old recovery email or a device you forgot was still logged in, and memorize the response sequence for suspicious activity: change your password and revoke other sessions first, then contact GGLBET support to review your account history. Acting on the first sign of something unfamiliar, rather than waiting to see if it happens again, is consistently the difference between a minor scare and an actual loss.",

  responsibleNote:
    "Security habits protect access to your account, not your bankroll directly—pair them with the deposit and loss limits available on your GGLBET Responsible Gaming settings for complete protection.",

  relatedProviderSlugs: [],
  relatedGameSlugs: [],
  relatedGuideSlugs: ["payments-checklist", "troubleshooting-game-wont-load"],
  relatedPromotionSlugs: [],
  relatedNewsSlugs: ["gglbet-telegram-exclusive-rewards-official-announcement"],

  ctaPrimaryLabel: "Create a Secure GGLBET Account",
  ctaPrimaryHref: ROUTES.register,
  ctaSecondaryLabel: "Browse Security Guides",
  ctaSecondaryHref: getGuideCategoryHref("security"),
};

export const accountSecurityBasicsLongformBlocks = buildGuideLongformBlocks(
  accountSecurityBasicsLongformSections,
);
