/**
 * Home Design System class recipes — reuse on every hub / detail / trust page.
 * Prefer these over ad-hoc border/bg/shadow so Card, FAQ, and panels stay aligned.
 */
export const DS = {
  /** Section shell with pink/purple radial wash (Home FAQ / Final CTA). */
  sectionGlow: "home-v2-section bg-surface",
  sectionGlowBg: "home-v2-section__bg",
  sectionMuted: "bg-surface",

  /** Glass panel — Card / FAQ / stat / checklist. */
  glass: "home-v2-glass rounded-card",
  glassPad: "home-v2-glass rounded-card p-card",
  glassInteractive: "home-v2-glass home-v2-hover-card rounded-card",
  glassChip:
    "home-v2-glass rounded-control px-4 py-2 text-sm font-medium text-ink",

  /** Split content + media row used by Home sections. */
  split: "home-v2-split relative z-[1]",
  splitFlip: "home-v2-split home-v2-split--flip relative z-[1]",

  /** Premium media frame (Home media figures). */
  mediaPremium: "home-v2-media--premium",

  /** FAQ accordion item (Home FaqSection). */
  faqItem: "home-v2-glass group rounded-card p-card open:border-border-brand",
} as const;
