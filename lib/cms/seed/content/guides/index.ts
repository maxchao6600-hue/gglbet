import {
  accountSecurityBasicsLongformBlocks,
  accountSecurityBasicsLongformSections,
} from "@/lib/cms/seed/content/guides/account-security-basics";
import {
  beginnerPathToLiveCasinoLongformBlocks,
  beginnerPathToLiveCasinoLongformSections,
} from "@/lib/cms/seed/content/guides/beginner-path-to-live-casino";
import {
  fishingGameSessionBasicsLongformBlocks,
  fishingGameSessionBasicsLongformSections,
} from "@/lib/cms/seed/content/guides/fishing-game-session-basics";
import {
  howToDownloadTheGglbetAppLongformBlocks,
  howToDownloadTheGglbetAppLongformSections,
} from "@/lib/cms/seed/content/guides/how-to-download-the-gglbet-app";
import {
  howToGetStartedOnGglbetLongformBlocks,
  howToGetStartedOnGglbetLongformSections,
} from "@/lib/cms/seed/content/guides/how-to-get-started-on-gglbet";
import {
  howToReadPromotionTermsLongformBlocks,
  howToReadPromotionTermsLongformSections,
} from "@/lib/cms/seed/content/guides/how-to-read-promotion-terms";
import {
  countWordsInGuideBlocks,
  type GuideLongformSections,
} from "@/lib/cms/seed/content/guides/longform";
import {
  paymentsChecklistLongformBlocks,
  paymentsChecklistLongformSections,
} from "@/lib/cms/seed/content/guides/payments-checklist";
import {
  responsibleGamingLimitsChecklistLongformBlocks,
  responsibleGamingLimitsChecklistLongformSections,
} from "@/lib/cms/seed/content/guides/responsible-gaming-limits-checklist";
import {
  slotFeaturesExplainedLongformBlocks,
  slotFeaturesExplainedLongformSections,
} from "@/lib/cms/seed/content/guides/slot-features-explained";
import {
  troubleshootingGameWontLoadLongformBlocks,
  troubleshootingGameWontLoadLongformSections,
} from "@/lib/cms/seed/content/guides/troubleshooting-game-wont-load";
import type { ContentBlock } from "@/types/content";

/**
 * CMS long-form guide articles keyed by guide slug.
 * Injected into Guide.content for Content Renderer + SEO.
 */
export const guideLongformBySlug: Readonly<
  Record<string, readonly ContentBlock[]>
> = {
  "how-to-get-started-on-gglbet": howToGetStartedOnGglbetLongformBlocks,
  "slot-features-explained": slotFeaturesExplainedLongformBlocks,
  "beginner-path-to-live-casino": beginnerPathToLiveCasinoLongformBlocks,
  "payments-checklist": paymentsChecklistLongformBlocks,
  "responsible-gaming-limits-checklist":
    responsibleGamingLimitsChecklistLongformBlocks,
  "account-security-basics": accountSecurityBasicsLongformBlocks,
  "how-to-download-the-gglbet-app": howToDownloadTheGglbetAppLongformBlocks,
  "troubleshooting-game-wont-load": troubleshootingGameWontLoadLongformBlocks,
  "how-to-read-promotion-terms": howToReadPromotionTermsLongformBlocks,
  "fishing-game-session-basics": fishingGameSessionBasicsLongformBlocks,
};

export const guideLongformSectionsBySlug: Readonly<
  Record<string, GuideLongformSections>
> = {
  "how-to-get-started-on-gglbet": howToGetStartedOnGglbetLongformSections,
  "slot-features-explained": slotFeaturesExplainedLongformSections,
  "beginner-path-to-live-casino": beginnerPathToLiveCasinoLongformSections,
  "payments-checklist": paymentsChecklistLongformSections,
  "responsible-gaming-limits-checklist":
    responsibleGamingLimitsChecklistLongformSections,
  "account-security-basics": accountSecurityBasicsLongformSections,
  "how-to-download-the-gglbet-app": howToDownloadTheGglbetAppLongformSections,
  "troubleshooting-game-wont-load": troubleshootingGameWontLoadLongformSections,
  "how-to-read-promotion-terms": howToReadPromotionTermsLongformSections,
  "fishing-game-session-basics": fishingGameSessionBasicsLongformSections,
};

export function getGuideLongformBlocks(
  slug: string,
): readonly ContentBlock[] | undefined {
  return guideLongformBySlug[slug];
}

export function getGuideLongformSections(
  slug: string,
): GuideLongformSections | undefined {
  return guideLongformSectionsBySlug[slug];
}

export function getGuideLongformWordCounts(): readonly {
  readonly slug: string;
  readonly words: number;
  readonly category: string;
}[] {
  return Object.entries(guideLongformBySlug).map(([slug, blocks]) => ({
    slug,
    words: countWordsInGuideBlocks(blocks),
    category: guideLongformSectionsBySlug[slug]?.category ?? "",
  }));
}
