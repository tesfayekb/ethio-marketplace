import type { Page } from "@playwright/test";
import { createClient } from "@supabase/supabase-js";
import { expect, test } from "./fixtures";
import { gotoReady, signInViaSession } from "./helpers/ui";
import { adminClient } from "./helpers/users";
import { destroyLocation, seedScratchChain } from "./helpers/locations";
import {
  bearerOf,
  completeDraft,
  destroyListingsOf,
  destroyPostableCategory,
  destroySpecSet,
  leaseSeller,
  postRoute,
  seedPostableCategory,
  seedSpecSet,
} from "./helpers/posting";

// Bundle 7 C5: scratch catalogue only, leased sellers, route writes and DB truth.
const DRAFT = "/api/listings/draft";
test.describe("POSTING ROUTES — catalogue changes", () => {
  const sellers: string[] = [];
  const categories: string[] = [];
  const definitions: string[] = [];
  const places: string[] = [];
  test.afterEach(async () => {
    for (const id of sellers.splice(0)) await destroyListingsOf(id);
    for (const slug of places.splice(0)) await destroyLocation(slug);
    await destroySpecSet(definitions.splice(0));
    for (const slug of categories.splice(0)) await destroyPostableCategory(slug);
  });

  async function seller(page: Page) {
    const user = await leaseSeller({ named: true });
    sellers.push(user.id);
    // A lease may hold old scratch ads: remove them before seeding this test.
    await destroyListingsOf(user.id);
    await signInViaSession(page, user.email, user.password);
    await gotoReady(page, "/");
    return { user, token: await bearerOf(page) };
  }
  async function category() {
    const row = await seedPostableCategory();
    categories.push(row.slug);
    return row;
  }
  async function setup(page: Page) {
    const identity = await seller(page);
    const cat = await category();
    const specs = await seedSpecSet(cat.id);
    definitions.push(
      specs.text.id,
      specs.number.id,
      specs.bool.id,
      specs.select.id,
      specs.multi.id,
    );
    return { ...identity, cat, specs };
  }
  async function save(page: Page, token: string, body: Record<string, unknown>) {
    const answer = await postRoute(page, DRAFT, body, { token, country: "ET" });
    expect(answer.status, JSON.stringify(answer.payload)).toBe(200);
    return answer.payload;
  }
  async function attrs(id: string) {
    const answer = await adminClient().from("listings").select("attributes").eq("id", id).single();
    expect(answer.error).toBeNull();
    return answer.data!.attributes;
  }
  async function replaceAttrs(id: string, attributes: Record<string, unknown>) {
    const answer = await adminClient().from("listings").update({ attributes }).eq("id", id);
    expect(answer.error).toBeNull();
  }
  function body(categoryId: string, attributes: Record<string, unknown>, step = 3) {
    return {
      categoryId,
      attributes,
      step,
      title: "e2e catalogue ad",
      description: "e2e catalogue body",
      priceMode: "fixed",
      priceAmount: 100,
      priceCurrency: "ETB",
      pricePeriod: "once",
    };
  }
  async function rpc(page: Page, name: string, args: Record<string, unknown> = {}) {
    return page.evaluate(
      async ({ name, args }) => {
        const client = (
          window as unknown as {
            __ethioSupabase: {
              rpc: (
                name: string,
                args: Record<string, unknown>,
              ) => Promise<{ data: unknown; error: { message: string } | null }>;
            };
          }
        ).__ethioSupabase;
        const result = await client.rpc(name, args);
        return { data: result.data, error: result.error?.message ?? null };
      },
      { name, args },
    );
  }

  test("PR-34 removed held question is released by autosave and strict route save", async ({
    page,
  }) => {
    const { token, cat, specs } = await setup(page);
    const held = { [specs.text.attrKey]: "held answer" };
    const first = await save(page, token, body(cat.id, held));
    expect(first["ok"], JSON.stringify(first)).toBe(true);
    const id = String(first["listing_id"]);
    const unlinked = await adminClient()
      .from("category_attribute_links")
      .delete()
      .eq("category_id", cat.id)
      .eq("attribute_id", specs.text.id);
    expect(unlinked.error).toBeNull();
    // Restore prior separately for each mode so neither proves an empty prior.
    const answers = [];
    for (const step of [3, 4]) {
      await replaceAttrs(id, held);
      const answer = await save(page, token, { ...body(cat.id, held, step), listingId: id });
      answers.push({ step, answer, stored: await attrs(id) });
    }
    for (const result of answers) {
      expect(result.answer["ok"], `step ${result.step}: ${JSON.stringify(result.answer)}`).toBe(
        true,
      );
      expect(result.stored).not.toHaveProperty(specs.text.attrKey);
    }
  });

  test("PR-35 removed held option is released; a required strict question asks again", async ({
    page,
  }) => {
    const { token, cat, specs } = await setup(page);
    const held = {
      [specs.text.attrKey]: "held answer",
      [specs.select.attrKey]: specs.optionValues[0],
    };
    const first = await save(page, token, body(cat.id, held));
    expect(first["ok"], JSON.stringify(first)).toBe(true);
    const id = String(first["listing_id"]);
    const removed = await adminClient()
      .from("attributes")
      .update({ options: [{ value: specs.optionValues[1], label_en: "Kept", active: true }] })
      .eq("id", specs.select.id);
    expect(removed.error).toBeNull();
    const optional = [];
    for (const step of [3, 4]) {
      await replaceAttrs(id, held);
      const answer = await save(page, token, { ...body(cat.id, held, step), listingId: id });
      optional.push({ step, answer, stored: await attrs(id) });
    }
    await replaceAttrs(id, held);
    const requiredLink = await adminClient()
      .from("category_attribute_links")
      .update({ is_required: true })
      .eq("category_id", cat.id)
      .eq("attribute_id", specs.select.id);
    expect(requiredLink.error).toBeNull();
    const required = await save(page, token, { ...body(cat.id, held, 4), listingId: id });
    expect
      .soft(required["refusals"], JSON.stringify(required))
      .toEqual([{ field: "attributes", attr_key: specs.select.attrKey, reason: "required" }]);
    for (const result of optional) {
      expect
        .soft(result.answer["ok"], `step ${result.step}: ${JSON.stringify(result.answer)}`)
        .toBe(true);
      expect.soft(result.stored).not.toHaveProperty(specs.select.attrKey);
    }
  });

  test("PR-36 new unknown key and new unknown option remain refused", async ({ page }) => {
    const { token, cat, specs } = await setup(page);
    const held = { [specs.text.attrKey]: "held answer" };
    const first = await save(page, token, body(cat.id, held));
    expect(first["ok"], JSON.stringify(first)).toBe(true);
    const id = String(first["listing_id"]);
    for (const [attributes, reason, key] of [
      [{ ...held, e2e_never_held: "new" }, "unknownAttribute", "e2e_never_held"],
      [
        { ...held, [specs.select.attrKey]: "e2e_never_offered" },
        "unknownOption",
        specs.select.attrKey,
      ],
    ] as const) {
      const answer = await save(page, token, { ...body(cat.id, attributes), listingId: id });
      expect(answer["ok"]).toBe(false);
      expect(answer["refusals"]).toEqual(
        expect.arrayContaining([expect.objectContaining({ attr_key: key, reason })]),
      );
      expect(await attrs(id)).toEqual(held);
    }
  });

  async function placeDraft(page: Page) {
    const identity = await seller(page);
    const cat = await category();
    const a = await seedScratchChain("ET");
    places.push(a.region.slug);
    const b = await seedScratchChain("ET");
    places.push(b.region.slug);
    const draft = completeDraft({
      categoryId: cat.id,
      cityId: a.city.id,
      title: "e2e ordered places",
    });
    return { ...identity, cat, a, b, draft };
  }
  async function storedPlaces(id: string) {
    const result = await adminClient()
      .from("listing_locations")
      .select("id, location_id, position")
      .eq("listing_id", id)
      .order("position");
    expect(result.error).toBeNull();
    return result.data!;
  }
  test("PR-37 coverage first appearance is stored once, renumbered in either order", async ({
    page,
  }) => {
    const { token, a, b, draft } = await placeDraft(page);
    let id: string | undefined;
    for (const order of [
      [a.city.id, b.city.id, a.city.id],
      [b.city.id, a.city.id, b.city.id],
    ]) {
      const answer = await save(page, token, { ...draft, listingId: id, coverage: order });
      expect(answer["ok"], JSON.stringify(answer)).toBe(true);
      id = String(answer["listing_id"]);
      expect(
        (await storedPlaces(id)).map(({ location_id, position }) => ({ location_id, position })),
      ).toEqual([
        { location_id: order[0], position: 1 },
        { location_id: order[1], position: 2 },
      ]);
    }
    // Fallback must obey position even when created_at says the opposite.
    const cleared = await adminClient()
      .from("listings")
      .update({ location_id: null })
      .eq("id", id!);
    expect(cleared.error).toBeNull();
    const saved = await rpc(page, "save_seller_place", { p_listing_id: id });
    expect(saved.error).toBeNull();
    expect(saved.data).toEqual({ ok: true });
  });

  test("PR-38 owner's client cannot insert, update or delete coverage; the route can", async ({
    page,
  }) => {
    const { token, a, b, draft } = await placeDraft(page);
    const first = await save(page, token, draft);
    expect(first["ok"], JSON.stringify(first)).toBe(true);
    const id = String(first["listing_id"]);
    const row = (await storedPlaces(id))[0]!;
    const userClient = createClient(
      process.env["E2E_SUPABASE_URL"]!,
      process.env["E2E_SUPABASE_PUBLISHABLE_KEY"]!,
      {
        global: { headers: { Authorization: `Bearer ${token}` } },
        auth: { persistSession: false },
      },
    );
    for (const attempt of [
      () =>
        userClient
          .from("listing_locations")
          .insert({ listing_id: id, location_id: b.city.id, position: 2 }),
      () => userClient.from("listing_locations").update({ position: 2 }).eq("id", row.id),
      () => userClient.from("listing_locations").delete().eq("id", row.id),
    ])
      expect((await attempt()).error).not.toBeNull();
    expect(await storedPlaces(id)).toEqual([row]);
    const answer = await save(page, token, {
      ...draft,
      listingId: id,
      coverage: [b.city.id, a.city.id],
    });
    expect(answer["ok"], JSON.stringify(answer)).toBe(true);
    expect((await storedPlaces(id)).map((entry) => entry.location_id)).toEqual([
      b.city.id,
      a.city.id,
    ]);
  });

  test("PR-39 recent categories are caller-only published leaves in count/date/id order", async ({
    page,
  }) => {
    const { user } = await seller(page);
    const other = await leaseSeller();
    sellers.push(other.id);
    await destroyListingsOf(other.id);
    const cats = await Promise.all(Array.from({ length: 8 }, () => category()));
    const [x, y, draftOnly, closed, inactive, foreign, tied, older] = cats;
    const time = "2026-10-06T12:00:00Z";
    const seed = async (categoryId: string, sellerId: string, published: string | null) => {
      const result = await adminClient().from("listings").insert({
        seller_id: sellerId,
        category_id: categoryId,
        title: "e2e recent category",
        description: "e2e scratch ad",
        status: "draft",
        location_id: null,
        attributes: {},
        published_first_at: published,
        home_country_code: "ET",
      });
      expect(result.error).toBeNull();
    };
    await seed(x!.id, user.id, time);
    await seed(x!.id, user.id, time);
    await seed(y!.id, user.id, time);
    await seed(tied!.id, user.id, time);
    await seed(older!.id, user.id, "2026-10-05T12:00:00Z");
    await seed(draftOnly!.id, user.id, null);
    await seed(closed!.id, user.id, time);
    await seed(inactive!.id, user.id, time);
    await seed(foreign!.id, other.id, time);
    expect(
      (
        await adminClient()
          .from("categories")
          .update({ allow_listings: false })
          .eq("id", closed!.id)
      ).error,
    ).toBeNull();
    expect(
      (await adminClient().from("categories").update({ is_active: false }).eq("id", inactive!.id))
        .error,
    ).toBeNull();
    const result = await rpc(page, "my_recent_categories");
    expect(result.error).toBeNull();
    expect(result.data).toEqual({
      categories: [
        { id: x!.id, ads: 2 },
        ...[y!.id, tied!.id].sort().map((id) => ({ id, ads: 1 })),
        { id: older!.id, ads: 1 },
      ],
    });
    await destroyListingsOf(other.id);
    await seed(draftOnly!.id, other.id, null);
    await signInViaSession(page, other.email, other.password);
    expect(await rpc(page, "my_recent_categories")).toEqual({
      data: { categories: [] },
      error: null,
    });
    const anon = createClient(
      process.env["E2E_SUPABASE_URL"]!,
      process.env["E2E_SUPABASE_PUBLISHABLE_KEY"]!,
      {
        auth: { persistSession: false },
      },
    );
    expect((await anon.rpc("my_recent_categories")).error).not.toBeNull();
  });
});
