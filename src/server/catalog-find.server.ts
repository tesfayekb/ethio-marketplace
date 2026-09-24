import { createHash } from "node:crypto";

import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";
import { isE2E } from "@/lib/env-flags";

export const CATALOG_FIND_LIMIT = 120;
export const CATALOG_FIND_TTL_MS = 60_000;
export const CATALOG_FIND_MAX_ROWS = 8;
export const CATALOG_FIND_MAX_BYTES = 2_048;

export type CatalogFindRow = Database["public"]["Functions"]["catalog_find"]["Returns"][number];

interface CacheEntry {
  expiresAt: number;
  rows: CatalogFindRow[];
}

const cache = new Map<string, CacheEntry>();

export function clientAddress(request: Request): string {
  const testKey = request.headers.get("x-e2e-catalog-find-key")?.trim();
  if (isE2E && testKey) return `e2e:${testKey}`;
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return request.headers.get("cf-connecting-ip")?.trim() || forwarded || "unknown";
}

export function hashAddress(address: string): string {
  return createHash("sha256").update(address).digest("hex");
}

function publicClient() {
  const url = process.env["SUPABASE_URL"] ?? "";
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? "";
  if (url === "" || key === "") throw new Error("supabase server env missing");
  return createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });
}

async function adminClient() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

export async function consumeCatalogFindRate(request: Request): Promise<boolean> {
  const client = await adminClient();
  const { data, error } = await client.rpc("consume_catalog_find_rate", {
    p_key: hashAddress(clientAddress(request)),
    p_limit: isE2E ? 2 : CATALOG_FIND_LIMIT,
  });
  if (error) throw new Error(`catalog finder rate: ${error.message}`);
  return (data as { allowed?: unknown } | null)?.allowed === true;
}

export async function catalogFind(query: string, lang: string): Promise<CatalogFindRow[]> {
  const client = publicClient();
  const versionAnswer = await client.rpc("catalog_find_version");
  if (versionAnswer.error)
    throw new Error(`catalog finder version: ${versionAnswer.error.message}`);
  const version = String(versionAnswer.data ?? "");
  const key = `${version}\u0000${lang}\u0000${query.toLocaleLowerCase()}`;
  const held = cache.get(key);
  if (held && held.expiresAt > Date.now()) return held.rows;

  const answer = await client.rpc("catalog_find", { q: query, lang, lim: CATALOG_FIND_MAX_ROWS });
  if (answer.error) throw new Error(`catalog finder: ${answer.error.message}`);
  const rows = answer.data ?? [];
  const bytes = new TextEncoder().encode(JSON.stringify(rows)).byteLength;
  if (rows.length > CATALOG_FIND_MAX_ROWS || bytes > CATALOG_FIND_MAX_BYTES) {
    throw new Error(`catalog finder response exceeds budget: ${rows.length} rows / ${bytes} bytes`);
  }
  cache.set(key, { rows, expiresAt: Date.now() + CATALOG_FIND_TTL_MS });
  if (cache.size > 256) cache.delete(cache.keys().next().value ?? "");
  return rows;
}
