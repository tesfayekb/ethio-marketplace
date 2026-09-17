import { expect, type Page } from "@playwright/test";

import { adminClient } from "./users";

/**
 * U6-A2-C — THE POSTING ROUTES' FIXTURES (J1–J9).
 *
 * Everything here is NAMESPACED scratch (`e2e-post-…`, run × shard × worker) and
 * destroyed by the caller in a hook that survives a timeout. No reference row is
 * written: the postable category is minted, the place is an EXISTING active city
 * read as DB truth, and the sellers come from `createUser` (their own identity, so
 * no sibling test's account is touched).
 */

export const RUN = process.env["E2E_SHARD"] ?? "local";

export function rand(): string {
  return Math.random().toString(36).slice(2, 8);
}

export function scratchCategorySlug(): string {
  return `e2e-post-${RUN}-${process.env["TEST_WORKER_INDEX"] ?? "0"}-${rand()}`;
}

/** The bearer the browser holds — the routes' only authority (F3). */
export async function bearerOf(page: Page): Promise<string> {
  const token = await page.evaluate(async () => {
    const client = (
      window as unknown as {
        __ethioSupabase: {
          auth: {
            getSession: () => Promise<{ data: { session: { access_token: string } | null } }>;
          };
        };
      }
    ).__ethioSupabase;
    const { data } = await client.auth.getSession();
    return data.session?.access_token ?? "";
  });
  expect(token, "[e2e:a2c] the page carries no bearer").not.toBe("");
  return token;
}

export interface RouteAnswer {
  status: number;
  payload: Record<string, unknown>;
}

/** One POST to a posting route, with the bearer and the EDGE's country header. */
export async function postRoute(
  page: Page,
  path: string,
  body: Record<string, unknown>,
  options: { token?: string | null; country?: string } = {},
): Promise<RouteAnswer> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (options.token) headers["Authorization"] = `Bearer ${options.token}`;
  // DEC-068 — the residency fact comes from the EDGE, so the test speaks as the
  // edge does (`cf-ipcountry`) and never as the body.
  if (options.country) headers["cf-ipcountry"] = options.country;
  const response = await page.request.post(path, { headers, data: body });
  let payload: Record<string, unknown> = {};
  try {
    payload = (await response.json()) as Record<string, unknown>;
  } catch {
    payload = {};
  }
  return { status: response.status(), payload };
}

/** The refusal reasons a door answer carries, in order (structure, never English). */
export function reasonsOf(payload: Record<string, unknown>): { field: string; reason: string }[] {
  const list = Array.isArray(payload["refusals"]) ? payload["refusals"] : [];
  return list.map((entry) => {
    const row = (entry ?? {}) as Record<string, unknown>;
    return { field: String(row["field"] ?? ""), reason: String(row["reason"] ?? "") };
  });
}

/** A POSTABLE LEAF category: active, listings allowed, no children, not catch-all. */
export async function seedPostableCategory() {
  const slug = scratchCategorySlug();
  const { data, error } = await adminClient()
    .from("categories")
    .insert({
      slug,
      name_en: slug,
      is_active: true,
      allow_listings: true,
      is_catchall: false,
      display_order: 9000,
    })
    .select("id, slug")
    .single();
  if (error || !data) {
    throw new Error(
      `[e2e:a2c] seeding the postable category failed: ${error?.message ?? "no row"}`,
    );
  }
  return data;
}

export async function destroyPostableCategory(slug: string): Promise<void> {
  const supabase = adminClient();
  const { data } = await supabase.from("categories").select("id").eq("slug", slug).maybeSingle();
  if (!data) return;
  await supabase.from("listings").delete().eq("category_id", data.id);
  await supabase.from("categories").delete().eq("id", data.id);
}

/** An EXISTING active city of a market, read as DB truth — never written. */
export async function activeCityOf(countryCode: string) {
  const { data, error } = await adminClient()
    .from("locations")
    .select("id, slug, country_code")
    .eq("country_code", countryCode)
    .eq("level", "city")
    .eq("is_active", true)
    .limit(1)
    .maybeSingle();
  if (error) throw new Error(`[e2e:a2c] reading a city of ${countryCode} failed: ${error.message}`);
  if (!data) throw new Error(`[e2e:a2c] ${countryCode} has no active city to post into`);
  return data;
}

/** DB truth: the observed residency fact the draft route may set exactly once. */
export async function observedCountryOf(userId: string): Promise<string | null> {
  const { data, error } = await adminClient()
    .from("user_directory")
    .select("observed_country_code")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw new Error(`[e2e:a2c] reading residency failed: ${error.message}`);
  return data?.observed_country_code ?? null;
}

/** DB truth: a listing's status, which no owner door may ever set to `active`. */
export async function statusOf(listingId: string): Promise<string | null> {
  const { data, error } = await adminClient()
    .from("listings")
    .select("status")
    .eq("id", listingId)
    .maybeSingle();
  if (error) throw new Error(`[e2e:a2c] reading the listing failed: ${error.message}`);
  return data?.status ?? null;
}

/** Deletes every listing a scratch seller made — the seller pool is reaped elsewhere. */
export async function destroyListingsOf(sellerId: string): Promise<void> {
  await adminClient().from("listings").delete().eq("seller_id", sellerId);
}

/** An attribute definition to read options for; reference data, never written. */
export async function anyAttributeId(): Promise<string> {
  const { data, error } = await adminClient()
    .from("attributes")
    .select("id")
    .limit(1)
    .maybeSingle();
  if (error) throw new Error(`[e2e:a2c] reading an attribute failed: ${error.message}`);
  if (!data) throw new Error("[e2e:a2c] the catalogue holds no attribute definition");
  return data.id;
}

/** The body of a COMPLETE step-8 draft, the shape the door accepts (A2-M P10d). */
export function completeDraft(params: {
  listingId?: string | null;
  categoryId: string;
  cityId: string;
  title: string;
}): Record<string, unknown> {
  return {
    listingId: params.listingId ?? null,
    step: 8,
    categoryId: params.categoryId,
    title: params.title,
    description: "e2e posting-routes draft body",
    attributes: {},
    priceMode: "fixed",
    priceAmount: 100,
    priceCurrency: "ETB",
    pricePeriod: "once",
    coverage: [params.cityId],
    contactPref: { messages: true },
  };
}

/**
 * U6-C1a — A FOLDER WITH ONE POSTABLE LEAF UNDER IT.
 *
 * D11 needs both shapes to be provable: a folder is browsable and NEVER
 * selectable, and only the leaf below it can be chosen. Both rows are namespaced
 * scratch and are destroyed pointers-first by `destroyCategoryBranch`.
 */
export async function seedCategoryBranch() {
  const supabase = adminClient();
  const parentSlug = scratchCategorySlug();
  const leafSlug = scratchCategorySlug();

  const { data: parent, error: parentError } = await supabase
    .from("categories")
    .insert({
      slug: parentSlug,
      name_en: parentSlug,
      is_active: true,
      // A FOLDER: listings are not allowed here, so the wizard may only drill in.
      allow_listings: false,
      is_catchall: false,
      display_order: 9100,
    })
    .select("id, slug")
    .single();
  if (parentError || !parent) {
    throw new Error(`[e2e:c1a] seeding the folder failed: ${parentError?.message ?? "no row"}`);
  }

  const { data: leaf, error: leafError } = await supabase
    .from("categories")
    .insert({
      slug: leafSlug,
      name_en: leafSlug,
      is_active: true,
      allow_listings: true,
      is_catchall: false,
      display_order: 9101,
    })
    .select("id, slug")
    .single();
  if (leafError || !leaf) {
    throw new Error(`[e2e:c1a] seeding the leaf failed: ${leafError?.message ?? "no row"}`);
  }

  const { error: pointerError } = await supabase
    .from("category_tree_pointers")
    .insert({ parent_id: parent.id, child_id: leaf.id, display_order: 1 });
  if (pointerError) {
    throw new Error(`[e2e:c1a] linking the branch failed: ${pointerError.message}`);
  }

  return { parent, leaf };
}

/** Pointers first, then the rows — a branch never leaves an orphan edge (J3). */
export async function destroyCategoryBranch(slugs: string[]): Promise<void> {
  const supabase = adminClient();
  const { data } = await supabase.from("categories").select("id").in("slug", slugs);
  const ids = (data ?? []).map((row) => row.id);
  if (ids.length === 0) return;
  await supabase.from("category_tree_pointers").delete().in("child_id", ids);
  await supabase.from("category_tree_pointers").delete().in("parent_id", ids);
  await supabase.from("listings").delete().in("category_id", ids);
  await supabase.from("categories").delete().in("id", ids);
}

/** DB truth: the draft the wizard created for this seller, if any. */
export async function draftsOf(sellerId: string) {
  const { data, error } = await adminClient()
    .from("listings")
    .select("id, category_id, draft_step, status")
    .eq("seller_id", sellerId)
    .order("created_at", { ascending: true });
  if (error) throw new Error(`[e2e:c1a] reading the seller's drafts failed: ${error.message}`);
  return data ?? [];
}
