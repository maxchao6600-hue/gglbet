import Link from "next/link";

import {
  SITE_HUB_LINKS,
  type RelatedLink,
  buildHubInternalLinks,
} from "@/lib/seo/related-content";
import { cn } from "@/utils/cn";

type InternalLinkRailProps = {
  readonly links?: readonly RelatedLink[];
  readonly label?: string;
  readonly className?: string;
  readonly includeAuth?: boolean;
};

/**
 * Shared internal-link rail so pages stay connected to the SEO graph.
 */
export function InternalLinkRail({
  links,
  label = "Explore GGLBET",
  className,
  includeAuth = true,
}: InternalLinkRailProps) {
  const items = buildHubInternalLinks(links ?? []).filter((link) =>
    includeAuth ? true : link.group !== "auth",
  );

  return (
    <nav aria-label={label} className={cn("mt-8", className)}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-subtle">
        {label}
      </p>
      <ul className="flex flex-wrap gap-3 text-sm">
        {items.map((item) => (
          <li key={`${item.href}-${item.label}`}>
            <Link
              href={item.href}
              className="rounded-control border border-border px-3 py-2 text-ink-muted hover:border-border-brand hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function DefaultHubLinkRail(
  props: Omit<InternalLinkRailProps, "links">,
) {
  return <InternalLinkRail links={SITE_HUB_LINKS} {...props} />;
}
