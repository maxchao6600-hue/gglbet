import { NextRequest, NextResponse } from "next/server";

import { DEFAULT_LOCALE } from "@/config/i18n";

/**
 * Rewrite default-locale URLs to the internal `/en/...` App Router segment
 * while keeping the public URL unprefixed.
 *
 * Public:
 *   /providers        → rewrite → /en/providers
 *   /zh/providers     → /zh/providers (no rewrite)
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (shouldSkip(pathname)) {
    return NextResponse.next();
  }

  if (pathname === "/zh" || pathname.startsWith("/zh/")) {
    return NextResponse.next();
  }

  if (pathname === `/${DEFAULT_LOCALE}` || pathname.startsWith(`/${DEFAULT_LOCALE}/`)) {
    // Prevent /en from being a public duplicate of /
    const url = request.nextUrl.clone();
    url.pathname =
      pathname === `/${DEFAULT_LOCALE}`
        ? "/"
        : pathname.slice(DEFAULT_LOCALE.length + 1) || "/";
    return NextResponse.redirect(url);
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${DEFAULT_LOCALE}` : `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.rewrite(url);
}

function shouldSkip(pathname: string): boolean {
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname === "/robots.txt" ||
    pathname === "/manifest.webmanifest" ||
    pathname === "/sitemap.xml" ||
    pathname.startsWith("/sitemap") ||
    pathname.endsWith(".xml") ||
    pathname.endsWith(".ico") ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".jpeg") ||
    pathname.endsWith(".webp") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".txt")
  ) {
    return true;
  }

  // Static files with extensions
  const last = pathname.split("/").pop() ?? "";
  if (last.includes(".")) return true;

  return false;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
