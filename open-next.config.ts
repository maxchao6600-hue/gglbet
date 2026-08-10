/**
 * Phase 4 OpenNext Worker cache config — LEGACY only.
 * Phase 6 public path is `output: "export"` → `out/` → Cloudflare Pages Static Assets.
 * Do not use this for public page serving (avoids Workers Error 1102).
 * Kept for optional `npm run cf-build:legacy` / rollback experiments.
 */
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
