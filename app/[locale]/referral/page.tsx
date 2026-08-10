import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isAppLocale } from "@/config/i18n";
import {
  TrustPageView,
  createTrustPageMetadata,
  loadTrustPage,
} from "@/features/eeat";

const SLUG = "referral";

export const dynamic = 'force-static';
export const revalidate = false;

type PageProps = {
  readonly params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isAppLocale(localeParam)) notFound();
  return createTrustPageMetadata(SLUG, localeParam);
}

export default async function ReferralPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isAppLocale(localeParam)) notFound();
  const data = await loadTrustPage(SLUG, localeParam);

  return <TrustPageView {...data} />;
}
