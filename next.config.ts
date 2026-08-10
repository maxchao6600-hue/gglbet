import type { NextConfig } from "next";

import { REMOTE_IMAGE_HOSTS } from "@/config/images";

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  {
    // Report-ready baseline CSP. Tighten further when analytics/CDN origins are fixed.
    key: "Content-Security-Policy-Report-Only",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https:",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
] as const;

/**
 * Legacy category paths resolve to the filtered games directory so the
 * catalog stays a single canonical URL.
 */
const GAME_CATEGORY_SLUGS = [
  "slots",
  "live-casino",
  "sports",
  "fishing",
  "lottery",
] as const;

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // Large provider/catalog SSG needs headroom beyond the 60s default.
  staticPageGenerationTimeout: 300,
  images: {
    // Cloudflare Workers: skip /_next/image so PNG/JPG/WebP load as direct URLs.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: REMOTE_IMAGE_HOSTS.map((hostname) => ({
      protocol: "https" as const,
      hostname,
    })),
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [...securityHeaders],
      },
    ];
  },
  async redirects() {
    return [
      ...GAME_CATEGORY_SLUGS.map((category) => ({
        source: `/games/${category}`,
        destination: `/games?category=${category}`,
        permanent: true,
      })),
      ...GAME_CATEGORY_SLUGS.map((category) => ({
        source: `/zh/games/${category}`,
        destination: `/zh/games?category=${category}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;

// OpenNext Cloudflare local bindings for `next dev` (no-op when package absent in CI without CF).
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
void initOpenNextCloudflareForDev();
