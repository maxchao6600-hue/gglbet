import type { CmsDocumentBase } from "@/types/cms";

export type FaqCategory =
  | "account"
  | "payments"
  | "bonuses"
  | "games"
  | "security"
  | "other";

export type FaqItem = CmsDocumentBase & {
  readonly question: string;
  readonly answer: string;
  readonly category: FaqCategory;
  readonly order: number;
};
