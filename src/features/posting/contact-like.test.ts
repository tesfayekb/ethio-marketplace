import { describe, expect, it } from "vitest";

import { contactRuleApplies, looksLikeContact } from "./contact-like";

describe("looksLikeContact mirrors attr_contact_like", () => {
  it("flags a phone number", () => {
    expect(looksLikeContact("+251 911 234 567")).toBe(true);
    expect(looksLikeContact("call 0911-234-567")).toBe(true);
  });
  it("leaves a street note and a model alone", () => {
    expect(looksLikeContact("Bole Road, House 1234, 3rd floor")).toBe(false);
    expect(looksLikeContact("Model 320D")).toBe(false);
    expect(looksLikeContact("")).toBe(false);
    expect(looksLikeContact(null)).toBe(false);
  });
  it("applies to free text only, never to identity presets", () => {
    expect(contactRuleApplies(null)).toBe(true);
    expect(contactRuleApplies("free:short")).toBe(true);
    expect(contactRuleApplies("digits:15")).toBe(false);
    expect(contactRuleApplies("vin")).toBe(false);
  });
});
