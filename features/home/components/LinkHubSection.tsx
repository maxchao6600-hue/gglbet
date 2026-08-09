import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { HOME_V2_MEDIA } from "@/features/home/home-v2-media";
import { HomeMediaFigure } from "@/features/home/components/HomeMediaFigure";
import { SectionIntro } from "@/features/home/components/SectionIntro";
import type { HomeLinkItem, HomeSectionBase } from "@/types/home";

type LinkHubSectionProps = {
  readonly data: HomeSectionBase & {
    readonly items: readonly HomeLinkItem[];
  };
};

export function LinkHubSection({ data }: LinkHubSectionProps) {
  const headingId = `${data.id}-heading`;

  return (
    <Section
      id={data.id}
      padding="lg"
      containerSize="wide"
      aria-labelledby={headingId}
    >
      <div className="home-v2-split">
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
          fallbackSrc={HOME_V2_MEDIA.hub}
          sizes="(max-width: 1024px) 42vw, 440px"
        />
      </div>
      <ul className="mt-8 home-v2-rail home-v2-rail--3 sm:mt-10">
        {data.items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-label={item.title}
              className="home-v2-glass block h-full rounded-card p-card"
            >
              <h3 className="text-sm font-semibold text-ink sm:text-base">
                {item.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-ink-muted sm:text-sm">
                {item.body}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
