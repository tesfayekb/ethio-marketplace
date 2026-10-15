import { describe, expect, it } from "vitest";

import { photoOutcome, photoScreenPlan, STORED_FAIL_CODES, withSiteCap } from "./hold";
import { POLICY_CODES } from "./policy";

/** D158 item 3 (bundle 13 turn 6) — what an upload does with photo screening's switch. */
describe("photoScreenPlan (D158)", () => {
  it("PH-1 on: every photo is screened", () => {
    expect(photoScreenPlan({ on: true })).toBe("screen");
  });

  it("PH-2 off by staff: the photo is held, on any ad (bundle 16 turn 4a: staff see every held photo)", () => {
    expect(photoScreenPlan({ on: false, reason: "staff" })).toBe("hold");
  });

  it("PH-3 a switch that could not be read fails closed", () => {
    expect(photoScreenPlan({ on: false, reason: "unavailable" })).toBe("unavailable");
  });

  it("PH-4 off by budget (D184): held, as off by staff", () => {
    expect(photoScreenPlan({ on: false, reason: "budget" })).toBe("hold");
  });

  it("PH-5 the site's day cap (D184): a spent cap turns an open gate into off by budget; any other gate is kept", () => {
    expect(withSiteCap({ on: true }, true)).toEqual({ on: true });
    expect(withSiteCap({ on: true }, false)).toEqual({ on: false, reason: "budget" });
    const staff = { on: false, reason: "staff" } as const;
    const unavailable = { on: false, reason: "unavailable" } as const;
    expect(withSiteCap(staff, false)).toEqual(staff);
    expect(withSiteCap(unavailable, false)).toEqual(unavailable);
    expect(photoScreenPlan(withSiteCap({ on: true }, false))).toBe("hold");
  });
});

/** Bundle 16 turn 4a (D178, D183) — what the upload does with the screen's verdict. */
describe("photoOutcome (D178, D183)", () => {
  it("PH-6 a clean pass is shown; an unsure or not-right photo is kept for review", () => {
    expect(photoOutcome({ ok: true })).toEqual({ kind: "show" });
    expect(photoOutcome({ ok: true, warnings: [] })).toEqual({ kind: "show" });
    expect(photoOutcome({ ok: true, warnings: ["not_relevant"] })).toEqual({
      kind: "review",
      review: { label: "not_right" },
    });
    expect(photoOutcome({ ok: true, warnings: ["unsure"], evidence: "a dark shape" })).toEqual({
      kind: "review",
      review: { label: "unsure", evidence: "a dark shape" },
    });
    // Both warnings: unsure is the label (the photo may need refusing).
    expect(photoOutcome({ ok: true, warnings: ["not_relevant", "unsure"] })).toEqual({
      kind: "review",
      review: { label: "unsure" },
    });
  });

  it("PH-7 a fail a person may allow is kept for review with its code and phrase; nudity, a mismatched copy and the provider's failure are refused", () => {
    for (const code of STORED_FAIL_CODES) {
      expect(photoOutcome({ ok: false, code: code as never, evidence: "seen" })).toEqual({
        kind: "review",
        review: { label: "fail", code, evidence: "seen" },
      });
    }
    expect(photoOutcome({ ok: false, code: "weapon", evidence: "" })).toEqual({
      kind: "review",
      review: { label: "fail", code: "weapon" },
    });
    for (const code of ["nudity", "variant_mismatch", "providerUnavailable"] as const) {
      expect(photoOutcome({ ok: false, code, evidence: "x" })).toEqual({ kind: "refuse" });
    }
  });

  it("PH-8 every refusal code is either stored for review or one of the two refused unstored", () => {
    const refused = POLICY_CODES.filter((code) => !STORED_FAIL_CODES.has(code));
    expect(refused).toEqual(["nudity", "variant_mismatch"]);
    expect(STORED_FAIL_CODES.size).toBe(8);
  });
});
