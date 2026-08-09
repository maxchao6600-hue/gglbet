import type {
  ContentBlock,
  ContentCtaAction,
  ContentFaqItem,
  ContentHowToStep,
  ContentImageAsset,
  ContentPerson,
  ContentRelatedRefs,
} from "@/types/content";

let seq = 0;

/** Stable CMS-friendly block id helper for seeds and adapters. */
export function blockId(prefix: string): string {
  seq += 1;
  return `${prefix}-${seq}`;
}

export function resetBlockIdSequence(): void {
  seq = 0;
}

export function heroBlock(input: {
  readonly heading: string;
  readonly subheading?: string;
  readonly body?: string;
  readonly image?: ContentImageAsset;
  readonly id?: string;
}): ContentBlock {
  return {
    type: "hero",
    id: input.id ?? blockId("hero"),
    heading: input.heading,
    subheading: input.subheading,
    body: input.body,
    image: input.image,
  };
}

export function paragraph(text: string, id?: string): ContentBlock {
  return { type: "paragraph", id: id ?? blockId("p"), text };
}

export function heading(text: string, anchor: string, id?: string): ContentBlock {
  return { type: "heading", id: id ?? blockId("h2"), text, anchor, level: 2 };
}

export function subHeading(
  text: string,
  anchor: string,
  id?: string,
): ContentBlock {
  return {
    type: "subHeading",
    id: id ?? blockId("h3"),
    text,
    anchor,
    level: 3,
  };
}

export function quote(text: string, cite?: string, id?: string): ContentBlock {
  return { type: "quote", id: id ?? blockId("quote"), text, cite };
}

export function infoBox(
  title: string,
  body: string,
  id?: string,
): ContentBlock {
  return { type: "infoBox", id: id ?? blockId("info"), title, body };
}

export function warningBox(
  title: string,
  body: string,
  id?: string,
): ContentBlock {
  return { type: "warningBox", id: id ?? blockId("warn"), title, body };
}

export function successBox(
  title: string,
  body: string,
  id?: string,
): ContentBlock {
  return { type: "successBox", id: id ?? blockId("ok"), title, body };
}

export function tipBox(title: string, body: string, id?: string): ContentBlock {
  return { type: "tipBox", id: id ?? blockId("tip"), title, body };
}

export function checklist(
  items: readonly string[],
  title?: string,
  id?: string,
): ContentBlock {
  return { type: "checklist", id: id ?? blockId("check"), title, items };
}

export function bulletList(
  items: readonly string[],
  title?: string,
  id?: string,
): ContentBlock {
  return { type: "bulletList", id: id ?? blockId("ul"), title, items };
}

export function numberList(
  items: readonly string[],
  title?: string,
  id?: string,
): ContentBlock {
  return { type: "numberList", id: id ?? blockId("ol"), title, items };
}

export function comparisonTable(input: {
  readonly headers: readonly string[];
  readonly rows: readonly (readonly string[])[];
  readonly caption?: string;
  readonly id?: string;
}): ContentBlock {
  return {
    type: "comparisonTable",
    id: input.id ?? blockId("cmp"),
    headers: input.headers,
    rows: input.rows,
    caption: input.caption,
  };
}

export function standardTable(input: {
  readonly headers: readonly string[];
  readonly rows: readonly (readonly string[])[];
  readonly caption?: string;
  readonly id?: string;
}): ContentBlock {
  return {
    type: "standardTable",
    id: input.id ?? blockId("tbl"),
    headers: input.headers,
    rows: input.rows,
    caption: input.caption,
  };
}

export function imageBlock(input: {
  readonly image: ContentImageAsset;
  readonly caption?: string;
  readonly credit?: string;
  readonly id?: string;
}): ContentBlock {
  return {
    type: "image",
    id: input.id ?? blockId("img"),
    image: input.image,
    caption: input.caption ?? input.image.caption,
    credit: input.credit ?? input.image.credit,
  };
}

export function imageGallery(
  images: readonly ContentImageAsset[],
  caption?: string,
  id?: string,
): ContentBlock {
  return {
    type: "imageGallery",
    id: id ?? blockId("gallery"),
    images,
    caption,
  };
}

export function videoBlock(input: {
  readonly title: string;
  readonly url?: string;
  readonly poster?: ContentImageAsset;
  readonly id?: string;
}): ContentBlock {
  return {
    type: "video",
    id: input.id ?? blockId("video"),
    title: input.title,
    url: input.url,
    poster: input.poster,
  };
}

export function faqBlock(
  items: readonly ContentFaqItem[],
  title?: string,
  id?: string,
): ContentBlock {
  return { type: "faq", id: id ?? blockId("faq"), title, items };
}

export function prosBlock(
  items: readonly string[],
  title = "Pros",
  id?: string,
): ContentBlock {
  return { type: "pros", id: id ?? blockId("pros"), title, items };
}

export function consBlock(
  items: readonly string[],
  title = "Cons",
  id?: string,
): ContentBlock {
  return { type: "cons", id: id ?? blockId("cons"), title, items };
}

export function timelineBlock(
  items: readonly {
    readonly id: string;
    readonly date?: string;
    readonly label: string;
    readonly body: string;
  }[],
  title?: string,
  id?: string,
): ContentBlock {
  return { type: "timeline", id: id ?? blockId("timeline"), title, items };
}

export function statistic(
  label: string,
  value: string,
  note?: string,
  id?: string,
): ContentBlock {
  return { type: "statistic", id: id ?? blockId("stat"), label, value, note };
}

export function ctaBlock(input: {
  readonly heading: string;
  readonly body?: string;
  readonly primary: ContentCtaAction;
  readonly secondary?: ContentCtaAction;
  readonly id?: string;
}): ContentBlock {
  return {
    type: "cta",
    id: input.id ?? blockId("cta"),
    heading: input.heading,
    body: input.body,
    primary: input.primary,
    secondary: input.secondary,
  };
}

export function buttonBlock(
  label: string,
  href: string,
  variant?: ContentCtaAction["variant"],
  id?: string,
): ContentBlock {
  return {
    type: "button",
    id: id ?? blockId("btn"),
    label,
    href,
    variant,
  };
}

export function divider(id?: string): ContentBlock {
  return { type: "divider", id: id ?? blockId("hr") };
}

export function spacer(size: "sm" | "md" | "lg" = "md", id?: string): ContentBlock {
  return { type: "spacer", id: id ?? blockId("sp"), size };
}

export function authorBlock(person: ContentPerson, id?: string): ContentBlock {
  return { type: "author", id: id ?? blockId("author"), person };
}

export function reviewerBlock(
  person: ContentPerson,
  id?: string,
): ContentBlock {
  return { type: "reviewer", id: id ?? blockId("reviewer"), person };
}

export function relatedContentBlock(
  refs: ContentRelatedRefs,
  title?: string,
  id?: string,
): ContentBlock {
  return {
    type: "relatedContent",
    id: id ?? blockId("related"),
    title,
    refs,
  };
}

export function tldr(text: string, label?: string, id?: string): ContentBlock {
  return { type: "tldr", id: id ?? blockId("tldr"), text, label };
}

export function summary(
  text: string,
  title?: string,
  id?: string,
): ContentBlock {
  return { type: "summary", id: id ?? blockId("summary"), text, title };
}

export function definition(
  term: string,
  text: string,
  id?: string,
): ContentBlock {
  return { type: "definition", id: id ?? blockId("def"), term, text };
}

export function bestPractice(
  items: readonly string[],
  title = "Best practices",
  id?: string,
): ContentBlock {
  return {
    type: "bestPractice",
    id: id ?? blockId("best"),
    title,
    items,
  };
}

export function commonMistakes(
  items: readonly string[],
  title = "Common mistakes",
  id?: string,
): ContentBlock {
  return {
    type: "commonMistakes",
    id: id ?? blockId("mistakes"),
    title,
    items,
  };
}

export function howTo(input: {
  readonly name: string;
  readonly description?: string;
  readonly steps: readonly ContentHowToStep[];
  readonly id?: string;
}): ContentBlock {
  return {
    type: "howTo",
    id: input.id ?? blockId("howto"),
    name: input.name,
    description: input.description,
    steps: input.steps,
  };
}

export function codeBlock(input: {
  readonly code: string;
  readonly language?: string;
  readonly caption?: string;
  readonly id?: string;
}): ContentBlock {
  return {
    type: "codeBlock",
    id: input.id ?? blockId("code"),
    code: input.code,
    language: input.language,
    caption: input.caption,
  };
}

/** Stored only — never rendered as live HTML. */
export function htmlBlock(
  html: string,
  note = "HTML block is stored but never executed in the renderer.",
  id?: string,
): ContentBlock {
  return {
    type: "htmlBlock",
    id: id ?? blockId("html"),
    html,
    note,
  };
}
