import { describe, expect, it } from "vitest";

import { photoScreenPlan, withSiteCap } from "./hold";

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

  it("PH-3 a switch that could not be read fails closed", () => {
    for (const status of ["draft", "rejected", "active", "expired"]) {
      expect(photoScreenPlan({ on: false, reason: "unavailable" }, status)).toBe("unavailable");
    }
  });

  it("PH-4 off by budget (D184): held on an ad that goes to the queue next, refused on a live ad, as off by staff", () => {
    const off = { on: false, reason: "budget" } as const;
    expect(photoScreenPlan(off, "draft")).toBe("hold");
    expect(photoScreenPlan(off, "rejected")).toBe("hold");
    for (const status of ["active", "reduced", "closed", "held", "expired"]) {
      expect(photoScreenPlan(off, status)).toBe("paused");
    }
  });

  it("PH-5 the site's day cap (D184): a spent cap turns an open gate into off by budget; any other gate is kept", () => {
    expect(withSiteCap({ on: true }, true)).toEqual({ on: true });
    expect(withSiteCap({ on: true }, false)).toEqual({ on: false, reason: "budget" });
    const staff = { on: false, reason: "staff" } as const;
    const unavailable = { on: false, reason: "unavailable" } as const;
    expect(withSiteCap(staff, false)).toEqual(staff);
    expect(withSiteCap(unavailable, false)).toEqual(unavailable);
    expect(photoScreenPlan(withSiteCap({ on: true }, false), "draft")).toBe("hold");
    expect(photoScreenPlan(withSiteCap({ on: true }, false), "active")).toBe("paused");
  });
});
