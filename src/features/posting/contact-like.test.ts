import { describe, expect, it } from "vitest";

import { contactRuleApplies, looksLikeContact } from "./contact-like";

/** INC-382 — the bundle 2 judge lists, verbatim; the migration asserts the same rows. */
const MUST_MATCH = [
  "+251 911 234 567",
  "+251911234567",
  "0911 23 45 67",
  "0911234567",
  "911234567",
  "911 234 567",
  "91 123 4567",
  "09 11 23 45 67",
  "251911234567",
  "00251911234567",
  "call 0911-234567",
  "0911.23.45.67",
  "(404) 555-1234",
  "404.555.1234",
  "+1 404 555 1234",
  "abebe@example.com",
  "t.me/abebe_shop",
  "wa.me/251911234567",
];

const MUST_NOT_MATCH = [
  "Sizes 42 43 44 45",
  "Sizes 38 39 40 41 42 43",
  "Sizes 90 92 94 96 98",
  "Corolla 2008 1300cc",
  "Bole Road, House 1234, 3rd floor",
  "Model 320D",
  "2015 2016 2017 models",
  "was 150000 now 120000",
  "150000000 birr",
  "2023 12000 km",
  "120 x 60 x 75 cm",
  "Plot 25, Block 14, House 1234",
  "1,500,000",
  "ISBN 978-99944-0-000-0",
  "Yeka, woreda 12, house 456",
  "500 ETB per kg, minimum 10 kg",
];

describe("looksLikeContact mirrors attr_contact_like (INC-382)", () => {
  it.each(MUST_MATCH)("matches %s", (text) => {
    expect(looksLikeContact(text)).toBe(true);
  });
  it.each(MUST_NOT_MATCH)("does not match %s", (text) => {
    expect(looksLikeContact(text)).toBe(false);
  });
  it("treats empty input as clean", () => {
    expect(looksLikeContact("")).toBe(false);
    expect(looksLikeContact(null)).toBe(false);
  });
  it("applies to free text only, never to identity presets", () => {
    expect(contactRuleApplies(null)).toBe(true);
    expect(contactRuleApplies("free:short")).toBe(true);
    expect(contactRuleApplies("digits:15")).toBe(false);
    expect(contactRuleApplies("vin")).toBe(false);
  });
  it("INC-448 — a 50,000-character run of 'a.' then '@' answers false within 100 ms", () => {
    const text = "a.".repeat(25_000) + "@";
    const started = performance.now();
    expect(looksLikeContact(text)).toBe(false);
    expect(performance.now() - started).toBeLessThan(100);
  });
});
