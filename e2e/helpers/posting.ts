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
export async function seedCategoryBranch(options: { parentImageUrl?: string } = {}) {
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
      // U6-C1-R2 — the ANCESTOR's illustration: the stand-in a leaf without one
      // of its own must inherit (PW-4).
      ...(options.parentImageUrl === undefined ? {} : { image_url: options.parentImageUrl }),
    })
    .select("id, slug, image_url")
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
    .select("id, category_id, draft_step, status, attributes")
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
  /** The definition's own label — what a screen shows, and what a test reads. */
  nameEn: string;
}

export async function seedSpecSet(categoryId: string): Promise<{
  text: ScratchAttr;
  number: ScratchAttr;
  bool: ScratchAttr;
  select: ScratchAttr;
  multi: ScratchAttr;
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
      unit: "km",
    },
    { attr_key: `${stem}_bool`, name_en: `${stem} bool`, attr_type: "boolean" },
    {
      attr_key: `${stem}_select`,
      name_en: `${stem} select`,
      name_am: `${stem} ምርጫ`,
      attr_type: "single_select",
      options: optionValues.map((value) => ({
        value,
        label_en: `${value} label`,
        label_am: `${value} ምልክት`,
        // DEC-050 — the strict option shape and nothing else; an unknown key is a refusal.
        active: true,
      })),
    },
    {
      attr_key: `${stem}_multi`,
      name_en: `${stem} multi`,
      name_am: `${stem} ብዙ`,
      attr_type: "multi_select",
      options: optionValues.map((value) => ({
        value,
        label_en: `${value} label`,
        label_am: `${value} ምልክት`,
        active: true,
      })),
    },
  ];

  const { data, error } = await supabase
    .from("attributes")
    .insert(rows)
    .select("id, attr_key, attr_type, name_en");
  if (error || !data) {
    throw new Error(`[e2e:c1b] seeding the spec set failed: ${error?.message ?? "no rows"}`);
  }

  const pick = (suffix: string): ScratchAttr => {
    const row = data.find((entry) => entry.attr_key.endsWith(suffix));
    if (!row) throw new Error(`[e2e:c1b] the ${suffix} definition is missing`);
    return { id: row.id, attrKey: row.attr_key, nameEn: row.name_en };
  };

  const text = pick("_text");
  const number = pick("_number");
  const bool = pick("_bool");
  const select = pick("_select");
  const multi = pick("_multi");

  const { error: linkError } = await supabase.from("category_attribute_links").insert([
    // The text field is the REQUIRED one, so an empty step 3 has something to refuse.
    { category_id: categoryId, attribute_id: text.id, is_required: true, display_order: 1 },
    { category_id: categoryId, attribute_id: number.id, is_required: false, display_order: 2 },
    { category_id: categoryId, attribute_id: bool.id, is_required: false, display_order: 3 },
    { category_id: categoryId, attribute_id: select.id, is_required: false, display_order: 4 },
    { category_id: categoryId, attribute_id: multi.id, is_required: false, display_order: 5 },
  ]);
  if (linkError) {
    throw new Error(`[e2e:c1b] linking the spec set failed: ${linkError.message}`);
  }

  return { text, number, bool, select, multi, optionValues };
}

/**
 * U6-C1-R3a-2 — A SCRATCH FOLD SET: a parent picker, a child whose options hang
 * under it (DEC-050 `parent`), a number the child's FACTS speak about (D18), and a
 * picker narrowed per link by `allowed_options` with a `default_value`
 * (M-MAINT-2 §12). One seed proves folds, facts, fact bounds, the link's subset
 * and its default — all on scratch rows under a scratch leaf (J3).
 */
export interface FoldSet {
  make: ScratchAttr;
  model: ScratchAttr;
  year: ScratchAttr;
  unit: ScratchAttr;
  /** D27 — an ATTESTATION a model's facts speak about, and may never tick. */
  dual: ScratchAttr;
  makeValues: [string, string];
  /** Two models under the FIRST make, one under the second. */
  modelValues: [string, string, string];
  unitValues: [string, string, string];
  /** The fact bound the first model carries for the year field. */
  modelYearFloor: number;
  /** The year the second model prefills. */
  modelYearValue: number;
  /**
   * INC-242 — A BOUND FROM A SIBLING, not a parent. The unit picker's opening
   * option also speaks about the year, although the year hangs under nothing at
   * all: a bound belongs to whatever option carries it.
   */
  unitYearFloor: number;
  attrKeys: string[];
}

export async function seedFoldSet(categoryId: string): Promise<FoldSet> {
  const supabase = adminClient();
  const stem = `e2e_fold_${RUN}_${process.env["TEST_WORKER_INDEX"] ?? "0"}_${rand()}`;
  const yearKey = `${stem}_year`;
  const dualKey = `${stem}_dual`;
  const makeValues: [string, string] = [`${stem}_mk1`, `${stem}_mk2`];
  const modelValues: [string, string, string] = [`${stem}_md1`, `${stem}_md2`, `${stem}_md3`];
  const unitValues: [string, string, string] = [`${stem}_pc`, `${stem}_set`, `${stem}_jug`];
  const modelYearFloor = 1968;
  const modelYearValue = 1999;
  // INC-242 — a floor carried by a SIBLING's option, above the definition's own.
  const unitYearFloor = 1975;

  /**
   * U6-C1-R3b-1 STEP 1a — THE FIXTURE WRITES THE SHAPE THE CONSOLE WRITES.
   *
   * DEC-050's option record allows exactly nine keys (`value, label_en,
   * label_am, parent, active, bounds, aliases, allowed, facts`). A fixture that
   * invents a tenth is a fixture the platform's own export/import round trip can
   * never carry (AT-20), so the allowlist is asserted HERE, where the row is
   * born, instead of being discovered at a door three specs away.
   */
  const OPTION_KEYS = [
    "value",
    "label_en",
    "label_am",
    "parent",
    "active",
    "bounds",
    "aliases",
    "allowed",
    "facts",
  ];
  const option = (value: string, extra: Record<string, unknown> = {}) => {
    const stray = Object.keys(extra).filter((name) => !OPTION_KEYS.includes(name));
    if (stray.length > 0) {
      throw new Error(`[e2e:fold] option ${value} carries non-DEC-050 keys: ${stray.join(", ")}`);
    }
    return {
      value,
      label_en: `${value} label`,
      label_am: `${value} ምልክት`,
      active: true,
      ...extra,
    };
  };

  const rows = [
    {
      attr_key: `${stem}_make`,
      name_en: `${stem} make`,
      attr_type: "single_select",
      options: makeValues.map((value) => option(value)),
    },
    {
      attr_key: `${stem}_model`,
      name_en: `${stem} model`,
      attr_type: "single_select",
      options: [
        // A FACT THAT IS A BOUND: this model was not made before 1968.
        option(modelValues[0], {
          parent: makeValues[0],
          facts: { [yearKey]: { min: modelYearFloor } },
        }),
        // A FACT THAT IS A VALUE: the year is known, and the form says so.
        // D27 — and a fact about an ATTESTATION, which may only ever be a HINT.
        option(modelValues[1], {
          parent: makeValues[0],
          facts: { [yearKey]: modelYearValue, [dualKey]: true },
        }),
        option(modelValues[2], { parent: makeValues[1] }),
      ],
    },
    {
      attr_key: yearKey,
      name_en: `${stem} year`,
      attr_type: "number",
      min_bound: "1900",
      max_bound: "2030",
      decimals: 0,
      // U6-C1-R3b-3a STEP 2 — a year is a BOUNDED PICKER on the form, so the
      // fixture declares the format the door already allows for one.
      format: "year",
    },
    { attr_key: dualKey, name_en: `${stem} dual`, attr_type: "boolean" },
    {
      attr_key: `${stem}_unit`,
      name_en: `${stem} unit`,
      attr_type: "single_select",
      options: unitValues.map((value, index) =>
        // INC-242 — the OPENING unit speaks about the year although the year
        // hangs under nothing: the bound must still reach the picker.
        index === 0
          ? option(value, { facts: { [yearKey]: { min: unitYearFloor } } })
          : option(value),
      ),
    },
  ];

  const { data, error } = await supabase
    .from("attributes")
    .insert(rows)
    .select("id, attr_key, name_en");
  if (error || !data) {
    throw new Error(`[e2e:r3a2] seeding the fold set failed: ${error?.message ?? "no rows"}`);
  }
  const pick = (suffix: string): ScratchAttr => {
    const row = data.find((entry) => entry.attr_key.endsWith(suffix));
    if (!row) throw new Error(`[e2e:r3a2] the ${suffix} definition is missing`);
    return { id: row.id, attrKey: row.attr_key, nameEn: row.name_en };
  };
  const make = pick("_make");
  const model = pick("_model");
  const year = pick("_year");
  const unit = pick("_unit");
  const dual = pick("_dual");

  const { error: linkError } = await supabase.from("category_attribute_links").insert([
    { category_id: categoryId, attribute_id: make.id, is_required: false, display_order: 1 },
    { category_id: categoryId, attribute_id: dual.id, is_required: false, display_order: 5 },
    { category_id: categoryId, attribute_id: model.id, is_required: false, display_order: 2 },
    { category_id: categoryId, attribute_id: year.id, is_required: false, display_order: 3 },
    {
      category_id: categoryId,
      attribute_id: unit.id,
      is_required: false,
      display_order: 4,
      // M-MAINT-2 §12 — this category accepts two of the three units, and opens on one.
      allowed_options: [unitValues[0], unitValues[1]],
      default_value: unitValues[0],
    },
  ]);
  if (linkError) throw new Error(`[e2e:r3a2] linking the fold set failed: ${linkError.message}`);

  return {
    make,
    model,
    year,
    unit,
    dual,
    makeValues,
    modelValues,
    unitValues,
    modelYearFloor,
    modelYearValue,
    unitYearFloor,
    attrKeys: [make.attrKey, model.attrKey, year.attrKey, unit.attrKey, dual.attrKey],
  };
}

/**
 * INC-247 — THE REAL SHAPE, NOT A CONVENIENT ONE.
 *
 * The catalogue's own vehicles shape has three properties the flat fold set above
 * does not, and every one of them was a place a bound could get lost:
 *
 *   1 the YEAR is linked at the SECTION and only INHERITED by the leaf
 *     (`effective_category_links`), so the field on screen does not come from the
 *     leaf's own links at all;
 *   2 the fold is THREE levels deep — brand → series → model — so the option that
 *     carries the bound sits two levels below the first answer;
 *   3 the bound is written the way the attributes FILE writes it, as TEXT, and one
 *     model is a single-year model (`min = max`).
 *
 * One seed, both cases: `pinModel` pins the year to exactly one value, `floorModel`
 * carries a floor alone.
 */
export interface DeepFoldSet {
  brand: ScratchAttr;
  series: ScratchAttr;
  model: ScratchAttr;
  year: ScratchAttr;
  brandValue: string;
  seriesValue: string;
  /** The model whose fact pins the year to one value (min = max). */
  pinModel: string;
  /** The model whose fact carries a floor only. */
  floorModel: string;
  pinnedYear: number;
  floorYear: number;
  attrKeys: string[];
}

export async function seedDeepFoldSet(params: {
  /** The leaf the seller posts in: brand, series and model are linked here. */
  leafId: string;
  /** The SECTION above it: the year is linked here and inherited by the leaf. */
  sectionId: string;
}): Promise<DeepFoldSet> {
  const supabase = adminClient();
  const stem = `e2e_deep_${RUN}_${process.env["TEST_WORKER_INDEX"] ?? "0"}_${rand()}`;
  const yearKey = `${stem}_year`;
  const brandValue = `${stem}_br1`;
  const seriesValue = `${stem}_se1`;
  const pinModel = `${stem}_md_pin`;
  const floorModel = `${stem}_md_floor`;
  const pinnedYear = 2014;
  const floorYear = 2008;

  const option = (value: string, extra: Record<string, unknown> = {}) => ({
    value,
    label_en: `${value} label`,
    label_am: `${value} ምልክት`,
    active: true,
    ...extra,
  });

  const rows = [
    {
      attr_key: `${stem}_brand`,
      name_en: `${stem} brand`,
      attr_type: "single_select",
      options: [option(brandValue), option(`${stem}_br2`)],
    },
    {
      attr_key: `${stem}_series`,
      name_en: `${stem} series`,
      attr_type: "single_select",
      options: [option(seriesValue, { parent: brandValue })],
    },
    {
      attr_key: `${stem}_model`,
      name_en: `${stem} model`,
      attr_type: "single_select",
      options: [
        /**
         * R-SW / INC-249 — THE SHAPE THE CATALOGUE ACTUALLY SERVES. Copied
         * verbatim from the published site's own payload for `model-cars`
         * (BYD Han: `"bounds": {"year": {"min": 2020}}`, beside `facts`), because
         * the earlier fixture nested the bound INSIDE `facts` — a shape the
         * curated catalogue never writes — and so PW-25 passed while every real
         * model's floor was ignored on production.
         *
         * A SINGLE-YEAR MODEL: the bound pins the year, as text, as the file writes it.
         */
        option(pinModel, {
          parent: seriesValue,
          bounds: { [yearKey]: { min: String(pinnedYear), max: String(pinnedYear) } },
        }),
        option(floorModel, {
          parent: seriesValue,
          bounds: { [yearKey]: { min: String(floorYear) } },
        }),
      ],
    },
    {
      attr_key: yearKey,
      name_en: `${stem} year`,
      attr_type: "number",
      min_bound: "1900",
      max_bound: "2030",
      decimals: 0,
      format: "year",
    },
  ];

  const { data, error } = await supabase
    .from("attributes")
    .insert(rows)
    .select("id, attr_key, name_en");
  if (error || !data) {
    throw new Error(`[e2e:r-year] seeding the deep fold failed: ${error?.message ?? "no rows"}`);
  }
  const pick = (suffix: string): ScratchAttr => {
    const row = data.find((entry) => entry.attr_key.endsWith(suffix));
    if (!row) throw new Error(`[e2e:r-year] the ${suffix} definition is missing`);
    return { id: row.id, attrKey: row.attr_key, nameEn: row.name_en };
  };
  const brand = pick("_brand");
  const series = pick("_series");
  const model = pick("_model");
  const year = pick("_year");

  const { error: linkError } = await supabase.from("category_attribute_links").insert([
    { category_id: params.leafId, attribute_id: brand.id, is_required: false, display_order: 1 },
    { category_id: params.leafId, attribute_id: series.id, is_required: false, display_order: 2 },
    { category_id: params.leafId, attribute_id: model.id, is_required: false, display_order: 3 },
    // THE INHERITED FIELD: linked at the section, never at the leaf.
    { category_id: params.sectionId, attribute_id: year.id, is_required: false, display_order: 4 },
  ]);
  if (linkError) throw new Error(`[e2e:r-year] linking the deep fold failed: ${linkError.message}`);

  return {
    brand,
    series,
    model,
    year,
    brandValue,
    seriesValue,
    pinModel,
    floorModel,
    pinnedYear,
    floorYear,
    attrKeys: [brand.attrKey, series.attrKey, model.attrKey, year.attrKey],
  };
}

/**
 * D26 / INC-259 — A SCRATCH COLOUR DETAIL. The DEFINITION is namespaced per run,
 * worker and project (J1). It carries both bare catalogue colour words and the
 * parent-prefixed shape (`dog_black`, `cat_tabby`) that triggered the incident.
 * The unrelated row proves the tray is suppressed when no option resolves.
 */
export interface ColourSet {
  colour: ScratchAttr;
  plain: ScratchAttr;
  /** A bare value with ink, a prefixed solid, a prefixed pattern, and no swatch. */
  inked: string;
  prefixed: string;
  pattern: string;
  unresolved: string;
  attrKeys: string[];
}

export async function seedColourSet(categoryId: string): Promise<ColourSet> {
  const supabase = adminClient();
  const stem = `e2e_colour_${RUN}_${process.env["TEST_WORKER_INDEX"] ?? "0"}_${rand()}`;
  const inked = "black";
  const prefixed = "dog_black";
  const pattern = "cat_tabby";
  const unresolved = `${stem}_unmapped`;
  const option = (value: string) => ({
    value,
    label_en: `${value} label`,
    label_am: `${value} ምልክት`,
    active: true,
  });
  const { data, error } = await supabase
    .from("attributes")
    .insert([
      {
        attr_key: `${stem}_colour`,
        name_en: `${stem} colour`,
        name_am: `${stem} ቀለም`,
        attr_type: "single_select",
        options: [option(inked), option("white"), option(prefixed), option(pattern)],
      },
      {
        attr_key: `${stem}_plain_colour`,
        name_en: `${stem} plain colour`,
        name_am: `${stem} ቀለም ባዶ`,
        attr_type: "single_select",
        options: [option(unresolved)],
      },
    ])
    .select("id, attr_key, name_en");
  if (error || !data) {
    throw new Error(`[e2e:d26] seeding the colour set failed: ${error?.message ?? "no rows"}`);
  }
  const pick = (suffix: string): ScratchAttr => {
    const row = data.find((entry) => entry.attr_key.endsWith(suffix));
    if (!row) throw new Error(`[e2e:d26] the ${suffix} definition is missing`);
    return { id: row.id, attrKey: row.attr_key, nameEn: row.name_en };
  };
  const colour = pick("_colour");
  const plain = pick("_plain_colour");
  const { error: linkError } = await supabase.from("category_attribute_links").insert([
    { category_id: categoryId, attribute_id: colour.id, is_required: false, display_order: 1 },
    { category_id: categoryId, attribute_id: plain.id, is_required: false, display_order: 2 },
  ]);
  if (linkError) throw new Error(`[e2e:d26] linking the colour set failed: ${linkError.message}`);
  return {
    colour,
    plain,
    inked,
    prefixed,
    pattern,
    unresolved,
    attrKeys: [colour.attrKey, plain.attrKey],
  };
}

/**
 * D28 / M-SWATCH — A SCRATCH COLOUR DETAIL THAT SAYS ITS OWN COLOURS.
 *
 * Every value here is DELIBERATELY not a colour word, so nothing can be guessed
 * from the name: the only thing that can paint these tiles is the option's own
 * declared `swatch` cell — one hex, two hexes, or `pattern:<name>`. The set is
 * namespaced per run, worker and project (J1) and deleted by the caller.
 */
export interface SwatchSet {
  colour: ScratchAttr;
  solid: string;
  duo: string;
  patterned: string;
  bare: string;
  attrKeys: string[];
}

export async function seedSwatchSet(categoryId: string): Promise<SwatchSet> {
  const supabase = adminClient();
  const stem = `e2e_swatch_${RUN}_${process.env["TEST_WORKER_INDEX"] ?? "0"}_${rand()}`;
  const solid = `${stem}_one`;
  const duo = `${stem}_two`;
  const patterned = `${stem}_pat`;
  const bare = `${stem}_bare`;
  const option = (value: string, swatch?: string) => ({
    value,
    label_en: `${value} label`,
    label_am: `${value} ምልክት`,
    active: true,
    ...(swatch === undefined ? {} : { swatch }),
  });
  const { data, error } = await supabase
    .from("attributes")
    .insert({
      attr_key: `${stem}_colour`,
      name_en: `${stem} colour`,
      name_am: `${stem} ቀለም`,
      attr_type: "single_select",
      options: [
        option(solid, "#111111"),
        option(duo, "#111111|#ffffff"),
        option(patterned, "pattern:tabby"),
        option(bare),
      ],
    })
    .select("id, attr_key, name_en")
    .single();
  if (error || !data) {
    throw new Error(`[e2e:d28] seeding the swatch set failed: ${error?.message ?? "no row"}`);
  }
  const colour: ScratchAttr = { id: data.id, attrKey: data.attr_key, nameEn: data.name_en };
  const { error: linkError } = await supabase.from("category_attribute_links").insert({
    category_id: categoryId,
    attribute_id: colour.id,
    is_required: false,
    display_order: 1,
  });
  if (linkError) throw new Error(`[e2e:d28] linking the swatch set failed: ${linkError.message}`);
  return { colour, solid, duo, patterned, bare, attrKeys: [colour.attrKey] };
}

/**
 * D24 — A CONDITIONAL PAIR: a fuel detail, and a charging detail the category
 * asks for ONLY when the fuel is electric. Both rows are scratch (J1/J3), the
 * condition is written on the LINK exactly as the door's checker shapes it.
 */
export interface ConditionalSet {
  fuel: ScratchAttr;
  charging: ScratchAttr;
  fuelValues: { petrol: string; electric: string };
  chargingValue: string;
  attrKeys: string[];
}

export async function seedConditionalSet(categoryId: string): Promise<ConditionalSet> {
  const supabase = adminClient();
  const stem = `e2e_cond_${RUN}_${process.env["TEST_WORKER_INDEX"] ?? "0"}_${rand()}`;
  const petrol = `${stem}_petrol`;
  const electric = `${stem}_electric`;
  const plug = `${stem}_plug`;
  const option = (value: string) => ({
    value,
    label_en: `${value} label`,
    label_am: `${value} ምልክት`,
    active: true,
  });

  const { data, error } = await supabase
    .from("attributes")
    .insert([
      {
        attr_key: `${stem}_fuel`,
        name_en: `${stem} fuel`,
        attr_type: "single_select",
        options: [option(petrol), option(electric)],
      },
      {
        attr_key: `${stem}_charging`,
        name_en: `${stem} charging`,
        attr_type: "single_select",
        options: [option(plug)],
      },
    ])
    .select("id, attr_key, name_en");
  if (error || !data) {
    throw new Error(
      `[e2e:r3b2] seeding the conditional set failed: ${error?.message ?? "no rows"}`,
    );
  }
  const pick = (suffix: string): ScratchAttr => {
    const row = data.find((entry) => entry.attr_key.endsWith(suffix));
    if (!row) throw new Error(`[e2e:r3b2] the ${suffix} definition is missing`);
    return { id: row.id, attrKey: row.attr_key, nameEn: row.name_en };
  };
  const fuel = pick("_fuel");
  const charging = pick("_charging");

  const { error: linkError } = await supabase.from("category_attribute_links").insert([
    { category_id: categoryId, attribute_id: fuel.id, is_required: false, display_order: 1 },
    {
      category_id: categoryId,
      attribute_id: charging.id,
      // D24 — required, but only when it is ASKED: the validator treats an unmet
      // link as absent, so `petrol` never owes an answer here.
      is_required: true,
      display_order: 2,
      visible_when: { key: fuel.attrKey, in: [electric] },
    },
  ]);
  if (linkError) {
    throw new Error(`[e2e:r3b2] linking the conditional set failed: ${linkError.message}`);
  }

  return {
    fuel,
    charging,
    fuelValues: { petrol, electric },
    chargingValue: plug,
    attrKeys: [fuel.attrKey, charging.attrKey],
  };
}

/**
 * INC-257 — A FACT WHOSE TARGET THE SAME CHOICE UNHIDES (the Treadmill shape).
 *
 * Three scratch definitions, the real catalogue's own arrangement:
 *   · a TYPE, whose first option carries the fact `power = electric`,
 *   · a POWER detail the category asks for ONLY under that type — so the very
 *     selection that speaks the fact is what puts its target on screen,
 *   · a VOLTAGE detail with the LINK's own default, asked for only when the power
 *     is electric. It is what made the incident visible: the defaults pass fired
 *     in the same commit and erased the just-prefilled power source.
 * Every row is namespaced scratch under a scratch leaf (J1/J3).
 */
export interface UnhideFactSet {
  type: ScratchAttr;
  power: ScratchAttr;
  volt: ScratchAttr;
  typeValues: { treadmill: string; mat: string };
  powerValues: { electric: string; manual: string };
  voltDefault: string;
  attrKeys: string[];
}

export async function seedUnhideFactSet(categoryId: string): Promise<UnhideFactSet> {
  const supabase = adminClient();
  const stem = `e2e_unhide_${RUN}_${process.env["TEST_WORKER_INDEX"] ?? "0"}_${rand()}`;
  const treadmill = `${stem}_treadmill`;
  const mat = `${stem}_mat`;
  const electric = `${stem}_electric`;
  const manual = `${stem}_manual`;
  const volts = `${stem}_220v`;
  const option = (value: string, extra: Record<string, unknown> = {}) => ({
    value,
    label_en: `${value} label`,
    label_am: `${value} ምልክት`,
    active: true,
    ...extra,
  });

  const { data, error } = await supabase
    .from("attributes")
    .insert([
      {
        attr_key: `${stem}_type`,
        name_en: `${stem} type`,
        attr_type: "single_select",
        options: [option(treadmill), option(mat)],
      },
      {
        attr_key: `${stem}_power`,
        name_en: `${stem} power`,
        attr_type: "single_select",
        options: [option(electric), option(manual)],
      },
      {
        attr_key: `${stem}_volt`,
        name_en: `${stem} volt`,
        attr_type: "single_select",
        options: [option(volts)],
      },
    ])
    .select("id, attr_key, name_en");
  if (error || !data) {
    throw new Error(`[e2e:inc257] seeding the unhide set failed: ${error?.message ?? "no rows"}`);
  }
  const pick = (suffix: string): ScratchAttr => {
    const row = data.find((entry) => entry.attr_key.endsWith(suffix));
    if (!row) throw new Error(`[e2e:inc257] the ${suffix} definition is missing`);
    return { id: row.id, attrKey: row.attr_key, nameEn: row.name_en };
  };
  const type = pick("_type");
  const power = pick("_power");
  const volt = pick("_volt");

  // The fact is written on the TYPE's own option record, the shape DEC-050 fixes.
  const { error: factError } = await supabase
    .from("attributes")
    .update({
      options: [option(treadmill, { facts: { [power.attrKey]: electric } }), option(mat)],
    })
    .eq("id", type.id);
  if (factError) {
    throw new Error(`[e2e:inc257] writing the option's fact failed: ${factError.message}`);
  }

  const { error: linkError } = await supabase.from("category_attribute_links").insert([
    { category_id: categoryId, attribute_id: type.id, is_required: false, display_order: 1 },
    {
      category_id: categoryId,
      attribute_id: power.id,
      is_required: false,
      display_order: 2,
      visible_when: { key: type.attrKey, in: [treadmill] },
    },
    {
      category_id: categoryId,
      attribute_id: volt.id,
      is_required: false,
      display_order: 3,
      default_value: volts,
      visible_when: { key: power.attrKey, in: [electric] },
    },
  ]);
  if (linkError) {
    throw new Error(`[e2e:inc257] linking the unhide set failed: ${linkError.message}`);
  }

  return {
    type,
    power,
    volt,
    typeValues: { treadmill, mat },
    powerValues: { electric, manual },
    voltDefault: volts,
    attrKeys: [type.attrKey, power.attrKey, volt.attrKey],
  };
}

/**
 * U6-C1-R3b-3a STEP 1 (INC-240) — A SET WHOSE MODELS DISAGREE.
 *
 * Re-derivation can only be proven by a SECOND parent whose facts differ from the
 * first: one model that knows its body and its doors, one that knows a battery
 * nobody else has, and one that knows a different body and a different door
 * count. Every row is namespaced scratch under a scratch leaf (J1/J3).
 */
export interface FactShiftSet {
  make: ScratchAttr;
  model: ScratchAttr;
  body: ScratchAttr;
  battery: ScratchAttr;
  doors: ScratchAttr;
  /**
   * U6-C1-R3b-3b (D25) — a year the FIRST model bounds and the others say nothing
   * about, and a mileage NO option ever names: one is the model's, one is the
   * seller's, and a model change must treat them differently.
   */
  year: ScratchAttr;
  mileage: ScratchAttr;
  makeValue: string;
  /**
   * D25b — A SECOND MAKE, with no model of its own: changing the ROOT of the
   * cascade names a different item entirely, so every detail starts over — the
   * seller's own answers included.
   */
  otherMake: string;
  /** hatchback body + 3 doors + a year floor, no battery. */
  golf: string;
  /** a battery, and the hatchback body. */
  byd: string;
  /** sedan body + 5 doors, no battery and no year. */
  corolla: string;
  bodyHatch: string;
  bodySedan: string;
  bydBattery: number;
  golfDoors: number;
  corollaDoors: number;
  /** The year floor the first model carries, and a year inside it. */
  golfYearFloor: number;
  golfYear: number;
  attrKeys: string[];
}

export async function seedFactShiftSet(categoryId: string): Promise<FactShiftSet> {
  const supabase = adminClient();
  const stem = `e2e_shift_${RUN}_${process.env["TEST_WORKER_INDEX"] ?? "0"}_${rand()}`;
  const makeValue = `${stem}_mk`;
  const otherMake = `${stem}_mk2`;
  const golf = `${stem}_golf`;
  const byd = `${stem}_byd`;
  const corolla = `${stem}_corolla`;
  const bodyKey = `${stem}_body`;
  const batteryKey = `${stem}_battery`;
  const doorsKey = `${stem}_doors`;
  const yearKey = `${stem}_year`;
  const mileageKey = `${stem}_mileage`;
  const bodyHatch = `${stem}_hatch`;
  const bodySedan = `${stem}_sedan`;
  const bydBattery = 60;
  const golfDoors = 3;
  const corollaDoors = 5;
  const golfYearFloor = 2000;
  const golfYear = 2015;

  const option = (value: string, extra: Record<string, unknown> = {}) => ({
    value,
    label_en: `${value} label`,
    label_am: `${value} ምልክት`,
    active: true,
    ...extra,
  });

  const { data, error } = await supabase
    .from("attributes")
    .insert([
      {
        attr_key: `${stem}_make`,
        name_en: `${stem} make`,
        attr_type: "single_select",
        options: [option(makeValue), option(otherMake)],
      },
      {
        attr_key: `${stem}_model`,
        name_en: `${stem} model`,
        attr_type: "single_select",
        options: [
          option(golf, {
            parent: makeValue,
            // D25 — this model BOUNDS the year; the others say nothing about it.
            // R-SW — the bound sits in the record's OWN `bounds`, as served.
            bounds: { [yearKey]: { min: golfYearFloor } },
            facts: {
              [bodyKey]: bodyHatch,
              [doorsKey]: golfDoors,
            },
          }),
          option(byd, {
            parent: makeValue,
            facts: { [bodyKey]: bodyHatch, [batteryKey]: bydBattery },
          }),
          option(corolla, {
            parent: makeValue,
            facts: { [bodyKey]: bodySedan, [doorsKey]: corollaDoors },
          }),
        ],
      },
      {
        attr_key: bodyKey,
        name_en: `${stem} body`,
        attr_type: "single_select",
        options: [option(bodyHatch), option(bodySedan)],
      },
      {
        attr_key: batteryKey,
        name_en: `${stem} battery`,
        attr_type: "number",
        min_bound: "1",
        max_bound: "999",
        decimals: 0,
      },
      {
        attr_key: doorsKey,
        name_en: `${stem} doors`,
        attr_type: "number",
        min_bound: "1",
        max_bound: "9",
        decimals: 0,
      },
      {
        attr_key: yearKey,
        name_en: `${stem} year`,
        attr_type: "number",
        min_bound: "1900",
        max_bound: "2030",
        decimals: 0,
        format: "year",
      },
      {
        // NO option ever names this detail: it is the SELLER's, start to finish.
        attr_key: mileageKey,
        name_en: `${stem} mileage`,
        attr_type: "number",
        min_bound: "0",
        max_bound: "999999",
        decimals: 0,
      },
    ])
    .select("id, attr_key, name_en");
  if (error || !data) {
    throw new Error(
      `[e2e:r3b3a] seeding the fact-shift set failed: ${error?.message ?? "no rows"}`,
    );
  }
  const pick = (suffix: string): ScratchAttr => {
    const row = data.find((entry) => entry.attr_key.endsWith(suffix));
    if (!row) throw new Error(`[e2e:r3b3a] the ${suffix} definition is missing`);
    return { id: row.id, attrKey: row.attr_key, nameEn: row.name_en };
  };
  const make = pick("_make");
  const model = pick("_model");
  const body = pick("_body");
  const battery = pick("_battery");
  const doors = pick("_doors");
  const year = pick("_year");
  const mileage = pick("_mileage");

  const { error: linkError } = await supabase.from("category_attribute_links").insert([
    { category_id: categoryId, attribute_id: make.id, is_required: false, display_order: 1 },
    { category_id: categoryId, attribute_id: model.id, is_required: false, display_order: 2 },
    { category_id: categoryId, attribute_id: body.id, is_required: false, display_order: 3 },
    { category_id: categoryId, attribute_id: battery.id, is_required: false, display_order: 4 },
    { category_id: categoryId, attribute_id: doors.id, is_required: false, display_order: 5 },
    { category_id: categoryId, attribute_id: year.id, is_required: false, display_order: 6 },
    { category_id: categoryId, attribute_id: mileage.id, is_required: false, display_order: 7 },
  ]);
  if (linkError) {
    throw new Error(`[e2e:r3b3a] linking the fact-shift set failed: ${linkError.message}`);
  }

  return {
    otherMake,
    make,
    model,
    body,
    battery,
    doors,
    year,
    mileage,
    makeValue,
    golf,
    byd,
    corolla,
    bodyHatch,
    bodySedan,
    bydBattery,
    golfDoors,
    corollaDoors,
    golfYearFloor,
    golfYear,
    attrKeys: [
      make.attrKey,
      model.attrKey,
      body.attrKey,
      battery.attrKey,
      doors.attrKey,
      year.attrKey,
      mileage.attrKey,
    ],
  };
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

/** U6-C2b DB truth: the listing's own contact channels (`listings.contact_pref`). */
export async function contactPrefOf(listingId: string): Promise<Record<string, unknown>> {
  const { data, error } = await adminClient()
    .from("listings")
    .select("contact_pref")
    .eq("id", listingId)
    .maybeSingle();
  if (error) throw new Error(`[e2e:c2b] reading the channels failed: ${error.message}`);
  const value = data?.contact_pref;
  return value !== null && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

/** U6-C2b DB truth: the seller identity `save_posting_identity` wrote to the profile. */
export async function identityOf(userId: string): Promise<{
  alias: string | null;
  sellerType: string | null;
  businessName: string | null;
  /** D17 (M-MAINT-2 A) — the seller's own name, the profile's own columns. */
  firstName: string | null;
  lastName: string | null;
}> {
  const { data, error } = await adminClient()
    .from("profiles")
    .select("seller_alias,seller_type,business_name,first_name,last_name")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw new Error(`[e2e:c2b] reading the identity failed: ${error.message}`);
  return {
    alias: data?.seller_alias ?? null,
    sellerType: data?.seller_type ?? null,
    businessName: data?.business_name ?? null,
    firstName: data?.first_name ?? null,
    lastName: data?.last_name ?? null,
  };
}

/**
 * U6-C1-R3b-3d STEP 4 (INC-246) — A CATEGORY SURFACED UNDER A SECOND PARENT.
 *
 * Surfacing is a POINTER, not a move: the row keeps its first parent and gains
 * another place it is shown. The wizard's tree must show it in both places, the
 * way the marketplace rail does.
 */
export async function surfaceCategoryUnder(
  parentId: string,
  childId: string,
  displayOrder = 1,
): Promise<void> {
  const { error } = await adminClient()
    .from("category_tree_pointers")
    .insert({ parent_id: parentId, child_id: childId, display_order: displayOrder });
  if (error) throw new Error(`[e2e:r3b3d] surfacing the category failed: ${error.message}`);
}

/**
 * U6-C1-R3b-3d STEP 2 (INC-244) — A SET WHOSE MODEL RULES ANSWERS OUT.
 *
 * One model option carries `allowed` naming a SIBLING picker and the single answer
 * it admits (`{ fuel: [electric] }`); the other carries nothing, so the same
 * picker offers its whole list. The door (`attr_allowed_check` / the validator)
 * decides the same way; the form is the mirror (F3).
 */
export interface AllowedSet {
  model: ScratchAttr;
  fuel: ScratchAttr;
  /** The model that allows one fuel only, and the model that allows them all. */
  strictModel: string;
  openModel: string;
  fuelElectric: string;
  fuelPetrol: string;
  attrKeys: string[];
}

export async function seedAllowedSet(categoryId: string): Promise<AllowedSet> {
  const supabase = adminClient();
  const stem = `e2e_allow_${RUN}_${process.env["TEST_WORKER_INDEX"] ?? "0"}_${rand()}`;
  const strictModel = `${stem}_ev`;
  const openModel = `${stem}_any`;
  const fuelElectric = `${stem}_electric`;
  const fuelPetrol = `${stem}_petrol`;
  const option = (value: string, extra: Record<string, unknown> = {}) => ({
    value,
    label_en: `${value} label`,
    label_am: `${value} ምልክት`,
    active: true,
    ...extra,
  });

  const { data, error } = await supabase
    .from("attributes")
    .insert([
      {
        attr_key: `${stem}_model`,
        name_en: `${stem} model`,
        attr_type: "single_select",
        options: [
          option(strictModel, { allowed: { [`${stem}_fuel`]: [fuelElectric] } }),
          option(openModel),
        ],
      },
      {
        attr_key: `${stem}_fuel`,
        name_en: `${stem} fuel`,
        attr_type: "single_select",
        options: [option(fuelPetrol), option(fuelElectric)],
      },
    ])
    .select("id, attr_key, name_en");
  if (error || !data) {
    throw new Error(`[e2e:r3b3d] seeding the allowed set failed: ${error?.message ?? "no rows"}`);
  }
  const pick = (suffix: string): ScratchAttr => {
    const row = data.find((entry) => entry.attr_key.endsWith(suffix));
    if (!row) throw new Error(`[e2e:r3b3d] the ${suffix} definition is missing`);
    return { id: row.id, attrKey: row.attr_key, nameEn: row.name_en };
  };
  const model = pick("_model");
  const fuel = pick("_fuel");

  const { error: linkError } = await supabase.from("category_attribute_links").insert([
    { category_id: categoryId, attribute_id: model.id, is_required: false, display_order: 1 },
    { category_id: categoryId, attribute_id: fuel.id, is_required: false, display_order: 2 },
  ]);
  if (linkError) {
    throw new Error(`[e2e:r3b3d] linking the allowed set failed: ${linkError.message}`);
  }

  return {
    model,
    fuel,
    strictModel,
    openModel,
    fuelElectric,
    fuelPetrol,
    attrKeys: [model.attrKey, fuel.attrKey],
  };
}

/**
 * INC-260 — A SURFACED LEAF STILL OWNS ITS DEPENDENT LIST. The real Vehicle Hire
 * leaf is surfaced under Travel and Vehicles while Cars remains a separate
 * control leaf; its make/model links live directly on Vehicle Hire. This scratch
 * shape mirrors that: the seller reaches a leaf through a second parent, then a
 * model value whose parent is the chosen make must still narrow in place.
 */
export interface SurfacedDependentSet {
  make: ScratchAttr;
  model: ScratchAttr;
  makeValues: { byd: string; toyota: string };
  modelValues: { byd: string; toyota: string; orphan: string };
  /**
   * INC-260 (live shape) — THE DECOY. The published Vehicle Hire leaf asks a
   * vehicle-type question FIRST, and that question offers `other`; the car-model
   * library also files one model under a parent called `other`. The fold owner
   * must therefore be chosen by how much of the model list a candidate actually
   * covers, not by the first candidate that shares one value.
   */
  decoy: ScratchAttr;
  decoyOther: string;
  attrKeys: string[];
}

export async function seedSurfacedDependentSet(categoryId: string): Promise<SurfacedDependentSet> {
  const supabase = adminClient();
  const stem = `e2e_surf_${RUN}_${process.env["TEST_WORKER_INDEX"] ?? "0"}_${rand()}`;
  const byd = `${stem}_byd`;
  const toyota = `${stem}_toyota`;
  const bydModel = `${byd}_seagull`;
  const toyotaModel = `${toyota}_corolla`;
  const decoyOther = "other";
  const orphanModel = `${stem}_orphan`;
  const option = (value: string, extra: Record<string, unknown> = {}) => ({
    value,
    label_en: `${value} label`,
    label_am: `${value} ምልክት`,
    active: true,
    ...extra,
  });

  const { data, error } = await supabase
    .from("attributes")
    .insert([
      {
        attr_key: `${stem}_kind`,
        name_en: `${stem} kind`,
        attr_type: "single_select",
        options: [option(`${stem}_van`), option(decoyOther)],
      },
      {
        attr_key: `${stem}_make`,
        name_en: `${stem} make`,
        attr_type: "single_select",
        options: [option(byd), option(toyota)],
      },
      {
        attr_key: `${stem}_model`,
        name_en: `${stem} model`,
        attr_type: "single_select",
        options: [
          option(bydModel, { parent: byd }),
          option(toyotaModel, { parent: toyota }),
          option(orphanModel, { parent: decoyOther }),
        ],
      },
    ])
    .select("id, attr_key, name_en");
  if (error || !data) {
    throw new Error(
      `[e2e:inc260] seeding the surfaced dependent set failed: ${error?.message ?? "no rows"}`,
    );
  }
  const pick = (suffix: string): ScratchAttr => {
    const row = data.find((entry) => entry.attr_key.endsWith(suffix));
    if (!row) throw new Error(`[e2e:inc260] the ${suffix} definition is missing`);
    return { id: row.id, attrKey: row.attr_key, nameEn: row.name_en };
  };
  const decoy = pick("_kind");
  const make = pick("_make");
  const model = pick("_model");

  const { error: linkError } = await supabase.from("category_attribute_links").insert([
    { category_id: categoryId, attribute_id: decoy.id, is_required: false, display_order: 0 },
    { category_id: categoryId, attribute_id: make.id, is_required: false, display_order: 1 },
    { category_id: categoryId, attribute_id: model.id, is_required: false, display_order: 2 },
  ]);
  if (linkError) {
    throw new Error(`[e2e:inc260] linking the surfaced dependent set failed: ${linkError.message}`);
  }

  return {
    make,
    model,
    decoy,
    decoyOther,
    makeValues: { byd, toyota },
    modelValues: { byd: bydModel, toyota: toyotaModel, orphan: orphanModel },
    attrKeys: [decoy.attrKey, make.attrKey, model.attrKey],
  };
}

/**
 * INC-248 — THE SAME QUESTION UNDER TWO LEAVES. A category change can only be
 * proved to CLEAR a chosen option when the new category asks the same question,
 * so a spec set's own picker is linked to a second scratch leaf here. Both leaves
 * and the definition are namespaced scratch and destroyed with them (J3).
 */
export async function linkSpecToCategory(
  categoryId: string,
  attributeId: string,
  displayOrder = 9,
): Promise<void> {
  const { error } = await adminClient().from("category_attribute_links").insert({
    category_id: categoryId,
    attribute_id: attributeId,
    is_required: false,
    display_order: displayOrder,
  });
  if (error) throw new Error(`[e2e:inc248] linking the definition failed: ${error.message}`);
}

/**
 * U6-C1-R3b-4 DB TRUTH: the four pin columns `set_listing_pin` owns. Read
 * through the service client, because the assertion is about the ROW, not about
 * what a screen claims (J4).
 */
export async function pinOf(listingId: string): Promise<{
  lat: number | null;
  lng: number | null;
  precision: string | null;
  street: string | null;
}> {
  const { data, error } = await adminClient()
    .from("listings")
    .select("pin_lat,pin_lng,pin_precision,street_address")
    .eq("id", listingId)
    .maybeSingle();
  if (error) throw new Error(`[e2e:r3b4] reading the pin failed: ${error.message}`);
  return {
    lat: data?.pin_lat === null || data?.pin_lat === undefined ? null : Number(data.pin_lat),
    lng: data?.pin_lng === null || data?.pin_lng === undefined ? null : Number(data.pin_lng),
    precision: data?.pin_precision ?? null,
    street: data?.street_address ?? null,
  };
}
