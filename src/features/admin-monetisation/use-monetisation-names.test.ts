import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { ProductRow } from "./monetisation-service";

/**
 * P-2 (c) c2b (INC-1087) — the console's names: a product and a category the
 * read holds are named in the reader's language; one it does not hold is
 * named "not known", never by its key or its id.
 */

const reader = vi.hoisted(() => ({ language: "en" }));
const CATEGORY_ID = "6d1f1c2e-0000-4000-8000-000000000030";
const GONE_ID = "6d1f1c2e-0000-4000-8000-000000000099";

vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => key,
    language: reader.language,
    entities: { lang: reader.language, map: {} },
  }),
}));
vi.mock("@/components/shell/location-data", () => ({
  useOpenMarkets: () => ({ markets: [], isLoading: false, failed: false }),
}));
vi.mock("@/features/categories/category-tree", () => ({
  useCategoryTree: () => ({
    tree: {
      byId: new Map([[CATEGORY_ID, { id: CATEGORY_ID, nameEn: "Phones", nameAm: "ስልኮች" }]]),
    },
  }),
}));

const { useMonetisationNames } = await import("./use-monetisation-names");

const product: ProductRow = {
  key: "boosted",
  kind: "level",
  nameEn: "Boosted",
  nameAm: "የጎላ",
  days: 30,
  maxPhotos: 12,
  placement: "boost",
  badge: true,
  maxCities: null,
  maxRegions: null,
  maxCountries: null,
  enabled: true,
  selfServe: true,
  extendsLifetime: false,
  sort: 1,
  createdByName: null,
  updatedByName: null,
  updatedAt: "2026-11-03T09:00:00+00:00",
};

beforeEach(() => {
  reader.language = "en";
});

describe("the monetisation console's names (INC-1087)", () => {
  it("MNN-1 a product the read holds is named by its own names, the Amharic under am", () => {
    const en = renderHook(() => useMonetisationNames([product]));
    expect(en.result.current.productName("boosted")).toBe("Boosted");
    reader.language = "am";
    const am = renderHook(() => useMonetisationNames([product]));
    expect(am.result.current.productName("boosted")).toBe("የጎላ");
  });

  it("MNN-2 a product the read does not hold is not known, never its key", () => {
    const { result } = renderHook(() => useMonetisationNames([product]));
    expect(result.current.productName("vanished")).toBe("admin.monetisation.product.unknown");
  });

  it("MNN-3 a category the tree does not hold is not known, never its id; a held one is named; none is the caller's every-word", () => {
    const { result } = renderHook(() => useMonetisationNames([product]));
    expect(result.current.categoryName(GONE_ID, "everyCategory")).toBe(
      "admin.monetisation.category.unknown",
    );
    expect(result.current.categoryName(CATEGORY_ID, "everyCategory")).toBe("Phones");
    expect(result.current.categoryName(null, "everyCategory")).toBe(
      "admin.packages.prices.everyCategory",
    );
  });
});
