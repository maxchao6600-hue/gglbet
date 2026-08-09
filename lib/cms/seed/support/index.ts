export { createTrustPage, withSupportRelated } from "./factory";
export { SUPPORT_TOPIC_CLUSTERS, CTA, cta } from "./cta";
export { aboutTrustPage } from "./about";
export { faqTrustPage } from "./faq";
export { paymentTrustPage } from "./payment";
export { downloadTrustPage } from "./download";
export { responsibleGamingTrustPage } from "./responsible-gaming";
export { contactTrustPage } from "./contact";
export { editorialPolicyTrustPage } from "./editorial-policy";
export { aboutOurTeamTrustPage } from "./about-our-team";
export { supportHubPage } from "./support-hub";

import { aboutTrustPage } from "./about";
import { aboutOurTeamTrustPage } from "./about-our-team";
import { contactTrustPage } from "./contact";
import { downloadTrustPage } from "./download";
import { editorialPolicyTrustPage } from "./editorial-policy";
import { faqTrustPage } from "./faq";
import { paymentTrustPage } from "./payment";
import { responsibleGamingTrustPage } from "./responsible-gaming";
import { supportHubPage } from "./support-hub";
import type { TrustPageDocument } from "@/types/eeat";

/** Nine Support Content Hub landings (Home-grade). */
export const supportHubTrustPages: readonly TrustPageDocument[] = [
  supportHubPage,
  aboutTrustPage,
  faqTrustPage,
  paymentTrustPage,
  downloadTrustPage,
  responsibleGamingTrustPage,
  contactTrustPage,
  editorialPolicyTrustPage,
  aboutOurTeamTrustPage,
] as const;
