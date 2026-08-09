import { Section } from "@/components/ui/Section";
import { TrustIcon } from "@/components/icons/trust";
import { HOME_V2_MEDIA } from "@/features/home/home-v2-media";
import { HomeMediaFigure } from "@/features/home/components/HomeMediaFigure";
import { SectionIntro } from "@/features/home/components/SectionIntro";
import type { HomeSectionBase, HomeTrustItem } from "@/types/home";

type TrustSecuritySectionProps = {
  readonly data: HomeSectionBase & {
    readonly items: readonly HomeTrustItem[];
  };
};

export function TrustSecuritySection({ data }: TrustSecuritySectionProps) {
  const headingId = `${data.id}-heading`;

  return (
    <Section
      id={data.id}
      padding="lg"
      containerSize="wide"
      aria-labelledby={headingId}
      tone="muted"
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
          fallbackSrc={HOME_V2_MEDIA.trust}
          sizes="(max-width: 1024px) 42vw, 440px"
        />
      </div>
      <ul className="mt-8 home-v2-rail home-v2-rail--3 sm:mt-10">
        {data.items.map((item) => (
          <li key={item.id} className="home-v2-glass rounded-card p-card">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-control bg-brand-muted text-brand sm:h-11 sm:w-11">
              <TrustIcon name={item.icon} title={item.title} />
            </div>
            <h3 className="mt-3 text-sm font-semibold text-ink sm:mt-4 sm:text-base">
              {item.title}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-ink-muted sm:text-sm">
              {item.body}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
