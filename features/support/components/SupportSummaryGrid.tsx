import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/features/home/components/SectionIntro";
import type { TrustSummaryCard } from "@/types/eeat";

type SupportSummaryGridProps = {
  readonly heading?: string;
  readonly subheading?: string;
  readonly body?: string;
  readonly cards: readonly TrustSummaryCard[];
};

export function SupportSummaryGrid({
  heading = "Quick summary",
  subheading = "Key GGLBET points at a glance",
  body = "Scan these cards before you dive into the full GGLBET guide on this page.",
  cards,
}: SupportSummaryGridProps) {
  if (cards.length === 0) return null;

  return (
    <Section
      id="support-summary"
      padding="lg"
      containerSize="wide"
      aria-labelledby="support-summary-heading"
      tone="glow"
    >
      <SectionIntro
        headingId="support-summary-heading"
        heading={heading}
        subheading={subheading}
        body={body}
      />
      <ul className="relative z-[1] mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <li key={card.title}>
            <Card glass className="home-v2-hover-card h-full">
              <CardTitle as="h3">{card.title}</CardTitle>
              <CardDescription className="mt-2">{card.description}</CardDescription>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
