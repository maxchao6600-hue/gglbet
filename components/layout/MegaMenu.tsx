"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import { IconArrowRight, IconChevronDown } from "@/components/icons";
import type { AppLocale } from "@/config/i18n";
import { MEGA_MENU, type MegaMenuItem } from "@/constants/navigation";
import { externalLinkProps } from "@/constants/routes";
import { navDescription, navLabel } from "@/features/i18n/nav-copy";
import { localizePath } from "@/lib/i18n";
import { cn } from "@/utils/cn";

type MegaMenuProps = {
  readonly className?: string;
  readonly locale: AppLocale;
};

export function MegaMenu({ className, locale }: MegaMenuProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const rootRef = useRef<HTMLElement>(null);
  const baseId = useId();

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpenId(null);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenId(null);
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <nav
      ref={rootRef}
      aria-label={locale === "zh" ? "主要導覽" : "Primary"}
      className={cn("hidden items-center gap-1 lg:flex", className)}
    >
      {MEGA_MENU.map((item) => (
        <MegaMenuTrigger
          key={item.href}
          item={item}
          locale={locale}
          panelId={`${baseId}-${item.href}`}
          isOpen={openId === item.href}
          onOpen={() => {
            setOpenId(item.href);
          }}
          onClose={() => {
            setOpenId(null);
          }}
          onToggle={() => {
            setOpenId((current) => (current === item.href ? null : item.href));
          }}
        />
      ))}
    </nav>
  );
}

type MegaMenuTriggerProps = {
  readonly item: MegaMenuItem;
  readonly locale: AppLocale;
  readonly panelId: string;
  readonly isOpen: boolean;
  readonly onOpen: () => void;
  readonly onClose: () => void;
  readonly onToggle: () => void;
};

function MegaMenuTrigger({
  item,
  locale,
  panelId,
  isOpen,
  onOpen,
  onClose,
  onToggle,
}: MegaMenuTriggerProps) {
  const hasPanel = Boolean(item.columns && item.columns.length > 0);
  const href = localizePath(item.href, locale);

  if (!hasPanel) {
    return (
      <Link
        href={href}
        className="rounded-control px-3 py-2 text-sm font-medium text-ink-muted transition-colors duration-motion-fast hover:bg-surface-muted hover:text-ink"
        {...externalLinkProps(href)}
      >
        {navLabel(item.label, locale)}
      </Link>
    );
  }

  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button
        type="button"
        className={cn(
          "inline-flex items-center gap-1 rounded-control px-3 py-2 text-sm font-medium transition-colors duration-motion-fast",
          isOpen
            ? "bg-surface-muted text-ink"
            : "text-ink-muted hover:bg-surface-muted hover:text-ink",
        )}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
      >
        {navLabel(item.label, locale)}
        <IconChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-motion-fast",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <div
        id={panelId}
        hidden={!isOpen}
        className={cn(
          "absolute left-0 top-full z-dropdown pt-3",
          !isOpen && "pointer-events-none",
        )}
      >
        <div className="min-w-[36rem] rounded-xl border border-border bg-surface-elevated p-5 shadow-elevated">
          <div className="mb-4 flex items-end justify-between gap-4 border-b border-border pb-4">
            <div>
              <p className="text-sm font-semibold text-ink">
                {navLabel(item.label, locale)}
              </p>
              {item.description ? (
                <p className="mt-1 text-sm text-ink-muted">
                  {navDescription(item.description, locale)}
                </p>
              ) : null}
            </div>
            <Link
              href={href}
              className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:text-primary-hover"
              onClick={onClose}
              {...externalLinkProps(href)}
            >
              {locale === "zh" ? "查看全部" : "View all"}
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {item.columns?.map((column) => (
              <div key={column.title}>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-subtle">
                  {navLabel(column.title, locale)}
                </p>
                <ul className="mt-3 space-y-1">
                  {column.items.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={localizePath(child.href, locale)}
                        className="block rounded-control px-3 py-2 transition-colors duration-motion-fast hover:bg-surface-muted"
                        onClick={onClose}
                        {...externalLinkProps(localizePath(child.href, locale))}
                      >
                        <span className="block text-sm font-medium text-ink">
                          {navLabel(child.label, locale)}
                        </span>
                        {child.description ? (
                          <span className="mt-0.5 block text-xs text-ink-subtle">
                            {navDescription(child.description, locale)}
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
