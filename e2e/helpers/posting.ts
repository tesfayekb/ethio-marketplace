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
export async function seedPostableCategory(
  /**
   * U6-C2a — the PRICING FACTS a leaf may carry (DEC-052/067). A test that needs a
   * locked period or a short poster window asks for it here rather than editing a
   * real category (J3: no reference row is ever written).
   */
  facts: {
    defaultPricePeriod?: string;
    pricePeriodLocked?: boolean;
    expiryDays?: number;
    priceEnabled?: boolean;
  } = {},
) {
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
      ...(facts.defaultPricePeriod === undefined
        ? {}
        : { default_price_period: facts.defaultPricePeriod }),
      ...(facts.pricePeriodLocked === undefined
        ? {}
        : { price_period_locked: facts.pricePeriodLocked }),
      ...(facts.expiryDays === undefined ? {} : { expiry_days: facts.expiryDays }),
      ...(facts.priceEnabled === undefined ? {} : { price_enabled: facts.priceEnabled }),
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

/**
 * U6-C1b — A SCRATCH SPECIFICATION SET ON A SCRATCH LEAF.
 *
 * Step 3's form is GENERATED, so proving it needs one definition of each shape it
 * renders — a required text field, a bounded number, an attestation and a picker
 * with its own options. Every row here is namespaced scratch (`e2e_post_…`) and
 * linked only to a scratch leaf: J3 forbids touching a real definition, and a real
 * one could change its options under the test at any time.
 */
export interface ScratchAttr {
  id: string;
  attrKey: string;
}

export async function seedSpecSet(categoryId: string): Promise<{
  text: ScratchAttr;
  number: ScratchAttr;
  bool: ScratchAttr;
  select: ScratchAttr;
  optionValues: string[];
}> {
  const supabase = adminClient();
  const stem = `e2e_post_${RUN}_${process.env["TEST_WORKER_INDEX"] ?? "0"}_${rand()}`;
  const optionValues = [`${stem}_a`, `${stem}_b`];

  const rows = [
    { attr_key: `${stem}_text`, name_en: `${stem} text`, attr_type: "text", max_length: 40 },
    {
      attr_key: `${stem}_number`,
      name_en: `${stem} number`,
      attr_type: "number",
      min_bound: "1",
      max_bound: "9",
      decimals: 0,
      unit: "kg",
    },
    { attr_key: `${stem}_bool`, name_en: `${stem} bool`, attr_type: "boolean" },
    {
      attr_key: `${stem}_select`,
      name_en: `${stem} select`,
      attr_type: "single_select",
      options: optionValues.map((value) => ({
        value,
        label_en: `${value} label`,
        // DEC-050 — the strict option shape and nothing else; an unknown key is a refusal.
        active: true,
      })),
    },
  ];

  const { data, error } = await supabase
    .from("attributes")
    .insert(rows)
    .select("id, attr_key, attr_type");
  if (error || !data) {
    throw new Error(`[e2e:c1b] seeding the spec set failed: ${error?.message ?? "no rows"}`);
  }

  const pick = (suffix: string): ScratchAttr => {
    const row = data.find((entry) => entry.attr_key.endsWith(suffix));
    if (!row) throw new Error(`[e2e:c1b] the ${suffix} definition is missing`);
    return { id: row.id, attrKey: row.attr_key };
  };

  const text = pick("_text");
  const number = pick("_number");
  const bool = pick("_bool");
  const select = pick("_select");

  const { error: linkError } = await supabase.from("category_attribute_links").insert([
    // The text field is the REQUIRED one, so an empty step 3 has something to refuse.
    { category_id: categoryId, attribute_id: text.id, is_required: true, display_order: 1 },
    { category_id: categoryId, attribute_id: number.id, is_required: false, display_order: 2 },
    { category_id: categoryId, attribute_id: bool.id, is_required: false, display_order: 3 },
    { category_id: categoryId, attribute_id: select.id, is_required: false, display_order: 4 },
  ]);
  if (linkError) {
    throw new Error(`[e2e:c1b] linking the spec set failed: ${linkError.message}`);
  }

  return { text, number, bool, select, optionValues };
}

/** Links first, then the definitions — a definition never leaves an orphan link (J3). */
export async function destroySpecSet(attrKeys: string[]): Promise<void> {
  if (attrKeys.length === 0) return;
  const supabase = adminClient();
  const { data } = await supabase.from("attributes").select("id").in("attr_key", attrKeys);
  const ids = (data ?? []).map((row) => row.id);
  if (ids.length === 0) return;
  await supabase.from("category_attribute_links").delete().in("attribute_id", ids);
  const { error } = await supabase.from("attributes").delete().in("id", ids);
  if (error) throw new Error(`[e2e:c1b] destroying the spec set failed: ${error.message}`);
}

/** DB truth: the attributes the door recorded on a draft, normalised by the validator. */
export async function attributesOf(listingId: string): Promise<Record<string, unknown>> {
  const { data, error } = await adminClient()
    .from("listings")
    .select("attributes")
    .eq("id", listingId)
    .maybeSingle();
  if (error) throw new Error(`[e2e:c1b] reading the draft attributes failed: ${error.message}`);
  return (data?.attributes ?? {}) as Record<string, unknown>;
}

/** DB truth: the title and description the door recorded. */
export async function textOf(listingId: string): Promise<{
  title: string | null;
  description: string | null;
}> {
  const { data, error } = await adminClient()
    .from("listings")
    .select("title, description")
    .eq("id", listingId)
    .maybeSingle();
  if (error) throw new Error(`[e2e:c1b] reading the draft text failed: ${error.message}`);
  return { title: data?.title ?? null, description: data?.description ?? null };
}

/** U6-C2a DB truth: what the door actually stored for step 5. */
export async function pricingOf(listingId: string): Promise<{
  mode: string | null;
  amount: number | null;
  currency: string | null;
  period: string | null;
}> {
  const { data, error } = await adminClient()
    .from("listings")
    .select("price_mode,price_amount,price_currency,price_period")
    .eq("id", listingId)
    .maybeSingle();
  if (error) throw new Error(`[e2e:c2a] reading the price failed: ${error.message}`);
  return {
    mode: data?.price_mode ?? null,
    amount:
      data?.price_amount === null || data?.price_amount === undefined
        ? null
        : Number(data.price_amount),
    currency: data?.price_currency ?? null,
    period: data?.price_period ?? null,
  };
}

/** U6-C2a DB truth: the coverage rows the door wrote, and the item's own place. */
export async function coverageOf(listingId: string): Promise<{
  placeIds: string[];
  locationId: string | null;
}> {
  const supabase = adminClient();
  const rows = await supabase
    .from("listing_locations")
    .select("location_id,created_at")
    .eq("listing_id", listingId)
    .order("created_at", { ascending: true });
  if (rows.error) throw new Error(`[e2e:c2a] reading the coverage failed: ${rows.error.message}`);
  const listing = await supabase
    .from("listings")
    .select("location_id")
    .eq("id", listingId)
    .maybeSingle();
  return {
    placeIds: (rows.data ?? []).map((row) => row.location_id),
    locationId: listing.data?.location_id ?? null,
  };
}
