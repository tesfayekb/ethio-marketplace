import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { StepUpCancelled } from "@/features/auth/mfa/mfa-service";
import { readRefusal, refusalText } from "@/lib/refusal";

const catalogue = new Set(["admin.attributes.error.parentAfterChild"]);
const language = vi.hoisted(() => ({ current: undefined as string | undefined }));
vi.mock("@/i18n", () => ({
  useI18n: () => ({
    language: language.current,
    t: (key: string) => `T(${key}) {detail}`,
    has: (key: string) => catalogue.has(key),
  }),
}));

import { CATEGORY_REFUSALS, useCategoryRefusal } from "./category-refusals";

/** A shell's refusal as the browser client surfaces it: `code[:detail]` in `message`. */
const refused = (message: string) => ({ message, code: "P0D01", details: "", hint: "" });
const t = (key: string) => `T(${key}) {count}`;

describe("the categories console's refusals (F1-4a, DEC-333)", () => {
  it("CRF-1 each code that replaced a console key reads that key's words; a count fills {count}", () => {
    const words: Array<[string, string]> = [
      ["rateLimited", "admin.error.rateLimited"],
      ["forbidden", "admin.ai.error.denied"],
      ["parentInactive", "admin.categories.error.parentInactive"],
      ["unknownCategory", "admin.categories.error.unknownCategory"],
      ["unknownPointer", "admin.categories.error.unknownPointer"],
      ["catchallParent", "admin.categories.error.catchallParent"],
      ["reassignRequired", "admin.categories.error.reassignRequired"],
      ["deleteActive", "admin.categories.error.delete_active"],
      ["deleteSlugMismatch", "admin.categories.error.delete_slug_mismatch"],
      ["deleteHasListings", "admin.categories.error.delete_has_listings"],
      ["deleteHasChildren", "admin.categories.error.delete_has_children"],
      ["acceptNoImage", "admin.categories.error.acceptNoImage"],
      ["slugTaken", "admin.categories.error.slugTaken"],
      ["reassignTargetInvalid", "admin.categories.error.reassignTargetInvalid"],
      ["badValue", "admin.categories.error.windowOrder"],
      ["required", "post.refusal.required"],
      ["badType", "post.refusal.badType"],
    ];
    expect(Object.keys(CATEGORY_REFUSALS.words).sort()).toEqual(words.map(([code]) => code).sort());
    for (const [code, key] of words) {
      const read = readRefusal(refused(code), CATEGORY_REFUSALS);
      expect([code, read.branch, read.key]).toEqual([code, "family", key]);
    }
    const children = readRefusal(refused("deleteHasChildren:2"), CATEGORY_REFUSALS);
    expect(refusalText(children, t)).toBe("T(admin.categories.error.delete_has_children) 2");
    const listings = readRefusal(refused("deleteHasListings:14"), CATEGORY_REFUSALS);
    expect(refusalText(listings, t)).toBe("T(admin.categories.error.delete_has_listings) 14");
  });

  it("CRF-2 a code without words, a gate's code, a sentence and a failed fetch draw the generic line", () => {
    for (const message of [
      "noSuchCode",
      "alreadyActive",
      "permissionDenied",
      "step-up required",
      "TypeError: Failed to fetch",
    ]) {
      const read = readRefusal(refused(message), CATEGORY_REFUSALS);
      expect([message, read.key]).toEqual([message, "admin.categories.error.saveFailed"]);
    }
    expect(readRefusal(new TypeError("Failed to fetch"), CATEGORY_REFUSALS).key).toBe(
      "admin.categories.error.saveFailed",
    );
  });

  it("CRF-3 the screens' state: a cancelled step-up says nothing; a trigger's key reads through the catalogue", () => {
    const { result } = renderHook(() => useCategoryRefusal());
    act(() => result.current.fail(refused("catchallParent")));
    expect(result.current.message).toBe("T(admin.categories.error.catchallParent) {detail}");
    act(() => result.current.fail(new StepUpCancelled()));
    expect(result.current.message).toBeNull();
    act(() => result.current.fail(refused("admin.attributes.error.parentAfterChild:leaf: a → b")));
    expect(result.current.message).toBe("T(admin.attributes.error.parentAfterChild) leaf: a → b");
    act(() => result.current.fail(refused("admin.categories.error.notInCatalogue")));
    expect(result.current.message).toBe("T(admin.categories.error.saveFailed) {detail}");
  });
});

describe("the console's rate sentence says when (L22)", () => {
  it("RTW-7 a rate refusal with a future instant and a language draws the when words", () => {
    language.current = "en";
    try {
      const { result } = renderHook(() => useCategoryRefusal());
      const at = new Date(Date.now() + 3_600_000).toISOString();
      act(() => result.current.fail({ message: `rateLimited:${at}`, code: "P0D01" }));
      expect(result.current.message).toContain("T(admin.error.rateLimitedWhen)");
    } finally {
      language.current = undefined;
    }
  });

  // INC-1307 — the words owed, one case each.
  it("CRF-4 a slug another category uses reads its own words", () => {
    expect(readRefusal(refused("slugTaken"), CATEGORY_REFUSALS).key).toBe(
      "admin.categories.error.slugTaken",
    );
  });

  it("CRF-5 a reassignment target that is off or takes no listings reads its own words", () => {
    expect(readRefusal(refused("reassignTargetInvalid"), CATEGORY_REFUSALS).key).toBe(
      "admin.categories.error.reassignTargetInvalid",
    );
  });

  it("CRF-6 the window's end before its start (badValue:visible_until) reads the window-order words", () => {
    expect(readRefusal(refused("badValue:visible_until"), CATEGORY_REFUSALS).key).toBe(
      "admin.categories.error.windowOrder",
    );
  });
});
