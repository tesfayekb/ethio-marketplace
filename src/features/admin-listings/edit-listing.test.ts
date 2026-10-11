import { describe, expect, it } from "vitest";

import {
  EDIT_REASONS,
  editChanges,
  editErrorKey,
  editProblem,
  priceSent,
  sameAnswers,
  valuesOf,
} from "./edit-listing";
import { MOVE_REASONS } from "./move-reasons";
import { detailOf, editAnswerOf, refusalsOf } from "./use-admin-listing";

/**
 * Bundle 11, turns L4a and L4b (D140, DEC-173) — what an admin's edit of the
 * category, the specifications, the price, the title and the description sends,
 * and how the door's answers read.
 */
const listing = (over: Record<string, unknown> = {}) =>
  detailOf({
    listing: {
      id: "l-1",
      title: "Samsung fridge",
      description: "Working, one owner",
      status: "active",
      price_mode: "fixed",
      price_amount: 1500,
      price_currency: "ETB",
      price_period: "once",
      price_bp: null,
      price_negotiable: false,
      price_unit: null,
      price_unit_text: null,
      category_id: "leaf-1",
      attributes: { size_kg: 5, colour: { value: "red" } },
      created_at: "2026-10-01T00:00:00Z",
      updated_at: "2026-10-01T00:00:00Z",
      ...over,
    },
    seller: { id: "s-1" },
    channels: {},
    history: [],
    history_total: 0,
  }).listing;

describe("an admin's edit (turn L4a)", () => {
  it("LE-1 the form opens on the listing as it stands; nothing changed sends nothing", () => {
    const values = valuesOf(listing(), "KES");
    expect(values.title).toBe("Samsung fridge");
    expect(values.price).toMatchObject({ priceMode: "fixed", priceCurrency: "ETB" });
    expect(editChanges(listing(), values)).toBeNull();
    expect(editProblem(null, "misleading", "")).toBe("admin.listings.edit.nothing");
    // Spaces around the title are the door's to trim: they are no change.
    expect(editChanges(listing(), { ...values, title: "  Samsung fridge " })).toBeNull();
  });

  it("LE-2 only what changed travels; a price travels whole", () => {
    const values = valuesOf(listing(), null);
    expect(editChanges(listing(), { ...values, title: "Samsung fridge, 300 L" })).toEqual({
      title: "Samsung fridge, 300 L",
    });
    expect(editChanges(listing(), { ...values, description: "Working" })).toEqual({
      description: "Working",
    });
    expect(
      editChanges(listing(), { ...values, price: { ...values.price, priceAmount: 1400 } }),
    ).toEqual({
      price_mode: "fixed",
      price_amount: 1400,
      price_currency: "ETB",
      price_period: "once",
      price_bp: null,
      price_negotiable: false,
    });
  });

  it("LE-3 a price is sent as the door stores it: no figure on a free price, no amount on a commission", () => {
    const values = valuesOf(listing(), null);
    expect(
      priceSent({
        ...values.price,
        priceMode: "free",
        priceAmount: 1500,
        priceNegotiable: true,
      }),
    ).toEqual({
      price_mode: "free",
      price_amount: null,
      price_currency: null,
      price_period: "once",
      price_bp: null,
      price_negotiable: false,
    });
    expect(priceSent({ ...values.price, priceMode: "commission", priceBp: 500 })).toMatchObject({
      price_amount: null,
      price_currency: null,
      price_bp: 500,
    });
    // A free listing opens with its market's money for a switch to a fixed
    // price; the money alone is no change.
    const free = listing({ price_mode: "free", price_amount: null, price_currency: null });
    const opened = valuesOf(free, "KES");
    expect(opened.price.priceCurrency).toBe("KES");
    expect(editChanges(free, opened)).toBeNull();
  });

  it("LE-4 the reasons are the door's edit list without the photo; the note rules are the move's", () => {
    expect([...EDIT_REASONS]).toEqual([
      "wrong_category",
      "misleading",
      "contact_in_text",
      "rules",
      "other",
    ]);
    for (const reason of EDIT_REASONS) {
      expect([...MOVE_REASONS.send_back]).toContain(reason);
    }
    const changes = { title: "x" };
    expect(editProblem(changes, "", "")).toBe("admin.listings.move.pickReason");
    expect(editProblem(changes, "other", "  ")).toBe("admin.listings.move.noteRequired");
    expect(editProblem(changes, "rules", "")).toBeNull();
  });

  it("LE-5 the door's answers: done, refusals under their fields, errors in words", () => {
    expect(editAnswerOf({ ok: true, status: "active", fields: ["price", "title"] })).toEqual({
      ok: true,
      status: "active",
      fields: ["price", "title"],
    });
    expect(
      editAnswerOf({
        ok: false,
        refusals: [
          { field: "title", reason: "contactInText" },
          { attr_key: "size_kg", reason: "required" },
          { field: "price_period", reason: "periodLocked", detail: "month" },
        ],
      }),
    ).toEqual({
      ok: false,
      refusals: [
        { field: "title", reason: "contactInText" },
        { field: "size_kg", reason: "required" },
        { field: "price_period", reason: "periodLocked", detail: "month" },
      ],
    });
    expect(refusalsOf(null)).toEqual([]);
    expect(editErrorKey("nothing changed")).toBe("admin.listings.edit.nothing");
    expect(editErrorKey("a removed listing is not edited")).toBe(
      "admin.listings.edit.error.removed",
    );
    expect(editErrorKey("your own listing is edited the seller's way")).toBe(
      "admin.listings.move.error.own",
    );
    expect(editErrorKey("listing not found")).toBe("admin.listings.move.error.notFound");
    expect(editErrorKey("permission denied")).toBe("admin.listings.move.error.denied");
    expect(editErrorKey("something else")).toBe("common.error");
  });

  it("LE-6 a category change sends the leaf and the answers; answers travel only when the admin worked in them", () => {
    const values = valuesOf(listing(), null);
    // The same answers in another key order are the same answers.
    expect(sameAnswers({ a: 1, b: { value: "x" } }, { b: { value: "x" }, a: 1 })).toBe(true);
    expect(sameAnswers({ a: 1 }, { a: 2 })).toBe(false);
    // The form's own tidying (a default filled) is not an edit until the admin works in it.
    const tidied = { ...values, attributes: { ...values.attributes, condition: "used" } };
    expect(editChanges(listing(), tidied)).toBeNull();
    expect(editChanges(listing(), tidied, true)).toEqual({ attributes: tidied.attributes });
    // Worked in, but the same answers: nothing travels.
    expect(editChanges(listing(), values, true)).toBeNull();
    // Another leaf: the leaf travels, and the answers when they differ.
    expect(editChanges(listing(), { ...values, categoryId: "leaf-2" })).toEqual({
      category_id: "leaf-2",
    });
    expect(editChanges(listing(), { ...tidied, categoryId: "leaf-2" })).toEqual({
      category_id: "leaf-2",
      attributes: tidied.attributes,
    });
  });
});
