"use client";

import Link from "next/link";

import { LanguageSwitch } from "@/components/i18n/LanguageSwitch";
import { IconClose, IconMenu } from "@/components/icons";
import type { AppLocale } from "@/config/i18n";
import { MEGA_MENU } from "@/constants/navigation";
import { externalLinkProps } from "@/constants/routes";
import { navLabel } from "@/features/i18n/nav-copy";
import { useDisclosure } from "@/hooks/useDisclosure";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { localizePath } from "@/lib/i18n";
import { cn } from "@/utils/cn";

type MobileNavigationProps = {
  readonly className?: string;
  readonly locale: AppLocale;
};

/**
 * Mobile hamburger + slide-down nav.
 * Login / Register stay in the Header bar (conversion CTAs) — never buried here.
 */
export function MobileNavigation({ className, locale }: MobileNavigationProps) {
  const { isOpen, close, toggle } = useDisclosure(false);
  useLockBodyScroll(isOpen);

  return (
    <div className={cn("shrink-0", className)}>
      <button
        type="button"
        className="inline-flex h-9 w-9 items-center justify-center rounded-control border border-border text-ink min-[390px]:h-10 min-[390px]:w-10 sm:h-11 sm:w-11"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-panel"
        aria-label={
          isOpen ? navLabel("Close menu", locale) : navLabel("Open menu", locale)
        }
        onClick={toggle}
      >
        {isOpen ? <IconClose /> : <IconMenu />}
      </button>

      {isOpen ? (
        <button
          type="button"
          className="fixed inset-0 top-header z-overlay bg-overlay"
          aria-label={
            locale === "zh" ? "關閉選單遮罩" : "Close menu overlay"
          }
          onClick={close}
        />
      ) : null}

      <div
        id="mobile-navigation-panel"
        className={cn(
          "fixed inset-x-0 top-header z-modal max-h-[calc(100dvh-var(--ggl-size-header))] overflow-y-auto border-b border-border bg-surface-elevated transition-[opacity,transform] duration-motion-base ease-standard",
          isOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0",
        )}
        hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b border-border px-page-x py-3">
          <LanguageSwitch locale={locale} />
        </div>
        <nav
          aria-label={locale === "zh" ? "手機主選單" : "Mobile primary"}
          className="space-y-4 px-page-x py-5"
        >
          {MEGA_MENU.map((item) => {
            const itemHref = localizePath(item.href, locale);
            return (
            <div key={item.href}>
              <Link
                href={itemHref}
                className="block rounded-control px-3 py-2 text-base font-semibold text-ink hover:bg-surface-muted"
                onClick={close}
                {...externalLinkProps(itemHref)}
              >
                {navLabel(item.label, locale)}
              </Link>
              {item.columns ? (
                <ul className="mt-1 space-y-1 border-l border-border pl-3">
                  {item.columns.flatMap((column) =>
                    column.items.map((child) => {
                      const childHref = localizePath(child.href, locale);
                      return (
                      <li key={child.href}>
                        <Link
                          href={childHref}
                          className="block rounded-control px-3 py-2 text-sm text-ink-muted hover:bg-surface-muted hover:text-ink"
                          onClick={close}
                          {...externalLinkProps(childHref)}
                        >
                          {navLabel(child.label, locale)}
                        </Link>
                      </li>
                      );
                    }),
                  )}
                </ul>
              ) : null}
            </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
