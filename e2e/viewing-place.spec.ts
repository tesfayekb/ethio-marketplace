import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Page } from "@playwright/test";

import { expect, test } from "./fixtures";
import { destroyLocation, seedScratchChain } from "./helpers/locations";
import { bearerOf } from "./helpers/posting";
import { gotoReady, signInViaSession } from "./helpers/ui";
import { adminClient, leaseUser } from "./helpers/users";

/**
 * D106 part 1 (2026-10-10) — THE BROWSING PLACE ON THE ACCOUNT: its two doors.
 *
 * `user_set_viewing_location` is the only writer: the caller's own row, the
 * `viewing_place` dial, a place visible in an open market's tree, NULL clears.
 * `my_viewing_location` is the owner's read. Both are called through the user's
 * own client — the app's connection. Scratch places only (J3); every test
 * clears its own account place and dial override in afterEach.
 */

type Answer = Record<string, unknown>;

test.describe("VIEWING PLACE — the account doors (D106)", () => {
  const users: string[] = [];
  const regions: string[] = [];

  test.afterEach(async () => {
    for (const id of users.splice(0)) {
      const cleared = await adminClient()
        .from("profiles")
        .update({ viewing_location_id: null, viewing_location_at: null })
        .eq("user_id", id);
      if (cleared.error) {
        throw new Error(`[e2e:vp] clearing the account place failed: ${cleared.error.message}`);
      }
      const dial = await adminClient()
        .from("rate_overrides")
        .delete()
        .eq("user_id", id)
        .eq("action", "viewing_place");
      if (dial.error)
        throw new Error(`[e2e:vp] removing the dial override failed: ${dial.error.message}`);
    }
    for (const slug of regions.splice(0)) await destroyLocation(slug);
  });

  async function signedIn(page: Page): Promise<{ id: string; own: SupabaseClient }> {
    const user = await leaseUser();
    users.push(user.id);
    await signInViaSession(page, user.email, user.password);
    await gotoReady(page, "/");
    const token = await bearerOf(page);
    const own = createClient(
      process.env["E2E_SUPABASE_URL"]!,
      process.env["E2E_SUPABASE_PUBLISHABLE_KEY"]!,
      {
        global: { headers: { Authorization: `Bearer ${token}` } },
        auth: { persistSession: false },
      },
    );
    return { id: user.id, own };
  }

  async function chain() {
    const c = await seedScratchChain("ET");
    regions.push(c.region.slug);
    return c;
  }

  async function stored(userId: string) {
    const { data, error } = await adminClient()
      .from("profiles")
      .select("viewing_location_id, viewing_location_at")
      .eq("user_id", userId)
      .single();
    expect(error).toBeNull();
    return data as { viewing_location_id: string | null; viewing_location_at: string | null };
  }

  async function setPlace(own: SupabaseClient, id: string | null): Promise<Answer> {
    const { data, error } = await own.rpc("user_set_viewing_location", { p_location: id });
    expect(error, JSON.stringify(error)).toBeNull();
    return data as Answer;
  }

  async function readPlace(own: SupabaseClient): Promise<Answer> {
    const { data, error } = await own.rpc("my_viewing_location");
    expect(error, JSON.stringify(error)).toBeNull();
    return data as Answer;
  }

  test("VP-1 a visible place is saved on the account with its time, and read back", async ({
    page,
  }) => {
    const { id, own } = await signedIn(page);
    const c = await chain();

    const set = await setPlace(own, c.city.id);
    expect(set).toMatchObject({ ok: true, id: c.city.id, country: "ET" });
    const at = Date.parse(String(set["at"]));
    expect(Number.isNaN(at)).toBe(false);

    const row = await stored(id);
    expect(row.viewing_location_id).toBe(c.city.id);
    expect(Date.parse(row.viewing_location_at ?? "")).toBe(at);

    const read = await readPlace(own);
    expect(read).toMatchObject({ id: c.city.id, country: "ET", usable: true });
    expect(Date.parse(String(read["at"]))).toBe(at);
  });

  test("VP-2 a place that is not shown is refused, and the saved place stays", async ({ page }) => {
    const { id, own } = await signedIn(page);
    const c = await chain();
    expect(await setPlace(own, c.city.id)).toMatchObject({ ok: true });
    const before = await stored(id);

    const retired = await chain();
    const off = await adminClient()
      .from("locations")
      .update({ is_active: false })
      .eq("id", retired.subCity.id);
    expect(off.error).toBeNull();
    const underRetired = await chain();
    const region = await adminClient()
      .from("locations")
      .update({ is_active: false })
      .eq("id", underRetired.region.id);
    expect(region.error).toBeNull();

    for (const place of [retired.subCity.id, underRetired.city.id, crypto.randomUUID()]) {
      expect(await setPlace(own, place), place).toEqual({ ok: false, reason: "placeNotOpen" });
    }
    expect(await stored(id)).toEqual(before);
  });

  test("VP-3 a saved place that stops being shown reads as not usable; NULL clears", async ({
    page,
  }) => {
    const { id, own } = await signedIn(page);
    const c = await chain();
    expect(await setPlace(own, c.city.id)).toMatchObject({ ok: true });

    const off = await adminClient()
      .from("locations")
      .update({ is_active: false })
      .eq("id", c.city.id);
    expect(off.error).toBeNull();
    expect(await readPlace(own)).toMatchObject({ id: c.city.id, country: "ET", usable: false });

    expect(await setPlace(own, null)).toEqual({ ok: true, id: null, country: null, at: null });
    expect(await stored(id)).toEqual({ viewing_location_id: null, viewing_location_at: null });
    expect(await readPlace(own)).toEqual({ id: null, country: null, at: null, usable: false });
  });

  test("VP-4 the viewing_place dial refuses the call past the account's limit", async ({
    page,
  }) => {
    const { id, own } = await signedIn(page);
    const c = await chain();
    const override = await adminClient()
      .from("rate_overrides")
      .insert({ user_id: id, action: "viewing_place", max_count: 2 });
    expect(override.error).toBeNull();

    expect(await setPlace(own, c.region.id)).toMatchObject({ ok: true });
    expect(await setPlace(own, c.city.id)).toMatchObject({ ok: true });
    const third = await setPlace(own, c.subCity.id);
    expect(third).toMatchObject({ ok: false, reason: "rateLimited" });
    expect(typeof third["resets_at"]).toBe("string");
    expect((await stored(id)).viewing_location_id).toBe(c.city.id);
  });

  test("VP-5 no session reaches either door, and the owner's client cannot write the columns", async ({
    page,
  }) => {
    const { id, own } = await signedIn(page);
    const c = await chain();
    expect(await setPlace(own, c.city.id)).toMatchObject({ ok: true });
    const before = await stored(id);

    const anon = createClient(
      process.env["E2E_SUPABASE_URL"]!,
      process.env["E2E_SUPABASE_PUBLISHABLE_KEY"]!,
      { auth: { persistSession: false } },
    );
    expect(
      (await anon.rpc("user_set_viewing_location", { p_location: c.city.id })).error,
    ).not.toBeNull();
    expect((await anon.rpc("my_viewing_location")).error).not.toBeNull();

    for (const patch of [
      { viewing_location_id: c.region.id },
      { viewing_location_at: new Date().toISOString() },
    ]) {
      const result = await own.from("profiles").update(patch).eq("user_id", id).select("user_id");
      expect(result.error, `VP-5: ${Object.keys(patch)[0]} was written directly`).not.toBeNull();
    }
    expect(await stored(id)).toEqual(before);
  });
});
