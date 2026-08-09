import { SplitHero } from "@/components/heroes/SplitHero";
import { HUB_MEDIA } from "@/constants/hub-media";
import { ROUTES } from "@/constants/routes";
import { SITE_NAME } from "@/constants/site";
import { GAMES_MEDIA } from "@/features/games/games-media";
import type { GamesUiCopy } from "@/features/games/games-ui-copy";
import type { GamesPageContent } from "@/types/game";

type GamesHeroSectionProps = {
  readonly page: GamesPageContent;
  readonly copy: GamesUiCopy;
};

/**
 * GGLBET games SplitHero — left SEO copy + CTAs, right premium visual.
 */
export function GamesHeroSection({ page, copy }: GamesHeroSectionProps) {
  return (
    <SplitHero
      id="games-hero"
      headingId="games-hero-heading"
      eyebrow={copy.eyebrow}
      brand={SITE_NAME}
      heading={page.hero.heading}
      subheading={page.hero.subheading}
      body={page.hero.body}
      imageSrc={GAMES_MEDIA.hero || HUB_MEDIA.games}
      imageAlt={page.hero.mediaLabel}
      ctas={[
        {
          label: copy.browseProviders,
          href: ROUTES.providers,
          variant: "primary",
        },
        {
          label: copy.register,
          href: ROUTES.register,
          variant: "outline",
        },
      ]}
    />
  );
}
