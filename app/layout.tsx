import type { ReactNode } from "react";

/**
 * Root layout passes through to `app/[locale]/layout.tsx`,
 * which owns the document shell (`html` / `body`) and locale lang attribute.
 */
export default function RootLayout({ children }: { readonly children: ReactNode }) {
  return children;
}
