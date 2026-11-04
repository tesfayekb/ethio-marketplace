import { describe, expect, it } from "vitest";

import { STEPS } from "./types";
import { EDIT_GUIDE, POST_GUIDE, WIZARD_GUIDE_PARTS, stepPartKey } from "./wizard-guide";

/**
 * P-1c turn (b) (D315) — the wizard's Guide is pinned to the wizard's steps.
 */
describe("wizard guide (WG)", () => {
  it("WG-1 the parts are the steps, in the wizard's order, each named by its step", () => {
    expect(WIZARD_GUIDE_PARTS.map((part) => part.key)).toEqual(
      STEPS.map((step) => stepPartKey(step.nameKey)),
    );
    expect(WIZARD_GUIDE_PARTS.map((part) => part.labelKey)).toEqual(
      STEPS.map((step) => step.nameKey),
    );
    expect(new Set(WIZARD_GUIDE_PARTS.map((part) => part.key)).size).toBe(STEPS.length);
  });

  it("WG-2 the edit wizard shares the posting wizard's part lines under its own prefix", () => {
    expect(POST_GUIDE.prefix).toBe("post");
    expect(POST_GUIDE.partsPrefix).toBeUndefined();
    expect(EDIT_GUIDE.prefix).toBe("post.edit");
    expect(EDIT_GUIDE.partsPrefix).toBe(POST_GUIDE.prefix);
    expect(EDIT_GUIDE.next).toEqual(POST_GUIDE.next);
  });
});
