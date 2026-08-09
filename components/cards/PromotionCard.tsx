import Link from "next/link";

import { CmsImageView } from "@/components/media/CmsImageView";
import { Button } from "@/components/ui/Button";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { HUB_MEDIA } from "@/constants/hub-media";
import { getPromotionHref } from "@/constants/routes";
import { promotionArtworkFallbackPath, resolvePromotionArtworkTheme } from "@/lib/promotions/artwork";
import type { Promotion } from "@/types/promotion";
import { cn } from "@/utils/cn";

type PromotionCardProps = {
  readonly promotion: Promotion;
  readonly href?: string;
  readonly className?: string;
};

export function PromotionCard({
  promotion,
  href,
  className,
}: PromotionCardProps) {
  const target = href ?? getPromotionHref(promotion.slug);
  const themeFallback = promotionArtworkFallbackPath(
    resolvePromotionArtworkTheme(promotion.title, promotion.promotionType),
  );

  return (
    <Card
      as="article"
      interactive
      glass
      padding="none"
      className={cn(
        "home-v2-hover-card home-v2-game-card group flex h-full flex-col overflow-hidden transition-[transform,box-shadow] duration-300 hover:scale-[1.015] hover:shadow-[0_0_32px_rgba(236,0,140,0.28)]",
        className,
      )}
    >
      <div className="relative overflow-hidden">
        <CmsImageView
          image={promotion.bannerImage}
          aspect="wide"
          rounded="none"
          className="border-0 border-b border-border bg-surface-elevated transition-transform duration-300 group-hover:scale-[1.03]"
          imgClassName="aspect-[16/9] object-cover"
          sizes="(max-width: 768px) 100vw, 420px"
          fallbackSrc={themeFallback || HUB_MEDIA.promotions}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-wrap gap-1.5 p-2.5">
          {promotion.featured ? (
            <span className="rounded-control bg-brand px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-foreground sm:text-[11px]">
              Featured
            </span>
          ) : null}
          {promotion.popular ? (
            <span className="rounded-control bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-secondary-foreground sm:text-[11px]">
              Popular
            </span>
          ) : null}
        </div>
        <div className="home-v2-game-card__glow" aria-hidden />
      </div>

      <div className="flex flex-1 flex-col p-card">
        <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-brand sm:text-xs">
          {promotion.promotionType?.replaceAll("-", " ") ?? "GGLBET offer"} ·{" "}
          {promotion.bonusAmount}
        </p>
        <CardTitle as="h3" className="mt-2 line-clamp-2">
          <Link href={target} className="hover:text-brand">
            {promotion.title}
          </Link>
        </CardTitle>
        <CardDescription className="mt-2 line-clamp-2">
          {promotion.excerpt}
        </CardDescription>
        <div className="mt-auto pt-4">
          <Button href={target} size="sm" className="w-full">
            {promotion.ctaPrimaryLabel}
          </Button>
        </div>
      </div>
    </Card>
  );
}
