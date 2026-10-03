import { describe, expect, it } from "vitest";
import { lengthHint, phonePlanOf, PHONE_PLANS } from "./phone-plans";

describe("phone plans (W4)", () => {
  it("reads Ethiopia as 9 national digits with a 9… example", () => {
    expect(phonePlanOf("ET")).toEqual({ min: 9, max: 9, example: "911234567" });
  });

  it("reads lower-case codes and returns null for an unknown one", () => {
    expect(phonePlanOf("er")?.min).toBe(7);
    expect(phonePlanOf("ZZ")).toBeNull();
  });

  it("flags a short number and clears for a full one", () => {
    expect(lengthHint("ET", "91123")).toBe("short");
    expect(lengthHint("ET", "911234567")).toBeNull();
    expect(lengthHint("ET", "0911234567")).toBeNull();
    expect(lengthHint("ET", "9112345678")).toBe("long");
  });

  it("gives no hint without digits or without a plan", () => {
    expect(lengthHint("ET", "")).toBeNull();
    expect(lengthHint("ZZ", "123")).toBeNull();
  });

  it("every row has an example inside its own length range", () => {
    for (const [iso, plan] of Object.entries(PHONE_PLANS)) {
      expect(iso).toMatch(/^[A-Z]{2}$/);
      expect(plan.min).toBeLessThanOrEqual(plan.max);
      expect(lengthHint(iso, plan.example), iso).toBeNull();
    }
  });
});
