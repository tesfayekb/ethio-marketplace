import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { StepUpCancelled } from "@/features/auth/mfa/mfa-service";
import { readRefusal } from "@/lib/refusal";

vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => `T(${key})`, has: () => false }),
}));

import { COUNTRY_REFUSALS, useCountryRefusal } from "./country-refusals";

/** A shell's refusal as the browser client surfaces it: `code[:detail]` in `message`. */
const refused = (message: string) => ({ message, code: "P0D01", details: "", hint: "" });

/** Every id the console's mapper spoke before the doors moved to codes (F1-4b). */
const IDS = [
  "badCountryCode",
  "badUnitSystem",
  "badCurrency",
  "nameRequired",
  "unknownCountry",
  "scopedRolesExist",
  "duplicateCategory",
  "notARoot",
] as const;

describe("the markets console's refusals (F1-4b, DEC-333)", () => {
  it("KRF-1 every id the console spoke keeps its own line; the words hold those and the two shared codes", () => {
    expect(Object.keys(COUNTRY_REFUSALS.words).sort()).toEqual(
      [...IDS, "permissionDenied", "rateLimited", "required", "badType"].sort(),
    );
    for (const id of IDS) {
      const read = readRefusal(refused(id), COUNTRY_REFUSALS);
      expect([id, read.branch, read.key]).toEqual([id, "family", `admin.countries.error.${id}`]);
    }
    for (const message of ["permissionDenied", "permissionDenied:scope"]) {
      expect(readRefusal(refused(message), COUNTRY_REFUSALS).key).toBe(
        "admin.countries.error.denied",
      );
    }
    expect(readRefusal(refused("rateLimited"), COUNTRY_REFUSALS).key).toBe(
      "admin.error.rateLimited",
    );
  });

  it("KFM-5 the editor's own Fields read the kit's words: required and badType; nameRequired keeps its line", () => {
    expect(readRefusal({ field: "nameEn", reason: "required" }, COUNTRY_REFUSALS).key).toBe(
      "post.refusal.required",
    );
    expect(readRefusal({ field: "displayOrder", reason: "badType" }, COUNTRY_REFUSALS).key).toBe(
      "post.refusal.badType",
    );
    expect(readRefusal(refused("nameRequired"), COUNTRY_REFUSALS).key).toBe(
      "admin.countries.error.nameRequired",
    );
  });

  it("KRF-2 a code without words, a sentence and a failed fetch draw the generic line; the step-up sentence its own", () => {
    for (const message of [
      "notSignedIn",
      "accountDeactivated",
      "something new",
      "TypeError: Failed to fetch",
    ]) {
      expect([message, readRefusal(refused(message), COUNTRY_REFUSALS).key]).toEqual([
        message,
        "admin.countries.error.unknown",
      ]);
    }
    const stepUp = readRefusal({ message: "step-up required", code: "P0009" }, COUNTRY_REFUSALS);
    expect([stepUp.branch, stepUp.key]).toEqual(["sentence", "admin.countries.error.stepUp"]);
  });

  it("KRF-3 the screens' state: a database object reads by its message, a cancelled step-up says nothing, render shows a key", () => {
    const { result } = renderHook(() => useCountryRefusal());
    act(() =>
      result.current.fail({ message: "notARoot", code: "P0001", details: null, hint: null }),
    );
    expect(result.current.message).toBe("T(admin.countries.error.notARoot)");
    act(() =>
      result.current.fail({ message: "something new", code: "P0001", details: null, hint: null }),
    );
    expect(result.current.message).toBe("T(admin.countries.error.unknown)");
    act(() => result.current.fail(undefined));
    expect(result.current.message).toBe("T(admin.countries.error.unknown)");
    act(() => result.current.fail(new StepUpCancelled()));
    expect(result.current.message).toBeNull();
    act(() => result.current.render("admin.countries.error.nameRequired"));
    expect(result.current.message).toBe("T(admin.countries.error.nameRequired)");
    act(() => result.current.clear());
    expect(result.current.message).toBeNull();
  });
});
