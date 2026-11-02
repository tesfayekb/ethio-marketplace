import { describe, expect, it } from "vitest";

import { buildTree, type CategoryNode } from "@/features/categories/category-tree";

import {
  dayEnd,
  dayStart,
  defaultPackageLabelKey,
  flattenTree,
  packageFormInput,
  packageFormOf,
  priceFormInput,
  type PackageFormValues,
  type PriceFormValues,
} from "./packages-forms";

/** P-1 — the forms' judges mirror the doors; a blank number is a refusal, never 0. */
const GOOD_PACKAGE: PackageFormValues = {
  key: "gold_7",
  tier: "premium",
  days: "7",
  enabled: true,
  selfServe: true,
  extendsLifetime: false,
  labelKey: "package.gold_7",
  sort: "30",
};

const TODAY = "2026-11-02";
const GOOD_PRICE: PriceFormValues = {
  countryCode: "",
  categoryId: "",
  amount: "0",
  currency: "ETB",
  validFrom: "",
  validTo: "",
};

describe("the package form's judge (P-1)", () => {
  it("PKF-1 a good form answers the door's input; a blank order is left to the door", () => {
    expect(packageFormInput(GOOD_PACKAGE)).toEqual({
      ok: true,
      input: {
        key: "gold_7",
        tier: "premium",
        days: 7,
        enabled: true,
        selfServe: true,
        extendsLifetime: false,
        labelKey: "package.gold_7",
        sort: 30,
      },
    });
    const blankSort = packageFormInput({ ...GOOD_PACKAGE, sort: "" });
    expect(blankSort.ok && blankSort.input.sort).toBeNull();
  });

  it("PKF-2 each rule refuses by the door's own name", () => {
    const refusal = (over: Partial<PackageFormValues>) => {
      const judged = packageFormInput({ ...GOOD_PACKAGE, ...over });
      return judged.ok ? null : judged.key;
    };
    expect(refusal({ key: "" })).toBe("admin.packages.error.badKey");
    expect(refusal({ key: "7gold" })).toBe("admin.packages.error.badKey");
    expect(refusal({ key: "Gold" })).toBe("admin.packages.error.badKey");
    expect(refusal({ key: "g" })).toBe("admin.packages.error.badKey");
    expect(refusal({ tier: "regular" })).toBe("admin.packages.error.unknownTier");
    expect(refusal({ days: "" })).toBe("admin.packages.error.badDays");
    expect(refusal({ days: "0" })).toBe("admin.packages.error.badDays");
    expect(refusal({ days: "seven" })).toBe("admin.packages.error.badDays");
    expect(refusal({ labelKey: "" })).toBe("admin.packages.error.badLabelKey");
    expect(refusal({ labelKey: "Package.Gold" })).toBe("admin.packages.error.badLabelKey");
  });

  it("PKF-3 the editor opens on the stored row; a new package proposes package.<key> as its label", () => {
    expect(
      packageFormOf({
        key: "featured_45",
        tier: "featured",
        days: 45,
        enabled: true,
        selfServe: true,
        extendsLifetime: true,
        labelKey: null,
        sort: 10,
        updatedAt: "2026-11-02T08:00:00+00:00",
      }),
    ).toEqual({
      key: "featured_45",
      tier: "featured",
      days: "45",
      enabled: true,
      selfServe: true,
      extendsLifetime: true,
      labelKey: "",
      sort: "10",
    });
    expect(defaultPackageLabelKey(" gold_7 ")).toBe("package.gold_7");
  });
});

describe("the price form's judge (P-1)", () => {
  it("PKF-4 a free, open-ended price for every market and category is the door's smallest call", () => {
    expect(priceFormInput("featured_45", GOOD_PRICE, TODAY)).toEqual({
      ok: true,
      input: {
        packageKey: "featured_45",
        countryCode: null,
        categoryId: null,
        amount: 0,
        currency: "ETB",
        validFrom: null,
        validTo: null,
      },
    });
  });

  it("PKF-5 the amount is digits with up to two decimals, the currency is chosen, the window ends after it starts", () => {
    const refusal = (over: Partial<PriceFormValues>) => {
      const judged = priceFormInput("featured_45", { ...GOOD_PRICE, ...over }, TODAY);
      return judged.ok ? null : judged.key;
    };
    expect(refusal({ amount: "" })).toBe("admin.packages.error.badAmount");
    expect(refusal({ amount: "-1" })).toBe("admin.packages.error.badAmount");
    expect(refusal({ amount: "1.234" })).toBe("admin.packages.error.badAmount");
    expect(refusal({ amount: "free" })).toBe("admin.packages.error.badAmount");
    expect(refusal({ amount: "12.50" })).toBeNull();
    expect(refusal({ currency: "" })).toBe("admin.packages.error.unknownCurrency");
    expect(refusal({ validFrom: "2026-12-10", validTo: "2026-12-01" })).toBe(
      "admin.packages.error.badWindow",
    );
    expect(refusal({ validTo: "2026-11-01" })).toBe("admin.packages.error.badWindow");
    expect(refusal({ validFrom: "2026-12-01", validTo: "2026-12-01" })).toBeNull();
  });

  it("PKF-6 a day becomes the door's instants: today = now, a later day starts at its start; an end is the end of its day", () => {
    expect(dayStart("", TODAY)).toBeNull();
    expect(dayStart(TODAY, TODAY)).toBeNull();
    expect(dayStart("2026-12-01", TODAY)).toBe(new Date(2026, 11, 1).toISOString());
    expect(dayStart("not a day", TODAY)).toBeNull();
    expect(dayEnd("2026-12-01")).toBe(new Date(2026, 11, 2).toISOString());
    expect(dayEnd("")).toBeNull();
    const judged = priceFormInput(
      "featured_45",
      {
        ...GOOD_PRICE,
        countryCode: "ET",
        categoryId: "c1",
        validFrom: "2026-12-01",
        validTo: "2026-12-31",
      },
      TODAY,
    );
    expect(judged.ok && judged.input).toMatchObject({
      countryCode: "ET",
      categoryId: "c1",
      validFrom: new Date(2026, 11, 1).toISOString(),
      validTo: new Date(2027, 0, 1).toISOString(),
    });
  });

  it("PKF-7 the category select lists the tree depth first with each node's depth", () => {
    const node = (id: string, order: number): CategoryNode => ({
      id,
      nameEn: id,
      nameAm: null,
      slug: id,
      icon: null,
      allowListings: true,
      isCatchall: false,
      imageUrl: null,
      imageThumbUrl: null,
      displayOrder: order,
    });
    const tree = buildTree(
      [node("a", 1), node("a1", 1), node("a1x", 1), node("b", 2)],
      [
        { parent_id: null, child_id: "a", display_order: 1, is_primary: true },
        { parent_id: "a", child_id: "a1", display_order: 1, is_primary: true },
        { parent_id: "a1", child_id: "a1x", display_order: 1, is_primary: true },
        { parent_id: null, child_id: "b", display_order: 2, is_primary: true },
      ],
    );
    expect(flattenTree(tree).map(({ node: n, depth }) => `${depth}:${n.id}`)).toEqual([
      "0:a",
      "1:a1",
      "2:a1x",
      "0:b",
    ]);
  });
});
