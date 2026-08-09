export type SeoRobotsDirective = {
  readonly index?: boolean;
  readonly follow?: boolean;
  readonly noarchive?: boolean;
  readonly nosnippet?: boolean;
  readonly noimageindex?: boolean;
};

export type OpenGraphInput = {
  readonly title?: string;
  readonly description?: string;
  readonly url?: string;
  readonly type?: "website" | "article";
  readonly images?: readonly {
    readonly url: string;
    readonly width?: number;
    readonly height?: number;
    readonly alt?: string;
  }[];
};

export type TwitterCardInput = {
  readonly card?: "summary" | "summary_large_image";
  readonly title?: string;
  readonly description?: string;
  readonly images?: readonly string[];
};

export type PageMetadataInput = {
  readonly title: string;
  readonly description: string;
  readonly path: string;
  readonly locale?: import("@/config/i18n").AppLocale;
  readonly absoluteTitle?: boolean;
  readonly keywords?: readonly string[];
  readonly robots?: SeoRobotsDirective;
  readonly openGraph?: OpenGraphInput;
  readonly twitter?: TwitterCardInput;
  readonly alternates?: {
    readonly canonical?: string;
    readonly languages?: Record<string, string> | null;
  };
  /**
   * Locales allowed in hreflang. Incomplete zh pages must omit "zh".
   * Defaults to both locales when omitted.
   */
  readonly hreflangLocales?: readonly import("@/config/i18n").AppLocale[];
  /**
   * Resolved page content used to detect 【中文待補】. When locale is zh and
   * placeholders remain, robots become noindex,follow automatically.
   */
  readonly seoContent?: unknown;
  /** Optional zh-resolved twin for EN pages so hreflang can omit incomplete zh. */
  readonly zhContent?: unknown;
  readonly publishedTime?: string;
  readonly modifiedTime?: string;
};

export type BreadcrumbItem = {
  readonly name: string;
  readonly path: string;
};

export type JsonLd = Record<string, unknown>;
