import Link from "next/link";

import { ProviderLogo } from "@/components/media/ProviderLogo";
import { Button } from "@/components/ui/Button";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { DEFAULT_PROVIDER_LOGO_PATH } from "@/constants/provider-media";
import { HOME_V2_MEDIA } from "@/features/home/home-v2-media";
import { HomeMediaFigure } from "@/features/home/components/HomeMediaFigure";
import { SectionIntro } from "@/features/home/components/SectionIntro";
import type { HomeUiCopy } from "@/features/home/home-ui-copy";
import { formatGamesCount } from "@/features/home/home-ui-copy";
import type { AppLocale } from "@/config/i18n";
import type { HomeCardItem, HomeSectionBase } from "@/types/home";
import { cn } from "@/utils/cn";

type HomeProvidersSectionProps = {
  readonly data: HomeSectionBase & { readonly items: readonly HomeCardItem[] };
  readonly copy: HomeUiCopy;
  readonly locale: AppLocale;
  readonly className?: string;
};

export function HomeProvidersSection({
  data,
  copy,
  locale,
  className,
}: HomeProvidersSectionProps) {
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
          fallbackSrc={HOME_V2_MEDIA.providers}
          sizes="(max-width: 1024px) 42vw, 440px"
          className="home-v2-media--premium"
        />
      </div>

      {data.items.length > 0 ? (
        <ul className="relative z-[1] mt-8 home-v2-rail sm:mt-10">
          {data.items.map((item) => (
            <li key={`${item.title}-${item.href}`} className="flex">
              <ProviderPremiumCard
                item={item}
                copy={copy}
                locale={locale}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </Section>
  );
}

function ProviderPremiumCard({
  item,
  copy,
  locale,
}: {
  readonly item: HomeCardItem;
  readonly copy: HomeUiCopy;
  readonly locale: AppLocale;
}) {
  const logoSrc =
    item.media.src && item.media.src.length > 0
      ? item.media.src
      : DEFAULT_PROVIDER_LOGO_PATH;
  const count =
    typeof item.gameCount === "number" && item.gameCount > 0
      ? formatGamesCount(item.gameCount, locale, copy.gamesCountSuffix)
      : null;

  return (
    <Card
      as="article"
      interactive
      padding="none"
      className="home-v2-provider-premium home-v2-glass flex h-full w-full flex-col overflow-hidden"
    >
      <div className="home-v2-provider-premium__logo-wrap relative">
        {item.featured ? (
          <span className="absolute left-3 top-3 z-[1] rounded-control bg-brand px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-foreground sm:text-[11px]">
            {copy.featuredBadge}
          </span>
        ) : null}
        <ProviderLogo
          src={logoSrc}
          alt={item.media.alt ?? `${item.title} logo`}
          size="lg"
          className="border-0"
        />
        <div className="home-v2-provider-premium__glow" aria-hidden />
      </div>

      <div className="flex flex-1 flex-col p-card text-center">
        <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-brand sm:text-xs">
          {copy.officialProvider}
        </p>
        <CardTitle as="h3" className="mt-2">
          <Link href={item.href} className="hover:text-brand">
            {item.title}
          </Link>
        </CardTitle>
        {count ? (
          <p className="mt-2 text-xs font-semibold text-ink-muted sm:text-sm">
            {count}
          </p>
        ) : null}
        <CardDescription className="mt-2 line-clamp-2">
          {item.body}
        </CardDescription>
        <div className="mt-auto pt-4">
          <Button href={item.href} size="sm" className="w-full">
            {copy.viewProvider}
          </Button>
        </div>
      </div>
    </Card>
  );
}
