import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { HOME_V2_MEDIA } from "@/features/home/home-v2-media";
import { HomeMediaFigure } from "@/features/home/components/HomeMediaFigure";
import { SectionIntro } from "@/features/home/components/SectionIntro";
import type { HomePoint, HomeSectionBase } from "@/types/home";
import { cn } from "@/utils/cn";

type PointsSectionProps = {
  readonly data: HomeSectionBase & {
    readonly points: readonly HomePoint[];
  };
  readonly columns?: "2" | "3" | "4";
  readonly className?: string;
  readonly mediaFirst?: boolean;
  readonly showPointMedia?: boolean;
  readonly fallbackSrc?: string;
};

const RAIL = {
  "2": "home-v2-rail home-v2-rail--3",
  "3": "home-v2-rail home-v2-rail--3",
  "4": "home-v2-rail",
} as const;

export function PointsSection({
  data,
  columns = "2",
  className,
  mediaFirst = false,
  showPointMedia = false,
  fallbackSrc = HOME_V2_MEDIA.features,
}: PointsSectionProps) {
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
      <div className={cn("home-v2-split relative z-[1]", mediaFirst && "home-v2-split--flip")}>
        {mediaFirst ? (
          <>
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
            <SectionIntro
              headingId={headingId}
              eyebrow={data.eyebrow}
              heading={data.heading}
              subheading={data.subheading}
              body={data.body}
              ctas={data.ctas}
            />
          </>
        ) : (
          <>
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
              fallbackSrc={fallbackSrc}
              sizes="(max-width: 1024px) 42vw, 440px"
              className="home-v2-media--premium"
            />
          </>
        )}
      </div>
      <ul className={cn("relative z-[1] mt-8 sm:mt-10", RAIL[columns])}>
        {data.points.map((point) => (
          <li key={point.title}>
            <Card className="home-v2-glass home-v2-hover-card h-full">
              {showPointMedia && point.media?.src ? (
                <HomeMediaFigure
                  src={point.media.src}
                  alt={point.media.alt ?? point.title}
                  label={point.media.label}
                  tone={point.media.tone}
                  aspect="logo"
                  objectFit="contain"
                  className="mb-4 border-0 bg-transparent"
                  sizes="160px"
                  fallbackSrc={HOME_V2_MEDIA.payments}
                />
              ) : null}
              <CardTitle as="h3">{point.title}</CardTitle>
              <CardDescription className="mt-2">{point.body}</CardDescription>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
