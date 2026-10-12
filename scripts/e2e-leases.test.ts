import { describe, expect, it } from "vitest";

import { check, counts, LIMIT, overLimit, readE2e, type Source } from "./e2e-leases";

/**
 * Bundle 11 turn C5 — INC-555's class (DEC-174): no e2e test leases more than
 * two pooled accounts. Proven on planted files, then run on the tree. Planted
 * titles carry no test id, so the test-id check (TI-1) does not read them.
 */
const USERS: Source = {
  file: "e2e/helpers/users.ts",
  text: [
    "export async function leaseUser() { await reapPoolAccount(); return {}; }",
    "async function reapPoolAccount() {}",
    "export async function createUser(options: { confirmed: boolean }) { return options; }",
  ].join("\n"),
};
const POSTING: Source = {
  file: "e2e/helpers/posting.ts",
  text: [
    'import { leaseUser } from "./users";',
    "export async function leaseSeller() { const user = await leaseUser(); return user; }",
  ].join("\n"),
};
const UI: Source = {
  file: "e2e/helpers/ui.ts",
  text: "export async function useJobSuperAdmin(page: unknown) { return { page }; }",
};
const F = "e2e/planted.spec.ts";
const planted = (...lines: string[]): Source[] => [
  USERS,
  POSTING,
  UI,
  { file: F, text: lines.join("\n") },
];

describe("the pooled-lease check (DEC-174)", () => {
  it("EL-1 a test over two leases is refused, counted through a helper and the file's own function", () => {
    expect(LIMIT).toBe(2);
    const sources = planted(
      'import { leaseUser } from "./helpers/users";',
      'import { leaseSeller } from "./helpers/posting";',
      "async function seller() { return leaseSeller(); }",
      'test("Z1 two", async () => { await leaseUser(); await seller(); });',
      'test("Z2 three", async () => { await leaseUser(); await seller(); await leaseSeller(); });',
      'test.skip("Z2b three", async () => { await seller(); await seller(); await seller(); });',
    );
    expect(check(sources)).toEqual([
      `${F}:5 Z2 leases 3 pooled accounts (limit 2)`,
      `${F}:6 Z2b leases 3 pooled accounts (limit 2)`,
    ]);
    expect(counts(sources).map((count) => count.leases)).toEqual([2, 3, 3]);
  });

  it("EL-2 a beforeEach counts in every test around it; a beforeAll counts on its own, by name too", () => {
    const sources = planted(
      'import { leaseUser } from "./helpers/users";',
      "async function two() { await leaseUser(); await leaseUser(); }",
      'test.describe("d", () => {',
      "  test.beforeEach(async () => { await leaseUser(); });",
      '  test("Z3 inside", async () => { await leaseUser(); await leaseUser(); });',
      "});",
      'test("Z4 outside", async () => { await two(); });',
      "test.beforeAll(two);",
      'test.describe("e", () => { test.beforeAll(async () => { await two(); await leaseUser(); }); });',
    );
    expect(check(sources)).toEqual([
      `${F}:5 Z3 leases 3 pooled accounts (limit 2)`,
      `${F}:9 beforeAll leases 3 pooled accounts (limit 2)`,
    ]);
  });

  it("EL-3 a lease in a loop is refused; a named function counts where it is called; both arms of an if count; the job super admin and a fresh account are not leases", () => {
    const sources = planted(
      'import { leaseUser as lease, createUser } from "./helpers/users";',
      'import { useJobSuperAdmin } from "./helpers/ui";',
      'test("Z5 loop", async () => { for (const n of [1, 2]) await lease(); });',
      'test("Z6 callback", async () => { await Promise.all([1].map(() => lease())); });',
      'test("Z7 named", async () => { const one = async () => lease(); await one(); await one(); });',
      'test("Z8 branches", async () => { if (Math.random()) await lease(); else await lease(); await lease(); });',
      'test("Z9 fresh", async ({ page }) => { await useJobSuperAdmin(page); await createUser({ confirmed: true }); await lease(); await lease(); });',
      'test("Z10 step", async () => { await test.step("s", async () => { await lease(); }); });',
    );
    expect(check(sources)).toEqual([
      `${F}:3 Z5 leases pooled accounts in a loop (limit 2)`,
      `${F}:4 Z6 leases pooled accounts in a loop (limit 2)`,
      `${F}:6 Z8 leases 3 pooled accounts (limit 2)`,
    ]);
    expect(counts(sources).find((count) => count.what === "Z7")?.leases).toBe(2);
    expect(counts(sources).find((count) => count.what === "Z10")?.leases).toBe(1);
  });

  // INC-571 — this case parses the whole e2e tree (about ninety files, 2.3 MB) with the
  // TypeScript parser, once: about 2 s alone, slower while the component job runs every
  // test file at once. It timed out at the 5 s default when it parsed the tree twice.
  it("EL-4 no e2e test or hook leases more than two pooled accounts", () => {
    const all = counts(readE2e());
    expect(all.length).toBeGreaterThan(500);
    expect(all.some((count) => count.leases > 0)).toBe(true);
    expect(overLimit(all)).toEqual([]);
  }, 20_000);
});
