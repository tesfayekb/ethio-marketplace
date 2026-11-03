import { readFileSync } from "node:fs";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ReaderError } from "@/lib/reader-failure";

/** The doors' answers, set per test; the client the seam opens is this stub. */
const door = {
  rows: [] as unknown[],
  answer: null as unknown,
  error: null as { message: string; code: string; details: string; hint: string } | null,
  rpc: null as { message: string; code: string; details: string; hint: string } | null,
  calls: [] as Array<{ name: string; args: unknown }>,
};

vi.mock("@/lib/supabase-door", () => {
  const query = () => {
    const chain = {
      select: () => chain,
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
      return { data: door.rpc === null ? door.answer : null, error: door.rpc };
    },
  };
});

import {
  MonetisationDoorError,
  clearOverride,
  editPrice,
  endPrice,
  listCoveragePlans,
  listMonetisation,
  monetisationErrorKey,
  saveMarket,
  saveOverride,
  savePrice,
  saveProduct,
  setCoveragePlan,
} from "./monetisation-service";

/** P-1b M-a, M-b, M-c and P-1 M1a — the doors, read for the messages they RAISE (TIR-5's shape). */
const MIGRATIONS = {
  "supabase/migrations/20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql": [
    "admin_save_listing_package",
    "admin_save_level_override",
    "admin_clear_level_override",
  ],
  "supabase/migrations/20261103040806_3f552dc1-73ac-4377-a5ea-c01e1725dfea.sql": [
    "admin_save_package_price",
    "admin_edit_package_price",
  ],
  "supabase/migrations/20261103040807_0cdc612d-5dd2-4bf0-a0da-78f8131a70cf.sql": [
    "admin_save_market_settings",
    "admin_list_monetisation",
  ],
} as const;

/** The caps door's refusal ids (M1a, unchanged; `admin_set_coverage_plan`). */
const CAPS_IDS = ["badPlan", "belowMinimum", "badMaxPhotos", "badDefaultDays", "badMaxActiveAds"];

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
    door.rows = [];
    door.answer = null;
    door.error = null;
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
    door.rpc = rpcError("denied", "P0001");
    await expect(listMonetisation()).rejects.toBeInstanceOf(ReaderError);
    door.rpc = null;
    door.answer = { ...CONSOLE, products: [{ ...CONSOLE.products[0], kind: "gold" }] };
    await expect(listMonetisation()).rejects.toMatchObject({ failure: { class: "malformed" } });
    door.answer = { ...CONSOLE, prices: [{ ...CONSOLE.prices[0], amount: "soon" }] };
    await expect(listMonetisation()).rejects.toMatchObject({ failure: { class: "malformed" } });
    door.answer = { markets: [], products: [], overrides: [] };
    await expect(listMonetisation()).rejects.toMatchObject({ failure: { class: "malformed" } });
    door.error = rpcError("permission denied for table coverage_plans", "42501");
    await expect(listCoveragePlans()).rejects.toBeInstanceOf(ReaderError);
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

  it("MNS-4 the caps door is sent every dial but the label key, so the stored key is kept; unlimited ads are the flag", async () => {
    await setCoveragePlan({
      plan: "free",
      maxCities: 3,
      maxRegions: 1,
      maxCountries: 1,
      maxPhotos: 10,
      allowEverywhere: false,
      defaultDays: 60,
      maxActiveAds: 20,
    });
    expect(door.calls[0]).toEqual({
      name: "admin_set_coverage_plan",
      args: {
        p_plan: "free",
        p_max_cities: 3,
        p_max_regions: 1,
        p_max_countries: 1,
        p_max_photos: 10,
        p_allow_everywhere: false,
        p_default_days: 60,
        p_max_active_ads: 20,
        p_ads_unlimited: false,
      },
    });
    expect(Object.keys(door.calls[0]?.args as object)).not.toContain("p_label_key");
    await setCoveragePlan({
      plan: "free",
      maxCities: 3,
      maxRegions: 1,
      maxCountries: 1,
      maxPhotos: 10,
      allowEverywhere: true,
      defaultDays: 60,
      maxActiveAds: null,
    });
    expect(door.calls[1]?.args).toMatchObject({ p_ads_unlimited: true });
    expect(Object.keys(door.calls[1]?.args as object)).not.toContain("p_max_active_ads");
  });

  it("MNS-5 a door's refusal is thrown with its message and SQLSTATE, never swallowed", async () => {
    door.rpc = rpcError("step-up required", "P0009");
    await expect(clearOverride("6d1f1c2e-0000-4000-8000-000000000020")).rejects.toMatchObject({
      name: "MonetisationDoorError",
      message: "step-up required",
      code: "P0009",
    });
    door.rpc = rpcError("price in use");
    await expect(endPrice("6d1f1c2e-0000-4000-8000-000000000001", null)).rejects.toBeInstanceOf(
      MonetisationDoorError,
    );
  });

  it("MNS-6 every message the seven doors and the reader RAISE, and every caps id, has a key of its own — but the cleared override's `not found`, the one named departure; the step-up state and the fallback too", () => {
    const raised = new Set<string>();
    for (const [file, doors] of Object.entries(MIGRATIONS)) {
      const sql = readFileSync(file, "utf8");
      for (const name of doors) {
        const start = sql.indexOf(`CREATE FUNCTION public.${name}(`);
        expect(start, `${name} is declared in ${file}`).toBeGreaterThan(-1);
        const body = sql.slice(start, sql.indexOf("$function$;", start));
        for (const match of body.matchAll(/RAISE EXCEPTION '((?:[^']|'')*)'/g)) {
          raised.add((match[1] ?? "").replace(/''/g, "'"));
        }
      }
    }
    expect(raised.size).toBeGreaterThanOrEqual(30);
    expect(raised.has("not found")).toBe(true);
    raised.delete("not found");
    for (const message of [...raised, ...CAPS_IDS]) {
      const { key, raw } = monetisationErrorKey(message);
      expect(key, message).not.toBe("admin.packages.error.unknown");
      expect(raw).toBeNull();
    }
    // The departure: the cleared override's `not found` shows the door's own words.
    expect(monetisationErrorKey("not found")).toEqual({
      key: "admin.packages.error.unknown",
      raw: "not found",
    });
    expect(monetisationErrorKey("", "P0009")).toEqual({
      key: "admin.packages.error.stepUp",
      raw: null,
    });
    expect(monetisationErrorKey("price in use")).toEqual({
      key: "admin.monetisation.error.priceInUse",
      raw: null,
    });
    expect(monetisationErrorKey("belowMinimum: max_cities")).toEqual({
      key: "admin.coverage.error.belowMinimum",
      raw: null,
    });
    expect(monetisationErrorKey("something new")).toEqual({
      key: "admin.packages.error.unknown",
      raw: "something new",
    });
    expect(monetisationErrorKey("")).toEqual({ key: "admin.packages.error.unknown", raw: null });
  });
});
