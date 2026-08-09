import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { HOME_V2_MEDIA } from "@/features/home/home-v2-media";
import { HomeMediaFigure } from "@/features/home/components/HomeMediaFigure";
import { SectionIntro } from "@/features/home/components/SectionIntro";
import type { HomePageContent } from "@/types/home";

type WinnersSectionProps = {
  readonly data: HomePageContent["latestWinners"];
};

export function WinnersSection({ data }: WinnersSectionProps) {
  const headingId = `${data.id}-heading`;

  return (
    <Section
      id={data.id}
      padding="lg"
      containerSize="wide"
      aria-labelledby={headingId}
      className="home-v2-section bg-surface"
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
          fallbackSrc={HOME_V2_MEDIA.winners}
          sizes="(max-width: 1024px) 42vw, 440px"
          className="home-v2-media--premium"
        />
      </div>
      <ul className="relative z-[1] mt-8 home-v2-rail sm:mt-10">
        {data.items.map((item) => (
          <li key={`${item.player}-${item.game}`}>
            <Card className="home-v2-glass home-v2-hover-card h-full overflow-hidden p-0">
              {item.media?.src ? (
                <HomeMediaFigure
                  src={item.media.src}
                  alt={item.media.alt ?? item.game}
                  label={item.media.label}
                  tone={item.media.tone}
                  aspect="wide"
                  rounded="none"
                  className="border-0 border-b border-border"
                  sizes="240px"
                  fallbackSrc={HOME_V2_MEDIA.winners}
                />
              ) : (
                <HomeMediaFigure
                  src={HOME_V2_MEDIA.winners}
                  alt={item.game}
                  aspect="wide"
                  rounded="none"
                  className="border-0 border-b border-border"
                  sizes="240px"
                />
              )}
              <div className="p-card">
                <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-ink-subtle sm:text-xs">
                  {item.category}
                </p>
                <CardTitle as="h3" className="mt-2">
                  {item.amount}
                </CardTitle>
                <CardDescription className="mt-2">
                  {item.player}
                  <span className="text-ink-subtle"> · </span>
                  {item.game}
                </CardDescription>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
