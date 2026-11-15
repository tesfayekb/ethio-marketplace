import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { StepUpCancelled } from "@/features/auth/mfa/mfa-service";
import { readRefusal, refusalText } from "@/lib/refusal";

const catalogue = new Set(["admin.attributes.error.parentAfterChild"]);
vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => `T(${key}) {detail}`,
    has: (key: string) => catalogue.has(key),
  }),
}));

import { ATTRIBUTE_REFUSALS, useAttributeRefusal } from "./attribute-refusals";

/** A shell's refusal as the browser client surfaces it: `code[:detail]` in `message`. */
const refused = (message: string) => ({ message, code: "P0D01", details: "", hint: "" });

describe("the attribute library's refusals (F1-4a, DEC-333)", () => {
  it("ARF-1 each code that replaced a console key reads that key's words", () => {
    const words: Array<[string, string]> = [
      ["rateLimited", "admin.error.rateLimited"],
      ["required", "admin.attributes.error.keyRequired"],
      ["duplicateKey", "admin.attributes.error.keyTaken"],
      ["unknownAttribute", "admin.attributes.error.notFound"],
      ["unknownLink", "admin.attributes.error.linkNotFound"],
      ["confirmMismatch", "admin.attributes.error.confirmMismatch"],
      ["deleteHasLinks", "admin.attributes.error.deleteHasLinks"],
      ["deleteHasDependents", "admin.attributes.error.deleteHasDependents"],
      ["unlinkHasDependents", "admin.attributes.error.unlinkHasDependents"],
      ["alreadyLinked", "admin.attributes.error.alreadyLinked"],
      ["cardLimit", "admin.attributes.error.cardLimit"],
      ["factLimit", "admin.attributes.error.factLimit"],
      ["rankInherited", "admin.attributes.error.rankInherited"],
      ["orderMismatch", "admin.attributes.error.orderMismatch"],
      ["mergeNoSources", "admin.attributes.error.mergeNoSources"],
      ["mergeTargetInSources", "admin.attributes.error.mergeTargetInSources"],
      ["mergeHasHolders", "admin.attributes.error.mergeHasHolders"],
      ["mergeAcrossDependency", "admin.attributes.error.mergeAcrossDependency"],
      ["dependsUnknown", "admin.attributes.error.dependsUnknown"],
      ["dependsNotSelect", "admin.attributes.error.dependsNotSelect"],
      ["dependsSelf", "admin.attributes.error.dependsSelf"],
      ["dependsCycle", "admin.attributes.error.dependsCycle"],
      ["parentWithoutDepends", "admin.attributes.error.parentWithoutDepends"],
      ["parentNotInParent", "admin.attributes.error.parentNotInParent"],
      ["badOption", "admin.attributes.error.badOption"],
      ["badCell", "admin.attributes.error.badCell"],
      ["boundsTargetNotNumber", "admin.attributes.error.boundsTargetNotNumber"],
      ["boundsTargetNotColinked", "admin.attributes.error.boundsTargetNotColinked"],
      ["allowedTargetNotSelect", "admin.attributes.error.allowedTargetNotSelect"],
      ["allowedTargetNotColinked", "admin.attributes.error.allowedTargetNotColinked"],
      ["allowedTargetCircular", "admin.attributes.error.allowedTargetCircular"],
      ["allowedUnknownValue", "admin.attributes.error.allowedUnknownValue"],
    ];
    expect(Object.keys(ATTRIBUTE_REFUSALS.words).sort()).toEqual(
      words.map(([code]) => code).sort(),
    );
    for (const [code, key] of words) {
      const read = readRefusal(refused(code), ATTRIBUTE_REFUSALS);
      expect([code, read.branch, read.key]).toEqual([code, "family", key]);
    }
  });

  it("ARF-2 a tail fills the words that take a value; rankInherited's diagnostic tail is never drawn", () => {
    const fill = (message: string, words: string) =>
      refusalText(readRefusal(refused(message), ATTRIBUTE_REFUSALS), () => words);
    expect(fill("deleteHasLinks:3", "{count} categories")).toBe("3 categories");
    expect(fill("dependsCycle:size", "“{detail}” loops")).toBe("“size” loops");
    expect(fill("deleteHasDependents:model, trim", "depend: {detail}")).toBe("depend: model, trim");
    expect(fill("boundsTargetNotNumber:size|colour", "“{target}” is not a number")).toBe(
      "“colour” is not a number",
    );
    expect(
      fill(
        "rankInherited:category=c-1 rank=2 attribute=size inherited_from=cars inherited_attribute=make",
        "That card position is already taken.",
      ),
    ).toBe("That card position is already taken.");
  });

  it("ARF-3 a code without words, a gate's code, a sentence and a failed fetch draw the generic line", () => {
    for (const message of [
      "unknownCategory",
      "badAllowedOption:red",
      "badDefault:size",
      "badVisibleWhen:colour",
      "priceBasisDuplicate:per_day",
      "badClearCell:nope",
      "permissionDenied",
      "step-up required",
    ]) {
      const read = readRefusal(refused(message), ATTRIBUTE_REFUSALS);
      expect([message, read.key]).toEqual([message, "admin.attributes.error.saveFailed"]);
    }
    expect(readRefusal(new TypeError("Failed to fetch"), ATTRIBUTE_REFUSALS).key).toBe(
      "admin.attributes.error.saveFailed",
    );
  });

  it("ARF-4 the screens' state: a cancelled step-up says nothing; a trigger's key reads through the catalogue", () => {
    const { result } = renderHook(() => useAttributeRefusal());
    act(() => result.current.fail(refused("dependsUnknown:colour")));
    expect(result.current.message).toBe("T(admin.attributes.error.dependsUnknown) colour");
    act(() => result.current.fail(new StepUpCancelled()));
    expect(result.current.message).toBeNull();
    act(() => result.current.fail(refused("admin.attributes.error.parentAfterChild:leaf: a → b")));
    expect(result.current.message).toBe("T(admin.attributes.error.parentAfterChild) leaf: a → b");
  });
});
