import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isAppLocale } from "@/config/i18n";
import {
  TrustPageView,
  createTrustPageMetadata,
  loadTrustPage,
} from "@/features/eeat";

const SLUG = "content-quality-policy";

export const revalidate = 3600;

type PageProps = {
  readonly params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isAppLocale(localeParam)) notFound();
  return createTrustPageMetadata(SLUG, localeParam);
}

export default async function ContentQualityPolicyPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isAppLocale(localeParam)) notFound();
  const data = await loadTrustPage(SLUG, localeParam);

  return <TrustPageView {...data} />;
}
