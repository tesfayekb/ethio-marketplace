import { rpc } from "@/lib/supabase-door";
import { errorText } from "@/lib/error-text";

import type { EntityBundleMap } from "./entity";

/**
 * The DB bundle reader (U4b, D3 runtime flip).
 *
 * `get_ui_bundle_parts(lang)` (INC-1023, turn D2) returns the APPROVED rows only, split into
 * `{ written, copied }` by the one authorship predicate (ui_text_written), and is anon-callable
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

export type BundleResult = { bundle: BundleParts; reason: null } | { bundle: null; reason: string };

/** The bundle's two parts (INC-1023): text someone wrote, and text a sync copied. */
export interface BundleParts {
  written: Record<string, string>;
  copied: Record<string, string>;
}

/**
 * INC-1023 — THE ONE MERGE of the database bundle over the compiled catalog.
 * - a written row always wins;
 * - a copied row applies only where the build ships no text for that key
 *   (`shipped` is the build's own text for the active language), so a stale
 *   copy never hides a new build's text;
 * - a language the build does not ship (empty `shipped`) shows its copied rows.
 * CF-I18N-OVERLAY (scripts/conformance/i18n-overlay.test.ts) refuses any other
 * spread of the bundle.
 */
export function overlayBundle<T extends Record<string, string>>(
  base: T,
  parts: BundleParts,
  shipped: Readonly<Record<string, string | undefined>>,
): T {
  const out: Record<string, string> = { ...base };
  for (const [key, value] of Object.entries(parts.copied)) {
    const own = Object.prototype.hasOwnProperty.call(shipped, key) ? shipped[key] : undefined;
    if (typeof own !== "string" || own === "") out[key] = value;
  }
  for (const [key, value] of Object.entries(parts.written)) out[key] = value;
  return out as T;
}

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

/**
 * INC-1023 — the UI bundle's validator carries the answer's SHAPE (`parts1.`), so a
 * cached flat answer from before the parts build never revalidates as the new shape.
 * The location route keeps `bundleEtag` itself; only this answer changed shape.
 */
export const BUNDLE_SHAPE = "parts1";
export function uiBundleEtag(lang: string, version: string): string {
  return bundleEtag(`${BUNDLE_SHAPE}.${lang}`, version);
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
  const { data, error } = await rpc("get_entity_bundle", { p_lang: lang });
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

function stringsOf(value: unknown): Record<string, string> | null {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return null;
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).filter(
      (entry): entry is [string, string] => typeof entry[1] === "string" && entry[1] !== "",
    ),
  );
}

/**
 * A flat (pre-parts) or malformed answer is refused with its reason, so the
 * compiled text stays (D3, F4); empty/blank entries are dropped (INC-095).
 */
export function shapeBundle(data: unknown): BundleResult {
  if (data === null || typeof data !== "object" || Array.isArray(data)) {
    return { bundle: null, reason: "bundle is not an object" };
  }
  const record = data as Record<string, unknown>;
  const written = stringsOf(record["written"]);
  const copied = stringsOf(record["copied"]);
  if (written === null || copied === null) {
    return { bundle: null, reason: "bundle is not the written/copied shape" };
  }
  if (Object.keys(written).length + Object.keys(copied).length === 0) {
    return { bundle: null, reason: "bundle is empty" };
  }
  return { bundle: { written, copied }, reason: null };
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
      `[i18n] bundle route ${lang} unreachable (${errorText(error)}); falling back to rpc`,
    );
  }

  const { data, error } = await rpc("get_ui_bundle_parts", { p_lang: lang });
  if (error) return { bundle: null, reason: error.message };
  return shapeBundle(data);
}
