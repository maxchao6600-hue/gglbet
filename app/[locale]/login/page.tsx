import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isAppLocale } from "@/config/i18n";
import { CONTENT_PATHS } from "@/constants/routes";
import { AccountAccessPage } from "@/features/account";
import { localizePath } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";

export const dynamic = 'force-static';
export const revalidate = false;

type PageProps = {
  readonly params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isAppLocale(localeParam)) notFound();
  const locale = localeParam;

  return createPageMetadata({
    title: "Log in to GGLBET",
    description:
      "How to sign in to a GGLBET account safely, what to check before entering your details, and what to do if you cannot access your account.",
    path: localizePath(CONTENT_PATHS.login, locale),
    locale,
    absoluteTitle: true,
    robots: { index: false, follow: true },
  });
}

export default async function LoginPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isAppLocale(localeParam)) notFound();

  return <AccountAccessPage mode="login" />;
}
