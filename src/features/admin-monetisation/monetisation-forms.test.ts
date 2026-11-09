import { describe, expect, it } from "vitest";

import {
  NEW_OVERRIDE_FORM,
  marketFormInput,
  marketFormOf,
  overrideFormInput,
  overrideFormOf,
  productFormInput,
  productFormOf,
  type MarketFormValues,
  type OverrideFormValues,
  type ProductFormValues,
} from "./monetisation-forms";
import type { MarketRow, OverrideRow, PriceRow, ProductRow } from "./monetisation-service";
import { dayEnd, dayStart, priceFormInput, priceFormOf, type PriceFormValues } from "./price-forms";

/** P-1b — the forms' judges mirror the doors; a blank number is a refusal, never 0. */
const ATTRIBUTION = {
  createdByName: "Abebe",
  updatedByName: "Sara",
  updatedAt: "2026-11-03T09:00:00+00:00",
};

const GOOD_LEVEL: ProductFormValues = {
  key: "boosted",
  nameEn: " Boosted ",
  nameAm: "",
  days: "30",
  maxPhotos: "12",
  placement: "boost",
  badge: true,
  maxCities: "",
  maxRegions: "",
  maxCountries: "",
  enabled: true,
  selfServe: true,
  extendsLifetime: false,
  sort: "",
};

const GOOD_OVERRIDE: OverrideFormValues = {
  levelKey: "boosted",
  categoryId: "6d1f1c2e-0000-4000-8000-000000000030",
  countryCode: "",
  days: "45",
  maxPhotos: "",
  placement: "",
  badge: "",
};

const GOOD_MARKET: MarketFormValues = {
  countryCode: "",
  freeRegularAds: "3",
  includedReach: "city",
  paidLevels: false,
  launchCredits: "",
  launchDays: "",
};

const TODAY = "2026-11-03";
const GOOD_PRICE: PriceFormValues = {
  packageKey: "boosted",
  countryCode: "",
  categoryId: "",
  amount: "150.50",
  currency: "ETB",
  creditCost: "4",
  validFrom: "",
  validTo: "",
};

describe("the monetisation forms' judges (P-1b)", () => {
  it("MNF-2 a level's form answers the door's input with its perks; a reach product sends none; the names are trimmed and a blank Amharic is sent blank so the door clears it", () => {
    const level = productFormInput("level", GOOD_LEVEL);
    expect(level).toEqual({
      ok: true,
      input: {
        key: "boosted",
        kind: "level",
        nameEn: "Boosted",
        nameAm: "",
        days: 30,
        enabled: true,
        selfServe: true,
        extendsLifetime: false,
        maxPhotos: 12,
        placement: "boost",
        badge: true,
        caps: null,
        sort: null,
      },
    });
    const reach = productFormInput("reach", { ...GOOD_LEVEL, key: "city", sort: "5" });
    expect(reach).toMatchObject({
      ok: true,
      input: {
        kind: "reach",
        maxPhotos: null,
        placement: null,
        badge: null,
        caps: { maxCities: null, maxRegions: null, maxCountries: null },
        sort: 5,
      },
    });
  });

  it("MNF-3 the product judge refuses what the door refuses: the key's shape, a missing or long name, a blank day count, photos beyond 30, an unknown placement", () => {
    const refusal = (values: ProductFormValues, kind: "level" | "reach" = "level") => {
      const outcome = productFormInput(kind, values);
      return outcome.ok ? null : outcome.key;
    };
    expect(refusal({ ...GOOD_LEVEL, key: "Boosted" })).toBe("admin.packages.error.badKey");
    expect(refusal({ ...GOOD_LEVEL, key: "b" })).toBe("admin.packages.error.badKey");
    expect(refusal({ ...GOOD_LEVEL, nameEn: "  " })).toBe("admin.monetisation.error.badName");
    expect(refusal({ ...GOOD_LEVEL, nameAm: "x".repeat(81) })).toBe(
      "admin.monetisation.error.badName",
    );
    expect(refusal({ ...GOOD_LEVEL, days: "" })).toBe("admin.packages.error.badDays");
    expect(refusal({ ...GOOD_LEVEL, days: "0" })).toBe("admin.packages.error.badDays");
    expect(refusal({ ...GOOD_LEVEL, maxPhotos: "" })).toBe("admin.monetisation.error.badPhotos");
    expect(refusal({ ...GOOD_LEVEL, maxPhotos: "31" })).toBe("admin.monetisation.error.badPhotos");
    expect(refusal({ ...GOOD_LEVEL, placement: "hero" })).toBe(
      "admin.monetisation.error.unknownPlacement",
    );
    // A reach product's perk fields are not judged.
    expect(refusal({ ...GOOD_LEVEL, maxPhotos: "", placement: "hero" }, "reach")).toBeNull();
  });

  it("MNF-4 a stored product opens as it is stored; a level without perks shows blank cells", () => {
    const row: ProductRow = {
      key: "boosted",
      kind: "level",
      nameEn: "Boosted",
      nameAm: "Boosted (am)",
      days: 30,
      maxPhotos: null,
      placement: null,
      badge: false,
      maxCities: null,
      maxRegions: null,
      maxCountries: null,
      enabled: false,
      selfServe: true,
      extendsLifetime: true,
      sort: 20,
      ...ATTRIBUTION,
    };
    expect(productFormOf(row)).toEqual({
      key: "boosted",
      nameEn: "Boosted",
      nameAm: "Boosted (am)",
      days: "30",
      maxPhotos: "",
      placement: "standard",
      badge: false,
      maxCities: "",
      maxRegions: "",
      maxCountries: "",
      enabled: false,
      selfServe: true,
      extendsLifetime: true,
      sort: "20",
    });
  });

  it('MNF-11 a reach product\'s three caps parse: blank is no limit, "0" is refused, "3" is 3; a level sends none; a stored reach row opens as stored', () => {
    const reach = (caps: Partial<ProductFormValues>) =>
      productFormInput("reach", { ...GOOD_LEVEL, key: "city", ...caps });
    expect(reach({ maxCities: "", maxRegions: "3", maxCountries: " 1 " })).toMatchObject({
      ok: true,
      input: { caps: { maxCities: null, maxRegions: 3, maxCountries: 1 } },
    });
    for (const bad of ["0", "-2", "1.5", "x"]) {
      expect(reach({ maxRegions: bad }), bad).toEqual({
        ok: false,
        key: "admin.monetisation.error.badCaps",
      });
    }
    // A level's caps fields are never judged nor sent.
    expect(productFormInput("level", { ...GOOD_LEVEL, maxCities: "0" })).toMatchObject({
      ok: true,
      input: { caps: null },
    });
    const row: ProductRow = {
      key: "regional",
      kind: "reach",
      nameEn: "Regional",
      nameAm: null,
      days: 30,
      maxPhotos: null,
      placement: null,
      badge: false,
      maxCities: null,
      maxRegions: 3,
      maxCountries: 1,
      enabled: true,
      selfServe: true,
      extendsLifetime: true,
      sort: 10,
      ...ATTRIBUTION,
    };
    expect(productFormOf(row)).toMatchObject({ maxCities: "", maxRegions: "3", maxCountries: "1" });
  });

  it("MNF-5 an override sends only the cells it sets (a blank = the level's own value); all blank is refused; a bad cell is refused by its own key", () => {
    expect(overrideFormInput(GOOD_OVERRIDE)).toEqual({
      ok: true,
      input: {
        levelKey: "boosted",
        categoryId: "6d1f1c2e-0000-4000-8000-000000000030",
        countryCode: null,
        days: 45,
        maxPhotos: null,
        placement: null,
        badge: null,
      },
    });
    expect(
      overrideFormInput({ ...GOOD_OVERRIDE, days: "", badge: "no", countryCode: "XZ" }),
    ).toMatchObject({ ok: true, input: { days: null, badge: false, countryCode: "XZ" } });
    const refusal = (values: OverrideFormValues) => {
      const outcome = overrideFormInput(values);
      return outcome.ok ? null : outcome.key;
    };
    expect(refusal({ ...GOOD_OVERRIDE, days: "" })).toBe("admin.monetisation.error.emptyOverride");
    expect(refusal(NEW_OVERRIDE_FORM)).toBe("admin.monetisation.error.unknownLevel");
    expect(refusal({ ...GOOD_OVERRIDE, days: "0" })).toBe("admin.packages.error.badDays");
    expect(refusal({ ...GOOD_OVERRIDE, maxPhotos: "40" })).toBe(
      "admin.monetisation.error.badPhotos",
    );
    expect(refusal({ ...GOOD_OVERRIDE, placement: "hero" })).toBe(
      "admin.monetisation.error.unknownPlacement",
    );
    const row: OverrideRow = {
      id: "6d1f1c2e-0000-4000-8000-000000000020",
      levelKey: "boosted",
      categoryId: null,
      countryCode: "XZ",
      days: null,
      maxPhotos: 5,
      placement: "top",
      badge: true,
      ...ATTRIBUTION,
    };
    expect(overrideFormOf(row)).toEqual({
      levelKey: "boosted",
      categoryId: "",
      countryCode: "XZ",
      days: "",
      maxPhotos: "5",
      placement: "top",
      badge: "yes",
    });
  });

  it("MNF-6 a market's form: the default row is a blank code; paid levels ON needs both bundle values; a bad bundle value is refused by its own key", () => {
    expect(marketFormInput(GOOD_MARKET)).toEqual({
      ok: true,
      input: {
        countryCode: null,
        freeRegularAds: 3,
        includedReach: "city",
        paidLevels: false,
        launchCredits: null,
        launchDays: null,
      },
    });
    const refusal = (values: MarketFormValues) => {
      const outcome = marketFormInput(values);
      return outcome.ok ? null : outcome.key;
    };
    expect(refusal({ ...GOOD_MARKET, freeRegularAds: "" })).toBe(
      "admin.monetisation.error.badFreeAds",
    );
    expect(refusal({ ...GOOD_MARKET, includedReach: "" })).toBe(
      "admin.monetisation.error.unknownReach",
    );
    expect(refusal({ ...GOOD_MARKET, paidLevels: true })).toBe(
      "admin.monetisation.error.launchRequired",
    );
    expect(refusal({ ...GOOD_MARKET, paidLevels: true, launchCredits: "10" })).toBe(
      "admin.monetisation.error.launchRequired",
    );
    expect(refusal({ ...GOOD_MARKET, launchCredits: "0", launchDays: "30" })).toBe(
      "admin.monetisation.error.badLaunch",
    );
    expect(
      marketFormInput({
        ...GOOD_MARKET,
        countryCode: "XZ",
        paidLevels: true,
        launchCredits: "10",
        launchDays: "30",
      }),
    ).toMatchObject({
      ok: true,
      input: { countryCode: "XZ", paidLevels: true, launchCredits: 10, launchDays: 30 },
    });
    const row: MarketRow = {
      id: "6d1f1c2e-0000-4000-8000-000000000010",
      countryCode: null,
      freeRegularAds: 3,
      includedReach: "city",
      paidLevels: true,
      launchCredits: 10,
      launchDays: 30,
      paidLevelsSince: "2026-11-03T09:00:00+00:00",
      ...ATTRIBUTION,
    };
    expect(marketFormOf(row)).toEqual({
      countryCode: "",
      freeRegularAds: "3",
      includedReach: "city",
      paidLevels: true,
      launchCredits: "10",
      launchDays: "30",
    });
  });

  it("MNF-7 a price's form: the product first, an amount as typed, a whole credit cost; today's start and an open end are left to the door", () => {
    expect(priceFormInput(GOOD_PRICE, TODAY)).toEqual({
      ok: true,
      input: {
        packageKey: "boosted",
        countryCode: null,
        categoryId: null,
        amount: 150.5,
        currency: "ETB",
        creditCost: 4,
        validFrom: null,
        validTo: null,
      },
    });
    const refusal = (values: PriceFormValues) => {
      const outcome = priceFormInput(values, TODAY);
      return outcome.ok ? null : outcome.key;
    };
    expect(refusal({ ...GOOD_PRICE, packageKey: "" })).toBe("admin.packages.error.unknownPackage");
    expect(refusal({ ...GOOD_PRICE, amount: "" })).toBe("admin.packages.error.badAmount");
    expect(refusal({ ...GOOD_PRICE, amount: "1.234" })).toBe("admin.packages.error.badAmount");
    expect(refusal({ ...GOOD_PRICE, creditCost: "" })).toBe(
      "admin.monetisation.error.badCreditCost",
    );
    expect(refusal({ ...GOOD_PRICE, creditCost: "-1" })).toBe(
      "admin.monetisation.error.badCreditCost",
    );
    expect(refusal({ ...GOOD_PRICE, currency: "" })).toBe("admin.packages.error.unknownCurrency");
    expect(refusal({ ...GOOD_PRICE, validTo: "2026-11-0" })).toBe("admin.packages.error.badWindow");
    expect(refusal({ ...GOOD_PRICE, validFrom: "2026-12-10", validTo: "2026-12-01" })).toBe(
      "admin.packages.error.badWindow",
    );
  });

  it("MNF-8 the window's days are the door's instants: a start is the day's start, an end the start of the day after; an edit left on the stored day sends no start, so the door keeps it", () => {
    const from = dayStart("2026-12-10", TODAY);
    const to = dayEnd("2026-12-10");
    expect(from).not.toBeNull();
    expect(to).not.toBeNull();
    expect(new Date(to ?? "").getTime() - new Date(from ?? "").getTime()).toBe(24 * 3600 * 1000);
    expect(dayStart(TODAY, TODAY)).toBeNull();
    expect(dayStart("", TODAY)).toBeNull();
    expect(dayEnd("soon")).toBeNull();
    const later = priceFormInput(
      { ...GOOD_PRICE, validFrom: "2026-12-01", validTo: "2026-12-10" },
      TODAY,
    );
    expect(later).toMatchObject({
      ok: true,
      input: { validFrom: dayStart("2026-12-01", TODAY), validTo: dayEnd("2026-12-10") },
    });
    // The edit: the stored start lies in the past and is kept when left alone.
    const kept = priceFormInput(
      { ...GOOD_PRICE, validFrom: "2026-10-01", validTo: "2026-12-10" },
      TODAY,
      "2026-10-01",
    );
    expect(kept).toMatchObject({ ok: true, input: { validFrom: null } });
    const moved = priceFormInput(
      { ...GOOD_PRICE, validFrom: "2026-12-01", validTo: "" },
      TODAY,
      "2026-10-01",
    );
    expect(moved).toMatchObject({ ok: true, input: { validFrom: dayStart("2026-12-01", TODAY) } });
  });

  it("MNF-9 a stored price opens with its last day shown, not the exclusive instant", () => {
    const row: PriceRow = {
      id: "6d1f1c2e-0000-4000-8000-000000000001",
      packageKey: "boosted",
      countryCode: "ET",
      categoryId: null,
      amount: 150,
      currency: "ETB",
      creditCost: 4,
      validFrom: "2026-11-01T00:00:00+00:00",
      validTo: dayEnd("2026-12-10") ?? "",
      usedCount: 0,
      ...ATTRIBUTION,
    };
    expect(priceFormOf(row)).toMatchObject({
      packageKey: "boosted",
      countryCode: "ET",
      categoryId: "",
      amount: "150",
      creditCost: "4",
      validTo: "2026-12-10",
    });
  });
});
