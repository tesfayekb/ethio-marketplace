import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { GuardFn } from "@/features/auth/mfa/use-step-up";

import {
  NEW_MARKET_FORM,
  NEW_OVERRIDE_FORM,
  NEW_PRODUCT_FORM,
  marketFormInput,
  overrideFormInput,
  productFormInput,
} from "./monetisation-forms";
import { MONETISATION_REFUSALS, ownRefusals, refusalFor } from "./monetisation-refusals";
import { NEW_PRICE_FORM, priceFormInput } from "./price-forms";

/**
 * L8 (DEC-339, wave 3) — the monetisation console on the one Field, gate and
 * parser. KMO-1…4: every whole number read through `parseNumber` with each
 * check's own bounds and words; KMO-5: the family and the field helpers;
 * KMO-6…8: a dialog's blank required answer through the gate, a single field's
 * bad answer under its Field, a rule across fields kept in its error line.
 */
const calls = vi.hoisted(() => ({ savePrice: vi.fn(), saveMarket: vi.fn() }));
vi.mock("@/i18n", () => ({ useI18n: () => ({ t: (key: string) => key, language: "en" }) }));
vi.mock("@/components/ui/category-modal", () => ({
  CategoryModal: ({ children, testid }: { children: ReactNode; testid: string }) => (
    <div data-testid={testid}>{children}</div>
  ),
}));
vi.mock("@/features/posting/pricing-data", () => ({
  useCurrencies: () => ({ currencies: [{ code: "ETB" }] }),
  orderCurrencies: (list: Array<{ code: string }>) => list,
  currencyText: (entry: { code: string }) => entry.code,
}));
vi.mock("./use-monetisation", () => ({
  useSavePrice: () => ({ mutateAsync: calls.savePrice, isPending: false }),
  useEditPrice: () => ({ mutateAsync: vi.fn(), isPending: false }),
  useSaveMarket: () => ({ mutateAsync: calls.saveMarket, isPending: false }),
}));
vi.mock("./use-monetisation-names", () => ({
  useMonetisationNames: () => ({
    marketName: (code: string | null) => code ?? "every",
    categoryName: (id: string | null) => id ?? "every",
    productName: (key: string) => key,
    markets: [],
    tree: { nodes: [], parentOf: new Map(), childrenOf: new Map(), byId: new Map() },
  }),
}));

const { PriceDialog } = await import("./price-dialog");
const { MarketDialog } = await import("./market-dialog");
const guard: GuardFn = async (run) => run();
const TODAY = "2026-11-17";

const product = { key: "featured", enabled: true, kind: "level" } as never;
const reach = { key: "city", enabled: true, kind: "reach" } as never;

beforeEach(() => {
  calls.savePrice.mockReset().mockResolvedValue(undefined);
  calls.saveMarket.mockReset().mockResolvedValue(undefined);
});

describe("KMO-1 the price's credit cost reads through the parser; the amount keeps its own pattern", () => {
  const base = { ...NEW_PRICE_FORM, packageKey: "featured", currency: "ETB" };
  it.each(["", " ", "-1", "1.5", "1e2", "abc"])("credit cost %j is badCreditCost", (creditCost) => {
    expect(priceFormInput({ ...base, creditCost }, TODAY)).toEqual({
      ok: false,
      key: "admin.monetisation.error.badCreditCost",
    });
  });
  it("0 and ' 4 ' are credit costs", () => {
    const judged = priceFormInput({ ...base, creditCost: " 4 " }, TODAY);
    expect(judged.ok && judged.input.creditCost).toBe(4);
    const free = priceFormInput({ ...base, creditCost: "0" }, TODAY);
    expect(free.ok && free.input.creditCost).toBe(0);
  });
  it.each(["1.234", "-1", ".5", ""])("amount %j stays badAmount (AMOUNT_PATTERN)", (amount) => {
    expect(priceFormInput({ ...base, amount }, TODAY)).toEqual({
      ok: false,
      key: "admin.packages.error.badAmount",
    });
  });
});

describe("KMO-2 a product's days, photos, caps and order keep their bounds and words", () => {
  const level = {
    ...NEW_PRODUCT_FORM,
    key: "featured",
    nameEn: "Featured",
    days: "30",
    maxPhotos: "10",
  };
  it.each(["", "0", "1.5", "x"])("days %j is badDays", (days) => {
    expect(productFormInput("level", { ...level, days })).toEqual({
      ok: false,
      key: "admin.packages.error.badDays",
    });
  });
  it.each(["", "-1", "31", "2.0"])("photos %j is badPhotos", (maxPhotos) => {
    expect(productFormInput("level", { ...level, maxPhotos })).toEqual({
      ok: false,
      key: "admin.monetisation.error.badPhotos",
    });
  });
  it("photos 0 and 30 pass; a blank order stays absent", () => {
    for (const maxPhotos of ["0", "30"]) {
      const judged = productFormInput("level", { ...level, maxPhotos });
      expect(judged.ok && judged.input.maxPhotos).toBe(Number(maxPhotos));
      expect(judged.ok && judged.input.sort).toBeNull();
    }
    const sorted = productFormInput("level", { ...level, sort: "77" });
    expect(sorted.ok && sorted.input.sort).toBe(77);
  });
  it("a blank cap is no limit; 0 or a fraction is badCaps", () => {
    const reachForm = { ...level, maxPhotos: "" };
    const open = productFormInput("reach", reachForm);
    expect(open.ok && open.input.caps).toEqual({
      maxCities: null,
      maxRegions: null,
      maxCountries: null,
    });
    for (const maxCities of ["0", "1.5"]) {
      expect(productFormInput("reach", { ...reachForm, maxCities })).toEqual({
        ok: false,
        key: "admin.monetisation.error.badCaps",
      });
    }
  });
});

describe("KMO-3 an override's cells: blank is the level's own value, a bad one its own words", () => {
  const base = { ...NEW_OVERRIDE_FORM, levelKey: "featured" };
  it("every cell blank is emptyOverride", () => {
    expect(overrideFormInput(base)).toEqual({
      ok: false,
      key: "admin.monetisation.error.emptyOverride",
    });
  });
  it("days 0 is badDays; photos 31 is badPhotos; days 45 passes", () => {
    expect(overrideFormInput({ ...base, days: "0" })).toMatchObject({
      key: "admin.packages.error.badDays",
    });
    expect(overrideFormInput({ ...base, maxPhotos: "31" })).toMatchObject({
      key: "admin.monetisation.error.badPhotos",
    });
    const judged = overrideFormInput({ ...base, days: "45" });
    expect(judged.ok && judged.input.days).toBe(45);
  });
});

describe("KMO-4 a market's free ads and launch bundle", () => {
  const base = { ...NEW_MARKET_FORM, includedReach: "city", freeRegularAds: "2" };
  it.each(["", "-1", "1.5"])("free ads %j is badFreeAds", (freeRegularAds) => {
    expect(marketFormInput({ ...base, freeRegularAds })).toMatchObject({
      key: "admin.monetisation.error.badFreeAds",
    });
  });
  it("launch 0 is badLaunch; blank launch with paid levels is launchRequired", () => {
    expect(marketFormInput({ ...base, launchDays: "0" })).toMatchObject({
      key: "admin.monetisation.error.badLaunch",
    });
    expect(marketFormInput({ ...base, paidLevels: true })).toMatchObject({
      key: "admin.monetisation.error.launchRequired",
    });
  });
});

describe("KMO-5 the family and the field helpers", () => {
  it("reads required and a judge's own key as their words", () => {
    expect(MONETISATION_REFUSALS.words?.required).toBe("post.refusal.required");
    expect(MONETISATION_REFUSALS.words?.["admin.packages.error.badAmount"]).toBe(
      "admin.packages.error.badAmount",
    );
    expect(
      MONETISATION_REFUSALS.words?.["admin.monetisation.error.launchRequired"],
    ).toBeUndefined();
  });
  it("places a key on its fields, or leaves it to the line", () => {
    const fields = { "admin.packages.error.badAmount": ["amount"] } as const;
    expect(ownRefusals("admin.packages.error.badAmount", fields)).toEqual([
      { field: "amount", reason: "admin.packages.error.badAmount" },
    ]);
    expect(ownRefusals("admin.monetisation.error.emptyOverride", fields)).toBeNull();
    expect(refusalFor("amount", [{ field: "amount", reason: "required" }], [])).toEqual({
      field: "amount",
      reason: "required",
    });
  });
});

describe("KMO-6…8 the dialogs", () => {
  it("KMO-6 a blank amount is held by the gate under its Field; nothing is saved", async () => {
    render(
      <PriceDialog
        row={null}
        products={[product]}
        fixedProduct="featured"
        guard={guard}
        openedBy="x"
        onClose={vi.fn()}
      />,
    );
    const amount = screen.getByTestId("monetisation-price-create-amount");
    fireEvent.change(amount, { target: { value: "" } });
    fireEvent.click(screen.getByTestId("monetisation-price-create-save"));
    await waitFor(() => expect(amount.getAttribute("aria-invalid")).toBe("true"));
    expect(screen.getByText("post.refusal.required")).toBeTruthy();
    expect(screen.queryByTestId("monetisation-price-create-error")).toBeNull();
    expect(calls.savePrice).not.toHaveBeenCalled();
  });
  it("KMO-7 a bad amount's own words move under its Field, linked by aria-describedby", async () => {
    render(
      <PriceDialog
        row={null}
        products={[product]}
        fixedProduct="featured"
        guard={guard}
        openedBy="x"
        onClose={vi.fn()}
      />,
    );
    const amount = screen.getByTestId("monetisation-price-create-amount");
    fireEvent.change(amount, { target: { value: "1.234" } });
    fireEvent.click(screen.getByTestId("monetisation-price-create-save"));
    await waitFor(() => expect(amount.getAttribute("aria-invalid")).toBe("true"));
    const line = screen.getByText("admin.packages.error.badAmount");
    expect(amount.getAttribute("aria-describedby")).toContain(line.id);
    expect(screen.queryByTestId("monetisation-price-create-error")).toBeNull();
    expect(calls.savePrice).not.toHaveBeenCalled();
    fireEvent.change(amount, { target: { value: "12.50" } });
    fireEvent.click(screen.getByTestId("monetisation-price-create-save"));
    await waitFor(() => expect(calls.savePrice).toHaveBeenCalledTimes(1));
    expect(calls.savePrice.mock.calls[0]?.[0]).toMatchObject({ amount: 12.5, creditCost: 0 });
  });
  it("KMO-8 launchRequired (across fields) stays in the market's error line", async () => {
    render(
      <MarketDialog
        row={null}
        products={[reach]}
        taken={[]}
        guard={guard}
        openedBy="x"
        onClose={vi.fn()}
      />,
    );
    fireEvent.change(screen.getByTestId("monetisation-market-create-free-ads"), {
      target: { value: "2" },
    });
    fireEvent.click(screen.getByTestId("monetisation-market-create-paid-levels"));
    fireEvent.click(screen.getByTestId("monetisation-market-create-save"));
    await waitFor(() =>
      expect(screen.getByTestId("monetisation-market-create-error").textContent).toBe(
        "admin.monetisation.error.launchRequired",
      ),
    );
    expect(calls.saveMarket).not.toHaveBeenCalled();
  });
});
