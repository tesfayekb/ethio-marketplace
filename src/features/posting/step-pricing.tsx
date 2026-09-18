import { useEffect, useMemo, useState } from "react";

import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n";

import { useCurrencies, useSellerHome } from "./pricing-data";
import { draftRefusalKey, fill, refusalFor } from "./refusal-text";
import { PRICE_MODES, PRICE_PERIODS, type CategoryFacts, type Refusal } from "./types";

/**
 * U6-C2a — STEP 5: WHAT IT COSTS (DEC-067, D13).
 *
 * FOUR THINGS THE CATEGORY DECIDES, NOT THE SCREEN:
 *
 *  1 whether a price may be named at all (`price_enabled`) — a category that
 *    forbids one is said in words and the amount never appears;
 *  2 the PERIOD: `default_price_period` is the starting value, and when
 *    `price_period_locked` is true the period is SHOWN, fixed, with no picker —
 *    a rental category that charges by the month cannot be posted "once";
 *  3 how far a poster may run (`expiry_days`), which bounds the optional
 *    "expires on" date;
 *  4 the currency's DEFAULT, which is the seller's home market's currency.
 *
 * Every one of those is a MIRROR. `submit_listing` is the authority (F3): its
 * `priceNotAllowed`, `periodLocked`, `posterExpiryTooSoon/TooLate` and
 * `unknownCurrency` refusals land beneath the field that earned them.
 *
 * "free" and "contact" HIDE the amount rather than disabling it — the door
 * refuses an amount sent with either (`mustBeEmpty`), so the screen must not
 * keep one on display where a seller could believe it still applies.
 */

const fieldClass =
  "min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground " +
  "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const MODE_KEYS: Record<string, MessageKey> = {
  fixed: "post.price.mode.fixed",
  negotiable: "post.price.mode.negotiable",
  free: "post.price.mode.free",
  contact: "post.price.mode.contact",
};

const PERIOD_KEYS: Record<string, MessageKey> = {
  once: "post.price.period.once",
  hour: "post.price.period.hour",
  day: "post.price.period.day",
  week: "post.price.period.week",
  month: "post.price.period.month",
  year: "post.price.period.year",
};

export interface PricingValues {
  priceMode: string;
  /** The amount as the seller typed it; `null` until they type a number. */
  priceAmount: number | null;
  priceCurrency: string | null;
  pricePeriod: string | null;
  /** An ISO date (`YYYY-MM-DD`) or the empty string for "the default window". */
  posterExpiresAt: string;
}

/** `YYYY-MM-DD` for a date `days` from today, which bounds the expiry field. */
function isoDay(days: number): string {
  const day = new Date(Date.now() + days * 86_400_000);
  return day.toISOString().slice(0, 10);
}

export function StepPricing({
  facts,
  values,
  refusals,
  onChange,
}: {
  /** The category block of the posting read; `null` while it is still loading. */
  facts: CategoryFacts | null;
  values: PricingValues;
  refusals: Refusal[];
  onChange: (patch: Partial<PricingValues>, immediate: boolean) => void;
}) {
  const { t, language } = useI18n();
  const currencies = useCurrencies();
  const { home } = useSellerHome();
  const [currencyQuery, setCurrencyQuery] = useState("");

  const locked = facts?.pricePeriodLocked ?? false;
  const priceEnabled = facts?.priceEnabled ?? true;
  const amountShown = values.priceMode === "fixed" || values.priceMode === "negotiable";
  const expiryDays = facts?.expiryDays ?? 60;

  /**
   * THE DEFAULTS ARRIVE ONCE, FROM FACTS, NEVER FROM A GUESS: the period from the
   * category and the currency from the seller's home market. Both are written as
   * ordinary changes (debounced, not immediate) so a seller who edits them
   * immediately is not fighting the prefill.
   */
  useEffect(() => {
    if (facts === null || values.pricePeriod !== null) return;
    onChange({ pricePeriod: facts.defaultPricePeriod }, false);
  }, [facts, values.pricePeriod, onChange]);

  useEffect(() => {
    if (home === null || home.currencyCode === null || values.priceCurrency !== null) return;
    onChange({ priceCurrency: home.currencyCode }, false);
  }, [home, values.priceCurrency, onChange]);

  const modeRefusal = refusalFor(refusals, "price_mode");
  const amountRefusal = refusalFor(refusals, "price_amount");
  const currencyRefusal = refusalFor(refusals, "price_currency");
  const periodRefusal = refusalFor(refusals, "price_period");
  const expiryRefusal = refusalFor(refusals, "poster_expires_at");

  /** The picker is searchable by CODE and by NAME — 156 rows is a list, not a menu. */
  const shownCurrencies = useMemo(() => {
    const needle = currencyQuery.trim().toLowerCase();
    const rows =
      needle === ""
        ? currencies.currencies
        : currencies.currencies.filter(
            (row) =>
              row.code.toLowerCase().includes(needle) || row.nameEn.toLowerCase().includes(needle),
          );
    return rows.slice(0, 40);
  }, [currencies.currencies, currencyQuery]);

  /** The seller's own locale formatting for the amount caption (never for storage). */
  const shownAmount =
    values.priceAmount === null
      ? ""
      : new Intl.NumberFormat(language === "am" ? "am-ET" : "en-US").format(values.priceAmount);

  return (
    <div className="space-y-5" data-testid="post-pricing">
      <p className="text-sm text-muted-foreground">{t("post.price.why")}</p>

      {/* ------------------------------ the mode ------------------------------ */}
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-foreground">{t("post.price.modeLabel")}</legend>
        <div className="flex flex-wrap gap-2">
          {PRICE_MODES.map((mode) => (
            <button
              key={mode}
              type="button"
              data-testid={`post-price-mode-${mode}`}
              aria-pressed={values.priceMode === mode}
              className={`min-h-11 rounded-md border px-4 text-sm font-medium ${
                values.priceMode === mode
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-input text-foreground hover:bg-accent"
              }`}
              onClick={() =>
                onChange(
                  // A mode without a price clears the amount: the door refuses an
                  // amount sent with `free`/`contact`, so it must not linger.
                  mode === "free" || mode === "contact"
                    ? { priceMode: mode, priceAmount: null }
                    : { priceMode: mode },
                  true,
                )
              }
            >
              {t(MODE_KEYS[mode] ?? "post.price.modeLabel")}
            </button>
          ))}
        </div>
        {!priceEnabled && (
          <p className="text-xs text-muted-foreground" data-testid="post-price-notallowed">
            {t("post.price.notAllowed")}
          </p>
        )}
        {modeRefusal !== null && (
          <p className="text-sm text-destructive" data-testid="post-price-mode-refusal">
            {t(draftRefusalKey(modeRefusal.reason))}
          </p>
        )}
      </fieldset>

      {/* ----------------------- the amount and currency ---------------------- */}
      {amountShown && (
        <div className="space-y-1" data-testid="post-price-amount-block">
          <label htmlFor="post-price-amount" className="text-sm font-medium text-foreground">
            {t("post.price.amountLabel")}
          </label>
          <input
            id="post-price-amount"
            data-testid="post-price-amount"
            inputMode="decimal"
            className={fieldClass}
            value={values.priceAmount === null ? "" : String(values.priceAmount)}
            placeholder={t("post.price.amountPlaceholder")}
            onChange={(event) => {
              const raw = event.target.value.replace(/[^\d.]/g, "");
              const parsed = raw === "" ? null : Number(raw);
              onChange(
                { priceAmount: parsed !== null && Number.isFinite(parsed) ? parsed : null },
                false,
              );
            }}
          />
          {shownAmount !== "" && (
            <p className="text-xs text-muted-foreground" data-testid="post-price-amount-shown">
              {fill(t("post.price.amountShown"), {
                amount: shownAmount,
                currency: values.priceCurrency ?? "",
              })}
            </p>
          )}
          {amountRefusal !== null && (
            <p className="text-sm text-destructive" data-testid="post-price-amount-refusal">
              {t(draftRefusalKey(amountRefusal.reason))}
            </p>
          )}

          <label
            htmlFor="post-price-currency-search"
            className="text-sm font-medium text-foreground"
          >
            {t("post.price.currencyLabel")}
          </label>
          <input
            id="post-price-currency-search"
            data-testid="post-price-currency-search"
            className={fieldClass}
            value={currencyQuery}
            placeholder={t("post.price.currencySearch")}
            onChange={(event) => setCurrencyQuery(event.target.value)}
          />
          <select
            data-testid="post-price-currency"
            aria-label={t("post.price.currencyLabel")}
            className={fieldClass}
            value={values.priceCurrency ?? ""}
            onChange={(event) => onChange({ priceCurrency: event.target.value || null }, true)}
          >
            <option value="">{t("post.price.currencyNone")}</option>
            {shownCurrencies.map((row) => (
              <option key={row.code} value={row.code}>
                {`${row.code} — ${row.nameEn}`}
              </option>
            ))}
          </select>
          {currencies.failed && (
            <p className="text-sm text-destructive" data-testid="post-price-currency-error">
              {t("post.price.currencyFailed")}
            </p>
          )}
          {currencyRefusal !== null && (
            <p className="text-sm text-destructive" data-testid="post-price-currency-refusal">
              {t(draftRefusalKey(currencyRefusal.reason))}
            </p>
          )}
        </div>
      )}

      {/* ------------------------------ the period ---------------------------- */}
      <div className="space-y-1">
        <span className="text-sm font-medium text-foreground">{t("post.price.periodLabel")}</span>
        {locked ? (
          // DEC-067 — a locked period is a FACT about the category, so it is shown
          // as one: no picker, no illusion of a choice the door would refuse.
          <p
            className="text-sm text-foreground"
            data-testid="post-price-period-fixed"
            data-period={values.pricePeriod ?? facts?.defaultPricePeriod ?? ""}
          >
            {fill(t("post.price.periodFixed"), {
              period: t(
                PERIOD_KEYS[values.pricePeriod ?? facts?.defaultPricePeriod ?? "once"] ??
                  "post.price.period.once",
              ),
            })}
          </p>
        ) : (
          <select
            data-testid="post-price-period"
            aria-label={t("post.price.periodLabel")}
            className={fieldClass}
            value={values.pricePeriod ?? ""}
            onChange={(event) => onChange({ pricePeriod: event.target.value || null }, true)}
          >
            {PRICE_PERIODS.map((period) => (
              <option key={period} value={period}>
                {t(PERIOD_KEYS[period] ?? "post.price.period.once")}
              </option>
            ))}
          </select>
        )}
        {periodRefusal !== null && (
          <p className="text-sm text-destructive" data-testid="post-price-period-refusal">
            {t(draftRefusalKey(periodRefusal.reason))}
          </p>
        )}
      </div>

      {/* ------------------------------ the expiry ---------------------------- */}
      <div className="space-y-1">
        <label htmlFor="post-price-expiry" className="text-sm font-medium text-foreground">
          {t("post.price.expiryLabel")}
        </label>
        <input
          id="post-price-expiry"
          data-testid="post-price-expiry"
          type="date"
          className={fieldClass}
          value={values.posterExpiresAt}
          min={isoDay(1)}
          max={isoDay(expiryDays)}
          onChange={(event) => onChange({ posterExpiresAt: event.target.value }, true)}
        />
        <p className="text-xs text-muted-foreground">
          {fill(t("post.price.expiryHint"), { days: expiryDays })}
        </p>
        {expiryRefusal !== null && (
          <p className="text-sm text-destructive" data-testid="post-price-expiry-refusal">
            {t(draftRefusalKey(expiryRefusal.reason))}
          </p>
        )}
      </div>
    </div>
  );
}

export default StepPricing;
