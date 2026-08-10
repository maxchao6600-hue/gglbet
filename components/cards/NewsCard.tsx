import Link from "next/link";

import { CmsImageView } from "@/components/media/CmsImageView";
import { Button } from "@/components/ui/Button";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { HUB_MEDIA } from "@/constants/hub-media";
import { getNewsHref } from "@/constants/routes";
import type { NewsArticle, NewsListItem } from "@/types/news";
import { cn } from "@/utils/cn";

type NewsCardProps = {
  readonly article: NewsArticle | NewsListItem;
  readonly href?: string;
  readonly className?: string;
};

export function NewsCard({ article, href, className }: NewsCardProps) {
  const target = href ?? getNewsHref(article.category, article.slug);

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
          image={article.coverImage}
          aspect="wide"
          rounded="none"
          className="border-0 border-b border-border bg-surface-elevated"
          sizes="(max-width: 768px) 100vw, 420px"
          fallbackSrc={HUB_MEDIA.news}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-wrap gap-1.5 p-2.5">
          {article.breaking ? (
            <span className="rounded-control bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent-foreground sm:text-[11px]">
              Breaking
            </span>
          ) : null}
          {article.featured ? (
            <span className="rounded-control bg-brand px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-foreground sm:text-[11px]">
              Featured
            </span>
          ) : null}
          {article.popular ? (
            <span className="rounded-control bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-secondary-foreground sm:text-[11px]">
              Popular
            </span>
          ) : null}
        </div>
        <div className="home-v2-game-card__glow" aria-hidden />
      </div>

      <div className="flex flex-1 flex-col p-card">
        <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-brand sm:text-xs">
          {article.category.replaceAll("-", " ")} · {article.readingTimeMinutes}{" "}
          min
        </p>
        <CardTitle as="h3" className="mt-2 line-clamp-2">
          <Link href={target} className="hover:text-brand">
            {article.title}
          </Link>
        </CardTitle>
        <CardDescription className="mt-2 line-clamp-2">
          {article.excerpt}
        </CardDescription>
        <p className="mt-2 text-xs text-ink-subtle">{article.author.name}</p>
        <div className="mt-auto pt-4">
          <Button href={target} size="sm" className="w-full" variant="soft">
            Read on GGLBET
          </Button>
        </div>
      </div>
    </Card>
  );
}
