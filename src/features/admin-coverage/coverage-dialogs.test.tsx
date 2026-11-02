import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  coverageFormInput,
  coverageFormOf,
  useCoverageError,
  wholeNumber,
  type CoverageFormValues,
} from "./coverage-dialogs";
import { COVERAGE_REFUSAL_IDS, coverageErrorKey } from "./coverage-service";

/** P-1 — a form that passes every rule, to bend one at a time. */
const GOOD: CoverageFormValues = {
  maxCities: "3",
  maxRegions: "2",
  maxCountries: "1",
  maxPhotos: "10",
  allowEverywhere: false,
  defaultDays: "30",
  maxActiveAds: "20",
  adsUnlimited: false,
  labelKey: "plan.pro",
};

describe("the coverage form's judge (P-1, ruling 1 answer 10)", () => {
  it("CVF-1 wholeNumber reads a whole number and nothing else — blank and words are null, never 0", () => {
    expect(wholeNumber(" 12 ")).toBe(12);
    expect(wholeNumber("0")).toBe(0);
    expect(wholeNumber("-3")).toBe(-3);
    expect(wholeNumber("")).toBeNull();
    expect(wholeNumber("  ")).toBeNull();
    expect(wholeNumber("ten")).toBeNull();
    expect(wholeNumber("1.5")).toBeNull();
    expect(wholeNumber("1e3")).toBeNull();
  });

  it("CVF-2 a good form answers the door's input; an unlimited quota is null and the typed count is dropped", () => {
    expect(coverageFormInput(GOOD)).toEqual({
      ok: true,
      input: {
        maxCities: 3,
        maxRegions: 2,
        maxCountries: 1,
        maxPhotos: 10,
        allowEverywhere: false,
        defaultDays: 30,
        maxActiveAds: 20,
        labelKey: "plan.pro",
      },
    });
    const unlimited = coverageFormInput({ ...GOOD, adsUnlimited: true, maxActiveAds: "abc" });
    expect(unlimited.ok && unlimited.input.maxActiveAds).toBeNull();
  });

  it("CVF-3 each rule refuses by the door's own name: a blank or non-number field is refused, never read as 0", () => {
    const refusal = (over: Partial<CoverageFormValues>) => {
      const judged = coverageFormInput({ ...GOOD, ...over });
      return judged.ok ? null : judged.key;
    };
    expect(refusal({ maxCities: "" })).toBe("admin.coverage.error.belowMinimum");
    expect(refusal({ maxRegions: "two" })).toBe("admin.coverage.error.belowMinimum");
    expect(refusal({ maxCountries: "0" })).toBe("admin.coverage.error.belowMinimum");
    expect(refusal({ maxPhotos: "" })).toBe("admin.coverage.error.badMaxPhotos");
    expect(refusal({ maxPhotos: "31" })).toBe("admin.coverage.error.badMaxPhotos");
    expect(refusal({ maxPhotos: "0" })).toBeNull();
    expect(refusal({ defaultDays: "0" })).toBe("admin.coverage.error.badDefaultDays");
    expect(refusal({ defaultDays: "" })).toBe("admin.coverage.error.badDefaultDays");
    expect(refusal({ maxActiveAds: "0" })).toBe("admin.coverage.error.badMaxActiveAds");
    expect(refusal({ maxActiveAds: "" })).toBe("admin.coverage.error.badMaxActiveAds");
    expect(refusal({ labelKey: "" })).toBe("admin.coverage.error.badLabelKey");
    expect(refusal({ labelKey: "Plan.Pro" })).toBe("admin.coverage.error.badLabelKey");
    expect(refusal({ labelKey: "9plan" })).toBe("admin.coverage.error.badLabelKey");
    expect(refusal({ labelKey: " plan.pro_2 " })).toBeNull();
  });

  it("CVF-4 the editor opens on the stored row: an unlimited quota ticks Unlimited with a blank count; no label is a blank field", () => {
    expect(
      coverageFormOf({
        maxCities: 1,
        maxRegions: 1,
        maxCountries: 1,
        maxPhotos: 10,
        allowEverywhere: true,
        defaultDays: 30,
        maxActiveAds: null,
        labelKey: null,
      }),
    ).toEqual({
      maxCities: "1",
      maxRegions: "1",
      maxCountries: "1",
      maxPhotos: "10",
      allowEverywhere: true,
      defaultDays: "30",
      maxActiveAds: "",
      adsUnlimited: true,
      labelKey: "",
    });
    expect(
      coverageFormOf({
        maxCities: 1,
        maxRegions: 1,
        maxCountries: 1,
        maxPhotos: 0,
        allowEverywhere: false,
        defaultDays: 45,
        maxActiveAds: 20,
        labelKey: "plan.free",
      }),
    ).toMatchObject({ maxActiveAds: "20", adsUnlimited: false, labelKey: "plan.free" });
  });

  it("CVF-5 every refusal id the door raises has its key (M1a: badDefaultDays, badMaxActiveAds, badLabelKey)", () => {
    for (const id of ["badDefaultDays", "badMaxActiveAds", "badLabelKey"]) {
      expect(COVERAGE_REFUSAL_IDS).toContain(id);
      expect(coverageErrorKey(id)).toEqual({ key: `admin.coverage.error.${id}`, raw: null });
    }
  });
});

describe("useCoverageError", () => {
  it("reads a database refusal object by its own message", () => {
    const { result } = renderHook(() => useCoverageError());
    act(() =>
      result.current.fail({ message: "badPlan", code: "P0001", details: null, hint: null }),
    );
    expect(result.current.refusal).toMatchObject({
      key: "admin.coverage.error.badPlan",
      raw: null,
    });
    act(() =>
      result.current.fail({ message: "something new", code: "P0001", details: null, hint: null }),
    );
    expect(result.current.refusal).toMatchObject({
      key: "admin.coverage.error.unknown",
      raw: "something new",
    });
    act(() => result.current.fail(undefined));
    expect(result.current.refusal?.raw).toBeNull();
  });
});
