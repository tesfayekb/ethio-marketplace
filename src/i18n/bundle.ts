import { supabase } from "@/integrations/supabase/client";

/**
 * The DB bundle reader (U4b, D3 runtime flip).
 *
 * `get_ui_bundle(lang)` returns the APPROVED rows only, and is anon-callable
 * because the marketplace is public. A language that is neither public nor the
 * base returns `{}` — which is exactly the fallback case: the caller keeps the
 * compiled catalog. A missing bundle can never blank the UI (D3 fallback law).
 *
 * Law F4 — never a silent swallow: a failure returns null WITH a reason, and
 * the provider logs one line naming the language.
 */
export type BundleResult =
  | { bundle: Record<string, string>; reason: null }
  | { bundle: null; reason: string };

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
