import { describe, expect, it } from "vitest";

import { daysOf } from "./listing-policy";
import { tierDays } from "./tier-reasons";

describe("console days through the shared parser", () => {
  it("KFC2-1 renewal days are whole numbers from 1 to 365", () => {
    expect(daysOf("1")).toBe(1);
    expect(daysOf("365")).toBe(365);
    for (const raw of ["", "0", "366", "1.0", "1e2", "1x", "Infinity"]) {
      expect(daysOf(raw), raw).toBeNull();
    }
  });

  it("KFC2-2 tier days are blank open-ended or whole numbers from 1 to 3650", () => {
    expect(tierDays("  ")).toBeNull();
    expect(tierDays("1")).toBe(1);
    expect(tierDays("3650")).toBe(3650);
    for (const raw of ["0", "3651", "1.0", "1e2", "1x", "Infinity"]) {
      expect(tierDays(raw), raw).toBeUndefined();
    }
  });
});
