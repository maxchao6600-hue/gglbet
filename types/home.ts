export type HomeCta = {
  readonly label: string;
  readonly href: string;
  readonly variant?: "primary" | "secondary" | "outline" | "ghost" | "soft";
};

export type HomeFaqItem = {
  readonly question: string;
  readonly answer: string;
};

export type HomeMedia = {
  readonly label: string;
  readonly tone?: "brand" | "secondary" | "neutral" | "accent";
  /** Optional real image — when set, UI must render next/image (no placeholder). */
  readonly src?: string;
  readonly alt?: string;
  readonly width?: number;
  readonly height?: number;
};

export type HomeCardItem = {
  readonly title: string;
  readonly body: string;
  readonly href: string;
  readonly meta?: string;
  readonly media: HomeMedia;
  /** Featured game extras — optional so other grids stay simple. */
  readonly providerName?: string;
  readonly providerLogoSrc?: string;
  readonly rtp?: number;
  readonly featured?: boolean;
  readonly popular?: boolean;
  readonly newGame?: boolean;
  readonly playHref?: string;
  /** Provider directory extras */
  readonly gameCount?: number;
};

export type HomePoint = {
  readonly title: string;
  readonly body: string;
  readonly media?: HomeMedia;
};

export type HomeStep = {
  readonly title: string;
  readonly body: string;
};

export type HomeStatItem = {
  readonly value: string;
  readonly label: string;
};

export type HomeWinnerItem = {
  readonly player: string;
  readonly game: string;
  readonly amount: string;
  readonly category: string;
  readonly media?: HomeMedia;
};

export type HomeTrustItem = {
  readonly id: string;
  readonly title: string;
  readonly body: string;
  readonly icon:
    | "shield"
    | "lock"
    | "deposit"
    | "withdraw"
    | "payments"
    | "support"
    | "responsible"
    | "fair"
    | "providers";
};

export type HomeLinkItem = {
  readonly title: string;
  readonly body: string;
  readonly href: string;
};

export type HomeSectionBase = {
  readonly id: string;
  readonly eyebrow: string;
  readonly heading: string;
  readonly subheading: string;
  readonly body: string;
  readonly media: HomeMedia;
  readonly ctas: readonly HomeCta[];
};

export type HomeHeroContent = {
  readonly brand: string;
  readonly heading: string;
  readonly subheading: string;
  readonly supporting: string;
  readonly media: HomeMedia;
  readonly primaryCta: HomeCta;
  readonly secondaryCta: HomeCta;
  readonly tertiaryCta: HomeCta;
  readonly trustLine: string;
};

export type HomeSeoContent = {
  readonly title: string;
  readonly description: string;
  readonly path: string;
};

export type HomePageContent = {
  readonly seo: HomeSeoContent;
  readonly hero: HomeHeroContent;
  readonly about: HomeSectionBase & {
    readonly paragraphs: readonly string[];
    readonly points: readonly string[];
  };
  readonly whyChoose: HomeSectionBase & {
    readonly points: readonly HomePoint[];
  };
  readonly trendingGames: HomeSectionBase & {
    readonly items: readonly HomeCardItem[];
  };
  readonly popularProviders: HomeSectionBase & {
    readonly items: readonly HomeCardItem[];
  };
  readonly featuredPromotions: HomeSectionBase & {
    readonly items: readonly HomeCardItem[];
  };
  readonly gameCategories: HomeSectionBase & {
    readonly items: readonly HomeCardItem[];
  };
  readonly latestWinners: HomeSectionBase & {
    readonly items: readonly HomeWinnerItem[];
  };
  readonly paymentMethods: HomeSectionBase & {
    readonly methods: readonly HomePoint[];
  };
  readonly howToRegister: HomeSectionBase & {
    readonly steps: readonly HomeStep[];
  };
  readonly howToLogin: HomeSectionBase & {
    readonly steps: readonly HomeStep[];
  };
  readonly howToDownload: HomeSectionBase & {
    readonly steps: readonly HomeStep[];
  };
  readonly howToDeposit: HomeSectionBase & {
    readonly steps: readonly HomeStep[];
  };
  readonly howToWithdraw: HomeSectionBase & {
    readonly steps: readonly HomeStep[];
  };
  readonly vipProgram: HomeSectionBase & {
    readonly benefits: readonly HomePoint[];
  };
  readonly referralProgram: HomeSectionBase & {
    readonly points: readonly HomePoint[];
  };
  readonly responsibleGaming: HomeSectionBase & {
    readonly points: readonly HomePoint[];
  };
  readonly latestNews: HomeSectionBase & {
    readonly items: readonly HomeCardItem[];
  };
  readonly casinoGuides: HomeSectionBase & {
    readonly items: readonly HomeCardItem[];
  };
  readonly trustSecurity: HomeSectionBase & {
    readonly items: readonly HomeTrustItem[];
  };
  readonly customerSupport: HomeSectionBase & {
    readonly points: readonly HomePoint[];
  };
  readonly platformFeatures: HomeSectionBase & {
    readonly points: readonly HomePoint[];
  };
  readonly latestStatistics: HomeSectionBase & {
    readonly items: readonly HomeStatItem[];
  };
  readonly newGames: HomeSectionBase & {
    readonly items: readonly HomeCardItem[];
  };
  readonly faq: HomeSectionBase & {
    readonly items: readonly HomeFaqItem[];
  };
  readonly internalLinks: HomeSectionBase & {
    readonly items: readonly HomeLinkItem[];
  };
  readonly finalCta: HomeSectionBase;
};
