import { beforeEach, describe, expect, it, vi } from "vitest";

const rpc = vi.hoisted(() => vi.fn());
vi.mock("@/integrations/supabase/client", () => ({ supabase: { rpc } }));

const { copyable, copyMyListing, EDITABLE_STATUSES, editMyListing, readSoldVisibleDays } =
  await import("./my-listing");
const { en } = await import("@/i18n/locales/en");

/**
 * Bundle 16 turn R2 (D172, D177, D182 4) — which ads the seller edits in boxes and
 * copies, and how the two doors' answers read.
 */
const STATUSES = [
  "draft",
  "screening",
  "held",
  "active",
  "reduced",
  "closed",
  "expired",
  "sold",
  "rejected",
  "removed",
];

describe("the seller's edit and copy (turn R2)", () => {
  beforeEach(() => rpc.mockReset());

  it("ML-U17 Edit on a live, closed or refused ad; Post a similar ad on any but a draft, a removed or a refused one", () => {
    expect(STATUSES.filter((status) => EDITABLE_STATUSES.has(status))).toEqual([
      "active",
      "reduced",
      "closed",
      "rejected",
    ]);
    expect(STATUSES.filter((status) => copyable(status))).toEqual([
      "screening",
      "held",
      "active",
      "reduced",
      "closed",
      "expired",
      "sold",
    ]);
  });

  it("ML-U18 the edit door's answers: saved (at once or to review), refusals under their fields, errors in words", async () => {
    rpc.mockResolvedValueOnce({ data: { ok: true, status: "active", review: false }, error: null });
    expect(await editMyListing("l-1", { price_amount: 900 })).toEqual({
      ok: true,
      status: "active",
      review: false,
    });
    expect(rpc).toHaveBeenLastCalledWith("edit_my_listing", {
      p_listing_id: "l-1",
      p_changes: { price_amount: 900 },
    });

    rpc.mockResolvedValueOnce({
      data: { ok: true, status: "screening", review: true },
      error: null,
    });
    expect(await editMyListing("l-1", { title: "New words" })).toEqual({
      ok: true,
      status: "screening",
      review: true,
    });

    rpc.mockResolvedValueOnce({
      data: {
        ok: false,
        refusals: [
          { field: "title", reason: "tooShort" },
          // INC-665 — a specification's refusal names its attr_key and may carry a detail.
          { attr_key: "colour", reason: "outOfBounds", detail: "max 3" },
          { bad: 1 },
        ],
      },
      error: null,
    });
    expect(await editMyListing("l-1", { title: "x" })).toEqual({
      ok: false,
      refusals: [
        { field: "title", reason: "tooShort" },
        { field: "colour", reason: "outOfBounds", detail: "max 3" },
      ],
    });

    const errors: [string, string][] = [
      ["nothing changed", "myListings.editBox.nothing"],
      ["an ad in review is edited once its review is done", "myListings.ad.waiting"],
      ["rateLimited", "myListings.error.rateLimited"],
      ["something else", "myListings.error.failed"],
    ];
    for (const [message, key] of errors) {
      rpc.mockResolvedValueOnce({ data: null, error: { message } });
      expect(await editMyListing("l-1", { title: "y" })).toEqual({ ok: false, key });
    }
    // An answer out of shape is a failure, never a success (F4).
    rpc.mockResolvedValueOnce({ data: { ok: true }, error: null });
    expect(await editMyListing("l-1", { title: "y" })).toEqual({
      ok: false,
      key: "myListings.error.failed",
    });
  });

  it("ML-U19 the copy door's answers: the new draft, or the refusal in words", async () => {
    rpc.mockResolvedValueOnce({ data: { ok: true, listing_id: "d-9" }, error: null });
    expect(await copyMyListing("l-1")).toEqual({ ok: true, listingId: "d-9" });
    expect(rpc).toHaveBeenLastCalledWith("copy_my_listing", { p_listing_id: "l-1" });

    const errors: [string, string][] = [
      ["residencyUnknown", "post.refusal.residencyUnknown"],
      ["rateLimited", "myListings.error.rateLimited"],
      ["a removed or refused listing is not copied", "myListings.error.failed"],
    ];
    for (const [message, key] of errors) {
      rpc.mockResolvedValueOnce({ data: null, error: { message } });
      expect(await copyMyListing("l-1")).toEqual({ ok: false, key });
    }
    rpc.mockResolvedValueOnce({ data: { ok: true }, error: null });
    expect(await copyMyListing("l-1")).toEqual({ ok: false, key: "myListings.error.failed" });
  });

  it("ML-U20 every word the edit and the copy say exists", () => {
    const keys = [
      "myListings.edit",
      "myListings.editBox.title",
      "myListings.editBox.save",
      "myListings.editBox.hint",
      "myListings.editBox.photosHint",
      "myListings.editBox.done",
      "myListings.editBox.doneReview",
      "myListings.editBox.nothing",
      "myListings.action.copy",
      "post.refusal.residencyUnknown",
    ] as const;
    for (const key of keys) expect(en[key], key).toBeTruthy();
  });
});

describe("the seller doors' certification (bundle 22 turn 4)", () => {
  beforeEach(() => rpc.mockReset());

  it("edit_my_listing gets p_certified and p_language only when given", async () => {
    rpc.mockResolvedValue({ data: { ok: true, status: "active", review: false }, error: null });
    await editMyListing("l-1", { price_amount: 900 });
    expect(rpc).toHaveBeenLastCalledWith("edit_my_listing", {
      p_listing_id: "l-1",
      p_changes: { price_amount: 900 },
    });
    await editMyListing("l-1", { price_amount: 900 }, { certified: ["v-1"], language: "am" });
    expect(rpc).toHaveBeenLastCalledWith("edit_my_listing", {
      p_listing_id: "l-1",
      p_changes: { price_amount: 900 },
      p_certified: ["v-1"],
      p_language: "am",
    });
  });
  it("an edit's legal refusal keeps the door's word", async () => {
    rpc.mockResolvedValueOnce({ data: null, error: { message: "certificationRequired" } });
    expect(await editMyListing("l-1", { title: "x" })).toMatchObject({
      ok: false,
      reason: "certificationRequired",
    });
    rpc.mockResolvedValueOnce({ data: null, error: { message: "rateLimited" } });
    const other = await editMyListing("l-1", { title: "x" });
    expect(other).toEqual({ ok: false, key: "myListings.error.rateLimited" });
  });
  it("renew_listing gets p_certified and p_language only when given", async () => {
    const { runAction } = await import("./my-listing");
    const ad = { listing: { id: "l-2" } } as unknown as Parameters<typeof runAction>[0];
    rpc.mockResolvedValue({ data: { ok: true }, error: null });
    await runAction(ad, "renew");
    expect(rpc).toHaveBeenLastCalledWith("renew_listing", { p_listing_id: "l-2" });
    await runAction(ad, "renew", { certified: ["v-1", "v-2"], language: "en" });
    expect(rpc).toHaveBeenLastCalledWith("renew_listing", {
      p_listing_id: "l-2",
      p_certified: ["v-1", "v-2"],
      p_language: "en",
    });
    rpc.mockResolvedValueOnce({ data: null, error: { message: "acceptanceRequired" } });
    expect(await runAction(ad, "renew")).toMatchObject({ ok: false, reason: "acceptanceRequired" });
  });
});

describe("the sold-visible-days public read", () => {
  beforeEach(() => rpc.mockReset());
  it("answers the number returned by the setting", async () => {
    rpc.mockResolvedValueOnce({ data: 40, error: null });
    expect(await readSoldVisibleDays()).toBe(40);
    expect(rpc).toHaveBeenCalledWith("sold_visible_days");
  });
  it("answers null for an RPC error", async () => {
    const logged = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      rpc.mockResolvedValueOnce({ data: null, error: { message: "unavailable" } });
      expect(await readSoldVisibleDays()).toBeNull();
    } finally {
      logged.mockRestore();
    }
  });
  it.each([0, 1.5])("answers null for the invalid number %s", async (data) => {
    const logged = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      rpc.mockResolvedValueOnce({ data, error: null });
      expect(await readSoldVisibleDays()).toBeNull();
    } finally {
      logged.mockRestore();
    }
  });
});
