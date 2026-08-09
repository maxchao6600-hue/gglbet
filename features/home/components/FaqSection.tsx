import { Section } from "@/components/ui/Section";
import { HOME_V2_MEDIA } from "@/features/home/home-v2-media";
import { HomeMediaFigure } from "@/features/home/components/HomeMediaFigure";
import { SectionIntro } from "@/features/home/components/SectionIntro";
import type { HomePageContent } from "@/types/home";

type FaqSectionProps = {
  readonly data: HomePageContent["faq"];
};

const FAQ_ICONS = [
  "brand",
  "map",
  "user",
  "lock",
  "phone",
  "slots",
  "live",
  "pay",
  "shield",
  "vip",
] as const;

function FaqIcon({ name }: { readonly name: (typeof FAQ_ICONS)[number] }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    className: "h-4 w-4 sm:h-5 sm:w-5",
    "aria-hidden": true as const,
  };

  switch (name) {
    case "brand":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M8 12h8M12 8v8" />
        </svg>
      );
    case "map":
      return (
        <svg {...common}>
          <path d="M3 7l6-3 6 3 6-3v13l-6 3-6-3-6 3V7z" />
        </svg>
      );
    case "user":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 19c1.5-3 4-4.5 7-4.5S17.5 16 19 19" />
        </svg>
      );
    case "lock":
      return (
        <svg {...common}>
          <rect x="5" y="11" width="14" height="9" rx="2" />
          <path d="M8 11V8a4 4 0 018 0v3" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <rect x="7" y="3" width="10" height="18" rx="2" />
          <path d="M11 17h2" />
        </svg>
      );
    case "slots":
      return (
        <svg {...common}>
          <rect x="4" y="5" width="16" height="14" rx="2" />
          <path d="M8 9v6M12 9v6M16 9v6" />
        </svg>
      );
    case "live":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M5 12a7 7 0 0114 0M3 12a9 9 0 0018 0" />
        </svg>
      );
    case "pay":
      return (
        <svg {...common}>
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <path d="M3 10h18" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
        </svg>
      );
    case "vip":
      return (
        <svg {...common}>
          <path d="M5 9l2.5 9h9L19 9l-3.5 2L12 6l-3.5 5L5 9z" />
        </svg>
      );
    default:
      return null;
  }
}

export function FaqSection({ data }: FaqSectionProps) {
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
        <div className="min-w-0">
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
            className="mt-6 home-v2-media--premium sm:mt-8"
            fallbackSrc={HOME_V2_MEDIA.faq}
            sizes="(max-width: 1024px) 42vw, 420px"
          />
        </div>
        <div className="min-w-0 space-y-2 sm:space-y-3">
          {data.items.map((item, index) => (
            <details
              key={item.question}
              className="home-v2-glass group rounded-card p-card open:border-border-brand"
            >
              <summary className="cursor-pointer list-none text-sm font-semibold text-ink marker:content-none sm:text-base [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-3 sm:gap-4">
                  <span className="flex min-w-0 items-start gap-3">
                    <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-control bg-brand-muted text-brand">
                      <FaqIcon name={FAQ_ICONS[index % FAQ_ICONS.length]!} />
                    </span>
                    <span>{item.question}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-brand transition-transform duration-motion-fast group-open:rotate-45"
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 pl-11 text-xs leading-relaxed text-ink-muted sm:text-sm">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
