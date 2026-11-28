import { useLayoutEffect, type ReactNode } from "react";
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

/**
 * INC-1353 — the step reports its missing answers inside the commit that draws it: a parent's
 * layout effect (which runs after its children's layout effects and before any passive effect)
 * already sees the report, so a submit in that same tick meets a closed gate.
 */
function Probe({ onCommit, children }: { onCommit: () => void; children: ReactNode }) {
  useLayoutEffect(() => {
    onCommit();
  });
  return <>{children}</>;
}

it("UFR-2 the price step's missing amount is heard by the gate in the commit that draws it", () => {
  const onMissing = vi.fn();
  let atCommit: unknown[][] = [];
  render(
    <Probe onCommit={() => (atCommit = onMissing.mock.calls.slice())}>
      <StepPricing
        facts={FACTS}
        values={VALUES}
        refusals={[]}
        onChange={() => {}}
        onMissing={onMissing}
      />
    </Probe>,
  );
  expect(atCommit.length).toBeGreaterThan(0);
  expect(atCommit[0]?.[0]).not.toEqual([]);
});
