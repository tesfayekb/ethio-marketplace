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
  rand,
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
    const leased = sellers.splice(0);
    for (const id of leased) await destroyListingsOf(id);
    // A saved seller place points at a scratch place: remove it first (J3).
    for (const id of leased) {
      const gone = await adminClient().from("seller_places").delete().eq("user_id", id);
      if (gone.error) throw new Error(`seller_places cleanup ${id}: ${gone.error.message}`);
    }
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
      specs.text.attrKey,
      specs.number.attrKey,
      specs.bool.attrKey,
      specs.select.attrKey,
      specs.multi.attrKey,
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
      .toEqual([{ attr_key: specs.select.attrKey, reason: "required" }]);
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

  // Bundle 7 D5 (INC-479) — the door lets go ONCE: the save after a removal
  // passes and the row stops holding the answer; the SAME body again is refused.
  test("PR-40 a removed question or option is let go once, then the same body is refused", async ({
    page,
  }) => {
    const { token, cat, specs } = await setup(page);
    const heldText = { [specs.text.attrKey]: "held answer" };
    const first = await save(page, token, body(cat.id, heldText));
    expect(first["ok"], JSON.stringify(first)).toBe(true);
    const id = String(first["listing_id"]);
    const unlinked = await adminClient()
      .from("category_attribute_links")
      .delete()
      .eq("category_id", cat.id)
      .eq("attribute_id", specs.text.id);
    expect(unlinked.error).toBeNull();
    const released = await save(page, token, { ...body(cat.id, heldText), listingId: id });
    expect(released["ok"], JSON.stringify(released)).toBe(true);
    expect(await attrs(id)).not.toHaveProperty(specs.text.attrKey);
    const before = await attrs(id);
    const again = await save(page, token, { ...body(cat.id, heldText), listingId: id });
    expect(again["ok"], JSON.stringify(again)).toBe(false);
    expect(again["refusals"]).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ attr_key: specs.text.attrKey, reason: "unknownAttribute" }),
      ]),
    );
    expect(await attrs(id)).toEqual(before);

    const removedValue = specs.optionValues[0];
    const heldOption = { [specs.select.attrKey]: removedValue };
    const optionSaved = await save(page, token, { ...body(cat.id, heldOption), listingId: id });
    expect(optionSaved["ok"], JSON.stringify(optionSaved)).toBe(true);
    const removed = await adminClient()
      .from("attributes")
      .update({ options: [{ value: specs.optionValues[1], label_en: "Kept", active: true }] })
      .eq("id", specs.select.id);
    expect(removed.error).toBeNull();
    const optionReleased = await save(page, token, { ...body(cat.id, heldOption), listingId: id });
    expect(optionReleased["ok"], JSON.stringify(optionReleased)).toBe(true);
    expect(await attrs(id)).not.toHaveProperty(specs.select.attrKey);
    const beforeOption = await attrs(id);
    const optionAgain = await save(page, token, { ...body(cat.id, heldOption), listingId: id });
    expect(optionAgain["ok"], JSON.stringify(optionAgain)).toBe(false);
    expect(optionAgain["refusals"]).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          attr_key: specs.select.attrKey,
          reason: "unknownOption",
          detail: removedValue,
        }),
      ]),
    );
    expect(await attrs(id)).toEqual(beforeOption);
  });

  // Bundle 8 B3 (INC-477) — the door enforces a chosen option's `allowed` list:
  // one value chosen for a picker narrows the siblings it names; lists meet at
  // their intersection; a list answer narrows nothing; a stored combination that
  // this save leaves as it was is kept.
  test("PR-41 the door refuses an answer the chosen options do not allow", async ({ page }) => {
    const { token } = await seller(page);
    const stem = `e2e_alw_${rand()}`;
    let count = 0;
    const option = (value: string, allowed?: Record<string, string[]>) => ({
      value,
      label_en: `${value} label`,
      label_am: `${value} ምልክት`,
      active: true,
      ...(allowed === undefined ? {} : { allowed }),
    });
    async function define(type: string, options?: unknown[]) {
      count += 1;
      const key = `${stem}_${count}`;
      definitions.push(key);
      const row = await adminClient()
        .from("attributes")
        .insert({
          attr_key: key,
          name_en: key,
          name_am: `${key} ጥያቄ`,
          attr_type: type,
          ...(type === "number" ? { min_bound: "1", max_bound: "999", decimals: 0 } : {}),
          ...(options === undefined ? {} : { options }),
        })
        .select("id")
        .single();
      expect(row.error, `seeding ${key}`).toBeNull();
      return { id: String(row.data!.id), key };
    }
    async function leaf(defs: { id: string }[]) {
      const cat = await category();
      const links = await adminClient()
        .from("category_attribute_links")
        .insert(
          defs.map((def, index) => ({
            category_id: cat.id,
            attribute_id: def.id,
            is_required: false,
            display_order: index + 1,
          })),
        );
      expect(links.error).toBeNull();
      return cat;
    }
    const judge = (categoryId: string, attributes: Record<string, unknown>, listingId?: string) =>
      save(page, token, {
        ...body(categoryId, attributes),
        ...(listingId === undefined ? {} : { listingId }),
      });
    function refusedAt(
      label: string,
      answer: Record<string, unknown>,
      key: string,
      detail: string,
    ) {
      expect.soft(answer["ok"], `${label}: ${JSON.stringify(answer)}`).toBe(false);
      expect
        .soft(answer["refusals"], `${label}: ${JSON.stringify(answer)}`)
        .toEqual(
          expect.arrayContaining([
            expect.objectContaining({ attr_key: key, reason: "optionNotAllowed", detail }),
          ]),
        );
    }
    function accepted(label: string, answer: Record<string, unknown>) {
      expect.soft(answer["ok"], `${label}: ${JSON.stringify(answer)}`).toBe(true);
    }

    // Cases 1, 2, 6 and 7: parent P narrows child C to [a]; T is free to change.
    const c = await define("single_select", [option("a"), option("b"), option("other")]);
    const p = await define("single_select", [
      option("p1", { [c.key]: ["a"] }),
      option("p2", { [c.key]: ["a"] }),
    ]);
    const tq = await define("number");
    const first = await leaf([p, c, tq]);
    refusedAt("case 1", await judge(first.id, { [p.key]: "p1", [c.key]: "b" }), c.key, "b");
    const two = await judge(first.id, { [p.key]: "p1", [c.key]: "a", [tq.key]: 5 });
    accepted("case 2", two);
    refusedAt(
      "case 7",
      await judge(first.id, { [p.key]: "p1", [c.key]: { value: "other", text: "handmade" } }),
      c.key,
      "other",
    );

    // Case 6: the test writes its own row so it already holds P = p1, C = b.
    const id = String(two["listing_id"]);
    await replaceAttrs(id, { [p.key]: "p1", [c.key]: "b", [tq.key]: 5 });
    accepted(
      "case 6 kept",
      await judge(first.id, { [p.key]: "p1", [c.key]: "b", [tq.key]: 6 }, id),
    );
    refusedAt(
      "case 6 changed",
      await judge(first.id, { [p.key]: "p2", [c.key]: "b", [tq.key]: 6 }, id),
      c.key,
      "b",
    );

    // Case 3: two contributors meet at their intersection, [b].
    const c3 = await define("single_select", [option("a"), option("b"), option("c")]);
    const p3 = await define("single_select", [option("p1", { [c3.key]: ["a", "b"] })]);
    const q3 = await define("single_select", [option("q1", { [c3.key]: ["b", "c"] })]);
    const third = await leaf([p3, q3, c3]);
    refusedAt(
      "case 3 a",
      await judge(third.id, { [p3.key]: "p1", [q3.key]: "q1", [c3.key]: "a" }),
      c3.key,
      "a",
    );
    accepted("case 3 b", await judge(third.id, { [p3.key]: "p1", [q3.key]: "q1", [c3.key]: "b" }));

    // Case 4: a multi_select child is judged element by element.
    const m = await define("multi_select", [option("x"), option("y"), option("z")]);
    const p4 = await define("single_select", [option("p1", { [m.key]: ["x", "y"] })]);
    const fourth = await leaf([p4, m]);
    refusedAt(
      "case 4 xz",
      await judge(fourth.id, { [p4.key]: "p1", [m.key]: ["x", "z"] }),
      m.key,
      "z",
    );
    accepted("case 4 xy", await judge(fourth.id, { [p4.key]: "p1", [m.key]: ["x", "y"] }));

    // Case 5: a list answer contributes nothing.
    const c5 = await define("single_select", [option("a"), option("b")]);
    const r = await define("multi_select", [option("r1", { [c5.key]: ["a"] })]);
    const fifth = await leaf([r, c5]);
    accepted("case 5", await judge(fifth.id, { [r.key]: ["r1"], [c5.key]: "b" }));
  });

  test("PR-42 the door reads a padded answer as the value it stores", async ({ page }) => {
    const { token } = await seller(page);
    const stem = `e2e_trm_${rand()}`;
    let count = 0;
    const option = (value: string, extra: Record<string, unknown> = {}) => ({
      value,
      label_en: `${value} label`,
      label_am: `${value} ምልክት`,
      active: true,
      ...extra,
    });
    async function define(type: string, options?: unknown[]) {
      count += 1;
      const key = `${stem}_${count}`;
      definitions.push(key);
      const row = await adminClient()
        .from("attributes")
        .insert({
          attr_key: key,
          name_en: key,
          name_am: `${key} ጥያቄ`,
          attr_type: type,
          ...(type === "number" ? { min_bound: "1", max_bound: "999", decimals: 0 } : {}),
          ...(options === undefined ? {} : { options }),
        })
        .select("id")
        .single();
      expect(row.error, `seeding ${key}`).toBeNull();
      return { id: String(row.data!.id), key };
    }
    type LinkDef = { id: string; required?: boolean; visibleWhen?: Record<string, unknown> };
    async function leaf(defs: LinkDef[]) {
      const cat = await category();
      const links = await adminClient()
        .from("category_attribute_links")
        .insert(
          defs.map((def, index) => ({
            category_id: cat.id,
            attribute_id: def.id,
            is_required: def.required === true,
            display_order: index + 1,
            ...(def.visibleWhen === undefined ? {} : { visible_when: def.visibleWhen }),
          })),
        );
      expect(links.error).toBeNull();
      return cat;
    }
    const judge = (categoryId: string, attributes: Record<string, unknown>) =>
      save(page, token, body(categoryId, attributes));
    function refusedAt(
      label: string,
      answer: Record<string, unknown>,
      key: string,
      reason: string,
      detail?: string,
    ) {
      expect.soft(answer["ok"], `${label}: ${JSON.stringify(answer)}`).toBe(false);
      expect
        .soft(answer["refusals"], `${label}: ${JSON.stringify(answer)}`)
        .toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              attr_key: key,
              reason,
              ...(detail === undefined ? {} : { detail }),
            }),
          ]),
        );
    }

    // (1) `allowed`: p1 allows C = [a].
    const c = await define("single_select", [option("a"), option("b")]);
    const p = await define("single_select", [option("p1", { allowed: { [c.key]: ["a"] } })]);
    const one = await leaf([{ id: p.id }, { id: c.id }]);
    // (2) bounds: p1 sets T's max to 10.
    const t2 = await define("number");
    const p2 = await define("single_select", [option("p1", { bounds: { [t2.key]: { max: 10 } } })]);
    const two = await leaf([{ id: p2.id }, { id: t2.id }]);
    // (3) show-when: W is asked only when P is p1, and is then required.
    const p3 = await define("single_select", [option("p1"), option("p2")]);
    const w = await define("text");
    const three = await leaf([
      { id: p3.id },
      { id: w.id, required: true, visibleWhen: { key: p3.key, in: ["p1"] } },
    ]);
    // (4) a list: r1 sets T's max to 10.
    const t4 = await define("number");
    const r = await define("multi_select", [option("r1", { bounds: { [t4.key]: { max: 10 } } })]);
    const four = await leaf([{ id: r.id }, { id: t4.id }]);

    for (const pad of [" ", ""]) {
      const tag = pad === "" ? "(5) unpadded" : "padded";
      const v = (value: string) => `${pad}${value}${pad}`;
      refusedAt(
        `${tag} (1)`,
        await judge(one.id, { [p.key]: v("p1"), [c.key]: "b" }),
        c.key,
        "optionNotAllowed",
        "b",
      );
      refusedAt(
        `${tag} (2)`,
        await judge(two.id, { [p2.key]: v("p1"), [t2.key]: 50 }),
        t2.key,
        "outOfBounds",
        "1..10",
      );
      refusedAt(`${tag} (3)`, await judge(three.id, { [p3.key]: v("p1") }), w.key, "required");
      refusedAt(
        `${tag} (4)`,
        await judge(four.id, { [r.key]: [v("r1")], [t4.key]: 50 }),
        t4.key,
        "outOfBounds",
        "1..10",
      );
    }

    // (6) with (1)'s definitions: a padded p1 and C = a is accepted and stored trimmed.
    const six = await judge(one.id, { [p.key]: " p1 ", [c.key]: "a" });
    expect.soft(six["ok"], `(6): ${JSON.stringify(six)}`).toBe(true);
    const stored = (await attrs(String(six["listing_id"]))) as Record<string, unknown>;
    expect(stored[p.key], `(6) stored: ${JSON.stringify(stored)}`).toBe("p1");
  });


  async function placeDraft(page: Page) {
    const identity = await seller(page);
    const cat = await category();
    // ONE scratch chain: its city and its sub-city are one city and one region
    // by the door's own count, inside the free plan (D0).
    const chain = await seedScratchChain("ET");
    places.push(chain.region.slug);
    const a = { city: chain.city };
    const b = { city: chain.subCity };
    // Step 7: these tests need no review judgment, so no public name is asked (D0).
    const draft = completeDraft({
      categoryId: cat.id,
      cityId: a.city.id,
      title: "e2e ordered places",
      step: 7,
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
    const { user, token, a, b, draft } = await placeDraft(page);
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
    const rows = await storedPlaces(id!);
    for (const row of rows) {
      const changed = await adminClient()
        .from("listing_locations")
        .update({
          created_at: row.position === 1 ? "2026-10-06T12:00:00Z" : "2026-10-05T12:00:00Z",
        })
        .eq("id", row.id);
      expect(changed.error).toBeNull();
    }
    const cleared = await adminClient()
      .from("listings")
      .update({ location_id: null })
      .eq("id", id!);
    expect(cleared.error).toBeNull();
    const saved = await rpc(page, "save_seller_place", { p_listing_id: id });
    expect(saved.error).toBeNull();
    expect(saved.data).toEqual({ ok: true });
    const place = await adminClient()
      .from("seller_places")
      .select("location_id")
      .eq("user_id", user.id)
      .single();
    expect(place.error).toBeNull();
    expect(place.data!.location_id).toBe(b.city.id);
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
