import { act, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { StepPricing, type PricingValues } from "./step-pricing";
import type { CategoryFacts } from "./types";

vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en", entities: {} }),
}));
vi.mock("./pricing-data", async (original) => ({
  ...(await original<typeof import("./pricing-data")>()),
  useCurrencies: () => ({ currencies: [], isLoading: false, failed: false }),
  useSellerHome: () => ({ home: null }),
  useMarketCurrencies: () => ({ markets: [] }),
  readGuessCurrency: async () => "",
  readSellerHome: async () => ({ countryCode: null, currencyCode: null }),
  readLastListingCurrency: async () => null,
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
