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
    // D172 — an edit never changes the category, so Wrong category is not its reason.
    expect([...EDIT_REASONS]).toEqual(["misleading", "contact_in_text", "rules", "other"]);
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

describe("the seller's edit (bundle 16 turn R2)", () => {
  it("LE-7 the video link travels when it changed; emptied, it is removed; the admin's edit never sends it", () => {
    // The admin's detail carries no video link: the box opens empty and sends nothing.
    const admin = valuesOf(listing(), null);
    expect(admin.videoUrl).toBe("");
    expect(editChanges(listing(), admin)).toBeNull();
    // The seller's ad with a link.
    const own = { ...listing(), videoUrl: "https://youtu.be/abc" };
    const values = valuesOf(own, null);
    expect(values.videoUrl).toBe("https://youtu.be/abc");
    expect(editChanges(own, values)).toBeNull();
    expect(editChanges(own, { ...values, videoUrl: "  https://youtu.be/abc " })).toBeNull();
    expect(editChanges(own, { ...values, videoUrl: "https://youtu.be/xyz" })).toEqual({
      video_url: "https://youtu.be/xyz",
    });
    expect(editChanges(own, { ...values, videoUrl: "  " })).toEqual({ video_url: null });
    // A first link on an ad that had none.
    const none = { ...listing(), videoUrl: null };
    expect(
      editChanges(none, { ...valuesOf(none, null), videoUrl: "https://youtu.be/new" }),
    ).toEqual({ video_url: "https://youtu.be/new" });
  });
});

describe("the seller's edit, complete (bundle 16 turn E2b, D187)", () => {
  const phone = { value: "+251911000000", show: true };
  const own = () => ({
    ...listing(),
    videoUrl: null,
    coverage: ["city-1", "city-2"],
    contactPref: { messages: true, phone },
    streetAddress: "Bole, 2nd floor",
    directions: null,
  });

  it("LE-8 the form opens on the ad's places, channels and text lines; the admin's detail has none", () => {
    const values = valuesOf(own(), null);
    expect(values.coverage).toEqual(["city-1", "city-2"]);
    expect(values.contactPref).toEqual({ messages: true, phone });
    expect(values.streetAddress).toBe("Bole, 2nd floor");
    expect(values.directions).toBe("");
    const admin = valuesOf(listing(), null);
    expect(admin.coverage).toEqual([]);
    expect(admin.contactPref).toEqual({});
    expect(admin.streetAddress).toBe("");
    expect(editChanges(own(), values)).toBeNull();
  });

  it("LE-9 the places travel only when the list differs AND the seller worked in the Place box", () => {
    const values = valuesOf(own(), null);
    const reordered = { ...values, coverage: ["city-2", "city-1"] };
    // The place step settles its rows on its own: a list that changed with no work in the box is not sent.
    expect(editChanges(own(), reordered)).toBeNull();
    expect(editChanges(own(), reordered, false, { place: false })).toBeNull();
    expect(editChanges(own(), reordered, false, { place: true })).toEqual({
      coverage: ["city-2", "city-1"],
    });
    // The same list in the same order is never sent, worked in or not.
    expect(editChanges(own(), values, false, { place: true })).toBeNull();
    expect(
      editChanges(own(), { ...values, coverage: ["city-1", "city-2", "city-3"] }, false, {
        place: true,
      }),
    ).toEqual({ coverage: ["city-1", "city-2", "city-3"] });
  });

  it("LE-10 the channels travel only when they differ (value or show) AND the seller worked in the Contact box", () => {
    const values = valuesOf(own(), null);
    const hidden = { ...values, contactPref: { messages: true, phone: { ...phone, show: false } } };
    expect(editChanges(own(), hidden)).toBeNull();
    expect(editChanges(own(), hidden, false, { contact: true })).toEqual({
      contact_pref: { messages: true, phone: { ...phone, show: false } },
    });
    // The profile's carry rewrites the object in the same channels: not a change.
    const sameChannels = { ...values, contactPref: { phone, messages: true, carried: true } };
    expect(editChanges(own(), sameChannels, false, { contact: true })).toBeNull();
    const whatsapp = {
      ...values,
      contactPref: { ...values.contactPref, whatsapp: { value: "+251911000000", show: true } },
    };
    expect(editChanges(own(), whatsapp, false, { contact: true })).toEqual({
      contact_pref: whatsapp.contactPref,
    });
  });

  it("LE-11 a changed street or directions line travels trimmed; an emptied line is removed; untouched lines are not sent", () => {
    const values = valuesOf(own(), null);
    expect(editChanges(own(), { ...values, streetAddress: "  Bole, 2nd floor " })).toBeNull();
    expect(editChanges(own(), { ...values, directions: "Behind the bank" })).toEqual({
      directions: "Behind the bank",
    });
    expect(editChanges(own(), { ...values, streetAddress: " " })).toEqual({
      street_address: null,
    });
    expect(
      editChanges(own(), { ...values, streetAddress: "Kazanchis", directions: " Gate 3 " }),
    ).toEqual({ street_address: "Kazanchis", directions: "Gate 3" });
    // The lines ride with the other fields in one change set.
    expect(
      editChanges(own(), { ...values, title: "Samsung fridge 300L", directions: "Gate 3" }),
    ).toEqual({ title: "Samsung fridge 300L", directions: "Gate 3" });
  });
});
