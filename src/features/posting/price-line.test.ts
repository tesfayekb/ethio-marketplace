import { describe, expect, it } from "vitest";
import { en } from "@/i18n/locales/en";
import type { MessageKey } from "@/i18n";
import { priceLine, storedUnitNoun, type PriceLineInput } from "./price-line";

const t = (key: MessageKey) => (en as Record<string, string>)[key] ?? key;
const base: PriceLineInput = {
  mode: "fixed",
  amount: 4100,
  currency: "ETB",
  period: "once",
  bp: null,
  unit: null,
};

describe("bundle 4 step 10 — the one price line", () => {
  const rows: [string, Partial<PriceLineInput>, string][] = [
    ["a unit with a noun prints per unit", { unit: "kg" }, "4,100 ETB per kg"],
    ["a unit outranks the period", { unit: "pack", period: "month" }, "4,100 ETB per pack"],
    ["no unit prints the period", { period: "day" }, "4,100 ETB Per day"],
    ["no unit and a one-off price prints the amount alone", {}, "4,100 ETB"],
    ["a blank unit falls back to the period", { unit: "  ", period: "week" }, "4,100 ETB Per week"],
    ["free", { mode: "free" }, "Free"],
    ["contact", { mode: "contact" }, "Contact for price"],
    ["commission", { mode: "commission", amount: null, bp: 250 }, "2.5% commission"],
    [
      "commission without a rate prints the surface's empty word",
      { mode: "commission", amount: null },
      "—",
    ],
    ["a fixed price with no amount prints the surface's empty word", { amount: null }, "—"],
  ];
  for (const [name, patch, expected] of rows) {
    it(name, () => {
      expect(priceLine({ ...base, ...patch }, t, "—")).toBe(expected);
    });
  }
});

describe("bundle 4 step 10 — the stored unit's noun", () => {
  const labels = {
    per_kg: { en: "Per kg", am: "በኪሎ" },
    by_lot: { en: "Whole lot", am: null },
  };
  it("reads the noun of the label in the reader's language", () => {
    expect(storedUnitNoun("per_kg", null, labels, "en")).toBe("kg");
    expect(storedUnitNoun("per_kg", null, labels, "am")).toBe("ኪሎ");
  });
  it("falls back to English when the language has no label", () => {
    expect(storedUnitNoun("by_lot", null, labels, "am")).toBe(null);
  });
  it("a label with no noun gives no unit", () => {
    expect(storedUnitNoun("by_lot", null, labels, "en")).toBe(null);
  });
  it("other prints the seller's written unit", () => {
    expect(storedUnitNoun("other", " bundle ", labels, "en")).toBe("bundle");
    expect(storedUnitNoun("other", "", labels, "en")).toBe(null);
  });
  it("no token or an unknown token gives no unit", () => {
    expect(storedUnitNoun(null, null, labels, "en")).toBe(null);
    expect(storedUnitNoun("per_tonne", null, labels, "en")).toBe(null);
    expect(storedUnitNoun("per_kg", null, null, "en")).toBe(null);
  });
});
