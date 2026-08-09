import Link from "next/link";

import { ProviderLogo } from "@/components/media/ProviderLogo";
import { Button } from "@/components/ui/Button";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { DEFAULT_PROVIDER_LOGO_PATH } from "@/constants/provider-media";
import { getProviderHref } from "@/constants/routes";
import type { Provider, ProviderListItem } from "@/types/provider";
import { cn } from "@/utils/cn";

type ProviderCardProps = {
  readonly provider: Provider | ProviderListItem;
  readonly href?: string;
  readonly className?: string;
  readonly viewLabel?: string;
  readonly officialLabel?: string;
};

/**
 * Premium provider card — logo stage, title, category, real game count,
 * Official / Featured badges, CTA, glow + lift hover (not CMS admin chrome).
 */
export function ProviderCard({
  provider,
  href,
  className,
  viewLabel = "View on GGLBET",
  officialLabel = "Official GGLBET provider",
}: ProviderCardProps) {
  const target = href ?? getProviderHref(provider.slug);
  const logoSrc =
    provider.logo?.url && provider.logo.url.length > 0
      ? provider.logo.url
      : DEFAULT_PROVIDER_LOGO_PATH;
  const category =
    "categoryLabels" in provider && provider.categoryLabels.length > 0
      ? provider.categoryLabels[0]
      : null;
  const gameCount =
    "gameCount" in provider && typeof provider.gameCount === "number"
      ? provider.gameCount
      : 0;

  return (
    <Card
      as="article"
      interactive
      glass
      padding="none"
      className={cn(
        "home-v2-provider-premium flex h-full flex-col overflow-hidden",
        className,
      )}
    >
      <div className="home-v2-provider-premium__logo-wrap relative">
        {provider.featured ? (
          <span className="absolute left-3 top-3 z-[1] rounded-control bg-brand px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-foreground sm:text-[11px]">
            Featured
          </span>
        ) : null}
        <span className="absolute right-3 top-3 z-[1] rounded-control bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-secondary-foreground sm:text-[11px]">
          Official
        </span>
        <ProviderLogo
          src={logoSrc}
          alt={`${provider.name} logo`}
          size="lg"
          className="border-0"
        />
        <div className="home-v2-provider-premium__glow" aria-hidden />
      </div>

      <div className="flex flex-1 flex-col p-card text-center">
        <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-brand sm:text-xs">
          {officialLabel}
        </p>
        <CardTitle as="h3" className="mt-2">
          <Link href={target} className="hover:text-brand">
            {provider.name}
          </Link>
        </CardTitle>
        {category ? (
          <p className="mt-2 text-xs font-medium uppercase tracking-wide text-ink-subtle">
            {category}
          </p>
        ) : null}
        {gameCount > 0 ? (
          <p className="mt-2 text-xs font-semibold text-ink-muted sm:text-sm">
            {gameCount.toLocaleString()}{" "}
            {gameCount === 1 ? "game" : "games"}
          </p>
        ) : null}
        <CardDescription className="mt-2 line-clamp-2">
          {provider.summary}
        </CardDescription>
        {"rating" in provider ? (
          <p className="mt-2 text-xs font-semibold text-brand">
            {provider.rating.toFixed(1)} rating
          </p>
        ) : null}
        <div className="mt-auto pt-4">
          <Button href={target} size="sm" className="w-full">
            {viewLabel}
          </Button>
        </div>
      </div>
    </Card>
  );
}
