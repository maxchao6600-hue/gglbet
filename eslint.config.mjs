import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // OpenNext / Cloudflare / Wrangler build output (not app source)
    ".open-next/**",
    ".wrangler/**",
    ".wrangler-dry-run/**",
    ".wrangler-dry-run-*/**",
    // One-off CMS scrape / probe dumps (not app source)
    "scripts/_*.js",
    "scripts/*.cjs",
  ]),
]);

export default eslintConfig;
