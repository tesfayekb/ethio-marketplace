import { describe, expect, it } from "vitest";
import { assistDealLines, assistFactLines, composeAssistPrompt } from "./assist-prompt";

describe("writing helper prompt (bundle 4 step 13)", () => {
  // The body a draft with an amount would send: the amount and currency are
  // not part of it, and a price-named attribute is dropped all the same.
  const facts = [
    ...assistFactLines(
      { brand: "samsung", unit_of_sale: "per_pack", price_amount: 4100, currency: "ETB" },
      null,
    ),
    ...assistDealLines(true, "day"),
  ];
  const prompt = composeAssistPrompt({
    locale: "en",
    categoryPath: "Phones",
    facts,
    sellerTitle: "",
    sellerDescription: "",
    photoCount: 0,
    previous: [],
  });

  it("carries neither the amount nor the currency", () => {
    expect(prompt).not.toContain("4100");
    expect(prompt).not.toContain("ETB");
  });

  it("carries the unit, negotiable and the period as facts", () => {
    expect(prompt).toContain("- unit_of_sale: per_pack");
    expect(prompt).toContain("- negotiable: yes");
    expect(prompt).toContain("- price period: per day");
  });

  it("adds no period line for a one-off and no negotiable line when off", () => {
    expect(assistDealLines(false, "once")).toEqual([]);
  });
});
