import { DS } from "@/components/design-system/classes";
import { cn } from "@/utils/cn";

export type DsFaqItem = {
  readonly question: string;
  readonly answer: string;
};

type DsFaqAccordionProps = {
  readonly items: readonly DsFaqItem[];
  readonly className?: string;
};

/**
 * Home-aligned FAQ accordion — glass panels, brand open state, shared spacing.
 */
export function DsFaqAccordion({ items, className }: DsFaqAccordionProps) {
  if (items.length === 0) return null;

  return (
    <div className={cn("mt-8 space-y-2 sm:space-y-3", className)}>
      {items.map((item) => (
        <details key={item.question} className={DS.faqItem}>
          <summary className="cursor-pointer list-none text-sm font-semibold text-ink marker:content-none sm:text-base [&::-webkit-details-marker]:hidden">
            <span className="flex items-start justify-between gap-3 sm:gap-4">
              <span>{item.question}</span>
              <span
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-brand transition-transform duration-motion-fast group-open:rotate-45"
              >
                +
              </span>
            </span>
          </summary>
          <p className="mt-3 text-xs leading-relaxed text-ink-muted sm:text-sm">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
