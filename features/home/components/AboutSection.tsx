import { Section } from "@/components/ui/Section";
import { HOME_V2_MEDIA } from "@/features/home/home-v2-media";
import { HomeMediaFigure } from "@/features/home/components/HomeMediaFigure";
import { SectionIntro } from "@/features/home/components/SectionIntro";
import type { HomePageContent } from "@/types/home";
import { cn } from "@/utils/cn";

type AboutSectionProps = {
  readonly data: HomePageContent["about"];
  readonly className?: string;
};

export function AboutSection({ data, className }: AboutSectionProps) {
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
        <div className="min-w-0">
          <SectionIntro
            headingId={headingId}
            eyebrow={data.eyebrow}
            heading={data.heading}
            subheading={data.subheading}
            body={data.body}
            ctas={data.ctas}
          />
          <div className="mt-6 space-y-4 sm:mt-8 sm:space-y-5">
            {data.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="text-xs leading-relaxed text-ink-muted sm:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <HomeMediaFigure
          src={data.media.src}
          alt={data.media.alt ?? data.media.label}
          label={data.media.label}
          tone={data.media.tone}
          aspect="wide"
          fallbackSrc={HOME_V2_MEDIA.about}
          className="relative home-v2-media--premium"
          sizes="(max-width: 1024px) 42vw, 440px"
        />
      </div>
      <ul className="relative z-[1] mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4">
        {data.points.map((point) => (
          <li
            key={point}
            className="home-v2-glass rounded-card px-3 py-3 text-[0.7rem] leading-relaxed text-ink-muted sm:px-4 sm:py-4 sm:text-sm"
          >
            {point}
          </li>
        ))}
      </ul>
    </Section>
  );
}
