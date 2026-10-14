import { describe, expect, it } from "vitest";

import { photoScreenPlan } from "./hold";

/** D158 item 3 (bundle 13 turn 6) — what an upload does with photo screening's switch. */
describe("photoScreenPlan (D158)", () => {
  it("PH-1 on: every photo is screened, whatever the ad's status", () => {
    for (const status of ["draft", "rejected", "active", "reduced", "held", "expired"]) {
      expect(photoScreenPlan({ on: true }, status)).toBe("screen");
    }
  });

  it("PH-2 off by staff: held on an ad that goes to the queue next, refused on a live ad", () => {
    const off = { on: false, reason: "staff" } as const;
    expect(photoScreenPlan(off, "draft")).toBe("hold");
    expect(photoScreenPlan(off, "rejected")).toBe("hold");
    for (const status of ["active", "reduced", "held", "expired"]) {
      expect(photoScreenPlan(off, status)).toBe("paused");
    }
  });

  it("PH-3 a switch that could not be read, or any other reason, fails closed", () => {
    expect(photoScreenPlan({ on: false, reason: "unavailable" }, "draft")).toBe("unavailable");
    expect(photoScreenPlan({ on: false, reason: "budget" }, "draft")).toBe("unavailable");
  });
});
