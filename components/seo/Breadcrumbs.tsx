import Link from "next/link";

import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { SeoContainer } from "@/components/seo/SeoContainer";
import type { BreadcrumbItem } from "@/types/seo";
import { cn } from "@/utils/cn";

type BreadcrumbsProps = {
  readonly items: readonly BreadcrumbItem[];
  readonly className?: string;
  readonly withJsonLd?: boolean;
};

export function Breadcrumbs({
  items,
  className,
  withJsonLd = true,
}: BreadcrumbsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm text-ink-muted", className)}>
      {withJsonLd ? <SeoContainer jsonLd={buildBreadcrumbJsonLd(items)} /> : null}
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.path}-${item.name}`} className="flex items-center gap-2">
              {index > 0 ? (
                <span aria-hidden="true" className="text-ink-subtle">
                  /
                </span>
              ) : null}
              {isLast ? (
                <span aria-current="page" className="font-medium text-ink">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className="transition-colors duration-motion-fast hover:text-brand"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
