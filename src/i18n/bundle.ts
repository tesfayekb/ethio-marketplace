import { supabase } from "@/integrations/supabase/client";

import type { EntityBundleMap } from "./entity";

/**
 * The DB bundle reader (U4b, D3 runtime flip).
 *
 * `get_ui_bundle(lang)` returns the APPROVED rows only, and is anon-callable
 * because the marketplace is public. A language that is neither public nor the
 * base returns `{}` — which is exactly the fallback case: the caller keeps the
 * compiled catalog. A missing bundle can never blank the UI (D3 fallback law).
 *
 * INC-095: the bundle is an OVERLAY the provider merges on top of the compiled
 * ACTIVE catalog, never a replacement — hence empty/blank entries are dropped
 * here so they can never punch a hole in the layer beneath.
 *
 * Law F4 — never a silent swallow: a failure returns null WITH a reason, and
 * the provider logs one line naming the language.
 */

export type BundleResult =
  | { bundle: Record<string, string>; reason: null }
  | { bundle: null; reason: string };

export type EntityBundleResult =
  | { bundle: EntityBundleMap; reason: null }
  | { bundle: null; reason: string };

/**
 * U4i ④ — THE ETAG DERIVATION, in one place so the route and its unit test can
 * never disagree. `version` is `get_ui_bundle_version(lang)`: an md5 over
 * `max(updated_at) + count` of exactly the rows the bundle contains.
 *
 * The language rides in the tag so two languages can never collide on a shared
 * cache, and the value is a STRONG validator (no `W/` prefix): the payload is
 * byte-identical for a given version, not merely equivalent.
 */
export function bundleEtag(lang: string, version: string): string {
  return `"${lang}.${version === "" ? "unknown" : version}"`;
}

/** The cacheable endpoint the provider reads (U4i ④). */
export function bundleUrl(lang: string): string {
  return `/api/i18n/${encodeURIComponent(lang)}`;
}

/**
 * U4d — the ENTITY bundle reader. Same law as the UI bundle: approved rows
 * only, anon-callable, and a `{}` answer simply means "keep the column/base
 * name" (never a blank label).
 */
export async function fetchEntityBundle(lang: string): Promise<EntityBundleResult> {
  const { data, error } = await supabase.rpc("get_entity_bundle", { p_lang: lang });
  if (error) return { bundle: null, reason: error.message };
  if (data === null || typeof data !== "object" || Array.isArray(data)) {
    return { bundle: null, reason: "entity bundle is not an object" };
  }
  const map: EntityBundleMap = {};
  for (const [type, entities] of Object.entries(data as Record<string, unknown>)) {
    if (entities === null || typeof entities !== "object" || Array.isArray(entities)) continue;
    const byId: Record<string, Record<string, string>> = {};
    for (const [id, fields] of Object.entries(entities as Record<string, unknown>)) {
      if (fields === null || typeof fields !== "object" || Array.isArray(fields)) continue;
      const byField: Record<string, string> = {};
      for (const [field, value] of Object.entries(fields as Record<string, unknown>)) {
        if (typeof value === "string" && value !== "") byField[field] = value;
      }
      if (Object.keys(byField).length > 0) byId[id] = byField;
    }
    if (Object.keys(byId).length > 0) map[type] = byId;
  }
  if (Object.keys(map).length === 0) return { bundle: null, reason: "entity bundle is empty" };
  return { bundle: map, reason: null };
}

function shapeBundle(data: unknown): BundleResult {
  if (data === null || typeof data !== "object" || Array.isArray(data)) {
    return { bundle: null, reason: "bundle is not an object" };
  }
  const entries = Object.entries(data as Record<string, unknown>).filter(
    (entry): entry is [string, string] => typeof entry[1] === "string" && entry[1] !== "",
  );
  if (entries.length === 0) return { bundle: null, reason: "bundle is empty" };
  return { bundle: Object.fromEntries(entries), reason: null };
}

/**
 * U4i ④ — the UI bundle now arrives over the CACHEABLE GET endpoint
 * (`/api/i18n/:lang`, ETag + max-age=300) instead of an uncacheable RPC POST.
 * No `cache: "no-store"` here on purpose: this is the one read that is
 * SUPPOSED to be cached. The gate LIST in the provider keeps its no-store
 * (law I6) — the two reads have opposite requirements.
 *
 * The RPC stays as the fallback path so a route/edge failure degrades to the
 * previous behaviour instead of blanking the overlay (D3), and the fallback is
 * reported, never silent (F4).
 */
export async function fetchUiBundle(lang: string): Promise<BundleResult> {
  try {
    const response = await fetch(bundleUrl(lang), {
      headers: { Accept: "application/json" },
    });
    if (response.ok) {
      const payload = (await response.json()) as { bundle?: unknown };
      return shapeBundle(payload.bundle ?? null);
    }
    console.warn(`[i18n] bundle route ${lang} → ${response.status}; falling back to rpc`);
  } catch (error) {
    console.warn(
      `[i18n] bundle route ${lang} unreachable (${
        error instanceof Error ? error.message : String(error)
      }); falling back to rpc`,
    );
  }

  const { data, error } = await supabase.rpc("get_ui_bundle", { p_lang: lang });
  if (error) return { bundle: null, reason: error.message };
  return shapeBundle(data);
}
