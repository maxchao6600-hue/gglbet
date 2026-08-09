import { cmsClient } from "@/lib/cms/client";
import type { CmsClient } from "@/types/cms";

export function getCmsClient(): CmsClient {
  return cmsClient;
}

export type { CmsClient };
