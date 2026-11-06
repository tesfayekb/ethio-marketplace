import { expect, test } from "./fixtures";
import { scratchCountryCode } from "./helpers/countries";
import { bearerClient, passwordGrant } from "./helpers/session";
import { adminClient, createUser, grantRole, leaseUser } from "./helpers/users";

/**
 * F1-1 (DEC-333) — THE DOOR MECHANISM'S REFUSALS, proven at the doors M-F1a
 * put onto it. Every test drives the door directly with one account's bearer
 * (no browser), as the app's client would, and reads the truth back with the
 * service role (J4).
 *
 *  DRF-1  INC-409: `has_permission` answers only about the caller — another
 *        signed-in account asking about a holder reads false, never the truth.
 *  DRF-2  INC-409: a super admin and the service role still read the truth.
 *  DRF-3  INC-838: a reader behind `door_context('reader')` refuses a
 *        deactivated account with the code `accountDeactivated`, and a
 *        reader spends no dial.
 *  DRF-4  INC-844: a refusal the shell returns (`door_refused`) COUNTS — the
 *        dial and `door_refusals` both move, the code is the message, the
 *        password is untouched.
 *  DRF-5  INC-834: scope mode `match` — a country grant passes for its own
 *        country only; a global grant passes everywhere.
 *  DRF-6  INC-834: scope mode `global` refuses a country grant (`scope`);
 *        `filter` narrows a country grant to its countries and leaves a
 *        global grant unbounded.
 *
 * DEC-241/242: scratch targets only; pooled accounts are consumers whose
 * roles the pool reaper resets, and this file removes what it granted.
 */

const DOOR_CODE_STATE = "P0D01";
const freshIds: string[] = [];
const leasedIds: string[] = [];
const grantedRoleIds: Array<{ userId: string; roleName: string }> = [];

async function fresh() {
  const user = await createUser({ confirmed: true });
  freshIds.push(user.id);
  return user;
}

async function leased() {
  const user = await leaseUser();
  leasedIds.push(user.id);
  return user;
}

/** A moderator grant scoped to one country (INC-1049's helper grants global only). */
async function grantScopedRole(userId: string, roleName: string, country: string) {
  const admin = adminClient();
  const role = await admin.from("roles").select("id").eq("name", roleName).single();
  if (role.error || !role.data) throw new Error(`[DRF] role ${roleName}: ${role.error?.message}`);
  const grant = await admin.from("user_roles").insert({
    user_id: userId,
    role_id: role.data.id,
    scope_type: "country",
    scope_country: country,
  });
  if (grant.error) throw new Error(`[DRF] scoped grant: ${grant.error.message}`);
  grantedRoleIds.push({ userId, roleName });
}

/** Two distinct user-assigned country codes (no countries row is needed: user_roles has no key to it). */
async function twoScratchCountries(): Promise<[string, string]> {
  const first = await scratchCountryCode();
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const second = await scratchCountryCode();
    if (second !== first) return [first, second];
  }
  throw new Error("[DRF] could not pick two distinct scratch country codes");
}

async function dialCount(userId: string, action: string): Promise<number> {
  const rows = await adminClient()
    .from("rate_limits")
    .select("count")
    .eq("key", userId)
    .eq("action", action);
  if (rows.error) throw new Error(`[DRF] rate_limits read: ${rows.error.message}`);
  return (rows.data ?? []).reduce((sum, row) => sum + Number(row.count ?? 0), 0);
}

async function refusalCount(door: string, code: string): Promise<number> {
  const rows = await adminClient()
    .from("door_refusals")
    .select("count")
    .eq("door", door)
    .eq("code", code);
  if (rows.error) throw new Error(`[DRF] door_refusals read: ${rows.error.message}`);
  return (rows.data ?? []).reduce((sum, row) => sum + Number(row.count ?? 0), 0);
}

test.afterEach(async () => {
  const admin = adminClient();
  for (const { userId, roleName } of grantedRoleIds) {
    const role = await admin.from("roles").select("id").eq("name", roleName).single();
    if (role.error || !role.data) throw new Error(`[DRF] role read: ${role.error?.message}`);
    const removed = await admin
      .from("user_roles")
      .delete()
      .eq("user_id", userId)
      .eq("role_id", role.data.id);
    if (removed.error) throw new Error(`[DRF] role cleanup: ${removed.error.message}`);
  }
  grantedRoleIds.length = 0;
  for (const id of [...freshIds, ...leasedIds]) {
    const meters = await admin.from("rate_limits").delete().eq("key", id);
    if (meters.error) throw new Error(`[DRF] rate cleanup: ${meters.error.message}`);
  }
  for (const id of freshIds) {
    const deleted = await admin.auth.admin.deleteUser(id);
    if (deleted.error) throw new Error(`[DRF] scratch user cleanup: ${deleted.error.message}`);
  }
  freshIds.length = 0;
  leasedIds.length = 0;
});

test("DRF-1 has_permission answers about the caller only: another account asking about a holder reads false", async () => {
  const holder = await leased();
  const other = await leased();
  await grantRole(holder.id, "moderator");
  grantedRoleIds.push({ userId: holder.id, roleName: "moderator" });
  const pair = { p_user_id: holder.id, p_resource: "listings", p_action: "view" };

  const asHolder = bearerClient((await passwordGrant(holder.email, holder.password)).access_token);
  const own = await asHolder.rpc("has_permission", pair);
  expect(own.error).toBeNull();
  expect(own.data, "the holder reads the truth about itself").toBe(true);

  const asOther = bearerClient((await passwordGrant(other.email, other.password)).access_token);
  const aboutHolder = await asOther.rpc("has_permission", pair);
  expect(aboutHolder.error, "a false answer, never a RAISE (policies read this)").toBeNull();
  expect(aboutHolder.data, "another account reads false about the holder").toBe(false);
  const aboutSelf = await asOther.rpc("has_permission", { ...pair, p_user_id: other.id });
  expect(aboutSelf.error).toBeNull();
  expect(aboutSelf.data, "the other account holds no listings:view").toBe(false);
});

test("DRF-2 a super admin and the service role still read the truth about a holder", async () => {
  const holder = await leased();
  await grantRole(holder.id, "moderator");
  grantedRoleIds.push({ userId: holder.id, roleName: "moderator" });
  const pair = { p_user_id: holder.id, p_resource: "listings", p_action: "view" };

  const superAdmin = await fresh();
  await grantRole(superAdmin.id, "super_admin");
  const asSuper = bearerClient(
    (await passwordGrant(superAdmin.email, superAdmin.password)).access_token,
  );
  const bySuper = await asSuper.rpc("has_permission", pair);
  expect(bySuper.error).toBeNull();
  expect(bySuper.data, "a super admin reads the truth").toBe(true);

  const byService = await adminClient().rpc("has_permission", pair);
  expect(byService.error).toBeNull();
  expect(byService.data, "the service role reads the truth").toBe(true);
});

test("DRF-3 a reader behind door_context refuses a deactivated account by code and spends no dial", async () => {
  const user = await fresh();
  const session = await passwordGrant(user.email, user.password, { fresh: true });
  const caller = bearerClient(session.access_token);
  const before = await caller.rpc("has_password");
  expect(before.error).toBeNull();
  expect(before.data, "an active password account reads true").toBe(true);

  const admin = adminClient();
  const deactivated = await admin
    .from("profiles")
    .update({ account_status: "deactivated" })
    .eq("user_id", user.id);
  if (deactivated.error) throw new Error(`[DRF] deactivation: ${deactivated.error.message}`);

  const after = await caller.rpc("has_password");
  expect(after.error?.code, "a reader's refusal is door_refuse's RAISE").toBe(DOOR_CODE_STATE);
  expect(after.error?.message, "the code, never a sentence").toBe("accountDeactivated");
  expect(after.data).toBeNull();
  const meters = await admin.from("rate_limits").select("action").eq("key", user.id);
  expect(meters.error).toBeNull();
  expect(meters.data, "a reader spends no dial").toEqual([]);
});

test("DRF-4 a refusal the shell returns counts the dial and door_refusals; the code is the message; the password stays", async () => {
  const user = await fresh();
  const first = await passwordGrant(user.email, user.password, { fresh: true });
  await passwordGrant(user.email, user.password, { fresh: true });
  const caller = bearerClient(first.access_token);
  const refusalsBefore = await refusalCount("remove_own_password", "lastSignInMethod");
  expect(await dialCount(user.id, "password_remove")).toBe(0);

  const once = await caller.rpc("remove_own_password");
  expect(once.error?.code, "the shell's envelope carries the door state").toBe(DOOR_CODE_STATE);
  expect(once.error?.message, "the code, never a sentence").toBe("lastSignInMethod");
  expect(once.data).toBeNull();
  expect(await dialCount(user.id, "password_remove"), "the refusal counted once").toBe(1);

  const twice = await caller.rpc("remove_own_password");
  expect(twice.error?.message).toBe("lastSignInMethod");
  expect(await dialCount(user.id, "password_remove"), "every refusal counts").toBe(2);
  // door_refusals has no person column (one row per door, code and day), so another
  // worker's refusal of the same door — the other project running this very test —
  // moves it too; it only ever grows, so the proof is "at least our two". The exact
  // once-per-refusal count is the per-user dial above.
  expect(
    (await refusalCount("remove_own_password", "lastSignInMethod")) - refusalsBefore,
    "door_refusals moved by at least the two refusals",
  ).toBeGreaterThanOrEqual(2);
  expect(
    (await passwordGrant(user.email, user.password, { fresh: true })).user?.["id"],
    "the password still signs in",
  ).toBe(user.id);
});

test("DRF-5 scope mode match: a country grant passes for its own country only, a global grant everywhere", async () => {
  const [home, away] = await twoScratchCountries();
  const scoped = await leased();
  await grantScopedRole(scoped.id, "moderator", home);
  const global = await leased();
  await grantRole(global.id, "moderator");
  grantedRoleIds.push({ userId: global.id, roleName: "moderator" });
  const admin = adminClient();
  const ask = (userId: string, country: string | null) =>
    admin.rpc("has_permission_scoped", {
      p_user_id: userId,
      p_resource: "listings",
      p_action: "view",
      p_country: country,
      p_mode: "match",
    });

  const own = await ask(scoped.id, home);
  expect(own.error).toBeNull();
  expect(own.data).toEqual([{ allowed: true, countries: [home], detail: null }]);
  const elsewhere = await ask(scoped.id, away);
  expect(elsewhere.error).toBeNull();
  expect(elsewhere.data).toEqual([{ allowed: false, countries: [home], detail: "scope" }]);
  const nowhere = await ask(scoped.id, null);
  expect(nowhere.error).toBeNull();
  expect(nowhere.data).toEqual([{ allowed: false, countries: [home], detail: "scope" }]);
  const anywhere = await ask(global.id, away);
  expect(anywhere.error).toBeNull();
  expect(anywhere.data).toEqual([{ allowed: true, countries: null, detail: null }]);
});

test("DRF-6 scope mode global refuses a country grant; filter narrows it and leaves a global grant unbounded", async () => {
  const [home] = await twoScratchCountries();
  const scoped = await leased();
  await grantScopedRole(scoped.id, "moderator", home);
  const global = await leased();
  await grantRole(global.id, "moderator");
  grantedRoleIds.push({ userId: global.id, roleName: "moderator" });
  const admin = adminClient();
  const ask = (userId: string, mode: string) =>
    admin.rpc("has_permission_scoped", {
      p_user_id: userId,
      p_resource: "listings",
      p_action: "view",
      p_country: null,
      p_mode: mode,
    });

  const scopedGlobal = await ask(scoped.id, "global");
  expect(scopedGlobal.error).toBeNull();
  expect(scopedGlobal.data).toEqual([{ allowed: false, countries: null, detail: "scope" }]);
  const globalGlobal = await ask(global.id, "global");
  expect(globalGlobal.error).toBeNull();
  expect(globalGlobal.data).toEqual([{ allowed: true, countries: null, detail: null }]);
  const scopedFilter = await ask(scoped.id, "filter");
  expect(scopedFilter.error).toBeNull();
  expect(scopedFilter.data).toEqual([{ allowed: true, countries: [home], detail: null }]);
  const globalFilter = await ask(global.id, "filter");
  expect(globalFilter.error).toBeNull();
  expect(globalFilter.data).toEqual([{ allowed: true, countries: null, detail: null }]);
  const unknownMode = await ask(global.id, "sideways");
  expect(unknownMode.error?.message, "an unknown mode is an error, never a pass").toContain(
    "unknown scope mode",
  );
});
