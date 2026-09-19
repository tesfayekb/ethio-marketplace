import { useEffect, useState } from "react";

import { supabase } from "@/integrations/supabase/client";

/**
 * U6-C2a — THE PRICING STEP'S REFERENCE DATA (D13).
 *
 * TWO PUBLIC READS, BOTH THROUGH RLS, NEITHER A ROUTE:
 *
 *   `currencies`  — reference data with a public SELECT policy (A2-M1), so the
 *                   browser client reads it directly. 156 rows, read once per
 *                   visit and held in a module cache: a currency picker must not
 *                   cost a round trip every time it opens.
 *   `profiles`    — the seller's OWN row (`auth.uid()`), for the home country
 *                   whose currency is the picker's default. The DOOR decides the
 *                   real default when the field is left empty (it falls back to
 *                   the home country's currency itself), so this read only makes
 *                   the screen agree with the door in advance.
 *
 * A FAILED READ IS SAID IN WORDS (F4): `failed` comes back true and the caller
 * renders its caption; the list is never silently empty and the default is never
 * invented.
 */

export interface CurrencyRow {
  code: string;
  nameEn: string;
}

let currencyCache: CurrencyRow[] | null = null;
let currencyPromise: Promise<CurrencyRow[]> | null = null;

async function fetchCurrencies(): Promise<CurrencyRow[]> {
  const { data, error } = await supabase
    .from("currencies")
    .select("code,name_en")
    .order("code", { ascending: true });
  if (error) throw new Error(error.message);
  const rows = (data ?? []).map((row) => ({ code: row.code, nameEn: row.name_en }));
  currencyCache = rows;
  return rows;
}

function currenciesOnce(): Promise<CurrencyRow[]> {
  if (currencyCache !== null) return Promise.resolve(currencyCache);
  if (currencyPromise === null) {
    currencyPromise = fetchCurrencies().catch((error: unknown) => {
      // A failure is NOT cached: the next open is a real retry.
      currencyPromise = null;
      throw error;
    });
  }
  return currencyPromise;
}

export function useCurrencies(): {
  currencies: CurrencyRow[];
  isLoading: boolean;
  failed: boolean;
} {
  const [currencies, setCurrencies] = useState<CurrencyRow[]>(currencyCache ?? []);
  const [isLoading, setIsLoading] = useState(currencyCache === null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    currenciesOnce()
      .then((rows) => {
        if (cancelled) return;
        setCurrencies(rows);
        setFailed(false);
        setIsLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setFailed(true);
        setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { currencies, isLoading, failed };
}

export interface SellerHome {
  /** The seller's declared home country, `null` when they have not set one. */
  countryCode: string | null;
  /** That country's currency, which is the pricing step's default. */
  currencyCode: string | null;
}

/**
 * The seller's home market and its currency — their own profile row plus the
 * public `countries` read. Used as the PREFILL for pricing (D13) and as the
 * market prefill's last resort in step 6.
 */
export async function readSellerHome(): Promise<SellerHome> {
  const { data, error } = await supabase.from("profiles").select("home_country_code").maybeSingle();
  if (error || data === null) return { countryCode: null, currencyCode: null };
  const countryCode = data.home_country_code ?? null;
  if (countryCode === null) return { countryCode: null, currencyCode: null };

  const country = await supabase
    .from("countries")
    .select("currency_code")
    .eq("code", countryCode)
    .maybeSingle();
  return {
    countryCode,
    currencyCode: country.data?.currency_code ?? null,
  };
}

export function useSellerHome(): { home: SellerHome | null } {
  const [home, setHome] = useState<SellerHome | null>(null);
  useEffect(() => {
    let cancelled = false;
    void readSellerHome().then((found) => {
      if (!cancelled) setHome(found);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return { home };
}

/**
 * U6-C1-R1 — THE CURRENCY PRESELECT, IN ORDER (D13).
 *
 * The price step must open on the currency the seller is most likely to mean:
 *
 *   1 the currency already saved on this draft (the caller checks that first),
 *   2 the GUESS MARKET's currency — the edge's `cf-ipcountry`, echoed by
 *     `/api/geo` (DEC-068), resolved to `countries.currency_code` through the
 *     anon client,
 *   3 `ETB`, the home market, as the last resort.
 *
 * A failed guess is not an error: it simply falls through to (3). Nothing here
 * decides anything — `submit_listing` still judges the currency it is sent (F3).
 */
export const FALLBACK_CURRENCY = "ETB";

export async function readGuessCurrency(): Promise<string> {
  try {
    const response = await fetch("/api/geo", { headers: { accept: "application/json" } });
    if (!response.ok) return FALLBACK_CURRENCY;
    const payload = (await response.json()) as { country?: string | null };
    const country = typeof payload.country === "string" ? payload.country.toUpperCase() : null;
    if (country === null) return FALLBACK_CURRENCY;
    const { data } = await supabase
      .from("countries")
      .select("currency_code")
      .eq("code", country)
      .maybeSingle();
    return data?.currency_code ?? FALLBACK_CURRENCY;
  } catch {
    return FALLBACK_CURRENCY;
  }
}

/* --------------------- U6-C1-R3a-2 — the currency law --------------------- */

/**
 * THE MONEY THE SELLER LAST USED. A seller who priced their last listing in ETB
 * means ETB again, wherever the edge thinks they are today — so their OWN last
 * listing outranks the guess market. An owner read through RLS: no other
 * seller's row is visible, and a failure simply yields `null`.
 */
export async function readLastListingCurrency(): Promise<string | null> {
  const { data, error } = await supabase
    .from("listings")
    .select("price_currency,created_at")
    .not("price_currency", "is", null)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error || data === null) return null;
  const code = data.price_currency;
  return typeof code === "string" && code.length === 3 ? code.toUpperCase() : null;
}

export interface MarketCurrency {
  /** The market's country code, so the seller's own market can go first. */
  country: string;
  currencyCode: string;
  displayOrder: number;
}

/**
 * THE SHORT LIST IS THE OPEN MARKETS' MONEY. Fifteen markets is the ceiling the
 * rail already lives with, so the picker opens on the currencies a seller here
 * could plausibly want — the full ISO list stays one row away ("More
 * currencies…"). Read from the same public `/api/locations` document the rail
 * uses, so no second source of market truth is invented.
 */
export async function readMarketCurrencies(): Promise<MarketCurrency[]> {
  try {
    const response = await fetch("/api/locations", { headers: { accept: "application/json" } });
    if (!response.ok) return [];
    const payload = (await response.json()) as {
      countries?: Array<{ code?: unknown; currency_code?: unknown; display_order?: unknown }>;
    };
    return (payload.countries ?? [])
      .map((row) => ({
        country: String(row.code ?? "")
          .trim()
          .toUpperCase(),
        currencyCode: String(row.currency_code ?? "")
          .trim()
          .toUpperCase(),
        displayOrder: Number(row.display_order ?? 0),
      }))
      .filter((row) => /^[A-Z]{2}$/.test(row.country) && /^[A-Z]{3}$/.test(row.currencyCode))
      .sort((a, b) => a.displayOrder - b.displayOrder);
  } catch {
    return [];
  }
}

/** The market currencies in rail order, the seller's market first, deduplicated. */
export function shortlistCurrencies(
  markets: MarketCurrency[],
  homeCountry: string | null,
  max = 15,
): string[] {
  const ordered = [
    ...markets.filter((row) => homeCountry !== null && row.country === homeCountry),
    ...markets.filter((row) => homeCountry === null || row.country !== homeCountry),
  ];
  const out: string[] = [];
  for (const row of ordered) {
    if (!out.includes(row.currencyCode)) out.push(row.currencyCode);
    if (out.length === max) break;
  }
  return out;
}

export function useMarketCurrencies(): { markets: MarketCurrency[] } {
  const [markets, setMarkets] = useState<MarketCurrency[]>([]);
  useEffect(() => {
    let cancelled = false;
    void readMarketCurrencies().then((rows) => {
      if (!cancelled) setMarkets(rows);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return { markets };
}
