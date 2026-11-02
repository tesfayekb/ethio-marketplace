import { readFileSync } from "node:fs";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ReaderError } from "@/lib/reader-failure";

/** The door's answers, set per test; the client the seam opens is this stub. */
const door = {
  rows: [] as unknown[],
  error: null as { message: string; code: string; details: string; hint: string } | null,
  rpc: null as { message: string; code: string; details: string; hint: string } | null,
  calls: [] as Array<{ name: string; args: unknown }>,
};

vi.mock("@/lib/supabase-door", () => {
  const query = () => {
    const chain = {
      select: () => chain,
      eq: () => chain,
      order: () => chain,
      then: (resolve: (value: { data: unknown[] | null; error: unknown }) => unknown) =>
        resolve({ data: door.error === null ? door.rows : null, error: door.error }),
    };
    return chain;
  };
  return {
    getSupabase: async () => ({ from: () => query() }),
    rpc: async (name: string, args: unknown) => {
      door.calls.push({ name, args });
      return { data: null, error: door.rpc };
    },
  };
});

import {
  PackagesDoorError,
  endPrice,
  listPackagePrices,
  listPackages,
  packagesErrorKey,
  savePackage,
  savePrice,
} from "./packages-service";

/** P-1 M1c — the three staff doors, read for the messages they RAISE (TIR-5's shape). */
const M1C = "supabase/migrations/20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql";

const rpcError = (message: string, code = "P0001") => ({ message, code, details: "", hint: "" });

describe("the packages console's seam (P-1)", () => {
  beforeEach(() => {
    door.rows = [];
    door.error = null;
    door.rpc = null;
    door.calls = [];
  });

  it("PKS-1 the package rows are read as the console shows them", async () => {
    door.rows = [
      {
        key: "featured_45",
        tier: "featured",
        days: 45,
        enabled: true,
        self_serve: true,
        extends_lifetime: true,
        label_key: "package.featured_45",
        sort: 10,
        updated_at: "2026-11-02T08:00:00+00:00",
      },
    ];
    expect(await listPackages()).toEqual([
      {
        key: "featured_45",
        tier: "featured",
        days: 45,
        enabled: true,
        selfServe: true,
        extendsLifetime: true,
        labelKey: "package.featured_45",
        sort: 10,
        updatedAt: "2026-11-02T08:00:00+00:00",
      },
    ]);
  });

  it("PKS-2 a failed read is a typed ReaderError, never an empty roster; a tier the console does not know is malformed", async () => {
    door.error = rpcError("permission denied for table listing_packages", "42501");
    await expect(listPackages()).rejects.toBeInstanceOf(ReaderError);
    await expect(listPackagePrices("featured_45")).rejects.toBeInstanceOf(ReaderError);
    door.error = null;
    door.rows = [
      {
        key: "odd",
        tier: "gold",
        days: 1,
        enabled: true,
        self_serve: false,
        extends_lifetime: true,
        label_key: null,
        sort: 0,
        updated_at: "2026-11-02T08:00:00+00:00",
      },
    ];
    await expect(listPackages()).rejects.toMatchObject({ failure: { class: "malformed" } });
  });

  it("PKS-3 the price rows are read as stored — the amount is data, never computed (CF-PRICE-1)", async () => {
    door.rows = [
      {
        id: "6d1f1c2e-0000-4000-8000-000000000001",
        package_key: "featured_45",
        country_code: null,
        category_id: null,
        amount: 0,
        currency: "ETB",
        valid_from: "2026-11-01T00:00:00+00:00",
        valid_to: null,
      },
    ];
    expect(await listPackagePrices("featured_45")).toEqual([
      {
        id: "6d1f1c2e-0000-4000-8000-000000000001",
        packageKey: "featured_45",
        countryCode: null,
        categoryId: null,
        amount: 0,
        currency: "ETB",
        validFrom: "2026-11-01T00:00:00+00:00",
        validTo: null,
      },
    ]);
  });

  it("PKS-4 the doors take every field the editors hold (INC-188); an unset scope or window is left to the door's default", async () => {
    await savePackage({
      key: "gold_7",
      tier: "premium",
      days: 7,
      enabled: false,
      selfServe: true,
      extendsLifetime: false,
      labelKey: "package.gold_7",
      sort: null,
    });
    expect(door.calls[0]).toEqual({
      name: "admin_save_listing_package",
      args: {
        p_key: "gold_7",
        p_tier: "premium",
        p_days: 7,
        p_enabled: false,
        p_self_serve: true,
        p_extends_lifetime: false,
        p_label_key: "package.gold_7",
      },
    });
    await savePrice({
      packageKey: "gold_7",
      countryCode: null,
      categoryId: null,
      amount: 0,
      currency: "ETB",
      validFrom: null,
      validTo: "2026-12-01T00:00:00.000Z",
    });
    expect(door.calls[1]).toEqual({
      name: "admin_save_package_price",
      args: {
        p_package_key: "gold_7",
        p_amount: 0,
        p_currency: "ETB",
        p_valid_to: "2026-12-01T00:00:00.000Z",
      },
    });
    await endPrice("6d1f1c2e-0000-4000-8000-000000000001", null);
    expect(door.calls[2]).toEqual({
      name: "admin_end_package_price",
      args: { p_id: "6d1f1c2e-0000-4000-8000-000000000001" },
    });
  });

  it("PKS-5 a door's refusal is thrown with its message and SQLSTATE, never swallowed", async () => {
    door.rpc = rpcError("step-up required", "P0009");
    await expect(
      savePackage({
        key: "gold_7",
        tier: "premium",
        days: 7,
        enabled: true,
        selfServe: true,
        extendsLifetime: true,
        labelKey: "package.gold_7",
        sort: 0,
      }),
    ).rejects.toMatchObject({
      name: "PackagesDoorError",
      message: "step-up required",
      code: "P0009",
    });
    door.rpc = rpcError("overlapping window");
    await expect(endPrice("6d1f1c2e-0000-4000-8000-000000000001", null)).rejects.toBeInstanceOf(
      PackagesDoorError,
    );
  });

  it("PKS-6 every message the three doors RAISE has a key of its own; the step-up state and the fallback too (ruling 4, 3)", () => {
    const sql = readFileSync(M1C, "utf8");
    const doors = [
      "admin_save_listing_package",
      "admin_save_package_price",
      "admin_end_package_price",
    ];
    const raised = new Set<string>();
    for (const name of doors) {
      const start = sql.indexOf(`CREATE FUNCTION public.${name}(`);
      expect(start, `${name} is declared in M1c`).toBeGreaterThan(-1);
      const body = sql.slice(start, sql.indexOf("$function$;", start));
      for (const match of body.matchAll(/RAISE EXCEPTION '((?:[^']|'')*)'/g)) {
        raised.add((match[1] ?? "").replace(/''/g, "'"));
      }
    }
    raised.delete("not signed in");
    expect(raised.size).toBeGreaterThanOrEqual(15);
    for (const message of raised) {
      const { key, raw } = packagesErrorKey(message);
      expect(key, message).not.toBe("admin.packages.error.unknown");
      expect(raw).toBeNull();
    }
    expect(packagesErrorKey("", "P0009")).toEqual({
      key: "admin.packages.error.stepUp",
      raw: null,
    });
    expect(packagesErrorKey("step-up required")).toEqual({
      key: "admin.packages.error.stepUp",
      raw: null,
    });
    expect(packagesErrorKey("price already ended")).toEqual({
      key: "admin.packages.error.alreadyEnded",
      raw: null,
    });
    expect(packagesErrorKey("something new")).toEqual({
      key: "admin.packages.error.unknown",
      raw: "something new",
    });
    expect(packagesErrorKey("")).toEqual({ key: "admin.packages.error.unknown", raw: null });
  });
});
