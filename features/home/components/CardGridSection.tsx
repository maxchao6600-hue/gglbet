import Link from "next/link";

import { ProviderLogo } from "@/components/media/ProviderLogo";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { DEFAULT_PROVIDER_LOGO_PATH } from "@/constants/provider-media";
import { HOME_V2_MEDIA } from "@/features/home/home-v2-media";
import { HomeMediaFigure } from "@/features/home/components/HomeMediaFigure";
import { SectionIntro } from "@/features/home/components/SectionIntro";
import type { HomeCardItem, HomeSectionBase } from "@/types/home";
import { cn } from "@/utils/cn";

type CardGridSectionProps = {
  readonly data: HomeSectionBase & { readonly items: readonly HomeCardItem[] };
  readonly columns?: "3" | "4" | "5";
  readonly showMediaAside?: boolean;
  readonly className?: string;
  readonly logoCards?: boolean;
  readonly categoryCards?: boolean;
  readonly fallbackSrc?: string;
};

const RAIL_CLASS = {
  "3": "home-v2-rail home-v2-rail--3",
  "4": "home-v2-rail",
  "5": "home-v2-rail home-v2-rail--5",
} as const;

export function CardGridSection({
  data,
  columns = "4",
  showMediaAside = true,
  className,
  logoCards = false,
  categoryCards = false,
  fallbackSrc = HOME_V2_MEDIA.features,
}: CardGridSectionProps) {
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
        {showMediaAside ? (
          <HomeMediaFigure
            src={data.media.src}
            alt={data.media.alt ?? data.media.label}
            label={data.media.label}
            tone={data.media.tone}
            aspect="wide"
            fallbackSrc={fallbackSrc}
            sizes="(max-width: 1024px) 42vw, 440px"
            className="home-v2-media--premium"
          />
        ) : null}
      </div>

      {data.items.length > 0 ? (
        <ul className={cn("relative z-[1] mt-8 sm:mt-10", RAIL_CLASS[columns])}>
          {data.items.map((item) => (
            <li key={`${item.title}-${item.href}`} className="flex">
              <Card
                as="article"
                interactive
                padding="none"
                className={cn(
                  "home-v2-glass home-v2-hover-card flex h-full w-full flex-col overflow-hidden",
                  logoCards && "home-v2-provider-card",
                  categoryCards && "home-v2-category-card",
                )}
              >
                <Link
                  href={item.href}
                  className="flex h-full flex-col"
                  aria-label={item.title}
                >
                  {logoCards ? (
                    <ProviderLogo
                      src={
                        item.media.src && item.media.src.length > 0
                          ? item.media.src
                          : DEFAULT_PROVIDER_LOGO_PATH
                      }
                      alt={item.media.alt ?? item.title}
                      size="lg"
                      className="border-0 border-b border-border"
                    />
                  ) : (
                    <HomeMediaFigure
                      src={
                        item.media.src && item.media.src.length > 0
                          ? item.media.src
                          : fallbackSrc
                      }
                      alt={item.media.alt ?? item.title}
                      label={item.media.label}
                      tone={item.media.tone}
                      aspect="wide"
                      rounded="none"
                      objectFit="cover"
                      className="border-0 border-b border-border"
                      sizes="240px"
                      fallbackSrc={fallbackSrc}
                    />
                  )}
                  <div className="flex flex-1 flex-col p-card">
                    {item.meta ? (
                      <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-brand sm:text-xs">
                        {item.meta}
                      </p>
                    ) : null}
                    <CardTitle
                      as="h3"
                      className={cn(
                        item.meta ? "mt-2" : undefined,
                        logoCards && "text-center",
                      )}
                    >
                      {item.title}
                    </CardTitle>
                    <CardDescription
                      className={cn(
                        "mt-2 line-clamp-3",
                        logoCards && "text-center",
                      )}
                    >
                      {item.body}
                    </CardDescription>
                  </div>
                </Link>
              </Card>
            </li>
          ))}
        </ul>
      ) : null}
    </Section>
  );
}
