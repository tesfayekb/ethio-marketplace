import { describe, expect, it } from "vitest";
import { AI_TASKS } from "@/server/ai/tasks";
import { render } from "@/server/ai/template";
import { assistDealLines, assistFactLines } from "./assist-prompt";

const writingHelper = AI_TASKS.find((task) => task.id === "writing_helper");
if (writingHelper === undefined) throw new Error("writing_helper task missing");

describe("writing helper prompt (bundle 4 step 13; turn 16: rendered by the template)", () => {
  // The body a draft with an amount would send: the amount and currency are
  // not part of it, and a price-named attribute is dropped all the same.
  const facts = [
    ...assistFactLines(
      { brand: "samsung", unit_of_sale: "per_pack", price_amount: 4100, currency: "ETB" },
      null,
    ),
    ...assistDealLines(true, "day"),
  ];
  const prompt = render(writingHelper, {
    language: "en",
    category: "Phones",
    facts,
    sellerTitle: "",
    sellerDescription: "",
    photos: "none",
    previous: [],
  }).user;

  it("carries neither the amount nor the currency", () => {
    expect(prompt).not.toContain("4100");
    expect(prompt).not.toContain("ETB");
  });

  it("carries the unit, negotiable and the period as facts", () => {
    expect(prompt).toContain('- "unit_of_sale: per_pack"');
    expect(prompt).toContain('- "negotiable: yes"');
    expect(prompt).toContain('- "price period: per day"');
  });

  it("renders the declared lines in order, with (none) for the empty optional fields", () => {
    expect(prompt.split("\n")).toEqual([
      "Language: en",
      'Category: "Phones"',
      "Facts:",
      '- "brand: samsung"',
      '- "unit_of_sale: per_pack"',
      '- "negotiable: yes"',
      '- "price period: per day"',
      "Seller's draft title: (none)",
      "Seller's draft description: (none)",
      "Photos: none",
    ]);
  });

  it("adds no period line for a one-off and no negotiable line when off", () => {
    expect(assistDealLines(false, "once")).toEqual([]);
  });
});
