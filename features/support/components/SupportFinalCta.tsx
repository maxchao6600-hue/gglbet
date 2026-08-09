import { Section } from "@/components/ui/Section";
import { HUB_MEDIA } from "@/constants/hub-media";
import { HomeMediaFigure } from "@/features/home/components/HomeMediaFigure";
import { SectionIntro } from "@/features/home/components/SectionIntro";
import type { TrustFinalCta } from "@/types/eeat";

type SupportFinalCtaProps = {
  readonly data: TrustFinalCta;
};

export function SupportFinalCta({ data }: SupportFinalCtaProps) {
  return (
    <Section
      id="support-final-cta"
      padding="lg"
      containerSize="wide"
      aria-labelledby="support-final-cta-heading"
      className="home-v2-section border-t border-border-brand/40 bg-surface"
    >
      <div className="home-v2-section__bg" aria-hidden />
      <div className="home-v2-split relative z-[1]">
        <SectionIntro
          headingId="support-final-cta-heading"
          eyebrow={data.eyebrow}
          heading={data.heading}
          subheading={data.subheading}
          body={data.body}
          ctas={[...data.ctas]}
        />
        <HomeMediaFigure
          src={data.mediaSrc}
          alt={data.mediaAlt}
          aspect="wide"
          fallbackSrc={HUB_MEDIA.cta}
          sizes="(max-width: 1024px) 42vw, 440px"
          className="home-v2-media--premium"
        />
      </div>
    </Section>
  );
}
