import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * INC-330 — THE PRE-FILL READS ARE THE SELLER'S OWN. RLS shows every ACTIVE
 * listing to any seller (`listings_public_read`), so the "last listing" read must
 * filter by `seller_id` itself; the home read must filter `profiles.user_id`.
 * The mock records every `.eq()` the chain applies.
 */
const calls: Array<{ table: string; eq: Array<[string, unknown]> }> = [];
let sessionUser: string | null = "seller-1";
let sessionFailed = false;

function chain(table: string, row: unknown) {
  const record = { table, eq: [] as Array<[string, unknown]> };
  calls.push(record);
  const builder: Record<string, unknown> = {};
  for (const name of ["select", "not", "order", "limit"]) builder[name] = () => builder;
  builder["eq"] = (column: string, value: unknown) => {
    record.eq.push([column, value]);
    return builder;
  };
  builder["maybeSingle"] = () => Promise.resolve({ data: row, error: null });
  return builder;
}

// Turn 34c-5 (INC-933) — the seller's id comes from the door's session read.
vi.mock("@/lib/supabase-door", () => ({
  currentSession: () =>
    Promise.resolve(
      sessionFailed
        ? { session: null, failed: true, error: new Error("Failed to fetch") }
        : { session: sessionUser === null ? null : { user: { id: sessionUser } }, failed: false },
    ),
}));

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: (table: string) =>
      chain(
        table,
        table === "listings"
          ? { price_currency: "usd", created_at: "2026-09-29T00:00:00Z" }
          : table === "profiles"
            ? { home_country_code: "ET" }
            : { currency_code: "ETB" },
      ),
  },
}));

const { readLastListingCurrency, readSellerHome } = await import("./pricing-data");

describe("INC-330 — the currency pre-fill reads only the signed-in seller's rows", () => {
  beforeEach(() => {
    calls.length = 0;
    sessionUser = "seller-1";
    sessionFailed = false;
  });

  it("filters the last listing by seller_id", async () => {
    expect(await readLastListingCurrency()).toBe("USD");
    expect(calls[0]).toEqual({ table: "listings", eq: [["seller_id", "seller-1"]] });
  });

  it("filters the home profile by user_id", async () => {
    expect(await readSellerHome()).toEqual({ countryCode: "ET", currencyCode: "ETB" });
    expect(calls[0]).toEqual({ table: "profiles", eq: [["user_id", "seller-1"]] });
  });

  it("reads nothing without a session", async () => {
    sessionUser = null;
    expect(await readLastListingCurrency()).toBe(null);
    expect(await readSellerHome()).toEqual({ countryCode: null, currencyCode: null });
    expect(calls).toHaveLength(0);
  });

  it("reads nothing when the session read failed: no prefill, never another seller's row (INC-933)", async () => {
    sessionFailed = true;
    expect(await readLastListingCurrency()).toBe(null);
    expect(await readSellerHome()).toEqual({ countryCode: null, currencyCode: null });
    expect(calls).toHaveLength(0);
  });
});
