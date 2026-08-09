"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { AppLocale } from "@/config/i18n";
import { APP_LOCALES, switchLocalePath } from "@/lib/i18n";
import { cn } from "@/utils/cn";

const LABELS: Record<AppLocale, string> = {
  en: "EN",
  zh: "中文",
};

type LanguageSwitchProps = {
  readonly locale: AppLocale;
  readonly className?: string;
};

/**
 * Minimal language switch — preserves the current page path.
 * Does not redesign Header/Footer chrome.
 */
export function LanguageSwitch({ locale, className }: LanguageSwitchProps) {
  const pathname = usePathname() || "/";

  return (
    <nav
      aria-label="Language"
      className={cn("inline-flex items-center gap-1 text-sm", className)}
    >
      {APP_LOCALES.map((target, index) => {
        const href = switchLocalePath(pathname, target);
        const active = target === locale;
        return (
          <span key={target} className="inline-flex items-center gap-1">
            {index > 0 ? (
              <span className="text-ink-subtle" aria-hidden>
                |
              </span>
            ) : null}
            <Link
              href={href}
              hrefLang={target === "zh" ? "zh-Hant" : "en"}
              className={cn(
                "rounded-control px-1.5 py-0.5 transition-colors duration-motion-fast",
                active
                  ? "font-semibold text-brand"
                  : "text-ink-muted hover:text-ink",
              )}
              aria-current={active ? "true" : undefined}
            >
              {LABELS[target]}
            </Link>
          </span>
        );
      })}
    </nav>
  );
}
