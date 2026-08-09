import Link from "next/link";

import { CmsImageView } from "@/components/media/CmsImageView";
import { Button } from "@/components/ui/Button";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { HUB_MEDIA } from "@/constants/hub-media";
import { getGuideHref } from "@/constants/routes";
import type { Guide, GuideListItem } from "@/types/guide";
import { cn } from "@/utils/cn";

type GuideCardProps = {
  readonly guide: Guide | GuideListItem;
  readonly href?: string;
  readonly className?: string;
};

export function GuideCard({ guide, href, className }: GuideCardProps) {
  const target = href ?? getGuideHref(guide.category, guide.slug);

  return (
    <Card
      as="article"
      interactive
      glass
      padding="none"
      className={cn(
        "home-v2-hover-card home-v2-game-card flex h-full flex-col overflow-hidden",
        className,
      )}
    >
      <div className="relative">
        <CmsImageView
          image={guide.coverImage}
          aspect="wide"
          rounded="none"
          className="border-0 border-b border-border bg-surface-elevated"
          sizes="(max-width: 768px) 50vw, 280px"
          fallbackSrc={HUB_MEDIA.guides}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-wrap gap-1.5 p-2.5">
          {guide.featured ? (
            <span className="rounded-control bg-brand px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-foreground sm:text-[11px]">
              Featured
            </span>
          ) : null}
          {guide.popular ? (
            <span className="rounded-control bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-secondary-foreground sm:text-[11px]">
              Popular
            </span>
          ) : null}
        </div>
        <div className="home-v2-game-card__glow" aria-hidden />
      </div>

      <div className="flex flex-1 flex-col p-card">
        <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-brand sm:text-xs">
          {guide.category.replaceAll("-", " ")} · {guide.difficulty}
        </p>
        <CardTitle as="h3" className="mt-2 line-clamp-2">
          <Link href={target} className="hover:text-brand">
            {guide.title}
          </Link>
        </CardTitle>
        <CardDescription className="mt-2 line-clamp-2">
          {guide.excerpt}
        </CardDescription>
        <p className="mt-2 text-xs text-ink-subtle">
          {guide.readingTime} min · Updated{" "}
          {new Date(guide.updatedDate).toLocaleDateString("en-GB")}
        </p>
        <div className="mt-auto pt-4">
          <Button href={target} size="sm" className="w-full" variant="soft">
            Open GGLBET guide
          </Button>
        </div>
      </div>
    </Card>
  );
}
