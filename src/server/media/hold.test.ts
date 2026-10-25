import { describe, expect, it } from "vitest";

import { PHOTO_OPEN_STATUSES, photoOutcome, STORED_FAIL_CODES } from "./hold";
import { POLICY_CODES } from "./policy";

/**
 * D158 item 3 — what an upload does with photo screening's switch is, since
 * Foundations turn 17, the gateway's order mapped by `screenAnswerOf`
 * (policy.test.ts PPOL-18…20: on → screen; off by staff or budget or a refused
 * day cap → held; unreadable or any provider failure → providerUnavailable).
 * This module keeps the photo outcomes and the one status set.
 */

describe("the photo-open statuses", () => {
  it("PH-1 the upload route and background removal read this one set", () => {
    expect([...PHOTO_OPEN_STATUSES].sort()).toEqual([
      "active",
      "closed",
      "draft",
      "expired",
      "held",
      "reduced",
      "rejected",
    ]);
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
