import { SITE_NAME } from "@/config/site";
import { ROUTES } from "@/constants/routes";
import type { BreadcrumbItem } from "@/types/seo";

export function createHomeBreadcrumb(): BreadcrumbItem {
  return {
    name: SITE_NAME,
    path: ROUTES.home,
  };
}

export function createBreadcrumbs(
  trail: readonly BreadcrumbItem[],
): readonly BreadcrumbItem[] {
  return [createHomeBreadcrumb(), ...trail];
}

export function createSimpleBreadcrumbs(
  current: BreadcrumbItem,
): readonly BreadcrumbItem[] {
  return createBreadcrumbs([current]);
}
