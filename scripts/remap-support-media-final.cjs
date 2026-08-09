const fs = require("fs");
const path = require("path");

const DIR = "lib/cms/seed/support";

const MAP = {
  "support-hub.ts": {
    hero: "HUB_MEDIA.support",
    media: [
      "HUB_MEDIA.supportDesk",
      "HUB_MEDIA.supportPaymentJourney",
      "HUB_MEDIA.supportDownloadJourney",
      "HUB_MEDIA.supportRgJourney",
      "HUB_MEDIA.supportCta",
    ],
  },
  "faq.ts": {
    hero: "HUB_MEDIA.faq",
    media: [
      "HUB_MEDIA.faqAccount",
      "HUB_MEDIA.faqPayment",
      "HUB_MEDIA.faqDownload",
      "HUB_MEDIA.faqRg",
      "HUB_MEDIA.faqCta",
    ],
  },
  "payment.ts": {
    hero: "HUB_MEDIA.payment",
    media: [
      "HUB_MEDIA.deposit",
      "HUB_MEDIA.withdraw",
      "HUB_MEDIA.paymentMethods",
      "HUB_MEDIA.paymentSecurity",
      "HUB_MEDIA.paymentCta",
    ],
  },
  "download.ts": {
    hero: "HUB_MEDIA.download",
    media: [
      "HUB_MEDIA.android",
      "HUB_MEDIA.ios",
      "HUB_MEDIA.install",
      "HUB_MEDIA.downloadUpdate",
      "HUB_MEDIA.downloadCta",
    ],
  },
  "responsible-gaming.ts": {
    hero: "HUB_MEDIA.responsible",
    media: [
      "HUB_MEDIA.rgTools",
      "HUB_MEDIA.rgWarning",
      "HUB_MEDIA.rgHelp",
      "HUB_MEDIA.responsible",
      "HUB_MEDIA.rgCta",
    ],
  },
  "about.ts": {
    hero: "HUB_MEDIA.about",
    media: [
      "HUB_MEDIA.aboutCompany",
      "HUB_MEDIA.aboutMission",
      "HUB_MEDIA.aboutEditorial",
      "HUB_MEDIA.aboutTeam",
      "HUB_MEDIA.aboutCta",
    ],
  },
  "contact.ts": {
    hero: "HUB_MEDIA.contact",
    media: [
      "HUB_MEDIA.contactChat",
      "HUB_MEDIA.contactEmail",
      "HUB_MEDIA.supportDesk",
      "HUB_MEDIA.contactPrep",
      "HUB_MEDIA.contactCta",
    ],
  },
  "editorial-policy.ts": {
    hero: "HUB_MEDIA.editorial",
    media: [
      "HUB_MEDIA.editorialFlow",
      "HUB_MEDIA.editorialStandards",
      "HUB_MEDIA.editorialAbout",
      "HUB_MEDIA.teamTrust",
      "HUB_MEDIA.editorialCta",
    ],
  },
  "about-our-team.ts": {
    hero: "HUB_MEDIA.team",
    media: [
      "HUB_MEDIA.teamEditorial",
      "HUB_MEDIA.teamTrust",
      "HUB_MEDIA.teamNews",
      "HUB_MEDIA.aboutTeam",
      "HUB_MEDIA.teamCta",
    ],
  },
};

for (const [file, cfg] of Object.entries(MAP)) {
  const full = path.join(DIR, file);
  let src = fs.readFileSync(full, "utf8");
  src = src.replace(/heroImageSrc:\s*HUB_MEDIA\.\w+/, `heroImageSrc: ${cfg.hero}`);
  let i = 0;
  src = src.replace(/mediaSrc:\s*HUB_MEDIA\.\w+/g, () => {
    const next = cfg.media[Math.min(i, cfg.media.length - 1)];
    i += 1;
    return `mediaSrc: ${next}`;
  });
  fs.writeFileSync(full, src);
  console.log(file, "replacements", i, "expected", cfg.media.length);
}
