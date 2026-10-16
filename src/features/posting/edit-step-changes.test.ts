import { describe, expect, it } from "vitest";

import {
  ADMIN_KEYS,
  applyToBaseline,
  lockedSteps,
  SELLER_KEYS,
  stepChanges,
  type EditBaseline,
} from "./edit-step-changes";
import type { DraftValues } from "./use-draft";

/**
 * Bundle 17 turn 2 (D194) — what one wizard step's Next sends through the edit
 * door, and nothing more: that step's CHANGED fields, in the door's own names,
 * filtered by the actor's door (edit_my_listing :51–56; admin_edit_listing :70–71).
 */
const baseline: EditBaseline = {
  categoryId: "leaf-1",
  attributes: { colour: { value: "red" }, size_kg: 5 },
  title: "Samsung fridge",
  description: "Working, one owner",
  videoUrl: "",
  priceMode: "fixed",
  priceAmount: 1500,
  priceCurrency: "ETB",
  pricePeriod: "once",
  priceBp: null,
  priceNegotiable: false,
  posterExpiresAt: "",
  coverage: ["p-1", "p-2"],
  contactPref: { messages: true, phone: { show: true, value: "+251911000000" } },
  streetAddress: "Bole road",
  directions: null,
};
const text = { streetAddress: "Bole road", directions: null };
const same = (over: Partial<DraftValues> = {}): DraftValues => {
  const { streetAddress: _s, directions: _d, ...values } = baseline;
  return { ...values, ...over };
};

describe("edit-step-changes", () => {
  it("ES-1 the Category is locked for everyone; staff's photos, place and contact as well", () => {
    expect(lockedSteps("seller")).toEqual([1]);
    expect(lockedSteps("admin")).toEqual([1, 2, 6, 7]);
    expect([...ADMIN_KEYS].every((key) => SELLER_KEYS.has(key))).toBe(true);
    expect(SELLER_KEYS.has("coverage")).toBe(true);
    expect(ADMIN_KEYS.has("coverage")).toBe(false);
  });

  it("ES-2 an unchanged step sends nothing, on every step", () => {
    for (const step of [1, 2, 3, 4, 5, 6, 7, 8]) {
      expect(stepChanges(step, baseline, same(), text, "seller")).toEqual({});
      expect(stepChanges(step, baseline, same(), text, "admin")).toEqual({});
    }
  });

  it("ES-3 each step sends only its own changed fields, in the door's names", () => {
    expect(
      stepChanges(2, baseline, same({ videoUrl: " https://youtu.be/x " }), text, "seller"),
    ).toEqual({ video_url: "https://youtu.be/x" });
    expect(
      stepChanges(
        3,
        baseline,
        same({ attributes: { colour: { value: "blue" }, size_kg: 5 } }),
        text,
        "seller",
      ),
    ).toEqual({ attributes: { colour: { value: "blue" }, size_kg: 5 } });
    // The same answers in another key order are the same answers.
    expect(
      stepChanges(
        3,
        baseline,
        same({ attributes: { size_kg: 5, colour: { value: "red" } } }),
        text,
        "seller",
      ),
    ).toEqual({});
    expect(stepChanges(4, baseline, same({ priceAmount: 1400 }), text, "seller")).toEqual({
      price_mode: "fixed",
      price_amount: 1400,
      price_currency: "ETB",
      price_period: "once",
      price_bp: null,
      price_negotiable: false,
    });
    expect(
      stepChanges(5, baseline, same({ title: "  Samsung fridge, 300 l " }), text, "seller"),
    ).toEqual({
      title: "Samsung fridge, 300 l",
    });
    expect(stepChanges(5, baseline, same({ description: "Working" }), text, "seller")).toEqual({
      description: "Working",
    });
    // A changed title never drags the video or the description along.
    expect(Object.keys(stepChanges(5, baseline, same({ title: "New" }), text, "seller"))).toEqual([
      "title",
    ]);
  });

  it("ES-4 the place step: the places, the street line and the directions, each only when changed", () => {
    expect(stepChanges(6, baseline, same({ coverage: ["p-2", "p-1"] }), text, "seller")).toEqual({
      coverage: ["p-2", "p-1"],
    });
    expect(
      stepChanges(
        6,
        baseline,
        same(),
        { streetAddress: "  ", directions: "Behind the bank" },
        "seller",
      ),
    ).toEqual({ street_address: null, directions: "Behind the bank" });
    expect(
      stepChanges(6, baseline, same(), { streetAddress: " Bole road ", directions: " " }, "seller"),
    ).toEqual({});
  });

  it("ES-5 the contact step sends the channels when one changes; staff never send a key their door refuses", () => {
    const pref = { messages: true, phone: { show: false, value: "+251911000000" } };
    expect(stepChanges(7, baseline, same({ contactPref: pref }), text, "seller")).toEqual({
      contact_pref: pref,
    });
    expect(stepChanges(7, baseline, same({ contactPref: pref }), text, "admin")).toEqual({});
    expect(stepChanges(6, baseline, same({ coverage: ["p-9"] }), text, "admin")).toEqual({});
    expect(
      stepChanges(2, baseline, same({ videoUrl: "https://youtu.be/x" }), text, "admin"),
    ).toEqual({});
    expect(stepChanges(5, baseline, same({ title: "Corrected" }), text, "admin")).toEqual({
      title: "Corrected",
    });
  });

  it("ES-6 the baseline follows an accepted change set and nothing else", () => {
    const values = same({ title: "New", priceAmount: 1400, coverage: ["p-9"] });
    const after = applyToBaseline(
      baseline,
      values,
      { streetAddress: null, directions: "Left" },
      {
        title: "New",
        directions: "Left",
      },
    );
    expect(after.title).toBe("New");
    expect(after.directions).toBe("Left");
    // Not in the change set: the price and the places stay as the door holds them.
    expect(after.priceAmount).toBe(1500);
    expect(after.coverage).toEqual(["p-1", "p-2"]);
    expect(after.streetAddress).toBe("Bole road");
    // The same step sent again finds nothing to send.
    expect(
      stepChanges(5, after, values, { streetAddress: "Bole road", directions: "Left" }, "seller"),
    ).toEqual({});
  });
});
