import { supabase } from "@/integrations/supabase/client";

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

export async function fetchUiBundle(lang: string): Promise<BundleResult> {
  const { data, error } = await supabase.rpc("get_ui_bundle", { p_lang: lang });
  if (error) return { bundle: null, reason: error.message };
  if (data === null || typeof data !== "object" || Array.isArray(data)) {
    return { bundle: null, reason: "bundle is not an object" };
  }
  const entries = Object.entries(data as Record<string, unknown>).filter(
    (entry): entry is [string, string] => typeof entry[1] === "string" && entry[1] !== "",
  );
  if (entries.length === 0) return { bundle: null, reason: "bundle is empty" };
  return { bundle: Object.fromEntries(entries), reason: null };
}
