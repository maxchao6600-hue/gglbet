import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Rubik } from "next/font/google";

import { SiteShell } from "@/components/layout/SiteShell";
import { SeoContainer } from "@/components/seo/SeoContainer";
import { APP_LOCALES, HTML_LANG, type AppLocale, isAppLocale } from "@/config/i18n";
import { BRAND_HEX } from "@/constants/colors";
import { PRIMARY_NAV } from "@/constants/navigation";
import {
  buildOrganizationJsonLd,
  buildSiteNavigationJsonLd,
  buildWebSiteJsonLd,
  createRootMetadata,
} from "@/lib/seo";
import { localizePath } from "@/lib/i18n";

import "@/styles/globals.css";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = createRootMetadata();

export const viewport: Viewport = {
  themeColor: BRAND_HEX,
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export function generateStaticParams() {
  return APP_LOCALES.map((locale) => ({ locale }));
}

type LocaleLayoutProps = {
  readonly children: React.ReactNode;
  readonly params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: localeParam } = await params;
  if (!isAppLocale(localeParam)) {
    notFound();
  }
  const locale: AppLocale = localeParam;

  return (
    <html
      lang={HTML_LANG[locale]}
      className={`${rubik.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-ink">
        <SeoContainer
          jsonLd={[
            buildOrganizationJsonLd(),
            buildWebSiteJsonLd(),
            buildSiteNavigationJsonLd(
              PRIMARY_NAV.map((item) => ({
                name: item.label,
                path: localizePath(item.href, locale),
              })),
            ),
          ]}
        />
        <SiteShell locale={locale}>{children}</SiteShell>
      </body>
    </html>
  );
}
