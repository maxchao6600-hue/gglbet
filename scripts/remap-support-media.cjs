const fs = require("fs");
const path = require("path");

const DIR = "lib/cms/seed/support";

const PAGE_MEDIA = {
  about: {
    hero: "HUB_MEDIA.about",
    visuals: [
      "HUB_MEDIA.aboutCompany",
      "HUB_MEDIA.aboutMission",
      "HUB_MEDIA.editorial",
      "HUB_MEDIA.team",
    ],
    cta: "HUB_MEDIA.cta",
  },
  contact: {
    hero: "HUB_MEDIA.contact",
    visuals: [
      "HUB_MEDIA.contactChat",
      "HUB_MEDIA.contactEmail",
      "HUB_MEDIA.supportDesk",
      "HUB_MEDIA.faq",
    ],
    cta: "HUB_MEDIA.cta",
  },
  "editorial-policy": {
    hero: "HUB_MEDIA.editorial",
    visuals: [
      "HUB_MEDIA.editorialFlow",
      "HUB_MEDIA.editorialStandards",
      "HUB_MEDIA.about",
      "HUB_MEDIA.teamTrust",
    ],
    cta: "HUB_MEDIA.cta",
  },
  "about-our-team": {
    hero: "HUB_MEDIA.team",
    visuals: [
      "HUB_MEDIA.editorial",
      "HUB_MEDIA.teamTrust",
      "HUB_MEDIA.teamNews",
      "HUB_MEDIA.aboutCompany",
    ],
    cta: "HUB_MEDIA.cta",
  },
  support: {
    hero: "HUB_MEDIA.support",
    visuals: [
      "HUB_MEDIA.supportDesk",
      "HUB_MEDIA.payment",
      "HUB_MEDIA.download",
      "HUB_MEDIA.responsible",
    ],
    cta: "HUB_MEDIA.cta",
  },
  faq: {
    hero: "HUB_MEDIA.faq",
    visuals: [
      "HUB_MEDIA.payment",
      "HUB_MEDIA.download",
      "HUB_MEDIA.responsible",
      "HUB_MEDIA.contact",
    ],
    cta: "HUB_MEDIA.cta",
  },
  payment: {
    hero: "HUB_MEDIA.payment",
    visuals: [
      "HUB_MEDIA.deposit",
      "HUB_MEDIA.withdraw",
      "HUB_MEDIA.payment",
      "HUB_MEDIA.security",
    ],
    cta: "HUB_MEDIA.cta",
  },
  download: {
    hero: "HUB_MEDIA.download",
    visuals: [
      "HUB_MEDIA.android",
      "HUB_MEDIA.ios",
      "HUB_MEDIA.install",
      "HUB_MEDIA.finalCtaFallback",
    ],
    cta: "HUB_MEDIA.cta",
  },
  "responsible-gaming": {
    hero: "HUB_MEDIA.responsible",
    visuals: [
      "HUB_MEDIA.rgTools",
      "HUB_MEDIA.security",
      "HUB_MEDIA.aboutMission",
      "HUB_MEDIA.supportDesk",
    ],
    cta: "HUB_MEDIA.cta",
  },
};

const fileMap = {
  about: "about.ts",
  contact: "contact.ts",
  "editorial-policy": "editorial-policy.ts",
  "about-our-team": "about-our-team.ts",
  support: "support-hub.ts",
  faq: "faq.ts",
  payment: "payment.ts",
  download: "download.ts",
  "responsible-gaming": "responsible-gaming.ts",
};

for (const [slug, file] of Object.entries(fileMap)) {
  const full = path.join(DIR, file);
  let src = fs.readFileSync(full, "utf8");
  const cfg = PAGE_MEDIA[slug];

  src = src.replace(
    /heroImageSrc:\s*HUB_MEDIA\.\w+/,
    `heroImageSrc: ${cfg.hero}`,
  );

  // Replace mediaSrc occurrences in order inside visualSections + finalCta
  const mediaSrcRe = /mediaSrc:\s*HUB_MEDIA\.\w+/g;
  const matches = [...src.matchAll(mediaSrcRe)];
  // Expected: 4 visual + 1 final = 5, or visuals only then final
  const replacements = [...cfg.visuals, cfg.cta];
  let i = 0;
  src = src.replace(mediaSrcRe, () => {
    const next = replacements[Math.min(i, replacements.length - 1)];
    i += 1;
    return `mediaSrc: ${next}`;
  });

  fs.writeFileSync(full, src);
  console.log(slug, "mediaSrc replacements", i, "expected", replacements.length);
}
