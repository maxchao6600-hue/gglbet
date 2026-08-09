import Link from "next/link";

import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { HOME_V2_MEDIA } from "@/features/home/home-v2-media";
import { HomeMediaFigure } from "@/features/home/components/HomeMediaFigure";
import { isPlaceholderImage } from "@/lib/cms/media";
import type { NewsArticle } from "@/types/news";
import type { Promotion } from "@/types/promotion";

type HomePromotionCardProps = {
  readonly promotion: Promotion;
};

export function HomePromotionCard({ promotion }: HomePromotionCardProps) {
  const image = promotion.bannerImage?.url
    ? promotion.bannerImage
    : promotion.coverImage;
  const hasImage = Boolean(image && !isPlaceholderImage(image));

  return (
    <Card
      as="article"
      interactive
      padding="none"
      className="home-v2-glass h-full overflow-hidden"
    >
      <Link
        href={promotion.canonicalPath}
        className="block h-full"
        aria-label={promotion.title}
      >
        <HomeMediaFigure
          src={hasImage ? image!.url : HOME_V2_MEDIA.promotions}
          alt={hasImage ? image!.alt : promotion.title}
          label={promotion.title}
          tone="brand"
          aspect="wide"
          rounded="none"
          className="border-0 border-b border-border"
          sizes="280px"
          fallbackSrc={HOME_V2_MEDIA.promotions}
        />
        <div className="p-card">
          <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-brand sm:text-xs">
            {promotion.promotionType?.replaceAll("-", " ") || "Offer"}
          </p>
          <CardTitle as="h3" className="mt-2">
            {promotion.title}
          </CardTitle>
          <CardDescription className="mt-2 line-clamp-3">
            {promotion.excerpt || promotion.metaDescription}
          </CardDescription>
        </div>
      </Link>
    </Card>
  );
}

type HomeNewsTeaserProps = {
  readonly article: NewsArticle;
};

export function HomeNewsTeaser({ article }: HomeNewsTeaserProps) {
  const hasImage = Boolean(
    article.coverImage && !isPlaceholderImage(article.coverImage),
  );

  return (
    <Card
      as="article"
      interactive
      padding="none"
      className="home-v2-glass h-full overflow-hidden"
    >
      <Link
        href={article.canonicalPath}
        className="block h-full"
        aria-label={article.title}
      >
        <HomeMediaFigure
          src={hasImage ? article.coverImage.url : HOME_V2_MEDIA.news}
          alt={hasImage ? article.coverImage.alt : article.title}
          label={article.title}
          tone="secondary"
          aspect="wide"
          rounded="none"
          className="border-0 border-b border-border"
          sizes="280px"
          fallbackSrc={HOME_V2_MEDIA.news}
        />
        <div className="p-card">
          <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-brand sm:text-xs">
            {article.category}
          </p>
          <CardTitle as="h3" className="mt-2">
            {article.title}
          </CardTitle>
          <CardDescription className="mt-2 line-clamp-3">
            {article.excerpt || article.metaDescription}
          </CardDescription>
        </div>
      </Link>
    </Card>
  );
}
