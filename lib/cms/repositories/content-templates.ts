import {
  getContentTemplateByType,
  listContentTemplates,
} from "@/lib/cms/seed/content-templates";
import type {
  ContentTemplateDocument,
  ContentTemplateType,
} from "@/types/content-template";

/**
 * CMS repository stub for Content Templates.
 * Swap seed lookup for Payload collection later — generators stay unchanged.
 */
export async function getContentTemplates(): Promise<
  readonly ContentTemplateDocument[]
> {
  return listContentTemplates();
}

export async function getContentTemplate(
  type: ContentTemplateType,
): Promise<ContentTemplateDocument> {
  return getContentTemplateByType(type);
}

export async function getContentTemplateById(
  id: string,
): Promise<ContentTemplateDocument | null> {
  return listContentTemplates().find((item) => item.id === id) ?? null;
}
