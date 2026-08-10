import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isAppLocale } from "@/config/i18n";
import { PromotionsListingPage } from "@/features/promotions/components/PromotionsListingPage";
import { localizePath } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";
import {
  getPromotionsPageContent,
  listPromotionListItems,
} from "@/services/cms/promotions";

export const dynamic = 'force-static';
export const revalidate = false;

type PromotionsPageProps = {
  readonly params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PromotionsPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isAppLocale(localeParam)) notFound();
  const locale = localeParam;

  const [page, zhPage] = await Promise.all([
    getPromotionsPageContent(locale),
    getPromotionsPageContent("zh"),
  ]);

  return createPageMetadata({
    title: page.seo.title,
    description: page.seo.description,
    path: localizePath(page.seo.path, locale),
    locale,
    absoluteTitle: true,
    seoContent: page,
    zhContent: zhPage,
    openGraph: {
      title: page.seo.title,
      description: page.seo.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.seo.title,
      description: page.seo.description,
    },
  });
}

export default async function PromotionsPage({ params }: PromotionsPageProps) {
  const { locale: localeParam } = await params;
  if (!isAppLocale(localeParam)) notFound();
  const locale = localeParam;

  const page = await getPromotionsPageContent(locale);

  const [all, featured] = await Promise.all([
    listPromotionListItems({ pageSize: 500, sort: "newest", locale }),
    listPromotionListItems({
      pageSize: 6,
      featured: true,
      sort: "popular",
      locale,
    }),
  ]);

  return (
    <PromotionsListingPage
      page={page}
      promotions={all.items}
      featured={featured.items}
    />
  );
}
