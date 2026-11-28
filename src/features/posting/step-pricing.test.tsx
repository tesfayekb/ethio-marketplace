import { en } from "@/i18n/locales/en";
import { am } from "@/i18n/locales/am";
import { ownValue } from "@/lib/own-key";
import { act, cleanup, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ReaderError } from "@/lib/reader-failure";
import { StepPricing, type PricingValues } from "./step-pricing";
import type { CategoryFacts } from "./types";

/** INC-1257 — the hints the price step's currency chain reads, and the failure of the first. */
const hints = vi.hoisted(() => ({
  last: null as string | null,
  lastFailure: null as Error | null,
  home: null as string | null,
  currencies: {
    currencies: [],
    isLoading: false,
    failed: false,
    failure: null,
    retry: () => {},
  } as {
    currencies: never[];
    isLoading: boolean;
    failed: boolean;
    failure: unknown;
    retry: () => void;
  },
}));

const words = vi.hoisted(() => ({ real: false, amharic: false }));
vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => (words.real ? (ownValue(words.amharic ? am : en, key) ?? key) : key),
    language: words.amharic ? "am" : "en",
    entities: {},
  }),
}));
vi.mock("./pricing-data", async (original) => ({
  ...(await original<typeof import("./pricing-data")>()),
  useCurrencies: () => hints.currencies,
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

  it("SPR-3 (DEC-464) the currency read's Retry calls useCurrencies' retry, not a reload", async () => {
    const retry = vi.fn();
    hints.currencies = {
      currencies: [],
      isLoading: false,
      failed: true,
      failure: new TypeError("Failed to fetch"),
      retry,
    };
    try {
      await act(async () => {
        render(<StepPricing facts={FACTS} values={VALUES} refusals={[]} onChange={() => {}} />);
      });
      const box = screen.getByTestId("post-price-currency-error");
      expect(box).toHaveAttribute("data-failure-reason", "network");
      act(() => screen.getByTestId("post-price-currency-error-retry").click());
      expect(retry).toHaveBeenCalledTimes(1);
    } finally {
      hints.currencies = {
        currencies: [],
        isLoading: false,
        failed: false,
        failure: null,
        retry: () => {},
      };
    }
  });
});

it("UFW-18 a category without pricing says so uf:S7s4.2", async () => {
  words.real = true;
  await act(async () => {
    render(
      <StepPricing
        facts={{ ...FACTS, priceEnabled: false }}
        values={VALUES}
        refusals={[]}
        onChange={vi.fn()}
      />,
    );
  });
  expect(screen.getByTestId("post-price-notallowed")).toHaveTextContent(
    en["post.price.notAllowed"],
  );
  words.real = false;
});
it("UFW-19 a price mode refusal has its own words uf:S7s4.3", async () => {
  words.real = true;
  await act(async () => {
    render(
      <StepPricing
        facts={FACTS}
        values={VALUES}
        refusals={[{ field: "price_mode", reason: "modeFollowsBasis" }]}
        onChange={vi.fn()}
      />,
    );
  });
  expect(screen.getByTestId("post-price-mode-refusal")).toHaveTextContent(
    en["post.refusal.modeFollowsBasis"],
  );
  words.real = false;
});
it("UFW-20 a failed currency list says so and Retry reads it again uf:S7s4.5", async () => {
  words.real = true;
  const retry = vi.fn();
  hints.currencies = {
    currencies: [],
    isLoading: false,
    failed: true,
    failure: new TypeError("Failed to fetch"),
    retry,
  };
  await act(async () => {
    render(<StepPricing facts={FACTS} values={VALUES} refusals={[]} onChange={vi.fn()} />);
  });
  expect(screen.getByTestId("post-price-currency-error")).toHaveTextContent(
    en["post.price.currencyFailed"],
  );
  (await screen.findByRole("button", { name: en["common.retry"] })).click();
  expect(retry).toHaveBeenCalledTimes(1);
  hints.currencies = {
    currencies: [],
    isLoading: false,
    failed: false,
    failure: null,
    retry: () => {},
  };
  words.real = false;
});
it("UFW-21 price refusals reach their rendered fields uf:S7s4.10", async () => {
  words.real = true;
  for (const [field, reason, key, mode] of [
    ["price_period", "periodLocked", "post.refusal.periodLocked", "fixed"],
    ["price_currency", "unknownCurrency", "post.refusal.unknownCurrency", "fixed"],
    ["price_bp", "commissionRange", "post.refusal.commissionRange", "commission"],
  ] as const) {
    await act(async () => {
      render(
        <StepPricing
          facts={FACTS}
          values={{ ...VALUES, priceMode: mode }}
          refusals={[{ field, reason }]}
          onChange={vi.fn()}
        />,
      );
    });
    expect(screen.getByText(en[key])).toBeVisible();
    cleanup();
  }
  words.real = false;
});
it("UFW-22 the pricing screen uses Amharic catalogue labels uf:S7s4.11", async () => {
  words.real = true;
  words.amharic = true;
  await act(async () => {
    render(<StepPricing facts={FACTS} values={VALUES} refusals={[]} onChange={vi.fn()} />);
  });
  expect(screen.getByText(am["post.price.modeLabel"])).toBeVisible();
  expect(
    screen.getByRole("combobox", {
      name: (label) => label.startsWith(am["post.price.currencyLabel"]),
    }),
  ).toBeVisible();
  if (am["post.price.modeLabel"] !== en["post.price.modeLabel"])
    expect(screen.queryByText(en["post.price.modeLabel"])).not.toBeInTheDocument();
  words.real = false;
  words.amharic = false;
});
