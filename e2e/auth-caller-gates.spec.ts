import { createClient } from "@supabase/supabase-js";
import { expect, test } from "./fixtures";
import { en } from "../src/i18n/locales/en";
import { adPageFixtures } from "./helpers/ad-page";
import { grantRole } from "./helpers/categories";
import { passwordGrant } from "./helpers/session";
import { stopPageBeforePurge } from "./helpers/posting";
import { adminClient, createUser, leaseUser } from "./helpers/users";
import {
  enrollAndStepUp,
  expectAal2,
  stepUpIfPrompted,
  switchUser,
  waitForHydration,
} from "./helpers/ui";
import { inOneWindow } from "./helpers/rate-window";

// DEC-241/242: scratch targets only; pooled accounts are consumers, never deactivated.
const fixtures = adPageFixtures();
const freshIds: string[] = [];
const consumerIds: string[] = [];
const staffIds: string[] = [];

function bearerClient(token: string) {
  const url = process.env["E2E_SUPABASE_URL"];
  const key = process.env["E2E_SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) throw new Error("[CG] staging client configuration missing");
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${token}` } },
  });
}

async function fresh() {
  const user = await createUser({ confirmed: true });
  freshIds.push(user.id);
  return user;
}

test.afterEach(async ({ page }) => {
  await stopPageBeforePurge(page);
  const admin = adminClient();
  for (const id of [...freshIds, ...consumerIds]) {
    for (const table of [
      "rate_overrides",
      "legal_acceptances",
      "saved_listings",
      "alias_history",
    ]) {
      const result = await admin.from(table).delete().eq("user_id", id);
      if (result.error) throw new Error(`[CG] ${table} cleanup: ${result.error.message}`);
    }
    const meters = await admin.from("rate_limits").delete().eq("key", id);
    if (meters.error) throw new Error(`[CG] rate cleanup: ${meters.error.message}`);
  }
  await fixtures.cleanup();
  for (const id of staffIds) {
    const roles = await admin
      .from("user_roles")
      .delete()
      .eq("user_id", id)
      .eq("scope_type", "global");
    if (roles.error) throw new Error(`[CG] staff role cleanup: ${roles.error.message}`);
    const factors = await admin.auth.admin.mfa.listFactors({ userId: id });
    if (factors.error) throw new Error(`[CG] staff factor read: ${factors.error.message}`);
    for (const factor of factors.data.factors) {
      const deleted = await admin.auth.admin.mfa.deleteFactor({ userId: id, id: factor.id });
      if (deleted.error) throw new Error(`[CG] staff factor cleanup: ${deleted.error.message}`);
    }
  }
  for (const id of freshIds) {
    const deleted = await admin.auth.admin.deleteUser(id);
    if (deleted.error) throw new Error(`[CG] scratch user cleanup: ${deleted.error.message}`);
  }
  freshIds.length = 0;
  consumerIds.length = 0;
  staffIds.length = 0;
});

test(
  "CG-1 a deactivated account is refused at the doors that had no gate",
  { tag: "@private-identity" },
  async ({ page }) => {
    test.setTimeout(180_000);
    const scratch = await fresh();
    const scaffold = await fixtures.scratchSeller();
    const listing = await fixtures.seed({
      id: scratch.id,
      leafId: scaffold.leafId,
      cityId: scaffold.cityId,
    });
    await fixtures.seedPhotos(listing.id, 1);
    const admin = adminClient();
    const photo = await admin
      .from("listing_photos")
      .select("id")
      .eq("listing_id", listing.id)
      .single();
    if (photo.error || !photo.data) throw new Error(`[CG] photo read: ${photo.error?.message}`);
    const before = await admin
      .from("listings")
      .select("cover_photo_id")
      .eq("id", listing.id)
      .single();
    if (before.error || !before.data) throw new Error(`[CG] cover read: ${before.error?.message}`);
    const session = await passwordGrant(scratch.email, scratch.password);
    const caller = bearerClient(session.access_token);
    const publicId = await fixtures.publicIdOf(listing.id);
    expect((await caller.rpc("save_listing", { p_public_id: publicId })).error).toBeNull();
    const versionIds: string[] = [];
    for (const kind of ["terms", "privacy"]) {
      const answer = await caller.rpc("legal_in_force", { p_kind: kind, p_country: "ET" });
      if (answer.error) throw new Error(`[CG] in-force read: ${answer.error.message}`);
      const body = answer.data as { version_id?: unknown } | null;
      if (typeof body?.version_id !== "string")
        throw new Error(`[CG] ${kind} has no in-force version`);
      versionIds.push(body.version_id);
    }
    const staff = await leaseUser();
    staffIds.push(staff.id);
    await grantRole(staff.id, "admin");
    await switchUser(page, staff.email, staff.password);
    const secret = await enrollAndStepUp(page);
    await page.goto(`/admin/users/${scratch.id}`);
    await waitForHydration(page);
    await page.getByTestId("deactivate-reason").fill("e2e caller gates refusal proof");
    await page.getByTestId("deactivate-user").click();
    await stepUpIfPrompted(page, secret);
    await expectAal2(page);
    await expect(page.getByTestId("user-status-card").getByTestId("user-status")).toHaveText(
      en["admin.users.status.deactivated"],
      { timeout: 15000 },
    );
    for (const [fn, args] of [
      ["set_cover_photo", { p_listing_id: listing.id, p_photo_id: photo.data.id }],
      ["unsave_listing", { p_public_id: publicId }],
      ["accept_legal", { p_version_ids: versionIds, p_language: "en", p_adult: true }],
    ] as const)
      expect((await caller.rpc(fn, args)).error?.message).toContain("account is deactivated");
    const after = await admin
      .from("listings")
      .select("cover_photo_id")
      .eq("id", listing.id)
      .single();
    expect(after.error).toBeNull();
    expect(after.data?.cover_photo_id).toBe(before.data.cover_photo_id);
    const saved = await admin
      .from("saved_listings")
      .select("listing_id")
      .eq("user_id", scratch.id)
      .eq("listing_id", listing.id);
    expect(saved.error).toBeNull();
    expect(saved.data).toEqual([{ listing_id: listing.id }]);
    const acceptances = await admin
      .from("legal_acceptances")
      .select("version_id")
      .eq("user_id", scratch.id);
    expect(acceptances.error).toBeNull();
    expect(acceptances.data).toEqual([]);
  },
);

test("CG-2 the three retired doors are closed to a signed-in account", async () => {
  const user = await leaseUser();
  consumerIds.push(user.id);
  const scaffold = await fixtures.scratchSeller();
  const draft = await fixtures.seed(
    { id: user.id, leafId: scaffold.leafId, cityId: scaffold.cityId },
    "draft",
  );
  const session = await passwordGrant(user.email, user.password);
  const caller = bearerClient(session.access_token);
  for (const [fn, args] of [
    ["delete_draft", { p_listing_id: draft.id }],
    ["confirm_home_country", { p_code: "ET" }],
    ["promote_to_super_admin", { p_target: user.id }],
  ] as const) {
    const { error } = await caller.rpc(fn, args);
    expect(error?.code).toBe("42501");
    expect(error?.message).toContain("permission denied for function");
    expect(error?.message).not.toMatch(/only a super admin|not your listing|not authenticated/);
  }
  const still = await adminClient().from("listings").select("id").eq("id", draft.id).single();
  expect(still.error).toBeNull();
  expect(still.data?.id).toBe(draft.id);
});

test(
  "CG-3 remove_own_password without a fresh password sign-in is refused and the password still works",
  { tag: "@private-identity" },
  async () => {
    const user = await fresh();
    const session = await passwordGrant(user.email, user.password);
    const result = await bearerClient(session.access_token).rpc("remove_own_password");
    expect(result.error?.message).toContain("recent sign-in required");
    expect((await passwordGrant(user.email, user.password)).user?.id).toBe(user.id);
  },
);

test(
  "CG-4 a fresh password sign-in is the proof — and the last-method rule still refuses an email-only account",
  { tag: "@private-identity" },
  async () => {
    const user = await fresh();
    const first = await passwordGrant(user.email, user.password);
    await passwordGrant(user.email, user.password);
    const result = await bearerClient(first.access_token).rpc("remove_own_password");
    expect(result.error?.message).toMatch(/last sign-in method/i);
    expect((await passwordGrant(user.email, user.password)).user?.id).toBe(user.id);
  },
);

test("CG-5 the dial", { tag: "@private-identity" }, async () => {
  const user = await fresh();
  const session = await passwordGrant(user.email, user.password);
  const override = await adminClient()
    .from("rate_overrides")
    .insert({ user_id: user.id, action: "password_remove", max_count: 2 });
  if (override.error) throw new Error(`[CG] dial override: ${override.error.message}`);
  await inOneWindow(3600, 15000, "CG-5 password removal");
  const caller = bearerClient(session.access_token);
  for (let call = 0; call < 2; call++)
    expect((await caller.rpc("remove_own_password")).error?.message).toContain(
      "recent sign-in required",
    );
  expect((await caller.rpc("remove_own_password")).error?.message).toContain("rateLimited");
});
