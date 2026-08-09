import { Section } from "@/components/ui/Section";
import { HOME_V2_MEDIA } from "@/features/home/home-v2-media";
import { HomeMediaFigure } from "@/features/home/components/HomeMediaFigure";
import { SectionIntro } from "@/features/home/components/SectionIntro";
import type { HomeSectionBase, HomeStep } from "@/types/home";

type HowToSectionProps = {
  readonly data: HomeSectionBase & { readonly steps: readonly HomeStep[] };
  readonly className?: string;
  readonly fallbackSrc?: string;
};

export function HowToSection({
  data,
  className,
  fallbackSrc = HOME_V2_MEDIA.register,
}: HowToSectionProps) {
  const headingId = `${data.id}-heading`;

  return (
    <Section
      id={data.id}
      padding="lg"
      containerSize="wide"
      aria-labelledby={headingId}
      className={className}
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
          fallbackSrc={fallbackSrc}
          sizes="(max-width: 1024px) 42vw, 440px"
        />
      </div>
      <ol className="mt-8 home-v2-rail home-v2-rail--3 sm:mt-10">
        {data.steps.map((step, index) => (
          <li
            key={step.title}
            className="home-v2-glass rounded-card p-card"
          >
            <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-brand sm:text-xs">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2 text-sm font-semibold text-ink sm:text-base">
              {step.title}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-ink-muted sm:text-sm">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
