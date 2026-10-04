import type { MessageKey } from "@/i18n";
import { basisNoun, formatCommission } from "./price-basis";
import { fill } from "./refusal-text";

/**
 * Bundle 4 step 10 — THE ONE PRICE LINE. The card, the wizard's preview, the
 * review and the detail print a price through this function only:
 * "<amount> <currency> per <unit>" when the listing holds a unit with a noun,
 * else the period as before, else the amount alone. Commission, free and
 * contact keep their own words. `empty` is what a surface prints for a fixed
 * price with no amount (each surface keeps its own word for that).
 */

const PERIOD_KEYS: Record<string, MessageKey> = {
  once: "post.price.period.once",
  hour: "post.price.period.hour",
  day: "post.price.period.day",
  week: "post.price.period.week",
  month: "post.price.period.month",
  year: "post.price.period.year",
};

export interface PriceLineInput {
  mode: string;
  amount: number | null;
  currency: string | null;
  period: string | null;
  bp: number | null;
  /** The noun the price runs per ("kg", "pack"), or null. */
  unit: string | null;
}

export function priceLine(
  input: PriceLineInput,
  t: (key: MessageKey) => string,
  empty: string,
  language?: string,
): string {
  if (input.mode === "commission") {
    return input.bp === null
      ? empty
      : fill(t("price.commission"), { percent: formatCommission(input.bp, language) });
  }
  if (input.mode === "free") return t("price.free");
  if (input.mode === "contact") return t("price.contact");
  if (input.amount === null) return empty;
  const amount = input.amount.toLocaleString("en-US");
  const currency = input.currency ?? "";
  if (input.unit !== null && input.unit.trim() !== "") {
    return fill(t("post.review.pricePer"), { amount, currency, basis: input.unit.trim() });
  }
  const periodKey = input.period === null ? undefined : PERIOD_KEYS[input.period];
  return fill(t("post.review.priceLine"), {
    amount,
    currency,
    period: periodKey === undefined || input.period === "once" ? "" : t(periodKey),
  })
    .replace(/\s+/g, " ")
    .trim();
}

export type PriceUnitLabels = Record<string, { en?: string | null; am?: string | null }>;

/**
 * The noun a STORED unit prints with: the seller's written unit for `other`,
 * else the label's noun in the reader's language (English fallback); null when
 * the label carries no noun, so the line falls back to the period.
 */
export function storedUnitNoun(
  token: string | null,
  writtenText: string | null,
  labels: PriceUnitLabels | null,
  language: string,
): string | null {
  if (token === null || token === "") return null;
  if (token === "other") {
    const written = (writtenText ?? "").trim();
    return written === "" ? null : written;
  }
  const entry = labels?.[token];
  if (entry === undefined) return null;
  const label = (language === "am" ? entry.am : null) ?? entry.en ?? null;
  return label === null ? null : basisNoun(label);
}
