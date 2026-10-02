import { createHash } from "node:crypto";

import type { Database } from "@/integrations/supabase/types";
import { isE2E } from "@/lib/env-flags";

export const CATALOG_FIND_LIMIT = 120;
export const CATALOG_FIND_TTL_MS = 60_000;
export const CATALOG_FIND_MAX_ROWS = 8;
export const CATALOG_FIND_MAX_BYTES = 2_048;

export type CatalogFindRow = Database["public"]["Functions"]["catalog_find"]["Returns"][number];

export interface CatalogFindTiming {
  version: number;
  find: number;
  rebuild: number;
}

export interface CatalogFindAnswer {
  rows: CatalogFindRow[];
  timing: CatalogFindTiming;
}

export function clientAddress(request: Request): string {
  const testKey = request.headers.get("x-e2e-catalog-find-key")?.trim();
  if (isE2E && testKey) return `e2e:${testKey}`;
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return request.headers.get("cf-connecting-ip")?.trim() || forwarded || "unknown";
}

export function hashAddress(address: string): string {
  return createHash("sha256").update(address).digest("hex");
}

async function adminClient() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

export function withinBudget(rows: CatalogFindRow[]): CatalogFindRow[] {
  const kept = rows.slice(0, CATALOG_FIND_MAX_ROWS);
  const encoder = new TextEncoder();
  while (
    kept.length > 1 &&
    encoder.encode(JSON.stringify(kept)).byteLength > CATALOG_FIND_MAX_BYTES
  ) {
    kept.pop();
  }
  return kept;
}

/**
 * S2 — one round trip per search: `catalog_search` runs the rate check, reads
 * the catalogue version and answers from the CURRENT index in one call. It
 * never rebuilds (INC-273); rebuilds happen after a catalogue commit
 * (`refreshCatalogFindAfterCommit`) or in the hourly sweep.
 */
export async function catalogSearch(
  request: Request,
  query: string,
  lang: string,
): Promise<CatalogFindAnswer | null> {
  const client = await adminClient();
  const started = performance.now();
  const { data, error } = await client.rpc("catalog_search", {
    q: query,
    lang,
    lim: CATALOG_FIND_MAX_ROWS,
    p_rate_key: hashAddress(clientAddress(request)),
    p_rate_limit: isE2E ? 2 : CATALOG_FIND_LIMIT,
  });
  if (error) throw new Error(`catalog search: ${error.message}`);
  const searchMs = performance.now() - started;
  const answer = (data ?? {}) as { allowed?: unknown; rows?: unknown };
  if (answer.allowed !== true) return null;
  const rows = withinBudget(Array.isArray(answer.rows) ? (answer.rows as CatalogFindRow[]) : []);
  return { rows, timing: { version: 0, find: searchMs, rebuild: 0 } };
}

/**
 * Called ONCE by a server path after its catalogue commit has returned — never
 * inside that transaction. A failed refresh is logged; the commit stands and
 * the hourly sweep catches the index up.
 */
export async function refreshCatalogFindAfterCommit(path: string): Promise<void> {
  try {
    const client = await adminClient();
    const { error } = await client.rpc("catalog_find_refresh", { p_force: false });
    if (error) console.error(`[ssr-error] ${path} catalog_find_refresh: ${error.message}`);
  } catch (error) {
    console.error(`[ssr-error] ${path} catalog_find_refresh: ${String(error)}`);
  }
}
