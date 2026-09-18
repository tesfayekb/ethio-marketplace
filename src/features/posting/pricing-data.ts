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
