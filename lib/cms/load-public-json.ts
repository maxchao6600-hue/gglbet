import { readFile } from "node:fs/promises";
import path from "node:path";

type JsonValue = unknown;

const cache = new Map<string, Promise<JsonValue>>();

/**
 * Load CMS snapshot JSON from Workers Static Assets / public/,
 * without statically importing large files into the Worker bundle.
 */
export function loadPublicCmsJson<T = JsonValue>(relativePath: string): Promise<T> {
  const key = relativePath.replace(/^\/+/, "");
  let pending = cache.get(key);
  if (!pending) {
    pending = readPublicCmsJson(key).catch((error) => {
      cache.delete(key);
      throw error;
    });
    cache.set(key, pending);
  }
  return pending as Promise<T>;
}

async function readPublicCmsJson(relativePath: string): Promise<JsonValue> {
  const fromAssets = await tryReadFromCloudflareAssets(relativePath);
  if (fromAssets !== null) return fromAssets;

  const filePath = path.join(process.cwd(), "public", "cms", relativePath);
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw) as JsonValue;
}

async function tryReadFromCloudflareAssets(
  relativePath: string,
): Promise<JsonValue | null> {
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const { env } = await getCloudflareContext({ async: true });
    const assets = (env as { ASSETS?: { fetch: typeof fetch } }).ASSETS;
    if (!assets?.fetch) return null;

    const response = await assets.fetch(
      new Request(`https://assets.local/cms/${relativePath}`),
    );
    if (!response.ok) return null;
    return (await response.json()) as JsonValue;
  } catch {
    return null;
  }
}
