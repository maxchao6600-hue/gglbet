import { getCmsClient } from "@/lib/cms";
import type { CmsLocale } from "@/types/cms";
import type { HomePageContent } from "@/types/home";

export async function getHomePageContent(
  locale?: CmsLocale,
): Promise<HomePageContent> {
  return getCmsClient().getHomePage(locale);
}
