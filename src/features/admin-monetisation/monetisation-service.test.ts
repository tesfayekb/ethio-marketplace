import { readFileSync } from "node:fs";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ReaderError } from "@/lib/reader-failure";
import { readRefusal } from "@/lib/refusal";

/** The doors' answers, set per test; the client the seam opens is this stub. */
const door = {
  answer: null as unknown,
  rpc: null as { message: string; code: string; details: string; hint: string } | null,
  calls: [] as Array<{ name: string; args: unknown }>,
};

vi.mock("@/lib/supabase-door", () => ({
  rpc: async (name: string, args: unknown) => {
    door.calls.push({ name, args });
    return { data: door.rpc === null ? door.answer : null, error: door.rpc };
  },
}));

import {
  MonetisationDoorError,
  clearOverride,
  editPrice,
  endPrice,
  listMonetisation,
  saveMarket,
  saveOverride,
  savePrice,
  saveProduct,
} from "./monetisation-service";
import { MONETISATION_DOOR_REFUSALS } from "./monetisation-refusals";

/**
 * P-1b M-a, M-b and M-c, then F1-6b — the doors, read for the codes they
 * refuse with (TIR-5's shape): each door's body in the migration that put it on
 * the shell, its `door_refuse` codes read from the text.
 */
const MIGRATIONS = {
  "supabase/migrations/20261119030500_302ae04a-edb0-4e52-95fd-98f8f7184799.sql": [
    "admin_save_package_price",
  ],
  "supabase/migrations/20261119030600_5cdaa8d4-b7f3-44b4-983f-e621b954d059.sql": [
    "admin_edit_package_price",
    "admin_end_package_price",
  ],
  "supabase/migrations/20261119030700_eacb4fad-dd6e-41ad-908a-6412ceca2a87.sql": [
    "admin_save_level_override",
    "admin_clear_level_override",
  ],
  "supabase/migrations/20261119030800_cccdea6a-654a-4df4-8ec9-a595a9aff987.sql": [
    "admin_save_listing_package",
    "admin_save_market_settings",
  ],
} as const;

const rpcError = (message: string, code = "P0001") => ({ message, code, details: "", hint: "" });

const ATTRIBUTION = {
  created_at: "2026-11-03T08:00:00+00:00",
  updated_at: "2026-11-03T09:00:00+00:00",
  created_by_name: "Abebe",
  updated_by_name: "Sara",
};

const CONSOLE = {
  markets: [
    {
      id: "6d1f1c2e-0000-4000-8000-000000000010",
      country_code: null,
      free_regular_ads: 3,
      included_reach: "city",
      paid_levels: false,
      launch_credits: null,
      launch_days: null,
      paid_levels_since: null,
      ...ATTRIBUTION,
    },
  ],
  products: [
    {
      key: "boosted",
      kind: "level",
      name_en: "Boosted",
      name_am: null,
      days: 30,
      max_photos: 12,
      placement: "boost",
      badge: true,
      enabled: true,
      self_serve: true,
      extends_lifetime: false,
      sort: 20,
      ...ATTRIBUTION,
    },
  ],
  overrides: [
    {
      id: "6d1f1c2e-0000-4000-8000-000000000020",
      level_key: "boosted",
      category_id: "6d1f1c2e-0000-4000-8000-000000000030",
      country_code: null,
      days: 45,
      max_photos: null,
      placement: null,
      badge: null,
      ...ATTRIBUTION,
    },
  ],
  prices: [
    {
      id: "6d1f1c2e-0000-4000-8000-000000000001",
      package_key: "boosted",
      country_code: "ET",
      category_id: null,
      amount: "150.00",
      currency: "ETB",
      credit_cost: 4,
      valid_from: "2026-11-01T00:00:00+00:00",
      valid_to: null,
      used_count: 0,
      ...ATTRIBUTION,
    },
  ],
};

describe("the monetisation console's seam (P-1b)", () => {
  beforeEach(() => {
    door.answer = null;
    door.rpc = null;
    door.calls = [];
  });

  it("MNS-1 the one read answers the four tables as the console shows them — staff names, never ids; a numeric text amount read as a number", async () => {
    door.answer = CONSOLE;
    const console = await listMonetisation();
    expect(door.calls).toEqual([{ name: "admin_list_monetisation", args: undefined }]);
    expect(console.markets).toEqual([
      {
        id: "6d1f1c2e-0000-4000-8000-000000000010",
        countryCode: null,
        freeRegularAds: 3,
        includedReach: "city",
        paidLevels: false,
        launchCredits: null,
        launchDays: null,
        paidLevelsSince: null,
        createdByName: "Abebe",
        updatedByName: "Sara",
        updatedAt: "2026-11-03T09:00:00+00:00",
      },
    ]);
    expect(console.products[0]).toMatchObject({
      key: "boosted",
      kind: "level",
      nameEn: "Boosted",
      nameAm: null,
      days: 30,
      maxPhotos: 12,
      placement: "boost",
      badge: true,
      sort: 20,
      createdByName: "Abebe",
    });
    expect(console.overrides[0]).toMatchObject({
      levelKey: "boosted",
      categoryId: "6d1f1c2e-0000-4000-8000-000000000030",
      countryCode: null,
      days: 45,
      maxPhotos: null,
      placement: null,
      badge: null,
    });
    expect(console.prices[0]).toMatchObject({
      packageKey: "boosted",
      countryCode: "ET",
      amount: 150,
      currency: "ETB",
      creditCost: 4,
      usedCount: 0,
      validTo: null,
    });
    expect(Object.keys(console.prices[0] ?? {})).not.toContain("createdBy");
  });

  it("MNS-2 a refused or malformed read is a typed ReaderError, never an empty console", async () => {
    door.rpc = rpcError("permissionDenied", "P0D01");
    await expect(listMonetisation()).rejects.toBeInstanceOf(ReaderError);
    door.rpc = null;
    door.answer = { ...CONSOLE, products: [{ ...CONSOLE.products[0], kind: "gold" }] };
    await expect(listMonetisation()).rejects.toMatchObject({ failure: { class: "malformed" } });
    door.answer = { ...CONSOLE, prices: [{ ...CONSOLE.prices[0], amount: "soon" }] };
    await expect(listMonetisation()).rejects.toMatchObject({ failure: { class: "malformed" } });
    door.answer = { markets: [], products: [], overrides: [] };
    await expect(listMonetisation()).rejects.toMatchObject({ failure: { class: "malformed" } });
  });

  it("MNS-3 the doors take every field the editors hold (INC-188); an unset value is left to the door", async () => {
    await saveProduct({
      key: "boosted",
      kind: "level",
      nameEn: "Boosted",
      nameAm: null,
      days: 30,
      enabled: true,
      selfServe: true,
      extendsLifetime: false,
      maxPhotos: 12,
      placement: "boost",
      badge: true,
      caps: null,
      sort: null,
    });
    expect(door.calls[0]).toEqual({
      name: "admin_save_listing_package",
      args: {
        p_key: "boosted",
        p_kind: "level",
        p_name_en: "Boosted",
        p_days: 30,
        p_enabled: true,
        p_self_serve: true,
        p_extends_lifetime: false,
        p_max_photos: 12,
        p_placement: "boost",
        p_badge: true,
      },
    });
    await saveProduct({
      key: "nationwide",
      kind: "reach",
      nameEn: "Nationwide",
      nameAm: "",
      days: 30,
      enabled: true,
      selfServe: true,
      extendsLifetime: true,
      maxPhotos: null,
      placement: null,
      badge: null,
      caps: { maxCities: null, maxRegions: 3, maxCountries: 1 },
      sort: 5,
    });
    expect(door.calls[1]?.args).toEqual({
      p_key: "nationwide",
      p_kind: "reach",
      p_name_en: "Nationwide",
      p_name_am: "",
      p_days: 30,
      p_enabled: true,
      p_self_serve: true,
      p_extends_lifetime: true,
      // A reach row's caps: exactly the three keys, a blank one a JSON null (DEC-356).
      p_caps: { max_cities: null, max_regions: 3, max_countries: 1 },
      p_sort: 5,
    });
    await saveOverride({
      levelKey: "boosted",
      categoryId: "6d1f1c2e-0000-4000-8000-000000000030",
      countryCode: null,
      days: 45,
      maxPhotos: null,
      placement: null,
      badge: false,
    });
    expect(door.calls[2]).toEqual({
      name: "admin_save_level_override",
      args: {
        p_level_key: "boosted",
        p_category_id: "6d1f1c2e-0000-4000-8000-000000000030",
        p_days: 45,
        p_badge: false,
      },
    });
    await clearOverride("6d1f1c2e-0000-4000-8000-000000000020");
    expect(door.calls[3]).toEqual({
      name: "admin_clear_level_override",
      args: { p_id: "6d1f1c2e-0000-4000-8000-000000000020" },
    });
    const price = {
      packageKey: "boosted",
      countryCode: "ET",
      categoryId: null,
      amount: 150,
      currency: "ETB",
      creditCost: 4,
      validFrom: null,
      validTo: "2026-12-31T23:59:59.999Z",
    };
    await savePrice(price);
    expect(door.calls[4]).toEqual({
      name: "admin_save_package_price",
      args: {
        p_package_key: "boosted",
        p_amount: 150,
        p_currency: "ETB",
        p_credit_cost: 4,
        p_country_code: "ET",
        p_valid_to: "2026-12-31T23:59:59.999Z",
      },
    });
    await editPrice("6d1f1c2e-0000-4000-8000-000000000001", { ...price, validTo: null });
    expect(door.calls[5]).toEqual({
      name: "admin_edit_package_price",
      args: {
        p_id: "6d1f1c2e-0000-4000-8000-000000000001",
        p_amount: 150,
        p_currency: "ETB",
        p_credit_cost: 4,
        p_country_code: "ET",
      },
    });
    await endPrice("6d1f1c2e-0000-4000-8000-000000000001", null);
    expect(door.calls[6]).toEqual({
      name: "admin_end_package_price",
      args: { p_id: "6d1f1c2e-0000-4000-8000-000000000001" },
    });
    await saveMarket({
      countryCode: "XZ",
      freeRegularAds: 2,
      includedReach: "city",
      paidLevels: true,
      launchCredits: 10,
      launchDays: 30,
    });
    expect(door.calls[7]).toEqual({
      name: "admin_save_market_settings",
      args: {
        p_free_regular_ads: 2,
        p_included_reach: "city",
        p_paid_levels: true,
        p_country_code: "XZ",
        p_launch_credits: 10,
        p_launch_days: 30,
      },
    });
    await saveMarket({
      countryCode: null,
      freeRegularAds: 3,
      includedReach: "city",
      paidLevels: false,
      launchCredits: null,
      launchDays: null,
    });
    expect(door.calls[8]?.args).toEqual({
      p_free_regular_ads: 3,
      p_included_reach: "city",
      p_paid_levels: false,
    });
  });

  it("MNS-5 a door's refusal is thrown with its message and SQLSTATE, never swallowed", async () => {
    door.rpc = rpcError("step-up required", "P0009");
    await expect(clearOverride("6d1f1c2e-0000-4000-8000-000000000020")).rejects.toMatchObject({
      name: "MonetisationDoorError",
      message: "step-up required",
      code: "P0009",
    });
    door.rpc = rpcError("priceInUse", "P0D01");
    await expect(endPrice("6d1f1c2e-0000-4000-8000-000000000001", null)).rejects.toBeInstanceOf(
      MonetisationDoorError,
    );
  });

  it("MNS-6 every code the seven doors refuse with has words of its own — the gates' codes, the step-up state and the generic fallback too", () => {
    const refused = new Set<string>();
    for (const [file, doors] of Object.entries(MIGRATIONS)) {
      const sql = readFileSync(file, "utf8");
      for (const name of doors) {
        const start = sql.indexOf(`CREATE OR REPLACE FUNCTION public.${name}(`);
        expect(start, `${name} is declared in ${file}`).toBeGreaterThan(-1);
        const body = sql.slice(start, sql.indexOf("$function$;", start));
        for (const match of body.matchAll(/door_refuse\('([A-Za-z]+)'/g)) {
          refused.add(match[1] ?? "");
        }
      }
    }
    expect(refused.size).toBeGreaterThanOrEqual(30);
    expect(refused.has("overrideNotFound")).toBe(true);
    // The gates every door shares (door_context), which the bodies do not spell.
    for (const gate of ["notSignedIn", "accountDeactivated", "rateLimited"]) refused.add(gate);
    for (const code of refused) {
      const read = readRefusal(code, MONETISATION_DOOR_REFUSALS);
      expect(read.branch, code).toBe("family");
      expect(read.key, code).not.toBe("admin.packages.error.unknown");
    }
    expect(readRefusal("overrideNotFound", MONETISATION_DOOR_REFUSALS).key).toBe(
      "admin.monetisation.error.overrideNotFound",
    );
    expect(readRefusal("priceInUse", MONETISATION_DOOR_REFUSALS).key).toBe(
      "admin.monetisation.error.priceInUse",
    );
    // A scoped refusal is read by its head: the country detail changes no words.
    expect(readRefusal("permissionDenied:scope", MONETISATION_DOOR_REFUSALS).key).toBe(
      "admin.packages.error.denied",
    );
    expect(
      readRefusal("step-up required: no verified factor", MONETISATION_DOOR_REFUSALS).key,
    ).toBe("admin.packages.error.stepUp");
    expect(readRefusal({ message: "", code: "P0009" }, MONETISATION_DOOR_REFUSALS).key).toBe(
      "admin.packages.error.stepUp",
    );
    expect(readRefusal("something new", MONETISATION_DOOR_REFUSALS)).toMatchObject({
      key: "admin.packages.error.unknown",
      branch: "generic",
    });
    expect(readRefusal("", MONETISATION_DOOR_REFUSALS).key).toBe("admin.packages.error.unknown");
  });

  it("MNS-7 the product door's caps refusals have keys of their own; a reach row's caps are read, a null cap as no limit", async () => {
    expect(readRefusal("badCaps", MONETISATION_DOOR_REFUSALS).key).toBe(
      "admin.monetisation.error.badCaps",
    );
    expect(readRefusal("capsOnLevel", MONETISATION_DOOR_REFUSALS).key).toBe(
      "admin.monetisation.error.capsOnLevel",
    );
    const reach = {
      ...CONSOLE.products[0],
      key: "regional",
      kind: "reach",
      max_photos: null,
      placement: null,
      badge: false,
      max_cities: null,
      max_regions: 3,
      max_countries: 1,
    };
    door.answer = { ...CONSOLE, products: [reach] };
    const console = await listMonetisation();
    expect(console.products[0]).toMatchObject({
      kind: "reach",
      maxCities: null,
      maxRegions: 3,
      maxCountries: 1,
    });
    door.answer = { ...CONSOLE, products: [{ ...reach, max_regions: "three" }] };
    await expect(listMonetisation()).rejects.toMatchObject({ failure: { class: "malformed" } });
  });
});
