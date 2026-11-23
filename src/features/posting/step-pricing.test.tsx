import { act, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ReaderError } from "@/lib/reader-failure";
import { StepPricing, type PricingValues } from "./step-pricing";
import type { CategoryFacts } from "./types";

/** INC-1257 — the hints the price step's currency chain reads, and the failure of the first. */
const hints = vi.hoisted(() => ({
  last: null as string | null,
  lastFailure: null as Error | null,
  home: null as string | null,
}));

vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en", entities: {} }),
}));
vi.mock("./pricing-data", async (original) => ({
  ...(await original<typeof import("./pricing-data")>()),
  useCurrencies: () => ({ currencies: [], isLoading: false, failed: false }),
  useSellerHome: () => ({ home: null }),
  useMarketCurrencies: () => ({ markets: [] }),
  readGuessCurrency: async () => "",
  readSellerHome: async () => ({ countryCode: null, currencyCode: hints.home }),
  readLastListingCurrency: async () => {
    if (hints.lastFailure !== null) throw hints.lastFailure;
    return hints.last;
  },
}));

const FACTS: CategoryFacts = {
  id: "c-1",
  slug: "e2e-c-1",
  nameEn: "c-1",
  priceEnabled: true,
  defaultPricePeriod: "once",
  pricePeriodLocked: false,
  expiryDays: null,
  capabilities: [],
  deal: { basis: [], size: [], quantity: [], terms: [] },
};

const VALUES: PricingValues = {
  priceMode: "fixed",
  priceAmount: null,
  priceCurrency: null,
  pricePeriod: "once",
  priceBp: null,
  priceNegotiable: false,
  posterExpiresAt: "",
};

/**
 * Turn S6-2 — the price step's two selects on NativeSelect keep the form kit's look, and a
 * refused period still reaches its select (the red border, Field's message).
 */
describe("StepPricing — the refusal still reaches its selects (turn S6-2)", () => {
  it("SPR-1 a refused period wears the form kit's red border with Field's message; the scale keeps its own form look", async () => {
    await act(async () => {
      render(
        <StepPricing
          facts={FACTS}
          values={VALUES}
          refusals={[{ field: "price_period", reason: "required" }]}
          onChange={() => {}}
        />,
      );
    });
    const period = screen.getByTestId("post-price-period");
    expect(period.tagName).toBe("SELECT");
    for (const cls of [
      "min-h-11",
      "w-full",
      "bg-background",
      "border-destructive",
      "ring-destructive",
    ])
      expect(period).toHaveClass(cls);
    for (const cls of ["shadow-xs", "bg-card", "md:pointer-fine:h-9", "disabled:opacity-50"])
      expect(period).not.toHaveClass(cls);
    const message = document.querySelector(
      '[data-testid="post-field-refusal"][data-field="post-price-period"]',
    );
    expect(message).toHaveTextContent("post.refusal.required");

    const scale = screen.getByTestId("post-price-scale");
    expect(scale.tagName).toBe("SELECT");
    for (const cls of ["min-h-11", "shrink-0", "px-2", "bg-background", "border-input"])
      expect(scale).toHaveClass(cls);
    for (const cls of ["shadow-xs", "bg-card", "md:pointer-fine:h-9"])
      expect(scale).not.toHaveClass(cls);
  });
});

/**
 * INC-1257 — a failed hint is no hint. The seller's last currency is a prefill: when its read
 * fails the chain goes on to the next source, one line says why, and nothing blocks the step.
 */
describe("StepPricing — a failed last-currency read is no hint (INC-1257)", () => {
  it("SPR-2 the failed read writes one line and the currency comes from the next source", async () => {
    const logged = vi.spyOn(console, "error").mockImplementation(() => undefined);
    hints.last = "USD";
    hints.lastFailure = new ReaderError({ class: "server", status: 503, message: "Unavailable" });
    hints.home = "ETB";
    const onChange = vi.fn();
    try {
      await act(async () => {
        render(<StepPricing facts={FACTS} values={VALUES} refusals={[]} onChange={onChange} />);
      });
      await vi.waitFor(() =>
        expect(onChange).toHaveBeenCalledWith({ priceCurrency: "ETB" }, false),
      );
      expect(onChange).not.toHaveBeenCalledWith({ priceCurrency: "USD" }, false);
      expect(
        logged.mock.calls.filter(([line]) => String(line).startsWith("[client-error]")),
      ).toEqual([["[client-error] last listing currency", "server"]]);
    } finally {
      logged.mockRestore();
      hints.last = null;
      hints.lastFailure = null;
      hints.home = null;
    }
  });
});
