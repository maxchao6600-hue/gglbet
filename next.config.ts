import type { NextConfig } from "next";

import { REMOTE_IMAGE_HOSTS } from "@/config/images";

/**
 * Phase 6 — true static export for Cloudflare Pages Static Assets.
 * Security headers / redirects live in public/_headers and public/_redirects
 * (next.config headers()/redirects() are incompatible with output: "export").
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // Large provider/catalog SSG needs headroom beyond the 60s default.
  staticPageGenerationTimeout: 300,
  images: {
    // Static export: no /_next/image optimizer — load PNG/JPG/WebP as direct URLs.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: REMOTE_IMAGE_HOSTS.map((hostname) => ({
      protocol: "https" as const,
      hostname,
    })),
  },
};

export default nextConfig;
