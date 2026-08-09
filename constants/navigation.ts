import { ROUTES } from "@/constants/routes";

export type NavItem = {
  readonly label: string;
  readonly href: string;
  readonly description?: string;
  readonly children?: readonly NavItem[];
};

export type MegaMenuColumn = {
  readonly title: string;
  readonly items: readonly NavItem[];
};

export type MegaMenuItem = {
  readonly label: string;
  readonly href: string;
  readonly description?: string;
  readonly columns?: readonly MegaMenuColumn[];
};

export const MEGA_MENU: readonly MegaMenuItem[] = [
  {
    label: "Games",
    href: ROUTES.games,
    description: "Browse slots, live casino, and table games",
    columns: [
      {
        title: "Categories",
        items: [
          {
            label: "All Games",
            href: ROUTES.games,
            description: "Full catalog",
          },
          {
            label: "Slots",
            href: `${ROUTES.games}?category=slots`,
            description: "High-volatility and classics",
          },
          {
            label: "Live Casino",
            href: `${ROUTES.games}?category=live-casino`,
            description: "Real dealers, real-time play",
          },
          {
            label: "Table Games",
            href: `${ROUTES.games}?category=table`,
            description: "Blackjack, roulette, and more",
          },
        ],
      },
      {
        title: "Discover",
        items: [
          {
            label: "New Releases",
            href: `${ROUTES.games}?sort=newest`,
            description: "Fresh titles this month",
          },
          {
            label: "Featured",
            href: `${ROUTES.games}?featured=1`,
            description: "Editor picks",
          },
          {
            label: "Providers",
            href: ROUTES.providers,
            description: "Studios and software partners",
          },
        ],
      },
    ],
  },
  {
    label: "Providers",
    href: ROUTES.providers,
    description: "Trusted game studios",
  },
  {
    label: "Promotions",
    href: ROUTES.promotions,
    description: "Offers, bonuses, and campaigns",
  },
  {
    label: "Guides",
    href: ROUTES.guides,
    description: "How-to resources and education",
  },
  {
    label: "News",
    href: ROUTES.news,
    description: "Product updates and insights",
  },
  {
    label: "Support",
    href: ROUTES.support,
    description: "Help, payments, downloads, and safer play",
    columns: [
      {
        title: "Help",
        items: [
          {
            label: "FAQ",
            href: ROUTES.faq,
            description: "Common questions",
          },
          {
            label: "Payment Methods",
            href: ROUTES.payment,
            description: "Deposit and withdrawal options",
          },
          {
            label: "Contact",
            href: ROUTES.contact,
            description: "Reach our support team",
          },
          {
            label: "Download App",
            href: ROUTES.download,
            description: "Mobile access",
          },
        ],
      },
      {
        title: "Trust",
        items: [
          {
            label: "Responsible Gaming",
            href: ROUTES.responsibleGaming,
            description: "Safer play tools",
          },
          {
            label: "About GGLBET",
            href: ROUTES.about,
            description: "Company and standards",
          },
          {
            label: "Editorial Policy",
            href: ROUTES.editorialPolicy,
            description: "How we research and publish",
          },
          {
            label: "About Our Team",
            href: ROUTES.team,
            description: "The people behind the content",
          },
        ],
      },
    ],
  },
] as const;

export const PRIMARY_NAV: readonly NavItem[] = MEGA_MENU.map((item) => ({
  label: item.label,
  href: item.href,
  description: item.description,
}));

export const FOOTER_NAV: readonly {
  readonly title: string;
  readonly items: readonly NavItem[];
}[] = [
  {
    title: "Explore",
    items: [
      { label: "Games", href: ROUTES.games },
      { label: "Providers", href: ROUTES.providers },
      { label: "Promotions", href: ROUTES.promotions },
      { label: "Download", href: ROUTES.download },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "Support hub", href: ROUTES.support },
      { label: "FAQ", href: ROUTES.faq },
      { label: "Guides", href: ROUTES.guides },
      { label: "Payment", href: ROUTES.payment },
      { label: "Contact", href: ROUTES.contact },
      { label: "Editorial Policy", href: ROUTES.editorialPolicy },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: ROUTES.about },
      { label: "About Our Team", href: ROUTES.team },
      { label: "News", href: ROUTES.news },
      { label: "Responsible Gaming", href: ROUTES.responsibleGaming },
      { label: "Privacy Policy", href: ROUTES.privacyPolicy },
      { label: "Terms", href: ROUTES.terms },
    ],
  },
] as const;

/**
 * Trust and transparency row rendered above the footer legal line.
 */
export const FOOTER_TRUST_LINKS: readonly NavItem[] = [
  { label: "Editorial Policy", href: ROUTES.editorialPolicy },
  { label: "Content Quality Policy", href: ROUTES.contentQuality },
  { label: "Content Update Policy", href: ROUTES.contentUpdates },
  { label: "About Our Team", href: ROUTES.team },
  { label: "Responsible Gaming", href: ROUTES.responsibleGaming },
  { label: "Privacy Policy", href: ROUTES.privacyPolicy },
  { label: "Terms", href: ROUTES.terms },
] as const;

export const AUTH_NAV: readonly NavItem[] = [
  { label: "Log in", href: ROUTES.login },
  { label: "Register", href: ROUTES.register },
] as const;
