import { getCmsClient } from "@/lib/cms";
import type { CmsListParams, CmsPaginatedResult } from "@/types/cms";
import type { FaqItem } from "@/types/faq";

export async function listFaqs(
  params?: CmsListParams,
): Promise<CmsPaginatedResult<FaqItem>> {
  return getCmsClient().getFaqs(params);
}
