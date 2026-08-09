import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { HomeMediaFigure } from "@/features/home/components/HomeMediaFigure";
import { SectionIntro } from "@/features/home/components/SectionIntro";
import type { TrustVisualSection } from "@/types/eeat";
import { cn } from "@/utils/cn";

type SupportVisualSectionsProps = {
  readonly sections: readonly TrustVisualSection[];
};

export function SupportVisualSections({ sections }: SupportVisualSectionsProps) {
  if (sections.length === 0) return null;

  return (
    <>
      {sections.map((section) => (
        <Section
          key={section.id}
          id={section.id}
          padding="lg"
          containerSize="wide"
          aria-labelledby={`${section.id}-heading`}
          className="home-v2-section"
          tone="muted"
        >
          <div className="home-v2-section__bg" aria-hidden />
          <div
            className={cn(
              "home-v2-split relative z-[1]",
              section.flip && "home-v2-split--flip",
            )}
          >
            <SectionIntro
              headingId={`${section.id}-heading`}
              eyebrow={section.eyebrow}
              heading={section.heading}
              subheading={section.subheading}
              body={section.body}
              ctas={section.ctas}
            />
            <HomeMediaFigure
              src={section.mediaSrc}
              alt={section.mediaAlt}
              aspect="wide"
              fallbackSrc={section.mediaSrc}
              sizes="(max-width: 1024px) 42vw, 440px"
              className="home-v2-media--premium"
            />
          </div>
          {section.points && section.points.length > 0 ? (
            <ul className="relative z-[1] mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {section.points.map((point) => (
                <li key={point.title}>
                  <Card glass className="home-v2-hover-card h-full">
                    <CardTitle as="h3">{point.title}</CardTitle>
                    <CardDescription className="mt-2">{point.body}</CardDescription>
                  </Card>
                </li>
              ))}
            </ul>
          ) : null}
        </Section>
      ))}
    </>
  );
}
