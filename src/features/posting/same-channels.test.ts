import { describe, expect, it } from "vitest";
import { sameChannels } from "./step-who";

/** Bundle 4 step 23 — unchanged channels make no identity call. */
describe("sameChannels", () => {
  const phone = { phone: { value: "+251911234567", show: true } };
  it("treats the same value and switch as unchanged", () => {
    expect(sameChannels({ ...phone, messages: true }, phone)).toBe(true);
  });
  it("sees a changed value", () => {
    expect(sameChannels(phone, { phone: { value: "+251911234568", show: true } })).toBe(false);
  });
  it("sees a changed show switch", () => {
    expect(sameChannels(phone, { phone: { value: "+251911234567", show: false } })).toBe(false);
  });
  it("sees a channel added to an empty profile", () => {
    expect(sameChannels(phone, {})).toBe(false);
  });
});
