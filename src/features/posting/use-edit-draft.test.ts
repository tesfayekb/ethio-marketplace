import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const readDraft = vi.hoisted(() => vi.fn());
const editMyListing = vi.hoisted(() => vi.fn());
const editAdminListing = vi.hoisted(() => vi.fn());
const readAdminListing = vi.hoisted(() => vi.fn());
const photosRead = vi.hoisted(() => vi.fn());

vi.mock("./posting-service", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./posting-service")>();
  return { ...actual, readDraft };
});
vi.mock("@/features/my-listings/my-listing", () => ({ editMyListing }));
vi.mock("@/features/admin-listings/use-admin-listing", () => ({
  editAdminListing,
  readAdminListing,
}));
vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: () => ({
      select: () => ({
        eq: () => ({
          order: () => photosRead(),
        }),
      }),
    }),
  },
}));

import type { GuardFn } from "@/features/auth/mfa/use-step-up";

const { useEditDraft } = await import("./use-edit-draft");
const { TOTAL_STEPS } = await import("./types");

/**
 * Bundle 17 turn 2 (D194) — the edit hook stands where `useDraft` stands: the ad
 * loads as it stands, nothing autosaves, a step's Next sends that step's changed
 * fields through the edit door and the baseline follows; the Category is locked.
 */
const ad = () => ({
  draft: {
    id: "l-1",
    categoryId: "leaf-1",
    draftStep: 8,
    status: "active",
    title: "Samsung fridge",
    description: "Working, one owner",
    videoUrl: null,
    attributes: { colour: { value: "red" } },
    priceMode: "fixed",
    priceAmount: 1500,
    priceCurrency: "ETB",
    pricePeriod: "once",
    priceBp: null,
    priceNegotiable: false,
    posterExpiresAt: null,
    contactPref: { messages: true },
    pinLat: 9.01,
    pinLng: 38.75,
    pinPrecision: "exact",
    pinZoom: 15,
    streetAddress: "Bole road",
    directions: null,
    photosSoon: false,
  },
  photos: [],
  coverage: ["p-1"],
});

describe("useEditDraft (the seller)", () => {
  beforeEach(() => {
    readDraft.mockReset();
    editMyListing.mockReset();
    photosRead.mockReset();
    readDraft.mockResolvedValue(ad());
  });

  it("EW-1 opens on the Review over the ad as it stands, the Category locked, nothing sent", async () => {
    const { result } = renderHook(() => useEditDraft("l-1", { actor: "seller" }));
    expect(result.current.mode).toBe("edit");
    expect(result.current.step).toBe(TOTAL_STEPS);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.values.title).toBe("Samsung fridge");
    expect(result.current.values.coverage).toEqual(["p-1"]);
    expect(result.current.pin).toEqual({
      lat: 9.01,
      lng: 38.75,
      precision: "exact",
      street: "Bole road",
      zoom: 15,
    });
    expect(result.current.status).toBe("active");
    expect(result.current.locked).toEqual([1]);
    act(() => result.current.goTo(1));
    expect(result.current.step).toBe(TOTAL_STEPS);
    act(() => result.current.goTo(5));
    expect(result.current.step).toBe(5);
    // A change updates the screen only (C3): no door call.
    act(() => result.current.change({ title: "New words" }, false));
    expect(result.current.values.title).toBe("New words");
    expect(editMyListing).not.toHaveBeenCalled();
  });

  it("EW-2 a step's Next sends that step's changed fields; the outcome says saved or sent for review; the baseline follows", async () => {
    const { result } = renderHook(() => useEditDraft("l-1", { actor: "seller" }));
    await waitFor(() => expect(result.current.loading).toBe(false));
    // Nothing changed on the step: nothing sent, Next goes through (C4).
    await act(async () => expect(await result.current.saveAt(5)).toBe(true));
    expect(editMyListing).not.toHaveBeenCalled();

    editMyListing.mockResolvedValueOnce({ ok: true, status: "screening", review: true });
    act(() => result.current.change({ title: "New words", priceAmount: 1400 }, false));
    await act(async () => expect(await result.current.saveAt(5)).toBe(true));
    expect(editMyListing).toHaveBeenLastCalledWith("l-1", { title: "New words" });
    expect(result.current.outcome).toEqual({ kind: "review", nonce: 1 });
    expect(result.current.status).toBe("screening");
    expect(result.current.saveState).toBe("saved");
    // The title is now the ad's: the same step again sends nothing.
    await act(async () => expect(await result.current.saveAt(5)).toBe(true));
    expect(editMyListing).toHaveBeenCalledTimes(1);

    editMyListing.mockResolvedValueOnce({ ok: true, status: "screening", review: false });
    await act(async () => expect(await result.current.saveAt(4)).toBe(true));
    expect(editMyListing).toHaveBeenLastCalledWith("l-1", {
      price_mode: "fixed",
      price_amount: 1400,
      price_currency: "ETB",
      price_period: "once",
      price_bp: null,
      price_negotiable: false,
    });
    expect(result.current.outcome).toEqual({ kind: "saved", nonce: 2 });
  });

  it("EW-3 a refusal lands under its field and clears when that field changes (INC-660); a door error is said in words", async () => {
    const { result } = renderHook(() => useEditDraft("l-1", { actor: "seller" }));
    await waitFor(() => expect(result.current.loading).toBe(false));
    editMyListing.mockResolvedValueOnce({
      ok: false,
      refusals: [{ field: "title", reason: "tooShort" }],
    });
    act(() => result.current.change({ title: "x" }, false));
    await act(async () => expect(await result.current.saveAt(5)).toBe(false));
    expect(result.current.refusals).toEqual([{ field: "title", reason: "tooShort" }]);
    expect(result.current.saveState).toBe("unsaved");
    // Another step's field leaves it; the field itself clears it.
    act(() => result.current.change({ priceAmount: 1 }, false));
    expect(result.current.refusals).toHaveLength(1);
    act(() => result.current.change({ title: "Long enough" }, false));
    expect(result.current.refusals).toEqual([]);

    editMyListing.mockResolvedValueOnce({ ok: false, key: "myListings.ad.waiting" });
    await act(async () => expect(await result.current.saveAt(5)).toBe(false));
    expect(result.current.problem).toBe("myListings.ad.waiting");
    // The place lines ride the place step's save, never the pin door (E2b, form mode).
    act(() => result.current.setPlaceText({ street: "Bole road", directions: "Behind the bank" }));
    editMyListing.mockResolvedValueOnce({ ok: true, status: "screening", review: true });
    await act(async () => expect(await result.current.saveAt(6)).toBe(true));
    expect(editMyListing).toHaveBeenLastCalledWith("l-1", { directions: "Behind the bank" });
  });

  it("EW-6 Back discards: a step's typed answers go back to the saved ad and its refusals clear (C15)", async () => {
    const { result } = renderHook(() => useEditDraft("l-1", { actor: "seller" }));
    await waitFor(() => expect(result.current.loading).toBe(false));
    editMyListing.mockResolvedValueOnce({
      ok: false,
      refusals: [{ field: "title", reason: "contactInText" }],
    });
    act(() => result.current.change({ title: "Call me on 0911 223 344", priceAmount: 1 }, false));
    await act(async () => expect(await result.current.saveAt(5)).toBe(false));
    expect(result.current.refusals).toHaveLength(1);
    act(() => result.current.setPlaceText({ street: "Typed", directions: "Typed too" }));
    act(() => result.current.discard(5));
    expect(result.current.values.title).toBe("Samsung fridge");
    expect(result.current.refusals).toEqual([]);
    expect(result.current.saveState).toBe("idle");
    // Only the discarded step goes back: the price typed on step 4 and the place lines stay.
    expect(result.current.values.priceAmount).toBe(1);
    expect(result.current.placeText).toEqual({ streetAddress: "Typed", directions: "Typed too" });
    act(() => result.current.discard(6));
    expect(result.current.placeText).toEqual({ streetAddress: "Bole road", directions: null });
    // The same step sent again finds nothing to send.
    await act(async () => expect(await result.current.saveAt(5)).toBe(true));
    expect(editMyListing).toHaveBeenCalledTimes(1);
  });

  it("EW-4 an ad that is not the caller's is a refusal to load, never an empty form", async () => {
    readDraft.mockResolvedValueOnce(null);
    const { result } = renderHook(() => useEditDraft("l-2", { actor: "seller" }));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.loadError).toBe("notFound");
  });
});

describe("useEditDraft (staff)", () => {
  beforeEach(() => {
    readAdminListing.mockReset();
    editAdminListing.mockReset();
    photosRead.mockReset();
    photosRead.mockResolvedValue({ data: [], error: null });
    readAdminListing.mockResolvedValue({
      listing: {
        id: "l-1",
        title: "Samsung fridge",
        description: "Working, one owner",
        status: "screening",
        categoryId: "leaf-1",
        locationId: "p-1",
        priceMode: "fixed",
        priceAmount: 1500,
        priceCurrency: "ETB",
        pricePeriod: "once",
        priceBp: null,
        priceNegotiable: false,
        attributes: { colour: { value: "red" } },
        photosSoon: false,
        posterExpiresAt: null,
      },
      channels: { phone: true, phone2: false, telegram: false, whatsapp: true },
      history: [],
      historyTotal: 0,
    });
  });

  it("EW-5 loads through the console's door, locks photos, place and contact, and sends every save with the reason under the guard", async () => {
    const guardCalls = { count: 0 };
    const guard: GuardFn = async (action) => {
      guardCalls.count += 1;
      return action();
    };
    const { result } = renderHook(() => useEditDraft("l-1", { actor: "admin", guard }));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.locked).toEqual([1, 2, 6, 7]);
    expect(result.current.values.coverage).toEqual(["p-1"]);
    expect(result.current.values.contactPref).toEqual({
      messages: true,
      phone: { show: true },
      phone2: { show: false },
      telegram: { show: false },
      whatsapp: { show: true },
    });
    act(() => result.current.goTo(6));
    expect(result.current.step).toBe(TOTAL_STEPS);

    act(() => result.current.setReason({ reason: "misleading", note: "e2e" }));
    editAdminListing.mockResolvedValueOnce({ ok: true, status: "screening", fields: ["title"] });
    act(() => result.current.change({ title: "Corrected" }, false));
    await act(async () => expect(await result.current.saveAt(5)).toBe(true));
    expect(guardCalls.count).toBe(1);
    expect(editAdminListing).toHaveBeenLastCalledWith(
      "l-1",
      { title: "Corrected" },
      "misleading",
      "e2e",
    );
    expect(result.current.outcome).toEqual({ kind: "saved", nonce: 1 });

    // The door's own refusal, in the console's words; a cancelled second factor says nothing.
    editAdminListing.mockRejectedValueOnce(new Error("nothing changed"));
    act(() => result.current.change({ description: "Other words" }, false));
    await act(async () => expect(await result.current.saveAt(5)).toBe(false));
    expect(result.current.problem).toBe("admin.listings.edit.nothing");
  });
});
