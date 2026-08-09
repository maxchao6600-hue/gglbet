import { Section } from "@/components/ui/Section";
import { HOME_V2_MEDIA } from "@/features/home/home-v2-media";
import { HomeMediaFigure } from "@/features/home/components/HomeMediaFigure";
import { SectionIntro } from "@/features/home/components/SectionIntro";
import type { HomePageContent } from "@/types/home";

type StatisticsSectionProps = {
  readonly data: HomePageContent["latestStatistics"];
};

export function StatisticsSection({ data }: StatisticsSectionProps) {
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
          fallbackSrc={HOME_V2_MEDIA.statistics}
          sizes="(max-width: 1024px) 42vw, 440px"
        />
      </div>
      <dl className="mt-8 home-v2-rail sm:mt-10">
        {data.items.map((item) => (
          <div
            key={item.label}
            className="home-v2-glass rounded-card p-card"
          >
            <dt className="text-[0.65rem] text-ink-subtle sm:text-sm">
              {item.label}
            </dt>
            <dd className="mt-2 font-display text-2xl font-bold tracking-tight text-brand sm:mt-3 sm:text-4xl">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
