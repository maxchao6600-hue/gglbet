import { SplitHero } from "@/components/heroes/SplitHero";
import { HUB_MEDIA } from "@/constants/hub-media";
import { SITE_NAME } from "@/constants/site";
import { HOME_V2_MEDIA } from "@/features/home/home-v2-media";
import type { HomeHeroContent } from "@/types/home";

type HeroSectionProps = {
  readonly data: HomeHeroContent;
  /** When Featured Games leads the page, keep hero art non-priority for LCP. */
  readonly priority?: boolean;
};

/**
 * GGLBET home SplitHero — left SEO copy + CTAs, right premium visual.
 * P0-2: always use hub stage art (fused TPOWER), never a CMS logo/placeholder.
 */
export function HeroSection({ data, priority = true }: HeroSectionProps) {
  const artworkSrc = HOME_V2_MEDIA.hero || HUB_MEDIA.home;

  return (
    <SplitHero
      id="home-hero"
      headingId="home-hero-heading"
      eyebrow="Home"
      brand={data.brand || SITE_NAME}
      heading={data.heading}
      subheading={data.subheading}
      body={data.supporting}
      trustLine={data.trustLine}
      imageSrc={artworkSrc}
      imageAlt={data.media.alt ?? data.media.label ?? `${SITE_NAME} hero`}
      priority={priority}
      ctas={[
        {
          label: data.primaryCta.label,
          href: data.primaryCta.href,
          variant: "primary",
        },
        {
          label: data.secondaryCta.label,
          href: data.secondaryCta.href,
          variant: "outline",
        },
        {
          label: data.tertiaryCta.label,
          href: data.tertiaryCta.href,
          variant: "ghost",
        },
      ]}
    />
  );
}
