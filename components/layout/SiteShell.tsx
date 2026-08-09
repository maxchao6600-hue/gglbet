import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import type { AppLocale } from "@/config/i18n";

type SiteShellProps = {
  readonly children: ReactNode;
  readonly locale: AppLocale;
};

export function SiteShell({ children, locale }: SiteShellProps) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-toast focus:rounded-control focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to main content
      </a>
      <Header locale={locale} />
      <main id="main-content" className="flex flex-1 flex-col">
        {children}
      </main>
      <Footer locale={locale} />
    </>
  );
}
