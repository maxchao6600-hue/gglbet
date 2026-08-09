import Link from "next/link";

import { ProviderLogo } from "@/components/media/ProviderLogo";
import { Button } from "@/components/ui/Button";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { DEFAULT_PROVIDER_LOGO_PATH } from "@/constants/provider-media";
import { HOME_V2_MEDIA } from "@/features/home/home-v2-media";
import { HomeMediaFigure } from "@/features/home/components/HomeMediaFigure";
import { SectionIntro } from "@/features/home/components/SectionIntro";
import type { HomeCardItem, HomeSectionBase } from "@/types/home";
import { cn } from "@/utils/cn";

type FeaturedGamesSectionProps = {
  readonly data: HomeSectionBase & { readonly items: readonly HomeCardItem[] };
  readonly className?: string;
};

export function FeaturedGamesSection({
  data,
  className,
}: FeaturedGamesSectionProps) {
  const headingId = `${data.id}-heading`;

  return (
    <Section
      id={data.id}
      padding="lg"
      containerSize="wide"
      aria-labelledby={headingId}
      className={cn("home-v2-section", className)}
    >
      <div className="home-v2-section__bg" aria-hidden />
      <div className="home-v2-split relative z-[1]">
        <SectionIntro
          headingId={headingId}
          eyebrow={data.eyebrow}
          heading={data.heading}
          subheading={data.subheading}
          body={data.body}
          ctas={data.ctas}
        />
        <HomeMediaFigure
          src={data.media.src}
          alt={data.media.alt ?? data.media.label}
          label={data.media.label}
          tone={data.media.tone}
          aspect="wide"
          fallbackSrc={HOME_V2_MEDIA.trending}
          sizes="(max-width: 1024px) 42vw, 440px"
          className="home-v2-media--premium"
          priority
        />
      </div>

      {data.items.length > 0 ? (
        <ul className="relative z-[1] mt-8 home-v2-rail sm:mt-10">
          {data.items.map((item, index) => (
            <li key={`${item.title}-${item.href}`}>
              <FeaturedGameCard item={item} priority={index < 2} />
            </li>
          ))}
        </ul>
      ) : null}
    </Section>
  );
}

function FeaturedGameCard({
  item,
  priority = false,
}: {
  readonly item: HomeCardItem;
  readonly priority?: boolean;
}) {
  const logoSrc = item.providerLogoSrc || DEFAULT_PROVIDER_LOGO_PATH;
  const playHref = item.playHref || item.href;
  const badges: string[] = [];
  if (item.featured) badges.push("Featured");
  if (item.popular) badges.push("Popular");
  if (item.newGame) badges.push("New");

  return (
    <Card
      as="article"
      interactive
      padding="none"
      className="home-v2-glass home-v2-game-card h-full overflow-hidden"
    >
      <div className="relative">
        <HomeMediaFigure
          src={item.media.src}
          alt={item.media.alt ?? item.title}
          label={item.media.label}
          aspect="wide"
          rounded="none"
          className="border-0 border-b border-border"
          sizes="280px"
          fallbackSrc={HOME_V2_MEDIA.trending}
          priority={priority}
        />
        {badges.length > 0 ? (
          <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-wrap gap-1.5 p-2.5 sm:p-3">
            {badges.map((badge) => (
              <span
                key={badge}
                className={cn(
                  "rounded-control px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white sm:text-[11px]",
                  badge === "New" && "bg-accent text-accent-foreground",
                  badge === "Featured" && "bg-brand text-brand-foreground",
                  badge === "Popular" && "bg-secondary text-secondary-foreground",
                )}
              >
                {badge}
              </span>
            ))}
          </div>
        ) : null}
        <div className="home-v2-game-card__glow" aria-hidden />
      </div>

      <div className="flex h-full flex-col p-card">
        <div className="flex items-center gap-2.5">
          <ProviderLogo
            src={logoSrc}
            alt=""
            size="sm"
            className="w-12 shrink-0 sm:w-14"
          />
          <div className="min-w-0">
            {item.meta ? (
              <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-brand sm:text-xs">
                {item.meta}
              </p>
            ) : null}
            {item.providerName ? (
              <p className="truncate text-[0.65rem] text-ink-subtle sm:text-xs">
                {item.providerName}
              </p>
            ) : null}
          </div>
        </div>

        <CardTitle as="h3" className="mt-3 line-clamp-2">
          <Link href={item.href} className="hover:text-brand">
            {item.title}
          </Link>
        </CardTitle>
        <CardDescription className="mt-2 line-clamp-2">{item.body}</CardDescription>

        {typeof item.rtp === "number" && item.rtp > 0 ? (
          <p className="mt-3 text-xs font-semibold text-ink-muted sm:text-sm">
            RTP{" "}
            <span className="text-brand">{item.rtp.toFixed(2).replace(/\.00$/, "")}%</span>
          </p>
        ) : null}

        <div className="mt-auto flex flex-wrap gap-2 pt-4">
          <Button href={playHref} size="sm" className="flex-1">
            Play Now
          </Button>
          <Button href={item.href} variant="outline" size="sm" className="flex-1">
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
}
