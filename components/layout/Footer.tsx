import Link from "next/link";

import { LanguageSwitch } from "@/components/i18n/LanguageSwitch";
import { Container } from "@/components/ui/Container";
import type { AppLocale } from "@/config/i18n";
import { ROUTES, externalLinkProps } from "@/constants/routes";
import { SITE_NAME, SITE_TAGLINE } from "@/constants/site";
import { getFooterCopy } from "@/features/i18n/nav-copy";
import { localizePath } from "@/lib/i18n";

type FooterProps = {
  readonly locale: AppLocale;
};

export function Footer({ locale }: FooterProps) {
  const year = new Date().getFullYear();
  const copy = getFooterCopy(locale);

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <Container size="wide" className="py-section-md">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.3fr)_repeat(3,minmax(0,1fr))]">
          <div className="max-w-sm">
            <Link
              href={localizePath(ROUTES.home, locale)}
              className="font-display text-lg font-bold tracking-tight text-ink"
            >
              <span className="text-brand">{SITE_NAME.slice(0, 3)}</span>
              {SITE_NAME.slice(3)}
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              {locale === "zh"
                ? "GGLBET 官方內容中心 — 馬來西亞玩家的娛樂場說明與支援"
                : SITE_TAGLINE}
            </p>
            <p className="mt-4 text-xs leading-relaxed text-ink-subtle">
              {copy.blurb}
            </p>
            <div className="mt-4">
              <LanguageSwitch locale={locale} />
            </div>
          </div>

          {copy.groups.map((group) => (
            <div key={group.title}>
              <p className="text-sm font-semibold text-ink">{group.title}</p>
              <ul className="mt-4 flex flex-col gap-2">
                {group.items.map((item) => {
                  const href = localizePath(item.href, locale);
                  return (
                  <li key={item.href}>
                    <Link
                      href={href}
                      prefetch={false}
                      className="text-sm text-ink-muted transition-colors duration-motion-fast hover:text-brand"
                      {...externalLinkProps(href)}
                    >
                      {item.label}
                    </Link>
                  </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <nav
          aria-label={copy.trustHeading}
          className="mt-10 border-t border-border pt-6"
        >
          <p className="text-sm font-semibold text-ink">{copy.trustHeading}</p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {copy.trust.map((item) => (
              <li key={item.href}>
                <Link
                  href={localizePath(item.href, locale)}
                  className="text-sm text-ink-muted transition-colors duration-motion-fast hover:text-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="mt-8 text-xs text-ink-subtle">
          © {year} {SITE_NAME}.{" "}
          {locale === "zh" ? "保留所有權利。" : "All rights reserved."}
        </p>
      </Container>
    </footer>
  );
}
