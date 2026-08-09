import type { CmsImage } from "@/types/cms";
import type { PromotionType } from "@/types/promotion";

/** Visual theme used for dedicated promotion artwork (may refine CMS type). */
export type PromotionArtworkTheme =
  | "free-spins"
  | "welcome"
  | "cashback"
  | "deposit"
  | "reload"
  | "sports"
  | "live-casino"
  | "lottery"
  | "vip"
  | "festival"
  | "referral"
  | "telegram"
  | "other";

export const PROMOTION_ARTWORK_WIDTH = 1600;
export const PROMOTION_ARTWORK_HEIGHT = 900;
/** kv3 cache-bust prefix — forces fresh OptimizedImage URLs after AAA redesign */
export const PROMOTION_ARTWORK_DIR = "/promotions/kv3";
export const PROMOTION_ARTWORK_FALLBACK_DIR = "/promotions/fallback";

export type PromotionArtworkInput = {
  readonly slug: string;
  readonly title: string;
  readonly excerpt: string;
  readonly promotionType: PromotionType;
  readonly bonusAmount: string;
};

export type PromotionArtworkMeta = {
  readonly theme: PromotionArtworkTheme;
  readonly highlight: string;
  readonly src: string;
  readonly usedFallback: boolean;
  readonly alt: string;
  readonly titleAttr: string;
  readonly caption: string;
  readonly image: CmsImage;
};

export function resolvePromotionArtworkTheme(
  title: string,
  promotionType: PromotionType,
): PromotionArtworkTheme {
  const t = title.toLowerCase();

  if (
    /national day|merdeka|chinese new year|hari raya|deepavali|christmas|new year|festival|ewc/.test(
      t,
    )
  ) {
    return "festival";
  }
  if (/vip|loyalty|affiliate/.test(t) || promotionType === "vip") return "vip";
  if (/refer|referral|friend/.test(t)) return "referral";
  if (/telegram/.test(t)) return "telegram";
  if (/powerbank|power bank/.test(t)) return "other";
  if (/free spin|free spins|spins day/.test(t) || promotionType === "free-spins") {
    return "free-spins";
  }
  if (/welcome/.test(t) || promotionType === "welcome") return "welcome";
  if (/cashback|rebate/.test(t) || promotionType === "cashback") return "cashback";
  if (/reload/.test(t) || promotionType === "reload") return "reload";
  if (
    /sports|sportsbook|football|soccer|bet day|goals|odds|free bet|accumulator|multiple|cash out|edit your bets|stake back/.test(
      t,
    )
  ) {
    return "sports";
  }
  if (/live casino|roulette|baccarat|blackjack/.test(t)) return "live-casino";
  if (/lottery|lotto|jackpot draw/.test(t)) return "lottery";
  if (/deposit/.test(t) || promotionType === "deposit") return "deposit";
  if (promotionType === "seasonal") return "festival";
  return "other";
}

/** Pull the strongest headline figure from title / bonusAmount for the artboard. */
export function extractPromotionHighlight(
  title: string,
  bonusAmount: string,
): string {
  const fromTitle =
    title.match(
      /(\d+\s*%|\$?\d[\d,]*(?:\.\d+)?|RM\s?\d+|SGD\s?\d+|188|888|61)/i,
    )?.[1] ?? null;
  if (fromTitle) return fromTitle.replace(/\s+/g, " ").trim();

  const fromBonus =
    bonusAmount.match(
      /(\d+\s*%|\$?\d[\d,]*(?:\.\d+)?|RM\s?\d+|SGD\s?\d+|188|888|61)/i,
    )?.[1] ?? null;
  if (fromBonus && !/see official/i.test(fromBonus)) {
    return fromBonus.replace(/\s+/g, " ").trim();
  }
  return "GGLBET";
}

export function promotionArtworkPublicPath(slug: string): string {
  return `${PROMOTION_ARTWORK_DIR}/${slug}.webp`;
}

export function promotionArtworkFallbackPath(
  theme: PromotionArtworkTheme,
): string {
  return `${PROMOTION_ARTWORK_FALLBACK_DIR}/${theme}.webp`;
}

export function buildPromotionArtworkSeo(input: {
  readonly title: string;
  readonly theme: PromotionArtworkTheme;
  readonly excerpt: string;
}): { readonly alt: string; readonly titleAttr: string; readonly caption: string } {
  const typeLabel = input.theme.replace(/-/g, " ");
  const alt = `GGLBET ${input.title} — ${typeLabel} promotion artwork`;
  const titleAttr = `GGLBET ${input.title}`;
  const caption = `GGLBET ${typeLabel} promotion: ${input.title}. ${input.excerpt}`.slice(
    0,
    220,
  );
  return { alt, titleAttr, caption };
}

/**
 * Resolve dedicated artwork for a promotion.
 * Always points at `/public/promotions/{slug}.webp` (generated).
 * Theme fallback URL is available for OptimizedImage fallbackSrc.
 * Never returns an empty placeholder URL.
 */
export function resolvePromotionArtwork(
  input: PromotionArtworkInput,
): PromotionArtworkMeta {
  const theme = resolvePromotionArtworkTheme(
    input.title,
    input.promotionType,
  );
  const highlight = extractPromotionHighlight(input.title, input.bonusAmount);
  const src = promotionArtworkPublicPath(input.slug);
  const seo = buildPromotionArtworkSeo({
    title: input.title,
    theme,
    excerpt: input.excerpt,
  });

  const image: CmsImage = {
    id: `promotion-art-${input.slug}`,
    url: src,
    alt: seo.alt,
    width: PROMOTION_ARTWORK_WIDTH,
    height: PROMOTION_ARTWORK_HEIGHT,
  };

  return {
    theme,
    highlight,
    src,
    usedFallback: false,
    alt: seo.alt,
    titleAttr: seo.titleAttr,
    caption: seo.caption,
    image,
  };
}
